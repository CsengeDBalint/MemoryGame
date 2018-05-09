//An array that holds all of the cards
const cardsArray = [
    "fa-diamond", 
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-headphones",
    "fa-leaf",
    "fa-bicycle",
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-headphones",
    "fa-leaf",
    "fa-bicycle"
];

//DISPLAY THE CARDS ON THE PAGE

let openedCardsArray = []; // Temporary array for viewed cards
let matchedCardsArray = []; // Temporary array for matched cards
let shuffledCardsArray = []; // Temporary array for all mixed cards
let ratingStarsNumber;
let moveCounter = 0;


const deck = document.querySelector("ul.deck");
const stars = document.querySelectorAll(".fa-star");
// Start a game: a function calling shuffle() and createDeck() functions
function startGame() {
    shuffledCardsArray = shuffle(cardsArray);
    clearDeck();
    createDeck(shuffledCardsArray);
    stars[2].classList.add("purple");
    stars[1].classList.add("purple");

}

//Loop through every item of the shuffledCardsArray
function createDeck(shuffledCardsArray) {

    for (var i = 0; i < shuffledCardsArray.length; i++) {
        
        let liEl = document.createElement('li');

        liEl.classList.add('card');

        let iEl = document.createElement('i');

        iEl.classList.add('fa');
        iEl.classList.add(shuffledCardsArray[i]);

        liEl.appendChild(iEl);
        deck.appendChild(liEl);

        liEl.addEventListener('click', turnCard);
    }

}

function clearDeck() {
    
    moves.innerHTML = 0;
    let currDeck = document.querySelectorAll('li.card');
    for(let i = 0; i < currDeck.length ; i++) {
		currDeck[i].remove();
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
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
// end of provided shuffle function

// PLAY GAME
function turnCard(event) {

    event.target.classList.add('open', 'show'); //If turned up add classes "open" and "show" to liEl

    event.target.removeEventListener('click', turnCard); // Disable clicking and turning on the same card twice

    checkCards(event); //Run the checkCards() for every clicked card

}

function checkCards(event) {

    openedCardsArray.push(event.target.firstChild);

    if (openedCardsArray.length === 2) {
          
         moveCount();
         updateRatingStars();
      
        if(openedCardsArray[0].className === openedCardsArray[1].className) {

            openedCardsArray[0].parentNode.classList.add('match');
            openedCardsArray[1].parentNode.classList.add('match');

            matchedCardsArray.push(openedCardsArray[0]);
            matchedCardsArray.push(openedCardsArray[1]);

            openedCardsArray = []; //Empty openedCardsArray

        } else {

            setTimeout(function() {
                for (let i = 0; i < openedCardsArray.length; i++) {
                    openedCardsArray[i].parentNode.addEventListener('click', turnCard);
                }
            }, 1000);

            setTimeout(turnBackCard, 1000);

        }

    }

    // END GAME if matchedCardsArray holds 16 cards
    if (matchedCardsArray.length === 2) {
    
    openModal();
    
    }

}

//Remove all added classes and emtpy openedCardsArray
function turnBackCard() {

    for (let i = 0; i < openedCardsArray.length; i++) {
        openedCardsArray[i].parentNode.classList.remove('open', 'show'); //Turn back cards
    }

    openedCardsArray = [];

}

//Add moveCounter and handle stars rating
let moves = document.querySelector('.moves');


function moveCount () {
  moveCounter = moveCounter+1;
  moves.innerHTML = moveCounter;
  
}

//  Update rating stars
function updateRatingStars() {
    ratingStarsNumber = 3;

    if (moveCounter === 1) {
        myTimer(); 
    }
    else if (moveCounter === 2 || moveCounter === 3) {
        ratingStarsNumber =3;   
        resultStars.innerHTML = ratingStarsNumber;
    }
    else if (moveCounter >= 4 && moveCounter <= 7) {
		// Remove first purple star
        stars[2].classList.remove("purple");
        ratingStarsNumber =2; 
        resultStars.innerHTML = ratingStarsNumber;
        
	} else if (moveCounter >= 8) {
		//Remove second purple star
		stars[1].classList.remove("purple");
        ratingStarsNumber = 1;
        resultStars.innerHTML = ratingStarsNumber; 
	}
}




// Open Modal
const modal = document.getElementById("myModal");
const score = document.querySelector(".score");
const resultMoves = document.querySelector(".resultMoves");
const resultStars = document.querySelector(".resultStars");
const resultTime = document.querySelector(".resultTime");



function openModal() {
	setTimeout(function() {
        modal.style.display = "block";
        //score.textContent = `It took ${moveCounter} moves, ${ratingStarsNumber} stars and ${timer.innerHTML} time `;
        resultMoves.innerHTML = moveCounter;
        resultStars.innerHTML = ratingStarsNumber;
        resultTime.innerHTML = timer.innerHTML; 
         }, 1000);
         stopTimer();	 
}
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
// Close modal
span.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//Add Timer
let timer = document.querySelector(".timer");
let minutes = 0;
let seconds = 0;
let time;

//let minutes = document.querySelector(".min");
//seconds = document.querySelector(".sec");


function myTimer() {
    
    time = setInterval(function() {
    timer.textContent = ` ${minutes} min.${seconds} sec.`;
        seconds++;
      
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
    }, 1000);
    
  }

//Stop Timer
function stopTimer() {
    clearInterval(time);
}


//Restart the game with the Play again! button 
const playAgain = document.querySelector(".playAgain");

playAgain.addEventListener('click', function () {
	modal.style.display = "none";
    matchedCardsArray = [];
    minutes = 0;
    seconds = 0;
    timer.textContent = "0min.0sec.";
    moveCounter = 0;
    
	startGame();
});

//Restart the game with the Restart icon in the Panel-score
const restart = document.querySelector(".restart");

restart.addEventListener('click', function (event) {
    matchedCardsArray = [];
    timer.textContent = "0min.0sec.";
    moveCounter = 0;
    
	startGame();
});

//Start a game
startGame();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

