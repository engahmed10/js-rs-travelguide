URL = `http://127.0.0.1:3000`
const nameOfCities = document.querySelector(".names-of-cities")
const modal = document.getElementById('modal')
console.log(`modal`,modal)
const thingstodoForm = document.querySelector('#new-thingstodos-form')
const addnewthingslink = document.querySelector(".add-new-thingstodo")


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
       // this.allcity.push(obj)
      // console.log(`obj`,obj)
        obj.renderThingstodo()
        //return obj
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
    nameOfCities.addEventListener('click', (e) => {
        e.preventDefault()

         modal.style.display = "flex"
         modal.style.padding = '3em';
         let cityDropDownId = e.target.parentElement.getAttribute('dropdown-id')            
          const div = document.createElement('div')
       if (cityDropDownId == city_id) {   
            console.log("ahmed")         
            div.classList.add('thingsToDo') 
            div.setAttribute('data-thingstodo-id', id)
            div.innerHTML += this.renderInnerHtml()
            modal.appendChild(div)
   
         
            div.addEventListener('click', (e) => { 
               e.preventDefault()    
               
               if (e.target.id === 'delete-thingstodo') {
                  this.deleteThingstodo()
                  e.target.parentNode.remove()
               }
                let parent = e.target.parentNode
               if(e.target.id === 'update-thingstodo'){
                     this.updateThingstodo(parent)
                  
               }

            
            })

         }

       
              

    })
           
 }

///delete
deleteThingstodo=()=>{
 const {id,name,description,city_id} =  this.thingstodo  

      new ApiAjax(URL,'thingstodos').fetchForDelete(id)
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


newThingstodo=()=>{

 nameOfCities.addEventListener('click', (e) => {
        e.preventDefault()
        console.log(e.target)
        let dropdownid=e.target.parentElement.getAttribute('dropdown-id')   
            thingstodoForm.addEventListener("submit", (e) => {
                  this.addNewThingstodo(dropdownid).then(data => {
                          let makearray=[]
                          makearray.push(data)                       
                          Thingstodo.makeObjectOfThingstodos(makearray)
                  })
            })
            
   })
}

//adding new thingstodo 
 addNewThingstodo=(city_id)=>{
  
        let data = {
            name: thingstodoForm.name.value,
            description: thingstodoForm.description.value,
            city_id: city_id
         }
        return  new ApiAjax(URL,'thingstodos').fetchForCreate(data)
   
 } 

  renderInnerHtml= () => {
      const {id,name,description,city_id} =  this.thingstodo 
    let thingstod
    return thingstod = `
    <div data-id=${id}>
    <h4 class="things-name" > ${name}</h4>
    <h5 class="things-description" data-id=${id}>${description} </h5>
    <button id="delete-thingstodo" class="add-btn" type="submit">Delete</button>
    <button id="update-thingstodo" class="add-btn" type="submit">Update</button>
    </div><br>
   `
 }

}