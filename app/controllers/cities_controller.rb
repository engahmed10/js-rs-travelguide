class CitiesController < ApplicationController
   
    def index

       @city= City.all  
       render json: @city  ,include: [:thingstodos]
       
    end

    def show
        city=City.find_by(id:params[:id])
        render json:city ,include: [:thingstodos]
    end

    def update

        city=City.find(params[:id])

        city.update(name:params[:name],country:params[:country],population:params[:population],url:params[:url])
        if city.save
            render json: city,include: [:thingstodos]
        else
             render json: city.errors 
        end
       
    end

    def create
       
        city=City.new(name:params[:name],country:params[:country],population:params[:population],url:params[:url])
        
        if city.save
            render json: city
        else
             render json: city.errors 
        end

    end

    def destroy

       City.find(params[:id]).destroy

    end

end