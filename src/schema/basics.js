import countries from '../libs/countries';

const countryCodeEnum = countries.map((item) => item.abbr);
const countryCodeEnumNames = countries.map((item) => item.english);

const jsonSchema = {
  key: 'basics',
  type: 'object',
  required: ['name', 'label'],
  properties: {
    name: {
      type: 'string',
      title: 'Full Name',
      default: '',
    },
    label: {
      type: 'string',
      title: 'Professional Title',
      default: '',
    },
    image: {
      type: 'string',
      title: 'Profile Picture',
      default: '',
    },
    email: {
      type: 'string',
      title: 'Email',
      default: '',
    },
    phone: {
      type: 'string',
      title: 'Phone',
      default: '',
    },
    url: {
      type: 'string',
      title: 'Website',
      default: '',
    },
    summary: {
      type: 'string',
      title: 'Summary',
      default: '',
    },
    location: {
      type: 'object',
      title: 'Location',
      description:
        'Where do you primarily live or work from?All field are optional but City and/or Country are recommended.',
      properties: {
        address: {
          type: 'string',
          title: 'Street Address',
          default: '',
        },
        postalCode: {
          type: 'string',
          title: 'Postal/Zip Code',
          default: '',
        },
        city: {
          type: 'string',
          title: 'city',
          default: '',
        },
        countryCode: {
          type: 'string',
          title: 'Country',
          enum: countryCodeEnum,
          enumNames: countryCodeEnumNames,
          default: '',
        },
        region: {
          type: 'string',
          title: 'Region/State/Province',
          default: '',
        },
      },
    },
    profiles: {
      type: 'array',
      title: 'Social Network Profiles',
      description: 'Any social networks that you participate in.',
      minItems: 1,
      items: {
        type: 'object',
        required: ['network'],
        properties: {
          network: {
            type: 'string',
            title: 'Network',
            description: 'Name of the network (e.g. LinkedIn, Facebook, Twitter)',
            default: '',
          },
          username: {
            type: 'string',
            title: 'Username',
            description: 'Your username in the network (e.g. "neutralthoughts")',
            default: '',
          },
          url: {
            type: 'string',
            title: 'URL',
            description: 'URL to your profile in the network (e.g. http://twitter.example.com/neutralthoughts)',
            default: '',
          },
        },
      },
    },
  },
};
const uiSchema = {
  name: {
    'ui:autofocus': true,
    'ui:help': 'Your full name.',
  },
  label: {
    'ui:help': 'e.g. software developer, IT manager, graphic designer.',
  },
  image: {
    'ui:help': 'URL (as per RFC 3986) to a image in JPEG or PNG format of your profile photo.',
  },
  email: {
    'ui:help': 'Email address (e.g. person@domain.com)',
  },
  phone: {
    'ui:help': 'Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923.',
  },
  url: {
    'ui:help': 'URL (as per RFC 3986) to your website, e.g. personal homepage.',
  },
  summary: {
    'ui:widget': 'textarea',
    'ui:options': {
      rows: 5,
    },
    'ui:help': 'About yourself - what your do, who you are, what you are looking for in your career.',
  },
};

export { uiSchema, jsonSchema };
