#ifdef LINT
precision mediump float;
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
#endif

#define M_PI 3.14159265358979323846

uniform sampler2D uTexture;
uniform float uOpacity;

varying vec4 vColor;
varying vec2 vUv;
varying vec3 vNormal;

void main(){
	vec4 color=texture2D(uTexture,vUv);
	float value=color.r+color.g+color.b;
	value=value*.33;
	// value=smoothstep(.4,.6,value);
	float opacity=1.-uOpacity*2.;
	opacity=smoothstep(.2,.6,opacity)*.9+.1;
	gl_FragColor=color;
	gl_FragColor.w=value*opacity;
	gl_FragColor.rgb=vec3(opacity);
	
}