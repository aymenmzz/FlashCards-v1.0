import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

function Accueil({ flashCards, vide }) {
  const render = flashCards && flashCards.map((flashCard, index) => {
    return flashCard.flashCards.length > 0 ? (
      <div key={index}>
        <Link href={`/cards/${flashCard.titre}`}>
          <h3
            className={styles.card}
            style={{ marginBottom: 20, cursor: "pointer" }}
          >
            {flashCard.titre}
          </h3>
        </Link>
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
          onClick={() => router.back()}
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
            Mes Domaines
          </h2>
        </div>
      </div>
      {flashCards === null || vide() || render === [false] ? (
        <>
          {/* Si Aucune Flash Card n'est présente après avoir fetch LocalStorage */}
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
        <>{render}</>
      )}
      {/* Sinon ....... */}
    </>
  );
}

export default Accueil;
