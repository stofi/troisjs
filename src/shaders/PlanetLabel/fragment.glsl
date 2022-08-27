// uniform sampler2D texture;
varying vec3 vColor;// colors associated to vertices; assigned by vertex shader

varying vec2 vUv;
uniform float uSize;

uniform sampler2D uTexture;

void main()
{
	
	// vec2 uv=vUv-.5;
	vec2 uv=vec2(gl_PointCoord.x,1.-gl_PointCoord.y);
	vec4 color=texture2D(uTexture,uv);
	float value=color.r+color.g+color.b;
	value=value*.33;
	
	gl_FragColor=color;
	gl_FragColor.w=value;
	
}
