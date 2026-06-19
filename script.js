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
