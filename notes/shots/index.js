// TODO: these query param functions are duplicated. Move them somewhere as a util?

const addQueryParam = (key, value) => {
	const url = new URL(window.location.href);
	url.searchParams.set(key, value);
	window.history.pushState({}, '', url.toString());
};

const removeQueryParam = (key) => {
	window.history.replaceState(key, null);
}

const getQueryParam = (key) => {
	const url = new URL(window.location.href);
	return url.searchParams.get(key) || '';
};


class ShotBrowserController {

	#onTargetChangedListeners = [];

	#golfer;
	#target;

    constructor() {
		this.#golfer = "almeida"; // TODO: use proper model
		this.#target = new Target(undefined, undefined);
		
		this.navigateViaUrl();

		setInterval(() => {
			this.updateURL();
		}, 500);

    }

	navigateViaUrl() {
		const distanceParam = getQueryParam("yards");
		const surfaceParam = getQueryParam("from");
		const windParam = getQueryParam("into");

		const distance = (() => {
			if (!distanceParam) {
				return 120;
			}
			return parseInt(distanceParam);
		})();

		const surface = (() => {
			if (!surfaceParam) {
				return FAIRWAY_SURFACE;
			}

			const potentialSurfaces = [
				FAIRWAY_SURFACE,
				ROUGH_SURFACE,
				HEAVY_ROUGH_SURFACE,
				BUNKER_1_SURFACE,
				BUNKER_2_SURFACE,
				BUNKER_3_SURFACE,
				BUNKER_4_SURFACE,
				WATER_SURFACE,
			];
			for (let i = 0; i < potentialSurfaces.length; i++) {
				const potentialSurface = potentialSurfaces[i];
				if (potentialSurface.name === surfaceParam) {
					return potentialSurface;
				}
			}

		})();

		const wind = (() => {
			if (!windParam) {
				return newWind(0, "N");
			}

			const segments = windParam?.split("_");
			const strength = parseInt(segments[0]);
			const direction = segments[2]?.replace("1", "+1") || "N";
			const wind = newWind(strength, direction);
			return wind;
		})();

		const target = new Target(distance, surface, wind, []);
		this.setTarget(target);
	}

	updateURL() {
		if (
			(this.#golfer === this.lastGolfer) &&
			(this.#target.distance === this.lastDistance) &&
			(this.#target.wind.logicallyEquals(this.lastWind)) &&
			(this.#target.surface === this.lastSurface)
		) {
			return;
		}

		window.history.pushState({}, document.title, window.location.pathname);

		if (this.#target.distance !== undefined) {
			addQueryParam("yards", this.#target.distance);
		}

		if (this.#target.surface) {
			addQueryParam("from", this.#target.surface.name);
		}

		if (this.#target.wind) {
			addQueryParam("into", this.#target.wind.toString().replace(")", "").replace("(", "_").replace("+", "").replace("w", "_wind"));
		}

		addQueryParam("with", this.#golfer);

		this.lastGolfer = this.#golfer;
		this.lastDistance = this.#target.distance;
		this.lastWind = this.#target.wind;
		this.lastSurface = this.#target.surface;

		console.log(`Url updated: ${window.location}`);
	}

	setTarget(target) {
		if (target.wind.logicallyEquals(this.#target.wind) &&
		    target.distance === this.#target.distance &&
		    target.surface === this.#target.surface) {
			return;
		}
		console.log("Controller: setting target", target.distance, target.surface.name, target.wind);
		this.#target = target;
		this.#updateFavicon();
		this.#onTargetChangedListeners.forEach(listener => listener(target));
	}

    onTargetChanged(listener) {
		this.#onTargetChangedListeners.push(listener);
    }

	getWind() {
		return this.#target.wind;
	}

	getTarget() {
		return this.#target;
	}

	#updateFavicon() {
		const image = (() => {
			if (this.#target.distance >= 999) {
				return `/assets/pixel-offsets/pixel-offsets.png`;			
			} else if (this.#target.distance > 9000) {
				return `/assets/stances/default.png`;
			}
			return `/assets/meter/surfaces/${this.#target.surface.name}-circle${this.#target.surface === FAIRWAY_SURFACE ? "-lighter" : this.#target.surface === BUNKER_4_SURFACE ? "-darker" : ""}.png`;
		})();

		let link = document.querySelector("link[rel~='icon']");
		if (!link) {
			link = document.createElement('link');
			link.rel = 'icon';
			document.head.appendChild(link);
		}
		link.href = image;
	}
}

class ShotBrowser {

	static async create(containerId) {
		const container = document.getElementById(containerId);
		return new ShotBrowser(container);
	}

	constructor(container) {
		const shotBrowserController = new ShotBrowserController();

		const shotBrowserComponent = document.createElement('shot-browser');
		shotBrowserComponent.init(shotBrowserController);

		container.appendChild(shotBrowserComponent);
	}
}