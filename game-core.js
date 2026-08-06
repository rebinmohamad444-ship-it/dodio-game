// game-core.js

const game = {
    shop: new Shop(),
    network: new Network(),
    player: null,
    bots: [],
    canvas: document.getElementById('gameCanvas'),
    ctx: document.getElementById('gameCanvas').getContext('2d'),
    
    init() {
        // ڕێکخستنی قەبارەی کانڤاس
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // دروستکردنی یاریزان
        this.player = new Player('Player 1', '#00d2d3');
        this.player.x = this.canvas.width / 2;
        this.player.y = this.canvas.height / 2;
        
        // دروستکردنی بۆتەکان
        for(let i=0; i<6; i++) {
            let bot = new Bot('Bot ' + (i+1), '#e74c3c');
            bot.x = 50 + Math.random() * (this.canvas.width - 100);
            bot.y = 50 + Math.random() * (this.canvas.height - 100);
            this.bots.push(bot);
        }

        this.shop.load();
        this.updateLeaderboard();
        this.gameLoop();

        console.log('✅ Shanshen.io Loaded Successfully!');
    },

    updateLeaderboard() {
        const container = document.getElementById('leaderboard-list');
        if (!container) return;

        this.network.getLeaderboard((data) => {
            let html = '<ul>';
            data.slice(0, 5).forEach((item, index) => {
                let color = index === 0 ? '#f1c40f' : '#ddd';
                html += `<li style="color:${color};">
                            <span>${index + 1}. ${item.username || item.name || 'Unknown'}</span>
                            <span>${item.score}</span>
                        </li>`;
            });
            html += '</ul>';
            container.innerHTML = html;
        });
    },

    gameLoop() {
        // پاککردنەوەی شاشە
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // کێشانی پشتەوە
        this.ctx.fillStyle = "#1e272e";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // نوێکردنەوەی یاریزان و بۆتەکان
        if (this.player) this.player.update(this.ctx);
        this.bots.forEach(bot => bot.update(this.ctx));

        // خولگەی گەیم
        requestAnimationFrame(() => this.gameLoop());
    }
};

// دەستپێکردنی گەیم
document.addEventListener('DOMContentLoaded', () => {
    game.init();
});

// فەنکشنەکانی شۆپ (پێویستن بۆ کرانەوە)
function renderShopUI(tab) {
    document.getElementById('shop-modal').style.display = 'block';
    if (game.shop && game.shop.render) {
        game.shop.render(tab);
    }
}

function closeShop() {
    document.getElementById('shop-modal').style.display = 'none';
}

// پشتیوانی بۆ ئەگەر فایلەکانی تر بوونیان نەبێت (تا گەیم هەر کار بکات)
if (typeof keys === 'undefined') {
    window.keys = {};
    document.addEventListener('keydown', (e) => { keys[e.key] = true; });
    document.addEventListener('keyup', (e) => { keys[e.key] = false; });
}
