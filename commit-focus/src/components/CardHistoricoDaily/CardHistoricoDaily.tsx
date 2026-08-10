import type { Daily } from '../../types/daily';
import style from './CardHistoricoDaily.module.css';

interface CardHistoricoProps {
  daily: Daily;
  onDelete: () => void;
}

export function CardHistoricoDaily({ daily, onDelete }: CardHistoricoProps) {

  function formatarData(dataString: string) {
    if (!dataString) return 'Data não informada';

    const apenasData = dataString.split('T')[0];
    const [ano, mes, dia] = apenasData.split('-');

    const data = new Date(Number(ano), Number(mes) - 1, Number(dia));

    if (isNaN(data.getTime())) {
      return 'Data inválida';
    }

    const dataFormatada = data.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  }

  return (
    <div className={style.containerHistorioDaily}>
      <div className={style.containerHeader}>
        <p>{formatarData(daily.dataReferencia)}</p>
        <div className={style.secaoBtn}>
          <button>
            <span className={`material-symbols-outlined ${style.iconeCopiar}`}>content_copy</span>
            Copiar markdown
          </button>

          <span onClick={onDelete} className={`material-symbols-outlined ${style.iconeLixeira}`}>delete</span>
        </div>
      </div>

      <div className={style.secaoPrincipal}>
        <div className={style.containerOqueFiz}>
          <span className={`material-symbols-outlined ${style.iconeOqueFiz}`}>check_circle</span>
          <label htmlFor="#" className={style.textoOqueFiz}>O que fiz</label>
        </div>
        <p>{daily.oQueFiz}</p>

        <div className={style.containerOqueFarei}>
          <span className={`material-symbols-outlined ${style.iconeOqueFarei}`}>rocket_launch</span>
          <label htmlFor="#" className={style.textoOqueFarei}>O que farei</label>
        </div>
        <p>{daily.oQueFarei}</p>

        <div className={style.containerImpedimentos}>
          <span className={`material-symbols-outlined ${style.iconeImpedimentos}`}>warning</span>
          <label htmlFor="#" className={style.textoImpedimentos}>Impedimentos</label>
        </div>
        <p>{daily.impedimentos}</p>
      </div>
    </div>
  )
}
