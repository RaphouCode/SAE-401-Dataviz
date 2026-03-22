import styled from 'styled-components';
import { useEffect, useState } from 'react';

const KPIS_TEMPLATE = [
  {
    id: 'pauvrete',
    label: 'Taux de pauvreté',
    value: '--',
    description: 'Moyenne nationale',
    color: '#dc2626',
  },
  {
    id: 'logementSocial',
    label: 'Logements sociaux',
    value: '--',
    description: 'Du parc résidentiel',
    color: '#2563eb',
  },
  {
    id: 'energivores',
    label: 'Passoires thermiques',
    value: '--',
    description: 'Logements classés E, F, G',
    color: '#d97706',
  },
  {
    id: 'chomage',
    label: 'Taux de chômage',
    value: '--',
    description: 'BIT, métropole',
    color: '#7c3aed',
  },
];

const Section = styled.section`
  padding: 1.5rem 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const Card = styled.article`
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.p`
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 700;
  text-transform: uppercase;
`;

const Value = styled.p`
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
`;

const Description = styled.p`
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
`;

export default function KpiNationaux() {
  const [kpis, setKpis] = useState(KPIS_TEMPLATE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/national/indicateurs')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur API');
        }
        return res.json();
      })
      .then((json) => {
        const format = (value) =>
          value !== null && value !== undefined
            ? `${value.toFixed(2)} %`
            : '--';

        setKpis((current) =>
          current.map((kpi) => {
            switch (kpi.id) {
              case 'pauvrete':
                return {
                  ...kpi,
                  value: format(json.tauxPauvreteMoyen),
                  description: 'Moyenne nationale (API)',
                };

              case 'chomage':
                return {
                  ...kpi,
                  value: format(json.tauxChomageMoyen),
                  description: 'Moyenne nationale (API)',
                };

              case 'logementSocial':
                return {
                  ...kpi,
                  value: format(json.tauxLogementsSociauxMoyen),
                  description: 'Moyenne nationale (API)',
                };

              case 'energivores':
                return {
                  ...kpi,
                  value: format(json.tauxEnergivoresMoyen),
                  description: 'Moyenne nationale (API)',
                };

              default:
                return kpi;
            }
          })
        );
      })
      .catch((err) => {
        console.error('Erreur chargement indicateurs nationaux', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Section aria-label="Indicateurs nationaux">
      {kpis.map((kpi) => (
        <Card key={kpi.id}>
          <CardHeader>
            <Label>{kpi.label}</Label>
          </CardHeader>

          <Value>{loading ? '...' : kpi.value}</Value>

          <Description>{kpi.description}</Description>
        </Card>
      ))}
    </Section>
  );
}