const id = new URLSearchParams(location.search).get("id");

fetch(`api/get_recipe.php?id=${id}`)
  .then(res => res.json())
  .then(data => {
    title.textContent = data.recipe.title;
    desc.textContent = data.recipe.description;

    data.ingredients.forEach(i =>
      ingredients.innerHTML += `<li>${i}</li>`
    );

    data.instructions.forEach(s =>
      steps.innerHTML += `<li>${s.description}</li>`
    );
  });
