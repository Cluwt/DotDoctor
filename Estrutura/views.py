import json
from django.http import HttpResponse
from django.shortcuts import render
from django.views import View
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer, RegisterSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login as auth_login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .serializers import PacienteSerializer, MedicoSerializer, ConsultaSerializer, ProntuarioSerializer
from .models import Paciente, Medico, Consulta, Prontuario
from rest_framework import viewsets
from django.contrib.auth import authenticate, login



def home(request):
    return HttpResponse("Bem-vindo à Home Page!")

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

class MedicoViewSet(viewsets.ModelViewSet):
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer

class ConsultaViewSet(viewsets.ModelViewSet):
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer

class ProntuarioViewSet(viewsets.ModelViewSet):
    queryset = Prontuario.objects.all()
    serializer_class = ProntuarioSerializer

@api_view(['POST'])
def registro_usuario(request):
    username = request.data.get('username')
    password = request.data.get('password')
    password_confirmacao = request.data.get('password_confirmacao')

    if password != password_confirmacao:
        return Response({'error': 'Senhas não coincidem'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Usuário já existe'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response({'success': 'Usuário registrado com sucesso'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_usuario(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({'success': 'Usuário logado com sucesso'}, status=status.HTTP_200_OK)
    return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

class LoginView(View):
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'success', 'message': 'Login bem-sucedido.'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Credenciais inválidas.'})

class RegisterView(View):
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        password_confirm = request.POST.get('password_confirm')

        if not username or not password or not password_confirm:
            return JsonResponse({'status': 'error', 'message': 'Todos os campos são obrigatórios.'}, status=400)

        if password != password_confirm:
            return JsonResponse({'status': 'error', 'message': 'As senhas não coincidem.'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'status': 'error', 'message': 'Usuário já existe.'}, status=400)

        user = User.objects.create_user(username=username, password=password)
        return JsonResponse({'status': 'success', 'message': 'Registro bem-sucedido.'})