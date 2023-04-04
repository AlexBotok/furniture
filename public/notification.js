const addToCartButtons = document.querySelectorAll('.cart');
const notificationContainer = document.getElementById('notification-container');
let notificationCount = 0;

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    notificationCount++;
    
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.style.opacity = '1';
    notification.textContent = 'Товар додано до кошика!';
    
    notificationContainer.prepend(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        notification.remove();
      }, 1000);
    }, 3000);
    
    // Смещение предыдущих окон
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach((notification, index) => {
      const offset = (index + 1 - notificationCount) * 40;
      if (offset > 0) {
        notification.style.transform = `translateY(-${offset}px)`;
      }
    });
  });
});
