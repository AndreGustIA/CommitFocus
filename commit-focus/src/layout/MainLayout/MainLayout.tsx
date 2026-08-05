import {  useEffect, useState } from 'react';
import style from './MainLayout.module.css';
import { Header } from "../../components/Header/Header";
import { useTheme } from '../../hooks/useTheme';
import { InputAddTarefa } from '../../components/InputAddTarefa/InputAddTarefa';
import { Footer } from '../../components/Footer/Footer';
import { CardTarefa } from '../../components/CardTarefa/CardTarefa';
import { Toast, type ToastType } from '../../components/Toast/Toast';
import { ModalDeletar } from '../../components/ModalDeletar/ModalDeletar';
import type { Task } from '../../types/task';
import { taskService } from '../../services/api';

interface ToastState {
  titulo: string;
  mensagem: string;
  tipo: ToastType;
}

export function MainLayout() {
  const { tema, alternarTema } = useTheme();
  const [tarefas, setTarefas] = useState<Task[]>([]);
  const [estaCarregando, setEstaCarregando] = useState(true);

  const [modalDeletarAberto, setModalDeletarAberto] = useState(false);

  const [toast, setToast] = useState<ToastState | null>(null);

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
    }
    catch (err) {
      console.error('Erro ao adicionar tarefa:', err);
    }
  }

  async function alternarConclusaoTarefa(id: string, estaConcluido: boolean) {
    try {
      const tarefaAtualizada = await taskService.toggleCompletion(id, !estaConcluido);
      setTarefas((prevTarefas) =>
        prevTarefas.map((tarefa) =>
          tarefa.id === id ? tarefaAtualizada : tarefa
        )
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
        prevTarefas.map((tarefa) =>
          tarefa.id === id ? tarefaAtualizada : tarefa
        )
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

  if (estaCarregando) {
    return <div>Carregando...</div>;
  }

  const contagemTarefasRestante = tarefas.filter((tarefa) => !tarefa.status).length;

  return (
    <>
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

      <div className={style.containerMain}>
        <div className={style.containerLayout}>
          <Header
            tema={tema}
            alternarTema={alternarTema}
          />
          <hr />
          <InputAddTarefa
            adicionarTarefa={adicionarTarefa}
            exibirToast={exibirToast}
          />
          <hr />
          
          <div className={style.containerCards}>
            {estaCarregando ? (
              <p>Carregando tarefas...</p>
            ) : tarefas.length === 0 ? (
              <div className={style.containerSemTarefas}>
                <span className={`material-symbols-outlined ${style.iconeSemtarefa}`}>edit_note</span>
                <p>Você ainda não tem tarefas criadas</p>
              </div>
            ) : (
              tarefas.map((tarefa) => (
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
          <hr />
          <Footer
            contadorTarefasRestante={contagemTarefasRestante}
            abrirModalDeletar={() => {
              if (tarefas.length === 0) {
                exibirToast('Nenhuma tarefa', 'Não há tarefas para deletar.', 'erro');
                return;
              }
              setModalDeletarAberto(true);
            }}
          />
        </div>  
      </div> 
    </>
  )
}
