import fragment from './fragment.glsl?raw'
import vertex from './vertex.glsl?raw'

const FX = {
  uniforms: {
    tBlackBody: { value: null },
    uMinTemperature: { value: 0.0 },
    uMaxTemperature: { value: 1.0 },
    uMinValue: { value: 0.0 },
    uMaxValue: { value: 1.0 },
    uSize: { value: 1.0 },
  },
  fragmentShader: fragment,
  vertexShader: vertex,
}

export default FX
