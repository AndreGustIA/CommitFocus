import { CardDashboardDaily } from '../../components/CardDashboardDaily/CardDashboardDaily';
import GraficoTarefas from '../../components/GraficoTarefas/GraficoTarefas';
import { ImpedimentosDashboard } from '../../components/ImpedimentosDashboard/ImpedimentosDashboard';
import style from './Dashboard.module.css';

export function Dashboard() {
  return (
    <main>
      <div className={style.containerHeader}>
        <h1>Dashboard</h1>
        <div className={style.subtituloEContagem}>
          <p>Acompanhe suas métricas de produtividade e consistência.</p>
          <div className={style.contagem}>
            <span className={`material-symbols-outlined ${style.iconeContagem}`}>mode_heat</span>
            <p className={style.contagemNumero}><span className={style.numeroDestaque}>7</span> dias seguidos</p>
          </div>  
        </div>
      </div>

      <div className={style.containerCardDaily}>
        <CardDashboardDaily 
          titulo='Dailys registradas'
          quantidade='6'
          textoInferior='no período'
          icone='event_available'
        />

        <CardDashboardDaily 
          titulo='Entregas concluídas'
          quantidade='11'
          textoInferior='itens em "O que fiz"'
          icone='check_circle'
          corVariante='verde'
        />

        <CardDashboardDaily 
          titulo='Planejamentos'
          quantidade='10'
          textoInferior='itens em "O que farei"'
          icone='rocket_launch'
          corVariante='azul'
        />

        <CardDashboardDaily 
          titulo='Impedimentos'
          quantidade='3'
          textoInferior='bloqueios registrados'
          icone='warning'
          corVariante='vermelho'
        />
      </div>

      <div className={style.secaoGraficoEImpedimentos}>
        <div className={style.containerGrafico}>
          <div className={style.headerGrafico}>
            <div className={style.headerSubtitulo}>
              <h4>Atividade por dia</h4>
              <p>Itens registrados em cada seção da daily</p>
            </div>

            <div className={style.containerInfos}>
              <p><span className={style.pontoVerde}>&bull;</span> O que fiz</p>
              <p><span className={style.pontoAzul}>&bull;</span> O que farei</p>
              <p><span className={style.pontoVermelho}>&bull;</span> Impedimentos</p>
            </div>
          </div>

          <div className={style.grafico}>
            <GraficoTarefas />
          </div>
        </div>

        <div className={style.containerImpedimentos}>
          <div className={style.headerImpedimentos}>
            <span className={`material-symbols-outlined ${style.impedimentosDash}`}>warning</span>
            <p>Impedimentos</p>
          </div>

          <div className={style.containerCardsImpedimentos}>
            <ImpedimentosDashboard 
              textoP='Aguardando acesso ao ambiente de homologação'
              dataHorario='Seg 10/08'
            />
            
            <ImpedimentosDashboard 
              textoP='Aguardando acesso ao ambiente de homologação'
              dataHorario='Seg 10/08'
            />

            <ImpedimentosDashboard 
              textoP='Aguardando acesso ao ambiente de homologação'
              dataHorario='Seg 10/08'
            />
          </div>
          
        </div>
      </div>
    </main>
  )
}
