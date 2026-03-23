<?php

namespace App\Controller;

use App\Entity\StatsLogement;
use App\Entity\StatsDemographiques;
use App\Entity\Departement;
use App\Entity\Region;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class StatistiqueController extends AbstractController
{
    #[Route('/api/logements', methods: ['GET'])]
    public function logement(EntityManagerInterface $entityManager): JsonResponse
    {
        $statistiques = $entityManager->getRepository(StatsLogement::class)->findAll();

        return $this->json($statistiques, 200, [], ['groups' => 'logement']);
    }

    #[Route('/api/departements', methods: ['GET'])]
    public function departement(EntityManagerInterface $entityManager): JsonResponse
    {
        $departements = $entityManager->getRepository(Departement::class)->findAll();

        return $this->json($departements, 200, [], ['groups' => 'departement']);
    }

    #[Route('/api/regions', methods: ['GET'])]
    public function region(EntityManagerInterface $entityManager): JsonResponse
    {
        $regions = $entityManager->getRepository(Region::class)->findAll();

        return $this->json($regions, 200, [], ['groups' => 'region']);
    }

    // ⚠️ ROUTES AVEC PARAMÈTRES APRÈS

    #[Route('/api/departements/{code}/taux-pauvrete', methods: ['GET'], requirements: ['code' => '\d+'])]
    public function tauxPauvrete(string $code, EntityManagerInterface $entityManager): JsonResponse
    {
        $departement = $entityManager
            ->getRepository(Departement::class)
            ->findOneBy(['code' => $code]);

        if (!$departement) {
            return $this->json(['error' => 'Département non trouvé'], 404);
        }

        $stats = $entityManager
            ->getRepository(StatsDemographiques::class)
            ->findBy(['departement' => $departement], ['annee' => 'ASC']);

        $taux = array_map(fn($stat) => [
            'annee' => $stat->getAnnee(),
            'tauxPauvrete' => $stat->getTauxPauvrete() !== null ? (float)$stat->getTauxPauvrete() : null,
        ], $stats);

        return $this->json([
            'code' => $departement->getCode(),
            'nom' => $departement->getNom(),
            'tauxPauvrete' => $taux,
        ], 200);
    }

    #[Route('/api/departements/{code}', methods: ['GET'], requirements: ['code' => '[a-zA-Z0-9]+'])]
    public function getOneDepartement(string $code, EntityManagerInterface $entityManager): JsonResponse
    {
        $departement = $entityManager
            ->getRepository(Departement::class)
            ->findOneBy(['code' => $code]);

        if (!$departement) {
            return $this->json(['error' => 'Département non trouvé'], 404);
        }

        return $this->json($departement, 200, [], ['groups' => 'departement']);
    }

    #[Route('/api/national/taux-chomage', methods: ['GET'])]
    public function tauxChomageNational(EntityManagerInterface $entityManager): JsonResponse
    {
        $stats = $entityManager->getRepository(StatsDemographiques::class)->findAll();

        $valeurs = array_filter(array_map(
            fn($stat) => $stat->getTauxChomage() !== null ? (float) $stat->getTauxChomage() : null,
            $stats
        ));

        if (empty($valeurs)) {
            return $this->json([
                'tauxChomageMoyen' => null,
                'message' => 'Aucune donnée disponible'
            ], 200);
        }

        $moyenne = array_sum($valeurs) / count($valeurs);

        return $this->json([
            'tauxChomageMoyen' => round($moyenne, 2),
            'nbRecords' => count($valeurs),
        ], 200);
    }

    #[Route('/api/national/indicateurs', methods: ['GET'])]
    public function indicateursNationaux(EntityManagerInterface $entityManager): JsonResponse
    {
        $demographiques = $entityManager->getRepository(StatsDemographiques::class)->findAll();
        $logements = $entityManager->getRepository(StatsLogement::class)->findAll();

        $moyenne = fn(array $items, callable $getValue) => (
            ($values = array_filter(array_map($getValue, $items), fn($v) => $v !== null)) && count($values) > 0
                ? round(array_sum($values) / count($values), 2)
                : null
        );

        return $this->json([
            'tauxPauvreteMoyen' => $moyenne($demographiques, fn($s) => $s->getTauxPauvrete() !== null ? (float) $s->getTauxPauvrete() : null),
            'tauxChomageMoyen' => $moyenne($demographiques, fn($s) => $s->getTauxChomage() !== null ? (float) $s->getTauxChomage() : null),
            'tauxLogementsSociauxMoyen' => $moyenne($logements, fn($s) => $s->getTauxLogementsSociaux() !== null ? (float) $s->getTauxLogementsSociaux() : null),
            'tauxEnergivoresMoyen' => $moyenne($logements, fn($s) => $s->getParcSocialTauxEnergivores() !== null ? (float) $s->getParcSocialTauxEnergivores() : null),
            'nbRecordsDemographiques' => count($demographiques),
            'nbRecordsLogement' => count($logements),
        ], 200);
    }

    #[Route('/api/map/donnees', methods: ['GET'])]
    public function mapDonnees(EntityManagerInterface $entityManager): JsonResponse
    {
        $departements = $entityManager->getRepository(Departement::class)->findAll();
        
        $mapData = [];
        foreach ($departements as $dept) {
            $code = $dept->getCode();
            
            // On veut les données les plus récentes
            $latestDemo = $entityManager->getRepository(StatsDemographiques::class)
                ->findOneBy(['departement' => $dept], ['annee' => 'DESC']);
            
            $latestLogement = $entityManager->getRepository(StatsLogement::class)
                ->findOneBy(['departement' => $dept], ['annee' => 'DESC']);

            $mapData[$code] = [
                'code' => $code,
                'nom' => $dept->getNom(),
                'tauxPauvrete' => $latestDemo?->getTauxPauvrete() !== null ? (float) $latestDemo->getTauxPauvrete() : null,
                'tauxChomage' => $latestDemo?->getTauxChomage() !== null ? (float) $latestDemo->getTauxChomage() : null,
                'tauxLogementsSociaux' => $latestLogement?->getTauxLogementsSociaux() !== null ? (float) $latestLogement->getTauxLogementsSociaux() : null,
                'tauxEnergivores' => $latestLogement?->getParcSocialTauxEnergivores() !== null ? (float) $latestLogement->getParcSocialTauxEnergivores() : null,
            ];
        }

        return $this->json($mapData, 200);
    }
}