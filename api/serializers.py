from rest_framework import serializers
from .models import Paciente

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'  # ou especifique os campos, ex: ['nome', 'data_nascimento', ...]
