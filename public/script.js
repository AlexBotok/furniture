let hovphone = document.getElementById("hovphone")
let hov_menu1 = document.getElementById("hov_menu1")

hovphone.addEventListener("mouseover", function () {
   hov_menu1.style.opacity = 1
})

hovphone.addEventListener("mouseout", function () {
   hov_menu1.style.opacity = 0
})

let sect1_rightb = document.getElementById("sect1_rightb");
let numliz = document.getElementById("numliz");
let rect1_2 = document.getElementById("rect1_2");
let section = document.getElementById("section");
let i = 1;

function bedsHeader() {
   numliz.innerHTML = "0" + i;
   switch (i) {
      case 1:
         rect1_2.innerHTML = "Ліжко Ornella";
         section.style.backgroundImage = "url(/public/img/bg.png)";
         break;
      case 2:
         rect1_2.innerHTML = "Ліжко DarkModel";
         section.style.backgroundImage = "url(/public/img/california.png)";
         break;
      case 3:
         rect1_2.innerHTML = "Ліжко WhiteBrush";
         section.style.backgroundImage = "url(/public/img/BlackBed.png)";
         break;
      case 4:
         rect1_2.innerHTML = "Ліжко Ordenal";
         section.style.backgroundImage = "url(/public/img/krovatk.png)";
         break;
   }
}
sect1_rightb.addEventListener("click", function () {
   i = i >= 4 ? 1 : i + 1;
   bedsHeader();
});

sect1_leftb.addEventListener("click", function () {
   i = i <= 1 ? 4 : i - 1;
   bedsHeader();
});

let offset = 0;
const leftsli = document.getElementById("leftbsli");
const rightsli = document.getElementById("rightbsli");
const slider = document.getElementById("slider");
const numslider = 616;

rightsli.addEventListener("click", function () {
offset -= numslider;
offset = offset < -numslider ? 0 : offset;
slider.style.left = `${offset}px`;
});

leftsli.addEventListener("click", function () {
offset += numslider;
offset = offset > numslider ? 0 : offset;
slider.style.left = `${offset}px`;
});

let trig = document.querySelectorAll("#trig");
let svgid = document.querySelectorAll("#svgid");
let trigp = document.querySelectorAll("#trigp");
let trig_ligko = document.querySelectorAll("#trig_ligko");
let ligko_text = document.querySelectorAll("#ligko_text");
let trig_ligko1 = document.querySelectorAll("#trig_ligko1");
let ligko_text1 = document.querySelectorAll("#ligko_text1");
let ligko_text1_2 = document.querySelectorAll("#ligko_text1_2");
let ligko_text1_3 = document.querySelectorAll("#ligko_text1_3");

function handleMouseOver() {
   svgid[this.index].style.fill = "#44C697";
   trigp[this.index].classList.add("sect4pline");
}

function handleMouseOut() {
   svgid[this.index].style.fill = "#1E2E36";
   trigp[this.index].classList.remove("sect4pline");
}

for (let a = 0; a < trig.length; a++) {
   trig[a].index = a;
   trig[a].addEventListener("mouseover", handleMouseOver);
   trig[a].addEventListener("mouseout", handleMouseOut);
   trigp[a].index = a;
   trigp[a].addEventListener("mouseover", handleMouseOver);
   trigp[a].addEventListener("mouseout", handleMouseOut);
}

function mouseOverTrigLigko() {
   this.style.bottom = "25px";
   ligko_text[this.index].style.background = "#44C697";
   ligko_text[this.index].style.color = "#FFFFFF";
}

function mouseOutTrigLigko() {
   this.style.bottom = "0px";
   ligko_text[this.index].style.background = "#FFFFFF";
   ligko_text[this.index].style.color = "#1E2E36";
}

function mouseOverTrigLigko1() {
   this.style.bottom = "25px";
   ligko_text1[this.index].style.background = "#44C697";
   ligko_text1[this.index].style.color = "#FFFFFF";
   ligko_text1_2[this.index].style.color = "#FFFFFF";
   ligko_text1_3[this.index].style.color = "#FFFFFF";
}

function mouseOutTrigLigko1() {
   this.style.bottom = "0px";
   ligko_text1[this.index].style.background = "#FFFFFF";
   ligko_text1[this.index].style.color = "#1E2E36";
   ligko_text1_2[this.index].style.color = "#FF1B1B";
   ligko_text1_3[this.index].style.color = "#BCBDBB";
}
for (let a = 0; a < trig_ligko.length; a++) {
   trig_ligko[a].index = a;
   trig_ligko[a].addEventListener("mouseover", mouseOverTrigLigko);
   trig_ligko[a].addEventListener("mouseout", mouseOutTrigLigko);
}
for (let a = 0; a < trig_ligko1.length; a++) {
   trig_ligko1[a].index = a;
   trig_ligko1[a].addEventListener("mouseover", mouseOverTrigLigko1);
   trig_ligko1[a].addEventListener("mouseout", mouseOutTrigLigko1);
}