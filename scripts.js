const deckCards = document.querySelector(".card")
let cards = ["...card"];

const deck = document.querySelector(".deck");

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
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};
var myMusic;
document.body.onload = startGame();

function startGame() {
    const shuffledDeck = shuffle(cards);
        for (let i = 0; i < cards.length; i++) {
            const liTag = document.createElement('li');
            liTag.classList.add("card");
            const addImage = document.createElement("img");
            liTag.appendChild(addImage);
            addImage.setAttribute("src", "images/" + shuffledDeck[i]);
            addImage.setAttribute("alt", "images for the memory game");
            deck.appendChild(liTag);
        };

    myMusic = new sound("background.mp3");
    myMusic.play();
};

var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};



startGame();

function removeCard() {
    while(deck.hasChildNodes()) {
        deck.removeChild(deck.FirstChild);
    };
};

function timer() {
    time = setInterval(function() {
        seconds++;
        if(seconds === 60) {
            minutes ++;
            seconds = 0;
        };
        timeCount.innerHTML = '<i class="fas fa-hourglass"></i>' + "Timer" + minutes + "Mins" + seconds + "Secs";
    }, 1000);
};
function stopTime() {
    setInterval(time)
};

function resetGame() {
    stopTime();
    timeStart = false;
    seconds = 0;
    minutes = 0;
    timeCount.innerHTML = '<i class="fas fa-hourglass"></i>' + "Timer = 00:00";
    ring[1].firstElementChild.classList.add("fas fa-ring");
    ring[2].firstElementChild.classList.add("fas fa-ring");
    ringCount = 3;
    moves = 0;
    moveCount.innerHTML = 0;
    matched = [];
    opened = [];
    removeCard();
    startGame();
};

function moveCounter() {
    moveCount.innerHTML ++;
    moves ++;
};

function ringCounter() {
    if(moves === 16) {
        ring[2].firstElementChild.classList.remove("fas fa-ring");
        ringCount --;
    };
    if(moves === 22) {
        ring[1].firstElementChild.classList.remove("fas fa-ring");
        ringCount --;
    };
};

function compareTwo(){
    if(opened.length === 2); {
        document.body.style.pointerEvents = "none";
    };
    if(opened.length === 2 && opened[0].src) {
        match();
    }
    else if(opened.length === 2 && opened[0].src != opened[1].src) {
        noMatch();
    };
};

function match() {
    setTimeout(function(){
        opened[0].parentElement.classList.add("match");
        opened[1].parentElement.classList.add("match");
        matched.push(...opened);
        document.body.style.pointerEvents = "auto";
        winGame();
        opened = [];
    }, 600);
    moveCounter();
    ringCounter();
};

function noMatch() {
    setTimeout(function(){
        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        document.body.style.pointerEvents = "auto";
        opened = [];
    }, 700);
    moveCounter();
    ringCounter();
};

function addStats() {
    const stats = document.querySelector(".modal-content");
        for(let i = 0; i <= 3; i++) {
            const statsElement = document.createElement("p");
            statsElement.classList.add("stats")
            stats.appendChild(statsElement);
        }
        let p = stats.querySelectorAll("p.stats")
        p[0].innerHTML = "Time Taken" + minutes + "Minutes" + seconds + "Seconds";
        p[1].innerHTML = "Moves Used" + moves;
        p[2].innerHTML = "Ring Rating" + ringCount + "Out of 3";
}

function displayModal() {
    const modalClose = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    modalClose.onclick = function() {
        modal.style.display = "none";    
    }
        window.onclick = function(event) {
            if(this.event.target == modal) {
                modal.style.display = "none";
            };
        };
};

function winGame() {
    if(matched.length === 20) {
        stopTime();
        addStats();
        displayModal();
    }
}

deck.addEventListener("click", function(event) {
    if(event.target.nodeName === "LI") {
        console.log(event.target.nodeName + "Was Clicked")
        if(timeStart === false) {
        timeStart = true;
        timer();
    }
        flipCard();
    }
    function flipCard() {
        event.target.classList("flip");
        addToOpen();

    }
    function addToOpen() {
        if(opened.length === 0 || opened.length ===1) {
            opened.push(event.target.firstElementChild);
        }
        compareTwo();
    }

})

reset.addEventListener("click", resetGame);
playAgain.addEventListener("click", function(){
    modal.style.display = "none";
    resetGame();
})