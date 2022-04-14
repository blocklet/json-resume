/* eslint-disable no-console */
const express = require('express');
const resumeSchema = require('resume-schema');
const themeFlat = require('jsonresume-theme-flat');
const themeElegant = require('jsonresume-theme-elegant');
const themeCaffeine = require('jsonresume-theme-caffeine');

const ResumeDB = require('../db/resume');
const { authenticate } = require('../middlewares');
// const env = require('../libs/env');

const router = express.Router();
const themeMap = {
  flat: themeFlat,
  elegant: themeElegant,
  caffeine: themeCaffeine,
};

const responseHtml = (req, res) => {
  const { schema, theme: resumeTheme } = req;
  const getTheme = (theme = 'flat') => {
    try {
      return themeMap[theme];
    } catch (e) {
      return {
        e: e.toString(),
        error: 'Theme is not supported please visit -> https://github.com/jsonresume/registry-functions/issues/7',
      };
    }
  };
  resumeSchema.validate(schema, async (err) => {
    if (err) {
      console.error('resumeSchema 校验失败,暂时不去处理');
    }
    const themeRenderer = getTheme(resumeTheme);
    if (themeRenderer?.error) {
      console.error('getTheme failed', themeRenderer.error);
      res.status(500).json({ error: themeRenderer.error });
      return;
    }
    let resumeHTML = '';
    try {
      resumeHTML = themeRenderer.render(schema);
    } catch (error) {
      console.error('简历渲染报错', error);
      res.status(500).json({ error: '简历渲染报错' });
      return;
    }
    res.send(resumeHTML);
  });
};
/**
 * 根据 id 查找简历
 */
router.get(
  '/:id',
  async (req, res, next) => {
    const { id } = req.params;
    const resume = await ResumeDB.findOne({ _id: id });
    if (!resume?.did) {
      res.status(404).json({ error: 'NOT FOUND' });
      return;
    }
    const { meta, ...otherSchema } = resume.schema;
    req.schema = otherSchema;
    req.theme = meta.theme;
    next();
  },
  responseHtml
);
router.get('/my/:did', async (req, res) => {
  const { did: myDid } = req.params;
  const resume = await ResumeDB.findOne({ did: myDid });
  res.json(resume);
});
/**
 * 调用后端服务生成简历,给前端预览使用
 */
router.post(
  '',
  async (req, res, next) => {
    const { schema, theme } = req.body;
    req.schema = schema;
    req.theme = theme;
    return next();
  },
  responseHtml
);
/**
 * 发布简历
 * 入库保存 json-schema 只有登陆的用户才可以操作
 * TODO: 已经存在则 update 简历, 暂时来不及做简历管理列表的逻辑，后面完善
 */
router.post('/publish', authenticate, async (req, res) => {
  const { did } = req.user;
  const { schema, theme } = req.body;
  const data = { ...schema, meta: { theme } };
  const resume = await ResumeDB.findOne({ did });
  let result;
  if (!resume) {
    console.log('新增');
    result = await ResumeDB.insert({ did, schema: data });
  } else {
    console.log('更新');
    await ResumeDB.update({ did }, { $set: { schema: data } });
    result = { ...resume, ...data };
  }

  res.json(result);
});

/**
 * 删除简历
 * 只有作者才能删除自己的简历
 */
router.delete('/:id/delete', async (req, res) => {
  const { id } = req.params;
  const { did } = req.user;
  const resume = await ResumeDB.findOne({ did });
  if (resume.did === did) {
    const result = await ResumeDB.remove({ _id: id, did });
    res.json(result);
    return;
  }
  res.status(400).json({ error: '无权限' });
});

module.exports = router;
