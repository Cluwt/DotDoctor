from django.urls import path
from .views import RegistroView, LoginView  # Verifique se as views existem e estão corretas

urlpatterns = [
    path('registro/', RegistroView.as_view(), name='registro'),  # Para registro
    path('login/', LoginView.as_view(), name='login'),  # Se for usar a view de login
]
