/* eslint-disable no-console */
import React from 'react';
import { MuiForm4 } from '@rjsf/material-ui';

const FormJson = () => {
  const schema = {
    type: 'array',
    items: {
      type: 'string',
    },
    additionalItems: {
      type: 'boolean',
    },
  };

  const log = (type) => console.log.bind(console, type);
  return <MuiForm4 schema={schema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('errors')} />;
};
export default FormJson;
