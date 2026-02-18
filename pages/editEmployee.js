const employeeForm = document.getElementById("employee-form");
const firstName = document.getElementById("firstname");
const middleName = document.getElementById("middlename");
const lastName = document.getElementById("lastname");
const dob = document.getElementById("dob");
const email = document.getElementById("email");
const marital = document.getElementById("maritalstatus");
const phone = document.getElementById("phone");
const street = document.getElementById("address");
const city = document.getElementById("city");
const state = document.getElementById("state");
const country = document.getElementById("country");
const zipcode = document.getElementById("zip");

async function editEmployee() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  try {
    let resp = await fetch(
      `https://crud-app-1-y4xi.onrender.com/employees/${id}`
    );
    console.log(resp);

    if (resp.ok) {
      let empData = await resp.json();
      firstName.value = empData.firstName;
      middleName.value = empData.middleName;
      lastName.value = empData.lastName;
      dob.value = empData.dob;
      email.value = empData.email;
      marital.value = empData.maritalStatus;
      phone.value = empData.phone;
      street.value = empData.address.street;
      city.value = empData.address.city;
      state.value = empData.address.state;
      country.value = empData.address.country;
      zipcode.value = empData.address.zip;
    } else {
      alert("Failed to fetch employee data.");
    }
  } catch (err) {
    alert("something went worng ");
  }
}
window.addEventListener("DOMContentLoaded", () => {
  editEmployee();

  employeeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let updatedEmployeeData = {
      firstName: firstName.value.trim(),
      middleName: middleName.value.trim(),
      lastName: lastName.value.trim(),
      dob: dob.value.trim(),
      email: email.value.trim(),
      maritalStatus: marital.value.trim(),
      phone: phone.value.trim(),
      address: {
        street: street.value.trim(),
        city: city.value.trim(),
        state: state.value.trim(),
        country: country.value.trim(),
        zip: zip.value.trim(),
      },
    };
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    try {
      let resp = await fetch(
        `https://crud-app-1-y4xi.onrender.com/employees/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedEmployeeData),
        }
      );
      if (resp.ok) {
        alert("Employee updated successfully!");
        window.location.href = "allemployee.html";
      } else {
        alert("Failed to update employee.");
      }
    } catch (err) {
      alert("something went worng ");
    }
  });
});
