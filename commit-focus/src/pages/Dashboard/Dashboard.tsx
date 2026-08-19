import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { taskService, dailyService } from '../../services/api';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CardDashboardDaily } from '../../components/CardDashboardDaily/CardDashboardDaily';
import GraficoTarefas from '../../components/GraficoTarefas/GraficoTarefas';
import { ImpedimentosDashboard } from '../../components/ImpedimentosDashboard/ImpedimentosDashboard';
import style from './Dashboard.module.css';
import { MiniCardTarefasDashboard } from '../../components/MiniCardTarefasDashboard/MiniCardTarefasDashboard';
import type { Task } from '../../types/task';
import type { Daily } from '../../types/daily';
import { CardHistoricoDaily } from '../../components/CardHistoricoDaily/CardHistoricoDaily';

function contarItens(texto: string) {
  if (!texto || texto === 'Nenhum bloqueio') return 0;
  return texto.split('\n').filter(linha => linha.trim() !== '').length;
}

function calcularDiasSeguidos(dailysLista: Daily[]) {
  if (dailysLista.length === 0) return 0;

  const datasUnicas = [...new Set(dailysLista.map(d => d.dataReferencia.split('T')[0]))];

  let streak = 0;

  const hojeDate = new Date();
  const hojeStr = `${hojeDate.getFullYear()}-${String(hojeDate.getMonth() + 1).padStart(2, '0')}-${String(hojeDate.getDate()).padStart(2, '0')}`;

  const ontemDate = new Date();
  ontemDate.setDate(ontemDate.getDate() - 1);
  const ontemStr = `${ontemDate.getFullYear()}-${String(ontemDate.getMonth() + 1).padStart(2, '0')}-${String(ontemDate.getDate()).padStart(2, '0')}`;

  let dataVerificacao: Date;

  if (datasUnicas.includes(hojeStr)) {
    dataVerificacao = hojeDate;
  } else if (datasUnicas.includes(ontemStr)) {
    dataVerificacao = ontemDate;
  } else {
    return 0;
  }

  while (true) {
    const dataStr = `${dataVerificacao.getFullYear()}-${String(dataVerificacao.getMonth() + 1).padStart(2, '0')}-${String(dataVerificacao.getDate()).padStart(2, '0')}`;
    
    if (datasUnicas.includes(dataStr)) {
      streak++;
      dataVerificacao.setDate(dataVerificacao.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export function Dashboard() {
  const [tarefas, setTarefas] = useState<Task[]>([]);
  const [tarefasSendoConcluidas, setTarefasSendoConcluidas] = useState<string[]>([]);
  const [dailys, setDailys] = useState<Daily[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const dadosTarefas = await taskService.getAll();
        setTarefas(dadosTarefas);

        const dadosDailys = await dailyService.getAll();
        setDailys(dadosDailys);

      } catch (error) {
        console.error('Erro ao buscar dados para o dashboard', error);
      }
    }

    carregarDados();
  }, []);

  const totalTarefas = tarefas.length;
  const tarefasConcluidas = tarefas.filter(tarefa => tarefa.status === 'CONCLUIDA').length;
  const tarefasPendentesCount = totalTarefas - tarefasConcluidas;

  const porcentagem = totalTarefas === 0
  ? 0
  : Math.round((tarefasConcluidas / totalTarefas) * 100);

  const proximasPendentes = tarefas.filter(tarefas => tarefas.status !== 'CONCLUIDA').slice(0, 3);

  const dailyRecentes = dailys.slice(0,3);

  const totalDailys = dailys.length;
  let totalEntregas = 0;
  let totalPlanejamentos = 0;
  let totalImpedimentos = 0;

  dailys.forEach(daily => {
    totalEntregas += contarItens(daily.oQueFiz);
    totalPlanejamentos += contarItens(daily.oQueFarei);
    totalImpedimentos += contarItens(daily.impedimentos);
  });

  const diasSeguidos = calcularDiasSeguidos(dailys);

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

  const dailysOrdenadasPorData = [...dailys].sort(
    (a, b) => new Date(b.dataReferencia).getTime() - new Date(a.dataReferencia).getTime()
  );

  const listaDeImpedimentos: { id: string; texto: string; dataFormatada: string }[] = [];

  dailysOrdenadasPorData.forEach(daily => {
    if (daily.impedimentos && daily.impedimentos !== 'Nenhum bloqueio') {
      
      const apenasData = daily.dataReferencia.split('T')[0];
      const [ano, mes, dia] = apenasData.split('-');
      const dataSegura = new Date(Number(ano), Number(mes) - 1, Number(dia));
      const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      const dataFormatada = `${diasDaSemana[dataSegura.getDay()]} ${dia}/${mes}`;

      const linhasImpedimento = daily.impedimentos.split('\n').filter(linha => linha.trim() !== '');

      linhasImpedimento.forEach((linha, index) => {
        listaDeImpedimentos.push({
          id: `${daily.id}-${index}`,
          texto: linha.trim(),
          dataFormatada: dataFormatada
        });
      });
    }
  });

  const impedimentosRecentes = listaDeImpedimentos.slice(0, 3);

  return (
    <main>
      <div className={style.containerHeader}>
        <h1>Dashboard</h1>
        <div className={style.subtituloEContagem}>
          <p>Acompanhe suas métricas de produtividade e consistência.</p>
          <div className={style.contagem}>
            <span className={`material-symbols-outlined ${style.iconeContagem}`}>mode_heat</span>
            <p className={style.contagemNumero}>
              <span className={style.numeroDestaque}>{diasSeguidos}</span> dias seguidos
            </p>
          </div>  
        </div>
      </div>

      <div className={style.containerCardDaily}>
        <CardDashboardDaily 
          titulo='Dailys registradas'
          quantidade={totalDailys.toString()}
          textoInferior='no período'
          icone='event_available'
        />

        <CardDashboardDaily 
          titulo='Entregas concluídas'
          quantidade={totalEntregas.toString()}
          textoInferior='itens em "O que fiz"'
          icone='check_circle'
          corVariante='verde'
        />

        <CardDashboardDaily 
          titulo='Planejamentos'
          quantidade={totalPlanejamentos.toString()}
          textoInferior='itens em "O que farei"'
          icone='rocket_launch'
          corVariante='azul'
        />

        <CardDashboardDaily 
          titulo='Impedimentos'
          quantidade={totalImpedimentos.toString()}
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
            {impedimentosRecentes.length > 0 ? (
              impedimentosRecentes.map(impedimento => (
                <ImpedimentosDashboard 
                  key={impedimento.id}
                  textoP={impedimento.texto}
                  dataHorario={impedimento.dataFormatada}
                />
              ))
            ) : (
              <div className={style.semImpedimentos}>
                <span className={`material-symbols-outlined ${style.iconeSemImpedimentos}`}>task_alt</span>
                <p>Caminho livre! Nenhum impedimento recente.</p>
              </div>
            )}
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

          <div className={style.listaDeDailysRecentes}>
            {dailyRecentes.length > 0 ? (
              dailyRecentes.map(daily => (
                <CardHistoricoDaily 
                  key={daily.id}
                  daily={daily}
                  modoDashboard={true}
                />
              ))
            ) : (
              <div className={style.containerSemDailyRegistrada}>
                <span className={`material-symbols-outlined ${style.iconeSemDailyRecentes}`}>event_busy</span>
                <p className={style.textoSemDailys}>Nenhuma daily registrada recentemente.</p>
              </div>  
            )}
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

                    <span className={`${style.textoTarefaDashboard} ${estaSendoConcluida ? style.textoRiscado : ''}`}>
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
