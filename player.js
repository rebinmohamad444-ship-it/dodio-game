
// ============================================
// Shanshen.io - بەڕێوەبردنی یاریزان
// ============================================

import { CONFIG } from './config.js';
import { distance, angleBetween, normalizeAngle, playEatSound } from './utils.js';

export class Player {
    constructor(name, skinId = 'free1') {
        this.name = name || 'Player';
        this.id = 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
        this.x = CONFIG.MAP_CENTER;
        this.y = CONFIG.MAP_CENTER;
        this.angle = 0;
        this.targetAngle = 0;
        this.skin = skinId;
        this.alive = true;
        this.sizeRadius = CONFIG.PLAYER_INITIAL_SIZE;
        this.score = 0;
        this.body = [];
        this.maxSegments = 60;
        
        // دروستکردنی لاشە
        for (let i = 0; i < this.maxSegments; i++) {
            this.body.push({ x: this.x - i * 10, y: this.y });
        }
    }

    // نوێکردنەوەی شوێنی مار
    update(dt, speedMultiplier = 1) {
        if (!this.alive) return;
        
        // گۆڕینی زاویە
        let diff = this.targetAngle - this.angle;
        diff = normalizeAngle(diff);
        const turnSpeed = 8.0;
        this.angle += diff * turnSpeed * dt;
        
        // جوڵانەوە
        const speed = CONFIG.PLAYER_SPEED * speedMultiplier * dt;
        this.x += Math.cos(this.angle) * speed;
        this.y += Math.sin(this.angle) * speed;
        
        // نوێکردنەوەی لاشە
        this.body.unshift({ x: this.x, y: this.y });
        
        // کۆنتڕۆڵی قەبارەی لاشە
        const maxSeg = Math.min(3500, 60 + Math.floor(this.score / 4));
        while (this.body.length > maxSeg) {
            this.body.pop();
        }
    }

    // زیادکردنی خاڵ و گەورەکردن
    addScore(points, multiplier = 1) {
        const gained = points * multiplier;
        this.score += gained;
        if (this.sizeRadius < CONFIG.PLAYER_MAX_SIZE) {
            this.sizeRadius += gained * 0.008;
        }
        return gained;
    }

    // پشکنینی پێکدادان لەگەڵ شتێک
    collidesWith(x, y, radius) {
        return distance(this, { x, y }) < this.sizeRadius + radius;
    }

    // پشکنینی پێکدادانی سەر
    headCollidesWith(x, y, radius) {
        const head = this.body[0];
        return distance(head, { x, y }) < this.sizeRadius + radius;
    }

    // پشکنینی پێکدادانی لاشە
    bodyCollidesWith(x, y, radius) {
        for (let i = 3; i < this.body.length; i++) {
            if (distance(this.body[i], { x, y }) < this.sizeRadius * 0.7 + radius) {
                return true;
            }
        }
        return false;
    }

    // گەڕاندنەوەی شوێنی سەر
    getHead() {
        return this.body[0] || { x: this.x, y: this.y };
    }

    // کۆپی کردنی داتا بۆ ناردن بە تۆڕ
    getSnapshot() {
        return {
            id: this.id,
            name: this.name,
            x: this.x,
            y: this.y,
            angle: this.angle,
            skin: this.skin,
            score: this.score,
            sizeRadius: this.sizeRadius,
            alive: this.alive
        };
    }
}
