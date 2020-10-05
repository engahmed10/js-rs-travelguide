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

   def show
    render json: @thingstodos
  end

   def destroy
     @thingstodos.destroy
   end 

  def update
   
    @thingstodos.update(name:params[:name],description:params[:description],city_id:params[:city_id])
    render json: @thingstodos
   end

private

   def find_things_to_do
    
     @thingstodos=Thingstodo.find(params[:id])
    
    end


end
