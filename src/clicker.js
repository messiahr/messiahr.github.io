// https://threejs.org/manual/#en/picking
class Clicker {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.pickedObject = null;
    }
    pick(normalizedPosition, scene, camera) {
      this.raycaster.setFromCamera(normalizedPosition, camera);
      const intersectedObjects = this.raycaster.intersectObjects(
        scene.children,
      );
      if (intersectedObjects.length) {
        this.pickedObject = intersectedObjects[0].object;
      }
    }
}