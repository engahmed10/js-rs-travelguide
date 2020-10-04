class ApiAjax {

  constructor(URL,model){
     this.URL = URL
     this.model=model
  }

  
     fetchAllCities() {
        return  fetch(`${this.URL}/cities`)   
          .then(response => response.json())   
      
      }

      fetchForDelete(id) {
        return  fetch(`${this.URL}/cities/${id}`,{
           method:'DELETE'
        })     
      
      }

      fetchForUpdate(id,data){
        return fetch(`${this.URL}/${this.model}/${id}`,{
          method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
         }) 
         .then(res => res.json())

      }



}

