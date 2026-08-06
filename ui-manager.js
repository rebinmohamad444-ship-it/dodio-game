
// ============================================
// Shanshen.io - بەڕێوەبردنی UI
// ============================================

import { CONFIG } from './config.js';
import { saveToLocal, loadFromLocal } from './utils.js';

// کلاسی بەڕێوەبردنی UI
export class UIManager {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.radarCanvas = document.getElementById('radar-canvas');
        this.radarCtx = this.radarCanvas.getContext('2d');
        
        this.emojiText = null;
        this.emojiTimer = null;
        this.headshotTimer = 0;
        this.deadRemains = [];
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('orientationchange', () => setTimeout(() => this.resize(), 200));
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // پیشاندانی ئیمۆجی
    showEmoji(char) {
        this.emojiText = char;
        if (this.emojiTimer) clearTimeout(this.emojiTimer);
        this.emojiTimer = setTimeout(() => {
            this.emojiText = null;
        }, 3000);
    }

    // پیشاندانی هێدشۆت
    showHeadshot() {
        this.headshotTimer = Date.now() + 3000;
    }

    // زیادکردنی پاشماوەی تەقینەوە
    addExplosion(body, colors) {
        body.forEach((p, i) => {
            if (i % 2 === 0) {
                this.deadRemains.push({
                    x: p.x + (Math.random() - 0.5) * 20,
                    y: p.y + (Math.random() - 0.5) * 20,
                    color: colors[i % colors.length] || colors[0],
                    spawnTime: Date.now(),
                    size: 10 + Math.random() * 15,
                    vx: (Math.random() - 0.5) * 60,
                    vy: (Math.random() - 0.5) * 60
                });
            }
        });
    }

    // نوێکردنەوەی پاشماوەکان
    updateRemains() {
        const now = Date.now();
        this.deadRemains = this.deadRemains.filter(r => now - r.spawnTime < 25000);
    }

    // کێشانی سەرپێچی مار (ئەناکۆندای چینی جوان)
    drawSnakeHead(head, angle, mainColor, radius, flagKey, flagImages, activePowers) {
        const ctx = this.ctx;
        const isMagnet = activePowers && activePowers.magnet;
        
        ctx.save();
        ctx.translate(head.x, head.y);
        ctx.rotate(angle);
        
        // سێبەر
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 3;
        
        // سەری ئەناکۆندا - شێوەی سێگۆشە
        const gradient = ctx.createLinearGradient(-radius * 1.2, 0, radius * 1.6, 0);
        gradient.addColorStop(0, this.darkenColor(mainColor, 0.3));
        gradient.addColorStop(0.5, mainColor);
        gradient.addColorStop(1, this.lightenColor(mainColor, 0.2));
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.moveTo(radius * 1.8, 0);
        ctx.quadraticCurveTo(radius * 0.8, -radius * 1.4, -radius * 0.6, -radius * 1.0);
        ctx.quadraticCurveTo(-radius * 1.0, -radius * 0.4, -radius * 0.8, 0);
        ctx.quadraticCurveTo(-radius * 1.0, radius * 0.4, -radius * 0.6, radius * 1.0);
        ctx.quadraticCurveTo(radius * 0.8, radius * 1.4, radius * 1.8, 0);
        ctx.closePath();
        ctx.fill();
        
        // کەنار
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // چاوەکان
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(255,215,0,0.3)';
        
        // چاوی ڕاست
        ctx.fillStyle = '#f1c40f';
        ctx.beginPath();
        ctx.ellipse(radius * 0.5, -radius * 0.45, radius * 0.22, radius * 0.18, 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        ctx.arc(radius * 0.52, -radius * 0.45, radius * 0.09, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(radius * 0.57, -radius * 0.5, radius * 0.04, 0, Math.PI * 2);
        ctx.fill();
        
        // چاوی چەپ
        ctx.fillStyle = '#f1c40f';
        ctx.beginPath();
        ctx.ellipse(radius * 0.5, radius * 0.45, radius * 0.22, radius * 0.18, -0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        ctx.arc(radius * 0.52, radius * 0.45, radius * 0.09, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(radius * 0.57, radius * 0.5, radius * 0.04, 0, Math.PI * 2);
        ctx.fill();
        
        // خاڵەکانی سەر پێچ
        ctx.shadowBlur = 0;
        for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 1.2 - Math.PI * 0.6;
            const r = radius * 1.1;
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            ctx.beginPath();
            ctx.arc(Math.cos(a) * r * 0.6, Math.sin(a) * r * 0.5 + radius * 0.1, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        
           loadFlagImages() {
    const flagUrls = {
        'kurdish': 'https://flagcdn.com/w80/krd.png',
        'spain': 'https://flagcdn.com/w80/es.png',
        'brazil': 'https://flagcdn.com/w80/br.png',
        'iraq': 'https://flagcdn.com/w80/iq.png',
        'turkey': 'https://flagcdn.com/w80/tr.png',
        'iran': 'https://flagcdn.com/w80/ir.png',
        'palestine': 'https://flagcdn.com/w80/ps.png',
        'saudi': 'https://flagcdn.com/w80/sa.png',
        'uae': 'https://flagcdn.com/w80/ae.png',
        'usa': 'https://flagcdn.com/w80/us.png',
        'uk': 'https://flagcdn.com/w80/gb.png',
        'germany': 'https://flagcdn.com/w80/de.png',
        'france': 'https://flagcdn.com/w80/fr.png',
        'italy': 'https://flagcdn.com/w80/it.png',
        'japan': 'https://flagcdn.com/w80/jp.png',
        'china': 'https://flagcdn.com/w80/cn.png',
        'russia': 'https://flagcdn.com/w80/ru.png',
        'canada': 'https://flagcdn.com/w80/ca.png',
        'australia': 'https://flagcdn.com/w80/au.png',
        'egypt': 'https://flagcdn.com/w80/eg.png',
        'lebanon': 'https://flagcdn.com/w80/lb.png',
        'jordan': 'https://flagcdn.com/w80/jo.png',
        'morocco': 'https://flagcdn.com/w80/ma.png',
        'algeria': 'https://flagcdn.com/w80/dz.png',
        'tunisia': 'https://flagcdn.com/w80/tn.png',
        'libya': 'https://flagcdn.com/w80/ly.png',
        'syria': 'https://flagcdn.com/w80/sy.png',
        'yemen': 'https://flagcdn.com/w80/ye.png',
        'oman': 'https://flagcdn.com/w80/om.png',
        'qatar': 'https://flagcdn.com/w80/qa.png',
        'kuwait': 'https://flagcdn.com/w80/kw.png',
        'bahrain': 'https://flagcdn.com/w80/bh.png',
        'afghanistan': 'https://flagcdn.com/w80/af.png',
        'pakistan': 'https://flagcdn.com/w80/pk.png',
        'india': 'https://flagcdn.com/w80/in.png',
        'bangladesh': 'https://flagcdn.com/w80/bd.png',
        'malaysia': 'https://flagcdn.com/w80/my.png',
        'indonesia': 'https://flagcdn.com/w80/id.png',
        'philippines': 'https://flagcdn.com/w80/ph.png',
        'southkorea': 'https://flagcdn.com/w80/kr.png',
        'northkorea': 'https://flagcdn.com/w80/kp.png',
        'mexico': 'https://flagcdn.com/w80/mx.png',
        'argentina': 'https://flagcdn.com/w80/ar.png',
        'chile': 'https://flagcdn.com/w80/cl.png',
        'peru': 'https://flagcdn.com/w80/pe.png',
        'venezuela': 'https://flagcdn.com/w80/ve.png',
        'colombia': 'https://flagcdn.com/w80/co.png',
        'southafrica': 'https://flagcdn.com/w80/za.png',
        'nigeria': 'https://flagcdn.com/w80/ng.png',
        'kenya': 'https://flagcdn.com/w80/ke.png',
        'ghana': 'https://flagcdn.com/w80/gh.png',
        'senegal': 'https://flagcdn.com/w80/sn.png',
        'cameroon': 'https://flagcdn.com/w80/cm.png',
        'ivorycoast': 'https://flagcdn.com/w80/ci.png',
        'madagascar': 'https://flagcdn.com/w80/mg.png',
        'zimbabwe': 'https://flagcdn.com/w80/zw.png',
        'ethiopia': 'https://flagcdn.com/w80/et.png'
    };
    
    Object.keys(flagUrls).forEach(key => {
        const img = new Image();
        img.src = flagUrls[key];
        this.flagImages[key] = img;
    });
}     );
            } catch(e) {}
        }
        
        // ئیمۆجی (ئەگەر هەبێت)
        if (this.emojiText) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(255,215,0,0.5)';
            ctx.font = `${radius * 2.0}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.emojiText, 0, -radius * 2.2);
        }
        
        // هێزی مەگناتیس (5 هێڵی گڵۆپی لەبەردەم)
        if (isMagnet) {
            const isBlinking = Math.floor(Date.now() / 150) % 2 === 0;
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#f1c40f';
            
            for (let i = -2; i <= 2; i++) {
                const angleOffset = i * 0.15;
                const r = radius * 2.2 + Math.abs(i) * 8;
                ctx.beginPath();
                ctx.strokeStyle = isBlinking ? '#f1c40f' : '#3498db';
                ctx.lineWidth = isBlinking ? 5 : 3;
                ctx.arc(r * 0.3, 0, r, -Math.PI * 0.35 + angleOffset, Math.PI * 0.35 + angleOffset);
                ctx.stroke();
                
                // گڵۆپەکان
                if (isBlinking) {
                    for (let j = 0; j < 5; j++) {
                        const t = j / 5;
                        const a = (-Math.PI * 0.35 + angleOffset) + t * (Math.PI * 0.7);
                        const px = Math.cos(a) * r + r * 0.3;
                        const py = Math.sin(a) * r;
                        ctx.fillStyle = `rgba(255,215,0,${0.3 + Math.random() * 0.5})`;
                        ctx.beginPath();
                        ctx.arc(px, py, 3 + Math.random() * 4, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
            ctx.shadowBlur = 0;
        }
        
        ctx.restore();
    }

    // تاریککردنی ڕەنگ
    darkenColor(color, amount) {
        const r = parseInt(color.slice(1,2), 16) * 17 || parseInt(color.slice(1,3), 16);
        const g = parseInt(color.slice(2,3), 16) * 17 || parseInt(color.slice(3,5), 16);
        const b = parseInt(color.slice(3,4), 16) * 17 || parseInt(color.slice(5,7), 16);
        const nr = Math.max(0, Math.round(r * (1 - amount)));
        const ng = Math.max(0, Math.round(g * (1 - amount)));
        const nb = Math.max(0, Math.round(b * (1 - amount)));
        return `rgb(${nr},${ng},${nb})`;
    }

    // ڕووناککردنی ڕەنگ
    lightenColor(color, amount) {
        const r = parseInt(color.slice(1,2), 16) * 17 || parseInt(color.slice(1,3), 16);
        const g = parseInt(color.slice(2,3), 16) * 17 || parseInt(color.slice(3,5), 16);
        const b = parseInt(color.slice(3,4), 16) * 17 || parseInt(color.slice(5,7), 16);
        const nr = Math.min(255, Math.round(r + (255 - r) * amount));
        const ng = Math.min(255, Math.round(g + (255 - g) * amount));
        const nb = Math.min(255, Math.round(b + (255 - b) * amount));
        return `rgb(${nr},${ng},${nb})`;
    }

    // نوێکردنەوەی UI
    updateUI(score, coins, highScore) {
        document.getElementById('scoreVal').innerText = Math.floor(score);
        document.getElementById('coinVal').innerText = `🪙 ${Math.floor(coins)}`;
        document.getElementById('menuHighScore').innerText = highScore;
        document.getElementById('menuCoins').innerText = Math.floor(coins);
        document.getElementById('shopCoinVal').innerText = `🪙 ${Math.floor(coins)}`;
    }

    // کێشانی ڕادار
    drawRadar(player, bots, garages, isGarageRented) {
        const ctx = this.radarCtx;
        const size = 65;
        ctx.clearRect(0, 0, size, size);
        
        const mapSize = CONFIG.MAP_RADIUS * 2;
        const scale = size / mapSize;
        const offset = CONFIG.MAP_CENTER - CONFIG.MAP_RADIUS;
        
        // گەراجەکان
        garages.forEach(g => {
            ctx.fillStyle = isGarageRented ? '#2ecc71' : '#f1c40f';
            ctx.fillRect(
                (g.x - offset) * scale - 3,
                (g.y - offset) * scale - 3,
                6, 6
            );
        });
        
        // بۆتەکان
        bots.forEach(b => {
            if (!b.alive) return;
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.arc(
                (b.x - offset) * scale,
                (b.y - offset) * scale,
                2, 0, Math.PI * 2
            );
            ctx.fill();
        });
        
        // یاریزان
        if (player && player.alive) {
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#2ecc71';
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.arc(
                (player.x - offset) * scale,
                (player.y - offset) * scale,
                3.5, 0, Math.PI * 2
            );
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
}
