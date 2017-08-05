class UsersController < ApplicationController

   def profile
      if !current_user
         redirect_to new_user_session_path
      else
         @current_user = User.find(current_user)
      end
   end

   protected

   def signup_params
      params.permit(:username, :password, :name, :email).except(:confirm_password)
   end

   def login_params
      params.permit(:username, :password)
   end
end
