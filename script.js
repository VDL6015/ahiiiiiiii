window.onload = () => {
  // RESIZE CANVAS: Hàm để điều chỉnh kích thước các canvas khi trang tải hoặc thay đổi kích thước màn hình
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");
  const starsCanvas = document.getElementById("stars-canvas");
  const starsCtx = starsCanvas.getContext("2d");
  const weatherCanvas = document.getElementById("weather-canvas");
  const wCtx = weatherCanvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    weatherCanvas.width = window.innerWidth;
    weatherCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // MATRIX EFFECT: Tạo hiệu ứng ma trận (chuỗi chữ chạy)
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

  // COUNTDOWN: Tạo hiệu ứng đếm ngược với chữ "HAPPY BIRTHDAY TO YOU"
  const countdownEl = document.getElementById("countdown-text");
  const countdownWords = ["HAPPY", "BIRTHDAY", "TO", "YOU"];
  let countdownIndex = 0;
  countdownEl.textContent = countdownWords[countdownIndex];
  const countdownInterval = setInterval(() => {
    countdownIndex++;
    if (countdownIndex < countdownWords.length) {
      countdownEl.textContent = countdownWords[countdownIndex];
    } else {
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
      }, 1000);
    }
  }, 1000);

  // TYPEWRITER: Tạo hiệu ứng gõ chữ
  let fullMessage = "Chúc mừng sinh nhật! 🎈 Mong chị luôn cười thật tươi!";
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

  // MUSIC TOGGLE: Điều khiển nhạc nền
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

  // BOOK FLIP: Tạo hiệu ứng lật sách
  const pages = [
    {
      img: "anh1.jpg",
      message:
        "Chúc chị tuổi mới thật nhiều niềm vui, sức khỏe và luôn rạng rỡ",
    },
    {
      img: "anh2.jpg",
      message:
        "Chúc chị luôn bình bình an an bình an và gặp thật nhiều điều tốt đẹp trong cuộc sống",
    },
    {
      img: "anh3.jpg",
      message:
        "Chúc chị luôn may mắn, đạt được nhiều thành công trong công việc và cuộc sống",
    },
    {
      img: "anh4.jpg",
      message: "Chúc chị luôn tràn đầy năng lượng tích cực trong cuộc sống",
    },
    {
      img: "anh5.jpg",
      message:
        "Chúc chị luôn Diện quan như ngọc, Diện tái phù dung, Bế nguyệt tu hoa",
    },
  ];
  let currentPage = 0;
  function loadPage(index) {
    const page = pages[index];
    const pageImage = document.getElementById("page-image");
    pageImage.classList.add("flipped");
    setTimeout(() => {
      pageImage.src = page.img;
      const pageMsg = document.getElementById("page-message");
      pageMsg.textContent = page.message;
      pageMsg.className = "chuc-mung"; // Thêm class nổi bật
      pageImage.classList.remove("flipped");
    }, 300);
  }
  document.getElementById("next-page").addEventListener("click", () => {
    currentPage = (currentPage + 1) % pages.length;
    loadPage(currentPage);
  });
  document.getElementById("prev-page").addEventListener("click", () => {
    currentPage = (currentPage - 1 + pages.length) % pages.length;
    loadPage(currentPage);
  });

  // ENHANCED STARRY SKY
  let stars = [];
  for (let i = 0; i < 10; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random(),
      delta: Math.random() * 0.1 + 0.05, // Tăng tốc độ nhấp nháy
    });
  }
  function drawStars() {
    starsCtx.fillStyle = "rgba(0, 0, 0, 0.05)";
    starsCtx.fillRect(0, 0, starsCanvas.width, starsCanvas.height);
    for (let star of stars) {
      starsCtx.beginPath();
      const gradient = starsCtx.createRadialGradient(
        star.x,
        star.y,
        0,
        star.x,
        star.y,
        star.radius * 3
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${star.alpha * 0.5})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      starsCtx.fillStyle = gradient;
      starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      starsCtx.fill();
      star.alpha += star.delta;
      if (star.alpha <= 0.3 || star.alpha >= 1) {
        star.delta *= -1;
        star.x = Math.random() * starsCanvas.width;
        star.y = Math.random() * starsCanvas.height;
      }
    }
    requestAnimationFrame(drawStars);
  }
  drawStars();
  // WEATHER EFFECT
  let hearts = [];
  for (let i = 0; i < 10; i++) {
    hearts.push({
      x: Math.random() * weatherCanvas.width,
      y: -20,
      vy: Math.random() * 1 + 0.5,
      size: Math.random() * 8 + 10,
      rotation: Math.random() * 360,
    });
  }
  function drawHeart(ctx, x, y, size, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.beginPath();
    // Vẽ trái tim bằng bezier
    ctx.moveTo(0, -size / 4);
    ctx.bezierCurveTo(size / 2, -size / 2, size, size / 3, 0, size);
    ctx.bezierCurveTo(-size, size / 3, -size / 2, -size / 2, 0, -size / 4);
    ctx.closePath();
    ctx.fillStyle = "#ff69b4";
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }
  function drawHearts() {
    wCtx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height);
    for (let heart of hearts) {
      heart.y += heart.vy;
      heart.rotation += 1;
      if (heart.y > weatherCanvas.height) {
        heart.y = -20;
        heart.x = Math.random() * weatherCanvas.width;
      }
      drawHeart(wCtx, heart.x, heart.y, heart.size, heart.rotation);
    }
    requestAnimationFrame(drawHearts);
  }
  drawHearts();
};
