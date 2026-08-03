const skinsDatabase = [
    { id: 'free1', name: '🟢 Lime Green', type: 'free', colors: ['#2ecc71', '#27ae60'] },
    { id: 'free2', name: '🔵 Sky Blue', type: 'free', colors: ['#3498db', '#2980b9'] },
    { id: 'free3', name: '🔴 Ruby Red', type: 'free', colors: ['#e74c3c', '#c0392b'] },
    { id: 'free4', name: '🟡 Bright Yellow', type: 'free', colors: ['#f1c40f', '#f39c12'] },
    { id: 'free5', name: '🟣 Royal Purple', type: 'free', colors: ['#9b59b6', '#8e44ad'] },
    { id: 'free6', name: '🟠 Sunset Orange', type: 'free', colors: ['#e67e22', '#d35400'] },
    { id: 'free7', name: '⚪ Pure White', type: 'free', colors: ['#ffffff', '#bdc3c7'] },
    
    /* Flags & Regions */
    { id: 'kurdish', name: '☀️ Kurdistan', type: 'flags', price: 100, flagEmoji: '☀️', colors: ['#e74c3c', '#ffffff', '#2ecc71', '#f1c40f'] },
    { id: 'spain', name: '🇪🇸 Spain', type: 'flags', price: 100, flagEmoji: '🇪🇸', colors: ['#aa152b', '#f1bf00', '#aa152b'] },
    { id: 'brazil', name: '🇧🇷 Brazil', type: 'flags', price: 100, flagEmoji: '🇧🇷', colors: ['#009c3b', '#ffdf00', '#002776'] },
    { id: 'iraq', name: '🇮🇶 Iraq', type: 'flags', price: 100, flagEmoji: '🇮🇶', colors: ['#ff0000', '#ffffff', '#000000'] },
    { id: 'turkey', name: '🇹🇷 Turkey', type: 'flags', price: 100, flagEmoji: '🇹🇷', colors: ['#e74c3c', '#ffffff'] },
    { id: 'iran', name: '🇮🇷 Iran', type: 'flags', price: 100, flagEmoji: '🇮🇷', colors: ['#239f40', '#ffffff', '#da0000'] },
    { id: 'palestine', name: '🇵🇸 Palestine', type: 'flags', price: 100, flagEmoji: '🇵🇸', colors: ['#000000', '#ffffff', '#007a3d', '#e4312b'] },
    { id: 'saudi', name: '🇸🇦 Saudi Arabia', type: 'flags', price: 100, flagEmoji: '🇸🇦', colors: ['#006c35', '#ffffff'] },
    { id: 'uae', name: '🇦🇪 UAE', type: 'flags', price: 100, flagEmoji: '🇦🇪', colors: ['#ff0000', '#00732f', '#ffffff', '#000000'] },
    { id: 'qatar', name: '🇶🇦 Qatar', type: 'flags', price: 100, flagEmoji: '🇶🇦', colors: ['#8d1b3d', '#ffffff'] },
    { id: 'egypt', name: '🇪🇬 Egypt', type: 'flags', price: 100, flagEmoji: '🇪🇬', colors: ['#ce1126', '#ffffff', '#000000'] },
    { id: 'morocco', name: '🇲🇦 Morocco', type: 'flags', price: 100, flagEmoji: '🇲🇦', colors: ['#c1272d', '#006233'] },
    { id: 'algeria', name: '🇩🇿 Algeria', type: 'flags', price: 100, flagEmoji: '🇩🇿', colors: ['#006233', '#ffffff', '#d21034'] },
    { id: 'tunisia', name: '🇹🇳 Tunisia', type: 'flags', price: 100, flagEmoji: '🇹🇳', colors: ['#e70013', '#ffffff'] },
    { id: 'jordan', name: '🇯🇴 Jordan', type: 'flags', price: 100, flagEmoji: '🇯🇴', colors: ['#000000', '#ffffff', '#007a3d', '#ce1126'] },
    { id: 'lebanon', name: '🇱🇧 Lebanon', type: 'flags', price: 100, flagEmoji: '🇱🇧', colors: ['#ed1c24', '#ffffff', '#00a651'] },
    { id: 'usa', name: '🇺🇸 USA', type: 'flags', price: 100, flagEmoji: '🇺🇸', colors: ['#b22234', '#ffffff', '#3c3b6e'] },
    { id: 'uk', name: '🇬🇧 UK', type: 'flags', price: 100, flagEmoji: '🇬🇧', colors: ['#00247d', '#ffffff', '#cf142b'] },
    { id: 'canada', name: '🇨🇦 Canada', type: 'flags', price: 100, flagEmoji: '🇨🇦', colors: ['#ff0000', '#ffffff'] },
    { id: 'germany', name: '🇩🇪 Germany', type: 'flags', price: 100, flagEmoji: '🇩🇪', colors: ['#000000', '#dd0000', '#ffce00'] },
    { id: 'france', name: '🇫🇷 France', type: 'flags', price: 100, flagEmoji: '🇫🇷', colors: ['#002395', '#ffffff', '#ed2939'] },
    { id: 'italy', name: '🇮🇹 Italy', type: 'flags', price: 100, flagEmoji: '🇮🇹', colors: ['#009246', '#ffffff', '#ce2b37'] },
    { id: 'argentina', name: '🇦🇷 Argentina', type: 'flags', price: 100, flagEmoji: '🇦🇷', colors: ['#74acdf', '#ffffff', '#f6b40e'] },
    { id: 'portugal', name: '🇵🇹 Portugal', type: 'flags', price: 100, flagEmoji: '🇵🇹', colors: ['#046a38', '#da291c'] },
    { id: 'netherlands', name: '🇳🇱 Netherlands', type: 'flags', price: 100, flagEmoji: '🇳🇱', colors: ['#ae1c28', '#ffffff', '#21468b'] },
    { id: 'spain2', name: '🇪🇸 Spain', type: 'flags', price: 100, flagEmoji: '🇪🇸', colors: ['#aa152b', '#f1bf00'] },
    { id: 'japan', name: '🇯🇵 Japan', type: 'flags', price: 100, flagEmoji: '🇯🇵', colors: ['#ffffff', '#bc002d'] },
    { id: 'south_korea', name: '🇰🇷 S. Korea', type: 'flags', price: 100, flagEmoji: '🇰🇷', colors: ['#ffffff', '#cd2e3a', '#0047a0'] },
    { id: 'china', name: '🇨🇳 China', type: 'flags', price: 100, flagEmoji: '🇨🇳', colors: ['#de2910', '#ffde00'] },
    { id: 'india', name: '🇮🇳 India', type: 'flags', price: 100, flagEmoji: '🇮🇳', colors: ['#ff9933', '#ffffff', '#128807'] },
    { id: 'australia', name: '🇦🇺 Australia', type: 'flags', price: 100, flagEmoji: '🇦🇺', colors: ['#00008b', '#ff0000', '#ffffff'] },
    { id: 'russia', name: '🇷🇺 Russia', type: 'flags', price: 100, flagEmoji: '🇷🇺', colors: ['#ffffff', '#0039a6', '#d52b1e'] },
    { id: 'ukraine', name: '🇺🇦 Ukraine', type: 'flags', price: 100, flagEmoji: '🇺🇦', colors: ['#0057b7', '#ffd700'] },
    { id: 'sweden', name: '🇸🇪 Sweden', type: 'flags', price: 100, flagEmoji: '🇸🇪', colors: ['#006aa7', '#fecc00'] },
    { id: 'norway', name: '🇳🇴 Norway', type: 'flags', price: 100, flagEmoji: '🇳🇴', colors: ['#ba0c2f', '#00205b', '#ffffff'] },
    { id: 'switzerland', name: '🇨🇭 Switzerland', type: 'flags', price: 100, flagEmoji: '🇨🇭', colors: ['#da291c', '#ffffff'] },
    { id: 'mexico', name: '🇲🇽 Mexico', type: 'flags', price: 100, flagEmoji: '🇲🇽', colors: ['#006847', '#ffffff', '#ce1126'] }
];

function selectSkin(id) { 
    player.skin = id; 
    renderShop(); 
}

function buySkin(id, price) {
    if(coins >= price) {
        coins -= price;
        ownedSkins.push(id);
        localStorage.setItem('dodio_owned_skins', JSON.stringify(ownedSkins));
        saveStats();
        selectSkin(id);
        alert("🎉 Skin unlocked successfully!");
    } else {
        alert(`❌ Not enough coins! You need ${price} coins.`);
    }
}
