class CitiesController < ApplicationController
   
    def index
       @city= City.all  
       render json: @city  ,include: [:thingstodos]
    end

    def destroy
       City.find(params[:id]).destroy
    end

end