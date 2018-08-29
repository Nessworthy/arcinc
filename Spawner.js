class Spawner {
    constructor (pixiApp, objectStore) {
        this.pixiApp = pixiApp;
        this.objectStore = objectStore;
        this.enemyColors = ["0xCB3301", "0xFF0066", "0xFF6666", "0xFEFF99", "0xFFFF67", "0xCCFF66", "0x99FE00", "0xEC8EED", "0xFF99CB", "0xFE349A", "0xCC99FE", "0x6599FF", "0x03CDFF", "0xFF0000", "0xFFFF00", "0x00FF00", "0x00FFFF", "0x0000FF", "0xFF00FF"];
    }

    prepareEnemy() {
        let enemyContainer = this.objectStore.get('enemyContainer');
        let enemy = new Enemy(PIXI.Loader.shared.resources["assets/sprites/A1.png"].texture, 10);
        enemy.baseMovementSpeed = 2;
        enemy.scale.set(0.4);

        enemyContainer.addChild(enemy);
        return enemy;
    }

    spawnEnemyWave(wave) {
        let spawnAmount = Math.ceil(0.2 * wave + 4);
        if (spawnAmount > 25) {
            spawnAmount = 25;
        }
        let amountSpawned = 0;
        for (let i = 0; i < spawnAmount; i++) {
            this.spawnRandomEnemy(wave);
            amountSpawned++;
        }

        return amountSpawned;
    }

    spawnRandomEnemy(wave) {
        let enemyContainer = this.objectStore.get('enemyContainer');

        let enemy;
        for (let i = 0; i < enemyContainer.children.length; i++) {
            if (!enemyContainer.children[i].visible) {
                enemy = enemyContainer.children[i];
                break;
            }
        }

        // if no enemy is available in the enemy container, create another
        if (enemy === undefined) {
            enemy = this.prepareEnemy();
        }

        // Randomize positioning
        enemy.x = Math.random() * (this.pixiApp.screen.width/this.pixiApp.stage.scale.x - enemy.width);
        enemy.y = Math.random() * -500 - enemy.height;
        enemy.position.set(enemy.x, enemy.y);

        // Randomize movement vector
        let vx = Math.random() - 0.5;
        let vy = 1;

        // calculate the velocity vector length
        let distance = Math.sqrt( vx*vx + vy*vy);

        vx /= distance;
        vy /= distance;

        enemy.vxBase = enemy.vx = vx * enemy.baseMovementSpeed;
        enemy.vyBase = enemy.vy = vy * enemy.baseMovementSpeed;
        enemy.rotation = Math.atan2(vy, vx) - Math.PI/2;
        // Initialize stats
        enemy.maxHealth = Math.floor(10 * Math.pow(arcInc.growth, wave));
        enemy.currentHealth = enemy.maxHealth;
        enemy.credits = Math.floor(10 * Math.pow(arcInc.growth, wave));
        enemy.damage = Math.floor(5 * Math.pow(arcInc.growth, wave));

        enemy.burnDamage = 0;

        enemy.tint = this.enemyColors[Math.floor(Math.random()*this.enemyColors.length)];
        enemy.id = Math.round(Math.random() * 1000000);

        enemy.updateHealthBar();
        enemy.wave = wave;
        enemy.visible = true;
    }

    preparePlayerProjectile() {
        let playerProjectileContainer = this.objectStore.get('playerProjectileContainer');
        let projectile = new PIXI.Sprite(PIXI.Loader.shared.resources["assets/sprites/Bullet.png"].texture);
        projectile.scale.set(0.55);
        projectile.damage = 5;
        projectile.ignore = [];

        playerProjectileContainer.addChild(projectile);

        return projectile;
    }

    spawnPlayerProjectile(x, y, vx, vy, damage) {
        let playerProjectileContainer = this.objectStore.get('playerProjectileContainer');

        let projectile;
        for (let i = 0; i < playerProjectileContainer.children.length; i++) {
            if (!playerProjectileContainer.children[i].visible) {
                projectile = playerProjectileContainer.children[i];
                break;
            }
        }

        // if no player projectile is available in the player projectile container, create another
        if (projectile === undefined) {
            projectile = this.preparePlayerProjectile();
        }

        projectile.x = x;
        projectile.y = y;
        projectile.vx = vx;
        projectile.vy = vy;

        projectile.anchor.set(0.5, 0.5);
        projectile.rotation = Math.atan2(vy, vx) + Math.PI/2;

        projectile.damage = damage;
        projectile.ignore = [];
        projectile.visible = true;

        return projectile;
    }

    prepareEnemyProjectile() {
        let enemyProjectileContainer = this.objectStore.get('enemyProjectileContainer');
        let projectile = new PIXI.Sprite(PIXI.Loader.shared.resources["assets/sprites/Bullet2.png"].texture);
        projectile.scale.set(0.7);
        enemyProjectileContainer.addChild(projectile);

        return projectile;
    }

    spawnEnemyProjectile(x, y, vx, vy, tint, damage) {
        let enemyProjectileContainer = this.objectStore.get('enemyProjectileContainer');

        let projectile;
        for (let i = 0; i < enemyProjectileContainer.children.length; i++) {
            if (!enemyProjectileContainer.children[i].visible) {
                projectile = enemyProjectileContainer.children[i];
                break;
            }
        }

        // if no enemy projectile is available in the enemy projectile container, create another
        if (projectile === undefined) {
            projectile = this.prepareEnemyProjectile();
        }

        projectile.x = x;
        projectile.y = y;
        projectile.vx = vx;
        projectile.vy = vy;

        projectile.anchor.set(0.5, 0.5);
        projectile.rotation = Math.atan2(vy, vx) - Math.PI/2;

        projectile.tint = tint;
        projectile.damage = damage;

        projectile.visible = true;
    }
}