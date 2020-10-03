class ApiAjax {

  constructor(URL){
     this.URL = URL
  }

    getAllCities() {
     return  fetch(`${this.URL}/cities`)   
       .then(response=>response.json())   
      
    }


}
