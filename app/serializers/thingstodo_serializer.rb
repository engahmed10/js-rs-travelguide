class ThingstodoSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description,:city_id
end
