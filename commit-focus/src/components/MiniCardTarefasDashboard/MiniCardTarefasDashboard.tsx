import style from './MiniCardTarefasDashboard.module.css';

interface MiniCardTarefasProps {
  texto: string;
  quantidade: string;
  icone: string;
  corVariante?: 'padrao' | 'azul' | 'verde';
}

export function MiniCardTarefasDashboard({ texto, quantidade, icone, corVariante = 'padrao' }: MiniCardTarefasProps) {
  return (
    <div className={`${style.containerMiniCardTarefas} ${style[corVariante]}`}>
      <span className={`material-symbols-outlined ${style.iconesTarefasDash}`}>{icone}</span>
      <span className={style.numeroCardTarefas}>{quantidade}</span>
      <p>{texto}</p>
    </div>
  )
}

