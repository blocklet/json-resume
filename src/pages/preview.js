/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Button from '@arcblock/ux/lib/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Center from '@arcblock/ux/lib/Center';

import joinUrl from 'url-join';
import axios from '../libs/api';
import useLocalFormState from '../hooks/form-state';
import { useProtectLogin } from '../hooks/protect';
import { useBlockletContext } from '../contexts/blocklet-info';

const Preview = () => {
  const [htmlDoc, setHtmlDoc] = useState('');
  const [theme, setTheme] = useState('flat');
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const { localFormState } = useLocalFormState();
  const { isProtected: hasLogin } = useProtectLogin();
  const { myResume } = useBlockletContext();

  console.log('myResume===', myResume);

  const { meta = { theme }, ...otherSchema } = localFormState;

  const getResumeHTML = async (_theme) => {
    setLoading(true);
    const result = await axios.post('/api/resume', { schema: otherSchema, theme: _theme });
    setHtmlDoc(result.data);
    setLoading(false);
  };
  const handleChange = (e) => {
    getResumeHTML(e.target.value);
    setTheme(e.target.value);
  };
  const handlePublish = async () => {
    setPublishing(true);
    const result = await axios.post('/api/resume/publish', { schema: otherSchema, theme });
    setPublishing(false);
    setPublished(true);
  };
  const getMyResume = async () => {
    window.open(joinUrl(window.location.origin, `/api/resume/${myResume.data._id}`));
  };
  useEffect(() => {
    getResumeHTML(theme);
  }, []);
  return (
    <>
      <h2>Preview</h2>
      <h3>点击切换主题 预览不同效果</h3>
      <div>
        <RadioGroup row value={theme} onChange={handleChange}>
          <FormControlLabel value="flat" control={<Radio color="primary" />} label="Flat" />
          <FormControlLabel value="elegant" control={<Radio color="primary" />} label="Elegant" />
          <FormControlLabel value="caffeine" control={<Radio color="primary" />} label="Caffeine" />
        </RadioGroup>
      </div>
      <h3>发布简历</h3>
      <div>
        <Button loading={publishing} disabled={!hasLogin} onClick={handlePublish} color="primary" variant="contained">
          发布
        </Button>
        {!hasLogin && <span>（登陆后才可以发布）</span>}
        {(myResume.data || published) && (
          <Button onClick={getMyResume} style={{ marginLeft: '8px' }}>
            查看已经发布的简历
          </Button>
        )}
      </div>
      <p>发布后你的简历将保存在当前的 blocklet服务器中, 在有网络的环境下可以随时查看简历</p>
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <iframe style={{ height: '800px' }} srcDoc={htmlDoc} title="resume-preview" />
      )}
    </>
  );
};

export default Preview;
