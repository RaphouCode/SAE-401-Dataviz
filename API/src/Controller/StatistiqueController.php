<?php

namespace App\Controller;

use App\Entity\StatsLogement;
use App\Entity\Departement;
use App\Entity\Region;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class StatistiqueController extends AbstractController
{
    public function logement(EntityManagerInterface $entityManager): JsonResponse
    {
        $statistiques = $entityManager->getRepository(StatsLogement::class)->findAll();

        return $this->json($statistiques, 200, [], ['groups' => 'logement']);
    }

    public function departement(EntityManagerInterface $entityManager): JsonResponse
    {
        $departements = $entityManager->getRepository(Departement::class)->findAll();

        return $this->json($departements, 200, [], ['groups' => 'departement']);
    }

    public function region(EntityManagerInterface $entityManager): JsonResponse
    {
        $regions = $entityManager->getRepository(Region::class)->findAll();

        return $this->json($regions, 200, [], ['groups' => 'region']);
    }
}
