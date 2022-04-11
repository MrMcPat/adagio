class JournalEntriesController < ApplicationController
    def index
        render json: JournalEntry.all.all.order(created_at: :desc)
    end

    def show
        render json: JournalEntry.find(params[:id])
    end

    def create
        render json: JournalEntry.create(journal_entry_params), status: :created
    end

    def update
        journal_entry = JournalEntry.find(params[:id])
        journal_entry.update!(journal_entry_params)
        render json: journal_entry
    end

    def destroy
        JournalEntry.find(params[:id]).destroy
        head :no_content
    end

    private

    def journal_entry_params
        params.permit(:user_id, :title, :body, :is_private, :heart_count, :praying_count, :shocked_count, :sad_count)
    end
end
