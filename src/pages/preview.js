import React, { useEffect, useState } from 'react';
import Button from '@arcblock/ux/lib/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';

import joinUrl from 'url-join';
import axios from '../libs/api';
import useLocalFormState from '../hooks/form-state';
import { useProtectLogin } from '../hooks/protect';
import { useUserContext } from '../contexts/user';

const Preview = () => {
  const [htmlDoc, setHtmlDoc] = useState('');
  const [theme, setTheme] = useState('flat');
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(null);
  const { localFormState } = useLocalFormState();
  const { isProtected: hasLogin } = useProtectLogin();
  const user = useUserContext();
  const { t } = useLocaleContext();

  const { meta, ...otherSchema } = localFormState;

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
    setPublished(result.data);
  };
  const getMyResume = async () => {
    window.open(joinUrl(window.location.origin, `/api/resume/${user?.data?._id || published?._id}`));
  };
  useEffect(() => {
    getResumeHTML(theme);
  }, []);
  return (
    <>
      <h2>{t('siderbar.preview')}</h2>
      <h3>{t('preview.chooseTheme')}</h3>
      <div>
        <RadioGroup row value={theme} onChange={handleChange}>
          <FormControlLabel value="flat" control={<Radio color="primary" />} label="Flat" />
          <FormControlLabel value="elegant" control={<Radio color="primary" />} label="Elegant" />
          <FormControlLabel value="caffeine" control={<Radio color="primary" />} label="Caffeine" />
        </RadioGroup>
      </div>
      <h3>{t('preview.publishResume')}</h3>
      <div>
        <Button loading={publishing} disabled={!hasLogin} onClick={handlePublish} color="primary" variant="contained">
          {t('preview.publish')}
        </Button>
        {!hasLogin && <span> {t('preview.publishTips1')}</span>}
        {(user?.data || published) && (
          <Button onClick={getMyResume} style={{ marginLeft: '8px' }}>
            {t('preview.viewPublished')}
          </Button>
        )}
      </div>
      <p> {t('preview.publishTips2')}</p>
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
