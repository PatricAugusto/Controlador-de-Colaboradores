import { useState } from 'react';
import { Gift, Award, User, ShoppingBag, CheckCircle2 } from 'lucide-react';
import * as S from './styles';

export function RewardsStore({ contractors = [], rewards = [], onRedeemReward }) {
  const [selectedContractorId, setSelectedContractorId] = useState(
    contractors[0]?.id || ''
  );

  const activeContractor = contractors.find(
    (c) => c.id === Number(selectedContractorId)
  ) || contractors[0];

  return (
    <S.Container>
      <S.Header>
        <h2>Loja de Recompensas & Resgates</h2>

        <S.SelectorContainer>
          <label htmlFor="contractor-select">Simular Colaborador:</label>
          <select
            id="contractor-select"
            value={selectedContractorId}
            onChange={(e) => setSelectedContractorId(e.target.value)}
          >
            {contractors.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.points} PTS)
              </option>
            ))}
          </select>
        </S.SelectorContainer>
      </S.Header>

      {activeContractor && (
        <S.BalanceCard>
          <div className="info">
            <div className="avatar-icon">
              <User size={24} />
            </div>
            <div>
              <h3>{activeContractor.name}</h3>
              <p>{activeContractor.role || 'Terceirizado'}</p>
            </div>
          </div>

          <div className="points-badge">
            <span>Saldo Disponível</span>
            <strong>{activeContractor.points} PTS</strong>
          </div>
        </S.BalanceCard>
      )}

      <S.StoreGrid>
        {rewards.map((item) => {
          const canAfford = activeContractor && activeContractor.points >= item.points_cost;

          return (
            <S.RewardCard key={item.id} $canAfford={canAfford}>
              <div className="card-header">
                <div className="icon-box">
                  <Gift size={20} />
                </div>
                <span className="cost">{item.points_cost} PTS</span>
              </div>

              <div className="card-body">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>

              <button
                disabled={!canAfford}
                onClick={() => onRedeemReward(activeContractor.id, item.id)}
              >
                {canAfford ? 'Resgatar Benefício' : 'Pontos Insuficientes'}
              </button>
            </S.RewardCard>
          );
        })}
      </S.StoreGrid>
    </S.Container>
  );
}

export default RewardsStore;