Rails.application.routes.draw do
  root 'pages#home'

  get 'exoplanets_data', to: "pages#data"
end
