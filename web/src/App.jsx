import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { GlobalStyles } from './styles/GlobalStyles';
import { ContractorModal } from './components/ContractorModal';
import { Trophy, Plus, UserCheck, Pencil, Trash2 } from 'lucide-react';

const API_URL = 'http://localhost:3001';

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 1rem;

  h1 {
    font-size: 1.8rem;
    color: #38bdf8;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const AddButton = styled.button`
  background: #0284c7;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: #0369a1;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: #1e293b;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #334155;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Badge = styled.span`
  background: #0284c7;
  color: #fff;
  font-weight: bold;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.875rem;
  width: fit-content;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    background: transparent;
    color: #94a3b8;
    padding: 0.2rem;
    transition: color 0.2s;

    &.edit:hover { color: #38bdf8; }
    &.delete:hover { color: #f43f5e; }
  }
`;

const PointsTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #f59e0b;
  font-weight: bold;
  font-size: 1.1rem;
`;

export function App() {
  const [contractors, setContractors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);

  useEffect(() => {
    fetchContractors();
  }, []);

  const fetchContractors = async () => {
    try {
      const response = await axios.get(`${API_URL}/contractors`);
      setContractors(response.data);
    } catch (error) {
      console.error('Erro ao buscar terceirizados:', error);
    }
  };

  const handleOpenCreateModal = () => {
    setSelectedContractor(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (contractor) => {
    setSelectedContractor(contractor);
    setIsModalOpen(true);
  };

  const handleSaveContractor = async (formData) => {
    try {
      if (selectedContractor) {
        await axios.put(`${API_URL}/contractors/${selectedContractor.id}`, formData);
      } else {
        await axios.post(`${API_URL}/contractors`, formData);
      }
      setIsModalOpen(false);
      fetchContractors();
    } catch (error) {
      console.error('Erro ao salvar terceirizado:', error);
    }
  };

  const handleDeleteContractor = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este terceirizado?')) {
      try {
        await axios.delete(`${API_URL}/contractors/${id}`);
        fetchContractors();
      } catch (error) {
        console.error('Erro ao deletar terceirizado:', error);
      }
    }
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          <h1><UserCheck /> Painel de Terceirizados</h1>
          <AddButton onClick={handleOpenCreateModal}>
            <Plus size={18} /> Novo Terceirizado
          </AddButton>
        </Header>

        <Grid>
          {contractors.map((item, idx) => (
            <Card key={item.id}>
              <div>
                <CardHeader>
                  <Badge>#{idx + 1} Ranking</Badge>
                  <Actions>
                    <button className="edit" onClick={() => handleOpenEditModal(item)} title="Editar">
                      <Pencil size={16} />
                    </button>
                    <button className="delete" onClick={() => handleDeleteContractor(item.id)} title="Excluir">
                      <Trash2 size={16} />
                    </button>
                  </Actions>
                </CardHeader>
                <h3 style={{ marginTop: '0.75rem' }}>{item.name}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.role}</p>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.2rem' }}>{item.email}</p>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <PointsTag>
                  <Trophy size={18} />
                  {item.points} PTS
                </PointsTag>
              </div>
            </Card>
          ))}
        </Grid>

        <ContractorModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveContractor}
          contractorToEdit={selectedContractor}
        />
      </Container>
    </>
  );
}

export default App;