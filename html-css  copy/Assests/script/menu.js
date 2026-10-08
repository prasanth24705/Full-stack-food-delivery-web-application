// add to cart//
// Updated Add to Cart Logic for Database Alignment
const cartButtons = document.querySelectorAll(".add-cart");

cartButtons.forEach(button => {
    button.addEventListener("click", () => {
        // 1. Get restaurant_id from the selection made on home.html
        const restaurantId = localStorage.getItem("selectedRestaurantId");
        
        // 2. Get item details from data attributes
        const itemId = button.getAttribute("data-id"); // Maps to menu_item_id
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        const image = button.getAttribute("data-image");

        // 3. Create item object matching 'cart' table requirements
        const item = {
            menu_item_id: itemId,
            restaurant_id: restaurantId,
            name: name,
            price: price,
            image: image,
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Database logic: check if this specific item for this user already exists
        const existingItem = cart.find(product => product.menu_item_id === itemId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(item);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(name + " added to cart!");
    });
});

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
