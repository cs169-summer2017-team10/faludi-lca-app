Rails.application.routes.draw do

  devise_for :users

  # routes for assemblies
  resources :assemblies
  # match '/save_assemblies' => 'assemblies#save_assembly', via: [:get, :post]
  get '/empty_assembly' => 'assemblies#empty_assembly'
  get '/sample_assembly' => 'assemblies#sample_assembly'
  get '/show_lib' => 'assemblies#show_lib'
  get '/assemblies-not-exist' => 'assemblies#not_exist'

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'assemblies#index'

  match '/profile' => 'users#profile', via: [:get, :post]

end
