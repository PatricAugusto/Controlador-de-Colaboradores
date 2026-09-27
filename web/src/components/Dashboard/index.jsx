import React, { useMemo } from 'react';
import { Users, CheckCircle2, Clock, Award, TrendingUp } from 'lucide-react';
import * as S from './styles';

export function Dashboard({ contractors = [], tasks = [] }) {
  const metrics = useMemo(() => {
    const totalContractors = contractors.length;
    const completedTasks = tasks.filter((t) => t.status === 'COMPLETED').length;
    const pendingTasks = tasks.filter((t) => t.status === 'PENDING').length;
    const totalPointsAwarded = contractors.reduce((acc, curr) => acc + (curr.points || 0), 0);

    return {
      totalContractors,
      completedTasks,
      pendingTasks,
      totalPointsAwarded,
      totalTasks: tasks.length,
    };
  }, [contractors, tasks]);

  const contractorStats = useMemo(() => {
    return contractors.map((contractor) => {
      const contractorTasks = tasks.filter((t) => t.contractor_id === contractor.id);
      const total = contractorTasks.length;
      const done = contractorTasks.filter((t) => t.status === 'COMPLETED').length;
      const percentage = total > 0 ? Math.round((done / total) * 100) : 0;

      return {
        ...contractor,
        totalTasks: total,
        completedTasks: done,
        completionRate: percentage,
      };
    });
  }, [contractors, tasks]);

  return (
    <S.Container>
      {/* Cards de KPIs */}
      <S.MetricsGrid>
        <S.MetricCard>
          <div className="info">
            <span>Terceirizados</span>
            <h3>{metrics.totalContractors}</h3>
          </div>
          <div className="icon-box">
            <Users size={22} />
          </div>
        </S.MetricCard>

        <S.MetricCard>
          <div className="info">
            <span>Tarefas Pendentes</span>
            <h3>{metrics.pendingTasks}</h3>
          </div>
          <div className="icon-box">
            <Clock size={22} />
          </div>
        </S.MetricCard>

        <S.MetricCard>
          <div className="info">
            <span>Tarefas Concluídas</span>
            <h3>{metrics.completedTasks}</h3>
          </div>
          <div className="icon-box">
            <CheckCircle2 size={22} />
          </div>
        </S.MetricCard>

        <S.MetricCard>
          <div className="info">
            <span>Pontos Concedidos</span>
            <h3>{new Intl.NumberFormat('pt-BR').format(metrics.totalPointsAwarded)}</h3>
          </div>
          <div className="icon-box">
            <Award size={22} />
          </div>
        </S.MetricCard>
      </S.MetricsGrid>

      {/* Visão Detalhada */}
      <S.SectionGrid>
        {/* Progresso dos Terceirizados */}
        <S.Panel>
          <h2>Acompanhamento por Colaborador</h2>
          <S.ContractorProgressList>
            {contractorStats.length === 0 ? (
              <p style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>
                Nenhum colaborador cadastrado para exibir métricas.
              </p>
            ) : (
              contractorStats.map((c) => (
                <S.ContractorProgressItem key={c.id}>
                  <div className="header">
                    <div className="name-role">
                      <strong>{c.name}</strong>
                      <span>{c.role}</span>
                    </div>
                    <div className="stats">
                      {c.completedTasks}/{c.totalTasks} entregas ({c.completionRate}%)
                    </div>
                  </div>
                  <div className="track">
                    <div className="bar" style={{ width: `${c.completionRate}%` }} />
                  </div>
                </S.ContractorProgressItem>
              ))
            )}
          </S.ContractorProgressList>
        </S.Panel>

        {/* Resumo de Status de Tarefas */}
        <S.Panel>
          <h2>Visão Geral de Demandas</h2>
          <S.TaskStatusOverview>
            <S.StatusRow>
              <div className="label">
                <TrendingUp size={18} />
                <span>Total de Demandas</span>
              </div>
              <span className="badge">{metrics.totalTasks}</span>
            </S.StatusRow>

            <S.StatusRow>
              <div className="label">
                <Clock size={18} />
                <span>Em Andamento / Pendente</span>
              </div>
              <span className="badge">{metrics.pendingTasks}</span>
            </S.StatusRow>

            <S.StatusRow>
              <div className="label">
                <CheckCircle2 size={18} />
                <span>Finalizadas</span>
              </div>
              <span className="badge">{metrics.completedTasks}</span>
            </S.StatusRow>
          </S.TaskStatusOverview>
        </S.Panel>
      </S.SectionGrid>
    </S.Container>
  );
}

export default Dashboard;