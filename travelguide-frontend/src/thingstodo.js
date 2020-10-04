URL = `http://127.0.0.1:3000`
console.log('thingstodo')
class Thingstodo{
    constructor(){

    }
  
  static drowpdownCiteis=()=>
  {
   //  const  nameOfCities = document.querySelector(".names-of-cities")
    new ApiAjax(URL,'cities').fetchAllCities().then(data=>{
      data.forEach(el => {
            const div = document.createElement('div')
            div.classList.add("city")
            let a = `<a class="city-name" > ${el.name}</a>`
            div.setAttribute('data-id', `${el.id}`)
            div.innerHTML += a
            const nameOfCities = document.querySelector(".names-of-cities")
            nameOfCities.appendChild(div)


        })
    })
  }
    
}
Thingstodo.drowpdownCiteis()