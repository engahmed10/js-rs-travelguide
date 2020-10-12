class ApiAjax {

  constructor(URL,model){
     this.URL = URL
     this.model=model
  }

  
  fetchAll() {
    return  fetch(`${this.URL}/${this.model}`)   
      .then(response => response.json())   
  
  }

  fetchForDelete(id) {
    return  fetch(`${this.URL}/${this.model}/${id}`,{
        method:'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
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

  fetchForCreate(data){
      return fetch(`${this.URL}/${this.model}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
  }

}

