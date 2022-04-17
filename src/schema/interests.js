const jsonSchema = {
  key: 'interests',
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    required: ['organization', 'position'],
    properties: {
      name: {
        type: 'string',
        title: 'Name',
        description: 'Name of the intest (e.g. Philosophy).',
        default: '',
      },
      keywords: {
        type: 'array',
        title: 'Keywords',
        description: 'Keywords relating to the interest.',
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
