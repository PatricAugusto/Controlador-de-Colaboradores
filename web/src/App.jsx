import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { GlobalStyles } from './styles/GlobalStyles';
import ContractorModal from "./components/ContractorModal";
import { TaskModal } from './components/TaskModal';
import { Trophy, Plus, UserCheck, Pencil, Trash2, CheckCircle2, ListTodo } from 'lucide-react';

const API_URL = 'http://localhost:3333';

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

  &:hover { background: #0369a1; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
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

const TaskSection = styled.div`
  margin-top: 1.2rem;
  border-top: 1px dashed #334155;
  padding-top: 1rem;
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;

  h4 {
    font-size: 0.875rem;
    color: #94a3b8;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
`;

const TaskItem = styled.div`
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 6px;
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .task-info {
    font-size: 0.85rem;
    p { font-weight: 500; color: #f1f5f9; }
    span { color: #f59e0b; font-size: 0.75rem; font-weight: bold; }
  }

  button {
    background: #10b981;
    color: #fff;
    border-radius: 4px;
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    &:hover { background: #059669; }
  }
`;

const SmallAddBtn = styled.button`
  background: transparent;
  color: #38bdf8;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  &:hover { text-decoration: underline; }
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
          <h1><UserCheck /> Painel de Terceirizados & Gamificação</h1>
          <AddButton onClick={() => { setSelectedContractor(null); setIsContractorModalOpen(true); }}>
            <Plus size={18} /> Novo Terceirizado
          </AddButton>
        </Header>

        <Grid>
          {contractors.map((item, idx) => {
            const contractorTasks = tasks.filter(t => t.contractor_id === item.id);

            return (
              <Card key={item.id}>
                <div>
                  <CardHeader>
                    <Badge>#{idx + 1} Ranking</Badge>
                    <Actions>
                      <button className="edit" onClick={() => { setSelectedContractor(item); setIsContractorModalOpen(true); }} title="Editar">
                        <Pencil size={16} />
                      </button>
                      <button className="delete" onClick={() => handleDeleteContractor(item.id)} title="Excluir">
                        <Trash2 size={16} />
                      </button>
                    </Actions>
                  </CardHeader>
                  <h3 style={{ marginTop: '0.75rem' }}>{item.name}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.role}</p>

                  <div style={{ marginTop: '1rem' }}>
                    <PointsTag>
                      <Trophy size={18} />
                      {item.points} PTS
                    </PointsTag>
                  </div>

                  <TaskSection>
                    <TaskHeader>
                      <h4><ListTodo size={14} /> Tarefas Pendentes</h4>
                      <SmallAddBtn onClick={() => { setSelectedContractor(item); setIsTaskModalOpen(true); }}>
                        <Plus size={14} /> Tarefa
                      </SmallAddBtn>
                    </TaskHeader>

                    {contractorTasks.length === 0 ? (
                      <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Nenhuma tarefa pendente.</p>
                    ) : (
                      contractorTasks.map((t) => (
                        <TaskItem key={t.id}>
                          <div className="task-info">
                            <p>{t.title}</p>
                            <span>+{t.points_reward} PTS</span>
                          </div>
                          <button onClick={() => handleCompleteTask(t.id)}>
                            <CheckCircle2 size={14} /> Concluir
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