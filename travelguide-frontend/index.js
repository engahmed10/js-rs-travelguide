document.addEventListener("DOMContentLoaded", function() {
City.promiseAllCities()
City.makeNewCity(form)
  Thingstodo.drowpdownCities()
  Thingstodo.promiseAllThingstodos() 

const thingstodoForm = document.querySelector('#new-thingstodos-form')

const newthings = document.querySelector('#add-new-thingstodo')
newthings.addEventListener('click', (e) => {
   e.preventDefault()
   modal.style.display="none"
   thingstodoForm.style.display = "block";
   
});

const dropdown = document.querySelector('.dropdown-elements')

dropdown.addEventListener('click',  (e) => {
  e.preventDefault()
  city_id = e.target.parentNode.getAttribute('dropdown-id')
   Thingstodo.closeTag1()
   thingstodoForm.addEventListener("submit", (e) => {
         e.preventDefault()        
           new Thingstodo().newThingstodo(city_id)
     })     
 }) 

})