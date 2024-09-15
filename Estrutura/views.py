import json
from django.http import HttpResponse
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



def home(request):
    return HttpResponse("Bem-vindo à Home Page!")

@api_view(['POST'])
def registro_usuario(request):
    nome_usuario = request.data.get('nome_usuario')
    senha = request.data.get('senha')
    senha_confirmacao = request.data.get('senha_confirmacao')

    if senha != senha_confirmacao:
        return Response({'erro': 'As senhas não coincidem'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=nome_usuario).exists():
        return Response({'erro': 'O nome de usuário já está em uso'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=nome_usuario, password=senha)
    return Response({'mensagem': 'Usuário registrado com sucesso'}, status=status.HTTP_201_CREATED)

@csrf_exempt
def login_usuario(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nome_usuario = data.get('nome_usuario')
        senha = data.get('senha')
        
        user = authenticate(username=nome_usuario, password=senha)
        if user is not None:
            auth_login(request, user)
            return JsonResponse({'message': 'Login bem-sucedido'})
        else:
            return JsonResponse({'error': 'Credenciais inválidas'}, status=400)
    return JsonResponse({'error': 'Método não permitido'}, status=405)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Adicione lógica de autenticação aqui
        return Response({"detail": "Login bem-sucedido"}, status=status.HTTP_200_OK)

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Adicione lógica de criação de usuário aqui
        return Response({"detail": "Registro bem-sucedido"}, status=status.HTTP_201_CREATED)
