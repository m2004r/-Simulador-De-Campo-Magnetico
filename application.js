const canvas = document.getElementById("magneticCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const k = 1; // Constante arbitrária para cálculo da força
const fusionThreshold = 15; // Número mínimo de esferas para fusão
const maxRadius = 165; // Raio máximo para a esfera central
const maxMagneticMoment = 500; // Momento magnético máximo para a esfera central

class MagneticObject {
  constructor(x, y, radius, magneticMoment) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.magneticMoment = magneticMoment;
    this.vx = 0;
    this.vy = 0;
    this.type = "normal"; // "normal" ou "fused"
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.type === "fused" ? "#4caf50" : "#ff5722";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.closePath();
  }

  update(targets) {
    targets.forEach((target) => {
      const dx = target.x - this.x;
      const dy = target.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > this.radius + target.radius) {
        const force =
          (k * this.magneticMoment * target.magneticMoment) /
          (distance * distance);
        const angle = Math.atan2(dy, dx);

        // Aceleração proporcional ao tamanho da esfera
        const accelerationFactor = 1 / (this.radius * 0.1); // Esferas maiores têm aceleração menor
        this.vx += Math.cos(angle) * force * accelerationFactor;
        this.vy += Math.sin(angle) * force * accelerationFactor;
      } else if (this.type === "normal" && target.type === "normal") {
        // União dos campos magnéticos
        this.magneticMoment = Math.min(
          maxMagneticMoment,
          this.magneticMoment + target.magneticMoment
        );
        this.radius = Math.min(
          maxRadius,
          Math.sqrt(this.radius ** 2 + target.radius ** 2)
        );
        targets.splice(targets.indexOf(target), 1);
      }
    });

    this.x += this.vx;
    this.y += this.vy;

    // Reduzindo a velocidade gradativamente (simula resistência do ar)
    this.vx *= 0.95;
    this.vy *= 0.95;
  }
}

const central_magnet = new MagneticObject(
  canvas.width / 2,
  canvas.height / 2,
  30,
  10
);
const spheres = [];

function spawn_sphere() {
  const radius = Math.random() * 10 + 10;
  const magneticMoment = Math.random() * 5 + 1;
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;

  if (
    Math.sqrt((x - central_magnet.x) ** 2 + (y - central_magnet.y) ** 2) >
    central_magnet.radius + radius
  ) {
    spheres.push(new MagneticObject(x, y, radius, magneticMoment));
  }
}

function check_fusion() {
  const fusionGroups = [];

  spheres.forEach((sphere, index) => {
    const group = [sphere];

    for (let i = index + 1; i < spheres.length; i++) {
      const other = spheres[i];
      const dx = other.x - sphere.x;
      const dy = other.y - sphere.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < sphere.radius + other.radius) {
        group.push(other);
      }
    }

    if (group.length >= fusionThreshold) {
      fusionGroups.push(group);
    }
  });

  fusionGroups.forEach((group) => {
    const totalMagneticMoment = group.reduce(
      (sum, obj) => sum + obj.magneticMoment,
      0
    );
    const totalRadius = Math.sqrt(
      group.reduce((sum, obj) => sum + obj.radius ** 2, 0)
    );
    const avgX = group.reduce((sum, obj) => sum + obj.x, 0) / group.length;
    const avgY = group.reduce((sum, obj) => sum + obj.y, 0) / group.length;

    const fusedSphere = new MagneticObject(
      avgX,
      avgY,
      totalRadius,
      totalMagneticMoment
    );
    fusedSphere.type = "fused";

    spheres.push(fusedSphere);

    group.forEach((obj) => {
      const index = spheres.indexOf(obj);
      if (index > -1) spheres.splice(index, 1);
    });
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  central_magnet.draw();
  central_magnet.update(spheres);

  spheres.forEach((sphere) => {
    sphere.draw();
    sphere.update([central_magnet]);
  });

  check_fusion();
  requestAnimationFrame(animate); // API do navegador usado para requsição de animações
}

setInterval(spawn_sphere, 1000); animate();