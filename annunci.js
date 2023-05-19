const announcmentContainer = document.getElementById("announcmentContainer");
/*        <div class="row">
          
        </div>  */
function announcmentCard(prezzo, nome, categoria, data, venduta) {
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

  let choose = venduta == "sell" ? sellGreen : sellreed;

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
      <h3 class="card-title text-green">${prezzo} $</h3>
      <h2 class="card-title">${nome}</h2>
      <p class="card-text">
        Some quick example text to build on the card title and make up
        the bulk of the card's content.
      </p>
      <div class="row">
        <div class="col-6 text-center">
          <p class="text-center">${categoria}</p>
        </div>
        <div class="col-6 text-center">
          <p>12/06/23</p>
        </div>
      </div>
    </div>
  </div>

  `;

  return divColCard;
}

fetch("../../server/api/annunci.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((el) => {
      const allCard = announcmentCard(
        el.price,
        el.name,
        el.category,
        el.createdAt,
        el.type
      );

      announcmentContainer.appendChild(allCard);
    });
  })
  .catch((error) => {
    console.error("error");
  });
