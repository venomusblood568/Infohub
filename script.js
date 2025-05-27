// Function to create an item element with copy and delete functionality
function createItem(value) {
  const item = document.createElement("div");
  item.className = "info-item saved-item";

  item.innerHTML = `
      <span class="saved-text">${value}</span>
      <div class="icons">
        <span class="copy"><img src="./icons/copy.svg" alt="copy" /></span>
        <span class="delete"><img src="./icons/trash.svg" alt="delete" /></span>
      </div>
    `;

  // Copy logic
  item.querySelector(".copy").addEventListener("click", () => {
    navigator.clipboard.writeText(value).then(() => {
      const copyIcon = item.querySelector(".copy img");

      // Change icon to checkmark (✅)
      copyIcon.src = "./icons/check.svg"; // Make sure this file exists

      // Optional: revert back after 1.5 seconds
      setTimeout(() => {
        copyIcon.src = "./icons/copy.svg";
      }, 1500);
    });
  });
  // Delete logic
  item.querySelector(".delete").addEventListener("click", () => {
    item.remove();
    let storedItems = JSON.parse(localStorage.getItem("infoList")) || [];
    storedItems = storedItems.filter((v) => v !== value);
    localStorage.setItem("infoList", JSON.stringify(storedItems));
  });

  return item;
}

// Save button click handler
document.getElementById("save-btn").addEventListener("click", () => {
  const input = document.getElementById("info-input");
  const value = input.value.trim();

  if (value !== "") {
    const container = document.getElementById("info-list");

    const item = createItem(value);
    container.appendChild(item);

    // Save to localStorage
    let storedItems = JSON.parse(localStorage.getItem("infoList")) || [];
    storedItems.push(value);
    localStorage.setItem("infoList", JSON.stringify(storedItems));

    input.value = "";
  }
});
// save button for enter 
document.getElementById("info-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("save-btn").click(); // trigger the same save logic
  }
});

// Load stored items on page load
window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("info-list");
  const storedItems = JSON.parse(localStorage.getItem("infoList")) || [];

  storedItems.forEach((value) => {
    const item = createItem(value);
    container.appendChild(item);
  });
});
