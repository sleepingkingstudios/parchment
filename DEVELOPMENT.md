# Development Notes

## Authentication

- in Cucumber tests, generate token directly rather than going through login

### Endpoints

- Api::Authentication::Session
  - #create
    - takes :username, :password
    - return serialized User, Session token
    - delegate to a generic Authentication::Strategy ?

### Workflows

- Log In
- Log Out
- User Management (Admin)

## Authorization

- read authorization
  - public - any user can view, including anonymous users
    - do not show additional details without write permissions
  - protected (default) - only logged in users can view
  - private - only creator (and authorized users?) can view
- write authorization
  - public - any user can edit
  - protected - only logged in users can edit
  - private (default) - only creator can edit

## Client

- generic 404 page for non-matching route
- add Loading overlay for resource tables
  - wait for Loading overlay to appear/disappear in features
- lazy loading of functional areas
  - see https://reacttraining.com/react-router/web/guides/code-splitting
  - load entire authenticated application lazily?

### Alerts

- clear (some?) alerts when the URL (not query!) changes

### Components

- refactor CreatePage, IndexPage, ShowPage, UpdatePage
  - separate between endpoint/hook and layout
  - ResourcePage takes endpoints, match, resourceName, etc
    - wraps all hooks
    - takes a Layout component and renders it with props
  - CreateLayout, IndexLayout, ShowLayout, UpdateLayout
    - takes data, errors, status, resourceName props
    - takes callback props: onChange, onSubmit, onDelete, etc

#### Submit Button

- status switch to display Loading... message

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

## Serializers

- Extract AttributesSerializer as base class to ResourceSerializer
  - extract .attribute, .attributes, #call from BaseSerializer
- Implement StringSerializer
  - defines .instance
  - returns the string
- Implement ArraySerializer
- Implement HashSerializer
