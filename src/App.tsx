import React, { useState } from "react";
import "./styles.css"; // Assure-toi que le fichier CSS est bien importé

function App() {
  const [taches, setTaches] = useState([]);
  const [nouvelleTache, setNouvelleTache] = useState("");

  function ajouterUneTache() {
    if (nouvelleTache.trim() !== "") {
      const tache = {
        id: Math.random(),
        texte: nouvelleTache,
        terminee: false,
      };

      setTaches([...taches, tache]);
      setNouvelleTache("");
    }
  }

  function supprimerTache(id) {
    const nouvelleListe = taches.filter((t) => t.id !== id);
    setTaches(nouvelleListe);
  }

  function terminerTache(id) {
    const nouvelleListe = taches.map((t) => {
      if (t.id === id) {
        return { ...t, terminee: !t.terminee };
      } else {
        return t;
      }
    });

    setTaches(nouvelleListe);
  }

  function toutSupprimer() {
    setTaches([]);
  }

  // Séparer les tâches pour l'affichage
  const enCours = taches.filter((t) => t.terminee === false);
  const terminees = taches.filter((t) => t.terminee === true);

  return (
    <div className="app-container">
      <h1>ma liste:)</h1>
      <p className="stats">{taches.length} tâches au total</p>

      <div className="input-group">
        <input
          type="text"
          placeholder="Écrire ici..."
          value={nouvelleTache}
          onChange={(e) => setNouvelleTache(e.target.value)}
        />
        <button className="btn-add" onClick={ajouterUneTache}>
          Ajouter
        </button>
      </div>

      <h3>En cours</h3>
      <ul className="task-list">
        {enCours.map((t) => (
          <li key={t.id} className="task-item">
            <span>{t.texte}</span>
            <div>
              <button className="btn-task" onClick={() => terminerTache(t.id)}>
                Fait
              </button>
              <button
                className="btn-task"
                style={{ marginLeft: "5px", borderColor: "#FFB7C5" }}
                onClick={() => supprimerTache(t.id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Terminées</h3>
      <ul className="task-list">
        {terminees.map((t) => (
          <li key={t.id} className="task-item" style={{ opacity: 0.6 }}>
            <span style={{ textDecoration: "line-through" }}>{t.texte}</span>
            <div>
              <button className="btn-task" onClick={() => terminerTache(t.id)}>
                Annuler
              </button>
              <button
                className="btn-task"
                style={{ marginLeft: "5px" }}
                onClick={() => supprimerTache(t.id)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button className="btn-delete-all" onClick={toutSupprimer}>
        Tout supprimer
      </button>
    </div>
  );
}

export default App;
