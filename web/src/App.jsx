import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { GlobalStyles } from './styles/GlobalStyles';
import { Trophy, Plus, CheckCircle2, UserCheck } from 'lucide-react';

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

  useEffect(() => {
    fetchContractors();
  }, []);

  const fetchContractors = async () => {
    try {
      const response = await axios.get(`${API_URL}/contractors`);
      setContractors(response.data);
    } catch (error) {
      console.error("Erro ao buscar terceirizados:", error);
    }
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          <h1><UserCheck /> Painel de Terceirizados & Gamificação</h1>
        </Header>

        <Grid>
          {contractors.map((item, idx) => (
            <Card key={item.id}>
              <div>
                <Badge>#{idx + 1} Ranking</Badge>
                <h3 style={{ marginTop: '0.75rem' }}>{item.name}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.role}</p>
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
      </Container>
    </>
  );
}

export default App;