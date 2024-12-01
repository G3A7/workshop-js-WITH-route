const name = document.getElementById("name");
const age = document.getElementById("age");
const city = document.getElementById("city");
const date = document.getElementById("date");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const image = document.getElementById("image");
const imageFig = document.getElementById("imgFig");
const addEmployee = document.getElementById("addEmployee");
const myModal = new bootstrap.Modal("#exampleModal");
const myModalEl = document.getElementById("exampleModal");
const allInputs = document.querySelectorAll(".input input");
const inputSearch = document.querySelector("#input-search");
const select = document.querySelector("select");
const updateEmployee = document.querySelector("#UpdateEmployee");
// console.log(name, age, city, email, phone, image, date);
let idForUpdate = -1;
const regexObj = {
  name: /^[a-zA-Z ]{3,20}$/,
  age: /^[1-9][0-9]$/,
  city: /^[a-zA-Z ]{3,20}$/,
  phone: /^01[1502][0-9]{8}$/,
  email: /^[A-Za-z]{2,8}@[a-zA-Z]{2,8}\.(com|org)$/,
  imgFig: /^.{1,}\.(png|jpg)$/,
  date: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
};
allInputs.forEach((e) => {
  e.addEventListener("input", (i) => {
    if (e.id == "name") {
      validationInputs(i.target);
    } else if (e.id == "age") {
      validationInputs(i.target);
    } else if (e.id == "city") {
      validationInputs(i.target);
    } else if (e.id == "email") {
      validationInputs(i.target);
    } else if (e.id == "phone") {
      validationInputs(i.target);
    } else if (e.id == "date") {
      validationInputs(i.target);
    }
  });
});

function validationInputs(e) {
  if (e.id == "imgFig") {
    console.log(e.getAttribute("src"));
    if (e.getAttribute("src") == "https://placehold.co/350x350") {
      console.log(e.src);
      imageFig.style.cssText = `
       border:2px solid red;
      `;
      return false;
    } else if (regexObj[e.id].test(e.getAttribute("src"))) {
      console.log(e.src);
      imageFig.style.cssText = `
      border:none;
     `;
      return true;
    } else {
      console.log(e.src);

      console.log(e.getAttribute("src"));
      imageFig.style.cssText = `
      border:2px solid red;
     `;
      return false;
    }
  }
  if (regexObj[e.id].test(e.value)) {
    e.classList.add("is-valid");
    e.classList.remove("is-invalid");
    return true;
  } else {
    e.classList.add("is-invalid");
    e.classList.remove("is-valid");
    return false;
  }
}
let arrayDataEmployee = localStorage.getItem("employees")
  ? JSON.parse(localStorage.getItem("employees"))
  : [];
displayEmployee();
// console.log(arrayDataEmployee)
addEmployee.addEventListener("click", addEmployeeData);
myModalEl.addEventListener("hidden.bs.modal", clearForms);

let changeImg = () => {
  console.log(image.files[0]?.name);
  imageFig.src = image.files[0]?.name
    ? `./img/${image.files[0]?.name}`
    : "https://placehold.co/350x350";
  imageFig.style.border = "none";
};
image.addEventListener("change", changeImg);
function addEmployeeData() {
  if (
    validationInputs(name) &&
    validationInputs(age) &&
    validationInputs(city) &&
    validationInputs(email) &&
    validationInputs(phone) &&
    validationInputs(date) &&
    validationInputs(imageFig)
  ) {
    console.log(image.files[0]?.name);
    const dataObj = {
      id: Date.now(),
      name: name.value,
      age: age.value,
      city: city.value,
      email: email.value,
      phone: phone.value,
      date: date.value,
      image: image.files[0]?.name
        ? `./img/${image.files[0]?.name}`
        : "https://placehold.co/350x350",
    };
    arrayDataEmployee.push(dataObj);
    localStorage.setItem("employees", JSON.stringify(arrayDataEmployee));
    displayEmployee();
    myModal.hide();
    clearForms();
    // console.log(dataObj);
  }
}

function displayEmployee(list = arrayDataEmployee) {
  let box = "";
  document.getElementById("bodyData").innerHTML = "";
  if (list.length != 0) {
    document.getElementById("h2-noData").classList.replace("d-block", "d-none");

    list.forEach((e, idx) => {
      box += `
      <tr>
      <td>${idx + 1}</td>
      <td><img class='imggg img-thumbnail' src=${e.image} /></td>
      <td>${e.nameHighLight ? e.nameHighLight : e.name}</td>
      <td>${e.ageHighLight ? e.ageHighLight : e.age}</td>
      <td>${e.city}</td>
      <td>${e.email}</td>
      <td>${e.phone}</td>
      <td>${e.date}</td>
      <td><button onclick='getTaskToUpdate(${e.id})' class='btn btn-danger'>Update</button></td>
      <td><button onclick='deleteEmployee(${e.id})' class='btn btn-warning'>Delete</button></td>
      </tr>
      `;
    });
    document.getElementById("bodyData").innerHTML = box;
  } else {
    document.getElementById("h2-noData").classList.replace("d-none", "d-block");
  }
}
let keySearch = "name";
select.addEventListener("change", (e) => {
  if (arrayDataEmployee.length == 0) {
    inputSearch.setAttribute("disabled", true);
  } else if (e.target.value) {
    inputSearch.removeAttribute("disabled");
    keySearch = e.target.value;
  }
});
inputSearch.addEventListener("input", (i) => {
  let arraySearch = [];
  const regex = new RegExp(i.target.value, "ig");
  arrayDataEmployee.forEach((e) => {
    // regex.test(e[keySearch]);
    // console.log();
    // e[keySearch].toLowerCase().includes(i.target.value.toLowerCase())
    if (regex.test(e[keySearch])) {
      e[keySearch + "HighLight"] = e[keySearch].replaceAll(
        regex,
        `<span class='text-danger'>${i.target.value.toUpperCase()}</span>`
      );
      arraySearch.push(e);
    }
  });
  displayEmployee(arraySearch);
});

function clearForms() {
  name.value = "";
  age.value = "";
  city.value = "";
  email.value = "";
  phone.value = "";
  date.value = "";
  name.classList.remove("is-valid");
  age.classList.remove("is-valid");
  phone.classList.remove("is-valid");
  email.classList.remove("is-valid");
  date.classList.remove("is-valid");
  city.classList.remove("is-valid");
  image.value = "";
  imageFig.src = "https://placehold.co/350x350";
}

function getTaskToUpdate(id) {
  updateEmployee.classList.replace("d-none", "d-block");
  addEmployee.classList.replace("d-block", "d-none");
  const employee = arrayDataEmployee.find((e) => {
    return e.id == id;
  });
  idForUpdate = id;
  name.value = employee.name;
  age.value = employee.age;
  city.value = employee.city;
  email.value = employee.email;
  phone.value = employee.phone;
  date.value = employee.date;
  // image = null;
  imageFig.src = employee.image;
  myModal.show();
}

updateEmployee.addEventListener("click", (e) => {
  if (
    validationInputs(name) &&
    validationInputs(age) &&
    validationInputs(city) &&
    validationInputs(email) &&
    validationInputs(phone) &&
    validationInputs(date) &&
    validationInputs(imageFig)
  ) {
    // console.log(image.files[0]?.name);
    const dataObj = {
      id: Date.now(),
      name: name.value,
      age: age.value,
      city: city.value,
      email: email.value,
      phone: phone.value,
      date: date.value,
      image: image.files[0]?.name ? `./img/${image.files[0]?.name}` : imageFig.getAttribute("src"),
    };
    // arrayDataEmployee.push(dataObj);
    const employee = arrayDataEmployee.find((e) => {
      return e.id == idForUpdate;
    });
    arrayDataEmployee = arrayDataEmployee.map((e) => {
      if (e.id == idForUpdate) {
        return { employee, ...dataObj };
      }
      return e;
    });
    localStorage.setItem("employees", JSON.stringify(arrayDataEmployee));
    updateEmployee.classList.replace("d-block", "d-none");
    addEmployee.classList.replace("d-none", "d-block");
    displayEmployee();
    clearForms();
    myModal.hide();
  }
});

function deleteEmployee(id) {
  arrayDataEmployee = arrayDataEmployee.filter((e) => {
    return e.id != id;
  });
  localStorage.setItem("employees", JSON.stringify(arrayDataEmployee));
  displayEmployee();
}
