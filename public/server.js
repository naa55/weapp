const form = document.getElementById("form");
const country = document.querySelector("#country");
const town = document.querySelector(".town");
const output = document.querySelector(".output");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (country.value === "") {
    alert("Add country or town");
  } else {
    addDom(country.value);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let datas;
  if (localStorage.getItem("tasks") === null) {
    datas = [];
  } else {
    datas = JSON.parse(localStorage.getItem("tasks"));
  }

  datas.forEach((task) => {
    output.innerHTML = ` <div class="showcase">
    <h1>${task.name}, ${task.sys.country}</h1>
    <h2>${task.weather[0].description}</h2>
    <img src="https://openweathermap.org/img/wn/${
      task.weather[0].icon
    }@2x.png" alt="">
    <p>lat: ${task.coord.lat} , lon: ${task.coord.lon}</p>
    <p>temp_min: ${Math.floor(task.main.temp_min)} - temp_max:  ${Math.floor(
      task.main.temp_max
    )}</p>
    <p><i class="fad fa-dewpoint"></i>${task.main.humidity}</p>

    <div class="head">
      <div class="heads">
        <p>
        ${task.main.temp}
          <img
            src="./images/degree9.png"
            alt=""
            height="50px"
            width="50px"
          />
        </p>
      </div>
    </div>  `;
  });
});

function addDom(datas) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${datas}&units=metric&appid=3ee203ed6039a3eba2a609b8df7a3d5b`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(data);
      if (data) {
        output.innerHTML = `
       <div class="showcase">
        <h1>${data.name}, ${data.sys.country}</h1>
        <h2>${data.weather[0].description}</h2>
        <img src="https://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" alt="">
         <p>lat: ${data.coord.lat} , lon:${data.coord.lon}</p>
         <p>temp_min: ${Math.floor(data.main.temp_min)} - temp_max:${Math.floor(
          data.main.temp_max
        )}</p>
        <p>Humidity: ${data.main.humidity}</p>
        <div class="head">
          <div class="heads">
            <p>
                     ${data.main.temp}

              <img
                src="./images/degree9.png"
                alt=""
                height="50px"
                width="50px"
              />
            </p>
          </div>
        </div>`;
      }
      country.value = "";
      addLocatStorage(data);
    })
    .catch((err) => console.log(err));
}

function addLocatStorage(data) {
  let datas;
  if (localStorage.getItem("tasks") === null) {
    datas = [];
  } else {
    datas = JSON.parse(localStorage.getItem("tasks"));
  }
  datas.push(data);
  localStorage.setItem("tasks", JSON.stringify(datas));
}
