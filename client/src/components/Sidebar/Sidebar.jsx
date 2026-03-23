import styled, { keyframes } from 'styled-components';
import { useObservatoire } from '../../context/ObservatoireContext';
import TableauDeBordDepartement from '../Dashboard/TableauDeBordDepartement';

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
`;

const slideInMobile = keyframes`
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.4);
    z-index: 49;
    backdrop-filter: blur(2px);
  }
`;

const Panel = styled.aside`
  width: min(400px, 35vw);
  background: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  animation: ${slideIn} 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  z-index: 100;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 75vh;
    border-top: 1px solid #e2e8f0;
    border-radius: 24px 24px 0 0;
    animation: ${slideInMobile} 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
    z-index: 200;
  }
`;

const HandleBar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    padding: 1rem 0 0;

    span {
      width: 48px;
      height: 5px;
      background: #e2e8f0;
      border-radius: 10px;
    }
  }
`;

export default function Sidebar() {
  const { departementSelectionne, setDepartementSelectionne } = useObservatoire();

  if (!departementSelectionne) return null;

  return (
    <>
      <Overlay $open onClick={() => setDepartementSelectionne(null)} />
      <Panel role="complementary" aria-label="Détail du département">
        <HandleBar><span /></HandleBar>
        <TableauDeBordDepartement />
      </Panel>
    </>
  );
}
