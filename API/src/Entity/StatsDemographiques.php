<?php

namespace App\Entity;

use App\Repository\StatsDemographiquesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: StatsDemographiquesRepository::class)]
#[ORM\Table(name: 'stats_demographiques')]
#[ORM\UniqueConstraint(name: 'uk_demo_dept_annee', columns: ['departement_id', 'annee'])]
class StatsDemographiques
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['departement', 'region'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'statsDemographiques')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    #[Groups(['departement', 'region'])]
    private ?Departement $departement = null;

    #[ORM\Column(type: Types::SMALLINT)]
    #[Groups(['departement', 'region'])]
    private ?int $annee = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['departement', 'region'])]
    private ?int $population = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    #[Groups(['departement', 'region'])]
    private ?string $densite = null;

    #[ORM\Column(name: 'variation_pop_10ans', type: Types::DECIMAL, precision: 10, scale: 4, nullable: true)]
    #[Groups(['departement', 'region'])]
    private ?string $variationPop10ans = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 4, nullable: true)]
    #[Groups(['departement', 'region'])]
    private ?string $soldeNaturel = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 4, nullable: true)]
    #[Groups(['departement', 'region'])]
    private ?string $soldeMigratoire = null;

    #[ORM\Column(name: 'pop_moins_20ans', type: Types::DECIMAL, precision: 6, scale: 3, nullable: true)]
    #[Groups(['departement', 'region'])]
    private ?string $popMoins20ans = null;

    #[ORM\Column(name: 'pop_60ans_plus', type: Types::DECIMAL, precision: 6, scale: 3, nullable: true)]
    #[Groups(['departement', 'region'])]
    private ?string $pop60ansPlus = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 5, scale: 2, nullable: true)]
    #[Groups(['departement', 'region'])]
    private ?string $tauxChomage = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 5, scale: 2, nullable: true)]
    #[Groups(['departement', 'region'])]
    private ?string $tauxPauvrete = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDepartement(): ?Departement
    {
        return $this->departement;
    }

    public function setDepartement(?Departement $departement): static
    {
        $this->departement = $departement;

        return $this;
    }

    public function getAnnee(): ?int
    {
        return $this->annee;
    }

    public function setAnnee(int $annee): static
    {
        $this->annee = $annee;

        return $this;
    }

    public function getPopulation(): ?int
    {
        return $this->population;
    }

    public function setPopulation(?int $population): static
    {
        $this->population = $population;

        return $this;
    }

    public function getDensite(): ?string
    {
        return $this->densite;
    }

    public function setDensite(?string $densite): static
    {
        $this->densite = $densite;

        return $this;
    }

    public function getVariationPop10ans(): ?string
    {
        return $this->variationPop10ans;
    }

    public function setVariationPop10ans(?string $variationPop10ans): static
    {
        $this->variationPop10ans = $variationPop10ans;

        return $this;
    }

    public function getSoldeNaturel(): ?string
    {
        return $this->soldeNaturel;
    }

    public function setSoldeNaturel(?string $soldeNaturel): static
    {
        $this->soldeNaturel = $soldeNaturel;

        return $this;
    }

    public function getSoldeMigratoire(): ?string
    {
        return $this->soldeMigratoire;
    }

    public function setSoldeMigratoire(?string $soldeMigratoire): static
    {
        $this->soldeMigratoire = $soldeMigratoire;

        return $this;
    }

    public function getPopMoins20ans(): ?string
    {
        return $this->popMoins20ans;
    }

    public function setPopMoins20ans(?string $popMoins20ans): static
    {
        $this->popMoins20ans = $popMoins20ans;

        return $this;
    }

    public function getPop60ansPlus(): ?string
    {
        return $this->pop60ansPlus;
    }

    public function setPop60ansPlus(?string $pop60ansPlus): static
    {
        $this->pop60ansPlus = $pop60ansPlus;

        return $this;
    }

    public function getTauxChomage(): ?string
    {
        return $this->tauxChomage;
    }

    public function setTauxChomage(?string $tauxChomage): static
    {
        $this->tauxChomage = $tauxChomage;

        return $this;
    }

    public function getTauxPauvrete(): ?string
    {
        return $this->tauxPauvrete;
    }

    public function setTauxPauvrete(?string $tauxPauvrete): static
    {
        $this->tauxPauvrete = $tauxPauvrete;

        return $this;
    }
}
