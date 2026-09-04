import style from './LandingPage.module.css';
import imgDashboard from '../../assets/images/img-dashboard.png';
import imgDaily from '../../assets/images/img-daily.png';
import imgTarefas from '../../assets/images/img-tarefas.png'
import { CardImagemLanding } from '../../components/CardImagemLanding/CardImagemLanding';

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

          <section>
            <div className={style.containerFluxo}>
              <span className={style.tagFraseSimples}>Um fluxo simples</span>
              <h1>Seu trabalho, sem ruído</h1>

              <div className={style.containerCards}>
                <div className={style.containerCardsFluxo}>
                  <span className={`material-symbols-outlined ${style.iconeCheck}`}>check_circle</span>
                  <h4>Registre o que entregou</h4>
                  <p>Chega de reuniões diárias perdidas tentando lembrar o que você fez ontem. Registre em segundos e tenha tudo pronto.</p>
                </div>

                <div className={style.containerCardsFluxo}>
                  <span className={`material-symbols-outlined ${style.iconeRocket}`}>rocket_launch</span>
                  <h4>Planeja o próximo passo</h4>
                  <p>Mantenha as tarefas visíveis, priorizadas e prontas para executar.</p>
                </div>

                <div className={style.containerCardsFluxo}>
                  <span className={`material-symbols-outlined ${style.iconeWarning}`}>warning</span>
                  <h4>Bloqueios visíveis</h4>
                  <p>Identifique impedimentos no momento em que eles acontecem para que nada trave suas entregas.</p>
                </div>
              </div>
            </div>

            <div className={style.containerConsistencia}>
              <span className={style.tagFraseSimples}>Feito para Consistência</span>
              <h1>A cadência que transforma <br /> atividade em progresso.</h1>

              <CardImagemLanding 
                fraseUppercase="METODLOGIA ÁGIL"
                titulo="O formato clássico que você já conhece, sem complicação"
                descricao="Três blocos pensados exatamente para o fluxo de desenvolvimento: registre o que foi concluído, defina as metas do próximo ciclo e aponte impedimentos de forma direta."
                imagem={imgDaily}
              />

              <CardImagemLanding
                className={style.cardMeio}
                fraseUppercase='Foco e execução'
                titulo='Uma lista de afazeres rápida, sem distrações'
                descricao='Adicione tarefas com um clique, filtre pelo que está pendente ou concluído e mantenha a cabeça focada no código, não na burocracia do gerenciador.'
                imagem={imgTarefas}
              />

              <CardImagemLanding 
                fraseUppercase='Visão geral'
                titulo='Métricas reais para acompanhar seu ritmo'
                descricao='Visualize sua taxa de conclusão, gráfico de atividade por dia e histórico de impedimentos em um único painel escuro e confortável.'
                imagem={imgDashboard}
              />
            </div>
          </section>

          <section className={style.secaoFinalLanding}>
            <div className={style.containerFinalLanding}>
              <span className={style.tagFinal}>Proto para focar?</span>
              <h1>Comece cada dia sabendo exatamente <br /> o que importa.</h1>
            </div>
            <a className={style.btnFinal} href="#">Entrar no CommitFocus
              <span className={`material-symbols-outlined ${style.setaDireita}`}>arrow_forward</span>
            </a>
          </section>
        </main>

        <footer className={style.footerLanding}>
          <div className={style.containerTopoFooter}>
            <h4>CommitFocus</h4>
            <span>daily + tarefas, em foco.</span>
          </div>
          <div className={style.containerDireitosFooter}>
            <p>organização diária e consistência para desenvolvedores.</p>

            <p>&copy; 2026 Copyright. Todos os direitos reservados.</p>
          </div>

          <div className={style.textoFinalFooter}>
            <h1>CommitFocus</h1>
          </div>
        </footer>
        
      </div>
    </div>
  );
}
