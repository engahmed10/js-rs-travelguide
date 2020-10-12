class City < ApplicationRecord
    has_many :thingstodos ,dependent: :destroy
end
