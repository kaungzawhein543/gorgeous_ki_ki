const container = document.getElementById("rain-container");
const welcomeBox = document.getElementById("welcome-box");
const bgMusic = document.getElementById("bg-music");

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
  bgMusic.play().catch(e => console.warn("Autoplay blocked:", e));
  startRain(); // ✅ start the actual rain now
});

let lastHoverTime = 0;

let holdBurst = false;

// For Desktop: hold mouse
document.addEventListener("mousedown", () => { holdBurst = true; });
document.addEventListener("mouseup", () => { holdBurst = false; });

// For Touch Devices
document.addEventListener("touchstart", () => { holdBurst = true; });
document.addEventListener("touchend", () => { holdBurst = false; });

// Heart burst while holding
document.addEventListener("mousemove", (e) => {
  if (holdBurst) {
    burstHearts(e.pageX, e.pageY);
  }
});

document.addEventListener("touchmove", (e) => {
  if (holdBurst && e.touches.length > 0) {
    const touch = e.touches[0];
    burstHearts(touch.pageX, touch.pageY);
  }
});

const now = Date.now();
if (now - lastHoverTime > 120) {
  burstHearts(x, y);
  lastHoverTime = now;
}



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
    img.src = imagePath;

    img.addEventListener("click", (e) => {
      e.stopPropagation();
      const fileName = imagePath.split("/").pop().replace(/\.[^.]+$/, "");
      showClickMessage(`"${fileName.replace(/_/g, " ")}" 💘`);
    });

    drop.appendChild(img);
  }

  drop.style.left = Math.random() * 100 + "vw";
  const z = Math.random() * -400;
  drop.style.transform = `translateZ(${z}px) rotateY(-25deg) scale(${1 + z / -600})`;
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

// ❤️ Floating hearts on click
document.addEventListener("click", (e) => {
  burstHearts(e.pageX, e.pageY);
});

function burstHearts(x, y) {
  const count = 5 + Math.floor(Math.random() * 3);
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    const offsetX = (Math.random() - 0.5) * 40;
    const offsetY = (Math.random() - 0.5) * 30;
    const rotation = (Math.random() - 0.5) * 40;
    const scale = 0.5 + Math.random() * 0.5;

    heart.style.left = x + offsetX + "px";
    heart.style.top = y + offsetY + "px";
    heart.style.transform = `rotate(${rotation}deg) scale(${scale})`;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1400);
  }
}

// 🧠 Show message box
function showClickMessage(text) {
  const box = document.getElementById("click-message");
  box.textContent = text;
  box.style.opacity = 1;
  setTimeout(() => (box.style.opacity = 0), 2500);
}

// 🌧 Start rain intervals only after welcome clicked
function startRain() {
  setInterval(createDrop, 200);
  setInterval(createShinyDrop, 100);
}
