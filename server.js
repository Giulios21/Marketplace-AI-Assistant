const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {

    res.send("Backend AI attivo 🚀");

});

app.post("/genera", async (req, res) => {

    try {
        const { prodotto, descrizione, marketplace } = req.body;
        const risposta = await axios.post(
            "http://localhost:11434/api/generate",
            {
                model: "llama3.2:3b",
                temperature: 0.2,
                prompt: `
Sei un assistente AI esperto nella creazione di annunci per marketplace come Vinted, Subito ed eBay.

Devi creare un annuncio professionale.
Regole:

- Usa solo le informazioni presenti nei campi Prodotto e Descrizione forniti dall'utente.
- Non inventare mai caratteristiche, accessori, condizioni, materiali, componenti o dettagli tecnici.
- Non cambiare mai il tipo di prodotto indicato dall'utente.
- Se un'informazione non è presente, non inserirla.
- Non aggiungere parole come "originale", "garanzia", "scatola", "accessori inclusi", "batteria", "perfetto", "come nuovo" se non sono state fornite dall'utente.
- Il titolo deve essere breve, chiaro e ottimizzato SEO usando solo dati reali.
- La descrizione deve essere naturale e professionale, ma deve rimanere fedele alle informazioni ricevute.
- La descrizione deve essere una semplice riscrittura dei dati ricevuti, senza arricchimenti creativi.
- La descrizione può riformulare le informazioni fornite rendendole più naturali, ma senza aggiungere nessun dettaglio nuovo.
- Non aggiungere frasi pubblicitarie come "acquista ora", "imperdibile", "affrettati".
- I consigli SEO devono contenere solo hashtag e suggerimenti pertinenti al prodotto.
- Rispondi SOLO con JSON valido, senza testo prima o dopo.
- Il campo Prodotto è la fonte principale e non deve mai essere modificato.
- Usa esattamente il prodotto indicato dall'utente nel titolo e nella descrizione.
- Non sostituire mai il prodotto con un altro oggetto appartenente alla stessa categoria o a categorie diverse.
- Se i dati forniti sono insufficienti, crea un annuncio breve senza aggiungere dettagli.
- Se Prodotto o Descrizione sono vuoti, non generare un annuncio inventato. Restituisci JSON con un messaggio che indica che mancano informazioni.
- Non trasformare una condizione generica in caratteristiche aggiuntive.
Esempio: "ottime condizioni" non significa "perfettamente funzionante", "come nuovo" o altre qualità non indicate.

Prodotto:
${prodotto}

Descrizione:
${descrizione}

Marketplace:
${marketplace}

Formato obbligatorio:

{
  "titolo": "",
  "descrizione": "",
  "consigli_seo": ""
}
`,
                stream: false,
                format: "json"
            }
        );

const output = risposta.data.response;

let jsonPulito;

try {

    jsonPulito = JSON.parse(output);

} catch (errore) {

    jsonPulito = {
        errore: "Risposta AI non in formato JSON",
        risposta: output
    };

}


res.json(jsonPulito);

    } catch (errore) {

        console.log(errore);

        res.status(500).json({
            errore: "Errore collegamento Ollama"
        });

    }

});


app.listen(3000, () => {

    console.log("Server avviato sulla porta 3000");

});