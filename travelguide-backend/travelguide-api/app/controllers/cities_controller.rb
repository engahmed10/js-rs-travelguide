class CitiesController < ApplicationController
   
    def index
       @city= City.all  
       render json: @city  ,include: [:thingstodos]
    end

end