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

Devi creare un annuncio usando ESCLUSIVAMENTE i dati forniti dall'utente.

IMPORTANTE:
- Non inventare mai informazioni.
- Non aggiungere caratteristiche non presenti.
- Non cambiare mai il prodotto.
- Se manca un dato, ignoralo.
- Se il prodotto è "Nike Air Force 1", devi scrivere Nike Air Force 1.
- Non usare segnaposto come [Modello], [Stato], [Descrizione].

Rispondi solo in JSON.

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