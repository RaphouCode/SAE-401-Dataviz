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

const ContextText = styled.div`
  font-size: 0.8rem;
  color: #475569;
  background: #f8fafc;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  margin: 0.5rem 0 1rem 0;
  line-height: 1.4;
`;

const InfoButton = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 1.1rem;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;

  h4 {
    font-size: 0.9rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }

  p.desc {
    font-size: 0.8rem;
    color: #64748b;
    margin: 0;
  }
`;

function ChartBlock({ title, desc, contextNode, children }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <ChartContainer>
      <ChartHeader>
        <div>
          <h4>{title}</h4>
          <p className="desc">{desc}</p>
        </div>
        <InfoButton onClick={() => setShowInfo(!showInfo)} title="Comprendre ce graphique">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
        </InfoButton>
      </ChartHeader>

      {showInfo && (
        <ContextText>
          {contextNode}
        </ContextText>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </ChartContainer>
  );
}

export default function TableauDeBordDepartement() {
  const { departementSelectionne, setDepartementSelectionne } = useObservatoire();
  const [activeTab, setActiveTab] = useState('demographie');

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
                <ChartBlock
                  title="La Tendance Sociale"
                  desc="Évolution du chômage et de la pauvreté"
                  contextNode={<><strong>L'histoire derrière les chiffres :</strong> Le KPI global donne une "photo" à l'instant T, ce graphique donne le "film". Un département avec 15% de pauvreté qui est en chute libre depuis 3 ans raconte une histoire de succès économique. Le même taux en forte hausse annonce une crise. C'est indispensable pour contextualiser la donnée.</>}
                >
                  <TendanceSocialeChart data={data.historique_social} />
                </ChartBlock>

                <ChartBlock
                  title="Les Moteurs Démographiques"
                  desc="Variation pour 10 000 habitants (Naturel vs Migratoire)"
                  contextNode={<><strong>Analyse de vitalité :</strong> La carte montre le nombre d'habitants, ce graphique explique la dynamique. Avoir plus de décès que de naissances (solde naturel négatif) mais compensé par l'arrivée de retraités (migratoire positif) révèle un département vieillissant mais attractif, à l'inverse d'un territoire jeune.</>}
                >
                  <MoteursDemographiquesChart data={data.demographie_actuelle.moteurs} />
                </ChartBlock>
              </>
            )}

            {activeTab === 'parc_global' && (
              <>
                <ChartBlock
                  title="Nature de l'occupation"
                  desc="Répartition du parc immobilier global"
                  contextNode={<><strong>Le thermomètre de la crise :</strong> Un fort taux de logements vacants signale un territoire en déprise (souvent rurale, logements abandonnés). À l'inverse, un fort taux de résidences secondaires pointe une pression touristique forte (effet "Airbnb") où les locaux n'arrivent plus à se loger.</>}
                >
                  <OccupationParcChart data={data.parc_global.occupation} />
                </ChartBlock>

                <ChartBlock
                  title="Volume de construction"
                  desc="Rythme actuel vs Moyenne décennale"
                  contextNode={<><strong>Anticipation économique :</strong> C'est un indicateur de santé du BTP. Comparer l'année en cours à la décennie précédente permet de voir d'un seul coup d'œil si le secteur de l'immobilier est en train de s'effondrer ou s'il y a un boom de la construction locale.</>}
                >
                  <ConstructionChart data={data.parc_global.construction} />
                </ChartBlock>
              </>
            )}

            {activeTab === 'parc_social' && (
              <>
                <ChartBlock
                  title="Bilan de santé du parc social"
                  desc="Taux de vacance et de passoires thermiques"
                  contextNode={<><strong>La réalité du terrain :</strong> Le KPI indique la "quantité" de logements sociaux. Ce graphique donne la "qualité". S'il y a beaucoup de passoires thermiques (classés E,F,G), cela signifie que les locataires, déjà précaires, explosent leur budget chauffage de manière critique.</>}
                >
                  <SanteParcSocialChart data={data.parc_social.sante} />
                </ChartBlock>

                <ChartBlock
                  title="Mouvements et Renouvellement"
                  desc="Attributions, destructions et cessions annuelles"
                  contextNode={<><strong>Action publique :</strong> Montre si le département gère passivement ou activement son parc. Beaucoup de démolitions et de nouvelles mises en location sont le signe d'une politique de rénovation urbaine agressive (destruction d'anciennes barres pour du neuf) plutôt que d'attentisme.</>}
                >
                  <RenouvellementParcSocialChart data={data.parc_social.mouvements} />
                </ChartBlock>
              </>
            )}
          </>
        )}
      </Content>
    </Panel>
  );
}
