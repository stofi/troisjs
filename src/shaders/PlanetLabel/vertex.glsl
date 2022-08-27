attribute float magnitude;
attribute float alpha;

attribute float temperature;

varying vec2 vUv;

uniform float uSize;

void main(){
	vUv=uv;
	vec4 mvPosition=modelViewMatrix*vec4(position,1.);
	gl_PointSize=uSize*100.;
	gl_Position=projectionMatrix*mvPosition;
}