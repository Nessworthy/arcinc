class Player extends PIXI.Sprite {
    constructor(texture, boundaryWidth, boundaryHeight) {
        super(texture);

        this.upgrades = {
            'burnChance': {
                'title': 'Burn Chance',
                'cost': 1e6,
                'description': 'Chance that the enemy catches fire upon impact, dealing 1% of [Projectile Damage] each tick. Stacks additive',
                'effectTemplate': '{EFFECT}% chance',
                'cap': 400,
                'requirements': [{'type': 'upgrades', 'name': 'clusterAmmunition', 'level': 1}]
            },
            'freezeChance': {
                'title': 'Freeze Chance',
                'cost': 1e6,
                'description': 'Chance that the enemy is frozen, which reduces his movement speed by 2% per hit. Stacks multiplicative',
                'effectTemplate': '{EFFECT}% chance',
                'cap': 400,
                'requirements': [{'type': 'upgrades', 'name': 'clusterAmmunition', 'level': 1}]
            },
            // Offense (Hit damage)
            'projectileDamage': {
                'title': 'Projectile Damage',
                'cost': 5e7,
                'description': 'Increases the projectile damage',
                'effectTemplate': '{EFFECT}x multiplier',
                'requirements': [{'type': 'modules', 'name': 'factory', 'level': 1}]
            },
            'criticalHitChance': {
                'title': 'Critical Hit Chance',
                'cost': 5e7,
                'description': 'Chance to perform a critical hit',
                'effectTemplate': '{EFFECT}% chance',
                'cap': 400,
                'requirements': [{'type': 'upgrades', 'name': 'clusterAmmunition', 'level': 1}]
            },
            'criticalHitDamage': {
                'title': 'Critical Hit Damage',
                'cost': 5e9,
                'description': 'Increases the damage dealt when performing a critical hit',
                'effectTemplate': '{EFFECT}x multiplier',
                'requirements': [{'type': 'upgrades', 'name': 'criticalHitChance', 'level': 1}]
            },
            'clusterAmmunition': {
                'title': 'Cluster Ammunition',
                'cost': 5e12,
                'description': 'Increases the projectile damage',
                'effectTemplate': '{EFFECT}x multiplier',
                'requirements': [{'type': 'upgrades', 'name': 'projectileDamage', 'level': 1}]
            },
            'tacticalWarhead': {
                'title': 'Tactical Warhead',
                'cost': 1e30,
                'description': 'Increases the projectile damage',
                'effectTemplate': '{EFFECT}x multiplier',
                'requirements': [{'type': 'upgrades', 'name': 'projectileDamage', 'level': 1}]
            },

            // Offense (Hit amount)
            'rateOfFire': {
                'title': 'Rate of Fire',
                'cost': 5e2,
                'description': 'Increases the projectile fire rate',
                'effectTemplate': '{EFFECT} shots/60ticks',
                'requirements': [{'type': 'modules', 'name': 'factory', 'level': 1}]
            },
            'projectileAmount': {
                'title': 'Projectile Amount',
                'cost': 5e4,
                'description': 'Increases the amount of projectiles to up to 5. Subsequent levels instead increase the projectile damage further',
                'effectTemplate': '{EFFECT}x multiplier',
                'requirements': [{'type': 'upgrades', 'name': 'rateOfFire', 'level': 1}]
            },
            'projectilePierceChance': {
                'title': 'Projectile Pierce Chance',
                'cost': 5e4,
                'description': 'Chance that the projectile is not consumed upon impact. Can not hit the same enemy multiple times',
                'effectTemplate': '{EFFECT}% chance',
                'cap': 400,
                'requirements': [{'type': 'upgrades', 'name': 'projectileAmount', 'level': 1}]
            },
            'projectileForkChance': {
                'title': 'Projectile Fork Chance',
                'cost': 5e5,
                'description': 'Chance that the projectile is split into 3 upon impact. Can not hit the same enemy multiple times',
                'effectTemplate': '{EFFECT}% chance',
                'cap': 400,
                'requirements': [{'type': 'upgrades', 'name': 'projectilePierceChance', 'level': 1}]
            },
            'projectileSpread': {
                'title': 'Projectile Spread',
                'cost': 5e7,
                'description': 'Increases the spread in case more than 1 projectile is fired at once',
                'effectTemplate': '{EFFECT}x multiplier',
                'requirements': [{'type': 'upgrades', 'name': 'projectileAmount', 'level': 1}]
            },

            // Defense (Shield)
            'maxShield': {
                'title': 'Shield Amount',
                'cost': 5e4,
                'description': 'Increases the Maximum Shield',
                'effectTemplate': '{EFFECT}x multiplier',
                'requirements': [{'type': 'modules', 'name': 'factory', 'level': 1}]
            },
            'shieldRechargeTime': {
                'title': 'Shield Recharge',
                'cost': 5e2,
                'description': 'Decreases the Shield Recharge Time (<i>Aka increases the shield regeneration per frame</i>)',
                'effectTemplate': '{EFFECT}x multiplier',
                'requirements': [{'type': 'upgrades', 'name': 'maxShield', 'level': 1}]
            },
            'shieldRechargeAccelerator': {
                'title': 'Shield Recharge Accelerator',
                'cost': 5e6,
                'description': 'When not being hit for 300 frames, decreases the Shield Recharge Time substantially (<i>Aka increases the shield regeneration per frame</i>)',
                'effectTemplate': '{EFFECT}x multiplier',
                'requirements': [{'type': 'upgrades', 'name': 'shieldRechargeTime', 'level': 1}]
            },
            'plasmaField': {
                'title': 'Plasma Field',
                'cost': 1e9,
                'description': 'Increases the Maximum Shield',
                'effectTemplate': '{EFFECT}x multiplier',
                'requirements': [{'type': 'upgrades', 'name': 'maxShield', 'level': 1}]
            },
            'overshieldChance': {
                'title': 'Overshield Chance',
                'cost': 1e9,
                'description': 'Chance that a hit is fully absorbed by the shield without affecting armor . ' +
                    'Requires full shield to trigger and will deplete the whole shield bar',
                'effectTemplate': '{EFFECT}% chance',
                'cap': 400,
                'requirements': [{'type': 'upgrades', 'name': 'plasmaField', 'level': 1}]
            },

            // Defense (Armor)
            'maxArmor': {
                'title': 'Armor Amount',
                'cost': 5e4,
                'description': 'Increases the Maximum Armor',
                'effectTemplate': '{EFFECT}x multiplier',
                'requirements': [{'type': 'modules', 'name': 'factory', 'level': 1}]
            },
            'armorPlating': {
                'title': 'Armor Plating',
                'cost': 5e6,
                'description': 'Reduces armor  damage taken by an absolute value',
                'effectTemplate': '{EFFECT} abs. reduction',
                'requirements': [{'type': 'upgrades', 'name': 'maxArmor', 'level': 1}]
            },
            'titaniumAlloy': {
                'title': 'Titanium Alloy',
                'cost': 1e9,
                'description': 'Increases the Maximum Armor',
                'effectTemplate': '{EFFECT}x multiplier',
                'requirements': [{'type': 'upgrades', 'name': 'maxArmor', 'level': 1}]
            },

            // Defense (General)
            'lifeSupportSystems': {
                'title': 'Life Support Systems',
                'cost': 1e30,
                'description': 'Increases the strength of both, Shield and Armor',
                'effectTemplate': '{EFFECT}x multiplier',
                'requirements': [{'type': 'modules', 'name': 'factory', 'level': 1}]
            },

            'repulsorField': {
                'title': 'Repulsor Field',
                'cost': 5e10,
                'description': 'Reduces all incoming damage by a relative amount',
                'effectTemplate': '{EFFECT}x multiplier',
                'cap': 520,
                'requirements': [{'type': 'modules', 'name': 'factory', 'level': 1}]
            },

            // Utility
            'movementSpeed': {
                'title': 'Movement Speed',
                'cost': 5e2,
                'description': 'Increases the Movement Speed',
                'effectTemplate': '{EFFECT} pixel/tick',
                'requirements': [{'type': 'modules', 'name': 'factory', 'level': 1}]
            },
            'salvager': {
                'title': 'Salvager',
                'cost': 5e10,
                'description': 'Increases the credits gained for killing enemies by salvaging the wreckage',
                'effectTemplate': '{EFFECT}x multiplier',
                'requirements': [{'type': 'upgrades', 'name': 'movementSpeed', 'level': 1}]
            }
        };

        this.id = 'Player-' + Utils.getUUID();

        this.boundaryWidth = boundaryWidth;
        this.boundaryHeight = boundaryHeight;

        this.stats = new PlayerStats();

        this.destination = null;

        this.applyUpgrades();

        this.currentDelay = 0;
        this.ticksSinceLastHit = 0;
        this.currentShield = this.stats.effectiveMaxShield;
        this.currentArmor = this.stats.effectiveMaxArmor;
        this.currentEnergy = this.stats.effectiveMaxEnergy;

        // Register event listener
        arcInc.eventEmitter.subscribe(Events.REGENERATION_PHASE_STARTED, this.id, this.regenerate.bind(this));
        arcInc.eventEmitter.subscribe(Events.MOVEMENT_PHASE_STARTED, this.id, this.move.bind(this));
        arcInc.eventEmitter.subscribe(Events.ENGAGEMENT_PHASE_STARTED, this.id, this.engage.bind(this));
    }

    applyUpgrades() {
        this.stats.calculate();
        StatsAndFormulas.update();
    }

    update(frameDelta) {
        this.ticksSinceLastHit+= frameDelta;
    }

    move(frameDelta) {
        if (this.destination !== null) {
            let pX = this.x + this.width / 2;
            let pY = this.y + this.height / 2;

            // To prevent costly calculations in case the player is already very close to the cursor, start with a check
            if (Math.abs(pX - this.destination.x / arcInc.pixiApp.stage.scale.x) < this.stats.effectiveMovementSpeed && Math.abs(pY - this.destination.y / arcInc.pixiApp.stage.scale.y) < this.stats.effectiveMovementSpeed) {
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
                this.vx = this.vx * this.stats.effectiveMovementSpeed * frameDelta;
                this.vy = this.vy * this.stats.effectiveMovementSpeed * frameDelta;

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

    regenerate(frameDelta) {
        this.currentEnergy += this.stats.effectiveEnergyRegenerationPerTick * frameDelta;
        if (this.currentEnergy > this.stats.effectiveMaxEnergy) {
            this.currentEnergy = this.stats.effectiveMaxEnergy;
        }

        if (this.ticksSinceLastHit > 300) {
            this.currentShield += this.stats.effectiveShieldRechargePerTickOutOfCombat * frameDelta;
        } else {
            this.currentShield += this.stats.effectiveShieldRechargePerTickInCombat * frameDelta;
        }

        // clamp current shield
        this.currentShield = Math.min(this.stats.effectiveMaxShield, this.currentShield);
    }

    engage(frameDelta) {
        this.currentDelay += frameDelta;

        if (this.currentDelay >= this.stats.effectiveFireDelayInTicks) {
            this.currentDelay -= this.stats.effectiveFireDelayInTicks;

            for (let i = 1; i <= this.stats.effectiveProjectileAmount; i++){
                let radius = this.width/2;
                let angle =  Math.PI/(this.stats.effectiveProjectileAmount+1) * i + Math.PI;
                let x = Math.cos(angle) * radius + this.x + this.width/2;
                let y = Math.sin(angle) * radius + this.y + this.height/2;

                let vx = 0;
                if (this.stats.effectiveProjectileAmount > 1) {
                    vx = this.stats.effectiveProjectileSpread / (this.stats.effectiveProjectileAmount - 1) * (i-1) - this.stats.effectiveProjectileSpread/2;
                }
                let vy = -5;

                let projectileDamage = this.stats.effectiveProjectileDamage;
                arcInc.spawner.spawnPlayerProjectile(x, y, vx, vy, projectileDamage, true);
            }
        }
    }

    hitBy(collider) {
        // Reset out of combat timer
        this.ticksSinceLastHit = 0;

        // Take the unmodified projectile damage
        let damage = collider.damage;

        // free projectile again
        collider.markedForDestruction = true;

        // Apply relative multiplier
        damage *=  this.stats.effectiveRelativeIncomingDamageMultiplier;

        // first hit shield
        damage += this.stats.effectiveAbsoluteIncomingShieldDamageAddition;
        if (this.currentShield >= damage) {
            this.currentShield -= damage;
            return;
        } else {
            // check for overshield
            if (this.currentShield === this.stats.effectiveMaxShield) {
                if (this.stats.chanceHappened('overshieldChance')) {
                    this.currentShield = 0;
                    return;
                }
            }
            damage -= this.currentShield;
            this.currentShield = 0;
        }

        // lastly hit armor
        damage += this.stats.effectiveAbsoluteIncomingArmorDamageAddition;
        if (damage <= 0) {
            return;
        }

        if (this.currentArmor >= damage) {
            this.currentArmor -= damage;
        } else {
            arcInc.sceneManager.scenes['main'].reset();
            arcInc.sceneManager.loadScene('main');
        }
    }
}