URL = `http://127.0.0.1:3000`
const city_collection = document.querySelector('.city_collection')
const form = document.querySelector('#city-form')

class City {
  static allcity=[]

   constructor(city){         
        this.city = city
        
   }

 

  static allCity(){
     return this.allcity;
 }

   ///render and del and update
   renderCities(){  
        const{id,name,country,population,url} =this.city

     let card = document.createElement('div')
     card.classList.add("card")
     card.setAttribute('data-id',id)
     card.innerHTML = this.renderHTML()
     city_collection.appendChild(card)
     

     card.addEventListener('click',(e)=>{
          e.preventDefault()
          if(e.target.id === 'del-city')
          {
               e.preventDefault()
               new ApiAjax(URL).fetchForDelete(id)
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
               form.name.value= nameValue
               form.country.value=countryValue
               form.population.value=populationValue
               form.url.value= urlValue
               
          }
          const updateButton = document.querySelector("#city-btn")
          updateButton.addEventListener('click',(e)=>
          {
               e.preventDefault()
             let data={
                    name: form.name.value,
                    country: form.country.value,
                    population: form.population.value,
                    url: form.url.value
               }
             
              new ApiAjax(URL,'cities').fetchForUpdate(id,data).then(() => location.reload())


          })
     })
           
    
   }


  static makeObjectOfCities=(data)=>{
     data.forEach(city => {
        let obj= new City(city)
        this.allcity.push(obj)
        obj.renderCities()
        return obj
     })
    }

   static promiseAllCities(){
    let api=new ApiAjax(URL,'cities')
     api.fetchAll().then(data=>{
       this.makeObjectOfCities(data)
      
     })
   }

  
  ///html render
 renderHTML = () => {
      const {url,name,country,population} = this.city
   return `
    <img class="city-url" src=${url} > 
    <h4 class="city-name"> ${name}</h4>
    <h5 class="city-country">${country}</h5>
    <h5 class="city-population">${population} </h5>
    <button id="del-city" class="del-btn" type="submit">delete</button>
    <button id="update-city" class="update-btn" type="submit">Update</button>
   `
  }

  ///addd new city

static makeNewCity=(form)=>{
form.addEventListener('submit', function(e) {
     e.preventDefault()
     console.log('button pushed')
     let data = {
         name: form.name.value,
         country: form.country.value,
         population: form.population.value,
         url: form.url.value
     };
 
     new ApiAjax(URL,'cities').fetchForCreate(data).then(data => {
         let arr=[] 
         arr.push(data)
           City.makeObjectOfCities(arr)
 
         })
 })
}
  
}



