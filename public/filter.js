const filters = document.querySelectorAll(".filter1");
const filflex = document.querySelectorAll(".filflex");
const filterMap = {
    brand: filters[0],
    mechanism: filters[1],
    extender: filters[2],
    frame: filters[3],
    box: filters[4],
    city: filters[5],
};
const elementCounts = {
    brand: document.querySelectorAll('.brand').length,
    mechanism: document.querySelectorAll('.mechanism').length,
    extender: document.querySelectorAll('.extender').length,
    frame: document.querySelectorAll('.frame').length,
    box: document.querySelectorAll('.box').length,
    city: document.querySelectorAll('.city').length,
};

const handleClick = (type, element) => {
    const isActive = filterMap[type].classList.contains('active');
    if (isActive) {
        filterMap[type].classList.remove('active');
        filterMap[type].style.height = '35px';
    } else {
        filterMap[type].classList.add('active');
        filterMap[type].style.height = `${elementCounts[type] * 30 + 35}px`;
    }
};

filflex.forEach((el, i) => {
    el.addEventListener("click", () => {
        const type = Object.keys(filterMap)[i];
        handleClick(type, el);
    });
});

const checkboxes = document.querySelectorAll('.checkbox');
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('click', function () {
        const img = checkbox.querySelector('img');
        if (checkbox.classList.contains('active')) {
            img.style.opacity = '0';
            checkbox.classList.remove('active');
        } else {
            checkbox.classList.add('active');
            img.style.opacity = '1';
        }
    });
});

// Получаем все чекбоксы брендов
const brandCheckboxes = document.querySelectorAll('.brand');

// Получаем все товары
const products = document.querySelectorAll('.goods1');

// Добавляем обработчики событий на чекбоксы
brandCheckboxes.forEach(function(checkbox) {
  checkbox.addEventListener('click', function() {
    // Получаем значение выбранного чекбокса
    const brand = this.innerText;
    console.log(brand)
    
    // Перебираем все товары и скрываем те, которые не относятся к выбранному бренду
    products.forEach(function(product) {
      const productBrand = product.querySelector('.brand').innerText;
      if (productBrand !== brand) {
        product.style.display = 'none';
      } else {
        product.style.display = 'flex';
      }
    });
  });
});
