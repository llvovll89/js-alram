// dom 일괄처리
const timer = document.querySelector(".time"),
  content = document.querySelector(".content"),
  selectMenu = document.querySelectorAll("select"),
  btn = document.querySelector(".btn");

let alarmTime,
  isAlarmSet = false,
  ringring = new Audio("./audio/ringtone.mp3"); // 벨소리



// select - hours
for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i; // select박스 안 i 가 10보다 작으면 01 02 03 표현/ 아니면 그냥 i
  let optionBar = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", optionBar); // selectMenu[0] => 시간
}

// select - min
for (let i = 59; i > 0; i--) {
  i = i < 10 ? "0" + i : i; // select박스 안 i 가 10보다 작으면 01 02 03 표현/ 아니면 그냥 i
  let optionBar = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", optionBar); // selectMenu[0] => 시간
}

// select - AM/PM
for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let optionBar = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", optionBar); // selectMenu[0] => 시간
}

setInterval(() => {
  // timer
  let date = new Date(),
    hours = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds(),
    ampm = "AM";

  if (hours >= 12) {
    hours = hours - 12;
    ampm = "PM";
  }

  hours = hours == 0 ? (hours = 12) : hours;
  //  10 미만 에 "0" 붙여주기
  hours = hours < 10 ? "0" + hours : hours;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  timer.innerText = `${hours}:${min}:${sec} ${ampm}`;

  if (alarmTime == `${hours}:${min} ${ampm}`) {
    ringring.play();
    ringring.loop = true;
  }
}, 1000);

// 알람 버튼

btn.addEventListener("click", () => {
  if (isAlarmSet) {
    alarmTime = "";
    ringring.pause();
    content.classList.remove("disable");
    btn.textContent = "알람 설정하기";
    return (isAlarmSet = false);
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;

  // includes 이용 - 포함된 값 비교
  if (time.includes("시간") || time.includes("분") | time.includes("AM/PM")) {
    return alert(`시간 / 분 / AM-PM 설정을 제대로 해주십쇼`);
  }
  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disable");
  btn.innerText = "알람 초기화";
});
