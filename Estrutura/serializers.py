from rest_framework import serializers
from .models import Paciente, Medico, Consulta, Prontuario

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    senha = serializers.CharField()

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    senha = serializers.CharField()
    senha_confirmacao = serializers.CharField()
    
    def validate(self, data):
        if data['senha'] != data['senha_confirmacao']:
            raise serializers.ValidationError("As senhas não conferem")
        return data

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'

class MedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medico
        fields = '__all__'

class ConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consulta
        fields = '__all__'

class ProntuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prontuario
        fields = '__all__'