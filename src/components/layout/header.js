/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Hidden, IconButton, SvgIcon, Toolbar, Typography } from '@material-ui/core';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';
import SessionManager from '@arcblock/did-connect/lib/SessionManager';
import { css } from '@emotion/react/macro';
import { Link } from 'react-router-dom';
import Menu from 'mdi-material-ui/Menu';
import joinURL from 'url-join';

import { useSessionContext } from '../../contexts/session';
import { useBlockletContext } from '../../contexts/blocklet-info';

const Header = ({ onToggleDrawer, hiddenMenu, ...rest }) => {
  const { session } = useSessionContext();
  const { locale } = useLocaleContext();
  const { blocklet: blockletInfo } = useBlockletContext();

  const cssMap = {
    appBar: (theme) => css`
      background-color: #fff;
      color: #222;
      border-bottom: 1px solid ${theme.palette.divider};
    `,
    toolbar: css`
      display: flex;
      padding-left: 16px;
      justify-content: space-between;
    `,
  };

  let prefix = window.env && window.env.apiPrefix ? `${window.env.apiPrefix}` : '/';
  prefix = blockletInfo.prefix || '/';

  const logoUrl = joinURL(prefix, '/nav.png');

  return (
    <AppBar css={cssMap.appBar} elevation={0} position="static" color="primary" {...rest}>
      <Toolbar css={cssMap.toolbar}>
        <Box display="flex">
          {!hiddenMenu && (
            <Hidden mdUp>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={onToggleDrawer}
                className="menu-button">
                <SvgIcon component={Menu} />
              </IconButton>
            </Hidden>
          )}
          <Typography variant="h6">
            <Link
              to={prefix}
              css={css`
                color: #333;
                display: flex;
                align-items: center;
              `}>
              <img src={logoUrl} alt="logo" width={80} height={60} style={{ marginRight: '16px' }} />
              Json Resume
            </Link>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <LocaleSelector size={26} showText={false} />
          <SessionManager showRole session={session} locale={locale} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  onToggleDrawer: PropTypes.func,
  hiddenMenu: PropTypes.bool,
};
Header.defaultProps = {
  hiddenMenu: false,
  onToggleDrawer: () => {},
};

export default Header;
