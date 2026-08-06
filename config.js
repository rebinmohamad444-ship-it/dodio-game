// ============================================
// Shanshen.io - پێکهێنانە سەرەکییەکان
// ============================================

export const CONFIG = {
    // ماپ (گەورەتر لە wormate.io)
    MAP_RADIUS: 32000,
    MAP_CENTER: 30000,
    
    // یاریزان
    PLAYER_INITIAL_SIZE: 28,
    PLAYER_MAX_SIZE: 120,
    PLAYER_SPEED: 210,
    PLAYER_BOOST_SPEED: 380,
    
    // بیناکان
    GARAGES: [
        { x: 30000 - 15000, y: 30000 - 15000, size: 500 },
        { x: 30000 + 15000, y: 30000 - 15000, size: 500 },
        { x: 30000 - 15000, y: 30000 + 15000, size: 500 },
        { x: 30000 + 15000, y: 30000 + 15000, size: 500 }
    ],
    
    // بۆتەکان
    BOT_COUNT: 15,
    BOT_SPEED: 190,
    BOT_SIZE: 30,
    BOT_NAMES: ['Apex_Viper', 'Shadow_Hunter', 'Anaconda_King', 'Kurd_Pro', 'Slayer_99', 
                'Toxic_Bite', 'Alpha_Dragon', 'Speed_Master', 'Mega_Snake', 'Venom_X', 
                'Titan_Rider', 'Phantom_Bite', 'Storm_Chaser', 'Night_Fury', 'Crimson_Death'],
    
    // خواردنەکان (2 هێندە زیادی کردووە)
    FRUIT_COUNT: 10000,
    COIN_COUNT: 1600,
    POWERUP_COUNT: 1200,
    
    // هێزەکان
    MAGNET_DURATION: 15000,
    MAGNET_RANGE: 600,
    MAGNET_FORCE: 6.0,
    MULTIPLIER_DURATION: 15000,
    BOOST_DURATION: 15000,
    STEERING_DURATION: 15000,
    SNIPER_DURATION: 15000,
    
    // گەراج
    GARAGE_RENT_OPTIONS: [
        { minutes: 10, price: 50 },
        { minutes: 20, price: 100 },
        { minutes: 30, price: 150 },
        { minutes: 60, price: 230 }
    ],
    
    // سکینەکان (تەنها 8 ئاڵا)
    SKINS: {
        free: [
            { id: 'free1', name: '🟢 Lime Green', colors: ['#2ecc71', '#27ae60'] },
            { id: 'free2', name: '🔵 Sky Blue', colors: ['#3498db', '#2980b9'] },
            { id: 'free3', name: '🔴 Ruby Red', colors: ['#e74c3c', '#c0392b'] },
            { id: 'free4', name: '🟡 Bright Yellow', colors: ['#f1c40f', '#f39c12'] },
            { id: 'free5', name: '🟣 Royal Purple', colors: ['#9b59b6', '#8e44ad'] },
            { id: 'free6', name: '🟠 Sunset Orange', colors: ['#e67e22', '#d35400'] },
            { id: 'free7', name: '⚪ Pure White', colors: ['#ffffff', '#bdc3c7'] }
        ],
        flags: [
            { id: 'kurdish', name: '🏴 Kurdistan', price: 100, flagKey: 'kurdish', colors: ['#e74c3c', '#ffffff', '#2ecc71', '#f1c40f'] },
            { id: 'spain', name: '🇪🇸 Spain', price: 100, flagKey: 'spain', colors: ['#aa152b', '#f1bf00', '#aa152b'] },
            { id: 'brazil', name: '🇧🇷 Brazil', price: 100, flagKey: 'brazil', colors: ['#009c3b', '#ffdf00', '#002776'] },
            { id: 'iraq', name: '🇮🇶 Iraq', price: 100, flagKey: 'iraq', colors: ['#ff0000', '#ffffff', '#000000'] },
            { id: 'turkey', name: '🇹🇷 Turkey', price: 100, flagKey: 'turkey', colors: ['#e74c3c', '#ffffff'] },
            { id: 'iran', name: '🇮🇷 Iran', price: 100, flagKey: 'iran', colors: ['#239f40', '#ffffff', '#da0000'] },
            { id: 'palestine', name: '🇵🇸 Palestine', price: 100, flagKey: 'palestine', colors: ['#000000', '#ffffff', '#007a3d', '#e4312b'] },
            { id: 'saudi', name: '🇸🇦 Saudi', price: 100, flagKey: 'saudi', colors: ['#006c35', '#ffffff'] }
        ]
    }
};

// Firebase config (دواتر پڕدەبێتەوە)
export const FIREBASE_CONFIG = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// ڕەنگەکانی تەقینەوە
export const EXPLOSION_COLORS = ['#2ecc71', '#f1c40f', '#e74c3c', '#3498db', '#9b59b6'];
