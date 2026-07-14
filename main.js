document.addEventListener("DOMContentLoaded", () => {
  const ZALO_PHONE = "0937111999";
  const zaloUrl = `https://zalo.me/${ZALO_PHONE}`;

  document.querySelectorAll(".zalo-link").forEach((link) => {
    link.href = zaloUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  const mobileMenuButton = document.querySelector("#mobileMenuButton");
  const mainMenu = document.querySelector("#mainMenu");
  const menuLinks = mainMenu ? mainMenu.querySelectorAll("a") : [];

  function closeMenu() {
    if (!mobileMenuButton || !mainMenu) return;
    mobileMenuButton.classList.remove("open");
    mainMenu.classList.remove("open");
    mobileMenuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }

  mobileMenuButton?.addEventListener("click", () => {
    if (!mainMenu) return;
    const isOpen = mainMenu.classList.toggle("open");
    mobileMenuButton.classList.toggle("open", isOpen);
    mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("no-scroll", isOpen);
  });

  menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });

  const heroVideo = document.querySelector("#heroVideo");
  const playButton = document.querySelector("#playButton");
  const soundButton = document.querySelector("#soundButton");

  playButton?.addEventListener("click", async () => {
    if (!heroVideo) return;
    try {
      if (heroVideo.paused) {
        await heroVideo.play();
        playButton.classList.remove("is-paused");
        playButton.setAttribute("aria-label", "Tạm dừng video");
      } else {
        heroVideo.pause();
        playButton.classList.add("is-paused");
        playButton.setAttribute("aria-label", "Phát video");
      }
    } catch (error) {
      console.error("Không thể điều khiển video:", error);
    }
  });

  soundButton?.addEventListener("click", () => {
    if (!heroVideo) return;
    heroVideo.muted = !heroVideo.muted;
    soundButton.classList.toggle("has-sound", !heroVideo.muted);
    soundButton.setAttribute(
      "aria-label",
      heroVideo.muted ? "Bật âm thanh" : "Tắt âm thanh",
    );
  });

  const videoCards = document.querySelectorAll("[data-video]");
  const videoModal = document.querySelector("#videoModal");
  const videoModalPlayer = document.querySelector("#videoModalPlayer");
  const videoModalClose = document.querySelector("#videoModalClose");
  const videoModalBackdrop = document.querySelector(".video-modal-backdrop");

  function openVideoModal(videoUrl) {
    if (!videoModal || !videoModalPlayer || !videoUrl) return;
    videoModalPlayer.src = videoUrl;
    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    videoModalPlayer.play().catch(() => {});
  }

  function closeVideoModal() {
    if (!videoModal || !videoModalPlayer) return;
    videoModalPlayer.pause();
    videoModalPlayer.currentTime = 0;
    videoModalPlayer.removeAttribute("src");
    videoModalPlayer.load();
    videoModal.classList.remove("is-open");
    videoModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  videoCards.forEach((card) => {
    card.addEventListener("click", () => openVideoModal(card.dataset.video));
  });
  videoModalClose?.addEventListener("click", closeVideoModal);
  videoModalBackdrop?.addEventListener("click", closeVideoModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && videoModal?.classList.contains("is-open")) {
      closeVideoModal();
    }
  });
});
