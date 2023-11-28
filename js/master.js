// local storage check{
let mainColor = localStorage.getItem("color-option");
if (mainColor != null) {
  document.documentElement.style.setProperty(
    "--primary-color",
    localStorage.getItem("color-option")
  );
}
// toggle class on click
document.querySelector(".toggle-settings").onclick = function () {
  document.querySelector(".toggle-settings i").classList.toggle("left");
  document.querySelector(".setting-box").classList.toggle("open");
};

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--primary-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

const landingPage = document.querySelector(".landing-page");

// get array of images
let imgsArray = ["bg-2.jpg", "bg-3.jpg", "bg-5.jpg", "bg-6.jpg", "bg-7.jpg"];

// preload the images
let imgObjects = [];
imgsArray.forEach((imgUrl) => {
  const img = new Image();
  img.src = `../images/${imgUrl}`;
  imgObjects.push(img);
});

// change background image url
setInterval(() => {
  let randomNumber = Math.floor(Math.random() * imgObjects.length);
  landingPage.style.transition =
    "background-image 1.2s cubic-bezier(0.4, 0, 1, 1) 0s";
  landingPage.style.backgroundImage = `url('${imgObjects[randomNumber].src}')`;
}, 10000);
