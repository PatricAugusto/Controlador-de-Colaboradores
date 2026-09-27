import styled from 'styled-components';

interface CardContainerProps {
  $glowColor: string;
}

interface BadgeProps {
  $color: string;
}

interface ProgressBarProps {
  $color: string;
  $progress: number;
}

export const CardContainer = styled.div<CardContainerProps>`
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid #27272a;
  background-color: #09090b;
  padding: 1.5rem;
  color: #f4f4f5;
  box-shadow: 0 0 40px -10px ${(props) => props.$glowColor};
  transition: all 0.3s ease;
`;

export const BackgroundGlow = styled.div<BadgeProps>`
  position: absolute;
  top: -2.5rem;
  right: -2.5rem;
  width: 8rem;
  height: 8rem;
  border-radius: 9999px;
  background-color: ${(props) => props.$color};
  filter: blur(48px);
  opacity: 0.3;
  pointer-events: none;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #a1a1aa;
  margin-bottom: 0.25rem;
`;

export const LevelTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #ffffff;
  margin: 0;
`;

export const LevelBadge = styled.div<BadgeProps>`
  display: flex;
  height: 3rem;
  width: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  font-weight: 900;
  font-size: 1.125rem;
  flex-shrink: 0;
  background-color: ${(props) => `${props.$color}15`};
  color: ${(props) => props.$color};
  border: 1px solid ${(props) => `${props.$color}40`};
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

export const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProgressTrack = styled.div`
  position: relative;
  height: 0.625rem;
  width: 100%;
  overflow: hidden;
  border-radius: 9999px;
  background-color: rgba(39, 39, 42, 0.8);
`;

export const ProgressBar = styled.div<ProgressBarProps>`
  height: 100%;
  border-radius: 9999px;
  width: ${(props) => props.$progress}%;
  background-color: ${(props) => props.$color};
  box-shadow: 0 0 12px ${(props) => props.$color};
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const FooterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #a1a1aa;
  padding-top: 0.25rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
`;

export const MaxLevelText = styled.span`
  font-weight: 600;
  color: #34d399;
`;