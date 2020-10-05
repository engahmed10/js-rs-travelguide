class ThingstodosController < ApplicationController
    before_action :find_things_to_do  ,only: [:show,:update,:destroy]

    def index
        if  params[:city_id].present?
            city=City.find_by(id:params[:city_id])
            render json: city.thingstodos
       else
            @thingstodos =Thingstodo.all 
            render json: @thingstodos
       end
   end


   def destroy
     @thingstodos.destroy
   end 

   def find_things_to_do
    
     @thingstodos=Thingstodo.find(params[:id])
    
    end


end
