// Отримуємо елементи DOM
const cartList = document.querySelector('.cart-items-list');
const cartTotal = document.querySelector('.cart-total');
const orderBtn = document.querySelector("#orderBtn");
const orderSection = document.querySelector(".order");
const orderForm = document.querySelector(".order-form");

// Функція для відображення товарів у кошику
function showCartList() {
    cartList.innerHTML = '';
    
    // Отримуємо кошик з кукі
    const cartCookie = getCookieValue('cart');
    const cart = cartCookie ? JSON.parse(cartCookie) : {};
    
    if (Object.keys(cart).length === 0) {
        cartList.innerHTML = '<div class="empty-cart">У кошику ще немає товарів</div>';
        cartTotal.textContent = '0';
        return;
    }
    
    // Додаємо кожен товар у кошик
    for (let key in cart) {
        const item = cart[key];
        cartList.innerHTML += `
            <div class="cart-item">
                <h4 class="cart-item-title">${item.title}</h4>
                <div class="cart-item-quantity">Кількість: ${item.quantity}</div>
                <div class="cart-item-price" data-price="${item.price}">${item.price * item.quantity} грн</div>
            </div>
        `;
    }
    
    // Розраховуємо загальну суму
    const total = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total;
}

// Показати форму замовлення
orderBtn.addEventListener("click", function() {
    orderBtn.style.display = "none";
    orderSection.style.display = "block";
    anime({
        targets: '.order',
        opacity: 1,
        duration: 1000,
        easing: 'easeInOutQuad'
    });
});

// Функція для показу гарного сповіщення
function showAlert(message) {
    // Створюємо елемент сповіщення
    const alert = document.createElement('div');
    alert.className = 'alert-notification';
    alert.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        <span>${message}</span>
    `;
    
    // Додаємо на сторінку
    document.body.appendChild(alert);
    
    // Показуємо з анімацією
    setTimeout(() => {
        alert.classList.add('show');
    }, 100);
    
    // Ховаємо через 3 секунди
    setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('hide');
        
        // Видаляємо після завершення анімації
        setTimeout(() => {
            alert.remove();
        }, 500);
    }, 3000);
}

// Оновлений обробник події для форми замовлення
orderForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // 1. Очищаємо кошик (куки)
    document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // 2. Оновлюємо відображення кошика
    showCartList();
    
    // 3. Показуємо гарне сповіщення
    showAlert("Замовлення прийнято! Дякуємо!");
    
    // 4. Ховаємо форму замовлення
    orderSection.style.display = "none";
    orderBtn.style.display = "block";
    orderSection.style.opacity = "0";
    
    // 5. Очищаємо форму
    this.reset();
});

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    showCartList();
});