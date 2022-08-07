import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Annexe() {
  //servira pour les prochains ajouts
  const versions = [
    { version: "1.0", date: "31/07/2022" },
    { version: "1.1", date: "07/08/2022" },
  ];
  return (
    <>
      <div
        style={{
          display: "flex",
          paddingRight: 10,
          paddingLeft: 15,
        }}
      >
        <Link href="/">
          <a>
            <svg
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
          </a>
        </Link>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <h2 style={{ transform: "translateY(-15px)", marginRight: "5%" }}>
            Annexe
          </h2>
        </div>
      </div>
      <h3 style={{ textAlign: "center" }}>
        Comment a été codée cette application ?
      </h3>
      <p className={styles.card}>
        Cette application a été codée en utilisant le framework React et Next.
      </p>
      <br />
      <h3 style={{ textAlign: "center" }}>Comment a-t-elle été déployée ? </h3>
      <p className={styles.card}>
        Elle a été deployée en utilisant{" "}
        <a
          style={{
            color: "#539ef3",
          }}
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          vercel
        </a>
        .
      </p>
      <br />
      <h3 style={{ textAlign: "center" }}>
        Plus de détails sur l&lsquo;applicaton
      </h3>
      <p className={styles.card} style={{ marginBottom: 20 }}>
        Cette application est la version 1.1.
        <br />
        La version 1.0 date du 31/07/2022. Elle ne permettait que la création de
        flashCards, pas la sauvegarde.
        <br />
        La dernière mise à jour date du 07/08/2022.
        <br />
        Elle a été codée à partir du 24/07/2022.
      </p>
    </>
  );
}
