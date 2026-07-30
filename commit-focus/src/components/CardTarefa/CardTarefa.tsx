import * as Checkbox from '@radix-ui/react-checkbox';
import style from './CardTarefa.module.css'

export function CardTarefa() {
  return (
    <div className={style.containerCard}>
      <label className={style.containerCardTarefa} htmlFor="">
        <Checkbox.Root 
          className={style.checkboxRoot}
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
        <span className={style.textoCardTarefa}>Estudar React</span>
      </label>

      <button className={style.btnAcaoCardTarefa} type='button'>
        <span className={`material-symbols-outlined ${style.iconeCardTarefa}`}>more_vert</span>
      </button>
    </div>
  )
}
