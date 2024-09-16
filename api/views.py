from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework.serializers import Serializer, CharField

from Estrutura import serializers

class LoginSerializer(Serializer):
    nome_usuario = CharField(max_length=100)
    senha = CharField(max_length=100)

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            usuario = authenticate(username=serializer.validated_data['nome_usuario'], password=serializer.validated_data['senha'])
            if usuario is not None:
                login(request, usuario)
                return Response({"message": "Logado com sucesso"}, status=status.HTTP_200_OK)  # Retorna uma mensagem
            return Response({"error": "Credenciais inválidas"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

class RegistroView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RegistroSerializer(data=request.data)
        if serializer.is_valid():
            usuario = serializer.save()
            return Response({"detalhe": "Usuário criado"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)