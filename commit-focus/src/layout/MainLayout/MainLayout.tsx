import {  useEffect, useState } from 'react';
import style from './MainLayout.module.css';
import { Header } from "../../components/Header/Header";
import { InputAddTarefa } from '../../components/InputAddTarefa/InputAddTarefa';
import { Footer } from '../../components/Footer/Footer';
import { CardTarefa } from '../../components/CardTarefa/CardTarefa';
import type { Task } from '../../types/task';
import { taskService } from '../../services/api';

export function MainLayout() {
  const [tarefas, setTarefas] = useState<Task[]>([]);
  const [estaCarregando, setEstaCarregando] = useState(true);

  useEffect(() => {
    taskService
    .getAll()
    .then((data) => setTarefas(data))
    .catch((err) => console.error(err))
    .finally(() => setEstaCarregando(false));
  }, []);

  async function adicionarTarefa(tarefaTexto: string) {
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
    try {
      const tarefaAtualizada = await taskService.update(id, tarefaEditada);
      setTarefas((prevTarefas) =>
        prevTarefas.map((tarefa) =>
          tarefa.id === id ? tarefaAtualizada : tarefa
        )
      );
    } catch (err) {
      console.error('Erro ao editar tarefa:', err);
    }
  }

  async function deletarTarefa(id: string) {
    try {
      await taskService.delete(id);
      setTarefas((prevTarefas) => prevTarefas.filter((tarefa) => tarefa.id !== id));
    } catch (err) {
      console.error('Erro ao deletar tarefa:', err);
    }
  }

  if (estaCarregando) {
    return <div>Carregando...</div>;
  }

  const contagemTarefasRestante = tarefas.filter((tarefa) => !tarefa.estaConcluido).length;

  return (
    <>
      <div className={style.containerMain}>
        <div className={style.containerLayout}>
          <Header />
          <InputAddTarefa 
            adicionarTarefa={adicionarTarefa}
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
          />
        </div>  
      </div> 
    </>
  )
}
