<?php

namespace App\Entity;

use App\Repository\DepartementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: DepartementRepository::class)]
#[ORM\Table(name: 'departements')]
class Departement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['departement', 'region'])]
    private ?int $id = null;

    #[ORM\Column(length: 3, unique: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?string $code = null;

    #[ORM\Column(length: 100)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?string $nom = null;

    #[ORM\ManyToOne(inversedBy: 'departements')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'RESTRICT')]
    #[Groups(['departement'])]
    private ?Region $region = null;

    /**
     * @var Collection<int, StatsDemographiques>
     */
    #[ORM\OneToMany(targetEntity: StatsDemographiques::class, mappedBy: 'departement', orphanRemoval: true)]
    private Collection $statsDemographiques;

    /**
     * @var Collection<int, StatsLogement>
     */
    #[ORM\OneToMany(targetEntity: StatsLogement::class, mappedBy: 'departement', orphanRemoval: true)]
    #[Groups(['departement', 'region'])]
    private Collection $statsLogements;

    public function __construct()
    {
        $this->statsDemographiques = new ArrayCollection();
        $this->statsLogements = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getRegion(): ?Region
    {
        return $this->region;
    }

    public function setRegion(?Region $region): static
    {
        $this->region = $region;

        return $this;
    }

    /**
     * @return Collection<int, StatsDemographiques>
     */
    public function getStatsDemographiques(): Collection
    {
        return $this->statsDemographiques;
    }

    public function addStatsDemographique(StatsDemographiques $statsDemographique): static
    {
        if (!$this->statsDemographiques->contains($statsDemographique)) {
            $this->statsDemographiques->add($statsDemographique);
            $statsDemographique->setDepartement($this);
        }

        return $this;
    }

    public function removeStatsDemographique(StatsDemographiques $statsDemographique): static
    {
        if ($this->statsDemographiques->removeElement($statsDemographique)) {
            // set the owning side to null (unless already changed)
            if ($statsDemographique->getDepartement() === $this) {
                $statsDemographique->setDepartement(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, StatsLogement>
     */
    public function getStatsLogements(): Collection
    {
        return $this->statsLogements;
    }

    public function addStatsLogement(StatsLogement $statsLogement): static
    {
        if (!$this->statsLogements->contains($statsLogement)) {
            $this->statsLogements->add($statsLogement);
            $statsLogement->setDepartement($this);
        }

        return $this;
    }

    public function removeStatsLogement(StatsLogement $statsLogement): static
    {
        if ($this->statsLogements->removeElement($statsLogement)) {
            // set the owning side to null (unless already changed)
            if ($statsLogement->getDepartement() === $this) {
                $statsLogement->setDepartement(null);
            }
        }

        return $this;
    }
}
