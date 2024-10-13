class SetupsComponent extends HTMLElement {

    #navigationController;
    #pin;
    #setup;
    #wind = newWind(0, "");
    #setups = [];

    init(navigationController) {
        // TODO: create the elements for every wind, then only
        // render one of them (to avoid flickering)

        // TODO: animate children being appended

        this.#navigationController = navigationController;

        this.#navigationController.onPinChanged(pin => {
            this.#onPinChanged(pin);
        });

        this.#navigationController.onSetupChanged(setup => {
            this.#onSetupChanged(setup);
        });

        this.#navigationController.onWindChanged(wind => {
            if (!wind.logicallyEquals(this.#wind)) {
                this.#onWindChanged(wind);
            }
        });
    }

    connectedCallback() {
        this.#render();
    }

    #render() {
        const setups = this.#setups.filter(setup => {
            return setup.wind.logicallyEquals(this.#wind);
        });

        // TODO: support multiple references in a list of setups
        // (as is already possible by the model)

        const referenceImage = setups[0]?.reference?.image || "";
        const subpixel = setups[0]?.subpixel;
        const subpixelText = (() => {
            if (subpixel === LEFTMOST_SUBPIXEL) {
                return " (leftmost)";
            } else if (subpixel === RIGHTMOST_SUBPIXEL) {
                return " (rightmost)";
            }
            return "";
        })();
        const referenceText = referenceImage.substring(0, referenceImage.length - 4) + subpixelText;

        createTemplate(this, `
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    padding-top: 10px;
                    padding-bottom: 40px;
                    ${setups.length === 0 ? "display: none;" : ""}
                }
                .reference {
                    width: 600px;
                    border-radius: 4px;
                    border: 1px solid black;
                }
                .details {
                    user-select: none;
                    padding-top: 10px;
                    padding-bottom: 20px;
                }
                .summary {
                    cursor: pointer;
                    width: fit-content;
                    padding-right: 100px;
                    font-size: 20px;
                    padding-bottom: 5px;
                }
                .summary-hidden {
                    cursor: default;
                    list-style: none;
                    padding-left: 21px;
                }
                .reference-container {
                    border-radius: 6px;
                    background-color: #efefef;
                }
                .hidden {
                    display: none;
                }
            </style>
            <div class="container">
                <details open class="details">
                    <summary class="summary summary-hidden">Reference: <b>${referenceText}</b></summary>
                    <div class="reference-container">
                    </div>
                </details>
            </div>
        `);

        const container = this.shadowRoot.querySelector('.container');

        const referenceContainer = this.shadowRoot.querySelector('.reference-container');


        if (setups.length > 0) {
            const referenceRoot = "/assets/references";

            const referenceImage = setups[0].reference.image;

            const referenceImageComponent = document.createElement("img");
            referenceImageComponent.setAttribute("src", `${referenceRoot}/${referenceImage}`);
            referenceImageComponent.setAttribute("class", "reference hidden");
            referenceImageComponent.setAttribute("draggable", "false");
            referenceImageComponent.addEventListener("load", () => {
                referenceImageComponent.setAttribute('class', 'reference');
                this.shadowRoot.querySelector(".summary").setAttribute('class', 'summary');
            });
            referenceContainer.appendChild(referenceImageComponent);
        } else {
            const noSetupsComponent = document.createElement('h2');
            noSetupsComponent.innerHTML = "(Just wing it)";
            container.appendChild(noSetupsComponent);
        }

        for (let i = 0; i < setups.length; i++) {
            const setup = setups[i];

            let halfBlackedOut = false;

            if (i > 0) {
                const previousSetup = setups[i-1];

                const thisClub = setup.club;
                const thisPower = setup.power;

                const previousClub = previousSetup.club;
                const previousPower = previousSetup.power;

                if (
                    (thisClub !== previousClub)
                ) {
                    container.appendChild( document.createElement('br'));
                    container.appendChild( document.createElement('br'));
                    halfBlackedOut = false;
                } else {
                    halfBlackedOut = true;
                }
            }

            const setupComponent = document.createElement('setup-');
            setupComponent.init(this.#navigationController, setup);
            setupComponent.setHalfBlackedOut(halfBlackedOut);
            container.appendChild(setupComponent);    
        }
    }

    #onPinChanged(pin) {
        this.#pin = pin;
        this.#setups = this.#pin?.setups || [];
        this.#render();
    }

    #onSetupChanged(setup) {
        if (setup !== undefined) {
            this.#setup = setup;
            this.#setups = this.#setup?.children;
            this.#render();
        }
    }

    #onWindChanged(wind) {
        this.#wind = wind;
        this.#render();
    }
}

customElements.define('setups-', SetupsComponent);