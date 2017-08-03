Rails.application.routes.draw do

  # routes for assemblies
  resources :assemblies
  get '/show_lib' => 'assemblies#show_lib'
  get '/show_assemblies' => 'assemblies#show_assemblies'

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'assemblies#index'

  match '/welcome' => 'users#welcome', via: :get
  match '/login' => 'users#login', via: [:get, :post]
  match '/logout' => 'users#logout', via: [:get, :post]
  match '/signup' => 'users#signup', via: [:get, :post]
  match '/profile' => 'users#profile', via: [:get, :post]

end
