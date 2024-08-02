class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]

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
    redirect_to products_path, notice: 'Product was successfully deleted.'
  end

  private

  def product_params
    params.require(:product).permit(
      :name,
      :name_en,
      :price,
      :storage,
      :storage_en,
      :serving,
      :serving_en,
      :part_of,
      :ingredients,
      :ingredients_en,
      :allergens,
      :allergens_en,
      :order,
      category: [],  # Permit category as an array if it's a set of multiple selections
      photos: []  # Permit photos as an array
    )  end

  def set_product
    @product = Product.find(params[:id])
  end

end
