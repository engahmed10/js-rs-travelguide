URL = `http://127.0.0.1:3000`

class Thingstodo { 


   static arrayofcities =[]

   constructor(thingstodo){
       
       this.thingstodo = thingstodo;
       Thingstodo.arrayofcities.push(this.thingstodo)
      
   }


    static drowpdownCities=()=>
     { 
        new ApiAjax(URL,'cities').fetchAll().then(data => {
            data.forEach(city => {
               const div = document.createElement('div')
               div.classList.add("city")
               let a = `<a class="city-name" > ${city.name}</a>`
               div.setAttribute('dropdown-id', `${city.id}`)
               div.innerHTML += a
               nameOfCities.appendChild(div)
                           
            })
        }) 
    }  

static listentodropdown=()=>{
      
      new ApiAjax(URL,'cities').fetchAll().then(data => {
         data.forEach(city => {
           nameOfCities.addEventListener('click', (e) => {
                  e.preventDefault()
                  const citydropdownName = e.target.textContent.trim()
              
                if( citydropdownName == city.name)

                {   
                   city_collection.style.display="none"
                   form.style.display="none"
                   this.makeObjectOfThingstodos(city.thingstodos)
                  
                }
                 if (document.querySelector('#delete-thingstodo') != null ){
                   document.querySelector('#delete-thingstodo').remove()
                   document.querySelector('#update-thingstodo').remove()
                   }
                   newthings.disabled = true;

  
           })
  

         })
      })
}


renderThingstodos=()=> {
   
      const {id,name,description,city_id} =  this.thingstodo ;
       citycard.setAttribute('data-city-id',city_id)
       modal.style.display="block"
       const div = document.createElement('div')
       div.classList.add('thingsToDo') 
       div.setAttribute('data-thingstodo-id', id)
       div.innerHTML += this.renderInnerHtml()
       citycard.appendChild(div)  
       thingstodoForm.style.display = "none"; 

 }


///delete
static deleteThingstodo=(id)=>{
     return new ApiAjax(URL,'thingstodos').fetchForDelete(id)
}

static deleteThings(){

    modal.addEventListener('click',(e)=>{
        if (e.target.id =="delete-thingstodo"){
           let id=e.target.parentElement.getAttribute('data-id')
           this.deleteThingstodo(id)
            e.target.parentElement.parentElement.remove()
        }
    } )
}

static closeTag1=()=>{
 close1.addEventListener('click', (e) => {

         e.preventDefault()
         thingstodoForm.style.display = "none"; 
           const firstChild =citycard.firstElementChild

         citycard.innerHTML=""
         citycard.appendChild(firstChild)

         city_collection.style.display="block"
         form.style.display="block"
         modal.style.display="none"

         city_collection.innerHTML=""
         City.promiseAllCities()
 })

}
static closeTag=()=>{
   
      close.addEventListener('click', (e) => {
        e.preventDefault()

         const firstChild =citycard.firstElementChild
         citycard.innerHTML=""
         citycard.appendChild(firstChild)

         city_collection.style.display="block"
         form.style.display="block"
         modal.style.display="none"

         city_collection.innerHTML=""
         City.promiseAllCities()

      })
}


static makeObjectOfThingstodos=(data)=>{
     data.forEach( thingstodo => {
          console.log(`thingss`,thingstodo)
        let obj= new Thingstodo(thingstodo)
        console.log(`obj`,obj)
        obj.renderThingstodos()

     })
}



static newThingstodo=(city_id)=>{
   newthingsform.addEventListener('submit',(e)=>{
      e.preventDefault()
       let data = {
            name: newthingsform.name.value,
            description: newthingsform.description.value,
            city_id: city_id
                 }
         return new ApiAjax(URL,'thingstodos').fetchForCreate(data).then(data => {
         let array=[]
         array.push(data)
         this.makeObjectOfThingstodos(array)
         newthingsform.name.value=""
         newthingsform.description.value=""

       })
   })
}

///update
static updatelisten=()=>{
   citycard.addEventListener("click",(e)=>{
      e.preventDefault()
      if(e.target.id == "update-thingstodo"){
         updateForm.style.display = "block"
         modal.style.display = "none"
         let  cityId=e.target.parentElement.parentElement.parentElement.getAttribute('data-city-id')
         let parent = e.target.parentElement
         let id=e.target.parentElement.getAttribute('data-id')
         this.updateThingstodo(parent,cityId,id)
      }
   })
}


//update 
static updateThingstodo=(parent,cityId,id)=>{
        
        const nameValue = parent.querySelector('.things-name').textContent
        const descriptionValue = parent.querySelector('.things-description').textContent
        
        updateForm.name.value = nameValue
        updateForm.description.value = descriptionValue
    
    updateBtn.addEventListener('click', (e) =>  {
      e.preventDefault()

        let data = {
            name: updateForm.name.value,
            description: updateForm.description.value,
            city_id: cityId
        } 
      new ApiAjax(URL,'thingstodos').fetchForUpdate(id,data).then(data => {
         let obj= new Thingstodo(data)
         obj.renderThingstodos()
         parent.parentElement.remove()
         updateForm.name.value=""
         updateForm.description.value=""
         cityId=""
         updateForm.style.display = "none"

       })
    })
 }

static newThingsToDos=()=> {
   newthings.addEventListener('click', (e) => {
      e.preventDefault()
         modal.style.display="none"
         thingstodoForm.style.display = "block"; 
         let cityId= e.target.parentNode.getAttribute('data-city-id')
         this.newThingstodo(cityId)
   });
}

renderInnerHtml= () => {

    const {id,name,description,city_id} =  this.thingstodo 
    let thingstod
    return thingstod = `
      <br><div data-id=${id}>
      <h4 class="things-name" > ${name}</h4><br>
      <h5 class="things-description" data-id=${id}>${description} </h5>
      <button id="delete-thingstodo" class="add-del-btn" type="submit">Delete</button>
      <button id="update-thingstodo" class="add-update-btn" type="submit">Update</button>
      </div><br><br>
   `
 }
}
