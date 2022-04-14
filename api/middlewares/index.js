const MAX_PAGE_SIZE = 50;
const DEFAULT_PAGE = 1;

module.exports = {
  authenticate: (req, res, next) => {
    if (!req.headers['x-user-did']) {
      return res.status(401).json({ error: 'login required' });
    }
    req.user = {
      did: req.headers['x-user-did'],
      name: decodeURIComponent(req.headers['x-user-fullname']),
      role: req.headers['x-user-role'],
    };

    return next();
  },
  authAdmin: (req, res, next) => {
    if (!req.user) {
      res.status(403).json({ error: 'Permission denied' });
    }
    if (req.user.did && ['admin', 'owner'].includes(req.user.role)) {
      return next();
    }
    return res.status(403).json({ error: 'Permission denied' });
  },
  paginate: (req, res, next) => {
    let page = Number(req.query.page || DEFAULT_PAGE);
    let pageSize = Number(req.query.pageSize || req.query.page_size || MAX_PAGE_SIZE);

    page = Number.isNaN(page) ? DEFAULT_PAGE : page;
    pageSize = Number.isNaN(pageSize) ? MAX_PAGE_SIZE : pageSize;

    req.pagination = { page, pageSize };

    next();
  },
  queryOption: (req, _res, next) => {
    const { sortBy = '', sortDirection = '', filter = {}, search = '' } = req.query;
    const queryOption = {
      sort: {},
      filter: {},
      search: '',
      // 兼容GQL
      sortBy,
      sortDirection,
    };
    if (sortBy && sortDirection) {
      let direction;
      if (sortDirection === 'asc') {
        direction = 1;
      } else if (sortDirection === 'desc') {
        direction = -1;
      }
      if (direction) {
        queryOption.sort = {
          [sortBy]: direction,
        };
      }
    }
    if (filter && filter instanceof Object && !Array.isArray(filter)) {
      queryOption.filter = filter;
    }
    if (search) {
      queryOption.search = search;
    }
    req.queryOption = queryOption;
    next();
  },
};
