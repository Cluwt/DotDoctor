from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework.serializers import Serializer, CharField
from rest_framework import viewsets

from Estrutura import serializers
from .models import Paciente
from .serializers import PacienteSerializer

# Serializer para login
class LoginSerializer(Serializer):
    nome_usuario = CharField(max_length=100)
    senha = CharField(max_length=100)

# View para login
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            usuario = authenticate(username=serializer.validated_data['nome_usuario'], password=serializer.validated_data['senha'])
            if usuario is not None:
                login(request, usuario)
                return Response({"message": "Logado com sucesso"}, status=status.HTTP_200_OK)
            return Response({"error": "Credenciais inválidas"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Serializer para registro
class RegistroSerializer(Serializer):
    nome_usuario = CharField(max_length=100)
    senha = CharField(max_length=100)
    senha_confirmacao = CharField(max_length=100)

    def validate(self, dados):
        if dados['senha'] != dados['senha_confirmacao']:
            raise serializers.ValidationError("As senhas devem coincidir")
        return dados

    def create(self, dados_validos):
        usuario = User.objects.create_user(username=dados_validos['nome_usuario'], password=dados_validos['senha'])
        return usuario

# View para registro de usuários
class RegistroView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RegistroSerializer(data=request.data)
        if serializer.is_valid():
            usuario = serializer.save()
            return Response({"detalhe": "Usuário criado"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ViewSet para CRUD de Pacientes
class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer
