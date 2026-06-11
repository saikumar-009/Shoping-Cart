const products = [
  {
    id: 1,
    name: "Hertfoid Upholstered Chair",
    price: 101,
    image: "images/1.png",
    slug: "hertfoid-upholstered-chair",
  },
  {
    id: 2,
    name: "Abingdon Upholstered Chair Swivel",
    price: 151,
    image: "images/2.png",
    slug: "abingdon-upholstered-chair-swivel",
  },
  {
    id: 3,
    name: "Jeses Minimore Modern Style Etta",
    price: 181,
    image: "images/3.png",
    slug: "jeses-minimore-modern-style-etta",
  },
  {
    id: 4,
    name: "JJeses Minimore Modern Style",
    price: 201,
    image: "images/4.png",
    slug: "jjeses-minimore-modern-style",
  },
  {
    id: 5,
    name: "Bolanle Upholstered Armchair",
    price: 251,
    image: "images/5.png",
    slug: "bolanle-upholstered-armchair",
  },
  {
    id: 6,
    name: "Jaqueze Upholstered Armchair",
    price: 111,
    image: "images/6.png",
    slug: "jaqueze-upholstered-armchair",
  },
  {
    id: 7,
    name: "Leston Wide Upholstered Fabric",
    price: 121,
    image: "images/7.png",
    slug: "leston-wide-upholstered-fabric",
  },
  {
    id: 8,
    name: 'Stephanny 27.5" Wide Tufted',
    price: 220,
    image: "images/8.png",
    slug: "stephanny-275-wide-tufted-armchair",
  },
];

let cart = [];

function displayProducts() {
  const productDiv = document.getElementById("products");
  productDiv.innerHTML = "";

  products.forEach((product) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product");
    productContainer.innerHTML = `
      <img class="img1" src="${product.image}" alt="${product.name}">
      <p class="p1">${product.name}</p>
      <p class="p2">$${product.price}</p>
      <button class="add" onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productDiv.appendChild(productContainer);
  });
}

function addToCart(id) {
  const selectedProduct = products.find((product) => product.id === id);
  if (!selectedProduct) return;

  const cartItem = cart.find((item) => item.id === id);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...selectedProduct, quantity: 1 });
  }

  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

function updateQuantity(id, value) {
  const cartItem = cart.find((item) => item.id === id);
  if (!cartItem) return;

  cartItem.quantity = Math.max(1, value);
  updateCart();
}

function updateCart() {
  const cartDiv = document.getElementById("cart-c");
  const totalDisplay = document.querySelector(".total");
  cartDiv.innerHTML = "";

  let totalAmount = 0;

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Your Cart is Empty</p>";
    if (totalDisplay) totalDisplay.textContent = "Total: $0";
    return;
  }

  cart.forEach((item) => {
    totalAmount += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-p");
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <p>${item.name}</p>
        <p>Price: $${item.price}</p>
        <label>
          Qty:
          <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, parseInt(this.value, 10))" />
        </label>
      </div>
      <button class="remove" onclick="removeFromCart(${item.id})">Remove</button>
    `;

    cartDiv.appendChild(cartItem);
  });

  if (totalDisplay) totalDisplay.textContent = `Total: $${totalAmount}`;
}

displayProducts();
updateCart();