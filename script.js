<meta name='viewport' content='width=device-width, initial-scale=1'/><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Interactive Canvas Shape Editor</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <h1>Interactive Canvas Shape Editor</h1>
    <p><strong>Complete Name:</strong> Bhea M. Corono</p>
    <p><strong>Sex:</strong> Female</p>
    <p><strong>Address:</strong> Bagacay, San Jose Camarines Sur</p>
    <p><strong>Course, Year, and Section:</strong> BSIT-2A</p>
    <p><strong>Name of School:</strong> Partido State University</p>
    <p><strong>Semester and Academic Year:</strong> 2nd Semester, A.Y. 2024–2025</p>
    <p><strong>Subject Code and Title:</strong> PF2 - Event Driven Programming </p>
    <p><strong>Name of Subject Instructor:</strong> Arjay F. Abio</p>
  </header>

  <main>
    <canvas id="canvas" width="600" height="400"></canvas>
  </main>

  <script src="script.js"></script>
</body>
</html><style>body {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

canvas {
  border: 2px solid #000;
  cursor: pointer;
}</style><script>const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let circles = [];
let selectedCircle = null;
let isDragging = false;

canvas.addEventListener('mousedown', function (e) {
  const { x, y } = getMousePos(e);
  const clicked = getCircleAt(x, y);

  if (clicked) {
    selectedCircle = clicked;
    isDragging = true;
  } else {
    const newCircle = {
      x,
      y,
      r: 20,
      color: 'blue'
    };
    circles.push(newCircle);
    selectedCircle = newCircle;
  }

  drawCircles();
});

canvas.addEventListener('mousemove', function (e) {
  if (isDragging && selectedCircle) {
    const { x, y } = getMousePos(e);
    selectedCircle.x = x;
    selectedCircle.y = y;
    drawCircles();
  }
});

canvas.addEventListener('mouseup', function () {
  isDragging = false;
});

canvas.addEventListener('wheel', function (e) {
  if (selectedCircle) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1 : -1;
    selectedCircle.r = Math.max(5, selectedCircle.r + delta);
    drawCircles();
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Delete' && selectedCircle) {
    circles = circles.filter(c => c !== selectedCircle);
    selectedCircle = null;
    drawCircles();
  }
});

function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function getCircleAt(x, y) {
  for (let i = circles.length - 1; i >= 0; i--) {
    const c = circles[i];
    const dx = x - c.x;
    const dy = y - c.y;
    if (Math.sqrt(dx * dx + dy * dy) <= c.r) return c;
  }
  return null;
}

function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const c of circles) {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = c === selectedCircle ? 'red' : c.color;
    ctx.fill();
    ctx.closePath();
  }
}</script>