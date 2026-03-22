<?php

namespace App\Entity;

use App\Repository\StatsLogementRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: StatsLogementRepository::class)]
#[ORM\Table(name: 'stats_logement')]
#[ORM\UniqueConstraint(name: 'uk_log_dept_annee', columns: ['departement_id', 'annee'])]
class StatsLogement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['logement', 'departement', 'region'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'statsLogements')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    #[Groups(['logement'])]
    private ?Departement $departement = null;

    #[ORM\Column(type: Types::SMALLINT)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?int $annee = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?int $nbLogements = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?int $nbResidencesPrincipales = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 6, scale: 3, nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?string $tauxLogementsSociaux = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 6, scale: 3, nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?string $tauxLogementsVacants = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 6, scale: 3, nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?string $tauxLogementsIndividuels = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement'])]
    private ?int $constructionNeuveMoy10ans = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    #[Groups(['logement'])]
    private ?string $construction = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement'])]
    private ?int $parcSocialNb = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    #[Groups(['logement'])]
    private ?string $parcSocialMisEnLocation = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    #[Groups(['logement'])]
    private ?string $parcSocialDemolis = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    #[Groups(['logement'])]
    private ?string $parcSocialVentes = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 6, scale: 3, nullable: true)]
    #[Groups(['logement'])]
    private ?string $parcSocialTauxVacants = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 6, scale: 3, nullable: true)]
    #[Groups(['logement'])]
    private ?string $parcSocialTauxIndividuels = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 5, scale: 2, nullable: true)]
    #[Groups(['logement'])]
    private ?string $parcSocialLoyerMoyen = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 5, scale: 2, nullable: true)]
    #[Groups(['logement'])]
    private ?string $parcSocialAgeMoyen = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 6, scale: 3, nullable: true)]
    #[Groups(['logement'])]
    private ?string $parcSocialTauxEnergivores = null;

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

    public function getNbLogements(): ?int
    {
        return $this->nbLogements;
    }

    public function setNbLogements(?int $nbLogements): static
    {
        $this->nbLogements = $nbLogements;

        return $this;
    }

    public function getNbResidencesPrincipales(): ?int
    {
        return $this->nbResidencesPrincipales;
    }

    public function setNbResidencesPrincipales(?int $nbResidencesPrincipales): static
    {
        $this->nbResidencesPrincipales = $nbResidencesPrincipales;

        return $this;
    }

    public function getTauxLogementsSociaux(): ?string
    {
        return $this->tauxLogementsSociaux;
    }

    public function setTauxLogementsSociaux(?string $tauxLogementsSociaux): static
    {
        $this->tauxLogementsSociaux = $tauxLogementsSociaux;

        return $this;
    }

    public function getTauxLogementsVacants(): ?string
    {
        return $this->tauxLogementsVacants;
    }

    public function setTauxLogementsVacants(?string $tauxLogementsVacants): static
    {
        $this->tauxLogementsVacants = $tauxLogementsVacants;

        return $this;
    }

    public function getTauxLogementsIndividuels(): ?string
    {
        return $this->tauxLogementsIndividuels;
    }

    public function setTauxLogementsIndividuels(?string $tauxLogementsIndividuels): static
    {
        $this->tauxLogementsIndividuels = $tauxLogementsIndividuels;

        return $this;
    }

    public function getConstructionNeuveMoy10ans(): ?int
    {
        return $this->constructionNeuveMoy10ans;
    }

    public function setConstructionNeuveMoy10ans(?int $constructionNeuveMoy10ans): static
    {
        $this->constructionNeuveMoy10ans = $constructionNeuveMoy10ans;

        return $this;
    }

    public function getConstruction(): ?string
    {
        return $this->construction;
    }

    public function setConstruction(?string $construction): static
    {
        $this->construction = $construction;

        return $this;
    }

    public function getParcSocialNb(): ?int
    {
        return $this->parcSocialNb;
    }

    public function setParcSocialNb(?int $parcSocialNb): static
    {
        $this->parcSocialNb = $parcSocialNb;

        return $this;
    }

    public function getParcSocialMisEnLocation(): ?string
    {
        return $this->parcSocialMisEnLocation;
    }

    public function setParcSocialMisEnLocation(?string $parcSocialMisEnLocation): static
    {
        $this->parcSocialMisEnLocation = $parcSocialMisEnLocation;

        return $this;
    }

    public function getParcSocialDemolis(): ?string
    {
        return $this->parcSocialDemolis;
    }

    public function setParcSocialDemolis(?string $parcSocialDemolis): static
    {
        $this->parcSocialDemolis = $parcSocialDemolis;

        return $this;
    }

    public function getParcSocialVentes(): ?string
    {
        return $this->parcSocialVentes;
    }

    public function setParcSocialVentes(?string $parcSocialVentes): static
    {
        $this->parcSocialVentes = $parcSocialVentes;

        return $this;
    }

    public function getParcSocialTauxVacants(): ?string
    {
        return $this->parcSocialTauxVacants;
    }

    public function setParcSocialTauxVacants(?string $parcSocialTauxVacants): static
    {
        $this->parcSocialTauxVacants = $parcSocialTauxVacants;

        return $this;
    }

    public function getParcSocialTauxIndividuels(): ?string
    {
        return $this->parcSocialTauxIndividuels;
    }

    public function setParcSocialTauxIndividuels(?string $parcSocialTauxIndividuels): static
    {
        $this->parcSocialTauxIndividuels = $parcSocialTauxIndividuels;

        return $this;
    }

    public function getParcSocialLoyerMoyen(): ?string
    {
        return $this->parcSocialLoyerMoyen;
    }

    public function setParcSocialLoyerMoyen(?string $parcSocialLoyerMoyen): static
    {
        $this->parcSocialLoyerMoyen = $parcSocialLoyerMoyen;

        return $this;
    }

    public function getParcSocialAgeMoyen(): ?string
    {
        return $this->parcSocialAgeMoyen;
    }

    public function setParcSocialAgeMoyen(?string $parcSocialAgeMoyen): static
    {
        $this->parcSocialAgeMoyen = $parcSocialAgeMoyen;

        return $this;
    }

    public function getParcSocialTauxEnergivores(): ?string
    {
        return $this->parcSocialTauxEnergivores;
    }

    public function setParcSocialTauxEnergivores(?string $parcSocialTauxEnergivores): static
    {
        $this->parcSocialTauxEnergivores = $parcSocialTauxEnergivores;

        return $this;
    }
}
