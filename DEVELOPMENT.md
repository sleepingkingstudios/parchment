# Development Notes

## Ability

- belongs_to :granter, polymorphic: true
- belongs_to :parent_ability
  - handles abilities that have multiple versions depending on character level
    - e.g. drow magic at levels 1, 3, 5
  - if parent ability
    - displayed in granter (e.g. Race)
    - not displayed in Character
  - if child ability
    - not displayed in granter
    - only the relevant variant (if any) displayed in Character
  - if neither parent nor child
    - displayed in granter and Character
  - cannot be nested more than once
- has_many :versions
- columns:
  - name (String)
  - slug (String)
  - display_name (String)
    - generally an unqualified version of the name
      - name: "Darkvision (Dwarf)"
        slug: "darkvision-dwarf"
        display_name: "Darkvision"
      - name: "Drow Magic 1" # 1st-level version
        slug: "drow-magic-1"
        display_name: "Drow Magic"
  - description (Text)
  - short_description (String)
  - active (Boolean) [true => active, false => passive]
  - action (String) [action, bonus action, reaction] if active
  - recharge (String) [none, short rest, long rest]
  - min_level (Integer)
  - max_level (Integer)
  - data (JSONB)

### AbilityVersion (WIP)

- belongs_to :ability
- columns:
  - description (Text)
  - min_level (Integer)
  - max_level (Integer)

### CharacterAbility

- belongs_to :ability
- belongs_to :character
- belongs_to :granter, polymorphic: true

## Authentication

- User Management (Admin-only)
- Add Authentication::User::Roles::GUEST

## Authorization

- admin - full access, including user management
- user  - read/write feature access
- guest - read-only feature access

## Client

- generic 404 page for non-matching route
- add Loading overlay for resource tables
  - wait for Loading overlay to appear/disappear in features
- lazy loading of functional areas
  - see https://reacttraining.com/react-router/web/guides/code-splitting
  - load entire authenticated application lazily?

### API

- Refactor Endpoint class to client() function.
- Clean up reducer namespaces: |
    resourceName: { # Note that index is a reserved word!
      block: { find },
      create: { form },
      delete: {},
      table: { find },
      update: { find, form }
    }

### Components

- refactor CreatePage, IndexPage, ShowPage, UpdatePage
  - separate between endpoint/hook and layout
  - ResourcePage takes endpoints, match, resourceName, etc
    - wraps all hooks
    - takes a Layout component and renders it with props
  - CreateLayout, IndexLayout, ShowLayout, UpdateLayout
    - takes data, errors, status, resourceName props
    - takes callback props: onChange, onSubmit, onDelete, etc

### Forms

#### Submit Button

- status switch to display Loading... message

#### Text Areas

- auto-size based on contents? opt-in via prop?

## Character

- columns
  - name (String)
  - level (Integer, 1...20)

### Character::SpellcastingAbility

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

#### Character::SpellKnown

- belongs_to :spell
- belongs_to :spellcasting_ability

#### Character::SpellPrepared

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

## Decision

- belongs_to :granter
- has_many :options
- columns
  - category (String) - Class name (e.g. 'Tools::MusicalInstrument')

### DecisionOption

- belongs_to :decision
- has_many :abilities,     type: CharacterAbility,     inverse_of: :granter
- has_many :proficiencies, type: CharacterProficiency, inverse_of: :granter

### CharacterDecision

- belongs_to :character
- belongs_to :decision
- has_many :abilities,     type: CharacterAbility,     inverse_of: :granter
- has_many :proficiencies, type: CharacterProficiency, inverse_of: :granter
- columns:
  - resolved (Boolean)

Example: Choosing A Proficiency

- Abigail (Character) belongs_to Outlander (Background)
  - Outlander has "choose one musical instrument" (Decision)
    - decision has category: Tools::MusicalInstrument
    - decision has count: 1
    - decision has options: []
  - Abigail has "choose one musical instrument" (CharacterDecision)
    - CharacterDecision#decision is "choose one musical instrument"
    - CharacterDecision#resolved is false
    - CharacterDecision#proficiencies is []
  - Abigail's player selects the Theremin
    - CharacterDecision#resolved is true
    - CharacterDecision#proficiencies is [CharacterProficiency]
      - CharacterProficiency#granter is CharacterDecision
      - CharacterProficiency#proficiency is Proficiency
        - Proficiency#type is ToolProficiency
        - Proficiency#reference is theremin

Example: Choosing A Skill From A List

- Abigail (Character) belongs_to Barbarian (Profession)
  - Barbarian has "choose two Skills from list" (Decision)
  - decision has category: Skill
    - decision has options: Animal Handling, Athletics, Intimidation, ...
    - decision has count: 2
  - Abigail has "choose two Skills from List" (CharacterDecision)
    - CharacterDecision#decision is "choose two Skills from List"
    - CharacterDecision#resolved is false
    - CharacterDecision#proficiencies is []
  - Abigail's player selects Athletics and Intimidation
    - CharacterDecision#resolved is true
    - CharacterDecision#proficiencies is [CharacterProficiency, ...]
      - Proficiency#type is SkillProficiency
      - Proficiency#reference is athletics, intimidation

### Decision::AbilityScoreIncrease

### Decision::

## Mechanics

- Refactor API to /references namespace?

### Actions

- Add data keys
  - action_type (String) - action, bonus_action, reaction
  - action_trigger (String) - bonus action only
  - category (String) - standard, class, monster, feat

### Operations

- Apply slug middleware.

## Proficiencies

- belongs_to :granter, polymorphic: true
  - entity that grants the proficiency
  - e.g. a Race, a CharacterClass, a Feat, a CharacterDecision, etc.
- belongs_to :reference, polymorphic: true
  - e.g. a Weapon, WeaponGroup, Skill, SkillGroup, etc.
- columns
  - name (String)
  - slug (String)
  - type (String)
    - STI - WeaponProficiency, WeaponGroupProficiency, etc.
  - double_bonus (Boolean)

### Examples

- name: Lasers
  type: WeaponGroupProficiency
  granter: Laser Lover (Feat)
  reference: Lasers (WeaponGroup)
- name: Laser Pistols
  type: WeaponProficiency
  granter: Flumph (Race)
  reference: Laser Pistol (Weapon)

### Character Proficiency

- belongs_to :character
- belongs_to :proficiency

## Races

- has_many :variants
- has_many :abilities
- has_many :choices
- has_many :proficiencies
- belongs_to :size
- columns
  - name (String)
  - slug (String)
  - description (Text)
  - size (String)
  - speed (Integer)
  - ability_scores (JSONB)
  - data (JSONB)

### RaceVariant

- extends Race
- belongs_to :race

### CharacterRace

- belongs_to :character
- belongs_to :race
  - can be a RaceVariant

## References

### AbilityScore

- has_many :skills
- columns
  - name (String)
  - slug (String)
  - description (Text)
- not editable
  - only editable by admin? (see Authorization)
- in data/seeds

#### AbilityScoreIncrease

- belongs_to :ability_score, inverse: false
- columns
  - amount (Integer)

### Armor

#### ArmorGroup

### Language

### Size

- not editable
  - only editable by admin? (see Authorization)
- in data/seeds

### Skill

- columns
  - name (String)
  - slug (String)
  - ability_score (String)
  - description (Text)

### Tool

#### Tools::ArtisansTools

#### Tools::MusicalInstrument

### Weapon

- belongs_to :weapon_group

#### WeaponGroup

- has_many :weapons

## Sources

- flag columns - official, playtest, homebrew

### Books

- Refactor to Sources::Books ?

### Homebrew

- belongs_to :user
  - inverse of has_one :homebrew_source

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
