Rails.application.routes.draw do

  namespace :admin do
    resources :categories
  end
  root 'home/home#index'
  get '/u/:name' => 'home/user#index'
  
  scope :home do
  get '/' => 'home/home#index'
  get '/:username/:albumname' => 'home/home#show'
  
  end

  namespace :admin do
    get '/' => "home#index"
    get 'index/index'
    get 'login' => 'session#new'
    post 'login' => 'session#create'
    delete 'logout' => 'session#destroy'
    resources :users,only:[:index,:edit,:update,:show]
    get 'repassword' => 'users#repassword'
    post 'repassword' => 'users#update_password'
    get 'upload/:name' => 'albums#upload_photo'
    get 'upload_online/:name' => 'albums#upload_photo_online'
    
    post 'uploading_online/:name' => 'albums#uploading_photo_online'
    post 'upload/:name' => 'albums#uploading_photo'

    post 'remove_photo/:album/:photo' => 'albums#remove'
    resources :albums
    get 'photos/upload_process' => 'photos#upload_process'
    resources :photos
    post 'photos/upload' => 'photos#upload'
    resources :effects

  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
