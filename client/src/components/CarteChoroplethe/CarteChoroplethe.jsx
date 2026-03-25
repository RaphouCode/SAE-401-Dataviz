import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { useObservatoire } from '../../context/ObservatoireContext';
import { scaleSequential } from 'd3-scale';
import {
  interpolateReds,
  interpolateBlues,
  interpolatePurples,
  interpolateYlOrRd
} from 'd3-scale-chromatic';

const GEO_URL = 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson';

const Wrapper = styled.section`
  flex: 1;
  position: relative;
  background: white;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 1rem 2rem 2rem;
`;

const MapContainer = styled.div`
  flex: 1;
  position: relative;
  background: white;
  overflow: hidden;
`;

const InsetBox = styled.div`
  position: absolute;
  overflow: hidden;
  cursor: pointer;

  &.idf {
    top: 1.5rem;
    right: 1.5rem;
    width: 120px;
    height: 120px;
  }

  &.dom {
    bottom: 1.5rem;
    left: 1.5rem;
    display: flex;
    gap: 8px;
    padding: 8px;
  }

  .inset-label {
    position: absolute;
    bottom: 4px;
    left: 4px;
    font-size: 0.65rem;
    font-weight: 800;
    color: #0f172a;
    background: rgba(255,255,255,0.9);
    padding: 2px 6px;
    pointer-events: none;
    text-transform: uppercase;
  }
`;

const DomItem = styled.div`
  width: 60px;
  height: 60px;
  background: white;
  position: relative;
`;

const CustomTooltip = styled.div`
  position: fixed;
  z-index: 1000;
  background: #0f172a;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  pointer-events: none;
  transform: translate(12px, -50%);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Notice = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  background: #0f172a;
  color: white;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export default function CarteChoroplethe() {
  const { setDepartementSelectionne, departementSelectionne, calqueActif } = useObservatoire();
  const [hovered, setHovered] = useState(null);
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    fetch('/api/map/donnees')
      .then(res => res.json())
      .then(setMapData)
      .catch(console.error);
  }, []);

  const getMetricKey = (id) => {
    switch (id) {
      case 'pauvrete': return 'tauxPauvrete';
      case 'chomage': return 'tauxChomage';
      case 'logementSocial': return 'tauxLogementsSociaux';
      case 'energivores': return 'tauxEnergivores';
      default: return 'tauxPauvrete';
    }
  };

  const getColorScale = (id) => {
    switch (id) {
      case 'pauvrete': return scaleSequential(interpolateReds).domain([5, 22]);
      case 'chomage': return scaleSequential(interpolatePurples).domain([4, 12]);
      case 'logementSocial': return scaleSequential(interpolateBlues).domain([0, 35]);
      case 'energivores': return scaleSequential(interpolateYlOrRd).domain([5, 30]);
      default: return scaleSequential(interpolateReds).domain([5, 25]);
    }
  };

  const metricKey = getMetricKey(calqueActif.id);
  const colorScale = getColorScale(calqueActif.id);

  const handleClick = (geo) => {
    const code = geo.properties.code || geo.properties.CODE_DEP || geo.properties.num_dep;
    const nom = geo.properties.nom || geo.properties.NOM_DEP || geo.properties.libelle;
    setDepartementSelectionne({ code, nom });
  };

  const renderMap = (config, width = 800, height = 800) => (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={config}
      width={width}
      height={height}
      style={{ width: '100%', height: '100%' }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map(geo => {
            const geoCode = geo.properties.code || geo.properties.CODE_DEP || geo.properties.num_dep;
            const isSelected = departementSelectionne?.code === geoCode;

            const normalizedCode = String(geoCode).replace(/^0+/, '');
            const dptData = mapData[normalizedCode];
            const value = dptData ? dptData[metricKey] : null;
            const hasData = value != null;

            const defaultFill = hasData ? colorScale(value) : '#f8fafc';
            const hoverFill = hasData ? colorScale(value + (value * 0.1)) : '#e2e8f0';

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isSelected ? '#0066cc' : defaultFill}
                stroke={isSelected ? '#003366' : '#cbd5e1'}
                strokeWidth={isSelected ? 1.5 : 0.5}
                onMouseEnter={(e) => setHovered({ x: e.clientX, y: e.clientY, nom: geo.properties.nom, valeur: value })}
                onMouseMove={(e) => setHovered(h => ({ ...h, x: e.clientX, y: e.clientY }))}
                onMouseLeave={(e) => {
                  // Only remove hover text if we actually left the geography,
                  // to avoid flickering if we enter another one rapidly.
                  setHovered(null);
                }}
                onClick={() => handleClick(geo)}
                style={{
                  default: { outline: 'none' },
                  hover: { fill: isSelected ? '#0066cc' : hoverFill, outline: 'none', cursor: 'pointer' },
                  pressed: { outline: 'none' },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
  const renderDomItem = (code, nom) => {
    const dptData = mapData[code];
    const value = dptData ? dptData[metricKey] : null;
    const hasData = value != null;
    const fill = hasData ? colorScale(value) : '#f8fafc';

    return (
      <DomItem
        style={{ backgroundColor: fill, cursor: 'pointer' }}
        onClick={() => handleClick({ properties: { code, nom } })}
        onMouseEnter={(e) => setHovered({ x: e.clientX, y: e.clientY, nom, valeur: value })}
        onMouseMove={(e) => setHovered(h => ({ ...h, x: e.clientX, y: e.clientY }))}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="inset-label">{code}</div>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontWeight: '800', fontSize: '0.85rem',
          color: hasData ? '#fff' : '#94a3b8',
          textShadow: hasData ? '0 1px 3px rgba(0,0,0,0.6)' : 'none'
        }}>
          {hasData ? (typeof value === 'number' ? value.toFixed(1) : value) : 'n.c.'}
        </div>
      </DomItem>
    );
  };

  return (
    <Wrapper>
      <MapContainer>
        {renderMap({ center: [2.5, 46.2], scale: 2800 }, 800, 800)}

        <InsetBox className="idf">
          {renderMap({ center: [2.35, 48.85], scale: 14000 }, 120, 120)}
          <div className="inset-label">IDF</div>
        </InsetBox>

        <InsetBox className="dom">
          {renderDomItem('971', 'Guadeloupe')}
          {renderDomItem('972', 'Martinique')}
          {renderDomItem('973', 'Guyane')}
          {renderDomItem('974', 'La Réunion')}
          {renderDomItem('976', 'Mayotte')}
        </InsetBox>

        <Notice>Observatoire · France</Notice>
      </MapContainer>

      {hovered && (
        <CustomTooltip style={{ left: hovered.x, top: hovered.y }}>
          {hovered.nom}
          {hovered.valeur != null ? (
            <span> : {typeof hovered.valeur === 'number' ? hovered.valeur.toFixed(1) : hovered.valeur}%</span>
          ) : (
            <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}> - Donnée non disponible</span>
          )}
        </CustomTooltip>
      )}
    </Wrapper>
  );
}
