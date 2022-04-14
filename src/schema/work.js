const jsonSchema = {
  key: 'work',
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    required: ['name', 'position'],
    properties: {
      name: {
        type: 'string',
        title: 'Company',
        description: 'Name of the company or organisation where you worked.',
        default: '',
      },
      position: {
        type: 'string',
        title: 'Position',
        description: 'Your role or position title.',
        default: '',
      },
      url: {
        type: 'string',
        title: 'Website',
        description: 'Company website.',
        default: '',
      },
      startDate: {
        type: 'string',
        title: 'Start Date',
        description: 'Date you started in the position.',
        default: '',
        format: 'date',
      },
      endDate: {
        type: 'string',
        title: 'End Date',
        description: 'Date you finished in the position (leave blank if you are still currently in it).',
        default: '',
        format: 'date',
      },
      summary: {
        type: 'string',
        title: 'Summary',
        default: '',
      },
      highlights: {
        type: 'array',
        title: 'Highlights',
        description:
          'Briefly describe successes and outcomes (e.g. Increased profits by 20% from 2011-2012 through viral advertising).',
        items: {
          type: 'string',
        },
        minItems: 1,
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
      'ui:help': 'Details of your work, responsibilities and achievements. And a little about the company.',
    },
  },
};

export { uiSchema, jsonSchema };
