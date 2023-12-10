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
const toggleSetting = document.querySelector(".toggle-settings");
const settingBox = document.querySelector(".setting-box");
toggleSetting.addEventListener("click", () => {
  settingToggle();
});

function settingToggle() {
  document.querySelector(".toggle-settings i").classList.toggle("left");
  settingBox.classList.toggle("open");
}
document.addEventListener("click", (event) => {
  // Check if the clicked element is outside the navigation menu and hamburger
  if (
    !settingBox.contains(event.target) &&
    !toggleSetting.contains(event.target)
  ) {
    // Close the menu if it's open
    if (settingBox.classList.contains("open")) {
      settingToggle();
    }
  }
});
// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--primary-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    handelActive(e);
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
  img.src = `images/${imgUrl}`;
  imgObjects.push(img);
});

// function to randomize background
function randomizeBackground() {
  if (backgroundOption === true) {
    // change background image url
    bgInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgObjects.length);
      landingPage.style.transition = "background-image .6s linear";
      landingPage.style.backgroundImage = `url('${imgObjects[randomNumber].src}')`;
    }, 4000);
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

// create popup images
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img, index) => {
  img.addEventListener("click", (e) => {
    // create elements
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    // set image src to the new image element
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    // image title
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }
    // close span
    let span = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    span.className = "close-button";

    // append childs
    document.body.appendChild(overlay);
    span.appendChild(closeButtonText);
    popupBox.appendChild(span);
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// testimonials scroll
const testimonialsScroll = document.querySelectorAll(".testimonials-box");
const slides = document.querySelectorAll(".arrows i");

let counter = 0;

slides.forEach((slide) => {
  slide.addEventListener("click", (e) => {
    if (e.target.classList.contains("left")) {
      // Check if there are testimonials to the left
      counter = counter > 0 ? counter - 1 : 0;
    } else {
      // Check if there are testimonials to the right
      counter = counter < testimonialsScroll.length - 1 ? counter + 1 : counter;
    }

    testimonialsScroll.forEach((testimonial, index) => {
      testimonial.style.transform = `translateX(${-counter * 330}px)`;
    });
  });
});

//reset button
document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  window.location.reload();
};

//toggleMenu
const navbar = document.querySelector("nav");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  toggleMenu();
});

function toggleMenu() {
  navbar.classList.toggle("nav-bar");
  hamburger.classList.toggle("change");
}

document.addEventListener("click", (event) => {
  // Check if the clicked element is outside the navigation menu and hamburger
  if (!navbar.contains(event.target) && !hamburger.contains(event.target)) {
    // Close the menu if it's open
    if (!navbar.classList.contains("nav-bar")) {
      toggleMenu();
    }
  }
});
function handelActive(ev) {
  ev.target.parentElement
    .querySelectorAll(".active")
    .forEach((element) => element.classList.remove("active"));

  ev.target.classList.add("active");
}
