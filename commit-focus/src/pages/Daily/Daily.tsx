import { Link } from 'react-router-dom';
import style from './Daily.module.css';

export function Daily() {
  return (
    <main>
      <h1 className={style.tituloDaily}>Registre sua nova daily</h1>

      <div className={style.containerHeaderDaily}>
        <label htmlFor="data">Data de referência:</label>
        <div className={style.containerData}>
          <input type="date" id='data' className={style.campoData}/>

          <Link
            to="/daily/historico"
            className={style.btnHistorico}
          >
            Ver histórico de dailys
            <span className={`material-symbols-outlined ${style.iconeSetaHistorico}`}>arrow_right_alt</span>
          </Link>
        </div>
      </div>

      <form action="" className={style.containerForm}>
        <div className={style.containerOqueFiz}>
          <div className={style.labelOquefiz}>
            <span className={`material-symbols-outlined ${style.iconeOqueFiz}`}>check_circle</span>
            <label htmlFor='oQueFiz'>O que fiz</label>
          </div>
          <p>Use verbos de ação para descrever suas entregas concluídas (ex: implementei, corrigi, revisei...).</p>

          <textarea name="oQueFiz" id="oQueFiz" placeholder='Ex: implementei a autenticação via token e revisei o PR # 42...'></textarea>
          
        </div>

        <div className={style.containerOqueFarei}>
          <div className={style.labelOqueFarei}>
            <span className={`material-symbols-outlined ${style.iconeOqueFarei}`}>rocket_launch</span>
            <label htmlFor='oQueFarei'>O que farei</label>
          </div>
          <p>Planejamento imediato do dia ou do próximo ciclo da Sprint.</p>

          <textarea name="oQueFarei" id="oQueFarei" placeholder='Ex: Vou finalizar a tela de cadastro e iniciar os teste de integração...'></textarea>
          
        </div>

        <div className={style.containerImpedimentos}>
          <div className={style.labelImpedimentos}>
            <span className={`material-symbols-outlined ${style.iconeImpedimentos}`}>warning</span>
            <label htmlFor='impedimentos'>Impedimentos</label>
          </div>
          <p>Se deixar em branco, será registrado como "Nenhum bloqueio".</p>

          <textarea name="impedimentos" id="impedimentos" placeholder='Ex: Aguardando acesso ao ambiente de homologação...'></textarea>

        </div>

        <button className={style.btnRegistrar}>Registrar daily</button>
      </form>

    </main>
  )
}
