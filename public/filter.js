const filters = document.querySelectorAll(".filter1");
const filflex = document.querySelectorAll(".filflex");
const filterMap = {
  brand: filters[0],
  mechanism: filters[1],
  extender: filters[2],
  frame: filters[3],
  box: filters[4],
  city: filters[5],
  price: filters[6],
};
const elementCounts = {
  brand: document.querySelectorAll(".brand").length,
  mechanism: document.querySelectorAll(".mechanism").length,
  extender: document.querySelectorAll(".extender").length,
  frame: document.querySelectorAll(".frame").length,
  box: document.querySelectorAll(".box").length,
  city: document.querySelectorAll(".city").length,
  price: document.querySelectorAll(".slider-container").length,
};

const handleClick = (type, element) => {
  const isActive = filterMap[type].classList.contains("active");
  if (isActive) {
    filterMap[type].classList.remove("active");
    filterMap[type].style.height = "35px";
  } else {
    filterMap[type].classList.add("active");
    filterMap[type].style.height = `${elementCounts[type] * 30 + 35}px`;
  }
};

filflex.forEach((el, i) => {
  el.addEventListener("click", () => {
    const type = Object.keys(filterMap)[i];
    handleClick(type, el);
  });
});

const checkboxes = document.querySelectorAll(".checkbox");
const filters1 = {};

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const filter = checkbox.dataset.filter;
    const value = checkbox.dataset.value;

    if (checkbox.checked) {
      filters1[filter] = filters1[filter] || [];
      filters1[filter].push(value);
    } else {
      filters1[filter] = filters1[filter].filter((v) => v !== value);
      if (filters1[filter].length === 0) {
        delete filters1[filter];
      }
    }

    const products = document.querySelectorAll(".goods1");

    products.forEach((product) => {
      const shouldShow = Object.entries(filters1).every(([filter, values]) => {
        return values.includes(product.dataset[filter]);
      });

      if (shouldShow) {
        product.style.display = "flex";
      } else {
        product.style.display = "none";
      }
    });
  });
});

const priceSlider = document.getElementById("priceSlider");
const priceRange = document.getElementById("priceRange");

priceSlider.addEventListener("input", (event) => {
  const minPrice = event.target.value;
  const maxPrice = 10000; // Максимальное значение цены
  priceRange.textContent = `${minPrice} - ${maxPrice}`;

  // Выполнить фильтрацию товаров по цене
  const products = document.querySelectorAll(".goods1");
  products.forEach((product) => {
    const productPrice = parseInt(product.dataset.price);
    if (productPrice >= minPrice && productPrice <= maxPrice) {
      product.style.display = "flex";
    } else {
      product.style.display = "none";
    }
  });
});

priceSlider.addEventListener("input", () => {
  const price = priceSlider.value;
  const products = document.querySelectorAll(".goods1");
  products.forEach((product) => {
    const productPrice = parseInt(product.dataset.price);
    if (productPrice <= price) {
      product.style.display = "flex";
    } else {
      product.style.display = "none";
    }
  });
});
