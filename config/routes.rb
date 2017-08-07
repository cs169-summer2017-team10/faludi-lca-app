Rails.application.routes.draw do
  devise_for :users
  root 'application#index'

  resources :assemblies, only: [:create, :index, :show]
end
