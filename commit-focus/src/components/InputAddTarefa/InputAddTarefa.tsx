import { useState, type FormEvent } from 'react';
import style from './InputAddTarefa.module.css';

interface InputAddTarefaProps {
  adicionarTarefa: (tarefa: string) => void;
}

export function InputAddTarefa({ adicionarTarefa }: InputAddTarefaProps) {
  const [tarefaTexto, setTarefaTexto] = useState('');
  
  function lidarComEnvio(e: FormEvent) {
    e.preventDefault();

    if (!tarefaTexto.trim()) return;

    adicionarTarefa(tarefaTexto);
    setTarefaTexto('');
  }

  return (
    <form 
      className={style.containerInputAddTarefa}
      onSubmit={lidarComEnvio}
    >
      <span className={`material-symbols-outlined ${style.iconeInput}`}>add</span>
      <input 
        className={style.inputAddTarefa}
        type="text" 
        placeholder="Adicione uma tarefa" 
        value={tarefaTexto}
        onChange={(e) => setTarefaTexto(e.target.value)}
      />
      <button className={style.buttonAddTarefa} type="submit">
        Adicionar
      </button>
    </form>
  )
} 
