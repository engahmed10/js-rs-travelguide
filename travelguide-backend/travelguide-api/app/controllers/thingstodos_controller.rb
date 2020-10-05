class ThingstodosController < ApplicationController

    def index
        if  params[:city_id].present?
           city=City.find_by(id:params[:city_id])
           render json: city.thingstodos
       else
           @thingstodos =Thingstodo.all 
           render json: @thingstodos
       end
   end


end
