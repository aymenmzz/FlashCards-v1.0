import fs from "fs";
import path from "path";


export function buildFlashCardsPath() {
  return path.join(process.cwd(), 'data', 'flashCards.json');
}

export function extractFlashCards(filePath) {
  const data = fs.readFileSync(filePath)
  const retour = JSON.parse(data)
  return retour;
}

function handler(req, res) {

  if(req.method === 'POST') {
    const filePath = buildFlashCardsPath()
    fs.writeFileSync(filePath, JSON.stringify(req.body))
    res.status(201).json({message: "Récupération effectuée avec succès !"})
  }
  else
  res.status(200).json({ name: 'John Doe' })
}


export default handler;