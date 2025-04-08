class Target {
    constructor(distance, surface, wind, filters) {
        // TODO: allow filters for:
        // - "high"/"low"/"ideal"
        // - stance
        // - spin
        // - club and power

        this.distance = distance;
        this.surface = surface;
        this.wind = wind;
    }

    withWind(newWind) {
        return new Target(this.distance, this.surface, newWind, this.filters);
    }

    withDistance(newDistance) {
        return new Target(newDistance, this.surface, this.wind, this.filters);
    }
    
    withSurface(newSurface) {
        return new Target(this.distance, newSurface, this.wind, this.filters);
    }

    equals(target) {
        return this.distance === target.distance &&
            this.surface === target.surface &&
            this.wind.logicallyEquals(target.wind);
    }
}

class ShotOption {
    constructor(target, setup) {
        this.target = target;
        this.setup = setup;
    }
}