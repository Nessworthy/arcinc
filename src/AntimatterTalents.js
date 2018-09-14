class AntimatterTalents {
    constructor() {
        this.talents = {
            "waveCompressionStrength": {
                "title": "Wave Compression Strength",
                "cost": 1,
                "growthFactor": 10,
                "description": "While your current wave is lower than [Wave Compression Threshold], the next wave will consist of [Wave Compression Strength] waves merged into a single stronger wave.",
                "effectTemplate": "{EFFECT} waves"
            },
            "waveCompressionThreshold": {
                "title": "Wave Compression Threshold",
                "cost": 1,
                "growthFactor": 10,
                "description": "While your current wave is lower than [Wave Compression Threshold], the next wave will consist of [Wave Compression Strength] waves merged into a single stronger wave.",
                "effectTemplate": "{EFFECT} waves"
            }
        };
    }

    calculate() {
        this.waveCompressionStrength = 1 + arcInc.savegame.talents.waveCompressionStrength;
        this.waveCompressionThreshold = Math.min(arcInc.savegame.highestWaveEver-200, 375 + 135 * arcInc.savegame.talents.waveCompressionThreshold);
    }
}