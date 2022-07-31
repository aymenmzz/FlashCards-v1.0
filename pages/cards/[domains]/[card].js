import { useRouter } from "next/router";
import Card from "../../../components/Card";
import React from "react";
import styles from "../../../styles/Home.module.css";

export default function FlashCard({ flashCards }) {
  const router = useRouter();
  const id = router.query.card;

  const [flashCard, setFlashCard] = React.useState();

  const getCurrentFlashCard = () => {
    //1) extraire dans une constante le domaine
    const domain = flashCards && flashCards.filter(
      (flashCard) => flashCard.titre === router.query.domains
    )[0];
    //2) extraire dans une constante la flash card associée à l'id
    const currentFlashCard = domain.flashCards.filter(
      (flashC) => flashC.id === id
    )[0];
    //3) renvoyer la constante créée en (2)
    return currentFlashCard;
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
            {id}
          </h2>
        </div>
      </div>{" "}
      <Card flashCard={getCurrentFlashCard()} />{" "}
    </>
  );
}
