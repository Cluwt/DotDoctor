from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.views import RegistroView
from .views import PacienteViewSet, MedicoViewSet, ConsultaViewSet, ProntuarioViewSet
from .views import registro_usuario, login_usuario

router = DefaultRouter()
router.register(r'pacientes', PacienteViewSet)
router.register(r'medicos', MedicoViewSet)
router.register(r'consultas', ConsultaViewSet)
router.register(r'prontuarios', ProntuarioViewSet)


urlpatterns = [
     path('registro/', RegistroView.as_view(), name='registro'),  # URL padrão para o registro
]
