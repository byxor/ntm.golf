class HoleSelectComponent extends HTMLElement {

	#holeComponents = Array.from({ length: 18 }, () => document.createElement('hole-'));

	init(navigationController) {
		for (let i = 0; i < 18; i++) {
			const holeComponent = this.#holeComponents[i];
			holeComponent.init(navigationController, i);
		}
	}

	connectedCallback() {
		this.#render();
	}

	#render() {
		createTemplate(this, `
			<style>
				.container {
					display: flex;
					flex-wrap: wrap;
					gap: 2px;
					width: 378px;
				}
			</style>
			<div class="container"></div>
		`);

		const container = this.shadowRoot.querySelector(".container");

		this.#holeComponents.forEach(holeComponent => {
			container.appendChild(holeComponent)
		});
	}
}

customElements.define('hole-select', HoleSelectComponent);