import React, { useState } from 'react';

const AddVideoAdvice = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  // Fonction pour gérer l'importation d'une vidéo
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile({
        file,
        name: file.name,
        size: file.size
      });
    }
  };

  // Fonction pour publier la vidéo (vous pouvez ajouter la logique pour soumettre le formulaire ici)
  const handlePublish = () => {
    alert('La vidéo a été publiée!');
    // Ajoutez ici la logique pour soumettre les données du formulaire
  };

  return (
    <div>
      <h2>Ajouter un conseil vidéo</h2>
      <form>


        {/* Bouton pour importer une vidéo */}
        <div className="form-group mt-3">
          <label htmlFor="video-upload">Importer une vidéo</label>
          <input
            type="file"
            id="video-upload"
            className="form-control"
            accept="video/*"
            onChange={handleVideoUpload}
          />
          {videoFile && (
            <div className="mt-2">
              <strong>Vidéo importée :</strong> {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>

        {/* Bouton pour filmer une vidéo */}
        <div className="form-group mt-3">
         
          <button type="button" className="btn btn-primary mt-3" onClick={() => alert('Fonction de caméra à implémenter')}>
            Filmer maintenant
          </button>
        </div>

        {/* Bouton pour publier la vidéo */}
        <button type="button" className="btn btn-primary mt-3" onClick={handlePublish}>
          Publier la vidéo
        </button>
      </form>
    </div>
  );
};

export default AddVideoAdvice;
