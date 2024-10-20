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

    #calculateHoleProgressText() {
        if (this.#hole && this.#hole.pins.length > 0) {
            const holeCoverage = newHoleCoverage(this.#hole);
            return `Hole Coverage: &nbsp;${holeCoverage.toString()}`;
        }
        return "...";
    }

    #calculatePinProgressText() {
        if (this.#hole && this.#pin) {
            const pinCoverage = newPinCoverage(this.#hole, this.#pin);
            return `Pin Coverage: &nbsp;&nbsp;&nbsp;${pinCoverage.toString()}`;
        }
        return "...";
    }

    #render() {
        if ((this.#pin?.setups || []).length === 0) {
            createTemplate(this, ``);
            return;
        }

        const holeProgressText = this.#calculateHoleProgressText();
        const pinProgressText = this.#calculatePinProgressText();

        createTemplate(this, `
            <style>
                .container {
                    width: 240px;
                    height: auto;
                    line-height: 180%;
                }

                .hole-progress {
                    color: #8e8e8e;
                }
            </style>
            <div class="container">
            <span class="pin-progress">${pinProgressText}</span><br/>
                <span class="hole-progress">${holeProgressText}</span>
            </div>
        `);
    }

}

customElements.define('progress-', ProgressComponent);