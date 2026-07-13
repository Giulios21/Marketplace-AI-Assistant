function generaAnnuncio() {

    let marca = document.querySelector("#marca").value;
    let categoria = document.querySelector("#categoria").value;
    let taglia = document.querySelector("#taglia").value;
    let prezzo = document.querySelector("#prezzo").value;
    let condizioni = document.querySelector("#condizioni").value;
    let descrizione = document.querySelector("#descrizione").value;


    let risultato = `

    <div class="scheda-annuncio">

        <h2>Anteprima Annuncio</h2>

        <h3>${marca} ${categoria} | Taglia ${taglia} | ${condizioni}</h3>


        <p id="testoAnnuncio">

        Scopri questo/a ${categoria} firmato/a ${marca}, 
        in ${condizioni.toLowerCase()}.

        ${descrizione}

        📏 Taglia: ${taglia}

        💰 Prezzo: €${prezzo}

        ⭐ Condizioni: ${condizioni}

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