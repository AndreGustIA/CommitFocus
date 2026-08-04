import { useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { Task } from '../../types/task';
import style from './CardTarefa.module.css'

interface CardTarefaProps {
  tarefa: Task;
  onToggleTask: (id: string, estaConcluido: boolean) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, tarefaEditada: string) => void;
}

export function CardTarefa({ tarefa, onToggleTask, onDeleteTask, onEditTask }: CardTarefaProps) {

  const [isEditing, setIsEditing] = useState(false);
  const [tarefaEditada, setTarefaEditada] = useState(tarefa.titulo);

  const statusTask = tarefa.status === 'CONCLUIDA';

  function lidarComEdicao() {
    if (tarefaEditada.trim() === '') {
      setTarefaEditada(tarefa.titulo);
      setIsEditing(false);
      return;
    }

    if (tarefaEditada !== tarefa.titulo) {
      onEditTask(tarefa.id, tarefaEditada);
    }
    setIsEditing(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      lidarComEdicao();
    } else if (event.key === 'Escape') {
      setTarefaEditada(tarefa.titulo);
      setIsEditing(false);
    }
  }

  return (
    <div className={style.containerCard}>
      <label className={style.containerCardTarefa} htmlFor={`tarefa-${tarefa.id}`}>
        <Checkbox.Root 
          className={style.checkboxRoot}
          id={`tarefa-${tarefa.id}`}
          checked={statusTask}
          onCheckedChange={() => onToggleTask(tarefa.id, statusTask)}
          >
          <Checkbox.Indicator className={style.checkboxIndicator}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </Checkbox.Indicator>
        </Checkbox.Root>
        {isEditing ? (
          <input
            className={style.inputEdicaoTarefa}
            type="text"
            value={tarefaEditada}
            onChange={(e) => setTarefaEditada(e.target.value)}
            onBlur={lidarComEdicao}
            onKeyDown={handleKeyDown}
            autoFocus
            
          />
        ) : (
          <span 
            className={`${style.textoCardTarefa} ${statusTask ? style.textoCardTarefaConcluida : ''}`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {tarefa.titulo}
          </span>
        )}
      </label>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={style.btnAcaoCardTarefa} type='button'>
            <span className={`material-symbols-outlined ${style.iconeCardTarefa}`}>more_vert</span>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={style.dropdownContent}
            sideOffset={6}
            align="end"
          >
            <DropdownMenu.Item 
              className={style.dropdownItem}
              onClick={() => setIsEditing(true)}
            >
              <span className={`material-symbols-outlined ${style.iconesDropTarefa}`}>edit</span>
              <span className={style.textoIconeCardTarefa}>editar</span>
            </DropdownMenu.Item>

            <DropdownMenu.Separator className={style.dropdownSeparator} />

            <DropdownMenu.Item 
              className={style.dropdownItem}
              onClick={() => onDeleteTask(tarefa.id)}
            >
              <span className={`material-symbols-outlined ${style.iconesDropTarefa}`}>delete</span>
              <span className={style.textoIconeCardTarefa}>excluir</span>
            </DropdownMenu.Item>

          </DropdownMenu.Content>
        </DropdownMenu.Portal>  
      </DropdownMenu.Root>
    </div>
  )
}
