class Refiner {
    static prepare(parent) {
        let categoryCardBody = CategoryCard.prepare(parent, 'antimatterRefiner', 'Antimatter Refiner');

        let progressContainer = document.createElement("div");
        categoryCardBody.appendChild(progressContainer);

        let progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar", "progress-bar-striped", "progress-bar-animated", "bg-success");
        progressBar.setAttribute("role", "progressbar");
        progressBar.id = "refiner-progress";
        progressBar.progress = 0;
        progressBar.style.width = "100%";
        progressBar.style.height = "20px";
        progressBar.setAttribute("aria-valuemin", "0");
        progressBar.setAttribute("aria-valuemax", "100");
        progressBar.style.transition = "width 1s ease";
        progressContainer.appendChild(progressBar);

        let explanation = document.createElement('p');
        explanation.innerHTML = 'The <b>Antimatter Refiner</b> is capable of increasing the purity of Antimatter further.<br/>' +
            '<br/>' +
            'Fill it\'s buffer with Antimatter, and once the next cycle is finished, you will be rewarded with <b>Refined Antimatter</b>.<br/>' +
            '<b>Refined Antimatter</b> is similar to <b>Antimatter</b>, with the exception that it is now refined for a single purpose.<br/>' +
            '<br>' +
            'You can decide upon it\'s focus, but once the refinement process is done, it is irreversible.<br/>';
        categoryCardBody.appendChild(explanation);

        let topOuterDiv = document.createElement('div');
        topOuterDiv.classList.add('d-flex', 'justify-content-between');
        categoryCardBody.appendChild(topOuterDiv);

        // buffer
        let buffer = document.createElement('p');
        buffer.id = 'refiner-buffer';
        buffer.textContent = 'Buffer: ' + Utils.format(arcInc.savegame.refiner.bufferVolume) +
            ' / ' + Utils.format(arcInc.antimatterTalents.refinerBufferVolume) +
            ' (' + Math.round(100 * arcInc.savegame.refiner.bufferVolume / arcInc.antimatterTalents.refinerBufferVolume)  + '%)';
        topOuterDiv.appendChild(buffer);
        let updateBuffer = function() {
            buffer.textContent = 'Buffer: ' + Utils.format(arcInc.savegame.refiner.bufferVolume) +
            ' / ' + Utils.format(arcInc.antimatterTalents.refinerBufferVolume) +
            ' (' + Math.round(100 * arcInc.savegame.refiner.bufferVolume / arcInc.antimatterTalents.refinerBufferVolume)  + '%)';
        };
        arcInc.eventEmitter.subscribe(Events.ANTIMATTER_TALENT_PURCHASED, '#refiner-buffer', updateBuffer);
        arcInc.eventEmitter.subscribe(Events.ANTIMATTER_REFINER_UPDATED, '#refiner-buffer', updateBuffer);

        // purity
        let purity = document.createElement('p');
        purity.id = 'refiner-purity';
        purity.textContent = 'Purity: 1 : ' + Utils.format(arcInc.antimatterTalents.refinerPurity);
        topOuterDiv.appendChild(purity);
        arcInc.eventEmitter.subscribe(Events.ANTIMATTER_TALENT_PURCHASED, '#refiner-purity', function() {
            purity.textContent = 'Purity: 1 : ' + Utils.format(arcInc.antimatterTalents.refinerPurity);
        } );


        let middleOuterDiv = document.createElement('div');
        middleOuterDiv.classList.add('d-flex', 'justify-content-between');
        categoryCardBody.appendChild(middleOuterDiv);

        let cycleVolume = document.createElement('p');
        cycleVolume.id = 'refiner-cycle-volume';
        cycleVolume.textContent = 'Cycle-Volume: ' + Utils.format(arcInc.antimatterTalents.refinerCycleVolume);
        middleOuterDiv.appendChild(cycleVolume);
        arcInc.eventEmitter.subscribe(Events.ANTIMATTER_TALENT_PURCHASED, '#refiner-cycle-volume', function() {
            cycleVolume.textContent = 'Cycle-Volume: ' + Utils.format(arcInc.antimatterTalents.refinerCycleVolume);
        } );

        let cycleTime = document.createElement('p');
        cycleTime.id = "refiner-cycle-time";
        cycleTime.textContent = 'Cycle-Time: ' + arcInc.antimatterTalents.refinerCycleTime.toFixed(1) + ' sec';
        middleOuterDiv.appendChild(cycleTime);
        arcInc.eventEmitter.subscribe(Events.ANTIMATTER_TALENT_PURCHASED, '#refiner-cycle-time', function() {
            cycleTime.textContent = 'Cycle-Time: ' + arcInc.antimatterTalents.refinerCycleTime.toFixed(1) + ' sec';
        } );

        let bottomOuterDiv = document.createElement('div');
        bottomOuterDiv.classList.add('d-flex', 'justify-content-between');
        categoryCardBody.appendChild(bottomOuterDiv);

        let defensiveRefinedAntimatter = document.createElement('p');
        defensiveRefinedAntimatter.id = "refiner-defensive-refined-antimatter";
        defensiveRefinedAntimatter.textContent = 'Defensive Ref. AM: ' + Utils.format(arcInc.savegame.refiner.defensiveRefinedAntimatter);
        bottomOuterDiv.appendChild(defensiveRefinedAntimatter);
        arcInc.eventEmitter.subscribe(Events.ANTIMATTER_REFINER_UPDATED, '#refiner-defensive-refined-antimatter', function() {
            defensiveRefinedAntimatter.textContent = 'Defensive Ref. AM: ' + Utils.format(arcInc.savegame.refiner.defensiveRefinedAntimatter);
        } );

        let offensiveRefinedAntimatter = document.createElement('p');
        offensiveRefinedAntimatter.id = "refiner-offensive-refined-antimatter";
        offensiveRefinedAntimatter.textContent = 'Offensive Ref. AM: ' + Utils.format(arcInc.savegame.refiner.offensiveRefinedAntimatter);
        bottomOuterDiv.appendChild(offensiveRefinedAntimatter);
        arcInc.eventEmitter.subscribe(Events.ANTIMATTER_REFINER_UPDATED, '#refiner-offensive-refined-antimatter', function() {
            offensiveRefinedAntimatter.textContent = 'Offensive Ref. AM: ' + Utils.format(arcInc.savegame.refiner.offensiveRefinedAntimatter);
        } );


        let sliderBar = document.createElement("div");
        sliderBar.classList.add("d-flex", "justify-content-center", "my-4");
        categoryCardBody.appendChild(sliderBar);

        let left = document.createElement("span");
        left.classList.add("font-weight-bold", "purple-text", "mr-2");
        left.textContent = "Def.";
        sliderBar.appendChild(left);

        let form = document.createElement("form");
        form.classList.add("range-field", "w-75");
        sliderBar.appendChild(form);

        let input = document.createElement("input");
        input.id = "refiner-distribution";
        input.classList.add("custom-range");
        input.type = "range";
        input.min = "0";
        input.max = "100";
        input.value = "50";
        form.appendChild(input);

        let right = document.createElement("span");
        right.classList.add("font-weight-bold", "purple-text", "ml-2");
        right.textContent = "Off.";
        sliderBar.appendChild(right);


        let fill = function(amount) {
            let maxAmount = arcInc.antimatterTalents.refinerBufferVolume - arcInc.savegame.refiner.bufferVolume;
            let actualAmount = Math.min(maxAmount, Math.round(arcInc.antimatterTalents.refinerBufferVolume * amount));

            actualAmount = Math.min(actualAmount, arcInc.savegame.activeAntimatter);

            arcInc.savegame.activeAntimatter -= actualAmount;
            arcInc.savegame.refiner.bufferVolume += actualAmount;

            arcInc.saveSavegame();
            arcInc.antimatterTalents.calculate();
            arcInc.objectStore.get('player').applyUpgrades();

            arcInc.eventEmitter.emit(Events.ANTIMATTER_REFINER_UPDATED);
            arcInc.eventEmitter.emit(Events.ANTIMATTER_UPDATED, arcInc.savegame.activeAntimatter);
        };

        let fillOne = function() {fill(0.01);};
        let fillTen = function() {fill(0.1);};
        let fillHundred = function() {fill(1);};

        let bottommostOuterDiv = document.createElement('div');
        bottommostOuterDiv.classList.add('d-flex', 'justify-content-between');
        categoryCardBody.appendChild(bottommostOuterDiv);

        let onePercentButton = document.createElement('button');
        onePercentButton.classList.add('btn', 'btn-danger');
        onePercentButton.innerText = 'Load 1% of Buffer';
        bottommostOuterDiv.appendChild(onePercentButton);
        onePercentButton.addEventListener("click", fillOne);

        let tenPercentButton = document.createElement('button');
        tenPercentButton.classList.add('btn', 'btn-danger');
        tenPercentButton.innerText = 'Load 10% of Buffer';
        bottommostOuterDiv.appendChild(tenPercentButton);
        tenPercentButton.addEventListener("click", fillTen);

        let hundredPercentButton = document.createElement('button');
        hundredPercentButton.classList.add('btn', 'btn-danger');
        hundredPercentButton.innerText = 'Load 100% of Buffer';
        bottommostOuterDiv.appendChild(hundredPercentButton);
        hundredPercentButton.addEventListener("click", fillHundred);

        let cycle = function() {
            arcInc.refinerDelay -= 1;

            let progress = 100 - (100 * arcInc.refinerDelay / arcInc.antimatterTalents.refinerCycleTime);
            let progressBar = document.querySelector("#refiner-progress");
            progressBar.setAttribute("aria-valuenow", progress);
            progressBar.style.width = progress + "%";

            if (arcInc.refinerDelay <= 0) {
                arcInc.refinerDelay += arcInc.antimatterTalents.refinerCycleTime;

                let defensive = document.querySelector("#refiner-distribution").value;
                let offensive = 100 - defensive;

                let volume = Math.min(arcInc.savegame.refiner.bufferVolume, arcInc.antimatterTalents.refinerCycleVolume);
                arcInc.savegame.refiner.bufferVolume -= volume;
                arcInc.savegame.refiner.defensiveRefinedAntimatter += volume /100 * defensive * arcInc.antimatterTalents.refinerPurity;
                arcInc.savegame.refiner.offensiveRefinedAntimatter += volume /100 * offensive * arcInc.antimatterTalents.refinerPurity;

                arcInc.saveSavegame();
                arcInc.antimatterTalents.calculate();
                arcInc.objectStore.get('player').applyUpgrades();

                arcInc.eventEmitter.emit(Events.ANTIMATTER_REFINER_UPDATED);
                arcInc.eventEmitter.emit(Events.ANTIMATTER_UPDATED, arcInc.savegame.activeAntimatter);
            }
        };

        window.setInterval(cycle, 1000);
    }
}