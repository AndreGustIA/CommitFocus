import axios from 'axios';
import type { Task } from '../types/task';
import type { Daily, DailyPayload } from '../types/daily';

export const api = axios.create ({

  baseURL: 'http://localhost:8080/v1/commitfocus',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const taskService = {

  // GET: Busca todas as tarefas
  async getAll(): Promise<Task[]> {
    const response = await api.get('/tasks');
    return response.data;
  },

  // POST: Cria uma nova tarefa
  async create(tarefa: string): Promise<Task> {
    const response = await api.post<Task>('/tasks', { 
      titulo: tarefa,
      descricao: '',
    });
    return response.data;
  },

  // PUT: Atualiza uma tarefa
  async update(id: string, tarefa: string): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${id}`, { 
      titulo: tarefa,
      descricao: '',
    });
    return response.data;
  },

  // PATCH: Alterna o status de PENDENTE <-> CONCLUIDA no backend de uma tarefa ao clicar no checkbox
  async toggleCompletion(id: string, status: boolean): Promise<Task> {
    const response = await api.patch<Task>(`/tasks/${id}/status`, { status }); 
    return response.data;
  },

  // DELETE: Remover uma tarefa individual
  async delete(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  // DELETE ALL: Remove todas as tarefas
  async deleteAll(): Promise<void> {
    await api.delete('/tasks/all');
  }
}

export const dailyService = {
  async create(daily: DailyPayload): Promise<Daily> {
    const response = await api.post<Daily>('/dailys', daily);
    return response.data;
  },

  async getAll(): Promise<Daily[]> {
    const response = await api.get('/dailys');
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/dailys/${id}`);
  }
}
