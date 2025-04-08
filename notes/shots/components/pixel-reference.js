class PixelReferenceComponent extends HTMLElement {

    #offset;
    #distance;

    init(offset, distance) {
        this.#offset = offset;
        this.#distance = distance;
    }

    connectedCallback() {
        this.#render();
    }

    // TODO: draw a yellow flag in the canvas.
    // can use the distance to determine number of vertical pixels.
    // need to make sure it's at the right height though relative to the horizon
    #render() {
        const unscaledWidth = 304;
        const unscaledHeight = 93 + 1;
        const scale = 4;

        const scaledWidth = unscaledWidth * scale;
        const scaledHeight = unscaledHeight * scale;

        const zeroColumn = 135;

        const horizonRow = 6;
        const flagColumn = this.#offset + zeroColumn;

        const offsetText = this.#offset > 0 ? `+${this.#offset}`: this.#offset;

        createTemplate(this, `
            <style>
                .container {
                    overflow: hidden;
                    width: 720px;
                    border: 1px solid black;
                    border-radius: 3px;
                }

                .canvas {
                    position: relative;
                    left: -${((flagColumn - 105) * scale)}px;

                    width: ${scaledWidth}px;
                    image-rendering: pixelated;
                }


            </style>
           
            <div class="container" title="${offsetText} pixels">
                <canvas class="canvas" width=${scaledWidth} height=${scaledHeight}>
                </canvas>
            </div>
        `);

        const canvas = this.shadowRoot.querySelector(".canvas");
        const context = canvas.getContext("2d");
        context.imageSmoothingEnabled = false;

        const skyColour = "black";
        const groundColour = "#443b6b";

        // draw sky
        context.fillStyle = skyColour;
        context.fillRect(0, 0, scaledWidth, scaledHeight);

        // draw ground
        context.fillStyle = groundColour;
        context.fillRect(0, horizonRow * scale, scaledWidth, scaledHeight);

        const [flagTop, flagBottom] = (() => {
            if (this.#distance <= 124) {
                return [horizonRow-2, horizonRow+4];
            } else if (this.#distance >= 125) {
                return [horizonRow-1, horizonRow+4];
            } else if (this.#distance >= 146) {
                return [horizonRow-2, horizonRow+3];
            }
        })();
        const flagHeight = flagBottom - flagTop;

        // draw putter pixel indicator
        context.fillStyle = "white";
        context.globalAlpha = 0.05;
        context.fillRect(zeroColumn * scale, (horizonRow - 5) * scale, scale, 2 * scale);
        context.fillRect(zeroColumn * scale, (horizonRow - 2) * scale, scale, 2 * scale);
        context.fillRect(zeroColumn * scale, (horizonRow + 1) * scale, scale, 2 * scale);
        context.fillRect(zeroColumn * scale, (horizonRow + 4) * scale, scale, 2 * scale);
        context.fillRect(zeroColumn * scale, (horizonRow + 7) * scale, scale, 2 * scale);
        context.fillRect(zeroColumn * scale, (horizonRow + 10) * scale, scale, 2 * scale);
        context.fillRect(zeroColumn * scale, (horizonRow + 13) * scale, scale, 2 * scale);
        context.globalAlpha = 1.0;

        // draw horizontal width indicator
        context.fillStyle = "white";

        const startColumn = (flagColumn < zeroColumn ? flagColumn : zeroColumn) + 1;
        const endColumn = flagColumn > zeroColumn ? flagColumn : zeroColumn;
        for (let x = startColumn; x < endColumn; x++) {
            if (x % 2 !== 0) {
                context.globalAlpha = 0.05;
            } else {
                context.globalAlpha = 0.0;
            }
            context.fillRect(x * scale, (horizonRow + 3) * scale, scale, scale);        
        }
        context.globalAlpha = 1.0;

        // draw vertical indicator in flag column
        let temp = Math.abs(this.#offset);
        const limit = 6;
        if (temp > limit) {
            temp = limit;
        }
        const brightness = 255 - (temp * 20);
        context.fillStyle = `rgba(0, ${brightness}, 0, 1)`;
        context.globalAlpha = 0.4;
        for (let i = 0; i < 100; i+=3) {
            context.fillRect(flagColumn * scale, (horizonRow + 1 + i) * scale, scale, 2 * scale);
        }
        context.fillRect((flagColumn * scale), flagTop * scale, scale, scaledHeight);
        context.globalAlpha = 1.0;
        
        // draw flag
        context.fillStyle = "yellow";
        context.fillRect((flagColumn * scale), flagTop * scale, scale, flagHeight * scale);
        
        // draw reference image
        const pixelOffsetsImage = document.querySelector(".pixel-offsets");
        context.drawImage(pixelOffsetsImage, 0, scale, scaledWidth, scaledHeight-(scale));

        // draw offset text
        const spacedOffsetText = this.#offset === 0 ? " " + offsetText : offsetText;
        let xPos = 243 * scale;
        if (spacedOffsetText.length > 2) {
            xPos -= 4.8 * scale;
        }
        context.fillStyle = "#900000";
        context.font = "40px verdana";
        context.fillText(spacedOffsetText, xPos, 74 * scale);
    }

}

customElements.define('pixel-reference', PixelReferenceComponent);