class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]

  def shop
    @products = Product.where("part_of LIKE ?", '%Shop%')
    @page_type = 'shop'
  end

  def menu
    @products = Product.where("part_of LIKE ?", '%Menu%')
    @page_type = 'menu'
  end

  def filter_by_category
    if params[:category] == 'ALL' || params[:category].blank?
      @products = Product.where("part_of LIKE ?", "%shop%")
    else
      @products = Product.where("category LIKE ? AND part_of LIKE ?", "%#{params[:category]}%", "%shop%")
    end

    respond_to do |format|
      format.html { render partial: 'products_list', locals: { products: @products } }
      format.json { render json: @products }
    end
  end

  def index
    @products = Product.all
  end

  def show

    if I18n.locale == :en
      @name = @product.name_en
      @storage = @product.storage_en
      @serving = @product.serving_en
      @ingredients = @product.ingredients_en
      @allergens = @product.allergens_en
    else
      @name = @product.name
      @storage = @product.storage
      @serving = @product.serving
      @ingredients = @product.ingredients
      @allergens = @product.allergens
    end

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
      :ingredients,
      :ingredients_en,
      :allergens,
      :allergens_en,
      :order,
      part_of: [],
      category: [],  # Permit category as an array if it's a set of multiple selections
      photos: []  # Permit photos as an array
    )  end

  def set_product
    @product = Product.find(params[:id])
  end

end
