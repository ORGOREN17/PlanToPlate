document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("favoritesGrid");

  fetchFavorites();

  async function fetchFavorites() {
    try {
      const res = await fetch("../includes/get_favorites.php");
      const data = await res.json();

      if (!data.length) {
        grid.innerHTML = "<p class='empty-msg'>No favorite recipes yet.</p>";
        return;
      }

      grid.innerHTML = data.map(r => `
        <div class="recipe-card" data-id="${r.id}">
          <img src="../${r.image_url}" alt="${r.title}">
          <h3>${r.title}</h3>
          <p>${r.description}</p>
          <button class="remove-fav">Remove</button>
        </div>
      `).join("");

    } catch (err) {
      console.error("Failed loading favorites", err);
    }
  }

  document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("remove-fav")) return;

    const card = e.target.closest(".recipe-card");
    const recipeId = card.dataset.id;

    const res = await fetch("../includes/remove_favorite.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `recipe_id=${recipeId}`
    });

    const data = await res.json();
    if (data.success) {
      card.remove();
      if (!grid.children.length) {
        grid.innerHTML = "<p class='empty-msg'></p>";
      }
    }
  });
});
