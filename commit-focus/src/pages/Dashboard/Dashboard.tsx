import { CardDashboardDaily } from '../../components/CardDashboardDaily/CardDashboardDaily';
import style from './Dashboard.module.css';

export function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <p>Acompanhe suas métricas de produtividade e consistência.</p>

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
    </main>
  )
}
