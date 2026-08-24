// ==========================================
// DADOS SIMULADOS DO INSTOK
// ==========================================

const stores = [
  {
    id: 1,
    name: "Tech Center",
    address: "Av. Paulista, 1200 — Bela Vista",
    distance: 1.2,
    price: 189.90,
    initial: "T",
    updated: "Atualizado há 8 min"
  },

  {
    id: 2,
    name: "Shopping Central",
    address: "Rua Augusta, 850 — Consolação",
    distance: 2.8,
    price: 199.90,
    initial: "S",
    updated: "Atualizado há 14 min"
  },

  {
    id: 3,
    name: "Mega Store",
    address: "Av. Ibirapuera, 3100 — Moema",
    distance: 5.6,
    price: 179.90,
    initial: "M",
    updated: "Atualizado há 21 min"
  }
];


// ==========================================
// ESTADO DA APLICAÇÃO
// ==========================================

let currentProduct = "Fone Bluetooth";


// ==========================================
// ELEMENTOS DA PÁGINA
// ==========================================

const searchScreen = document.getElementById("searchScreen");
const resultsScreen = document.getElementById("resultsScreen");
const detailScreen = document.getElementById("detailScreen");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const resultsTitle = document.getElementById("resultsTitle");
const resultCount = document.getElementById("resultCount");

const distanceFilter = document.getElementById("distanceFilter");
const storeList = document.getElementById("storeList");

const toast = document.getElementById("toast");


// ==========================================
// TROCA DE TELAS
// ==========================================

function showScreen(screenId) {

  const screens = [
    searchScreen,
    resultsScreen,
    detailScreen
  ];

  screens.forEach(function(screen) {
    screen.classList.remove("active");
  });

  const selectedScreen =
    document.getElementById(screenId);

  if (selectedScreen) {
    selectedScreen.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ==========================================
// FORMATAR PREÇO
// ==========================================

function formatPrice(price) {

  return price
    .toFixed(2)
    .replace(".", ",");

}


// ==========================================
// FORMATAR DISTÂNCIA
// ==========================================

function formatDistance(distance) {

  return distance
    .toFixed(1)
    .replace(".", ",") + " km";

}


// ==========================================
// RENDERIZAR LOJAS
// ==========================================

function renderStores() {

  const filterValue =
    distanceFilter.value;

  let maxDistance = Infinity;

  if (filterValue !== "all") {

    maxDistance =
      Number(filterValue);

  }


  const filteredStores =
    stores
      .filter(function(store) {

        return store.distance <= maxDistance;

      })
      .sort(function(a, b) {

        return a.distance - b.distance;

      });


  // Quantidade de resultados

  const quantity =
    filteredStores.length;

  resultCount.textContent =
    quantity +
    (quantity === 1
      ? " loja encontrada"
      : " lojas encontradas");


  // Nenhuma loja

  if (filteredStores.length === 0) {

    storeList.innerHTML = `

      <div class="info-box">

        <div class="info-icon">
          !
        </div>

        <div>

          <strong>
            Nenhuma loja encontrada
          </strong>

          <p>
            Tente aumentar o raio de distância.
          </p>

        </div>

      </div>

    `;

    return;
  }


  // Criar cards

  storeList.innerHTML =
    filteredStores
      .map(function(store) {

        return `

          <article class="store-card">

            <div class="store-avatar">
              ${store.initial}
            </div>


            <div>

              <h3>
                ${store.name}
              </h3>


              <span class="available-badge">
                ● Disponível
              </span>


              <p>
                ${store.address}
              </p>


              <p>
                ${store.updated}
                ·
                R$ ${formatPrice(store.price)}
              </p>

            </div>


            <div class="store-distance">

              ${formatDistance(store.distance)}

            </div>


            <button
              class="store-view-button"
              type="button"
              onclick="openStore(${store.id})"
            >

              Ver loja

            </button>

          </article>

        `;

      })
      .join("");

}


// ==========================================
// PESQUISAR PRODUTO
// ==========================================

function searchProduct(product) {

  const cleanProduct =
    product.trim();


  if (cleanProduct === "") {

    currentProduct =
      "Fone Bluetooth";

  } else {

    currentProduct =
      cleanProduct;

  }


  searchInput.value =
    currentProduct;


  resultsTitle.textContent =
    `Onde encontrar "${currentProduct}"`;


  distanceFilter.value =
    "all";


  renderStores();


  showScreen("resultsScreen");

}


// ==========================================
// ABRIR DETALHES DA LOJA
// ==========================================

function openStore(storeId) {

  const store =
    stores.find(function(item) {

      return item.id === storeId;

    });


  if (!store) {
    return;
  }


  document.getElementById(
    "detailStoreName"
  ).textContent =
    store.name;


  document.getElementById(
    "detailAvatar"
  ).textContent =
    store.initial;


  document.getElementById(
    "detailProduct"
  ).textContent =
    currentProduct;


  document.getElementById(
    "detailUpdated"
  ).textContent =
    store.updated;


  document.getElementById(
    "detailAddress"
  ).textContent =
    store.address;


  document.getElementById(
    "detailDistance"
  ).textContent =
    formatDistance(store.distance);


  document.getElementById(
    "detailPrice"
  ).textContent =
    "R$ " + formatPrice(store.price);


  showScreen("detailScreen");

}


// ==========================================
// FORMULÁRIO DE BUSCA
// ==========================================

searchForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    searchProduct(
      searchInput.value
    );

  }
);


// ==========================================
// BUSCAS POPULARES
// ==========================================

const popularButtons =
  document.querySelectorAll(
    "[data-query]"
  );


popularButtons.forEach(
  function(button) {

    button.addEventListener(
      "click",
      function() {

        const query =
          button.dataset.query;

        searchProduct(query);

      }
    );

  }
);


// ==========================================
// FILTRO DE DISTÂNCIA
// ==========================================

distanceFilter.addEventListener(
  "change",
  function() {

    renderStores();

  }
);


// ==========================================
// BOTÕES VOLTAR
// ==========================================

const backButtons =
  document.querySelectorAll(
    "[data-back]"
  );


backButtons.forEach(
  function(button) {

    button.addEventListener(
      "click",
      function() {

        const destination =
          button.dataset.back;

        showScreen(destination);

      }
    );

  }
);


// ==========================================
// LOCALIZAÇÃO
// ==========================================

const locationButton =
  document.getElementById(
    "locationButton"
  );


locationButton.addEventListener(
  "click",
  function() {

    showToast(
      "Localização definida como São Paulo, SP."
    );

  }
);


// ==========================================
// BOTÃO MAPA
// ==========================================

const mapButton =
  document.getElementById(
    "mapButton"
  );


mapButton.addEventListener(
  "click",
  function() {

    showToast(
      "Localização selecionada. A integração com mapas será adicionada posteriormente."
    );

  }
);


// ==========================================
// NOTIFICAÇÃO
// ==========================================

function showToast(message) {

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );


  clearTimeout(
    window.toastTimeout
  );


  window.toastTimeout =
    setTimeout(
      function() {

        toast.classList.remove(
          "show"
        );

      },
      2800
    );

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

renderStores();
