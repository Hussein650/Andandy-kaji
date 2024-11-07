let answers = [];

words.forEach((word, index) => {
    answers[index] = word.arabic;
});

function removeWordFromQuestionsList(answeredWord) {
    words.forEach(word => {
        if (word.nubian === answeredWord.nubian) {
            word.nubian = words[words.length - 1].nubian;
            word.arabic = words[words.length - 1].arabic;
            words.pop();
            return;
        }
    });
}

let score = 0;
let currentQuestion;

function startGame() {
    score = 0;
    nextQuestion();
}

function nextQuestion() {
    document.querySelectorAll('.option').forEach(btn => {
        btn.classList.remove('correct', 'wrong');
    });
    
    currentQuestion = words[Math.floor(Math.random() * words.length)];
    
    document.querySelector(".nubian-word").innerText = currentQuestion.nubian;
    document.querySelector(".score").innerText = "النقاط: " + score;

    const options = shuffle([currentQuestion.arabic, ...getRandomOptions()]);
    document.querySelectorAll('.option').forEach((btn, index) => {
        btn.innerText = options[index];
    });

}

function checkAnswer(index) {
    const selectedOption = document.querySelectorAll('.option')[index];
    if (selectedOption.innerText === currentQuestion.arabic) {
        selectedOption.classList.add('correct');
        score++;
        removeWordFromQuestionsList(currentQuestion);
        if (score === words.length) {
            setTimeout(function () {
                document.querySelector('.game-container').style.display = "none";
                document.querySelector('.final-result').style.display = "block";
                document.querySelector('.final-result span').innerHTML = "لقد فزت!";
            }, 1000);
        }
    } else {
        selectedOption.classList.add('wrong');
        setTimeout(function () {
            document.querySelector('.game-container').style.display = "none";
            document.querySelector('.final-result').style.display = "block";
            document.querySelector('.final-result span').innerHTML = "لقد خسرت!";
        }, 1000);
    }
    setTimeout(nextQuestion, 1000);
}

function getRandomOptions() {
    let incorrectOptions = [];
    
    while (incorrectOptions.length < 3) {
        let randPos = Math.floor(Math.random() * words.length);
        let found = false;
        
        incorrectOptions.forEach((opt) => {
            if (opt === words[randPos].arabic) {
                found = true;
                return;
            }
        });
        
        if (found === false) {
            incorrectOptions.push(words[randPos].arabic);
        }
    }



    return incorrectOptions;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function resetGame() {
    location.reload();
}

document.querySelector('.reset-btn').onclick = resetGame;

startGame();