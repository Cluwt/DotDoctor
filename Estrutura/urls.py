from django.urls import path
from . import views
from .views import LoginView, RegisterView
from .views import registro_usuario
from .views import login_usuario

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', login_usuario, name='login'),
    path('registro/', registro_usuario, name='register'),
]
