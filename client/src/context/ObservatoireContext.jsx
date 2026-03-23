import { createContext, useContext, useState } from 'react';

const ObservatoireContext = createContext(null);

export const CALQUES = [
  {
    id: 'pauvrete',
    label: 'Taux de pauvreté',
    unit: '%',
    palette: 'Reds',
    description: 'Population sous le seuil de pauvreté',
    color: '#dc2626',
  },
  {
    id: 'logementSocial',
    label: 'Logements sociaux',
    unit: '%',
    palette: 'Blues',
    description: 'Part des logements HLM',
    color: '#2563eb',
  },
  {
    id: 'energivores',
    label: 'Passoires thermiques',
    unit: '%',
    palette: 'YlOrRd',
    description: 'Logements classés E, F ou G',
    color: '#d97706',
  },
  {
    id: 'chomage',
    label: 'Taux de chômage',
    unit: '%',
    palette: 'Purples',
    description: 'Taux de chômage au sens du BIT',
    color: '#7c3aed',
  },
];

export function ObservatoireProvider({ children }) {
  const [departementSelectionne, setDepartementSelectionne] = useState(null);
  const [calqueActif, setCalqueActif] = useState(CALQUES[0]); // Par défaut: Pauvreté

  return (
    <ObservatoireContext.Provider
      value={{
        departementSelectionne,
        setDepartementSelectionne,
        calqueActif,
        setCalqueActif,
      }}
    >
      {children}
    </ObservatoireContext.Provider>
  );
}

export function useObservatoire() {
  const ctx = useContext(ObservatoireContext);
  if (!ctx) throw new Error('useObservatoire must be used within ObservatoireProvider');
  return ctx;
}
