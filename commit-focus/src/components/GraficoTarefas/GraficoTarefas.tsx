import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceArea
} from 'recharts';

interface ITarefa {
  dia: string;
  data: string;
  fiz: number;
  farei: number;
  impedimentos: number;
  id: number;
}

const dadosIniciais: ITarefa[] = [
  { dia: 'Qui', data: '06/08', fiz: 2, farei: 1, impedimentos: 0, id: 1 },
  { dia: 'Sex', data: '07/08', fiz: 1, farei: 2, impedimentos: 1, id: 2 },
  { dia: 'Sáb', data: '08/08', fiz: 2, farei: 1, impedimentos: 0, id: 3 },
  { dia: 'Dom', data: '09/08', fiz: 2, farei: 1, impedimentos: 2, id: 4 },
  { dia: 'Seg', data: '10/08', fiz: 2, farei: 2, impedimentos: 0, id: 5 },
  { dia: 'Ter', data: '11/08', fiz: 5, farei: 3, impedimentos: 1, id: 6 },
];

interface IPayloadItem {
  color: string;
  name: string;
  value: number;
  payload: ITarefa;
}

interface ICustomTooltipProps {
  active?: boolean;
  payload?: IPayloadItem[];
  label?: string;
}

const CustomTooltip = ({ active, payload }: ICustomTooltipProps) => {
  if (active && payload && payload.length) {
    const dadosDia = payload[0].payload;
    
    return (
      <div style={{
        backgroundColor: 'var(--cor-bg-secundario)',
        border: '1px solid var(--cor-bordas-principal)',
        padding: '12px',
        borderRadius: '8px',
        color: 'var(--cor-letra-principal)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
        minWidth: '150px'
      }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>
          {`${dadosDia.dia} ${dadosDia.data}`}
        </p>
        
        
        {payload.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '8px', height: '8px', borderRadius: '50%', 
                backgroundColor: item.color, marginRight: '8px' 
              }} />
              <span style={{ fontSize: '13px' }}>{item.name}</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 'bold', marginLeft: '12px' }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default function GraficoTarefas() {
  const [dados, setDados] = useState<ITarefa[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        setDados(dadosIniciais);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, []);

  if (carregando) return <p style={{ color: 'var(--cor-letra-principal)' }}>Carregando gráfico...</p>;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '260px', fontFamily: 'var(--fonte-principal)'}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={dados}
          margin={{ top: 0, right: 0, left: 0, bottom: 5 }}
          style={{ backgroundColor: 'transparent' }} 
        >
          <CartesianGrid 
            strokeWidth={1} 
            stroke="var(--cor-bordas-principal)" 
            horizontal={true}  
            vertical={false}
          />
          
          <XAxis 
            dataKey="id" 
            tickFormatter={(_, index) => dados[index] ? `${dados[index].dia} ${dados[index].data}` : ''}
            axisLine={true}
            tickLine={true}
            tick={{ fill: 'var(--cor-letra-secundaria)', fontSize: '12px', fontWeight: '400' }}
            />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={() => ''}
            domain={[0, 'dataMax + 1']}
            width={0}
            tickCount={5}
          />
          
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: 'var(--cor-hover-grafico-tooltip)', opacity: 0.7}}
          />

          <ReferenceArea x1={1} x2={2} fill="transparent" />
          <ReferenceArea x1={3} x2={4} fill="transparent" />
          <ReferenceArea x1={5} x2={6} fill="transparent" />

          <Bar dataKey="fiz" name="O que fiz" fill="#22c55e" radius={[3, 3, 0, 0]} barSize={25} />
          <Bar dataKey="farei" name="O que farei" fill="#3b82f6" radius={[3, 3, 0, 0]} barSize={25} />
          <Bar dataKey="impedimentos" name="Impedimentos" fill="#ef4444" radius={[3, 3, 0, 0]} barSize={25} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
