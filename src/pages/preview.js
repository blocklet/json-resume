import React from 'react';

const Preview = () => {
  return (
    <>
      <h2>Preview</h2>
      <p>这里将支持切换不同的主题</p>
      <p>以 PDF 的格式下载到本地(需要登陆,因为目前 nodejs 处理网页生成 pdf 的方式比较消耗资源 )</p>
      <p>保存到 blocklet 中，方便随时查看(需要登陆)</p>
    </>
  );
};

export default Preview;
