function displayOrders() {
    const orderContainer = document.getElementById("orders-container");
    if (!orderContainer) return;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orderContainer.innerHTML = "";

    if (orders.length === 0) {
        orderContainer.innerHTML = `
            <div style="text-align:center; padding: 50px;">
                <h3>No orders placed yet.</h3>
                <a href="home.html" style="color:#ff6347;">Go order some delicious food!</a>
            </div>`;
        return;
    }

    // Reverse orders to show the newest one first
    orders.reverse().forEach((order) => {
        const orderDiv = document.createElement("div");
        orderDiv.classList.add("order-card");

        let itemsHtml = "";
        order.items.forEach(item => {
            itemsHtml += `
                <div style="display:flex; justify-content:space-between; margin: 5px 0; font-size: 0.9rem;">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>₹${item.price * item.quantity}</span>
                </div>
            `;
        });

        orderDiv.innerHTML = `
            <div class="order-header">
                <h3 style="margin:0;">Order #${order.order_id}</h3>
                <span class="order-status-badge">${order.status}</span>
            </div>
            <div style="margin: 10px 0; font-size: 0.85rem; color: #555;">
                <p><strong>Date:</strong> ${order.order_date}</p>
                <p><strong>Deliver to:</strong> ${order.address.street}, ${order.address.city} - ${order.address.pin}</p>
                <p><strong>Payment:</strong> ${order.payment_method} (${order.payment_status})</p>
            </div>
            <div class="order-items-list">
                ${itemsHtml}
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                <strong style="font-size: 1.1rem;">Total Amount:</strong>
                <strong style="font-size: 1.1rem; color: #ff6347;">₹${order.total_price}</strong>
            </div>
        `;
        orderContainer.appendChild(orderDiv);
    });
}

// Ensure the function runs when the page loads
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("orders-container")) {
        displayOrders();
    }
});

// Clear Orders Logic
const clearOrdersBtn = document.getElementById("clear-orders-btn");
if (clearOrdersBtn) {
    clearOrdersBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete all order history?")) {
            localStorage.removeItem("orders");
            displayOrders();
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