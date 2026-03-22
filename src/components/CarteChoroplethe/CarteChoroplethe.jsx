import { useState } from 'react';
import styled from 'styled-components';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { useObservatoire } from '../../context/ObservatoireContext';

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
    color: ${({ theme }) => theme.colors.accent};
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
  background: ${({ theme }) => theme.colors.accent};
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
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export default function CarteChoroplethe() {
  const { setDepartementSelectionne, departementSelectionne } = useObservatoire();
  const [hovered, setHovered] = useState(null);

  const handleClick = (geo) => {
    const code = geo.properties.code || geo.properties.CODE_DEP || geo.properties.num_dep;
    const nom = geo.properties.nom || geo.properties.NOM_DEP || geo.properties.libelle;
    setDepartementSelectionne({ code, nom });
  };

  const renderMap = (config) => (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={config}
      style={{ width: '100%', height: '100%' }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map(geo => {
            const code = geo.properties.code || geo.properties.CODE_DEP || geo.properties.num_dep;
            const isSelected = departementSelectionne?.code === code;
            
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isSelected ? '#0066cc' : '#f8fafc'}
                stroke={isSelected ? '#003366' : '#cbd5e1'}
                strokeWidth={isSelected ? 1.5 : 0.5}
                onMouseEnter={(e) => setHovered({ x: e.clientX, y: e.clientY, nom: geo.properties.nom })}
                onMouseMove={(e) => setHovered(h => ({ ...h, x: e.clientX, y: e.clientY }))}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick(geo)}
                style={{
                  default: { outline: 'none' },
                  hover: { fill: isSelected ? '#0066cc' : '#e2e8f0', outline: 'none', cursor: 'pointer' },
                  pressed: { outline: 'none' },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );

  return (
    <Wrapper>
      <MapContainer>
        {renderMap({ center: [2.5, 46.5], scale: 2800 })}

        <InsetBox className="idf">
          {renderMap({ center: [2.35, 48.85], scale: 12000 })}
          <div className="inset-label">IDF</div>
        </InsetBox>

        <InsetBox className="dom">
          <DomItem><div className="inset-label">971</div></DomItem>
          <DomItem><div className="inset-label">972</div></DomItem>
          <DomItem><div className="inset-label">973</div></DomItem>
          <DomItem><div className="inset-label">974</div></DomItem>
          <DomItem><div className="inset-label">976</div></DomItem>
        </InsetBox>

        <Notice>Observatoire · France</Notice>
      </MapContainer>

      {hovered && (
        <CustomTooltip style={{ left: hovered.x, top: hovered.y }}>
          {hovered.nom}
        </CustomTooltip>
      )}
    </Wrapper>
  );
}
