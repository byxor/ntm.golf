class GraphicalPinSelectComponent extends HTMLElement {

	#navigationController;
	#pins = [];
	#pin;
    #hole;
    #course;

	init(navigationController) {
		this.#navigationController = navigationController;

        this.#navigationController.onCourseChanged(course => {
            this.#onCourseChanged(course);
        });

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
        if ((!this.#hole) || (!this.#course)) {
            return;
        }

        // Course names are translated to match the filename conventions of the pin images.
        const courseName = {
            "Germany": "Germany",
            "Japan": "Japan",
            "USA": "U.S.A",
            "Australia": "Australia",
            "Scotland": "Scotland",
        }[this.#course.name];
        const greenImage = `/assets/pins/${courseName}/${courseName}${this.#hole.number}detailed.png`;

		createTemplate(this, `
			<style>
				.container {
				}
                .green-image {
                    user-drag: none;
                    -webkit-user-drag: none;
                    user-select: none;
                    -moz-user-select: none;
                    -webkit-user-select: none;
                    -ms-user-select: none;

                    max-width: 610px;
                }
                .pin-area {
                }
                .pin-with-setups {
                    cursor: pointer;
                }
                .pin-without-setups {
                    cursor: help;
                }
			</style>
			<div class="container">
                <img class="green-image" src="${greenImage}" usemap="#pin-map" draggable="false"></img>
                <map class="pin-map" name="pin-map">
                </map>
			</div>
		`);

		const container = this.shadowRoot.querySelector(".container");
        
        const pinMap = this.shadowRoot.querySelector(".pin-map");

		const pins = this.#pins;//.filter(pin => pin.setups.length > 0);

        const greenImageElement = this.shadowRoot.querySelector(".green-image");
        greenImageElement.addEventListener('load', () => {
            if (greenImageElement.clientWidth === 0) {
                return;
            }

            // Scale the pin coordinates based on image dimensions after rendering.
            const scaleFactor = greenImageElement.clientWidth / greenImageElement.naturalWidth;
            
            pins.forEach(pin => {
                if (!pin.coords) {
                    return;
                }
    
                const xCoordinate = pin.coords.x * scaleFactor;
                const yCoordinate = (pin.coords.y - 6) * scaleFactor;
    

                const areaElement = document.createElement("area");
                const radius = 18;
                areaElement.setAttribute("shape", "circle");
                areaElement.setAttribute("coords", `${xCoordinate} ${yCoordinate} ${radius}`);
                areaElement.setAttribute("alt", pin.toNavString());
                areaElement.setAttribute("title", `${pin.distance}Y: ${pin.label}`);
                areaElement.setAttribute("class", "pin-area");
                if (pin.setups.length > 0) {
                    areaElement.setAttribute("class", "pin-with-setups");
                    areaElement.addEventListener("click", () => {
                        this.#navigationController.setPin(pin);
                    });
                } else {
                    areaElement.setAttribute("class", "pin-without-setups");
                }

                pinMap.appendChild(areaElement);
            });
        });
	}

    #onCourseChanged(course) {
        this.#course = course;
    }

	#onHoleChanged(hole) {
        this.#hole = hole;
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

customElements.define('graphical-pin-select', GraphicalPinSelectComponent);
