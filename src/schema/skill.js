/* eslint-disable no-unused-vars */
const jsonSchema = {
  key: 'skill',
  type: 'array',
  items: {
    type: 'object',
    required: ['name', 'level'],
    properties: {
      name: {
        type: 'string',
        title: 'Name',
        description: 'Name of the company or organisation where you worked.',
        default: '',
      },
      level: {
        type: 'string',
        title: 'Level',
        description: 'Your level of experience (e.g. Master).',
        default: '',
      },
      keywords: {
        type: 'array',
        title: 'Keywords',
        description: 'Keywords (e.g. HTML, CSS, JavaScript).',
        items: {
          type: 'string',
        },
      },
    },
  },
};
const jsonSchemaTmp = {
  definitions: {
    Thing: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          default: 'Default name',
        },
      },
    },
  },
  type: 'object',
  properties: {
    listOfStrings: {
      type: 'array',
      title: 'A list of strings',
      items: {
        type: 'string',
        default: 'bazinga',
      },
    },
    multipleChoicesList: {
      type: 'array',
      title: 'A multiple choices list',
      items: {
        type: 'string',
        enum: ['foo', 'bar', 'fuzz', 'qux'],
      },
      uniqueItems: true,
    },
    fixedItemsList: {
      type: 'array',
      title: 'A list of fixed items',
      items: [
        {
          title: 'A string value',
          type: 'string',
          default: 'lorem ipsum',
        },
        {
          title: 'a boolean value',
          type: 'boolean',
        },
      ],
      additionalItems: {
        title: 'Additional item',
        type: 'number',
      },
    },
    minItemsList: {
      type: 'array',
      title: 'A list with a minimal number of items',
      minItems: 3,
      items: {
        $ref: '#/definitions/Thing',
      },
    },
    defaultsAndMinItems: {
      type: 'array',
      title: 'List and item level defaults',
      minItems: 5,
      default: ['carp', 'trout', 'bream'],
      items: {
        type: 'string',
        default: 'unidentified',
      },
    },
    nestedList: {
      type: 'array',
      title: 'Nested list',
      items: {
        type: 'array',
        title: 'Inner list',
        items: {
          type: 'string',
          default: 'lorem ipsum',
        },
      },
    },
    unorderable: {
      title: 'Unorderable items',
      type: 'array',
      items: {
        type: 'string',
        default: 'lorem ipsum',
      },
    },
    unremovable: {
      title: 'Unremovable items',
      type: 'array',
      items: {
        type: 'string',
        default: 'lorem ipsum',
      },
    },
    noToolbar: {
      title: 'No add, remove and order buttons',
      type: 'array',
      items: {
        type: 'string',
        default: 'lorem ipsum',
      },
    },
    fixedNoToolbar: {
      title: 'Fixed array without buttons',
      type: 'array',
      items: [
        {
          title: 'A number',
          type: 'number',
          default: 42,
        },
        {
          title: 'A boolean',
          type: 'boolean',
          default: false,
        },
      ],
      additionalItems: {
        title: 'A string',
        type: 'string',
        default: 'lorem ipsum',
      },
    },
  },
};
const uiSchemaTmp = {
  listOfStrings: {
    items: {
      'ui:emptyValue': '',
    },
  },
  multipleChoicesList: {
    'ui:widget': 'checkboxes',
  },
  unorderable: {
    'ui:options': {
      orderable: false,
    },
  },
  unremovable: {
    'ui:options': {
      removable: false,
    },
  },
  noToolbar: {
    'ui:options': {
      addable: false,
      orderable: false,
      removable: false,
    },
  },
  fixedNoToolbar: {
    'ui:options': {
      addable: false,
      orderable: false,
      removable: false,
    },
  },
};
const uiSchema = {};

export { uiSchema, jsonSchema };
