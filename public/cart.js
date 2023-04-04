const xhr = new XMLHttpRequest();
xhr.open('GET', '/cart.json');
xhr.onload = function () {
  if (xhr.status === 200) {
    const response = JSON.parse(xhr.responseText);
    const product = response.product;
    let out = ''
    for (let i = 0; i < product.length; i++) {
      for (let j = 0; j < JSON.parse(localStorage.getItem("id")).goods.length; j++) {
        if (JSON.parse(localStorage.getItem("id")).goods[j].id == product[i].id) {
          out += `<div class="goods1">`
          out += `<a href="sofas/${product[i].id}" class="agoods">`
          out += `<div class="images"><img class="imageproduct" src="${product[i].imgsrc}"></div>`
          out += `<div>${product[i].name}</div>`
          out += `<div>${product[i].title}</div>`
          out += `<div class="price">${product[i].price}₴</div>`
          out += `<div class="instock">В наявності: ${product[i].instock}</div>`
          out += `</a>`
          out += `<div class="value"></div>`
          out += `<button class="cart" id="${product[i].id}">+</button>`
          out += `<button class="cart1" id="${product[i].id}">-</button>`
          out += `<button class="cart2" id="${product[i].id}">Видалити з кошика</button>`
          out += `</div>`
        }
      }
    }
    document.querySelector(".products").innerHTML = out;
  } 
  else {
    console.log('Ошибка: ' + xhr.status);
  }

  const cart = document.querySelectorAll(".cart");
  const cart1 = document.querySelectorAll(".cart1");
  const cart2 = document.querySelectorAll(".cart2");
  const prices = document.querySelectorAll(".price");
  
  let data = { goods: [] };
  if (localStorage.getItem("id")) {
    data = JSON.parse(localStorage.getItem("id"));
  }
  
  const values = document.querySelectorAll(".value");
  values.forEach(value => {
    const id = value.parentNode.querySelector(".cart").id;
    const index = data.goods.findIndex(good => good.id === id);
    const count = index >= 0 ? data.goods[index].count : 0;
    value.innerText = `Кількість: ${count}`;
  });
  
  let totalPrice = 0;
  prices.forEach((price, index) => {
    const count = data.goods.find(good => good.id === cart[index].id)?.count ?? 0;
    totalPrice += parseFloat(price.innerText) * count;
  });
  document.querySelector(".priceall").innerText = `Ціна всіх товарів: ${totalPrice}₴`;
  
  cart.forEach((item, index) => {
    item.addEventListener("click", () => {
      const instock = parseInt(item.parentNode.querySelector(".instock").innerText.split(":")[1].trim());
      const indexInCart = data.goods.findIndex(good => good.id === item.id);
      const count = indexInCart >= 0 ? data.goods[indexInCart].count : 0;
      if (count >= instock) {
        return;
      }
      data.goods[indexInCart] = { id: item.id, count: count + 1 };
      item.parentNode.querySelector(".value").innerText = `Кількість: ${count + 1}`;
      localStorage.setItem("id", JSON.stringify(data));
      calculateTotalPrice();
    });
  });
  
  cart1.forEach(item => {
    item.addEventListener("click", () => {
      const indexInCart = data.goods.findIndex(good => good.id === item.id);
      if (indexInCart < 0 || data.goods[indexInCart].count <= 1) {
        return;
      }
      data.goods[indexInCart].count--;
      const valueElement = item.parentNode.querySelector(".value");
      valueElement.innerText = `Кількість: ${data.goods[indexInCart].count}`;
      if (data.goods[indexInCart].count <= 0) {
        data.goods.splice(indexInCart, 1);
        item.parentNode.parentNode.removeChild(item.parentNode);
      }
      localStorage.setItem("id", JSON.stringify(data));
      calculateTotalPrice();
    });
  });
  
  cart2.forEach(item => {
    item.addEventListener("click", () => {
      const indexInCart = data.goods.findIndex(good => good.id === item.id);
      if (indexInCart < 0) {
        return;
      }
      data.goods.splice(indexInCart, 1);
      item.parentNode.parentNode.removeChild(item.parentNode);
      localStorage.setItem("id", JSON.stringify(data));
      calculateTotalPrice();
    });
  });
  
  function calculateTotalPrice() {
    const prices = document.querySelectorAll(".price");
    const counts = document.querySelectorAll(".value");
    let totalPrice = 0;
    for (let i = 0; i < prices.length; i++) {
      totalPrice += parseFloat(prices[i].innerText) * parseInt(counts[i].innerText.split(" ")[1]);
    }
    document.querySelector(".priceall").innerText = `Ціна всіх товарів: ${totalPrice}₴`;
  }
  
};
xhr.send();