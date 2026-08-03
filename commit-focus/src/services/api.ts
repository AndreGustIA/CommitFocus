import axios from 'axios';
import type { Task } from '../types/task';

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
    const listaBackend = response.data.content || response.data;
    
    return listaBackend.map((tarefa: any) => ({
      id: tarefa.data.id,
      titulo: tarefa.data.titulo,
      descricao: tarefa.data.descricao || '',
      estaConcluido: tarefa.data.status === 'CONCLUIDA' || tarefa.data.status === 'COMPLETED'
    }));
  },

  // POST: Cria uma nova tarefa
  async create(tarefa: string): Promise<Task> {
    const response = await api.post<any>('/tasks', { 
      titulo: tarefa,
      descricao: '',
    });
    return {
      id: response.data.id,
      tarefa: response.data.titulo,
      descricao: response.data.descricao || '',
      estaConcluido: response.data.status === 'CONCLUIDA' || response.data.status === 'COMPLETED'
    };
  },

  // PUT: Atualiza uma tarefa
  async update(id: string, tarefa: string): Promise<Task> {
    const response = await api.put<any>(`/tasks/${id}`, { 
      titulo: tarefa,
      descricao: '',
    });
    return {
      id: response.data.id,
      tarefa: response.data.titulo,
      descricao: response.data.descricao || '',
      estaConcluido: response.data.status === 'CONCLUIDA' || response.data.status === 'COMPLETED'
    };
  },

  // PATCH: Alterna estado (status) de pendente/concluida de uma tarefa ao clicar no checkbox
  async toggleCompletion(id: string, estaConcluido: boolean): Promise<Task> {
    const response = await api.patch<any>(`/tasks/${id}/status`); 
    return {
      id: response.data.id,
      tarefa: response.data.titulo,
      descricao: response.data.descricao || '',
      estaConcluido: 
        response.data.status === 'CONCLUIDO' ||
        response.data.status === 'CONCLUIDA' || 
        response.data.status === 'COMPLETED'
    };
  },

  // DELETE: Remover uma tarefa individual
  async delete(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  // DELETE ALL: Remove todas as tarefas
  async deleteAll(tarefas?: Task[]): Promise<void> {
    await api.delete('/tasks/all');
  }
}
