// cards array
let card = document.getElementsByClassName("card");
let cards = [...card];
 let hasFlippedCard = false;
  let firstCard, secondCard;
console.log(cards);

// deck
const deck = document.getElementById("deck-card");

// moves variable
let moves = 0;
let counter = document.querySelector(".move-counter");

// variable for the rings
const rings = document.querySelectorAll(".fa-ring");

// matchedCards
let matchedCard = document.getElementsByClassName("match");

 // rings list
 let ringsList = document.querySelectorAll(".ring-counter li");

 // reset button
 let reset = document.querySelector(".reset-btn");
 
 // close icon in modal
 let closeButton = document.querySelector(".close");

 
 // array for opened cards
var openedCards = [];

// lock the cards so only 2 are shown
let lockBoard = false;

//shuffle the cards array

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
}


// shuffles card on reload
document.body.onload = startGame();

// start the game - inspired my memory card tutorial scotch.io
function startGame(){
    
    // shuffle deck
    cards = shuffle(cards);
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        //remove exsisting classes
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = 0;
    // reset ring rating
    for (var i= 0; i < rings.length; i++){
        rings[i].style.color = "#FFD700";
        rings[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

function resetGame() {

    seconds = 0;
    minutes = 0;
    timer.innerHTML = '<i class="fas fa-hourglass"></i>' + "Timer = 00:00";
    rings[1].classList.add(".fa-ring");
    rings[2].classList.add(".fa-ring");
    ringsList = 3;
    moves = 0;
    counter.innerHTML = 0;
    matchedCard = [];
    openedCards = [];
    startGame();
}

// toggles open and show class to display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// add opened cards to see if match
function cardOpen() {
    if (lockBoard) return;
     if (this === firstCard) return;
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].dataset.framework === openedCards[1].dataset.framework){
            matched();
        } else {
            unmatched();   
        }
    }
}


// when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        openedCards = [];
          if ( $('.show').length > 2 ) {
    return false;
  }
        enable();
    },350);
}


// disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
    resetBoard();
    lockBoard = true;
}


// enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


//  count player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 14 && moves < 17){
        for( i= 0; i < 3; i++){
            if(i > 1){
                rings[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 20){
        for( i= 0; i < 3; i++){
            if(i > 0){
                rings[i].style.visibility = "collapse";
            }
        }
    }
}


// game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// define modal
let modal = document.getElementById('myModal');

// display modal on completion
function congratsModal() {
  if(matchedCard.length === 20){
    clearInterval(interval);
    modal.style.display = 'block';
    let finalTime = timer.innerHTML;
    let finalStars = document.querySelector('.ring-rating').innerHTML;
    let finalMoves = document.querySelector('.move-counter').innerHTML;
    //Values to display on modal
    document.getElementById('finalMoves').innerHTML = finalMoves;
    document.getElementById('finalRings').innerHTML = finalStars;
    document.getElementById('finalTime').innerHTML = finalTime;
    }
}

// close icon on modal
function closeModal() {
    closeButton.addEventListener('click', function(e){
    modal.style.display = 'none';
    window.location.reload();
  });
}



// for user to play Again 
function playAgain(){
    modal.style.display = 'none';
    startGame();
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratsModal);
}

function resetBoard() {
   [hasFlippedCard, lockBoard] = [false, false];
   [firstCard, secondCard] = [null, null];
 }