/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const STATE_KEY = 'local-form-state';
/**
 * 将 form 中的数据时时同步到 localStorage
 * @param {*} defaultValue
 * @param {*} path basics、work... 按照简历中的大标题去存储 json
 */
const useLocalFormState = (defaultValue = {}, path) => {
  const localFormState = JSON.parse(window.localStorage.getItem(STATE_KEY)) || {};
  if (path && !(path in localFormState)) {
    setLocalFormState({ [path]: defaultValue });
  }
  function setLocalFormState(value) {
    window.localStorage.setItem(STATE_KEY, JSON.stringify({ ...localFormState, ...value }));
  }
  function removeLocalFormState() {
    window.localStorage.removeItem(STATE_KEY);
  }
  return { localFormState, setLocalFormState, removeLocalFormState };
};
export default useLocalFormState;
