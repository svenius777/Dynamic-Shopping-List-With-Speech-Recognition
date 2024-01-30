//Dohvacam referencu na potrebne elemente
const input = document.querySelector('input');
const button = document.querySelector('button');
const ul = document.querySelector('ul');
const slusamTe = document.getElementById('slusamTe');

//Gumbovi za pokretanje i zaustavljanje API-ja za prepoznavanje govora
const startGumb = document.getElementById('startGumb');
const stopGumb = document.getElementById('stopGumb');

//Postavljanje postavki prepoznavanja govora i stvaranje instance SpeechRecognition objekta
//koristi ili webkit verziju (za starije preglednike) ili normalnu verziju
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();

//Vraća rezultate koji nisu finalni odnosno isFinal=false
//Kada korisnik nešto priča u mikrofon, web speech api prepoznaje ako je to što priča
//finalno ili nije
recognition.interimResults = true;

//Prepoznavanje govora ne prestaje dok mu mi to ne kažemo
//Inače prestane nakon prvog prepoznavanja
recognition.continuous = true;

recognition.lang = "hr-HR";

/*
Kada web speech api vrati rezultat koji je shvatio (riječ ili fraza) čini sljedeće:
- u varijablu text spremi rezultat govora (transcript)
*/
recognition.onresult = (e) => {
    //e.results - ako inspectamo u konzoli, vidimo da dobijemo SpeechRecognitionEvent
    //e je taj SpeechRecognitionEvent koji je zapravo objekt sa svojstvima i metodama
    //results - SpeechRecognitionResultList (lista odnosno niz spremljenih rezultata)
    //za svaki SpeechRecognitionEvent pristupamo prvom rezultatu [0] i njegovom svojstvu .transcript
    var text = e.results[e.results.length-1][0].transcript;

        //ako je rezultat finalni (ako pricas nesto pa stanes na par sekundi onda taj zadnji rezultat je finalni)
        if (e.results[e.results.length-1].isFinal){
            const listItem = document.createElement('li');
            const spanElement = document.createElement('span');
            const deleteButton = document.createElement('button');

            listItem.appendChild(spanElement);
            listItem.appendChild(deleteButton);

            
            spanElement.textContent = text;
            deleteButton.textContent = "IZBRIŠI";


            ul.appendChild(listItem);

            //dodajemo event listener za gumb za izbrisat stavku
            deleteButton.addEventListener("click", function(){
                listItem.remove();
            })

            listItem.style.fontSize = "20px";
            listItem.style.marginTop = "10px";

            deleteButton.style.width = "100px";
            deleteButton.style.height = "30px";
            deleteButton.style.fontSize = "20px";

            console.log(e);
        }
}

startGumb.addEventListener('click', () => {
    recognition.start();
    slusamTe.textContent = "Slušam te...";
});

stopGumb.addEventListener('click', () => {
    recognition.stop();
    slusamTe.textContent="";
})


function addItem () {
    const inputValue = document.getElementById("item").value;

    const listItem = document.createElement('li');
    const spanElement = document.createElement('span');
    const deleteButton = document.createElement('button');

    listItem.appendChild(spanElement);
    listItem.appendChild(deleteButton);

    spanElement.textContent = inputValue;
    deleteButton.textContent = "IZBRIŠI";

    ul.appendChild(listItem);

    deleteButton.addEventListener("click", function(){
        listItem.remove();
    })

    //CSS
    listItem.style.fontSize = "20px";
    listItem.style.marginTop = "10px";

    deleteButton.style.width = "100px";
    deleteButton.style.height = "30px";
    deleteButton.style.fontSize = "20px";
}