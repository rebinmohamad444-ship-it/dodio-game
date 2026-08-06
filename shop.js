
// ============================================
// Shanshen.io - بەڕێوەبردنی کۆگا
// ============================================

import { CONFIG } from './config.js';
import { saveToLocal, loadFromLocal } from './utils.js';

// داتاکانی کۆگا
export class ShopManager {
    constructor() {
        this.coins = loadFromLocal('coins', 1500);
        this.ownedSkins = loadFromLocal('owned_skins', ['free1', 'free2', 'free3', 'free4', 'free5', 'free6', 'free7']);
        this.selectedSkin = loadFromLocal('selected_skin', 'free1');
        this.garageRentEnd = loadFromLocal('garage_rent_end', 0);
        this.highScore = loadFromLocal('highscore', 0);
        
    flags: CONFIG.SKINS.flags
        };
    }

    // کڕینی سکین
    buySkin(skinId, price) {
        if (this.coins < price) {
            return { success: false, message: 'Not enough coins!' };
        }
        if (this.ownedSkins.includes(skinId)) {
            return { success: false, message: 'Already owned!' };
        }
        
        this.coins -= price;
        this.ownedSkins.push(skinId);
        this.save();
        return { success: true, message: 'Skin purchased!' };
    }

    // هەڵبژاردنی سکین
    selectSkin(skinId) {
        if (!this.ownedSkins.includes(skinId)) {
            return { success: false, message: 'You don\'t own this skin!' };
        }
        this.selectedSkin = skinId;
        this.save();
        return { success: true, message: 'Skin equipped!' };
    }

    // کرێی گەراج
    rentGarage(minutes, price) {
        if (this.coins < price) {
            return { success: false, message: 'Not enough coins!' };
        }
        
        this.coins -= price;
        const currentEnd = Date.now() < this.garageRentEnd ? this.garageRentEnd : Date.now();
        this.garageRentEnd = currentEnd + (minutes * 60 * 1000);
        this.save();
        return { success: true, message: `Garage rented for ${minutes} minutes!` };
    }

    // پشکنینی کرێی گەراج
    isGarageRented() {
        return Date.now() < this.garageRentEnd;
    }

    // ماوەی کرێی گەراج
    getGarageTimeLeft() {
        if (!this.isGarageRented()) return 0;
        return Math.ceil((this.garageRentEnd - Date.now()) / 1000);
    }

    // زیادکردنی زێر
    addCoins(amount) {
        this.coins += amount;
        this.save();
    }

    // زیادکردنی خاڵ و نوێکردنەوەی هایسکۆر
    addScore(score) {
        if (score > this.highScore) {
            this.highScore = score;
        }
        this.save();
    }

    // هەڵگرتنی داتا
    save() {
        saveToLocal('coins', this.coins);
        saveToLocal('owned_skins', this.ownedSkins);
        saveToLocal('selected_skin', this.selectedSkin);
        saveToLocal('garage_rent_end', this.garageRentEnd);
        saveToLocal('highscore', this.highScore);
    }

    // گەڕاندنەوەی سکینی ئێستا
    getCurrentSkin() {
        const allSkins = [...this.availableSkins.free, ...this.availableSkins.flags];
        return allSkins.find(s => s.id === this.selectedSkin) || allSkins[0];
    }

    // گەڕاندنەوەی هەموو سکینە خاوەنەکان
    getOwnedSkinObjects() {
        const allSkins = [...this.availableSkins.free, ...this.availableSkins.flags];
        return allSkins.filter(s => this.ownedSkins.includes(s.id));
    }
}
