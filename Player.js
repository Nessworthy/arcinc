class Player extends PIXI.Sprite {
    constructor(texture, arcInc, spawner, boundaryWidth, boundaryHeight) {
        super(texture);

        this.arcInc = arcInc;
        this.spawner = spawner;
        this.boundaryWidth = boundaryWidth;
        this.boundaryHeight = boundaryHeight;
        this.destination = null;

        this.credits = 0;

        this.upgrades = {
            'movementSpeed': {
                'title': 'Movement Speed',
                'baseValue': 5,
                'effect': 0.05,
                'cost': 10,
            },
            'shieldRechargeTime': {
                'title': 'Shield Recharge',
                'baseValue': 600,
                'effect': 0.05,
                'cost': 25,
            },
            'maxShield': {
                'title': 'Shield Amount',
                'baseValue': 150,
                'effect': 0.05,
                'cost': 25,
            },
            'maxArmor': {
                'title': 'Armor Amount',
                'baseValue': 100,
                'effect': 0.05,
                'cost': 25,
            },
            'maxStructure': {
                'title': 'Structure Amount',
                'baseValue': 50,
                'effect': 0.05,
                'cost': 25,
            },
            'rateOfFire': {
                'title': 'Rate of Fire',
                'baseValue': 1,
                'effect': 0.025,
                'cost': 50,
            },
            'projectileDamage': {
                'title': 'Projectile Damage',
                'baseValue': 10,
                'effect': 0.05,
                'cost': 50,
            },
            'projectileSpread': {
                'title': 'Projectile Spread',
                'baseValue': 1,
                'effect': 0.005,
                'cost': 5000,
            },
            'projectileAmount': {
                'title': 'Projectile Amount',
                'baseValue': 1,
                'effect': 1,
                'cost': 5000,
            },
            'criticalHitChance': {
                'title': 'Critical Hit Chance',
                'baseValue': 1,
                'effect': 0.25,
                'cost': 10000,
            },
            'criticalHitDamage': {
                'title': 'Critical Hit Damage',
                'baseValue': 1,
                'effect': 0.1,
                'cost': 10000,
            },
            'projectilePierceChance': {
                'title': 'Projectile Pierce Chance',
                'baseValue': 1,
                'effect': 0.25,
                'cost': 25000,
            },
        };

        this.applyUpgrades();
        this.currentShield = this.maxShield;
        this.currentArmor = this.maxArmor;
        this.currentStructure = this.maxStructure;
    }

    applyUpgrades() {
        this.movementSpeed = this.upgrades['movementSpeed'].baseValue * (1 + this.upgrades['movementSpeed'].effect * this.arcInc.savegame.upgrades['movementSpeed']);
        this.maxShield = this.upgrades['maxShield'].baseValue * (1 + this.upgrades['maxShield'].effect * this.arcInc.savegame.upgrades['maxShield']);
        this.shieldRechargeTime = this.upgrades['shieldRechargeTime'].baseValue / (1 + this.upgrades['shieldRechargeTime'].effect * this.arcInc.savegame.upgrades['shieldRechargeTime']);
        this.maxArmor = this.upgrades['maxArmor'].baseValue * (1 + this.upgrades['maxArmor'].effect * this.arcInc.savegame.upgrades['maxArmor']);
        this.maxStructure = this.upgrades['maxStructure'].baseValue * (1 + this.upgrades['maxStructure'].effect * this.arcInc.savegame.upgrades['maxStructure']);
        this.projectileDamage = this.upgrades['projectileDamage'].baseValue * (1 + this.upgrades['projectileDamage'].effect * this.arcInc.savegame.upgrades['projectileDamage']);
        this.projectileSpread = this.upgrades['projectileSpread'].baseValue * (1 + this.upgrades['projectileSpread'].effect * this.arcInc.savegame.upgrades['projectileSpread']);
        this.projectileAmount = this.upgrades['projectileAmount'].baseValue * (1 + this.upgrades['projectileAmount'].effect * this.arcInc.savegame.upgrades['projectileAmount']);
        this.criticalHitChance = this.upgrades['criticalHitChance'].baseValue * (1 + this.upgrades['criticalHitChance'].effect * this.arcInc.savegame.upgrades['criticalHitChance']);
        this.criticalHitDamage = this.upgrades['criticalHitDamage'].baseValue * (1 + this.upgrades['criticalHitDamage'].effect * this.arcInc.savegame.upgrades['criticalHitDamage']);
        this.projectilePierceChance = this.upgrades['projectilePierceChance'].baseValue * (1 + this.upgrades['projectilePierceChance'].effect * this.arcInc.savegame.upgrades['projectilePierceChance']);


        this.rateOfFire = this.upgrades['rateOfFire'].baseValue * (1 + this.upgrades['rateOfFire'].effect * this.arcInc.savegame.upgrades['rateOfFire']);
        this.fireDelay = 60 / this.rateOfFire;
        this.currentDelay = 0;
    }

    update() {
        this.move();
        this.regenerate();
        this.engage();
    }

    move() {
        if (this.destination !== null) {
            let pX = this.x + this.width / 2;
            let pY = this.y + this.height / 2;

            // To prevent costly calculations in case the player is already very close to the cursor, start with a check
            if (Math.abs(pX - this.destination.x / arcInc.pixiApp.stage.scale.x) < this.movementSpeed && Math.abs(pY - this.destination.y / arcInc.pixiApp.stage.scale.y) < this.movementSpeed) {
                this.position.set(this.destination.x / arcInc.pixiApp.stage.scale.x - this.width / 2, this.destination.y / arcInc.pixiApp.stage.scale.y - this.height / 2);
                this.destination = null;
            } else {

                let distanceX = this.destination.x / arcInc.pixiApp.stage.scale.x - pX;
                let distanceY = this.destination.y / arcInc.pixiApp.stage.scale.y - pY;

                // calculate the velocity vector length
                let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                // normalize velocity vector length
                this.vx = distanceX / distance;
                this.vy = distanceY / distance;

                // apply movement speed
                this.vx = this.vx * this.movementSpeed;
                this.vy = this.vy * this.movementSpeed;

                this.position.set(this.x + this.vx, this.y + this.vy);
            }

            // Enforce boundaries
            if (this.x + this.width > this.boundaryWidth) {
                this.x = this.boundaryWidth - this.width;
            }

            if (this.y + this.height > this.boundaryHeight) {
                this.y = this.boundaryHeight - this.height;
            }

            if (this.x < 0) {
                this.x = 0;
            }

            if (this.y < 0) {
                this.y = 0;
            }
        }
    }

    regenerate() {
        this.currentShield += this.maxShield / (this.shieldRechargeTime * 60);
        if (this.currentShield > this.maxShield) {
            this.currentShield = this.maxShield;
        }
    }

    engage() {
        this.currentDelay += 1;

        if (this.currentDelay >= this.fireDelay) {
            this.currentDelay -= this.fireDelay;
            for (let i = 1; i <= this.projectileAmount; i++){
                let radius = this.width/2;
                let angle =  Math.PI/(this.projectileAmount+1) * i + Math.PI;
                let x = Math.cos(angle) * radius + this.x + this.width/2;
                let y = Math.sin(angle) * radius + this.y + this.height/2;

                let vx = 0;
                if (this.projectileAmount > 1) {
                    vx = this.projectileSpread / (this.projectileAmount - 1) * (i-1) - this.projectileSpread/2;
                }
                let vy = -5;

                let projectileDamage = this.projectileDamage;
                let criticalHit = (Math.random() * 100 > this.criticalHitChance);
                if (criticalHit) {
                    projectileDamage *= this.criticalHitDamage;
                }
                this.spawner.spawnPlayerProjectile(x, y, vx, vy, projectileDamage);
            }
        }
    }

    hit(projectile) {
        // first hit shield, then armor, then structure
        let damage = projectile.damage;

        if (this.currentShield >= damage) {
            this.currentShield -= damage;
            return;
        } else {
            damage -= this.currentShield;
            this.currentShield = 0;
        }

        if (this.currentArmor >= damage) {
            this.currentArmor -= damage;
            return;
        } else {
            damage -= this.currentArmor;
            this.currentArmor = 0;
        }

        if (damage < this.currentStructure) {
            this.currentStructure -= damage;
        } else {
            arcInc.sceneManager.scenes['main'].reset();
            arcInc.sceneManager.loadScene('main');
        }
    }
}