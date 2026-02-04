const act1Duration = 6500; 

// 1. Initial Transition Act 1 -> Act 2
setTimeout(() => {
  document.querySelector('.act-1').classList.remove('active');
  document.querySelector('.act-2').classList.add('active');
  playAct2();
}, act1Duration);

// 2. Act 2 Typing Logic
async function playAct2() {
  const lines = [
    { text: "The world is a canvas, but you are the masterpiece.", el: "#line1 .text" },
    { text: " Every moment with you inspires me, and I hope this little surprise shows how much you mean to me.", el: "#line2 .text" },
    { text: "just the beginning", el: "#line3 .text" }
  ];

  for (let line of lines) {
    await typeText(line.text, document.querySelector(line.el));
    await new Promise(r => setTimeout(r, 1000));
  }
  document.querySelector(".continue").classList.add("show");
}

function typeText(text, element) {
  return new Promise(resolve => {
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i === text.length) {
        clearInterval(interval);
        resolve();
      }
    }, 60);
  });
}

// 3. Act 2 -> Act 3
document.getElementById("continueAct3").addEventListener("click", () => {
  document.querySelector(".act-2").classList.remove("active");
  document.querySelector(".act-3").classList.add("active");
});

// 4. Choice Logic (Act 3 -> Act 4)
document.querySelectorAll(".choice-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("act3").classList.remove("active");
    const act4 = document.getElementById("act4");
    act4.classList.add("active");
    
    launchHeartConfetti();
    
    // Show manual click button for Act 5 after 3 seconds
    setTimeout(() => {
      document.getElementById("toAct5Btn").classList.add("show");
    }, 3000);
  });
});

// 5. Final Transition (Act 4 -> Act 5)
document.getElementById("toAct5Btn").addEventListener("click", () => {
  document.querySelector(".act-4-content").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("act5").classList.add("active");
  }, 1000);
});

function launchHeartConfetti() {
  const container = document.querySelector(".heart-confetti");
  for (let i = 0; i < 200; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.cssText = `
      position: absolute; left: ${Math.random() * 100}vw; top: -10%;
      font-size: ${Math.random() * 20 + 10}px;
      animation: fall ${Math.random() * 3 + 2}s linear forwards;
    `;
    heart.innerHTML = "❤️";
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }

}



const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

// Set the volume to a romantic, soft level
music.volume = 0.4;

// Function to start music on first click/interaction
function startMusic() {
  music.play().catch(error => {
    console.log("Autoplay prevented. Music will start on the first interaction.");
  });
  // Remove the listener once music starts
  document.removeEventListener('click', startMusic);
}

// Start music as soon as she clicks anywhere on the site
document.addEventListener('click', startMusic);

// Mute/Unmute Toggle logic
musicToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevents triggering other click events
  if (music.paused) {
    music.play();
    musicToggle.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  } else {
    music.pause();
    musicToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  }
});
