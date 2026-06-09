const canvas = document.getElementById("unit-circle-canvas");
const context = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const centerX = canvasWidth / 2;
const centerY = canvasHeight / 2;

const radius = 470; // (in pixels)
const totalDirections = 16;

const HORIZONTAL_COLOUR = "#3cbe49";
const VERTICAL_COLOUR = "#00b4cc";

context.fillStyle = "#ffffff";
context.fillRect(0, 0, canvasWidth, canvasHeight);

context.lineCap = "round";

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function strokeText(text, x, y, fill) {
    const oldFont = context.font;

    context.font = " 38px Arial";
    context.lineWidth = 0;
    context.strokeStyle = "grey";
    context.strokeText(text, x, y);

    context.fillStyle = fill;
    context.fillText(text, x, y);

    context.font = oldFont;
}

// Draw outer circle
context.beginPath();
context.arc(centerX, centerY, radius, 0, Math.PI * 2);
context.lineWidth = 5;
context.strokeStyle = "#111";
context.stroke();

// Draw radial lines
for (let i = 0; i < totalDirections; i++) {
    const angle = (-90 + i * 360 / totalDirections) * Math.PI / 180;

    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(x, y);
    context.strokeStyle = "rgba(0,0,0,0.15)";
    context.lineWidth = 2;
    context.setLineDash([6, 10]);
    context.stroke();
}

context.setLineDash([]);

// Draw axes
function drawArrow(x1, y1, x2, y2, color) {
    const head = 18;
    const angle = Math.atan2(y2 - y1, x2 - x1);

    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.stroke();

    context.beginPath();
    context.moveTo(x2, y2);

    context.lineTo(
        x2 - head * Math.cos(angle - Math.PI / 6),
        y2 - head * Math.sin(angle - Math.PI / 6)
    );

    context.lineTo(
        x2 - head * Math.cos(angle + Math.PI / 6),
        y2 - head * Math.sin(angle + Math.PI / 6)
    );

    context.closePath();
    context.fillStyle = color;
    context.fill();
}

// Draw horizontal axis
drawArrow(centerX - radius + 40, centerY, centerX + radius - 40, centerY, HORIZONTAL_COLOUR);
drawArrow(centerX + radius - 40, centerY, centerX - radius + 40, centerY, HORIZONTAL_COLOUR);

// Draw vertical axis
drawArrow(centerX, centerY + radius - 40, centerX, centerY - radius + 40, VERTICAL_COLOUR);
drawArrow(centerX, centerY - radius + 40, centerX, centerY + radius - 40, VERTICAL_COLOUR);

// Draw center box
const boxWidth = 320;
const boxHeight = 220;

context.fillStyle = "#fff";
context.strokeStyle = "#bbb";
context.lineWidth = 3;

context.beginPath();
context.roundRect(centerX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight, 25);
context.fill();
context.stroke();

context.textAlign = "center";

context.fillStyle = HORIZONTAL_COLOUR;
context.font = "bold 32px Arial";
context.fillText("Horizontal%       ", centerX - 20, centerY - 35 - 20);

context.fillStyle = "#000";
context.font = "28px Arial";
context.fillText("(Left / Right)", centerX - 69, centerY + 2 - 20);

context.fillStyle = VERTICAL_COLOUR;
context.font = "bold 32px Arial";
context.fillText("Vertical%", centerX + 80, centerY + 70 - 20);

context.fillStyle = "#000";
context.font = "28px Arial";
context.fillText("(Forward / Back)", centerX + 48, centerY + 107 - 20);

// Draw points and labels
context.font = "bold 34px Arial";
context.textBaseline = "middle";

const colors = ['grey', 'rgb(10, 246, 255)', 'rgb(10, 255, 182)', 'rgb(10, 255, 99)', 'grey', 'rgb(10, 255, 99)', 'rgb(10, 255, 182)', 'rgb(10, 246, 255)', 'grey', 'rgb(10, 246, 255)', 'rgb(10, 255, 182)', 'rgb(10, 255, 99)', 'grey', 'rgb(10, 255, 99)', 'rgb(10, 255, 182)', 'rgb(10, 246, 255)',];

for (let i = 0; i < totalDirections; i++) {

    const angleInDegrees = i * (360 / totalDirections);

    // compass angle with north = 0
    const angleInRadians = degreesToRadians(angleInDegrees);

    // values
    const vertical = Math.abs(Math.round(Math.cos(angleInRadians) * 100));
    const horizontal = Math.abs(Math.round(Math.sin(angleInRadians) * 100));

    const drawAngle = degreesToRadians(angleInDegrees - 90);

    const px = centerX + Math.cos(drawAngle) * radius;
    const py = centerY + Math.sin(drawAngle) * radius;

    // const hue = (angleInDegrees - 90 - 45) * 0.9;

    context.beginPath();
    context.arc(px, py, 10, 0, Math.PI * 2);
    context.fillStyle = `black`;
    context.fill();


    context.beginPath();
    context.arc(px, py, 8, 0, Math.PI * 2);
    context.fillStyle = colors[i]; //angleInDegrees % 90 === 0 ? 'grey' : `hsl(${hue}, 100%, 52%)`; //`hsl(50, 100%, 52%)`;
    context.fill();

    const labelRadius = radius + 80;

    const labelXPosition = centerX + Math.cos(drawAngle) * labelRadius;
    const labelYPosition = centerY + Math.sin(drawAngle) * labelRadius;

    const align =
        Math.cos(drawAngle) > 0.25 ? "left" :
            Math.cos(drawAngle) < -0.25 ? "right" :
                "center";

    const horizontalText = `${horizontal}`;
    const verticalText = `${vertical}`;

    const horizontalWidth = context.measureText(horizontalText).width;
    const slashWidth = context.measureText(" / ").width;
    const verticalWidth = context.measureText(verticalText).width;

    const totalWidth = horizontalWidth + slashWidth + verticalWidth;

    let startX = labelXPosition;

    if (align === "center") {
        startX -= totalWidth / 2;
    }
    else if (align === "right") {
        startX -= totalWidth;
    }

    context.textAlign = "left";

    if (angleInDegrees % 90 !== 0) {
        strokeText(horizontalText, startX, labelYPosition, horizontal == 0 ? "grey" : HORIZONTAL_COLOUR);
        const slashX = startX + horizontalWidth;
        strokeText(" / ", slashX, labelYPosition, "#000000");
        const verticalX = slashX + slashWidth;
        strokeText(verticalText, verticalX, labelYPosition, vertical == 0 ? "grey" : VERTICAL_COLOUR);
    }
}