document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("recipesGrid");
  const favCount = document.getElementById("favCount");
  const clearBtn = document.getElementById("clearBtn");
  const searchBox = document.getElementById("searchBox");
  const categorySelect = document.getElementById("categorySelect");

  // initial load
  loadRecipes();
  loadFavoritesCount();

  // 🔹 EVENTS
  searchBox.addEventListener("input", loadRecipes);
  categorySelect.addEventListener("change", loadRecipes);

  clearBtn.addEventListener("click", async () => {
    await fetch("../includes/clear_favorites.php");
    favCount.textContent = 0;
  });

  // 🔹 LOAD RECIPES WITH FILTERS
  async function loadRecipes() {
    const search = searchBox.value.trim();
    const category = categorySelect.value;

    const params = new URLSearchParams({
      search,
      category
    });

    const res = await fetch(`../includes/get_recipes.php?${params}`);
    const recipes = await res.json();

    grid.innerHTML = "";

    if (recipes.length === 0) {
      grid.innerHTML = `<p>No recipes found.</p>`;
      return;
    }

    recipes.forEach(r => {
      grid.innerHTML += `
        <div class="recipe-card">
          <img src="../${r.image_url}" alt="${r.title}">
          <h3>${r.title}</h3>
          <p>${r.description}</p>
          <small>${r.time} min • ${r.difficulty}</small>

          <div class="actions">
            <button class="btn save-btn" data-id="${r.id}">⭐ Save</button>
            <a class="btn view-btn" href="../includes/recipe_details.php?id=${r.id}">View</a>
          </div>
        </div>
      `;
    });

    document.querySelectorAll(".save-btn").forEach(btn => {
      btn.addEventListener("click", () => addFavorite(btn.dataset.id));
    });
  }

  // 🔹 ADD FAVORITE
  async function addFavorite(recipeId) {
    await fetch("../includes/add_favorite.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `recipe_id=${recipeId}`
    });

    loadFavoritesCount();
  }

  // 🔹 FAVORITES COUNT
  async function loadFavoritesCount() {
    const res = await fetch("../includes/get_favorites.php");
    const data = await res.json();
    favCount.textContent = data.length;
  }
});
