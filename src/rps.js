//@format
const weapon = {
	rock: {
		name: 'rock',
		vs(otherWeapon) {
			return otherWeapon.name === 'scissors'
				? [true, 'Rock curshes scissors']
				: [false, 'Paper covers rock']
		},
	},
	paper: {
		name: 'paper',
		vs(otherWeapon) {
			return otherWeapon.name === 'rock'
				? [true, 'Paper covers rock']
				: [false, 'Scissors cuts paper']
		},
	},
	scissors: {
		name: 'scissors',
		vs(otherWeapon) {
			return otherWeapon.name === 'paper'
				? [true, 'Scissors cuts paper']
				: [false, 'Rock curshes scissors']
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
/* this returns a palyable function and keeps score in closure*/
function newGame() {
	let playerScore = 0
	let comScore = 0
	let gameOver = false
	return function playRound(playerSelection, computerSelection) {
		if (gameOver)
			return [playerwins, whoWon, playerScore, comScore, true, false]
		if (playerSelection == computerSelection)
			return [false, "It's a draw", playerScore, comScore, gameOver, true]
		const [playerwins, message] = playerSelection.vs(computerSelection)
		let whoWon = ''
		if (playerwins) {
			whoWon = `You Won, ${message}`
			playerScore++
		} else {
			whoWon = `You Lost, ${message}`
			comScore++
		}
		console.log(gameOver, playerScore, comScore)
		if (playerScore === 5 || comScore === 5) gameOver = true
		return [playerwins, whoWon, playerScore, comScore, gameOver, false]
	}
}

/* ========================================================================================
 * dealing with the DOM here, need to start a game, play a round with the player selection and the generated
 * computer selection, update the computer selection photo and results and report the winner when the game is over
 * ========================================================================================
 * */
let currentRound
const startButton = document.getElementById('start')
function updateScore(com, user) {
	document.getElementById('comScore-text').innerText = com
	document.getElementById('userScore-text').innerText = user
}
function updateResult(message) {
	document.getElementById('result-message').innerText = message
}

function startNewGame() {
	hideComputerSelection()
	currentRound = newGame()
	updateScore(0, 0)
	updateResult('New game started, choose your weapon')
	addEvents()
}

function playCurrentRound(playerSelection) {
	hideComputerSelection()
	const computerSelection = computerPlay()
	showComputerSelection(computerSelection)
	const [playerWin, message, playerScore, comScore, gameOver] = currentRound(
		playerSelection,
		computerSelection
	)
	updateScore(comScore, playerScore)
	if (gameOver) {
		playerWin
			? updateResult('Congrats! You Win.')
			: updateResult('Game Over! You Lost.')
		removeEvents()
	} else {
		updateResult(message)
	}
}
startButton.addEventListener('click', startNewGame)

function playEvent(event) {
	playCurrentRound(weapon[event.target.id])
}
function addEvents() {
	document.getElementById('scissors').addEventListener('click', playEvent)
	document.getElementById('paper').addEventListener('click', playEvent)
	document.getElementById('rock').addEventListener('click', playEvent)
}
function removeEvents() {
	document.getElementById('rock').removeEventListener('click', playEvent)
	document.getElementById('scissors').removeEventListener('click', playEvent)
	document.getElementById('paper').removeEventListener('click', playEvent)
}

function showComputerSelection(selection) {
	console.log('fake-' + selection.name)
	const selected = document.getElementById('fake-' + selection.name)
	console.log(selected)
	selected.classList.remove('hidden')
}
function hideComputerSelection() {
	const selected = document.querySelectorAll('.fake-btn')
	console.log(selected)
	selected.forEach((btn) => btn.classList.add('hidden'))
}
