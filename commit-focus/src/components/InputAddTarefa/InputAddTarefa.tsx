import style from './InputAddTarefa.module.css';

export function InputAddTarefa() {
  return (
    <form className={style.containerInputAddTarefa}>
      <span className={`material-symbols-outlined ${style.iconeInput}`}>add</span>
      <input 
        className={style.inputAddTarefa}
        type="text" 
        placeholder="Adicione uma tarefa" 
      />
      <button className={style.buttonAddTarefa} type="submit">
        Adicionar
      </button>
    </form>
  )
} 
