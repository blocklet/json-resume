/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useCallback } from 'react';
import { MuiForm4 } from '@rjsf/material-ui';
import merge from 'lodash-es/merge';

import { jsonSchema, uiSchema } from '../../schema/skill';
import useLocalFormState from '../../hooks/form-state';

const Basics = () => {
  // TODO  编写 fixedItemsList 类型 json-schema 会报错，暂时通过定义 默认的 tmp 来处理
  const tmp = {
    skills: [
      {
        name: '',
        level: '',
        keywords: ['HTML', 'CSS', 'JavaScript'],
      },
    ],
  };
  const { localFormState, setLocalFormState } = useLocalFormState(tmp.skills, 'skills');
  const defaultValue = merge(tmp, localFormState);
  const onChange = useCallback((data) => {
    setLocalFormState({ skills: data.formData });
  });
  return (
    <div>
      <h1>Skill</h1>
      <MuiForm4 schema={jsonSchema} formData={defaultValue.skills} uiSchema={uiSchema} onChange={onChange}>
        <></>
      </MuiForm4>
    </div>
  );
};

export default Basics;
