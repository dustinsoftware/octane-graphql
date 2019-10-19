import Component from '@ember/component';

// From https://glitch.com/~three-js
export default class ThreeJsComponent extends Component {
  didInsertElement() {
    this.set('initialTime', performance.now());
    import('three').then(three => {
      this.initThreeJsScene(three);
      this.animate();
    })
  }

  willDestroyElement() {
    if (this.threeRenderer) {
      this.threeRenderer.dispose();
    }
  }

  initThreeJsScene(THREE) {
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

    let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    let material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    this.set('threeRenderer', new THREE.WebGLRenderer({ antialias: true }));
    this.threeRenderer.setSize(window.innerWidth, window.innerHeight);

    if (!this.isDestroying) {
      this.element.querySelector('.three-container').appendChild(this.threeRenderer.domElement);
    }
  }

  animate = () => {
    if (this.isDestroying) {
      return;
    }
    requestAnimationFrame(this.animate);

    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;

    this.threeRenderer.render(this.scene, this.camera);
  }
}
