class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update]

  def index
    @products = Product.all
  end

  def show
  end

  def new
    @product = Product.new
    # @categories = Product::CATEGORIES
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      redirect_to @product
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @product.update(product_params)
      redirect_to @product
    else
      render :edit
    end
  end

  def destroy
    @product.destroy
    redirect_to root_path
  end

  private

  def product_params
    params.require(:product).permit(
      :name,
      :price,
      :storage,
      :serving,
      :part_of,
      :ingredients,
      :allergens,
      :order,
      category: [],  # Permit category as an array if it's a set of multiple selections
      photos: []  # Permit photos as an array
    )  end

  def set_product
    @product = Product.find(params[:id])
  end

end
