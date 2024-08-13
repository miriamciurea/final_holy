class CreateOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :orders do |t|
      t.references :user, null: false, foreign_key: true
      t.string :status, default: 'pending'
      t.decimal :total_amount, precision: 10, scale: 2
      t.string :stripe_charge_id # For Stripe integration
      t.timestamps
    end
  end
end
