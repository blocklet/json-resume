import React from 'react';
import { MuiForm4 } from '@rjsf/material-ui';

import { jsonSchema, uiSchema } from '../../schema/skill';
import useLocalFormState from '../../hooks/form-state';

const Basics = () => {
  const { localFormState, setLocalFormState } = useLocalFormState([], jsonSchema.key);
  const onChange = (data) => {
    setLocalFormState({ [jsonSchema.key]: data.formData });
  };
  return (
    <div>
      <h1>Skill</h1>
      <MuiForm4 schema={jsonSchema} formData={localFormState[jsonSchema.key]} uiSchema={uiSchema} onChange={onChange}>
        <></>
      </MuiForm4>
    </div>
  );
};

export default Basics;
