import React, { useMemo } from 'react';
import * as S from './LevelProgressCard.styles';

export interface LevelDefinition {
  level: number;
  title: string;
  minPoints: number;
  color: string;
  bgGlow: string;
}

export const LEVEL_CONFIG: LevelDefinition[] = [
  { level: 1, title: 'Iniciante', minPoints: 0, color: '#A1A1AA', bgGlow: 'rgba(161, 161, 170, 0.15)' },
  { level: 2, title: 'Bronze', minPoints: 100, color: '#CD7F32', bgGlow: 'rgba(205, 127, 50, 0.15)' },
  { level: 3, title: 'Prata', minPoints: 300, color: '#C0C0C0', bgGlow: 'rgba(192, 192, 192, 0.15)' },
  { level: 4, title: 'Ouro', minPoints: 600, color: '#FFD700', bgGlow: 'rgba(255, 215, 0, 0.15)' },
  { level: 5, title: 'Platina', minPoints: 1000, color: '#E5E4E2', bgGlow: 'rgba(229, 228, 226, 0.15)' },
  { level: 6, title: 'Diamante', minPoints: 1500, color: '#38BDF8', bgGlow: 'rgba(56, 189, 248, 0.2)' },
];

interface LevelProgressCardProps {
  totalPoints: number;
  userName?: string;
  className?: string;
}

export const LevelProgressCard: React.FC<LevelProgressCardProps> = ({
  totalPoints,
  userName,
  className,
}) => {
  const levelData = useMemo(() => {
    let currentLevelIndex = LEVEL_CONFIG.length - 1;
    for (let i = 0; i < LEVEL_CONFIG.length; i++) {
      if (totalPoints < LEVEL_CONFIG[i].minPoints) {
        currentLevelIndex = i - 1;
        break;
      }
    }

    const currentLevel = LEVEL_CONFIG[Math.max(0, currentLevelIndex)];
    const nextLevel = LEVEL_CONFIG[currentLevelIndex + 1] || null;

    if (!nextLevel) {
      return {
        currentLevel,
        nextLevel: null,
        pointsToNextLevel: 0,
        progressPercentage: 100,
        isMaxLevel: true,
      };
    }

    const pointsInTier = totalPoints - currentLevel.minPoints;
    const tierRange = nextLevel.minPoints - currentLevel.minPoints;
    const progressPercentage = Math.min(100, Math.floor((pointsInTier / tierRange) * 100));

    return {
      currentLevel,
      nextLevel,
      pointsToNextLevel: nextLevel.minPoints - totalPoints,
      progressPercentage,
      isMaxLevel: false,
    };
  }, [totalPoints]);

  const { currentLevel, nextLevel, pointsToNextLevel, progressPercentage, isMaxLevel } = levelData;

  return (
    <S.CardContainer $glowColor={currentLevel.bgGlow} className={className}>
      <S.BackgroundGlow $color={currentLevel.color} />

      <S.Header>
        <S.UserInfo>
          {userName && <S.UserName>{userName}</S.UserName>}
          <S.LevelTitle>
            Nível {currentLevel.level} • {currentLevel.title}
          </S.LevelTitle>
        </S.UserInfo>

        <S.LevelBadge $color={currentLevel.color}>
          {currentLevel.level}
        </S.LevelBadge>
      </S.Header>

      <S.ProgressWrapper>
        <S.ProgressTrack>
          <S.ProgressBar $color={currentLevel.color} $progress={progressPercentage} />
        </S.ProgressTrack>

        <S.FooterInfo>
          <span>{totalPoints.toLocaleString('pt-BR')} pts acumulados</span>
          {isMaxLevel ? (
            <S.MaxLevelText>Nível Máximo Alcançado!</S.MaxLevelText>
          ) : (
            <span>
              Faltam <strong style={{ color: '#e4e4e7' }}>{pointsToNextLevel.toLocaleString('pt-BR')} pts</strong> para o Nível {nextLevel?.level}
            </span>
          )}
        </S.FooterInfo>
      </S.ProgressWrapper>
    </S.CardContainer>
  );
};