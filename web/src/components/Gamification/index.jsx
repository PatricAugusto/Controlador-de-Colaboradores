import { useState } from 'react';
import { Trophy, Award, Activity, Flame, CheckCircle, Star, Zap } from 'lucide-react';
import * as S from './styles';

const DEFAULT_ACHIEVEMENTS = [
  { id: '1', title: 'Primeira Entrega', description: 'Entregou a primeira tarefa no prazo.', icon: CheckCircle, unlocked: true },
  { id: '2', title: 'Sprint Perfeita', description: 'Concluiu todas as tarefas da sprint.', icon: Zap, unlocked: true },
  { id: '3', title: 'Mestre das Tasks', description: 'Completou mais de 10 tarefas no mês.', icon: Star, unlocked: false },
  { id: '4', title: 'Top Performer', description: 'Alcançou o top 1 do ranking geral.', icon: Flame, unlocked: false },
];

export function Gamification({ contractors = [], activities = [] }) {
  const [period, setPeriod] = useState('all'); // 'weekly', 'monthly', 'all'

  // Ordena terceirizados pelo saldo de pontos
  const sortedContractors = [...contractors].sort((a, b) => (b.points || 0) - (a.points || 0));

  return (
    <S.Container>
      <S.Header>
        <h2><Trophy size={22} /> Gamificação & Conquistas</h2>
        <S.FilterGroup>
          <button className={period === 'weekly' ? 'active' : ''} onClick={() => setPeriod('weekly')}>Semanal</button>
          <button className={period === 'monthly' ? 'active' : ''} onClick={() => setPeriod('monthly')}>Mensal</button>
          <button className={period === 'all' ? 'active' : ''} onClick={() => setPeriod('all')}>Geral</button>
        </S.FilterGroup>
      </S.Header>

      <S.MainGrid>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Seção Leaderboard */}
          <S.CardSection>
            <h3><Trophy size={18} color="#f59e0b" /> Ranking da Temporada</h3>
            <S.LeaderboardList>
              {sortedContractors.map((c, index) => {
                const rank = index + 1;
                const rankClass = rank <= 3 ? `rank-${rank}` : 'rank-other';

                return (
                  <S.LeaderboardItem key={c.id}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div className={`rank-badge ${rankClass}`}>{rank}</div>
                      <div className="user-info">
                        <div>
                          <strong>{c.name}</strong>
                          <span>{c.role || 'Terceirizado'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="points-badge">{c.points || 0} PTS</div>
                  </S.LeaderboardItem>
                );
              })}
            </S.LeaderboardList>
          </S.CardSection>

          {/* Seção de Conquistas/Badges */}
          <S.CardSection>
            <h3><Award size={18} color="#3b82f6" /> Badges & Conquistas</h3>
            <S.AchievementsGrid>
              {DEFAULT_ACHIEVEMENTS.map((ach) => {
                const Icon = ach.icon;
                return (
                  <S.AchievementCard key={ach.id} $unlocked={ach.unlocked}>
                    <div className="icon-wrapper">
                      <Icon size={20} />
                    </div>
                    <h4>{ach.title}</h4>
                    <p>{ach.description}</p>
                  </S.AchievementCard>
                );
              })}
            </S.AchievementsGrid>
          </S.CardSection>
        </div>

        {/* Feed de Conquistas e Atividades */}
        <S.CardSection>
          <h3><Activity size={18} color="#10b981" /> Feed de Atividades</h3>
          <S.FeedList>
            {activities.length > 0 ? (
              activities.map((act) => (
                <S.FeedItem key={act.id}>
                  <div className="feed-icon">
                    <Zap size={14} />
                  </div>
                  <div className="feed-content">
                    <p><strong>{act.author}</strong> {act.message}</p>
                    <time>{act.timestamp}</time>
                  </div>
                </S.FeedItem>
              ))
            ) : (
              <S.FeedItem>
                <div className="feed-icon"><Award size={14} /></div>
                <div className="feed-content">
                  <p>Nenhuma atividade recente registrada.</p>
                </div>
              </S.FeedItem>
            )}
          </S.FeedList>
        </S.CardSection>
      </S.MainGrid>
    </S.Container>
  );
}

export default Gamification;