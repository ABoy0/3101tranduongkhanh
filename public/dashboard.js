let products = [];
let filteredProducts = [];

let currentPage = 1;
let pageSize = 10;

async function getAll() {
  const res = await fetch("/api/products");
  products = await res.json();
  filteredProducts = products;
  render();
}


function render() {
  renderTable(getPaginatedData());
  renderPagination();
}

function renderTable(data) {
  const tbody = document.getElementById("productBody");
  tbody.innerHTML = "";

  data.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${p.images[0]}" /></td>
      <td>${p.title}</td>
      <td>${p.price}</td>
      <td>${p.category.name}</td>
    `;
    tbody.appendChild(tr);
  });
}


function getPaginatedData() {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  return filteredProducts.slice(start, end);
}


function renderPagination() {
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.style.marginRight = "5px";

    if (i === currentPage) {
      btn.style.fontWeight = "bold";
    }

    btn.onclick = () => {
      currentPage = i;
      render();
    };

    pagination.appendChild(btn);
  }
}


function changePageSize() {
  pageSize = Number(document.getElementById("pageSize").value);
  currentPage = 1;
  render();
}


function searchByTitle() {
  const keyword = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(keyword)
  );

  currentPage = 1;
  render();
}


function sortByPriceAsc() {
  filteredProducts.sort((a, b) => a.price - b.price);
  currentPage = 1;
  render();
}

function sortByPriceDesc() {
  filteredProducts.sort((a, b) => b.price - a.price);
  currentPage = 1;
  render();
}


function sortByNameAsc() {
  filteredProducts.sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  currentPage = 1;
  render();
}

function sortByNameDesc() {
  filteredProducts.sort((a, b) =>
    b.title.localeCompare(a.title)
  );
  currentPage = 1;
  render();
}

getAll();
