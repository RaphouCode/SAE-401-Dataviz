import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useObservatoire } from '../../context/ObservatoireContext';

const DEPARTEMENTS_LIST = [
  { code: '01', nom: 'Ain' }, { code: '02', nom: 'Aisne' }, { code: '03', nom: 'Allier' },
  { code: '04', nom: 'Alpes-de-Haute-Provence' }, { code: '05', nom: 'Hautes-Alpes' },
  { code: '06', nom: 'Alpes-Maritimes' }, { code: '07', nom: 'Ardèche' },
  { code: '08', nom: 'Ardennes' }, { code: '09', nom: 'Ariège' }, { code: '10', nom: 'Aube' },
  { code: '11', nom: 'Aude' }, { code: '12', nom: 'Aveyron' }, { code: '13', nom: 'Bouches-du-Rhône' },
  { code: '14', nom: 'Calvados' }, { code: '15', nom: 'Cantal' }, { code: '16', nom: 'Charente' },
  { code: '17', nom: 'Charente-Maritime' }, { code: '18', nom: 'Cher' }, { code: '19', nom: 'Corrèze' },
  { code: '2A', nom: 'Corse-du-Sud' }, { code: '2B', nom: 'Haute-Corse' }, { code: '21', nom: 'Côte-d\'Or' },
  { code: '22', nom: 'Côtes-d\'Armor' }, { code: '23', nom: 'Creuse' }, { code: '24', nom: 'Dordogne' },
  { code: '25', nom: 'Doubs' }, { code: '26', nom: 'Drôme' }, { code: '27', nom: 'Eure' },
  { code: '28', nom: 'Eure-et-Loir' }, { code: '29', nom: 'Finistère' }, { code: '30', nom: 'Gard' },
  { code: '31', nom: 'Haute-Garonne' }, { code: '32', nom: 'Gers' }, { code: '33', nom: 'Gironde' },
  { code: '34', nom: 'Hérault' }, { code: '35', nom: 'Ille-et-Vilaine' }, { code: '36', nom: 'Indre' },
  { code: '37', nom: 'Indre-et-Loire' }, { code: '38', nom: 'Isère' }, { code: '39', nom: 'Jura' },
  { code: '40', nom: 'Landes' }, { code: '41', nom: 'Loir-et-Cher' }, { code: '42', nom: 'Loire' },
  { code: '43', nom: 'Haute-Loire' }, { code: '44', nom: 'Loire-Atlantique' }, { code: '45', nom: 'Loiret' },
  { code: '46', nom: 'Lot' }, { code: '47', nom: 'Lot-et-Garonne' }, { code: '48', nom: 'Lozère' },
  { code: '49', nom: 'Maine-et-Loire' }, { code: '50', nom: 'Manche' }, { code: '51', nom: 'Marne' },
  { code: '52', nom: 'Haute-Marne' }, { code: '53', nom: 'Mayenne' }, { code: '54', nom: 'Meurthe-et-Moselle' },
  { code: '55', nom: 'Meuse' }, { code: '56', nom: 'Morbihan' }, { code: '57', nom: 'Moselle' },
  { code: '58', nom: 'Nièvre' }, { code: '59', nom: 'Nord' }, { code: '60', nom: 'Oise' },
  { code: '61', nom: 'Orne' }, { code: '62', nom: 'Pas-de-Calais' }, { code: '63', nom: 'Puy-de-Dôme' },
  { code: '64', nom: 'Pyrénées-Atlantiques' }, { code: '65', nom: 'Hautes-Pyrénées' },
  { code: '66', nom: 'Pyrénées-Orientales' }, { code: '67', nom: 'Bas-Rhin' }, { code: '68', nom: 'Haut-Rhin' },
  { code: '69', nom: 'Rhône' }, { code: '70', nom: 'Haute-Saône' }, { code: '71', nom: 'Saône-et-Loire' },
  { code: '72', nom: 'Sarthe' }, { code: '73', nom: 'Savoie' }, { code: '74', nom: 'Haute-Savoie' },
  { code: '75', nom: 'Paris' }, { code: '76', nom: 'Seine-Maritime' }, { code: '77', nom: 'Seine-et-Marne' },
  { code: '78', nom: 'Yvelines' }, { code: '79', nom: 'Deux-Sèvres' }, { code: '80', nom: 'Somme' },
  { code: '81', nom: 'Tarn' }, { code: '82', nom: 'Tarn-et-Garonne' }, { code: '83', nom: 'Var' },
  { code: '84', nom: 'Vaucluse' }, { code: '85', nom: 'Vendée' }, { code: '86', nom: 'Vienne' },
  { code: '87', nom: 'Haute-Vienne' }, { code: '88', nom: 'Vosges' }, { code: '89', nom: 'Yonne' },
  { code: '90', nom: 'Territoire de Belfort' }, { code: '91', nom: 'Essonne' },
  { code: '92', nom: 'Hauts-de-Seine' }, { code: '93', nom: 'Seine-Saint-Denis' },
  { code: '94', nom: 'Val-de-Marne' }, { code: '95', nom: 'Val-d\'Oise' },
  { code: '971', nom: 'Guadeloupe' }, { code: '972', nom: 'Martinique' },
  { code: '973', nom: 'Guyane' }, { code: '974', nom: 'La Réunion' }, { code: '976', nom: 'Mayotte' }
];

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${({ theme }) => theme.colors.bg};
  padding: 0 2rem;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoSection = styled.div`
  h1 {
    font-size: 1.25rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.accent};
    line-height: 1;

    span {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.textMuted};
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: 4px;
    }
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const SearchInputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 3.5rem 0 1.25rem;
  background: #f8fafc;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    background: #ffffff;
    border-color: ${({ theme }) => theme.colors.accentLight};
    box-shadow: 0 4px 12px rgba(0, 51, 102, 0.08);
  }
`;

const SearchBtn = styled.button`
  position: absolute;
  right: 4px;
  width: 36px;
  height: 36px;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const SuggestionDropdown = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
  max-height: 280px;
  overflow-y: auto;
  list-style: none;
  z-index: 200;
`;

const SuggestionItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  transition: background 0.15s;

  &:hover, &.active {
    background: #f1f5f9;
  }

  .code {
    font-size: 0.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.accent};
    min-width: 2rem;
  }

  .name {
    font-size: 0.95rem;
    color: #334155;
    font-weight: 600;
  }
`;

export default function Header() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const { setDepartementSelectionne } = useObservatoire();

  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }
    const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const results = DEPARTEMENTS_LIST.filter(d => {
      const name = d.nom.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return name.includes(q) || d.code.toLowerCase().startsWith(q);
    }).slice(0, 10);
    setSuggestions(results);
    setIsOpen(results.length > 0);
    setActiveIdx(-1);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(dep) {
    setQuery('');
    setIsOpen(false);
    setDepartementSelectionne(dep);
  }

  function handleKeyDown(e) {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      handleSelect(suggestions[activeIdx]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  return (
    <HeaderWrapper>
      <LogoSection>
        <h1>
          Observatoire du Logement
          <span>ET DE LA PRÉCARITÉ EN FRANCE</span>
        </h1>
      </LogoSection>

      <SearchContainer ref={wrapperRef}>
        <SearchInputBox>
          <SearchInput
            type="text"
            placeholder="Rechercher un département..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setIsOpen(true)}
            autoComplete="off"
          />
          <SearchBtn>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </SearchBtn>
        </SearchInputBox>
        {isOpen && (
          <SuggestionDropdown>
            {suggestions.map((dep, idx) => (
              <SuggestionItem
                key={dep.code}
                className={idx === activeIdx ? 'active' : ''}
                onClick={() => handleSelect(dep)}
              >
                <span className="code">{dep.code}</span>
                <span className="name">{dep.nom}</span>
              </SuggestionItem>
            ))}
          </SuggestionDropdown>
        )}
      </SearchContainer>
    </HeaderWrapper>
  );
}
