import React, { createContext, useContext, useMemo } from 'react';
import propTypes from 'prop-types';

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

  const blocklet = useMemo(() => Object.assign({}, tmp, window?.blocklet), [window.blocklet]);
  return <Provider value={{ blocklet }}>{children}</Provider>;
}

BlockletProvider.propTypes = {
  children: propTypes.any.isRequired,
};
BlockletProvider.defaultProps = {};

function useBlockletContext() {
  const { blocklet } = useContext(BlockletContext);
  return blocklet;
}

export { BlockletContext, BlockletProvider, Consumer as BlockletConsumer, useBlockletContext };
