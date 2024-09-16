import api from './api'; // Importa a configuração da API

export const login = async (username, password) => {
  try {
    const response = await api.post('login/', { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
