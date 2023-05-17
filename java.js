const categoryContainer = document.getElementById("categoryContainer");

function generateCategory(category) {
  console.log(category.icon);
  const card = document.createElement("div");

  card.classList.add("category-card");
  card.classList.add("my-3");
  const cardbody = document.createElement("div");
  cardbody.classList.add("category-body");
  card.appendChild(cardbody);
  const iconContainer = document.createElement("div");
  iconContainer.classList.add("rounded-icon-container");
  cardbody.appendChild(iconContainer);

  const icon = document.createElement("i");
  const categoryIconArrey = category.icon.split(" ");
  icon.classList.add("text-green");
  categoryIconArrey.forEach((clazz) => {
    icon.classList.add(clazz);
  });
  iconContainer.appendChild(icon);
  const title = document.createElement("h3");
  title.textContent = category.name;
  cardbody.appendChild(title);

  const announcementCounter = document.createElement("p");
  announcementCounter.textContent = `${category.announcementsCount} Annunci`;
  announcementCounter.classList.add("text-green");
  cardbody.appendChild(announcementCounter);
  return card;
}
fetch("../../server/api/categorie.json")
  .then((response) => {
    return response.json();
  })
  .then((categories) => {
    console.log(categories);
    categories.forEach((element) => {
      console.log(element);
      const card = generateCategory(element);
      const col = document.createElement("div");
      col.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3");
      col.appendChild(card);
      categoryContainer.appendChild(col);
    });
  })
  .catch((error) => {
    console.error("error");
  });

const workForm = document.getElementById("workForm");
workForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!workForm.checkVisibility()) {
    console.error("no buono");
  }
  workForm.classList.add("was-validated");
});
