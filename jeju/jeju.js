document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".topbanner").style.display = "none";
  document.querySelector("header").style.height = "110px";
});
document.querySelector("#closepopup1").addEventListener("click", function () {
  document.querySelector(".popup1").style.display = "none";
  document.querySelector(".popup1").style.opacity = "0";
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelector(".slides");
  const slide = document.querySelectorAll(".slide");
  const total = slide.length;

  let index = 0;
  let isPlaying = true;
  let auto;

  function goToSlide(n) {
    index = (n + total) % total;
    slides.style.transform = `translateX(-${index * 100}%)`;
    document.querySelector(".page").innerHTML = `<span>${
      index + 1
    }</span> / <span>${total}</span>`;
  }

  function startAutoPlay() {
    auto = setInterval(() => {
      goToSlide(index + 1);
    }, 9000);
  }
  startAutoPlay();

  document.querySelector("#left").addEventListener("click", () => {
    goToSlide(index - 1);
  });

  document.querySelector("#right").addEventListener("click", () => {
    goToSlide(index + 1);
  });

  const stopbtn = document.querySelector(".stop");

  document.querySelector(".stop").addEventListener("click", function () {
    if (isPlaying) {
      clearInterval(auto);
      stopbtn.classList.add("active");
    } else {
      startAutoPlay();
      stopbtn.classList.remove("active");
    }
    isPlaying = !isPlaying;
  });
  goToSlide(0);
});

const clickcolors = document.querySelectorAll(".clickcolor");

clickcolors.forEach((clickcolor) => {
  clickcolor.addEventListener("click", () => {
    clickcolors.forEach((item) => item.classList.remove("active"));
    clickcolor.classList.add("active");
  });
});
const reserves = document.querySelectorAll(".reserve");
const tabs = document.querySelectorAll(".tab");

reserves.forEach((reserve) => {
  reserve.addEventListener("click", () => {
    reserves.forEach((item) => item.classList.remove("active"));
    reserve.classList.add("active");

    const target = reserve.dataset.tab;
    tabs.forEach((tab) => tab.classList.remove("show"));
    document.getElementById(target).classList.add("show");
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const departdate = document.querySelector("#departdate_txt");

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const w = week[date.getDay()];
    return `${y}.${m}.${d}(${w})`;
  };

  departdate.innerHTML = `${formatDate(today)} ~ ${formatDate(nextWeek)}`;
});

const depart = document.querySelector("#depart");
const arrival = document.querySelector("#arrival");

depart.addEventListener("click", () => {
  depart.classList.add("active");
  arrival.classList.remove("active");
});
arrival.addEventListener("click", () => {
  arrival.classList.add("active");
  depart.classList.remove("active");
});

const radios = document.querySelectorAll(".radio");

radios.forEach((radio) => {
  radio.addEventListener("click", () => {
    radios.forEach((r) => r.classList.remove("active"));
    radio.classList.add("active");
  });
});
