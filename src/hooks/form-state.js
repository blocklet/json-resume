const STATE_KEY = 'local-form-state';
const defaultFormValue = {
  basics: {
    name: '',
    label: '',
    picture: '',
    email: '',
    phone: '',
    url: '',
    summary: '',
    location: {
      address: '',
      postalCode: '',
      city: '',
      countryCode: '',
      region: '',
    },
    profiles: [
      {
        network: '',
        username: '',
        url: '',
      },
    ],
  },
  work: [
    {
      name: '',
      position: '',
      url: '',
      startDate: '',
      endDate: '',
      summary: '',
      highlights: [''],
    },
  ],
  skill: [
    {
      name: '',
      level: '',
      keywords: ['HTML', 'CSS', 'JavaScript'],
    },
  ],
  education: [
    {
      institution: '',
      area: '',
      studyType: '',
      startDate: '',
      endDate: '',
      score: '',
      courses: [''],
    },
  ],
  awards: [
    {
      title: '',
      date: '',
      awarder: '',
      summary: '',
    },
  ],
  publications: [
    {
      name: '',
      publisher: '',
      releaseDate: '',
      url: '',
      summary: '',
    },
  ],
  languages: [
    {
      language: '',
      fluency: '',
    },
  ],
  interests: [
    {
      name: '',
      keywords: [''],
    },
  ],
  references: [
    {
      name: '',
      reference: '',
    },
  ],
  projects: [
    {
      name: '',
      description: '',
      url: '',
      startDate: '',
      endDate: '',
      highlights: [''],
      keywords: [''],
      roles: [''],
    },
  ],
};
/**
 * 将 form 中的数据时时同步到 localStorage
 * @param {*} defaultValue
 * @param {*} path basics、work... 按照简历中的大标题去存储 json
 */
const useLocalFormState = (defaultValue = {}, path) => {
  const localFormState = JSON.parse(window.localStorage.getItem(STATE_KEY)) || defaultFormValue;
  if (path && !(path in localFormState)) {
    setLocalFormState({ [path]: defaultValue });
  }
  function setLocalFormState(value) {
    window.localStorage.setItem(STATE_KEY, JSON.stringify({ ...localFormState, ...value }));
  }
  function removeLocalFormState() {
    window.localStorage.removeItem(STATE_KEY);
  }
  return { localFormState, setLocalFormState, removeLocalFormState };
};
export default useLocalFormState;
