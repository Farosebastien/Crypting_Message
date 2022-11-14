//variable qui contiendra l'entrée utilisateur
let entrie = "";
//Tableau crypté
let cryptedArray = [];


//Input cryptage
const encryptIpt = document.getElementById("encryption_input");
encryptIpt.addEventListener("change", function(e) {
    entrie = e.target.value;
});

//Output cryptage
const encryptMsg = document.getElementById("encryption_result");


//Ecoute de l'évenement de cryptage pour lancer le cryptage
const encrypBtn = document.getElementById("encryption_btn");
encrypBtn.addEventListener("click", function(event) {
    event.preventDefault();
    if (entrie === "") {
        encryptMsg.innerText = "Veuillez saisir une phrase en respectant les consignes";
        entrie = "";
    } else {
        encryptMsg.innerText = "Résultat crypté : " + encryptEntrie(entrie) + " !";
        entrie = "";
    }
});

function encryptEntrie (message) {
    //Variable qui va être le tableau qui permettra le cryptage
    const array = message.split(" ");
    let messageCrypted = "";

    //récupération de la longueur du mot le plus long
    let length = array[0].length;
    for (let i=0; i<array.length; i++) {
        if (array[i].length > length) {
            length = array[i].length;
        }
    }

    for(let i=0; i<length; i++) {
        cryptedArray.push([]);
    }

    //ajout de * sur les mots plus petits que le plus long
    array.forEach((word, index) => {
        if (word.length != length) {
            while(word.length < length) {
                word = word.split("");
                word.push("*");
                word = word.join("");
            }

            array.splice(index, 1, word);
        }
    });

    for (word of array) {
        const cryptedWord = word.split("");
        cryptedWord.map((letter, index) => {
            cryptedArray[index].push(letter);
        })
    }
    
    cryptedArray.forEach((word,index) => {
        word = word.join("");
        cryptedArray.splice(index, 1, word)
    });

    messageCrypted = cryptedArray.join(" ");
    cryptedArray = [];
    return messageCrypted;

}
