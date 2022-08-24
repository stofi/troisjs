import fragment from './fragment.glsl?raw'
import vertex from './vertex.glsl?raw'

const BasicShader = {
  uniforms: {
    uTexture: { value: null },
    uOpacity: { value: 1.0 },
  },
  fragmentShader: fragment,
  vertexShader: vertex,
}

export default BasicShader
