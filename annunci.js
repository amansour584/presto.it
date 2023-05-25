function announcmentCard(el) {
  let sellGreen = `  <div class="w-100 position-absolute bg-danger opacitysell">
<p
  class="position-absolute sellCard w-100 fs-1 font-monospace text-center align-center"
>
  sell
</p>
</div>`;

  let sellreed = `  <div class="w-100 position-absolute bg-success opacitysell">
<p
  class="position-absolute searchCard w-100 fs-1 font-monospace text-center align-center"
>
  search
</p>
</div>`;

  let choose = el.type == "sell" ? sellGreen : sellreed;

  const date = new Date(el.createdAt);

  const divColCard = document.createElement("div");
  divColCard.classList.add("col-12", "col-sm-6", "col-lg-4");
  divColCard.innerHTML = `  
  
  <div class="card my-4 d-flex">
  ${choose}
    <img
      src="https://picsum.photos/200"
      class="card-img-top h-50 "
      alt="..."
    />
    <div class="card-body">
      <h3 class="card-title text-green">${el.price} $</h3>
      <h2 class="card-title">${el.name}</h2>
      <p class="card-text">
        Some quick example text to build on the card title and make up
        the bulk of the card's content.
      </p>
      <div class="row">
        <div class="col-6 text-center">
          <p class="text-center">${el.category}</p>
        </div>
        <div class="col-6 text-center">
          <p>${date.toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  </div>

  `;

  return divColCard;
}
function popolateCategorySelect(announcment, categorySelect) {
  const categorySet = new Set();
  announcment.forEach((announcment) => {
    categorySet.add(announcment.category);
  });
  categorySet.forEach((category) => {
    const categoryOption = document.createElement("option");
    categoryOption.setAttribute("value", category);
    categoryOption.textContent = category;
    categorySelect.appendChild(categoryOption);
  });
}

async function populateAnnuncments(announcment) {
  const cardContainer = document.getElementById("announcmentContainer");

  while (cardContainer.hasChildNodes()) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
  announcment.forEach((Element) => {
    const card = announcmentCard(Element);
    cardContainer.appendChild(card);
  });
}

async function readAllAnnouncments() {
  const response = await fetch("../../server/api/annunci.json");
  const announcments = await response.json();
  return announcments;
}

document.addEventListener(`DOMContentLoaded`, async () => {
  const searchInput = document.getElementById("searchInputValue");
  const categorySelect = document.getElementById("categorySelect");
  const filteringForm = document.getElementById("filteringForm");
  const minPriceInput = document.getElementById("minPriceInput");
  const maxPriceInput = document.getElementById("maxPriceInput");
  const sortSelect = document.getElementById("sortSelect");
  filteringForm.addEventListener(`submit`, async (event) => {
    event.preventDefault();

    let option = {
      categorySelectValue: categorySelect.value,
      minPriceInputValue: minPriceInput.value,
      sortSelectValue: sortSelect.value,
      maxPriceInputValue: maxPriceInput.value,
      searchInputValue: searchInput.value,
    };

    const announcments = await readAllAnnouncments();
    let filteredAnnouncments = announcments.filter((announcment) => {
      let isAnnouncmentRequired = true;

      if (option.searchInputValue.length > 0) {
        isAnnouncmentRequired = announcment.name
          .toLowerCase()
          .includes(option.searchInputValue.toLowerCase());
      }

      if (isAnnouncmentRequired && option.categorySelectValue.length > 0) {
        isAnnouncmentRequired =
          announcment.category.toLowerCase() ==
          option.categorySelectValue.toLowerCase();
      }

      if (isAnnouncmentRequired && option.minPriceInputValue.length > 0) {
        isAnnouncmentRequired =
          parseFloat(announcment.price) > parseFloat(option.minPriceInputValue);
      }

      if (isAnnouncmentRequired && option.maxPriceInputValue.length > 0) {
        isAnnouncmentRequired =
          parseFloat(announcment.price) < parseFloat(option.maxPriceInputValue);
      }

      return isAnnouncmentRequired;
    });

    switch (option.sortSelectValue) {
      case "descByDate":
        filteredAnnouncments.sort((left, right) => {
          return left.createdAt - right.createdAt;
        });
        break;

      case "ascByDate":
        filteredAnnouncments.sort((left, right) => {
          return right.createdAt - left.createdAt;
        });
        break;

      case "descByPrice":
        filteredAnnouncments.sort((left, right) => {
          return right.price - left.price;
        });
        break;

      case "ascByPrice":
        filteredAnnouncments.sort((left, right) => {
          return left.price - right.price;
        });
        break;

      case "descByAlpha":
        filteredAnnouncments.sort((left, right) => {
          return left.name
            .toLowerCase()
            .localeCompare(right.name.toLowerCase());
        });
        break;

      case "ascByAlpha":
        filteredAnnouncments.sort((left, right) => {
          return right.name
            .toLowerCase()
            .localeCompare(left.name.toLowerCase());
        });
        break;

      default:
        break;
    }

    await populateAnnuncments(filteredAnnouncments, option);
  });

  const announcments = await readAllAnnouncments();
  popolateCategorySelect(announcments, categorySelect);
  await populateAnnuncments(announcments);
});
