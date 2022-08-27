varying vec3 vColor;

varying vec2 vUv;

uniform sampler2D tBlackBody;

void main()
{
	// 0.631088078022003 == 5600K
	vec4 color=texture2D(tBlackBody,vec2(.6310880780220032,0.));
	gl_FragColor=color;
	
}
