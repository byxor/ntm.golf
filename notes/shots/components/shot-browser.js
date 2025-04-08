class ShotBrowserComponent extends HTMLElement {

    #shotBrowserController;

    init(shotBrowserController) {
        this.#shotBrowserController = shotBrowserController;
    }

    connectedCallback() {
        this.#render();
    }

    #render() {
        createTemplate(this, `
            <style>
                .container {
                }
                .shot-select {
                }
                .shot-options {
                }
            </style>
            <div class="container">
                <div class="shot-select"></div>
                <div class="shot-option-groups"></div>
            </div>
        `);

        const shotSelectContainer = this.shadowRoot.querySelector(".shot-select");
        const shotSelectComponent = document.createElement('shot-select');
        shotSelectComponent.init(this.#shotBrowserController);
        shotSelectContainer.appendChild(shotSelectComponent);

        const shotOptionGroupsContainer = this.shadowRoot.querySelector(".shot-option-groups");
        const shotOptionGroupsComponent = document.createElement("shot-option-groups");
        shotOptionGroupsComponent.init(this.#shotBrowserController);
        shotOptionGroupsContainer.appendChild(shotOptionGroupsComponent);
    }
}

customElements.define('shot-browser', ShotBrowserComponent);