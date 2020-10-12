# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



cities=[
['Istnabul','Turkey','10.730 million','https://c8.alamy.com/comp/2A2BPPG/the-suleymaniye-mosque-beautiful-view-from-the-golden-horn-inlet-istanbul-turkey-2A2BPPG.jpg'],
['Cairo','Egypt','4.388 million','https://i.pinimg.com/originals/30/e3/88/30e388a2eaac7856fc896e29a5f1f960.jpg'],
['Venice','Italy','5.316 million','https://traveler.marriott.com/wp-content/uploads/2019/06/GI_530855809_VeniceGrandCanal.jpg'],
['New Yourk City','USA','13.100 million','https://i.ytimg.com/vi/C2pHhJfXW64/hqdefault.jpg'],
['Paris','France','15.834 million','https://i.ytimg.com/vi/LPAZV9ibV2Q/maxresdefault.jpg'],
['Barcelona','Spain','6.530 million','https://www.pride.com/sites/default/files/2015/12/23/sagradafamilia.jpg']]



citycollection = []
cities.each do |element|    

     citycollection << City.create(name:element[0],country:element[1],population:element[2],url:element[3])  
end



thingsToDo =[
['Topkapi Palace','This enormous palace was the Imperial residence of Ottoman sultans for almost 400 years.Although much of the palace is not accessible, the daily tours of the Harem are of great interest to tourists',
'Eating iskender Kebab ','İskender Kebap is actually döner meat. Döner is a dish of beaten pieces of meat seasoned with suet'
],['Giza Pyramid Complex','the pyramids of Giza are one of life’s bucket list greats and truly have to be seen to be believed.Must 
  takes a selfie ','yramid of Djoser','Considered the original pyramid and the world’s earliest stone monument, the Pyramid 
of Djoser (Step Pyramid) is a highlight of any trip to Saqqara. Built in 2650 BC, it still stands
 proud over Saqqara, surrounded by the remains of ritual buildings.'],
 ['St. Mark’s Basilica','Easily the most renowned and famous building in Venice, St. Mark’s Basilica is a sublime
  piece of architecture that has stood the test of time since its creation in 1092 and remains one of the most 
  important religious buildings in Northern Italy.',
 'St. Mark’s Square',
'Whilst St. Mark’s Basilica is the most famous building in Venice, St Mark’s Square is the most famous
 piazza.'],
 ['Statue of Liberty',
'The Statue of Liberty Exhibit is located on the second floor of the pedestal inside the Statue, and features a
 vast collection of photographs, prints and artifacts that tell the story of the monument
  throughout history',
  'Central Park',
'Central Park is fantastic year-round, and is a must-see for anyone coming to New York," says Josephine Danielson,
 head concierge at the Four Seasons Hotel New York.'],
 [
 'Notre-Dame Cathedral',
 'Note that the cathedral sustained significant damage as a result of a fire on April 15, 2019. Its wooden
  roof and spire collapsed during the fire. It remains closed until further notice.',
 'EIFFEL TOWER',
 'Without a doubt, the Eiffel Tower is one of Paris’ most recognizable landmarks. For many people, it’s 
 thrilling the first time you see the Eiffel Tower'],
 [ 'Sagrada Familia','This is where to begin your adventure through Barcelona and the dreamlike works of Antoni 
 Gaudí.',
'Casa Batll','Another of Antoni Gaudí’s most postcard-friendly creations, this apartment block wasn’t created 
from scratch but was a remodel undertaken at the turn of the 20th century.']
]

citycollection.each do |el|

    thingsToDo.shift(1).each do |things|
       
        Thingstodo.create(name:things[0],description:things[1],city_id:el.id)
        Thingstodo.create(name:things[2],description:things[3],city_id:el.id)
       
     end

end