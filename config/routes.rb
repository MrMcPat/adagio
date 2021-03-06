Rails.application.routes.draw do
  resources :follows
  resources :replies
  resources :posts
  resources :journal_entries
  resources :fav_songs
  resources :emotions
  resources :responses
  resources :triggers
  resources :users
  resources :lyrics, only: [:index, :show, :create]

  get '/hello', to: 'application#hello_world'
  get "/musixmatch", to: "musixmatch#musixsongs"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
