/* eslint-disable no-console */
import React, { useCallback } from 'react';
import { MuiForm4 } from '@rjsf/material-ui';

import { jsonSchema, uiSchema } from '../../schema/work';
import useLocalFormState from '../../hooks/form-state';

const Basics = () => {
  const { localFormState, setLocalFormState } = useLocalFormState([], 'work');
  const onChange = useCallback((data) => {
    setLocalFormState({ work: data.formData });
  });
  return (
    <div>
      <h1>Work</h1>
      <MuiForm4 schema={jsonSchema} formData={localFormState.work} uiSchema={uiSchema} onChange={onChange}>
        <></>
      </MuiForm4>
    </div>
  );
};

export default Basics;
