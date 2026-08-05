import style from './Footer.module.css';

export function Footer() {
  return (
    <>
      <footer className={style.footerSite}>
        <div className={style.containerFooter}>
          <hr />
          <div className={style.textoFooterSite}>
            <span>&copy; 2026 Copyright. Todos os direitos reservados</span>
          </div>  
        </div>
      </footer>
    </>
  )
}