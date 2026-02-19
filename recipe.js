document.addEventListener("DOMContentLoaded", () => {
  const ingredientsInput = document.getElementById("ingredientsInput");
  const preferenceSelect = document.getElementById("preferenceSelect");
  const timeSelect = document.getElementById("timeSelect");
  const skillSelect = document.getElementById("skillSelect");

  const generateBtn = document.getElementById("generateBtn");
  const regenBtn = document.getElementById("regenBtn");
  const suggestionsBtn = document.getElementById("suggestionsBtn");

  const recipeOutput = document.getElementById("recipeOutput");
  const emptyHint = document.getElementById("emptyHint");

  const recipeTitle = document.getElementById("recipeTitle");
  const recipeMeta = document.getElementById("recipeMeta");
  const recipeIngredients = document.getElementById("recipeIngredients");
  const recipeSteps = document.getElementById("recipeSteps");

  const copyBtn = document.getElementById("copyBtn");
  const clearOutBtn = document.getElementById("clearOutBtn");

  const toast = document.getElementById("toast");

  let lastPayload = null;

  // ---------- Helpers ----------
  function showToast(msg, isError = false) {
    toast.textContent = msg;
    toast.classList.toggle("error", isError);
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  }

  function parseIngredients(raw) {
    return raw
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function clampTime(n) {
    const num = Number(n);
    if (Number.isNaN(num)) return 20;
    return Math.max(10, Math.min(60, num));
  }

  // ---------- Tiny “recipe brain” (templates) ----------
  const templates = {
    any: [
      {
        base: "Skillet",
        titles: ["Pan Sizzle Bowl", "Quick Skillet Special", "One-Pan Comfort Plate"],
        steps: (ings, skill) => {
          const steps = [
            `Prep: chop/slice your ingredients: ${ings.slice(0, 5).join(", ")}.`,
            "Heat a pan with a little oil/butter on medium heat.",
            "Cook aromatics first (like onion/garlic) for 1–2 minutes.",
            "Add proteins/firm veggies, cook until browned.",
            "Add remaining ingredients + a splash of water/broth, cover and simmer 5–10 minutes.",
            "Taste, salt/pepper, finish with lemon or herbs if you have them."
          ];
          if (skill === "hard") steps.splice(4, 0, "Deglaze: add a splash of water/broth and scrape browned bits for extra flavor.");
          return steps;
        }
      },
      {
        base: "Pasta",
        titles: ["Creamy Pantry Pasta", "Fast Weeknight Pasta", "Garlic Toss Pasta"],
        steps: (ings, skill) => {
          const steps = [
            "Boil pasta (or any noodles) until al dente. Reserve 1/2 cup cooking water.",
            `In a pan, sauté: ${ings.includes("garlic") ? "garlic" : "aromatics"} with a little oil.`,
            "Add veggies/protein you have and cook until done.",
            "Toss pasta into the pan. Add a splash of pasta water to loosen.",
            "Finish with cheese/yogurt/cream (optional) + salt/pepper."
          ];
          if (skill !== "easy") steps.push("Optional: add chili flakes + squeeze of lemon for brightness.");
          return steps;
        }
      }
    ],

    vegetarian: [
      {
        base: "Veggie Stir",
        titles: ["Color Crunch Stir-Fry", "Veggie Wok Bowl", "Sautéed Garden Mix"],
        steps: (ings, skill) => {
          const steps = [
            `Slice vegetables: ${ings.slice(0, 6).join(", ")}.`,
            "Heat oil in a pan. Add the hardest veggies first (carrot, broccoli).",
            "Add softer veggies later (tomato, spinach).",
            "Season with salt/pepper + soy sauce or lemon if you like.",
            "Serve as-is or over rice/bread if you have it."
          ];
          if (skill === "hard") steps.push("Finish: toast seeds/nuts in the pan 30 seconds and sprinkle on top.");
          return steps;
        }
      }
    ],

    vegan: [
      {
        base: "Vegan Bowl",
        titles: ["Vegan Power Bowl", "Plant-Based Cozy Bowl", "Simple Vegan Plate"],
        steps: (ings, skill) => {
          const steps = [
            "Cook a base if you have it (rice/quinoa) OR use salad greens.",
            `Build the bowl using: ${ings.slice(0, 7).join(", ")}.`,
            "Make a quick dressing: olive oil + lemon + salt + pepper.",
            "Mix, taste, adjust.",
            "Optional: add chickpeas/beans if you have them."
          ];
          if (skill !== "easy") steps.push("Optional: roast veggies 15–20 min for deeper flavor (if time allows).");
          return steps;
        }
      }
    ],

    lowcarb: [
      {
        base: "Low-Carb Plate",
        titles: ["Low-Carb Skillet", "Protein + Greens", "Simple Low-Carb Dinner"],
        steps: (ings, skill) => {
          const steps = [
            `Choose protein + veggies from: ${ings.join(", ")}.`,
            "Pan-cook protein first (if you have one). Remove to rest.",
            "Cook veggies in the same pan.",
            "Return protein, season well.",
            "Finish with olive oil + lemon/vinegar."
          ];
          if (skill === "hard") steps.push("Optional: add a quick pan sauce (lemon + butter alternative like olive oil + herbs).");
          return steps;
        }
      }
    ]
  };

  function buildRecipe(payload) {
    const diet = payload.diet;
    const skill = payload.skill;
    const maxTime = payload.maxTime;

    const ings = payload.ingredients;
    const safeDiet = templates[diet] ? diet : "any";

    const t = pick(templates[safeDiet]);
    const title = `${pick(t.titles)} (${t.base})`;

    // ingredient list: ensure it feels “recipe-like”
    const core = ings.length ? ings : ["salt", "pepper"];
    const extras = [];
    if (!core.some(x => x.toLowerCase().includes("salt"))) extras.push("Salt (to taste)");
    if (!core.some(x => x.toLowerCase().includes("pepper"))) extras.push("Black pepper (to taste)");
    extras.push("Olive oil (1–2 tbsp)");

    // Steps from template + adapt for time
    let steps = t.steps(core, skill);

    if (maxTime <= 15) {
      steps = steps.map(s => s.replaceAll("5–10", "3–5"));
      steps.push("Shortcut: keep it simple—season well and serve.");
    }

    return {
      title,
      meta: `${payload.diet.toUpperCase()} • ${payload.skill.toUpperCase()} • ≤ ${payload.maxTime} min`,
      ingredients: [...core.map(x => x[0].toUpperCase() + x.slice(1)), ...extras],
      steps
    };
  }

  function renderRecipe(recipe) {
    emptyHint.hidden = true;
    recipeOutput.hidden = false;

    recipeTitle.textContent = recipe.title;
    recipeMeta.textContent = recipe.meta;

    recipeIngredients.innerHTML = "";
    recipe.steps ??= [];
    recipe.ingredients ??= [];

    recipe.ingredients.forEach(i => {
      const li = document.createElement("li");
      li.textContent = i;
      recipeIngredients.appendChild(li);
    });

    recipeSteps.innerHTML = "";
    recipe.steps.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      recipeSteps.appendChild(li);
    });
  }

  function clearOutput() {
    recipeOutput.hidden = true;
    emptyHint.hidden = false;
    recipeTitle.textContent = "";
    recipeMeta.textContent = "";
    recipeIngredients.innerHTML = "";
    recipeSteps.innerHTML = "";
  }

  function getPayloadFromUI() {
    const ingredients = parseIngredients(ingredientsInput.value);
    const diet = preferenceSelect.value;
    const maxTime = clampTime(timeSelect.value);
    const skill = skillSelect.value;

    return { ingredients, diet, maxTime, skill };
  }

  // ---------- Events ----------
  suggestionsBtn.addEventListener("click", () => {
    const examples = [
      "pasta, mushrooms, cream",
      "chicken, rice, garlic",
      "tomato, cucumber, feta",
      "bread, avocado, olive oil",
      "chickpeas, lemon, tahini"
    ];
    ingredientsInput.value = pick(examples);
    showToast("Suggestion added to ingredients.");
  });

  generateBtn.addEventListener("click", () => {
    const payload = getPayloadFromUI();
    if (!payload.ingredients.length) {
      showToast("Add at least 2 ingredients (comma-separated).", true);
      return;
    }

    lastPayload = payload;
    const recipe = buildRecipe(payload);
    renderRecipe(recipe);

    regenBtn.disabled = false;
    showToast("Recipe generated ✅");
  });

  regenBtn.addEventListener("click", () => {
    if (!lastPayload) {
      showToast("Generate once first.", true);
      return;
    }
    const recipe = buildRecipe(lastPayload);
    renderRecipe(recipe);
    showToast("Regenerated 🔁");
  });

  copyBtn.addEventListener("click", async () => {
    try {
      const text =
        `${recipeTitle.textContent}\n` +
        `${recipeMeta.textContent}\n\n` +
        `Ingredients:\n- ${[...recipeIngredients.querySelectorAll("li")].map(li => li.textContent).join("\n- ")}\n\n` +
        `Instructions:\n${[...recipeSteps.querySelectorAll("li")].map((li, idx) => `${idx + 1}. ${li.textContent}`).join("\n")}\n`;

      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard 📋");
    } catch (e) {
      showToast("Copy failed (browser blocked clipboard).", true);
    }
  });

  clearOutBtn.addEventListener("click", () => {
    clearOutput();
    lastPayload = null;
    regenBtn.disabled = true;
    showToast("Cleared.");
  });

  // Start clean
  clearOutput();
});
