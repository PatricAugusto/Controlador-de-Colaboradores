import { Search, Filter } from 'lucide-react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  background: rgba(18, 18, 20, 0.4);
  padding: 0.85rem 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  .search-box {
    flex: 1;
    min-width: 240px;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 0.5rem 0.85rem;
    gap: 0.5rem;

    svg {
      color: #71717a;
    }

    input {
      background: transparent;
      border: none;
      color: #ffffff;
      outline: none;
      font-size: 0.85rem;
      width: 100%;

      &::placeholder {
        color: #71717a;
      }
    }
  }

  .select-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    select {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      color: #ffffff;
      padding: 0.55rem 0.85rem;
      font-size: 0.85rem;
      outline: none;
      cursor: pointer;

      option {
        background: #121214;
        color: #ffffff;
      }
    }
  }
`;

export function FilterBar({ search, onSearchChange, roleTitle, onRoleTitleChange, status, onStatusChange, roles = [] }) {
  return (
    <Container>
      <div className="search-box">
        <Search size={16} />
        <input
          type="text"
          placeholder="Pesquisar por nome ou título..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {onRoleTitleChange && (
        <div className="select-box">
          <Filter size={16} style={{ color: '#71717a' }} />
          <select value={roleTitle} onChange={(e) => onRoleTitleChange(e.target.value)}>
            <option value="">Todos os Cargos</option>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      )}

      {onStatusChange && (
        <div className="select-box">
          <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
            <option value="">Todos os Status</option>
            <option value="PENDING">Pendente</option>
            <option value="IN_PROGRESS">Em Andamento</option>
            <option value="COMPLETED">Concluído</option>
          </select>
        </div>
      )}
    </Container>
  );
}

export default FilterBar;