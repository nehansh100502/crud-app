//script.js
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

employeeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let newEmployeesData = {
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
  try {
    let resp = await fetch("https://crud-app-1-y4xi.onrender.com/employees", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newEmployeesData),
    });
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
});
