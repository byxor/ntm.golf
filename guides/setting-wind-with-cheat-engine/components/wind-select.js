// TODO: split wind direction and strength selection into separate components.
// Would make the "setting-wind-with-cheat-engine" guide cleaner.

class WindSelectComponent extends HTMLElement {
	
	init(navigationController, onWindSelected, onWindUpdated=wind=>{}, initialWind=newWind(0, "N")) {
		this.navigationController = navigationController;

		this.onWindSelected = onWindSelected;
		this.onWindUpdated = onWindUpdated;

		this.isStrengthVisible = true;

		this.lastEmittedWind = undefined;

		this.documentListenersConfiguredForStrengthDrag = false;
		this.isDraggingStrength = false;
		this.initialStrengthForDrag = 0;
		this.initialYPixelForStrengthDrag = 0;

		this.documentListenersConfiguredForDirectionDrag = false;
		this.isDraggingDirection = false;

		this.maxWind = 15;
		if (!initialWind) {
			initialWind = newWind(0, "N");
		}
		this.setWind(initialWind);

		this.emitSelectedWind();

		this.navigationController?.onWindChanged(wind => {
			if (!wind.logicallyEquals(this.wind)) {
				this.setWind(wind);
			}
		});

		this.navigationController?.onHoleChanged(hole => {
			this.maxWind = hole?.maxWind || 15;
			if (this.wind.strength > this.maxWind) {
				console.log(`Capping wind at ${this.maxWind}`);
				this.setWind(newWind(this.maxWind, this.wind.direction));
			}
		})
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.windDirectionImage = this.getDirectionImage(this.wind.direction);
		this.windStrengthImage = this.getStrengthImage(this.wind.strength);

		createTemplate(this, `
			<style>
				.container {
					/* border: 3px solid black; */
					display: flex;
					flex-direction: row;
					user-select: none;
					touch-action: none;
				}
				.image {
					height: 60px;
					cursor: pointer;
				}
				.direction {
				}
				.strength {
					${ this.isStrengthVisible ? "" : "display: none;" }
				}
				.cache {
					display: none;
				}
			</style>
			<div class="container">
				<img class="image direction" src="${this.windDirectionImage}"></img>
				<img class="image strength" src="${this.windStrengthImage}"></img>
			</div>
			<div class="cache">
				<!-- invisible images, cached to avoid flickering -->
				<img src="${this.getDirectionImage("N")}"></img>
				<img src="${this.getDirectionImage("N+1")}"></img>
				<img src="${this.getDirectionImage("NE")}"></img>
				<img src="${this.getDirectionImage("NE+1")}"></img>
				<img src="${this.getDirectionImage("E")}"></img>
				<img src="${this.getDirectionImage("E+1")}"></img>
				<img src="${this.getDirectionImage("SE")}"></img>
				<img src="${this.getDirectionImage("SE+1")}"></img>
				<img src="${this.getDirectionImage("S")}"></img>
				<img src="${this.getDirectionImage("S+1")}"></img>
				<img src="${this.getDirectionImage("SW")}"></img>
				<img src="${this.getDirectionImage("SW+1")}"></img>
				<img src="${this.getDirectionImage("W")}"></img>
				<img src="${this.getDirectionImage("W+1")}"></img>
				<img src="${this.getDirectionImage("NW")}"></img>
				<img src="${this.getDirectionImage("NW+1")}"></img>
				<img src="${this.getStrengthImage(0)}"></img>
				<img src="${this.getStrengthImage(1)}"></img>
				<img src="${this.getStrengthImage(2)}"></img>
				<img src="${this.getStrengthImage(3)}"></img>
				<img src="${this.getStrengthImage(4)}"></img>
				<img src="${this.getStrengthImage(5)}"></img>
				<img src="${this.getStrengthImage(6)}"></img>
				<img src="${this.getStrengthImage(7)}"></img>
				<img src="${this.getStrengthImage(8)}"></img>
				<img src="${this.getStrengthImage(9)}"></img>
				<img src="${this.getStrengthImage(10)}"></img>
				<img src="${this.getStrengthImage(11)}"></img>
				<img src="${this.getStrengthImage(12)}"></img>
				<img src="${this.getStrengthImage(13)}"></img>
				<img src="${this.getStrengthImage(14)}"></img>
				<img src="${this.getStrengthImage(15)}"></img>
			</div>
		`);
		
		this.configureDirectionSelection();
		this.configureStrengthSelection();
	}

	hideStrength() {
		this.isStrengthVisible = false;
	}

	configureDirectionSelection() {
		const directionElement = this.shadowRoot.querySelector('.direction');

		directionElement.ondragstart = (event => false);

		const getAngleFromCenterInDegrees = event => {
		    const rect = this.shadowRoot.querySelector('.direction').getBoundingClientRect();

		    const centerX = rect.left + rect.width / 2;
		    const centerY = rect.top + rect.height / 2;

		    const deltaX = event.clientX - centerX;
		    const deltaY = centerY - event.clientY;

		    let angleFromCenterInDegrees = Math.atan2(deltaX, deltaY) * (180 / Math.PI);
		    if (angleFromCenterInDegrees < 0) {
		    	angleFromCenterInDegrees += 360;
		    }

		    return angleFromCenterInDegrees;
		}

		const getDirectionFromAngle = angle => {
			const segments = 16;
			const anglePerSegment = (360.0 / segments);
			const halfSegmentAngle = anglePerSegment / 2.0;

			const directions = [
				"N",
				"N+1",
				"NE",
				"NE+1",
				"E",
				"E+1",
				"SE",
				"SE+1",
				"S",
				"S+1",
				"SW",
				"SW+1",
				"W",
				"W+1",
				"NW",
				"NW+1"
			];

			let lower = -halfSegmentAngle;
			let upper = halfSegmentAngle;

			for (let i = 0; i < segments; i++) {
				if (angle >= lower && angle < upper) {
					return directions[i];
				}

				lower += anglePerSegment;
				upper += anglePerSegment;
			}

			return directions[15];
		}

		const update = event => {
			if (this.isDraggingDirection) {
				const angleFromCenterInDegrees = getAngleFromCenterInDegrees(event);
				const direction = getDirectionFromAngle(angleFromCenterInDegrees);
				this.setDirection(direction);
			}
		};

		const mouseMove = event => {
			update(event);
		};

		const mouseDown = event => {
			event.preventDefault();
			this.isDraggingDirection = true;
			update(event);
		};

		const mouseUp = event => {
			if (this.isDraggingDirection) {
				this.emitSelectedWind();
			}
			this.isDraggingDirection = false;
		}

		directionElement.addEventListener('pointerdown', mouseDown);
		if (!this.documentListenersConfiguredForDirectionDrag) {
			document.addEventListener('pointermove', mouseMove);
			document.addEventListener('pointerup', mouseUp);	
		}
	}

	configureStrengthSelection() {
		// TODO: cap the max strength based on the hole?

		const strengthElement = this.shadowRoot.querySelector('.strength');
		
		strengthElement.ondragstart = (event => false);

		const mouseMove = event => {
			event.preventDefault();
			if (this.isDraggingStrength) {
				const endY = event.clientY;
				const deltaY = endY - this.initialYPixelForStrengthDrag;
				const pixelsDragged = -deltaY;
				const pixelsPerIncrement = 14;

				const strengthDelta = Math.round(pixelsDragged / pixelsPerIncrement);

				let strength = this.initialStrengthForDrag + strengthDelta;
				if (strength > this.maxWind) {
					strength = this.maxWind;
				} else if (strength < 0) {
					strength = 0;
				}

				this.setStrength(strength);
			}
		}

		const mouseDown = event => {
			event.preventDefault();
			this.isDraggingStrength = true;
			this.initialYPixelForStrengthDrag = event.clientY;
			this.initialStrengthForDrag = this.wind.strength;
		};

		const mouseUp = event => {
			event.preventDefault();
			if (this.isDraggingStrength) {
				this.emitSelectedWind();
			}
			this.isDraggingStrength = false;
		};

		strengthElement.addEventListener('pointerdown', mouseDown);
		if (!this.documentListenersConfiguredForStrengthDrag) {
			document.addEventListener('pointerup', mouseUp);
			document.addEventListener('pointermove', mouseMove);	
			this.documentListenersConfiguredForStrengthDrag = true;
		}
	}

	getDirectionImage(direction) {
		const suffix = (() => {
			switch(direction) {
				case "N":    return "00-north";
				case "N+1":  return "01-north";
				case "NE":   return "02-northeast";
				case "NE+1": return "03-east";
				case "E":    return "04-east";
				case "E+1":  return "05-east";
				case "SE":   return "06-southeast";
				case "SE+1": return "07-south";
				case "S":    return "08-south";
				case "S+1":  return "09-south";
				case "SW":   return "10-southwest";
				case "SW+1": return "11-west";
				case "W":    return "12-west";
				case "W+1":  return "13-west";
				case "NW":   return "14-northwest";
				case "NW+1": return "15-north";
				default: debugger;
			}
		})();
		return `/assets/wind/wind-direction-${suffix}.png`;
	}

	getStrengthImage(strength) {
		return `/assets/wind/wind-strength-${strength}.png`;
	}

	setDirection(direction) {		
		this.setWind(newWind(this.wind.strength, direction));
	}

	setStrength(strength) {
		this.setWind(newWind(strength, this.wind.direction));
	}

	setWind(newWind) {
		if (!newWind.equals(this.wind)) {
			this.wind = newWind;
			this.onWindUpdated(newWind);
			this.render();
		}
	}

	emitSelectedWind() {
		if (!this.wind.equals(this.lastEmittedWind)) {
			this.lastEmittedWind = this.wind;
			this.onWindSelected(this.wind);
		}
	}
}

customElements.define('wind-select', WindSelectComponent);