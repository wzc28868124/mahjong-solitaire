/* 本地广告适配：不联网，不显示广告，每个请求最多结算一次。 */
(() => {
  'use strict';
  let busyUntil = 0;
  const handled = new WeakSet();
  const safe = (callback, ...args) => {
    if (typeof callback === 'function') callback(...args);
  };
  const claim = (request) => {
    if (handled.has(request)) return false;
    handled.add(request);
    const now = Date.now();
    if (now < busyUntil) return false;
    busyUntil = now + 250;
    return true;
  };
  function adBreak(options = {}) {
    // 相同对象代表同一逻辑请求；重复提交不重复执行任何完成回调。
    if (handled.has(options)) return;
    const accepted = claim(options);
    queueMicrotask(() => {
      if (!accepted) {
        // 正常拒绝重复请求，不触发原版的失败重试奖励路径。
        safe(options.adDismissed);
        safe(options.adBreakDone, { breakStatus: 'dismissed' });
        return;
      }
      let rewarded = false;
      const reward = () => {
        if (rewarded) return;
        rewarded = true;
        safe(options.adViewed);
      };
      safe(options.beforeAd);
      if (options.type === 'reward') {
        if (options.beforeReward) safe(options.beforeReward, reward);
        else reward();
      }
      safe(options.afterAd);
      safe(options.adBreakDone, { breakStatus: 'viewed' });
    });
  }
  const customReward = () => {
    const accepted = claim({});
    return Promise.resolve({ viewed: accepted });
  };
  window.VitaLocalAds = Object.freeze({ adBreak, customReward });
  window.adBreak = adBreak;
  window.adConfig = (options = {}) => queueMicrotask(() => safe(options.onReady));
  window.showInterstitialAd = (callback) => queueMicrotask(() => safe(callback, false));
  window.showRewardedAd = (callback) => customReward().then(({ viewed }) => safe(callback, viewed));
  window.isRewardedAdReady = () => true;
  window.isInterstitialAdReady = () => true;
  window.onLevelComplete = window.onGameOver = (callback) => queueMicrotask(() => safe(callback));
  window.getHintWithAd = window.continueWithAd = window.getExtraTimeWithAd = window.showRewardedAd;
  window.onAdStart = window.onAdEnd = () => {};
  const displayError = () => {
    const box = document.getElementById('local-error');
    if (!box) return;
    box.hidden = false;
    box.textContent = '游戏资源加载失败。请刷新页面重试；若仍失败，请检查网络连接，或联系此网站维护者。';
  };
  window.addEventListener('error', displayError);
  window.addEventListener('unhandledrejection', displayError);
})();

