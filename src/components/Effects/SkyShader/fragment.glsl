
#ifdef LINT
precision mediump float;
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
#endif

uniform sampler2D tDiffuse;
uniform sampler2D uTexture;
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

vec2 mapUvToSphere(float hFov,float vFov,vec3 direction,float aspect){
	float hFovRad=hFov;
	float vFovRad=vFov;
	float r=length(direction);
	float theta=atan(direction.x/direction.z);
	float phi=atan(direction.y/r);
	float u=theta/hFovRad;
	float v=phi/vFovRad;
	return vec2(u,v);
	
}

void main(){
	
	float hFov=uFov*uAspect;
	
	vec3 rayDirection=uDirection;
	
	vec2 offset=vUv-.5;
	offset.x*=hFov;
	offset.y*=uFov;
	
	rayDirection.x+=sin(offset.x);
	rayDirection.y+=sin(offset.y);
	
	vec2 newUv=mapUvToSphere(hFov,uFov,rayDirection,uAspect);
	vec4 color=vec4(BLACK,1.);
	
	vec4 sampled=texture2D(tDiffuse,vUv);
	// vec4 sampled2=texture2D(tDiffuse,newUv);
	// vec4 sampled3=texture2D(uTexture,newUv);
	
	gl_FragColor=alphaOverlay(color,sampled);
}