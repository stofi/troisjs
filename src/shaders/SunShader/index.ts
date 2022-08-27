import fragment from './fragment.glsl?raw'
import vertex from './vertex.glsl?raw'

const SunShader = {
  uniforms: {
    tBlackBody: { value: null },
  },
  fragmentShader: fragment,
  vertexShader: vertex,
}

export default SunShader
