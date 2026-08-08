import style from './CardHistoricoDaily.module.css';

export function CardHistoricoDaily() {
  return (
    <div className={style.containerHistorioDaily}>
      <div className={style.containerHeader}>
        <p>Quinta-Feira, 22 de Junho de 2026</p>
        <div className={style.secaoBtn}>
          <button>
            <span className={`material-symbols-outlined ${style.iconeCopiar}`}>content_copy</span>
            Copiar markdown
          </button>

          <span className={`material-symbols-outlined ${style.iconeLixeira}`}>delete</span>
        </div>
      </div>

      <div className={style.secaoPrincipal}>
        <div className={style.containerOqueFiz}>
          <span className={`material-symbols-outlined ${style.iconeOqueFiz}`}>check_circle</span>
          <label htmlFor="#" className={style.textoOqueFiz}>O que fiz</label>
        </div>
        <p>Exemplo dp que fiz</p>

        <div className={style.containerOqueFarei}>
          <span className={`material-symbols-outlined ${style.iconeOqueFarei}`}>rocket_launch</span>
          <label htmlFor="#" className={style.textoOqueFarei}>O que farei</label>
        </div>
        <p>---</p>

        <div className={style.containerImpedimentos}>
          <span className={`material-symbols-outlined ${style.iconeImpedimentos}`}>warning</span>
          <label htmlFor="#" className={style.textoImpedimentos}>Impedimentos</label>
        </div>
        <p>Exemplo de impedimentos</p>
      </div>
    </div>
  )
}
