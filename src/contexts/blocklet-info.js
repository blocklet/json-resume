/* eslint-disable no-console */
import React, { createContext, useContext, useMemo } from 'react';
import propTypes from 'prop-types';
import { useRequest } from 'ahooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Center from '@arcblock/ux/lib/Center';

import { useSessionContext } from './session';
import axios from '../libs/api';
import useLocalFormState from '../hooks/form-state';

const BlockletContext = createContext({});
const { Provider, Consumer } = BlockletContext;

function BlockletProvider({ children }) {
  const tmp = {
    name: '',
    description: '',
    did: '',
    version: '',
    realDid: '',
    prefix: '',
    SHARE_REQUIREMENT: '',
    CHAIN_HOST: '',
    BLOCKLET_APP_URL: '',
    LAUNCH_URL: '',
    STORE_LOGO: '',
    STORE_MAINTAINER: '',
    CONFIG_API: '',
    groupPrefix: '',
  };
  // eslint-disable-next-line no-unused-vars
  const { setLocalFormState } = useLocalFormState();
  const { session } = useSessionContext();
  const myResume = useRequest(getInfo, { refreshDeps: [session.user] });
  const blocklet = useMemo(() => Object.assign({}, tmp, window?.blocklet), [window.blocklet]);
  async function getInfo() {
    if (!session.user) return null;
    const { data } = await axios.get(`/api/resume/my/${session.user.did}`);
    return data;
  }
  if (myResume.loading) {
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  }
  return <Provider value={{ blocklet, myResume }}>{children}</Provider>;
}

BlockletProvider.propTypes = {
  children: propTypes.any.isRequired,
};
BlockletProvider.defaultProps = {};

function useBlockletContext() {
  const { blocklet, myResume } = useContext(BlockletContext);
  return { blocklet, myResume };
}

export { BlockletContext, BlockletProvider, Consumer as BlockletConsumer, useBlockletContext };
