import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { GlobalStyles } from './styles/GlobalStyles';
import ContractorModal from "./components/ContractorModal";
import { TaskModal } from './components/TaskModal';
import { Trophy, Plus, UserCheck, Pencil, Trash2, CheckCircle2, ListTodo } from 'lucide-react';

const API_URL = 'http://localhost:3333';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--glass-border);

  h1 {
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: -0.03em;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
`;

const AddButton = styled.button`
  background: #ffffff;
  color: #000000;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.15);

  &:hover {
    background: #e2e8f0;
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(255, 255, 255, 0.25);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-radius: 16px;
  padding: 1.75rem;
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-deep);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--glass-border-focus);
    transform: translateY(-4px);
    box-shadow: var(--shadow-glow), var(--shadow-deep);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Badge = styled.span`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--glass-border);
  color: #f8fafc;
  font-weight: 500;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.4rem;

  button {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    padding: 0.4rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }

    &.delete:hover {
      color: #ef4444;
    }
  }
`;

const PointsTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.25rem;
  margin-top: 1rem;
  letter-spacing: -0.02em;
`;

const TaskSection = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid var(--glass-border);
  padding-top: 1.25rem;
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h4 {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
`;

const TaskItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  margin-bottom: 0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
  }

  .task-info {
    p { font-size: 0.875rem; font-weight: 500; color: #f8fafc; }
    span { color: var(--text-secondary); font-size: 0.75rem; }
  }

  button {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid var(--glass-border);
    border-radius: 6px;
    padding: 0.4rem 0.7rem;
    font-size: 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: all 0.2s ease;

    &:hover {
      background: #ffffff;
      color: #000000;
    }
  }
`;

const SmallAddBtn = styled.button`
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover { opacity: 1; }
`;

export function App() {
  const [contractors, setContractors] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isContractorModalOpen, setIsContractorModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [contractorsRes, tasksRes] = await Promise.all([
        axios.get(`${API_URL}/contractors`),
        axios.get(`${API_URL}/tasks`)
      ]);
      setContractors(contractorsRes.data);
      setTasks(tasksRes.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSaveContractor = async (formData) => {
    try {
      if (selectedContractor) {
        await axios.put(`${API_URL}/contractors/${selectedContractor.id}`, formData);
      } else {
        await axios.post(`${API_URL}/contractors`, formData);
      }
      setIsContractorModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Erro ao salvar terceirizado:', error);
    }
  };

  const handleDeleteContractor = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este terceirizado?')) {
      try {
        await axios.delete(`${API_URL}/contractors/${id}`);
        fetchData();
      } catch (error) {
        console.error('Erro ao deletar terceirizado:', error);
      }
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await axios.post(`${API_URL}/tasks`, taskData);
      setIsTaskModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await axios.patch(`${API_URL}/tasks/${taskId}/complete`);
      fetchData();
    } catch (error) {
      console.error('Erro ao concluir tarefa:', error);
    }
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          <h1><UserCheck size={22} /> Terceirizados & Performance</h1>
          <AddButton onClick={() => { setSelectedContractor(null); setIsContractorModalOpen(true); }}>
            <Plus size={16} /> Novo Terceirizado
          </AddButton>
        </Header>

        <Grid>
          {contractors.map((item, idx) => {
            const contractorTasks = tasks.filter(t => t.contractor_id === item.id);

            return (
              <Card key={item.id}>
                <div>
                  <CardHeader>
                    <Badge>RANK #{idx + 1}</Badge>
                    <Actions>
                      <button className="edit" onClick={() => { setSelectedContractor(item); setIsContractorModalOpen(true); }} title="Editar">
                        <Pencil size={15} />
                      </button>
                      <button className="delete" onClick={() => handleDeleteContractor(item.id)} title="Excluir">
                        <Trash2 size={15} />
                      </button>
                    </Actions>
                  </CardHeader>
                  <h3 style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>{item.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.2rem' }}>{item.role}</p>

                  <PointsTag>
                    <Trophy size={18} />
                    {item.points} <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 400 }}>PTS</span>
                  </PointsTag>

                  <TaskSection>
                    <TaskHeader>
                      <h4><ListTodo size={13} /> Pendentes</h4>
                      <SmallAddBtn onClick={() => { setSelectedContractor(item); setIsTaskModalOpen(true); }}>
                        <Plus size={13} /> Criar
                      </SmallAddBtn>
                    </TaskHeader>

                    {contractorTasks.length === 0 ? (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>Nenhuma tarefa pendente.</p>
                    ) : (
                      contractorTasks.map((t) => (
                        <TaskItem key={t.id}>
                          <div className="task-info">
                            <p>{t.title}</p>
                            <span>+{t.points_reward} PTS</span>
                          </div>
                          <button onClick={() => handleCompleteTask(t.id)}>
                            <CheckCircle2 size={13} /> Concluir
                          </button>
                        </TaskItem>
                      ))
                    )}
                  </TaskSection>
                </div>
              </Card>
            );
          })}
        </Grid>

        <ContractorModal 
          isOpen={isContractorModalOpen}
          onClose={() => setIsContractorModalOpen(false)}
          onSave={handleSaveContractor}
          contractorToEdit={selectedContractor}
        />

        <TaskModal 
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSave={handleCreateTask}
          contractors={contractors}
          defaultContractorId={selectedContractor?.id}
        />
      </Container>
    </>
  );
}

export default App;