/* eslint-disable no-console */
import React from 'react';

import useLocalFormState from '../hooks/form-state';

const Export = () => {
  const { localFormState } = useLocalFormState();
  return (
    <div>
      <h2>Export</h2>
      <p>Copy the following text in a text file and save it with the extension ".json" (.e.g resume.json).</p>
      <textarea id="story" name="story" rows="25" cols="90" defaultValue={JSON.stringify(localFormState)} />
    </div>
  );
};

export default Export;
