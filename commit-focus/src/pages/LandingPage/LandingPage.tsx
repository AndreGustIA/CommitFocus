import style from './LandingPage.module.css';
import imgDashboard from '../../assets/images/img-dashboard.png';

export function LandingPage() {
  return (
    <div className={style.container}>
      <div className={style.contentLanding}>
        <header className={style.headerLanding}>
          <h1>CommitFocus</h1>

          <div className={style.navLinks}>
            <a href="#">Como funciona</a>
            <a href="#">Recursos</a>
          </div>

          <div className={style.ctaButtons}>
            <a className={style.botaoEntrar} href="#">
              Entrar
            </a>
            <a className={style.botaoComecar} href="#">
              Começar agora
            </a>
          </div>
        </header>

        <main>
          <section className={style.secaoPrincipal}>
            <div className={style.containerPrincipalTexto}>

              <div className={style.tagSecaoPrincipal}>
                <span className={`material-symbols-outlined ${style.iconeTag}`}>rocket_launch</span>
                <p>Produtividade ágil & foco diário</p>
              </div>

              <h1 className={style.tituloSecaoPrincipal}>
                Menos tempo lembrando o que codou. <br />
                <span>Suas dailies e tarefas em um só lugar.</span>
              </h1>

              <p className={style.subtituloSecaoPrincipal}>
                Acompanhe suas entregas diárias, registre bloqueios e mantenha suas próximas implementações organizadas sem a burocracia de ferramentas pesadas.
              </p>

              <div className={style.botoesSecaoPrincipal}>
                <a href="#" className={style.botaoAbrirMeuEspaco}>
                  Abrir meu espaço
                  <span className={`material-symbols-outlined ${style.iconeBotao}`}>arrow_forward</span>
                </a>

                <a href="#" className={style.botaoVerComoFunciona}>
                  Ver como funciona
                </a>
              </div>

              <div className={style.finalSecaoPrincipal}>
                <span className={`material-symbols-outlined ${style.iconeFinal}`}>check</span>
                <p className={style.textoFinal}>Histórico organizado & Tarefas</p>
              </div>
            </div>

            <div className={style.containerPrincipalImagem}>
              <div className={style.containerImagens}>
                <img className={style.imgDashboard} src={imgDashboard} alt="Imagem da dashboard do CommitFocus" />
              </div>
            </div>
          </section>
        </main>
        
      </div>
    </div>
  );
}
