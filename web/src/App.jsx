import { useEffect, useState, useCallback } from 'react';
import { UserCheck, Plus } from 'lucide-react';
import { api } from './services/api';
import { GlobalStyles } from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Kanban from './components/Kanban';
import RewardsStore from './components/RewardsStore';
import Reports from './components/Reports';
import Gamification from './components/Gamification';
import ContractorModal from './components/ContractorModal';
import TaskModal from './components/TaskModal';
import { ContractorCard } from './components/ContractorCard';
import * as S from './styles/AppStyles';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contractors, setContractors] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [isContractorModalOpen, setIsContractorModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [contractorsRes, tasksRes, rewardsRes] = await Promise.all([
        api.get('/contractors'),
        api.get('/tasks'),
        api.get('/rewards')
      ]);
      setContractors(contractorsRes.data);
      setTasks(tasksRes.data);
      setRewards(rewardsRes.data);
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
    const previousTasks = [...tasks];

    // Atualização otimista no estado local
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      if (newStatus === 'COMPLETED') {
        await api.patch(`/tasks/${taskId}/complete`);
      } else {
        await api.patch(`/tasks/${taskId}`, { status: newStatus });
      }
      fetchData();
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
      setTasks(previousTasks); // Reverte caso a API falhe
    }
  };

  const handleRedeemReward = async (contractorId, rewardId) => {
    try {
      await api.post('/rewards/redeem', {
        contractor_id: contractorId,
        reward_id: rewardId
      });
      alert('Resgate realizado com sucesso!');
      fetchData();
    } catch (error) {
      console.error('Erro ao realizar resgate:', error);
      alert(error.response?.data?.error || 'Não foi possível efetuar o resgate.');
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

        {activeTab === 'gamification' && (
          <Gamification contractors={contractors} />
        )}

        {activeTab === 'rewards' && (
          <RewardsStore
            contractors={contractors}
            rewards={rewards}
            onRedeemReward={handleRedeemReward}
          />
        )}

        {activeTab === 'reports' && (
          <Reports contractors={contractors} tasks={tasks} />
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