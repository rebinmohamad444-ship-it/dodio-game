// ============================================
// Shanshen.io - پەیوەندی بە Firebase
// ============================================

import { FIREBASE_CONFIG } from './config.js';

// کلاسی بەڕێوەبردنی تۆڕ
export class NetworkManager {
    constructor() {
        this.db = null;
        this.auth = null;
        this.isConnected = false;
        this.playerRef = null;
        this.playersRef = null;
        this.onDataUpdate = null;
    }

    // دەستپێکردنی پەیوەندی
    init() {
        try {
            if (typeof firebase !== 'undefined' && FIREBASE_CONFIG.apiKey !== 'YOUR_API_KEY') {
                firebase.initializeApp(FIREBASE_CONFIG);
                this.db = firebase.database();
                this.auth = firebase.auth();
                this.isConnected = true;
                console.log('✅ Firebase connected!');
                return true;
            } else {
                console.log('ℹ️ Firebase not configured, running offline mode');
                return false;
            }
        } catch (e) {
            console.log('⚠️ Firebase error:', e);
            return false;
        }
    }

    // ناردنی داتای یاریزان
    sendPlayerData(playerId, data) {
        if (!this.isConnected || !this.db) return;
        try {
            const ref = this.db.ref('players/' + playerId);
            ref.set({
                ...data,
                lastUpdate: Date.now()
            });
        } catch (e) {
            console.warn('Send error:', e);
        }
    }

    // گوێگرتن لە گۆڕانکارییەکانی یاریزانان
    listenPlayers(callback) {
        if (!this.isConnected || !this.db) return;
        try {
            this.playersRef = this.db.ref('players');
            this.playersRef.on('value', (snapshot) => {
                const data = snapshot.val() || {};
                if (callback) callback(data);
            });
        } catch (e) {
            console.warn('Listen error:', e);
        }
    }

    // گوێگرتن لە گۆڕانکارییەکانی یاریزانێکی تایبەت
    listenPlayer(playerId, callback) {
        if (!this.isConnected || !this.db) return;
        try {
            this.playerRef = this.db.ref('players/' + playerId);
            this.playerRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if (callback && data) callback(data);
            });
        } catch (e) {
            console.warn('Listen player error:', e);
        }
    }

    // ناردنی خاڵەکان
    sendScore(playerId, score, name) {
        if (!this.isConnected || !this.db) return;
        try {
            this.db.ref('leaderboard/' + playerId).set({
                name: name,
                score: score,
                timestamp: Date.now()
            });
        } catch (e) {
            console.warn('Score send error:', e);
        }
    }

    // وەرگرتنی ڕیزبەندی
    getLeaderboard(callback) {
        if (!this.isConnected || !this.db) {
            // داتای ساختە بۆ ئۆفلاین
            this.getFakeLeaderboard(callback);
            return;
        }
        try {
            this.db.ref('leaderboard')
                .orderByChild('score')
                .limitToLast(10)
                .on('value', (snapshot) => {
                    const data = snapshot.val() || {};
                    const list = Object.values(data)
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 10);
                    if (callback) callback(list);
                });
        } catch (e) {
            console.warn('Leaderboard error:', e);
            this.getFakeLeaderboard(callback);
        }
    }

    // ڕیزبەندی ساختە (کاتێک Firebase کار ناکات)
    getFakeLeaderboard(callback) {
        const fakeData = [
            { name: '🐍 Snake_King', score: 45000 },
            { name: '🔥 Fire_Viper', score: 32000 },
            { name: '⚡ Thunder_Bolt', score: 24000 },
            { name: '🌊 Wave_Rider', score: 18000 },
            { name: '⭐ Star_Chaser', score: 12000 },
            { name: '🛡️ Shield_Master', score: 8000 },
            { name: '🎯 Sniper_Pro', score: 5000 },
            { name: '🏆 Champion_X', score: 3000 },
            { name: '🔄 Loop_King', score: 1500 },
            { name: '🎮 Player_One', score: 500 }
        ];
        if (callback) callback(fakeData);
    }

    // داخستنی پەیوەندی
    disconnect() {
        if (this.playerRef) {
            this.playerRef.off();
        }
        if (this.playersRef) {
            this.playersRef.off();
        }
        this.isConnected = false;
    }
}
