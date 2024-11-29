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
// console.log(name, age, city, email, phone, image, date);
const regexObj = {
  name: /^[a-zA-Z ]{3,20}$/,
  age: /^[1-9][0-9]$/,
  city: /^[a-zA-Z]{3,20}$/,
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
    if (e.getAttribute("src") == "https://placehold.co/350x350") {
      imageFig.style.cssText = `
       border:2px solid red;
      `;
      return false;
    } else if (regexObj[e.id].test(e.getAttribute("src"))) {
      // console.log(e.src);
      console.log(e.src);
      imageFig.style.cssText = `
      border:none;
     `;
      return true;
    } else {
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
let arrayDataEmployee = [];
addEmployee.addEventListener("click", addEmployeeData);
myModalEl.addEventListener("hidden.bs.modal", clearForms);

let changeImg = () => {
  imageFig.src = image.files[0]?.name
    ? `./img/${image.files[0]?.name}`
    : "https://placehold.co/350x350";
  // console.log("Edhm")
  imageFig.style.border = "none";
};
image.addEventListener("change", changeImg);
function addEmployeeData() {
  // console.log(date.value);
  if (
    validationInputs(name) &&
    validationInputs(age) &&
    validationInputs(city) &&
    validationInputs(email) &&
    validationInputs(phone) &&
    validationInputs(date) &&
    validationInputs(imageFig)
  ) {
    const dataObj = {
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
    displayEmployee();
    myModal.hide();
    console.log(dataObj);
  }
}

function displayEmployee() {
  let box = "";
  arrayDataEmployee.forEach((e, idx) => {
    box += `
    <tr>
    <td>${idx + 1}</td>
    <td><img class='imggg img-thumbnail' src=${e.image} /></td>
    <td>${e.name}</td>
    <td>${e.age}</td>
    <td>${e.city}</td>
    <td>${e.email}</td>
    <td>${e.phone}</td>
    <td>${e.date}</td>
    <td><button class='btn btn-danger'>Update</button></td>
    <td><button class='btn btn-warning'>Delete</button></td>
    </tr>
    `;
  });
  document.getElementById("bodyData").innerHTML = box;
}

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
  // image.src = "https://placehold.co/350x350";
  imageFig.src = "https://placehold.co/350x350";
}
