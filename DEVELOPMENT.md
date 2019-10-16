# Development Notes

## Client

- generic 404 page for non-matching route

### Alerts

- clear (some?) alerts when the URL (not query!) changes

## Controllers

- ResourcesController
  - #index action
    - `:filter` parameter
    - `:only` parameter - restrict fields queried/returned
      - also update FindMatchingOperation, BaseSerializer ?
    - `:order` parameter
  - #search action
  - #show action
    - `:only` parameter - restrict fields queried/returned

## Spells

- locking slugs
  - slug_lock field
  - if false, automatically update slug when name is changed
    - live update on client (locked checkbox, disables field)
- composite_slug field
  - `"#{source.slug || 'homebrew'}-#{slug}"`
  - if new? or slug_changed? or source_changed?
    - handle changes to source.slug?
- sort by source_name?
  - requires outer join? against each possible source class
  - detect association classes: |

    ```ruby
    ApplicationRecord
      .descendants
      .select do |record_class|
        association = record_class.reflections['spells']

        association && association.options[:as] == :source
      end
    ```

### Client

- update Spell block to handle empty data - e.g. muted (no name)
- show live-updating spell block on form (on max width)

### Stubs

- indicate that a particular Spell is defined (for a given source)
  - does not have actual information about the spell
    - add column `boolean "stub", null: false, default: false`
    - skip validations except name, school, level
    - only display form fields for name, school, level, short description, stub

### Tags

- damage
  - by damage type
- automatic tags
  - school
  - level
  - ritual
