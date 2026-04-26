// LOGIN
function login() {
    if (username.value === "Atiq" && password.value === "1726") {
        localStorage.setItem("auth", "true");
        location.href = "dashboard.html";
    } else alert("Wrong login");
}

function logout() {
    localStorage.removeItem("auth");
    location.href = "index.html";
}

function checkAuth() {
    if (localStorage.getItem("auth") !== "true") {
        location.href = "index.html";
    }
}

// NAVIGATION
function showSection(id) {
    document.querySelectorAll(".section").forEach(s => s.style.display = "none");
    document.getElementById(id).style.display = "block";
}

// DATA
let customers = JSON.parse(localStorage.getItem("customers")) || [];
let projects = JSON.parse(localStorage.getItem("projects")) || [];
let requirements = JSON.parse(localStorage.getItem("requirements")) || [];

function save() {
    localStorage.setItem("customers", JSON.stringify(customers));
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("requirements", JSON.stringify(requirements));
}

// INIT
function initApp() {
    checkAuth();
    showSection("dashboard");
    displayAll();
    updateStats();
}

// CUSTOMERS
function addCustomer() {
    customers.push({name:cname.value, phone:cphone.value});
    save(); displayCustomers(); updateStats();
}

function displayCustomers() {
    customerList.innerHTML = customers.map(c=>`<li>${c.name}</li>`).join("");
}

// PROJECTS
function addProject() {
    projects.push({
        project: project.value,
        engineer: engineer.value,
        status: status.value,
        cost: cost.value
    });
    save(); displayProjects(); updateStats();
}

function displayProjects(data=projects) {
    projectTable.innerHTML = data.map((p,i)=>`
    <tr>
    <td>${p.project}</td>
    <td>${p.engineer}</td>
    <td>${p.status}</td>
    <td>${p.cost}</td>
    <td><button onclick="deleteProject(${i})">Delete</button></td>
    </tr>`).join("");
}

function deleteProject(i){
    projects.splice(i,1); save(); displayProjects(); updateStats();
}

// SEARCH
function searchProject(){
    let v=search.value.toLowerCase();
    let f=projects.filter(p=>p.project.toLowerCase().includes(v));
    displayProjects(f);
}

// REQUIREMENTS
function addRequirement(){
    requirements.push({c:reqCustomer.value,d:reqDetail.value});
    save(); displayRequirements();
}

function displayRequirements(){
    reqList.innerHTML=requirements.map(r=>`<li>${r.c}: ${r.d}</li>`).join("");
}

// STATS
function updateStats(){
    totalCustomers.innerText=customers.length;
    totalProjects.innerText=projects.length;
}

// LOAD
function displayAll(){
    displayCustomers();
    displayProjects();
    displayRequirements();
}
