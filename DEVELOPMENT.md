# Development Notes

## Client

- generic 404 page for non-matching route

### Alerts

- clear (some?) alerts when the URL (not query!) changes

## Controllers

- ResourcesController
  - #index action
    - `:only` parameter - restrict fields queried/returned
    - also update FindMatchingOperation, BaseSerializer ?

## Spells

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

### Tags

- damage
  - by damage type
- automatic tags
  - school
  - level
  - ritual
