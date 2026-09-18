// Массив слов: каждая пара — эстонское слово и его русский перевод
const words = [
    { est: "kass",   ru: "кошка" },
    { est: "koer",   ru: "собака" },
    { est: "maja",   ru: "дом" },
    { est: "raamat", ru: "книга" },
    { est: "vesi",   ru: "вода" },
    { est: "leib",   ru: "хлеб" },
    { est: "auto",   ru: "машина" },
    { est: "lill",   ru: "цветок" },
    { est: "päike",  ru: "солнце" },
    { est: "kuu",    ru: "луна" }
];

// Счётчик правильных ответов
let score = 0;

// Ссылки на DOM-элементы, которые будем обновлять
const estWordEl = document.getElementById("estWord");
const ruWordEl  = document.getElementById("ruWord");
const ruInput   = document.getElementById("ruInput");
const estInput  = document.getElementById("estInput");
const ruResult  = document.getElementById("ruResult");
const estResult = document.getElementById("estResult");
const scoreEl   = document.getElementById("score");

// Текущая пара слов (чтобы проверять ответы именно по ней)
let currentPair = null;

// Функция генерации случайного индекса из массива слов
function getRandomIndex() {
    return Math.floor(Math.random() * words.length);
}

// Функция выбора новой пары слов и обновления интерфейса
function loadNewWords() {
    const idx = getRandomIndex();
    currentPair = words[idx];

    estWordEl.textContent = currentPair.est;
    ruWordEl.textContent  = currentPair.ru;

    ruInput.value = "";
    estInput.value = "";
    ruResult.textContent = "";
    estResult.textContent = "";
    ruResult.className = "result";
    estResult.className = "result";
}

// Проверка перевода с эстонского на русский (столбец 1)
function checkRussian() {
    const answer = ruInput.value.trim().toLowerCase();
    if (!answer) return;

    if (answer === currentPair.ru.toLowerCase()) {
        ruResult.textContent = "✅ Õige!";
        ruResult.className = "result correct";
        score++;
        scoreEl.textContent = score;
    } else {
        ruResult.textContent = "❌ Vale. Õige: " + currentPair.ru;
        ruResult.className = "result wrong";
    }
}

// Проверка перевода с русского на эстонский (столбец 2)
function checkEstonian() {
    const answer = estInput.value.trim().toLowerCase();
    if (!answer) return;

    if (answer === currentPair.est.toLowerCase()) {
        estResult.textContent = "✅ Õige!";
        estResult.className = "result correct";
        score++;
        scoreEl.textContent = score;
    } else {
        estResult.textContent = "❌ Vale. Õige: " + currentPair.est;
        estResult.className = "result wrong";
    }
}

// Привязка обработчиков событий к кнопкам и полям ввода
document.getElementById("refreshBtn").addEventListener("click", loadNewWords);
document.getElementById("checkRuBtn").addEventListener("click", checkRussian);
document.getElementById("checkEstBtn").addEventListener("click", checkEstonian);

// Проверка по нажатию Enter в поле ввода
ruInput.addEventListener("keypress", e => { if (e.key === "Enter") checkRussian(); });
estInput.addEventListener("keypress", e => { if (e.key === "Enter") checkEstonian(); });

// Первичная загрузка слов при открытии страни
loadNewWords();