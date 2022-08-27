import fragment from './fragment.glsl?raw'
import vertex from './vertex.glsl?raw'

const FX = {
  uniforms: {
    uSize: { value: 1.0 },
    uTexture: { value: null },
  },
  fragmentShader: fragment,
  vertexShader: vertex,
}

export default FX
