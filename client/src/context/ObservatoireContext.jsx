import { createContext, useContext, useState } from 'react';

const ObservatoireContext = createContext(null);

export const CALQUES = [
  {
    id: 'logementSocial',
    label: 'Logements sociaux',
    unit: '%',
    palette: 'Blues',
    description: 'Part des logements HLM',
  },
  {
    id: 'pauvrete',
    label: 'Taux de pauvreté',
    unit: '%',
    palette: 'Reds',
    description: 'Population sous le seuil de pauvreté',
  },
  {
    id: 'energivores',
    label: 'Passoires thermiques',
    unit: '%',
    palette: 'YlOrRd',
    description: 'Logements classés E, F ou G',
  },
];

export function ObservatoireProvider({ children }) {
  const [departementSelectionne, setDepartementSelectionne] = useState(null);
  const [calqueActif, setCalqueActif] = useState(CALQUES[0]);

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
