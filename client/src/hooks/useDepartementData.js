import { useState, useEffect } from 'react';
import { MOCK_DATA } from '../mock/departementData';

// Ce hook simulera l'appel API. Actuellement, il renvoie notre MOCK_DATA.
// Plus tard, nous remplacerons la logique par un fetch vers l'API Symfony.
export function useDepartementData(departementId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!departementId) {
      setData(null);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    // Simulation d'un appel réseau (500ms délai)
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        // En vrai:
        // fetch(`/api/departements/${departementId}`)
        //   .then(res => res.json())
        //   .then(data => setData(data))
        
        // Mock actuel (on renvoie toujours le mock défini, quel que soit l'ID)
        // Dans la vraie application, l'API renverrait les données spécifiques du département demandé.
        try {
          // Si l'ID est 33 (Gironde) on renvoie le mock, pour tester. 
          // Sinon on renvoie le même mock en modifiant juste le nom et le code pour que ce soit cohérent
          const simulatedData = { ...MOCK_DATA };
          simulatedData.departement.code = departementId;
          simulatedData.departement.nom = `Département ${departementId}`; // Nom générique en attendant
          
          setData(simulatedData);
        } catch (err) {
          setError(err.message || 'Erreur lors de la récupération des données');
        } finally {
          setLoading(false);
        }
      }
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [departementId]);

  return { data, loading, error };
}
