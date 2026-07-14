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
if (marketplace === "vinted") {

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

        <h2>Anteprima Annuncio</h2>

       <h3>${titolo}</h3>


       <p id="testoAnnuncio">

    ${testoGenerato}

    </p>


        <button onclick="copiaAnnuncio()">
            Copia Annuncio
        </button>


    </div>

    `;


    document.querySelector("#risultato").innerHTML = risultato;

}



function copiaAnnuncio() {

    let testo = document.querySelector("#testoAnnuncio").innerText;

    navigator.clipboard.writeText(testo);

    mostraMessaggio();

}

function mostraMessaggio() {

    let messaggio = document.createElement("div");

    messaggio.innerHTML = "✅ Annuncio copiato negli appunti!";

    messaggio.className = "messaggio-copia";

    document.body.appendChild(messaggio);


    setTimeout(() => {

        messaggio.remove();

    }, 3000);

}