/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import WorkIcon from '@material-ui/icons/Work';
import GroupIcon from '@material-ui/icons/Group';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import BuildIcon from '@material-ui/icons/Build';
import TranslateIcon from '@material-ui/icons/Translate';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import HomeIcon from '@material-ui/icons/Home';
import VisibilityIcon from '@material-ui/icons/Visibility';

const IconMap = {
  AssignmentIndIcon,
  WorkIcon,
  GroupIcon,
  CastForEducationIcon,
  CardMembershipIcon,
  LibraryBooksIcon,
  BuildIcon,
  TranslateIcon,
  FavoriteIcon,
  EventNoteIcon,
  DeviceHubIcon,
  EmojiEventsIcon,
  PublishIcon,
  GetAppIcon,
  HomeIcon,
  VisibilityIcon,
};

const getMenuList = (t) => [
  {
    key: '/',
    locale: t('siderbar.home'),
    component: 'Home',
    icon: 'HomeIcon',
    status: 'normal',
  },
  {
    key: '/basics',
    locale: t('siderbar.basics'),
    component: 'Basics',
    icon: 'AssignmentIndIcon',
    status: 'normal',
  },
  {
    key: '/work',
    locale: t('siderbar.work'),
    component: 'Work',
    icon: 'WorkIcon',
    status: 'normal',
  },
  {
    key: '/skills',
    locale: t('siderbar.skills'),
    component: 'Skills',
    icon: 'BuildIcon',
    status: 'normal',
  },
  {
    key: '/volunteer',
    locale: t('siderbar.volunteer'),
    component: 'Volunteer',
    icon: 'GroupIcon',
    status: 'padding',
  },
  {
    key: '/education',
    locale: t('siderbar.education'),
    component: 'Education',
    icon: 'CastForEducationIcon',
    status: 'padding',
  },
  {
    key: '/awards',
    locale: t('siderbar.awards'),
    component: 'Awards',
    icon: 'CardMembershipIcon',
    status: 'padding',
  },
  {
    key: '/publications',
    locale: t('siderbar.publications'),
    component: 'Publications',
    icon: 'LibraryBooksIcon',
    status: 'padding',
  },
  {
    key: '/languages',
    locale: t('siderbar.languages'),
    component: 'Languages',
    icon: 'TranslateIcon',
    status: 'padding',
  },
  {
    key: '/interests',
    locale: t('siderbar.interests'),
    component: 'Interests',
    icon: 'FavoriteIcon',
    status: 'padding',
  },
  {
    key: '/references',
    locale: t('siderbar.references'),
    component: 'References',
    icon: 'EventNoteIcon',
    status: 'padding',
  },
  {
    key: '/projects',
    locale: t('siderbar.projects'),
    component: 'Projects',
    icon: 'DeviceHubIcon',
    status: 'padding',
  },
  {
    key: '/preview',
    locale: t('siderbar.preview'),
    component: 'Preview',
    icon: 'VisibilityIcon',
    status: 'normal',
  },
  {
    key: '/import',
    locale: t('siderbar.import'),
    component: 'Import',
    icon: 'PublishIcon',
    status: 'normal',
  },
  {
    key: '/export',
    locale: t('siderbar.export'),
    component: 'Export',
    icon: 'GetAppIcon',
    status: 'normal',
  },
];

const Sidebar = ({ active }) => {
  const { t } = useContext(LocaleContext);
  const menuList = getMenuList(t).filter((i) => i.status === 'normal');
  return (
    <List component="nav">
      {menuList.map((item) => {
        const Icon = IconMap[item.icon];
        return (
          <ListItem key={item.key} component={Link} to={item.key} selected={active === item.key}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={item.locale} />
          </ListItem>
        );
      })}
    </List>
  );
};

Sidebar.propTypes = {
  active: PropTypes.string,
};
Sidebar.defaultProps = {
  active: '',
};

export default Sidebar;
export { getMenuList };
