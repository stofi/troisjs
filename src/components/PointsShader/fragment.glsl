// uniform sampler2D texture;
varying vec3 vColor;// colors associated to vertices; assigned by vertex shader

varying vec2 vUv;
varying float vSize;

uniform vec3 diffuse;
uniform float opacity;
void main()
{
	
	vec2 uv=vUv-.5;
	float mask=abs(length(uv)-1.);
	float brightness=.5;
	gl_FragColor=vec4(vColor,1.)*mask*brightness;
	// gl_FragColor=vec4(vec3(vUv,0.),1.);
	
}

