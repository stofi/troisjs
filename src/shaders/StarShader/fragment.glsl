// uniform sampler2D texture;
varying vec3 vColor;// colors associated to vertices; assigned by vertex shader

varying vec2 vUv;
varying float vMag;
varying float vAlpha;
varying float vTemperature;

uniform vec3 diffuse;
uniform float opacity;

uniform float uMinTemperature;
uniform float uMaxTemperature;
uniform float uMinValue;
uniform float uMaxValue;
uniform sampler2D tBlackBody;

void main()
{
	
	// vec2 uv=vUv-.5;
	vec2 uv=gl_PointCoord-.5;
	
	float mask=abs(length(uv)-.5);
	mask=1.-smoothstep(.9,1.,mask);
	float brightness=.5;
	gl_FragColor=vec4(vColor,1.)*mask*brightness;
	
	vec4 color=texture2D(tBlackBody,vec2(vTemperature/1.1,0.));
	// gl_FragColor=vec4(vec3(uv,0.),1.);
	// gl_FragColor=vec4(vColor,vAlpha);
	gl_FragColor=color;
	gl_FragColor.w=mask*(1.-vMag);
	
}
