/**
 * Kids Computer Lab — Confetti Effect
 * Lightweight vanilla JS confetti particle system.
 */

const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

export function throwConfetti(durationMs = 3000) {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  container.style.overflow = 'hidden';
  document.body.appendChild(container);

  const particles = [];
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.backgroundColor = color;
    p.style.position = 'absolute';
    p.style.width = `${Math.random() * 8 + 6}px`;
    p.style.height = `${Math.random() * 12 + 8}px`;
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    
    // Initial positions
    const x = Math.random() * 100;
    const y = -10;
    
    // Physics properties
    const speedY = Math.random() * 3 + 2;
    const speedX = (Math.random() - 0.5) * 3;
    const rotation = Math.random() * 360;
    const rotSpeed = (Math.random() - 0.5) * 10;
    
    p.style.left = `${x}vw`;
    p.style.top = `${y}vh`;
    p.style.transform = `rotate(${rotation}deg)`;
    
    container.appendChild(p);
    particles.push({ el: p, x, y, speedX, speedY, rotation, rotSpeed });
  }

  let animationFrame;
  let startTime = Date.now();

  function animate() {
    const elapsed = Date.now() - startTime;
    if (elapsed > durationMs) {
      container.style.opacity = 1 - (elapsed - durationMs) / 1000;
      if (elapsed > durationMs + 1000) {
        document.body.removeChild(container);
        cancelAnimationFrame(animationFrame);
        return;
      }
    }

    particles.forEach(p => {
      p.y += (p.speedY / 10); // vh units
      p.x += (p.speedX / 10); // vw units
      p.rotation += p.rotSpeed;
      p.el.style.top = `${p.y}vh`;
      p.el.style.left = `${p.x}vw`;
      p.el.style.transform = `rotate(${p.rotation}deg)`;
    });

    animationFrame = requestAnimationFrame(animate);
  }

  animate();
}
