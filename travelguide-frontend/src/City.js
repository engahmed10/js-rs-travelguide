
URL = `http://127.0.0.1:3000`



class City {

  static allcities=[]

   constructor(city){         
     this.city = city
    City.allcities.push(this.city)
   }


   ///render 
  renderCities(){  

     const{id,name,country,population,url,thingstodos} = this.city;
 
     let card = document.createElement('div')
     card.classList.add("card")
     card.setAttribute('data-id',id)
     card.innerHTML = this.renderHTML()
     city_collection.appendChild(card)
    
     card.addEventListener('click',(e)=>{
        e.preventDefault()
       
       
          if(e.target.id === 'thingstodo-city') {
               
               if (thingstodos.length == 0){
                  thingstodoForm.style.display = "block"; 
                  Thingstodo.newThingstodo(id)
                   
                }

                city_collection.style.display="none"
                form.style.display="none"
                newthings.disabled = false;
                updateForm.style.display='none'
                updateCityForm.style.display = "none"


               Thingstodo.makeObjectOfThingstodos(thingstodos)
               
              
          }
     })

    
 }

 static listenForUpdateAndDel=()=>{


 const updateCity = document.querySelector('.update-btn')

  city_collection.addEventListener("click",(e)=>{
      
       if(e.target.id === 'update-city'){
          
               updateCityForm.style.display = "block"
               form.style.display = "none"
              
               let parent = e.target.parentNode;
               const nameValue=parent.querySelector('.city-name').textContent
               const countryValue=parent.querySelector('.city-country').textContent
               const populationValue=parent.querySelector('.city-population').textContent
               const urlValue=parent.querySelector('.city-url').src

               updateCityForm.name.value= nameValue
               updateCityForm.country.value=countryValue
               updateCityForm.population.value=populationValue
               updateCityForm.url.value= urlValue
            
              let cityid = e.target.parentNode.getAttribute('data-id')
                   this.updatecity(cityid,parent)

         }

         if(e.target.id == 'del-city') {
            let city_id = e.target.parentNode.getAttribute('data-id')
            new ApiAjax(URL,'cities').fetchForDelete(city_id)
              e.target.parentNode.remove()
         }

})

}


 static updatecity=(id,parent)=>{

          const updateButton = document.querySelector("#city-update-btn")
          
          updateButton.addEventListener('click',(e)=>
          {
             e.preventDefault()
             
            
             let data = {
                    name: updateCityForm.name.value,
                    country: updateCityForm.country.value,
                    population: updateCityForm.population.value,
                    url: updateCityForm.url.value
               }
               
                  
               new ApiAjax(URL,'cities').fetchForUpdate(id,data).then(data=> 
                  
                  {  
                    let arr=[] 
                    arr.push(data)
                    this.makeObjectOfCities(arr)
                    parent.innerHTML=""
                    updateCityForm.name.value ="",
                    updateCityForm.country.value="",
                    updateCityForm.population.value=""
                    updateCityForm.url.value=""

               })
               .catch( error => alert(error))
          })
}


renderoncity=()=>{
     const{id,name,country,population,url} =this.city;
     let card = document.createElement('div')
     card.classList.add("card")
     card.setAttribute('data-id',id)
     card.innerHTML = this.renderHTML()
       city_collection.appendChild(card)
}

 static makeObjectOfCities=(data)=>{
     data.forEach(city => {
        let obj= new City(city)
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


///addd new city

static makeNewCity=()=>{

          form.addEventListener('submit', function(e) {
               e.preventDefault()

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

       
  ///html render
renderHTML = () => {
      const {url,name,country,population} = this.city
   return `
    <img class="city-url" src=${url} > 
    <button id="thingstodo-city" class="thingstodo-btn"" type="submit">See All Thingstodos</button>
    <h4 class="city-name"> ${name}</h4>
    <h5 class="city-country">${country}</h5>
    <h5 class="city-population">${population} </h5>
    <button id="del-city" class="del-btn" type="submit">delete</button>
    <button id="update-city" class="update-btn" type="submit">Update</button>
   `
}

}

