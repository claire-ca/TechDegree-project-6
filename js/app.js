const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const resetBtn = document.querySelector('.btn__reset');
let missed = 0;
const phrases = [
    'Better late than never',
    'Hang in there',
    'So far so good',
    'Break a leg',
    'What is for you will not go by you'
];
const overlay = document.getElementById('overlay');
const headline = document.querySelector('.title'); 
const phraseLetters = document.querySelectorAll('#phrase li');
const ul = document.querySelector('ul');
const chosenLetters = document.getElementsByClassName('chosen');
const allButtons = document.getElementsByTagName('BUTTON');
const heart = document.querySelectorAll('.tries img');

const transition = document.getElementsByClassName('show');

// Selects a random phrase from given arg and returns it
function getRandomPhraseAsArray(arg) {

    // Get a random number based on the length of arg
    let randomNumber = Math.floor(Math.random() * arg.length);

    // Selects a phrase using the randomNumber
    let randomPhrase = arg[randomNumber];

    // Returns randomPhrase
    return randomPhrase;
}

function addPhraseToDisplay(arg){
    // Take the arg array and splits it into characters
    const letters = arg.split('');
    // Initalize an li variable
    let li;
    for(let i = 0; i < letters.length; i++){
        // Create li element
        li = document.createElement('li');
        // Add the character to the li 
        li.textContent = letters[i];
        // Select the ul element
        const ul = document.querySelector('ul');
        // Add the li to the ul
        ul.appendChild(li);
        if (letters[i] !== ' '){     // If the character isn't an empty string
            li.classList.add('letter'); // Add class of 'letter'
        } else {                     // If the character is an empty string
            li.classList.add('space');  // Add class of 'space'
        }
    }
    return li;
}

function checkLetter(clickedButton){
    const phraseLetters = document.querySelectorAll('#phrase li');
    let match = null;
    for(let i = 0; i < chosenLetters.length; i ++){
        chosenLetters[i].setAttribute('disabled', true);
    }
    for(let i = 0; i < phraseLetters.length; i ++){
        if(clickedButton.textContent === phraseLetters[i].textContent.toLowerCase()){
            phraseLetters[i].classList.add('show');
            match += clickedButton.textContent;
        } 
    }
    return match;
}

function checkWin(){  
    const letterClass = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show'); 
    let win = false;
    if(letterClass.length === show.length){
        overlay.className = 'win';
        headline.textContent = "Congratulations! You won!";
        overlay.style.display = 'flex';
        win = true;
        resetBtn.textContent = 'Play Again';
    }
    else if (missed > 4){
        overlay.className = 'lose';
        headline.textContent = "Sorry. You lose";
        overlay.style.display = 'flex';
        win = false;
        resetBtn.textContent = 'Try Again';
    }
    return win;
}

resetBtn.addEventListener('click', () => {
    missed = 0;
    overlay.className = 'start';
    ul.innerHTML = '';
    for(let i = 0; i < allButtons.length; i++){
        allButtons[i].removeAttribute('class');
        allButtons[i].removeAttribute('disabled');
    }
    for(let i = 0; i < heart.length; i++){
        heart[i].src='images/liveHeart.png';
    }
    let currentPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(currentPhrase);
    overlay.style.display = 'none';
});

qwerty.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        e.target.classList.add('chosen');
        let check = checkLetter(e.target);
        if(check === null){
            heart[missed].src='images/lostHeart.png';
            missed += 1;
        }
        for(let i = 0; i < transition.length; i++){
            transition[i].style.transition = 'background ease-out 0.6s';
        }
    }
    checkWin();
});


