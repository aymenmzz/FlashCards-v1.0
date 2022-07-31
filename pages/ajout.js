import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/Home.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "nanoid";

export default function Ajout({
  flashCards,
  addFlashCard,
  newFlashCard,
  addDomain,
}) {
  const router = useRouter();

  const [question, setQuestion] = React.useState(() => "");
  const [reponse, setReponse] = React.useState(() => "");
  const [titre, setTitre] = React.useState(() => "");
  const [identifiant, setIdentifiant] = React.useState(() => "");


  const include = () => {
    let retour = false;
    flashCards.map((flashCard) => {
      if (flashCard.titre === titre) retour = true;
    });
    return retour;
  };

  const idIsIn = () => {
    let retour = false;
    if (identifiant === "") return retour;
    else {
      const currentDomain = flashCards && flashCards.filter(
        (flashCard) => flashCard.titre === titre
      )[0];
     currentDomain &&  currentDomain.flashCards.map((flashCard) => {
        if (flashCard.id === identifiant) retour = true;
      });
      return retour;
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "reponse":
        setReponse(value);
        break;
      case "question":
        setQuestion(value);
        break;
      case "titre":
        setTitre(value);
        break;
      case "identifiant":
        setIdentifiant(value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (question === "" || reponse === "" || titre === "")
      toast.error("Il manque une ou plusieurs informations");
    else if (!question.includes("?"))
      toast.error(
        "La question est incorrecte. Pensez à mettre un point d'interrogation à la fin."
      );
    else {
      if (idIsIn())
        toast.error(
          "Faites attention à ce que l'identifiant soit toujours différent pour chacune des Flash Cards d'un même domaine !"
        );
      else {
        const flashCard = {
          question,
          reponse,
          id: identifiant,
        };
        //si flashCards vide newFlashCard()
        if (!flashCards) {
          newFlashCard({ titre, flashCards: [flashCard] });
        }
        //sinon si domaine non existant addDomain()
        else if (!include()) {
          addDomain({ titre, flashCards: [flashCard] });
        }
        // sinon [domaine déjà existant] addFlashCard()
        else {
          addFlashCard(titre, flashCard);
        }
        toast.success(`La Flash Card sur ${titre} a été ajoutée !`);

        setQuestion("");
        setReponse("");
        setTitre("");
        setIdentifiant("");
      }
    }
  };

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
          style={{ marginLeft: 5 }}
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
          <h2 style={{ transform: "translateX(-4%)", textAlign: "center" }}>
            Ajout d&lsquo;une Flash Card
          </h2>
        </div>
      </div>
      <h3 style={{ textAlign: "center" }}>Comment ça marche ? </h3>
      <p className={styles.card}>
        Rentrez dans un premier temps le domaine concerné, vos Flash Cards
        seront organisées par domaines.
        <br />
        <br />
        Précisez ensuite la question correspondant à l&lsquo;information que
        vous souhaitez retenir.
        <br />
        <br />
        Enfin, inscrivez la réponse à la question que vous avez indiquée
        precédemment, puis validez.
        <br />
        <br />
        Pour mieux vous retrouver parmis vos Flash Cards, donnez leur un
        identifiant unique qui vous permettra de toutes les distinguer.
        <br />
        <br />
        Exemple : <br />
        Domaine : Matématiques
        <br /> Question : Combien font 1+1 ?<br /> Réponse : 2
        <br />
        Identifiant : 1+1
        <br /> <br />
        NB : Pour gagner du temps, vous pouvez accéder directement à vos Flash
        Cards une fois que vous les avez inscrites en cliquant{" "}
        <Link href="/cards">
          <a
            style={{
              color: "rgba(240, 0, 72, 0.85)",
              textDecoration: "underline",
            }}
          >
            ici
          </a>
        </Link>
        .
      </p>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="titre"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 adjust-logo"
            style={{ width: 20 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <input
            placeholder="Domaine"
            onChange={handleChange}
            id="titre"
            value={titre}
          />
        </label>
        <label
          htmlFor="question"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 adjust-logo"
            style={{ width: 20 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <input
            onChange={handleChange}
            placeholder="Question"
            id="question"
            value={question}
          />
        </label>
        <label
          htmlFor="reponse"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 adjust-logo"
            style={{ width: 20 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <input
            onChange={handleChange}
            placeholder="Réponse"
            id="reponse"
            value={reponse}
          />
        </label>
        <label
          htmlFor="identifiant"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 adjust-logo"
            style={{ width: 20 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
            />
          </svg>
          <input
            onChange={handleChange}
            placeholder="Identifiant"
            id="identifiant"
            value={identifiant}
          />
        </label>
        <button
          className={styles.card}
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            margin: 0,
            marginTop: 10,
            color: "black",
          }}
          type="submit"
        >
          Valider
        </button>
        <ToastContainer />
      </form>
    </>
  );
}
