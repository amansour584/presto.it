const categoryContainer = document.getElementById("categoryContainer");

function generateCategory(category) {
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
    categories.forEach((element) => {
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

/*        <div class="row">
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card my-4 d-flex">
              <div class=" w-100 h-50 position-absolute  bg-danger opacitysell"><p class="position-absolute sellCard  w-100 fs-1 font-monospace  text-center align-center">sell</p></div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0x3YD5t6zgJR8_b7P7O6lIHFGy5XKNJjbs-30afj5QY8dLKFiapyPoky-ekueZbnPZk8&usqp=CAU"
                class="card-img-top h-50 img-fluid"
                alt="..."
              />
              <div class="card-body">
                <h3 class="card-title text-green">123 $</h3>
                <h2 class="card-title">Ducati</h2>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div class="row">
                  <div class="col-6 text-center">
                    <p class="text-center">Categoria</p>
                  </div>
                  <div class="col-6 text-center">
                    <p>12/06/23</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  */
