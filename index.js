const input = document.querySelector('input');
const button = document.querySelector('button');
const ul = document.querySelector('ul');
const slusamTe = document.getElementById('slusamTe');

const startGumb = document.getElementById('startGumb');
const stopGumb = document.getElementById('stopGumb');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;

recognition.lang = "hr-HR";

recognition.onresult = (e) => {
    var text = e.results[e.results.length-1][0].transcript;

        if (e.results[e.results.length-1].isFinal){
            const listItem = document.createElement('li');
            const spanElement = document.createElement('span');
            const deleteButton = document.createElement('button');

            listItem.appendChild(spanElement);
            listItem.appendChild(deleteButton);

            
            spanElement.textContent = text;
            deleteButton.textContent = "IZBRIŠI";


            ul.appendChild(listItem);

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