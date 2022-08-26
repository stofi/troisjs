#ifdef LINT
precision mediump float;
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
#endif

#define M_PI 3.14159265358979323846

varying vec4 vColor;
varying vec2 vUv;
varying vec3 vNormal;
uniform sampler2D uTexture;

void main(){
	vec4 color=texture2D(uTexture,vUv);
	float value=color.r+color.g+color.b;
	value=value*.33;
	gl_FragColor=vec4(vUv,1.,1.);
	gl_FragColor=color;
	gl_FragColor.w=value;
}