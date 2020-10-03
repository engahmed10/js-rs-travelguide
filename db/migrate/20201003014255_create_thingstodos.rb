class CreateThingstodos < ActiveRecord::Migration[6.0]
  def change
    create_table :thingstodos do |t|
      t.string :name
      t.string :description
      t.references :city, null: false, foreign_key: true

      t.timestamps
    end
  end
end
