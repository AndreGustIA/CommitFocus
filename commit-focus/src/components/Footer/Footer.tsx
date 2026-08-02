import style from './Footer.module.css'


export function Footer({ contadorTarefasRestante }: { contadorTarefasRestante: number }) {
  return (
    <footer className={style.containerFooter}>
      <span className={style.restantesFooter}>{contadorTarefasRestante} tarefas restantes</span>
      <span className={`material-symbols-outlined ${style.iconeFooter}`}>delete_forever</span>
    </footer>
  )
}