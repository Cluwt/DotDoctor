from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoginView, RegistroView, PacienteViewSet

# Criação do roteador para o ViewSet de Pacientes
router = DefaultRouter()
router.register(r'pacientes', PacienteViewSet)

# Definição das rotas
urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),  # Rota para login
    path('registro/', RegistroView.as_view(), name='registro'),  # Rota para registro
    path('', include(router.urls)),  # Inclui as rotas CRUD de Pacientes
]
