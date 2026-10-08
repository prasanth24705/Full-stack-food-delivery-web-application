// get cart data from LS

let cart = JSON.parse(localStorage.getItem("cart")) || [] ;

//select elements

const cartContainer = document.getElementById("cart-container");
const totalElement = document.getElementById("cart-total");

// display cart

function displayCart () {
    cartContainer.innerHTML = ""; //clears previous data
    let total=0;

    if(cart.length === 0){
        cartContainer.innerHTML = "<h3> Your cart is empty</h3>";
        totalElement.innerHTML="Total: ₹0";
        return;
    }

    //loop through cart

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

  
        const div =document.createElement("div");
        div.classList.add("cart-card");

        div.innerHTML = `
            <div class="item-info">
                <img src = "${item.image}" width="120" height="120" style="border-radius:10px;"> 
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
            </div>

            <div class="quantity-control">
                <button onclick="decreaseQty(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQty(${index})">+</button>
            </div>

            <div class="item-total">
                <p>Total: ₹${item.price * item.quantity}</p>
            </div>

            <button class ="remove-btn" onclick = "removeItem(${index})">remove</button>`

            cartContainer.appendChild(div);
    });

    totalElement.innerText = "Total: ₹" + total;
}

//increase cart
function increaseQty(index) {
    cart[index].quantity += 1;

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Refresh UI
    displayCart();
}

// decrease cart

function decreaseQty(index) {

    if(cart[index].quantity > 1) { 
        cart[index].quantity -= 1;
    }
    else{
        cart.splice(index,1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

// remove item

function removeItem(index) {
    cart.splice(index, 1);

    localStorage.setItem("cart" , JSON.stringify(cart));

    displayCart();
}

if (cartContainer) {
    displayCart();
}

//checkout button

// Updated Checkout Logic with Redirection Fix
const checkoutBtn = document.getElementById("checkout-btn");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        console.log("Checkout button clicked..."); // Debugging

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // 1. Capture the new database-aligned fields
        const street = document.getElementById("street")?.value || "";
        const city = document.getElementById("city")?.value || "";
        const pin = document.getElementById("pin")?.value || "";
        const paymentMethod = document.getElementById("payment-method")?.value || "COD";
        const instruction = document.getElementById("instructions")?.value || "";

        // 2. Database Constraint Validation (chk_pin: 5-10 chars)
        if (street === "" || city === "" || pin === "") {
            alert("Please fill in your delivery address.");
            return;
        }

        if (pin.length < 5 || pin.length > 10) {
            alert("PIN code must be between 5 and 10 digits to match database requirements.");
            return;
        }

        // 3. Create the Order object
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        
        const newOrder = {
            order_id: orders.length + 1,
            restaurant_id: cart[0].restaurant_id || 1, // Default to 1 if not set
            address: { street, city, pin },
            total_price: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            payment_method: paymentMethod, // Matches 'chk_payment_method'
            payment_status: paymentMethod === "COD" ? "PENDING" : "PAID",
            status: "PLACED", // Matches 'chk_order_status'
            instruction: instruction,
            items: cart,
            order_date: new Date().toLocaleString()
        };

        // 4. Save and Redirect
        try {
            orders.push(newOrder);
            localStorage.setItem("orders", JSON.stringify(orders));
            localStorage.removeItem("cart"); // Clear cart after success

            console.log("Order saved! Redirecting...");
            alert("Order placed successfully! 🎉");
            
            // This is the line that takes you to the orders page
            window.location.href = "orders.html"; 
        } catch (error) {
            console.error("Error saving order:", error);
            alert("Something went wrong while saving your order.");
        }
    });
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