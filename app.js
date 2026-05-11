const products = [
  { id: 1, name: "Kaos Basic Premium", category: "Fashion", price: 95000 },
  { id: 2, name: "Celana Chino Slim Fit", category: "Fashion", price: 185000 },
  { id: 3, name: "Headset Wireless", category: "Elektronik", price: 275000 },
  { id: 4, name: "Mouse Gaming RGB", category: "Elektronik", price: 215000 },
  { id: 5, name: "Tas Ransel Harian", category: "Aksesoris", price: 145000 },
  { id: 6, name: "Botol Minum Stainless", category: "Rumah Tangga", price: 89000 },
  { id: 7, name: "Lampu Meja LED", category: "Rumah Tangga", price: 129000 },
  { id: 8, name: "Jam Tangan Kasual", category: "Aksesoris", price: 199000 },
];

const productListEl = document.getElementById("product-list");
const searchInputEl = document.getElementById("search-input");
const categoryFilterEl = document.getElementById("category-filter");
const cartPanelEl = document.getElementById("cart-panel");
const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");
const cartButtonEl = document.getElementById("cart-button");
const closeCartEl = document.getElementById("close-cart");
const checkoutButtonEl = document.getElementById("checkout-button");

let cart = JSON.parse(localStorage.getItem("petrik-cart") || "[]");

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

function saveCart() {
  localStorage.setItem("petrik-cart", JSON.stringify(cart));
}

function renderCategories() {
  if (!categoryFilterEl) return;
  const categories = [...new Set(products.map((p) => p.category))];
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilterEl.appendChild(option);
  });
}

function renderProducts() {
  if (!productListEl) return;

  const keyword = (searchInputEl?.value || "").toLowerCase().trim();
  const category = categoryFilterEl?.value || "all";

  const filtered = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(keyword);
    const matchCategory = category === "all" || p.category === category;
    return matchName && matchCategory;
  });

  productListEl.innerHTML = "";

  if (!filtered.length) {
    productListEl.innerHTML = "<p>Produk tidak ditemukan.</p>";
    return;
  }

  filtered.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.style.setProperty("--delay", `${index * 0.07}s`);
    card.innerHTML = `
      <div class="product-badge">${product.category}</div>
      <h3>${product.name}</h3>
      <p class="product-meta">Produk pilihan Petrik Shop</p>
      <p class="product-price">${formatRupiah(product.price)}</p>
      <button class="add-button" data-id="${product.id}">Tambah ke Keranjang</button>
    `;
    productListEl.appendChild(card);
  });
}

function addToCart(productId) {
  const found = cart.find((item) => item.id === productId);
  if (found) {
    found.qty += 1;
  } else {
    const product = products.find((p) => p.id === productId);
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
}

function renderCart() {
  if (!cartItemsEl || !cartCountEl || !cartTotalEl) return;

  cartItemsEl.innerHTML = "";
  let total = 0;
  let count = 0;

  if (!cart.length) {
    cartItemsEl.innerHTML = `<p class="empty-cart">Keranjang masih kosong.</p>`;
  }

  cart.forEach((item) => {
    total += item.price * item.qty;
    count += item.qty;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <strong>${item.name}</strong><br>
      ${item.qty} x ${formatRupiah(item.price)}<br>
      <button class="remove-button" data-id="${item.id}">Hapus</button>
    `;
    cartItemsEl.appendChild(row);
  });

  cartCountEl.textContent = String(count);
  cartTotalEl.textContent = formatRupiah(total);
}

function setActiveNavigation() {
  const file = window.location.pathname.split("/").pop() || "index.html";
  const page = file.includes("produk") ? "produk" : file.includes("support") || file.includes("suport") ? "support" : "home";

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === page);
  });
}

searchInputEl?.addEventListener("input", renderProducts);
categoryFilterEl?.addEventListener("change", renderProducts);

cartButtonEl?.addEventListener("click", () => {
  cartPanelEl?.classList.remove("hidden");
});

closeCartEl?.addEventListener("click", () => {
  cartPanelEl?.classList.add("hidden");
});

checkoutButtonEl?.addEventListener("click", () => {
  if (!cart.length) {
    alert("Keranjang masih kosong.");
    return;
  }
  alert("Terima kasih telah berbelanja di Petrik Shop!");
  cart = [];
  saveCart();
  renderCart();
  cartPanelEl?.classList.add("hidden");
});

productListEl?.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches(".add-button")) {
    addToCart(Number(target.dataset.id));
  }
});

cartItemsEl?.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches(".remove-button")) {
    removeFromCart(Number(target.dataset.id));
  }
});

renderCategories();
renderProducts();
renderCart();
setActiveNavigation();
