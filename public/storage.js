const cart = document.querySelectorAll(".cart");

let data = { goods: [] };
if (localStorage.getItem("id")) {
  data = JSON.parse(localStorage.getItem("id"));
}

cart.forEach((item) => {
  item.addEventListener("click", () => {
    const instockElement = item.parentNode.querySelector(".instock");
    if (!instockElement) {
      return;
    }
    const instock = parseInt(instockElement.innerText.split(":")[1].trim());
    const indexInCart = data.goods.findIndex((good) => good.id === item.id);
    const count = indexInCart >= 0 ? data.goods[indexInCart].count : 0;
    if (count >= instock) {
      console.log(`count >= ${instock}`);
      return;
    }
    if (indexInCart >= 0) {
      data.goods[indexInCart].count++;
    } else {
      data.goods.push({ id: item.id, count: 1 });
    }
    localStorage.setItem("id", JSON.stringify(data));
  });
});