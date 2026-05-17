const products = [
  {
    "id": 1,
    "name": "𝙵𝙰𝙲𝙴𝙱𝙾𝙾𝙺 𝙵𝚁𝙴𝚂𝙷 𝙰𝟸𝙵 𝙴𝙼𝙰𝙸𝙻 𝙰𝙺𝚂𝙴𝚂",
    "category": "𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊",
    "price": 2500,
    "slug": "fb fresh a2f email akses.html",
    "image": "facebook.png",
    "meta": "ᴀᴋᴜɴ ꜰʀᴇꜱʜ ᴋᴜᴀʟɪᴛᴀꜱ ᴛᴇʀʙᴀɪᴋ ᴘᴇᴛʀɪᴋ ꜱʜᴏᴘ",
    "desc": "Kaos basic premium dengan bahan lembut, adem, dan nyaman dipakai sehari-hari. Cocok untuk gaya kasual modern.",
    "specs": [
      "Bahan cotton combed premium",
      "Nyaman dan adem dipakai",
      "Tersedia ukuran S sampai XL",
      "Cocok untuk aktivitas harian"
    ]
  },
  {
    "id": 2,
    "name": "𝙵𝙰𝙲𝙴𝙱𝙾𝙾𝙺 𝙵𝚁𝙴𝚂𝙷 𝙲𝙾𝙾𝙺𝙸𝙴𝚂",
    "category": "𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊",
    "price": 1600,
    "slug": "fb fresh cookies.html",
    "image": "facebook.png",
    "meta": "ᴀᴋᴜɴ ꜰʀᴇꜱʜ ᴋᴜᴀʟɪᴛᴀꜱ ᴛᴇʀʙᴀɪᴋ ᴘᴇᴛʀɪᴋ ꜱʜᴏᴘ",
    "desc": "Kaos basic premium dengan bahan lembut, adem, dan nyaman dipakai sehari-hari. Cocok untuk gaya kasual modern.",
    "specs": [
      "Bahan cotton combed premium",
      "Nyaman dan adem dipakai",
      "Tersedia ukuran S sampai XL",
      "Cocok untuk aktivitas harian"
     ]
    },
   {
    "id": 2,
    "name": "𝙵𝙰𝙲𝙴𝙱𝙾𝙾𝙺 𝙰𝟸𝙵 𝟷𝟶𝟶+ 𝙿𝙴𝚁𝚃𝙴𝙼𝙰𝙽𝙰𝙽",
    "category": "𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊",
    "price": 5000,
    "slug": "fb fresh cookies.html",
    "image": "facebook.png",
    "meta": "ᴀᴋᴜɴ ꜰʀᴇꜱʜ ᴋᴜᴀʟɪᴛᴀꜱ ᴛᴇʀʙᴀɪᴋ ᴘᴇᴛʀɪᴋ ꜱʜᴏᴘ",
    "desc": "Kaos basic premium dengan bahan lembut, adem, dan nyaman dipakai sehari-hari. Cocok untuk gaya kasual modern.",
    "specs": [
      "Bahan cotton combed premium",
      "Nyaman dan adem dipakai",
      "Tersedia ukuran S sampai XL",
      "Cocok untuk aktivitas harian"
   ]
  },
  {
    "id": 4,
    "name": "𝙵𝙰𝙲𝙴𝙱𝙾𝙾𝙺 𝙾𝙻𝙳 𝙲𝙾𝙾𝙺𝙸𝙴𝚂",
    "category": "𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊",
    "price": 8000,
    "slug": "fb old cookies.html",
    "image": "facebook.png",
    "meta": "ᴀᴋᴜɴ ᴏʟᴅ ᴋᴜᴀʟɪᴛᴀꜱ ᴛᴇʀʙᴀɪᴋ ᴘᴇᴛʀɪᴋ ꜱʜᴏᴘ",
    "desc": "Kaos basic premium dengan bahan lembut, adem, dan nyaman dipakai sehari-hari. Cocok untuk gaya kasual modern.",
    "specs": [
      "Bahan cotton combed premium",
      "Nyaman dan adem dipakai",
      "Tersedia ukuran S sampai XL",
      "Cocok untuk aktivitas harian"
    ]
   },
  {
    "id": 4,
    "name": "𝙵𝙰𝙲𝙴𝙱𝙾𝙾𝙺 𝙾𝙻𝙳 𝙰𝟸𝙵 𝙾𝙽",
    "category": "𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊",
    "price": 10000,
    "slug": "fb old a2f on.html",
    "image": "facebook.png",
    "meta": "ᴀᴋᴜɴ ᴏʟᴅ ᴋᴜᴀʟɪᴛᴀꜱ ᴛᴇʀʙᴀɪᴋ ᴘᴇᴛʀɪᴋ ꜱʜᴏᴘ",
    "desc": "Kaos basic premium dengan bahan lembut, adem, dan nyaman dipakai sehari-hari. Cocok untuk gaya kasual modern.",
    "specs": [
      "Bahan cotton combed premium",
      "Nyaman dan adem dipakai",
      "Tersedia ukuran S sampai XL",
      "Cocok untuk aktivitas harian"
    ]
  }
];

const productListEl = document.getElementById("product-list");
const searchInputEl = document.getElementById("search-input");
const categoryFilterEl = document.getElementById("category-filter");

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

function renderCategories() {
  if (!categoryFilterEl) return;
  categoryFilterEl.innerHTML = '<option value="all">Semua Kategori</option>';
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
    productListEl.innerHTML = '<p class="empty-state">Produk tidak ditemukan.</p>';
    return;
  }

  filtered.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.style.setProperty("--delay", `${index * 0.07}s`);
    card.innerHTML = `
      <div class="product-logo"><img src="${product.image}" alt="${product.name}"></div>
      <div class="product-badge">${product.category}</div>
      <h3>${product.name}</h3>
      <p class="product-meta">${product.meta}</p>
      <p class="product-price">${formatRupiah(product.price)}</p>
      <a class="add-button detail-button" href="${product.slug}">ＤＥＴＡＩＬ ＰＲＯＤＵＫ</a>
    `;
    productListEl.appendChild(card);
  });
}

function setActiveNavigation() {
  const file = decodeURIComponent(window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  let page = "home";

  if (file.includes("produk") || file.startsWith("fb ")) {
    page = "produk";
  } else if (file.includes("testimoni")) {
    page = "testimoni";
  } else if (file.includes("support") || file.includes("suport")) {
    page = "support";
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === page);
  });

  document.querySelectorAll(".top-nav .nav-pill").forEach((link) => {
    link.classList.toggle("active", link.dataset.section === page);
  });
}

searchInputEl?.addEventListener("input", renderProducts);
categoryFilterEl?.addEventListener("change", renderProducts);

renderCategories();
renderProducts();
setActiveNavigation();

function setupFixedBottomNavAnimation() {
  const bottomNav = document.querySelector(".bottom-nav");
  if (!bottomNav) return;

  let ticking = false;
  const updateNavState = () => {
    bottomNav.classList.toggle("nav-scrolled", window.scrollY > 8);
    ticking = false;
  };

  updateNavState();
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavState);
      ticking = true;
    }
  }, { passive: true });
}

setupFixedBottomNavAnimation();
