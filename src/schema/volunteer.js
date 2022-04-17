const jsonSchema = {
  key: 'volunteer',
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    required: ['organization', 'position'],
    properties: {
      organization: {
        type: 'string',
        title: 'Organisation',
        description: 'Name of the organisation you volunteered for.',
        default: '',
      },
      position: {
        type: 'string',
        title: 'Position',
        description: 'Role or position title.',
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
        description: 'Date you started work (full date or month and year)',
        default: '',
        format: 'date',
      },
      endDate: {
        type: 'string',
        title: 'End Date',
        description: 'End date (if not current).',
        default: '',
        format: 'date',
      },
      summary: {
        type: 'string',
        title: 'Summary',
        description: 'Details of your work, responsibilities and achievements. And a little about the company.',
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

export { jsonSchema, uiSchema };
