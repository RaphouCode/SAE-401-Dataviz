import styled from 'styled-components';
import { useObservatoire } from '../../context/ObservatoireContext';
import { useEffect, useState } from 'react';

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
  gap: 2rem;
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
  }
`;

export default function TableauDeBordDepartement() {
  const { departementSelectionne, setDepartementSelectionne } = useObservatoire();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!departementSelectionne) return null;

  const { code, nom } = departementSelectionne;

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:8889/api/departements/${code}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [code]);

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

          {loading && <p>Chargement...</p>}

          {!loading && data && (
            <div>
              <p>Code : {data.code}</p>
              <p>Nom : {data.nom}</p>

              {data.statsLogements && data.statsLogements.length > 0 && (
                <p>
                  Logements : {data.statsLogements[0].nbLogements}
                </p>
              )}
            </div>
          )}

          {!loading && !data && (
            <div className="placeholder-text">
              Aucune donnée disponible
            </div>
          )}
        </InfoSection>

        <InfoSection>
          <h3>Graphiques & Visualisations</h3>
          <div className="placeholder-text">
            Zone pour graphiques
          </div>
        </InfoSection>
      </Content>
    </Panel>
  );
}