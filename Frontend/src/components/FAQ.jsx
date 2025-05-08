import React from 'react';

function FAQ() {
  return (
    <div className="mt-5 py-5" style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}>
      <h2 className="mb-4">Questions fréquentes</h2>
      <div className="accordion" id="faqAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="faqHeading1">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse1" aria-expanded="true" aria-controls="faqCollapse1">
              Qu'est-ce que we learn ?
            </button>
          </h2>
          <div id="faqCollapse1" className="accordion-collapse collapse show" aria-labelledby="faqHeading1" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              we learn est une plateforme éducative qui permet aux étudiants d'accéder à une gamme de cours diversifiés dans plusieurs domaines.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="faqHeading2">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse2" aria-expanded="false" aria-controls="faqCollapse2">
              Comment m'inscrire sur la plateforme ?
            </button>
          </h2>
          <div id="faqCollapse2" className="accordion-collapse collapse" aria-labelledby="faqHeading2" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Vous pouvez vous inscrire en cliquant sur le bouton "S'inscrire" en haut et en remplissant le formulaire avec les informations demandées.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="faqHeading3">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse3" aria-expanded="false" aria-controls="faqCollapse3">
              Quelles offres sont disponibles actuellement ?
            </button>
          </h2>
          <div id="faqCollapse3" className="accordion-collapse collapse" aria-labelledby="faqHeading3" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Actuellement, nous avons des offres spéciales sur certaines formations qui vous permettent d'y accéder à prix réduit.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="faqHeading4">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse4" aria-expanded="false" aria-controls="faqCollapse4">
              Comment m'abonner à une offre ?
            </button>
          </h2>
          <div id="faqCollapse4" className="accordion-collapse collapse" aria-labelledby="faqHeading4" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Pour vous abonner à une offre, sélectionnez la formation de votre choix et suivez les étapes pour acheter l'offre ou vous inscrire au cours.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
