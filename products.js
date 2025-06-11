const products = [
    {
        name: "Yoga Mat",
        description: "Premium non-slip yoga mat for all types of workouts. Eco-friendly, 6mm thick, and easy to clean.",
        price: 899,
        category: "mat",
        img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Water Bottle",
        description: "Stainless steel insulated water bottle. Keeps drinks cold for 24h or hot for 12h. 750ml.",
        price: 499,
        category: "bottle",
        img: "https://images.unsplash.com/photo-1526401485004-2b7ae3926fff?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Dumbbells (Pair)",
        description: "Rubber-coated hex dumbbells for strength training. Available in multiple weights.",
        price: 1299,
        category: "dumbbells",
        img: "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?auto=format&fit=crop&w=400&q=80"
    }
];

let cart = JSON.parse(localStorage.getItem('cart') || "[]");
let wishlist = JSON.parse(localStorage.getItem('wishlist') || "[]");

function showLoader() { document.getElementById('loader').style.display = 'flex'; }
function hideLoader() { document.getElementById('loader').style.display = 'none'; }
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
}

const hamburgerBtn = document.getElementById('hamburgerBtn');
const nav = document.querySelector('nav');
hamburgerBtn.onclick = () => { nav.classList.toggle('active'); };

function loadProducts() {
    const list = document.getElementById('productList');
    list.innerHTML = '';
    products.forEach(product => {
        list.innerHTML += `
        <div class="product-card" data-category="${product.category}" data-name="${product.name}" data-price="${product.price}">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span>₹${product.price}</span>
            <button class="add-to-cart">Add to Cart</button>
            <button class="wishlist-btn${wishlist.includes(product.name) ? ' active' : ''}">♡ Wishlist</button>
            <button class="details-btn">Details</button>
        </div>`;
    });
    attachProductEventListeners();
}
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    hideLoader();
    updateCartCount();
    updateCartDisplay();
});

function attachProductEventListeners() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.onclick = function() {
            const card = btn.closest('.product-card');
            const name = card.getAttribute('data-name');
            const price = card.getAttribute('data-price');
            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
            showCartAnim();
            showToast("Added to cart!");
        };
    });
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.onclick = function() {
            const card = btn.closest('.product-card');
            const name = card.getAttribute('data-name');
            if (!wishlist.includes(name)) {
                wishlist.push(name);
                btn.classList.add('active');
                showToast("Added to wishlist!");
            } else {
                wishlist = wishlist.filter(item => item !== name);
                btn.classList.remove('active');
                showToast("Removed from wishlist!");
            }
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        };
    });
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.onclick = function() {
            const card = btn.closest('.product-card');
            const name = card.getAttribute('data-name');
            const product = products.find(p => p.name === name);
            document.getElementById('detailsTitle').textContent = product.name;
            document.getElementById('detailsDesc').textContent = product.description;
            document.getElementById('detailsPrice').textContent = "₹" + product.price;
            document.getElementById('detailsImg').src = product.img;
            document.getElementById('detailsImg').alt = product.name;
            document.getElementById('detailsModal').classList.add('active');
        };
    });
}

function showCartAnim() {
    const anim = document.getElementById('cartAnim');
    anim.style.display = 'block';
    anim.style.opacity = 1;
    anim.style.transform = 'scale(1)';
    setTimeout(() => {
        anim.style.transition = 'opacity 0.5s, transform 0.5s';
        anim.style.opacity = 0;
        anim.style.transform = 'scale(0.8)';
    }, 900);
    setTimeout(() => {
        anim.style.display = 'none';
        anim.style.transition = '';
        anim.style.opacity = 1;
        anim.style.transform = 'scale(1)';
    }, 1400);
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.textContent = cart.length;
}

// --- Cart Modal Functionality ---
function updateCartDisplay() {
    const cartList = document.getElementById('cartList');
    if (!cartList) return;
    cartList.innerHTML = '';
    if (cart.length === 0) {
        cartList.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach((item, idx) => {
            const product = products.find(p => p.name === item.name);
            // Fallback if product not found (shouldn't happen)
            const img = product ? product.img : '';
            cartList.innerHTML += `
                <li style="margin-bottom:1rem;display:flex;align-items:center;">
                    <img src="${img}" alt="${item.name}" style="width:48px;height:48px;border-radius:8px;margin-right:12px;">
                    <span style="flex:1;">${item.name} - ₹${item.price}</span>
                    <button class="remove-from-cart" data-index="${idx}" style="background:#e91e63;color:#fff;border:none;border-radius:6px;padding:4px 10px;cursor:pointer;">Remove</button>
                </li>
            `;
        });
    }
}
if (document.getElementById('cartList')) updateCartDisplay();

const cartIcon = document.getElementById('cartIcon');
if (cartIcon) {
    cartIcon.onclick = () => {
        document.getElementById('cartModal').classList.add('active');
        updateCartDisplay();
    };
}
const closeCartBtn = document.getElementById('closeCart');
if (closeCartBtn) {
    closeCartBtn.onclick = () => {
        document.getElementById('cartModal').classList.remove('active');
    };
}
const cartListElem = document.getElementById('cartList');
if (cartListElem) {
    cartListElem.onclick = function(e) {
        if (e.target.classList.contains('remove-from-cart')) {
            const idx = e.target.getAttribute('data-index');
            cart.splice(idx, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
            showToast("Removed from cart!");
        }
    };
}

// --- Details Modal ---
document.getElementById('closeDetails').onclick = () => {
    document.getElementById('detailsModal').classList.remove('active');
};
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.classList.remove('active');
    });
});