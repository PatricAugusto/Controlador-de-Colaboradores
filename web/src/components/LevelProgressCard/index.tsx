import React, { useMemo } from 'react';
import * as S from './styles';

export interface LevelProgressCardProps {
  totalPoints: number;
  userName?: string;
}

interface LevelThreshold {
  levelNumber: number;
  name: string;
  minPoints: number;
  maxPoints: number | null;
  color: string;
}

const LEVEL_THRESHOLDS: LevelThreshold[] = [
  { levelNumber: 1, name: 'Iniciante', minPoints: 0, maxPoints: 100, color: '#a1a1aa' },
  { levelNumber: 2, name: 'Bronze', minPoints: 100, maxPoints: 300, color: '#cd7f32' },
  { levelNumber: 3, name: 'Prata', minPoints: 300, maxPoints: 600, color: '#c0c0c0' },
  { levelNumber: 4, name: 'Ouro', minPoints: 600, maxPoints: 1000, color: '#ffd700' },
  { levelNumber: 5, name: 'Platina', minPoints: 1000, maxPoints: 1500, color: '#e5e4e2' },
  { levelNumber: 6, name: 'Diamante', minPoints: 1500, maxPoints: null, color: '#38bdf8' },
];

export const LevelProgressCard: React.FC<LevelProgressCardProps> = ({
  totalPoints,
  userName,
}) => {
  const currentLevelInfo = useMemo(() => {
    const currentLevel =
      LEVEL_THRESHOLDS.find((threshold) => {
        if (threshold.maxPoints === null) {
          return totalPoints >= threshold.minPoints;
        }
        return totalPoints >= threshold.minPoints && totalPoints < threshold.maxPoints;
      }) || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];

    const isMaxLevel = currentLevel.maxPoints === null;

    let pointsNeededForNext = 0;
    let progressPercentage = 100;

    if (!isMaxLevel && currentLevel.maxPoints !== null) {
      const range = currentLevel.maxPoints - currentLevel.minPoints;
      const currentProgress = totalPoints - currentLevel.minPoints;
      progressPercentage = (currentProgress / range) * 100;
      pointsNeededForNext = currentLevel.maxPoints - totalPoints;
    }

    return {
      ...currentLevel,
      isMaxLevel,
      pointsNeededForNext,
      progressPercentage,
    };
  }, [totalPoints]);

  const formattedPoints = useMemo(() => {
    return new Intl.NumberFormat('pt-BR').format(totalPoints);
  }, [totalPoints]);

  return (
    <S.CardContainer $glowColor={currentLevelInfo.color}>
      <S.BackgroundGlow $color={currentLevelInfo.color} />

      <S.Header>
        <S.UserInfo>
          {userName && <S.UserName>{userName}</S.UserName>}
          <S.LevelTitle>
            Nível {currentLevelInfo.levelNumber} • {currentLevelInfo.name}
          </S.LevelTitle>
        </S.UserInfo>

        <S.LevelBadge $color={currentLevelInfo.color}>
          L{currentLevelInfo.levelNumber}
        </S.LevelBadge>
      </S.Header>

      <S.ProgressWrapper>
        <S.ProgressTrack>
          <S.ProgressBar
            $color={currentLevelInfo.color}
            $progress={currentLevelInfo.progressPercentage}
          />
        </S.ProgressTrack>

        <S.FooterInfo>
          <span>{formattedPoints} pts acumulados</span>

          {currentLevelInfo.isMaxLevel ? (
            <S.MaxLevelText>Nível Máximo Alcançado!</S.MaxLevelText>
          ) : (
            <span>
              {new Intl.NumberFormat('pt-BR').format(currentLevelInfo.pointsNeededForNext)} pts
            </span>
          )}
        </S.FooterInfo>
      </S.ProgressWrapper>
    </S.CardContainer>
  );
};

export default LevelProgressCard;