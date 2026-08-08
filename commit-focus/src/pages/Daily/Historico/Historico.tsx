import style from './Histoico.module.css'
import { CardHistoricoDaily } from "../../../components/CardHistoricoDaily/CardHistoricoDaily";

export function Historico() {
  return(
    <main className={style.containerMain}>
      <h1>Histórico de dailys</h1>
      <div className={style.secaoCards}>
        <CardHistoricoDaily />
        <CardHistoricoDaily />
        <CardHistoricoDaily />
        <CardHistoricoDaily />
        <CardHistoricoDaily />
        <CardHistoricoDaily />
        <CardHistoricoDaily />
        <CardHistoricoDaily />
        <CardHistoricoDaily />
      </div>  
    </main>
  )
}