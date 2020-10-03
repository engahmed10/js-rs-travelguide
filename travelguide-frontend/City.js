URL = `http://127.0.0.1:3000`
class City {
   constructor(name,country,population,url){
            
   this.name,this.country,this.population,this.url=
        name,country,population,url
   }

 static allCities(){
    let api=new ApiAjax(URL)
     api.getAllCities().then(data=>
      console.log(data))  
   
}


}




City.allCities()
