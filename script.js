window.onload = () => {
  // Matrix background
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = "HAPPYBIRTHDAY".split("");
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff69b4";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  const matrixInterval = setInterval(drawMatrix, 50);

  // Countdown
  const countdownEl = document.getElementById("countdown-text");
  let countdown = 3;

  const countdownInterval = setInterval(() => {
    countdownEl.textContent = countdown;
    countdown--;
    if (countdown < 0) {
      clearInterval(countdownInterval);
      clearInterval(matrixInterval);
      document.getElementById("countdown-container").style.display = "none";
      document.querySelector(".container").style.display = "block";
      startTypewriter();
      loadPage(currentPage);
      startFireworks();
    }
  }, 1000);

  // Typewriter
  const fullMessage = "Chúc mừng sinh nhật! 🎈 Mong bạn luôn cười thật tươi!";
  let i = 0;

  function startTypewriter() {
    const messageEl = document.getElementById("birthday-message");
    messageEl.textContent = "";
    function type() {
      if (i < fullMessage.length) {
        messageEl.textContent += fullMessage.charAt(i);
        i++;
        setTimeout(type, 60);
      }
    }
    type();
  }

  // Music
  const music = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-toggle");

  function tryPlay() {
    music.play().catch(() => {
      document.body.addEventListener("click", () => music.play(), { once: true });
    });
  }

  tryPlay();

  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      musicBtn.textContent = "🔊";
    } else {
      music.pause();
      musicBtn.textContent = "🔇";
    }
  });

  // Trang ảnh và lời chúc
  const pages = [
    { img: "anh1.jpg", message: "Chúc bạn tuổi mới luôn rạng rỡ như ánh mặt trời!" },
    { img: "anh2.jpg", message: "Mong mọi điều ước của bạn đều trở thành sự thật!" },
    { img: "anh3.jpg", message: "Hạnh phúc, sức khỏe và thành công sẽ luôn bên bạn 🎂" },
    { img: "anh4.jpg", message: "Luôn tràn đầy năng lượng tích cực trong cuộc sống!" },
    { img: "anh5.jpg", message: "Chúc một năm mới đầy bất ngờ và thú vị! 🎁" },
  ];

  let currentPage = 0;

  function loadPage(index) {
    const page = pages[index];
    document.getElementById("page-image").src = page.img;
    document.getElementById("page-message").textContent = page.message;
  }

  document.getElementById("next-page").addEventListener("click", () => {
    currentPage = (currentPage + 1) % pages.length;
    loadPage(currentPage);
  });

  document.getElementById("prev-page").addEventListener("click", () => {
    currentPage = (currentPage - 1 + pages.length) % pages.length;
    loadPage(currentPage);
  });

  // Fireworks effect
  function startFireworks() {
    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        speedX: (Math.random() - 0.5) * 6,
        speedY: Math.random() * -4 - 2,
        radius: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 360}, 100%, 60%)`,
        life: 100,
      });
    }

    function drawFireworks() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.05;
        p.life--;
      });

      requestAnimationFrame(drawFireworks);
    }

    drawFireworks();
  }
};
