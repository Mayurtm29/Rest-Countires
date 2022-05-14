//elements
const countries = document.querySelector(".countries");
const dropdown = document.querySelector(".drop");
const fliter = document.querySelector(".filter");
const downArrow = document.querySelector(".down-arrow");
const region = document.querySelectorAll(".region");
const regionName = document.getElementsByClassName("region-name");
const search = document.querySelector(".search");
const countryName = document.getElementsByClassName("country-name");
const toggle = document.querySelectorAll(".toggle");
const toggleDark = document.querySelector(".toggle-dark");
const toggleLight = document.querySelector(".toggle-light");
const back = document.querySelector(".back");
const countryModal = document.querySelector(".country-modal");
const modal = document.querySelector(".modal");
const first = document.querySelector(".first");

const getCountry = async function () {
  try {
    const res = await fetch(`https://restcountries.com/v2/all`);
    const data = await res.json();
    console.log(data);
    countries.innerHTML = "";
    data.forEach((element) => {
      renderCountry(element);
    });
  } catch (err) {
    countries.innerHTML = `<h1 style="color:red;margin:auto"> ${err.message}</h1>`;
  }
};

const renderCountry = function (data) {
  const country = document.createElement("div");
  country.classList.add("country");
  //prettier-ignore
  country.innerHTML=`  
    <div class="">
        <div class="country-img">
            <img src="${data.flags.png}" alt="country-img">
        </div>
        <div class="country-info">
            <h2 class="country-name">${data.name}</h2>
            <p><strong>Population : </strong>${Intl.NumberFormat(data.alpha3Code, {style: 'decimal'}).format(data.population) }</p>
            <p class="region-name"><strong>Region : </strong>${data.region}</p>
            <p><strong>Capital : </strong>${data.capital? data.capital: "None"}</p>
        </div>
    </div>`;
  countries.appendChild(country);
  country.addEventListener("click", () => {
    showCountryDeatils(data);
  });
};

getCountry();

fliter.addEventListener("click", () => {
  dropdown.classList.toggle("show-drop-down");
  downArrow.classList.toggle("fa-chevron-up");
});

region.forEach((elem) => {
  elem.addEventListener("click", () => {
    sort(regionName, elem);
    dropdown.classList.toggle("show-drop-down");
    downArrow.classList.toggle("fa-chevron-up");
  });
});

/**
 * filer by region function
 */

const sort = function (region, element) {
  Array.from(region).forEach((ele) => {
    if (
      ele.innerText.toLowerCase().includes(element.innerText.toLowerCase()) ||
      element.innerText == "All"
    ) {
      ele.parentElement.parentElement.parentElement.style.display = "grid";
    } else {
      ele.parentElement.parentElement.parentElement.style.display = "none";
    }
  });
};

search.addEventListener("input", () => {
  Array.from(countryName).forEach((ele) => {
    if (ele.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      ele.parentElement.parentElement.parentElement.style.display = "grid";
    } else {
      ele.parentElement.parentElement.parentElement.style.display = "none";
    }
  });
});
// dark mode
toggle.forEach((ele) => {
  ele.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleDark.classList.toggle("color-theme-btn");
    toggleLight.classList.toggle("color-theme-btn");
  });
});
//modal
back.addEventListener("click", () => {
  countryModal.classList.toggle("show");
    first.classList.toggle("firstcon");
  document.body.classList.toggle("second");
});

const showCountryDeatils = function (data) {
  countryModal.classList.toggle("show");
  first.classList.toggle("firstcon");
  document.body.classList.toggle("second");
  if (data.name == "Antarctica")
    return (modal.innerHTML = `<h1 style="color:red;margin-inline:auto">Not Found</h1>`);
  //prettier-ignore
  modal.innerHTML=`
  <div class="left-modal">
    <img src="${data.flags.png}"alt="country-img">
  </div>
  <div class="right-modal">
    <h1>${data.name}</h1>
    <div class="modal-info">
      <div class="modal-info-left">
        <p><strong>Narive Name : </strong>${data.nativeName}</p>
        <p><strong>Population : </strong>${Intl.NumberFormat(data.alpha3Code, {style: 'decimal'}).format(data.population)  }</p>
        <p><strong>Region : </strong>${data.region}</p>
        <p><strong>Sub-region : </strong>${data.subregion}</p>
        <p><strong>Capital : </strong>${data.capital? data.capital: "None"}</p>
      </div>
      <div class="modal-info-right">
        <p><strong>Top Level Domain : </strong>${data.topLevelDomain}</p>
        <p><strong>Currencies : </strong>${data.currencies[0].name}( ${data.currencies[0].symbol} )</p>
        <p><strong>Languages : </strong>${data.languages.map(ele=>ele.name)}</p>
      </div>
    </div>
    <div class="borders">
    <p><strong>Border Countries :</strong> </p>
    <div class="border">
    ${data.borders? data.borders.map((ele) => `<p class="brcountries"> ${ele}</p>`).join(""):"No borders"}
       
    </div>
</div
  </div>
  `
};
