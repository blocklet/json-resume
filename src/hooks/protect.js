import { useCallback, useMemo, useRef } from 'react';
import { useSessionContext } from '../contexts/session';

/**
 * 根据一个 check 函数来判断是否需要保护目标函数，如果需要保护函数，则执行能够解除保护的函数，并可在解除保护成功后，再执行原来目标执行的函数
 * @returns
 */
export function useProtect() {
  /**
   * 根据 check 保护函数，确认有相应的权限后才可执行函数
   * options.before 和 options.after 属于极少数情况下需要使用的函数，仅用于无论函数是否被保护与否，都需要执行的函数。例如：一个点击激活的 Menu，在其 MenuItem 被点击后，不管函数是否有权限执行，都应该关闭展开的 Menu
   * @param {function} onUnlock 目标执行的函数
   * @param {function} options.before 执行被保护的函数前的钩子
   * @param {function} options.after 执行被保护的函数后的钩子
   * @param {function} options.checkProtected 检查当前目标函数是否需要被保护
   * @param {function} options.tryUnlock 函数被保护时，回调的解锁函数
   * @returns 一个封装了保护逻辑的高阶函数
   */
  function protect(onUnlock, options = {}) {
    const before = fallback(options.before);
    const after = fallback(options.after);
    const checkProtected = fallback(options.checkProtected, () => true);
    const tryUnlock = fallback(options.tryUnlock);

    function fallback(fn, defaultFn = () => {}) {
      if (fn instanceof Function) return fn;
      return defaultFn;
    }

    return (...args) => {
      const isProtected = checkProtected();
      before(isProtected, ...args);
      if (!isProtected) {
        tryUnlock(() => {
          onUnlock(...args);
        });
      } else {
        onUnlock(...args);
      }
      after(isProtected, ...args);
    };
  }

  return { protect };
}

/**
 * 确保用户已经登录才可执行指定函数
 */
export function useProtectLogin() {
  const { session } = useSessionContext();
  const sessionRef = useRef(null);
  const { protect } = useProtect();

  sessionRef.current = session;

  const checkProtected = useCallback(() => !!sessionRef.current.user, [session.user]);
  const tryUnlock = useCallback((onUnlock) => sessionRef.current.login(onUnlock), [session.login]);

  function protectLogin(onUnlock, before, after) {
    return protect(onUnlock, { before, after, checkProtected, tryUnlock });
  }

  const isProtected = useMemo(() => checkProtected(), [session.user]);

  return { protect: protectLogin, checkProtected, isProtected };
}
