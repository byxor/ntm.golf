class ShotSelectComponent extends HTMLElement {

    #shotBrowserController;
    
    #target;

    init(shotBrowserController) {
        this.#shotBrowserController = shotBrowserController;
        this.#shotBrowserController.onTargetChanged(target => {
            this.#target = target;
        });
        this.#target = shotBrowserController.getTarget();
    }

    connectedCallback() {
        this.#render();
    }

    #render() {
        createTemplate(this, `
            <style>
              .container {
                position: absolute;
              }
              .distance-select {
                text-align: center;
                width: 68px;
              }
              .yardage {
                font-size: 10px;
                color: grey;
              }
              .wind-select {
                float: left;
              }
              .surface-select {
              }
              .white-arrow-reference {
                filter: drop-shadow(0px 5px 5px #111111);
                width: 120px;
              }
              .surface-arrow-wrapper {
                display: flex;
                align-items: flex-end;
                gap: 10px;
                margin-top: -82px;
                padding-left: 25px;
              }
            </style>
            <div id="container">
                <div class="filters">
                    <h2>Shot options</h1>
                    <input class="distance-select" type="number" value="${this.#target.distance}" onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 13"></input><span class="yardage"> YARDS</span>
                    <input class="reset-distance" type="button" value="⟳"></input>
                    <br/><br/>
                    <div class="wind-select"></div>
                    <div class="surface-arrow-wrapper">
                        <div class="surface-select"></div>
                        <img class="white-arrow-reference" src="/assets/white-arrow/diagonal-wind-approximation.png"></img>
                    </div>
                </div>
            </div>
        `);

        const windSelectContainer = this.shadowRoot.querySelector(".wind-select");
        const windSelectComponent = document.createElement("wind-select");
        windSelectComponent.init(null, wind => {}, wind => this.#onWindChanged(wind), this.#shotBrowserController.getWind());
        windSelectContainer.appendChild(windSelectComponent);

        const distanceSelectComponent = this.shadowRoot.querySelector(".distance-select");
        distanceSelectComponent.addEventListener("change", event => {
            this.#target = this.#target.withDistance(parseInt(event.target.value));
            this.#signalTargetChanged();
        });
        distanceSelectComponent.addEventListener(`focus`, () => distanceSelectComponent.select());
        distanceSelectComponent.addEventListener("wheel", (event) => {
            event.preventDefault();

            const currentValue = parseInt(distanceSelectComponent.value, 10) || 0;
    
            let step = 1;
            if (event.shiftKey) {
                step *= 5;
            }
            if (event.ctrlKey) {
                step *= 2;
            }
            
            if (event.deltaY < 0) {
                distanceSelectComponent.value = currentValue + step;
            } else {
                distanceSelectComponent.value = Math.max(0, currentValue - step);
            }

            distanceSelectComponent.dispatchEvent(new Event("change", { bubbles: true }));
        });
        const resetDistanceButton = this.shadowRoot.querySelector('.reset-distance');
        resetDistanceButton.addEventListener('click', event => {
            let newValue = 140;
            if (this.#target.distance > 1000) {
                newValue = 9120
            } else if (this.#target.surface === ROUGH_SURFACE) {
                newValue = 18;
            }
            distanceSelectComponent.value = newValue;
            distanceSelectComponent.dispatchEvent(new Event("change", { bubbles: true }));
        });
        // TODO: need a min and max button to the left and right of it?

        const surfaceSelectContainer = this.shadowRoot.querySelector(".surface-select");
        const surfaceSelectComponent = document.createElement("surface-select")
        surfaceSelectComponent.init(this.#shotBrowserController);
        surfaceSelectContainer.appendChild(surfaceSelectComponent);
    }

    setTarget(target) {
        this.#target = target;
        this.#signalTargetChanged();
    }

    #onWindChanged(wind) {
        this.#target = this.#target.withWind(wind);
        this.#signalTargetChanged();
    }

    #signalTargetChanged() {
        this.#shotBrowserController.setTarget(this.#target);
    }
}

customElements.define('shot-select', ShotSelectComponent);