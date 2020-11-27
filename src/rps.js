const weapon = {
    rock: {
        name: 'rock',
        vs(otherWeapon) {
            return otherWeapon === this.paper
                ? [false, 'Paper covers rock']
                : [true, 'Rock curshes scissors']
        },
    },
    paper: {
        name: 'paper',
        vs(otherWeapon) {
            return otherWeapon === this.rock
                ? [true, 'Paper covers rock']
                : [false, 'Scissors cut paper']
        },
    },
    scissors: {
        name: 'scissors',
        vs(otherWeapon) {
            return otherWeapon === this.paper
                ? [true, 'Scissors cut paper']
                : [false, 'Scissors cut paper']
        },
    },
}

/* generates random integer up to max */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}
/* a function that takes no input and returns random weapon string */
function computerPlay() {
    const weapons = ['rock', 'paper', 'scissors']
    return weapon[weapons[getRandomInt(3)]]
}
const computerSelection = computerPlay()
/* a function that takes two weapon strings and determines which one is the winner*/
function playRound(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) return [undefined, 'It,s a draw']
    const [playerwins, message] = playerSelection.vs(computerSelection)
    let whoWon = ''
    if (playerwins) whoWon = `You Won, ${message}`
    else whoWon = `You Lost, ${message}`
    return [playerwins, whoWon]
}
function game() {
    let playerScore = 0
    let comScore = 0

    while (comScore != 5 || playerScore != 5) {
        let playerSelection = prompt('what are you?')
        let computerSelection = computerPlay()
        let [playerWins, message] = playRound(
            weapon[playerSelection.toLowerCase()],
            computerSelection
        )

        if (playerWins == undefined)
            console.log(message + ' ' + 'p:' + playerScore + ' c:' + comScore)
        else if (playerWins) {
            playerScore++
            console.log(message + ' ' + 'p:' + playerScore + ' c:' + comScore)
        } else {
            comScore++
            console.log(`${message} p:${playerScore} c:${comScore}`)
        }
    }
}
game()
