import { useEffect, useState } from 'react';
import style from './Tarefas.module.css'
import { InputAddTarefa } from '../../components/InputAddTarefa/InputAddTarefa';
import { CardTarefa } from '../../components/CardTarefa/CardTarefa';
import { ModalDeletar } from '../../components/ModalDeletar/ModalDeletar';
import { Toast, type ToastType } from '../../components/Toast/Toast';
import { taskService } from '../../services/api';
import type { Task } from '../../types/task';

interface ToastState {
  titulo: string;
  mensagem: string;
  tipo: ToastType;
}

export function Tarefas() {
  const [tarefas, setTarefas] = useState<Task[]>([]);
  const [estaCarregando, setEstaCarregando] = useState(true);
  const [modalDeletarAberto, setModalDeletarAberto] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  type TipoFiltro = 'todas' | 'pendentes' |  'concluidas';
  const [filtroAtual, setFiltroAtual] = useState<TipoFiltro>(() => {
    const filtroSalvo = localStorage.getItem('@commitfocus:filtro');

    if ( filtroSalvo === 'todas' || filtroSalvo === 'pendentes' || filtroSalvo === 'concluidas' ) {
      return filtroSalvo as TipoFiltro;
    }

    return 'todas';
  })

  useEffect(() => {
    localStorage.setItem('@commitfocus:filtro', filtroAtual);
  }, [filtroAtual]);

  const exibirToast = (titulo: string, mensagem: string, tipo: ToastType) => {
    setToast({ titulo, mensagem, tipo });
  };

  useEffect(() => {
    taskService
      .getAll()
      .then((data) => setTarefas(data))
      .catch((err) => console.error(err))
      .finally(() => setEstaCarregando(false));
  }, []);

  async function deletarTodasTarefas() {
    if (tarefas.length === 0) {
      exibirToast('Nenhuma tarefa', 'Não há tarefas para deletar.', 'erro');
      return;
    }

    try {
      await taskService.deleteAll();
      setTarefas([]);
      exibirToast('Tarefas deletadas', 'Todas as tarefas foram deletadas com sucesso.', 'deletar');
    } catch (err) {
      console.error('Erro ao deletar todas as tarefas:', err);
    } finally {
      setModalDeletarAberto(false);
    }
  }

  async function adicionarTarefa(tarefaTexto: string) {
    if (!tarefaTexto.trim()) {
      exibirToast('Campo vazio', 'Adicione uma tarefa', 'erro');
      return;
    }

    try {
      const novaTarefa = await taskService.create(tarefaTexto);
      setTarefas((prevTarefas) => [...prevTarefas, novaTarefa]);
    } catch (err) {
      console.error('Erro ao adicionar tarefa:', err);
    }
  }

  async function alternarConclusaoTarefa(id: string, estaConcluido: boolean) {
    try {
      const tarefaAtualizada = await taskService.toggleCompletion(id, !estaConcluido);
      setTarefas((prevTarefas) =>
        prevTarefas.map((tarefa) => (tarefa.id === id ? tarefaAtualizada : tarefa))
      );
    } catch (err) {
      console.error('Erro ao alternar conclusão da tarefa:', err);
    }
  }

  async function editarTarefa(id: string, tarefaEditada: string) {
    if (!tarefaEditada.trim()) {
      exibirToast('Campo vazio', 'O texto da tarefa não pode estar vazio.', 'erro');
      return;
    }

    try {
      const tarefaAtualizada = await taskService.update(id, tarefaEditada);
      setTarefas((prevTarefas) =>
        prevTarefas.map((tarefa) => (tarefa.id === id ? tarefaAtualizada : tarefa))
      );
      exibirToast('Tarefa atualizada', 'A tarefa foi atualizada com sucesso.', 'sucesso');
    } catch (err) {
      console.error('Erro ao editar tarefa:', err);
    }
  }

  async function deletarTarefa(id: string) {
    try {
      await taskService.delete(id);
      setTarefas((prevTarefas) => prevTarefas.filter((tarefa) => tarefa.id !== id));
      exibirToast('Tarefa deletada', 'A tarefa foi deletada com sucesso.', 'deletar');
    } catch (err) {
      console.error('Erro ao deletar tarefa:', err);
    }
  }

  const contagemTarefasRestantes = tarefas.length

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if ( filtroAtual === 'pendentes' ) return tarefa.status === 'PENDENTE';
    if ( filtroAtual === 'concluidas' ) return tarefa.status === 'CONCLUIDA';

    return true;
  })

  return (
    <main className={style.containerPrincipal}>
      {toast && (
        <Toast
          titulo={toast.titulo}
          mensagem={toast.mensagem}
          tipo={toast.tipo}
          onClose={() => setToast(null)}
        />
      )}

      <ModalDeletar
        aberto={modalDeletarAberto}
        onOpenChange={setModalDeletarAberto}
        onConfirmar={deletarTodasTarefas}
      />

      <div className={style.cabecalhoTarefas}>
        <h1>Registre sua nova tarefa</h1>

        <div className={style.infoTarefas}>
          <span className={style.totalTexto}>{contagemTarefasRestantes} total de tarefas</span>

          <button
            className={style.botaoApagarTudo}
            onClick={() => {
              if(tarefas.length === 0) {
                exibirToast('Nenhuma tarefa', 'Não há tarefas para deletar', 'erro');
                return;
              }
              setModalDeletarAberto(true);
            }}
          >
          Apagar todas as tarefas
          <span className={`material-symbols-outlined ${style.iconeApagarTodas}`}>delete</span>
          </button>
        </div>
      </div>
      
      <InputAddTarefa adicionarTarefa={adicionarTarefa} exibirToast={exibirToast} />

      <div className={style.filterContainer}>
        <div className={style.filterContainerBtn}>
          <button
            type='button'
            className={`${style.botaoFiltro} ${filtroAtual === 'todas' ? style.filtroAtivo : ''}`}
            onClick={() => setFiltroAtual('todas')}
          >
            Todas
          </button>
          <button
            type='button'
            className={`${style.botaoFiltro} ${filtroAtual === 'pendentes' ? style.filtroAtivo : ''}`}
            onClick={() => setFiltroAtual('pendentes')}
          >
            Pendentes
          </button>
          <button
            type='button'
            className={`${style.botaoFiltro} ${filtroAtual === 'concluidas' ? style.filtroAtivo : ''}`}
            onClick={() => setFiltroAtual('concluidas')}
          >
            Concluídas
          </button>
        </div>
      </div>

      <hr />

      <div className={style.containerCards}>
        {estaCarregando ? (
          <p>Carregando tarefas...</p>
        ) : tarefasFiltradas.length === 0 ? (
          <div className={style.containerSemTarefas}>
            <span className={`material-symbols-outlined ${style.iconeSemtarefa}`}>
              edit_note
            </span>
            <p>
              {filtroAtual === 'todas' ? 'Você ainda não tem tarefas criadas' : 'Nenhuma tarefa encontrada neste filtro'}
            </p>
          </div>
        ) : (
          tarefasFiltradas.map((tarefa) => (
            <CardTarefa
              key={tarefa.id}
              tarefa={tarefa}
              onToggleTask={alternarConclusaoTarefa}
              onDeleteTask={deletarTarefa}
              onEditTask={editarTarefa}
            />
          ))
        )}
      </div>
      
    </main>
  );
}
