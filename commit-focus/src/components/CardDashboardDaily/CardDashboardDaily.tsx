import style from './CardDashboardDaily.module.css';

interface CardsDailysProps {
  titulo: string;
  quantidade: string;
  textoInferior: string;
  icone: string;
  corVariante?: 'padrao' | 'verde' | 'azul' | 'vermelho';
}

export function CardDashboardDaily({ titulo, quantidade, textoInferior, icone, corVariante = 'padrao' }: CardsDailysProps) {

  return (
    <div className={`${style.container} ${style[corVariante]}`}>
      <div className={style.containerConteudo}>
        <div className={style.conteudo}>
          <h4>{titulo}</h4>
          <span className={style.valorNumero}>{quantidade}</span>
        </div>
        <span>{textoInferior}</span>
      </div>

      <span className={`material-symbols-outlined ${style.iconesDaily}`}>{icone}</span>
    </div>
  )
}
