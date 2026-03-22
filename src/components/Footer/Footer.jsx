import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: white;
  color: #0b1a32;
  padding: 4rem 2rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .logo {
    font-size: 2rem;
    font-weight: 900;
    color: #0b1a32;
    letter-spacing: -0.02em;
    text-transform: uppercase;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-size: 0.9rem;
    color: #475569;
  }
`;

const LinkSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  h4 {
    font-size: 0.85rem;
    font-weight: 800;
    color: #0b1a32;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  li a {
    font-size: 0.9rem;
    color: #475569;
    text-decoration: none;

    &:hover {
      color: #0b1a32;
    }
  }
`;

const BottomBar = styled.div`
  max-width: 1200px;
  margin: 4rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #64748b;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterContent>
        <BrandSection>
          <div className="logo">IMMOSTAT</div>
          <div className="contact-info">
            <div>62, Rue... , 70200 Lure</div>
            <div>+33 16 55 62 24</div>
            <div>terradata@gmail.com</div>
          </div>
        </BrandSection>

        <LinkSection>
          <h4>Navigation</h4>
          <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="#">Les biocontroles</a></li>
            <li><a href="#">Les datas</a></li>
            <li><a href="#">Nos conseils</a></li>
          </ul>
        </LinkSection>

        <LinkSection>
          <h4>Liens</h4>
          <ul>
            <li><a href="#">Actualités</a></li>
            <li><a href="#">Partenaires</a></li>
            <li><a href="#">Rapports</a></li>
          </ul>
        </LinkSection>

        <LinkSection>
          <h4>Support</h4>
          <ul>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Aide</a></li>
          </ul>
        </LinkSection>
      </FooterContent>

      <BottomBar>
        <p>&copy; 2026 ImmoStat Observatory. Tous droits réservés.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Mentions Légales</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Confidentialité</a>
        </div>
      </BottomBar>
    </FooterWrapper>
  );
}
