let ultimoAnnuncio = "";

function generaAnnuncio() {

    let marca = document.querySelector("#marca").value.trim();
    let categoria = document.querySelector("#categoria").value.trim();
    let dettagli = document.querySelector("#dettagli").value.trim();
    let prezzo = document.querySelector("#prezzo").value.trim();
    let condizioni = document.querySelector("#condizioni").value.trim();
    let descrizione = document.querySelector("#descrizione").value.trim();
    let marketplace = document.querySelector("#marketplace").value;
    let fotoInput = document.querySelector("#foto");
    let foto = fotoInput.files.length;

    let titolo = "";
    let testoGenerato = "";
    let punteggioAI = 0;
    let suggerimentiAI = [];


    // ANALISI AI

    if (descrizione.length > 20) {
        punteggioAI += 4;
    } else {
        suggerimentiAI.push("Aggiungi una descrizione più dettagliata.");
    }


    if (condizioni !== "") {
        punteggioAI += 3;
    } else {
        suggerimentiAI.push("Specifica lo stato del prodotto.");
    }


    if (marca !== "" && categoria !== "") {
        punteggioAI += 3;
    } else {
        suggerimentiAI.push("Aggiungi marca e categoria per rendere il titolo più chiaro.");
    }


    if (prezzo !== "") {
        punteggioAI += 1;
    } else {
        suggerimentiAI.push("Inserisci un prezzo per aiutare l'acquirente.");
    }

     if (dettagli !== "") {
    punteggioAI += 1;
} else {
    suggerimentiAI.push("Aggiungi dettagli sul prodotto.");
}

    if (foto > 0) {
        punteggioAI += 2;
    } else {
        suggerimentiAI.push("Aggiungi una foto del prodotto per migliorare l'annuncio.");
    }


    punteggioAI = Math.min(punteggioAI, 10);



    titolo = `${marca} ${categoria}`.trim();



   if (marketplace === "vinted") {

    testoGenerato = generaVinted(titolo, descrizione,dettagli, prezzo);

} else if (marketplace === "subito") {

    testoGenerato = generaSubito(titolo, descrizione, dettagli, prezzo);

} else {

    testoGenerato = generaEbay(titolo, descrizione, dettagli, prezzo);

}

ultimoAnnuncio = testoGenerato;

salvaAnnuncio(titolo, testoGenerato, prezzo, marketplace);


    let risultato = `

<div class="scheda-annuncio">

<h2>✨ Anteprima Annuncio</h2>

${foto > 0 ? `
<div class="foto-annuncio">
    <img src="${URL.createObjectURL(fotoInput.files[0])}">
</div>
` : ""}

<h3>📦 Titolo</h3>

<div class="campo-output">

<p id="titoloAnnuncio">${titolo}</p>

<button onclick="copiaTesto('#titoloAnnuncio')">
📋 Copia Titolo
</button>

</div>



<h3>📝 Descrizione</h3>

<div class="campo-output">

<p id="testoAnnuncio">${testoGenerato}</p>

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


<p>
<strong>Punteggio:</strong> ${punteggioAI}/10 ⭐
</p>


<ul>

<li>✅ Titolo generato</li>

<li>✅ Annuncio ottimizzato</li>


<li>
${suggerimentiAI.length > 0 
? suggerimentiAI.map(s => "⚠️ " + s).join("<br>")
: "✅ Annuncio completo, ottimo lavoro!"}
</li>


</ul>


</div>


</div>

`;



document.querySelector("#risultato").innerHTML = risultato;

}




// COPIA TESTO

function copiaTesto(idElemento) {

    let elemento = document.querySelector(idElemento);

    if (!elemento) {
        return;
    }


    navigator.clipboard.writeText(elemento.innerText)
    .then(() => {

        mostraMessaggio();

    });

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




function mostraMessaggio() {


    let messaggio = document.createElement("div");


    messaggio.innerHTML = "✅ Copiato negli appunti!";


    messaggio.className = "messaggio-copia";


    document.body.appendChild(messaggio);



    setTimeout(() => {

        messaggio.remove();

    },3000);


}




// ANTEPRIMA FOTO


const fotoInput = document.getElementById("foto");

const anteprima = document.getElementById("anteprima-foto");


if (fotoInput) {


fotoInput.addEventListener("change", function () {


    const file = this.files[0];


    if (!file) {

        anteprima.innerHTML = "";

        return;

    }


    const reader = new FileReader();


    reader.onload = function(e) {

        anteprima.innerHTML =
        `<img src="${e.target.result}" alt="Anteprima prodotto">`;

    };


    reader.readAsDataURL(file);


});


}

function generaVinted(titolo, descrizione, dettagli, prezzo) {
    
    let fraseAI = generaFraseAI(titolo)
    return `
✨ ${titolo}

${descrizione}

${fraseAI}

📌 Dettagli: ${dettagli}


💰 Prezzo: €${prezzo}

📦 Spedizione disponibile tramite Vinted.
💬 Scrivimi pure per qualsiasi informazione 😊
`;

}

function generaSubito(titolo, descrizione,dettagli, prezzo ) {
    
    let fraseAI = generaFraseAI(titolo);


    return `
📢 ${titolo}

${descrizione}

${fraseAI}

📌 Dettagli: ${dettagli}

💰 Prezzo richiesto: €${prezzo}

🚚 Possibilità di spedizione o consegna a mano.

📩 Contattami per qualsiasi informazione.
`;

}

function generaEbay(titolo, descrizione, dettagli, prezzo) {
    
    let fraseAI = generaFraseAI(titolo);

    return `
🏷️ ${titolo}

${descrizione}

${fraseAI}

📌 Dettagli: ${dettagli}

💰 Price: €${prezzo}

📦 Accurate packaging and fast shipping.

⭐ Feel free to contact me for any questions.
`;

}

function generaFraseAI(categoria) {

    categoria = categoria.toLowerCase();

    if (categoria.includes("scarpa")) {
        return "👟 Ideali per un utilizzo quotidiano, comode e curate nei dettagli.";
    }

    if (categoria.includes("iphone") || categoria.includes("telefono") || categoria.includes("smartphone")) {
        return "📱 Perfettamente funzionante e pronto all'utilizzo.";
    }

    if (categoria.includes("playstation") || categoria.includes("xbox") || categoria.includes("console")) {
        return "🎮 Perfetta per il gaming, pronta per essere utilizzata.";
    }

    if (categoria.includes("felpa") || categoria.includes("maglia") || categoria.includes("giacca")) {
        return "👕 Capo versatile e facile da abbinare.";
    }

    if (categoria.includes("orologio")) {
        return "⌚ Elegante e adatto ad ogni occasione.";
    }

    return "✅ Prodotto tenuto con cura e pronto per un nuovo proprietario.";

}

function salvaAnnuncio(titolo, descrizione, prezzo, marketplace) {

    let annunci = JSON.parse(localStorage.getItem("annunci")) || [];

    annunci.push({
        titolo: titolo,
        descrizione: descrizione,
        prezzo: prezzo,
        marketplace: marketplace,
        data: new Date().toLocaleDateString()
    });

    localStorage.setItem("annunci", JSON.stringify(annunci));

    mostraCronologia();
}


function mostraCronologia() {

    let contenitore = document.querySelector("#cronologia");

    if (!contenitore) return;

    let annunci = JSON.parse(localStorage.getItem("annunci")) || [];

    contenitore.innerHTML = "<h2>📚 Cronologia annunci</h2>";

   annunci.reverse().forEach((annuncio, index) => {

      contenitore.innerHTML += `
<div class="campo-output">

    <h3>${annuncio.titolo}</h3>

    <p>${annuncio.marketplace} • €${annuncio.prezzo}</p>

    <small>${annuncio.data}</small>

    <br><br>

    <button onclick="eliminaAnnuncio(${annunci.length - 1 - index})">
        🗑️ Elimina
    </button>

</div>
`;

    });

}

mostraCronologia();

function eliminaAnnuncio(indice) {

    let annunci = JSON.parse(localStorage.getItem("annunci")) || [];

    annunci.splice(indice, 1);

    localStorage.setItem("annunci", JSON.stringify(annunci));

    mostraCronologia();

}