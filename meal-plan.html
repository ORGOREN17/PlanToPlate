document.addEventListener("DOMContentLoaded", () => {
  // Data
  const metricData = [
    { name: "Flour", v1: "120 g", v2: "240 ml" },
    { name: "Sugar", v1: "200 g", v2: "240 ml" },
    { name: "Butter", v1: "113 g", v2: "120 ml" },
    { name: "Milk", v1: "—", v2: "240 ml" },
    { name: "Olive Oil", v1: "—", v2: "240 ml" },
    { name: "Rice (uncooked)", v1: "185 g", v2: "240 ml" },
    { name: "Honey", v1: "340 g", v2: "240 ml" }
  ];

  const usData = [
    { name: "Flour", v1: "1 cup", v2: "16 tbsp" },
    { name: "Sugar", v1: "1 cup", v2: "16 tbsp" },
    { name: "Butter", v1: "½ cup", v2: "8 tbsp" },
    { name: "Milk", v1: "1 cup", v2: "16 tbsp" },
    { name: "Olive Oil", v1: "1 cup", v2: "16 tbsp" },
    { name: "Rice (uncooked)", v1: "1 cup", v2: "16 tbsp" },
    { name: "Honey", v1: "1 cup", v2: "16 tbsp" }
  ];

  // Elements
  const body = document.getElementById("conversionBody");
  const col1 = document.getElementById("col1");
  const col2 = document.getElementById("col2");
  const metricBtn = document.getElementById("metricBtn");
  const usBtn = document.getElementById("usBtn");

  // Safety checks (prevents “nothing happens” bugs)
  if (!body || !col1 || !col2 || !metricBtn || !usBtn) {
    console.error("Tips page: missing conversion table elements in HTML.");
    return;
  }

  function render(data, h1, h2) {
    col1.textContent = h1;
    col2.textContent = h2;

    body.innerHTML = data
      .map(item => {
        return `
          <tr>
            <td>${escapeHtml(item.name)}</td>
            <td>${escapeHtml(item.v1)}</td>
            <td>${escapeHtml(item.v2)}</td>
          </tr>
        `;
      })
      .join("");
  }

  function setActive(activeBtn) {
    [metricBtn, usBtn].forEach(btn => {
      const isActive = btn === activeBtn;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  // Button events
  metricBtn.addEventListener("click", () => {
    render(metricData, "Grams", "Milliliters");
    setActive(metricBtn);
  });

  usBtn.addEventListener("click", () => {
    render(usData, "Cups", "Tablespoons");
    setActive(usBtn);
  });

  // Initial
  render(metricData, "Grams", "Milliliters");
  setActive(metricBtn);

  // Basic XSS-safe helper for table rendering
  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
});
