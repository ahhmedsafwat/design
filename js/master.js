// local storage check{
let mainColor = localStorage.getItem("color-option");
if (mainColor != null) {
  document.documentElement.style.setProperty("--primary-color", mainColor);
  // check for active class
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");
    if (ele.dataset.color === mainColor) {
      ele.classList.add("active");
    }
  });
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

// switch background options
const randomBgElement = document.querySelectorAll(".random-backgrounds span");
// random background option
let backgroundOption = true;

// variable to control the interval
let bgInterval;

// chick if there is storage random background item
let backgroundLocalItem = localStorage.getItem("background-option");
if (backgroundLocalItem != null) {
  randomBgElement.forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

//loop on all spans
randomBgElement.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.background == "yes") {
      backgroundOption = true;
      randomizeBackground();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(bgInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

// random background
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

// function to randomize background
function randomizeBackground() {
  if (backgroundOption === true) {
    // change background image url
    bgInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgObjects.length);
      landingPage.style.transition =
        "background-image .6s cubic-bezier(0.4, 0, 1, 1) 0s";
      landingPage.style.backgroundImage = `url('${imgObjects[randomNumber].src}')`;
    }, 10000);
  }
}
randomizeBackground();
const activeNavbar = document.querySelectorAll("ul li a");

activeNavbar.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    // Remove "active" class from all links
    activeNavbar.forEach((link) => link.classList.remove("active"));

    // Add "active" class to the clicked link
    e.target.classList.add("active");
  });
});

// scroll to progress bar
let ourSkills = document.querySelector(".skills");
let skillsUpdated = false; // Flag to track whether skills have been updated

window.onscroll = function () {
  if (!skillsUpdated) {
    let ourSkillsRect = ourSkills.getBoundingClientRect();
    let skillsOffsetTop = ourSkillsRect.top;
    let skillsOuterHeight = ourSkillsRect.height;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.scrollY;

    if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
      const progressnum = document.querySelectorAll(".skill .number");
      const circle = document.querySelectorAll("svg circle");
      progressnum.forEach((progress) => {
        let counter = 0;
        const numInterval = setInterval(() => {
          if (counter <= parseInt(progress.dataset.number)) {
            progress.innerHTML = counter + "%";
            counter++;
          } else {
            clearInterval(numInterval);
          }
        }, 25);
      });

      circle.forEach((circle, index) => {
        const percentage = parseInt(progressnum[index].dataset.number);
        const dashoffset = 566 - (566 * percentage) / 100;
        circle.style.strokeDashoffset = dashoffset;
      });

      skillsUpdated = true; // Set the flag to true to prevent further updates
    }
  }
};
