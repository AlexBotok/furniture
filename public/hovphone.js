let hovphone = document.getElementById("hovphone")
let hov_menu1 = document.getElementById("hov_menu1")

hovphone.addEventListener("mouseover",function() {
      hov_menu1.style.opacity = 1
})

hovphone.addEventListener("mouseout",function() {
   hov_menu1.style.opacity  = 0
})