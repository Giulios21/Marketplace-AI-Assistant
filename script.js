let ultimoAnnuncio = "";

 async function generaAnnuncio() {

    let prodotto = document.querySelector("#prodotto").value.trim();
    let descrizione = document.querySelector("#descrizione").value.trim();
    let marketplace = document.querySelector("#marketplace").value;

    let fotoInputAnnuncio = document.querySelector("#foto");
    let foto = fotoInputAnnuncio.files.length;

    let titolo = "";
    let testoGenerato = "";

    let punteggioAI = 0;
    let suggerimentiAI = [];
    document.querySelector("#loadingAI").style.display = "block";


    // ANALISI AI

    if (descrizione.length > 20) {

        punteggioAI += 4;

    } else {

        suggerimentiAI.push("Aggiungi una descrizione più dettagliata.");

    }


    if (prodotto !== "") {

        punteggioAI += 3;

    } else {

        suggerimentiAI.push("Inserisci il prodotto da vendere.");

    }


    if (foto > 0) {

        punteggioAI += 2;

    } else {

        suggerimentiAI.push("Aggiungi una foto del prodotto per migliorare l'annuncio.");

    }


    punteggioAI = Math.min(punteggioAI, 10);


// GENERAZIONE TITOLO

let rispostaAI = await fetch("http://localhost:3000/genera", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        prodotto: prodotto,
        descrizione: descrizione,
        marketplace: marketplace
    })

});


let datiAI = await rispostaAI.json();


titolo = datiAI.titolo;

testoGenerato = datiAI.descrizione;


console.log("TITOLO AI:", titolo);
console.log("DESCRIZIONE AI:", testoGenerato);


    ultimoAnnuncio = testoGenerato;
    
  




    salvaAnnuncio(
        prodotto,
        descrizione,
        marketplace,
        titolo,
        testoGenerato
    );

    document.querySelector("#loadingAI").style.display = "none";




    const risultato = document.querySelector("#risultato");
    risultato.replaceChildren();

    const scheda = document.createElement("div");
    scheda.className = "scheda-annuncio";
    const intestazione = document.createElement("h2");
    intestazione.textContent = "✨ Anteprima Annuncio";
    scheda.appendChild(intestazione);

    if (foto > 0) {
        const contenitoreFoto = document.createElement("div");
        contenitoreFoto.className = "foto-annuncio";
        const immagine = document.createElement("img");
        immagine.src = URL.createObjectURL(fotoInputAnnuncio.files[0]);
        contenitoreFoto.appendChild(immagine);
        scheda.appendChild(contenitoreFoto);
    }

    const titoloIntestazione = document.createElement("h3");
    titoloIntestazione.textContent = "📦 Titolo";
    const campoTitolo = document.createElement("div");
    campoTitolo.className = "campo-output";
    const titoloOutput = document.createElement("p");
    titoloOutput.id = "titoloAnnuncio";
    titoloOutput.textContent = titolo;
    const copiaTitolo = document.createElement("button");
    copiaTitolo.textContent = "📋 Copia Titolo";
    copiaTitolo.addEventListener("click", () => copiaTesto("#titoloAnnuncio"));
    campoTitolo.append(titoloOutput, copiaTitolo);
    scheda.append(titoloIntestazione, campoTitolo);

    const descrizioneIntestazione = document.createElement("h3");
    descrizioneIntestazione.textContent = "📝 Descrizione";
    const campoDescrizione = document.createElement("div");
    campoDescrizione.className = "campo-output";
    const descrizioneOutput = document.createElement("p");
    descrizioneOutput.id = "testoAnnuncio";
    descrizioneOutput.textContent = testoGenerato;
    const copiaDescrizione = document.createElement("button");
    copiaDescrizione.textContent = "📋 Copia Descrizione";
    copiaDescrizione.addEventListener("click", () => copiaTesto("#testoAnnuncio"));
    campoDescrizione.append(descrizioneOutput, copiaDescrizione);
    scheda.append(descrizioneIntestazione, campoDescrizione);

    const copiaCompleto = document.createElement("button");
    copiaCompleto.textContent = "🚀 Copia Annuncio Completo";
    copiaCompleto.addEventListener("click", copiaAnnuncioCompleto);
    scheda.appendChild(copiaCompleto);

    const analisi = document.createElement("div");
    analisi.className = "analisi-ai";
    const punteggio = document.createElement("p");
    const etichettaPunteggio = document.createElement("strong");
    etichettaPunteggio.textContent = "Punteggio:";
    punteggio.append(etichettaPunteggio, ` ${punteggioAI}/10 ⭐`);
    const lista = document.createElement("ul");
    ["✅ Titolo generato", "✅ Annuncio ottimizzato"].forEach((testo) => {
        const voce = document.createElement("li");
        voce.textContent = testo;
        lista.appendChild(voce);
    });
    const suggerimenti = document.createElement("li");
    if (suggerimentiAI.length > 0) {
        suggerimentiAI.forEach((suggerimento, indice) => {
            if (indice > 0) suggerimenti.appendChild(document.createElement("br"));
            suggerimenti.append(`⚠️ ${suggerimento}`);
        });
    } else {
        suggerimenti.textContent = "✅ Annuncio completo, ottimo lavoro!";
    }
    lista.appendChild(suggerimenti);
    analisi.append(punteggio, lista);
    risultato.append(scheda, analisi);


}

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



    let testoCompleto = 
`Titolo:
${titolo}

Descrizione:
${descrizione}`;



    navigator.clipboard.writeText(testoCompleto)
    .then(() => {

        mostraMessaggio();

    });


}



function mostraMessaggio() {


    let messaggio = document.createElement("div");


    messaggio.textContent = "✅ Copiato negli appunti!";


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

            anteprima.replaceChildren();

            return;

        }


        const reader = new FileReader();


        reader.onload = function(e) {

            const immagine = document.createElement("img");
            immagine.src = e.target.result;
            immagine.alt = "Anteprima prodotto";
            anteprima.replaceChildren(immagine);

        };


        reader.readAsDataURL(file);


    });


}




function generaVinted(titolo, descrizione, prodotto) {


    let fraseAI = generaFraseAI(prodotto);


    return `

✨ ${titolo}


${descrizione}


${fraseAI}


📌 Prodotto: ${prodotto}


📦 Spedizione disponibile tramite Vinted.

💬 Scrivimi pure per qualsiasi informazione 😊

`;

}




function generaSubito(titolo, descrizione, prodotto) {


    let fraseAI = generaFraseAI(prodotto);


    return `

📢 ${titolo}


${descrizione}


${fraseAI}


📌 Prodotto: ${prodotto}


🚚 Possibilità di spedizione o consegna a mano.


📩 Contattami per qualsiasi informazione.

`;

}




function generaEbay(titolo, descrizione, prodotto) {


    let fraseAI = generaFraseAI(prodotto);


    return `

🏷️ ${titolo}


${descrizione}


${fraseAI}


📌 Prodotto: ${prodotto}


📦 Accurate packaging and fast shipping.


⭐ Feel free to contact me for any questions.

`;

}




function generaFraseAI(prodotto) {


    prodotto = prodotto.toLowerCase();



    if (prodotto.includes("scarpa") || prodotto.includes("sneaker")) {

        return "👟 Ideali per un utilizzo quotidiano, comode e curate nei dettagli.";

    }



    if (prodotto.includes("iphone") || prodotto.includes("telefono") || prodotto.includes("smartphone")) {

        return "📱 Perfettamente funzionante e pronto all'utilizzo.";

    }



    if (prodotto.includes("playstation") || prodotto.includes("xbox") || prodotto.includes("console")) {

        return "🎮 Perfetta per il gaming, pronta per essere utilizzata.";

    }



    if (prodotto.includes("felpa") || prodotto.includes("maglia") || prodotto.includes("giacca")) {

        return "👕 Capo versatile e facile da abbinare.";

    }



    if (prodotto.includes("orologio")) {

        return "⌚ Elegante e adatto ad ogni occasione.";

    }



    return "✅ Prodotto tenuto con cura e pronto per un nuovo proprietario.";

}

function salvaAnnuncio(
    prodotto,
    descrizione,
    marketplace,
    titolo,
    testoGenerato
) {


    let annunci = JSON.parse(localStorage.getItem("annunci")) || [];


    annunci.push({

        prodotto: prodotto,

        descrizione: descrizione,

        marketplace: marketplace,

        titolo: titolo,

        testoGenerato: testoGenerato,

        data: new Date().toLocaleDateString()

    });



    localStorage.setItem(
        "annunci",
        JSON.stringify(annunci)
    );



    mostraCronologia();

}





function mostraCronologia() {


    let contenitore = document.querySelector("#cronologia");


    if (!contenitore) return;



    let annunci = JSON.parse(localStorage.getItem("annunci")) || [];



    contenitore.replaceChildren();

    const intestazione = document.createElement("h2");
    intestazione.textContent = "📚 Cronologia annunci";
    contenitore.appendChild(intestazione);




    annunci.reverse().forEach((annuncio, index) => {



        const campo = document.createElement("div");
        campo.className = "campo-output";

        const titolo = document.createElement("h3");
        titolo.textContent = annuncio.titolo;
        const marketplace = document.createElement("p");
        marketplace.textContent = annuncio.marketplace;
        const data = document.createElement("small");
        data.textContent = annuncio.data;

        const ricarica = document.createElement("button");
        ricarica.textContent = "🔄 Ricarica";
        ricarica.addEventListener("click", () => ricaricaAnnuncio(annunci.length - 1 - index));

        const elimina = document.createElement("button");
        elimina.textContent = "🗑️ Elimina";
        elimina.addEventListener("click", () => eliminaAnnuncio(annunci.length - 1 - index));

        campo.append(titolo, marketplace, data, document.createElement("br"), document.createElement("br"), ricarica, elimina);
        contenitore.appendChild(campo);



    });



}




mostraCronologia();






function eliminaAnnuncio(indice) {


    let annunci = JSON.parse(localStorage.getItem("annunci")) || [];



    annunci.splice(indice, 1);



    localStorage.setItem(

        "annunci",

        JSON.stringify(annunci)

    );



    mostraCronologia();


}






function ricaricaAnnuncio(indice) {


    let annunci = JSON.parse(localStorage.getItem("annunci")) || [];



    let annuncio = annunci[indice];



    if (!annuncio) return;




    document.querySelector("#prodotto").value = annuncio.prodotto;



    document.querySelector("#descrizione").value = annuncio.descrizione;



    document.querySelector("#marketplace").value = annuncio.marketplace;



}








function generaTitoloAI(prodotto) {


    let titolo = prodotto.trim();



    titolo = ottimizzaTitoloSEO(titolo);



    return titolo;


}








function ottimizzaTitoloSEO(titolo) {



    titolo = titolo.replace(
        "Scarpe",
        "Sneakers"
    );



    titolo = titolo.replace(
        "scarpe",
        "sneakers"
    );




    if (!titolo.toLowerCase().includes("original")) {



        titolo += " Originali";



    }




    return titolo;



}

