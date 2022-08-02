import "../styles/globals.css";
import Layout from "../components/Layout";
import React from "react";
import { nanoid } from "nanoid";
import { useRouter, push } from "next/router";

function MyApp({ Component, pageProps }) {


  const fetchDebut = () => {
    const test = localStorage.getItem("FlashCards")
    if(!test) { 
      localStorage.setItem("FlashCards", "[]")
    return []
}
    else return JSON.parse(test)
  }

  const [flashCards, setFlashCards] = React.useState(
    typeof window !== "undefined" && fetchDebut()
  );
  React.useEffect(() => {
    localStorage.setItem("FlashCards",JSON.stringify(
        flashCards && flashCards.filter((flashCard) => flashCard.flashCards.length > 0))
    );
  }, [flashCards]);

  // React.useEffect(() => {
  //   const initialise = () => {
  //     setFlashCards(JSON.parse(localStorage.getItem("FlashCards")));
  //   };
  //   return initialise();
  // }, []);

  const vide = () => {
    let retour = true;
    flashCards && flashCards.map((flashCard) => {
      if (flashCard.flashCards.length > 0) retour = false;
    });
    return retour;
  };

  const getCard = (domain) => {
    return flashCards && flashCards.filter((flash) => flash.titre === domain)[0];
  };

  //pour accéder plus rapidement à une flashCard associée à un domaine
  const getFlashCardsByDomain = (domain) => {
    let retour = null;
    flashCards && flashCards.map((flashCard) => {
      if (flashCard.titre === domain) retour = flashCard;
    });
    return retour;
  };

  // fonction qui sera appellée à chaque modification du state flashCards
  //pour sauvegarder les modifications en local pour les prochaines utilisations
  const save = () => {
    typeof window !== "undefined"
      ? localStorage.setItem(
          "FlashCards",
          JSON.stringify(flashCards && flashCards)
        )
      : "";
  };

  save();
  //pour ajouter un nouveau domaine
  const addNewDomain = (newFlash) => {
    setFlashCards((prevFlash) => [...prevFlash, newFlash]);
    save();
  };
  //sert à rajouter une flashCard à un domaine déjà existant
  const addFlashCardToDomain = (domain, flashCard) => {
    const retour = []; // variable pour réecrire le state
    //1) extraire le domaine du state dans une variable mutable
    let mutableDomain = flashCards && flashCards.filter(
      (flashCard) => flashCard.titre === domain
    )[0];
    //2) ajouter la flashCard dans la variable
    mutableDomain.flashCards.push(flashCard);
    //3) remplacer les valeurs associées au domaine en question dans
    //une nouvelle variable qui sera ajoutée dans le state
    flashCards && flashCards.map((flashCard) => {
      if (flashCard.titre === domain) retour.push(mutableDomain);
      else retour.push(flashCard);
    });
    //4) mettre à jour le state
    setFlashCards(retour);
    //5) sauvegarder les modifications
    save();
  };

  //pour supprimer une flash card d'un domaine
  const removeFlashCard = (domain, id) => {
    let finalValue = [];
    //1) extraire le domaine dans une variable mutable
    let mutableDomain = flashCards && flashCards.filter(
      (flashCard) => flashCard.titre === domain
    )[0];
    //2) retirer la flashCard du domaine mutable
    const retour = [];
    mutableDomain.flashCards.map((flashCard) => {
      if (flashCard.id !== id) retour.push(flashCard);
    });
    mutableDomain.flashCards = retour;
    //3) conserver le changement dans une varibale pour modifier le state
    if (
      getFlashCardsByDomain(domain).flashCards[0] &&
      getFlashCardsByDomain(domain).flashCards.length > 0
    ) {
    flashCards && flashCards.map((flashCard) => {
        if (flashCard.titre === domain) finalValue.push(mutableDomain);
        else finalValue.push(flashCard);
      });
      push(`/cards/${domain}`)
}
    else {
      flashCards && flashCards.map((flashCard) => {
        if (flashCard.titre !== mutableDomain.titre) finalValue.push(flashCard);
      });
      vide() ? push("/") : push("/cards");
    }
    //4) mettre à jour le state
    // setFlashCards(finalValue);
    //5) sauvegarder les modifications
    vide() ? localStorage.removeItem("FlashCards") : save();
  };

  //pour supprimer un domaine
  const deleteDomain = (domain) => {
    setFlashCards(prevFlash => prevFlash.filter(flashCard => flashCard.titre !== domain))
    vide() ? push("/") : push("/cards")
  }

  //pour tout remettre à 0 
  const restore = () => {
    typeof window !== "undefined" && localStorage.setItem("FlashCards", "[]")
    push("/")
  }

  //au lancement de l'application, aucune flashCard n'est attribuée,
  //cette fonction sera appellé à ce moment pour initialiser
  //la variable localStorage
  const newFlashCard = (firstFlash) => {
    localStorage.setItem("FlashCards", JSON.stringify([firstFlash]));
    setFlashCards([firstFlash]);
  };

  return (
    <>
    {
      <Layout>
        <Component
          {...pageProps}
          flashCards={flashCards && flashCards}
          addDomain={addNewDomain}
          addFlashCard={addFlashCardToDomain}
          newFlashCard={newFlashCard}
          removeFlashCard={removeFlashCard}
          vide={vide}
          deleteDomain={deleteDomain}
          restore={restore}
        />
      </Layout>
      }
    </>
  );
}

export default MyApp;
