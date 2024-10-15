class ProgressComponent extends HTMLElement {

    #hole;
    #pin;

    init(navigationController) {
        navigationController.onHoleChanged(hole => this.#onHoleChanged(hole));
        navigationController.onPinChanged(pin => this.#onPinChanged(pin));
    }

    connectedCallback() {
        this.#render();
    }

    #onHoleChanged(hole) {
        this.#hole = hole;
        this.#render();
    }

    #onPinChanged(pin) {
        this.#pin = pin;
        this.#render();
    }

    #calculatePinProgress() {
        const maximumWind = (() => {
            switch (this.#hole?.number) {
            case 1:
            case 2:
                return 3;
            case 3:
                return 5;
            case 4:
                return 8;
            default:
                return 15;
            }
        })();

        const numberOfDirections = 16;

        const numberOfWindCombinationsPerStroke = (numberOfDirections * (maximumWind - 1)) + 1;

        const numberOfStrokes = (() => {
            // Guess the optimal number of strokes by choosing the highest stroke number from the setups.
            // Will be incorrect if there's a setup that takes an unnecessarily long route, but why
            // would we have one of those?
            let strokes = 0;

            const process = setup => {
                if (strokes < setup?.stroke) {
                    strokes = setup?.stroke;
                }
                setup.children.forEach(setup => process(setup));
            };
            this.#pin?.setups.forEach(setup => process(setup));

            return strokes;
        })();

        const numberOfWindCombinationsForPin = numberOfWindCombinationsPerStroke * numberOfStrokes;

        const knownSetups = new Set();
        const process = setup => {
            if (setup.children.length === 0) {
                
                let identifier = setup.wind.toString();

                let temp = setup.parent;
                while (temp !== undefined) {
                    identifier = `${temp.wind.toString()}/${identifier}`;
                    temp = temp.parent;
                }

                knownSetups.add(identifier);
            } else {
                setup.children.forEach(child => process(child));
            }
        };
        this.#pin?.setups.forEach(setup => process(setup));

        const percentageComplete = Math.round((knownSetups.size / numberOfWindCombinationsForPin) * 100);

        const pinProgressText = `Pin coverage: &nbsp;&nbsp;${knownSetups.size}/${numberOfWindCombinationsForPin}  (${percentageComplete}%)`;
        console.log(pinProgressText);
        return pinProgressText;
    }

    #render() {
        if ((this.#pin?.setups || []).length === 0) {
            createTemplate(this, ``);
            return;
        }

        const pinProgressText = this.#calculatePinProgress();

        createTemplate(this, `
            <style>
                .container {
                    width: 220px;
                    height: auto;
                }
            </style>
            <div class="container">
                <span class="hole-progress"></span><br/>
                <span class="pin-progress">${pinProgressText}</span>
            </div>
        `);
    }

}

customElements.define('progress-', ProgressComponent);