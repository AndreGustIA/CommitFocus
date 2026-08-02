import axios from 'axios';
import type { Task } from '../types/task';

export const api = axios.create ({
  baseURL: 'http://localhost:3000', // URL base da API
  headers: {
    'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
  },
})

// Função para manipular os dados da API
export const taskService = {
  // GET: Busca todas as tarefas
  async getAll(): Promise<Task[]> {
    const response = await api.get<Task[]>('/tasks');
    return response.data; // O Axios já entrega os dados em .data
  },

  // POST: Cria uma nova tarefa
  async create(tarefa: string): Promise<Task> {
    const response = await api.post<Task>('/tasks', { 
      tarefa, estaConcluido: false,
    });
    return response.data;
  },

  // PUT: Atualiza uma tarefa
  async update(id: string, tarefa: string): Promise<Task> {
    const response = await api.patch<Task>(`/tasks/${id}`, { 
      tarefa,
    });
    return response.data;
  },

  // PATCH: Alterna estado de concluída/pendente de uma tarefa
  async toggleCompletion(id: string, estaConcluido: boolean): Promise<Task> {
    const response = await api.patch<Task>(`/tasks/${id}`, { 
      estaConcluido,
    });
    return response.data;
  },

  // DELETE: Remover uma tarefa
  async delete(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

}
