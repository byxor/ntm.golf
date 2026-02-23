class Lineup {
    constructor(
        distance = NaN,   // in yards
        offset = NaN,     // in pixels (from the POV of the golfer)
    ) {
        this.distance = distance;
        this.offset = offset;
    }
}

class LineupChain {
    constructor(
        lineups,
        rootDistance = NaN, // e.g. 160 if shooting with a 160y club
        dotScales = [0.8, 1, 0.75],
        dotColors = ['red', 'gold', 'green'],
        lineColors = ['black', 'black'], //['#ff0000', '#ffef62', 'grey'],
    ) {
        this.lineups = lineups;
        this.rootDistance = rootDistance;
        this.dotScales = dotScales;
        this.dotColors = dotColors;
        this.lineColors = lineColors;
    }

    forEach(fn) {
        this.lineups.forEach(fn);
    }
}

class ShotGraphComponent extends HTMLElement {
    init(
        lineupChains = undefined,
        upperDistance = NaN,
        lowerDistance = NaN,
        drawLines = false,
        drawDistanceText = false,
    ) {
        const uuid = crypto.randomUUID();
        this.scaleContainerId = `shot-graph-scale-container-${uuid}`;
        this.cropContainerId = `shot-graph-crop-container-${uuid}`;
        this.canvasId = `shot-graph-canvas-${uuid}`;
        this.scale = 32;

        this.lineupChains = lineupChains;
        this.upperDistance = upperDistance;
        this.lowerDistance = lowerDistance;

        this.drawLines = drawLines;
        this.drawDistanceText = drawDistanceText;
    }

    connectedCallback() {
        this.#render();
    }

    #render() {
        const scale = this.scale;//32; // 1 in-game pixel should be NxN pixels.

        createTemplate(this, `
            <style>
                #${this.scaleContainerId} {
                    /*transform: scale(${(1/scale) * 10});
                    transform-origin: top left;*/
                }

                #${this.cropContainerId} {
                    width: ${300 * scale}px;
                    height: ${200 * scale}px;
                    overflow: hidden;
                    position: relative;
                }

                #${this.canvasId} {
                    position: absolute;
                    image-rendering: pixelated;
                    image-rendering: crisp-edges;
                    left: ${-54 * scale}px;
                }
            </style>

            <div id="${this.scaleContainerId}">
                <div id="${this.cropContainerId}">
                    <canvas id="${this.canvasId}"></canvas>
                </div>
            </div>
        `);

        const canvas = this.shadowRoot.getElementById(this.canvasId);
        const context = canvas.getContext('2d');

        const centerColumn = 135; // this is the putter pixel.
        const rowAboveHead = 75; // this is slightly above Landolt's hair.

        // --------- utils ----------------

        const loadImage = src => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = reject;
                image.src = src;
            });
        };

        const columnOrRowToGlobalPixel = (column) => {
            return column * scale;
        }

        const distanceToRow = distance => {
            const upperBoundaryDistance = this.upperDistance;
            const lowerBoundaryDistance = this.lowerDistance;

            const percentage = (distance - lowerBoundaryDistance) / (upperBoundaryDistance - lowerBoundaryDistance);

            return rowAboveHead - (percentage * rowAboveHead);
        }

        const offsetToColumn = (offset) => {
            return centerColumn + offset;
        }

        const drawLineAtOffset = (offset) => {
            context.fillStyle = 'black';
            const xPos = columnOrRowToGlobalPixel(offsetToColumn(offset));
            const yPos = 0;
            context.fillRect(xPos, yPos, scale, canvas.height);
        }

        const drawWindUnitNotch = (distance, offset, notchHeight=20, color='green', ) => {
            const lineThickness = 6;
            context.fillStyle = color;
            const xPos = columnOrRowToGlobalPixel(offsetToColumn(offset)) + (scale / 2) - (lineThickness / 2);
            const yPos = columnOrRowToGlobalPixel(distanceToRow(distance)) + (scale / 2) - (notchHeight / 2);
            context.fillRect(xPos, yPos, lineThickness, notchHeight);
        };

        const drawLineCenteredAtOffset = (offset, color='grey') => {
            const lineThickness = 3;
            context.fillStyle = color;
            const xPos = columnOrRowToGlobalPixel(offsetToColumn(offset)) + (scale / 2) - (lineThickness / 2);
            const yPos = 0;
            context.fillRect(xPos, yPos, lineThickness, canvas.height);
        }

        const drawLineCenteredAtRow = (row, color='grey') => {
            const lineThickness = 3;
            context.fillStyle = color;
            const xPos = 0;
            const yPos = columnOrRowToGlobalPixel(row) + (scale / 2) - (lineThickness / 2);
            context.fillRect(xPos, yPos, canvas.width, lineThickness);
        }

        const drawLineupDot = (lineup, indexInChain, color = 'black', size=1) => {
            // TODO: cull dots below landolt's head.

            const borderColor = 'black';
            const borderSize = 4;

            const cellX = columnOrRowToGlobalPixel(offsetToColumn(lineup.offset));
            const cellY = columnOrRowToGlobalPixel(distanceToRow(lineup.distance));

            const dotSize = scale * size;

            const xPos = cellX + (scale / 2) - (dotSize / 2);
            const yPos = cellY + (scale / 2) - (dotSize / 2);

            context.fillStyle = borderColor;
            context.fillRect(xPos, yPos, dotSize, dotSize);

            context.fillStyle = color;
            context.fillRect(
                xPos + borderSize,
                yPos + borderSize,
                dotSize - borderSize * 2,
                dotSize - borderSize * 2
            );
        }

        const drawLineBetweenLineupDots = (lineup1, lineup2, indexInChain, color = 'grey') => {
            const xPos1 = columnOrRowToGlobalPixel(offsetToColumn(lineup1.offset)) + (scale / 2);
            const yPos1 = columnOrRowToGlobalPixel(distanceToRow(lineup1.distance)) + (scale / 2);

            const xPos2 = columnOrRowToGlobalPixel(offsetToColumn(lineup2.offset)) + (scale / 2);
            const yPos2 = columnOrRowToGlobalPixel(distanceToRow(lineup2.distance)) + (scale / 2);

            context.setLineDash([6, 4]); 

            context.beginPath();
            context.moveTo(xPos1, yPos1);
            context.lineTo(xPos2, yPos2);
            context.fillStyle = color;
            context.strokeStyle = color;
            context.lineWidth = 2;
            context.stroke();

            context.setLineDash([]);
        }

        const drawPatch = (fromOffset, toOffset, color) => {
            const widthInColumns = toOffset - fromOffset + 1;
            context.fillStyle = color;
            context.fillRect(columnOrRowToGlobalPixel(offsetToColumn(fromOffset)), 0, columnOrRowToGlobalPixel(widthInColumns), canvas.height);
        }

        // TODO: draw arrows on the chain lines? for things like backspin

        // --------------------------------

        Promise.all([
            loadImage(`./lineups.png`),
        ])
        .then(images => {
            const [lineupImage] = images;

            canvas.width = lineupImage.width * scale;
            canvas.height = lineupImage.height * scale;

            // draw background
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = '#f9f9f9';
            for (let x = 0; x < canvas.width; x += (scale * 2)) {
                context.fillRect(x, 0, scale, canvas.height);
            }

            // draw vertical "patches" to help resolve the offset
            const patchOpacity = 0.2;
            drawPatch(-15/*-21*/, 0, 'rgba(207, 238, 198, 0.3)'); // green arrow 1hook
            drawPatch(-31, -16, 'rgba(218, 115, 231, 0.2)'); // wedge hair
            drawPatch(-47, -32, 'rgba(73, 176, 202, 0.2)'); // wood hair
            drawPatch(-78, -48, 'rgba(233, 118, 41, 0.1)'); // shirt/back

            // draw distance grid
            drawLineCenteredAtRow(distanceToRow(300), 'black');
            drawLineCenteredAtRow(distanceToRow(290));
            drawLineCenteredAtRow(distanceToRow(280));
            drawLineCenteredAtRow(distanceToRow(270));
            drawLineCenteredAtRow(distanceToRow(260));
            drawLineCenteredAtRow(distanceToRow(250), 'darkgrey');
            drawLineCenteredAtRow(distanceToRow(240));
            drawLineCenteredAtRow(distanceToRow(230));
            drawLineCenteredAtRow(distanceToRow(220));
            drawLineCenteredAtRow(distanceToRow(210));
            drawLineCenteredAtRow(distanceToRow(200), 'black');
            drawLineCenteredAtRow(distanceToRow(190));
            drawLineCenteredAtRow(distanceToRow(180));
            drawLineCenteredAtRow(distanceToRow(170));
            drawLineCenteredAtRow(distanceToRow(160));
            drawLineCenteredAtRow(distanceToRow(150), 'darkgrey');
            drawLineCenteredAtRow(distanceToRow(140));
            drawLineCenteredAtRow(distanceToRow(130));
            drawLineCenteredAtRow(distanceToRow(120));
            drawLineCenteredAtRow(distanceToRow(110));
            drawLineCenteredAtRow(distanceToRow(100), 'black');
            drawLineCenteredAtRow(distanceToRow(90));
            drawLineCenteredAtRow(distanceToRow(80));

            const fiveLineColor = 'rgba(0, 0, 0, 0.07)';
            drawLineCenteredAtRow(distanceToRow(295), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(285), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(275), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(265), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(255), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(245), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(235), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(225), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(215), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(205), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(195), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(185), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(175), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(165), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(155), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(145), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(135), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(125), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(115), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(105), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(95), fiveLineColor);
            drawLineCenteredAtRow(distanceToRow(85), fiveLineColor);

            drawLineCenteredAtOffset(-50);
            drawLineCenteredAtOffset(-40);
            drawLineCenteredAtOffset(-30);
            drawLineCenteredAtOffset(-20);
            drawLineCenteredAtOffset(-10);

            // drawLineCenteredAtOffset(-0.1);
            // drawLineCenteredAtOffset(-0.05);
            drawLineCenteredAtOffset(0);
            // drawLineCenteredAtOffset(0.05);
            // drawLineCenteredAtOffset(0.1);

            drawLineCenteredAtOffset(10);
            drawLineCenteredAtOffset(20);
            drawLineCenteredAtOffset(30);
            drawLineCenteredAtOffset(40);
            drawLineCenteredAtOffset(50);

            // const d1 = 20;
            // const d2 = 35;
            // const d3 = 60;
            // const d4 = 75;
            // const d5 = 90;
            // const d6 = 120;
            // const drawWindUnits = (distance, windUnit) => {
            //     drawWindUnitNotch(distance, windUnit*(-15), d6);
            //     drawWindUnitNotch(distance, windUnit*(-14), d1);
            //     drawWindUnitNotch(distance, windUnit*(-13), d1);
            //     drawWindUnitNotch(distance, windUnit*(-12), d5);
            //     drawWindUnitNotch(distance, windUnit*(-11), d1);
            //     drawWindUnitNotch(distance, windUnit*(-10), d1);
            //     drawWindUnitNotch(distance, windUnit*(-9), d4);
            //     drawWindUnitNotch(distance, windUnit*(-8), d1);
            //     drawWindUnitNotch(distance, windUnit*(-7), d1);
            //     drawWindUnitNotch(distance, windUnit*(-6), d3);
            //     drawWindUnitNotch(distance, windUnit*(-5), d1);
            //     drawWindUnitNotch(distance, windUnit*(-4), d1);
            //     drawWindUnitNotch(distance, windUnit*(-3), d2);
            //     drawWindUnitNotch(distance, windUnit*(-2), d1);
            //     drawWindUnitNotch(distance, windUnit*(-1), d1);
            //     drawWindUnitNotch(distance, 0, 10);
            //     drawWindUnitNotch(distance, windUnit*(15), d6);
            //     drawWindUnitNotch(distance, windUnit*(14), d1);
            //     drawWindUnitNotch(distance, windUnit*(13), d1);
            //     drawWindUnitNotch(distance, windUnit*(12), d5);
            //     drawWindUnitNotch(distance, windUnit*(11), d1);
            //     drawWindUnitNotch(distance, windUnit*(10), d1);
            //     drawWindUnitNotch(distance, windUnit*(9), d4);
            //     drawWindUnitNotch(distance, windUnit*(8), d1);
            //     drawWindUnitNotch(distance, windUnit*(7), d1);
            //     drawWindUnitNotch(distance, windUnit*(6), d3);
            //     drawWindUnitNotch(distance, windUnit*(5), d1);
            //     drawWindUnitNotch(distance, windUnit*(4), d1);
            //     drawWindUnitNotch(distance, windUnit*(3), d2);
            //     drawWindUnitNotch(distance, windUnit*(2), d1);
            //     drawWindUnitNotch(distance, windUnit*(1), d1);
            // };
            // drawWindUnits(220, (10/3));
            // drawWindUnits(180, (12/3));
            // drawWindUnits(130, (16/3));
            // drawWindUnits(100, (22/3));

            // draw distance grid units
            const drawDistanceGridUnit = (distance) => {
                    context.font = "92px Tahoma";
                    context.lineWidth = 6;
                    context.lineJoin = "round";
                    context.miterLimit = 2;
                    context.strokeStyle = "black";
                    context.fillStyle = "grey";

                    const distanceText =  `${distance}`;
                    const xPos = columnOrRowToGlobalPixel(offsetToColumn(-51)/*53*/);
                    const yPos = columnOrRowToGlobalPixel(distanceToRow(distance)) + 43;

                    context.globalAlpha = 0.45;
                    const oldTextAlign = context.textAlign;
                    context.textAlign = "right";
                    context.fillText(distanceText, xPos, yPos);
                    context.globalAlpha = 1;
                    context.textAlign = oldTextAlign;
            }
            for (let distance = 300; distance >= 80; distance -= 10) {
                drawDistanceGridUnit(distance);
            }

            // draw center line (putter pixel)
            // drawLineAtOffset(0); // too harsh

            // draw lineup image
            context.imageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.mozImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.drawImage(lineupImage, 0, 0, lineupImage.width * scale, lineupImage.height * scale);

            // draw lineup chains
            this.lineupChains.forEach((lineupChain, chainIndex) => {

                // draw lines between dots
                lineupChain.forEach((_, indexInChain) => {
                    if (indexInChain >= lineupChain.lineups.length - 1) {
                        return;
                    }

                    drawLineBetweenLineupDots(
                        lineupChain.lineups[indexInChain],
                        lineupChain.lineups[indexInChain+1],
                        indexInChain,
                        lineupChain.lineColors[indexInChain]
                    );
                });

                const firstLineup = lineupChain.lineups[0];
                const secondLineup = lineupChain.lineups[1];

                // draw gentle line to the root distance (from the cutoff) (or whatever else i set the target to)
                const targetLineup = firstLineup;
                if (this.drawLines && targetLineup && !isNaN(targetLineup.distance)) {
                    drawLineBetweenLineupDots(
                        new Lineup(lineupChain.rootDistance, 0),
                        targetLineup,
                        NaN,
                        'rgba(29, 51, 110, 0.88)'
                        // 'rgba(84, 124, 235, 0.43)'
                    );
                }

                // TODO: move distance text to own function.
                // TODO: cull distance text below landolt's head.
                // draw distance text for 1st lineup (carry)
                if (this.drawDistanceText && firstLineup && !isNaN(firstLineup.distance)) {
                    context.font = "50px Tahoma";
                    context.lineWidth = 6;
                    context.lineJoin = "round";
                    context.miterLimit = 2;
                    context.strokeStyle = "black";
                    context.fillStyle = "red";

                    context.globalAlpha = 0.4;
                    const distanceFromRoot = firstLineup.distance - lineupChain.rootDistance;
                    const distanceText =  `   ${distanceFromRoot > 0 ? '+' : ''}${distanceFromRoot}`;
                    const xPos = columnOrRowToGlobalPixel(offsetToColumn(firstLineup.offset) ) - 14;
                    const yPos = columnOrRowToGlobalPixel(distanceToRow(firstLineup.distance)) + 34;
                    context.strokeText(distanceText, xPos, yPos);
                    context.fillText(distanceText, xPos, yPos);
                    context.globalAlpha = 1;
                }

                // draw distance text for 2nd lineup (cutoff)
                if (this.drawDistanceText && secondLineup && !isNaN(secondLineup.distance)) {
                    context.font = "76px Tahoma";
                    context.lineWidth = 5.5;
                    context.lineJoin = "round";
                    context.miterLimit = 2;
                    context.strokeStyle = "black";
                    context.fillStyle = "gold";

                    const oldTextAlign = context.textAlign;
                    context.textAlign = "right";
                    context.globalAlpha = 0.6;
                    const distanceFromRoot = secondLineup.distance - lineupChain.rootDistance;
                    const distanceText =  `${distanceFromRoot > 0 ? '+' : ''}${distanceFromRoot}`;
                    const xPos = columnOrRowToGlobalPixel(offsetToColumn(secondLineup.offset)) - 6;
                    const yPos = columnOrRowToGlobalPixel(distanceToRow(secondLineup.distance)) + 40;
                    context.strokeText(distanceText, xPos, yPos);
                    context.fillText(distanceText, xPos, yPos);
                    context.globalAlpha = 1;
                    context.textAlign = oldTextAlign;
                }

                // draw dots
                lineupChain.forEach((lineup, indexInChain) => {
                    drawLineupDot(lineup, indexInChain, lineupChain.dotColors[indexInChain], lineupChain.dotScales[indexInChain]);
                });
            });
        });
    }
}

customElements.define('shot-graph', ShotGraphComponent);