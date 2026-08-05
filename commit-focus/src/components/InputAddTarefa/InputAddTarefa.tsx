import { useState, type FormEvent } from 'react';
import style from './InputAddTarefa.module.css';
import type { ToastType } from '../../components/Toast/Toast';

interface InputAddTarefaProps {
  adicionarTarefa: (tarefa: string) => void;
  exibirToast: (titulo: string, mensagem: string, tipo: ToastType) => void;
}

export function InputAddTarefa({ adicionarTarefa, exibirToast }: InputAddTarefaProps) {
  const [tarefaTexto, setTarefaTexto] = useState('');
  
  function lidarComEnvio(e: FormEvent) {
    e.preventDefault();
    
    if (!tarefaTexto.trim()) {
      exibirToast('Campo vazio', 'Adicione uma tarefa', 'erro');
      return;
    }

    adicionarTarefa(tarefaTexto);
    setTarefaTexto('');
  }

  return (
    <>
      <h1 className={style.tituloAddTarefa}>Registre sua nova tarefa</h1>

      <form 
        className={style.containerInputAddTarefa}
        onSubmit={lidarComEnvio}
      >
        <span className={`material-symbols-outlined ${style.iconeInput}`}>add</span>
        <input 
          className={style.inputAddTarefa}
          type="text" 
          placeholder="Adicione uma tarefa aqui..." 
          value={tarefaTexto}
          onChange={(e) => setTarefaTexto(e.target.value)}
        />
        <button className={style.buttonAddTarefa} type="submit">
          Adicionar
        </button>
      </form>
    </>  
  )
} 
