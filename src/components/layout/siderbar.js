/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import React, { Fragment, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import groupBy from 'lodash-es/groupBy';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

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
import ClearIcon from '@material-ui/icons/Clear';

import useLocalFormState from '../../hooks/form-state';

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
    key: '/section/basics',
    locale: t('siderbar.basics'),
    component: 'Basics',
    icon: 'AssignmentIndIcon',
    group: 'section',
    status: 'normal',
  },
  {
    key: '/section/work',
    locale: t('siderbar.work'),
    component: 'Work',
    icon: 'WorkIcon',
    group: 'section',
    status: 'normal',
  },
  {
    key: '/section/skills',
    locale: t('siderbar.skills'),
    component: 'Skills',
    icon: 'BuildIcon',
    group: 'section',
    status: 'normal',
  },
  {
    key: '/section/volunteer',
    locale: t('siderbar.volunteer'),
    component: 'Volunteer',
    icon: 'GroupIcon',
    group: 'section',
    status: 'normal',
  },
  {
    key: '/section/education',
    locale: t('siderbar.education'),
    component: 'Education',
    icon: 'CastForEducationIcon',
    group: 'section',
    status: 'normal',
  },
  {
    key: '/section/awards',
    locale: t('siderbar.awards'),
    component: 'Awards',
    icon: 'CardMembershipIcon',
    group: 'section',
    status: 'normal',
  },
  {
    key: '/section/publications',
    locale: t('siderbar.publications'),
    component: 'Publications',
    icon: 'LibraryBooksIcon',
    group: 'section',
    status: 'normal',
  },
  {
    key: '/section/languages',
    locale: t('siderbar.languages'),
    component: 'Languages',
    icon: 'TranslateIcon',
    group: 'section',
    status: 'normal',
  },
  {
    key: '/section/interests',
    locale: t('siderbar.interests'),
    component: 'Interests',
    icon: 'FavoriteIcon',
    group: 'section',
    status: 'normal',
  },
  {
    key: '/section/references',
    locale: t('siderbar.references'),
    component: 'References',
    icon: 'EventNoteIcon',
    group: 'section',
    status: 'normal',
  },
  {
    key: '/section/projects',
    locale: t('siderbar.projects'),
    component: 'Projects',
    icon: 'DeviceHubIcon',
    group: 'section',
    status: 'normal',
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
  const [open, setOpen] = useState(true);
  const { removeLocalFormState } = useLocalFormState();
  const finalMenuList = useMemo(() => {
    const menuList = getMenuList(t).filter((i) => i.status === 'normal');
    const sectionList = menuList.filter((i) => i.group === 'section');
    const obj = { key: '/section', locale: t('siderbar.resume'), ...groupBy(sectionList, 'group') };
    menuList.splice(1, sectionList.length, obj);
    return menuList;
  }, [t]);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClear = () => {
    const c = window.confirm('Are you sure you want to clear local saved resume?');
    if (c === true) {
      removeLocalFormState();
      alert('clear success');
    }
  };
  return (
    <List component="nav">
      {finalMenuList.map((item) => {
        if (item.key === '/section') {
          return (
            <Fragment key={item.key}>
              <ListItem
                className={classes.nested}
                onClick={handleClick}
                button
                to={item.key}
                selected={active === item.key}>
                <ListItemText primary={item.locale} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.section.map((section) => {
                    const SectionIcon = IconMap[section.icon];
                    return (
                      <ListItem
                        key={section.key}
                        className={classes.section}
                        disabled={section.disabled}
                        component={Link}
                        to={section.key}
                        selected={active === section.key}
                        button>
                        <ListItemIcon>{SectionIcon && <SectionIcon />}</ListItemIcon>
                        <ListItemText primary={section.locale} />
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </Fragment>
          );
        }
        const Icon = IconMap[item.icon];
        return (
          <ListItem key={item.key} component={Link} to={item.key} selected={active === item.key}>
            <ListItemIcon>{Icon && <Icon />}</ListItemIcon>
            <ListItemText primary={item.locale} />
          </ListItem>
        );
      })}
      <ListItem to="/clear" button onClick={handleClear}>
        <ListItemIcon>
          <ClearIcon />
        </ListItemIcon>
        <ListItemText primary={t('siderbar.clear')} />
      </ListItem>
    </List>
  );
};

Sidebar.propTypes = {
  active: PropTypes.string,
};
Sidebar.defaultProps = {
  active: '',
};
const useStyles = makeStyles((theme) => ({
  section: {
    paddingLeft: theme.spacing(6),
  },
  nested: {
    paddingLeft: theme.spacing(9),
  },
}));

export default Sidebar;
export { getMenuList };
