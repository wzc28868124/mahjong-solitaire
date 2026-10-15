/**
 * H5 Games AdSense Ads Manager
 * Publisher ID: ca-pub-5163856913677958
 * 
 * Supports: Interstitial & Rewarded Ads with Preloading
 */

(function () {
    'use strict';

    const PUBLISHER_ID = 'ca-pub-5163856913677958';

    // Ad state
    const adState = {
        initialized: false,
        interstitialReady: false,
        rewardedReady: false,
        isShowingAd: false
    };

    // Callbacks storage
    let rewardedCallback = null;

    // Initialize AdSense H5 Games Ads
    function init() {
        if (adState.initialized) return;

        // Create adsbygoogle array if not exists
        window.adsbygoogle = window.adsbygoogle || [];

        // Initialize H5 Games Ads
        window.adConfig = window.adConfig || function () {
            (adConfig.q = adConfig.q || []).push(arguments);
        };

        window.adBreak = window.adBreak || function () {
            (adBreak.q = adBreak.q || []).push(arguments);
        };

        // Configure ads
        adConfig({
            preloadAdBreaks: 'on',  // Enable preloading
            sound: 'on',            // Sound enabled
            onReady: function () {
                console.log('[AdsManager] H5 Games Ads SDK ready');
                adState.initialized = true;
                // Show App Open Ad first
                showAppOpenAd(function () {
                    // After app open ad, preload other ads
                    preloadInterstitial();
                    preloadRewarded();
                });
            }
        });

        console.log('[AdsManager] Initializing with Publisher ID:', PUBLISHER_ID);
    }

    // Show App Open Ad (preroll - shows before game starts)
    function showAppOpenAd(onComplete) {
        console.log('[AdsManager] Showing App Open ad...');
        adState.isShowingAd = true;

        adBreak({
            type: 'preroll',  // App open / preroll ad
            name: 'app-open',
            beforeAd: function () {
                console.log('[AdsManager] App Open ad starting');
                if (window.onAdStart) window.onAdStart();
            },
            afterAd: function () {
                console.log('[AdsManager] App Open ad finished');
                adState.isShowingAd = false;
                if (window.onAdEnd) window.onAdEnd();
                if (onComplete) onComplete();
            },
            adBreakDone: function (info) {
                console.log('[AdsManager] App Open done:', info.breakStatus);
                adState.isShowingAd = false;
                if (onComplete) onComplete();
            }
        });
    }

    // Preload Interstitial Ad
    function preloadInterstitial() {
        adBreak({
            type: 'preroll',
            adBreakDone: function (info) {
                if (info.breakStatus === 'viewed' || info.breakStatus === 'dismissed') {
                    adState.interstitialReady = false;
                    // Auto-reload for next time
                    setTimeout(preloadInterstitial, 1000);
                }
            }
        });
        adState.interstitialReady = true;
        console.log('[AdsManager] Interstitial preloaded');
    }

    // Preload Rewarded Ad
    function preloadRewarded() {
        adState.rewardedReady = true;
        console.log('[AdsManager] Rewarded ad ready');
    }

    // Show Interstitial Ad
    function showInterstitial(onComplete) {
        if (adState.isShowingAd) {
            console.log('[AdsManager] Ad already showing');
            if (onComplete) onComplete(false);
            return;
        }

        adState.isShowingAd = true;
        console.log('[AdsManager] Showing interstitial...');

        adBreak({
            type: 'next',  // Natural break point
            name: 'game-break',
            beforeAd: function () {
                console.log('[AdsManager] Interstitial starting');
                // Pause game sounds/music here if needed
                if (window.onAdStart) window.onAdStart();
            },
            afterAd: function () {
                console.log('[AdsManager] Interstitial finished');
                adState.isShowingAd = false;
                adState.interstitialReady = false;
                // Resume game sounds/music
                if (window.onAdEnd) window.onAdEnd();
                // Preload next ad
                setTimeout(preloadInterstitial, 1000);
                if (onComplete) onComplete(true);
            },
            adBreakDone: function (info) {
                console.log('[AdsManager] Interstitial done:', info.breakStatus);
                adState.isShowingAd = false;
                if (info.breakStatus !== 'viewed') {
                    if (onComplete) onComplete(false);
                }
            }
        });
    }

    // Show Rewarded Ad
    function showRewarded(callback) {
        if (adState.isShowingAd) {
            console.log('[AdsManager] Ad already showing');
            if (callback) callback(false);
            return;
        }

        rewardedCallback = callback;
        adState.isShowingAd = true;
        console.log('[AdsManager] Showing rewarded ad...');

        adBreak({
            type: 'reward',
            name: 'reward-ad',
            beforeAd: function () {
                console.log('[AdsManager] Rewarded ad starting');
                if (window.onAdStart) window.onAdStart();
            },
            afterAd: function () {
                console.log('[AdsManager] Rewarded ad finished');
                adState.isShowingAd = false;
                if (window.onAdEnd) window.onAdEnd();
            },
            beforeReward: function (showAdFn) {
                // User clicked to watch reward ad
                showAdFn();
            },
            adDismissed: function () {
                console.log('[AdsManager] Rewarded ad dismissed (no reward)');
                adState.isShowingAd = false;
                if (rewardedCallback) rewardedCallback(false);
                rewardedCallback = null;
            },
            adViewed: function () {
                console.log('[AdsManager] Rewarded ad viewed - REWARD GRANTED!');
                adState.isShowingAd = false;
                if (rewardedCallback) rewardedCallback(true);
                rewardedCallback = null;
            },
            adBreakDone: function (info) {
                console.log('[AdsManager] Rewarded done:', info.breakStatus);
                adState.isShowingAd = false;
                // Preload next rewarded
                setTimeout(preloadRewarded, 1000);
            }
        });
    }

    // Check if rewarded ad is ready
    function isRewardedReady() {
        return adState.rewardedReady && !adState.isShowingAd;
    }

    // Check if interstitial is ready
    function isInterstitialReady() {
        return adState.interstitialReady && !adState.isShowingAd;
    }

    // Expose global API
    window.AdsManager = {
        init: init,
        showInterstitial: showInterstitial,
        showRewarded: showRewarded,
        isRewardedReady: isRewardedReady,
        isInterstitialReady: isInterstitialReady,
        getState: function () { return adState; }
    };

    // Convenience global functions
    window.showInterstitialAd = function (onComplete) {
        showInterstitial(onComplete);
    };

    window.showRewardedAd = function (callback) {
        showRewarded(callback);
    };

    window.isRewardedAdReady = function () {
        return isRewardedReady();
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    console.log('[AdsManager] Module loaded');
})();
