//Variable qui contiendra l'entrée utilisateur
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

//Input décodage
const decodeIpt = document.getElementById("decoding_input");

//Bouton de décodage
const decodeBtn = document.getElementById("decoding_btn");

//Output décodage
const decodeMsg = document.getElementById("decoding_result");


//Ecoute de l'évenement de cryptage pour lancer le cryptage
const encrypBtn = document.getElementById("encryption_btn");
encrypBtn.addEventListener("click", function(event) {
    event.preventDefault();
    //Si il n'y a aucune entrée
    if (entrie === "") {
        encryptMsg.innerText = "Veuillez saisir une phrase en respectant les consignes";
    //Sinon, appel de la fonction de cryptage et vidage de entrie
    } else {
        encryptMsg.innerText = "Résultat crypté :  " + encryptEntrie(entrie);
        entrie = "";
    }
});

// Fonction de cryptage de l'entrée utilisateur
function encryptEntrie (message) {
    //Variable qui va être le tableau qui permettra le cryptage
    const array = message.split(" ");
    let messageCrypted = "";

    //Récupération de la longueur du mot le plus long
    let length = array[0].length;
    for (let i=0; i<array.length; i++) {
        if (array[i].length > length) {
            length = array[i].length;
        }
    }

    //Création de tableaux dans cryptedArray suivant la longueur du mot le plus long
    for(let i=0; i<length; i++) {
        cryptedArray.push([]);
    }

    //Ajout de * sur les mots plus petits que le plus long
    array.forEach((word, index) => {
        if (word.length != length) {
            while(word.length < length) {
                word = word.split("");
                word.push("*");
                word = word.join("");
            }

            //Remplacement du mot dans array
            array.splice(index, 1, word);
        }
    });

    //Mélange des lettres de chaque mot dans les tableaux de cryptedArray
    for (word of array) {
        const cryptedWord = word.split("");
        cryptedWord.map((letter, index) => {
            cryptedArray[index].push(letter);
        })
    }
    
    //Concaténation des tableaux de lettres en mot dans cryptedArray et remplacement
    cryptedArray.forEach((word,index) => {
        word = word.join("");
        cryptedArray.splice(index, 1, word)
    });

    //Concaténation du message crypté
    messageCrypted = cryptedArray.join(" ");
    //Vidage de cryptedArray
    cryptedArray = [];

    //Mise en place du message crypté dans l'input de décodage et retour
    decodeIpt.value = messageCrypted;
    return messageCrypted;
}

//Ecoute du click sur le bouton de décodage
decodeBtn.addEventListener("click", function(e) {
    e.preventDefault();
    //Si il n'y à aucun message à décoder
    if(decodeIpt.value === "") {
        decodeMsg.innerText = "Aucun message à décoder";
    //Si il y en a un, appel de la fonction de décodage
    } else {
        decodeMsg.innerText = "Votre message décodé :  " + decodingScript(decodeIpt.value);
    }
    
});

//Fonction de décodage du message crypté
function decodingScript (message) {
    //Préparation du tableau de décodage et splitage du message codé
    const decodeMsg = [];
    message = message.split(" ");

    //Ajout de tableau dans le tableau de décodage en fonction de la longueur des mot codés (égale au nombre total de mots du message d'origine)
    for (let i=0; i<message[0].length; i++) {
        decodeMsg.push([]);
    }

    //Pour chaque mot du message codé, splitage et remplacement du mot par le mot splité
    message.forEach((word, index) => {
        word = word.split("");
        message.splice(index, 1, word);
    });

    //Pour chaque mot du message codé
    for (word of message) {
        //Pour chaque lettre de ce mot
        for(let i=0; i<word.length; i++) {
            //Si ce n'est pas un astérisque
            if(word[i] !== "*") {
                //Mise en place dans le tableau de décodage
                decodeMsg[i].push(word[i]);
            }
        } 
    }

    //Pour chaque mot du tableau décodé, concaténation de ce mot et remplacement du mot par le mot concaténé
    decodeMsg.forEach((word, index) => {
        word = word.join("")
        decodeMsg.splice(index, 1, word);
    })

    //Récupération du messga complètement décodé et concaténé et retour
    const finishedMsg =  decodeMsg.join(" ");
    return finishedMsg;
}