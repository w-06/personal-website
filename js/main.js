/* 全站交互：主题、导航、入场、视差、自定义光标 */
(function () {
  const doc = document;
  const root = doc.documentElement;

  // 暗色模式
  const themeBtn = doc.querySelector("[data-theme-toggle]");
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || (!stored && matchMedia("(prefers-color-scheme: dark)").matches)) {
    root.classList.add("dark");
  }
  function syncThemeIcon() {
    if (!themeBtn) return;
    const isDark = root.classList.contains("dark");
    const tip = isDark ? "当前夜间模式，点击切换到日间模式" : "当前日间模式，点击切换到夜间模式";
    themeBtn.setAttribute("aria-label", tip);
    themeBtn.setAttribute("title", tip);
    const label = themeBtn.querySelector(".theme-label");
    if (label) label.textContent = isDark ? "夜间模式" : "日间模式";
  }
  syncThemeIcon();
  themeBtn &&
    themeBtn.addEventListener("click", () => {
      root.classList.toggle("dark");
      localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
      syncThemeIcon();
    });

  // 移动端菜单
  const menuBtn = doc.querySelector("[data-menu-toggle]");
  const nav = doc.querySelector("[data-nav]");
  menuBtn &&
    menuBtn.addEventListener("click", () => {
      nav && nav.classList.toggle("open");
    });

  // 逐字入场
  doc.querySelectorAll("[data-split]").forEach((el) => {
    const text = el.textContent.trim();
    el.textContent = "";
    [...text].forEach((ch, i) => {
      const span = doc.createElement("span");
      span.className = "word";
      span.textContent = ch === " " ? " " : ch;
      span.style.animationDelay = `${0.05 + i * 0.03}s`;
      el.appendChild(span);
    });
  });

  // 滚动显现
  const aos = doc.querySelectorAll("[data-aos]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    aos.forEach((el) => io.observe(el));
  } else {
    aos.forEach((el) => el.classList.add("aos-in"));
  }

  // 桌面端视差 + 自定义光标
  const isMobile = matchMedia("(max-width: 768px)").matches;
  const webCase = doc.querySelector(".web-case");
  const chips = doc.querySelectorAll(".float-chip");
  const cursor = doc.querySelector(".cursor-indicator");
  const caseGo = doc.querySelector(".case-go");

  if (!isMobile && webCase) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let targetX = 0;
    let targetY = 0;
    let hovering = false;

    const strengths = [
      { el: webCase, s: 22 },
      ...[...chips].map((el, i) => ({ el, s: 34 + i * 10 })),
    ];

    doc.addEventListener("mousemove", (e) => {
      mouseX = e.clientX / innerWidth - 0.5;
      mouseY = e.clientY / innerHeight - 0.5;
    });

    if (caseGo && cursor) {
      caseGo.addEventListener("mouseenter", () => {
        hovering = true;
        doc.body.classList.add("no-cursor");
        cursor.classList.add("on");
      });
      caseGo.addEventListener("mouseleave", () => {
        hovering = false;
        doc.body.classList.remove("no-cursor");
        cursor.classList.remove("on");
      });
      caseGo.addEventListener("mousemove", (e) => {
        const rect = caseGo.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
      });
      caseGo.addEventListener("click", () => {
        const href = webCase.getAttribute("data-href");
        if (href) window.open(href, "_blank", "noopener,noreferrer");
      });
    }

    function tick() {
      strengths.forEach(({ el, s }) => {
        const tx = mouseX * s;
        const ty = mouseY * s;
        const m = new DOMMatrix(getComputedStyle(el).transform);
        const cx = m.m41 || 0;
        const cy = m.m42 || 0;
        el.style.transform = `translate3d(${cx + (tx - cx) * 0.08}px, ${cy + (ty - cy) * 0.08}px, 0)`;
      });
      if (hovering && cursor && caseGo) {
        cursorX += (targetX - cursorX) * 0.14;
        cursorY += (targetY - cursorY) * 0.14;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  // 年份
  doc.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
