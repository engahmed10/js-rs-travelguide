const form = document.querySelector('#city-form')
const thingstodoForm = document.querySelector('#new-thingstodos-form')
const modal = document.querySelector('.modal') 
const citycard = document.querySelector('.city-thingstodo')  
const newthingsform = document.querySelector('#new-thingstodos-form')   
const updateBtn = document.querySelector('#update-things-btn')
const close = document.querySelector('.close')
const close1 = document.querySelector('.close1')
const nameOfCities = document.querySelector(".names-of-cities")
const updateForm =document.querySelector('#update-thingstodos-form')
const city_collection = document.querySelector('.city_collection')
const updateCityForm = document.querySelector('#city-update-form')
const cityCards = document.querySelector('.card')

document.addEventListener("DOMContentLoaded", function() {

City.promiseAllCities()
City.makeNewCity(form)
Thingstodo.closeTag()
Thingstodo.closeTag1()
Thingstodo.updatelisten()
Thingstodo.drowpdownCities()
Thingstodo.deleteThings()
Thingstodo.listentodropdown()


const newthings = document.querySelector('#add-thingstodo')
newthings.addEventListener('click', (e) => {
   modal.style.display="none"
   thingstodoForm.style.display = "block"; 
   let cityId= e.target.parentNode.getAttribute('data-city-id')
   Thingstodo.newThingstodo(cityId)
});


const updateCity = document.querySelector('.update-btn')
///update and delete city
city_collection.addEventListener("click",(e)=>{
      
       if(e.target.id === 'update-city'){
          
               updateCityForm.style.display = "block"
               form.style.display = "none"
              
               let parent = e.target.parentNode
               const nameValue=parent.querySelector('.city-name').textContent
               const countryValue=parent.querySelector('.city-country').textContent
               const populationValue=parent.querySelector('.city-population').textContent
               const urlValue=parent.querySelector('.city-url').src

               updateCityForm.name.value= nameValue
               updateCityForm.country.value=countryValue
               updateCityForm.population.value=populationValue
               updateCityForm.url.value= urlValue
            
              let cityid = e.target.parentNode.getAttribute('data-id')
                    new City().updatecity(cityid,parent)

         }

         if(e.target.id == 'del-city') {
            let city_id = e.target.parentNode.getAttribute('data-id')
            new ApiAjax(URL,'cities').fetchForDelete(city_id)
              e.target.parentNode.remove()
         }

})

})