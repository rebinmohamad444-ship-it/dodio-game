
// ============================================
// Shanshen.io - خواردنەکان، زێر و هێزەکان
// ============================================

import { CONFIG } from './config.js';
import { getRandomMapPos, randomItem } from './utils.js';

// جۆرەکانی میوە
const FRUIT_TYPES = ['🍌', '🍉', '🍒', '🍎', '🍓', '🍇', '🍊', '🍑', '🥝', '🍍'];
const POWERUP_TYPES = ['🧲', '🧲', '🧲', '🛞', '🛞', '🎯', '🚀', 'x2', 'x4', 'x6'];

// دروستکردنی میوەکان (2 هێندە زیادی کردووە)
export function createFruits() {
    const fruits = [];
    const count = CONFIG.FRUIT_COUNT;
    for (let i = 0; i < count; i++) {
        const pos = getRandomMapPos();
        fruits.push({
            x: pos.x,
            y: pos.y,
            type: randomItem(FRUIT_TYPES),
            eatenTime: null,
            id: 'fruit_' + i
        });
    }
    return fruits;
}

// دروستکردنی زێر (2 هێندە زیادی کردووە)
export function createCoins() {
    const coins = [];
    const count = CONFIG.COIN_COUNT;
    for (let i = 0; i < count; i++) {
        const pos = getRandomMapPos();
        coins.push({
            x: pos.x,
            y: pos.y,
            id: 'coin_' + i
        });
    }
    return coins;
}

// دروستکردنی هێزەکان (2 هێندە زیادی کردووە)
export function createPowerups() {
    const powerups = [];
    const count = CONFIG.POWERUP_COUNT;
    for (let i = 0; i < count; i++) {
        const pos = getRandomMapPos();
        powerups.push({
            x: pos.x,
            y: pos.y,
            icon: randomItem(POWERUP_TYPES),
            id: 'powerup_' + i
        });
    }
    return powerups;
}

// نوێکردنەوەی شوێنی میوەی خوراو
export function refreshFruit(fruit) {
    const pos = getRandomMapPos();
    fruit.x = pos.x;
    fruit.y = pos.y;
    fruit.eatenTime = null;
}

// نوێکردنەوەی شوێنی زێر
export function refreshCoin(coin) {
    const pos = getRandomMapPos();
    coin.x = pos.x;
    coin.y = pos.y;
}

// نوێکردنەوەی شوێنی هێز
export function refreshPowerup(powerup) {
    const pos = getRandomMapPos();
    powerup.x = pos.x;
    powerup.y = pos.y;
}

// ڕووخاندن و تەقینەوەی مار
export function createExplosion(body, colors) {
    const remains = [];
    body.forEach((p, i) => {
        if (i % 2 === 0) {
            remains.push({
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
    return remains;
}
