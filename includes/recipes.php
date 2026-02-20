<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>PlanToPlate – Recipes</title>
  <link rel="stylesheet" href="../css/style.css">
  <script src="../js/recipes.js"></script>
</head>

<body>

<header class="site-header">
  <a href="../index.html">
    <img src="../images/PlanToPlateLogo.png">
  </a>
  <nav class="nav">
    <a href="../index.html">Home</a>
    <a class="active" href="recipes.php">Recipes</a>
    <a href="recipe-chat.html">Recipe Chat</a>
    <a href="meal-plan.html">Meal Planner</a>
    <a href="favorites.php">Favorites</a>
    <a href="tips.html">Tips</a>
  </nav>
</header>
<main class="page">

  <h1>Explore Recipes</h1>

  <section class="toolbar">
    <input id="searchBox" placeholder="Search recipes">
    <select id="categorySelect">
      <option value="all">All</option>
      <option value="main">Main</option>
      <option value="salad">Salad</option>
      <option value="dessert">Dessert</option>
    </select>
    <button id="clearBtn">Clear</button>
    Favorites: <span id="favCount">0</span>
  </section>

  <section id="recipesGrid" class="recipe-grid"></section>

</main>

<footer>
  From your fridge to your plate.
</footer>


</body>
</html>
