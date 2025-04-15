/*
 * A single shot option (without the reference).
 */
class ShotOptionComponent extends HTMLElement {
    init() {

    }

    connectedCallback() {
        this.#render();
    }

    #render() {
        createTemplate(this, `
        `);
    }
}

/*
 * A group of shot option components that share a reference.
 */
class ShotOptionGroupComponent extends HTMLElement {
    #offsetOrOffsets;
    #shotOptions;
    
    init(offsetOrOffsets, shotOptions) {
        this.#offsetOrOffsets = offsetOrOffsets;
        this.#shotOptions = shotOptions;
    }

    connectedCallback() {
        this.#render();
    }

    #render() {
        createTemplate(this, `
            <div class="container">
                <div class="pixel-reference"></div>
                <div class="shot-options"></div>
            </div>
        `);

        const distance = this.#shotOptions[0]?.target.distance;

        const pixelReferenceContainer = this.shadowRoot.querySelector('.pixel-reference');
        const pixelReferenceComponent = document.createElement('pixel-reference');
        pixelReferenceComponent.init(this.#offsetOrOffsets, distance);
        pixelReferenceContainer.appendChild(pixelReferenceComponent);

        const shotOptionsContainer = this.shadowRoot.querySelector('.shot-options');
        // using 'setup' components directly instead for simplicity
        const shotOptionComponents = this.#shotOptions.map(shotOption => {
            const component = document.createElement('setup-')
            component.init(null, shotOption.setup);
            return component;
        });

        shotOptionComponents.forEach(component => shotOptionsContainer.appendChild(component));
    }
}

/*
 * A group of one or more shot-option-group(s).
 */
class ShotOptionGroupsComponent extends HTMLElement {

    #shotOptionGroups = [];

    init(shotBrowserController) {
        shotBrowserController.onTargetChanged(target => {
            this.#onTargetChanged(target);
        });

        this.#onTargetChanged(shotBrowserController.getTarget());
    }

    connectedCallback() {
        this.#render();
    }

    #render() {
        createTemplate(this, `
            <style>
            .container {
            }
            </style>
            <div class="container">
            </div>
        `);

        const container = this.shadowRoot.querySelector(".container");
        for (const [offset, shotOptions] of Object.entries(this.#shotOptionGroups)) {
            container.appendChild(document.createElement('br'));
            container.appendChild(document.createElement('hr'));
            container.appendChild(document.createElement('br'));

            const shotOptionGroupComponent = document.createElement('shot-option-group');
            shotOptionGroupComponent.init(offset, shotOptions);
            container.appendChild(shotOptionGroupComponent);
        }
    }

    #onTargetChanged(target) {
        // find all shot data that matches the target & filters
        const matchingShotOptions = SHOT_OPTIONS_BY_DISTANCE.filter(shotOption =>
            shotOption.target.equals(target)
        );

        // group them by shared reference
        const shotOptionsGrouped = Object.groupBy(matchingShotOptions, shotOption => {
            if (shotOption.setup.reference instanceof FlagReference) {
                return shotOption.setup.reference.mvflag;
            } else {
                return shotOption.setup.reference.offsets.join(",");
            }
        });

        this.#shotOptionGroups = shotOptionsGrouped;

        this.#render();
    }
}

customElements.define('shot-option', ShotOptionComponent);
customElements.define('shot-option-group', ShotOptionGroupComponent);
customElements.define('shot-option-groups', ShotOptionGroupsComponent);