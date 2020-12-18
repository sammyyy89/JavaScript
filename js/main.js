// 사용 변수
const GAME_TIME = 9;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay  = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init() {
    buttonChange('Loading...');
    getWords();
    // wordInput.addEventListener('이벤트', '기능')
    wordInput.addEventListener('input', checkMatch)
}

// 게임 실행
function run() {
    if(isPlaying) {
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('playing');
}

function checkStatus() {
    if(!isPlaying && time === 0) {
        buttonChange("Start")
        clearInterval(checkInterval)
    }
}

// 단어 불러오기
function getWords() {
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
  .then(function (response) {
    response.data.forEach((word)=>{
        if(word.length < 10) {
            words.push(word);
        } 
    })
    buttonChange('Start');
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

// 단어 일치 체크
function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        wordInput.value = "";
        if(!isPlaying) {
            return;
        }
        score++;
        scoreDisplay.innerText = score;
       // time = GAME_TIME;
        const randomIndex = Math.floor(Math.random()*words.length);
        wordDisplay.innerText = words[randomIndex]
    }
}

function countDown(){
    // 삼항연산자 : (조건) ? 참일 경우: 거짓일 경우
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying){
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;
}

function buttonChange(text){
    button.innerText = text;
    text === 'Start' ? button.classList.remove('loading') : button.classList.add('loading') 
}