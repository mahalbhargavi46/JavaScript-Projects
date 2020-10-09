const cards = ['A', 'K', 'Q', 'J', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

//emoji❤️
const card_type = [
    {
        icon:'♥️',
        color:'red',
    },
    {
        icon:'♣️',
        color:'black',
    },
    {
        icon:'♦️',
        color:'red',
    },
    {
        icon:'♠️',
        color:'black',  
    }
]; 

let positions = [];

const container = document.getElementById('container');

const btn_shuffle = document.getElementById('shuffle');

//creates a card, adds the classes 
function createCard({suit, card, suit_idx, card_idx}){
    const cardElement = document.createElement('div');
    

    cardElement.classList.add('card');

    //adds the color according to the condition
    if(suit.color === 'red'){
        cardElement.classList.add('red');
    }

    const TOP = suit_idx * 80 + 'px';
    const LEFT = card_idx * 50 + 'px';

    positions.push([TOP,LEFT]);

    cardElement.style.top =  TOP;
    cardElement.style.left = LEFT; 

    //adds the inner HTML based on the suit
    cardElement.innerHTML= `
        <span class="number top">
            ${card}
        </span>
        <p class="suit">
            ${suit.icon}
        </p>
        <span class="number bottom">
            ${card}
        </span>
    `;
    //appends all of these to the container in the body
    container.appendChild(cardElement);
}

//Call back function to create cards
card_type.forEach((suit, suit_idx) => {
    cards.forEach((card,card_idx) => {
        const cardDetails = {
            card,
            suit,
            card_idx,
            suit_idx
        }
        createCard(cardDetails);
    });
});

const cards_shuffle = document.querySelectorAll('.card');

btn_shuffle.addEventListener('click', () => {
    cards_shuffle.forEach((card, idx) => {
        setTimeout(() => {
            card.style.zIndex =52 - idx;
            card.style.top = '50%';
            card.style.left = '50%';
        }, idx * 60);
    });
    setTimeout(shuffleBack, 2000);
});

function shuffleBack(){
    shufflePositions();
    cards_shuffle.forEach((card, idx) => {
        setTimeout(() => {
            card.style.top = positions[idx][0];
            card.style.left = positions[idx][1];
        }, idx * 60);
    });
}

function shufflePositions(){
    for(let i=0; i< 1000; i++){
        const random1 = Math.floor(Math.random() * 52);
        const random2 = Math.floor(Math.random() * 52);
        const temp = positions[random1];
        positions[random1] = positions[random2];
        positions[random2] = temp; 
    }
}
