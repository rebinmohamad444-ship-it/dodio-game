
const garageRentOptions = [
    { minutes: 10, price: 50, label: "Rent 10 Mins (🪙50)" },
    { minutes: 20, price: 100, label: "Rent 20 Mins (🪙100)" },
    { minutes: 30, price: 150, label: "Rent 30 Mins (🪙150)" },
    { minutes: 60, price: 230, label: "Rent 1 Hour (🪙230)" }
];

const garages = [
    { x: MAP_CENTER - 10000, y: MAP_CENTER - 10000 },
    { x: MAP_CENTER + 10000, y: MAP_CENTER - 10000 },
    { x: MAP_CENTER - 10000, y: MAP_CENTER + 10000 },
    { x: MAP_CENTER + 10000, y: MAP_CENTER + 10000 }
];

function rentGarage(minutes, price) {
    if(coins >= price) {
        coins -= price;
        let currentEnd = Date.now() < garageRentEndTime ? garageRentEndTime : Date.now();
        garageRentEndTime = currentEnd + (minutes * 60 * 1000);
        localStorage.setItem('dodio_garage_rent_end', garageRentEndTime.toString());
        saveStats();
        renderShop();
        alert(`🎉 Garage rented for ${minutes} minutes!`);
    } else {
        alert(`❌ Not enough coins! You need 🪙${price}.`);
    }
}
