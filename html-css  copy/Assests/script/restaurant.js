function goToMenu(restaurantId, restaurantName) {

    // This allows the Menu page to know which restaurant's items to show
    localStorage.setItem("selectedRestaurantId", restaurantId);
    localStorage.setItem("selectedRestaurantName", restaurantName);
    
    // Redirect to menu page
    window.location.href = "menu.html";
}

// toggle button//
const togglebtn = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

togglebtn.addEventListener("click", function(){
    menu.classList.toggle("active");
});

window.addEventListener("resize", function(){

    if(this.window.innerwidth > 600){
        menu.classList.remove("active")
    }
});