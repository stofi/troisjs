attribute float magnitude;
attribute float alpha;

attribute float temperature;

varying vec3 vColor;
varying float vMag;
varying vec2 vUv;
varying float vAlpha;
varying float vTemperature;
uniform float uSize;

void main(){
	vAlpha=alpha;
	vMag=magnitude;
	vColor=color;
	vUv=uv;
	vTemperature=temperature;
	vec4 mvPosition=modelViewMatrix*vec4(position,1.);
	gl_PointSize=uSize;
	gl_Position=projectionMatrix*mvPosition;
}