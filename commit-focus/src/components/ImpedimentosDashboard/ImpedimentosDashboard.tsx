import style from './ImpedimentosDashboard.module.css';

interface ImpedimentosProps {
  textoP: string;
  dataHorario: string;
}

export function ImpedimentosDashboard({ textoP, dataHorario }: ImpedimentosProps) {
  return (
    <div className={style.containerImpedimentos}>
      <p>{textoP}</p>
      <span>{dataHorario}</span>
    </div>
  )
}
