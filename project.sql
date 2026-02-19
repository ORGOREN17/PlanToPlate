<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>PlanToPlate</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>

  <body>
    <header class="site-header">
      <a href="index.html"><img src="images/PlanToPlateLogo.png" /></a>
      <nav class="nav">
        <a href="index.html">Home</a>
        <a href="includes/recipes.php">Recipes</a>
        <a href="recipe-chat.html">Recipe Chat</a>
        <a href="meal-plan.html">Meal Planner</a>
        <a href="includes/favorites.php">Favorites</a>
        <a href="tips.html">Tips</a>
      </nav>
    </header>
    <main class="page">
      <h1>What should we cook today?</h1>

      <section class="hero">
        <img src="images/WhatShouldWeCookTodayPIC.png" alt="Food inspiration" />
      </section>

      <section class="features">
        <div class="feature-card">
          <h3>Find by Category</h3>
          <p>Search recipes by cuisine type or meal type.</p>
        </div>
        <div class="feature-card">
          <h3>Favorite Recipes</h3>
          <p>Quick access to the recipes you love the most.</p>
        </div>
        <div class="feature-card">
          <h3>Tips & Conversations</h3>
          <p>Helpful cooking tips and a simple unit converter.</p>
        </div>
      </section>

      <h2>Weekly Recommendations</h2>

      <section class="recipe-grid">
        <div class="recipe-card">
          <img src="images/mushroomPasta.png" />
          <div class="content">
            <h4>Creamy Pasta</h4>
            <p>
              A comforting pasta dish made with sautéed mushrooms, garlic and a
              rich, creamy sauce. Easy to prepare and full of flavor.
            </p>
          </div>
        </div>
        <div class="recipe-card">
          <img src="images/Cremeschnitte_Cake.png" />
          <div class="content">
            <h4>Cremeschnitte Cake</h4>
            <p>
              A light and creamy dessert made with delicate layers of flaky puff
              pastry and smooth vanilla custard. Perfect for a sweet treat or a
              special occasion.
            </p>
          </div>
        </div>
        <div class="recipe-card">
          <img src="images/Lemon_Garlic_Chicken.png" />
          <div class="content">
            <h4>Lemon Garlic Chicken</h4>
            <p>
              Juicy chicken breast cooked with fresh lemon, garlic and herbs,
              served over fluffy rice. A simple and comforting dish.
            </p>
          </div>
        </div>
        <div class="recipe-card">
          <img src="images/Pasta_Salad.png" />
          <div class="content">
            <h4>Pasta Salad</h4>
            <p>
              A fresh and easy pasta salad made with cherry tomatoes, cucumbers,
              olives, feta cheese and a light olive oil dressing. Perfect for a
              quick lunch or a light dinner.
            </p>
          </div>
        </div>
      </section>

      <section class="chat-box">
        <div>
          <h2>Recipe Chat how it works?</h2>
          <ul>
            <li>Tell us what ingredients you have</li>
            <li>Choose preferences or dietary needs</li>
            <li>Get step-by-step guidance</li>
          </ul>
        </div>
        <button onclick="location.href = 'recipe-chat.html'">Start Chat</button>
      </section>

      <section class="image-strip">
        <img src="images/chicken.jpg" />
        <img src="images/Lemon_Garlic_Chicken.png" />
        <img src="images/Pasta_Salad.png" />
        <img src="images/dessert.jpg" />
      </section>
    </main>

    <footer>From your fridge to your plate.</footer>
  </body>
</html>
