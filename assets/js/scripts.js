const  cardGame = ["aragon.jpg", "aragon.jpg", "gandalf.jpg", "gandalf.jpg", "gollum.jpg", "gollum.jpg", "gimli.jpg", "gimli.jpg", "legolas.jpg", "legolas.jpg", "orc.jpg", "orc.jpg", "sauron.jpg", "sauron.jpg", "pippin.jpg", "pippin.jpg", "frodo.jpeg", "frodo.jpeg", "nazgul.jpg", "nazgul.jpg",]

const deck = document.querySelector(".memory-game")

let opened = [];

let matched = [];

const modal = document.getElementById("modal");

const reset = document.querySelector(".reset-btn");

const playAgain = document.querySelector(".btn-play-again");

const moveCount = document.querySelector(".move-counter");

let moves = 0;

const ring = document.getElementById("ring-rating").querySelectorAll(".ring");

let ringCount = 3;

const timeCount = document.querySelector(".timer");

let time;

let minutes = 0;

let seconds = 0;

let timeStart = false;

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while(currentIndex !==0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        randomValue = array[currentIndex];
        array[currentIndex] = array[randomIndex]
    }
    
}