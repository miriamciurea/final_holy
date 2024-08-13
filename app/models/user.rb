class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :subscriptions
  has_many :newsletters, through: :subscriptions


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :phone, presence: true, length: { is: 10, message: "must be exactly 10 digits long" }

  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?

  def admin?
    self.admin # Assuming 'admin' is a boolean attribute
  end

  has_one :cart, dependent: :destroy
  after_create :create_cart

  def create_cart
    Cart.create(user: self)
  end

end
