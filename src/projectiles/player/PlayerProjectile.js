class PlayerProjectile extends PIXI.Sprite {
    constructor(texture, x, y, vx, vy, damage, original) {
        super(texture);
        this.init(x, y, vx, vy, damage, original);

        this.id = 'PlayerProjectile-' + Utils.getUUID();
        this.markedForDestruction = false;

        // Register event listener
        arcInc.eventEmitter.subscribe(Events.MOVEMENT_PHASE_STARTED,this.id, this.move.bind(this));
        arcInc.eventEmitter.subscribe(Events.CLEANUP_PHASE_STARTED,this.id, this.cleanup.bind(this));
    }

    destructor() {
        arcInc.eventEmitter.unsubscribe(Events.MOVEMENT_PHASE_STARTED, this.id);
        arcInc.eventEmitter.unsubscribe(Events.CLEANUP_PHASE_STARTED,this.id);

        let playerProjectileContainer = arcInc.objectStore.get('playerProjectileContainer');
        playerProjectileContainer.removeChild(this);
        this.destroy();
    }

    init(x, y, vx, vy, damage, original) {
        let playerProjectileContainer = arcInc.objectStore.get('playerProjectileContainer');
        this.scale.set(0.55);
        this.damage = 5;
        this.ignore = [];

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;

        this.anchor.set(0.5, 0.5);
        this.rotation = Math.atan2(vy, vx) + Math.PI/2;

        this.damage = damage;
        this.original = original;
        this.ignore = [];

        playerProjectileContainer.addChild(this);
    }

    move(frameDelta) {
        this.x += this.vx * frameDelta;
        this.y += this.vy * frameDelta;

        console.log(this.id + ' ' + this.x + ' ' + this.y);

        if (Utils.leftBounds(this)) {
            this.markedForDestruction = true;
        }
    }

    cleanup(frameDelta) {
        if (this.markedForDestruction) {
            this.destructor();
        }
    }
}