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
}, 2000);
