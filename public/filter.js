let filters = document.querySelectorAll(".filter1")

for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener("click", function(){
        // console.log(i)
        if(document.getElementById("f"+ i).classList.contains("active")){
            document.getElementById("f"+ i).classList.remove("active")
        }
        else{
            document.getElementById("f"+ i).classList.add("active")
            document.getElementById("f"+i).style.visibility = "visible"
        }
        
    })
}