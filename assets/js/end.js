const username = document.querySelector('#username')
let saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn = username.value
})

let saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a, b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('highscores.html')


}

// Audio variables

let music = "off";
const quizAudio = new Audio('assets/sounds/Fire-sound.mp3');

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