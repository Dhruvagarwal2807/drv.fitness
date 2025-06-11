const products = [
    {
        name: "Yoga Mat",
        price: 899,
        img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Water Bottle",
        price: 499,
        img: "https://images.unsplash.com/photo-1526401485004-2b7ae3926fff?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Dumbbells (Pair)",
        price: 1299,
        img: "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?auto=format&fit=crop&w=400&q=80"
    }
];

let cart = JSON.parse(localStorage.getItem('cart') || "[]");

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.textContent = cart.length;
}

function updateCartDisplay() {
    const cartList = document.getElementById('cartList');
    if (!cartList) return;
    cartList.innerHTML = '';
    if (cart.length === 0) {
        cartList.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach((item, idx) => {
            const product = products.find(p => p.name === item.name);
            const imgSrc = product ? product.img : "https://via.placeholder.com/48?text=No+Image";
            cartList.innerHTML += `
                <li style="margin-bottom:1rem;display:flex;align-items:center;">
                    <img src="${imgSrc}" alt="${item.name}" style="width:48px;height:48px;border-radius:8px;margin-right:12px;">
                    <span style="flex:1;">${item.name} - ₹${item.price}</span>
                    <button class="remove-from-cart" data-index="${idx}" style="background:#e91e63;color:#fff;border:none;border-radius:6px;padding:4px 10px;cursor:pointer;">Remove</button>
                </li>
            `;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const nav = document.querySelector('nav');
    if (hamburgerBtn && nav) {
        hamburgerBtn.onclick = () => { nav.classList.toggle('active'); };
    }

    updateCartDisplay();
    updateCartCount();

    const cartListElem = document.getElementById('cartList');
    if (cartListElem) {
        cartListElem.onclick = function(e) {
            if (e.target.classList.contains('remove-from-cart')) {
                const idx = e.target.getAttribute('data-index');
                cart.splice(idx, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
                updateCartCount();
            }
        };
    }
});