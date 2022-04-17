const jsonSchema = {
  key: 'awards',
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    required: ['institution', 'area'],
    properties: {
      title: {
        type: 'string',
        title: 'Title',
        description: 'Name of the award (e.g. One of the 100 greatest minds of the century).',
        default: '',
      },
      date: {
        type: 'string',
        title: 'Study Type',
        description: 'When the award was received',
        default: '',
        format: 'Date',
      },
      awarder: {
        type: 'string',
        title: 'Awarder',
        description: 'Who gave the award (e.g. Time Magazine).',
        default: '',
      },
      summary: {
        type: 'string',
        title: 'Summary',
        description: 'Describe the award and circumstances (e.g. Received for my work with Quantum Physics).',
        default: '',
      },
    },
  },
};

const uiSchema = {
  items: {
    summary: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 8,
      },
    },
  },
};

export { jsonSchema, uiSchema };
