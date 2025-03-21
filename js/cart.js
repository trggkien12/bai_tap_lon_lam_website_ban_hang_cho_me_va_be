document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");

    function renderCart() {
        cartContainer.innerHTML = "";
        let totalPrice = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Giỏ hàng trống.</p>";
            totalPriceElement.innerText = "0đ";
            return;
        }

        cart.forEach((product, index) => {
            let productRow = document.createElement("div");
            productRow.classList.add("cart-item", "d-flex", "align-items-center", "border-bottom", "py-2");

            productRow.innerHTML = `
                <img src="${product.image}" alt="${product.name}" width="80" class="me-3">
                <div class="flex-grow-1">
                    <h5 class="mb-1">${product.name}</h5>
                    <p class="mb-1">${product.price} x ${product.quantity}</p>
                </div>
                <input type="number" value="${product.quantity}" min="1" class="form-control w-25 me-3 quantity-input" data-index="${index}">
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Xóa</button>
            `;

            cartContainer.appendChild(productRow);
            totalPrice += parseInt(product.price.replace("đ", "").replace(".", "")) * product.quantity;
        });

        totalPriceElement.innerText = totalPrice.toLocaleString("vi-VN") + "đ";
    }

    cartContainer.addEventListener("change", function (event) {
        if (event.target.classList.contains("quantity-input")) {
            let index = event.target.dataset.index;
            let newQuantity = parseInt(event.target.value);
            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            }
        }
    });

    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
            let index = event.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    });

    renderCart();
});
