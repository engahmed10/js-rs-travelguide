document.addEventListener("DOMContentLoaded", function() {
City.promiseAllCities()
City.makeNewCity(form)
  Thingstodo.drowpdownCities()
  Thingstodo.promiseAllThingstodos() 
  //new Thingstodo().newThingstodo()

const thingstodoForm = document.querySelector('#new-thingstodos-form')

const newthings = document.querySelector('.add-new-thingstodo')
newthings.addEventListener('click', (e) => {
   e.preventDefault()
    console.log(e.target)
 thingstodoForm.style.display = "block";

});

         const dropdown = document.querySelector('.dropdown-elements')

dropdown.addEventListener('click',  (e) => {
  e.preventDefault()
  city_id = e.target.parentNode.getAttribute('dropdown-id')
  console.log(`inside dropdown city id`,city_id)
   thingstodoForm.addEventListener("submit", (e) => {
         e.preventDefault()        
       
           
           new Thingstodo().newThingstodo(city_id)
     })     
 }) 


//})

//const dropdown = document.querySelector('.dropdown-elements')

//dropdown.addEventListener('click',  (e) => {
 //   e.preventDefault()
 // city_id = e.target.parentNode.getAttribute('dropdown-id')
  
 //    new Fake().newThingstodo(city_id)
 
//})



})