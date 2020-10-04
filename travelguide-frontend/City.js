URL = `http://127.0.0.1:3000`
const city_collection = document.querySelector('.city_collection')
class City {

   constructor(city){         
        this.city = city
   }

   ///render and del and update
  renderCities(){  
     let card = document.createElement('div')
     card.classList.add("card")
     card.setAttribute('data-id',this.city.id)
     card.innerHTML = this.renderHTML(this.city)
     city_collection.appendChild(card)

     card.addEventListener('click',(e)=>{
          e.preventDefault()
          if(e.target.id === 'del-city')
          {
               e.preventDefault()
               new ApiAjax(URL).fetchForDelete(this.city.id)
               e.target.parentNode.remove()
          }

          if(e.target.id=== 'update-city')
          {
               e.preventDefault()

               //find parent 
               let parent =e.target.parentElement
               const nameValue=parent.querySelector('.city-name').textContent
               const countryValue=parent.querySelector('.city-country').textContent
               const populationValue=parent.querySelector('.city-population').textContent
               const urlValue=parent.querySelector('.city-url').src
               const form = document.querySelector('#city-form')
               form.name.value= nameValue
               form.country.value=countryValue
               form.population.value=populationValue
               form.url.value= urlValue
               
          }
     })
           

   }

     


  static makeObjectOfCities=(data)=>{
     data.forEach(city => {
        new City(city).renderCities()
     })
    }

   static promiseAllCities(){
    let api=new ApiAjax(URL)
     api.fetchAllCities().then(data=>{
       this.makeObjectOfCities(data)
     })
   }

  ///html render
 renderHTML = (element) => {
   return `
    <img class="city-url" src=${element.url} > 
    <h4 class="city-name"> ${element.name}</h4>
    <h5 class="city-country">${element.country}</h5>
    <h5 class="city-population">${element.population} </h5>
    <button id="del-city" class="del-btn" type="submit">delete</button>
    <button id="update-city" class="update-btn" type="submit">Update</button>
   `
  }
  
}


City.promiseAllCities()

