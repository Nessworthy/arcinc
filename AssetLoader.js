class AssetLoader {
    static init() {
        PIXI.Loader.shared
            .add('assets/sprites/A1.png')
            .add('assets/sprites/A5.png')
            .add('assets/sprites/boss.png')
            .add('assets/sprites/HealthBar.png')
            .add('assets/sprites/DamageBar.png')
            .add('assets/sprites/EnergyBar.png')
            .add('assets/sprites/abilities/armorRepairer.png')
            .add('assets/sprites/abilities/comingSoon.png')
            .add('assets/sprites/abilities/tacticalNuke.png')
            .add('assets/sprites/Bullet.png')
            .add('assets/sprites/Bullet2.png')
            .add('assets/sprites/Bullet3.png')
            .add('assets/sprites/TacticalNuke.png')
            .add('assets/sprites/particle.png')
            .add('assets/textures/bg-far.png')
            .add('assets/textures/bg-mid.png')
            .add('assets/textures/bg-mid-near.png')
            .add('assets/textures/bg-near.png')
            .add('assets/textures/bg-very-near.png')

            .load(AssetLoader.onAssetsLoaded);
    }

    static onAssetsLoaded(){
        window.arcInc = new ArcInc();
        arcInc.init();
    }
}

AssetLoader.init();