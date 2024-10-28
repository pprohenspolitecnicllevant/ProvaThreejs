const hdriLoader = new RGBELoader();
hdriLoader.load("hdri/curves.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});
