import style from './Footer.module.css'

export function Footer() {
  return (
    <footer className={style.containerFooter}>
      <span className={style.restantesFooter}>0 tarefas restantes</span>
      <span className={`material-symbols-outlined ${style.iconeFooter}`}>delete_forever</span>
    </footer>
  )
}