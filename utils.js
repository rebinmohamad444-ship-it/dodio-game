
// ============================================
// Shanshen.io - فەنکشنە یارمەتیدەرەکان
// ============================================

import { CONFIG } from './config.js';

// دەستنیشانکردنی شوێنی هەڕەمەکی لەسەر ماپ
export function getRandomMapPos() {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * (CONFIG.MAP_RADIUS - 400);
    return {
        x: CONFIG.MAP_CENTER + Math.cos(angle) * r,
        y: CONFIG.MAP_CENTER + Math.sin(angle) * r
    };
}

// دووری نێوان دوو خاڵ
export function distance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

// زاویەی نێوان دوو خاڵ
export function angleBetween(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

// گۆڕینی زاویە بۆ ناوچەی [-PI, PI]
export function normalizeAngle(angle) {
    while (angle < -Math.PI) angle += Math.PI * 2;
    while (angle > Math.PI) angle -= Math.PI * 2;
    return angle;
}

// هەڵبژاردنی شتێک بە هەڕەمەکی لە ئارایەکدا
export function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ژمارەی هەڕەمەکی لە نێوان دوو ژمارەدا
export function randomBetween(min, max) {
    return min + Math.random() * (max - min);
}

// پشکنینی ئەوەی خاڵێک لە ناو بازنەیەکدایە
export function isPointInCircle(px, py, cx, cy, radius) {
    return Math.hypot(px - cx, py - cy) < radius;
}

// پشکنینی ئەوەی خاڵێک لە ناو چوارگۆشەیەکدایە
export function isPointInRect(px, py, rx, ry, rw, rh) {
    return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
}

// پشکنینی ئەوەی بازنەیەک لەگەڵ بازنەیەکی تر پێکدادەکات
export function circlesCollide(x1, y1, r1, x2, y2, r2) {
    return Math.hypot(x1 - x2, y1 - y2) < r1 + r2;
}

// هەڵگرتنی داتا لە localStorage
export function saveToLocal(key, value) {
    localStorage.setItem(`shanshen_${key}`, JSON.stringify(value));
}

// بارکردنی داتا لە localStorage
export function loadFromLocal(key, defaultValue) {
    const data = localStorage.getItem(`shanshen_${key}`);
    return data ? JSON.parse(data) : defaultValue;
}

// دەنگی هێدشۆت
export function playHeadshotSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const actx = new AudioCtx();
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, actx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, actx.currentTime + 0.15);
        osc.frequency.exponentialRampToValueAtTime(80, actx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.8, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, actx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start();
        osc.stop(actx.currentTime + 0.35);
    } catch(e) {}
}

// دەنگی خواردن
export function playEatSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const actx = new AudioCtx();
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, actx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, actx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.3, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, actx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start();
        osc.stop(actx.currentTime + 0.08);
    } catch(e) {}
}
