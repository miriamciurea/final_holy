class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :phone, presence: true, length: { is: 10, message: "must be exactly 10 digits long" }

  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?

end
