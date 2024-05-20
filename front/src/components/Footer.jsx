import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer>
    <section className="footer-content">
      <h3>BibliologieINC </h3>
      <p>les pages au bout de l'ecran</p>
        <ul className="socials">
          <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a></li>
          <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a></li>
          <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
        </ul>
    </section>
    <section className="footer-bottom">
      <address>
        <p>Adresse : 123 Rue Fictive, Ville Imaginaire, 10000</p>
        <p>Téléphone : +33 1 23 45 67 89</p>
        <p>Email : bibliologie_contact@exemple.com</p>
      </address>
      <p>© 2024 Bibliologie. Tous droits réservés.</p>
    </section>
  </footer>

  );
}

export default Footer;
