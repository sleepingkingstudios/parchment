# Development Notes

## Operations

### API

- OperationFactory
  - #create, #destroy, #update from Records
  - #index, #show from Queries
  - generic, and per resource

#### Spells

- Api::ShowSpellOperation
  - returns { spell: {}, publication: {} }
- Api::IndexSpellsOperation
  - returns { spells: [{}, {}, {}], publications: [{}, {}, {}] }

### Records

- FindManyOperation
- OperationFactory

### Queries

- AssociationsQueryOperation
  - takes Hash envelope - { spell: {} } or { spells: [{}, {}, {}] }
  - wraps FindManyOperation
  - collects one association's ids (and types if polymorphic)
    - e.g. spell.source_id, source_type => { publications: [0, 1, 2] }
  - finds corresponding records (findMany)
  - returns Hash envelope
    - { spell: {}, publication: {} }
    - { spells: [{}, {}, {}], publications: [{}, {}, {}] }
- IndexQueryOperation
  - wraps FindMatchingOperation
  - returns Hash envelope - { spells: [{}, {}, {}] }
- ShowQueryOperation
  - wraps FindOneOperation
  - returns Hash envelope - { spell: {} }

## Spells

- belongs_to :source
- uniqueness by source+name
- hash attribute (source + name) for short reference
- attribute short_name:string -
    e.g. Spontaneous Combustion -> spontaneous-combustion
- attribute short_description:string
- attribute slug (source abbrev + short_name) - e.g. phb-spontaneous-combustion

### Tags

- damage
  - by damage type
- automatic tags
  - school
  - level
  - ritual
