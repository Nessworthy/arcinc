class EnemyProjectile extends PIXI.Sprite{
    constructor(texture, x, y, vx, vy, tint, damage) {
        super(texture);
        this.container = 3;
        this.init(x, y, vx, vy, tint, damage);

        this.id = 'EnemyProjectile-' + Utils.getUUID();
        this.markedForDestruction = false;

        arcInc.eventEmitter.emit(Events.COLLIDER_CREATED, this);

        // Register event listener
        arcInc.eventEmitter.subscribe(Events.MOVEMENT_PHASE_STARTED,this.id, this.move.bind(this));
        arcInc.eventEmitter.subscribe(Events.CLEANUP_PHASE_STARTED,this.id, this.cleanup.bind(this));
    }

    destructor() {
        arcInc.eventEmitter.unsubscribe(Events.MOVEMENT_PHASE_STARTED, this.id);
        arcInc.eventEmitter.unsubscribe(Events.CLEANUP_PHASE_STARTED,this.id);

        arcInc.eventEmitter.emit(Events.COLLIDER_DESTROYED, this);

        let enemyProjectileContainer = arcInc.objectStore.get('enemyProjectileContainer');
        enemyProjectileContainer.removeChild(this);
        this.destroy();
    }

    init(x, y, vx, vy, tint, damage) {
        let enemyProjectileContainer = arcInc.objectStore.get('enemyProjectileContainer');
        this.scale.set(0.3);

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;

        this.anchor.set(0.5, 0.5);
        this.rotation = Math.atan2(vy, vx) - Math.PI/2;

        this.tint = tint;
        this.damage = damage;

        enemyProjectileContainer.addChild(this);
    }

    move(frameDelta) {
        this.x += this.vx * frameDelta;
        this.y += this.vy * frameDelta;

        if (Utils.leftBoundsStrict(this)) {
            this.markedForDestruction = true;
        }

        arcInc.eventEmitter.emit(Events.COLLIDER_MOVED, this);
    }

    cleanup(frameDelta) {
        if (this.markedForDestruction) {
            this.destructor();
        }
    }
}