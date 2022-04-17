const jsonSchema = {
  key: 'projects',
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    required: ['name', 'description'],
    properties: {
      name: {
        type: 'string',
        title: 'Name',
        description: 'Name of the company or organisation where you worked.',
        default: '',
      },
      description: {
        type: 'string',
        title: 'Description',
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
        format: 'Date',
        default: '',
      },
      endDate: {
        type: 'string',
        title: 'End Date',
        description: 'Date you finished in the position (leave blank if you are still currently in it).',
        format: 'Date',
        default: '',
      },
      highlights: {
        type: 'array',
        title: 'Highlights',
        description:
          'Briefly describe successes and outcomes (e.g. Increased profits by 20% from 2011-2012 through viral advertising).',
        default: [''],
        items: {
          type: 'string',
        },
        minItems: 1,
      },
      keywords: {
        type: 'array',
        title: 'Keywords',
        default: [''],
        items: {
          type: 'string',
        },
        minItems: 1,
      },
      roles: {
        type: 'array',
        title: 'Roles',
        default: [''],
        items: {
          type: 'string',
        },
        minItems: 1,
      },
    },
  },
};
const uiSchema = {};

export { jsonSchema, uiSchema };
