import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from './styles/GlobalStyles';
import { ObservatoireProvider, useObservatoire } from './context/ObservatoireContext';
import styled from 'styled-components';
import Header from './components/Header/Header';
import KpiNationaux from './components/KpiNationaux/KpiNationaux';
import CarteChoroplethe from './components/CarteChoroplethe/CarteChoroplethe';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';

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
