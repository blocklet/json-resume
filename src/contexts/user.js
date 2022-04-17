import React, { createContext, useContext } from 'react';
import propTypes from 'prop-types';
import { useRequest } from 'ahooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Center from '@arcblock/ux/lib/Center';

import { useSessionContext } from './session';
import axios from '../libs/api';

const UserContext = createContext({});
const { Provider, Consumer } = UserContext;

function UserProvider({ children }) {
  const { session } = useSessionContext();
  const user = useRequest(getInfo, { refreshDeps: [session.user] });
  async function getInfo() {
    if (!session.user) return null;
    const { data } = await axios.get(`/api/resume/my/${session.user.did}`);
    return data;
  }
  if (user.loading) {
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  }
  return <Provider value={{ user }}>{children}</Provider>;
}

UserProvider.propTypes = {
  children: propTypes.any.isRequired,
};
UserProvider.defaultProps = {};
/**
 * 查询已登陆的用户发布过的简历数据
 * @returns
 */
function useUserContext() {
  const { user } = useContext(UserContext);
  return user;
}

export { UserContext, UserProvider, Consumer as UserConsumer, useUserContext };
