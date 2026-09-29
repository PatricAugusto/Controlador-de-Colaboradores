import { LayoutDashboard, Users, Kanban as KanbanIcon, Gift, BarChart3 } from 'lucide-react';
import * as S from './styles';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'kanban', label: 'Kanban', icon: KanbanIcon },
  { id: 'rewards', label: 'Loja de Recompensas', icon: Gift },
  { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  { id: 'contractors', label: 'Terceirizados', icon: Users },
];

  return (
    <S.Container>
      <S.Content>
        <S.Brand>
          <div className="logo-box">
            <ShieldCheck size={20} />
          </div>
          <span>
            Controlador <strong>Terceirizados</strong>
          </span>
        </S.Brand>

        <S.NavList>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <S.NavItem key={tab.id} $active={isActive}>
                <button type="button" onClick={() => onChangeTab(tab.id)}>
                  <Icon size={16} />
                  {tab.label}
                </button>
              </S.NavItem>
            );
          })}
        </S.NavList>
      </S.Content>
    </S.Container>
  );

export default Navbar;