import { Download, FileText, CheckCircle2, Clock, Award, BarChart3 } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import * as S from './styles';

const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#6366f1'];

export function Reports({ contractors = [], tasks = [] }) {
  // 1. Cálculos de Métricas Gerais
  const completedTasks = tasks.filter((t) => t.status === 'COMPLETED');
  const completionRate = tasks.length > 0
    ? Math.round((completedTasks.length / tasks.length) * 100)
    : 0;

  const totalPointsDistributed = contractors.reduce((acc, c) => acc + (c.points || 0), 0);

  const avgPointsPerTask = completedTasks.length > 0
    ? (completedTasks.reduce((acc, t) => acc + (t.points_reward || 0), 0) / completedTasks.length).toFixed(1)
    : 0;

  // 2. Dados para Gráfico de Distribuição de Pontos por Terceirizado
  const pointsDistributionData = contractors.map((c) => ({
    name: c.name,
    points: c.points || 0,
  }));

  // 3. Dados para Evolução Temporal de Conclusão de Tarefas
  const timelineDataMap = tasks.reduce((acc, task) => {
    const date = task.created_at
      ? new Date(task.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
      : 'Outros';

    if (!acc[date]) {
      acc[date] = { date, criadas: 0, concluidas: 0 };
    }

    acc[date].criadas += 1;
    if (task.status === 'COMPLETED') {
      acc[date].concluidas += 1;
    }

    return acc;
  }, {});

  const timelineData = Object.values(timelineDataMap).reverse();

  // 4. Exportação CSV
  const handleExportCSV = () => {
    const headers = ['ID,Nome,Cargo,Pontos Acumulados,Tarefas Concluídas\n'];
    const rows = contractors.map((c) => {
      const cTasks = completedTasks.filter((t) => t.contractor_id === c.id).length;
      return `"${c.id}","${c.name}","${c.role || '-'}","${c.points}","${cTasks}"\n`;
    });

    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `relatorio_fechamento_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <S.Container>
      <S.Header>
        <h2><BarChart3 size={22} /> Relatórios & Fechamento de Sprint</h2>
        <S.Actions>
          <button onClick={handleExportCSV}>
            <Download size={16} /> Exportar CSV
          </button>
          <button className="primary" onClick={handlePrintPDF}>
            <FileText size={16} /> Imprimir / Salvar PDF
          </button>
        </S.Actions>
      </S.Header>

      <S.MetricsGrid>
        <S.MetricCard>
          <div className="icon-box"><CheckCircle2 size={22} /></div>
          <div className="content">
            <span>Taxa de Conclusão</span>
            <h3>{completionRate}%</h3>
          </div>
        </S.MetricCard>

        <S.MetricCard>
          <div className="icon-box"><Award size={22} /></div>
          <div className="content">
            <span>Pontos Distribuídos</span>
            <h3>{totalPointsDistributed} PTS</h3>
          </div>
        </S.MetricCard>

        <S.MetricCard>
          <div className="icon-box"><Clock size={22} /></div>
          <div className="content">
            <span>Média Pts/Tarefa</span>
            <h3>{avgPointsPerTask}</h3>
          </div>
        </S.MetricCard>
      </S.MetricsGrid>

      {/* Seção de Gráficos Recharts */}
      <S.ChartsGrid>
        <S.ChartSection>
          <h3>Evolução Temporal de Tarefas</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="colorCriadas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorConcluidas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" stroke="#a1a1aa" fontSize={12} />
              <YAxis stroke="#a1a1aa" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#121214', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Area type="monotone" dataKey="criadas" name="Criadas" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCriadas)" />
              <Area type="monotone" dataKey="concluidas" name="Concluídas" stroke="#10b981" fillOpacity={1} fill="url(#colorConcluidas)" />
            </AreaChart>
          </ResponsiveContainer>
        </S.ChartSection>

        <S.ChartSection>
          <h3>Distribuição de Pontos</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={pointsDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} />
              <YAxis stroke="#a1a1aa" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#121214', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Bar dataKey="points" name="Pontos" radius={[6, 6, 0, 0]}>
                {pointsDistributionData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </S.ChartSection>
      </S.ChartsGrid>

      <S.Section>
        <h3>Desempenho por Terceirizado</h3>
        <S.PerformanceTable>
          <thead>
            <tr>
              <th>Colaborador</th>
              <th>Cargo</th>
              <th>Tarefas Pendentes</th>
              <th>Tarefas Concluídas</th>
              <th>Pontuação Total</th>
            </tr>
          </thead>
          <tbody>
            {contractors.map((c) => {
              const cTasks = tasks.filter((t) => t.contractor_id === c.id);
              const completed = cTasks.filter((t) => t.status === 'COMPLETED').length;
              const pending = cTasks.length - completed;

              return (
                <tr key={c.id}>
                  <td><strong>{c.name}</strong></td>
                  <td>{c.role || 'Terceirizado'}</td>
                  <td>{pending}</td>
                  <td>{completed}</td>
                  <td><strong style={{ color: '#f59e0b' }}>{c.points} PTS</strong></td>
                </tr>
              );
            })}
          </tbody>
        </S.PerformanceTable>
      </S.Section>
    </S.Container>
  );
}

export default Reports;