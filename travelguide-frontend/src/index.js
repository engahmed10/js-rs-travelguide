const form = document.querySelector('#city-form')
const thingstodoForm = document.querySelector('#new-thingstodos-form')
const modal = document.querySelector('.modal') 
const citycard = document.querySelector('.city-thingstodo')  
const newthingsform = document.querySelector('#new-thingstodos-form')   
const updateBtn = document.querySelector('#update-things-btn')
const close = document.querySelector('.close')
const close1 = document.querySelector('.close1')
const nameOfCities = document.querySelector(".names-of-cities")
const updateForm =document.querySelector('#update-thingstodos-form')
const city_collection = document.querySelector('.city_collection')
const updateCityForm = document.querySelector('#city-update-form')
const cityCards = document.querySelector('.card')
const newthings = document.querySelector('#add-thingstodo')


document.addEventListener("DOMContentLoaded", function() {
City.promiseAllCities()
City.makeNewCity()
City.listenForUpdateAndDel()

Thingstodo.closeTag()
Thingstodo.closeTag1()
Thingstodo.updatelisten()
Thingstodo.deleteThings()
Thingstodo.drowpdownCities()
Thingstodo.listentodropdown()
Thingstodo.newThingsToDos()


})