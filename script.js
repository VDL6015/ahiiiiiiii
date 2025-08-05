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
  let fullMessage = "Chúc mừng sinh nhật! 🎈 Mong bạn luôn cười thật tươi!";
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
      message: "Chúc bạn tuổi mới luôn rạng rỡ như ánh mặt trời!",
    },
    {
      img: "anh2.jpg",
      message: "Mong mọi điều ước của bạn đều trở thành sự thật!",
    },
    {
      img: "anh3.jpg",
      message: "Hạnh phúc, sức khỏe và thành công sẽ luôn bên bạn 🎂",
    },
    {
      img: "anh4.jpg",
      message: "Luôn tràn đầy năng lượng tích cực trong cuộc sống!",
    },
    { img: "anh5.jpg", message: "Chúc một năm mới đầy bất ngờ và thú vị! 🎁" },
  ];
  let currentPage = 0;
  function loadPage(index) {
    const page = pages[index];
    const pageImage = document.getElementById("page-image");
    pageImage.classList.add("flipped");
    setTimeout(() => {
      pageImage.src = page.img;
      document.getElementById("page-message").textContent = page.message;
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

  // ENHANCED STARRY SKY: Tạo bầu trời sao cải tiến
  let stars = [];
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random(),
      delta: Math.random() * 0.03 + 0.01,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
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
      gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha * 0.8})`);
      gradient.addColorStop(0.5, `rgba(255, 215, 0, ${star.alpha * 0.5})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      starsCtx.fillStyle = gradient;
      starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      starsCtx.fill();
      star.x += star.vx;
      star.y += star.vy;
      star.alpha += star.delta;
      if (star.alpha <= 0.3 || star.alpha >= 1) star.delta *= -1;
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

  // WEATHER EFFECT (LEAVES FOR AUGUST): Tạo hiệu ứng lá bay
  let leaves = [];
  for (let i = 0; i < 50; i++) {
    leaves.push({
      x: Math.random() * weatherCanvas.width,
      y: -20,
      vy: Math.random() * 1 + 0.5,
      rotation: Math.random() * 360,
    });
  }
  function drawLeaves() {
    wCtx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height);
    wCtx.fillStyle = "#ffffffff";
    for (let leaf of leaves) {
      leaf.y += leaf.vy;
      leaf.rotation += 1;
      if (leaf.y > weatherCanvas.height) leaf.y = -20;
      wCtx.save();
      wCtx.translate(leaf.x, leaf.y);
      wCtx.rotate((leaf.rotation * Math.PI) / 180);
      wCtx.beginPath();
      wCtx.moveTo(0, 0);
      wCtx.lineTo(10, 0);
      wCtx.lineTo(5, -10);
      wCtx.closePath();
      wCtx.fill();
      wCtx.restore();
    }
    requestAnimationFrame(drawLeaves);
  }
  drawLeaves();
};
