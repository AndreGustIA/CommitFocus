export interface Task {
  id: string;
  titulo: string;
  descricao: string;
  status: 'PENDENTE' | 'CONCLUIDA';
}
