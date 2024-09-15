from rest_framework import serializers

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
