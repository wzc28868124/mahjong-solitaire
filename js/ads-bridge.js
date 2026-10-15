/**
 * Ads Bridge - Game Integration Layer
 * 
 * This file provides a clean interface between the game and ad system.
 * Use these functions from game code to trigger ads.
 */

(function () {
    'use strict';

    // Ad trigger points configuration
    const config = {
        // Minimum time between interstitials (30 seconds)
        interstitialCooldown: 30000,
        // Track last interstitial time
        lastInterstitialTime: 0,
        // Counter for level completion
        levelCount: 0,
        // Show interstitial every N levels
        interstitialEveryNLevels: 2
    };

    /**
     * Call when a level is completed
     * Shows interstitial every N levels
     */
    window.onLevelComplete = function (callback) {
        config.levelCount++;

        // Check if should show interstitial
        if (config.levelCount >= config.interstitialEveryNLevels) {
            config.levelCount = 0;

            // Check cooldown
            const now = Date.now();
            if (now - config.lastInterstitialTime >= config.interstitialCooldown) {
                config.lastInterstitialTime = now;
                window.showInterstitialAd(function (shown) {
                    console.log('[AdsBridge] Level complete ad shown:', shown);
                    if (callback) callback();
                });
                return;
            }
        }

        // No ad shown, continue immediately
        if (callback) callback();
    };

    /**
     * Call when game is over
     * Shows interstitial ad
     */
    window.onGameOver = function (callback) {
        const now = Date.now();

        if (now - config.lastInterstitialTime >= config.interstitialCooldown) {
            config.lastInterstitialTime = now;
            window.showInterstitialAd(function (shown) {
                console.log('[AdsBridge] Game over ad shown:', shown);
                if (callback) callback();
            });
        } else {
            if (callback) callback();
        }
    };

    /**
     * Call to offer user a rewarded ad for hints
     * @param {function} onReward - Called with true if reward granted
     */
    window.getHintWithAd = function (onReward) {
        if (!window.isRewardedAdReady()) {
            console.log('[AdsBridge] Rewarded ad not ready for hint');
            if (onReward) onReward(false);
            return;
        }

        window.showRewardedAd(function (rewarded) {
            console.log('[AdsBridge] Hint reward:', rewarded);
            if (onReward) onReward(rewarded);
        });
    };

    /**
     * Call to offer user a rewarded ad to continue playing
     * @param {function} onReward - Called with true if reward granted
     */
    window.continueWithAd = function (onReward) {
        if (!window.isRewardedAdReady()) {
            console.log('[AdsBridge] Rewarded ad not ready for continue');
            if (onReward) onReward(false);
            return;
        }

        window.showRewardedAd(function (rewarded) {
            console.log('[AdsBridge] Continue reward:', rewarded);
            if (onReward) onReward(rewarded);
        });
    };

    /**
     * Call to offer user extra time with rewarded ad
     * @param {function} onReward - Called with true if reward granted
     */
    window.getExtraTimeWithAd = function (onReward) {
        if (!window.isRewardedAdReady()) {
            console.log('[AdsBridge] Rewarded ad not ready for extra time');
            if (onReward) onReward(false);
            return;
        }

        window.showRewardedAd(function (rewarded) {
            console.log('[AdsBridge] Extra time reward:', rewarded);
            if (onReward) onReward(rewarded);
        });
    };

    /**
     * Optional: Pause game when ad starts
     */
    window.onAdStart = function () {
        console.log('[AdsBridge] Pausing game for ad...');
        // If game has a pause function, call it here
        if (window.pauseGame) window.pauseGame();
        // Mute game audio
        if (Laya && Laya.SoundManager) {
            Laya.SoundManager.muted = true;
        }
    };

    /**
     * Optional: Resume game when ad ends
     */
    window.onAdEnd = function () {
        console.log('[AdsBridge] Resuming game after ad...');
        // If game has a resume function, call it here
        if (window.resumeGame) window.resumeGame();
        // Unmute game audio
        if (Laya && Laya.SoundManager) {
            Laya.SoundManager.muted = false;
        }
    };

    console.log('[AdsBridge] Game integration loaded');
})();
