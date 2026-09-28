// ==========================================
// DADOS SIMULADOS DO INSTOK
// ==========================================

let stores = [
  {
    id: 1,
    name: "Centauro",
    address: "Av. Paulista, 1200 — Bela Vista",
    distance: 1.2,
    price: 529.90,
    initial: "C",
    updated: "Atualizado há 8 min"
  },

  {
    id: 2,
    name: "Shopping Central",
    address: "Rua Augusta, 850 — Consolação",
    distance: 2.8,
    price: 499.00,
    initial: "S",
    updated: "Atualizado há 14 min"
  },

  {
    id: 3,
    name: "Nike",
    address: "Av. Ibirapuera, 3100 — Moema",
    distance: 5.6,
    price: 515.00,
    initial: "N",
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
// CALCULAR DISTÂNCIA REAL
// ==========================================

function calculateDistance(lat1, lon1, lat2, lon2) {

  const R = 6371;

  const toRad = function(value) {
    return value * Math.PI / 180;
  };

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c =
    2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}
// ==========================================
// BUSCAR LOJAS REAIS DIRETO NO OPENSTREETMAP
// ==========================================

async function buscarLojasOSM(produto) {

  const busca = produto.toLowerCase();

  let tipos = [
    '["shop"="electronics"]',
    '["shop"="computer"]',
    '["shop"="mobile_phone"]',
    '["shop"="department_store"]'
  ];

  if (
    busca.includes("tenis") ||
    busca.includes("tênis") ||
    busca.includes("nike") ||
    busca.includes("corrida")
  ) {
    tipos = [
      '["shop"="sports"]',
      '["shop"="shoes"]'
    ];
  }

  if (
    busca.includes("mochila") ||
    busca.includes("bolsa")
  ) {
    tipos = [
      '["shop"="bag"]',
      '["shop"="department_store"]'
    ];
  }

  const raio = 15000;

  const consultas = tipos.map(tipo => `
    node(around:${raio},${userLocation.latitude},${userLocation.longitude})${tipo};
    way(around:${raio},${userLocation.latitude},${userLocation.longitude})${tipo};
  `).join("");

  const query = `
    [out:json][timeout:25];
    (
      ${consultas}
    );
    out center tags;
  `;

  const response = await fetch(
    "https://overpass-api.de/api/interpreter",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "data=" + encodeURIComponent(query)
    }
  );

  if (!response.ok) {
    throw new Error("OpenStreetMap não respondeu.");
  }

  return await response.json();
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
  ● Loja encontrada
</span>


              <p>
                ${store.address}
              </p>


 <p>
  ${store.updated || "Dados do OpenStreetMap"}
  ·
  ${
    store.price != null
      ? "R$ " + formatPrice(store.price)
      : "Consulte disponibilidade"
  }
</p>

            </div>


            <div class="store-distance">

              ${formatDistance(store.distance)}

            </div>


            <button
              class="store-view-button"
              type="button"
onclick='openStore(${JSON.stringify(store.id)})'
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

async function searchProduct(product) {

  const cleanProduct =
    product.trim();

  if (!cleanProduct) {
    showToast(
      "Digite um produto para pesquisar."
    );
    return;
  }

  if (!userLocation) {
    showToast(
      "Clique primeiro em 📍 São Paulo, SP para permitir sua localização."
    );
    return;
  }

  currentProduct =
    cleanProduct;

  searchInput.value =
    currentProduct;

  resultsTitle.textContent =
    `Onde encontrar "${currentProduct}"`;

  distanceFilter.value =
    "all";

  showToast(
    "Buscando lojas reais próximas..."
  );

  try {

const response =
  await fetch(
    `/api/lojas-geoapify?lat=${userLocation.latitude}&lon=${userLocation.longitude}&produto=${encodeURIComponent(currentProduct)}`
  );

const data =
  await response.json();

if (!response.ok) {
  throw new Error(
    data.error ||
    "Erro ao buscar lojas."
  );
}

stores =
  data.lojas.map(function(store) {

    return {
      id: store.id,
      name: store.name,
      address: store.address,

      distance:
        store.distance != null
          ? store.distance
          : calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              store.latitude,
              store.longitude
            ),

      price: null,

      initial:
        store.name
          .charAt(0)
          .toUpperCase(),

      updated:
        "Dados do Geoapify",

      latitude:
        store.latitude,

      longitude:
        store.longitude
    };

  });

    renderStores();

    showScreen(
      "resultsScreen"
    );

    showToast(
      stores.length +
      (stores.length === 1
        ? " loja real encontrada."
        : " lojas reais encontradas.")
    );

  } catch (error) {

    console.error(error);

    stores = [];

    renderStores();

    showScreen(
      "resultsScreen"
    );

    showToast(
      "Não foi possível buscar lojas próximas."
    );
  }
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
  store.price != null
    ? "R$ " + formatPrice(store.price)
    : "Consulte disponibilidade";


  showScreen("detailScreen");

}


// ==========================================
// FORMULÁRIO DE BUSCA
// ==========================================

searchForm.addEventListener(
  "submit",
  async function(event) {

    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
      showToast("Digite um produto para pesquisar.");
      return;
    }

    showToast("A IA está entendendo sua busca...");

    try {

      const response = await fetch("/api/interpretar-busca", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          query: query
        })
      });


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.error || "Erro ao interpretar busca"
        );

      }


      console.log(
        "Resultado da IA:",
        data
      );


      let produtoInterpretado =
        data.produto || query;


      if (data.marca) {

        produtoInterpretado =
          data.marca + " " + produtoInterpretado;

      }


      if (data.preco_max) {

        showToast(
          `IA entendeu: ${produtoInterpretado}, até R$ ${data.preco_max}`
        );

      } else {

        showToast(
          `IA entendeu: ${produtoInterpretado}`
        );

      }


    searchProduct(
  query
);


    } catch (error) {

      console.error(error);

      showToast(
        "Não foi possível usar a IA. Fazendo busca normal."
      );

      searchProduct(query);

    }

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
// LOCALIZAÇÃO REAL
// ==========================================

let userLocation = null;

const locationButton =
  document.getElementById(
    "locationButton"
  );

locationButton.addEventListener(
  "click",
  function() {

    if (!navigator.geolocation) {
      showToast(
        "Seu navegador não permite localização."
      );
      return;
    }

    showToast(
      "Buscando sua localização..."
    );

    navigator.geolocation.getCurrentPosition(
      function(position) {

        userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        locationButton.textContent =
          "📍 Localização atual";

        showToast(
          "Localização encontrada."
        );

        console.log(
          "Localização:",
          userLocation
        );
      },

      function(error) {

        console.error(error);

        showToast(
          "Não foi possível acessar sua localização."
        );
      }
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
