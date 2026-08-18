import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { taskService } from '../../services/api';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CardDashboardDaily } from '../../components/CardDashboardDaily/CardDashboardDaily';
import GraficoTarefas from '../../components/GraficoTarefas/GraficoTarefas';
import { ImpedimentosDashboard } from '../../components/ImpedimentosDashboard/ImpedimentosDashboard';
import style from './Dashboard.module.css';
import { MiniCardTarefasDashboard } from '../../components/MiniCardTarefasDashboard/MiniCardTarefasDashboard';
import type { Task } from '../../types/task';

export function Dashboard() {
  const [tarefas, setTarefas] = useState<Task[]>([]);
  const [tarefasSendoConcluidas, setTarefasSendoConcluidas] = useState<string[]>([]);

  useEffect(() => {
    async function carregarTarefas() {
      try {
        const dados = await taskService.getAll();
        setTarefas(dados);

      } catch (error) {
        console.error('Erro ao buscar tarefas para o dashboard', error);
      }
    }

    carregarTarefas();
  }, []);

  const totalTarefas = tarefas.length;
  const tarefasConcluidas = tarefas.filter(tarefa => tarefa.status === 'CONCLUIDA').length;
  const tarefasPendentesCount = totalTarefas - tarefasConcluidas;

  const porcentagem = totalTarefas === 0
  ? 0
  : Math.round((tarefasConcluidas / totalTarefas) * 100);

  const proximasPendentes = tarefas.filter(tarefas => tarefas.status !== 'CONCLUIDA').slice(0, 3);

  async function onToggleTask(id: string, statusAtual: boolean) {
    await taskService.toggleCompletion(id, !statusAtual);
    const dadosAtualizado = await taskService.getAll();
    setTarefas(dadosAtualizado);
  }

  function concluirComAtraso(id: string) {
    setTarefasSendoConcluidas(prev => [...prev, id]);

    setTimeout(async () => {
      await onToggleTask(id, false);
      setTarefasSendoConcluidas(prev => prev.filter(taskId => taskId !== id));
    }, 500);
  }

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

      <div className={style.secaoDailyETarefas}>
        <div className={style.containerDailysRecentes}>
          <div className={style.topoDailyRecentes}>
            <h1>Dailys recentes</h1>
            <Link
              to="/daily/historico"
              className={style.btnVerHistorico}
            >
              Ver histórico
            </Link>
          </div>

        </div>

        <div className={style.containerTarefasDashboard}>
          <div className={style.topoTarefas}>
            <h1>Tarefas</h1>
            <p>Progresso das tarefas</p>
          </div>

          <Link
            to="/tarefas"
            className={style.btnVerTodasTarefas}
          >
            Ver todas
            <span className={`material-symbols-outlined ${style.iconeVerTodasTarefas}`}>arrow_right_alt</span>
          </Link>

          <div className={style.containerMiniCardsTarefas}>
            <MiniCardTarefasDashboard 
              texto='Total'
              quantidade={totalTarefas.toString()}
              icone='list'
              corVariante='padrao'
            />

            <MiniCardTarefasDashboard
              texto='Pendentes'
              quantidade={tarefasPendentesCount.toString()}
              icone='progress_activity'
              corVariante='azul'
            />
            
            <MiniCardTarefasDashboard
              texto='Conluídas'
              quantidade={tarefasConcluidas.toString()}
              icone='check_circle'
              corVariante='verde'
            />
          </div>

          <div className={style.containerProgresso}>
            <div className={style.cabecalhoProgresso}>
              <p>Conclusão</p>
              <span>{porcentagem}%</span>
            </div>

            <div className={style.barraFundo}>
              <div className={style.barraPreenchimento} style={{ width: `${porcentagem}%` }} ></div>
            </div>
          </div>

          <div className={style.listaProximaPendentes}>
            <h3 className={style.tituloProximo}>Próximas Pendentes</h3>

            <div className={style.cardsContainer}>
              {proximasPendentes.length > 0 ? (
                proximasPendentes.map(tarefa => {
                  const estaSendoConcluida = tarefasSendoConcluidas.includes(tarefa.id);

                  return (
                    <label key={tarefa.id} className={style.linhaTarefaDashboard}>
                    <Checkbox.Root 
                      className={style.checkboxDashboard}
                      checked={estaSendoConcluida}
                      onCheckedChange={() => concluirComAtraso(tarefa.id)}
                    >
                      <Checkbox.Indicator className={style.checkboxIndicatorDashboard}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </Checkbox.Indicator>
                    </Checkbox.Root>

                    <span className={`${style.textoTarefaDashboard} ${estaSendoConcluida ? style.textoRiscado : ''} }`}>
                      {tarefa.titulo}
                    </span>
                  </label>
                  )
                })

              ) : (
                <p className={style.textoSemTarefas}>Nenhuma tarefa pendente!</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
