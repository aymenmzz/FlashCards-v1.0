import Link from "next/link";
import React from "react";
import { useRouter, push } from "next/router";
import styles from "../../styles/Home.module.css";
import { UserContext } from "../../components/MyContext";

function Accueil({ vide, restore, deleteDomain }) {
  const flashCards = React.useContext(UserContext);
  const rendered =
    flashCards &&
    flashCards.map((flashCard, index) => {
      return flashCard.flashCards.length > 0 ? (
        <div key={index} style={{ minHeight: "100%" }}>
          <h3
            className={styles.card}
            style={{ marginBottom: 20, cursor: "pointer" }}
          >
            <Link href={`/cards/${flashCard.titre}`}>{flashCard.titre}</Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 adjust-logo"
              style={{ width: 20, marginLeft: 10, marginTop: 2 }}
              onClick={() => deleteDomain(flashCard.titre)}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </h3>
        </div>
      ) : (
        ""
      );
    });
  const router = useRouter();
  return (
    <>
      <div
        style={{
          display: "flex",
          paddingRight: 10,
          paddingLeft: 15,
        }}
      >
        <svg
          onClick={() => push("/")}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 adjust-logo"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <h2 style={{ transform: "translateY(0)", marginRight: "5%" }}>
            Mes Domaines{" "}
            {!(flashCards === null || vide() || rendered === [false]) && (
              <button onClick={() => restore()}>tout supprimer</button>
            )}
          </h2>
        </div>
      </div>
      <br />
      <br />

      {flashCards === null || vide() || rendered === [false] ? (
        <>
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>
            Vous n&lsquo;avez aucune Flash Card pour le moment !
          </h2>

          <p
            className={styles.card}
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            Vous pouvez dès maintenant vous en créer une ou plusieurs en
            procédant comme suit :
            <br /> <br />
            Dirigez-vous vers la page d&lsquo;ajout en cliquant{" "}
            <Link href="/ajout">
              <a
                style={{
                  color: "rgba(240, 0, 72, 0.85)",
                  textDecoration: "underline",
                }}
              >
                ici
              </a>
            </Link>{" "}
            <br />
            <br />
            Ajoutez autant de Flash Cards que nécessaire en suivant les
            directives qui vous seront indiquées.
          </p>
          <br />
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>
            Ressources additionnelles{" "}
          </h2>
          <p className={styles.card} style={{ marginBottom: 25 }}>
            Quelques notions en rapport avec l&lsquo;utilité des Flash Cards
            sont dispoibles en cliquant sur la barre de menu située en haut à
            gauche de votre écran.
            <br />
            <br />
            Vous y trouverez notamment des articles, des vidéos, ainsi
            qu&lsquo;un extrait de livre.
            <br />
            <br />
            NB : Ces ressources ne servent qu&lsquo;à donner à
            l&lsquo;utilisateur des pistes de recherches pour approfondir
            certaines connaissance, elles ne sont en aucun cas une fin en soi.
          </p>
        </>
      ) : (
        <>{rendered}</>
      )}
    </>
  );
}

export default Accueil;
