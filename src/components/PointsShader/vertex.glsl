attribute vec3 color;
attribute float size;
varying vec3 vColor;

varying vec2 vUv;
void main()
{
	vColor=vec3(1);// set color associated to vertex; use later in fragment shader
	vec4 mvPosition=modelViewMatrix*vec4(position,1.);
	// gl_PointSize=(size)*(1./length(mvPosition.xyz));
	// gl_PointSize=1.*size;
	gl_Position=projectionMatrix*mvPosition;
}