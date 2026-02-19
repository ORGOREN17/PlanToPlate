document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("planForm");
  const msgBox = document.getElementById("formMsg");
  const saveBtn = document.getElementById("saveBtn");

  const successModal = document.getElementById("successModal");
  const successOkBtn = document.getElementById("successOkBtn");
  const successText = document.getElementById("successText");

  const fields = {
    fullName: document.getElementById("fullName"),
    email: document.getElementById("email"),
    weekStart: document.getElementById("weekStart"),
    mealsCount: document.getElementById("mealsCount"),
    diet: document.getElementById("diet"),
    notes: document.getElementById("notes")
  };

  const errors = {
    fullName: document.getElementById("errFullName"),
    email: document.getElementById("errEmail"),
    weekStart: document.getElementById("errWeekStart"),
    mealsCount: document.getElementById("errMealsCount"),
    notes: document.getElementById("errNotes")
  };

  console.log("Meal-plan.js loaded:", !!form, !!saveBtn, !!successModal);

  // If any is false -> IDs mismatch or HTML not updated
  if (!form || !saveBtn || !successModal) return;

  // Hide modal at startup
  successModal.classList.remove("is-open");
  successModal.style.display = "none";
  successModal.setAttribute("aria-hidden", "true");

  function showPageError(text) {
    msgBox.className = "message error";
    msgBox.textContent = text;
    msgBox.style.display = "block";
  }

  function hidePageMsg() {
    msgBox.style.display = "none";
    msgBox.textContent = "";
  }

  function clearFieldErrors() {
    Object.values(errors).forEach(e => e && (e.textContent = ""));
    Object.values(fields).forEach(f => f && f.classList.remove("is-invalid"));
  }

  function setFieldError(key, text) {
    if (errors[key]) errors[key].textContent = text;
    if (fields[key]) fields[key].classList.add("is-invalid");
  }

  function isTodayOrLater(dateStr) {
    if (!dateStr) return false;
    const selected = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);
    return selected >= today;
  }

  function validate(showPageMsgToo = true) {
    clearFieldErrors();
    if (showPageMsgToo) hidePageMsg();

    const fullName = fields.fullName.value.trim();
    const email = fields.email.value.trim();
    const weekStart = fields.weekStart.value;
    const mealsCount = Number(fields.mealsCount.value);
    const notes = fields.notes.value.trim();

    let ok = true;

    if (!/^[A-Za-z\s]{3,}$/.test(fullName)) {
      setFieldError("fullName", "Name must contain at least 3 letters (letters only).");
      ok = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError("email", "Please enter a valid email address.");
      ok = false;
    }

    if (!isTodayOrLater(weekStart)) {
      setFieldError("weekStart", "Week start date must be today or later.");
      ok = false;
    }

    if (!Number.isFinite(mealsCount) || mealsCount < 1 || mealsCount > 21) {
      setFieldError("mealsCount", "Meals per week must be between 1 and 21.");
      ok = false;
    }

    if (notes.length > 200) {
      setFieldError("notes", "Notes must be 200 characters or less.");
      ok = false;
    }

    if (!ok && showPageMsgToo) showPageError("Please fix the highlighted fields.");
    return ok;
  }

  function openSuccessModal(text) {
    successText.textContent = text || "Meal plan saved successfully ✅";
    successModal.classList.add("is-open");
    successModal.style.display = "block";
    successModal.setAttribute("aria-hidden", "false");
  }

  function closeSuccessModal() {
    successModal.classList.remove("is-open");
    successModal.style.display = "none";
    successModal.setAttribute("aria-hidden", "true");
  }

  successOkBtn?.addEventListener("click", closeSuccessModal);
  successModal.addEventListener("click", (e) => {
    if (e.target?.dataset?.close === "true") closeSuccessModal();
  });

  // Hover validation (works)
  saveBtn.addEventListener("pointerenter", () => validate(true));
  saveBtn.addEventListener("mouseover", () => validate(true));
  saveBtn.addEventListener("focus", () => validate(true));

  // Submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate(true)) return;

    try {
      saveBtn.disabled = true;
      saveBtn.textContent = "Saving...";

      const fd = new FormData(form);
      const url = form.getAttribute("action") || "./includes/save_plan.php";

      const res = await fetch(url, { method: "POST", body: fd });
      await res.text(); // consume response

      if (!res.ok) {
        showPageError("Failed to save meal plan.");
        return;
      }

      openSuccessModal("Meal plan saved successfully ✅");
      form.reset();
      hidePageMsg();

    } catch (err) {
      showPageError("Network error. Please try again.");
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = "Save Plan";
    }
  });
});
