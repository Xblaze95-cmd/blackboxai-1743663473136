// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const cartCount = document.querySelectorAll('.cart-count');
  cartCount.forEach(el => {
    el.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  });
}

function addToCart(productId, name, price) {
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name,
      price,
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`${name} added to cart`);
}

// Form Handling
function handleAppointmentForm(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const appointment = Object.fromEntries(formData);
  
  // In a real app, you would send this to your backend
  console.log('Appointment booked:', appointment);
  showToast('Appointment booked successfully!');
  e.target.reset();
}

function handlePaymentForm(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const payment = Object.fromEntries(formData);
  
  // In a real app, you would process payment here
  console.log('Payment processed:', payment);
  showToast('Payment processed successfully!');
  e.target.reset();
}

// UI Helpers
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  
  // Add event listeners if on relevant pages
  const appointmentForm = document.getElementById('appointment-form');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', handleAppointmentForm);
  }

  const paymentForm = document.getElementById('payment-form');
  if (paymentForm) {
    paymentForm.addEventListener('submit', handlePaymentForm);
  }

  // Add product buttons event listeners
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const product = e.target.closest('.product');
      addToCart(
        product.dataset.id,
        product.dataset.name,
        parseFloat(product.dataset.price)
      );
    });
  });
});