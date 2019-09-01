# frozen_string_literal: true

# Serializes a Publication as a JSON-compatible hash.
class PublicationSerializer < RecordSerializer
  attributes \
    :abbreviation,
    :name,
    :playtest,
    :publication_date,
    :publisher_name,
    :slug

  alias_method :publication, :object

  def publication_date
    super.iso8601
  end
end
