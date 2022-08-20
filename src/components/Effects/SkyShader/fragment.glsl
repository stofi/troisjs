#ifdef LINT
precision mediump float;
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
#endif

uniform sampler2D tDiffuse;
uniform sampler2D uTexture;
uniform sampler2D uTexture2;
uniform float uTime;
uniform float uFov;
uniform float uAspect;
uniform vec3 uDirection;

#define M_PI 3.14159265358979323846

varying vec4 vColor;
varying vec2 vUv;
varying vec3 vNormal;

/* Color palette */
#define BLACK vec3(0.,0.,0.)
#define WHITE vec3(1.,1.,1.)
#define RED vec3(1.,0.,0.)
#define GREEN vec3(0.,1.,0.)
#define BLUE vec3(0.,0.,1.)
#define YELLOW vec3(1.,1.,0.)
#define CYAN vec3(0.,1.,1.)
#define MAGENTA vec3(1.,0.,1.)
#define ORANGE vec3(1.,.5,0.)
#define PURPLE vec3(1.,0.,.5)
#define LIME vec3(.5,1.,0.)
#define ACQUA vec3(0.,1.,.5)
#define VIOLET vec3(.5,0.,1.)
#define AZUR vec3(0.,.5,1.)

vec4 alphaOverlay(vec4 base,vec4 overlay){
	return base*(1.-overlay.a)+overlay;
}

float map(float value,float start1,float stop1,float start2,float stop2){
	return start2+(stop2-start2)*((value-start1)/(stop1-start1));
}

float reminder(float value,float divisor){
	return value-floor(value/divisor)*divisor;
}

float getAzimuth(vec3 v){
	return atan(v.x,v.z);
}
float getElevation(vec3 v){
	return atan(v.y,length(v.xz));
}
vec2 uvFromAzimuthElevation(float azimuth,float elevation){
	// azimuth is in [0,2pi]
	// elevation is in [-pi/2,pi/2]
	float u=reminder(azimuth,2.*M_PI)/(2.*M_PI);
	float v=(elevation+M_PI/2.)/(M_PI)*.5+.25;
	return vec2(u,v);
}

void main(){
	
	float hFov=uFov*uAspect;
	
	vec2 offset=vUv;
	
	float azimuthOffset=map(offset.x,0.,1.,-hFov/2.,hFov/2.);
	float elevationOffset=map(offset.y,0.,1.,-uFov/2.,uFov/2.);
	
	// float azimuth=getAzimuth(uDirection)+azimuthOffset;
	// float elevation=getElevation(uDirection)+elevationOffset;
	// vec2 sphereUv=uvFromAzimuthElevation(azimuth,elevation);
	// sphereUv.y=1.-sphereUv.y;
	vec4 sampled=texture2D(tDiffuse,vUv);
	// vec4 sky=texture2D(uTexture,sphereUv);
	// sky.r=length(sky.rgb)*sphereUv.x;
	// sky.g=length(sky.rgb)*sphereUv.y;
	
	// gl_FragColor=alphaOverlay(vec4(sphereUv,0.,1.),sampled);
	gl_FragColor=alphaOverlay(vec4(BLACK,1.),sampled);
	// gl_FragColor=alphaOverlay(sky,sampled);
	
}

//
//
//
//
//
//
//
//
//
//
//
//