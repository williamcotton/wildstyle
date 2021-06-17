class ReviewsController < ApplicationController
  def index
    reviews = ReviewResource.all(params)
    respond_with(reviews)
  end

  def show
    review = ReviewResource.find(params)
    respond_with(review)
  end

  def create
    review = ReviewResource.build(params)

    if review.save
      render jsonapi: review, status: 201
    else
      render jsonapi_errors: review
    end
  end

  def update
    review = ReviewResource.find(params)

    if review.update_attributes
      render jsonapi: review
    else
      render jsonapi_errors: review
    end
  end

  def destroy
    review = ReviewResource.find(params)

    if review.destroy
      render jsonapi: { meta: {} }, status: 200
    else
      render jsonapi_errors: review
    end
  end
end
