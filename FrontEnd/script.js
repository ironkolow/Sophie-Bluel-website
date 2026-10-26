const API_URL = "http://localhost:5678/api";
const gallery = document.querySelector(".gallery");

let allWorks = [];

async function getWorks() {
  const response = await fetch(`${API_URL}/works`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  return response.json();
}

function displayWorks(works) {
  gallery.innerHTML = "";
  works.forEach((work) => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const caption = document.createElement("figcaption");
    caption.textContent = work.title;

    figure.append(img, caption);
    gallery.appendChild(figure);
  });
}

async function init() {
  try {
    allWorks = await getWorks();
    displayWorks(allWorks);
  } catch (error) {
    gallery.textContent = "Unable to load the projects.";
    console.error(error);
  }
}

function createFilters(works) {
  // Unique category names
  const categoryNames = new Set(works.map((work) => work.category.name));

  // Container for the buttons, created before the gallery
  const filters = document.createElement("div");
  filters.classList.add("filters");
  gallery.before(filters);

  // "All" button first
  const allButton = createFilterButton("All", () => displayWorks(allWorks));
  allButton.classList.add("active");
  filters.appendChild(allButton);

  // One button per category
  categoryNames.forEach((name) => {
    const button = createFilterButton(name, () => {
      const filtered = allWorks.filter((work) => work.category.name === name);
      displayWorks(filtered);
    });
    filters.appendChild(button);
  });
}

function createFilterButton(label, onClick) {
  const button = document.createElement("button");
  button.textContent = label;
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".filters button")
      .forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    onClick();
  });
  return button;
}

init();
createFilters(allWorks);
createFilters(objects);