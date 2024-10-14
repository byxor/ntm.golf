// TODO: make pin component so it's easier to handle highlighting

class PinSelectComponent extends HTMLElement {

	#navigationController;
	#pins = [];
	#pin;

	init(navigationController) {
		this.#navigationController = navigationController;

		this.#navigationController.onHoleChanged(hole => {
			this.#onHoleChanged(hole); 
		});

		this.#navigationController.onPinChanged(pin => {
			this.#onPinChanged(pin);
		});
	}

	connectedCallback() {
		this.#render();
	}

	#render() {
		createTemplate(this, `
			<style>
				.container {
					padding: 2px;
					padding-top: 10px;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					width: 600px;
					gap: 2px;
				}
				.button {
					cursor: pointer;
				}
				.selected {
					-webkit-box-shadow:inset 0px 0px 0px 2px orange;
				    -moz-box-shadow:inset 0px 0px 0px 2px orange;
				    box-shadow:inset 0px 0px 0px 2px orange;
				}
			</style>
			<div class="container">
			</div>
		`);

		const container = this.shadowRoot.querySelector(".container");

		this.#pins.forEach(pin => {
			const pinElement = document.createElement('input');
			pinElement.setAttribute('type', 'button');
			pinElement.setAttribute('value', `${pin.distance}Y: ${pin.label}`);
			pinElement.setAttribute('class', 'button');

			if (this.#pin !== undefined) {
				if (this.#pin.equals(pin)) {
					pinElement.setAttribute('class', 'selected button');
				}
			}

			pinElement.addEventListener('click', () => {
				this.#navigationController.setPin(pin);
			});
			container.appendChild(pinElement);
		});
	}

	#onHoleChanged(hole) {
		this.#pins = hole?.pins || [];
		this.#render();
	}

	#onPinChanged(pin) {
		this.#pin = pin;
		this.#render();
	}

	setPins(pins) {
		this.pins = pins;
		this.render();
	}
}

customElements.define('pin-select', PinSelectComponent);
