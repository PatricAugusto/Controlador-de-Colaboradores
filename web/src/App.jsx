import { useEffect, useState, useCallback } from 'react';
import { UserCheck, Plus } from 'lucide-react';
import { api } from './services/api';
import { GlobalStyles } from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Kanban from './components/Kanban';
import ContractorModal from './components/ContractorModal';
import TaskModal from './components/TaskModal';
import { ContractorCard } from './components/ContractorCard';
import * as S from './styles/AppStyles';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contractors, setContractors] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isContractorModalOpen, setIsContractorModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [contractorsRes, tasksRes] = await Promise.all([
        api.get('/contractors'),
        api.get('/tasks')
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
        await api.put(`/contractors/${selectedContractor.id}`, formData);
      } else {
        await api.post('/contractors', formData);
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
        await api.delete(`/contractors/${id}`);
        fetchData();
      } catch (error) {
        console.error('Erro ao deletar terceirizado:', error);
      }
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await api.post('/tasks', taskData);
      setIsTaskModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await api.patch(`/tasks/${taskId}/complete`);
      fetchData();
    } catch (error) {
      console.error('Erro ao concluir tarefa:', error);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      if (newStatus === 'COMPLETED') {
        await api.patch(`/tasks/${taskId}/complete`);
      } else {
        await api.patch(`/tasks/${taskId}`, { status: newStatus });
      }
      fetchData();
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
    }
  };

  return (
    <>
      <GlobalStyles />
      <Navbar activeTab={activeTab} onChangeTab={setActiveTab} />

      <S.Container>
        {activeTab === 'dashboard' && (
          <Dashboard contractors={contractors} tasks={tasks} />
        )}

        {activeTab === 'kanban' && (
          <Kanban
            tasks={tasks}
            contractors={contractors}
            onUpdateTaskStatus={handleUpdateTaskStatus}
          />
        )}

        {activeTab === 'contractors' && (
          <>
            <S.Header>
              <h1><UserCheck size={22} /> Terceirizados & Performance</h1>
              <S.AddButton onClick={() => { setSelectedContractor(null); setIsContractorModalOpen(true); }}>
                <Plus size={16} /> Novo Terceirizado
              </S.AddButton>
            </S.Header>

            <S.Grid>
              {contractors.map((item, idx) => (
                <ContractorCard
                  key={item.id}
                  contractor={item}
                  rank={idx + 1}
                  tasks={tasks.filter(t => t.contractor_id === item.id)}
                  onEdit={(contractor) => {
                    setSelectedContractor(contractor);
                    setIsContractorModalOpen(true);
                  }}
                  onDelete={handleDeleteContractor}
                  onCreateTask={(contractor) => {
                    setSelectedContractor(contractor);
                    setIsTaskModalOpen(true);
                  }}
                  onCompleteTask={handleCompleteTask}
                />
              ))}
            </S.Grid>
          </>
        )}

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
      </S.Container>
    </>
  );
}

export default App;