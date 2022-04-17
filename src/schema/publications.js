const jsonSchema = {
  key: 'publications',
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    required: ['name', 'publisher'],
    properties: {
      name: {
        type: 'string',
        title: 'Name',
        description: 'Name of the article (e.g. The World Wide Web).',
        default: '',
      },
      publisher: {
        type: 'string',
        title: 'Publisher',
        description: 'Name of the publication (e.g. IEEE, Computer Magazine).',
        default: '',
      },
      releaseDate: {
        type: 'string',
        title: 'Release Date',
        description: 'When it was published.',
        default: '',
        format: 'Date',
      },
      url: {
        type: 'string',
        title: 'Website',
        description: 'URL of the publisher or the actual publication.',
        default: '',
      },
      summary: {
        type: 'string',
        title: 'Summary',
        description: 'Details of the article (e.g. Discussion of the World Wide Web, HTTP, HTML.).',
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
