// ============================================
// Shanshen.io - کۆدی سەرەکی یاری
// ============================================

import { CONFIG } from './config.js';
import { Player } from './player.js';
import { Bot } from './bot.js';
import { ShopManager } from './shop.js';
import { NetworkManager } from './network.js';
import { UIManager } from './ui-manager.js';
import { 
    getRandomMapPos, 
    distance, 
    normalizeAngle,
    playHeadshotSound,
    playEatSound 
} from './utils.js';
import { 
    createFruits, 
    createCoins, 
    createPowerups, 
    refreshFruit, 
    refreshCoin, 
    refreshPowerup,
    createExplosion 
} from './items.js';

// ============================================
// کلاسی سەرەکی یاری
// ============================================

class Game {
    constructor() {
        this.running = false;
        this.controlType = 'touch';
        
        // کۆنترۆڵ
        this.joyActive = false;
        this.joyCenterX = 0;
        this.joyCenterY = 0;
        this.manualBoost = false;
        
        // داتاکان
        this.player = null;
        this.bots = [];
        this.fruits = [];
        this.coins = [];
        this.powerups = [];
        this.deadRemains = [];
        this.garages = CONFIG.GARAGES;
        
        // هێزەکان
        this.activePowers = {};
        this.currentMultiplier = 1;
        this.isMagnetActive = false;
        this.isSteeringActive = false;
        this.isSniperActive = false;
        
        // کات
        this.lastFrameTime = performance.now();
        this.enemySpawnTimer = 0;
        this.headshotTimer = 0;
        
        // بەڕێوەبەرەکان
        this.shop = new ShopManager();
        this.network = new NetworkManager();
        this.ui = new UIManager();
        
        // وێنەکانی ئاڵا
        this.flagImages = {};
        this.loadFlagImages();
        
        // دەستپێکردنی تۆڕ
        this.network.init();
        
        // ڕووداوەکان
        this.setupEvents();
    }

    // بارکردنی وێنەکانی ئاڵا
    loadFlagImages() {
        const flagUrls = {
            'kurdish': 'https://flagcdn.com/w80/krd.png',
            'spain': 'https://flagcdn.com/w80/es.png',
            'brazil': 'https://flagcdn.com/w80/br.png',
            'iraq': 'https://flagcdn.com/w80/iq.png',
            'turkey': 'https://flagcdn.com/w80/tr.png',
            'iran': 'https://flagcdn.com/w80/ir.png',
            'palestine': 'https://flagcdn.com/w80/ps.png',
            'saudi': 'https://flagcdn.com/w80/sa.png'
        };
        
        Object.keys(flagUrls).forEach(key => {
            const img = new Image();
            img.src = flagUrls[key];
            this.flagImages[key] = img;
        });
    }

    // کۆنترۆڵەکان
    setupEvents() {
        const canvas = document.getElementById('gameCanvas');
        const joyZone = document.getElementById('joystick-zone');
        const joyKnob = document.getElementById('joystick-knob');
        const boostBtn = document.getElementById('boost-btn');
        
        // جوڵانەوەی ماوس
        window.addEventListener('touchmove', (e) => {
            if (!this.running || !this.player || !this.player.alive) return;
            const touch = e.touches[0];
            if (this.controlType === 'touch') {
                this.player.targetAngle = Math.atan2(
                    touch.clientY - canvas.height/2,
                    touch.clientX - canvas.width/2
                );
            }
        });
        
        // جۆیستیک
        window.addEventListener('touchstart', (e) => {
            if (!this.running || !this.player || !this.player.alive || this.controlType !== 'joystick') return;
            const touch = e.touches[0];
            if (touch.clientX < 110 && touch.clientY < 110) return;
            
            this.joyCenterX = touch.clientX;
            this.joyCenterY = touch.clientY;
            joyZone.style.left = `${this.joyCenterX}px`;
            joyZone.style.top = `${this.joyCenterY}px`;
            joyZone.style.display = 'block';
            this.joyActive = true;
        });
        
        window.addEventListener('touchmove', (e) => {
            if (!this.joyActive || this.controlType !== 'joystick') return;
            const touch = e.touches[0];
            const dx = touch.clientX - this.joyCenterX;
            const dy = touch.clientY - this.joyCenterY;
            const dist = Math.hypot(dx, dy);
            const maxDist = 28;
            let knobX = dx, knobY = dy;
            if (dist > maxDist) {
                knobX = (dx / dist) * maxDist;
                knobY = (dy / dist) * maxDist;
            }
            joyKnob.style.transform = `translate(${knobX}px, ${knobY}px)`;
            this.player.targetAngle = Math.atan2(dy, dx);
        });
        
        window.addEventListener('touchend', () => {
            this.joyActive = false;
            joyZone.style.display = 'none';
        });
        
        // بۆست
        boostBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this.manualBoost = true; });
        boostBtn.addEventListener('touchend', (e) => { e.preventDefault(); this.manualBoost = false; });
        boostBtn.addEventListener('mousedown', (e) => { e.preventDefault(); this.manualBoost = true; });
        boostBtn.addEventListener('mouseup', (e) => { e.preventDefault(); this.manualBoost = false; });
    }

    // گۆڕینی شێوازی کۆنترۆڵ
    setControlType(type) {
        this.controlType = type;
        document.getElementById('btn-controls').style.display = type === 'buttons' ? 'grid' : 'none';
        document.getElementById('joystick-zone').style.display = 'none';
    }

    // دەستپێکردنی یاری
    startGame() {
        const name = document.getElementById('playerName').value || 'Player';
        this.shop.selectedSkin = this.shop.selectedSkin || 'free1';
        
        this.player = new Player(name, this.shop.selectedSkin);
        this.player.score = 0;
        this.player.sizeRadius = CONFIG.PLAYER_INITIAL_SIZE;
        
        // دروستکردنەوەی لاشە
        this.player.body = [];
        for (let i = 0; i < 60; i++) {
            this.player.body.push({ x: this.player.x - i * 10, y: this.player.y });
        }
        
        // بۆتەکان
        this.bots = [];
        for (let i = 0; i < CONFIG.BOT_COUNT; i++) {
            const bot = new Bot(i);
            this.bots.push(bot);
        }
        
        // خواردنەکان
        this.fruits = createFruits();
        this.coins = createCoins();
        this.powerups = createPowerups();
        this.deadRemains = [];
        this.activePowers = {};
        this.currentMultiplier = 1;
        this.isMagnetActive = false;
        this.isSteeringActive = false;
        this.isSniperActive = false;
        this.manualBoost = false;
        
        document.getElementById('menu-overlay').style.display = 'none';
        document.getElementById('scoreVal').innerText = '0';
        document.getElementById('boost-btn').style.display = 'none';
        
        this.running = true;
        this.lastFrameTime = performance.now();
        this.headshotTimer = 0;
        
        // گوێگرتن لە ڕیزبەندی
        this.network.getLeaderboard((data) => {
            this.updateLeaderboard(data);
        });
        
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    // لووبەری سەرەکی
    gameLoop(now) {
        if (!this.running) return;
        
        let dt = (now - this.lastFrameTime) / 1000;
        if (dt > 0.1 || isNaN(dt)) dt = 0.016;
        this.lastFrameTime = now;
        
        this.update(dt);
        this.render();
        
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    // نوێکردنەوە
    update(dt) {
        if (!this.player || !this.player.alive) return;
        
        const isGarageRented = this.shop.isGarageRented();
        let isInsideGarage = false;
        let garagePos = null;
        
        // پشکنینی گەراج
        this.garages.forEach(g => {
            const half = g.size / 2;
            if (this.player.x >= g.x - half && this.player.x <= g.x + half &&
                this.player.y >= g.y - half && this.player.y <= g.y + half) {
                isInsideGarage = true;
                garagePos = g;
            }
        });
        
        // نیشاندانی دۆخی گەراج
        if (isInsideGarage && isGarageRented) {
            document.getElementById('garage-safe-status').style.display = 'block';
            const leftSecs = Math.max(0, this.shop.getGarageTimeLeft());
            const m = Math.floor(leftSecs / 60);
            const s = leftSecs % 60;
            document.getElementById('garageTimerVal').innerText = `Rent Time Left: ${m}m ${s}s (Safe Zone Active)`;
        } else {
            document.getElementById('garage-safe-status').style.display = 'none';
        }
        
        // بەشێوەی ئاسایی جوڵانەوە
        if (!isInsideGarage || !isGarageRented) {
            const speedMulti = this.manualBoost ? 2.0 : 1.0;
            this.player.update(dt, speedMulti);
        } else {
            // لە گەراجدا، تەنها لاشە ڕاکێشە
            for (let i = 1; i < this.player.body.length; i++) {
                this.player.body[i].x += (this.player.x - this.player.body[i].x) * 4.0 * dt;
                this.player.body[i].y += (this.player.y - this.player.body[i].y) * 4.0 * dt;
            }
        }
        
        // پشکنینی ڕێدزۆن
        const distFromCenter = distance(this.player, { x: CONFIG.MAP_CENTER, y: CONFIG.MAP_CENTER });
        if (distFromCenter >= CONFIG.MAP_RADIUS - 50) {
            this.player.alive = false;
            this.shop.addScore(this.player.score);
            alert('Game Over! You hit the Red Zone!');
            this.running = false;
            document.getElementById('menu-overlay').style.display = 'flex';
            return;
        }
        document.getElementById('red-zone-alert').style.display = 
            distFromCenter > CONFIG.MAP_RADIUS - 1200 ? 'block' : 'none';
        
        // میوەکان
        this.fruits.forEach(f => {
            if (f.eatenTime && Date.now() - f.eatenTime > 15000) {
                refreshFruit(f);
            } else if (!f.eatenTime) {
                if (this.player.collidesWith(f.x, f.y, 22)) {
                    const gained = this.player.addScore(5, this.currentMultiplier);
                    document.getElementById('scoreVal').innerText = Math.floor(this.player.score);
                    f.eatenTime = Date.now();
                    f.x = -99999;
                    f.y = -99999;
                    playEatSound();
                    if (this.player.sizeRadius < CONFIG.PLAYER_MAX_SIZE) {
                        this.player.sizeRadius += 0.35 * this.currentMultiplier;
                    }
                }
            }
        });
        
        // زێر
        this.coins.forEach(c => {
            if (this.player.collidesWith(c.x, c.y, 20)) {
                this.shop.addCoins(0.5 * this.currentMultiplier);
                document.getElementById('coinVal').innerText = `🪙 ${Math.floor(this.shop.coins)}`;
                refreshCoin(c);
            }
        });
        
        // هێزەکان
        this.powerups.forEach(p => {
            if (this.player.collidesWith(p.x, p.y, 24)) {
                this.applyPowerup(p.icon);
                refreshPowerup(p);
            }
        });
        
        // پاشماوەکانی تەقینەوە
        this.deadRemains = this.deadRemains.filter(r => Date.now() - r.spawnTime < 25000);
        this.deadRemains.forEach((r, i) => {
            if (this.player.collidesWith(r.x, r.y, 25)) {
                this.player.addScore(15, this.currentMultiplier);
                document.getElementById('scoreVal').innerText = Math.floor(this.player.score);
                this.deadRemains.splice(i, 1);
                if (this.player.sizeRadius < CONFIG.PLAYER_MAX_SIZE) {
                    this.player.sizeRadius += 0.45 * this.currentMultiplier;
                }
            }
        });
        
        // بۆتەکان
        this.bots.forEach(bot => {
            if (!bot.alive) return;
            bot.update(dt, this.player);
            
            // پێکدادانی بۆت لەگەڵ یاریزان
            if (!isInsideGarage || !isGarageRented) {
                const headDist = distance(this.player.getHead(), bot.getHead());
                if (headDist < this.player.sizeRadius + bot.sizeRadius) {
                    // سەر بە سەر پێکدادان - یاریزان دەکوژێت
                    bot.die();
                    const colors = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6'];
                    const remains = createExplosion(bot.body, colors);
                    this.deadRemains.push(...remains);
                    this.player.addScore(500, this.currentMultiplier);
                    document.getElementById('scoreVal').innerText = Math.floor(this.player.score);
                    this.headshotTimer = Date.now() + 3000;
                    playHeadshotSound();
                    bot.respawn();
                }
                
                // پێکدادانی لاشە
                for (let i = 3; i < bot.body.length; i++) {
                    if (this.player.headCollidesWith(bot.body[i].x, bot.body[i].y, bot.sizeRadius * 0.5)) {
                        this.player.alive = false;
                        this.shop.addScore(this.player.score);
                        alert('Game Over! You crashed into a bot!');
                        this.running = false;
                        document.getElementById('menu-overlay').style.display = 'flex';
                        return;
                    }
                }
            }
        });
        
        // هێزی مەگناتیس - 5 هێڵی لەبەردەم مار
        if (this.isMagnetActive && !isInsideGarage) {
            const head = this.player.getHead();
            const angle = this.player.angle;
            
            [this.fruits, this.coins, this.powerups, this.deadRemains].forEach(group => {
                group.forEach(item => {
                    if (!item.eatenTime && item.x && item.y) {
                        const d = distance(item, head);
                        if (d < CONFIG.MAGNET_RANGE) {
                            // بەرەو سەرەوە ڕاکێشان
                            const targetX = head.x + Math.cos(angle) * 80;
                            const targetY = head.y + Math.sin(angle) * 80;
                            item.x += (targetX - item.x) * CONFIG.MAGNET_FORCE * 0.016;
                            item.y += (targetY - item.y) * CONFIG.MAGNET_FORCE * 0.016;
                        }
                    }
                });
            });
        }
        
        // نوێکردنەوەی UI
        this.ui.updateUI(
            this.player.score,
            this.shop.coins,
            this.shop.highScore
        );
        
        // نوێکردنەوەی ڕیزبەندی
        if (Math.floor(Date.now() / 5000) % 2 === 0) {
            this.network.sendScore(this.player.id, this.player.score, this.player.name);
            this.network.getLeaderboard((data) => {
                this.updateLeaderboard(data);
            });
        }
        
        // نوێکردنەوەی هێزەکان
        this.updatePowers();
    }

    // بەکارهێنانی هێز
    applyPowerup(icon) {
        if (icon === '🧲') {
            this.isMagnetActive = true;
            this.addPowerTimer('magnet', 'Magnet', '🧲', CONFIG.MAGNET_DURATION, () => {
                this.isMagnetActive = false;
            });
        } else if (icon.includes('x')) {
            const val = parseInt(icon.replace('x', '')) || 2;
            this.currentMultiplier = val;
            this.addPowerTimer('multiplier', `x${val}`, icon, CONFIG.MULTIPLIER_DURATION, () => {
                this.currentMultiplier = 1;
            });
        } else if (icon === '🚀') {
            document.getElementById('boost-btn').style.display = 'flex';
            this.addPowerTimer('boost', 'Boost', '🚀', CONFIG.BOOST_DURATION, () => {
                document.getElementById('boost-btn').style.display = 'none';
                this.manualBoost = false;
            });
        } else if (icon === '🛞') {
            this.isSteeringActive = true;
            this.addPowerTimer('steering', 'Steering', '🛞', CONFIG.STEERING_DURATION, () => {
                this.isSteeringActive = false;
            });
        } else if (icon === '🎯') {
            this.isSniperActive = true;
            this.addPowerTimer('sniper', 'Sniper', '🎯', CONFIG.SNIPER_DURATION, () => {
                this.isSniperActive = false;
            });
        }
    }

    // کات بۆ هێزەکان
    addPowerTimer(key, name, icon, durationMs, onExpire) {
        const expireTime = Date.now() + durationMs;
        
        if (this.activePowers[key]) {
            clearTimeout(this.activePowers[key].timerId);
            this.activePowers[key].expireTime = expireTime;
            this.activePowers[key].timerId = setTimeout(() => {
                delete this.activePowers[key];
                if (onExpire) onExpire();
            }, durationMs);
        } else {
            const timerId = setTimeout(() => {
                delete this.activePowers[key];
                if (onExpire) onExpire();
            }, durationMs);
            this.activePowers[key] = { name, icon, expireTime, timerId };
        }
    }

    // نوێکردنەوەی نیشانەکانی هێز
    updatePowers() {
        const container = document.getElementById('active-powers-container');
        let html = '';
        const now = Date.now();
        
        Object.keys(this.activePowers).forEach(key => {
            const p = this.activePowers[key];
            const timeLeft = Math.max(0, Math.ceil((p.expireTime - now) / 1000));
            html += `<div class="power-badge"><span>${p.icon}</span> <span>${p.name} (${timeLeft}s)</span></div>`;
        });
        
        container.innerHTML = html;
    }

    // نوێکردنەوەی ڕیزبەندی
    updateLeaderboard(data) {
        const list = document.getElementById('topList');
        if (!list) return;
        
        let html = '';
        const sorted = data || [];
        sorted.slice(0, 10).forEach((item, idx) => {
            const isPlayer = item.name === this.player?.name;
            html += `<div style="color:${isPlayer ? '#2ecc71' : '#fff'}; font-weight:${isPlayer ? 'bold' : 'normal'};">
                ${idx + 1}. ${item.name} - ${Math.floor(item.score)}
            </div>`;
        });
        list.innerHTML = html;
    }

    // کێشان
    render() {
        const ctx = this.ui.ctx;
        const canvas = this.ui.canvas;
        const head = this.player?.getHead() || { x: 0, y: 0 };
        
        // کیمێرا
        const camX = canvas.width / 2 - head.x * this.getCameraScale();
        const camY = canvas.height / 2 - head.y * this.getCameraScale();
        
        // پاککردنەوە
        ctx.fillStyle = '#0f131a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        ctx.translate(camX, camY);
        ctx.scale(this.getCameraScale(), this.getCameraScale());
        
        // تۆڕی زەوی
        this.drawGrid(ctx);
        
        // ڕێدزۆن
        this.drawRedZone(ctx);
        
        // گەراجەکان
        this.drawGarages(ctx);
        
        // میوەکان
        this.drawFruits(ctx);
        
        // زێر
        this.drawCoins(ctx);
        
        // هێزەکان
        this.drawPowerups(ctx);
        
        // پاشماوەکان
        this.drawRemains(ctx);
        
        // بۆتەکان
        this.drawBots(ctx);
        
        // یاریزان
        this.drawPlayer(ctx);
        
        ctx.restore();
        
        // ڕادار
        this.ui.drawRadar(
            this.player,
            this.bots,
            this.garages,
            this.shop.isGarageRented()
        );
        
        // هێدشۆت
        if (Date.now() < this.headshotTimer) {
            ctx.save();
            ctx.font = '900 36px Arial';
            ctx.fillStyle = '#e74c3c';
            ctx.textAlign = 'center';
            ctx.shadowColor = '#f1c40f';
            ctx.shadowBlur = 12;
            ctx.fillText('💥 HEADSHOT! 🎯', canvas.width / 2, canvas.height / 3);
            ctx.restore();
        }
        
        // نیشاندانی ژمارە
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '12px Arial';
        ctx.fillText(`🏹 ${this.player?.body?.length || 0}`, 10, canvas.height - 20);
        ctx.fillText(`👾 ${this.bots.filter(b => b.alive).length}`, 10, canvas.height - 40);
    }

    // گەڕاندنەوەی پێوەری کیمێرا
    getCameraScale() {
        let scale = 0.35;
        if (this.player) {
            scale = Math.max(0.15, 0.35 - (this.player.sizeRadius - 28) * 0.002);
        }
        if (this.isSniperActive) {
            scale *= 0.5;
        }
        return scale;
    }

    // کێشانی تۆڕ
    drawGrid(ctx) {
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 2;
        const gridSize = 150;
        const start = CONFIG.MAP_CENTER - CONFIG.MAP_RADIUS;
        const end = CONFIG.MAP_CENTER + CONFIG.MAP_RADIUS;
        
        ctx.beginPath();
        for (let x = start; x <= end; x += gridSize) {
            ctx.moveTo(x, start);
            ctx.lineTo(x, end);
        }
        for (let y = start; y <= end; y += gridSize) {
            ctx.moveTo(start, y);
            ctx.lineTo(end, y);
        }
        ctx.stroke();
    }

    // کێشانی ڕێدزۆن
    drawRedZone(ctx) {
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 30;
        ctx.shadowColor = '#e74c3c';
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.arc(CONFIG.MAP_CENTER, CONFIG.MAP_CENTER, CONFIG.MAP_RADIUS, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    // کێشانی گەراجەکان
    drawGarages(ctx) {
        const isRented = this.shop.isGarageRented();
        
        this.garages.forEach(g => {
            const half = g.size / 2;
            
            // پشکنینی ئەوەی باشووری گەراج لە ڕێدزۆن بێت
            const southY = g.y + half;
            const distFromCenter = distance({ x: g.x, y: southY }, { x: CONFIG.MAP_CENTER, y: CONFIG.MAP_CENTER });
            const isSouthInRed = distFromCenter > CONFIG.MAP_RADIUS - 100;
            
            // سەرەوە و باشوور بە رەنگی جیاواز
            if (isSouthInRed) {
                // باشوور (لە ڕێدزۆن) - سوور
                ctx.fillStyle = 'rgba(231,76,60,0.15)';
                ctx.fillRect(g.x - half, g.y, g.size, half);
                ctx.strokeStyle = '#e74c3c';
                ctx.lineWidth = 3;
                ctx.strokeRect(g.x - half, g.y, g.size, half);
            }
            
            // سەرەوە (لە دەرەوەی ڕێدزۆن) - سەوز
            ctx.fillStyle = isRented ? 'rgba(46,204,113,0.2)' : 'rgba(127,140,141,0.2)';
            ctx.fillRect(g.x - half, g.y - half, g.size, half);
            ctx.strokeStyle = isRented ? '#2ecc71' : '#f1c40f';
            ctx.lineWidth = isRented ? 6 : 3;
            ctx.strokeRect(g.x - half, g.y - half, g.size, half);
            
            // هێڵی بەرگری لەبەردەم گەراج
            if (isRented) {
                ctx.strokeStyle = 'rgba(46,204,113,0.3)';
                ctx.lineWidth = 4;
                ctx.setLineDash([20, 15]);
                ctx.strokeRect(g.x - half - 30, g.y - half - 30, g.size + 60, g.size + 60);
                ctx.setLineDash([]);
                
                // نیشانەی گەراج
                ctx.fillStyle = isRented ? '#2ecc71' : '#f1c40f';
                ctx.font = 'bold 28px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(isRented ? '🛞 SAFE ZONE' : '🔒 RENT REQUIRED', g.x, g.y - 40);
            }
        });
    }

    // کێشانی میوەکان
    drawFruits(ctx) {
        this.fruits.forEach(f => {
            if (!f.eatenTime) {
                ctx.font = '26px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(f.type, f.x, f.y);
            }
        });
    }

    // کێشانی زێر
    drawCoins(ctx) {
        this.coins.forEach(c => {
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🪙', c.x, c.y);
        });
    }

    // کێشانی هێزەکان
    drawPowerups(ctx) {
        this.powerups.forEach(p => {
            ctx.font = 'bold 30px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(255,215,0,0.3)';
            ctx.shadowBlur = 10;
            ctx.fillText(p.icon, p.x, p.y);
            ctx.shadowBlur = 0;
        });
    }

    // کێشانی پاشماوەکان
    drawRemains(ctx) {
        this.deadRemains.forEach(r => {
            ctx.fillStyle = r.color || '#2ecc71';
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(r.x, r.y, r.size || 14, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }

    // کێشانی بۆتەکان
    drawBots(ctx) {
        this.bots.forEach(bot => {
            if (!bot.alive) return;
            
            const skin = this.shop.getCurrentSkin();
            const colors = skin.colors || ['#e74c3c', '#c0392b'];
            const head = bot.getHead();
            
            // لاشە
            for (let i = bot.body.length - 1; i >= 2; i--) {
                const p = bot.body[i];
                const color = colors[i % colors.length] || colors[0];
                ctx.fillStyle = color;
                ctx.shadowColor = 'rgba(0,0,0,0.2)';
                ctx.shadowBlur = 5;
                ctx.beginPath();
                ctx.arc(p.x, p.y, bot.sizeRadius * 0.75, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // سەرپێچ
            this.ui.drawSnakeHead(
                head,
                bot.angle,
                colors[0] || '#e74c3c',
                bot.sizeRadius,
                null,
                null,
                null
            );
        });
    }

    // کێشانی یاریزان
    drawPlayer(ctx) {
        if (!this.player || !this.player.alive) return;
        
        const skin = this.shop.getCurrentSkin();
        const colors = skin.colors || ['#2ecc71', '#27ae60'];
        const head = this.player.getHead();
        const flagKey = skin.flagKey || null;
        
        // لاشە (هەمووی وێنەی ئاڵا)
        if (flagKey && this.flagImages[flagKey]) {
            for (let i = this.player.body.length - 1; i >= 2; i--) {
                const p = this.player.body[i];
                ctx.shadowColor = 'rgba(0,0,0,0.2)';
                ctx.shadowBlur = 5;
                try {
                    ctx.drawImage(
                        this.flagImages[flagKey],
                        p.x - this.player.sizeRadius * 0.7,
                        p.y - this.player.sizeRadius * 0.4,
                        this.player.sizeRadius * 1.4,
                        this.player.sizeRadius * 0.8
                    );
                } catch(e) {
                    ctx.fillStyle = colors[i % colors.length] || colors[0];
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, this.player.sizeRadius * 0.75, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        } else {
            // ڕەنگە ئاساییەکان
            for (let i = this.player.body.length - 1; i >= 2; i--) {
                const p = this.player.body[i];
                const color = colors[i % colors.length] || colors[0];
                ctx.fillStyle = color;
                ctx.shadowColor = 'rgba(0,0,0,0.2)';
                ctx.shadowBlur = 5;
                ctx.beginPath();
                ctx.arc(p.x, p.y, this.player.sizeRadius * 0.75, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // سەرپێچ
        this.ui.drawSnakeHead(
            head,
            this.player.angle,
            colors[0] || '#2ecc71',
            this.player.sizeRadius,
            flagKey,
            this.flagImages,
            this.activePowers
        );
    }
}

// ============================================
// دەستپێکردنی یاری
// ============================================

const game = new Game();

// کردنەوەی فەنکشنەکان بۆ دوگمەکان
window.startGame = () => game.startGame();
window.openShop = () => {
    document.getElementById('shop-modal').style.display = 'flex';
    renderShopUI(game.shop);
};
window.closeShop = () => document.getElementById('shop-modal').style.display = 'none';
window.openExitModal = () => document.getElementById('exit-modal').style.display = 'flex';
window.closeExitModal = () => document.getElementById('exit-modal').style.display = 'none';
window.confirmExit = () => {
    game.running = false;
    document.getElementById('exit-modal').style.display = 'none';
    document.getElementById('menu-overlay').style.display = 'flex';
};
window.openSettings = () => document.getElementById('settings-modal').style.display = 'flex';
window.closeSettings = () => document.getElementById('settings-modal').style.display = 'none';
window.changeControlType = () => {
    const type = document.getElementById('controlTypeSelect').value;
    game.setControlType(type);
};
window.setDir = (x, y) => {
    if (game.player) {
        game.player.targetAngle = Math.atan2(y, x);
    }
};
window.triggerEmoji = (char) => {
    if (game.ui) game.ui.showEmoji(char);
};
window.exitGarageManually = () => {
    if (game.player) {
        game.player.x += 350;
        document.getElementById('garage-safe-status').style.display = 'none';
    }
};
window.loginFacebook = () => alert('Connected with Facebook! 📘');
window.loginGuest = () => alert('Logged in as Guest! 👤');

// کۆگا
function renderShopUI(shop) {
    const container = document.getElementById('shopItemsContainer');
    if (!container) return;
    
    const activeTab = document.getElementById('tabFreeBtn').classList.contains('active') ? 'free' :
                      document.getElementById('tabFlagsBtn').classList.contains('active') ? 'flags' : 'garage';
    
    container.innerHTML = '';
    
    if (activeTab === 'garage') {
        const isRented = shop.isGarageRented();
        const leftMins = isRented ? Math.ceil(shop.getGarageTimeLeft() / 60) : 0;
        
        container.innerHTML += `<div style="text-align:center; margin-bottom:8px; font-size:11px; color:#f1c40f;">
            ${isRented ? `✅ Active! ${leftMins} Mins left` : '❌ Expired. Rent below:'}
        </div>`;
        
        CONFIG.GARAGE_RENT_OPTIONS.forEach(opt => {
            container.innerHTML += `
                <div class="shop-item">
                    <span>🛞 ${opt.minutes} Minutes</span>
                    <button style="background:#f39c12; color:#fff; padding:4px 8px;" 
                        onclick="rentGarage(${opt.minutes}, ${opt.price})">
                        Rent 🪙${opt.price}
                    </button>
                </div>
            `;
        });
        return;
    }
    
    const skins = activeTab === 'free' ? shop.availableSkins.free : shop.availableSkins.flags;
    
    skins.forEach(s => {
        const isOwned = shop.ownedSkins.includes(s.id);
        const isSelected = shop.selectedSkin === s.id;
        let btnHtml = '';
        
        if (isSelected) {
            btnHtml = `<button style="background:#27ae60; padding:4px 8px;">Equipped</button>`;
        } else if (isOwned) {
            btnHtml = `<button style="background:#2980b9; padding:4px 8px;" onclick="selectSkin('${s.id}')">Equip</button>`;
        } else {
            btnHtml = `<button style="background:#f39c12; color:#fff; padding:4px 8px;" onclick="buySkin('${s.id}', ${s.price || 0})">Buy 🪙${s.price || 0}</button>`;
        }
        
        let flagImg = s.flagKey ? `<img src="https://flagcdn.com/w80/${s.flagKey}.png" class="flag-img"/>` : '';
        
        container.innerHTML += `
            <div class="shop-item">
                <span>${flagImg} ${s.name}</span>
                ${btnHtml}
            </div>
        `;
    });
}

window.selectSkin = (id) => {
    const result = game.shop.selectSkin(id);
    if (result.success) {
        game.player.skin = id;
        renderShopUI(game.shop);
        alert('✅ Skin equipped!');
    } else {
        alert(result.message);
    }
};

window.buySkin = (id, price) => {
    const result = game.shop.buySkin(id, price);
    if (result.success) {
        renderShopUI(game.shop);
        alert('🎉 Skin purchased!');
    } else {
        alert(result.message);
    }
};

window.rentGarage = (minutes, price) => {
    const result = game.shop.rentGarage(minutes, price);
    if (result.success) {
        renderShopUI(game.shop);
        alert(`🎉 Garage rented for ${minutes} minutes!`);
    } else {
        alert(result.message);
    }
};

window.switchShopTab = (tab) => {
    document.getElementById('tabFreeBtn').className = `shop-tab-btn ${tab === 'free' ? 'active' : ''}`;
    document.getElementById('tabFlagsBtn').className = `shop-tab-btn ${tab === 'flags' ? 'active' : ''}`;
    document.getElementById('tabGarageBtn').className = `shop-tab-btn ${tab === 'garage' ? 'active' : ''}`;
    renderShopUI(game.shop);
};

// دەستپێکردنی سەرەتایی
document.addEventListener('DOMContentLoaded', () => {
    renderShopUI(game.shop);
    game.shop.save();
    
    // نمایشی ڕیزبەندی
    game.network.getLeaderboard((data) => {
        // ڕیزبەندی لە مینۆدا
        const container = document.getElementById('menuLeaderboardContainer');
        if (container && data) {
            let html = '';
            data.slice(0, 5).forEach((item, idx) => {
                html += `<div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                    <span>${idx+1}. ${item.name}</span>
                    <span style="color:#2ecc71;">${Math.floor(item.score)}</span>
                </div>
