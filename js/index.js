document.addEventListener("DOMContentLoaded", function () {
  const houseSelect = document.querySelector(".house");
  const apartmentSelect = document.querySelector(".apartment");
  const personSelect = document.querySelector(".person");
  const button = document.querySelector(".button");
  const list = document.querySelector(".list");
  const numberApartment = document.querySelector(".numberApartment");
  const namePerson = document.querySelector(".namePerson");

  let dataHouse = [];
  let dataApartment = [];
  let dataPerson = [];

  button.disabled = true;

  async function getData() {
    const houses = "houses.json";
    const resHouse = await fetch(houses);
    dataHouse = await resHouse.json();

    const apartments = "apartments.json";
    const resApartment = await fetch(apartments);
    dataApartment = await resApartment.json();

    const persons = "persons.json";
    const resPerson = await fetch(persons);
    dataPerson = await resPerson.json();

    createOptions();
  }
  getData();

  const createOptions = () => {
    dataHouse.forEach((item) => {
      let house = document.createElement("option");
      house.setAttribute("value", item.id);
      house.textContent = item.name;
      houseSelect.append(house);
    });

    dataApartment.forEach((item) => {
      if (houseSelect.value == item.hid) {
        let apartment = document.createElement("option");
        apartment.setAttribute("class", "ap");
        apartment.setAttribute("id", item.id);
        apartment.textContent =
          houseSelect.options[houseSelect.selectedIndex].text + ", " + item.name;
        apartmentSelect.append(apartment);
      }
    });

    dataPerson.forEach((item) => {
      let person = document.createElement("option");
      person.textContent = item.name;
      person.setAttribute("class", "p");
      person.setAttribute("id", item.aid);
      personSelect.append(person);
    });
  };

  numberApartment.addEventListener("change", () => {
    namePerson.value = "";
    let human = document.querySelectorAll(".p");
    human.forEach((item) => {
      item.remove();
    });
    let place = document.querySelectorAll(".ap");
    place.forEach((element) => {
      dataPerson.forEach((item) => {
        if (element.id == item.aid && numberApartment.value == element.value) {
          let person = document.createElement("option");
          person.textContent = item.name;
          person.setAttribute("class", "p");
          person.setAttribute("id", item.aid);
          personSelect.append(person);
        }
      });
    });
  });

  houseSelect.addEventListener("change", () => {
    numberApartment.value = "";
    let ap = document.querySelectorAll(".ap");
    ap.forEach((apartment) => {
      apartment.remove();
    });
    dataApartment.forEach((element) => {
      if (houseSelect.value == element.hid) {
        let apartment = document.createElement("option");
        apartment.setAttribute("class", "ap");
        apartment.setAttribute("id", element.id);
        apartment.textContent =
          houseSelect.options[houseSelect.selectedIndex].text + ", " + element.name;
        apartmentSelect.append(apartment);
      }
    });
    namePerson.value = "";
    let human = document.querySelectorAll(".p");
    human.forEach((item) => {
      item.remove();
    });
    let place = document.querySelectorAll(".ap");
    place.forEach((element) => {
      dataPerson.forEach((item) => {
        if (element.id == item.aid) {
          let person = document.createElement("option");
          person.textContent = item.name;
          person.setAttribute("class", "p");
          person.setAttribute("id", item.aid);
          personSelect.append(person);
        }
      });
    });
  });

  const buttonUnlocked = () => {
    houseSelect.addEventListener("change", () => {
      button.disabled = true;
    });
    numberApartment.addEventListener("change", () => {
      button.disabled = true;
      namePerson.addEventListener("change", () => {
        button.disabled = true;
        if (numberApartment.value != "" && namePerson.value != "") {
          button.disabled = false;
        }
      });
    });
  };
  buttonUnlocked();

  button.addEventListener("click", (event) => {
    event.preventDefault();
    let listPoint = document.createElement("li");
    listPoint.textContent =
      "{house: " +
      houseSelect.options[houseSelect.selectedIndex].text +
      ", apartment: "+
      numberApartment.value.slice(-5) +
      ", person: "+
      namePerson.value + "}";
    list.append(listPoint);
  });
});
