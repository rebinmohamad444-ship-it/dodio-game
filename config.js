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
        flags: [flags: [
    { id: 'kurdish', name: '🏴 Kurdistan', price: 100, flagKey: 'kurdish', colors: ['#e74c3c', '#ffffff', '#2ecc71', '#f1c40f'] },
    { id: 'spain', name: '🇪🇸 Spain', price: 100, flagKey: 'spain', colors: ['#aa152b', '#f1bf00', '#aa152b'] },
    { id: 'brazil', name: '🇧🇷 Brazil', price: 100, flagKey: 'brazil', colors: ['#009c3b', '#ffdf00', '#002776'] },
    { id: 'iraq', name: '🇮🇶 Iraq', price: 100, flagKey: 'iraq', colors: ['#ff0000', '#ffffff', '#000000'] },
    { id: 'turkey', name: '🇹🇷 Turkey', price: 100, flagKey: 'turkey', colors: ['#e74c3c', '#ffffff'] },
    { id: 'iran', name: '🇮🇷 Iran', price: 100, flagKey: 'iran', colors: ['#239f40', '#ffffff', '#da0000'] },
    { id: 'palestine', name: '🇵🇸 Palestine', price: 100, flagKey: 'palestine', colors: ['#000000', '#ffffff', '#007a3d', '#e4312b'] },
    { id: 'saudi', name: '🇸🇦 Saudi Arabia', price: 100, flagKey: 'saudi', colors: ['#006c35', '#ffffff'] },
    { id: 'uae', name: '🇦🇪 UAE', price: 100, flagKey: 'uae', colors: ['#ff0000', '#00732f', '#ffffff', '#000000'] },
    { id: 'usa', name: '🇺🇸 USA', price: 100, flagKey: 'usa', colors: ['#b22234', '#ffffff', '#3c3b6e'] },
    { id: 'uk', name: '🇬🇧 UK', price: 100, flagKey: 'uk', colors: ['#00247d', '#ffffff', '#cf142b'] },
    { id: 'germany', name: '🇩🇪 Germany', price: 100, flagKey: 'germany', colors: ['#000000', '#dd0000', '#ffce00'] },
    { id: 'france', name: '🇫🇷 France', price: 100, flagKey: 'france', colors: ['#002395', '#ffffff', '#ed2939'] },
    { id: 'italy', name: '🇮🇹 Italy', price: 100, flagKey: 'italy', colors: ['#009246', '#ffffff', '#ce2b37'] },
    { id: 'japan', name: '🇯🇵 Japan', price: 100, flagKey: 'japan', colors: ['#ffffff', '#bc002d'] },
    { id: 'china', name: '🇨🇳 China', price: 100, flagKey: 'china', colors: ['#de2910', '#ffde00'] },
    { id: 'russia', name: '🇷🇺 Russia', price: 100, flagKey: 'russia', colors: ['#ffffff', '#0039a6', '#d52b1e'] },
    { id: 'canada', name: '🇨🇦 Canada', price: 100, flagKey: 'canada', colors: ['#ffffff', '#ff0000'] },
    { id: 'australia', name: '🇦🇺 Australia', price: 100, flagKey: 'australia', colors: ['#00008b', '#ffffff', '#ff0000'] },
    { id: 'egypt', name: '🇪🇬 Egypt', price: 100, flagKey: 'egypt', colors: ['#ce1126', '#ffffff', '#000000'] },
    { id: 'lebanon', name: '🇱🇧 Lebanon', price: 100, flagKey: 'lebanon', colors: ['#ce1126', '#ffffff', '#00a651'] },
    { id: 'jordan', name: '🇯🇴 Jordan', price: 100, flagKey: 'jordan', colors: ['#000000', '#ffffff', '#007a3d', '#ce1126'] },
    { id: 'morocco', name: '🇲🇦 Morocco', price: 100, flagKey: 'morocco', colors: ['#c1272d', '#006233'] },
    { id: 'algeria', name: '🇩🇿 Algeria', price: 100, flagKey: 'algeria', colors: ['#ffffff', '#006233', '#d21034'] },
    { id: 'tunisia', name: '🇹🇳 Tunisia', price: 100, flagKey: 'tunisia', colors: ['#e70013', '#ffffff'] },
    { id: 'libya', name: '🇱🇾 Libya', price: 100, flagKey: 'libya', colors: ['#239f40', '#ffffff', '#da0000'] },
    { id: 'syria', name: '🇸🇾 Syria', price: 100, flagKey: 'syria', colors: ['#ce1126', '#ffffff', '#000000', '#007a3d'] },
    { id: 'yemen', name: '🇾🇪 Yemen', price: 100, flagKey: 'yemen', colors: ['#ce1126', '#ffffff', '#000000'] },
    { id: 'oman', name: '🇴🇲 Oman', price: 100, flagKey: 'oman', colors: ['#ffffff', '#ff0000', '#006a4e'] },
    { id: 'qatar', name: '🇶🇦 Qatar', price: 100, flagKey: 'qatar', colors: ['#8a1538', '#ffffff'] },
    { id: 'kuwait', name: '🇰🇼 Kuwait', price: 100, flagKey: 'kuwait', colors: ['#000000', '#ffffff', '#006a4e', '#ce1126'] },
    { id: 'bahrain', name: '🇧🇭 Bahrain', price: 100, flagKey: 'bahrain', colors: ['#ce1126', '#ffffff'] },
    { id: 'afghanistan', name: '🇦🇫 Afghanistan', price: 100, flagKey: 'afghanistan', colors: ['#000000', '#da0000', '#007a3d'] },
    { id: 'pakistan', name: '🇵🇰 Pakistan', price: 100, flagKey: 'pakistan', colors: ['#01411c', '#ffffff'] },
    { id: 'india', name: '🇮🇳 India', price: 100, flagKey: 'india', colors: ['#ff9933', '#ffffff', '#138808'] },
    { id: 'bangladesh', name: '🇧🇩 Bangladesh', price: 100, flagKey: 'bangladesh', colors: ['#006a4e', '#f42a41'] },
    { id: 'malaysia', name: '🇲🇾 Malaysia', price: 100, flagKey: 'malaysia', colors: ['#000000', '#ffffff', '#cc0000', '#ffcc00'] },
    { id: 'indonesia', name: '🇮🇩 Indonesia', price: 100, flagKey: 'indonesia', colors: ['#ce1126', '#ffffff'] },
    { id: 'philippines', name: '🇵🇭 Philippines', price: 100, flagKey: 'philippines', colors: ['#0032a0', '#ffffff', '#ce1126', '#fcd116'] },
    { id: 'southkorea', name: '🇰🇷 South Korea', price: 100, flagKey: 'southkorea', colors: ['#ffffff', '#003478', '#c60c30'] },
    { id: 'northkorea', name: '🇰🇵 North Korea', price: 100, flagKey: 'northkorea', colors: ['#024fa2', '#ffffff', '#ed1c27'] },
    { id: 'mexico', name: '🇲🇽 Mexico', price: 100, flagKey: 'mexico', colors: ['#006341', '#ffffff', '#ce1126'] },
    { id: 'argentina', name: '🇦🇷 Argentina', price: 100, flagKey: 'argentina', colors: ['#75aadb', '#ffffff', '#f4c430'] },
    { id: 'chile', name: '🇨🇱 Chile', price: 100, flagKey: 'chile', colors: ['#d52b1e', '#ffffff', '#0039a6'] },
    { id: 'peru', name: '🇵🇪 Peru', price: 100, flagKey: 'peru', colors: ['#d91023', '#ffffff'] },
    { id: 'venezuela', name: '🇻🇪 Venezuela', price: 100, flagKey: 'venezuela', colors: ['#cf142b', '#ffffff', '#00247d', '#fcd116'] },
    { id: 'colombia', name: '🇨🇴 Colombia', price: 100, flagKey: 'colombia', colors: ['#fcd116', '#003893', '#ce1126'] },
    { id: 'southafrica', name: '🇿🇦 South Africa', price: 100, flagKey: 'southafrica', colors: ['#000000', '#ffb612', '#007a4b', '#de3831', '#002395'] },
    { id: 'nigeria', name: '🇳🇬 Nigeria', price: 100, flagKey: 'nigeria', colors: ['#008751', '#ffffff', '#008751'] },
    { id: 'kenya', name: '🇰🇪 Kenya', price: 100, flagKey: 'kenya', colors: ['#000000', '#ce1126', '#006600', '#ffffff'] },
    { id: 'ghana', name: '🇬🇭 Ghana', price: 100, flagKey: 'ghana', colors: ['#ce1126', '#fcd116', '#006b3f'] },
    { id: 'senegal', name: '🇸🇳 Senegal', price: 100, flagKey: 'senegal', colors: ['#00853f', '#fcd116', '#ce1126'] },
    { id: 'cameroon', name: '🇨🇲 Cameroon', price: 100, flagKey: 'cameroon', colors: ['#007a5e', '#ce1126', '#fcd116'] },
    { id: 'ivorycoast', name: '🇨🇮 Ivory Coast', price: 100, flagKey: 'ivorycoast', colors: ['#f77f00', '#ffffff', '#009e60'] },
    { id: 'madagascar', name: '🇲🇬 Madagascar', price: 100, flagKey: 'madagascar', colors: ['#007e3a', '#ffffff', '#ce1126'] },
    { id: 'zimbabwe', name: '🇿🇼 Zimbabwe', price: 100, flagKey: 'zimbabwe', colors: ['#006400', '#fcd116', '#ce1126', '#000000', '#ffffff'] },
    { id: 'ethiopia', name: '🇪🇹 Ethiopia', price: 100, flagKey: 'ethiopia', colors: ['#078930', '#fcdd09', '#da121a'] }
]
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
