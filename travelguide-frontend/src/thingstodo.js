URL = `http://127.0.0.1:3000`
const nameOfCities = document.querySelector(".names-of-cities")
const modal = document.getElementById('modal')
const thingstodoForm = document.querySelector('#new-thingstodos-form')
const addnewthingslink = document.querySelector(".add-new-thingstodo")
const modalcard  =document.querySelector('.modalcard')

class Thingstodo{

    constructor(thingstodo){
        this.thingstodo=thingstodo;
    }


   static promiseAllThingstodos(){
    let api=new ApiAjax(URL,'thingstodos')
     api.fetchAll().then(thingstodo=>{
       this.makeObjectOfThingstodos(thingstodo)
     })
   }

  static makeObjectOfThingstodos=(data)=>{
     data.forEach( thingstodo => {
       let obj= new Thingstodo(thingstodo)
      
        obj.renderThingstodo()
     })
    }


   
  static drowpdownCities=()=>
  { 

    //for(const i in City.allCity() ) //City.allCity loop not works in 
    //vscode but works in browser
    // {
    //    console.log(i)
    // }
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

renderThingstodo =()=>{
     
const {id,name,description,city_id} =  this.thingstodo ;
const dropdown = document.querySelector('.dropdown-elements')
nameOfCities.addEventListener('click', (e) => {

      e.preventDefault()

         modal.style.display = "flex"
         modal.style.padding = '3em';
         form.style.display = "none"

         let cityDropDownId = e.target.parentElement.getAttribute('dropdown-id')            
         const div = document.createElement('div')
      
   if (cityDropDownId == city_id) {   

      modalcard.setAttribute('modalcard-id', `${city_id}`)
      div.classList.add('thingsToDo') 
      div.setAttribute('data-thingstodo-id', id)
      div.innerHTML += this.renderInnerHtml()
      modalcard.appendChild(div)
      //modal.appendChild(div)
         // this.newThingstodo(city_id)
      city_collection.style.display = "none"
      div.addEventListener('click', (e) => { 
         e.preventDefault()    
         
         if (e.target.id === 'delete-thingstodo') {

            this.deleteThingstodo()
            e.target.parentNode.remove()

         }

            let parent = e.target.parentNode
         if (e.target.id === 'update-thingstodo'){

               thingstodoForm.style.display="block"
               modal.style.display = "none"
               thingstodoForm.style.margin= "9em";
                 Thingstodo.closeTag1()
               this.updateThingstodo(parent) 
               
         } 

      })

   Thingstodo.closeTag(div)
   }         

 })
        
 }

static closeTag=(div)=>{
   
   const close = document.querySelector('.close')
      close.addEventListener('click', (e) => {
         console.log('inside')
         e.preventDefault()
         div.remove()
         modal.style.display = "none"
         city_collection.style.display = "block"
         form.style.display = "block"
         thingstodoForm.style.display="none"
      })
}



static closeTag1=()=>{

    
   const close = document.querySelector('.close1')
      close.addEventListener('click', (e) => {
           e.preventDefault()
           location.reload()
      })
}


///delete
deleteThingstodo=()=>{
 const {id,name,description,city_id} =  this.thingstodo  

      new ApiAjax(URL,'thingstodos').fetchForDelete(id).then(() => location.reload())
}

///update 
updateThingstodo=(parent)=>{
const {id,name,description,city_id} =  this.thingstodo  
   
   const nameValue = parent.querySelector('.things-name').textContent
   const descriptionValue = parent.querySelector('.things-description').textContent
   thingstodoForm.name.value = nameValue
   thingstodoForm.description.value = descriptionValue
   const submitbtn = document.querySelector('#new-things-btn')
  
  submitbtn.addEventListener('click', (e) => {
    e.preventDefault()
     let data = {
            name: thingstodoForm.name.value,
            description: thingstodoForm.description.value,
            city_id: city_id
      }
      new ApiAjax(URL,'thingstodos').fetchForUpdate(id,data).then(() => location.reload())
   })
}


newThingstodo=(city_id)=>{
        
         this.addNewThingstodo(city_id).then(data => {
               let obj= new Thingstodo(data)
               obj.renderonethings()
               // let makearray=[]
                  // makearray.push(data)   
                  // Thingstodo.makeObjectOfThingstodos(makearray)                        
         })
}

renderonethings=()=>{
   const {id,name,description,city_id} =  this.thingstodo ;
      const modalCardById  = modal.querySelector(`div[modalcard-id="${city_id}"]`)
            const div = document.createElement('div')
            div.classList.add('thingsToDo') 
            div.setAttribute('data-thingstodo-id', id)
            div.innerHTML += this.renderInnerHtml()
       const dropdown = document.querySelector('.dropdown-elements')
      modalCardById.appendChild(div)
}

//adding new thingstodo 
 addNewThingstodo=(city_id)=>{
  
        let data = {
            name: thingstodoForm.name.value,
            description: thingstodoForm.description.value,
            city_id: city_id
         }

        return  new ApiAjax(URL,'thingstodos').fetchForCreate(data).then(() => location.reload())
 } 

  renderInnerHtml= () => {
      const {id,name,description,city_id} =  this.thingstodo 
    let thingstod
    return thingstod = `
      <br><div data-id=${id}>
      <h4 class="things-name" > ${name}</h4><br>
      <h5 class="things-description" data-id=${id}>${description} </h5>
      <button id="delete-thingstodo" class="add-btn" type="submit">Delete</button>
      <button id="update-thingstodo" class="add-btn" type="submit">Update</button>
      </div><br><br>
   `
 }

}