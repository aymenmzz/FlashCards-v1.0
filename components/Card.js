import React from "react";
import styles from "../styles/Home.module.css";

export default function Card({ flashCard }) {
  const [afficherReponse, setAfficherReponse] = React.useState(false);

  return (
    <>
      <div className={styles.card} style={{ marginTop: 120 }}>
        <h2>{afficherReponse ? flashCard?.reponse : flashCard?.question}</h2>
        <button
          className={styles.buttonRouter}
          style={{ marginBottom: 0, marginTop: 25 }}
          onClick={() => setAfficherReponse((prevRep) => !prevRep)}
        >
          {" "}
          Afficher la {afficherReponse ? "question" : "réponse"}{" "}
        </button>
      </div>
    </>
  );
}
