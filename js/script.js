
// Khởi tạo giỏ hàng từ localStorage (nếu có)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cập nhật số lượng sản phẩm bên cạnh biểu tượng giỏ hàng
function updateCartIcon() {
  const cartIcon = document.querySelector('.icons span:last-child');
  const cartCount = cart.length;
  if (cartCount > 0) {
    cartIcon.innerHTML = `🛒 <span class="cart-count">${cartCount}</span>`;
  } else {
    cartIcon.innerHTML = `🛒`;
  }
}

// Hiển thị modal chi tiết sản phẩm khi nhấn vào sản phẩm
document.querySelectorAll('.product-item').forEach(item => {
  item.addEventListener('click', () => {
    const image = item.querySelector('img').src;
    const name = item.querySelector('h3').textContent;
    const price = item.querySelector('p').textContent;

    // Cập nhật nội dung modal
    document.getElementById('modal-product-image').src = image;
    document.getElementById('modal-product-name').textContent = name;
    document.getElementById('modal-product-sku').textContent = `SKU: ${name.replace(/\s/g, '').slice(-7)}`;
    document.getElementById('modal-product-price').textContent = price;

    // Hiển thị modal
    document.getElementById('product-modal').style.display = 'flex';
  });
});

// Đóng modal chi tiết sản phẩm
document.querySelector('#product-modal .close').addEventListener('click', () => {
  document.getElementById('product-modal').style.display = 'none';
});

// Xử lý chọn kích thước
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// Xử lý chọn màu sắc
document.querySelectorAll('.color-option').forEach(option => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
  });
});

// Xử lý tăng/giảm số lượng
const quantityInput = document.getElementById('quantity');
document.getElementById('increase-quantity').addEventListener('click', () => {
  quantityInput.value = parseInt(quantityInput.value) + 1;
});
document.getElementById('decrease-quantity').addEventListener('click', () => {
  if (parseInt(quantityInput.value) > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
});

// Thêm sản phẩm vào giỏ hàng
document.getElementById('add-to-cart').addEventListener('click', () => {
  const name = document.getElementById('modal-product-name').textContent;
  const price = parseInt(document.getElementById('modal-product-price').textContent.replace(/[^0-9]/g, ''));
  const quantity = parseInt(document.getElementById('quantity').value);
  const size = document.querySelector('.size-btn.selected')?.dataset.size || 'N/A';
  const color = document.querySelector('.color-option.selected')?.dataset.color || 'N/A';
  const image = document.getElementById('modal-product-image').src;

  // Thêm sản phẩm vào giỏ
  cart.push({ name, price, quantity, size, color, image });

  // Lưu giỏ hàng vào localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Cập nhật giỏ hàng và biểu tượng giỏ hàng
  updateCart();
  updateCartIcon();

  // Đóng modal chi tiết sản phẩm
  document.getElementById('product-modal').style.display = 'none';
});

// Hiển thị giỏ hàng khi nhấn vào biểu tượng giỏ hàng
document.querySelector('.icons span:last-child').addEventListener('click', () => {
  document.getElementById('cart-modal').style.display = 'flex';
});

// Đóng modal giỏ hàng
document.querySelector('#cart-modal .close').addEventListener('click', () => {
  document.getElementById('cart-modal').style.display = 'none';
});

// Cập nhật giỏ hàng
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartItemCount = document.getElementById('cart-item-count');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTotal = document.getElementById('cart-total');

  // Cập nhật số lượng sản phẩm trong giỏ
  cartItemCount.textContent = cart.length;

  // Hiển thị danh sách sản phẩm trong giỏ
  cartItems.innerHTML = '';
  let subtotal = 0;
  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <p>${item.name}</p>
        <p class="quantity">${item.quantity} / ${item.color}</p>
        <p>${(item.price * item.quantity).toLocaleString()}đ</p>
      </div>
      <span class="remove-item" data-index="${index}">×</span>
    `;
    cartItems.appendChild(cartItem);
  });
  
  // Thêm sự kiện xóa sản phẩm
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      cart.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
      localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật localStorage
      updateCart(); // Cập nhật lại giỏ hàng
      updateCartIcon(); // Cập nhật biểu tượng giỏ hàng
    });
  });

  // Cập nhật tổng tiền
  cartSubtotal.textContent = `${subtotal.toLocaleString()}đ`;
  cartTotal.textContent = `${subtotal.toLocaleString()}đ`;
}

// Cập nhật giỏ hàng và biểu tượng giỏ hàng khi tải trang
document.addEventListener('DOMContentLoaded', () => {
  updateCart();
  updateCartIcon();
});
// Mở tab mới với link Messenger khi nhấn vào biểu tượng chat
document.querySelector('.chat-icon').addEventListener('click', () => {
  window.open('https://www.messenger.com/t/549243231610785', '_blank');
});