const helloText = document.getElementById("helloText");
const clock = document.getElementById("clock");
const userName = localStorage.getItem("idValue");
const bgArea = document.querySelector(".bg_container");
const toDoArea = document.querySelector(".todo_cont");
const toDoList = document.querySelectorAll(".list");
const toDoInput = document.getElementById("todoInput");
const toDoBtn = document.getElementById("todoBtn");
let num = 1;
let todoText;

const TODOS_KEY = "toDoList";
let toDos = [];
const deletedToDoNum = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
  num -= 1;
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo["id"];
  li.classList.add("list");
  const span = document.createElement("span");
  span.innerHTML = newTodo["text"];
  const button = document.createElement("button");
  button.classList.add("closeBtn");
  button.innerHTML = "X";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  toDoArea.appendChild(li);
}

function handelToDoSubmit() {
  const toDoNum = saveToDos.length;

  for (let i = 0; i < toDoNum; i++) {}

  if (num <= 12) {
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
      text: newTodo,
      id: `list${num}`,
      num: num,
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
    num += 1;
  } else {
    alert("할 일이 너무 많아요.");
  }
}

toDoBtn.addEventListener("click", handelToDoSubmit);

// 처음에 localStorage에 데이터가 있는 경우 가져와서 화면에 보여주기
const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  // 만약 기존 데이터가 있는 경우 실행
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

// 로그인 닉네임 텍스트 유지
helloText.innerText = `할 수 있어 ${userName}!`;

// 시계 기능 구현
function getClock() {
  const date = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const years = date.getFullYear();
  const month = date.getMonth() + 1;
  const today = date.getDate();
  const dayOfWeek = days[date.getDay()];
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${years}.${month}.${today}(${dayOfWeek}) ${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);

// 백그라운드 랜덤 변경 기능 구현
const bgNum = Math.floor(Math.random() * 4 + 1);
const bgroot = "./assets/imgs/";

bgArea.style.background = `url(${bgroot}bg${bgNum}.jpeg) center bottom no-repeat`;
bgArea.style.backgroundSize = "contain";

window.addEventListener("load", () => {
  const apiKey = "8e347d29a139fa76671c815a19d1d641";

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // OpenWeatherMap API를 사용하여 날씨 정보 가져오기
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          const lo = data.name;
          const weatherElement = document.getElementById("weather");
          const weatherDescription = data.weather[0].main;
          const temperature = (data.main.temp - 273.15).toFixed(1);
          weatherElement.innerText = `${lo} ${weatherDescription}, ${temperature}°C`;
        })
        .catch((error) => {
          console.error("오류! 오류 발생!:", error);
        });
    });
  } else {
    console.error("날씨 정보 없음");
  }
});

// localStorage.removeItem(TODOS_KEY);
