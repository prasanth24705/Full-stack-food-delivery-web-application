// LOGIN MODAL FUNCTIONS

function openModal(){
document.getElementById("authModal").style.display="flex";
}

function closeModal(){
document.getElementById("authModal").style.display="none";
}

function showSignup(){
document.getElementById("loginForm").style.display="none";
document.getElementById("signupForm").style.display="block";
}

function showLogin(){
document.getElementById("signupForm").style.display="none";
document.getElementById("loginForm").style.display="block";
}



function signupuser() {
    let name = document.getElementById("Fullname").value.trim();
    let email = document.getElementById("Semail").value.trim();
    let mobile = document.getElementById("Smobile").value.trim(); // Ensure this ID exists in HTML
    let password = document.getElementById("Spassword").value;

    // 1. Basic Empty Field Check
    if (name === "" || email === "" || mobile === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }

    // 2. Email Constraint: Must be @gmail.com
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid @gmail.com address.");
        return;
    }

    // 3. Mobile Constraint: 10 to 15 digits only
    const mobileRegex = /^\d{10,15}$/;
    if (!mobileRegex.test(mobile)) {
        alert("Mobile number must be between 10 and 15 digits.");
        return;
    }

    // 4. Password Constraint: 8+ chars, 1 Uppercase, 1 Lowercase, 1 Number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;;
    if (!passwordRegex.test(password)) {
        alert("Password must be 8+ characters with at least one uppercase, lowercase, and number.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("allUsers")) || [];

    // 5. Check if User already exists (by email or mobile)
    let userExists = users.find(u => u.email === email || u.mobile === mobile);
    if (userExists) {
        alert("An account with this email or mobile already exists!");
        return;
    }

    // 6. Save User
    users.push({ name, email, mobile, password });
    localStorage.setItem("allUsers", JSON.stringify(users));

    alert("Account created successfully!");
    showLogin(); 
}
// login function

function loginuser() {
    let identifier = document.getElementById("Email").value.trim();
    let password = document.getElementById("Password").value;

    if (identifier === "" || password === "") {
        alert("Please enter your credentials");
        return;
    }

    // Check if input is numeric to validate mobile length (10-15 digits)
    const isNumeric = /^\d+$/.test(identifier);
    if (isNumeric && (identifier.length < 10 || identifier.length > 15)) {
        alert("Mobile number must be between 10 and 15 digits.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("allUsers")) || [];

    // Search for matching user (Check both email and mobile fields)
    let validUser = users.find(u => 
        (u.email === identifier || u.mobile === identifier) && u.password === password
    );

    if (validUser) {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("currentUserName", validUser.name); 
        
        alert("Login successful! Welcome " + validUser.name);
        window.location.href = "Assests/home.html";
    } 
    // Admin Override
    else if (identifier === "admin@gmail.com" && password === "Admin@123") {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("currentUserName", "Admin");
        window.location.href = "Assests/home.html";
    } 
    else {
        alert("Invalid credentials. Please try again.");
    }
}