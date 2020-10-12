class CitySerializer
  include FastJsonapi::ObjectSerializer
  attributes :id ,:name, :country, :population, :url
end
