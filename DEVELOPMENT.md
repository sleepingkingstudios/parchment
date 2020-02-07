# Development Notes

## Actions

- columns
  - name (String)
  - description (String)

## Client

- generic 404 page for non-matching route
- add Loading overlay for resource tables
  - wait for Loading overlay to appear/disappear in features

### Alerts

- clear (some?) alerts when the URL (not query!) changes

## Characters

- columns
  - name (String)
  - level (Integer, 1...20)

### Abilities

- columns
  - active (Boolean) [true => active, false => passive]
  - action (String) [action, bonus action, reaction]
  - recharge (String) [none, short rest, long rest]
  - text (String)
- belongs_to :character
- the most basic ability is a passive ability with text

#### Abilities::Base

- abstract base class

#### SpellcastingAbility

- belongs_to :character
- has_many :spells_known
- has_many :spells_prepared
- columns
  - ability score (String) [Intelligence, Wisdom, Charisma]
  - spells known by level (JSONB) [{ cantrips: 3, 1st: 1 }]
  - spell slots by level (JSONB) [3, 2, 1]
  - available slots per level (JSONB) [1, 0, 0]
  - prepare spells (Boolean)
  - recharge (String) [none, short rest, long rest]
- methods
  - spell save DC
  - spell attack bonus

##### SpellKnown

- belongs_to :spell
- belongs_to :spellcasting_ability

##### SpellPrepared

- belongs_to :spell
- belongs_to :spellcasting_ability
- columns:
  - cast (Boolean)

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

## Fixtures

### External Data

- load data from external source (private repository?)
  - treat as directory path if starts with '~' or '.' or '/'
  - e.g. data:load['../srd']

### Middleware

- replace mappings
- each middleware is a callable object (command?)
  - takes next command and a data hash
  - returns result with record

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
