import style from './Footer.module.css'

interface FooterProps {
  contadorTarefasRestante: number;
  abrirModalDeletar?: () => void;
}

export function Footer({ contadorTarefasRestante, abrirModalDeletar }: FooterProps) {
  return (
    <footer className={style.containerFooter}>
      <span className={style.restantesFooter}>{contadorTarefasRestante} tarefas restantes</span>
      <span 
        className={`material-symbols-outlined ${style.iconeFooter}`} 
        onClick={abrirModalDeletar}
      >
        delete_forever
      </span>
    </footer>
  )
}