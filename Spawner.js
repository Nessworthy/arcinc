class Spawner {
    constructor (pixiApp, objectStore) {
        this.pixiApp = pixiApp;
        this.objectStore = objectStore;
        this.enemyColors = ["0xCB3301", "0xFF0066", "0xFF6666", "0xFEFF99", "0xFFFF67", "0xCCFF66", "0x99FE00", "0xEC8EED", "0xFF99CB", "0xFE349A", "0xCC99FE", "0x6599FF", "0x03CDFF"];
    }

    prepareEnemy() {
        let enemyContainer = this.objectStore.get('enemyContainer');
        let enemy = new Enemy(PIXI.Loader.shared.resources["assets/sprites/A1.png"].texture, 10);
        enemy.scale.set(0.5);

        enemyContainer.addChild(enemy);
        return enemy;
    }

    spawnRandomEnemy() {
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

        enemy.x = Math.random() * (this.pixiApp.renderer.view.width - enemy.width);
        enemy.y = Math.random() * -1000 - enemy.height;
        enemy.vy = 3;
        enemy.vx = Math.random() * 0.6 - 0.3;
        enemy.currentHealth = 10;

        enemy.tint = this.enemyColors[Math.floor(Math.random()*this.enemyColors.length)];

        enemy.updateHealthBar();
        enemy.visible = true;
    }

    preparePlayerProjectile() {
        let playerProjectileContainer = this.objectStore.get('playerProjectileContainer');
        let projectile = new PIXI.Sprite(PIXI.Loader.shared.resources["assets/sprites/Bullet.png"].texture);
        projectile.scale.set(0.4);
        projectile.damage = 1;

        let particleContainer = this.objectStore.get('particleContainer');
        projectile.emitter = new PIXI.particles.Emitter(particleContainer, [PIXI.Texture.from('assets/sprites/particle.png')], EmitterConfigProvider.getPlayerProjectileTrail(0x23f206));
        projectile.emitter.emit = false;

        playerProjectileContainer.addChild(projectile);

        return projectile;
    }

    spawnPlayerProjectile(x, y) {
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
        projectile.vx = 0;
        projectile.vy = -5;
        projectile.visible = true;
    }

    prepareEnemyProjectile(tint) {
        let enemyProjectileContainer = this.objectStore.get('enemyProjectileContainer');
        let projectile = new PIXI.Sprite(PIXI.Loader.shared.resources["assets/sprites/Bullet2.png"].texture);
        projectile.scale.set(0.4);
        projectile.damage = 1;

        let particleContainer = this.objectStore.get('particleContainer');
        projectile.emitter = new PIXI.particles.Emitter(particleContainer, [PIXI.Texture.from('assets/sprites/particle.png')], EmitterConfigProvider.getEnemyProjectileTrail(tint));
        projectile.emitter.emit = false;

        enemyProjectileContainer.addChild(projectile);

        return projectile;
    }

    spawnEnemyProjectile(x, y, vx, vy, tint) {
        let enemyProjectileContainer = this.objectStore.get('enemyProjectileContainer');

        let projectile;
        for (let i = 0; i < enemyProjectileContainer.children.length; i++) {
            if (!enemyProjectileContainer.children[i].visible) {
                projectile = enemyProjectileContainer.children[i];

                // reinitialize the emitter to change color properly
                projectile.emitter.destroy();
                let particleContainer = this.objectStore.get('particleContainer');
                projectile.emitter = new PIXI.particles.Emitter(particleContainer, [PIXI.Texture.from('assets/sprites/particle.png')], EmitterConfigProvider.getEnemyProjectileTrail(tint));
                projectile.emitter.emit = false;
                break;
            }
        }

        // if no enemy projectile is available in the enemy projectile container, create another
        if (projectile === undefined) {
            projectile = this.prepareEnemyProjectile(tint);
        }

        projectile.x = x;
        projectile.y = y;
        projectile.vx = vx;
        projectile.vy = vy;
        projectile.tint = tint;

        projectile.visible = true;
    }
}