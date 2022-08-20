import fragment from './fragment.glsl?raw'
import vertex from './vertex.glsl?raw'

const FX = {
  uniforms: {
    tDiffuse: { value: null },
    uTexture: { value: null },
    uTexture2: { value: null },
    uFov: { value: 90 },
    uAspect: { value: 1 },
    uDirection: { value: null },
  },
  fragmentShader: fragment,
  vertexShader: vertex,
}

export default FX
