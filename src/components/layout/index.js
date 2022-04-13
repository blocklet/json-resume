/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { useReactive } from 'ahooks';
import { Container, Box, Drawer, Hidden, ListItem, ListItemText } from '@material-ui/core';
import Footer from '@arcblock/ux/lib/Footer';
import CircularProgress from '@material-ui/core/CircularProgress';
import { css } from '@emotion/react/macro';
import { useBlockletContext } from '../../contexts/blocklet-info';

import Header from './header';
import Sidebar, { getMenuList } from './siderbar';

export default function Layout({ sidebar, loading, error, children, isUser }) {
  const blockletInfo = useBlockletContext();
  // eslint-disable-next-line no-console
  console.log('blockletInfo===', blockletInfo);
  const cssMap = {
    layout: css`
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    `,
    header: css`
      height: auto;
    `,
    body: (theme) => css`
      flex: 1;
      display: flex;
      .blockletInfo {
        .MuiListItemText-primary {
          font-weight: ${theme.typography.fontWeightBold};
        }
      }
    `,
    main: css`
      flex: 1;
      padding: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    `,
    sidebar: (theme) => css`
      flex-shrink: 0;
      width: 240px;
      border-right: 1px solid ${theme.palette.divider};
      /* hidden when children is null */
      &:empty {
        width: 0;
      }
    `,
    footer: (theme) => css`
      width: auto;
      padding: 8px;
      @media (max-width: ${theme.breakpoints.values.sm}px) {
        margin-top: 32px;
      }
    `,
  };

  const state = useReactive({
    drawerOpen: false,
  });

  const onToggleDrawer = () => {
    state.drawerOpen = !state.drawerOpen;
  };

  return (
    <Container css={cssMap.layout} maxWidth={false} disableGutters>
      <Header css={cssMap.header} onToggleDrawer={onToggleDrawer} hiddenMenu={!sidebar} />
      <div css={cssMap.body}>
        {sidebar && (
          <>
            {/* 窄屏 */}
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                open={state.drawerOpen}
                onClose={() => {
                  state.drawerOpen = false;
                }}
                classes={{
                  paper: 'drawer-paper',
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                  disablePortal: true,
                }}>
                <ListItem>
                  <ListItemText className="blockletInfo" primary={blockletInfo.name} />
                </ListItem>
                <aside css={cssMap.sidebar}>{sidebar}</aside>
              </Drawer>
            </Hidden>
            {/* 宽屏 */}
            <Hidden smDown>
              <aside css={cssMap.sidebar}>{sidebar}</aside>
            </Hidden>
          </>
        )}
        <Container css={cssMap.main} maxWidth={isUser ? 'lg' : 'xl'}>
          {loading && (
            <Box flex={1} display="flex" alignItems="center" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Box flex={1} display="flex" alignItems="center" justifyContent="center">
              {error}
            </Box>
          )}
          {!(loading || error) && (
            <Box flex={1} padding="16px" display="flex" flexDirection="column">
              {children}
            </Box>
          )}

          <Footer css={cssMap.footer} />
        </Container>
      </div>
    </Container>
  );
}

Layout.propTypes = {
  sidebar: PropTypes.any,
  children: PropTypes.any.isRequired,
  loading: PropTypes.bool,
  isUser: PropTypes.bool,
  error: PropTypes.any,
};

Layout.defaultProps = {
  sidebar: null,
  loading: false,
  isUser: false,
  error: null,
};

export { getMenuList, Sidebar };
