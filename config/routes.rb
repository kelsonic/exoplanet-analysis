Rails.application.routes.draw do
  root 'pages#talk'

  get 'exoplanets_data', to: "pages#data"
  get 'charts', to: "pages#charts"
end
