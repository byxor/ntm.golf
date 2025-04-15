class SurfaceSelectComponent extends HTMLElement {

    #target;
    #shotBrowserController;

    init(shotBrowserController) {
        this.#shotBrowserController = shotBrowserController;

        this.#target = this.#shotBrowserController.getTarget();
        this.#shotBrowserController.onTargetChanged(target => {
            this.#target = target;
            this.#render();
        });
    }
    
    connectedCallback() {
        this.#render();
    }

    #render() {
        createTemplate(this, `
            <style>
                .container {
                    display: flex;
                    flex-direction: row;
                    gap: 2px;
                }
                .button {
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    mask-mode: luminance;
                    -webkit-mask-mode: luminance;
                    mask-image: url('/assets/meter/surfaces/mask.png');
                    -webkit-mask-image: url('/assets/meter/surfaces/mask.png');
                    mask-repeat: no-repeat;
                    mask-position: center;
                    mask-size: 100% 100%;
                    -webkit-mask-size: 100% 100%;
                    z-index: 4;
                    border-radius: 50%;
                }
                .button:hover {
                    cursor: pointer;
                }
                .selected {
                    width: 60px;
                    height: 60px;
                    border: 4px solid orangered;
                }
                .deselected {
                    width: 54px;
                    height: 54px;
                    border: 2px solid grey;
                    opacity: 0.5;
                }
                .fairway {
                    background-image: url('/assets/meter/surfaces/fairway.png');
                }
                .rough {
                    background-image: url('/assets/meter/surfaces/rough.png');
                }
                .heavy-rough {
                    background-image: url('/assets/meter/surfaces/heavy-rough.png');
                }
                .bunker-1 {
                    background-image: url('/assets/meter/surfaces/bunker-1.png');
                }
                .bunker-2 {
                    background-image: url('/assets/meter/surfaces/bunker-2.png');
                }
                .bunker-3 {
                    background-image: url('/assets/meter/surfaces/bunker-3.png');
                }
                .bunker-4 {
                    background-image: url('/assets/meter/surfaces/bunker-4.png');
                }
                .water {
                    background-image: url('/assets/meter/surfaces/water.png');
                }
            </style>
            <div class="container">
                <div class="fairway button"></div> 
                <div class="rough button"></div> 
                <div class="heavy-rough button"></div> 
                <div class="bunker-1 button"></div> 
                <div class="bunker-2 button"></div> 
                <div class="bunker-3 button"></div> 
                <div class="bunker-4 button"></div> 
                <div class="water button"></div> 
            </div>
        `);

        const fairwayButton = this.shadowRoot.querySelector('.fairway');
        const roughButton = this.shadowRoot.querySelector('.rough');
        const heavyRoughButton = this.shadowRoot.querySelector('.heavy-rough');
        const bunker1Button = this.shadowRoot.querySelector('.bunker-1');
        const bunker2Button = this.shadowRoot.querySelector('.bunker-2');
        const bunker3Button = this.shadowRoot.querySelector('.bunker-3');
        const bunker4Button = this.shadowRoot.querySelector('.bunker-4');
        const waterButton = this.shadowRoot.querySelector('.water');

        const initButton = (button, surface) => {
            button.addEventListener('click', event => {
                this.#shotBrowserController.setTarget(this.#shotBrowserController.getTarget().withSurface(surface));
            });
            button.className += this.#target.surface === surface ? " selected" : " deselected";
        };

        initButton(fairwayButton, FAIRWAY_SURFACE);
        initButton(roughButton, ROUGH_SURFACE);
        initButton(heavyRoughButton, HEAVY_ROUGH_SURFACE);
        initButton(bunker1Button, BUNKER_1_SURFACE);
        initButton(bunker2Button, BUNKER_2_SURFACE);
        initButton(bunker3Button, BUNKER_3_SURFACE);
        initButton(bunker4Button, BUNKER_4_SURFACE);
        initButton(waterButton, WATER_SURFACE);
    }

}

customElements.define('surface-select', SurfaceSelectComponent);