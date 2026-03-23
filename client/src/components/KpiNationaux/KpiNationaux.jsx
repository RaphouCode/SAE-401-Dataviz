import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useObservatoire, CALQUES } from '../../context/ObservatoireContext';

const Section = styled.section`
  padding: 1.5rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  background: #ffffff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Card = styled.article`
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  //border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid transparent;
  border-bottom: 4px solid transparent;
  
  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.colors.bg};
    border-bottom-color: ${props => props.$color};
  }
  
  ${props => props.$isActive && `
    border-bottom-color: ${props.$color};
    background: ${props.theme.colors.bg};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const Label = styled.p`
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Value = styled.p`
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1;
`;

const Description = styled.p`
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
  margin-top: 0.5rem;
`;

export default function KpiNationaux() {
  const { calqueActif, setCalqueActif } = useObservatoire();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/national/indicateurs')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const KPIS = [
    {
      id: 'pauvrete',
      label: 'Taux de pauvreté',
      value: data && data.tauxPauvreteMoyen != null ? data.tauxPauvreteMoyen + '%' : '--',
      description: 'Moyenne nationale',
      color: '#dc2626',
    },
    {
      id: 'logementSocial',
      label: 'Logements sociaux',
      value: data && data.tauxLogementsSociauxMoyen != null ? data.tauxLogementsSociauxMoyen + '%' : '--',
      description: 'Du parc résidentiel',
      color: '#2563eb',
    },
    {
      id: 'energivores',
      label: 'Passoires thermiques',
      value: data && data.tauxEnergivoresMoyen != null ? data.tauxEnergivoresMoyen + '%' : '--',
      description: 'Logements classés E, F, G',
      color: '#d97706',
    },
    {
      id: 'chomage',
      label: 'Taux de chômage',
      value: data && data.tauxChomageMoyen != null ? data.tauxChomageMoyen + '%' : '--',
      description: 'BIT, métropole',
      color: '#7c3aed',
    },
  ];

  const handleKpiClick = (id) => {
    const calque = CALQUES.find(c => c.id === id);
    if (calque) setCalqueActif(calque);
  };

  return (
    <Section aria-label="Indicateurs nationaux">
      {KPIS.map((kpi) => (
        <Card
          key={kpi.id}
          $color={kpi.color}
          $isActive={calqueActif.id === kpi.id}
          onClick={() => handleKpiClick(kpi.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleKpiClick(kpi.id)}
        >
          <CardHeader>
            <Label>{kpi.label}</Label>
          </CardHeader>
          <Value>{kpi.value}</Value>
          <Description>{kpi.description}</Description>
        </Card>
      ))}
    </Section>
  );
}
