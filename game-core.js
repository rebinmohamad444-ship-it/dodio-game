// game-core.js

// فەنکشنی سەرەکی بۆ پێکهێنانی گەیم
function initGame() {
    // 1. دۆزینەوەی کانڤاس
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // 2. ڕێکخستنی قەبارەی کانڤاس بۆ گەیشتن بە هەموو شاشە
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 3. دروستکردنی هەندێک شتی ناو گەیم (بۆ تەستکردن کە شاشە ڕەش نەبێت)
    // ئەمە تەنها بۆ نیشاندانی گەیمەکەیە، دەتوانی دواتر بگۆڕیت بۆ یاریزانە ڕاستەقینەکەت
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let radius = 30;

    // 4. فەنکشنی نوێکردنەوە (Game Loop)
    function update() {
        // پاککردنەوەی شاشە
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // کێشانی پشتەوەی گەیم (شەبەکە)
        ctx.fillStyle = "#1e272e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // کێشانی بازنەی یاریزان (بۆ نیشاندانی کە گەیم کار دەکات)
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#00d2d3";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.stroke();

        // نووسینی ناوی گەیم لەسەر شاشە
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Arial";
        ctx.fillText("Shanshen.io is Running!", 20, 40);
        ctx.font = "14px Arial";
        ctx.fillText("Press 'S' key to open Shop", 20, 70);

        // بانگهێشتی لووپەکە بۆ خولێکی تر
        requestAnimationFrame(update);
    }

    // دەستپێکردنی لووپ
    update();

    // 5. پەیوەندی بە شۆپ و ڕیزبەندیەوە
    if (typeof game !== 'undefined' && game.network) {
        setTimeout(() => {
            const mockData = [
                { name: "Shanshen", score: 2500 },
                { name: "ProPlayer", score: 1800 },
                { name: "NoobMaster", score: 1200 }
            ];
            // دەستکاری ڕیزبەندی لە HTML
            const list = document.getElementById('leaderboard-list');
            if(list) {
                let html = '<ul>';
                mockData.forEach((item, i) => {
                    html += `<li><span>${i+1}. ${item.name}</span> <span>${item.score}</span></li>`;
                });
                html += '</ul>';
                list.innerHTML = html;
            }
        }, 100);
    }

    // 6. گوێگرتن لە کرانەوەی شۆپ
    document.addEventListener('keydown', (e) => {
        if (e.key === 's' || e.key === 'S') {
            renderShopUI('skins');
        }
    });

    console.log('✅ Game Core Loaded Successfully!');
}

// 7. دەستپێکردنی گەیم کاتێک HTML بار دەبێت
document.addEventListener('DOMContentLoaded', initGame);


// فەنکشنەکانی شۆپ لە ئاستی جیهانیدا (Global)
function renderShopUI(tabName) {
    const modal = document.getElementById('shop-modal');
    if (modal) {
        modal.style.display = 'block';
        // ئەگەر ui-manager.js هەیە، ئەوەی بانگ بکە، ئەگەرنا تەنها دەریدەخەین
        console.log(`Opening Shop tab: ${tabName}`);
    }
}

function closeShop() {
    const modal = document.getElementById('shop-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ئەمەش بۆ ئەوەی ئەگەر window.game بوونی هەبوو، پشتگیری بکات (ئامادەکاری بۆ فایلەکانی تر)
if (typeof window.game === 'undefined') {
    window.game = {
        init: initGame,
        shop: { save: () => {}, load: () => {} },
        network: { getLeaderboard: (cb) => { cb([{name:"Test", score:100}]); } }
    };
}
