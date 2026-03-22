export const MOCK_DATA = {
  "departement": {
    "code": "33",
    "nom": "Gironde",
    "region": "NOUVELLE-AQUITAINE"
  },
  "historique_social": [
    { "annee": 2021, "chomage": 7.5, "pauvrete": 12.6 },
    { "annee": 2022, "chomage": 7.2, "pauvrete": 12.4 },
    { "annee": 2023, "chomage": 6.4, "pauvrete": 12.4 }
  ],
  "demographie_actuelle": {
    "moteurs": [
      { "type": "Naturel", "valeur": 2.95 },
      { "type": "Migratoire", "valeur": 10.14 }
    ]
  },
  "parc_global": {
    "occupation": [
      { "nom": "Principales", "valeur": 763663 },
      { "nom": "Vacants", "valeur": 54011 },
      { "nom": "Secondaires", "valeur": 82524 }
    ],
    "construction": [
      { "periode": "Moyenne 10 ans", "volume": 15867 },
      { "periode": "Année en cours", "volume": 13345 }
    ]
  },
  "parc_social": {
    "sante": [
      { "indicateur": "Vacance", "valeur": 1.23 },
      { "indicateur": "Énergivore (E,F,G)", "valeur": 10.26 }
    ],
    "mouvements": [
      { "action": "Mis en location", "valeur": 2939 },
      { "action": "Démolis", "valeur": 297 },
      { "action": "Vendus", "valeur": 411 }
    ]
  }
};
