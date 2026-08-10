import React, { useState } from 'react';
import { dailyService } from '../../services/api';
import { Toast, type ToastType } from '../../components/Toast/Toast';
import { Link } from 'react-router-dom';
import style from './Daily.module.css';

export function Daily() {
  const [dataReferencia, setDataReferencia] = useState('');
  const [oQueFiz, setOQueFiz] = useState('');
  const [oQueFarei, setOQueFarei] = useState('');
  const [impedimentos, setImpedimentos] = useState('');

  const [erros, setErros] = useState({
    data: false,
    oQueFiz: false,
    oQueFarei: false,
  })

  const [toast, setToast] = useState<{titulo: string; mensagem: string; tipo: ToastType} | null>(null);
  const exibirToast = (titulo: string, mensagem: string, tipo: ToastType) => {
    setToast({ titulo, mensagem, tipo });
  };

  async function lidarComEnvio(evento: React.FormEvent) {
    evento.preventDefault();

    const falhaData = !dataReferencia;
    const falhaFiz = !oQueFiz.trim();
    const falhaFarei = !oQueFarei.trim();

    setErros({
      data: falhaData,
      oQueFiz: falhaFiz,
      oQueFarei: falhaFarei,
    })

    if (falhaData || falhaFiz || falhaFarei) {
      exibirToast('Campos obrigatórios', 'Preencha os campos destacados em vermelho.', 'erro');
      return;
    }
    
    console.log("DADOS PRONTOS PARA O BACK-END:", {
      dataReferencia,
      oQueFiz,
      oQueFarei,
      impedimentos: impedimentos.trim() !== '' ? impedimentos : 'Nenhum bloqueio'
    });

    try {
      await dailyService.create({
        dataReferencia,
        oQueFiz,
        oQueFarei,
        impedimentos: impedimentos.trim() !== '' ? impedimentos : 'Nenhum bloqueio'
      });

      exibirToast('Sucesso', 'Sua daily foi registrada.', 'sucesso');

      setDataReferencia('');
      setOQueFiz('');
      setOQueFarei('');
      setImpedimentos('');

    } catch (erro) {
      console.error(erro);
      exibirToast('Erro', 'Não foi possível registrar a daily.', 'erro');
    }
  }


  return (
    <main>
      {toast && (
        <Toast 
          titulo={toast.titulo}
          mensagem={toast.mensagem}
          tipo={toast.tipo}
          onClose={() => setToast(null)}
        />
      )}

      <h1 className={style.tituloDaily}>Registre sua nova daily</h1>

      <form onSubmit={lidarComEnvio} className={style.containerForm}>

        <div className={style.containerHeaderDaily}>
          <label htmlFor="data">Data de referência:</label>
          <div className={style.containerData}>
            <input 
              type="date" 
              id='data' 
              className={`${style.campoData} ${erros.data ? style.campoComErro : ''}`}
              value={dataReferencia}
              onChange={(e) => {
                setDataReferencia(e.target.value)
                if (erros.data) setErros({ ...erros, data: false })
              }}
            />

            <Link
              to="/daily/historico"
              className={style.btnHistorico}
            >
              Ver histórico de dailys
              <span className={`material-symbols-outlined ${style.iconeSetaHistorico}`}>arrow_right_alt</span>
            </Link>
          </div>
        </div>

      
        <div className={style.containerOqueFiz}>
          <div className={style.labelOquefiz}>
            <span className={`material-symbols-outlined ${style.iconeOqueFiz}`}>check_circle</span>
            <label htmlFor='oQueFiz'>O que fiz</label>
          </div>
          <p>Use verbos de ação para descrever suas entregas concluídas (ex: implementei, corrigi, revisei...).</p>

          <textarea 
            name="oQueFiz" 
            id="oQueFiz"
            className={erros.oQueFiz ? style.campoComErro : ''}
            placeholder='Ex: implementei a autenticação via token e revisei o PR # 42...'
            value={oQueFiz}
            onChange={(e) => {
              setOQueFiz(e.target.value)
              if (erros.oQueFiz) setErros({ ...erros, oQueFiz: false });
            }}
          ></textarea>
          
        </div>

        <div className={style.containerOqueFarei}>
          <div className={style.labelOqueFarei}>
            <span className={`material-symbols-outlined ${style.iconeOqueFarei}`}>rocket_launch</span>
            <label htmlFor='oQueFarei'>O que farei</label>
          </div>
          <p>Planejamento imediato do dia ou do próximo ciclo da Sprint.</p>

          <textarea 
            name="oQueFarei" 
            id="oQueFarei"
            className={erros.oQueFarei ? style.campoComErro : ''}
            placeholder='Ex: Vou finalizar a tela de cadastro e iniciar os teste de integração...'
            value={oQueFarei}
            onChange={(e) => {
              setOQueFarei(e.target.value)
              if (erros.oQueFarei) setErros({ ...erros, oQueFarei: false });
            }}
          ></textarea>
          
        </div>

        <div className={style.containerImpedimentos}>
          <div className={style.labelImpedimentos}>
            <span className={`material-symbols-outlined ${style.iconeImpedimentos}`}>warning</span>
            <label htmlFor='impedimentos'>Impedimentos</label>
          </div>
          <p>Se deixar em branco, será registrado como "Nenhum bloqueio".</p>

          <textarea 
            name="impedimentos" 
            id="impedimentos" 
            placeholder='Ex: Aguardando acesso ao ambiente de homologação...'
            value={impedimentos}
            onChange={(e) => setImpedimentos(e.target.value)}
          ></textarea>

        </div>

        <button 
          type='submit'
          className={style.btnRegistrar}
        >Registrar daily</button>
      </form>

    </main>
  )
}
