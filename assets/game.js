const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What age is Harry when he receives his Hogwart's letter?",
        choice1: '7',
        choice2: '15',
        choice3: '11',
        choice4: '12',
        answer: 3,
    },
    {
        question: "What is the name of Harry Potter's owl?",
        choice1: 'Fawkes',
        choice2: 'Scabbers',
        choice3: 'Crookshanks',
        choice4: 'Hedwig',
        answer: 4,
    },
    {
        question: "How do you close the Marauders map?",
        choice1: 'Mischief managed',
        choice2: 'Mischief no good',
        choice3: 'Mischief complete',
        choice4: 'Mischief over',
        answer: 1,
    },
    {
        question: "Which platform at King's Cross Station does the Hogwarts Express depart?",
        choice1: 'Platform 10',
        choice2: 'Platform 1',
        choice3: 'Platform 9 & 3/4',
        choice4: 'Platform 7 & 1/2',
        answer: 3,
    },
    {
        question: "What does Harry's wand contain?",
        choice1: 'Dragon heartstring',
        choice2: 'Phoenix feather',
        choice3: 'Unicorn hair',
        choice4: 'Basilisk horn',
        answer: 2,
    },
    {
        question: "Who kills Albus Dumbledore?",
        choice1: 'Severus Snape',
        choice2: 'Bellatrix Lestrange',
        choice3: 'Voldemort',
        choice4: 'Draco Malfoy',
        answer: 1,
    },
    {
        question: "What is Padfoot's real name?",
        choice1: 'James Potter',
        choice2: 'Peter Pettigrew',
        choice3: 'Arthur Weasley',
        choice4: 'Sirius Black',
        answer: 4,
    },
    {
        question: "Which vault do Harry & Hagrid visit to get Harry's money in Gringott's Wizarding Bank?",
        choice1: 'Vault 177',
        choice2: 'Vault 687',
        choice3: 'Vault 928',
        choice4: 'Vault 437',
        answer: 2,
    },
    {
        question: "What is Hagrid's pet dragon called",
        choice1: 'Fang',
        choice2: 'Scabbers',
        choice3: 'Norbert',
        choice4: 'Trevor',
        answer: 3,
    },
    {
        question: "How are the students sorted into their houses?",
        choice1: 'Spell test',
        choice2: 'Broom race',
        choice3: 'The sorting hat',
        choice4: 'A duel',
        answer: 3,
    },
    {
        question: "Who has the ability to talk to snakes?",
        choice1: 'Squibs',
        choice2: 'Parseltongues',
        choice3: 'Dementors',
        choice4: 'Trolls',
        answer: 2,
    },
    {
        question: "What house does the sorting hat almost sort Harry into?",
        choice1: 'Slytherin',
        choice2: 'Hufflepuff',
        choice3: 'Ravenclaw',
        choice4: 'Gryffindor',
        answer: 1,
    },
    {
        question: "What does Professor Fliwick teach in Hogwarts",
        choice1: 'Charms',
        choice2: 'Potions',
        choice3: 'Defense against the dark arts',
        choice4: 'Transfiguration',
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS =  10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
console.error("You made a mistake"); // take this out before submission

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
      })
    })

    incrementScore = num => {
        score +=num
        scoreText.innerText = score
    }

    startGame()