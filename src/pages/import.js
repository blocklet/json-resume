/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useRef } from 'react';
import Button from '@arcblock/ux/lib/Button';
import { useNavigate } from 'react-router-dom';

import useLocalFormState from '../hooks/form-state';

const Import = () => {
  const textareaRef = useRef(null);
  const { setLocalFormState } = useLocalFormState();
  const navigate = useNavigate();

  const handleImport = () => {
    try {
      if (textareaRef.current.value) {
        setLocalFormState(JSON.parse(textareaRef.current.value));
        navigate('/section/basics');
      }
    } catch (e) {
      console.error(e);
      alert(`import failed: ${e.message}`);
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
      </div>
    </div>
  );
};

export default Import;
