import style from './Header.module.css';


export function Header() {
  return (
    <header className={style.containerHeader}>
      <h1>CommitFocus</h1>
      <button
        type="button"
      >
        <span className={`material-symbols-outlined ${style.iconeHeader}`}>brightness_7</span>
      </button>
    </header>
  )
}
