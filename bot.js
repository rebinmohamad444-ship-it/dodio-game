
// ============================================
// Shanshen.io - بەڕێوەبردنی بۆتەکان
// ============================================

import { CONFIG } from './config.js';
import { getRandomMapPos, distance, angleBetween, randomItem } from './utils.js';

export class Bot {
    constructor(id) {
        this.id = id;
        this.name = CONFIG.BOT_NAMES[id % CONFIG.BOT_NAMES.length] + '_' + (id + 1);
        const pos = getRandomMapPos();
        this.x = pos.x;
        this.y = pos.y;
        this.angle = Math.random() * Math.PI * 2;
        this.targetAngle = this.angle;
        this.alive = true;
        this.sizeRadius = CONFIG.BOT_SIZE + Math.random() * 5;
        this.score = 1500 + Math.random() * 3000;
        this.body = [];
        this.speed = CONFIG.BOT_SPEED + (Math.random() - 0.5) * 30;
        this.targetX = this.x;
        this.targetY = this.y;
        this.stateTimer = 0;
        this.state = 'wander';
        
        // دروستکردنی لاشە
        for (let i = 0; i < 65; i++) {
            this.body.push({ x: this.x - i * 10, y: this.y });
        }
    }

    // نوێکردنەوەی بۆت
    update(dt, playerPos) {
        if (!this.alive) return;
        
        this.stateTimer -= dt;
        
        // گۆڕینی دۆخ
        if (this.stateTimer <= 0) {
            this.state = Math.random() < 0.3 ? 'chase' : 'wander';
            this.stateTimer = 2 + Math.random() * 4;
            
            if (this.state === 'wander') {
                const pos = getRandomMapPos();
                this.targetX = pos.x;
                this.targetY = pos.y;
            }
        }
        
        // دیاریکردنی ئامانج
        let targetX = this.targetX;
        let targetY = this.targetY;
        
        if (this.state === 'chase' && playerPos) {
            const dist = distance(this, playerPos);
            if (dist < 2000) {
                targetX = playerPos.x;
                targetY = playerPos.y;
            }
        }
        
        // گۆڕینی زاویە
        this.targetAngle = angleBetween(this, { x: targetX, y: targetY });
        let diff = this.targetAngle - this.angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        this.angle += diff * 5.0 * dt;
        
        // جوڵانەوە
        const speed = this.speed * dt;
        this.x += Math.cos(this.angle) * speed;
        this.y += Math.sin(this.angle) * speed;
        
        // نوێکردنەوەی لاشە
        this.body.unshift({ x: this.x, y: this.y });
        while (this.body.length > 65) {
            this.body.pop();
        }
    }

    // مردن
    die() {
        this.alive = false;
    }

    // زیندوو کردنەوە
    respawn() {
        const pos = getRandomMapPos();
        this.x = pos.x;
        this.y = pos.y;
        this.alive = true;
        this.score = 1500 + Math.random() * 3000;
        this.sizeRadius = CONFIG.BOT_SIZE + Math.random() * 5;
        this.body = [];
        for (let i = 0; i < 65; i++) {
            this.body.push({ x: this.x - i * 10, y: this.y });
        }
    }

    // گەڕاندنەوەی شوێنی سەر
    getHead() {
        return this.body[0] || { x: this.x, y: this.y };
    }

    // کۆپی کردنی داتا
    getSnapshot() {
        return {
            id: this.id,
            name: this.name,
            x: this.x,
            y: this.y,
            angle: this.angle,
            score: this.score,
            sizeRadius: this.sizeRadius,
            alive: this.alive
        };
    }
}
