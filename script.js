window.onload = () => {
  // MATRIX
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");
  const starsCanvas = document.getElementById("stars-canvas");
  const starsCtx = starsCanvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const letters = "HAPPYBIRTHDAY".split("");
  const fontSize = 20;
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

  // COUNTDOWN
  const countdownEl = document.getElementById("countdown-text");
  let countdown = 5;
  countdownEl.textContent = countdown;
  const countdownInterval = setInterval(() => {
    countdown--;
    if (countdown >= 0) {
      countdownEl.textContent = countdown;
    }
    if (countdown < 0) {
      clearInterval(countdownInterval);
      clearInterval(matrixInterval);
      document.getElementById("countdown-container").style.transition =
        "opacity 1s";
      document.getElementById("countdown-container").style.opacity = "0";
      setTimeout(() => {
        document.getElementById("countdown-container").style.display = "none";
        document.querySelector(".container").style.display = "flex";
        document.querySelector(".container").style.opacity = "1";
        startTypewriter();
        loadPage(currentPage);
        showFlyingWords();
      }, 1000);
    }
  }, 1000);

  // TYPEWRITER
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

  // MUSIC TOGGLE
  const music = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-toggle");
  function tryPlay() {
    music.play().catch(() => {
      document.body.addEventListener("click", () => music.play(), {
        once: true,
      });
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

  // BOOK FLIP
  const pages = [
    {
      img: "anh 10.jpg",
      message:
        "Chúc chị luôn xinh đẹp, hạnh phúc và thành công trong mọi điều chị làm",
    },
    {
      img: "anh 11.jpg",
      message:
        "Chúc chị tuổi mới thật nhiều niềm vui, sức khỏe và luôn rạng rỡ",
    },
    {
      img: "anh 12.jpg",
      message:
        "Chúc chị luôn mạnh khỏe, bình an và gặp thật nhiều điều tốt đẹp trong cuộc sống",
    },
    {
      img: "anh 13.jpg",
      message:
        "Chúc chị luôn được yêu thương, gặp nhiều may mắn và đạt được mọi ước mơ",
    },
    {
      img: "anh 15.jpg",
      message:
        "Chúc chị Diện quan như ngọc, Diện tái phù dung, Bế nguyệt tu hoa ",
    },
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

  // STARRY SKY WITH COMET EFFECT
  let stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    });
  }
  function drawStars() {
    starsCtx.fillStyle = "rgba(0, 0, 0, 0.1)";
    starsCtx.fillRect(0, 0, starsCanvas.width, starsCanvas.height);
    for (let star of stars) {
      starsCtx.beginPath();
      const gradient = starsCtx.createRadialGradient(
        star.x,
        star.y,
        0,
        star.x,
        star.y,
        star.radius * 5
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      starsCtx.fillStyle = gradient;
      starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      starsCtx.fill();
      star.x += star.vx;
      star.y += star.vy;
      star.alpha += star.delta;
      if (star.alpha <= 0 || star.alpha >= 1) star.delta *= -1;
      if (
        star.x < 0 ||
        star.x > starsCanvas.width ||
        star.y < 0 ||
        star.y > starsCanvas.height
      ) {
        star.x = Math.random() * starsCanvas.width;
        star.y = Math.random() * starsCanvas.height;
      }
    }
    requestAnimationFrame(drawStars);
  }
  drawStars();

  // FANCY FLYING TEXT EFFECT
};
