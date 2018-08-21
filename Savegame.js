class Savegame {
    constructor() {
        this.version = 'v0.4';
        this.credits = 0;
        this.highestWave = 0;
        this.upgrades = {
            'movementSpeed': 0,
            'maxShield': 0,
            'shieldRechargeTime': 0,
            'maxArmor': 0,
            'maxStructure': 0,
            'projectileDamage': 0,
            'projectileVelocity': 0,
            'projectileAmount': 0,
            'projectileSpread': 0,
            'rateOfFire': 0
        };
        this.modules = {
            'solarPanels': 0,
            'scienceLab': 0,
            'factory': 0,
            'crewQuarters': 0,
            'waterTreatmentPlant': 0
        }
    }
}