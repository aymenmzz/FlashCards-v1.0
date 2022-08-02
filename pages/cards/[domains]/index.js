import { useRouter } from "next/router";
import React from "react";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";

export default function RenderDomains({ flashCards, removeFlashCard }) {
  const router = useRouter();
  const domain = router.query.domains;
  console.log(flashCards)
  
  const [exist, setExist] = React.useState(
    (function () {
      let retourExist = false;
      flashCards && flashCards.map((flashCard) => {
        if (flashCard.titre === "" + domain) retourExist = true;
      });
      return retourExist;
    })()
  );

  const card = (function () {
    let retour = null;
    flashCards && flashCards.map((flash) => {
      if (flash.titre === domain) {
        retour = flash;
      }
    });
    return retour;
  })();
  
  const [cards, setCards] = React.useState(
    flashCards && flashCards.filter((flash) => flash.titre === domain)[0]
    );
    
    React.useEffect(() => {
      let retourExist = false;
      flashCards && flashCards.map((flashCard) => {
        if (flashCard.titre === domain) retourExist = true;
      });
    setExist(retourExist);
    let retour = null;
    flashCards && flashCards.map((flash) => {
      if (flash.titre === domain) {
        retour = flash;
      }
    });
    setCards(retour);
  }, [flashCards]);
  //écrire une variable render pour y mettre les flash cards associées au domaine courant
  try {
  return (
    <>
      { flashCards ? (
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
                {/* {exist ? `Mes Flash Cards sur ${domain}` : "Erreur"} */}
                Mes Flash Cards sur {domain}
              </h2>
            </div>
          </div>
          <>
            {cards.flashCards.map((flashCard, index) => {
              return (
                <div
                className={styles.card}
                key={index}
                style={{
                  marginBottom: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                >
                  <Link href={`/cards/${domain}/${flashCard.id}`}>
                    <h3 style={{ cursor: "pointer", marginRight: 10 }}>
                      {flashCard.id}
                    </h3>
                  </Link>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 adjust-logo"
                    style={{ width: 20, marginLeft: 10, marginTop: 2 }}
                    onClick={() => removeFlashCard(domain, flashCard.id)}
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
                </div>
              );
            })}
          </>
        </>
      ) : (
        ""
      )}
    </>
  );
}
  catch(e) {
    console.log(e)
    return <></>
  }
}

{
  /* mettre ici la variable render contenant du jsx pour afficher toutes les flash cards associées au domaine courant */
}
{
  /* {exist ? "" : <p>Erreur, il n'y aucun domaine au nommé {domain}</p>} */
}
