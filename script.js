document.addEventListener("DOMContentLoaded", () => {
  const chips = document.querySelectorAll(".filter-chip");
  const cards = document.querySelectorAll(".koma-card");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");

      const filter = chip.dataset.filter;
      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.genre === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });
});

const animeDescriptions = {
  "Naruto": "A young ninja dreams of becoming the Hokage.",
  "Demon Slayer": "Tanjiro fights demons to save his sister.",
  "One Piece": "Luffy searches for the legendary One Piece treasure.",
  "Attack on Titan": "Humanity battles giant Titans.",
  "Jujutsu Kaisen": "Yuji enters the world of cursed spirits.",
  "My Hero Academia": "Heroes train to protect society.",
  "Death Note": "A notebook grants the power of death.",
  "Spy x Family": "A spy builds a fake family for a mission.",
  "Fullmetal Alchemist: Brotherhood": "Two brothers seek redemption through alchemy.",
  "Violet Evergarden": "A former soldier learns human emotions.",
  "Your Lie in April": "A pianist rediscovers music through friendship.",
  "Toradora!": "A romantic comedy about unexpected relationships."
};

const modal = document.getElementById("animeModal");
const title = document.getElementById("animeTitle");
const description = document.getElementById("animeDescription");

document.querySelectorAll(".koma-card").forEach(card => {
  card.addEventListener("click", () => {
    const animeName = card.querySelector("h3").textContent;

    title.textContent = animeName;
    description.textContent = animeDescriptions[animeName];

    modal.style.display = "flex";
  });
});

document.querySelector(".close-btn").addEventListener("click", () => {
  modal.style.display = "none";
});

document.getElementById("buyBtn").addEventListener("click", () => {
  alert("Cashfree Payment Integration Here");
});

const closeBtn = document.querySelector(".close-btn");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

const buyBtn = document.getElementById("buyBtn");
if (buyBtn) {
  buyBtn.addEventListener("click", () => {
    alert("Cashfree Payment Integration Here");
  });
}
