let ultimoAnnuncio = "";

function generaAnnuncio() {

    let prodotto = document.querySelector("#prodotto").value.trim();
    let descrizione = document.querySelector("#descrizione").value.trim();
    let marketplace = document.querySelector("#marketplace").value;

    let fotoInputAnnuncio = document.querySelector("#foto");
    let foto = fotoInputAnnuncio.files.length;

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

    titolo = generaTitoloAI(prodotto);



    // GENERAZIONE ANNUNCIO IN BASE AL MARKETPLACE

    if (marketplace === "vinted") {

        testoGenerato = generaVinted(
            titolo,
            descrizione,
            prodotto
        );


    } else if (marketplace === "subito") {

        testoGenerato = generaSubito(
            titolo,
            descrizione,
            prodotto
        );


    } else {

        testoGenerato = generaEbay(
            titolo,
            descrizione,
            prodotto
        );

    }



    ultimoAnnuncio = testoGenerato;



    salvaAnnuncio(
        prodotto,
        descrizione,
        marketplace,
        titolo,
        testoGenerato
    );




    let risultato = `

<div class="scheda-annuncio">


<h2>✨ Anteprima Annuncio</h2>



${foto > 0 ? `

<div class="foto-annuncio">

<img src="${URL.createObjectURL(fotoInputAnnuncio.files[0])}">

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




<button onclick="copiaAnnuncioCompleto()">

🚀 Copia Annuncio Completo

</button>



</div>





<div class="analisi-ai">

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

`;



document.querySelector("#risultato").innerHTML = risultato;


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



    contenitore.innerHTML = "<h2>📚 Cronologia annunci</h2>";




    annunci.reverse().forEach((annuncio, index) => {



        contenitore.innerHTML += `


<div class="campo-output">


<h3>${annuncio.titolo}</h3>


<p>${annuncio.marketplace}</p>


<small>${annuncio.data}</small>


<br><br>



<button onclick="ricaricaAnnuncio(${annunci.length - 1 - index})">

🔄 Ricarica

</button>




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
