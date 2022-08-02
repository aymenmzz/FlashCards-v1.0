import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import React from "react";
import Menu from "../components/Menu";
import {push} from "next/router"


export default function Home() {
  React.useEffect(()=> {
    const test = localStorage.getItem("FlashCard")
    if(!test) 
    {
    localStorage.setItem("FlashCard", "[]")
      push("/")
    }
  }, [])

  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        Bienvenue sur l&lsquo;application <br /> Flash Cards !{" "}
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft: 15,
          paddingRight: 15,
          marginBottom: 60,
        }}
      >
        <h3>Une Flash Card c&lsquo;est quoi ?</h3>
        <p className={styles.card}>
          Les Flash Cards sont en quelque sortes des fiches de révisions. Elles
          fournissent un court contenu d’informations avec des mots, des
          phrases, des questions, toujours en rapport avec un sujet et/ou un
          thème d’étude. Ces Flash Cards servent à favoriser la mémorisation
          active et constituent donc un outil utile pour l’apprentissage et
          l’étude des tâches qui nécessitent une mémorisation.
        </p>
        <br />
        <h3>Comment ça marche ? </h3>
        <p className={styles.card}>
          Si vous souhaitez retenir une information, rentrez une quesiton
          concernant l&lsquo;information ainsi que la réponse et votre Flash
          Card sera sauvegardée. Consultez ensuite cette Flash Card de temps en
          temps sans regarder la réponse pour la chercher dans votre mémoire, ce
          qui vous aidera à la retenir plus efficacement que par la méthode
          classique de répétition.
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Link href="/cards">
          <a>
            <button style={{color: 'black', backgroundColor: "lightgray"}} className={styles.consult} id="consult">
              Consulter mes FlashCards
            </button>
          </a>
        </Link>
        <Link href="/ajout">
          <a>
            <button style={{color: 'black', backgroundColor: "lightgray"}} className={styles.add} id="add">
              Ajouter une FlashCard
            </button>
          </a>
        </Link>
      </div>
    </>
  );
}
