const jsonSchema = {
  key: 'education',
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    required: ['institution', 'area'],
    properties: {
      institution: {
        type: 'string',
        title: 'Institution',
        description: 'Name of the institution (e.g. Massachusetts Institute of Technology).',
        default: '',
      },
      area: {
        type: 'string',
        title: 'Area',
        description: 'Discipline or area of interest (e.g. Arts).',
        default: '',
      },
      studyType: {
        type: 'string',
        title: 'Study Type',
        description: 'Type of study (e.g. Bachelor, Masters, PhD).',
        default: '',
        format: 'date',
      },
      startDate: {
        type: 'string',
        title: 'Start Date',
        description: 'Date you started',
        default: '',
        format: 'date',
      },
      endDate: {
        type: 'string',
        title: 'End Date',
        description: 'Date completed study.',
        default: '',
        format: 'date',
      },
      score: {
        type: 'string',
        title: 'GPA',
        description: 'Grade Point Average (e.g. 3.67/4.0).',
        default: '',
      },
      courses: {
        type: 'array',
        title: 'Courses',
        description: 'List notable courses/subjects (e.g. H1302 - Introduction to American history).',
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
