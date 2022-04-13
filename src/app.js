/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { LocaleProvider, useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import CookieConsent from '@arcblock/ux/lib/CookieConsent';
import get from 'lodash-es/get';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Home from './pages/home';
import translations from './locales';
import { SessionProvider } from './contexts/session';
import theme from './libs/theme';
import Layout, { getMenuList, Sidebar } from './components/layout';
import { BlockletProvider } from './contexts/blocklet-info';

import Import from './pages/import';
import Preview from './pages/preview';
import Export from './pages/export';
import Work from './pages/sections/work';
import Basics from './pages/sections/basics';
import Volunteer from './pages/sections/volunteer';
import Education from './pages/sections/education';
import Awards from './pages/sections/awards';
import Publications from './pages/sections/publications';
import Skills from './pages/sections/skills';
import Languages from './pages/sections/languages';
import Interests from './pages/sections/interests';
import References from './pages/sections/references';
import Projects from './pages/sections/projects';

const componentMap = {
  Home,
  Import,
  Preview,
  Export,
  Work,
  Basics,
  Volunteer,
  Education,
  Awards,
  Publications,
  Skills,
  Languages,
  Interests,
  References,
  Projects,
};
const GlobalStyle = createGlobalStyle`
      a {
        color: ${theme.palette.primary.main};
        text-decoration: none !important;
      }
      a:hover,
      a:hover * {
        text-decoration: none !important;
      }
`;

const InsideApp = () => {
  const { locale, t } = useLocaleContext();
  dayjs.locale(locale === 'zh' ? 'zh-cn' : locale);
  dayjs.extend(LocalizedFormat);
  dayjs.extend(relativeTime);
  const menuList = getMenuList(t);
  const location = useLocation();
  return (
    <div className="app">
      <CssBaseline />
      <GlobalStyle />
      <Layout sidebar={<Sidebar active={location.pathname} />}>
        <Routes>
          {menuList.map((item) => {
            const Component = componentMap[item.component];
            return <Route exact key={item.key} path={item.key} element={<Component />} />;
          })}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
      <CookieConsent locale={locale} />
    </div>
  );
};

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <LocaleProvider translations={translations}>
            <SessionProvider serviceHost={get(window, 'blocklet.prefix', '/')}>
              <BlockletProvider>
                <InsideApp />
              </BlockletProvider>
            </SessionProvider>
          </LocaleProvider>
        </EmotionThemeProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

const WrappedApp = App;

export default () => {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <WrappedApp />
    </Router>
  );
};
