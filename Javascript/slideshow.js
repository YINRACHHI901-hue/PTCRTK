const slides = document.querySelectorAll(".slide");
      const dotsEl = document.getElementById("dots");
      const progress = document.getElementById("progress");
      let current = 0,
        timer,
        progressTimer,
        elapsed = 0;
      const DURATION = 10000;

      // Build dots
      slides.forEach((_, i) => {
        const d = document.createElement("button");
        d.className = "dot" + (i === 0 ? " active" : "");
        d.setAttribute("aria-label", "Slide " + (i + 1));
        d.onclick = () => goTo(i);
        dotsEl.appendChild(d);
      });

      function updateDots() {
        dotsEl
          .querySelectorAll(".dot")
          .forEach((d, i) => d.classList.toggle("active", i === current));
      }

      function goTo(n) {
        slides[current].classList.remove("active");
        slides[current].classList.add("exit");
        const prev = current;
        setTimeout(() => slides[prev].classList.remove("exit"), 700);
        current = (n + slides.length) % slides.length;
        slides[current].classList.add("active");
        updateDots();
        resetProgress();
      }

      function resetProgress() {
        clearInterval(progressTimer);
        elapsed = 0;
        progress.style.transition = "none";
        progress.style.width = "0%";
        requestAnimationFrame(() => {
          progress.style.transition = "width 0.1s linear";
          startProgress();
        });
      }

      function startProgress() {
        const step = 100;
        progressTimer = setInterval(() => {
          elapsed += step;
          progress.style.width =
            Math.min((elapsed / DURATION) * 100, 100) + "%";
          if (elapsed >= DURATION) {
            clearInterval(progressTimer);
            goTo(current + 1);
          }
        }, step);
      }

      document.getElementById("prev").onclick = () => goTo(current - 1);
      document.getElementById("next").onclick = () => goTo(current + 1);

      // Keyboard
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") goTo(current - 1);
        if (e.key === "ArrowRight") goTo(current + 1);
      });

      // Touch swipe
      let touchX = null;
      document
        .getElementById("slideshow")
        .addEventListener("touchstart", (e) => {
          touchX = e.touches[0].clientX;
        });
      document.getElementById("slideshow").addEventListener("touchend", (e) => {
        if (touchX === null) return;
        const diff = touchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
        touchX = null;
      });

      // Mobile nav
      document.getElementById("hamburger").onclick = () => {
        document.getElementById("nav").classList.toggle("open");
      };

      resetProgress();