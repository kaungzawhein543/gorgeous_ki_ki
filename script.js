window.textImageScale = 1;
const container = document.getElementById("rain-container");
const welcomeBox = document.getElementById("welcome-box");
const bgMusic = document.getElementById("bg-music");
let dragTilt = 0;
let baseRotateY = 0;
let lastX = null;
let dragging = false;

const words = [
  "LET LOVE FALL",
  "GRACE UPON YOU",
  "BLESS THIS SOUL",
  "HOLD ME GENTLY",
  "FIND THE LIGHT",
  "YOU ARE ENOUGH",
  "LET YOUR HEART REST",
  "GUIDED BY FAITH",
  "PRAY IN SILENCE",
  "CARRY THE PEACE",
  "BREATHE AND BELIEVE",
  "LET HEALING BEGIN"
];  

const imagePaths = [
  "images/Black_shirt.jpg",
  "images/chinese_beauty.png",
  "images/cutie_pink.jpg",
  "images/damn_.png",
  "images/gorgeous.png",
  "images/holy_beauty.png",
  "images/kiki_with_kid.jpg",
  "images/kiki_with_kid2.jpg"
];

const heartEmojis = ["💖", "💘", "💝", "💕", "💞", "💗", "❤️‍🔥", "💓"];

// 🌟 Start on welcome click
welcomeBox.addEventListener("click", () => {
  welcomeBox.style.display = "none";
  console.log("something")
  bgMusic.play().catch(e => console.warn("Autoplay blocked:", e));
  startRain(); // ✅ start the actual rain now
}); 



// 🌧 Word + image drop
function createDrop() {
  const drop = document.createElement("div");
  drop.classList.add("drop");

  const isText = Math.random() > 0.4;

  if (isText) {
    const word = words[Math.floor(Math.random() * words.length)];
    drop.classList.add("text-drop");
    drop.textContent = word;

    drop.addEventListener("click", (e) => {
      e.stopPropagation();
      showClickMessage(`"${word}" 💖`);
    });

  } else {
    drop.classList.add("image-drop");
    const imagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];
    const img = document.createElement("img");
    img.setAttribute("draggable",false);
    img.src = imagePath;

    img.addEventListener("click", (e) => {
      e.stopPropagation();
      const fileName = imagePath.split("/").pop().replace(/\.[^.]+$/, "");
      showClickMessage(`"${fileName.replace(/_/g, " ")}" 💘`);
    });

    drop.appendChild(img);
  }

  // Randomize drop direction: left or right
  const useLeft = Math.random() > 0.5;
  const position = Math.random() * 100;
  if (useLeft) {
    drop.style.left = position + "vw";
    drop.style.right = "auto";
  } else {
    drop.style.right = position + "vw";
    drop.style.left = "auto";
  }
  const z = Math.random() * -400;
  drop.dataset.z = z;
  drop.style.transform = `translateZ(${z}px) rotateY(${baseRotateY + dragTilt}deg) scale(${(1 + z / -600) * window.textImageScale})`;
  drop.style.animationDuration = (Math.random() * 2 + 4) + "s";

  container.appendChild(drop);
  setTimeout(() => drop.remove(), 6000);
}

// ✨ Shiny particles (no image or word)
function createShinyDrop() {
  const shiny = document.createElement("div");
  shiny.classList.add("shiny-drop");

  shiny.style.left = Math.random() * 100 + "vw";
  shiny.style.animationDuration = (Math.random() * 3 + 4) + "s";
  shiny.style.opacity = Math.random() * 0.6 + 0.2;
  shiny.style.width = (Math.random() * 2 + 2) + "px";
  shiny.style.height = (Math.random() * 6 + 10) + "px";

  container.appendChild(shiny);
  setTimeout(() => shiny.remove(), 7000);
}

// 🧠 Show message box
function showClickMessage(text) {
  const box = document.getElementById("click-message");
  box.textContent = text;
  box.style.opacity = 1;
  setTimeout(() => (box.style.opacity = 0), 2500);
}

function updateTiltOnDrops() {
  const drops = document.querySelectorAll(".drop");
  drops.forEach(drop => {
    const z = parseFloat(drop.dataset.z) || 0;
    const scale = (1 + z / -600) * window.textImageScale;
    drop.style.transform = `translateZ(${z}px) rotateY(${baseRotateY + dragTilt}deg) scale(${scale})`;
  });
  requestAnimationFrame(updateTiltOnDrops);
}

// 🌧 Start rain intervals only after welcome clicked
function startRain() {
  const width = window.innerWidth;
  let dropFrequency, shinyFrequency, scaleFactor;

  if (width < 600) { // Mobile
    dropFrequency = 300; // even more drops
    shinyFrequency = 120;
    scaleFactor = 0.7;
  } else if (width < 1024) { // Tablet
    dropFrequency = 250;
    shinyFrequency = 150;
    scaleFactor = 1.0;
  } else { // Desktop
    dropFrequency = 120;
    shinyFrequency = 80;
    scaleFactor = 1.3;
  }

  window.textImageScale = scaleFactor;

  setInterval(createDrop, dropFrequency);
  setInterval(createShinyDrop, shinyFrequency);
  requestAnimationFrame(updateTiltOnDrops);
}


document.addEventListener("mousedown", () => dragging = true);
document.addEventListener("mouseup", () => { dragging = false; lastX = null; });
document.addEventListener("touchstart", () => dragging = true);
document.addEventListener("touchend", () => { dragging = false; lastX = null; });

document.addEventListener("mousemove", handleDrag);
document.addEventListener("touchmove", handleDrag);

function handleDrag(e) {
  if (!dragging) return;
  if (e.touches) e.preventDefault();
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  if (lastX !== null) {
    const dx = x - lastX;
    // Higher sensitivity for touch, normal for mouse
    const sensitivity = e.touches ? 0.10 : 0.02;
    dragTilt += dx * sensitivity;
    dragTilt = Math.max(-45, Math.min(45, dragTilt));
  }
  lastX = x;
}

