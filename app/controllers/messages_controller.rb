class MessagesController < ApplicationController

  def index
    @group = Group.find(message_params[:group_id])
  end

  def create
  end

  private
  def message_params
    params.permit(:group_id)
  end

end
