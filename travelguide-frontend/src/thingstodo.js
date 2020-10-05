URL = `http://127.0.0.1:3000`
const nameOfCities = document.querySelector(".names-of-cities")
const modal = document.getElementById('modal')

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
        obj.renderThingstodo()
        return obj
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
         data.forEach(el => {

            const div = document.createElement('div')
            div.classList.add("city")
            let a = `<a class="city-name" > ${el.name}</a>`
            div.setAttribute('data-id', `${el.id}`)
            div.innerHTML += a
            nameOfCities.appendChild(div)
        })

    })  
   }

 
   renderThingstodo =()=>{
     
        const {id,name,description,city_id} =  this.thingstodo ;

            nameOfCities.addEventListener('click', (e) => {
               let cityId = e.target.parentElement.getAttribute('data-id')            
                     const div = document.createElement('div')
                        if (cityId == city_id) {                           
                           console.log(`id of things`,id)
                           div.classList.add('thingsToDo') 
                           div.setAttribute('data-city-id', id)
                           div.innerHTML += this.renderInnerHtml()
                           modal.appendChild(div)
                           console.log(modal)
                         div.addEventListener('click', (e) => { 
                            e.preventDefault()    
                            
                             if (e.target.id === 'delete-thingstodo') {
                                this.deleteThingstodo()
                                e.target.parentNode.remove()
                             }
                          
                          })
                        }
              

             })
           
    }

deleteThingstodo=()=>{
 const {id,name,description,city_id} =  this.thingstodo  

          new ApiAjax(URL,'thingstodos').fetchForDelete(id)
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