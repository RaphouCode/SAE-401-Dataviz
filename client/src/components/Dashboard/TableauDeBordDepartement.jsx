import styled from 'styled-components';
import { useObservatoire } from '../../context/ObservatoireContext';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  color: #0f172a;
`;

const DashHeader = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const DashInfo = styled.div`
  h2 {
    font-size: 1.75rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 0.25rem;
  }

  .code-badge {
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    padding: 0.25rem 0.75rem;
    background: ${({ theme }) => theme.colors.accent};
    color: white;
    font-weight: 700;
  }
`;

const CloseBtn = styled.button`
  width: 40px;
  height: 40px;
  background: white;
  border: 2px solid #e2e8f0;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 300;
  
  &:hover {
    background: #f1f5f9;
    color: #0f172a;
    border-color: #0f172a;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const InfoSection = styled.div`
  h3 {
    font-size: 0.8rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }

  .placeholder-text {
    font-size: 0.95rem;
    color: #475569;
    line-height: 1.6;
    padding: 1.5rem 0;
  }
`;

export default function TableauDeBordDepartement() {
  const { departementSelectionne, setDepartementSelectionne } = useObservatoire();

  if (!departementSelectionne) return null;

  const { code, nom } = departementSelectionne;

  return (
    <Panel>
      <DashHeader>
        <DashInfo>
          <h2>{nom}</h2>
          <div className="code-badge">DÉPARTEMENT {code}</div>
        </DashInfo>
        <CloseBtn onClick={() => setDepartementSelectionne(null)}>✕</CloseBtn>
      </DashHeader>

      <Content>
        <InfoSection>
          <h3>Analyse Territoriale</h3>
          <div className="placeholder-text">
            Données en cours de synchronisation avec l'API nationale. Les statistiques détaillées pour le département <strong>{nom}</strong> seront disponibles prochainement.
          </div>
        </InfoSection>

        <InfoSection>
          <h3>Graphiques & Visualisations</h3>
          <div className="placeholder-text" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Zone réservée aux graphiques dynamiques
          </div>
        </InfoSection>
      </Content>
    </Panel>
  );
}
