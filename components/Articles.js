const articles = [
  {
    video: false,
    link: "https://nairaquest.com/fr/topics/6796-lewis-s-theory-of-active-and-inactive-memory",
    title: "Théorie de la mémoire active et inactive",
  },
  {
    video: false,
    link: "http://www.reussir-ses-etudes.com/les-flashcards-pour-apprendre-facilement-ses-cours/",
    title: "Une solution  pour de meilleurs révisions",
  },
  {
    video: false,
    link: "https://www.persee.fr/doc/comm_0588-8018_1989_num_49_1_1741",
    title: "Extrait d'un livre sur l'oubli et la mémoire",
  },
  {
    video: true,
    link: "https://www.youtube.com/watch?v=n3CkA3Qc8kY",
    title: "Les Flash Cards pour réviser et retenir efficacement",
  },
  {
    video: true,
    link: "https://www.youtube.com/watch?v=Y5XjZ-q9brI",
    title: "Différentes méthodes de mémorisation active par questionnement",
  },
  {
    video: true,
    link: "https://www.youtube.com/watch?v=Uhyk2bRTguI",
    title:
      "3 manières de se rappeler d'une information déjà présente dans la mémoire (en anglais)",
  },
];

export default function Articles() {
  const render = articles.map((article, index) => {
    return (
      <div key={index} style={{ color: "black" }}>
        {article.title !== "" ? (
          window.outerHeight < 795 && window.outerWidth < 500 ? (
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <h6 style={{ textAlign: "center", width: "100%" }}>{`${
                index + 1
              }) [${article.video ? "Vidéo" : "Article"}] ${
                article.title
              }`}</h6>
            </a>
          ) : (
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <h4 style={{ textAlign: "center", width: "100%" }}>{`${
                index + 1
              }) [${article.video ? "Vidéo" : "Article"}] ${
                article.title
              }`}</h4>
            </a>
          )
        ) : (
          ""
        )}
      </div>
    );
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginTop: "2%",
        paddingLeft: window.outerWidth > 1000 ? 55 : 10,
        paddingRight: window.outerWidth > 1000 ? 55 : 10,
      }}
    >
      {render}
    </div>
  );
}
