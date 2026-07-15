function generaAnnuncio() {

    let marca = document.querySelector("#marca").value;
    let categoria = document.querySelector("#categoria").value;
    let taglia = document.querySelector("#taglia").value;
    let prezzo = document.querySelector("#prezzo").value;
    let condizioni = document.querySelector("#condizioni").value;
    let descrizione = document.querySelector("#descrizione").value;
    let marketplace = document.querySelector("#marketplace").value;
    
    let titolo = "";
    let testoGenerato = "";
    let punteggioAI = 0;
    let suggerimentiAI = [];
    
if (marketplace === "vinted") {
if (marca !== "") {
    punteggioAI += 2;
} else {
    suggerimentiAI.push("Inserisci la marca del prodotto.");
}

if (categoria !== "") {
    punteggioAI += 2;
} else {
    suggerimentiAI.push("Inserisci la categoria.");
}

if (prezzo !== "") {
    punteggioAI += 2;
} else {
    suggerimentiAI.push("Inserisci il prezzo.");
}

if (descrizione.length > 20) {
    punteggioAI += 2;
} else {
    suggerimentiAI.push("Aggiungi una descrizione più dettagliata.");
}

if (condizioni !== "") {
    punteggioAI += 2;
} else {
    suggerimentiAI.push("Inserisci le condizioni.");
}
    titolo = `${marca} ${categoria} | Taglia ${taglia}`;

    testoGenerato = `
🌸 ${categoria} ${marca} in ${condizioni.toLowerCase()}.

${descrizione}

📏 Taglia: ${taglia}

💰 Prezzo: €${prezzo}

✨ Spedizione veloce e massima disponibilità.
Scrivimi pure se hai domande 😊
`;

}
let risultato = `

<div class="scheda-annuncio">

    <h2>✨ Anteprima Annuncio</h2>


    <h3>📦 Titolo</h3>

    <div class="campo-output">

        <p id="titoloAnnuncio">${titolo}</p>

        <button onclick="copiaTesto('#titoloAnnuncio')">
            📋 Copia Titolo
        </button>

    </div>


    <h3>📝 Descrizione</h3>

    <div class="campo-output">

        <p id="testoAnnuncio">

${testoGenerato}

        </p>

        <button onclick="copiaTesto('#testoAnnuncio')">
            📋 Copia Descrizione
        </button>

    </div>


    <h3>💰 Prezzo</h3>

    <div class="campo-output">

        <p id="prezzoAnnuncio">
            €${prezzo}
        </p>

        <button onclick="copiaTesto('#prezzoAnnuncio')">
            📋 Copia Prezzo
        </button>
        <br><br>

<button onclick="copiaAnnuncioCompleto()">
    🚀 Copia Annuncio Completo
</button>

    </div>


<div class="ai-card">

    <h2>🤖 Analisi AI</h2>

   <p><strong>Punteggio:</strong> ${punteggioAI}/10 ⭐</p>
   
   <ul>

        <li>✅ Titolo completo</li>

        <li>✅ Prezzo presente</li>

        <li>${suggerimentiAI.length > 0 ? suggerimentiAI.join("<br>") : "✅ Annuncio completo, ottimo lavoro!"}</li>

    </ul>

</div>

`;

document.querySelector("#risultato").innerHTML = risultato;

}

function copiaTitolo() {

    let titolo = document.querySelector("#titoloAnnuncio").innerText;

    navigator.clipboard.writeText(titolo);

    mostraMessaggio();

}


function copiaAnnuncio() {

    let testo = document.querySelector("#testoAnnuncio").innerText;

    navigator.clipboard.writeText(testo);

    mostraMessaggio();

}

function copiaTesto(idElemento) {

    let elemento = document.querySelector(idElemento);

    if (!elemento) {
        console.log("Elemento non trovato:", idElemento);
        return;
    }

    let testo = elemento.innerText;

    navigator.clipboard.writeText(testo)
        .then(() => {

            console.log("Copiato:", testo);

            mostraMessaggio();

        })
        .catch((errore) => {

            console.log("Errore copia:", errore);

        });

}

function mostraMessaggio() {

    let messaggio = document.createElement("div");

    messaggio.innerHTML = "✅ Copiato negli appunti!";

    messaggio.className = "messaggio-copia";

    document.body.appendChild(messaggio);


    setTimeout(() => {

        messaggio.remove();

    }, 3000);

}
function copiaAnnuncioCompleto() {

    let titolo = document.querySelector("#titoloAnnuncio").innerText;

    let descrizione = document.querySelector("#testoAnnuncio").innerText;

    let prezzo = document.querySelector("#prezzoAnnuncio").innerText;


    let testoCompleto = 
`Titolo:
${titolo}

Descrizione:
${descrizione}

Prezzo:
${prezzo}`;


    navigator.clipboard.writeText(testoCompleto)
    .then(() => {

        mostraMessaggio();

    });

}