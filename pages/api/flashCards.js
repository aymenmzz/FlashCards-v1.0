import fs from "fs";
import path from "path";


export function buildFlashCardsPath() {
  return path.join(process.cwd(), 'data', 'flashCards.json');
}

export function extractFlashCards(filePath) {
  const data = fs.readFileSync(filePath)
  const retour = JSON.parse(data)
  console.log(retour)
  return retour;
}

function handler(req, res) {

    const filePath = buildFlashCardsPath()
    fs.writeFileSync(filePath, JSON.stringify(req.body))
    res.status(201).json({message: "Récupération effectuée avec succès !"})
  
}


export default handler;