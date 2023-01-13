const wrapr = document.querySelector(".wrapper"),
  inputPart = wrapr.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input");
  locationBtn = inputPart.querySelector("button");
  icn = document.querySelector(".weather-part img");
  arrowBack = document.querySelector("header i");
  let api;

  inputField.addEventListener("keyup", (e) => {

if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }

});

locationBtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);

    }else{
        alert("You are alien my bro...Sorry!!!");
    }
});

function onSuccess(position){
    const{latitude,longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=50a7aa80fa492fa92e874d23ad061374`
    fetchData();
}

function onError(error){
    infoTxt.innerHTML = error.message;
    infoTxt.classList.add("error");

}



function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=50a7aa80fa492fa92e874d23ad061374`;
  fetchData();

}

function fetchData(){
    infoTxt.innerHTML = "Getting info...";
    infoTxt.classList.add("pending"); 
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));

}

function weatherDetails(info) {

    infoTxt.classList.replace("pending","error");
    if(info.cod=='404'){
        infoTxt.innerHTML = `"${inputField.value}" ye kon si duniya hai bhaiii...`;
    }
    else{

        const city = info.name;
        const country = info.sys.country;
        const {description,id} = info.weather[0];
        const {feels_like,humidity,temp } = info.main;

        if(id==800){
            icn.src = "./img/sun.svg.png";
        }else if(id >=200 && id<=232){
            icn.src = "./img/storm.svg.png"
        }else if(id >=600 && id<=622){
            icn.src = "./img/snow.svg.png"
        }else if(id >=701 && id<=781){
            icn.src = "./img/cloudy.svg.png"
        }else if((id >=300 && id<=321 ) || (id >=500 && id<=531 )){
            icn.src = "./img/cloudy.svg.png"
        }else if(id >=801 && id<=804 ){
            icn.src = "./img/rain.svg.png"
        }

        //pass values in html ele.
        wrapr.querySelector(".temp .numb" ).innerHTML = Math.floor(temp);
        wrapr.querySelector(".weather" ).innerHTML = description;
        wrapr.querySelector(".location span" ).innerHTML = `${city}, ${country}`;
        wrapr.querySelector(".temp .numb-2" ).innerHTML = Math.floor(feels_like);
        wrapr.querySelector(".humidity span" ).innerHTML = `${humidity}%`;


        infoTxt.classList.remove("pending","error");
        wrapr.classList.add("active");
    }
  console.log(info);

}

arrowBack.addEventListener("click",() =>{
    wrapr.classList.remove("active");
})