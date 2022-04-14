import React, { useCallback } from 'react';
import { MuiForm4 } from '@rjsf/material-ui';

import { jsonSchema, uiSchema } from '../../schema/basics';
import useLocalFormState from '../../hooks/form-state';

const Basics = () => {
  const { localFormState, setLocalFormState } = useLocalFormState({}, 'basics');
  const onChange = useCallback((data) => {
    setLocalFormState({ basics: data.formData });
  });
  return (
    <div>
      <h1>Basics</h1>
      <MuiForm4 schema={jsonSchema} formData={localFormState.basics} uiSchema={uiSchema} onChange={onChange}>
        <></>
      </MuiForm4>
    </div>
  );
};

export default Basics;
