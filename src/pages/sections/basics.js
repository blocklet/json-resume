import React from 'react';
import { MuiForm4 } from '@rjsf/material-ui';

import { jsonSchema, uiSchema } from '../../schema/basics';

const Basics = () => {
  // eslint-disable-next-line no-console
  const log = (type) => console.log.bind(console, type);
  return (
    <div>
      <h2>Basics</h2>
      <MuiForm4
        schema={jsonSchema}
        uiSchema={uiSchema}
        onChange={log('changed')}
        onSubmit={log('submitted')}
        onError={log('errors')}
      />
    </div>
  );
};

export default Basics;
