import { useState, useEffect } from 'react';
import style from './Histoico.module.css'
import { CardHistoricoDaily } from "../../../components/CardHistoricoDaily/CardHistoricoDaily";
import { dailyService } from '../../../services/api';
import type { Daily } from '../../../types/daily';
import { Toast, type ToastType } from '../../../components/Toast/Toast';

export function Historico() {
  const [dailys, setDailys] = useState<Daily[]>([]);
  const [estaCarregando, setEstaCarregando] = useState(true);

  const [toast, setToast] = useState<{titulo: string; mensagem: string; tipo: ToastType} | null>(null);

  useEffect(() => {
    dailyService.getAll()
      .then((dados) => setDailys(dados))
      .catch((erro) => console.error('Erro ao carregar dailys:', erro))
      .finally(() => setEstaCarregando(false));
  }, []);

  async function deletarDaily(id: string) {
    try {
      await dailyService.delete(id);
      setDailys((dailysAtuais) => dailysAtuais.filter((daily) => daily.id !== id));
      setToast({titulo: 'Sucesso', mensagem: 'Daily deletada.', tipo: 'deletar'});

    } catch (erro) {
      console.error('Erro ao deletar:', erro);
      setToast({titulo: 'Erro', mensagem: 'Não foi possível deletar.', tipo: 'erro'})
    }
  }

  return(
    <main className={style.containerMain}>
      {toast && (
        <Toast
          titulo={toast.titulo}
          mensagem={toast.mensagem}
          tipo={toast.tipo}
          onClose={() => setToast(null)}
        />  
      )}
      <h1>Histórico de dailys</h1>
      <div className={style.secaoCards}>
        {estaCarregando ? (
          <p>Carregando histórico...</p>
        ) : dailys.length === 0 ? (
          <p>Nenhuma daily registrada ainda. falta desing quando não tiver Dailys</p>
        ) : (
          dailys.map((daily) => (
            <CardHistoricoDaily
              key={daily.id}
              daily={daily}
              onDelete={() => deletarDaily(daily.id)}
            />
          ))
        )}
      </div>  
    </main>
  )
}