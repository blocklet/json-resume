/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useRef } from 'react';
import Button from '@arcblock/ux/lib/Button';
import { useNavigate } from 'react-router-dom';

import useLocalFormState from '../hooks/form-state';

const Import = () => {
  const textareaRef = useRef(null);
  const { setLocalFormState, removeLocalFormState } = useLocalFormState();
  const navigate = useNavigate();

  const handleImport = () => {
    try {
      if (textareaRef.current.value) {
        setLocalFormState(JSON.parse(textareaRef.current.value));
        navigate('/basics');
      }
    } catch (error) {
      alert('import failed');
      console.error(error.message);
    }
  };
  const handleClear = () => {
    const c = window.confirm('Are you sure you want to clear your saved resume?');
    if (c === true) {
      removeLocalFormState();
      alert('clear success');
    }
  };
  return (
    <div>
      <h2>Import</h2>
      <p>Past existing resume JSON and import to continue editing.</p>
      <textarea ref={textareaRef} id="story" name="story" rows="25" cols="90" />
      <div>
        <Button color="primary" variant="contained" onClick={handleImport}>
          Import
        </Button>
        <Button color="danger" variant="contained" onClick={handleClear} style={{ marginLeft: '8px' }}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default Import;
