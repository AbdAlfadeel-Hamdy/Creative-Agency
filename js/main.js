let myPage = document.querySelector(".landing-page");

let myImages = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

document.querySelector(".icon").addEventListener("click", function () {
  document.querySelector(".setting-box").classList.toggle("open");
  this.classList.toggle("fa-spin");
  document.querySelector(".icon-box").classList.toggle("active");
});

// Start Colors-box
let myColors = document.querySelectorAll(".colors-list li");

myColors.forEach((li) => {
  li.addEventListener("click", function (e) {
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );
    myColors.forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.add("active");
    localStorage.setItem("color", e.target.dataset.color);
  });
});
document.documentElement.style.setProperty(
  "--main--color",
  localStorage.getItem("color")
);
myColors.forEach((li) => {
  if (localStorage.getItem("color") == li.dataset.color) {
    li.classList.add("active");
  }
});
// End Colors-box

// Start Yes/ No
let options = document.querySelectorAll(".options span");
let myoption = true;
let cleardata;

let myBackStore = localStorage.getItem("backChange");
if (myBackStore !== null) {
  if (localStorage.getItem("backChange") === "true") {
    myoption = true;
    options.forEach((li) => {
      li.classList.remove("active");
      if (li.dataset.choice === "yes") {
        li.classList.add("active");
      }
    });
  } else {
    myoption = false;
    options.forEach((li) => {
      li.classList.remove("active");
      if (li.dataset.choice === "no") {
        li.classList.add("active");
      }
    });
  }
}

options.forEach((li) => {
  li.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.choice === "yes") {
      myoption = true;
      backgroundOptions();
      localStorage.setItem("backChange", true);
    } else {
      myoption = false;
      clearInterval(cleardata);
      localStorage.setItem("backChange", false);
    }
  });
});
function backgroundOptions() {
  if (myoption === true) {
    cleardata = setInterval(() => {
      let myrandom = Math.floor(Math.random() * myImages.length);

      myPage.style.backgroundImage = `url(../images/${myImages[myrandom]})`;
    }, 4000);

    console.log(Math.random());
  }
}
backgroundOptions();

// End Yes/ No

// Start Skills
window.onscroll = function () {
  let mySkills = document.querySelector(".skills");
  let mySkillsOuterHeight = mySkills.offsetHeight;
  let mySkillsOffsetTop = mySkills.offsetTop;
  let windowheight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;
  if (
    windowScrollTop >
    mySkillsOuterHeight + mySkillsOffsetTop - windowheight
  ) {
    let mySkillsSpans = document.querySelectorAll(".skills .skill-box span");
    mySkillsSpans.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};
// ENd Skills

// start Gallery
let gallery = document.querySelectorAll(".gallery img");

gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlayBox = document.createElement("div");
    overlayBox.className = "overlay-box";
    document.body.appendChild(overlayBox);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let myHeading = document.createElement("h3");
      myHeading.className = "heading";
      myHeading.textContent = img.alt;
      popupBox.appendChild(myHeading);
    }
    let popupImage = document.createElement("img");
    popupImage.className = "popup-img";
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    let mySpan = document.createElement("span");
    mySpan.textContent = "X";
    mySpan.className = "popup-span";
    popupBox.appendChild(mySpan);
    document.body.appendChild(popupBox);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className == "popup-span") {
    e.target.parentNode.remove();
    document.querySelector(".overlay-box").remove();
  }
});
// End Gallery

// Start Bullets
const myBullets = document.querySelectorAll(".bullet");
const myLinks = document.querySelectorAll("li a");

function myFunction(myElements) {
  myElements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

myFunction(myBullets);
myFunction(myLinks);
// End Bullets

let myBulletsContainer = document.querySelector(".bullets");
let myBulletSpans = document.querySelectorAll(".options span");
let myBulletsLocal = localStorage.getItem("bullet");

if (myBulletsLocal !== null) {
  if (myBulletsLocal === "show") {
    myBulletsContainer.style.display = "block";
    document.querySelector(".options span.yes").classList.add("active");
  } else {
    myBulletsContainer.style.display = "none";
    document.querySelector(".options span.no").classList.add("active");
  }
}

myBulletSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.show === "show") {
      myBulletsContainer.style.display = "block";
      localStorage.setItem("bullet", "show");
    } else {
      myBulletsContainer.style.display = "none";
      localStorage.setItem("bullet", "hide");
    }
  });
});

document.querySelector(".reset").onclick = function () {
  localStorage.removeItem("bullet");
  localStorage.removeItem("backChange");
  localStorage.removeItem("color");
  window.location.reload();
};

let showMenu = document.querySelector(".toggle-menu");
let showed = document.querySelector(".links-container");

showMenu.addEventListener("click", function (e) {
  showed.classList.toggle("open");
  showMenu.classList.toggle("active");
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (e.target !== showed && e.target !== showMenu) {
    if (showed.classList.contains("open")) {
      showed.classList.toggle("open");
      showMenu.classList.toggle("active");
    }
  }
});

showed.onclick = function (e) {
  e.stopPropagation();
};
