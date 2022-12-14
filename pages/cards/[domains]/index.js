import { useRouter, push } from "next/router";
import React from "react";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";
import { UserContext } from "../../../components/MyContext";

function RenderDomains({ removeFlashCard }) {
  const router = useRouter();
  const domain = router.query.domains;

  const flashCards = React.useContext(UserContext);

  const [cards, setCards] = React.useState(
    flashCards && flashCards.filter((flash) => flash.titre === domain)[0]
  );

  React.useEffect(() => {
    let retour = null;
    flashCards &&
      flashCards.map((flash) => {
        if (flash.titre === domain) {
          retour = flash;
        }
      });
    setCards(retour);
  }, [flashCards]);

  const rendered =
    flashCards && flashCards.length > 0 ? (
      <>
        <div
          style={{
            display: "flex",
            paddingRight: 10,
            paddingLeft: 15,
          }}
        >
          <svg
            onClick={() => push("/cards")}
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
              Mes Flash Cards sur {domain}
            </h2>
          </div>
        </div>
        <br />
        <br />

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
    );
  try {
    return <>{rendered}</>;
  } catch (e) {
    typeof window !== "undefined" && push("/cards/" + domain);

    typeof window !== "undefined" &&
      console.log(JSON.parse(localStorage.getItem("FlashCar")));
    console.log(flashCards);
    console.log(e);
    return <></>;
  }
}

export default RenderDomains;
