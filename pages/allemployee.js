const employeeList = document.getElementById("employee-list");
const BASE_URL = "https://crud-app-1-y4xi.onrender.com";

async function fetchEmployees() {
  try {
    const response = await fetch(`${BASE_URL}/employees`);
    const employees = await response.json();
    renderEmployees(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
}

function renderEmployees(employees) {
  employeeList.innerHTML = "";

  if (employees.length === 0) {
    employeeList.innerHTML = "<p>No employees found.</p>";
    return;
  }

  employees.forEach((emp) => {
    const card = document.createElement("div");
    card.classList.add("employee-card");

    card.innerHTML = `
      <h3>${emp.firstName} ${emp.middleName || ""} ${emp.lastName}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>DOB:</strong> ${emp.dob}</p>
      <p><strong>Marital Status:</strong> ${emp.maritalStatus}</p>
      <p><strong>Phone:</strong> ${emp.phone}</p>
      <p><strong>Address:</strong>
        ${emp.address.street},
        ${emp.address.city},
        ${emp.address.state},
        ${emp.address.country} - ${emp.address.zip}
      </p>

      <div class="action-buttons">
        <button class="edit-btn" data-id="${emp.id}">Edit</button>
        <button class="delete-btn" data-id="${emp.id}">Delete</button>
      </div>
    `;

    employeeList.appendChild(card);
  });

  attachButtonEvents();
}

// Attach events after DOM creation
function attachButtonEvents() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      deleteEmployee(id);
    });
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      editEmployee(id);
    });
  });
}

// DELETE employee
async function deleteEmployee(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this employee?"
  );
  if (!confirmDelete) return;

  try {
    await fetch(`${BASE_URL}/employees/${id}`, {
      method: "DELETE",
    });
    fetchEmployees(); // refresh list
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
}

// EDIT employee (redirect)
function editEmployee(id) {
  // redirect to edit page with employee id
  window.location.href = `/pages/editEmployee.html?id=${id}`;
}

// Load employees on page load
fetchEmployees();
