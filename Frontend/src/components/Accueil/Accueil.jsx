import { useNavigate } from 'react-router-dom';
import "./Accueil.css";
import Picture1 from '../../Assets/Picture1.jpeg';
import Picture2 from '../../Assets/picture2.jpeg';
import Certif from '../../Assets/certification.jpeg';
import Cours from '../../Assets/Cours.jpeg';
import Time from '../../Assets/time.jpeg';
import Acces from '../../Assets/accessibilite.jpeg';
import FAQ from '../FAQ';

function Accueil() {
  const navigate = useNavigate();

  // Redirection vers la page de connexion (Login)
  const goToLogin = () => {
    navigate('/login'); 
  };

  // Redirection vers la page d'inscription (Register)
  const goToRegister = () => {
    navigate('/register'); 
  };

  return (
    <div className="home-container">
      {/* Section Principale (Hero) */}
      <section className="hero">
        <div className="hero-content">
          <h1>Apprenez en ligne facilement, partout et à tout moment</h1>
          <p>Rejoignez une communauté dynamique et développez vos compétences.</p>
          <div className="hero-buttons">
            <button className="btn-secondary" onClick={goToRegister}>rejoindre un cours</button>
          </div>
          <div className="hero-features">
            <span>✅ Formateurs experts</span>
            <span>✅ Vidéos premium</span>
            <span>✅ Tarifs accessibles</span>
          </div>
        </div>
        <div className="hero-images">
        <div className="circle-container yellow">
            <img src={Picture1} alt="Étudiant heureux" />
          </div>
          <div className="circle-container blue">
            <img src={Picture2} alt="Apprentissage en ligne" />
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="about">
        <h2>Pourquoi nous choisir ?</h2>
        <div className="about-grid">
          <div className="about-item">
            <img src={Time} alt="Flexibilité horaire" />
            <h3>Flexibilité</h3>
            <p>Apprenez quand vous voulez, à votre rythme.</p>
          </div>
          <div className="about-item">
            <img src={Certif} alt="Certification" />
            <h3>Certifications</h3>
            <p>Obtenez des diplômes reconnus.</p>
          </div>
          <div className="about-item">
            <img src={Cours} alt="Cours variés" />
            <h3>+100 Cours</h3>
            <p>Un large catalogue de formations.</p>
          </div>
          <div className="about-item">
            <img src={Acces} alt="Accessibilité" />
            <h3>Multiplateforme</h3>
            <p>Disponible sur tous vos appareils.</p>
          </div>
        </div>
      </section>

      {/* Section d'Appel à l'Action */}
      <section className="cta">
        <h2>Prêt à commencer ?</h2>
        <button className="btn-primary" onClick={goToRegister}>
          S'inscrire maintenant
        </button>
      </section>
      <FAQ />  {/* FAQ ici */}
    </div>
  );
}

export default Accueil;