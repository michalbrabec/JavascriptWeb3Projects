
let cards = []
let hand = []
let sum = 0

let startEl = document.getElementById("play")
let drawEl = document.getElementById("card")
let passEl = document.getElementById("pass")
let messageEl = document.getElementById("message")
let cardsEl = document.getElementById("cards")
let sumEl = document.getElementById("sum")

function buildDeck() {
    let deck = []
    for (let i = 1; i <= 10; i++) {
        deck = deck.concat(Array(4).fill(i)) // Ace, 2-10
    }
    deck = deck.concat(Array(4).fill(10)) // J
    deck = deck.concat(Array(4).fill(10)) // Q
    deck = deck.concat(Array(4).fill(10)) // K
    console.log(deck)
    return deck
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i >= 0; i--) {
        swap(deck, i, Math.round(Math.random() * i))
    }
    console.log(deck)
}

function swap(array, x, y) {
    let t = array[x]
    array[x] = array[y]
    array[y] = t
}

function render() {
    cardsEl.textContent = `Total value: ${hand}`
    sumEl.textContent = `Total value: ${sum}`
}

function evaluate() {
    if (sum === 21) {
        messageEl.textContent = "Blackjack!"
        reset()
    }
    else if (sum < 21) {
        messageEl.textContent = "Draw another card?"
    }
    else {
        messageEl.textContent = "Too much!"
        reset()
    }
}

function reset() {
    startEl.hidden = false
    drawEl.hidden = true
    passEl.hidden = true
}

function start(event) {
    hand = []
    sum = 0
    
    cards = buildDeck()
    shuffleDeck(cards)

    draw()
    draw()
    startEl.hidden = true
    drawEl.hidden = false
    passEl.hidden = false
}

function draw(event) {
    let card = cards.pop()
    hand.push(card)
    sum += card
    console.log(hand)

    evaluate()
    render()
}

function pass(event) {
    if ((sum + cards[cards.length-1]) > 21) {
        messageEl.textContent = "Pass! \n You would have lost ..."
    }
    else {
        messageEl.textContent = "Pass! \n You could have continued ..."
    }
    
    reset()
}

reset()