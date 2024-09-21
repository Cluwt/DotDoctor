from django.db import models

class Paciente(models.Model):
    nome = models.CharField(max_length=255)
    nome_mae = models.CharField(max_length=255)
    data_nascimento = models.DateField()
    cidade_natal = models.CharField(max_length=255)
    peso = models.FloatField()
    altura = models.FloatField()
    doencas_preexistentes = models.TextField(blank=True, null=True)
    alergias = models.TextField(blank=True, null=True)  # Tipo de alergia
    fumante = models.BooleanField(default=False)
    tipo_fumante = models.CharField(max_length=255, blank=True, null=True)  # Se fumante, qual tipo
    etilista = models.BooleanField(default=False)
    uso_drogas_ilicitas = models.BooleanField(default=False)
    cirurgias_realizadas = models.TextField(blank=True, null=True)  # Tipo de cirurgia
    carteira_vacinacao = models.TextField(blank=True, null=True)
    medicacoes_em_uso = models.TextField(blank=True, null=True)
    uso_anticoncepcional = models.BooleanField(default=False)
    qualidade_sono = models.CharField(max_length=255, blank=True, null=True)
    ja_foi_gestante = models.BooleanField(default=False)

    def __str__(self):
        return self.nome

class Medico(models.Model):
    nome = models.CharField(max_length=255)
    especialidade = models.CharField(max_length=255)
    crm = models.CharField(max_length=15)

    def __str__(self):
        return self.nome

class Consulta(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    data_consulta = models.DateTimeField()
    observacoes_paciente = models.TextField(blank=True, null=True)
    tipo_consulta = models.CharField(max_length=50, choices=[
        ('Particular', 'Particular'),
        ('Convenio', 'Convênio'),
        ('SUS', 'SUS')
    ])
    primeira_consulta = models.BooleanField(default=False)

    def __str__(self):
        return f'Consulta com {self.medico} - {self.data_consulta}'

class Prontuario(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    especialidade_medico = models.CharField(max_length=255)
    especialidade_consulta = models.CharField(max_length=255)
    anamnese = models.TextField()
    resultado_exames = models.TextField(blank=True, null=True)
    evolucao_grafica = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'Prontuário de {self.paciente} - {self.medico}'
