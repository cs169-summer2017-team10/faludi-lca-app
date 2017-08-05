class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :assemblies

  # email is the primary key
  validates :email, uniqueness: {message: "Email already taken"}

  validates_presence_of :email
  validates_presence_of :password

end
