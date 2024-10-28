// event javascript per redimensionar de forma responsive
window.addEventListener("resize", () => {
  //actualitzem tamany del renderer, de l'aspect ratio de la càmera, i
  //la matriu de projecció.
  //finalment limitem el pixel ratio a 2 per temes de rendiment
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
