// game-core.js

// گەیم ئۆبجێکت
const game = {
    shop: new Shop(),
    network: new Network(),
    player: null,
    bots: [],
    canvas: document.getElementById('gameCanvas'),
    ctx: document.getElementById('gameCanvas').getContext('2d'),
    
    init() {
        // پێکهێنانی یاریزان
        this.player = new Player('Player1', 'red');
        
        // پێکهێنانی بۆتەکان
        for(let i=0; i<5; i++) {
            this.bots.push(new Bot('Bot ' + (i+1), 'blue'));
        }

        // سەیرکردنی شۆپ
        this.shop.load();

        // وەرگرتنی ڕیزبەندی
        this.updateLeaderboard();

        // دەستپێکردنی لووپ
        this.gameLoop();

        console.log('🦆 Shanshen.io loaded!');
    },

    updateLeaderboard() {
        const container = document.getElementById('leaderboard-list');
        if (!container) return;

        // وەرگرتنی داتا لە نێتۆرک
        this.network.getLeaderboard((data) => {
            let html = '<ul style="list-style:none; padding:0; font-size:14px;">';
            
            // تەنها ٥ یەکەم نیشان بدە
            data.slice(0, 5).forEach((item, index) => {
                let color = index === 0 ? '#f1c40f' : '#fff';
                html += `<li style="color:${color}; margin-bottom:5px; display:flex; justify-content:space-between;">
                            <span>${index + 1}. ${item.name || item.username || 'Unknown'}</span>
                            <span>Score: ${item.score}</span>
                        </li>`;
            });
            
            html += '</ul>';
            container.innerHTML = html;
        });
    },

    gameLoop() {
        // کۆدەکانی گەیم پاک بکەوە
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // نوێکردنەوەی یاریزان و بۆتەکان
        this.player.update(this.ctx);
        this.bots.forEach(bot => bot.update(this.ctx));

        // خولگەی گەیم
        requestAnimationFrame(() => this.gameLoop());
    }
};

// دەستپێکردنی گەیم کە HTML بارکرا
document.addEventListener('DOMContentLoaded', () => {
    game.init();
});

// فەنکشنی کرانەوە و داخستنی شۆپ لە ئاستی جیهانیدا
function renderShopUI(tab) {
    document.getElementById('shop-modal').style.display = 'block';
    if (game.shop && game.shop.render) {
        game.shop.render(tab); // واباشترە shop.js پشتگیری بکات
    }
}

function closeShop() {
    document.getElementById('shop-modal').style.display = 'none';
}
