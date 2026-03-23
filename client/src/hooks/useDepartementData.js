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

    // On normalise le code car la base de données n'utilise pas de zéro devant les chiffres (ex: "1" au lieu de "01")
    const code = String(departementId).replace(/^0+/, '');

    fetch(`/api/departements/${code}`)
      .then(res => {
        if (!res.ok) throw new Error('Département non trouvé');
        return res.json();
      })
      .then(dpt => {
        if (!isMounted) return;
        
        // --- 1. HISTORIQUE SOCIAL ---
        const historiqueSocial = (dpt.statsDemographiques || [])
          .sort((a, b) => a.annee - b.annee)
          .map(s => ({
            annee: s.annee,
            chomage: parseFloat(s.tauxChomage) || 0,
            pauvrete: parseFloat(s.tauxPauvrete) || 0
          }));

        // --- 2. DÉMOGRAPHIE (MOTEURS) ---
        const latestDemo = (dpt.statsDemographiques || [])
          .sort((a, b) => b.annee - a.annee)[0] || {};
        
        const moteursDemographiques = [
          { type: "Naturel", valeur: parseFloat(latestDemo.soldeNaturel) || 0 },
          { type: "Migratoire", valeur: parseFloat(latestDemo.soldeMigratoire) || 0 }
        ];

        // --- 3. PARC GLOBAL ---
        const latestLogement = (dpt.statsLogements || [])
          .sort((a, b) => b.annee - a.annee)[0] || {};
        
        const nbVacants = latestLogement.nbLogements 
          ? Math.round(latestLogement.nbLogements * (parseFloat(latestLogement.tauxLogementsVacants) / 100))
          : 0;
        
        const occupationParc = [
          { nom: "Principales", valeur: latestLogement.nbResidencesPrincipales || 0 },
          { nom: "Vacants", valeur: nbVacants },
          { nom: "Secondaires", valeur: (latestLogement.nbLogements || 0) - (latestLogement.nbResidencesPrincipales || 0) - nbVacants }
        ];

        const construction = [
          { periode: "Moyenne 10 ans", volume: latestLogement.constructionNeuveMoy10ans || 0 },
          { periode: "Année en cours", volume: parseInt(latestLogement.construction) || 0 }
        ];

        // --- 4. PARC SOCIAL ---
        const santeParcSocial = [
          { indicateur: "Vacance", valeur: parseFloat(latestLogement.parcSocialTauxVacants) || 0 },
          { indicateur: "Énergivore (E,F,G)", valeur: parseFloat(latestLogement.parcSocialTauxEnergivores) || 0 }
        ];

        const mouvementsParcSocial = [
          { action: "Mis en location", valeur: parseInt(latestLogement.parcSocialMisEnLocation) || 0 },
          { action: "Démolis", valeur: parseInt(latestLogement.parcSocialDemolis) || 0 },
          { action: "Vendus", valeur: parseInt(latestLogement.parcSocialVentes) || 0 }
        ];

        const formattedData = {
          departement: {
            code: dpt.code,
            nom: dpt.nom,
            region: dpt.region?.nom || 'N/A'
          },
          historique_social: historiqueSocial,
          demographie_actuelle: {
            moteurs: moteursDemographiques
          },
          parc_global: {
            occupation: occupationParc,
            construction: construction
          },
          parc_social: {
            sante: santeParcSocial,
            mouvements: mouvementsParcSocial
          }
        };

        setData(formattedData);
      })
      .catch(err => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [departementId]);

  return { data, loading, error };
}
