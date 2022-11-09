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

let questions = [{
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
        question: "What does Professor Flitwick teach in Hogwarts",
        choice1: 'Charms',
        choice2: 'Potions',
        choice3: 'Defense against the dark arts',
        choice4: 'Transfiguration',
        answer: 1,
    },
    {
        question: "What are non-magic folk referred to as?",
        choice1: 'Mudbloods',
        choice2: 'Squibs',
        choice3: 'Animagous',
        choice4: 'Muggles',
        answer: 4,
    },
    {
        question: "What does Polyjuice potion do?",
        choice1: 'To transform into an animal',
        choice2: 'To take the form of someone else',
        choice3: 'To time travel',
        choice4: 'To fly a car',
        answer: 2,
    },
    {
        question: "Which patronus belongs to Harry?",
        choice1: 'Horse',
        choice2: 'Hare',
        choice3: 'Stag',
        choice4: 'Dog',
        answer: 3,
    },
    {
        question: "What spell did Harry use to kill Voldemort?",
        choice1: 'Avada Kedavra',
        choice2: 'Expecto Patronum',
        choice3: 'Wingardium Leviosa',
        choice4: 'Expelliarmus',
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

let startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

let getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
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
        const number = choice.dataset.number
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset.number

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        const correctAnswer = choices[currentQuestion.answer - 1]
        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        } else if (classToApply === 'incorrect') {
            correctAnswer.parentElement.classList.add('correct')
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            correctAnswer.parentElement.classList.remove('correct')
            getNewQuestion()

        }, 1000)
    })
})

let incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()

// Audio variables

let music = "off";
const quizAudio = new Audio('assets/sounds/Hedwigs-theme1.mp3');


// Audio settings
// Toggle

quizAudio.loop = true;

function whichMusic() { // Ability to play or pause audio to enhance experience on entering the quiz site

    if (music === "on") {
        quizAudio.play();
    } else {
        (music = "off")
        quizAudio.pause();
    }
}

function checkAudioButtons() {
    if (music === "on") {
        document.getElementById("audio").innerHTML = `<i class="fas fa-volume-mute"></i><br>Audio off`; // Changes the text of the button once clicked
    } else {
        document.getElementById("audio").innerHTML = `<i class="fas fa-volume-up"></i><br>Audio on`; // Changes the text of the button once clicked
    }
}

function toggleMusic() { // So that the user can toggle the music off or on
    if (music === "off") {
        music = "on";
    } else {
        music = "off";
    }
    checkAudioButtons();
    whichMusic();
}