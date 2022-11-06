const username = document.getElementById('username');
const saveButton = document.getElementById('saveScoreBtn');
const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || []; // variable that creates an array for the most recent high scores
const highScoresList = document.getElementById('highScoresList');

highScoresList.innerHTML = 
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")