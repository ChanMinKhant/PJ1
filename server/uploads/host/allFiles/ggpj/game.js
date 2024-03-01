const words = [
    {
        words:"addition",
        hint: "The process of addiing numbers"
    },
    {
        words:"taste",
        hint: "Ability of tongue to detect flavour"
    },
    {
        words:"store",
        hint: "Large shop where goods are traded"
    },
    {
        words:"field",
        hint: "Area of land for farming activities"
    },
    {
        words:"friend",
        hint: "Person other than a family member"
    },
    {
        words:"pocket",
        hint: "A bag for carrying small items"
    },
    {
        words:"needle",
        hint: "A thin and sharp metal pin"
    },
    {
        words:"number",
        hint: "Math symbol used for counting"
    },
    {
        words:"exchange",
        hint: "The act of trading"
    },
]

const wordText = document.querySelector(".word"),
hintText =document.querySelector(".hint span"),
timeText = document.querySelector(".time b")
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn =document.querySelector(".check-word");

let correctWord , timer;

const initTimer = maxTime =>{
    clearInterval(timer);
    timer = setInterval(() =>{
        if(maxTime>0){
            maxTime--;
           return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    },1000);
}

const initGame = () =>{
    initTimer(30);
    let randomObj = words[Math.floor(Math.random()* words.length)];
    let wordArray = randomObj.words.split("")
    for (let i =wordArray.length-1 ; i >0; i--) {
        let j = Math.floor(Math.random()*(i+1));
        [wordArray[i],wordArray[j]]=[wordArray[j],wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText =randomObj.hint;
    correctWord =randomObj.words.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength",correctWord.length)
}
initGame()
const checkWord =() =>{
    let userWord =inputField.value.toLowerCase();
    if(!userWord) return alert("Please enter a word check");
    if (userWord !== correctWord ) return alert(`Oops! ${userWord} is not a correct word`);
    alert(`Congrats! ${userWord.toUpperCase()} is  a correct word`);
    initGame()
    
}
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
