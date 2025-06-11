let wishlist = JSON.parse(localStorage.getItem('wishlist') || "[]");

function updateWishlistDisplay() {
    const wishlistList = document.getElementById('wishlistList');
    wishlistList.innerHTML = '';
    if (wishlist.length === 0) {
        wishlistList.innerHTML = '<li>Your wishlist is empty.</li>';
    } else {
        wishlist.forEach((item, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item}</span>
                <button class="remove-from-wishlist" data-index="${idx}" style="margin-left:10px;">Remove</button>
            `;
            wishlistList.appendChild(li);
        });
    }
}
updateWishlistDisplay();

document.getElementById('wishlistList').onclick = function(e) {
    if (e.target.classList.contains('remove-from-wishlist')) {
        const idx = e.target.getAttribute('data-index');
        wishlist.splice(idx, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistDisplay();
    }
};

document.getElementById('clearWishlist').onclick = function() {
    wishlist = [];
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistDisplay();
};