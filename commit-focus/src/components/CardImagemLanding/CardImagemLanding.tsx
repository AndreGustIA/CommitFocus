import style from './CardImagemLanding.module.css';


interface CardImagemLandingProps {
  fraseUppercase: string;
  titulo: string;
  descricao: string;
  imagem?: string;
}

export function CardImagemLanding({ fraseUppercase, titulo, descricao, imagem }: CardImagemLandingProps) {
  return (
    <div className={style.cardImagemLanding}>
      <span className={style.fraseUppercase}>{fraseUppercase}</span>
      <div className={style.containerContent}>
        <div className={style.textos}>
          <h2 className={style.titulo}>{titulo}</h2>
          <p className={style.descricao}>{descricao}</p>
        </div>

        <div className={style.quadroImagem}>
          <img src={imagem} alt="Imagem ilustrativa" />
        </div>
      </div>
    </div>
  );
}
