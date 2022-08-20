import { defineComponent, PropType } from 'vue'

import { RepeatWrapping, TextureLoader, Vector3, WebGLRenderer } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { Pass } from 'three/examples/jsm/postprocessing/Pass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { Vector2PropInterface } from 'troisjs/src/core/Object3D'

import SkyShader from './SkyShader'

export interface EffectSetupInterface {
  renderer?: WebGLRenderer
  composer?: EffectComposer
  camera?: THREE.PerspectiveCamera
  pass?: Pass
  update: () => void
}
const loader = new TextureLoader()

export default defineComponent({
  name: 'SkyPass',
  // props: {
  //   center: { type: Object as PropType<Vector2PropInterface>, default: () => ({ x: 0.5, y: 0.5 }) },
  //   strength: { type: Number, default: 0.5 },
  // },
  props: {
    renderer: { type: Object as PropType<WebGLRenderer>, required: true },
    composer: { type: Object as PropType<EffectComposer>, required: true },
    camera: {
      type: Object as PropType<THREE.PerspectiveCamera>,
      required: true,
    },
  },

  setup(props): EffectSetupInterface {
    const pass = new ShaderPass(SkyShader)

    const stars = loader.load('sky.jpg')
    stars.wrapS = RepeatWrapping
    stars.wrapT = RepeatWrapping

    pass.uniforms.uTexture.value = stars

    // const constellations = loader.load('constellation.jpg')
    // constellations.wrapS = RepeatWrapping
    // constellations.wrapT = RepeatWrapping

    // pass.uniforms.uTexture2.value = constellations

    const update = () => {
      if (!props.camera) return
      const fov = (props.camera.fov * Math.PI) / 180
      const aspect = props.camera.aspect
      const direction = props.camera.getWorldDirection(new Vector3(0, 0, -1))

      pass.uniforms['uFov'].value = fov
      pass.uniforms['uAspect'].value = aspect
      pass.uniforms['uDirection'].value = direction
    }

    return { pass, update }
  },

  unmounted() {
    if (this.pass) {
      this.composer?.removePass(this.pass)
      ;(this.pass as any).dispose?.()
    }
  },

  created() {
    if (this.pass) {
      this.composer?.addPass(this.pass)
      this.$emit('ready', this.pass)
    }
  },

  render() {
    return []
  },

  __hmrId: 'SkyShaderPass',
})
