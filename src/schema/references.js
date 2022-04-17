const jsonSchema = {
  key: 'references',
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    required: ['name', 'reference'],
    properties: {
      name: {
        type: 'string',
        title: 'Name',
        description: 'Name of the person (e.g. Don Long).',
        default: '',
      },
      reference: {
        type: 'string',
        title: 'Reference',
        description:
          'The reference given by the person (e.g. Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing).',
        default: '',
      },
    },
  },
};

const uiSchema = {
  items: {
    reference: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 8,
      },
    },
  },
};

export { jsonSchema, uiSchema };
