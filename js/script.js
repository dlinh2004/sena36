document.addEventListener('DOMContentLoaded', () => {
  const chatIcon = document.querySelector('.chat-icon');
  chatIcon.addEventListener('click', () => {
      alert('Chào bạn! Bạn cần hỗ trợ gì từ Sena36?');
  });

  const logoLink = document.querySelector('#logo-link');
  logoLink.addEventListener('click', (event) => {
      event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
      window.location.href = 'index.html'; // Điều hướng về trang chủ
  });
});