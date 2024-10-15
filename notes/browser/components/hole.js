class HoleComponent extends HTMLElement {

	#navigationController;
	#index;

	#hole;
	#selected = false;
	#onSelected;

	init(navigationController, index) {
		this.#navigationController = navigationController;
		this.#index = index;

		this.#navigationController.onCourseChanged(course => {
			this.#onCourseChanged(course)
		});

		this.#navigationController.onHoleChanged(hole => {
			this.#onHoleChanged(hole);
		});
	}

	connectedCallback() {
		this.#render();
	}

	#render() {

		const classes = (() => {
			if (!this.#hole) {
				return "no-notes";
			}

			if (this.#selected) {
				return "selected";
			}

			return "deselected";
		})();

		createTemplate(this, `
			<style>
				.container {
					width: 40px;
					height: 40px;
					cursor: pointer;

					text-align: center;
					vertical-align: middle;
					line-height: 20px;  

				}
				.selected {
				    -webkit-box-shadow:inset 0px 0px 0px 2px orange;
				    -moz-box-shadow:inset 0px 0px 0px 2px orange;
				    box-shadow:inset 0px 0px 0px 2px orange;
				    background-color: #bbbbbb;
				    font-size: 27px;
				}
				.deselected {
					background-color: grey;
				}
				.no-notes {
					background-color: grey;
				}
				.text {
					text-align: center;
					vertical-align: middle;
					line-height: 40px;   
				}
			</style>
			<div class="container ${classes}">
				<span class="text">${this.#hole?.number || "?"}</span>
			</div>
		`);

		this.shadowRoot
			.querySelector(".container")
			.addEventListener("click", () => {
				this.#navigationController.setHole(this.#hole);
			});
	}

	#onCourseChanged(course) {
		this.#hole = course.holes[this.#index];
		this.#render();
	}

	#onHoleChanged(hole) {
		if (this.#hole?.equals(hole)) {
			this.#select();
		} else {
			this.#deselect();
		}
	}

	#select() {
		this.#selected = true;
		this.#render();
	}

	#deselect() {
		this.#selected = false;
		this.#render();
	}
}

customElements.define('hole-', HoleComponent);