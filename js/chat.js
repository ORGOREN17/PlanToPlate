function addLine(text) {
  const log = document.getElementById("chatLog");
  const p = document.createElement("p");
  p.className = "small";
  p.textContent = text;
  log.appendChild(p);
}

$(document).ready(function () {
  $("#askBtn").on("click", function () {
    const ingredients = $("#ingredientsInput").val().trim();
    const diet = $("#dietSelect").val();

    // dynamic class styling feedback
    $("#ingredientsInput").removeClass("is-invalid");

    if (ingredients.length < 3) {
      $("#ingredientsInput").addClass("is-invalid");
      $("#chatMsg").attr("class", "message error").text("Please type at least 3 characters of ingredients.").show();
      return;
    }

    $("#chatMsg").hide();

    addLine(`You: I have ${ingredients} (diet: ${diet}).`);

    // simple "assistant" logic
    let suggestion = "Assistant: Try a simple stir-fry with garlic + olive oil.";
    if (ingredients.toLowerCase().includes("pasta")) suggestion = "Assistant: Make a quick creamy pasta with garlic and parmesan.";
    if (diet === "vegetarian") suggestion = "Assistant: Focus on veggies + legumes. Try pasta salad with olives and feta.";
    if (diet === "glutenfree") suggestion = "Assistant: Use rice or potatoes. Lemon garlic chicken with rice works well.";

    addLine(suggestion);
  });

  $("#resetChat").on("click", function () {
    $("#chatLog").empty();
    $("#ingredientsInput").val("").removeClass("is-invalid");
    $("#dietSelect").val("none");
    $("#chatMsg").hide();
  });

  $("#convertBtn").on("click", function () {
    const grams = Number($("#gramsInput").val());
    if (!Number.isFinite(grams) || grams < 0) {
      $("#convertOut").text("Enter a valid non-negative number.");
      return;
    }
    const ounces = grams / 28.3495;
    $("#convertOut").text(`${grams} g ≈ ${ounces.toFixed(2)} oz`);
  });
});
