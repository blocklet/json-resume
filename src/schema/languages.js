const jsonSchema = {
  key: 'languages',
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    required: ['language', 'fluency'],
    properties: {
      language: {
        type: 'string',
        title: 'Language',
        description: 'Name of the language (e.g. English, Spanish).',
        default: '',
      },
      fluency: {
        type: 'string',
        title: 'Fluency',
        description: 'Fluency in the language (e.g. Fluent, Beginner).',
        default: '',
      },
    },
  },
};
const uiSchema = {};
export { jsonSchema, uiSchema };
