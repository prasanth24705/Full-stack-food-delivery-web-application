document.addEventListener("DOMContentLoaded", function () {
   
    const currentName = sessionStorage.getItem("currentUserName");
    
    // 2. Get the array of all registered users from Local Storage
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

    // 3. Search for the specific user object that matches the name in the session
    const userData = allUsers.find(user => user.name === currentName);

    // 4. Update the HTML elements with the fetched data
    if (userData) {
        // Update Header/Welcome section
        document.getElementById("disp-name").innerText = userData.name;
        document.getElementById("disp-email").innerText = userData.email;
        
        // Update Detailed Profile Table/List
        document.getElementById("full-name").innerText = userData.name;
        document.getElementById("email-addr").innerText = userData.email;

        // Fetch Order Count (assuming you have an 'orders' array in localStorage)
        const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
        // Filter orders that belong to this user
        const userOrders = allOrders.filter(order => order.userName === currentName);
        document.getElementById("order-count").innerText = userOrders.length;

    } else if (currentName === "Admin") {
        // Handle the Hardcoded Admin case from your login function
        document.getElementById("disp-name").innerText = "Administrator";
        document.getElementById("disp-email").innerText = "admin@gmail.com";
        document.getElementById("full-name").innerText = "System Admin";
        document.getElementById("email-addr").innerText = "admin@gmail.com";
        document.getElementById("order-count").innerText = "N/A";
    } else {
        // If no session exists or user isn't found, redirect to login page
        alert("Please login to view your profile.");
        window.location.href = "../index.html";
    }
});

// Function to handle Sign Out
function logoutUser() {
    // 1. Confirm with the user
    if (confirm("Are you sure you want to sign out?")) {
        
        // 2. Clear Session Storage (removes the login flags)
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("currentUserName");

       
        alert("You have been logged out successfully.");
        window.location.href = "../index.html";
    }
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