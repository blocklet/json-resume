import React from 'react';
import { MuiForm4 } from '@rjsf/material-ui';

import { jsonSchema, uiSchema } from '../../schema/projects';
import useLocalFormState from '../../hooks/form-state';

const Projects = () => {
  const { localFormState, setLocalFormState } = useLocalFormState([], jsonSchema.key);
  const onChange = (data) => {
    setLocalFormState({ [jsonSchema.key]: data.formData });
  };
  return (
    <div>
      <h2>Projects</h2>
      <MuiForm4 schema={jsonSchema} formData={localFormState[jsonSchema.key]} uiSchema={uiSchema} onChange={onChange}>
        <></>
      </MuiForm4>
    </div>
  );
};

export default Projects;
