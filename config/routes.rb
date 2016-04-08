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
    get 'regist' => 'session#reg'
    post 'regist' => 'session#do_reg'
    get 'login' => 'session#new'
    post 'login' => 'session#create'
    get 'vcode' => 'session#vcode'
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
end
