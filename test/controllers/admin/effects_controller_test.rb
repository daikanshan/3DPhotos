require 'test_helper'

class Admin::EffectsControllerTest < ActionController::TestCase
  setup do
    @admin_effect = admin_effects(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:admin_effects)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create admin_effect" do
    assert_difference('Admin::Effect.count') do
      post :create, admin_effect: { name: @admin_effect.name }
    end

    assert_redirected_to admin_effect_path(assigns(:admin_effect))
  end

  test "should show admin_effect" do
    get :show, id: @admin_effect
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @admin_effect
    assert_response :success
  end

  test "should update admin_effect" do
    patch :update, id: @admin_effect, admin_effect: { name: @admin_effect.name }
    assert_redirected_to admin_effect_path(assigns(:admin_effect))
  end

  test "should destroy admin_effect" do
    assert_difference('Admin::Effect.count', -1) do
      delete :destroy, id: @admin_effect
    end

    assert_redirected_to admin_effects_path
  end
end
