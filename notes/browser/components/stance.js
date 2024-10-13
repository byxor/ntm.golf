class StanceComponent extends HTMLElement {
	connectedCallback() {
		createTemplate(this, `
			<style>
				.image {
					width: 70px;
				}

				.stance-3x {
					opacity: 1;
				}

				.stance-2x {
					opacity: 0.9;
				}

				.stance-1x {
					opacity: 0.6;
				}

				.stance-default {
					opacity: 0.00;
				}
			</style>
			<div>
				<img class="image ${this.stanceClass}" src="${this.stanceImage}" draggable="false"/>
			</div>
		`);
	}

	init(stance) {
		this.stance = stance;

		this.stanceImage = (() => {
			const path = `/assets/stances`;
			if (stance !== DEFAULT_STANCE) {
				return `${path}/${this.stance.value.replace(" ", "-")}.png`;
			} else {
				return `${path}/default.png`;
			}
		})();

		this.stanceClass = (() => {
			const stance = this.stance;
			if (stance === DEFAULT_STANCE) {
				return "stance-default";
			} else if (stance === STANCE_1x_HOOK || stance === STANCE_1x_SLICE) {
				return "stance-1x";
			} else if (stance === STANCE_2x_HOOK || stance === STANCE_2x_SLICE) {
				return "stance-2x";
			} else {
				return "stance-3x";
			}
		})();
	}
}

customElements.define('stance-', StanceComponent);
