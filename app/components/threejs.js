import Component from '@ember/component';
import THREE from 'three';

// From https://glitch.com/~three-js
export default class ThreeJsComponent extends Component {
  didInsertElement() {
    this.initThreeJsScene();
    this.animate();
  }

  willDestroyElement() {
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  initThreeJsScene() {
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

    let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    let material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.three-js-container').appendChild(this.renderer.domElement);
  }

  animate = () => {
    if (this.isDestroying) {
      return;
    }
    requestAnimationFrame(this.animate);

    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;

    this.renderer.render(this.scene, this.camera);
  }
}
