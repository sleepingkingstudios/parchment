# frozen_string_literal: true

def expected_components(spell)
  ary = []
  ary << 'V' if spell.verbal_component
  ary << 'S' if spell.somatic_component

  unless spell.material_component.blank?
    ary << "M (#{spell.material_component})"
  end

  ary.join ', '
end

def expected_level(spell)
  str =
    if spell.level.zero?
      "#{spell.school.capitalize} cantrip"
    else
      "#{ordinal(spell.level)}-level #{spell.school}"
    end

  spell.ritual? ? "#{str} (ritual)" : str
end

def expected_source(spell)
  spell.source&.name || 'Homebrew'
end

def find_source(source_name:, source_type:)
  case source_type
  when 'Book'
    Book.where(title: source_name).first
  end
end

def ordinal(int)
  case int
  when 1
    '1st'
  when 2
    '2nd'
  when 3
    '3rd'
  else
    "#{int}th"
  end
end

When('I visit the {string} page for spell {string}') do |action, spell_name|
  @current_page = "Features::Pages::Spells::#{action.classify}".constantize.new
  @spell        = Spell.where(name: spell_name).first
  spell_id      = @spell&.id || '00000000-0000-0000-0000-000000000000'

  @current_page.load(spell_id: spell_id)

  @current_page.wait_until_loading_message_invisible
end

When('I click the {string} button for spell {string}') do |button, spell_name|
  @current_page.wait_until_loading_message_invisible

  @spell = Spell.where(name: spell_name).first
  rows   = @current_page.table_rows
  row    = rows.find { |item| item.text.start_with?(spell_name) }

  expect(row).not_to be nil

  row.find_button(button).click
end

When('I click the {string} link for spell {string}') do |link, spell_name|
  @current_page.wait_until_loading_message_invisible

  @spell = Spell.where(name: spell_name).first
  rows   = @current_page.table_rows
  row    = rows.find { |item| item.text.start_with?(spell_name) }

  expect(row).not_to be nil

  row.find_link(link).click
end

When('I submit the Spell form with invalid attributes') do
  expect(@current_page.has_spell_form?).to be true

  @spell_attributes = FactoryBot.attributes_for(:spell, name: '', range: nil)

  @current_page.spell_form.fill_attributes(@spell_attributes)

  @current_page.spell_form.submit_button.click

  sleep 1 # TODO: Remove this once a pending overlay is defined.
end

When('I submit the Spell form with valid attributes') do
  expect(@current_page.has_spell_form?).to be true

  @spell_attributes = FactoryBot.attributes_for(:spell, name: 'Magic Noodle')

  @current_page.spell_form.fill_attributes(@spell_attributes)

  @current_page.spell_form.submit_button.click

  sleep 1 # TODO: Remove this once a pending overlay is defined.
end

When('I select the source {string} {string}') do |source_type, source_name|
  expect(@current_page.has_spell_form?).to be true

  source = find_source(source_name: source_name, source_type: source_type)

  @current_page
    .spell_form
    .find_select_option('source', "#{source_type}:#{source.id}")
    .select_option
end

Then('I should be on the {string} page for the spell') do |action|
  expected_page = "Features::Pages::Spells::#{action.classify}".constantize.new
  @current_page = expected_page

  expect(expected_page).to be_displayed(spell_id: @spell.id)
end

Then('I should be on the {string} page for spell {string}') \
do |action, spell_name|
  @spell        = Spell.where(name: spell_name).first
  expected_page =
    "Features::Pages::Spells::#{action.classify}".constantize.new
  @current_page = expected_page

  expect(expected_page).to be_displayed(spell_id: @spell.id)
end

Then('the Spells table should be empty') do
  @current_page.wait_until_loading_message_invisible

  rows = @current_page.table_rows

  expect(rows.size).to be 1
  expect(rows.first.text).to be == 'There are no spells matching the criteria.'
end

Then('the Spells table should display the spells data') do
  @current_page.wait_until_loading_message_invisible

  rows = @current_page.table_rows

  expect(rows.size).to be Spell.count

  Spell.all.each do |spell|
    expect(rows).to include(
      satisfy do |row|
        row.text.start_with?(spell.name)

        row.text.include?(spell.source&.name || 'Homebrew')
      end
    )
  end
end

Then('the Spells table should not display the data for the spell') do
  @current_page.wait_until_loading_message_invisible

  rows = @current_page.table_rows

  expect(rows).not_to include(
    satisfy { |row| row.text.start_with?(@spell.name) }
  )
end

Then('the Spell block should display the spell data') do
  expect(@current_page.has_spell_block?).to be true

  %w[name casting_time range duration].each do |attr_name|
    text = @current_page.find_text(attr_name)

    expect(text).to include @spell.send(attr_name)
  end

  text = @current_page.find_text('source')
  expect(text).to be == expected_source(@spell)

  text = @current_page.find_text('level-school')
  expect(text).to be == expected_level(@spell)

  text = @current_page.find_text('components')
  expect(text).to include expected_components(@spell)

  text = @current_page.find_text('description')
  expect(text.split(/\n+/)).to be == @spell.description.split(/\n+/)
end

Then('the Spell block should show source {string}') do |source_name|
  expect(@current_page.has_spell_block?).to be true

  text = @current_page.find_text('source')

  expect(text).to be == source_name
end

Then('the Spell form should display the spell data') do
  expect(@current_page.has_spell_form?).to be true

  Features::Pages::Spells::Form::ALL_INPUTS.each do |attr_name|
    value = @current_page.spell_form.get_value(attr_name)

    expect(value.to_s).to be == @spell_attributes[attr_name].to_s
  end
end

Then('the Spell form should display the errors') do
  expect(@current_page.has_spell_form?).to be true

  expected_errors = Spell.new(@spell_attributes).tap(&:valid?).errors.messages

  expected_errors.each do |attribute, errors|
    form_group = @current_page.spell_form.find_field(attribute)

    expect(form_group).not_to be nil

    feedback = form_group.find('.invalid-feedback')

    errors.each do |error|
      expect(feedback.text).to include error
    end
  end
end
