const skinsDatabase = [
    { id: 'free1', name: '🟢 Lime Green', type: 'free', colors: ['#2ecc71', '#27ae60'] },
    { id: 'free2', name: '🔵 Sky Blue', type: 'free', colors: ['#3498db', '#2980b9'] },
    { id: 'free3', name: '🔴 Ruby Red', type: 'free', colors: ['#e74c3c', '#c0392b'] },
    { id: 'free4', name: '🟡 Bright Yellow', type: 'free', colors: ['#f1c40f', '#f39c12'] },
    { id: 'free5', name: '🟣 Royal Purple', type: 'free', colors: ['#9b59b6', '#8e44ad'] },
    { id: 'free6', name: '🟠 Sunset Orange', type: 'free', colors: ['#e67e22', '#d35400'] },
    { id: 'free7', name: '⚪ Pure White', type: 'free', colors: ['#ffffff', '#bdc3c7'] },
    
    { id: 'spain', name: '🇪🇸 Spain Flag', type: 'flags', price: 100, flagEmoji: '🇪🇸', colors: ['#aa152b', '#f1bf00', '#aa152b'] },
    { id: 'brazil', name: '🇧🇷 Brazil Flag', type: 'flags', price: 100, flagEmoji: '🇧🇷', colors: ['#009c3b', '#ffdf00', '#002776'] },
    { id: 'kurdish', name: '☀️ Kurdistan Flag', type: 'flags', price: 100, flagEmoji: '☀️', colors: ['#e74c3c', '#ffffff', '#2ecc71', '#f1c40f'] },
    { id: 'canada', name: '🇨🇦 Canada Flag', type: 'flags', price: 100, flagEmoji: '🇨🇦', colors: ['#ff0000', '#ffffff', '#ff0000'] },
    { id: 'germany', name: '🇩🇪 Germany Flag', type: 'flags', price: 100, flagEmoji: '🇩🇪', colors: ['#000000', '#dd0000', '#ffce00'] },
    { id: 'france', name: '🇫🇷 France Flag', type: 'flags', price: 100, flagEmoji: '🇫🇷', colors: ['#002395', '#ffffff', '#ed2939'] },
    { id: 'usa', name: '🇺🇸 USA Flag', type: 'flags', price: 100, flagEmoji: '🇺🇸', colors: ['#b22234', '#ffffff', '#3c3b6e'] },
    { id: 'italy', name: '🇮🇹 Italy Flag', type: 'flags', price: 100, flagEmoji: '🇮🇹', colors: ['#009246', '#ffffff', '#ce2b37'] },
    { id: 'uk', name: '🇬🇧 UK Flag', type: 'flags', price: 100, flagEmoji: '🇬🇧', colors: ['#00247d', '#ffffff', '#cf142b'] }
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

