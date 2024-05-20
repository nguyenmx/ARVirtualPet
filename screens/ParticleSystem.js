// ParticleSystem.js
import * as THREE from 'three';

const ParticleSystem = () => {
  const count = 5000;

  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

    velocities[i * 3] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

  const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.030 });

  const particles = new THREE.Points(geometry, material);

  const updateParticles = () => {
    const positions = particles.geometry.attributes.position.array;
    const velocities = particles.geometry.attributes.velocity.array;

    for (let i = 0; i < positions.length / 3; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      if (positions[i * 3 + 1] < -5) {
        positions[i * 3 + 1] = 5;
      }
    }

    particles.geometry.attributes.position.needsUpdate = true;
  };

  return { particles, updateParticles };
};

export default ParticleSystem;
