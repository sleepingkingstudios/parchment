# Development Notes

## Sources

- published books, web articles, original content
- name:String
- abbreviation:String - e.g. Player's Handbook -> PHB
- publisher
- official content

## Spells

- belongs_to :source
- uniqueness by source+name
- hash attribute (source + name) for short reference
- attribute short_name:string -
    e.g. Spontaneous Combustion -> spontaneous-combustion
- attribute short_description:string
- attribute slug (source abbrev + short_name) - e.g. phb-spontaneous-combustion

### Client

- namespace all Spell reducers in the 'spells' namespace
  - support nested namespaces in requests (rename to API objects?)
  - extract FindAll request

### Serializer

- create Spell serializer

### Tags

- damage
  - by damage type
- automatic tags
  - school
  - level
  - ritual
