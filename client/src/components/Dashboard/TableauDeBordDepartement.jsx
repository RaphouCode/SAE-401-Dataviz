import { useState } from 'react';
import styled from 'styled-components';
import { useObservatoire } from '../../context/ObservatoireContext';
import { useDepartementData } from '../../hooks/useDepartementData';

import TendanceSocialeChart from '../Charts/TendanceSocialeChart';
import MoteursDemographiquesChart from '../Charts/MoteursDemographiquesChart';
import OccupationParcChart from '../Charts/OccupationParcChart';
import ConstructionChart from '../Charts/ConstructionChart';
import SanteParcSocialChart from '../Charts/SanteParcSocialChart';
import RenouvellementParcSocialChart from '../Charts/RenouvellementParcSocialChart';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  color: #0f172a;
`;

const DashHeader = styled.div`
  padding: 2rem 1.5rem 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.accent};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HeaderTop = styled.div`
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

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const TabButton = styled.button`
  padding: 0.5rem 0;
  font-weight: 700;
  font-size: 0.85rem;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textMuted)};
  border-bottom: 3px solid ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  background: none;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
`;

const ChartContainer = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  h4 {
    font-size: 0.9rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }
  
  p.desc {
    font-size: 0.8rem;
    color: #64748b;
    margin: 0 0 0.5rem 0;
  }
`;

const LoadingText = styled.div`
  padding: 2rem;
  text-align: center;
  color: #64748b;
  font-weight: 600;
`;

export default function TableauDeBordDepartement() {
  const { departementSelectionne, setDepartementSelectionne } = useObservatoire();
  const [activeTab, setActiveTab] = useState('demographie');

  // Custom hook for simulated data
  const { data, loading, error } = useDepartementData(departementSelectionne?.code);

  if (!departementSelectionne) return null;

  return (
    <Panel>
      <DashHeader>
        <HeaderTop>
          <DashInfo>
            <h2>{departementSelectionne.nom}</h2>
            <div className="code-badge">DÉPARTEMENT {departementSelectionne.code}</div>
          </DashInfo>
          <CloseBtn onClick={() => setDepartementSelectionne(null)}>✕</CloseBtn>
        </HeaderTop>

        <TabsContainer>
          <TabButton $active={activeTab === 'demographie'} onClick={() => setActiveTab('demographie')}>
            Démographie
          </TabButton>
          <TabButton $active={activeTab === 'parc_global'} onClick={() => setActiveTab('parc_global')}>
            Parc Global
          </TabButton>
          <TabButton $active={activeTab === 'parc_social'} onClick={() => setActiveTab('parc_social')}>
            Parc Social
          </TabButton>
        </TabsContainer>
      </DashHeader>

      <Content>
        {loading && <LoadingText>Chargement des données du département...</LoadingText>}
        {error && <LoadingText>Erreur : {error}</LoadingText>}

        {!loading && !error && data && (
          <>
            {activeTab === 'demographie' && (
              <>
                <ChartContainer>
                  <h4>La Tendance Sociale</h4>
                  <p className="desc">Évolution du chômage et de la pauvreté</p>
                  <TendanceSocialeChart data={data.historique_social} />
                </ChartContainer>

                <ChartContainer>
                  <h4>Les Moteurs Démographiques</h4>
                  <p className="desc">Variation pour 10 000 habitants (Naturel vs Migratoire)</p>
                  <MoteursDemographiquesChart data={data.demographie_actuelle.moteurs} />
                </ChartContainer>
              </>
            )}

            {activeTab === 'parc_global' && (
              <>
                <ChartContainer>
                  <h4>Nature de l'occupation</h4>
                  <p className="desc">Répartition du parc immobilier global</p>
                  <OccupationParcChart data={data.parc_global.occupation} />
                </ChartContainer>

                <ChartContainer>
                  <h4>Volume de construction</h4>
                  <p className="desc">Rythme actuel vs Moyenne décennale</p>
                  <ConstructionChart data={data.parc_global.construction} />
                </ChartContainer>
              </>
            )}

            {activeTab === 'parc_social' && (
              <>
                <ChartContainer>
                  <h4>Bilan de santé du parc social</h4>
                  <p className="desc">Taux de vacance et de passoires thermiques</p>
                  <SanteParcSocialChart data={data.parc_social.sante} />
                </ChartContainer>

                <ChartContainer>
                  <h4>Mouvements et Renouvellement</h4>
                  <p className="desc">Attributions, destructions et cessions annuelles</p>
                  <RenouvellementParcSocialChart data={data.parc_social.mouvements} />
                </ChartContainer>
              </>
            )}
          </>
        )}
      </Content>
    </Panel>
  );
}
