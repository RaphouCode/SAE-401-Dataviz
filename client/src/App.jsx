import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from './styles/GlobalStyles';
import { ObservatoireProvider, useObservatoire } from './context/ObservatoireContext';
import styled from 'styled-components';
import Header from './components/Header/Header';
import KpiNationaux from './components/KpiNationaux/KpiNationaux';
import CarteChoroplethe from './components/CarteChoroplethe/CarteChoroplethe';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';

// import { Chart as ChartJS, defaults } from 'chart.js';

// --- Configuration Globale Chart.js (Esthétique moderne & intégrée) ---
/*
defaults.font.family = "'Inter', system-ui, -apple-system, sans-serif";
defaults.color = '#64748b'; // Couleur du texte (Muted)
defaults.scale.grid.color = '#e2e8f0'; // Lignes de grille (Light)
defaults.plugins.tooltip.backgroundColor = 'rgba(12, 46, 87, 0.95)'; // Fond Navy profond
defaults.plugins.tooltip.titleColor = '#ffffff';
defaults.plugins.tooltip.bodyColor = '#f4f7f9';
defaults.plugins.tooltip.padding = 10;
defaults.plugins.tooltip.cornerRadius = 6;
defaults.plugins.tooltip.displayColors = true; // Garder les couleurs dans le tooltip pour info
*/
// ----------------------------------------------------------------------

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.bg};
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const MapWrapper = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

function ObservatoireLayout() {
  const { departementSelectionne } = useObservatoire();

  return (
    <AppWrapper>
      <Header />
      <Main>
        <KpiNationaux />
        <ContentArea>
          <MapWrapper>
            <CarteChoroplethe />
          </MapWrapper>
          <Sidebar />
        </ContentArea>
      </Main>
      <Footer />
    </AppWrapper>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ObservatoireProvider>
        <ObservatoireLayout />
      </ObservatoireProvider>
    </ThemeProvider>
  );
}
