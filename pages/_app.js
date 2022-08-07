import "../styles/globals.css";
import Layout from "../components/Layout";
import React from "react";
import { useRouter, push } from "next/router";
import useSWR from "swr";
import Loading from "react-loading";
import { UserContext } from "../components/MyContext";

function MyApp({ Component, pageProps }) {
  const test = useSWR("fetch", async () => {
    return JSON.parse(localStorage.getItem("FlasCards"));
  });
  console.log("test : ", test);
  // console.log("data : ", data);

  const val =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("FlashCards"));

  // if (!data) return <Loading />;

  const [flashCards, setFlashCards] = React.useState(val ? val : []);

  console.log(flashCards);
  const flashs = React.useMemo(() => val, [val]);

  console.log("flashCards : ", flashs);

  // React.useEffect(() => {
  //   const initialise = () => {
  //     setFlashCards(JSON.parse(localStorage.getItem("FlashCards")));
  //   };
  //   return initialise();
  // }, []);

  React.useEffect(() => {
    flashCards &&
      localStorage.setItem("FlashCards", JSON.stringify(flashCards));
  }, [flashCards]);

  const vide = () => {
    let retour = true;
    flashCards &&
      flashCards.map((flashCard) => {
        if (flashCard.flashCards.length > 0) retour = false;
      });
    return retour;
  };

  const getCard = (domain) => {
    return (
      flashCards && flashCards.filter((flash) => flash.titre === domain)[0]
    );
  };

  const save = (val) => {
    localStorage.setItem("FlashCards", JSON.stringify(val));
    setFlashCards(JSON.parse(localStorage.getItem("FlashCards")));
  };
  //pour accéder plus rapidement à une flashCard associée à un domaine
  const getFlashCardsByDomain = (domain) => {
    let retour = null;
    flashCards &&
      flashCards.map((flashCard) => {
        if (flashCard.titre === domain) retour = flashCard;
      });
    return retour;
  };

  //pour ajouter un nouveau domaine
  const addNewDomain = (newFlash) => {
    // setFlashCards((prevFlash) => [...prevFlash, newFlash]);
    console.log("final result : ", [...flashCards, newFlash]);
    save([...flashCards, newFlash]);
  };
  //sert à rajouter une flashCard à un domaine déjà existant
  const addFlashCardToDomain = (domain, flashCard) => {
    const retour = []; // variable pour réecrire le state
    //1) extraire le domaine du state dans une variable mutable
    let mutableDomain =
      flashCards &&
      flashCards.filter((flashCard) => flashCard.titre === domain)[0];
    //2) ajouter la flashCard dans la variable
    mutableDomain.flashCards.push(flashCard);
    //3) remplacer les valeurs associées au domaine en question dans
    //une nouvelle variable qui sera ajoutée dans le state
    flashCards &&
      flashCards.map((flashCard) => {
        if (flashCard.titre === domain) retour.push(mutableDomain);
        else retour.push(flashCard);
      });
    //4) mettre à jour le state
    // setFlashCards(retour);
    //5) sauvegarder les modifications
    save(retour);
  };

  //pour supprimer une flash card d'un domaine
  const removeFlashCard = (domain, id) => {
    let finalValue = [];
    //1) extraire le domaine dans une variable mutable
    let mutableDomain =
      flashCards &&
      flashCards.filter((flashCard) => flashCard.titre === domain)[0];
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
      flashCards &&
        flashCards.map((flashCard) => {
          if (flashCard.titre === domain) finalValue.push(mutableDomain);
          else finalValue.push(flashCard);
        });
      push(`/cards/${domain}`);
    } else {
      flashCards &&
        flashCards.map((flashCard) => {
          if (flashCard.titre !== mutableDomain.titre)
            finalValue.push(flashCard);
        });
      vide() ? push("/") : push("/cards");
    }
    //4) mettre à jour le state
    // setFlashCards(finalValue);
    //5) sauvegarder les modifications
    save(finalValue);
  };

  //pour supprimer un domaine
  const deleteDomain = (domain) => {
    // setFlashCards((prevFlash) =>
    //   prevFlash.filter((flashCard) => flashCard.titre !== domain)
    // );
    save(flashCards.filter((flashCard) => flashCard.titre !== domain));
    vide() ? push("/") : push("/cards");
  };

  //pour tout remettre à 0
  const restore = () => {
    typeof window !== "undefined" && localStorage.setItem("FlashCards", "[]");
    setFlashCards([]);
    push("/");
  };

  //au lancement de l'application, aucune flashCard n'est attribuée,
  //cette fonction sera appellé à ce moment pour initialiser
  //la variable localStorage
  const newFlashCard = (firstFlash) => {
    // localStorage.setItem("FlashCards", JSON.stringify([firstFlash]));
    // setFlashCards([firstFlash]);
    save([firstFlash]);
  };

  return (
    <UserContext.Provider value={typeof window !== "undefined" && flashCards}>
      <Layout>
        <Component
          {...pageProps}
          addDomain={addNewDomain}
          addFlashCard={addFlashCardToDomain}
          newFlashCard={newFlashCard}
          removeFlashCard={removeFlashCard}
          vide={vide}
          deleteDomain={deleteDomain}
          restore={restore}
        />
      </Layout>
    </UserContext.Provider>
  );
}

export default React.memo(MyApp);

// flashCards={flashCards && flashCards}
