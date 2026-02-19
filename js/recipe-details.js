document.addEventListener("DOMContentLoaded", async () => {
  const page = document.querySelector(".recipe-details");
  const recipeId = page.dataset.id;

  try {
    const res = await fetch(`../includes/get_recipe_details.php?id=${recipeId}`);
    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    renderRecipe(data);
  } catch (err) {
    console.error(err);
    alert("Failed to load recipe details");
  }
});

function renderRecipe(data) {
  const { recipe, ingredients, instructions } = data;

  document.getElementById("recipeHeader").innerHTML = `
    <h1>${recipe.title}</h1>
    <img class="recipe-img" src="../${recipe.image_url}">
    <p>${recipe.description}</p>
    <p>
      <strong>${recipe.time} min</strong> ·
      <strong>${recipe.difficulty}</strong>
    </p>
  `;

  document.getElementById("ingredientsList").innerHTML =
    ingredients.map(i => `<li>${i}</li>`).join("");

  document.getElementById("instructionsList").innerHTML =
    instructions.map(s => `<li>${s.description}</li>`).join("");
}
