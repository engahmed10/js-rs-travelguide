class ApiAjax {

  constructor(URL){
     this.URL = URL
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



}

