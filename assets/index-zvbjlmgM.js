(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e,t,n,r,i,a,o,s,c,l=1e3,u=1001,d=1002,f=1003,p=1004,m=1005,h=1006,g=1007,_=1008,v=1009,y=1010,b=1011,x=1012,S=1013,C=1014,w=1015,T=1016,E=1017,D=1018,O=1020,k=35902,A=35899,j=1021,M=1022,N=1023,ee=1026,P=1027,te=1028,ne=1029,re=1030,ie=1031,ae=1033,oe=33776,se=33777,ce=33778,F=33779,I=35840,le=35841,ue=35842,de=35843,fe=36196,L=37492,pe=37496,me=37488,he=37489,ge=37490,_e=37491,ve=37808,ye=37809,be=37810,xe=37811,Se=37812,Ce=37813,we=37814,Te=37815,Ee=37816,De=37817,Oe=37818,ke=37819,Ae=37820,je=37821,R=36492,Me=36494,Ne=36495,Pe=36283,z=36284,Fe=36285,B=36286,V=2300,Ie=2301,Le=2302,Re=2303,ze=2400,Be=2401,Ve=2402,He=3200,Ue=`srgb`,We=`srgb-linear`,Ge=`linear`,Ke=`srgb`,qe=7680,Je=35044,Ye=2e3;function Xe(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ze(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Qe(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function $e(){let e=Qe(`canvas`);return e.style.display=`block`,e}var et={};function tt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function nt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function H(...e){e=nt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function U(...e){e=nt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function rt(...e){let t=e.join(` `);t in et||(et[t]=!0,H(...e))}function it(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var at={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},ot=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},st=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),ct=Math.PI/180,lt=180/Math.PI;function ut(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(st[e&255]+st[e>>8&255]+st[e>>16&255]+st[e>>24&255]+`-`+st[t&255]+st[t>>8&255]+`-`+st[t>>16&15|64]+st[t>>24&255]+`-`+st[n&63|128]+st[n>>8&255]+`-`+st[n>>16&255]+st[n>>24&255]+st[r&255]+st[r>>8&255]+st[r>>16&255]+st[r>>24&255]).toLowerCase()}function dt(e,t,n){return Math.max(t,Math.min(n,e))}function ft(e,t){return(e%t+t)%t}function pt(e,t,n){return(1-n)*e+n*t}function mt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function ht(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function gt(e,t){if(t.constructor===Float32Array)return e;let n=ht(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function _t(e,t){if(t.constructor===Float32Array)return e;let n=ht(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}o=Symbol.iterator;var W=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[o](){yield this.x,yield this.y}};e=W,e.prototype.isVector2=!0;var vt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:H(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};s=Symbol.iterator;var G=class{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return yt.copy(this).projectOnVector(e),this.sub(yt)}reflect(e){return this.sub(yt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[s](){yield this.x,yield this.y,yield this.z}};t=G,t.prototype.isVector3=!0;var yt=new G,bt=new vt,K=class{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return rt(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(xt.makeScale(e,t)),this}rotate(e){return rt(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(xt.makeRotation(-e)),this}translate(e,t){return rt(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(xt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};n=K,n.prototype.isMatrix3=!0;var xt=new K,St=new K().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ct=new K().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wt(){let e={enabled:!0,workingColorSpace:We,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Et(e.r),e.g=Et(e.g),e.b=Et(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Dt(e.r),e.g=Dt(e.g),e.b=Dt(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ge:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[We]:{primaries:t,whitePoint:r,transfer:Ge,toXYZ:St,fromXYZ:Ct,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ue},outputColorSpaceConfig:{drawingBufferColorSpace:Ue}},[Ue]:{primaries:t,whitePoint:r,transfer:Ke,toXYZ:St,fromXYZ:Ct,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ue}}}),e}var Tt=wt();function Et(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Dt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Ot,kt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ot===void 0&&(Ot=Qe(`canvas`)),Ot.width=e.width,Ot.height=e.height;let t=Ot.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Ot}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Qe(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Et(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Et(t[e]/255)*255):t[e]=Et(t[e]);return{data:t,width:e.width,height:e.height}}return H(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},At=0,jt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:At++}),this.uuid=ut(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Mt(r[t].image)):e.push(Mt(r[t]))}else e=Mt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Mt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?kt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(H(`Texture: Unable to serialize Texture.`),{})}var Nt=0,Pt=new G,Ft=class e extends ot{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=u,i=u,a=h,o=_,s=N,c=v,l=e.DEFAULT_ANISOTROPY,d=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nt++}),this.uuid=ut(),this.name=``,this.source=new jt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new W(0,0),this.repeat=new W(1,1),this.center=new W(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new K,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Pt).x}get height(){return this.source.getSize(Pt).y}get depth(){return this.source.getSize(Pt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){H(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?H(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case l:e.x-=Math.floor(e.x);break;case u:e.x=e.x<0?0:1;break;case d:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case l:e.y-=Math.floor(e.y);break;case u:e.y=e.y<0?0:1;break;case d:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ft.DEFAULT_IMAGE=null,Ft.DEFAULT_MAPPING=300,Ft.DEFAULT_ANISOTROPY=1,c=Symbol.iterator;var It=class{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this.w=dt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this.w=dt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[c](){yield this.x,yield this.y,yield this.z,yield this.w}};r=It,r.prototype.isVector4=!0;var Lt=class extends ot{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:h,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new Ft({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:h,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new jt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Rt=class extends Lt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},zt=class extends Ft{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=f,this.minFilter=f,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Bt=class extends Ft{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=f,this.minFilter=f,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},q=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Vt.setFromMatrixColumn(e,0).length(),i=1/Vt.setFromMatrixColumn(e,1).length(),a=1/Vt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ut,e,Wt)}lookAt(e,t,n){let r=this.elements;return qt.subVectors(e,t),qt.lengthSq()===0&&(qt.z=1),qt.normalize(),Gt.crossVectors(n,qt),Gt.lengthSq()===0&&(Math.abs(n.z)===1?qt.x+=1e-4:qt.z+=1e-4,qt.normalize(),Gt.crossVectors(n,qt)),Gt.normalize(),Kt.crossVectors(qt,Gt),r[0]=Gt.x,r[4]=Kt.x,r[8]=qt.x,r[1]=Gt.y,r[5]=Kt.y,r[9]=qt.y,r[2]=Gt.z,r[6]=Kt.z,r[10]=qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],ee=r[7],P=r[11],te=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*ee,i[8]=a*C+o*D+s*j+c*P,i[12]=a*w+o*O+s*M+c*te,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*ee,i[9]=l*C+u*D+d*j+f*P,i[13]=l*w+u*O+d*M+f*te,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*ee,i[10]=p*C+m*D+h*j+g*P,i[14]=p*w+m*O+h*M+g*te,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*ee,i[11]=_*C+v*D+y*j+b*P,i[15]=_*w+v*O+y*M+b*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Vt.set(r[0],r[1],r[2]).length(),o=Vt.set(r[4],r[5],r[6]).length(),s=Vt.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Ht.copy(this);let c=1/a,l=1/o,u=1/s;return Ht.elements[0]*=c,Ht.elements[1]*=c,Ht.elements[2]*=c,Ht.elements[4]*=l,Ht.elements[5]*=l,Ht.elements[6]*=l,Ht.elements[8]*=u,Ht.elements[9]*=u,Ht.elements[10]*=u,t.setFromRotationMatrix(Ht),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Ye,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ye,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};i=q,i.prototype.isMatrix4=!0;var Vt=new G,Ht=new q,Ut=new G(0,0,0),Wt=new G(1,1,1),Gt=new G,Kt=new G,qt=new G,Jt=new q,Yt=new vt,Xt=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-dt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(dt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-dt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(dt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:H(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Jt.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Jt,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Yt.setFromEuler(this),this.setFromQuaternion(Yt,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Xt.DEFAULT_ORDER=`XYZ`;var Zt=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Qt=0,$t=new G,en=new vt,tn=new q,nn=new G,rn=new G,an=new G,on=new vt,sn=new G(1,0,0),cn=new G(0,1,0),ln=new G(0,0,1),un={type:`added`},dn={type:`removed`},fn={type:`childadded`,child:null},pn={type:`childremoved`,child:null},mn=class e extends ot{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qt++}),this.uuid=ut(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new G,n=new Xt,r=new vt,i=new G(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new q},normalMatrix:{value:new K}}),this.matrix=new q,this.matrixWorld=new q,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zt,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return en.setFromAxisAngle(e,t),this.quaternion.multiply(en),this}rotateOnWorldAxis(e,t){return en.setFromAxisAngle(e,t),this.quaternion.premultiply(en),this}rotateX(e){return this.rotateOnAxis(sn,e)}rotateY(e){return this.rotateOnAxis(cn,e)}rotateZ(e){return this.rotateOnAxis(ln,e)}translateOnAxis(e,t){return $t.copy(e).applyQuaternion(this.quaternion),this.position.add($t.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(sn,e)}translateY(e){return this.translateOnAxis(cn,e)}translateZ(e){return this.translateOnAxis(ln,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(tn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?nn.copy(e):nn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),rn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?tn.lookAt(rn,nn,this.up):tn.lookAt(nn,rn,this.up),this.quaternion.setFromRotationMatrix(tn),r&&(tn.extractRotation(r.matrixWorld),en.setFromRotationMatrix(tn),this.quaternion.premultiply(en.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(U(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(un),fn.child=e,this.dispatchEvent(fn),fn.child=null):U(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(dn),pn.child=e,this.dispatchEvent(pn),pn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(tn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(un),fn.child=e,this.dispatchEvent(fn),fn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rn,e,an),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rn,on,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};mn.DEFAULT_UP=new G(0,1,0),mn.DEFAULT_MATRIX_AUTO_UPDATE=!0,mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var hn=class extends mn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},gn={type:`move`},_n=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new hn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},vn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yn={h:0,s:0,l:0},bn={h:0,s:0,l:0};function xn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var J=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ue){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Tt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Tt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Tt.workingColorSpace){if(e=ft(e,1),t=dt(t,0,1),n=dt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=xn(i,r,e+1/3),this.g=xn(i,r,e),this.b=xn(i,r,e-1/3)}return Tt.colorSpaceToWorking(this,r),this}setStyle(e,t=Ue){function n(t){t!==void 0&&parseFloat(t)<1&&H(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:H(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);H(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ue){let n=vn[e.toLowerCase()];return n===void 0?H(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Et(e.r),this.g=Et(e.g),this.b=Et(e.b),this}copyLinearToSRGB(e){return this.r=Dt(e.r),this.g=Dt(e.g),this.b=Dt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ue){return Tt.workingToColorSpace(Sn.copy(this),e),Math.round(dt(Sn.r*255,0,255))*65536+Math.round(dt(Sn.g*255,0,255))*256+Math.round(dt(Sn.b*255,0,255))}getHexString(e=Ue){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Tt.workingColorSpace){Tt.workingToColorSpace(Sn.copy(this),t);let n=Sn.r,r=Sn.g,i=Sn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Tt.workingColorSpace){return Tt.workingToColorSpace(Sn.copy(this),t),e.r=Sn.r,e.g=Sn.g,e.b=Sn.b,e}getStyle(e=Ue){Tt.workingToColorSpace(Sn.copy(this),e);let t=Sn.r,n=Sn.g,r=Sn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(yn),this.setHSL(yn.h+e,yn.s+t,yn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(yn),e.getHSL(bn);let n=pt(yn.h,bn.h,t),r=pt(yn.s,bn.s,t),i=pt(yn.l,bn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Sn=new J;J.NAMES=vn;var Cn=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new J(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},wn=class extends mn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xt,this.environmentIntensity=1,this.environmentRotation=new Xt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Tn=new G,En=new G,Dn=new G,On=new G,kn=new G,An=new G,jn=new G,Mn=new G,Nn=new G,Pn=new G,Fn=new It,In=new It,Ln=new It,Rn=class e{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Tn.subVectors(e,t),r.cross(Tn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Tn.subVectors(r,t),En.subVectors(n,t),Dn.subVectors(e,t);let a=Tn.dot(Tn),o=Tn.dot(En),s=Tn.dot(Dn),c=En.dot(En),l=En.dot(Dn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,On)!==null&&On.x>=0&&On.y>=0&&On.x+On.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,On)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,On.x),s.addScaledVector(a,On.y),s.addScaledVector(o,On.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Fn.setScalar(0),In.setScalar(0),Ln.setScalar(0),Fn.fromBufferAttribute(e,t),In.fromBufferAttribute(e,n),Ln.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Fn,i.x),a.addScaledVector(In,i.y),a.addScaledVector(Ln,i.z),a}static isFrontFacing(e,t,n,r){return Tn.subVectors(n,t),En.subVectors(e,t),Tn.cross(En).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Tn.subVectors(this.c,this.b),En.subVectors(this.a,this.b),Tn.cross(En).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;kn.subVectors(r,n),An.subVectors(i,n),Mn.subVectors(e,n);let s=kn.dot(Mn),c=An.dot(Mn);if(s<=0&&c<=0)return t.copy(n);Nn.subVectors(e,r);let l=kn.dot(Nn),u=An.dot(Nn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(kn,a);Pn.subVectors(e,i);let f=kn.dot(Pn),p=An.dot(Pn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(An,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return jn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(jn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(kn,a).addScaledVector(An,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},zn=class{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Vn):Vn.fromBufferAttribute(r,t),Vn.applyMatrix4(e.matrixWorld),this.expandByPoint(Vn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Hn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Hn.copy(e.boundingBox)),Hn.applyMatrix4(e.matrixWorld),this.union(Hn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vn),Vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yn),Xn.subVectors(this.max,Yn),Un.subVectors(e.a,Yn),Wn.subVectors(e.b,Yn),Gn.subVectors(e.c,Yn),Kn.subVectors(Wn,Un),qn.subVectors(Gn,Wn),Jn.subVectors(Un,Gn);let t=[0,-Kn.z,Kn.y,0,-qn.z,qn.y,0,-Jn.z,Jn.y,Kn.z,0,-Kn.x,qn.z,0,-qn.x,Jn.z,0,-Jn.x,-Kn.y,Kn.x,0,-qn.y,qn.x,0,-Jn.y,Jn.x,0];return!$n(t,Un,Wn,Gn,Xn)||(t=[1,0,0,0,1,0,0,0,1],!$n(t,Un,Wn,Gn,Xn))?!1:(Zn.crossVectors(Kn,qn),t=[Zn.x,Zn.y,Zn.z],$n(t,Un,Wn,Gn,Xn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Bn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Bn=[new G,new G,new G,new G,new G,new G,new G,new G],Vn=new G,Hn=new zn,Un=new G,Wn=new G,Gn=new G,Kn=new G,qn=new G,Jn=new G,Yn=new G,Xn=new G,Zn=new G,Qn=new G;function $n(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Qn.fromArray(e,a);let o=i.x*Math.abs(Qn.x)+i.y*Math.abs(Qn.y)+i.z*Math.abs(Qn.z),s=t.dot(Qn),c=n.dot(Qn),l=r.dot(Qn);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var er=new G,tr=new W,nr=0,rr=class extends ot{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:nr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Je,this.updateRanges=[],this.gpuType=w,this.version=0,this._normalizationScale=e===void 0?void 0:ht(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)tr.fromBufferAttribute(this,t),tr.applyMatrix3(e),this.setXY(t,tr.x,tr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)er.fromBufferAttribute(this,t),er.applyMatrix3(e),this.setXYZ(t,er.x,er.y,er.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)er.fromBufferAttribute(this,t),er.applyMatrix4(e),this.setXYZ(t,er.x,er.y,er.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)er.fromBufferAttribute(this,t),er.applyNormalMatrix(e),this.setXYZ(t,er.x,er.y,er.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)er.fromBufferAttribute(this,t),er.transformDirection(e),this.setXYZ(t,er.x,er.y,er.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?gt(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?_t(e,this.array):Math.round(e*t)}},ir=class extends rr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},ar=class extends rr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Y=class extends rr{constructor(e,t,n){super(new Float32Array(e),t,n)}},or=new zn,sr=new G,cr=new G,lr=class{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?or.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;sr.subVectors(e,this.center);let t=sr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(sr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(cr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(sr.copy(e.center).add(cr)),this.expandByPoint(sr.copy(e.center).sub(cr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ur=0,dr=new q,fr=new mn,pr=new G,mr=new zn,hr=new zn,gr=new G,_r=class e extends ot{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ur++}),this.uuid=ut(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Xe(e)?ar:ir)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new K().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return dr.makeRotationFromQuaternion(e),this.applyMatrix4(dr),this}rotateX(e){return dr.makeRotationX(e),this.applyMatrix4(dr),this}rotateY(e){return dr.makeRotationY(e),this.applyMatrix4(dr),this}rotateZ(e){return dr.makeRotationZ(e),this.applyMatrix4(dr),this}translate(e,t,n){return dr.makeTranslation(e,t,n),this.applyMatrix4(dr),this}scale(e,t,n){return dr.makeScale(e,t,n),this.applyMatrix4(dr),this}lookAt(e){return fr.lookAt(e),fr.updateMatrix(),this.applyMatrix4(fr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pr).negate(),this.translate(pr.x,pr.y,pr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Y(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&H(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)U(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];mr.setFromBufferAttribute(n),this.morphTargetsRelative?(gr.addVectors(this.boundingBox.min,mr.min),this.boundingBox.expandByPoint(gr),gr.addVectors(this.boundingBox.max,mr.max),this.boundingBox.expandByPoint(gr)):(this.boundingBox.expandByPoint(mr.min),this.boundingBox.expandByPoint(mr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&U(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new lr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)U(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new G,1/0);else if(e){let n=this.boundingSphere.center;if(mr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];hr.setFromBufferAttribute(n),this.morphTargetsRelative?(gr.addVectors(mr.min,hr.min),mr.expandByPoint(gr),gr.addVectors(mr.max,hr.max),mr.expandByPoint(gr)):(mr.expandByPoint(hr.min),mr.expandByPoint(hr.max))}mr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)gr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(gr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)gr.fromBufferAttribute(a,t),o&&(pr.fromBufferAttribute(e,t),gr.add(pr)),r=Math.max(r,n.distanceToSquared(gr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&U(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){U(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new rr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new G,s[e]=new G;let l=new G,u=new G,d=new G,f=new W,p=new W,m=new W,h=new G,g=new G;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new G,b=new G,x=new G,S=new G;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new rr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new G,i=new G,a=new G,o=new G,s=new G,c=new G,l=new G,u=new G;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gr.fromBufferAttribute(e,t),gr.normalize(),e.setXYZ(t,gr.x,gr.y,gr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new rr(a,r,i)}if(this.index===null)return H(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},vr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Je,this.updateRanges=[],this.version=0,this.uuid=ut()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=yr(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),r=new this.constructor(n,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=yr(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function yr(e){return e.buffer._uuid===void 0&&(e.buffer._uuid=ut()),e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e.buffer._uuid:e.buffer._uuid+`:`+e.byteOffset+`:`+e.byteLength}var br=new G,xr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r,this._normalizationScale=e===void 0?void 0:ht(e.array)}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyMatrix4(e),this.setXYZ(t,br.x,br.y,br.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyNormalMatrix(e),this.setXYZ(t,br.x,br.y,br.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.transformDirection(e),this.setXYZ(t,br.x,br.y,br.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){tt(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new rr(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){tt(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t===void 0?gt(e,this.data.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?_t(e,this.data.array):Math.round(e*t)}},Sr=new G,Cr=new G,wr=new K,Tr=class{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Sr.subVectors(n,t).cross(Cr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Sr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||wr.getNormalMatrix(e),r=this.coplanarPoint(Sr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Er=0,Dr=class extends ot{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Er++}),this.uuid=ut(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new J(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qe,this.stencilZFail=qe,this.stencilZPass=qe,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){H(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?H(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new J().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Tr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new W().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new W().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Or=class extends Dr{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new J(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},kr,Ar=new G,jr=new G,Mr=new G,Nr=new W,Pr=new W,Fr=new q,Ir=new G,Lr=new G,Rr=new G,zr=new W,Br=new W,Vr=new W,Hr=class extends mn{constructor(e=new Or){if(super(),this.isSprite=!0,this.type=`Sprite`,kr===void 0){kr=new _r;let e=new vr(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);kr.setIndex([0,1,2,0,2,3]),kr.setAttribute(`position`,new xr(e,3,0,!1)),kr.setAttribute(`uv`,new xr(e,2,3,!1))}this.geometry=kr,this.material=e,this.center=new W(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&U(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),jr.setFromMatrixScale(this.matrixWorld),Fr.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Mr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&jr.multiplyScalar(-Mr.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;Ur(Ir.set(-.5,-.5,0),Mr,a,jr,r,i),Ur(Lr.set(.5,-.5,0),Mr,a,jr,r,i),Ur(Rr.set(.5,.5,0),Mr,a,jr,r,i),zr.set(0,0),Br.set(1,0),Vr.set(1,1);let o=e.ray.intersectTriangle(Ir,Lr,Rr,!1,Ar);if(o===null&&(Ur(Lr.set(-.5,.5,0),Mr,a,jr,r,i),Br.set(0,1),o=e.ray.intersectTriangle(Ir,Rr,Lr,!1,Ar),o===null))return;let s=e.ray.origin.distanceTo(Ar);s<e.near||s>e.far||t.push({distance:s,point:Ar.clone(),uv:Rn.getInterpolation(Ar,Ir,Lr,Rr,zr,Br,Vr,new W),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function Ur(e,t,n,r,i,a){Nr.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Pr.copy(Nr):(Pr.x=a*Nr.x-i*Nr.y,Pr.y=i*Nr.x+a*Nr.y),e.copy(t),e.x+=Pr.x,e.y+=Pr.y,e.applyMatrix4(Fr)}var Wr=new G,Gr=new G,Kr=new G,qr=new G,Jr=class{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Wr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wr.copy(this.origin).addScaledVector(this.direction,t),Wr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Gr.copy(e).add(t).multiplyScalar(.5),Kr.copy(t).sub(e).normalize(),qr.copy(this.origin).sub(Gr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Kr),o=qr.dot(this.direction),s=-qr.dot(Kr),c=qr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Gr).addScaledVector(Kr,d),f}intersectSphere(e,t){if(e.radius<0)return null;Wr.subVectors(e.center,this.origin);let n=Wr.dot(this.direction),r=Wr.dot(Wr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Wr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let ee=S/w,P=C/w,te=1/w,ne=T-ee*D,re=E-P*D,ie=O-ee*A,ae=k-P*A,oe=j-ee*N,se=M-P*N,ce=oe*ae-se*ie,F=ne*se-re*oe,I=ie*re-ae*ne;if(r){if(ce<0||F<0||I<0)return null}else if((ce<0||F<0||I<0)&&(ce>0||F>0||I>0))return null;let le=ce+F+I;if(le===0)return null;let ue=te*(ce*D+F*A+I*N);return(le>0?ue<0:ue>0)?null:this.at(ue/le,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Yr=class extends Dr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xt,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Xr=new q,Zr=new Jr,Qr=new lr,$r=new G,ei=new G,ti=new G,ni=new G,ri=new G,ii=new G,ai=new G,oi=new G,X=class extends mn{constructor(e=new _r,t=new Yr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){ii.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(ri.fromBufferAttribute(s,e),a?ii.addScaledVector(ri,r):ii.addScaledVector(ri.sub(t),r))}t.add(ii)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Qr.copy(n.boundingSphere),Qr.applyMatrix4(i),Zr.copy(e.ray).recast(e.near),Qr.containsPoint(Zr.origin)===!1&&(Zr.intersectSphere(Qr,$r)===null||Zr.origin.distanceToSquared($r)>(e.far-e.near)**2)||(Xr.copy(i).invert(),Zr.copy(e.ray).applyMatrix4(Xr),(n.boundingBox===null||Zr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Zr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=ci(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=ci(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=ci(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=ci(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function si(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;oi.copy(s),oi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(oi);return l<n.near||l>n.far?null:{distance:l,point:oi.clone(),object:e}}function ci(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,ei),e.getVertexPosition(c,ti),e.getVertexPosition(l,ni);let u=si(e,t,n,r,ei,ti,ni,ai);if(u){let e=new G;Rn.getBarycoord(ai,ei,ti,ni,e),i&&(u.uv=Rn.getInterpolatedAttribute(i,s,c,l,e,new W)),a&&(u.uv1=Rn.getInterpolatedAttribute(a,s,c,l,e,new W)),o&&(u.normal=Rn.getInterpolatedAttribute(o,s,c,l,e,new G),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new G,materialIndex:0};Rn.getNormal(ei,ti,ni,t.normal),u.face=t,u.barycoord=e}return u}var li=class extends Ft{constructor(e=null,t=1,n=1,r,i,a,o,s,c=f,l=f,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ui=class extends rr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},di=new q,fi=new q,pi=[],mi=new zn,hi=new q,gi=new X,_i=new lr,vi=class extends X{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ui(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,hi)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,di),mi.copy(e.boundingBox).applyMatrix4(di),this.boundingBox.union(mi)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new lr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,di),_i.copy(e.boundingSphere).applyMatrix4(di),this.boundingSphere.union(_i)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture===null?null:e.morphTexture.clone(),this.instanceColor=e.instanceColor===null?null:e.instanceColor.clone(),this.count=e.count,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(gi.geometry=this.geometry,gi.material=this.material,gi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_i.copy(this.boundingSphere),_i.applyMatrix4(n),e.ray.intersectsSphere(_i)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,di),fi.multiplyMatrices(n,di),gi.matrixWorld=fi,gi.raycast(e,pi);for(let e=0,n=pi.length;e<n;e++){let n=pi[e];n.instanceId=i,n.object=this,t.push(n)}pi.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ui(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new li(new Float32Array(r*this.count),r,this.count,te,w));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},yi=new lr,bi=new W(.5,.5),xi=new G,Si=class{constructor(e=new Tr,t=new Tr,n=new Tr,r=new Tr,i=new Tr,a=new Tr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ye,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(e){return yi.center.set(0,0,0),yi.radius=.7071067811865476+bi.distanceTo(e.center),yi.applyMatrix4(e.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(xi.x=r.normal.x>0?e.max.x:e.min.x,xi.y=r.normal.y>0?e.max.y:e.min.y,xi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(xi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ci=new q,wi=class e{constructor(){this.coordinateSystem=Ye,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];Ci.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new Si),n[e].setFromProjectionMatrix(Ci,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Si),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},Ti=class extends Dr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new J(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ei=new G,Di=new G,Oi=new q,ki=new Jr,Ai=new lr,ji=new G,Mi=new G,Ni=class extends mn{constructor(e=new _r,t=new Ti){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Ei.fromBufferAttribute(t,e-1),Di.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Ei.distanceTo(Di);e.setAttribute(`lineDistance`,new Y(n,1))}else H(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ai.copy(n.boundingSphere),Ai.applyMatrix4(r),Ai.radius+=i,e.ray.intersectsSphere(Ai)===!1)return;Oi.copy(r).invert(),ki.copy(e.ray).applyMatrix4(Oi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Pi(this,e,ki,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Pi(this,e,ki,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Pi(this,e,ki,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Pi(this,e,ki,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Pi(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Ei.fromBufferAttribute(s,i),Di.fromBufferAttribute(s,a),n.distanceSqToSegment(Ei,Di,ji,Mi)>r)return;ji.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(ji);if(!(c<t.near||c>t.far))return{distance:c,point:Mi.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Fi=class extends Ft{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ii=class extends Ft{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Li=class extends Ft{constructor(e,t,n=C,r,i,a,o=f,s=f,c,l=ee,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new jt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ri=class extends Li{constructor(e,t=C,n=301,r,i,a=f,o=f,s,c=ee){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},zi=class extends Ft{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Bi=class e extends _r{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Y(c,3)),this.setAttribute(`normal`,new Y(l,3)),this.setAttribute(`uv`,new Y(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new G;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Vi=class e extends _r{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new G,l=new W;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new Y(a,3)),this.setAttribute(`normal`,new Y(o,3)),this.setAttribute(`uv`,new Y(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Hi=class e extends _r{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Y(u,3)),this.setAttribute(`normal`,new Y(d,3)),this.setAttribute(`uv`,new Y(f,2));function _(){let a=new G,_=new G,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new W,m=new G,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ui=class e extends Hi{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Wi=class e extends _r{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Y(i,3)),this.setAttribute(`normal`,new Y(i.slice(),3)),this.setAttribute(`uv`,new Y(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new G,r=new G,i=new G;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new G;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new G;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new G,t=new G,n=new G,r=new G,o=new W,s=new W,c=new W;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Gi=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){H(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new W:new G);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new G,r=[],i=[],a=[],o=new G,s=new q;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new G)}i[0]=new G,a[0]=new G;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(dt(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(dt(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},Ki=class extends Gi{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new W){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},qi=class extends Ki{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Ji(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Yi=new G,Xi=new G,Zi=new Ji,Qi=new Ji,$i=new Ji,ea=class extends Gi{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new G){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Xi.subVectors(r[0],r[1]).add(r[0]),c=Xi);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Yi.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Yi),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Zi.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Qi.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),$i.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Zi.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Qi.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),$i.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Zi.calc(s),Qi.calc(s),$i.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new G().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ta(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function na(e,t){let n=1-e;return n*n*t}function ra(e,t){return 2*(1-e)*e*t}function ia(e,t){return e*e*t}function aa(e,t,n,r){return na(e,t)+ra(e,n)+ia(e,r)}function oa(e,t){let n=1-e;return n*n*n*t}function sa(e,t){let n=1-e;return 3*n*n*e*t}function ca(e,t){return 3*(1-e)*e*e*t}function la(e,t){return e*e*e*t}function ua(e,t,n,r,i){return oa(e,t)+sa(e,n)+ca(e,r)+la(e,i)}var da=class extends Gi{constructor(e=new W,t=new W,n=new W,r=new W){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ua(e,r.x,i.x,a.x,o.x),ua(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},fa=class extends Gi{constructor(e=new G,t=new G,n=new G,r=new G){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ua(e,r.x,i.x,a.x,o.x),ua(e,r.y,i.y,a.y,o.y),ua(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},pa=class extends Gi{constructor(e=new W,t=new W){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new W){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new W){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ma=class extends Gi{constructor(e=new G,t=new G){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new G){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new G){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ha=class extends Gi{constructor(e=new W,t=new W,n=new W){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(aa(e,r.x,i.x,a.x),aa(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ga=class extends Gi{constructor(e=new G,t=new G,n=new G){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(aa(e,r.x,i.x,a.x),aa(e,r.y,i.y,a.y),aa(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_a=class extends Gi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new W){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(ta(o,s.x,c.x,l.x,u.x),ta(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new W().fromArray(n))}return this}},va=Object.freeze({__proto__:null,ArcCurve:qi,CatmullRomCurve3:ea,CubicBezierCurve:da,CubicBezierCurve3:fa,EllipseCurve:Ki,LineCurve:pa,LineCurve3:ma,QuadraticBezierCurve:ha,QuadraticBezierCurve3:ga,SplineCurve:_a}),ya=class extends Gi{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new va[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new va[n.type]().fromJSON(n))}return this.cacheLengths=null,this}},ba=class extends ya{constructor(e){super(),this.type=`Path`,this.currentPoint=new W,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new pa(this.currentPoint.clone(),new W(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new ha(this.currentPoint.clone(),new W(e,t),new W(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new da(this.currentPoint.clone(),new W(e,t),new W(n,r),new W(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new _a([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new Ki(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},xa=class extends ba{constructor(e){super(e),this.uuid=ut(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new ba().fromJSON(n))}return this}};function Sa(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=Ca(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=Aa(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return Ta(a,o,n,s,c,l,0),o}function Ca(e,t,n,r,i){let a;if(i===eo(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=Za(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=Za(i/r|0,e[i],e[i+1],a);return a&&Ua(a,a.next)&&(Qa(a),a=a.next),a}function wa(e,t){if(!e)return e;t||(t=e);let n=e,r;do if(r=!1,!n.steiner&&(Ua(n,n.next)||Ha(n.prev,n,n.next)===0)){if(Qa(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function Ta(e,t,n,r,i,a,o){if(!e)return;!o&&a&&Fa(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?Da(e,r,i,a):Ea(e))t.push(c.i,e.i,l.i),Qa(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=Oa(wa(e),t),Ta(e,t,n,r,i,a,2)):o===2&&ka(e,t,n,r,i,a):Ta(wa(e),t,n,r,i,a,1);break}}}function Ea(e){let t=e.prev,n=e,r=e.next;if(Ha(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Ba(i,s,a,c,o,l,m.x,m.y)&&Ha(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Da(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Ha(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=La(p,m,t,n,r),v=La(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Ba(s,u,c,d,l,f,y.x,y.y)&&Ha(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Ba(s,u,c,d,l,f,b.x,b.y)&&Ha(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Ba(s,u,c,d,l,f,y.x,y.y)&&Ha(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Ba(s,u,c,d,l,f,b.x,b.y)&&Ha(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Oa(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Ua(r,i)&&Wa(r,n,n.next,i)&&Ja(r,i)&&Ja(i,r)&&(t.push(r.i,n.i,i.i),Qa(n),Qa(n.next),n=e=i),n=n.next}while(n!==e);return wa(n)}function ka(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&Va(o,e)){let s=Xa(o,e);o=wa(o,o.next),s=wa(s,s.next),Ta(o,t,n,r,i,a,0),Ta(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function Aa(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=Ca(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(Ra(o))}i.sort(ja);for(let e=0;e<i.length;e++)n=Ma(i[e],n);return n}function ja(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function Ma(e,t){let n=Na(e,t);if(!n)return t;let r=Xa(n,e);return wa(r,r.next),wa(n,n.next)}function Na(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Ua(e,n))return n;do{if(Ua(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&za(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Ja(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&Pa(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function Pa(e,t){return Ha(e.prev,e,t.prev)<0&&Ha(t.next,e,e.next)<0}function Fa(e,t,n,r){let i=e;do i.z===0&&(i.z=La(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,Ia(i)}function Ia(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function La(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Ra(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function za(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Ba(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&za(e,t,n,r,i,a,o,s)}function Va(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!qa(e,t)&&(Ja(e,t)&&Ja(t,e)&&Ya(e,t)&&(Ha(e.prev,e,t.prev)||Ha(e,t.prev,t))||Ua(e,t)&&Ha(e.prev,e,e.next)>0&&Ha(t.prev,t,t.next)>0)}function Ha(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Ua(e,t){return e.x===t.x&&e.y===t.y}function Wa(e,t,n,r){let i=Ka(Ha(e,t,n)),a=Ka(Ha(e,t,r)),o=Ka(Ha(n,r,e)),s=Ka(Ha(n,r,t));return!!(i!==a&&o!==s||i===0&&Ga(e,n,t)||a===0&&Ga(e,r,t)||o===0&&Ga(n,e,r)||s===0&&Ga(n,t,r))}function Ga(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Ka(e){return e>0?1:e<0?-1:0}function qa(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&Wa(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Ja(e,t){return Ha(e.prev,e,e.next)<0?Ha(e,t,e.next)>=0&&Ha(e,e.prev,t)>=0:Ha(e,t,e.prev)<0||Ha(e,e.next,t)<0}function Ya(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Xa(e,t){let n=$a(e.i,e.x,e.y),r=$a(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function Za(e,t,n,r){let i=$a(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Qa(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function $a(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function eo(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var to=class{static triangulate(e,t,n=2){return Sa(e,t,n)}},no=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];ro(e),io(n,e);let a=e.length;t.forEach(ro);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,io(n,t[e]);let o=to.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function ro(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function io(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var ao=class e extends Wi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},oo=class e extends _r{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Y(p,3)),this.setAttribute(`normal`,new Y(m,3)),this.setAttribute(`uv`,new Y(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},so=class e extends _r{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new G,p=new W;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Y(s,3)),this.setAttribute(`normal`,new Y(c,3)),this.setAttribute(`uv`,new Y(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},co=class e extends _r{constructor(e=new xa([new W(0,.5),new W(-.5,-.5),new W(.5,-.5)]),t=12){super(),this.type=`ShapeGeometry`,this.parameters={shapes:e,curveSegments:t};let n=[],r=[],i=[],a=[],o=0,s=0;if(Array.isArray(e)===!1)c(e);else for(let t=0;t<e.length;t++)c(e[t]),this.addGroup(o,s,t),o+=s,s=0;this.setIndex(n),this.setAttribute(`position`,new Y(r,3)),this.setAttribute(`normal`,new Y(i,3)),this.setAttribute(`uv`,new Y(a,2));function c(e){let o=r.length/3,c=e.extractPoints(t),l=c.shape,u=c.holes;no.isClockWise(l)===!1&&(l=l.reverse());for(let e=0,t=u.length;e<t;e++){let t=u[e];no.isClockWise(t)===!0&&(u[e]=t.reverse())}let d=no.triangulateShape(l,u);for(let e=0,t=u.length;e<t;e++){let t=u[e];l=l.concat(t)}for(let e=0,t=l.length;e<t;e++){let t=l[e];r.push(t.x,t.y,0),i.push(0,0,1),a.push(t.x,t.y)}for(let e=0,t=d.length;e<t;e++){let t=d[e],r=t[0]+o,i=t[1]+o,a=t[2]+o;n.push(r,i,a),s+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return lo(t,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}return new e(r,t.curveSegments)}};function lo(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}var uo=class e extends _r{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new G,d=new G,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Y(p,3)),this.setAttribute(`normal`,new Y(m,3)),this.setAttribute(`uv`,new Y(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function fo(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(mo(i))i.isRenderTargetTexture?(H(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(mo(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function po(e){let t={};for(let n=0;n<e.length;n++){let r=fo(e[n]);for(let e in r)t[e]=r[e]}return t}function mo(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function ho(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function go(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Tt.workingColorSpace}var _o={clone:fo,merge:po},vo=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yo=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,bo=class extends Dr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vo,this.fragmentShader=yo,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=fo(e.uniforms),this.uniformsGroups=ho(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new J().setHex(r.value);break;case`v2`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new It().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new q().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},xo=class extends bo{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},So=class extends Dr{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type=`MeshPhongMaterial`,this.color=new J(16777215),this.specular=new J(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new J(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xt,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Co=class extends Dr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new J(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xt,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},wo=class extends Dr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=He,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},To=class extends Dr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Eo(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Do(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Oo=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ko=class extends Oo{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ze,endingEnd:ze}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Be:i=e,o=2*t-n;break;case Ve:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Be:a=e,s=2*n-t;break;case Ve:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ao=class extends Oo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},jo=class extends Oo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Mo=class extends Oo{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Fo(n,t,g,y,r);i[p]=No(x,o,_,b,m)}return i}};function No(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Po(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Fo(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=No(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Po(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Io=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Eo(t,this.TimeBufferType),this.values=Eo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Eo(e.times,Array),values:Eo(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Do(e.settings)&&(n.settings={inTangents:Eo(e.settings.inTangents,Array),outTangents:Eo(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new jo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ao(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ko(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Mo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case V:t=this.InterpolantFactoryMethodDiscrete;break;case Ie:t=this.InterpolantFactoryMethodLinear;break;case Le:t=this.InterpolantFactoryMethodSmooth;break;case Re:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return H(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return V;case this.InterpolantFactoryMethodLinear:return Ie;case this.InterpolantFactoryMethodSmooth:return Le;case this.InterpolantFactoryMethodBezier:return Re}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;Do(this.settings)&&(Lo(this.settings.inTangents,e),Lo(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Do(this.settings)&&(Ro(this.settings.inTangents,e),Ro(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(U(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(U(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){U(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){U(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ze(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){U(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Le,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Do(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Lo(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function Ro(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Io.prototype.ValueTypeName=``,Io.prototype.TimeBufferType=Float32Array,Io.prototype.ValueBufferType=Float32Array,Io.prototype.DefaultInterpolation=Ie;var zo=class extends Io{constructor(e,t,n){super(e,t,n)}};zo.prototype.ValueTypeName=`bool`,zo.prototype.ValueBufferType=Array,zo.prototype.DefaultInterpolation=V,zo.prototype.InterpolantFactoryMethodLinear=void 0,zo.prototype.InterpolantFactoryMethodSmooth=void 0;var Bo=class extends Io{constructor(e,t,n,r){super(e,t,n,r)}};Bo.prototype.ValueTypeName=`color`;var Vo=class extends Io{constructor(e,t,n,r){super(e,t,n,r)}};Vo.prototype.ValueTypeName=`number`;var Ho=class extends Oo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)vt.slerpFlat(i,0,a,c-o,a,c,s);return i}},Uo=class extends Io{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ho(this.times,this.values,this.getValueSize(),e)}};Uo.prototype.ValueTypeName=`quaternion`,Uo.prototype.InterpolantFactoryMethodSmooth=void 0;var Wo=class extends Io{constructor(e,t,n){super(e,t,n)}};Wo.prototype.ValueTypeName=`string`,Wo.prototype.ValueBufferType=Array,Wo.prototype.DefaultInterpolation=V,Wo.prototype.InterpolantFactoryMethodLinear=void 0,Wo.prototype.InterpolantFactoryMethodSmooth=void 0;var Go=class extends Io{constructor(e,t,n,r){super(e,t,n,r)}};Go.prototype.ValueTypeName=`vector`;var Ko={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(qo(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!qo(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function qo(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var Jo=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Yo=class{constructor(e){this.manager=e===void 0?Jo:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},this.priority=`auto`,this.cache=`default`,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Yo.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Xo=new WeakMap,Zo=class extends Yo{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Ko.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Xo.get(a);e===void 0&&(e=[],Xo.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=Qe(`img`);function s(){l(),t&&t(this);let n=Xo.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Xo.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),Ko.remove(`image:${e}`);let n=Xo.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Xo.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Ko.add(`image:${e}`,o),i.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}},Qo=class extends Yo{constructor(e){super(e)}load(e,t,n,r){let i=new Ft,a=new Zo(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},$o=class extends mn{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new J(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},es=class extends $o{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(mn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new J(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},ts=new q,ns=new G,rs=new G,is=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new W(512,512),this.mapType=v,this.map=null,this.mapPass=null,this.matrix=new q,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Si,this._frameExtents=new W(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;ns.setFromMatrixPosition(e.matrixWorld),t.position.copy(ns),rs.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rs),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){ts.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(ts,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(ts)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},as=new G,os=new vt,ss=new G,cs=class extends mn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new q,this.projectionMatrix=new q,this.projectionMatrixInverse=new q,this.coordinateSystem=Ye,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(as,os,ss),ss.x===1&&ss.y===1&&ss.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(as,os,ss.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(as,os,ss),ss.x===1&&ss.y===1&&ss.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(as,os,ss.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ls=new G,us=new W,ds=new W,fs=class extends cs{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=lt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ct*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return lt*2*Math.atan(Math.tan(ct*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ls.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ls.x,ls.y).multiplyScalar(-e/ls.z),ls.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ls.x,ls.y).multiplyScalar(-e/ls.z)}getViewSize(e,t){return this.getViewBounds(e,us,ds),t.subVectors(ds,us)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ct*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ps=class extends cs{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ms=class extends is{constructor(){super(new ps(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},hs=class extends $o{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(mn.DEFAULT_UP),this.updateMatrix(),this.target=new mn,this.shadow=new ms}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},gs=-90,_s=1,vs=class extends mn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new fs(gs,_s,e,t);r.layers=this.layers,this.add(r);let i=new fs(gs,_s,e,t);i.layers=this.layers,this.add(i);let a=new fs(gs,_s,e,t);a.layers=this.layers,this.add(a);let o=new fs(gs,_s,e,t);o.layers=this.layers,this.add(o);let s=new fs(gs,_s,e,t);s.layers=this.layers,this.add(s);let c=new fs(gs,_s,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ys=class extends fs{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},bs=`\\[\\]\\.:\\/`,xs=RegExp(`[\\[\\]\\.:\\/]`,`g`),Ss=`[^\\[\\]\\.:\\/]`,Cs=`[^`+bs.replace(`\\.`,``)+`]`,ws=`((?:WC+[\\/:])*)`.replace(`WC`,Ss),Ts=`(WCOD+)?`.replace(`WCOD`,Cs),Es=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Ss),Ds=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Ss),Os=RegExp(`^`+ws+Ts+Es+Ds+`$`),ks=[`material`,`materials`,`bones`,`map`],As=class{constructor(e,t,n){let r=n||js.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},js=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(xs,``)}static parseTrackName(e){let t=Os.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);ks.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){H(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){U(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){U(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){U(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){U(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){U(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;U(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};js.Composite=As,js.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},js.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},js.prototype.GetterByBindingType=[js.prototype._getValue_direct,js.prototype._getValue_array,js.prototype._getValue_arrayElement,js.prototype._getValue_toArray],js.prototype.SetterByBindingTypeAndVersioning=[[js.prototype._setValue_direct,js.prototype._setValue_direct_setNeedsUpdate,js.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[js.prototype._setValue_array,js.prototype._setValue_array_setNeedsUpdate,js.prototype._setValue_array_setMatrixWorldNeedsUpdate],[js.prototype._setValue_arrayElement,js.prototype._setValue_arrayElement_setNeedsUpdate,js.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[js.prototype._setValue_fromArray,js.prototype._setValue_fromArray_setNeedsUpdate,js.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],a=class{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}},a.prototype.isMatrix2=!0;function Ms(e,t,n,r){let i=Ns(r);switch(n){case j:return e*t;case te:return e*t/i.components*i.byteLength;case ne:return e*t/i.components*i.byteLength;case re:return e*t*2/i.components*i.byteLength;case ie:return e*t*2/i.components*i.byteLength;case M:return e*t*3/i.components*i.byteLength;case N:return e*t*4/i.components*i.byteLength;case ae:return e*t*4/i.components*i.byteLength;case oe:case se:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ce:case F:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case le:case de:return Math.max(e,16)*Math.max(t,8)/4;case I:case ue:return Math.max(e,8)*Math.max(t,8)/2;case fe:case L:case me:case he:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case pe:case ge:case _e:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ve:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ye:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case be:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case xe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Se:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Ce:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case we:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Te:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ee:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case De:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Oe:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ke:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ae:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case je:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case R:case Me:case Ne:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Pe:case z:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Fe:case B:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Ns(e){switch(e){case v:case y:return{byteLength:1,components:1};case x:case b:case T:return{byteLength:2,components:1};case E:case D:return{byteLength:2,components:4};case C:case S:case w:return{byteLength:4,components:1};case k:case A:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?H(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function Ps(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Fs(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Z={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Q={common:{diffuse:{value:new J(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new K},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new K}},envmap:{envMap:{value:null},envMapRotation:{value:new K},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new K}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new K}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new K},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new K},normalScale:{value:new W(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new K},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new K}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new K}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new K}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new J(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new J(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0},uvTransform:{value:new K}},sprite:{diffuse:{value:new J(16777215)},opacity:{value:1},center:{value:new W(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new K},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0}}},Is={basic:{uniforms:po([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.fog]),vertexShader:Z.meshbasic_vert,fragmentShader:Z.meshbasic_frag},lambert:{uniforms:po([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new J(0)},envMapIntensity:{value:1}}]),vertexShader:Z.meshlambert_vert,fragmentShader:Z.meshlambert_frag},phong:{uniforms:po([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new J(0)},specular:{value:new J(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Z.meshphong_vert,fragmentShader:Z.meshphong_frag},standard:{uniforms:po([Q.common,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.roughnessmap,Q.metalnessmap,Q.fog,Q.lights,{emissive:{value:new J(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag},toon:{uniforms:po([Q.common,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.gradientmap,Q.fog,Q.lights,{emissive:{value:new J(0)}}]),vertexShader:Z.meshtoon_vert,fragmentShader:Z.meshtoon_frag},matcap:{uniforms:po([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,{matcap:{value:null}}]),vertexShader:Z.meshmatcap_vert,fragmentShader:Z.meshmatcap_frag},points:{uniforms:po([Q.points,Q.fog]),vertexShader:Z.points_vert,fragmentShader:Z.points_frag},dashed:{uniforms:po([Q.common,Q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Z.linedashed_vert,fragmentShader:Z.linedashed_frag},depth:{uniforms:po([Q.common,Q.displacementmap]),vertexShader:Z.depth_vert,fragmentShader:Z.depth_frag},normal:{uniforms:po([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,{opacity:{value:1}}]),vertexShader:Z.meshnormal_vert,fragmentShader:Z.meshnormal_frag},sprite:{uniforms:po([Q.sprite,Q.fog]),vertexShader:Z.sprite_vert,fragmentShader:Z.sprite_frag},background:{uniforms:{uvTransform:{value:new K},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Z.background_vert,fragmentShader:Z.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new K}},vertexShader:Z.backgroundCube_vert,fragmentShader:Z.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Z.cube_vert,fragmentShader:Z.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Z.equirect_vert,fragmentShader:Z.equirect_frag},distance:{uniforms:po([Q.common,Q.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Z.distance_vert,fragmentShader:Z.distance_frag},shadow:{uniforms:po([Q.lights,Q.fog,{color:{value:new J(0)},opacity:{value:1}}]),vertexShader:Z.shadow_vert,fragmentShader:Z.shadow_frag}};Is.physical={uniforms:po([Is.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new K},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new K},clearcoatNormalScale:{value:new W(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new K},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new K},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new K},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new K},sheen:{value:0},sheenColor:{value:new J(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new K},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new K},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new K},transmissionSamplerSize:{value:new W},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new K},attenuationDistance:{value:0},attenuationColor:{value:new J(0)},specularColor:{value:new J(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new K},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new K},anisotropyVector:{value:new W},anisotropyMap:{value:null},anisotropyMapTransform:{value:new K}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag};var Ls={r:0,b:0,g:0},Rs=new q,zs=new K;zs.set(-1,0,0,0,1,0,0,0,1);function Bs(e,t,n,r,i,a){let o=new J(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new X(new Bi(1,1,1),new bo({name:`BackgroundCubeMaterial`,uniforms:fo(Is.backgroundCube.uniforms),vertexShader:Is.backgroundCube.vertexShader,fragmentShader:Is.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Rs.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(zs),l.material.toneMapped=Tt.getTransfer(i.colorSpace)!==Ke,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new X(new oo(2,2),new bo({name:`BackgroundMaterial`,uniforms:fo(Is.background.uniforms),vertexShader:Is.background.vertexShader,fragmentShader:Is.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Tt.getTransfer(i.colorSpace)!==Ke,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Ls,go(e)),n.buffers.color.setClear(Ls.r,Ls.g,Ls.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Vs(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Hs(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Us(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(H(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&H(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&H(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Ws(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Tr,s=new K,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Gs=class extends Rt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Fi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Bi(5,5,5),i=new bo({name:`CubemapFromEquirect`,uniforms:fo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new X(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=h),new vs(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},Ks=256,qs=3,Js=20,Ys=256,Xs=16,Zs=3,Qs=new G,$s=new J,ec=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new vs(1,10,null),this._boxMesh=new X(new Bi(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Qs}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor($s));let h=new vs(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=oc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Ks,mt(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?Ks:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=tc(e,!1,!1),n=Math.log2(e)-qs;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=tc(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=sc()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=oc()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=rc(),this._integrationMaterial=ic());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/Xs);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-Zs)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(Ys*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=ac());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function tc(e,t,n){return new Gs(e,{minFilter:_,generateMipmaps:t,type:T,colorSpace:We,depthBuffer:n})}function nc(e,t,n){return new bo({name:e,uniforms:t,vertexShader:Z.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function rc(){return nc(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Ys}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function ic(){return nc(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Xs}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function ac(){return nc(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Js}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function oc(){return nc(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function sc(){return nc(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function cc(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Gs(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new ec(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new ec(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function lc(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&rt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function uc(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?ar:ir)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function dc(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function fc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:U(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function pc(e,t,n){let r=new WeakMap,i=new It;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new zt(h,p,m,u);g.type=w,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new W(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function mc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var hc={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function gc(e,t,n,r,i,a){let o=new Rt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new _r;u.setAttribute(`position`,new Y([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new Y([0,2,0,0,2,0],2));let d=new xo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new X(u,d),p=new ps(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Rt(t,n,{type:T,depthBuffer:!1,stencilBuffer:!1}),c=new Rt(t,n,{type:T,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new Li(t,n),a===!0&&(l.format=P,l.type=O)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},Tt.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=hc[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var _c=new Ft,vc=new Li(1,1),yc=new Ri(1),bc=new zt,xc=new Bt,Sc=new Fi,Cc=[],wc=[],Tc=new Float32Array(16),Ec=new Float32Array(9),Dc=new Float32Array(4);function Oc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Cc[i];if(a===void 0&&(a=new Float32Array(i),Cc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function kc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Ac(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function jc(e,t){let n=wc[t];n===void 0&&(n=new Int32Array(t),wc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Mc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Nc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(kc(n,t))return;e.uniform2fv(this.addr,t),Ac(n,t)}}function Pc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(kc(n,t))return;e.uniform3fv(this.addr,t),Ac(n,t)}}function Fc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(kc(n,t))return;e.uniform4fv(this.addr,t),Ac(n,t)}}function Ic(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(kc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ac(n,t)}else{if(kc(n,r))return;Dc.set(r),e.uniformMatrix2fv(this.addr,!1,Dc),Ac(n,r)}}function Lc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(kc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ac(n,t)}else{if(kc(n,r))return;Ec.set(r),e.uniformMatrix3fv(this.addr,!1,Ec),Ac(n,r)}}function Rc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(kc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ac(n,t)}else{if(kc(n,r))return;Tc.set(r),e.uniformMatrix4fv(this.addr,!1,Tc),Ac(n,r)}}function zc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Bc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(kc(n,t))return;e.uniform2iv(this.addr,t),Ac(n,t)}}function Vc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(kc(n,t))return;e.uniform3iv(this.addr,t),Ac(n,t)}}function Hc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(kc(n,t))return;e.uniform4iv(this.addr,t),Ac(n,t)}}function Uc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Wc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(kc(n,t))return;e.uniform2uiv(this.addr,t),Ac(n,t)}}function Gc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(kc(n,t))return;e.uniform3uiv(this.addr,t),Ac(n,t)}}function Kc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(kc(n,t))return;e.uniform4uiv(this.addr,t),Ac(n,t)}}function qc(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function Jc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?qc(vc):_c,n.setTexture2D(t||a,i)}function Yc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||xc,i)}function Xc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?qc(yc):Sc,n.setTextureCube(t||a,i)}function Zc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||bc,i)}function Qc(e){switch(e){case 5126:return Mc;case 35664:return Nc;case 35665:return Pc;case 35666:return Fc;case 35674:return Ic;case 35675:return Lc;case 35676:return Rc;case 5124:case 35670:return zc;case 35667:case 35671:return Bc;case 35668:case 35672:return Vc;case 35669:case 35673:return Hc;case 5125:return Uc;case 36294:return Wc;case 36295:return Gc;case 36296:return Kc;case 35678:case 36198:case 36298:case 36306:case 35682:return Jc;case 35679:case 36299:case 36307:return Yc;case 35680:case 36300:case 36308:case 36293:return Xc;case 36289:case 36303:case 36311:case 36292:return Zc}}function $c(e,t){e.uniform1fv(this.addr,t)}function el(e,t){let n=Oc(t,this.size,2);e.uniform2fv(this.addr,n)}function tl(e,t){let n=Oc(t,this.size,3);e.uniform3fv(this.addr,n)}function nl(e,t){let n=Oc(t,this.size,4);e.uniform4fv(this.addr,n)}function rl(e,t){let n=Oc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function il(e,t){let n=Oc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function al(e,t){let n=Oc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function ol(e,t){e.uniform1iv(this.addr,t)}function sl(e,t){e.uniform2iv(this.addr,t)}function cl(e,t){e.uniform3iv(this.addr,t)}function ll(e,t){e.uniform4iv(this.addr,t)}function ul(e,t){e.uniform1uiv(this.addr,t)}function dl(e,t){e.uniform2uiv(this.addr,t)}function fl(e,t){e.uniform3uiv(this.addr,t)}function pl(e,t){e.uniform4uiv(this.addr,t)}function ml(e,t,n){let r=this.cache,i=t.length,a=jc(n,i);kc(r,a)||(e.uniform1iv(this.addr,a),Ac(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?qc(vc):_c;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function hl(e,t,n){let r=this.cache,i=t.length,a=jc(n,i);kc(r,a)||(e.uniform1iv(this.addr,a),Ac(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||xc,a[e])}function gl(e,t,n){let r=this.cache,i=t.length,a=jc(n,i);kc(r,a)||(e.uniform1iv(this.addr,a),Ac(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?qc(yc):Sc;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function _l(e,t,n){let r=this.cache,i=t.length,a=jc(n,i);kc(r,a)||(e.uniform1iv(this.addr,a),Ac(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||bc,a[e])}function vl(e){switch(e){case 5126:return $c;case 35664:return el;case 35665:return tl;case 35666:return nl;case 35674:return rl;case 35675:return il;case 35676:return al;case 5124:case 35670:return ol;case 35667:case 35671:return sl;case 35668:case 35672:return cl;case 35669:case 35673:return ll;case 5125:return ul;case 36294:return dl;case 36295:return fl;case 36296:return pl;case 35678:case 36198:case 36298:case 36306:case 35682:return ml;case 35679:case 36299:case 36307:return hl;case 35680:case 36300:case 36308:case 36293:return gl;case 36289:case 36303:case 36311:case 36292:return _l}}var yl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Qc(t.type)}},bl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=vl(t.type)}},xl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Sl=/(\w+)(\])?(\[|\.)?/g;function Cl(e,t){e.seq.push(t),e.map[t.id]=t}function wl(e,t,n){let r=e.name,i=r.length;for(Sl.lastIndex=0;;){let a=Sl.exec(r),o=Sl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Cl(n,l===void 0?new yl(s,e,t):new bl(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new xl(s),Cl(n,e)),n=e}}}var Tl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);wl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function El(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Dl=37297,Ol=0;function kl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Al=new K;function jl(e){Tt._getMatrix(Al,Tt.workingColorSpace,e);let t=`mat3( ${Al.elements.map(e=>e.toFixed(4))} )`;switch(Tt.getTransfer(e)){case Ge:return[t,`LinearTransferOETF`];case Ke:return[t,`sRGBTransferOETF`];default:return H(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Ml(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+kl(e.getShaderSource(t),r)}return i}function Nl(e,t){let n=jl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var Pl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Fl(e,t){let n=Pl[t];return n===void 0?(H(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Il=new G;function Ll(){return Tt.getLuminanceCoefficients(Il),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Il.x.toFixed(4)}, ${Il.y.toFixed(4)}, ${Il.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Rl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Vl).join(`
`)}function zl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Bl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Vl(e){return e!==``}function Hl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Ul(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Wl=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gl(e){return e.replace(Wl,Kl)}function Kl(e,t){let n=Z[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return Gl(n)}var ql=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jl(e){return e.replace(ql,Yl)}function Yl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Xl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Zl={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Ql(e){return Zl[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var $l={302:`ENVMAP_MODE_REFRACTION`};function eu(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:$l[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var tu={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function nu(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:tu[e.combine]||`ENVMAP_BLENDING_NONE`}function ru(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Ql(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=eu(n),d=nu(n),f=Rl(n),p=zl(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Vl).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Vl).join(`
`),g.length>0&&(g+=`
`)):(h=[Xl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Vl).join(`
`),g=[Xl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Z.tonemapping_pars_fragment,n.toneMapping===0?``:Fl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Z.colorspace_pars_fragment,Nl(`linearToOutputTexel`,n.outputColorSpace),Ll(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Vl).join(`
`)),o=Gl(o),o=Hl(o,n),o=Ul(o,n),s=Gl(s),s=Hl(s,n),s=Ul(s,n),o=Jl(o),s=Jl(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=El(i,i.VERTEX_SHADER,v),x=El(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=Ml(i,b,`vertex`),n=Ml(i,x,`fragment`);U(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):H(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new Tl(i,m),w=Bl(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,Dl)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Ol++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var iu=0,au=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ou(e),t.set(e,n)),n}},ou=class{constructor(e){this.id=iu++,this.code=e,this.usedTimes=0}};function su(e){return e===1030||e===37490||e===36285}function cu(e,t,n,r,i,a){let o=new Zt,s=new au,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&H(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=Is[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),M=m.isInstancedMesh===!0,N=m.isBatchedMesh===!0,ee=!!i.map,P=!!i.matcap,te=!!b,ne=te&&b.isPMREMTexture===!0,re=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,oe=!!i.normalMap,se=!!i.displacementMap,ce=!!i.emissiveMap,F=!!i.metalnessMap,I=!!i.roughnessMap,le=i.anisotropy>0,ue=i.clearcoat>0,de=i.diffuseRoughness>0,fe=i.dispersion>0,L=i.retroreflectivity>0,pe=i.iridescence>0,me=i.sheen>0,he=i.transmission>0,ge=le&&!!i.anisotropyMap,_e=ue&&!!i.clearcoatMap,ve=ue&&!!i.clearcoatNormalMap,ye=ue&&!!i.clearcoatRoughnessMap,be=de&&!!i.diffuseRoughnessMap,xe=pe&&!!i.iridescenceMap,Se=pe&&!!i.iridescenceThicknessMap,Ce=me&&!!i.sheenColorMap,we=me&&!!i.sheenRoughnessMap,Te=!!i.specularMap,Ee=!!i.specularColorMap,De=!!i.specularIntensityMap,Oe=he&&!!i.transmissionMap,ke=he&&!!i.thicknessMap,Ae=!!i.gradientMap,je=!!i.alphaMap,R=i.alphaTest>0,Me=!!i.alphaHash,Ne=!!i.extensions,Pe=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Pe=e.toneMapping);let z=ne?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Fe={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:N,batchingColor:N&&m._colorsTexture!==null,instancing:M,instancingColor:M&&m.instanceColor!==null,instancingMorph:M&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Tt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ee,matcap:P,envMap:te,envMapMode:te&&b.mapping,envMapPMREM:ne,envMapMaxLod:ne?z.length-1:null,envMapSize:ne?z[0].width:null,aoMap:re,lightMap:ie,bumpMap:ae,normalMap:oe,displacementMap:se,emissiveMap:ce,normalMapObjectSpace:oe&&i.normalMapType===1,normalMapTangentSpace:oe&&i.normalMapType===0,packedNormalMap:oe&&i.normalMapType===0&&su(i.normalMap.format),metalnessMap:F,roughnessMap:I,anisotropy:le,anisotropyMap:ge,clearcoat:ue,clearcoatMap:_e,clearcoatNormalMap:ve,clearcoatRoughnessMap:ye,diffuseRoughness:de,diffuseRoughnessMap:be,dispersion:fe,retroreflection:L,iridescence:pe,iridescenceMap:xe,iridescenceThicknessMap:Se,sheen:me,sheenColorMap:Ce,sheenRoughnessMap:we,specularMap:Te,specularColorMap:Ee,specularIntensityMap:De,transmission:he,transmissionMap:Oe,thicknessMap:ke,gradientMap:Ae,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:je,alphaTest:R,alphaHash:Me,combine:i.combine,mapUv:ee&&p(i.map.channel),aoMapUv:re&&p(i.aoMap.channel),lightMapUv:ie&&p(i.lightMap.channel),bumpMapUv:ae&&p(i.bumpMap.channel),normalMapUv:oe&&p(i.normalMap.channel),displacementMapUv:se&&p(i.displacementMap.channel),emissiveMapUv:ce&&p(i.emissiveMap.channel),metalnessMapUv:F&&p(i.metalnessMap.channel),roughnessMapUv:I&&p(i.roughnessMap.channel),anisotropyMapUv:ge&&p(i.anisotropyMap.channel),clearcoatMapUv:_e&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:ve&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:be&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:xe&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:Se&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:we&&p(i.sheenRoughnessMap.channel),specularMapUv:Te&&p(i.specularMap.channel),specularColorMapUv:Ee&&p(i.specularColorMap.channel),specularIntensityMapUv:De&&p(i.specularIntensityMap.channel),transmissionMapUv:Oe&&p(i.transmissionMap.channel),thicknessMapUv:ke&&p(i.thicknessMap.channel),alphaMapUv:je&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(oe||le),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(ee||je),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&oe===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Pe,decodeVideoTexture:ee&&i.map.isVideoTexture===!0&&Tt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ce&&i.emissiveMap.isVideoTexture===!0&&Tt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ne&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ne&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Fe.vertexUv1s=c.has(1),Fe.vertexUv2s=c.has(2),Fe.vertexUv3s=c.has(3),c.clear(),Fe}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=Is[t];n=_o.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new ru(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function lu(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function uu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function du(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function fu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||uu),r.length>1&&r.sort(t||du),i.length>1&&i.sort(t||du)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function pu(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new fu,e.set(t,[i])):n>=r.length?(i=new fu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function mu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new G,color:new J};break;case`SpotLight`:n={position:new G,direction:new G,color:new J,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new G,color:new J,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new G,skyColor:new J,groundColor:new J};break;case`RectAreaLight`:n={color:new J,position:new G,halfWidth:new G,halfHeight:new G}}return e[t.id]=n,n}}}function hu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var gu=0;function _u(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function vu(e){let t=new mu,n=hu(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new G);let i=new G,a=new q,o=new q;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(_u);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Q.LTC_FLOAT_1,r.rectAreaLTC2=Q.LTC_FLOAT_2):(r.rectAreaLTC1=Q.LTC_HALF_1,r.rectAreaLTC2=Q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=gu++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function yu(e){let t=new vu(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function bu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new yu(e),t.set(n,[a])):r>=i.length?(a=new yu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var xu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Su=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Cu=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],wu=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],Tu=new q,Eu=new G,Du=new G;function Ou(e,t,n){let r=new Si,i=new W,a=new W,o=new It,s=new wo,c=new To,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},p=new bo({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new W},radius:{value:4}},vertexShader:xu,fragmentShader:Su}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let g=new _r;g.setAttribute(`position`,new rr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new X(g,p),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let y=this.type;this.render=function(t,n,s){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||t.length===0)return;this.type===2&&(H(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.depth.getReversed()===!0?p.buffers.color.setClear(0,0,0,0):p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=y!==this.type;m&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){H(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let g=d.getFrameExtents();i.multiply(g),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/g.x),i.x=a.x*g.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/g.y),i.y=a.y*g.y,d.mapSize.y=a.y));let _=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=_,d.map===null||m===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){H(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Rt(i.x,i.y,{format:re,type:T,minFilter:h,magFilter:h,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Li(i.x,i.y,w),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=ee,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=f,d.map.depthTexture.magFilter=f}else l.isPointLight?(d.map=new Gs(i.x),d.map.depthTexture=new Ri(i.x,C)):(d.map=new Rt(i.x,i.y),d.map.depthTexture=new Li(i.x,i.y,C)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=ee,this.type===1?(d.map.depthTexture.compareFunction=_?518:515,d.map.depthTexture.minFilter=h,d.map.depthTexture.magFilter=h):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=f,d.map.depthTexture.magFilter=f);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let v=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let y=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<v;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Eu.setFromMatrixPosition(l.matrixWorld),e.position.copy(Eu),Du.copy(e.position),Du.add(Cu[t]),e.up.copy(wu[t]),e.lookAt(Du),e.updateMatrixWorld(),n.makeTranslation(-Eu.x,-Eu.y,-Eu.z),Tu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Tu,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),p.viewport(o)}r=d.getFrustum(t),S(n,s,i,l,y,this.type)}d.isPointLightShadow!==!0&&this.type===3&&b(d,s),d.needsUpdate=!1}y=this.type,v.needsUpdate=!1,e.setRenderTarget(c,l,d)};function b(n,r){let a=t.update(_);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null?n.mapPass=new Rt(i.x,i.y,{format:re,type:T}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),p.uniforms.shadow_pass.value=n.map.depthTexture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,p,_,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,m,_,null)}function x(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,E)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function S(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=x(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=x(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)S(l[e],i,a,o,s,c)}function E(e){e.target.removeEventListener(`dispose`,E);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function ku(e,t){function n(){let t=!1,n=new It,r=null,i=new It(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?F(e.DEPTH_TEST):I(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=at[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?F(e.STENCIL_TEST):I(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,ee=0,P=e.getParameter(e.VERSION);P.indexOf(`WebGL`)===-1?P.indexOf(`OpenGL ES`)!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),N=ee>=2):(ee=parseFloat(/^WebGL (\d)/.exec(P)[1]),N=ee>=1);let te=null,ne={},re=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new It().fromArray(re),oe=new It().fromArray(ie);function se(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ce={};ce[e.TEXTURE_2D]=se(e.TEXTURE_2D,e.TEXTURE_2D,1),ce[e.TEXTURE_CUBE_MAP]=se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[e.TEXTURE_2D_ARRAY]=se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ce[e.TEXTURE_3D]=se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),F(e.DEPTH_TEST),o.setFunc(3),he(!1),ge(1),F(e.CULL_FACE),pe(0);function F(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function I(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function le(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ue(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function de(t){return h!==t&&(e.useProgram(t),h=t,!0)}let fe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};fe[103]=e.MIN,fe[104]=e.MAX;let L={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function pe(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(I(e.BLEND),g=!1);else if(g===!1&&(F(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:U(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:U(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:U(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:U(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a=a||n,o=o||r,s=s||i,(n!==v||a!==x)&&(e.blendEquationSeparate(fe[n],fe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(L[r],L[i],L[o],L[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function me(t,n){t.side===2?I(e.CULL_FACE):F(e.CULL_FACE);let r=t.side===1;n&&(r=!r),he(r),t.blending===1&&t.transparent===!1?pe(0):pe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ve(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?F(e.SAMPLE_ALPHA_TO_COVERAGE):I(e.SAMPLE_ALPHA_TO_COVERAGE)}function he(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ge(t){t===0?I(e.CULL_FACE):(F(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function _e(t){t!==k&&(N&&e.lineWidth(t),k=t)}function ve(t,n,r){t?(F(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):I(e.POLYGON_OFFSET_FILL)}function ye(t){t?F(e.SCISSOR_TEST):I(e.SCISSOR_TEST)}function be(t){t===void 0&&(t=e.TEXTURE0+M-1),te!==t&&(e.activeTexture(t),te=t)}function xe(t,n,r){r===void 0&&(r=te===null?e.TEXTURE0+M-1:te);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(te!==r&&(e.activeTexture(r),te=r),e.bindTexture(t,n||ce[t]),i.type=t,i.texture=n)}function Se(){let t=ne[te];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ce(){try{e.compressedTexImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function we(){try{e.compressedTexImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Te(){try{e.texSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ee(){try{e.texSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function De(){try{e.compressedTexSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Oe(){try{e.compressedTexSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function ke(){try{e.texStorage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ae(){try{e.texStorage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function je(){try{e.texImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function R(){try{e.texImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Me(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ne(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Pe(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function z(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function Fe(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function B(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function V(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},te=null,ne={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ae.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:F,disable:I,bindFramebuffer:le,drawBuffers:ue,useProgram:de,setBlending:pe,setMaterial:me,setFlipSided:he,setCullFace:ge,setLineWidth:_e,setPolygonOffset:ve,setScissorTest:ye,activeTexture:be,bindTexture:xe,unbindTexture:Se,compressedTexImage2D:Ce,compressedTexImage3D:we,texImage2D:je,texImage3D:R,pixelStorei:Ne,getParameter:Me,updateUBOMapping:Fe,uniformBlockBinding:B,texStorage2D:ke,texStorage3D:Ae,texSubImage2D:Te,texSubImage3D:Ee,compressedTexSubImage2D:De,compressedTexSubImage3D:Oe,scissor:Pe,viewport:z,reset:V}}function Au(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new W,y=new WeakMap,b=new Set,x,S=new WeakMap,C=new Set,w=new FinalizationRegistry(e=>C.delete(e)),T=!1;try{T=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function E(e,t){return T?new OffscreenCanvas(e,t):Qe(`canvas`)}function D(e,t,n){let r=1,i=V(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=E(n,a));let o=t?E(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),H(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&H(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function O(e){return e.generateMipmaps}function k(t){e.generateMipmap(t)}function A(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function j(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];H(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||H(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Ge:Tt.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function M(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,H(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function N(e,t){return O(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function ee(e){let t=new WeakRef(e);r.get(e).__ref=t,C.add(t),w.register(e,t,t)}function te(e){let t=r.get(e).__ref;t!==void 0&&(C.delete(t),w.unregister(t))}function ne(e){ie(e.target)}function re(e){ae(e.target)}function ie(e){e.removeEventListener(`dispose`,ne),te(e),se(e),e.isVideoTexture&&y.delete(e),e.isHTMLTexture&&b.delete(e)}function ae(e){e.removeEventListener(`dispose`,re),te(e),F(e)}function oe(){for(let e of C){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?ae(t):ie(t))}C.clear(),b.clear()}function se(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=S.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&ce(e),Object.keys(i).length===0&&S.delete(n)}r.remove(e)}function ce(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=S.get(i);delete a[n.__cacheKey],o.memory.textures--}function F(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&ie(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let I=0;function le(){I=0}function ue(){return I}function de(e){I=e}function fe(){let e=I;return e>=i.maxTextures&&H(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),I+=1,e}function L(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function pe(t,i){let a=r.get(t);if(t.isVideoTexture&&Fe(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)H(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)H(`WebGLRenderer: Texture marked for update but image is incomplete`);else{we(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function me(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?we(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function he(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?we(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ge(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?Te(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let _e={[l]:e.REPEAT,[u]:e.CLAMP_TO_EDGE,[d]:e.MIRRORED_REPEAT},ve={[f]:e.NEAREST,[p]:e.NEAREST_MIPMAP_NEAREST,[m]:e.NEAREST_MIPMAP_LINEAR,[h]:e.LINEAR,[g]:e.LINEAR_MIPMAP_NEAREST,[_]:e.LINEAR_MIPMAP_LINEAR},ye={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function be(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&H(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,_e[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,_e[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,_e[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ve[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ve[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ye[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function xe(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,ne),ee(n));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let s=L(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&ce(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function Se(e,t,n){return Math.floor(Math.floor(e/n)/t)}function Ce(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=Se(n.start,r.width,4),c=Se(t.start,r.width,4);n.start<=i+1&&a===c&&Se(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function we(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=xe(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let d=r.get(u);if(u.version!==d.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Tt.getPrimaries(Tt.workingColorSpace),r=o.colorSpace===``?null:Tt.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=D(o.image,!1,i.maxTextureSize);t=B(o,t);let r=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=j(o.internalFormat,r,f,o.normalized,o.colorSpace,o.isVideoTexture);be(c,o);let m,h=o.mipmaps,g=o.isVideoTexture!==!0,_=d.__version===void 0||l===!0,v=u.dataReady,y=N(o,t);if(o.isDepthTexture)p=M(o.format===P,o.type),_&&(g?n.texStorage2D(e.TEXTURE_2D,1,p,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,null));else if(o.isDataTexture){if(h.length>0){g&&_&&n.texStorage2D(e.TEXTURE_2D,y,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data);o.generateMipmaps=!1}else g?(_&&n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height),v&&Ce(o,t,r,f)):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){g&&_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,p,h[0].width,h[0].height,t.depth);for(let i=0,a=h.length;i<a;i++)if(m=h[i],o.format!==1023){if(r!==null){if(g){if(v){if(o.layerUpdates.size>0){let t=Ms(m.width,m.height,o.format,o.type);for(let a of o.layerUpdates){let o=m.data.subarray(a*t/m.data.BYTES_PER_ELEMENT,(a+1)*t/m.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,m.width,m.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,m.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,m.data,0,0)}else H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,f,m.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,r,f,m.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{g&&_&&n.texStorage2D(e.TEXTURE_2D,y,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],o.format===1023?g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data):r===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,m.data):n.compressedTexImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,m.data)}}else if(o.isDataArrayTexture){if(g){if(_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,p,t.width,t.height,t.depth),v){if(o.layerUpdates.size>0){let i=Ms(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,f,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,p,t.width,t.height,t.depth,0,r,f,t.data)}else if(o.isData3DTexture)g?(_&&n.texStorage3D(e.TEXTURE_3D,y,p,t.width,t.height,t.depth),v&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)):n.texImage3D(e.TEXTURE_3D,0,p,t.width,t.height,t.depth,0,r,f,t.data);else if(o.isFramebufferTexture){if(_){if(g)n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<y;t++)n.texImage2D(e.TEXTURE_2D,t,p,i,a,0,r,f,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),b.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=V(h[0]);n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height)}for(let t=0,i=h.length;t<i;t++)m=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,f,m):n.texImage2D(e.TEXTURE_2D,t,p,r,f,m);o.generateMipmaps=!1}else if(g){if(_){let r=V(t);n.texStorage2D(e.TEXTURE_2D,y,p,r.width,r.height)}v&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,f,t)}else n.texImage2D(e.TEXTURE_2D,0,p,r,f,t);O(o)&&o.mipmapsAutoUpdate===!0&&k(c),d.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Te(t,o,s){if(o.image.length!==6)return;let c=xe(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Tt.getPrimaries(Tt.workingColorSpace),r=o.colorSpace===``?null:Tt.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=D(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=B(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),v=j(o.internalFormat,g,_,o.normalized,o.colorSpace),y=o.isVideoTexture!==!0,b=u.__version===void 0||c===!0,x=l.dataReady,S=N(o,h);be(e.TEXTURE_CUBE_MAP,o);let C;if(o.isDepthTexture){if(v=M(o.format===P,o.type),b){if(y)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,v,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,h.width,h.height,0,g,_,null)}}else if(f){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=m[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];o.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=o.mipmaps,y&&b){C.length>0&&S++;let t=V(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(p){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<C.length;r++){let i=C[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,m[t]);for(let r=0;r<C.length;r++){let i=C[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}O(o)&&o.mipmapsAutoUpdate===!0&&k(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Ee(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=j(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),z(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Pe(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function De(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=M(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;z(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Pe(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Pe(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=j(o.internalFormat,c,l,o.normalized,o.colorSpace);z(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Pe(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Pe(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Oe(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?ge(i.depthTexture,0):pe(i.depthTexture,0);let u=c.__webglTexture,d=Pe(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)z(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)z(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function ke(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Oe(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?Oe(i.__webglFramebuffer[0],t,0):Oe(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),De(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),De(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ae(t,n,i){let a=r.get(t);n!==void 0&&Ee(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&ke(t)}function je(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,re),ee(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&z(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=j(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Pe(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),De(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),be(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Ee(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Ee(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);O(i)?k(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),be(c,a),Ee(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),O(a)&&k(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),be(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Ee(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Ee(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);O(i)?k(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&ke(t)}function R(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(O(a)&&a.mipmapsAutoUpdate===!0){let t=A(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),k(t),n.unbindTexture()}}}let Me=[];function Ne(t){if(t.samples>0){if(z(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Me.length=0,Me.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&Me.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Me))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Pe(e){return Math.min(i.maxSamples,e.samples)}function z(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Fe(e){let t=o.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function B(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Tt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&H(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):U(`WebGLTextures: Unsupported texture color space:`,n)),t}function V(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=fe,this.resetTextureUnits=le,this.getTextureUnits=ue,this.setTextureUnits=de,this.setTexture2D=pe,this.setTexture2DArray=me,this.setTexture3D=he,this.setTextureCube=ge,this.rebindTextures=Ae,this.setupRenderTarget=je,this.updateRenderTargetMipmap=R,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=z,this.dispose=oe}function ju(e,t){function n(n,r=``){let i,a=Tt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Mu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Nu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Pu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new zi(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new bo({vertexShader:Mu,fragmentShader:Nu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new X(new oo(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Fu=class extends ot{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Pu,g={},_=t.getContextAttributes(),y=null,b=null,x=[],S=[],w=new W,T=null,E=null,D=new fs;D.viewport=new It;let k=new fs;k.viewport=new It;let A=[D,k],j=new ys,M=null,te=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=x[e];return t===void 0&&(t=new _n,x[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=x[e];return t===void 0&&(t=new _n,x[e]=t),t.getGripSpace()},this.getHand=function(e){let t=x[e];return t===void 0&&(t=new _n,x[e]=t),t.getHandSpace()};function ne(e){let t=S.indexOf(e.inputSource);if(t===-1)return;let n=x[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function re(){r.removeEventListener(`select`,ne),r.removeEventListener(`selectstart`,ne),r.removeEventListener(`selectend`,ne),r.removeEventListener(`squeeze`,ne),r.removeEventListener(`squeezestart`,ne),r.removeEventListener(`squeezeend`,ne),r.removeEventListener(`end`,re),r.removeEventListener(`inputsourceschange`,ie);for(let e=0;e<x.length;e++){let t=S[e];t!==null&&(S[e]=null,x[e].disconnect(t))}M=null,te=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(y),f=null,d=null,u=null,r=null,b=null,F.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(w.width,w.height,!1),E!==null){let e=E.camera;e.fov=E.fov,e.zoom=E.zoom,e.updateProjectionMatrix(),E=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(y=e.getRenderTarget(),r.addEventListener(`select`,ne),r.addEventListener(`selectstart`,ne),r.addEventListener(`selectend`,ne),r.addEventListener(`squeeze`,ne),r.addEventListener(`squeezestart`,ne),r.addEventListener(`squeezeend`,ne),r.addEventListener(`end`,re),r.addEventListener(`inputsourceschange`,ie),_.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(w),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?P:ee,a=_.stencil?O:C);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new Rt(d.textureWidth,d.textureHeight,{format:N,type:v,depthTexture:new Li(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new Rt(f.framebufferWidth,f.framebufferHeight,{format:N,type:v,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),F.setContext(r),F.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function ie(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=S.indexOf(n);r>=0&&(S[r]=null,x[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=S.indexOf(n);if(r===-1){for(let e=0;e<x.length;e++)if(e>=S.length){S.push(n),r=e;break}else if(S[e]===null){S[e]=n,r=e;break}if(r===-1)break}let i=x[r];i&&i.connect(n)}}function ae(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),j.near=k.near=D.near=t,j.far=k.far=D.far=n,(M!==j.near||te!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),M=j.near,te=j.far),j.layers.mask=e.layers.mask|6,D.layers.mask=j.layers.mask&-5,k.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;ae(j,i);for(let e=0;e<a.length;e++)ae(a[e],i);j.projectionMatrix.copy(D.projectionMatrix),j.projectionMatrixInverse.copy(D.projectionMatrixInverse),E===null&&e.isPerspectiveCamera&&(E={camera:e,fov:e.fov,zoom:e.zoom}),oe(e,j,i)};function oe(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=lt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(j)},this.getCameraTexture=function(e){return g[e]};let se=null;function ce(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(b,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(b))}let o=A[n];o===void 0&&(o=new fs,o.layers.enable(n),o.viewport=new It,A[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new zi,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<x.length;e++){let t=S[e],n=x[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}se&&se(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let F=new Ps;F.setAnimationLoop(ce),this.setAnimationLoop=function(e){se=e},this.dispose=function(){}}},Iu=new q,Lu=new K;Lu.set(-1,0,0,0,1,0,0,0,1);function Ru(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,go(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Iu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Lu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function zu(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?H(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):H(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var Bu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Vu=null;function Hu(){return Vu===null&&(Vu=new li(Bu,16,16,re,T),Vu.name=`DFG_LUT`,Vu.minFilter=h,Vu.magFilter=h,Vu.wrapS=u,Vu.wrapT=u,Vu.generateMipmaps=!1,Vu.needsUpdate=!0),Vu}var Uu=class{constructor(e={}){let{canvas:t=$e(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=v}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([ae,ie,ne]),g=new Set([v,C,x,O,E,D]),y=new Uint32Array(4),b=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]},w=null,k=null,A=[],j=[],M=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,ee=!1,P=null,te=null,re=null,oe=null;this._outputColorSpace=Ue;let se=0,ce=0,F=null,I=-1,le=null,ue=new It,de=new It,fe=null,L=new J(0),pe=0,me=t.width,he=t.height,ge=1,_e=null,ve=null,ye=new It(0,0,me,he),be=new It(0,0,me,he),xe=!1,Se=new Si,Ce=new wi,we=!1,Te=!1,Ee=new q,De=new G,Oe=new It,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ae=!1;function je(){return F===null?ge:1}let R=n;function Me(e,n){return t.getContext(e,n)}let Ne,Pe,z,Fe,B,V,Ie,Le,Re,ze,Be,Ve,He,We,Ge,Ke,qe,Je,Xe,Ze,Qe,et,nt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,ot,!1),t.addEventListener(`webglcontextrestored`,st,!1),t.addEventListener(`webglcontextcreationerror`,ct,!1),R===null){let t=`webgl2`;if(R=Me(t,e),R===null)throw Me(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}rt()}catch(e){throw t.removeEventListener(`webglcontextlost`,ot,!1),t.removeEventListener(`webglcontextrestored`,st,!1),t.removeEventListener(`webglcontextcreationerror`,ct,!1),U(`WebGLRenderer: `+e.message),e}function rt(){Ne=new lc(R),Ne.init(),Qe=new ju(R,Ne),Pe=new Us(R,Ne,e,Qe),z=new ku(R,Ne),Pe.reversedDepthBuffer&&d&&z.buffers.depth.setReversed(!0),te=R.createFramebuffer(),re=R.createFramebuffer(),oe=R.createFramebuffer(),Fe=new fc(R),B=new lu,V=new Au(R,Ne,z,B,Pe,Qe,Fe),Ie=new cc(N),Le=new Fs(R),et=new Vs(R,Le),Re=new uc(R,Le,Fe,et),ze=new mc(R,Re,Le,et,Fe),Je=new pc(R,Pe,V),Ge=new Ws(B),Be=new cu(N,Ie,Ne,Pe,et,Ge),Ve=new Ru(N,B),He=new pu,We=new bu(Ne),qe=new Bs(N,Ie,z,ze,p,s),Ke=new Ou(N,ze,Pe),nt=new zu(R,Fe,Pe,z),Xe=new Hs(R,Ne,Fe),Ze=new dc(R,Ne,Fe),Fe.programs=Be.programs,N.capabilities=Pe,N.extensions=Ne,N.properties=B,N.renderLists=He,N.shadowMap=Ke,N.state=z,N.info=Fe}m!==1009&&(M=new gc(m,t.width,t.height,o,r,i));let at=new Fu(N,R);this.xr=at,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let e=Ne.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ne.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ge},this.setPixelRatio=function(e){e!==void 0&&(ge=e,this.setSize(me,he,!1))},this.getSize=function(e){return e.set(me,he)},this.setSize=function(e,n,r=!0){at.isPresenting?H(`WebGLRenderer: Can't change size while VR device is presenting.`):(me=e,he=n,t.width=Math.floor(e*ge),t.height=Math.floor(n*ge),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),M!==null&&M.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(me*ge,he*ge).floor()},this.setDrawingBufferSize=function(e,n,r){me=e,he=n,ge=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)U(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){H(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}M.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(ue)},this.getViewport=function(e){return e.copy(ye)},this.setViewport=function(e,t,n,r){e.isVector4?ye.set(e.x,e.y,e.z,e.w):ye.set(e,t,n,r),z.viewport(ue.copy(ye).multiplyScalar(je()).round())},this.getScissor=function(e){return e.copy(be)},this.setScissor=function(e,t,n,r){e.isVector4?be.set(e.x,e.y,e.z,e.w):be.set(e,t,n,r),z.scissor(de.copy(be).multiplyScalar(je()).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(e){z.setScissorTest(xe=e)},this.setOpaqueSort=function(e){_e=e},this.setTransparentSort=function(e){ve=e},this.getClearColor=function(e){return e.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor(...arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(F!==null){let t=F.texture.format;e=h.has(t)}if(e){let e=F.texture.type,t=g.has(e),n=qe.getClearColor(),r=qe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(y[0]=i,y[1]=a,y[2]=o,y[3]=r,R.clearBufferuiv(R.COLOR,0,y)):(b[0]=i,b[1]=a,b[2]=o,b[3]=r,R.clearBufferiv(R.COLOR,0,b))}else r|=R.COLOR_BUFFER_BIT}t&&(r|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&R.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),P=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ot,!1),t.removeEventListener(`webglcontextrestored`,st,!1),t.removeEventListener(`webglcontextcreationerror`,ct,!1),qe.dispose(),He.dispose(),We.dispose(),V.dispose(),B.dispose(),Ie.dispose(),ze.dispose(),Re.dispose(),et.dispose(),nt.dispose(),Be.dispose(),at.dispose(),at.removeEventListener(`sessionstart`,ht),at.removeEventListener(`sessionend`,gt),_t.stop()};function ot(e){e.preventDefault(),tt(`WebGLRenderer: Context Lost.`),ee=!0}function st(){tt(`WebGLRenderer: Context Restored.`),ee=!1;let e=Fe.autoReset,t=Ke.enabled,n=Ke.autoUpdate,r=Ke.needsUpdate,i=Ke.type;rt(),Fe.autoReset=e,Ke.enabled=t,Ke.autoUpdate=n,Ke.needsUpdate=r,Ke.type=i}function ct(e){U(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function lt(e){let t=e.target;t.removeEventListener(`dispose`,lt),ut(t)}function ut(e){dt(e),B.remove(e)}function dt(e){let t=B.get(e).programs;t!==void 0&&(t.forEach(function(e){Be.releaseProgram(e)}),e.isShaderMaterial&&Be.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ke);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Dt(e,t,n,r,i);z.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Re.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;et.setup(i,r,s,n,c);let h,g=Xe;if(c!==null&&(h=Le.get(c),g=Ze,g.setIndex(h)),i.isMesh)r.wireframe===!0?(z.setLineWidth(r.wireframeLinewidth*je()),g.setMode(R.LINES)):g.setMode(R.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),z.setLineWidth(e*je()),i.isLineSegments?g.setMode(R.LINES):i.isLineLoop?g.setMode(R.LINE_LOOP):g.setMode(R.LINE_STRIP)}else i.isPoints?g.setMode(R.POINTS):i.isSprite&&g.setMode(R.TRIANGLES);if(i.isBatchedMesh){if(Ne.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Le.get(c).bytesPerElement:1,o=B.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(R,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ft(e,t,n,r){P!==null&&e.isNodeMaterial&&P.setObject(r,e),we===!0&&Ge.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,St(e,t,r),e.side=0,e.needsUpdate=!0,St(e,t,r),e.side=2):St(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),P!==null&&P.renderStart(e,t,n),k=We.get(n),k.init(t),j.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights(),P!==null&&P.updateLights(k.state.lightsArray),Te=this.localClippingEnabled,we=Ge.init(this.clippingPlanes,Te),we===!0&&Ge.setGlobalState(this.clippingPlanes,t),P!==null&&Ke.render(k.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ft(o,n,t,e),r.add(o)}else ft(i,n,t,e),r.add(i)}}),k=j.pop(),P!==null&&P.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=B.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Ne.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let pt=null;function mt(e){pt&&pt(e)}function ht(){_t.stop()}function gt(){_t.start()}let _t=new Ps;_t.setAnimationLoop(mt),typeof self<`u`&&_t.setContext(self),this.setAnimationLoop=function(e){pt=e,at.setAnimationLoop(e),e===null?_t.stop():_t.start()},at.addEventListener(`sessionstart`,ht),at.addEventListener(`sessionend`,gt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){U(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ee===!0)return;P!==null&&P.renderStart(e,t);let n=at.enabled===!0&&at.isPresenting===!0,r=M!==null&&(F===null||n)&&M.begin(N,F);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(at.cameraAutoUpdate===!0&&at.updateCamera(t),t=at.getCamera()),e.isScene===!0&&e.onBeforeRender(N,e,t,F),k=We.get(e,j.length),k.init(t),k.state.textureUnits=V.getTextureUnits(),j.push(k),Ee.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?Ce.setFromArrayCamera(t):Se.setFromProjectionMatrix(Ee,Ye,t.reversedDepth),Te=this.localClippingEnabled,we=Ge.init(this.clippingPlanes,Te),w=He.get(e,A.length),w.init(),A.push(w),this.info.render.frame++,at.enabled===!0&&at.isPresenting===!0){let e=N.xr.getDepthSensingMesh();e!==null&&W(e,t,-1/0,N.sortObjects)}W(e,t,0,N.sortObjects),w.finish(),P!==null&&P.updateLights(k.state.lightsArray),N.sortObjects===!0&&w.sort(_e,ve),Ae=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,Ae&&qe.addToRenderList(w,e),this.info.autoReset===!0&&this.info.reset(),we===!0&&Ge.beginShadows();let i=k.state.shadowsArray;if(Ke.render(i,e,t),we===!0&&Ge.endShadows(),(r&&M.hasRenderPass())===!1){let n=w.opaque,r=w.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];yt(n,r,e,a)}Ae&&qe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];vt(w,e,n,n.viewport)}}else r.length>0&&yt(n,r,e,t),Ae&&qe.render(e),vt(w,e,t)}F!==null&&ce===0&&(V.updateMultisampleRenderTarget(F),V.updateRenderTargetMipmap(F)),r&&M.end(N),e.isScene===!0&&e.onAfterRender(N,e,t),et.resetDefaultState(),I=-1,le=null,j.pop(),j.length>0?(k=j[j.length-1],V.setTextureUnits(k.state.textureUnits),we===!0&&Ge.setGlobalState(N.clippingPlanes,k.state.camera)):k=null,A.pop(),w=A.length>0?A[A.length-1]:null,P!==null&&P.renderEnd()};function W(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?Ce:Se;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&Oe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Ee);let i=ze.update(e),a=e.material;a.visible&&w.push(e,i,a,n,Oe.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?Ce:Se;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=ze.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Oe.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Oe.copy(e.boundingSphere.center)),Oe.applyMatrix4(e.matrixWorld).applyMatrix4(Ee)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&w.push(e,i,c,n,Oe.z,s,t)}}else a.visible&&w.push(e,i,a,n,Oe.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)W(i[e],t,n,r)}function vt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),we===!0&&Ge.setGlobalState(N.clippingPlanes,n),r&&z.viewport(ue.copy(r)),i.length>0&&bt(i,t,n),a.length>0&&bt(a,t,n),o.length>0&&bt(o,t,n),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function yt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[r.id]===void 0){let e=Ne.has(`EXT_color_buffer_half_float`)||Ne.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[r.id]=new Rt(1,1,{generateMipmaps:!0,type:e?T:v,minFilter:_,samples:Math.max(4,Pe.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Tt.workingColorSpace})}let a=k.state.transmissionRenderTarget[r.id],o=r.viewport||ue;a.setSize(o.z*N.transmissionResolutionScale,o.w*N.transmissionResolutionScale);let s=N.getRenderTarget(),c=N.getActiveCubeFace(),l=N.getActiveMipmapLevel();N.setRenderTarget(a),N.getClearColor(L),pe=N.getClearAlpha(),pe<1&&N.setClearColor(16777215,.5),N.clear(),Ae&&qe.render(n);let u=N.toneMapping;N.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),k.setupLightsView(r),we===!0&&Ge.setGlobalState(N.clippingPlanes,r),bt(e,n,r),V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a),Ne.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,K(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a))}N.setRenderTarget(s,c,l),N.setClearColor(L,pe),d!==void 0&&(r.viewport=d),N.toneMapping=u}function bt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&K(o,t,n,s,l,c)}}function K(e,t,n,r,i,a){P!==null&&i.isNodeMaterial&&P.setObject(e,i),e.onBeforeRender(N,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(N,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=2):N.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(N,t,n,r,i,a)}function xt(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function St(e,t,n){t.isScene!==!0&&(t=ke);let r=B.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=Be.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=Be.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ie.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,lt),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Et(e,s),d}else s.uniforms=Be.getUniforms(e),P!==null&&e.isNodeMaterial&&P.build(e,n,s),e.onBeforeCompile(s,N),d=Be.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ge.uniform),Et(e,s),r.needsLights=kt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=xt(k.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function Ct(e,t,n,r,i){let a=B.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=St(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function wt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Tl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Et(e,t){let n=B.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Dt(e,t,n,r,i){t.isScene!==!0&&(t=ke),V.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=F===null?N.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Tt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ie.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(h=N.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=B.get(r),y=k.state.lights;if(we===!0&&(Te===!0||e!==le)){let t=e===le&&r.id===I;Ge.setState(r,e,t)}let b=!1,x=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ge.numPlanes||v.numIntersection!==Ge.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===xt(k.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(x=!0):b=!0:b=!0:(b=!0,v.__version=r.version);let C=v.currentProgram;(b===!0||x===!0)&&(C=x===!0?Ct(r,t,i,s,h):St(r,t,i),P&&r.isNodeMaterial&&P.onUpdateProgram(r,C,v));let w=!1,T=!1,E=!1,D=C.getUniforms(),O=v.uniforms;if(z.useProgram(C.program)&&(w=!0,T=!0,E=!0),r.id!==I&&(I=r.id,T=!0),w||le!==e){z.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),D.setValue(R,`projectionMatrix`,e.projectionMatrix),D.setValue(R,`viewMatrix`,e.matrixWorldInverse);let t=D.map.cameraPosition;t!==void 0&&t.setValue(R,De.setFromMatrixPosition(e.matrixWorld)),Pe.logarithmicDepthBuffer&&D.setValue(R,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&D.setValue(R,`isOrthographic`,e.isOrthographicCamera===!0),le!==e&&(le=e,T=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&D.setValue(R,`sunShadowMap`,y.state.sunShadowMap,V),y.state.directionalShadowMap.length>0&&D.setValue(R,`directionalShadowMap`,y.state.directionalShadowMap,V),y.state.spotShadowMap.length>0&&D.setValue(R,`spotShadowMap`,y.state.spotShadowMap,V),y.state.pointShadowMap.length>0&&D.setValue(R,`pointShadowMap`,y.state.pointShadowMap,V)),i.isSkinnedMesh){D.setOptional(R,i,`bindMatrix`),D.setOptional(R,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),D.setValue(R,`boneTexture`,e.boneTexture,V))}i.isBatchedMesh&&(D.setOptional(R,i,`batchingTexture`),D.setValue(R,`batchingTexture`,i._matricesTexture,V),D.setOptional(R,i,`batchingIdTexture`),D.setValue(R,`batchingIdTexture`,i._indirectTexture,V),D.setOptional(R,i,`batchingColorTexture`),i._colorsTexture!==null&&D.setValue(R,`batchingColorTexture`,i._colorsTexture,V));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Je.update(i,n,C),(T||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,D.setValue(R,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(O.envMapIntensity.value=t.environmentIntensity),O.dfgLUT!==void 0&&(O.dfgLUT.value=Hu()),T){if(D.setValue(R,`toneMappingExposure`,N.toneMappingExposure),v.needsLights&&Ot(O,E),a&&r.fog===!0&&Ve.refreshFogUniforms(O,a),Ve.refreshMaterialUniforms(O,r,ge,he,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=S,t=0;for(let n of k.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;O.probesSH.value=e.textures,O.probesMin.value=e.min,O.probesMax.value=e.max,O.probesResolution.value=e.resolution}Tl.upload(R,wt(v),O,V)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Tl.upload(R,wt(v),O,V),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&D.setValue(R,`center`,i.center),D.setValue(R,`modelViewMatrix`,i.modelViewMatrix),D.setValue(R,`normalMatrix`,i.normalMatrix),D.setValue(R,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];nt.update(n,C),nt.bind(n,C)}}return C}function Ot(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function kt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return se},this.getActiveMipmapLevel=function(){return ce},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(e,t,n){let r=B.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),B.get(e.texture).__webglTexture=t,B.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=B.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){F=e,se=t,ce=n;let r=null,i=!1,a=!1;if(e){let o=B.get(e);if(o.__useDefaultFramebuffer!==void 0){z.bindFramebuffer(R.FRAMEBUFFER,o.__webglFramebuffer),ue.copy(e.viewport),de.copy(e.scissor),fe=e.scissorTest,z.viewport(ue),z.scissor(de),z.setScissorTest(fe),I=-1;return}if(o.__webglFramebuffer===void 0)V.setupRenderTarget(e);else if(o.__hasExternalTextures)V.rebindTextures(e,B.get(e.texture).__webglTexture,B.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&B.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);V.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=B.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&V.useMultisampledRTT(e)===!1?B.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ue.copy(e.viewport),de.copy(e.scissor),fe=e.scissorTest}else ue.copy(ye).multiplyScalar(ge).floor(),de.copy(be).multiplyScalar(ge).floor(),fe=xe;if(n!==0&&(r=te),z.bindFramebuffer(R.FRAMEBUFFER,r)&&z.drawBuffers(e,r),z.viewport(ue),z.scissor(de),z.setScissorTest(fe),i){let r=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=B.get(e.textures[t]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,t.__webglTexture,n)}I=-1};function At(e){let t=B.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Pe.textureFormatReadable(e.format),t.__typeReadable=Pe.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){z.bindFramebuffer(R.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let u=At(o);if(u.__formatReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&R.readPixels(t,n,r,i,Qe.convert(c),Qe.convert(l),a)}finally{let e=F===null?null:B.get(F).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){z.bindFramebuffer(R.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let d=At(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.bufferData(R.PIXEL_PACK_BUFFER,a.byteLength,R.STREAM_READ),R.readPixels(t,n,r,i,Qe.convert(l),Qe.convert(u),0),R.bindBuffer(R.PIXEL_PACK_BUFFER,null);let p=F===null?null:B.get(F).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,p);let m=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await it(R,m,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,a),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),R.deleteBuffer(f),R.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;V.setTexture2D(e,0),R.copyTexSubImage2D(R.TEXTURE_2D,n,0,0,o,s,i,a),z.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Qe.convert(t.format),_=Qe.convert(t.type),v;t.isData3DTexture?(V.setTexture3D(t,0),v=R.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(V.setTexture2DArray(t,0),v=R.TEXTURE_2D_ARRAY):(V.setTexture2D(t,0),v=R.TEXTURE_2D),z.activeTexture(R.TEXTURE0),z.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,t.flipY),z.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),z.pixelStorei(R.UNPACK_ALIGNMENT,t.unpackAlignment);let y=z.getParameter(R.UNPACK_ROW_LENGTH),b=z.getParameter(R.UNPACK_IMAGE_HEIGHT),x=z.getParameter(R.UNPACK_SKIP_PIXELS),S=z.getParameter(R.UNPACK_SKIP_ROWS),C=z.getParameter(R.UNPACK_SKIP_IMAGES);z.pixelStorei(R.UNPACK_ROW_LENGTH,h.width),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,h.height),z.pixelStorei(R.UNPACK_SKIP_PIXELS,l),z.pixelStorei(R.UNPACK_SKIP_ROWS,u),z.pixelStorei(R.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=B.get(e),r=B.get(t),h=B.get(n.__renderTarget),g=B.get(r.__renderTarget);z.bindFramebuffer(R.READ_FRAMEBUFFER,h.__webglFramebuffer),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(e).__webglTexture,i,d+n),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(t).__webglTexture,a,m+n)),R.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,R.DEPTH_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||B.has(e)){let n=B.get(e),r=B.get(t);z.bindFramebuffer(R.READ_FRAMEBUFFER,re),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,oe);for(let e=0;e<c;e++)w?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,n.__webglTexture,i),T?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,r.__webglTexture,a),i===0?T?R.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):R.copyTexSubImage2D(v,a,f,p,l,u,o,s):R.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,R.COLOR_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?R.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h);z.pixelStorei(R.UNPACK_ROW_LENGTH,y),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,b),z.pixelStorei(R.UNPACK_SKIP_PIXELS,x),z.pixelStorei(R.UNPACK_SKIP_ROWS,S),z.pixelStorei(R.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&R.generateMipmap(v),z.unbindTexture()},this.initRenderTarget=function(e){B.get(e).__webglFramebuffer===void 0&&V.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?V.setTextureCube(e,0):e.isData3DTexture?V.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?V.setTexture2DArray(e,0):V.setTexture2D(e,0),z.unbindTexture()},this.resetState=function(){se=0,ce=0,F=null,z.reset(),et.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ye}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Tt._getUnpackColorSpace()}},Wu={Sand:0,Reef:1,Weed:2,Wall:3,Deep:4,Shallow:5},Gu={0:{id:`sand`,ja:`砂地`},1:{id:`reef`,ja:`根（岩礁）`},2:{id:`weed`,ja:`藻場`},3:{id:`wall`,ja:`岸壁際`},4:{id:`deep`,ja:`深場`},5:{id:`shallow`,ja:`シャロー`}},Ku=.5,qu=-1.5,$={WATER:0,CONCRETE:1,ASPHALT:2,SAND:3,ROCK:4,GRASS:5},Ju=.35,Yu=e=>Math.floor((e- -80)/Ku),Xu=e=>Math.floor((e- -80)/Ku),Zu=e=>-80+(e+.5)*Ku,Qu=e=>-80+(e+.5)*Ku;function $u(e,t,n=0){let r=e*374761393+t*668265263+n*982451653|0;return r=(r^r>>>13)*1274126177,r^=r>>>16,(r>>>0)%1e5/1e5}function ed(e,t,n=0){let r=Math.floor(e),i=Math.floor(t),a=e-r,o=t-i,s=a*a*(3-2*a),c=o*o*(3-2*o),l=$u(r,i,n),u=$u(r+1,i,n),d=$u(r,i+1,n),f=$u(r+1,i+1,n);return l+(u-l)*s+(d-l)*c+(l-u-d+f)*s*c}var td=class{constructor(){this.ground=new Uint8Array(102400),this.blocked=new Uint8Array(102400),this.tetra=new Uint8Array(102400),this.hole=new Uint8Array(102400),this.dWater=new Float32Array(102400),this.dLand=new Float32Array(102400),this.landType=new Uint8Array(102400),this.depth=new Float32Array(102400),this.zone=new Uint8Array(102400),this.reach=new Uint8Array(102400),this.cornerH=new Float32Array(103041)}idx(e,t){return t*320+e}inB(e,t){return e>=0&&t>=0&&e<320&&t<320}groundAt(e,t){return this.inB(e,t)?this.ground[t*320+e]:$.WATER}walkable(e,t){if(!this.inB(e,t))return!1;let n=t*320+e,r=this.ground[n];return r!==$.WATER&&r!==$.GRASS&&!this.blocked[n]}isWaterCell(e,t){return this.inB(e,t)&&this.ground[t*320+e]===$.WATER}rect(e,t,n,r,i){let a=Math.max(0,Yu(e)),o=Math.min(319,Yu(n-1e-6)),s=Math.max(0,Xu(t)),c=Math.min(319,Xu(r-1e-6));for(let e=s;e<=c;e++)for(let t=a;t<=o;t++)this.ground[e*320+t]=i}flag(e,t,n,r,i,a=1){let o=Math.max(0,Yu(t)),s=Math.min(319,Yu(r-1e-6)),c=Math.max(0,Xu(n)),l=Math.min(319,Xu(i-1e-6));for(let t=c;t<=l;t++)for(let n=o;n<=s;n++)e[t*320+n]=a}blockedCircle(e,t,n){let r=Yu(e-n),i=Yu(e+n),a=Xu(t-n),o=Xu(t+n);for(let s=a;s<=o;s++)for(let a=r;a<=i;a++){if(this.walkable(a,s))continue;let r=-80+a*Ku,i=-80+s*Ku,o=Math.max(r,Math.min(e,r+Ku)),c=Math.max(i,Math.min(t,i+Ku)),l=e-o,u=t-c;if(l*l+u*u<n*n)return!0}return!1}heightAt(e,t){let n=Yu(e),r=Xu(t);if(this.groundAt(n,r)!==$.SAND)return 0;let i=(e- -80)/Ku-n,a=(t- -80)/Ku-r,o=this.cornerH[r*321+n],s=this.cornerH[r*321+n+1],c=this.cornerH[(r+1)*321+n],l=this.cornerH[(r+1)*321+n+1];return o*(1-i)*(1-a)+s*i*(1-a)+c*(1-i)*a+l*i*a}};function nd(e){let t=new Float32Array(102400).fill(1e9),n=new Int32Array(102400).fill(-1);for(let r=0;r<102400;r++)e[r]&&(t[r]=0,n[r]=r);let r=(e,r,i,a)=>{if(i<0||a<0||i>=320||a>=320)return;let o=a*320+i,s=n[o];if(s<0)return;let c=s%320,l=s/320|0,u=Math.hypot(e-c,r-l),d=r*320+e;u<t[d]&&(t[d]=u,n[d]=s)};for(let e=0;e<2;e++){for(let e=0;e<320;e++)for(let t=0;t<320;t++)r(t,e,t-1,e),r(t,e,t-1,e-1),r(t,e,t,e-1),r(t,e,t+1,e-1);for(let e=319;e>=0;e--)for(let t=319;t>=0;t--)r(t,e,t+1,e),r(t,e,t+1,e+1),r(t,e,t,e+1),r(t,e,t-1,e+1)}for(let e=0;e<102400;e++)t[e]*=Ku;return{d:t,s:n}}function rd(e){let t=new Uint8Array(102400),n=new Uint8Array(102400);for(let r=0;r<102400;r++){let i=e.ground[r]===$.WATER;t[r]=+!!i,n[r]=!i||e.tetra[r]?1:0}let r=nd(t);e.dWater.set(r.d);let i=nd(n);e.dLand.set(i.d);for(let t=0;t<102400;t++){let n=i.s[t];e.landType.set([n>=0?e.tetra[n]?$.ROCK:e.ground[n]:$.WATER],t)}let a=e=>-.3-1.15*Math.max(0,1-e/6);for(let t=0;t<=320;t++)for(let n=0;n<=320;n++){let r=0,i=0;for(let a=-1;a<=0;a++)for(let o=-1;o<=0;o++){let s=n+o,c=t+a;e.inB(s,c)&&e.ground[c*320+s]===$.SAND?(r+=e.dWater[c*320+s],i++):e.inB(s,c)&&e.ground[c*320+s]===$.WATER&&(r+=0,i++)}e.cornerH[t*321+n]=i?a(r/i):0}for(let t=0;t<320;t++)for(let n=0;n<320;n++){let r=t*320+n,i=e.ground[r];if(i!==$.WATER){e.depth[r]=i===$.SAND?.15:4,e.zone[r]=Wu.Sand;continue}let a=e.dLand[r],o=e.landType[r],s;s=o===$.SAND?.1+a*.22:o===$.ROCK?1+a*.5:3.5+Math.min(a,20)*.12,e.hole[r]&&(s=3.5),s=Math.min(s,10),e.depth[r]=s;let c=Zu(n),l=Qu(t),u=ed(c*.08,l*.08,3),d=Wu.Sand;(o===$.CONCRETE||o===$.ASPHALT)&&a<3.5?d=Wu.Wall:o===$.ROCK&&a<10?d=Wu.Reef:s<2.2?d=Wu.Shallow:u>.58&&s>=1.5&&s<=6.5&&a<25?d=Wu.Weed:s>=7.5&&(d=Wu.Deep),e.zone[r]=d}}function id(e,t,n){e.reach.fill(0);let r=(t,n)=>e.walkable(t,n)&&!e.blockedCircle(Zu(t),Qu(n),.35),i=[],a=Yu(t),o=Xu(n);if(!r(a,o))return 0;e.reach[o*320+a]=1,i.push(o*320+a);let s=1;for(;i.length;){let t=i.pop(),n=t%320,a=t/320|0;for(let[t,o]of[[1,0],[-1,0],[0,1],[0,-1]]){let c=n+t,l=a+o;if(!e.inB(c,l))continue;let u=l*320+c;!e.reach[u]&&r(c,l)&&(e.reach[u]=1,s++,i.push(u))}}return s}function ad(e,t,n,r=8){let i=Yu(t),a=Xu(n),o=Math.ceil(r/Ku),s=null,c=1e9;for(let t=-o;t<=o;t++)for(let n=-o;n<=o;n++){let r=i+n,o=a+t;if(!e.inB(r,o)||!e.reach[o*320+r])continue;let l=n*n+t*t;l<c&&(c=l,s=[Zu(r),Qu(o)])}return s}var od={x:-20,z:15.5,yaw:0},sd=[{id:`shop`,x0:0,z0:19,x1:10,z1:27,h:3.6,body:15327954,roof:3104655,roofKind:`gable`,ridgeX:!0,windows:!0,door:`N`},{id:`base`,x0:-30,z0:19,x1:-22,z1:25,h:3,body:9072210,roof:5790817,roofKind:`gable`,ridgeX:!0,windows:!0,door:`N`},{id:`wareA`,x0:26,z0:22,x1:44,z1:34,h:6.2,body:12174281,roof:8029580,roofKind:`gable`,ridgeX:!0,windows:!1},{id:`wareB`,x0:-20,z0:30,x1:-6,z1:40,h:5.6,body:13616816,roof:9067082,roofKind:`gable`,ridgeX:!1,windows:!0},{id:`market`,x0:12,z0:28,x1:24,z1:36,h:4.2,body:15130832,roof:5209498,roofKind:`gable`,ridgeX:!0,windows:!0,door:`N`},{id:`house1`,x0:-38,z0:33,x1:-31,z1:39,h:4.4,body:15326404,roof:5917252,roofKind:`gable`,ridgeX:!0,windows:!0},{id:`house2`,x0:30,z0:38,x1:37,z1:41,h:4,body:14275784,roof:7032904,roofKind:`gable`,ridgeX:!0,windows:!0},{id:`cont1`,x0:-4,z0:34,x1:2.5,z1:36.5,h:2.6,body:12597547,roof:12597547,roofKind:`flat`},{id:`cont2`,x0:3,z0:34,x1:9.5,z1:36.5,h:2.6,body:3049153,roof:3049153,roofKind:`flat`},{id:`cont3`,x0:-4,z0:37,x1:2.5,z1:39.5,h:2.6,body:3050327,roof:3050327,roofKind:`flat`},{id:`cont4`,x0:3,z0:37,x1:9.5,z1:39.5,h:2.6,body:14059792,roof:14059792,roofKind:`flat`}],cd=[{id:`shop`,name:`潮風つり具 しおかぜ`,x:5,z:16,r:4.5,note:`釣具店（準備中・Phase 5で実装）`},{id:`base`,name:`拠点`,x:-26,z:16,r:4.5,note:`拠点（準備中・Phase 5で実装）`},{id:`market`,name:`魚市場`,x:18,z:26,r:4.5,note:`魚市場（売却は未実装）`}],ld=[{id:`quay`,name:`岸壁（港内）`,x:-8,z:9,kind:`quay`},{id:`hole`,name:`穴釣りエリア（岸壁の隙間）`,x:-26.5,z:10.8,kind:`hole`},{id:`tip`,name:`防波堤の先端`,x:20.5,z:-49,kind:`tip`},{id:`bw`,name:`防波堤（港内側）`,x:18.8,z:-25,kind:`breakwater`},{id:`beach`,name:`砂浜`,x:35,z:-2.2,kind:`beach`},{id:`rock`,name:`岩場`,x:-48,z:12,kind:`rock`}],ud=[-34,-31,-28,-25,-22,-19];function dd(){let e=new td;e.rect(-80,42,80,80,$.GRASS),e.rect(48,12,80,80,$.GRASS),e.rect(-80,34,-40,80,$.GRASS),e.rect(-40,12,48,42,$.ASPHALT),e.rect(-40,8,23,12,$.CONCRETE),e.rect(18,-45,23,8,$.CONCRETE),e.rect(15,-50,26,-45,$.CONCRETE),e.rect(-40,-25,-35,8,$.CONCRETE),e.rect(23,-4,48,12,$.SAND),e.rect(-56,8,-40,34,$.ROCK);for(let t=0;t<320;t++)for(let n=0;n<320;n++){let r=t*320+n;if(e.ground[r]!==$.ROCK)continue;let i=Zu(n),a=Qu(t),o=Math.min(i+56,a-8);o<3.5&&ed(i*.35,a*.35,7)*.6+$u(n,t,5)*.4<(3.5-o)/3.5*.75&&(e.ground[r]=$.WATER)}for(let t of ud)e.rect(t-.5,8,t+.5,10,$.WATER),e.flag(e.hole,t-.5,8,t+.5,10);e.flag(e.tetra,23,-44,28,-5),e.flag(e.tetra,-40,-24,-36,7),e.flag(e.tetra,-43,-24,-40,7);for(let t=0;t<102400;t++)e.tetra[t]&&e.ground[t]!==$.WATER&&(e.tetra[t]=0);for(let t of sd)e.flag(e.blocked,t.x0,t.z0,t.x1,t.z1);let t=[],n=[],r=(t,n,r)=>{let i=Yu(n),a=Xu(r);e.walkable(i,a)&&(e.blocked[a*320+i]=1,t.push({x:Zu(i),z:Qu(a)}))};for(let e=-38;e<=20;e+=6)e>-37&&e<-16||r(t,e,8.6);for(let e=-44;e<=6;e+=8)r(t,18.25,e);for(let e=-44;e<=6;e+=8)r(t,22.75,e);for(let e=-36;e<=16;e+=10)r(n,e,11.6);for(let e=-40;e<=0;e+=14)r(n,20.5,e);r(n,20.5,-47.5);let i=[],a=(t,n,r,a,o,s)=>{e.walkable(Yu(t),Xu(n))&&(e.flag(e.blocked,t-r/2,n-a/2,t+r/2,n+a/2),i.push({x:t,z:n,w:r,d:a,h:o,c:s}))};a(11.5,19.5,1,1,1,10124111),a(12.7,19.5,1,1,1,9071423),a(12,20.8,1,1,1,11045466),a(-31.5,18,1,1,.9,7048858),a(26,13.5,1.5,1,1,11579568),a(40,14,1,1,1,10124111),a(-12,14,1.2,1.2,1,13684928);let o=[];for(let t=0;t<320;t++)for(let n=0;n<320;n+=1){let r=t*320+n;if(e.ground[r]!==$.ROCK)continue;let i=Zu(n),a=Qu(t);if($u(n,t,11)<.05&&Math.hypot(i+46,a-13)>2.5){let r=.5+$u(n,t,12)*.45;e.flag(e.blocked,i-.5,a-.5,i+.5,a+.5),o.push({x:i,z:a,s:r})}}for(let t=1;t<319;t++)for(let n=1;n<319;n++){let r=t*320+n;if(e.ground[r]!==$.WATER||e.tetra[r]||e.hole[r])continue;let i=Zu(n),a=Qu(t);i<-50&&i>-62&&a>8&&a<36&&$u(n,t,21)<.06&&o.push({x:i,z:a,s:.6+$u(n,t,22)*.6})}let s=[];for(let t=0;t<320;t+=2)for(let n=0;n<320;n+=2){let r=t*320+n;if(!e.tetra[r]||e.ground[r]!==$.WATER)continue;let i=Zu(n)+($u(n,t,31)-.5)*.8,a=Qu(t)+($u(n,t,32)-.5)*.8;s.push({x:i,z:a,y:-1.7+$u(n,t,33)*.9,r:.55+$u(n,t,34)*.15}),$u(n,t,35)>.45&&s.push({x:i+.3,z:a-.2,y:-.9+$u(n,t,36)*.9,r:.55})}return rd(e),id(e,od.x,od.z),{grid:e,bollards:t,lamps:n,rocks:o,tetras:s,crates:i}}var fd=new J;function pd(e){return fd.setHex(e),[fd.r,fd.g,fd.b]}function md(e,t){return[e[0]*t,e[1]*t,e[2]*t]}var hd=class{constructor(){this.pos=[],this.nor=[],this.col=[],this.uv=[]}tri(e,t,n,r,i){let a=t[0]-e[0],o=t[1]-e[1],s=t[2]-e[2],c=n[0]-e[0],l=n[1]-e[1],u=n[2]-e[2],d=o*u-s*l,f=s*c-a*u,p=a*l-o*c,m=Math.hypot(d,f,p)||1;if(d/=m,f/=m,p/=m,i){let r=(e[0]+t[0]+n[0])/3-i[0],a=(e[1]+t[1]+n[1])/3-i[1],o=(e[2]+t[2]+n[2])/3-i[2];d*r+f*a+p*o<0&&([t,n]=[n,t],d=-d,f=-f,p=-p)}for(let i of[e,t,n])this.pos.push(i[0],i[1],i[2]),this.nor.push(d,f,p),this.col.push(r[0],r[1],r[2]),this.uv.push(i[0],i[2])}quad(e,t,n,r,i,a){this.tri(e,t,n,i,a),this.tri(e,n,r,i,a)}quadGrad(e,t,n,r,i,a,o,s,c){let l=t[0]-e[0],u=t[1]-e[1],d=t[2]-e[2],f=n[0]-e[0],p=n[1]-e[1],m=n[2]-e[2],h=u*m-d*p,g=d*f-l*m,_=l*p-u*f,v=Math.hypot(h,g,_)||1;h/=v,g/=v,_/=v;let y=[e,t,n,r],b=[i,a,o,s];h*c[0]+g*c[1]+_*c[2]<0&&(y=[e,r,n,t],b=[i,s,o,a],h=-h,g=-g,_=-_);for(let e of[0,1,2,0,2,3]){let t=y[e],n=b[e];this.pos.push(t[0],t[1],t[2]),this.nor.push(h,g,_),this.col.push(n[0],n[1],n[2]),this.uv.push(t[0],t[2])}}box(e,t,n,r,i,a,o,s=!1){let c=[(e+r)/2,(t+i)/2,(n+a)/2],l=[e,t,n],u=[r,t,n],d=[r,t,a],f=[e,t,a],p=[e,i,n],m=[r,i,n],h=[r,i,a],g=[e,i,a];this.quad(p,m,h,g,md(o,1),c),this.quad(l,u,m,p,md(o,.86),c),this.quad(f,d,h,g,md(o,.9),c),this.quad(l,f,g,p,md(o,.8),c),this.quad(u,d,h,m,md(o,.82),c),s||this.quad(l,u,d,f,md(o,.6),c)}gable(e,t,n,r,i,a,o,s,c){e-=o,t-=o,n+=o,r+=o;let l=(e+n)/2,u=(t+r)/2,d=i+a,f=[l,i+a*.3,u];if(c){let a=[e,d,u],o=[n,d,u];this.quad([e,i,t],[n,i,t],o,a,s,f),this.quad([e,i,r],[n,i,r],o,a,md(s,.85),f),this.tri([e,i,t],[e,i,r],a,md(s,.7),f),this.tri([n,i,t],[n,i,r],o,md(s,.7),f)}else{let a=[l,d,t],o=[l,d,r];this.quad([e,i,t],[e,i,r],o,a,s,f),this.quad([n,i,t],[n,i,r],o,a,md(s,.85),f),this.tri([e,i,t],[n,i,t],a,md(s,.7),f),this.tri([e,i,r],[n,i,r],o,md(s,.7),f)}}addGeo(e,t,n){let r=e.index?e.toNonIndexed():e,i=r.getAttribute(`position`),a=r.getAttribute(`normal`),o=new K().getNormalMatrix(t),s=new G;for(let e=0;e<i.count;e++)s.fromBufferAttribute(i,e).applyMatrix4(t),this.pos.push(s.x,s.y,s.z),this.uv.push(s.x,s.z),s.fromBufferAttribute(a,e).applyMatrix3(o).normalize(),this.nor.push(s.x,s.y,s.z),this.col.push(n[0],n[1],n[2])}build(){let e=new _r;return e.setAttribute(`position`,new Y(this.pos,3)),e.setAttribute(`normal`,new Y(this.nor,3)),e.setAttribute(`color`,new Y(this.col,3)),e.setAttribute(`uv`,new Y(this.uv,2)),e.computeBoundingSphere(),e}},gd=new URL(`concrete-DoemyXsd.webp`,import.meta.url).href,_d=new URL(`rock-BVII_NeX.webp`,import.meta.url).href,vd=new URL(`sand-B5E7fu9N.webp`,import.meta.url).href,yd=new URL(`wood-Dj5NoQ10.webp`,import.meta.url).href,bd=new Qo;function xd(e,t){let n=bd.load(e);return n.wrapS=n.wrapT=l,n.colorSpace=Ue,n.anisotropy=4,n.repeat.set(1/t,1/t),n}var Sd=()=>xd(gd,2),Cd=()=>xd(_d,1.5),wd=()=>xd(vd,3),Td=()=>xd(yd,1);function Ed(e,t){let n=document.createElement(`canvas`);n.width=n.height=e;let r=n.getContext(`2d`);t(r,r.createImageData(e,e),e);let i=new Ii(n);return i.wrapS=i.wrapT=l,i.colorSpace=Ue,i.anisotropy=2,i}function Dd(e,t,n){for(let r=0;r<t;r++)for(let i=0;i<t;i++){let[a,o,s]=n(i,r),c=(r*t+i)*4;e.data[c]=a,e.data[c+1]=o,e.data[c+2]=s,e.data[c+3]=255}}function Od(){return Ed(256,(e,t,n)=>{Dd(t,n,(e,t)=>{let n=62+$u(e,t,3)*26+ed(e*.05,t*.05,4)*18;return[n,n,n+3]}),e.putImageData(t,0,0)})}function kd(){return Ed(256,(e,t,n)=>{Dd(t,n,(e,t)=>{let n=ed(e*.06,t*.06,8)*.6+$u(e,t,9)*.4;return[50+n*35,95+n*55,45+n*25]}),e.putImageData(t,0,0)})}function Ad(e,t,n,r,i=512,a=192){let o=document.createElement(`canvas`);o.width=i,o.height=a;let s=o.getContext(`2d`);s.fillStyle=n,s.fillRect(0,0,i,a),s.strokeStyle=r,s.lineWidth=8,s.strokeRect(8,8,i-16,a-16),s.fillStyle=r,s.textAlign=`center`,s.textBaseline=`middle`,s.font=`bold ${Math.floor(a*.48)}px "Hiragino Sans","Noto Sans JP","Noto Sans CJK JP",sans-serif`,s.fillText(e,i/2,a*.42),s.font=`bold ${Math.floor(a*.17)}px "Hiragino Sans","Noto Sans JP","Noto Sans CJK JP",sans-serif`,s.fillText(t,i/2,a*.8);let c=new Ii(o);return c.colorSpace=Ue,c}var jd=(e,t=0)=>(t&&e.repeat.set(t,t),e);function Md(e,t,n){let r=new Uint8Array(102400),i=new hd,a=!1;for(let o=0;o<320;o++)for(let s=0;s<320;s++){let c=o*320+s;if(r[c]||e.ground[c]!==t)continue;let l=1;for(;s+l<320&&!r[c+l]&&e.ground[c+l]===t;)l++;let u=1;outer:for(;o+u<320;){for(let n=0;n<l;n++){let i=(o+u)*320+s+n;if(r[i]||e.ground[i]!==t)break outer}u++}for(let e=0;e<u;e++)for(let t=0;t<l;t++)r[(o+e)*320+s+t]=1;let d=-80+s*Ku,f=d+l*Ku,p=-80+o*Ku,m=p+u*Ku;i.quad([d,n,m],[f,n,m],[f,n,p],[d,n,p],[1,1,1],[0,-1,0]),a=!0}return a?i:null}function Nd(e,t){let n=new hn;n.name=`terrain`;let r={[$.CONCRETE]:new Co({map:jd(Sd())}),[$.ASPHALT]:new Co({map:jd(Od(),.25)}),[$.ROCK]:new Co({map:jd(Cd())}),[$.GRASS]:new Co({map:jd(kd(),.25)})};for(let t of[$.CONCRETE,$.ASPHALT,$.ROCK,$.GRASS]){let i=Md(e,t,0);if(i){let e=new X(i.build(),r[t]);e.name=`top`+t,n.add(e)}}{let t=[],r=[],i=[],a=[],o=new Map,s=(n,a)=>{let s=a*321+n,c=o.get(s);if(c===void 0){c=t.length/3,o.set(s,c);let l=-80+n*Ku,u=-80+a*Ku,d=e.cornerH[s];t.push(l,d,u),r.push(l,u);let f=.88+ed(l*.4,u*.4,12)*.12+(d<-1.2?-.1:0);i.push(f,f,f)}return c};for(let t=0;t<320;t++)for(let n=0;n<320;n++){if(e.ground[t*320+n]!==$.SAND)continue;let r=s(n,t),i=s(n+1,t),o=s(n+1,t+1),c=s(n,t+1);a.push(r,c,o,r,o,i)}if(a.length){let e=new _r;e.setAttribute(`position`,new Y(t,3)),e.setAttribute(`uv`,new Y(r,2)),e.setAttribute(`color`,new Y(i,3)),e.setIndex(a),e.computeVertexNormals();let o=new X(e,new Co({map:jd(wd()),vertexColors:!0}));o.name=`sand`,n.add(o)}}{let t=new hd,r=[[1,0],[-1,0],[0,1],[0,-1]],i=pd(15254568);for(let n=0;n<320;n++)for(let a=0;a<320;a++){let o=e.ground[n*320+a];if(o!==$.CONCRETE&&o!==$.ASPHALT&&o!==$.ROCK&&o!==$.GRASS)continue;let s=-80+a*Ku,c=s+Ku,l=-80+n*Ku,u=l+Ku;for(let[d,f]of r){let r=a+d,p=n+f;if(r<0||p<0||r>=320||p>=320)continue;let m=e.ground[p*320+r],h=m===$.WATER,g=m===$.SAND;if(!h&&!g)continue;let _,v;d===1?(_=[c,l],v=[c,u]):d===-1?(_=[s,l],v=[s,u]):f===1?(_=[s,u],v=[c,u]):(_=[s,l],v=[c,l]);let y=[d,0,f],b=$u(a,n,41),x=o===$.ROCK,S=o===$.GRASS,C=x?md(pd(8023908),.85+b*.3):S?pd(5925434):md(pd(11118754),.9+b*.15),w=pd(x?3884598:S?3358762:4149572),T=pd(x?2503983:2112060);if(g){let n=Math.round((_[1]- -80)/Ku)*321+Math.round((_[0]- -80)/Ku),r=Math.round((v[1]- -80)/Ku)*321+Math.round((v[0]- -80)/Ku),i=e.cornerH[n],a=e.cornerH[r];t.quadGrad([_[0],0,_[1]],[v[0],0,v[1]],[v[0],a,v[1]],[_[0],i,_[1]],C,C,md(C,.8),md(C,.8),y);continue}let E=[0,-1.2,-1.85,-10],D=[C,md(C,.82),w,T];for(let e=0;e<3;e++)t.quadGrad([_[0],E[e],_[1]],[v[0],E[e],v[1]],[v[0],E[e+1],v[1]],[_[0],E[e+1],_[1]],D[e],D[e],D[e+1],D[e+1],y);if(o===$.CONCRETE){let e=.18,n=[_[0]-d*e,_[1]-f*e],r=[v[0]-d*e,v[1]-f*e];t.quad([_[0],.02,_[1]],[v[0],.02,v[1]],[r[0],.02,r[1]],[n[0],.02,n[1]],i,[_[0],-5,_[1]])}}}let a=new X(t.build(),new Co({vertexColors:!0}));a.name=`walls`,n.add(a)}{let r=t.seabedSeg,i=new oo(320*Ku,320*Ku,r,r);i.rotateX(-Math.PI/2);let a=i.getAttribute(`position`),o=new Float32Array(a.count*3),s={[Wu.Sand]:pd(12167556),[Wu.Reef]:pd(6116940),[Wu.Weed]:pd(5073724),[Wu.Wall]:pd(7106411),[Wu.Deep]:pd(2898757),[Wu.Shallow]:pd(13877908)};for(let t=0;t<a.count;t++){let n=a.getX(t),r=a.getZ(t),i=Math.min(319,Math.max(0,Math.floor((n- -80)/Ku))),c=Math.min(319,Math.max(0,Math.floor((r- -80)/Ku)))*320+i,l=(ed(n*.3,r*.3,13)-.5)*.4;a.setY(t,qu-e.depth[c]+l*.5);let u=md(s[e.zone[c]],.85+l*.5);o[t*3]=u[0],o[t*3+1]=u[1],o[t*3+2]=u[2]}i.setAttribute(`color`,new rr(o,3)),i.computeVertexNormals();let c=new X(i,new Co({vertexColors:!0}));c.name=`seabed`,n.add(c);let l=new X(new oo(2400,2400).rotateX(-Math.PI/2),new Yr({color:1323072}));l.position.y=-11.5,l.name=`deepfloor`,n.add(l)}return n}var Pd=`
uniform float uTime, uAmp;
varying vec3 vW; varying vec3 vN; varying float vFogDepth;
void main(){
  vec3 p = position;
  float edge = 1.0 - smoothstep(78.0, 98.0, max(abs(p.x), abs(p.z)));
  float a = uAmp * edge;
  float t = uTime;
  float h = 0.0; float dx = 0.0; float dz = 0.0;
  float k1 = 0.35, k2 = 0.5, k3 = 0.9;
  float ph1 = p.x*k1 + t*1.1, ph2 = p.z*k2 - t*0.9 + p.x*0.2, ph3 = (p.x+p.z)*k3 + t*1.7;
  h += sin(ph1)*0.5 + sin(ph2)*0.35 + sin(ph3)*0.15;
  dx += cos(ph1)*0.5*k1 + cos(ph2)*0.35*0.2 + cos(ph3)*0.15*k3;
  dz += cos(ph2)*0.35*k2 + cos(ph3)*0.15*k3;
  p.y += h * 0.18 * a;
  vN = normalize(vec3(-dx*0.18*a, 1.0, -dz*0.18*a));
  vec4 wp = modelMatrix * vec4(p, 1.0);
  vW = wp.xyz;
  vec4 mv = viewMatrix * wp;
  vFogDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,Fd=`
uniform float uTime, uDay, uFogNear, uFogFar;
uniform vec3 uHorizon, uZenith, uSunDir, uSunColor, uFogColor;
uniform sampler2D uShore; uniform vec2 uOrg; uniform float uSize;
varying vec3 vW; varying vec3 vN; varying float vFogDepth;
vec3 lin(vec3 c){ return pow(c, vec3(2.2)); }
void main(){
  vec3 V = normalize(cameraPosition - vW);
  vec3 N = normalize(vN + vec3(0.035*sin(vW.x*1.7+uTime*1.3), 0.0, 0.035*cos(vW.z*1.5+uTime*1.1)));
  vec2 uv = (vW.xz - uOrg) / uSize;
  vec4 s = texture2D(uShore, clamp(uv, 0.001, 0.999));
  float dL = s.r * 24.0;
  float depth = s.g * 10.0;
  vec3 shallow = lin(vec3(0.33, 0.66, 0.62));
  vec3 deep = lin(vec3(0.03, 0.17, 0.30));
  vec3 base = mix(shallow, deep, smoothstep(0.3, 6.0, depth));
  base *= (0.18 + 0.82 * uDay);
  vec3 R = reflect(-V, N);
  vec3 sky = mix(uHorizon, uZenith, pow(clamp(R.y, 0.0, 1.0), 0.5));
  float ndv = max(dot(N, V), 0.0);
  float fres = clamp(0.03 + 0.97 * pow(1.0 - ndv, 4.0), 0.0, 1.0);
  float spec = pow(max(dot(R, uSunDir), 0.0), 220.0) * 2.0 * step(0.0, uSunDir.y + 0.02);
  vec3 col = mix(base, sky, fres * 0.9) + uSunColor * spec;
  float alpha = mix(0.38, 0.97, smoothstep(0.0, 3.2, depth));
  alpha = max(alpha, fres);
  // 岸際の泡
  float foam = smoothstep(1.0, 0.0, dL + 0.25 * sin(uTime*1.6 + vW.x*2.3 + vW.z*1.7)) * step(0.001, s.r + s.g);
  col = mix(col, vec3(0.9, 0.95, 0.95) * (0.3 + 0.7*uDay), foam * 0.45);
  alpha = max(alpha, foam * 0.6);
  float f = smoothstep(uFogNear, uFogFar, vFogDepth);
  col = mix(col, uFogColor, f);
  gl_FragColor = vec4(col, alpha);
  #include <colorspace_fragment>
}
`,Id=class{constructor(e,t){this.group=new hn;let n=new Uint8Array(409600);for(let t=0;t<102400;t++)e.ground[t]===0?(n[t*4]=Math.min(255,e.dLand[t]/24*255),n[t*4+1]=Math.min(255,e.depth[t]/10*255)):(n[t*4]=0,n[t*4+1]=0),n[t*4+3]=255;this.tex=new li(n,320,320,N),this.tex.magFilter=h,this.tex.minFilter=h,this.tex.needsUpdate=!0,this.mat=new bo({vertexShader:Pd,fragmentShader:Fd,transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uAmp:{value:1},uDay:{value:1},uFogNear:{value:60},uFogNear2:{value:0},uFogFar:{value:320},uHorizon:{value:new J},uZenith:{value:new J},uSunDir:{value:new G(0,1,0)},uSunColor:{value:new J},uFogColor:{value:new J},uShore:{value:this.tex},uOrg:{value:new W(-80,-80)},uSize:{value:320*Ku}}}),this.setSegments(t);let r=1600,i=new _r,a=[[-1600,-1600,r,-100],[-1600,100,r,r],[-1600,-100,-100,100],[100,-100,r,100]],o=[];for(let[e,t,n,r]of a)o.push(e,0,t,e,0,r,n,0,r,e,0,t,n,0,r,n,0,t);i.setAttribute(`position`,new Y(o,3));let s=new X(i,this.mat);s.position.y=Ld,s.renderOrder=2,s.frustumCulled=!1,s.name=`waterFar`,this.group.add(s)}setSegments(e){this.near&&(this.group.remove(this.near),this.near.geometry.dispose());let t=new oo(200,200,e,e).rotateX(-Math.PI/2);this.near=new X(t,this.mat),this.near.position.y=Ld,this.near.renderOrder=2,this.near.frustumCulled=!1,this.near.name=`waterNear`,this.group.add(this.near)}update(e,t,n,r){let i=this.mat.uniforms;i.uTime.value=e,i.uAmp.value=n,i.uDay.value=t.dayLight,i.uHorizon.value.copy(t.horizon),i.uZenith.value.copy(t.zenith),i.uSunDir.value.copy(t.sunDir),i.uSunColor.value.copy(t.sunColor),i.uFogColor.value.copy(t.fog),i.uFogNear.value=r.near,i.uFogFar.value=r.far}},Ld=-1.5,Rd=`
varying vec3 vDir;
void main(){ vDir = normalize(position); vec4 p = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * p; gl_Position.z = gl_Position.w; }
`,zd=`
varying vec3 vDir;
uniform vec3 uZenith, uHorizon, uSunDir, uSunColor; uniform float uDay, uTime;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
void main(){
  vec3 d = normalize(vDir);
  float y = max(d.y, 0.0);
  vec3 col = mix(uHorizon, uZenith, pow(y, 0.55));
  // 太陽
  float sd = max(dot(d, uSunDir), 0.0);
  col += uSunColor * (pow(sd, 600.0) * 4.0 + pow(sd, 18.0) * 0.35);
  // 雲（低コスト fbm 2 オクターブ）
  if (d.y > 0.02) {
    vec2 p = d.xz / (d.y + 0.25) * 1.6 + vec2(uTime*0.004, 0.0);
    float c = vn(p*1.3)*0.65 + vn(p*3.1)*0.35;
    c = smoothstep(0.52, 0.85, c) * smoothstep(0.02, 0.25, d.y);
    vec3 cc = mix(uHorizon*0.9, vec3(1.0), 0.55) * (0.35 + 0.65*uDay);
    col = mix(col, cc, c*0.75);
  }
  // 星
  float night = 1.0 - smoothstep(0.0, 0.35, uDay);
  if (night > 0.01 && d.y > 0.0) {
    vec2 sp = vec2(atan(d.x, d.z) * 70.0, d.y * 110.0);
    vec2 fc = fract(sp) - 0.5;
    float s = step(0.985, h(floor(sp))) * smoothstep(0.32, 0.05, length(fc));
    col += vec3(s) * night * smoothstep(0.0, 0.2, d.y);
  }
  // 海面に向かう下半球はフォグ色
  col = mix(col, uHorizon, smoothstep(0.0, -0.15, d.y));
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`,Bd=class{constructor(){this.u={uZenith:{value:new J},uHorizon:{value:new J},uSunDir:{value:new G},uSunColor:{value:new J},uDay:{value:1},uTime:{value:0}};let e=new bo({vertexShader:Rd,fragmentShader:zd,uniforms:this.u,side:1,depthWrite:!1,depthTest:!1,fog:!1});this.mesh=new X(new uo(500,24,16),e),this.mesh.renderOrder=-10,this.mesh.frustumCulled=!1,this.mesh.name=`sky`}apply(e){this.u.uZenith.value.copy(e.zenith),this.u.uHorizon.value.copy(e.horizon),this.u.uSunDir.value.copy(e.sunDir),this.u.uSunColor.value.copy(e.sunColor),this.u.uDay.value=e.dayLight}};function Vd(e,t){let n=e.grid,r=new hn;r.name=`props`;let i=new Co({vertexColors:!0}),a=new hd,o=pd(2835800);for(let e of sd){let t=pd(e.body),n=pd(e.roof);if(a.box(e.x0,0,e.z0,e.x1,e.h,e.z1,t,!0),e.roofKind===`gable`?a.gable(e.x0,e.z0,e.x1,e.z1,e.h,Math.min(e.x1-e.x0,e.z1-e.z0)*.22+.6,.35,n,!!e.ridgeX):a.box(e.x0-.05,e.h,e.z0-.05,e.x1+.05,e.h+.12,e.z1+.05,md(n,.8),!0),e.windows)for(let t of[-1,1]){let n=t<0?e.z0-.04:e.z1+.04;for(let r=e.x0+1.4;r<e.x1-1.2;r+=2.6)e.door===(t<0?`N`:`S`)&&Math.abs(r-(e.x0+e.x1)/2)<1.8||a.box(r-.55,1.4,n-.04,r+.55,2.3,n+.04,o,!0)}if(e.roofKind===`flat`){let n=md(t,.85);for(let t=e.x0+.5;t<e.x1;t+=.7)a.box(t-.04,.1,e.z0-.04,t+.04,e.h-.1,e.z0,n,!0),a.box(t-.04,.1,e.z1,t+.04,e.h-.1,e.z1+.04,n,!0)}if(e.door){let t=(e.x0+e.x1)/2,n=e.door===`N`?e.z0-.05:e.z1+.05;if(a.box(t-.7,0,n-.05,t+.7,2.2,n+.05,pd(8014378),!0),e.id===`shop`){for(let t=0;t<6;t++)a.box(e.x0+2.5+t*.85,2.45,e.z0-1.4,e.x0+2.5+(t+1)*.85,2.6,e.z0,t%2?pd(16117992):pd(14239037),!0);a.box(e.x0+.6,0,e.z0-.5,e.x0+1.6,1,e.z0-.1,pd(9136701),!0);for(let t=0;t<4;t++)a.box(e.x0+.7+t*.22,1,e.z0-.35,e.x0+.78+t*.22,2.4,e.z0-.27,pd(2763306),!0)}}}let s=pd(13158592);for(let e=-40;e<=48;e+=2)a.box(e-.05,0,41.9,e+.05,1.1,42,s,!0);a.box(-40,.9,41.92,48,.98,41.98,s,!0),a.box(-40,.5,41.92,48,.58,41.98,s,!0);for(let[e,t,,n]of[[-12,3.6,.1,16053488],[-2.5,2.4,-.05,3832789],[8,3.8,.12,16053488],[-27,-3,0,15251504]]){let r=pd(n),i=pd(9120555);a.box(e-2.4,-1.95,t-.85,e+2.4,-1.4,t+.85,i,!0),a.box(e-2.4,-1.4,t-.85,e+2.4,-.55,t+.85,r,!0),a.box(e+2.4,-1.4,t-.45,e+3.2,-.55,t+.45,r,!0),a.box(e-1,-.55,t-.6,e+.5,.5,t+.6,md(r,.95),!0),a.box(e-.9,0,t-.62,e+.4,.35,t+.62,o,!0),a.box(e-.04,.5,t-.04,e+.04,2.4,t+.04,pd(5592405),!0)}for(let t of e.crates)a.box(t.x-t.w/2,0,t.z-t.d/2,t.x+t.w/2,t.h,t.z+t.d/2,pd(t.c),!0);for(let e of[-35.2,-17.8])for(let t=0;t<4;t++)a.box(e-.07,t*.3,7.6,e+.07,(t+1)*.3,7.6+.14,t%2?pd(2236962):pd(15254568),!0);let c=new X(a.build(),i);c.name=`buildings`,r.add(c);{let e=new hd;e.box(-31,0,17.6,-21,.06,19,[1,1,1],!0);let t=Td(),n=new X(e.build(),new Co({map:t,vertexColors:!0}));n.name=`baseDeck`,r.add(n)}for(let[e,t,a,o,s,c,l]of[[`潮風つり具`,`しおかぜ（準備中）`,`#1f4f8f`,`#ffffff`,5,17,3.4],[`拠点`,`BASE / 準備中`,`#3f6a55`,`#f2f2e6`,-26,17,3],[`魚市場`,`FISH MARKET / 準備中`,`#7a3b2a`,`#fff2da`,18,26.9,3],[`穴釣りエリア`,`隙間に落ちないよう注意`,`#e8c428`,`#222222`,-22.5,12.3,2.2]]){let u=new Yr({map:Ad(e,t,a,o)}),d=e===`穴釣りエリア`?2.6:3.6,f=d*192/512;for(let e of[1,-1]){let t=new X(new oo(d,f),u);t.position.set(s,l,c+e*.03),t.rotation.y=e===1?0:Math.PI,r.add(t)}let p=new hd;p.box(s-d/2+.1,0,c-.04,s-d/2+.2,l,c+.04,pd(5592405),!0),p.box(s+d/2-.2,0,c-.04,s+d/2-.1,l,c+.04,pd(5592405),!0),r.add(new X(p.build(),i));for(let e of[s-d/2+.15,s+d/2-.15]){let t=Yu(e),r=Xu(c);n.inB(t,r)&&(n.blocked[r*320+t]=1)}}let l=new hd;l.addGeo(new Hi(.15,.2,.42,8),new q().makeTranslation(0,.21,0),pd(3095106)),l.addGeo(new Hi(.24,.16,.12,8),new q().makeTranslation(0,.46,0),pd(15254568));let u=Hd(l.build(),i,e.bollards.map(e=>[e.x,n.heightAt(e.x,e.z),e.z,0,1]));u.name=`bollards`,r.add(u);let d=new hd;d.addGeo(new Hi(.06,.09,4.4,6),new q().makeTranslation(0,2.2,0),pd(5265504)),d.addGeo(new Bi(.9,.05,.05),new q().makeTranslation(.35,4.4,0),pd(5265504));let f=Hd(d.build(),i,e.lamps.map(e=>[e.x,0,e.z,0,1]));f.name=`lampPoles`,r.add(f);let p=new Yr({color:16771496}),m=Hd(new uo(.16,8,6),p,e.lamps.map(e=>[e.x+.8,4.34,e.z,0,1]));m.name=`lampHeads`,r.add(m);let h=new hd,g=new G(0,1,0);for(let e of[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]]){let t=new G(e[0],e[1],e[2]).normalize(),n=new q().compose(t.clone().multiplyScalar(.45),new vt().setFromUnitVectors(g,t),new G(1,1,1));h.addGeo(new Hi(.17,.27,.95,5),n,pd(10855323))}let _=e.tetras.slice(0,t.tetraMax),v=new vi(h.build(),i,_.length);{let e=new q,t=new Xt,n=new vt,r=new G;_.forEach((i,a)=>{t.set($u(a,1,51)*6.28,$u(a,2,51)*6.28,$u(a,3,51)*6.28),n.setFromEuler(t),r.setScalar(i.r*1.4),e.compose(new G(i.x,i.y,i.z),n,r),v.setMatrixAt(a,e)})}v.name=`tetrapods`,r.add(v);let y=new ao(.75,0);{let e=y.getAttribute(`position`);for(let t=0;t<e.count;t++){let n=1+.18*Math.sin(e.getX(t)*7.1+e.getZ(t)*5.3+e.getY(t)*3.7);e.setXYZ(t,e.getX(t)*n,e.getY(t)*n,e.getZ(t)*n)}y.computeVertexNormals()}let b=new vi(y,new Co({color:16777215}),e.rocks.length);{let t=new q,r=new vt,i=new Xt,a=new J;e.rocks.forEach((e,o)=>{i.set(0,$u(o,5,61)*6.28,0),r.setFromEuler(i);let s=n.groundAt(Yu(e.x),Xu(e.z))===$.WATER;t.compose(new G(e.x,s?qu+.05:.15,e.z),r,new G(e.s*1.1,e.s*.8,e.s*1.1)),b.setMatrixAt(o,t);let c=.38+$u(o,6,61)*.22;a.setRGB(c*1.05,c,c*.92),b.setColorAt(o,a)})}b.name=`rocks`,r.add(b);let x=new oo(.28,1,1,4);x.translate(0,.5,0);let S={value:0},C=new Co({color:16777215,side:2});C.onBeforeCompile=e=>{e.uniforms.uTimeW=S,e.vertexShader=`uniform float uTimeW;
`+e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
 transformed.x += sin(uTimeW*1.6 + instanceMatrix[3].x*0.7 + instanceMatrix[3].z*0.5) * 0.28 * position.y * position.y;`)};let w=[],T=0;for(;w.length<t.seaweed&&T++<t.seaweed*60;){let e=Math.floor($u(T,1,71)*320),t=Math.floor($u(T,2,71)*320),r=t*320+e;if(n.ground[r]!==$.WATER||n.tetra[r])continue;let i=n.zone[r],a=i===Wu.Weed?.9:i===Wu.Reef?.5:i===Wu.Wall?.25:i===Wu.Shallow?.12:0;if($u(T,3,71)>a)continue;let o=n.depth[r];if(o>7)continue;let s=Zu(e),c=Qu(t);s<-70||s>62||c<-62||c>30||w.push({x:s,z:c,s:Math.min(2.8,.7+o*.5)*(.7+$u(T,4,71)*.6)})}let E=new vi(x,C,w.length);{let e=new q,t=new vt,r=new Xt,i=new J;w.forEach((a,o)=>{let s=n.depth[Xu(a.z)*320+Yu(a.x)];r.set(0,$u(o,7,71)*3.14,0),t.setFromEuler(r),e.compose(new G(a.x,qu-s,a.z),t,new G(1,a.s,1)),E.setMatrixAt(o,e),i.setRGB(.1+$u(o,8,71)*.12,.35+$u(o,9,71)*.2,.12),E.setColorAt(o,i)})}E.name=`seaweed`,r.add(E);let D=new hd;for(let[e,t,n,r,i,a]of[[-120,150,120,46,4218959,7],[20,190,160,70,3561542,7],[150,160,120,50,4218959,6],[-230,120,140,60,3561542,7],[-100,-330,160,26,6124680,7],[60,-360,200,34,5664895,7],[220,-300,140,24,6124680,7],[-260,-240,100,20,6124680,6]])D.addGeo(new Ui(1,1,a),new q().compose(new G(e,r/2-1,t),new vt,new G(n/2,r,n/2)),pd(i));r.add(new X(D.build(),i));let O=[];new hd;let k=[],A=[],j=[],M=new hn;M.name=`spotLabels`;for(let e of ld){var N;let t=(N=ad(n,e.x,e.z,6))==null?[e.x,e.z]:N;{let r=1e9,i=null;for(let t=-18;t<=18;t++)for(let a=-18;a<=18;a++){let o=Yu(e.x)+a,s=Xu(e.z)+t;if(!n.inB(o,s)||!n.reach[s*320+o]||!n.walkable(o,s)||n.dWater[s*320+o]>1.3)continue;let c=Math.hypot(a,t);c<r&&(r=c,i=[Zu(o),Qu(s)])}i&&r<9&&(t=i)}O.push({def:e,x:t[0],z:t[1]});let r=n.heightAt(t[0],t[1])+.04,i=k.length/3,a=.55,o=.8;for(let e=0;e<=20;e++){let n=e/20*Math.PI*2,i=Math.cos(n),s=Math.sin(n);k.push(t[0]+i*a,r,t[1]+s*a,t[0]+i*o,r,t[1]+s*o),A.push(0,0)}for(let e=0;e<20;e++){let t=i+e*2;j.push(t,t+1,t+3,t,t+3,t+2)}let s=k.length/3;for(let e=0;e<=20;e++){let n=e/20*Math.PI*2,i=Math.cos(n)*.5,a=Math.sin(n)*.5;k.push(t[0]+i,r,t[1]+a,t[0]+i,r+4,t[1]+a),A.push(1,0,1,1)}for(let e=0;e<20;e++){let t=s+e*2;j.push(t,t+1,t+3,t,t+3,t+2)}let c=new Hr(new Or({map:Ud(e.name),transparent:!0,depthTest:!1,fog:!1}));c.scale.set(5.2,.9,1),c.position.set(t[0],r+4.6,t[1]),c.renderOrder=20,M.add(c)}let ee=k.length/3,P=new Float32Array(ee),te=new Float32Array(ee);{let e=0;for(let t=0;t<ld.length;t++){for(let t=0;t<=20;t++)P[e]=0,te[e++]=0,P[e]=0,te[e++]=0;for(let t=0;t<=20;t++)P[e]=1,te[e++]=0,P[e]=1,te[e++]=1}}let ne=new _r;ne.setAttribute(`position`,new Y(k,3)),ne.setAttribute(`aKind`,new rr(P,1)),ne.setAttribute(`aH`,new rr(te,1)),ne.setIndex(j);let re={uTime:{value:0},uCam:{value:new G}},ie=new X(ne,new bo({uniforms:re,transparent:!0,depthWrite:!1,side:2,blending:2,vertexShader:`attribute float aKind; attribute float aH; varying float vK; varying float vH; varying vec3 vW; void main(){ vK=aKind; vH=aH; vW=position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,fragmentShader:`uniform float uTime; uniform vec3 uCam; varying float vK; varying float vH; varying vec3 vW; void main(){ float p = 0.65+0.35*sin(uTime*3.0); float near = smoothstep(3.0,9.0,distance(vW.xz,uCam.xz)); float a = vK<0.5 ? 0.9*p : (1.0-vH)*0.38*p*near; gl_FragColor = vec4(1.0,0.78,0.25,a);
#include <colorspace_fragment>

 }`}));ie.frustumCulled=!1,ie.renderOrder=5,ie.name=`spotMarkers`;let ae=new hn;return ae.name=`hints`,ae.add(ie,M),r.add(ae),{group:r,markers:O,hints:ae,update(e,t){if(S.value=e,re.uTime.value=e,t){re.uCam.value.copy(t);for(let e of M.children)e.visible=Math.hypot(e.position.x-t.x,e.position.z-t.z)>9}},lampMat:p,lampHead:m,stats:{weeds:w.length,tetras:_.length,rocks:e.rocks.length}}}function Hd(e,t,n){let r=new vi(e,t,n.length),i=new q,a=new vt,o=new Xt;return n.forEach((e,t)=>{o.set(0,e[3],0),a.setFromEuler(o),i.compose(new G(e[0],e[1],e[2]),a,new G(e[4],e[4],e[4])),r.setMatrixAt(t,i)}),r.frustumCulled=!1,r}function Ud(e){var t;let n=document.createElement(`canvas`);n.width=512,n.height=88;let r=n.getContext(`2d`);r.fillStyle=`rgba(10,25,40,0.72)`,r.beginPath(),(t=r.roundRect)==null||t.call(r,4,4,504,80,18),r.roundRect||r.rect(4,4,504,80),r.fill(),r.strokeStyle=`#ffc94a`,r.lineWidth=3,r.stroke(),r.fillStyle=`#fff`,r.textAlign=`center`,r.textBaseline=`middle`,r.font=`bold 40px "Hiragino Sans","Noto Sans JP","Noto Sans CJK JP",sans-serif`,r.fillText(`★ `+e,256,46,490);let i=new Ii(n);return i.colorSpace=Ue,i}var Wd=1.6,Gd=class{constructor(e){this.g=e,this.x=0,this.z=0,this.y=0,this.yaw=0,this.pitch=0,this.moved=0}place(e,t,n=0){this.x=e,this.z=t,this.yaw=n,this.pitch=0,this.y=this.g.heightAt(e,t)}isSafe(e,t){return!this.g.blockedCircle(e,t,Ju)}update(e,t,n,r,i){let a=Math.hypot(t,n);if(a<.001){this.y=this.g.heightAt(this.x,this.z);return}let o=Math.min(1,a)/a;t*=o,n*=o;let s=(r?6:3)*i*e,c=-Math.sin(this.yaw),l=-Math.cos(this.yaw),u=Math.cos(this.yaw),d=-Math.sin(this.yaw),f=(c*n+u*t)*s,p=(l*n+d*t)*s,m=Math.max(1,Math.ceil(Math.hypot(f,p)/.12));f/=m,p/=m;for(let e=0;e<m;e++){let e=this.x,t=this.z;this.g.blockedCircle(this.x+f,this.z,.35)||(this.x+=f),this.g.blockedCircle(this.x,this.z+p,.35)||(this.z+=p),this.moved+=Math.hypot(this.x-e,this.z-t)}this.y=this.g.heightAt(this.x,this.z)}},Kd=class{constructor(e,t,n){this.layer=e,this.ring=t,this.knob=n,this.s={mx:0,mz:0,run:!1,lookDX:0,lookDY:0,fdx:0,fdy:0,fightHeld:!1},this.enabled=!1,this.lockMove=!1,this.joyId=null,this.lookId=null,this.jx0=0,this.jy0=0,this.lx=0,this.ly=0,this.keys=new Set,this.runLock=!1,this.edgeRun=!1,this.onKey=()=>{},this.fightMode=!1,this.flickOn=!1,this.onFlick=()=>{},this.lx0=0,this.ly0=0,this.lt0=0,this.joyActive=!1,this.down=e=>{if(!this.enabled)return;let t=window.innerWidth;if(e.pointerType===`mouse`){if(e.button!==0&&e.button!==2)return;this.lookId===null&&(this.lookId=e.pointerId,this.lx=this.lx0=e.clientX,this.ly=this.ly0=e.clientY,this.lt0=performance.now(),this.s.fightHeld=this.fightMode)}else if(e.clientX<t*.5&&!this.lockMove){if(this.joyId!==null)return;this.joyId=e.pointerId,this.jx0=e.clientX,this.jy0=e.clientY,this.joyActive=!0,this.ring.classList.add(`active`),this.radius,this.ring.style.transform=`translate(${e.clientX-this.ringHome().x}px, ${e.clientY-this.ringHome().y}px)`,this.knob.style.transform=`translate(0px,0px)`}else this.lookId===null&&(this.lookId=e.pointerId,this.lx=this.lx0=e.clientX,this.ly=this.ly0=e.clientY,this.lt0=performance.now(),this.s.fightHeld=this.fightMode)},this.move=e=>{if(e.pointerId===this.joyId){let t=this.radius,n=e.clientX-this.jx0,r=e.clientY-this.jy0,i=Math.hypot(n,r);this.edgeRun=i>=t*(this.edgeRun?.88:1),i>t&&(n=n/i*t,r=r/i*t),this.s.mx=n/t,this.s.mz=-r/t,Math.hypot(this.s.mx,this.s.mz)<.12&&(this.s.mx=0,this.s.mz=0),this.updateRun(),this.knob.style.transform=`translate(${n}px, ${r}px)`}else e.pointerId===this.lookId&&(this.fightMode?(this.s.fdx=e.clientX-this.lx0,this.s.fdy=e.clientY-this.ly0):(this.s.lookDX+=e.clientX-this.lx,this.s.lookDY+=e.clientY-this.ly),this.lx=e.clientX,this.ly=e.clientY)},this.up=e=>{if(e.pointerId===this.joyId&&(this.joyId=null,this.joyActive=!1,this.s.mx=0,this.s.mz=0,this.edgeRun=!1,this.ring.classList.remove(`active`),this.ring.style.transform=``,this.knob.style.transform=``,this.recalcKeys()),e.pointerId===this.lookId){this.lookId=null;let t=e.clientX-this.lx0,n=e.clientY-this.ly0,r=performance.now()-this.lt0;!this.fightMode&&this.flickOn&&n<-90&&r<260&&Math.abs(t)<-n*.7&&this.onFlick(Math.max(.15,Math.min(1,(-n-60)/(window.innerHeight*.5)))),this.s.fightHeld=!1,this.s.fdx=0,this.s.fdy=0}},e.addEventListener(`pointerdown`,this.down),window.addEventListener(`pointermove`,this.move),window.addEventListener(`pointerup`,this.up),window.addEventListener(`pointercancel`,this.up),window.addEventListener(`keydown`,e=>{var t;this.enabled&&([`INPUT`,`SELECT`,`TEXTAREA`].includes((t=e.target)==null?void 0:t.tagName)||(this.keys.add(e.code),this.onKey(e.code),(e.code.startsWith(`Arrow`)||e.code===`Space`)&&e.preventDefault(),this.recalcKeys()))}),window.addEventListener(`keyup`,e=>{this.keys.delete(e.code),this.recalcKeys()}),window.addEventListener(`blur`,()=>{this.keys.clear(),this.reset()}),e.addEventListener(`contextmenu`,e=>e.preventDefault())}get radius(){return window.innerWidth>window.innerHeight?48:56}reset(){this.joyId=null,this.lookId=null,this.joyActive=!1,this.edgeRun=!1,this.s.fightHeld=!1,this.s.fdx=0,this.s.fdy=0,this.s.mx=0,this.s.mz=0,this.recalcKeys(),this.ring.classList.remove(`active`),this.ring.style.transform=``,this.knob.style.transform=``}recalcKeys(){if(this.joyId!==null)return;let e=this.keys,t=(e.has(`KeyD`)||e.has(`ArrowRight`)?1:0)-(e.has(`KeyA`)||e.has(`ArrowLeft`)?1:0),n=(e.has(`KeyW`)||e.has(`ArrowUp`)?1:0)-(e.has(`KeyS`)||e.has(`ArrowDown`)?1:0);this.s.mx=t,this.s.mz=n,this.updateRun()}updateRun(){this.s.run=this.runLock||this.edgeRun||this.keys.has(`ShiftLeft`)||this.keys.has(`ShiftRight`)}setRunLock(e){this.runLock=e,this.updateRun()}ringHome(){let e=this.ring.getBoundingClientRect(),t=this.ring.style.transform,n=/translate\(([-\d.]+)px, ([-\d.]+)px\)/.exec(t),r=n?parseFloat(n[1]):0,i=n?parseFloat(n[2]):0;return{x:e.left-r+e.width/2,y:e.top-i+e.height/2}}},qd=class{constructor(e,t){this.g=e,this.mode=`first`,this.fishing=!1,this.fishYaw=0,this.rodTilt=.6,this.camera=new fs(72,t,.12,3e3),this.camera.rotation.order=`YXZ`,this.rod=Jd(),this.avatar=Yd()}resize(e,t){this.camera.aspect=e/t,this.camera.fov=e>=t?62:76,this.camera.updateProjectionMatrix()}setMode(e){this.mode=e}enterFishing(e){this.fishing=!0,this.fishYaw=e}exitFishing(){this.fishing=!1}look(e,t,n,r){let i=.0042*r;e.yaw-=t*i,e.pitch-=n*i;let a=this.fishing?.25:1.35,o=this.fishing?-1.05:-1.35;if(e.pitch=Math.max(o,Math.min(a,e.pitch)),this.fishing){let t=e.yaw-this.fishYaw;t=Math.atan2(Math.sin(t),Math.cos(t)),t=Math.max(-.9,Math.min(.9,t)),e.yaw=this.fishYaw+t}}update(e,t){let n=this.camera,r=this.mode===`third`,i=e.y+Wd;if(!r)n.position.set(e.x,i,e.z);else{let t=this.fishing?2.4:3.6,r=Math.cos(e.pitch),a=t,o=Math.sin(e.yaw)*r,s=Math.cos(e.yaw)*r;for(;a>.4;a-=.25){let t=e.x+o*a,n=e.z+s*a,r=Yu(t),i=Xu(n);if(this.g.groundAt(r,i)===0&&!this.g.tetra[i*320+r]||!this.g.blockedCircle(t,n,.15))break}n.position.set(e.x+o*a,i+.5+Math.sin(-e.pitch)*a,e.z+s*a),n.position.y<e.y+.4&&(n.position.y=e.y+.4)}n.rotation.set(e.pitch,e.yaw,0),this.avatar.visible=r,this.avatar.position.set(e.x,e.y,e.z),this.avatar.rotation.y=e.yaw;let a=this.fishing?.3:.5;if(this.rodTilt+=(a-this.rodTilt)*Math.min(1,t*6),r){if(this.rod.parent!==this.avatar){var o;(o=this.rod.parent)==null||o.remove(this.rod),this.avatar.add(this.rod)}this.rod.position.set(-.28,1.15,-.25),this.rod.rotation.set(-(Math.PI/2-this.rodTilt),0,0)}else{if(this.rod.parent!==n){var s;(s=this.rod.parent)==null||s.remove(this.rod),n.add(this.rod)}let e=this.fishing;this.rod.position.set(e?.3:.26,e?-.3:-.28,-.4),this.rod.rotation.set(-(Math.PI/2-this.rodTilt),e?.05:.16,0)}}};function Jd(){let e=new hn;e.name=`rod`;let t=1.8,n=new X(new Hi(.004,.013,t,6).translate(0,t/2-.2,0),new Co({color:1777444})),r=new X(new Hi(.019,.019,.3,8).translate(0,0,0),new Co({color:12729130})),i=new X(new Bi(.03,.04,.07).translate(0,.14,.04),new Co({color:10134443}));return e.add(n,r,i),e.traverse(e=>{e.frustumCulled=!1}),e}function Yd(){let e=new hn;e.name=`avatar`;let t=e=>new Co({color:e}),n=new X(new Hi(.26,.3,.85,10).translate(0,1,0),t(3108784)),r=new X(new Hi(.2,.2,.6,10).translate(0,.3,0),t(3882824)),i=new X(new uo(.17,12,10).translate(0,1.6,0),t(15780256)),a=new X(new Hi(.18,.19,.1,10).translate(0,1.74,0),t(14239037));return e.add(n,r,i,a),e}var Xd={can:!1,reason:`水辺に近づこう`,yaw:0,edgeDist:99,depth:0,zone:0,zoneJa:``,hole:!1,nearTetra:!1,spot:null};function Zd(e,t,n,r){var i,a;let o=Yu(t),s=Xu(n),c=1e9,l=-1;for(let r=-5;r<=5;r++)for(let i=-5;i<=5;i++){let a=o+i,u=s+r;if(!e.inB(a,u)||e.ground[u*320+a]!==$.WATER)continue;let d=Math.hypot(Zu(a)-t,Qu(u)-n);d<c&&(c=d,l=u*320+a)}let u=null,d=4.5;for(let e of r){let r=Math.hypot(e.x-t,e.z-n);r<d&&(d=r,u=e)}if(l<0||c>1.7)return{...Xd,spot:u};let f=0,p=0,m=0;for(let r=-14;r<=14;r++)for(let i=-14;i<=14;i++){let a=o+i,c=s+r;if(!e.inB(a,c))continue;let l=c*320+a;if(e.ground[l]!==$.WATER||e.tetra[l])continue;let u=Math.hypot(i,r)*.5;if(u>7)continue;let d=1/(1+u*.3);f+=(Zu(a)-t)*d,p+=(Qu(c)-n)*d,m++}let h=0;h=m>0?Math.atan2(-f,-p):Math.atan2(-(Zu(l%320)-t),-(Qu(l/320|0)-n));let g=!!e.tetra[l]||Qd(e,o,s),_=e.zone[l];return{can:!0,reason:``,yaw:h,edgeDist:c,depth:e.depth[l],zone:_,zoneJa:(i=(a=Gu[_])==null?void 0:a.ja)==null?``:i,hole:!!e.hole[l],nearTetra:g,spot:u}}function Qd(e,t,n){for(let r=-5;r<=5;r++)for(let i=-5;i<=5;i++){let a=t+i,o=n+r;if(e.inB(a,o)&&e.tetra[o*320+a])return!0}return!1}var $d=`realFishingWorld.save`,ef=`realFishingWorld.save.corrupt`,tf=`realFishingWorld.save.v1backup`;function nf(e){return{quality:e?`mid`:`high`,moveSpeed:1,lookSens:1,hints:!0,camera:`first`,alwaysRun:!1,sound:!0,vibration:!0,auto:!1,assist:!0,oneHand:`off`,castPower:0,modeChosen:!1,tutStep:0,seenHints:[]}}function rf(e){return{version:2,settings:nf(e),position:null,profile:{createdAt:Date.now()},money:300,xp:0,level:1,zukan:{},catchLog:[],stats:{casts:0,bites:0,catches:0,lineBreaks:0,hookOuts:0,releases:0},lastRig:null}}var af=!1,of=(e,t,n,r)=>typeof e==`number`&&isFinite(e)?Math.min(n,Math.max(t,e)):r,sf=e=>!!e&&typeof e==`object`&&!Array.isArray(e);function cf(e,t,n){return e=sf(e)?e:(n.push(`settings`),{}),{quality:e.quality===`low`||e.quality===`mid`||e.quality===`high`?e.quality:t.quality,moveSpeed:of(e.moveSpeed,.6,1.6,1),lookSens:of(e.lookSens,.5,2,1),hints:typeof e.hints!=`boolean`||e.hints,camera:e.camera===`third`?`third`:`first`,alwaysRun:typeof e.alwaysRun==`boolean`&&e.alwaysRun,sound:typeof e.sound!=`boolean`||e.sound,vibration:typeof e.vibration!=`boolean`||e.vibration,auto:typeof e.auto==`boolean`&&e.auto,assist:typeof e.assist!=`boolean`||e.assist,oneHand:e.oneHand===`right`||e.oneHand===`left`?e.oneHand:`off`,castPower:of(e.castPower,0,1,0),modeChosen:typeof e.modeChosen==`boolean`&&e.modeChosen,tutStep:Math.round(of(e.tutStep,0,4,0)),seenHints:Array.isArray(e.seenHints)?e.seenHints.filter(e=>typeof e==`string`).slice(0,40):[]}}function lf(e){return sf(e)&&typeof e.x==`number`&&typeof e.z==`number`&&isFinite(e.x)&&isFinite(e.z)?{x:e.x,z:e.z,yaw:of(e.yaw,-1e3,1e3,0)}:null}function uf(e){return!sf(e)||typeof e.floatId!=`string`||typeof e.hookId!=`string`||typeof e.baitId!=`string`?null:{floatId:e.floatId,hookId:e.hookId,baitId:e.baitId,depthM:of(e.depthM,.5,10,3)}}var df={1:(e,t,n)=>({...e,version:2,settings:cf(e.settings,nf(t),n),profile:{createdAt:Date.now()},money:300,xp:0,level:1,zukan:{},catchLog:[],stats:{casts:0,bites:0,catches:0,lineBreaks:0,hookOuts:0,releases:0},lastRig:null})};function ff(e,t,n){var r;let i=rf(t),a={};if(sf(e.zukan))for(let[t,r]of Object.entries(e.zukan))sf(r)?a[t]={firstCaughtAt:of(r.firstCaughtAt,0,0x38d7ea4c68000,0),count:Math.round(of(r.count,0,1e7,1)),maxSizeCm:of(r.maxSizeCm,0,1e3,0),bestQuality:of(r.bestQuality,0,1,.5)}:n.push(`zukan:`+t);else e.zukan!==void 0&&n.push(`zukan`);let o=[];if(Array.isArray(e.catchLog))for(let t of e.catchLog.slice(-300)){var s,c;!sf(t)||typeof t.speciesId!=`string`?n.push(`catchLog`):o.push({id:String((s=(c=t.id)==null?t.at:c)==null?o.length:s),at:of(t.at,0,0x38d7ea4c68000,0),speciesId:t.speciesId,sizeCm:of(t.sizeCm,0,1e3,0),weightKg:of(t.weightKg,0,5e3,0),quality:of(t.quality,0,1,.5),method:`float`,spotId:typeof t.spotId==`string`?t.spotId:`free`,fate:t.fate===`release`?`release`:`keep`,earnedG:of(t.earnedG,0,1e9,0),xp:of(t.xp,0,1e9,0),dataMode:t.dataMode===`live`||t.dataMode===`mixed`?t.dataMode:`demo`,hour:of(t.hour,0,24,12)})}else e.catchLog!==void 0&&n.push(`catchLog`);let l=sf(e.stats)?e.stats:{};return{version:2,settings:cf(e.settings,i.settings,n),position:lf(e.position),profile:{createdAt:of((r=e.profile)==null?void 0:r.createdAt,0,0x38d7ea4c68000,i.profile.createdAt)},money:Math.round(of(e.money,0,1e9,300)),xp:Math.round(of(e.xp,0,1e9,0)),level:Math.round(of(e.level,1,999,1)),zukan:a,catchLog:o,stats:{casts:of(l.casts,0,1e9,0),bites:of(l.bites,0,1e9,0),catches:of(l.catches,0,1e9,0),lineBreaks:of(l.lineBreaks,0,1e9,0),hookOuts:of(l.hookOuts,0,1e9,0),releases:of(l.releases,0,1e9,0)},lastRig:uf(e.lastRig)}}function pf(e,t){let n=[],r=JSON.parse(e);if(!sf(r)||typeof r.version!=`number`||!isFinite(r.version))throw Error(`no version`);if(r.version>2)return{data:rf(t),migrated:!1,newer:!0,repairs:n};let i=!1;for(;r.version<2;){let e=df[r.version];if(!e)throw Error(`no migration from v`+r.version);r=e(r,t,n),i=!0}return{data:ff(r,t,n),migrated:i,newer:!1,repairs:n}}function mf(e){let t=rf(e),n=null;try{n=localStorage.getItem($d)}catch{return{data:t,status:`unavailable`,note:`この環境では保存できません（プライベートブラウズ等）。`,repairs:[]}}if(!n)return{data:t,status:`new`,note:``,repairs:[]};try{let r=pf(n,e);if(r.newer)return af=!0,{data:t,status:`locked`,note:`新しいバージョンのセーブデータがあるため、上書きしません（この版では保存されません）。`,repairs:[]};if(r.migrated)try{localStorage.getItem(`realFishingWorld.save.v1backup`)||localStorage.setItem(tf,n)}catch{}return{data:r.data,status:r.migrated?`migrated`:`loaded`,note:r.repairs.length?`一部のセーブ項目を修復しました。`:``,repairs:r.repairs}}catch{let e=!1;try{localStorage.setItem(ef,n),e=!0}catch{}if(e)try{localStorage.removeItem($d)}catch{}else af=!0;return{data:t,status:`reset`,note:`セーブデータが壊れていたため初期化しました（元データは隔離保存）。`,repairs:[]}}}function hf(e){if(af)return!1;try{return localStorage.setItem($d,JSON.stringify(e)),!0}catch{return!1}}function gf(){try{return localStorage.removeItem($d),!0}catch{return!1}}function _f(e,t,n){let r={id:`${t.at}-${e.stats.catches}`,at:t.at,speciesId:t.speciesId,sizeCm:t.sizeCm,weightKg:t.weightKg,quality:t.quality,method:`float`,spotId:n,fate:`keep`,earnedG:0,xp:0,dataMode:`demo`,hour:t.hour};e.catchLog.push(r),e.catchLog.length>300&&e.catchLog.splice(0,e.catchLog.length-300),e.stats.catches++;let i=e.zukan[t.speciesId],a=!1,o=!1;return i?(i.count++,t.sizeCm>i.maxSizeCm&&(i.maxSizeCm=t.sizeCm,o=!0),i.bestQuality=Math.max(i.bestQuality,t.quality)):(e.zukan[t.speciesId]={firstCaughtAt:t.at,count:1,maxSizeCm:t.sizeCm,bestQuality:t.quality},a=!0),{entry:r,first:a,newMax:o}}function vf(e,t){let n=e.catchLog.find(e=>e.id===t);return!n||n.fate===`release`?!1:(n.fate=`release`,e.stats.releases++,!0)}var yf={low:{id:`low`,label:`低（軽量）`,dpr:1,waterSeg:48,detail:.35,fpsCap:30,note:`省電力・30fps上限`},mid:{id:`mid`,label:`中（標準）`,dpr:1.25,waterSeg:80,detail:.7,fpsCap:30,note:`30fps上限`},high:{id:`high`,label:`高（きれい）`,dpr:1.5,waterSeg:128,detail:1,fpsCap:60,note:`重い端末では非推奨`}};function bf(){let e=navigator.userAgent;return/iPhone|iPad|iPod/.test(e)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1}function xf(){return`ontouchstart`in window||navigator.maxTouchPoints>0}function Sf(e){return Math.max(1,Math.min(e.dpr,window.devicePixelRatio||1,2))}var Cf=class{constructor(){this.times=[],this.fps=0}tick(e){for(this.times.push(e);this.times.length>2&&e-this.times[0]>2e3;)this.times.shift();this.times.length>5&&(this.fps=(this.times.length-1)*1e3/(e-this.times[0]))}},wf=34.6*Math.PI/180,Tf=[{e:-14,z:330004,h:858675,sun:0,hemi:.28,sc:8362704},{e:-4,z:1713223,h:5917290,sun:0,hemi:.35,sc:16751200},{e:2,z:3821704,h:15766876,sun:.7,hemi:.5,sc:16754784},{e:12,z:4880568,h:15255976,sun:1.4,hemi:.7,sc:16769208},{e:30,z:4161476,h:12770540,sun:2,hemi:.85,sc:16774368},{e:90,z:3832e3,h:12573162,sun:2.1,hemi:.9,sc:16774888}];function Ef(e){if(e!=null&&!Number.isNaN(e))return e;let t=new Date;return t.getHours()+t.getMinutes()/60+t.getSeconds()/3600}var Df=new J,Of=new J;function kf(e,t,n=Af()){let r=23.44*Math.PI/180*Math.sin(2*Math.PI*(284+n)/365),i=(e-12)*15*Math.PI/180,a=Math.sin(wf)*Math.sin(r)+Math.cos(wf)*Math.cos(r)*Math.cos(i),o=Math.asin(Math.max(-1,Math.min(1,a))),s=Math.cos(o)||1e-6,c=-Math.cos(r)*Math.sin(i)/s,l=(Math.sin(r)-Math.sin(wf)*a)/(Math.cos(wf)*s);t.sunDir.set(c*s,a,-l*s).normalize(),t.hours=e;let u=o*180/Math.PI;t.elevDeg=u;let d=0;for(;d<Tf.length-2&&u>Tf[d+1].e;)d++;let f=Tf[d],p=Tf[d+1],m=Math.max(0,Math.min(1,(u-f.e)/(p.e-f.e)));t.zenith.set(f.z).lerp(Of.set(p.z),m),t.horizon.set(f.h).lerp(Of.set(p.h),m),t.sunColor.set(f.sc).lerp(Df.set(p.sc),m),t.sunIntensity=f.sun+(p.sun-f.sun)*m,t.hemiIntensity=f.hemi+(p.hemi-f.hemi)*m,t.dayLight=Math.max(0,Math.min(1,(u+6)/22)),t.fog.copy(t.horizon)}function Af(e=new Date){return Math.floor((e.getTime()-new Date(e.getFullYear(),0,0).getTime())/864e5)}function jf(){return{hours:12,sunDir:new G(0,1,0),elevDeg:45,zenith:new J,horizon:new J,sunColor:new J,sunIntensity:1,hemiIntensity:1,dayLight:1,fog:new J}}var Mf=[{id:`float`,ja:`ウキ釣り`,phase:`実装済み（Phase 2）`},{id:`lure`,ja:`ルアー`,phase:`Phase 4 で実装予定`},{id:`hole`,ja:`穴釣り`,phase:`Phase 4 で実装予定`}],Nf=e=>document.getElementById(e),Pf=class{constructor(e,t,n){this.cb=e,this.settings=t,this.mini=n,this.toastTimer=0,this.panelMode=null,this.renderers={},this.mapTimer=0,this.onPanel=()=>{},this.runOn=!1;let r=(e,t)=>Nf(e).addEventListener(`click`,e=>{e.preventDefault(),t()});r(`btnFish`,()=>e.onFish()),r(`btnExit`,()=>e.onExit()),r(`btnCam`,()=>e.onCam()),r(`btnMap`,()=>this.open(`map`)),r(`btnBag`,()=>this.open(`zukan`)),r(`btnMenu`,()=>this.open(`menu`)),r(`panelClose`,()=>this.close()),r(`btnRun`,()=>e.onRun(!this.runOn))}setRun(e){this.runOn=e;let t=Nf(`btnRun`);t.classList.toggle(`on`,e),t.setAttribute(`aria-pressed`,e?`true`:`false`),t.dataset.state=e?`on`:`off`,t.querySelector(`.lb`).textContent=e?`走る ON`:`走る`}setMode(e){document.body.dataset.mode=e}get panelOpen(){return this.panelMode!==null}toast(e,t=2600){let n=Nf(`toast`);n.textContent=e,n.classList.add(`show`),clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>n.classList.remove(`show`),t)}updateChip(e,t,n,r){let i=window.innerWidth<=340;Nf(`chipTop`).textContent=i?`${e}${t?`(デモ)`:``}`:`波戸浦港 ${e}${t?`（デモ時刻）`:` 実時刻`}`,Nf(`chipSub`).textContent=(i?r.replace(/（中身は準備中）$/,``):r)||(n.can?i?`✔釣れる ${n.depth.toFixed(1)}m`:`釣れる水際 ✔ 水深約${n.depth.toFixed(1)}m`:i?`水辺へ近づこう`:`水辺に近づくと釣れるよ`);let a=Nf(`btnFish`);a.classList.toggle(`off`,!n.can),a.dataset.state=n.can?`ready`:`disabled`}showFishing(e){Nf(`chipFTop`).textContent=`ウキ釣り`,Nf(`chipFSub`).textContent=e.spot&&e.spot.def?e.spot.def.name:`水際（自由な場所）`;let t=[`<b>${e.spot?e.spot.def.name:`水際（自由な場所）`}</b> ／ 水深 約${e.depth.toFixed(1)}m`,`海底: ${e.zoneJa}${e.hole?`（穴釣り向き）`:``}`];e.nearTetra&&t.push(`<span class="warn">⚠ テトラ帯は危険。上に乗らず安全な足場から。</span>`),Nf(`infoCard`).innerHTML=t.join(`<br>`)}open(e){this.panelMode=e;let t=Nf(`panelBody`);if(Nf(`panel`).classList.add(`open`),this.onPanel(!0),e===`map`){t.innerHTML=`<h2>マップ（波戸浦港）</h2>
        <div class="sec"><canvas id="mapCv"></canvas></div>
        <div class="sec"><h3>凡例</h3>★ 釣り場（目印） ／ 赤い矢印＝あなた ／ <span style="color:#e8c440">■</span> 穴釣りの隙間 ／ <span style="color:#a9ada8">■</span> テトラ帯（立入禁止）<br>水際ならどこでも釣り開始できます。マーカーは任意のヒントです。</div>`;let e=()=>{let e=this.cb.playerPos(),t=Nf(`mapCv`);t&&this.mini.draw(t,e.x,e.z,e.yaw)};e(),this.mapTimer=window.setInterval(e,250)}else if(e===`zukan`||e===`rig`){var n,r;(n=(r=this.renderers)[e])==null||n.call(r,t)}else this.renderMenu()}renderMenu(){let e=this.settings(),t=this.cb.info(),n=Nf(`panelBody`),r=(e,t,n)=>`<div class="row seg" data-seg="${e}">${t.map(([e,t])=>`<button data-v="${e}" class="${e===n?`on`:``}">${t}</button>`).join(``)}</div>`;n.innerHTML=`<h2>メニュー・設定</h2>
      <div class="sec"><h3>釣りの操作</h3>
        <div class="lbl">おまかせ釣り</div>${r(`auto`,[[`0`,`自分で釣る`],[`1`,`おまかせ`]],e.auto?`1`:`0`)}<div style="font-size:12px;opacity:.8">おまかせ：自動で投げ・合わせ・巻く。見ているだけで釣れます（画面の🤖でも切替）。</div>
        <div class="lbl">ファイトアシスト</div>${r(`assist`,[[`1`,`ON（ドラグ・竿を自動）`],[`0`,`OFF（自分で操作）`]],e.assist?`1`:`0`)}
        <div class="lbl">片手レイアウト</div>${r(`oneHand`,[[`off`,`OFF`],[`right`,`右手`],[`left`,`左手`]],e.oneHand)}<div style="font-size:12px;opacity:.8">釣りのボタンを片方の親指側に集めます。</div>
        <div class="row"><button class="act" id="btnTutorial">遊び方をもう一度（約30秒）</button></div></div>
      <div class="sec"><h3>画質</h3>${r(`quality`,[`low`,`mid`,`high`].map(e=>[e,yf[e].label]),e.quality)}
        <div style="font-size:12px;opacity:.8">重いときは「低」に。端末が重いと自動で下げることがあります（30fps上限は低/中。実機での安定動作は未確認）。</div></div>
      <div class="sec"><h3>視点</h3>${r(`camera`,[[`first`,`一人称（標準）`],[`third`,`三人称`]],e.camera)}</div>
      <div class="sec"><h3>移動速度 <span id="vSpeed">${e.moveSpeed.toFixed(1)}×</span></h3><input id="rngSpeed" type="range" min="0.6" max="1.6" step="0.1" value="${e.moveSpeed}">
        <h3 style="margin-top:8px">視点の感度 <span id="vLook">${e.lookSens.toFixed(1)}×</span></h3><input id="rngLook" type="range" min="0.5" max="2" step="0.1" value="${e.lookSens}"></div>
      <div class="sec"><h3>常に走る</h3>${r(`alwaysRun`,[[`1`,`ON（常に走る）`],[`0`,`OFF（歩き）`]],e.alwaysRun?`1`:`0`)}<div style="font-size:12px;opacity:.8">ONにすると、起動時と設定変更時に「走る」ロックがONになります。画面の「走る」ボタンでも切り替えられます（走る速さは歩きの約2倍）。</div></div>
      <div class="sec"><h3>効果音</h3>${r(`sound`,[[`1`,`ON`],[`0`,`OFF`]],e.sound?`1`:`0`)}<div style="font-size:12px;opacity:.8">アタリ音・巻く音など。iPhoneは本体のマナーモード（消音）だと鳴らないことがあります。</div></div>
      <div class="sec"><h3>振動・画面の揺れ</h3>${r(`vibration`,[[`1`,`ON`],[`0`,`OFF`]],e.vibration?`1`:`0`)}<div style="font-size:12px;opacity:.8">対応端末は振動します。iPhone Safari は振動に非対応のため、代わりに画面が揺れます。</div></div>
      <div class="sec"><h3>釣り場マーカー</h3>${r(`hints`,[[`1`,`表示`],[`0`,`非表示`]],e.hints?`1`:`0`)}</div>
      <div class="sec"><h3>セーブ</h3>設定・図鑑・釣果・最後の位置を端末内（localStorage）に保存します。<span style="opacity:.8">状態: ${t.saveStatus}</span>
        <div class="row"><button class="act" id="btnSaveNow">いま保存</button><button class="act" id="btnResetPos">スポーン地点へ戻る</button><button class="act danger" id="btnClear">セーブ削除</button></div></div>
      <div class="sec"><h3>釣法</h3>${Mf.map(e=>`${e.ja}<span class="tag">${e.phase}</span>`).join(`<br>`)}</div>
      <div class="sec"><h3>現在の情報</h3>
        時刻: ${t.timeLabel}（${t.timeDemo?`デモ指定`:`端末の現地時刻を使用`}）<br>
        天気・潮・水温・風: <b>デモ値</b>（実データ連動は未実装。時刻は端末の時刻）<br>
        FPS(計測): <span id="vFps">${t.fps?t.fps.toFixed(0):`-`}</span> ／ 描画 ${t.calls} calls ／ ${(t.tris/1e3).toFixed(0)}k tris ／ DPR ${t.dpr.toFixed(2)}<br>
        <small>${t.renderer}</small></div>
      <div class="sec"><h3>このバージョンについて</h3>REAL FISHING WORLD v0.3.0（Phase 2.1：操作性の改善）。架空の港「波戸浦港」です。<br>
        <b>未実装</b>: 実データ連動の天気・潮・水温／ルアー・穴釣り／ショップ・拠点／経済・レベル／見た目のリアル化（Phase 3 以降）。<br>
        <b>未検証</b>: iPhone 実機での操作感・fps・音・振動。</div>`;let i=e=>n.querySelectorAll(`[data-seg="${e}"] button`),a=(e,t)=>i(e).forEach(n=>n.addEventListener(`click`,()=>{t(n.dataset.v),i(e).forEach(e=>e.classList.toggle(`on`,e===n))}));a(`auto`,e=>this.change({auto:e===`1`})),a(`assist`,e=>this.change({assist:e===`1`})),a(`oneHand`,e=>this.change({oneHand:e})),Nf(`btnTutorial`).addEventListener(`click`,()=>{this.close(),this.cb.onTutorial()}),a(`quality`,e=>this.change({quality:e})),a(`camera`,e=>this.change({camera:e})),a(`alwaysRun`,e=>this.change({alwaysRun:e===`1`})),a(`sound`,e=>this.change({sound:e===`1`})),a(`vibration`,e=>this.change({vibration:e===`1`})),a(`hints`,e=>this.change({hints:e===`1`})),Nf(`rngSpeed`).addEventListener(`input`,e=>{let t=parseFloat(e.target.value);Nf(`vSpeed`).textContent=t.toFixed(1)+`×`,this.change({moveSpeed:t})}),Nf(`rngLook`).addEventListener(`input`,e=>{let t=parseFloat(e.target.value);Nf(`vLook`).textContent=t.toFixed(1)+`×`,this.change({lookSens:t})}),Nf(`btnSaveNow`).addEventListener(`click`,()=>this.toastPanel(this.cb.onSaveNow()?`保存しました`:`保存できませんでした（この環境では保存不可）`)),Nf(`btnClear`).addEventListener(`click`,()=>this.toastPanel(this.cb.onClearSave()?`セーブを削除しました`:`削除に失敗しました`)),Nf(`btnResetPos`).addEventListener(`click`,()=>{this.cb.onResetPos(),this.close()})}change(e){this.cb.onSettings({...this.settings(),...e})}toastPanel(e){this.toast(e)}close(){this.panelMode!==null&&(this.panelMode=null,clearInterval(this.mapTimer),Nf(`panel`).classList.remove(`open`),Nf(`panelBody`).innerHTML=``,this.onPanel(!1))}},Ff=-66,If=56,Lf=-58,Rf=46,zf=class{constructor(e,t){this.g=e,this.markers=t;let n=Yu(Ff),r=Yu(If),i=Xu(Lf),a=Xu(Rf);this.iw=r-n,this.ih=a-i,this.base=document.createElement(`canvas`),this.base.width=this.iw,this.base.height=this.ih;let o=this.base.getContext(`2d`),s=o.createImageData(this.iw,this.ih);for(let t=0;t<this.ih;t++)for(let r=0;r<this.iw;r++){let a=(i+t)*320+(n+r),o,c=e.ground[a];if(c===$.WATER){let t=Math.min(1,e.depth[a]/8);o=[Math.round(70-55*t),Math.round(160-90*t),Math.round(190-80*t)],e.tetra[a]?o=[150,156,152]:e.hole[a]&&(o=[232,196,64])}else o=e.blocked[a]&&c!==$.ROCK?[210,200,175]:c===$.CONCRETE?[170,170,164]:c===$.ASPHALT?[95,96,100]:c===$.SAND?[226,208,158]:c===$.ROCK?[120,106,90]:[96,142,80];let l=(t*this.iw+r)*4;s.data[l]=o[0],s.data[l+1]=o[1],s.data[l+2]=o[2],s.data[l+3]=255}o.putImageData(s,0,0)}draw(e,t,n,r){let i=e.width=Math.min(560,Math.max(280,e.clientWidth*(window.devicePixelRatio>1?1.5:1))|0),a=e.height=Math.round(i*this.ih/this.iw),o=e.getContext(`2d`);o.imageSmoothingEnabled=!1,o.drawImage(this.base,0,0,i,a),i/this.iw/.5*.5;let s=e=>(e-Ff)/122*i,c=e=>(e-Lf)/104*a;o.font=`bold ${Math.round(i/40)}px sans-serif`,o.textAlign=`center`;for(let e of cd){o.fillStyle=`rgba(0,0,0,.65)`;let t=s(e.x),n=c(e.z);o.fillText(e.name,t+1,n+1),o.fillStyle=`#fff`,o.fillText(e.name,t,n)}for(let e of this.markers){let t=s(e.x),n=c(e.z),r=i/55;o.beginPath();for(let e=0;e<10;e++){let i=e*Math.PI/5-Math.PI/2,a=e%2?r*.45:r;o.lineTo(t+Math.cos(i)*a,n+Math.sin(i)*a)}o.closePath(),o.fillStyle=`#ffc94a`,o.fill(),o.strokeStyle=`#3a2a00`,o.lineWidth=1.5,o.stroke()}let l=s(t),u=c(n),d=i/42;o.save(),o.translate(l,u),o.rotate(-r),o.beginPath(),o.moveTo(0,-d*1.3),o.lineTo(d*.85,d),o.lineTo(0,d*.45),o.lineTo(-d*.85,d),o.closePath(),o.fillStyle=`#ff4d4d`,o.fill(),o.strokeStyle=`#fff`,o.lineWidth=2,o.stroke(),o.restore(),o.fillStyle=`#fff`,o.font=`bold ${Math.round(i/32)}px sans-serif`,o.fillText(`N ↑`,i-i/16,i/20)}};function Bf(e){let t=window,n=()=>{if(!e.qa)throw Error(`QA mode only (?qa=1)`)};t.__rfw={qa:e.qa,state(){var n,r,i;let a=e.player;return{playing:e.playing,mode:e.mode,x:a.x,z:a.z,y:a.y,yaw:a.yaw,pitch:a.pitch,moved:a.moved,canFish:e.site.can,siteInfo:e.site.can?{depth:e.site.depth,zone:e.site.zoneJa,hole:e.site.hole,nearTetra:e.site.nearTetra,spot:(n=(r=e.site.spot)==null||(r=r.def)==null?void 0:r.id)==null?null:n,yaw:e.site.yaw}:null,fps:e.fps.fps,quality:e.settings.quality,alwaysRun:e.settings.alwaysRun,run:e.input.s.run,runLock:e.input.runLock,edgeRun:e.input.edgeRun,camera:e.rig.mode,dpr:e.renderer.getPixelRatio(),calls:e.renderer.info.render.calls,tris:e.renderer.info.render.triangles,geometries:e.renderer.info.memory.geometries,textures:e.renderer.info.memory.textures,saveStatus:e.saveStatus,sunElev:e.skyState.elevDeg,hours:e.skyState.hours,errors:(i=t.__rfwErrors)==null?[]:i}},blocked(t,n){return e.g.blockedCircle(t,n,.35)},reachableMarkers(){return e.props.markers.map(t=>({id:t.def.id,x:t.x,z:t.z,reach:!!e.g.reach[Math.floor((t.z+80)/.5)*320+Math.floor((t.x+80)/.5)],site:null}))},cell(t,n){let r=Math.floor((n+80)/.5)*320+Math.floor((t+80)/.5);return{ground:e.g.ground[r],blockedFlag:e.g.blocked[r],tetra:e.g.tetra[r],hole:e.g.hole[r],depth:e.g.depth[r],reach:e.g.reach[r]}},teleport(t,r,i=0){n(),e.player.place(t,r,i)},setYaw(t){n(),e.player.yaw=t},setQuality(t){n(),e.applyQuality(t)},startFishing(){e.startFishing()},exitFishing(){e.exitFishing()},saveNow(){return e.saveNow()},fishing:{state(){let t=e.fishing,n=t.session,r=t.view,i=e.rig.camera,a=r.floatPos.clone().project(i),o=t.ui.e,s=e=>e.classList.contains(`show`)||getComputedStyle(e).display!==`none`;return{active:t.active,phase:n.phase,quick:!!n.quick,auto:t.auto,assist:t.assist,snap:n.snapshot(),rig:{...n.rig},aimPower:n.aimPower,drag:n.inp.drag,theta:n.inp.theta,reel:n.inp.reel,steer:n.inp.steer,floatShown:r.floatShown,floatNdc:{x:a.x,y:a.y,z:a.z},shadows:r.shadowCount,rodBend:r.rodBend,catchShown:r.catchShown,fightFish:r.fightFishShown,fx:n.fx,fz:n.fz,seabed:n.seabed,baitLife:n.baitLife,snag:n.snag,stats:{...n.stats},fight:n.fight?{sp:n.fight.sp.id,nameJa:n.fight.sp.nameJa,dist:n.fight.dist,tension:n.fight.tension,mode:n.fight.mode,S:n.fight.S,result:n.fight.result,sizeCm:n.fight.sizeCm}:null,sfx:{...t.sfx.counts,state:t.sfx.state,enabled:t.sfx.enabled},hap:{...t.hap.counts,shake:t.hap.shake,canVibrate:t.hap.canVibrate,enabled:t.hap.enabled},biteEvents:t.biteEvents,inp:{flickOn:e.input.flickOn,lookId:e.input.lookId,fightMode:e.input.fightMode,enabled:e.input.enabled,active:t.active,yaw:e.player.yaw,land:t.session.landing(e.player.yaw,.6)},resultShown:t.resultShown,resultText:t.ui.e.result.textContent,log:t.log.slice(-30),ui:{action:o.action.textContent,actionClass:o.action.className,reel:s(o.reel),ten:s(o.ten),power:s(o.power),rod:s(o.rod),retrieve:s(o.retrieve),aim:s(o.aim),auto:s(o.auto),autoOn:o.auto.classList.contains(`on`),cue:o.cue.textContent,tut:{step:t.tut.step,text:document.getElementById(`tutTxt`).textContent,shown:document.getElementById(`tutBar`).classList.contains(`show`)},info:o.info.textContent,card:o.card.textContent},save:{zukan:t.d.data.zukan,catchLog:t.d.data.catchLog.length,stats:{...t.d.data.stats},lastRig:t.d.data.lastRig}}},cast(t=.6){let n=e.fishing;return n.session.phase===`ready`&&n.session.startAim(),n.session.cast(t,e.player.yaw)},act(){e.fishing.act()},hookset(){e.fishing.session.hookset()},setRig(t){e.fishing.session.setRig(t),e.fishing.d.data.lastRig={...e.fishing.session.rig}},freeze(t){n(),e.fishing.qaFreeze=t},bot(t=150,r={}){var i;n();let a=e.fishing,o=a.session,s=(i=r.tens)==null?.7:i,c=0;for(;o.phase===`fight`&&c<t*10;){var l;let e=o.fight,t=e.mode;a.setReel(r.reelAlways?!0:t!==`run`&&t!==`dive`&&t!==`wedged`&&t!==`headshake`&&e.tension<s),a.qaPose={theta:(l=r.theta)==null?55:l,steer:t===`side_run`?e.bearing>0?-1:1:0},r.drag&&(o.inp.drag=r.drag,a.qaManualDrag=!0),a.advance(.1),c++}return a.setReel(!1),a.qaPose={theta:null,steer:null},{phase:o.phase,result:o.lastResult?o.lastResult.result:null,reason:o.lastResult?o.lastResult.reason:null,sec:c/10}},advance(t){n(),e.fishing.advance(t)},forceBite(t,r){return n(),e.fishing.session.forceBite(t,r)},pose(t,r){n(),e.fishing.qaPose={theta:t,steer:r}},drag(t){e.fishing.session.inp.drag=t,e.fishing.qaManualDrag=!0},retrieve(){return e.fishing.retrieve()},quickCast(t){n();let r=e.fishing;r.quickCastOn=t,r.applySettings(r.d.settings()),r.ui.invalidate()},mainTap(){e.fishing.mainTap()},toggleAuto(t){e.fishing.toggleAuto(t)},settings(t){return t&&e.fishing.d.patch(t),{...e.fishing.d.settings()}},tutorial:{restart(){e.fishing.tut.restart()},skip(){e.fishing.tut.finish(!1)}},preview(t,r=30){n(),t?e.fishing.view.showCatch(t,r):e.fishing.view.hideCatch()},reel(t){e.fishing.setReel(t)},raise(t){e.fishing.setRaise(t)},dismiss(t=!1){e.fishing.closeResult(t)},quiet(){n();let t=e.fishing.session;t.sinceBite=60,t.hintT=9,t.lastHint=``},nibble(t=1){n();let r=e.fishing.session;for(let e=0;e<t;e++)r.onSimEvent({kind:`nibble`})},boost(t){n(),e.fishing.session.boost=t},setEnv(t){n(),e.fishing.session.setEnv(t)},rodTip(){let t=e.fishing.view.tip.clone().project(e.rig.camera);return{x:t.x,y:t.y}},stored(){try{return JSON.parse(localStorage.getItem(`realFishingWorld.save`)||`null`)}catch{return null}}}}}function Vf(e){let t=(t,n)=>{let r=Yu(t),i=Xu(n);return e.inB(r,i)?i*320+r:-1};return{isWater:(n,r)=>{let i=t(n,r);return i>=0&&e.ground[i]===0},depthAt:(n,r)=>{let i=t(n,r);return i>=0?e.depth[i]:0},zoneAt:(n,r)=>{let i=t(n,r);return i>=0?e.zone[i]:0},tetraAt:(n,r)=>{let i=t(n,r);return i>=0&&!!e.tetra[i]},holeAt:(n,r)=>{let i=t(n,r);return i>=0&&!!e.hole[i]}}}var Hf={DT:1/30,LB_TO_KGF:.4536,PULL_EXP:.667,LENGTH_STRETCH_REF_M:30,DRAG_STICTION:1,DRAG_DYN_RATIO:.85,DRAG_RECOMMENDED:[.25,.33],DRAG_HEAT_RATE:.004,ROD_CUSHION_MAX:.3,ROD_IDEAL_ANGLE:50,ROD_ANGLE_SIGMA:25,ROD_OVERHEAD_PENALTY:1.15,SLACK_THRESHOLD_T:.08,BREAK_SOFT_RATIO:.85,BREAK_SOFT_RATE:2,ABR_K:.04,ABR_STRENGTH_LOSS:.85,DIVE_BASE_HAZARD:.5,DIVE_NEAR_M:4,STAMINA_BASE_RATE:.25,STAMINA_PRESSURE_RATE:1.2,STAMINA_REST_RECOVER:.03,LAND_STAMINA:.2,LAND_DIST_M:2,BARBLESS_HOOKOUT_MULT:2.2},Uf={TICK:.1,FAR_TICK:1,NEAR_R:22,POP_R:30,POP_N:34,ESATORI_N:9,K_SEARCH:.25,SUSPICION_SCALE:1,STIM_GAIN:1,DEMO_WATER_C:18,DEMO_MONTH_BLEND:.5,ATTRACT:.5,TOD_FLOOR:.4,CONV_K:4.5,BEGINNER_WINDOW:1.8,HOOK_BASE_FLOAT:.8,BASE_PRESSURE_DECAY:.003},Wf={LOCK_K:.35,PUSH:.25,HOOKOUT_SCALE:.3,DIVE_SCALE:.5,SOFT_BREAK_SCALE:1,STAMINA_SCALE:1,START_CRUISE:[.9,1.8],ABR_SCALE:.4},Gf={schemaVersion:`1.0.0`,status:`Phase-2 ready (design; values are in-game model, not a catch guarantee)`,conventions:{length:`cm`,weight:`kg`,depth:`m`,speed:`m/s`,force:`kgf (1kgf=9.80665N)`,temperature:`degC`,time:`seconds in-game; hours are 24h local (0-24, ranges may wrap)`,"response/wariness/tendency":`0..1 unless noted`,idConvention:`romaji lowercase; same ids as src/data/fish.ts (aji, saba, kasago, mebaru, chinu, seabass, tachiuo, madai, buri)`,seabedZones:`sand/reef/weed/wall/deep/shallow = src/data/seabed.ts SeabedZone ids (0..5). structureTags are additional hints for world data.`,timeOfDayDefinition:{dawn:`04:00-07:00 (sunrise-based in Phase 6)`,day:`07:00-16:00`,dusk:`16:00-19:00 (sunset-based)`,night:`19:00-04:00`},currentScale:`normalized 0..1: 0=still, 1=>=1.0 m/s (about 2 knots) at the fishing spot`,gameCurrencyNote:`price.* is real-world market reference only. In-game money = gameBaseValue (same as fish.ts baseValue). Do not display real-money meaning.`,disclaimer:`魚の活性はゲーム内モデル。実際の釣果を保証するものではない。`},catalog:{lures:{sabiki:{nameJa:`サビキ仕掛け(アミカゴ)`,method:`float`,defaultAction:`drift`,note:`コマセ(アミエビ)と同時使用。群れ寄せ効果あり`},jighead_worm:{nameJa:`ジグヘッド+ワーム(アジング/メバリング/ロック)`,method:`lure`,defaultAction:`slow_roll`,note:`0.6〜5g軽量〜根魚用テキサス/直リグ含む`},minnow:{nameJa:`ミノー/シンキングペンシル`,method:`lure`,defaultAction:`slow_roll`,note:`シーバス/青物表層〜中層`},vibration:{nameJa:`バイブレーション/メタルバイブ`,method:`lure`,defaultAction:`lift_fall`,note:`ボトム〜中層の広範囲サーチ`},topwater:{nameJa:`トップウォーター(ポッパー/ペンシル)`,method:`lure`,defaultAction:`stop_and_go`,note:`夜明け/夕マズメの表層`},metal_jig:{nameJa:`メタルジグ(ショアジギング)`,method:`lure`,defaultAction:`jerk`,note:`20〜60g。サバ/ブリ/タチウオ/シーバス`},wind_jig:{nameJa:`ワインド(ジグヘッド+ピラピラワーム)`,method:`lure`,defaultAction:`dart`,note:`タチウオ/シーバスのダート`},tenya:{nameJa:`テンヤ(エサ巻き)`,method:`float`,defaultAction:`lift_fall`,note:`タチウオテンヤ・タイテンヤ。サンマ/サバ切身 or エビ付け`},tairubber:{nameJa:`タイラバ`,method:`lure`,defaultAction:`straight_retrieve`,note:`ボート向け。ショアでは堤防からの落とし込み相当で弱め`},bukuri:{nameJa:`ブラクリ/穴釣り仕掛け`,method:`hole`,defaultAction:`bottom_bump`,note:`消波ブロック・岸壁の隙間に落とす(安全な穴釣りエリアのみ)`},crab_lure:{nameJa:`チニング用クロー/ラバージグ`,method:`lure`,defaultAction:`bottom_bump`,note:`ボトムのズル引き+ステイ`}},baits:{amiebi:{nameJa:`アミエビ(コマセ/付けエサ)`,kind:`chum`},okiami:{nameJa:`オキアミ`,kind:`bait`},aoiso:{nameJa:`アオイソメ`,kind:`bait`},ebi_live:{nameJa:`活きエビ`,kind:`bait`},sakana_strip:{nameJa:`サバ/サンマ/イワシ切り身`,kind:`bait`},ika_strip:{nameJa:`イカ短冊`,kind:`bait`},kani:{nameJa:`カニ`,kind:`bait`},corn:{nameJa:`コーン/練りエサ/ダンゴ`,kind:`bait`},live_fish:{nameJa:`活きアジ/イワシ(泳がせ)`,kind:`bait`},konoshiro_live:{nameJa:`活きコノシロ/ハク`,kind:`bait`}},lureActions:[`drift`,`slow_roll`,`stop_and_go`,`twitch`,`jerk`,`dart`,`lift_fall`,`fall`,`straight_retrieve`,`bottom_bump`,`still`],seabedZones:[`sand`,`reef`,`weed`,`wall`,`deep`,`shallow`],seabedStructureTags:[`tetra_gap`,`rock_hole`,`pier_pile`,`oyster_shell`,`sandy_edge`,`drop_off`,`weed_edge`,`harbor_light_edge`,`channel_mouth`]},species:[{id:`aji`,nameJa:`アジ`,nameEn:`Japanese jack mackerel (Horse mackerel)`,rarity:`common`,methods:[`float`,`lure`],growthNames:null,depthRange:{min:1,max:8,preferredMin:2,preferredMax:5,unit:`m`},tempRangeC:{min:14,max:26,optMin:18,optMax:24},preferredSeabed:{zoneAffinity:{sand:.5,wall:.8,shallow:.4,reef:.3,deep:.2,weed:.1},structureTags:[`harbor_light_edge`,`pier_pile`,`channel_mouth`],note:`港内の常夜灯周り・岸壁沿いの回遊。中層〜表層が主、冬は底寄り`},swimSpeed:{cruise:.4,burst:2.5,unit:`m/s`,refSizeCm:20},wariness:.3,baits:[{id:`amiebi`,response:.95},{id:`okiami`,response:.7},{id:`aoiso`,response:.4}],lures:[{id:`sabiki`,response:1,preferredAction:`drift`},{id:`jighead_worm`,response:.9,preferredAction:`slow_roll`},{id:`minnow`,response:.2,preferredAction:`slow_roll`},{id:`metal_jig`,response:.15,preferredAction:`jerk`}],activeHours:{timeOfDayWeights:{dawn:.9,day:.45,dusk:1,night:.6},windowsHour:[[4,8],[16,21]],monthlyActivity:[.25,.2,.3,.5,.75,.9,.95,.95,1,.9,.6,.4],tide:{best:[`incoming_mid`,`outgoing_mid`],note:`潮が動く中潮・若潮で回遊。満潮前後の潮止まりは群れが散る`},seasonNote:`初夏〜晩秋が最盛(豆アジ6-8月/中アジ・尺アジ秋)。冬は沖の深場へ落ち渋い。`},currentResponse:{preferred:.35,tolerance:.3,behavior:`流れに向かい定位。潮が効く場所に群れが付く。強すぎる流れ(>0.7)では中層に避難し、サビキのカゴが流される。`},lureResponse:{overall:.8,senses:{visual:.7,sound:.2,vibration:.4,scent:.5},actionPreference:{slow_roll:1,drift:.9,fall:.8,stop_and_go:.6,twitch:.4,jerk:.2,dart:.2}},pullStrength:{sustainedKgf:{min:.07,typical:.27,max:1.09},burstKgf:{min:.1,typical:.38,max:1.53},coef:1.3,exponent:.667,burstMult:1.4,unitNote:`kgf (1 kgf = 9.80665 N)。sustained = c × W^0.667。ファイトの最大持続力。`,note:`小型は引きが強く感じるが絶対値は小さい(最大でも1kgf未満)。口切れ注意`},rockDivingTendency:.02,hookOutChance:{base:.25,mouthSoftness:.9,mouthHoldRatio:1.6,note:`base=1回のイベント(首振り/スラック)当たりの外れ基本確率。mouthHoldRatio=口が耐えられる張力/持続引き`},sizeRange:{cm:{min:10,typical:20,max:40},weightKg:{min:.012,typical:.096,max:.768},lengthWeight:{a:12e-6,b:3,formula:`W[kg]=a*L[cm]^3`}},price:{jpyPerKg:{min:400,max:1500},jpyPerFish:{min:80,max:350},note:`市場価格の目安(2020年代)。豆アジは安く、尺アジ(ブランド)は高値。※現実の市場参考値のみ。ゲーム内通貨ではない(gameBaseValue参照)`},gameBaseValue:40,fight:{staminaSec:20,headShakeFreq:.3,runStyle:`short_darts_then_circles`,toothCut:null,refSizeKg:.096},behavior:{senseRangeM:{visual:6,lateralLine:2,smell:4},lightAffinity:.8,lightSensitivity:.4,noiseSensitivity:.4,lineVisibilitySensitivity:.45,schooling:!0,schoolSize:[10,200],inspectSec:{min:.4,max:1.5},biteType:`suck`,strikeCommitP:.75,fleeCooldownSec:{min:3,max:15}},legacy:{note:`src/data/fish.ts(Phase1 placeholder)との対応。id/zones/wariness/power/baseValueは互換のため保持`,zones:[`sand`,`wall`,`shallow`],power:.2,baseValue:40,minTackle:.1,wariness:.3},designNote:`ゲーム入門魚。群れで回遊しコマセが効く。ハリスが太い/見えると食いが落ちる(ライン視認性)。`},{id:`saba`,nameJa:`サバ`,nameEn:`Chub mackerel`,rarity:`common`,methods:[`float`,`lure`],growthNames:null,depthRange:{min:2,max:12,preferredMin:3,preferredMax:8,unit:`m`},tempRangeC:{min:14,max:25,optMin:18,optMax:23},preferredSeabed:{zoneAffinity:{deep:.7,wall:.6,shallow:.2,sand:.3,reef:.2},structureTags:[`channel_mouth`,`drop_off`],note:`外洋寄りの回遊魚。海底より水柱(中層〜表層)に付き、ベイトを追って岸寄りする`},swimSpeed:{cruise:.8,burst:4.5,unit:`m/s`,refSizeCm:30},wariness:.3,baits:[{id:`amiebi`,response:.85},{id:`okiami`,response:.7},{id:`sakana_strip`,response:.6},{id:`aoiso`,response:.4}],lures:[{id:`sabiki`,response:.95,preferredAction:`drift`},{id:`metal_jig`,response:.95,preferredAction:`jerk`},{id:`minnow`,response:.6,preferredAction:`slow_roll`},{id:`jighead_worm`,response:.4,preferredAction:`slow_roll`},{id:`topwater`,response:.3,preferredAction:`stop_and_go`}],activeHours:{timeOfDayWeights:{dawn:1,day:.6,dusk:.9,night:.2},windowsHour:[[5,9],[16,20]],monthlyActivity:[.1,.1,.15,.3,.5,.7,.9,1,1,.9,.5,.2],tide:{best:[`incoming_mid`,`outgoing_mid`],note:`潮が速く動く時に回遊。ベイト(イワシ/小アジ)接岸とセット`},seasonNote:`夏〜秋の回遊が最盛(小サバ→良型)。冬は沖。回遊待ちで『ムラ』が大きい。`},currentResponse:{preferred:.55,tolerance:.3,behavior:`流れに乗って回遊。やや速い流れを好み、潮目に付く。`},lureResponse:{overall:.9,senses:{visual:.8,sound:.3,vibration:.5,scent:.3},actionPreference:{jerk:1,straight_retrieve:.9,slow_roll:.8,stop_and_go:.5,drift:.7,fall:.5,twitch:.5}},pullStrength:{sustainedKgf:{min:.22,typical:.9,max:2.49},burstKgf:{min:.33,typical:1.35,max:3.74},coef:1.8,exponent:.667,burstMult:1.5,unitNote:`kgf (1 kgf = 9.80665 N)。sustained = c × W^0.667。ファイトの最大持続力。`,note:`見た目以上に走る。横に走って糸を出す。ジギングでは外道の代表`},rockDivingTendency:.05,hookOutChance:{base:.2,mouthSoftness:.7,mouthHoldRatio:1.5,note:`base=1回のイベント(首振り/スラック)当たりの外れ基本確率。mouthHoldRatio=口が耐えられる張力/持続引き`},sizeRange:{cm:{min:15,typical:30,max:50},weightKg:{min:.044,typical:.351,max:1.625},lengthWeight:{a:13e-6,b:3,formula:`W[kg]=a*L[cm]^3`}},price:{jpyPerKg:{min:300,max:900},jpyPerFish:{min:100,max:600},note:`鮮度が落ちやすい(いわゆる“サバの生き腐れ”)。ブランドサバは1kgで1500円超も。※現実の市場参考値のみ。ゲーム内通貨ではない(gameBaseValue参照)`},gameBaseValue:50,fight:{staminaSec:35,headShakeFreq:.4,runStyle:`fast_lateral_runs`,toothCut:null,refSizeKg:.351},behavior:{senseRangeM:{visual:8,lateralLine:3,smell:3},lightAffinity:.8,lightSensitivity:.3,noiseSensitivity:.3,lineVisibilitySensitivity:.3,schooling:!0,schoolSize:[20,500],inspectSec:{min:.2,max:.9},biteType:`chase`,strikeCommitP:.85,fleeCooldownSec:{min:2,max:10}},legacy:{note:`src/data/fish.ts(Phase1 placeholder)との対応。id/zones/wariness/power/baseValueは互換のため保持`,zones:[`deep`,`wall`],power:.35,baseValue:50,minTackle:.2,wariness:.3},designNote:`回遊魚で活性スイッチが入ると連発、抜けると完全に無反応。ベイト有無で出現率が大きく変わる。`},{id:`kasago`,nameJa:`カサゴ`,nameEn:`Marbled rockfish (Kasago)`,rarity:`common`,methods:[`hole`,`lure`,`float`],growthNames:null,depthRange:{min:1,max:10,preferredMin:1,preferredMax:6,unit:`m`},tempRangeC:{min:10,max:25,optMin:12,optMax:20},preferredSeabed:{zoneAffinity:{reef:1,wall:.8,weed:.3,sand:.05,shallow:.4,deep:.3},structureTags:[`tetra_gap`,`rock_hole`,`pier_pile`,`oyster_shell`],note:`根・消波ブロックの隙間・岸壁の石組みに定着。縄張り的で移動量が小さい`},swimSpeed:{cruise:.1,burst:1.5,unit:`m/s`,refSizeCm:22},wariness:.25,baits:[{id:`sakana_strip`,response:.85},{id:`aoiso`,response:.8},{id:`ika_strip`,response:.75},{id:`ebi_live`,response:.8},{id:`okiami`,response:.35}],lures:[{id:`bukuri`,response:1,preferredAction:`bottom_bump`},{id:`jighead_worm`,response:.85,preferredAction:`bottom_bump`},{id:`vibration`,response:.3,preferredAction:`lift_fall`},{id:`crab_lure`,response:.35,preferredAction:`bottom_bump`},{id:`metal_jig`,response:.2,preferredAction:`lift_fall`}],activeHours:{timeOfDayWeights:{dawn:.8,day:.6,dusk:.9,night:1},windowsHour:[[0,24]],monthlyActivity:[.8,.85,.85,.8,.7,.6,.55,.55,.6,.75,.9,.9],tide:{best:[`incoming_mid`,`outgoing_mid`],note:`潮が動くと穴から出て捕食。昼でも穴の前に落とせば食う(穴釣り)`},seasonNote:`通年。水温が下がる晩秋〜冬〜春が型・数ともに良い。夏は浅場から深場へ。`},currentResponse:{preferred:.2,tolerance:.25,behavior:`流れの弱い穴・根の際に定位。強い流れでは穴の奥に引っ込む。`},lureResponse:{overall:.7,senses:{visual:.4,sound:.2,vibration:.6,scent:.8},actionPreference:{bottom_bump:1,still:.8,lift_fall:.6,fall:.7,slow_roll:.4,twitch:.3,jerk:.1}},pullStrength:{sustainedKgf:{min:.31,typical:1.03,max:2.62},burstKgf:{min:.46,typical:1.54,max:3.93},coef:3,exponent:.667,burstMult:1.5,unitNote:`kgf (1 kgf = 9.80665 N)。sustained = c × W^0.667。ファイトの最大持続力。`,note:`小型でも掛けた瞬間に根へ潜る強い初動。引きの絶対値より“根に入られる”リスクが本体`},rockDivingTendency:.95,hookOutChance:{base:.05,mouthSoftness:.2,mouthHoldRatio:4,note:`base=1回のイベント(首振り/スラック)当たりの外れ基本確率。mouthHoldRatio=口が耐えられる張力/持続引き`},sizeRange:{cm:{min:12,typical:22,max:35},weightKg:{min:.033,typical:.202,max:.815},lengthWeight:{a:19e-6,b:3,formula:`W[kg]=a*L[cm]^3`}},price:{jpyPerKg:{min:1500,max:4e3},jpyPerFish:{min:300,max:1200},note:`高級魚扱い(煮付け/唐揚げ)。活魚はさらに高値。※現実の市場参考値のみ。ゲーム内通貨ではない(gameBaseValue参照)`},gameBaseValue:80,fight:{staminaSec:25,headShakeFreq:.2,runStyle:`dive_to_hole_and_brace`,toothCut:null,refSizeKg:.202},behavior:{senseRangeM:{visual:2.5,lateralLine:2,smell:4},lightAffinity:.2,lightSensitivity:.3,noiseSensitivity:.35,lineVisibilitySensitivity:.2,schooling:!1,schoolSize:[1,1],inspectSec:{min:.6,max:2.5},biteType:`gulp`,strikeCommitP:.9,fleeCooldownSec:{min:8,max:40}},legacy:{note:`src/data/fish.ts(Phase1 placeholder)との対応。id/zones/wariness/power/baseValueは互換のため保持`,zones:[`reef`,`wall`],power:.3,baseValue:80,minTackle:.1,wariness:.25},designNote:`穴釣りの主役。ほぼ飲み込む(針外れ少)。ただし掛かった直後が勝負で、一度根に入られるとラインブレイクしやすい。`},{id:`mebaru`,nameJa:`メバル`,nameEn:`Japanese black rockfish (Mebaru)`,rarity:`common`,methods:[`float`,`lure`],growthNames:null,depthRange:{min:1,max:8,preferredMin:1,preferredMax:4,unit:`m`},tempRangeC:{min:8,max:20,optMin:10,optMax:16},preferredSeabed:{zoneAffinity:{weed:1,reef:.8,wall:.8,shallow:.6,sand:.05,deep:.1},structureTags:[`weed_edge`,`harbor_light_edge`,`pier_pile`,`drop_off`],note:`藻場・岸壁際・常夜灯下の明暗境界。夜は表層〜中層に浮く`},swimSpeed:{cruise:.2,burst:1.5,unit:`m/s`,refSizeCm:20},wariness:.4,baits:[{id:`okiami`,response:.6},{id:`aoiso`,response:.7},{id:`ebi_live`,response:.9},{id:`amiebi`,response:.4}],lures:[{id:`jighead_worm`,response:1,preferredAction:`slow_roll`},{id:`minnow`,response:.5,preferredAction:`slow_roll`},{id:`vibration`,response:.2,preferredAction:`lift_fall`},{id:`topwater`,response:.15,preferredAction:`stop_and_go`}],activeHours:{timeOfDayWeights:{dawn:.8,day:.2,dusk:1,night:1},windowsHour:[[17,24],[0,5]],monthlyActivity:[.9,1,1,.9,.6,.3,.15,.1,.15,.3,.6,.8],tide:{best:[`incoming_mid`,`outgoing_mid`],note:`夜の下げ潮〜潮が動き出す時合。潮止まりは沈黙`},seasonNote:`晩秋〜春(産仔期は冬〜早春)が本番。夏は深場で釣りにくい。`},currentResponse:{preferred:.25,tolerance:.2,behavior:`弱い流れが当たる藻の際。ゆっくり漂う餌を好む(速い流れは嫌う)。`},lureResponse:{overall:.85,senses:{visual:.8,sound:.1,vibration:.3,scent:.4},actionPreference:{slow_roll:1,drift:.9,stop_and_go:.6,fall:.6,still:.5,twitch:.3,jerk:.1}},pullStrength:{sustainedKgf:{min:.18,typical:.49,max:1.25},burstKgf:{min:.25,typical:.69,max:1.75},coef:2,exponent:.667,burstMult:1.4,unitNote:`kgf (1 kgf = 9.80665 N)。sustained = c × W^0.667。ファイトの最大持続力。`,note:`小型だがグッと突っ込む。引きはカサゴより弱い`},rockDivingTendency:.4,hookOutChance:{base:.2,mouthSoftness:.8,mouthHoldRatio:1.7,note:`base=1回のイベント(首振り/スラック)当たりの外れ基本確率。mouthHoldRatio=口が耐えられる張力/持続引き`},sizeRange:{cm:{min:12,typical:20,max:32},weightKg:{min:.026,typical:.12,max:.492},lengthWeight:{a:15e-6,b:3,formula:`W[kg]=a*L[cm]^3`}},price:{jpyPerKg:{min:1500,max:4e3},jpyPerFish:{min:250,max:900},note:`産地・天然物は高値(煮付け)。釣りで食べる魚としても人気。※現実の市場参考値のみ。ゲーム内通貨ではない(gameBaseValue参照)`},gameBaseValue:90,fight:{staminaSec:25,headShakeFreq:.35,runStyle:`short_dives_to_weed`,toothCut:null,refSizeKg:.12},behavior:{senseRangeM:{visual:5,lateralLine:2,smell:3},lightAffinity:.5,lightSensitivity:.75,noiseSensitivity:.5,lineVisibilitySensitivity:.65,schooling:!1,schoolSize:[1,6],inspectSec:{min:.8,max:3},biteType:`peck`,strikeCommitP:.6,fleeCooldownSec:{min:5,max:25}},legacy:{note:`src/data/fish.ts(Phase1 placeholder)との対応。id/zones/wariness/power/baseValueは互換のため保持`,zones:[`weed`,`reef`,`wall`],power:.25,baseValue:90,minTackle:.1,wariness:.4},designNote:`繊細で明暗に敏感。リーダーが太い/見える/動きが速いと見切る。『ふんわり漂う』誘いが最強。`},{id:`chinu`,nameJa:`チヌ(クロダイ)`,nameEn:`Yellowfin seabream / Black sea bream (Chinu)`,rarity:`uncommon`,methods:[`float`,`lure`],growthNames:{"<25":`カイズ`,"25-40":`チヌ`,"40+":`年なし(尾張り)`},depthRange:{min:1,max:7,preferredMin:1,preferredMax:4,unit:`m`},tempRangeC:{min:12,max:28,optMin:18,optMax:26},preferredSeabed:{zoneAffinity:{reef:.9,weed:.8,wall:.8,shallow:.9,sand:.5,deep:.1},structureTags:[`oyster_shell`,`pier_pile`,`weed_edge`,`sandy_edge`,`channel_mouth`],note:`河口/内湾の牡蠣殻付き岸壁・捨て石・藻場。底を這って貝・カニを漁る`},swimSpeed:{cruise:.5,burst:3,unit:`m/s`,refSizeCm:40},wariness:.7,baits:[{id:`okiami`,response:.8},{id:`corn`,response:.75},{id:`kani`,response:.9},{id:`aoiso`,response:.65},{id:`ebi_live`,response:.7}],lures:[{id:`crab_lure`,response:.85,preferredAction:`bottom_bump`},{id:`jighead_worm`,response:.55,preferredAction:`bottom_bump`},{id:`topwater`,response:.45,preferredAction:`stop_and_go`},{id:`minnow`,response:.3,preferredAction:`slow_roll`},{id:`vibration`,response:.3,preferredAction:`lift_fall`}],activeHours:{timeOfDayWeights:{dawn:1,day:.6,dusk:.9,night:.5},windowsHour:[[5,10],[17,22]],monthlyActivity:[.15,.15,.3,.6,.9,.9,.8,.85,1,.95,.6,.3],tide:{best:[`incoming_mid`,`outgoing_mid`],note:`上げ潮で浅場へ差す。春の“ノッコミ”と秋の荒食い、梅雨〜夏のトップが有名`},seasonNote:`春(産卵前の乗っ込み 4-6月)と秋が好期。真冬は深場で渋い。夏は夜〜朝まずめのトップも。`},currentResponse:{preferred:.3,tolerance:.25,behavior:`弱〜中程度の流れで底付近に定位。流れの当たるカケアガリ・ヨレに付く。濁り(ササ濁り)に強い反応。`},lureResponse:{overall:.55,senses:{visual:.6,sound:.3,vibration:.4,scent:.7},actionPreference:{bottom_bump:1,still:.8,stop_and_go:.6,slow_roll:.5,fall:.6,twitch:.3,jerk:.15}},pullStrength:{sustainedKgf:{min:.71,typical:2.84,max:7.51},burstKgf:{min:1.06,typical:4.26,max:11.27},coef:2.8,exponent:.667,burstMult:1.5,unitNote:`kgf (1 kgf = 9.80665 N)。sustained = c × W^0.667。ファイトの最大持続力。`,note:`重い突っ込みと首振り。根・杭に走る。口が固く針掛かりは良い`},rockDivingTendency:.6,hookOutChance:{base:.12,mouthSoftness:.3,mouthHoldRatio:3,note:`base=1回のイベント(首振り/スラック)当たりの外れ基本確率。mouthHoldRatio=口が耐えられる張力/持続引き`},sizeRange:{cm:{min:20,typical:40,max:65},weightKg:{min:.128,typical:1.024,max:4.394},lengthWeight:{a:16e-6,b:3,formula:`W[kg]=a*L[cm]^3`}},price:{jpyPerKg:{min:600,max:1500},jpyPerFish:{min:500,max:3500},note:`クセがあり市場価値は中程度。釣り魚としての評価は高い。※現実の市場参考値のみ。ゲーム内通貨ではない(gameBaseValue参照)`},gameBaseValue:220,fight:{staminaSec:60,headShakeFreq:.5,runStyle:`powerful_runs_to_structure`,toothCut:null,refSizeKg:1.024},behavior:{senseRangeM:{visual:4,lateralLine:2.5,smell:5},lightAffinity:.5,lightSensitivity:.5,noiseSensitivity:.8,lineVisibilitySensitivity:.9,schooling:!1,schoolSize:[1,3],inspectSec:{min:1.5,max:6},biteType:`mouth_and_spit`,strikeCommitP:.45,fleeCooldownSec:{min:15,max:90}},legacy:{note:`src/data/fish.ts(Phase1 placeholder)との対応。id/zones/wariness/power/baseValueは互換のため保持`,zones:[`reef`,`weed`,`wall`,`shallow`],power:.55,baseValue:220,minTackle:.35,wariness:.7},designNote:`警戒心が高く、咥えて吐き出す探り食い。ラインの存在・足音・影に強く反応する“知能戦”の魚。`},{id:`seabass`,nameJa:`シーバス(スズキ)`,nameEn:`Japanese sea bass (Seabass / Suzuki)`,rarity:`uncommon`,methods:[`lure`,`float`],growthNames:{"<40":`セイゴ`,"40-60":`フッコ`,"60+":`スズキ`},depthRange:{min:1,max:10,preferredMin:1,preferredMax:5,unit:`m`},tempRangeC:{min:12,max:27,optMin:15,optMax:24},preferredSeabed:{zoneAffinity:{wall:.9,shallow:.8,reef:.7,sand:.5,weed:.4,deep:.2},structureTags:[`harbor_light_edge`,`pier_pile`,`channel_mouth`,`drop_off`,`tetra_gap`],note:`河口・港湾の明暗境界、橋脚、流れのヨレ。ベイトを待ち伏せ`},swimSpeed:{cruise:.7,burst:4,unit:`m/s`,refSizeCm:70},wariness:.6,baits:[{id:`konoshiro_live`,response:.9},{id:`aoiso`,response:.6},{id:`ebi_live`,response:.7},{id:`live_fish`,response:.8}],lures:[{id:`minnow`,response:1,preferredAction:`slow_roll`},{id:`topwater`,response:.7,preferredAction:`stop_and_go`},{id:`vibration`,response:.8,preferredAction:`lift_fall`},{id:`wind_jig`,response:.65,preferredAction:`dart`},{id:`jighead_worm`,response:.75,preferredAction:`slow_roll`},{id:`metal_jig`,response:.5,preferredAction:`jerk`}],activeHours:{timeOfDayWeights:{dawn:1,day:.3,dusk:1,night:1},windowsHour:[[17,24],[0,6]],monthlyActivity:[.4,.35,.4,.55,.7,.75,.7,.7,.9,1,.9,.6],tide:{best:[`outgoing_early`,`incoming_early`,`tide_change`],note:`“潮の動き出し/潮変わり”に捕食。明暗の流れ込みで待つ`},seasonNote:`秋の落ち(9-11月)が最盛。春はバチ抜け(夜の表層)。夏は河川/浅場で夜。`},currentResponse:{preferred:.6,tolerance:.3,behavior:`流れのヨレ・当たり面で待ち伏せ。流速が上がるほど活性が上がるが、強すぎると底へ避難。`},lureResponse:{overall:.8,senses:{visual:.7,sound:.5,vibration:.7,scent:.2},actionPreference:{slow_roll:1,stop_and_go:.9,twitch:.7,lift_fall:.75,dart:.7,jerk:.6,drift:.8,straight_retrieve:.8,fall:.5}},pullStrength:{sustainedKgf:{min:1.11,typical:4.43,max:9.03},burstKgf:{min:1.67,typical:6.64,max:13.54},coef:2,exponent:.667,burstMult:1.5,unitNote:`kgf (1 kgf = 9.80665 N)。sustained = c × W^0.667。ファイトの最大持続力。`,note:`エラ洗い(ジャンプ+首振り)で針外れを誘う。橋脚・テトラ・ブレイクへ走る`},rockDivingTendency:.55,hookOutChance:{base:.3,mouthSoftness:.5,mouthHoldRatio:2.2,note:`base=1回のイベント(首振り/スラック)当たりの外れ基本確率。mouthHoldRatio=口が耐えられる張力/持続引き`},sizeRange:{cm:{min:35,typical:70,max:100},weightKg:{min:.412,typical:3.293,max:9.6},lengthWeight:{a:96e-7,b:3,formula:`W[kg]=a*L[cm]^3`}},price:{jpyPerKg:{min:700,max:1800},jpyPerFish:{min:1500,max:9e3},note:`夏の洗い・天然物は高値。大型は個体差が大きい。※現実の市場参考値のみ。ゲーム内通貨ではない(gameBaseValue参照)`},gameBaseValue:350,fight:{staminaSec:70,headShakeFreq:.8,runStyle:`gill_shakes_and_structure_runs`,toothCut:null,refSizeKg:3.293},behavior:{senseRangeM:{visual:6,lateralLine:4,smell:2},lightAffinity:.35,lightSensitivity:.6,noiseSensitivity:.55,lineVisibilitySensitivity:.5,schooling:!1,schoolSize:[1,4],inspectSec:{min:.5,max:2.5},biteType:`chase`,strikeCommitP:.7,fleeCooldownSec:{min:10,max:60}},legacy:{note:`src/data/fish.ts(Phase1 placeholder)との対応。id/zones/wariness/power/baseValueは互換のため保持`,zones:[`wall`,`shallow`,`reef`],power:.7,baseValue:350,minTackle:.5,wariness:.6},designNote:`『エラ洗い』と『根/橋脚への突進』が特徴。ルアーのアクションに明確な好みがあり、流れ・ベイトと明暗の条件が合致した時合に絞られる。`},{id:`tachiuo`,nameJa:`タチウオ`,nameEn:`Largehead hairtail (Cutlassfish / Tachiuo)`,rarity:`uncommon`,methods:[`lure`,`float`],growthNames:{fingers:`指3本(約80cm)〜指5本(約110cm)`},depthRange:{min:3,max:20,preferredMin:3,preferredMax:12,unit:`m`},tempRangeC:{min:16,max:27,optMin:20,optMax:25},preferredSeabed:{zoneAffinity:{deep:.9,wall:.7,sand:.4,shallow:.2,reef:.1},structureTags:[`harbor_light_edge`,`channel_mouth`,`drop_off`],note:`夜は表層〜中層へ浮上し、昼は深場の底付近。垂直移動が顕著。ナイトゲームで常夜灯下のベイトを追う`},swimSpeed:{cruise:.5,burst:3,unit:`m/s`,refSizeCm:95},wariness:.5,baits:[{id:`sakana_strip`,response:1},{id:`live_fish`,response:.8},{id:`okiami`,response:.15}],lures:[{id:`tenya`,response:1,preferredAction:`lift_fall`},{id:`wind_jig`,response:.9,preferredAction:`dart`},{id:`metal_jig`,response:.85,preferredAction:`jerk`},{id:`minnow`,response:.5,preferredAction:`slow_roll`},{id:`jighead_worm`,response:.45,preferredAction:`lift_fall`}],activeHours:{timeOfDayWeights:{dawn:.8,day:.15,dusk:1,night:.9},windowsHour:[[17,23],[3,6]],monthlyActivity:[.05,.05,.05,.1,.2,.3,.5,.8,1,1,.8,.3],tide:{best:[`incoming_mid`,`outgoing_mid`,`tide_change`],note:`潮が動く夕マズメ〜夜。常夜灯周りのベイトに付く。ベイト移動で『群れで来て、去る』`},seasonNote:`晩夏〜初冬(8-12月)。湾内の群れ接岸中のみ釣れる。真冬はほぼ釣れない。`},currentResponse:{preferred:.4,tolerance:.3,behavior:`流れに乗って回遊。ゆるい流れで表層〜中層に浮く。極端な流れや濁りでは活性低下。`},lureResponse:{overall:.9,senses:{visual:.9,sound:.1,vibration:.4,scent:.5},actionPreference:{lift_fall:1,dart:.9,jerk:.75,slow_roll:.7,stop_and_go:.6,straight_retrieve:.6,fall:.8,twitch:.5}},pullStrength:{sustainedKgf:{min:.68,typical:1.71,max:3.72},burstKgf:{min:.95,typical:2.39,max:5.21},coef:2.2,exponent:.667,burstMult:1.4,unitNote:`kgf (1 kgf = 9.80665 N)。sustained = c × W^0.667。ファイトの最大持続力。`,note:`重量に比して引きは軽め。細長く、首を振る。歯でラインを切る`},rockDivingTendency:.05,hookOutChance:{base:.15,mouthSoftness:.5,mouthHoldRatio:2.5,note:`base=1回のイベント(首振り/スラック)当たりの外れ基本確率。mouthHoldRatio=口が耐えられる張力/持続引き`},sizeRange:{cm:{min:60,typical:95,max:140},weightKg:{min:.173,typical:.686,max:2.195},lengthWeight:{a:8e-7,b:3,formula:`W[kg]=a*L[cm]^3`}},price:{jpyPerKg:{min:1e3,max:3500},jpyPerFish:{min:500,max:4e3},note:`指幅(指3〜5本)で価格が大きく変わる。大型は高値(銀色の皮を剥がさず運ぶ)。※現実の市場参考値のみ。ゲーム内通貨ではない(gameBaseValue参照)`},gameBaseValue:320,fight:{staminaSec:45,headShakeFreq:.7,runStyle:`short_runs_and_headshakes_with_tooth_cuts`,toothCut:{nonWireLeaderCutChancePerBite:.45,wireLeaderCutChancePerBite:.03,note:`歯が鋭くナイロン/フロロのリーダーは切られやすい。ワイヤー/太ハリスで軽減`},refSizeKg:.686},behavior:{senseRangeM:{visual:7,lateralLine:3,smell:2},lightAffinity:.7,lightSensitivity:.35,noiseSensitivity:.2,lineVisibilitySensitivity:.35,schooling:!0,schoolSize:[3,30],inspectSec:{min:.3,max:1.5},biteType:`peck_then_swallow`,strikeCommitP:.65,fleeCooldownSec:{min:5,max:30}},legacy:{note:`src/data/fish.ts(Phase1 placeholder)との対応。id/zones/wariness/power/baseValueは互換のため保持`,zones:[`deep`,`wall`],power:.5,baseValue:320,minTackle:.4,wariness:.5},designNote:`アタリは『ガツガツ→ズン』。合わせが早すぎると外れ、遅いと切られる。群れで来る時合が短い。`},{id:`madai`,nameJa:`マダイ`,nameEn:`Red seabream / Pagrus major (Madai)`,rarity:`rare`,methods:[`float`,`lure`],growthNames:{"<20":`チャリコ`,"20-40":`カスゴ`,"40+":`マダイ`},depthRange:{min:5,max:30,preferredMin:8,preferredMax:20,unit:`m`},tempRangeC:{min:13,max:26,optMin:16,optMax:22},preferredSeabed:{zoneAffinity:{reef:.9,deep:.8,sand:.5,wall:.3,shallow:.2,weed:.2},structureTags:[`drop_off`,`channel_mouth`,`rock_hole`],note:`潮通しのよい根周り・砂礫混じりの深場。ショアでは潮通しが良い堤防先端・深い船道沿い`},swimSpeed:{cruise:.6,burst:3.5,unit:`m/s`,refSizeCm:50},wariness:.7,baits:[{id:`okiami`,response:.9},{id:`ebi_live`,response:.95},{id:`aoiso`,response:.5},{id:`ika_strip`,response:.4}],lures:[{id:`tairubber`,response:.9,preferredAction:`straight_retrieve`},{id:`tenya`,response:.8,preferredAction:`lift_fall`},{id:`metal_jig`,response:.4,preferredAction:`lift_fall`},{id:`jighead_worm`,response:.3,preferredAction:`bottom_bump`},{id:`minnow`,response:.1,preferredAction:`slow_roll`}],activeHours:{timeOfDayWeights:{dawn:1,day:.5,dusk:.9,night:.3},windowsHour:[[4,9],[16,20]],monthlyActivity:[.3,.3,.6,.95,1,.7,.4,.4,.6,.9,.85,.5],tide:{best:[`incoming_mid`,`outgoing_mid`],note:`潮が動き、潮通しが効いた時のみ。潮止まりは口を使わない`},seasonNote:`春の乗っ込み(3-5月)と秋が好期。夏は深場、冬は沖の深場。`},currentResponse:{preferred:.6,tolerance:.25,behavior:`一定の流れがある潮通しを好む。ヨレ・潮目の際。流れが止まると食いが止まる。`},lureResponse:{overall:.45,senses:{visual:.5,sound:.2,vibration:.4,scent:.7},actionPreference:{straight_retrieve:1,lift_fall:.8,drift:.8,fall:.6,stop_and_go:.5,bottom_bump:.5,jerk:.25,twitch:.2}},pullStrength:{sustainedKgf:{min:.56,typical:3.49,max:11.31},burstKgf:{min:.84,typical:5.24,max:16.96},coef:2.2,exponent:.667,burstMult:1.5,unitNote:`kgf (1 kgf = 9.80665 N)。sustained = c × W^0.667。ファイトの最大持続力。`,note:`独特のググッという首振りと突っ込み。大型は走りが強い。口切れしやすい`},rockDivingTendency:.4,hookOutChance:{base:.18,mouthSoftness:.65,mouthHoldRatio:1.8,note:`base=1回のイベント(首振り/スラック)当たりの外れ基本確率。mouthHoldRatio=口が耐えられる張力/持続引き`},sizeRange:{cm:{min:20,typical:50,max:90},weightKg:{min:.128,typical:2,max:11.664},lengthWeight:{a:16e-6,b:3,formula:`W[kg]=a*L[cm]^3`}},price:{jpyPerKg:{min:1500,max:4e3},jpyPerFish:{min:1e3,max:15e3},note:`天然は高級魚。養殖は低価格。祝い魚として需要。※現実の市場参考値のみ。ゲーム内通貨ではない(gameBaseValue参照)`},gameBaseValue:700,fight:{staminaSec:80,headShakeFreq:.6,runStyle:`head_shake_dives_and_rock_runs`,toothCut:null,refSizeKg:2},behavior:{senseRangeM:{visual:5,lateralLine:3,smell:5},lightAffinity:.5,lightSensitivity:.5,noiseSensitivity:.6,lineVisibilitySensitivity:.85,schooling:!1,schoolSize:[1,5],inspectSec:{min:1,max:4},biteType:`mouth_and_hold`,strikeCommitP:.5,fleeCooldownSec:{min:20,max:120}},legacy:{note:`src/data/fish.ts(Phase1 placeholder)との対応。id/zones/wariness/power/baseValueは互換のため保持`,zones:[`reef`,`deep`],power:.75,baseValue:700,minTackle:.6,wariness:.7},designNote:`ショアでは出会い自体が稀。ハリス(ラインの太さ/視認性)とタナ(深さ)が合わないと食わない。『コツコツ→ググッ』の前アタリを見極める。`},{id:`buri`,nameJa:`ブリ`,nameEn:`Japanese amberjack / Yellowtail (Buri)`,rarity:`rare`,methods:[`lure`,`float`],growthNames:{"<35":`ワカシ`,"35-60":`イナダ`,"60-80":`ワラサ`,"80+":`ブリ`},depthRange:{min:5,max:40,preferredMin:3,preferredMax:25,unit:`m`},tempRangeC:{min:13,max:24,optMin:15,optMax:22},preferredSeabed:{zoneAffinity:{deep:1,wall:.3,reef:.4,shallow:.1,sand:.1},structureTags:[`drop_off`,`channel_mouth`],note:`潮の効く沖〜外向き堤防先端の水柱を回遊。ベイト(イワシ/アジ)の群れを追う。海底より中層〜表層に付くことが多い`},swimSpeed:{cruise:1.2,burst:7,unit:`m/s`,refSizeCm:80},wariness:.5,baits:[{id:`live_fish`,response:1},{id:`sakana_strip`,response:.4},{id:`okiami`,response:.15}],lures:[{id:`metal_jig`,response:1,preferredAction:`jerk`},{id:`minnow`,response:.8,preferredAction:`straight_retrieve`},{id:`topwater`,response:.65,preferredAction:`stop_and_go`},{id:`vibration`,response:.4,preferredAction:`lift_fall`},{id:`wind_jig`,response:.3,preferredAction:`dart`}],activeHours:{timeOfDayWeights:{dawn:1,day:.5,dusk:.9,night:.2},windowsHour:[[4,9],[15,19]],monthlyActivity:[.7,.5,.3,.25,.2,.2,.2,.2,.3,.6,.9,1],tide:{best:[`incoming_early`,`outgoing_early`,`tide_change`],note:`潮が動く朝夕マズメ。ベイトボールが接岸した時だけチャンス。出会えない日が多い`},seasonNote:`秋〜冬(10-2月)の寒ブリ。ワカシ/イナダは夏〜秋のショアジギで狙いやすい。`},currentResponse:{preferred:.65,tolerance:.3,behavior:`速い流れ・潮目を好む。流れが効く先端で泳ぎ回る。`},lureResponse:{overall:.8,senses:{visual:.9,sound:.3,vibration:.5,scent:.2},actionPreference:{jerk:1,straight_retrieve:.9,stop_and_go:.6,fall:.5,lift_fall:.6,slow_roll:.4,twitch:.4,dart:.4}},pullStrength:{sustainedKgf:{min:1.11,typical:7.92,max:17.81},burstKgf:{min:1.78,typical:12.67,max:28.5},coef:2.4,exponent:.667,burstMult:1.6,unitNote:`kgf (1 kgf = 9.80665 N)。sustained = c × W^0.667。ファイトの最大持続力。`,note:`常時強い走り。糸を鳴らして走り、根・深場へ突っ込む。ドラグ調整が必須`},rockDivingTendency:.3,hookOutChance:{base:.1,mouthSoftness:.2,mouthHoldRatio:2.8,note:`base=1回のイベント(首振り/スラック)当たりの外れ基本確率。mouthHoldRatio=口が耐えられる張力/持続引き`},sizeRange:{cm:{min:30,typical:80,max:120},weightKg:{min:.316,typical:5.99,max:20.218},lengthWeight:{a:117e-7,b:3,formula:`W[kg]=a*L[cm]^3`}},price:{jpyPerKg:{min:800,max:3500},jpyPerFish:{min:1500,max:3e4},note:`天然寒ブリは高級。ワカシ/イナダは安い。大きさで単価が大きく変わる。※現実の市場参考値のみ。ゲーム内通貨ではない(gameBaseValue参照)`},gameBaseValue:900,fight:{staminaSec:150,headShakeFreq:.5,runStyle:`sustained_powerful_runs_and_deep_dives`,toothCut:null,refSizeKg:5.99},behavior:{senseRangeM:{visual:10,lateralLine:4,smell:2},lightAffinity:.8,lightSensitivity:.3,noiseSensitivity:.2,lineVisibilitySensitivity:.25,schooling:!0,schoolSize:[3,60],inspectSec:{min:.1,max:.8},biteType:`chase`,strikeCommitP:.9,fleeCooldownSec:{min:5,max:45}},legacy:{note:`src/data/fish.ts(Phase1 placeholder)との対応。id/zones/wariness/power/baseValueは互換のため保持`,zones:[`deep`],power:.95,baseValue:900,minTackle:.8,wariness:.5},designNote:`見切りが少なく、スイッチが入ればルアーに猛然とアタック。ただし食わせる難易度は低めでも、取り込みが最難関(ドラグ・根・体力)。`}]},Kf=[`sand`,`reef`,`weed`,`wall`,`deep`,`shallow`],qf=new Set([`aji`,`saba`,`tachiuo`,`buri`]),Jf=new Set([`kasago`,`chinu`,`madai`]);function Yf(e){var t;let n={};for(let t of e.baits)n[t.id]=t.response;let r=e.behavior;return{id:e.id,nameJa:e.nameJa,rarity:e.rarity,methods:e.methods,depthRange:e.depthRange,tempRangeC:e.tempRangeC,zoneAffinity:{sand:0,reef:0,weed:0,wall:0,deep:0,shallow:0,...e.preferredSeabed.zoneAffinity},swim:{cruise:e.swimSpeed.cruise,burst:e.swimSpeed.burst,refSizeCm:e.swimSpeed.refSizeCm},wariness:e.wariness,baits:n,tow:e.activeHours.timeOfDayWeights,monthly:e.activeHours.monthlyActivity,currentPref:e.currentResponse.preferred,currentTol:e.currentResponse.tolerance,senses:{visual:e.lureResponse.senses.visual,vibration:e.lureResponse.senses.vibration,scent:e.lureResponse.senses.scent},senseRange:r.senseRangeM,lineVisSens:r.lineVisibilitySensitivity,lightSens:r.lightSensitivity,noiseSens:r.noiseSensitivity,inspectSec:[r.inspectSec.min,r.inspectSec.max],biteType:r.biteType,strikeCommitP:r.strikeCommitP,fleeCooldownSec:[r.fleeCooldownSec.min,r.fleeCooldownSec.max],pull:{coef:e.pullStrength.coef,exp:e.pullStrength.exponent,burstMult:e.pullStrength.burstMult,typical:e.pullStrength.sustainedKgf.typical},rockDiving:e.rockDivingTendency,hookOut:{base:e.hookOutChance.base,mouthHoldRatio:e.hookOutChance.mouthHoldRatio},size:{minCm:e.sizeRange.cm.min,typCm:e.sizeRange.cm.typical,maxCm:e.sizeRange.cm.max,a:e.sizeRange.lengthWeight.a,b:e.sizeRange.lengthWeight.b,wTyp:e.sizeRange.weightKg.typical},fight:{staminaSec:e.fight.staminaSec,headShakeFreq:e.fight.headShakeFreq,runStyle:e.fight.runStyle,toothCut:!!e.fight.toothCut},schooling:qf.has(e.id),bottom:Jf.has(e.id),gameBaseValue:(t=e.gameBaseValue)==null?0:t,price:e.price}}var Xf=Gf.species.map(Yf),Zf={id:`esatori`,nameJa:`エサ取り(小魚)`,rarity:`common`,methods:[`float`],depthRange:{min:.3,max:6,preferredMin:.5,preferredMax:2.8},tempRangeC:{min:8,max:32,optMin:14,optMax:28},zoneAffinity:{sand:.7,reef:.5,weed:.5,wall:.9,deep:.05,shallow:.9},swim:{cruise:.3,burst:1.2,refSizeCm:8},wariness:.1,baits:{amiebi:.95,okiami:.95,aoiso:.7,ebi_live:.6,sakana_strip:.7,ika_strip:.55,kani:.3,corn:.8,live_fish:.1,konoshiro_live:.1},tow:{dawn:.5,day:1,dusk:.6,night:.2},monthly:[.5,.5,.6,.8,.9,1,1,1,1,.9,.7,.5],currentPref:.2,currentTol:.5,senses:{visual:.8,vibration:.5,scent:.8},senseRange:{visual:4,lateralLine:1.5,smell:4},lineVisSens:.1,lightSens:.1,noiseSens:.1,inspectSec:[.2,.6],biteType:`peck`,strikeCommitP:.95,fleeCooldownSec:[1,3],pull:{coef:1,exp:.667,burstMult:1.4,typical:.05},rockDiving:0,hookOut:{base:.5,mouthHoldRatio:1},size:{minCm:4,typCm:7,maxCm:12,a:15e-6,b:3,wTyp:.005},fight:{staminaSec:5,headShakeFreq:0,runStyle:`none`,toothCut:!1},schooling:!0,bottom:!1,esatori:!0,gameBaseValue:0,price:null},Qf=Xf,$f=Object.fromEntries([...Xf,Zf].map(e=>[e.id,e])),ep=Gf.catalog.baits;function tp(e,t){return e.size.a*t**+e.size.b}function np(e,t){return e.pull.coef*t**+e.pull.exp}var rp={common:1,uncommon:.4,rare:.12,legend:.03},ip=class{constructor(e=(Date.now()^2654435769)>>>0){this.s=e>>>0}seed(e){this.s=e>>>0}next(){this.s=this.s+1831565813>>>0;let e=this.s;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}u(e,t){return e+(t-e)*this.next()}n01(){let e=Math.max(1e-9,this.next()),t=this.next();return Math.sqrt(-2*Math.log(e))*Math.cos(2*Math.PI*t)}chance(e){return this.next()<e}pick(e){return e[Math.floor(this.next()*e.length)%e.length]}},ap=(e,t,n)=>e<t?t:e>n?n:e,op=e=>e<0?0:e>1?1:e,sp=(e,t,n)=>e+(t-e)*n;function cp(e,t=new Date().getMonth()+1){let n=(e/12.42%1+1)%1,r=Math.abs(Math.sin(2*Math.PI*n)),i=op(.12+.5*r),a=n<.5?1:-1,o=.35,s=op((Math.cos((e-12.5)/24*2*Math.PI)+.35)/1.1);return{hour:e,month:t,tempC:Uf.DEMO_WATER_C+.6*Math.sin((e-14)/24*2*Math.PI),tidePhase:n,tideMove:r,current:i,curDirX:Math.cos(o)*a,curDirZ:Math.sin(o)*a,windMs:3.5,windDirX:.7,windDirZ:-.7,clarity:sp(.65,.9,s),daylight:s,overcast:.2,demo:!0}}function lp(e){return e=(e%24+24)%24,e>=4&&e<7?`dawn`:e>=7&&e<16?`day`:e>=16&&e<19?`dusk`:`night`}var up={dawn:`朝まずめ`,day:`日中`,dusk:`夕まずめ`,night:`夜`};function dp(e,t){let n=[4,7,16,19],r=[`night`,`dawn`,`day`,`dusk`,`night`],i=(t%24+24)%24;for(let t=0;t<4;t++){let a=i-n[t];if(Math.abs(a)<=.5){let n=a+.5;return sp(e.tow[r[t]],e.tow[r[t+1]],n)}}return e.tow[lp(i)]}function fp(e,t,n,r,i){return e<=t||e>=i?.05:e>=n&&e<=r?1:e<n?Math.max(.05,(e-t)/(n-t)):Math.max(.05,(i-e)/(i-r))}function pp(e,t,n=0){var r;let i=Math.max(dp(e,t.hour),Uf.TOD_FLOOR),a=sp(1,(r=e.monthly[(t.month-1+12)%12])==null?.5:r,Uf.DEMO_MONTH_BLEND),o=e.tempRangeC,s=fp(t.tempC,o.min,o.optMin,o.optMax,o.max),c=.4+.6*t.tideMove,l=t.current-e.currentPref,u=Math.max(.2,Math.exp(-(l*l)/(2*e.currentTol*e.currentTol))),d=1+.15*t.overcast;return op(i*a*s*c*u*d)*(1-.5*op(n))}var mp=[{id:`fS`,nameJa:`小ウキ（敏感）`,short:`小`,buoyG:.8,vis:.7,castMaxM:14,sinkRate:.25,note:`小さなアタリも出る。遠投は苦手。`},{id:`fM`,nameJa:`中ウキ（標準）`,short:`中`,buoyG:1.5,vis:.9,castMaxM:22,sinkRate:.4,note:`バランス型。迷ったらこれ。`},{id:`fL`,nameJa:`大ウキ（遠投）`,short:`大`,buoyG:3,vis:1,castMaxM:32,sinkRate:.6,note:`よく飛ぶ。小さなアタリは出にくい。`}],hp=[{id:`h5`,nameJa:`小バリ（5号）`,size:5},{id:`h7`,nameJa:`中バリ（7号）`,size:7},{id:`h10`,nameJa:`大バリ（10号）`,size:10}],gp={aji:6,saba:7,kasago:8,mebaru:5,chinu:8,seabass:10,tachiuo:10,madai:9,buri:14,esatori:3},_p=[{id:`okiami`,nameJa:`オキアミ`,short:`オキアミ`,dataId:`okiami`,esatoriLoss:.35,color:16751226,scent:.7,note:`万能。エサ取りにも弱い。`},{id:`aoiso`,nameJa:`アオイソメ`,short:`アオイソメ`,dataId:`aoiso`,esatoriLoss:.14,color:12603482,scent:.9,note:`エサ持ちが良い。根魚・メバルに。`},{id:`ebi_live`,nameJa:`活きエビ`,short:`活きエビ`,dataId:`ebi_live`,esatoriLoss:.2,color:15251600,scent:.6,note:`メバル・カサゴ・チヌに効く。`},{id:`sakana_strip`,nameJa:`魚の切り身`,short:`切り身`,dataId:`sakana_strip`,esatoriLoss:.18,color:14213352,scent:.85,note:`カサゴ・サバ・タチウオ向き。`},{id:`ika_strip`,nameJa:`イカ短冊`,short:`イカ`,dataId:`ika_strip`,esatoriLoss:.1,color:15920864,scent:.5,note:`持ちが良い。根魚に。`},{id:`corn`,nameJa:`コーン`,short:`コーン`,dataId:`corn`,esatoriLoss:.3,color:15910458,scent:.4,note:`チヌ向き。エサ取りには弱い。`}],vp=[{id:`easy`,nameJa:`おまかせ（アジ・メバル）`,desc:`小ウキ・ウキ下3m・小バリ・オキアミ`,rig:{floatId:`fS`,depthM:3,hookId:`h5`,baitId:`okiami`}},{id:`bottom`,nameJa:`底狙い（カサゴ）`,desc:`中ウキ・ウキ下4m・中バリ・アオイソメ`,rig:{floatId:`fM`,depthM:4,hookId:`h7`,baitId:`aoiso`}},{id:`far`,nameJa:`遠投（チヌ・大物）`,desc:`大ウキ・ウキ下3.5m・中バリ・コーン`,rig:{floatId:`fL`,depthM:3.5,hookId:`h7`,baitId:`corn`}}],yp={...vp[0].rig},bp=.5,xp=.5,Sp={rodPowerKgf:2.3,reelPowerKgf:2.3,reelSpeed:1.35,lineLb:5,lineType:`nylon`,knotQ:.95,stretch:.25,abrRes:.6,lineVis:.6,knotEff:.75,dragMax:2.3},Cp=e=>e.lineLb*Hf.LB_TO_KGF,wp=e=>[Cp(e)*Hf.DRAG_RECOMMENDED[0],Cp(e)*Hf.DRAG_RECOMMENDED[1]],Tp={cruise:.35,run:1,side_run:.8,dive:1,headshake:1,rest:.2,wedged:1},Ep={cruise:.2,run:1,side_run:.8,dive:.8,headshake:.3,rest:0,wedged:.6};function Dp(e){let t=(e-Hf.ROD_IDEAL_ANGLE)/Hf.ROD_ANGLE_SIGMA;return(1-Hf.ROD_CUSHION_MAX*Math.exp(-t*t))*(e>80?Hf.ROD_OVERHEAD_PENALTY:1)}var Op=(e,t)=>e.rodPowerKgf*(.4+.6*Math.sin(t*Math.PI/180)),kp=class{constructor(e,t){var n;this.t=0,this.S=1,this.mode=`cruise`,this.modeT=1.2,this.side=1,this.T=0,this.F_eff=0,this.Pcap=0,this.slipping=!1,this.slipSec=0,this.slack=0,this.peakSlack=0,this.slackSec=0,this.D=0,this.wedgeT=0,this.holdT=0,this.holdNeed=2.5,this.freeFail=0,this.recoverT=0,this.reactT=1.2,this.shockT=0,this.lastRunDone=!1,this.hsSince=0,this.result=null,this.reason=``,this.tension=0,this.dragRatio=0,this.events=[],this.vRadial=0,this.lastTheta=50,this.softWarned=0,this.acc=0,this.stats={slipS:0,maxT:0,maxR:0,wedges:0,headshakes:0,runs:0,steps:0},this.sp=e.sp,this.sizeCm=e.sizeCm,this.W=e.W,this.tackle=e.tackle,this.Fsus=np(e.sp,e.W),this.Fburst=this.Fsus*e.sp.pull.burstMult,this.stamSec=e.sp.fight.staminaSec*(e.W/e.sp.size.wTyp)**.3,this.hookSet=e.hookSet,this.hookSizeF=e.hookSizeF,this.barbless=e.barbless,this.rng=t,this.dist=Math.max(2.5,e.startDist),this.bearing=e.startBearing,this.modeT=t.u(Wf.START_CRUISE[0],Wf.START_CRUISE[1]),this.lineAge=(n=e.lineAgeUse)==null?0:n}get BsEff(){let e=this.tackle;return Cp(e)*e.knotEff*e.knotQ*(1-Hf.ABR_STRENGTH_LOSS*this.D)*(1-.08*this.lineAge)}get Flock(){return Wf.LOCK_K*this.Fsus*(1+this.sp.rockDiving)}get vf(){return(this.sizeCm/this.sp.swim.refSizeCm)**.5}get nearSurface(){return this.dist<5}ev(e,t){this.events.push({kind:e,t:this.t,msg:t})}enter(e){let t=this.rng,n=this.S;switch(this.mode=e,e){case`run`:this.modeT=t.u(1.5,5)*(.5+n),this.shockT=.15,this.stats.runs++,this.ev(`run`);break;case`side_run`:this.modeT=t.u(1,3),this.side=t.chance(.5)?1:-1,this.shockT=.12,this.ev(`side_run`);break;case`dive`:this.modeT=t.u(.9,1.7),this.shockT=.15,this.ev(`dive`);break;case`headshake`:this.modeT=.15,this.shockT=.15,this.stats.headshakes++,this.ev(`headshake`);break;case`rest`:this.modeT=t.u(1,3),this.ev(`rest`);break;case`wedged`:this.modeT=20,this.wedgeT=0,this.holdT=0,this.holdNeed=t.u(1.5,4),this.recoverT=0,this.stats.wedges++,this.ev(`wedged`);break;case`cruise`:this.modeT=t.u(.8,2.2)}}step(e,t){if(this.result)return;let n=Hf.DT,r=this.rng,i=this.tackle,a=this.sp;this.t+=n,this.stats.steps++,this.reactT=Math.max(0,this.reactT-n);let o=ap(e.theta,5,90),s=op(e.reel),c=ap(e.drag,.05,i.dragMax),l=this.S;this.Fsus/(a.pull.coef*a.size.wTyp**+a.pull.exp),this.modeT-=n,this.shockT=Math.max(0,this.shockT-n);let u=op(this.Fsus/3);if(this.mode!==`wedged`){if(this.modeT<=0)this.mode===`run`||this.mode===`side_run`||this.mode===`headshake`?this.enter(l<.7||r.chance(.5)?`rest`:`cruise`):this.mode===`dive`?this.enter(`wedged`):this.enter(`cruise`);else if((this.mode===`cruise`||this.mode===`rest`)&&this.mode===`cruise`){let e=(.15+.35*u)*(.4+.6*l),i=/lateral|side|circles|shakes/.test(a.fight.runStyle)?.5:.2;if(r.chance(e*n))this.enter(r.chance(i)?`side_run`:`run`);else if(l<.3&&this.dist<4&&!this.lastRunDone&&r.chance(.3*n*3))this.lastRunDone=!0,this.enter(`run`),this.modeT=r.u(1,2),this.ev(`last_run`,`ラストラン！`);else{let e=a.fight.headShakeFreq*.5*(1+ +!!this.nearSurface);if(r.chance(e*n))this.enter(`headshake`);else if(t.nearStruct&&a.rockDiving>0){let e=this.T/this.Fsus>=.6&&o>=45,t=a.rockDiving*Hf.DIVE_BASE_HAZARD*Wf.DIVE_SCALE*(this.t<2?3:1)*(e?.5:1)*(l<.3?.4:1);this.reactT>0&&this.T>=.6*this.Fsus*.35&&o>=45&&(t*=.2),r.chance(t*n)&&this.enter(`dive`)}}}}this.mode===`run`&&this.modeT>0&&this.lastRunDone;let d=op(i.stretch*ap(this.dist/Hf.LENGTH_STRETCH_REF_M,.3,1)/.25),f=Tp[this.mode];this.lastRunDone&&this.mode===`run`&&this.S<.3&&(f=.6);let p=this.shockT>0?1+(a.pull.burstMult-1)*(1-.7*d):1,m=this.Fsus*f*(.35+.65*l)*Dp(o)*p;this.F_eff=m;let h=Op(i,o),g=Math.min(c,h,i.reelPowerKgf);this.Pcap=g;let _=c*(1-Math.min(.2,Hf.DRAG_HEAT_RATE*this.slipSec)),v=0,y=!1,b=this.mode===`wedged`;b?(v=s>.2?Math.min(g,g*s):.2*m,s>.2&&c<v&&(v=c*Hf.DRAG_DYN_RATIO)):this.slack>.05?v=0:m>=_*Hf.DRAG_STICTION?(y=!0,v=_*Hf.DRAG_DYN_RATIO):v=Math.min(g,m+Wf.PUSH*s*Math.max(0,g-m)),this.slipping=y,y?(this.slipSec+=n,this.stats.slipS+=n,this.slipSec-n<=0&&this.ev(`drag_slip`)):this.slipSec=Math.max(0,this.slipSec-n*.5);let x=g-m,S=i.reelSpeed*s*op((i.reelPowerKgf-v)/i.reelPowerKgf),C=a.swim.cruise*this.vf,w=a.swim.burst*this.vf,T=0;switch(this.mode){case`run`:T=w*.55*(.4+.6*l);break;case`side_run`:T=w*.12;break;case`cruise`:T=C*.4*Math.sin(this.t*.9+this.W*7);break;case`rest`:T=-C*.5;break;case`dive`:T=C*.2;break;default:T=0}let E=0,D=this.slack;b?E=0:y?E=w*.55*op((m-_*Hf.DRAG_DYN_RATIO)/m)-S*.3:this.slack>.05||T<0&&s>0?(this.slack=Math.max(0,this.slack+(-Math.min(0,T)-S)*n),this.slack>this.peakSlack&&(this.peakSlack=this.slack),E=-S*.5):s>0?E=-S*ap(x/Math.max(.05,g),-1,1)+Math.max(0,T)*.35:(E=(x<0?C*.3:-.1)+Math.max(0,T)*.4,T<0&&(this.slack=Math.max(0,this.slack-T*n*.5)));let O=o-this.lastTheta;if(this.lastTheta=o,O<0&&s>.3&&!b&&v>.05&&(E-=Math.min(.9,-O*.1/n*.2)*op(x/Math.max(.05,g))),this.dist=ap(this.dist+E*n,.4,60),this.vRadial=E,this.slack>.05)this.slackSec+=n,D<=.05&&this.ev(`slack`,`ラインが緩んだ！`);else{if(D>.05){let e=1+1*op(this.peakSlack/1)*(1-.6*d);v=Math.min(g,v*e),this.ev(`snap`)}this.slackSec=0,this.peakSlack=0,this.slack=Math.max(0,this.slack)}if(this.mode===`side_run`){let t=w*.5*(.5+.5*l),r=-e.steer*this.side;t*=1-.5*op(r),this.bearing+=this.side*t*n/Math.max(4,this.dist)}else this.mode===`run`?this.bearing+=(r.n01()*.02+e.steer*-.05)*n:(this.bearing-=this.bearing*.12*n,this.bearing+=-e.steer*.12*n);this.bearing=ap(this.bearing,-1.3,1.3),this.T=v;let k=ap(v/this.Fsus,0,1.5),A=-(1/this.stamSec)*(Hf.STAMINA_BASE_RATE*Ep[this.mode]+Hf.STAMINA_PRESSURE_RATE*k)*Wf.STAMINA_SCALE;k<.15&&(A+=Hf.STAMINA_REST_RECOVER*(1-l)),this.S=op(l+A*n);let j=this.Flock;b&&(this.wedgeT+=n,v>=j&&o>=45?(this.holdT+=n,this.holdT>=this.holdNeed&&(r.chance(.8)?(this.ev(`freed`,`根から引き出した！`),this.enter(`run`),this.bearing*=.5):(this.holdT=0,this.holdNeed=r.u(1.5,3),this.D+=.06)),this.recoverT=0):v<.3*j?(this.holdT=Math.max(0,this.holdT-n),this.recoverT+=n,this.recoverT>r.u(3,6)&&(this.ev(`freed`,`魚が穴から出てきた`),this.enter(`cruise`),this.modeT=2)):(this.holdT=Math.max(0,this.holdT-n*.5),this.recoverT=0));let M=b?1:this.mode===`dive`?.8:t.nearStruct&&this.dist<7?.15:0;if(M>0){let e=Math.max(.1,this.BsEff),r=Math.sqrt(i.lineLb/16);this.D=op(this.D+Hf.ABR_K*Wf.ABR_SCALE*M*Math.max(.2,t.rough)*(.3+v/e)/i.abrRes/r*n)}let N=this.BsEff,ee=v/Math.max(.01,N);if(this.tension=ee,v>this.stats.maxT&&(this.stats.maxT=v),ee>this.stats.maxR&&(this.stats.maxR=ee),this.dragRatio=c/Cp(i),ee>=1)return this.end(`LINE_BREAK`,`ラインが切れた！`);if(ee>=Hf.BREAK_SOFT_RATIO){let e=Hf.BREAK_SOFT_RATE*Wf.SOFT_BREAK_SCALE*((ee-.85)/.15)**2;if(this.softWarned<1&&(this.softWarned=1,this.ev(`soft_warn`,`ラインが限界！`)),r.chance(e*n))return this.end(`LINE_BREAK`,`ラインが切れた！（結び目）`)}else this.softWarned=0;let P=a.hookOut.base*Wf.HOOKOUT_SCALE,te=1.6-this.hookSet,ne=this.barbless?Hf.BARBLESS_HOOKOUT_MULT:1;if(this.mode===`headshake`&&this.modeT>.14){let e=P*te*this.hookSizeF*ne*(1+.8*!!this.nearSurface);if(r.chance(e))return this.end(`HOOK_OUT`,`バレた！（首振り）`)}if(this.slackSec>0){let e=1+3*op(this.slackSec/.5),t=P*.8*e*te*ne;if(r.chance(t*n))return this.end(`HOOK_OUT`,`バレた！（ラインが緩んだ）`)}{let e=a.hookOut.mouthHoldRatio*this.Fsus*(.8+.4*this.hookSet);if(v>e*.85&&this.stats.steps%15==0&&this.ev(`tear_warn`,`口が切れそう！ドラグをゆるめて`),v>e){let t=op(.5*(v/e-1));if(r.chance(t*n*2))return this.end(`HOOK_OUT`,`バレた！（口切れ）`)}}if(b&&(this.wedgeT>20||this.D>=.95))return this.end(`STUCK_LOST`,`根掛かりでラインが切れた…`);if(this.S<=Hf.LAND_STAMINA&&this.dist<=Hf.LAND_DIST_M){let e=.5*P*(this.S>.3?1.8:1)*.6*ne;return r.chance(e)?this.end(`HOOK_OUT`,`タモ入れで外れた…`):this.end(`LANDED`,`取り込み成功！`)}}end(e,t){this.result=e,this.reason=t}advance(e,t,n){for(this.acc+=Math.min(e,.25);this.acc>=Hf.DT&&!this.result;)this.acc-=Hf.DT,this.step(t,n())}popEvents(){let e=this.events;return this.events=[],e}};function Ap(e,t){return ap(1+.6*Math.abs(Math.log(e/t)),1,2)}var jp=.5,Mp=class{constructor(e,t){this.world=e,this.rng=t,this.agents=[],this.events=[],this.pressure=0,this.center={x:0,z:0},this.nextId=1,this.nextGrp=1,this.acc=0,this.actT=0,this.refillT=0,this.actCache={},this.stats={near:0,far:0,spawned:0,byState:{},spooks:0,bites:0,nibbles:0},this.boost=1}sampleSpawn(e,t,n,r){for(let i=0;i<40;i++){let i=n+(r-n)*this.rng.next()**1.5,a=this.rng.u(0,Math.PI*2),o=e+Math.cos(a)*i,s=t+Math.sin(a)*i;if(!(!this.world.isWater(o,s)||this.world.depthAt(o,s)<.7)&&(!this.world.tetraAt(o,s)||this.world.holeAt(o,s)))return{x:o,z:s}}return null}pickSpecies(e,t,n){var r;let i=this.world.depthAt(e,t),a=(r=Kf[this.world.zoneAt(e,t)])==null?`sand`:r;if(n)return i<=6?Zf:null;let o=0,s=[];for(let n of Qf){let r=n.zoneAffinity[a]*rp[n.rarity];i<n.depthRange.min?r=0:i<n.depthRange.preferredMin&&(r*=.5),this.world.holeAt(e,t)&&n.id===`kasago`&&(r*=3),(n.id===`buri`||n.id===`madai`)&&(r*=i>=6?1:.15),s.push(r),o+=r}if(o<=0)return null;let c=this.rng.next()*o;for(let e=0;e<Qf.length;e++)if(c-=s[e],c<=0)return Qf[e];return Qf[0]}sampleSize(e){let t=this.rng.n01();return ap(e.size.typCm*Math.exp(.26*t),e.size.minCm,e.size.maxCm)}spawnAt(e,t,n,r){let i=this.rng,a=this.world.depthAt(e,t),o=this.sampleSize(n),s;s=n.bottom?a-i.u(.2,.6):ap(i.u(n.depthRange.preferredMin,n.depthRange.preferredMax),.4,a-.3),s=ap(s,.3,Math.max(.35,a-.2));let c={id:this.nextId++,sp:n,sizeCm:o,W:tp(n,o),grp:r,x:e,z:t,y:s,hx:e,hz:t,hr:n.bottom?4:9,tx:e,tz:t,ty:s,wanderT:i.u(0,4),heading:i.u(0,6.28),speed:0,state:`idle`,timer:0,timer0:0,cooldown:i.u(0,5),s:0,convince:0,extended:!1,ang:i.u(0,6.28),fleeWhy:``,A:.3,farT:i.u(0,1),biteT:0,seenBait:!1};return this.agents.push(c),this.stats.spawned++,c}populate(e,t,n=!1){this.center.x=e,this.center.z=t;for(let n=this.agents.length-1;n>=0;n--){let r=this.agents[n];r.state!==`biting`&&Math.hypot(r.x-e,r.z-t)>Uf.POP_R+14&&this.agents.splice(n,1)}let r=0,i=0;for(let e of this.agents)e.sp.esatori?i++:r++;let a=n?0:12,o=Uf.POP_R,s=0;for(;r<Uf.POP_N&&s++<120;){let n=this.sampleSpawn(e,t,a,o);if(!n)continue;let i=this.pickSpecies(n.x,n.z,!1);if(i){if(i.schooling){let e=this.nextGrp++,t=2+Math.floor(this.rng.next()*3);for(let a=0;a<t&&r<Uf.POP_N+2;a++){let t={x:n.x+this.rng.u(-2.5,2.5),z:n.z+this.rng.u(-2.5,2.5)};this.world.isWater(t.x,t.z)&&this.world.depthAt(t.x,t.z)>.8&&(this.spawnAt(t.x,t.z,i,e),r++)}}else this.spawnAt(n.x,n.z,i,0),r++}}for(s=0;i<Uf.ESATORI_N&&s++<60;){let n=this.sampleSpawn(e,t,a,Math.min(o,22));if(!n||this.world.depthAt(n.x,n.z)>6)continue;let r=this.pickSpecies(n.x,n.z,!0);r&&(this.spawnAt(n.x,n.z,r,this.nextGrp++),i++)}}popEvents(){let e=this.events;return this.events=[],e}spawnForced(e,t,n,r,i){let a=this.spawnAt(n,r,e,0);return a.sizeCm=t,a.W=tp(e,t),a.y=i,a.state=`biting`,a.biteT=0,a}update(e,t,n,r){if(this.env=n,this.pressure=Math.max(0,this.pressure-Uf.BASE_PRESSURE_DECAY*e),this.actT-=e,this.actT<=0){this.actT=1;for(let e of[...Qf,Zf])this.actCache[e.id]=pp(e,n,this.pressure)}this.refillT-=e,this.refillT<=0&&(this.refillT=4,this.populate(t?t.x:this.center.x,t?t.z:this.center.z)),this.acc+=e;let i=0;for(;this.acc>=Uf.TICK&&i++<5;)this.acc-=Uf.TICK,this.tick(Uf.TICK,t,n,r);i>=5&&(this.acc=0)}tick(e,t,n,r){let i=0,a=0,o={};for(let l=0;l<this.agents.length;l++){var s,c;let u=this.agents[l];u.A=(s=this.actCache[u.sp.id])==null?.3:s,o[u.state]=((c=o[u.state])==null?0:c)+1;let d=t?Math.hypot(u.x-t.x,u.z-t.z):1e9;if(t!=null&&(d<=Uf.NEAR_R||u.state===`biting`||u.state!==`idle`&&u.state!==`search`))i++,this.tickNear(u,e,t,n,r);else if(a++,u.farT+=e,u.farT>=Uf.FAR_TICK){let e=u.farT;u.farT=0,this.wander(u,e,1,t),u.cooldown>0&&(u.cooldown-=e)}}this.stats.near=i,this.stats.far=a,this.stats.byState=o}tryMove(e,t,n){let r=this.world;return r.isWater(t,n)&&(!r.tetraAt(t,n)||r.holeAt(t,n))?(e.x=t,e.z=n,!0):r.isWater(t,e.z)&&!r.tetraAt(t,e.z)?(e.x=t,!0):r.isWater(e.x,n)&&!r.tetraAt(e.x,n)?(e.z=n,!0):!1}fixDepth(e,t){let n=this.world.depthAt(e.x,e.z),r=ap(e.ty,.25,Math.max(.3,n-.2)),i=jp*t;e.y+=ap(r-e.y,-i,i),e.y>n-.15&&(e.y=Math.max(.25,n-.15))}vf(e){return(e.sizeCm/e.sp.swim.refSizeCm)**.5}wander(e,t,n,r=null){if(e.wanderT-=t,e.wanderT<=0){e.wanderT=this.rng.u(3,8);let t=this.rng.u(0,6.28),n=Math.sqrt(this.rng.next())*e.hr;if(e.tx=e.hx+Math.cos(t)*n,e.tz=e.hz+Math.sin(t)*n,r&&e.A>.25&&!e.sp.esatori&&this.rng.chance(Uf.ATTRACT*e.A)){let t=this.rng.u(.5,6),n=this.rng.u(0,6.28);e.tx=r.x+Math.cos(n)*t,e.tz=r.z+Math.sin(n)*t}else if(r&&e.sp.esatori&&this.rng.chance(Uf.ATTRACT)){let t=this.rng.u(.5,5),n=this.rng.u(0,6.28);e.tx=r.x+Math.cos(n)*t,e.tz=r.z+Math.sin(n)*t}let i=this.world.depthAt(e.tx,e.tz);e.ty=e.sp.bottom?i-this.rng.u(.2,.6):this.rng.u(e.sp.depthRange.preferredMin,e.sp.depthRange.preferredMax),this.world.isWater(e.tx,e.tz)||(e.tx=e.hx,e.tz=e.hz,e.ty=e.y)}let i=e.tx-e.x,a=e.tz-e.z,o=Math.hypot(i,a),s=e.sp.swim.cruise*this.vf(e)*n;if(o>.3){e.heading=Math.atan2(a,i);let n=Math.min(o,s*t);this.tryMove(e,e.x+i/o*n,e.z+a/o*n)||(e.wanderT=0),e.speed=s}else e.speed=0;this.fixDepth(e,t)}stimulus(e,t,n){var r,i;let a=e.sp,o=e.x-t.x,s=e.z-t.z,c=e.y-t.depth,l=Math.hypot(o,s,c),u=(r=a.baits[t.dataId])==null?.05:r;u*=.25+.75*op(t.life),t.life<=.03&&(u=.03);let d=t.action===`drift`?.8:.4,f=1+.3*a.lightSens*(1-n.daylight),p=op(1-l/a.senseRange.visual)*n.clarity*f,m=op(1-l/a.senseRange.lateralLine)*ap(.25+t.vib,0,1),h=o*n.curDirX+s*n.curDirZ>0?1+.4*n.current:1,g=op(1-l/a.senseRange.smell)*t.scent*h,_=Math.max(p*a.senses.visual,m*a.senses.vibration,g*a.senses.scent),v=(.6+1.4*(1-a.wariness))*(a.bottom?.7:1),y=Math.exp(-(c*c)/(v*v)),b=1/Ap(t.hookSize,(i=gp[a.id])==null?7:i)**.8;return u*d**.7*_*y*b*Uf.STIM_GAIN}suspicionRate(e,t,n,r){let i=e.sp,a=i.wariness,o=op(1-Math.hypot(e.x-t.x,e.z-t.z,e.y-t.depth)/3),s=.6*n.clarity*(1-.5*op(e.y/10))*o,c=n.daylight*.5,l=(1-(t.action===`drift`?.8:.4))*.5,u=Math.hypot(t.x-t.playerX,t.z-t.playerZ)<4?n.daylight*.5:0;return a*(s*i.lineVisSens+r*i.noiseSens+c*i.lightSens+l+u*.6)*Uf.SUSPICION_SCALE-.15*(1-a)}setState(e,t,n){let r=e.state;e.state=t,this.events.push({kind:`state`,agent:e,from:r,to:t,why:n})}flee(e,t,n){let r=e.sp,i=this.rng;if(e.fleeWhy=t,e.heading=n?Math.atan2(e.z-n.z,e.x-n.x)+i.u(-.6,.6):i.u(0,6.28),e.speed=(t===`lose_interest`?r.swim.cruise*1.4:r.swim.burst)*this.vf(e),e.timer=t===`spook`?i.u(1.2,2.2):t===`miss`?1:2.5,e.cooldown=i.u(r.fleeCooldownSec[0],r.fleeCooldownSec[1])*(1+this.pressure),t===`spook`&&(this.pressure+=.15,this.stats.spooks++,e.grp))for(let t of this.agents)t!==e&&t.grp===e.grp&&Math.hypot(t.x-e.x,t.z-e.z)<10&&(t.s=op(t.s+.3));e.s=0,e.convince=0,this.setState(e,`flee`,t)}finishBite(e,t,n){if(t===`hooked`){let t=this.agents.indexOf(e);t>=0&&this.agents.splice(t,1)}else this.flee(e,`miss`,n)}tickNear(e,t,n,r,i){let a=e.sp,o=this.rng;switch(e.cooldown>0&&e.state===`idle`&&(e.cooldown-=t),e.state){case`idle`:{if(this.wander(e,t,1,n),e.cooldown>0)break;let r=Math.hypot(e.x-n.x,e.z-n.z,e.y-n.depth)<Math.max(a.senseRange.smell,a.senseRange.visual),i=e.A*Uf.K_SEARCH*(r?3:1)*t*this.boost;o.chance(i)&&(e.timer=o.u(20,60),this.setState(e,`search`));break}case`search`:{this.wander(e,t,1.1,n);let i=this.stimulus(e,n,r);if(i>=.02&&o.chance(op(i*e.A*2*this.boost)*t)){e.seenBait=!0,this.setState(e,`approach`),e.s=Math.max(0,e.s);break}e.timer-=t,e.timer<=0&&(e.cooldown=1,this.setState(e,`idle`));break}case`approach`:{if(e.s=op(e.s+this.suspicionRate(e,n,r,i)*t),e.s>=1){this.flee(e,`spook`,n);break}if(this.stimulus(e,n,r)<.01&&(e.timer-=t*2,e.timer<=0)){e.cooldown=1,this.setState(e,`idle`);break}let s=n.x-e.x,c=n.z-e.z,l=Math.hypot(s,c),u=(a.biteType===`chase`?a.swim.burst*.5:a.swim.cruise*2)*this.vf(e);if(Math.hypot(l,e.y-n.depth)<=.4+.5*e.sizeCm/100+.15){e.convince=0,e.timer0=e.timer=o.u(a.inspectSec[0],a.inspectSec[1])*(.6+.8*a.wariness)/(.5+e.A),e.extended=!1,e.ang=Math.atan2(e.z-n.z,e.x-n.x),this.setState(e,`inspect`);break}e.heading=Math.atan2(c,s),e.speed=u;let d=Math.min(l,u*t);l>.01&&this.tryMove(e,e.x+s/l*d,e.z+c/l*d),e.ty=n.depth,this.fixDepth(e,t*1.6);break}case`inspect`:{let o=this.stimulus(e,n,r);e.s=op(e.s+this.suspicionRate(e,n,r,i)*t),e.convince=op(e.convince+(o*(.3+.7*e.A)*Uf.CONV_K-.6*e.s)*t);let s=.4+.5*e.sizeCm/100;e.ang+=a.swim.cruise*this.vf(e)/Math.max(.3,s)*t;let c=n.x+Math.cos(e.ang)*s,l=n.z+Math.sin(e.ang)*s;if(this.tryMove(e,c,l),e.ty=n.depth,this.fixDepth(e,t*2),e.s>=1){this.flee(e,`spook`,n);break}if(e.convince>=.6+.4*a.wariness){this.setState(e,`strike`);break}e.timer-=t,e.timer<=0&&(e.convince>=.5&&!e.extended?(e.extended=!0,e.timer=.5*e.timer0):this.flee(e,`lose_interest`,n));break}case`strike`:if(a.esatori){this.events.push({kind:`nibble`,agent:e}),this.stats.nibbles++,e.cooldown=o.u(1.5,4.5),e.s=0,e.convince=0,e.heading=o.u(0,6.28),e.speed=.8,e.timer=.6,this.setState(e,`flee`,`nibble`),e.fleeWhy=`nibble`;break}if(!o.chance(a.strikeCommitP)){this.flee(e,`miss`,n);break}e.biteT=0,this.stats.bites++,this.setState(e,`biting`),this.events.push({kind:`bite`,agent:e});break;case`biting`:e.biteT+=t,e.x+=(n.x-e.x)*.5,e.z+=(n.z-e.z)*.5,e.y+=(n.depth-e.y)*.5,e.biteT>8&&this.flee(e,`miss`,n);break;case`flee`:{let n=e.speed*t;this.tryMove(e,e.x+Math.cos(e.heading)*n,e.z+Math.sin(e.heading)*n),e.timer-=t,e.speed*=.97,e.timer<=0&&(e.hx=e.x,e.hz=e.z,this.setState(e,`idle`));break}}}};function Np(e,t,n){return(Math.sin(e*.35+n*1.1)*.5+Math.sin(t*.5-n*.9+e*.2)*.35+Math.sin((e+t)*.9+n*1.7)*.15)*.18}var Pp=class{constructor(e,t={}){var n,r,i;this.world=e,this.rig={...yp},this.phase=`ready`,this.events=[],this.px=0,this.pz=0,this.yaw=0,this.aimPower=0,this.aimDir=1,this.aiming=!1,this.castFrom={x:0,z:0,y:0},this.castTo={x:0,z:0},this.castDist=0,this.castT=0,this.castDur=1,this.castPower=0,this.fx=0,this.fz=0,this.fvx=0,this.fvz=0,this.floatInWater=!1,this.settle=0,this.baitDepthNow=0,this.seabed=0,this.zone=0,this.floatDip=0,this.floatSlide=0,this.floatTilt=0,this.retrieving=!1,this.reelHeld=!1,this.distToPlayer=0,this.quick=null,this.lastPower=0,this.bait=null,this.baitLife=1,this.script=null,this.t=0,this.waitT=0,this.sinceBite=0,this.sinceAction=0,this.nibbles=0,this.baitStolen=0,this.casts=0,this.fight=null,this.fishAgent=null,this.inp={reel:0,theta:50,drag:.75,steer:0},this.hookQ=0,this.hookedSp=null,this.ctxT=0,this.ctxCache={nearStruct:!1,rough:.2},this.lastResult=null,this.noise=0,this.snag=!1,this.snagHold=0,this.hintT=0,this.lastHint=``,this.stats={bites:0,hooked:0,landed:0,lost:0,breaks:0,hookouts:0,early:0,empty:0,late:0},this.statsFight={time:0},this.recent=[],this.boost=1,this.rng=new ip((n=t.seed)==null?Math.random()*4294967296>>>0:n),this.env=cp((r=t.hour)==null?new Date().getHours()+new Date().getMinutes()/60:r,t.month),this.sim=new Mp(e,this.rng),this.boost=(i=t.fast)==null?1:i,this.rig.depthM=yp.depthM}emit(e){this.events.push(e)}popEvents(){let e=this.events;return this.events=[],e}get floatDef(){var e;return(e=mp.find(e=>e.id===this.rig.floatId))==null?mp[0]:e}get baitDef(){var e;return(e=_p.find(e=>e.id===this.rig.baitId))==null?_p[0]:e}get hookSize(){var e;return((e=hp.find(e=>e.id===this.rig.hookId))==null?hp[0]:e).size}setEnv(e,t){this.env=cp(e,t==null?this.env.month:t)}begin(e,t,n){this.px=e,this.pz=t,this.yaw=n,this.phase=`ready`,this.fight=null,this.script=null,this.bait=null,this.floatInWater=!1,this.quick=null;let r=-Math.sin(n),i=-Math.cos(n);this.sim.agents.length=0,this.sim.populate(e+r*12,t+i*12,!0),this.casts=0}end(){this.quick=null,this.phase=`ready`,this.fight=null,this.script=null,this.bait=null,this.floatInWater=!1,this.aiming=!1,this.sim.agents.length=0}setRig(e){Object.assign(this.rig,e),this.rig.depthM=ap(Math.round(this.rig.depthM*2)/2,bp,10),this.bait&&(this.bait.hookSize=this.hookSize)}adjustDepth(e){this.setRig({depthM:this.rig.depthM+e}),this.emit({kind:`toast`,msg:`ウキ下 ${this.rig.depthM.toFixed(1)}m`})}startAim(){return this.phase===`ready`&&(this.aiming=!0,this.aimPower=0,this.aimDir=1,this.phase=`aim`,!0)}cancelAim(){this.phase===`aim`&&(this.aiming=!1,this.phase=`ready`)}landing(e,t){let n=this.floatDef.castMaxM,r=sp(3.5,n,op(t)),i=-Math.sin(e),a=-Math.cos(e),o=-1;for(let e=1;e<=r+1e-6;e+=.5){let t=this.px+i*e,n=this.pz+a*e;if(!this.world.isWater(t,n)||this.world.depthAt(t,n)<.8||this.world.tetraAt(t,n)&&!this.world.holeAt(t,n)){if(o>0)break}else o=e}if(o<2)return null;let s=o;return{x:this.px+i*s,z:this.pz+a*s,dist:s}}cast(e,t){if(this.phase!==`ready`&&this.phase!==`aim`)return!1;let n=op(e),r=this.landing(t,n);if(!r)return this.emit({kind:`toast`,msg:`そこは岸が近すぎて投げられない。もう少し沖へ向けよう`,level:`warn`}),this.aiming=!1,this.phase=`ready`,!1;this.yaw=t;let i=(1-.8)*.5,a={x:r.x+this.rng.u(-.09999999999999998,i),z:r.z+this.rng.u(-.09999999999999998,i)};return this.world.isWater(a.x,a.z)||(a.x=r.x,a.z=r.z),this.castFrom={x:this.px,z:this.pz,y:1.9},this.castTo=a,this.castDist=r.dist,this.castPower=n,this.castT=0,this.castDur=.55+.022*r.dist,this.phase=`flight`,this.aiming=!1,this.floatInWater=!1,this.bait=null,this.script=null,this.snag=!1,this.fx=this.px,this.fz=this.pz,this.retrieving=!1,this.baitLife=this.baitLife>.2?this.baitLife:1,this.casts++,this.lastPower=n,this.quick=null,this.sinceBite=0,this.sinceAction=0,this.emit({kind:`cast`,power:n,dist:r.dist}),!0}setRetrieve(e){this.phase===`wait`||this.phase===`bite`?this.reelHeld=e:this.phase!==`fight`&&(this.reelHeld=!1)}quickRetrieve(){if(this.quick||!this.floatInWater||this.phase!==`wait`&&this.phase!==`bite`)return!1;this.script&&(this.sim.finishBite(this.script.agent,`miss`,this.bait),this.script=null),this.phase=`wait`,this.reelHeld=!1,this.retrieving=!0;let e=this.px-this.fx,t=this.pz-this.fz,n=Math.max(.01,Math.hypot(e,t)),r=this.snag&&this.rng.chance(.35);return this.snag=!1,this.snagHold=0,this.quick={t:0,dur:ap(.7+n*.012,.8,1.1),sx:this.fx,sz:this.fz,tx:this.px+(this.fx-this.px)/n*1.4,tz:this.pz+(this.fz-this.pz)/n*1.4,lost:r},this.noise=Math.max(this.noise,.25),this.floatDip=0,this.emit({kind:`quick_retrieve`}),!0}updateQuick(e){let t=this.quick;t.t+=e;let n=op(t.t/t.dur),r=n*n*(3-2*n)*.35+n*.65;if(this.fx=sp(t.sx,t.tx,r),this.fz=sp(t.sz,t.tz,r),this.baitDepthNow*=Math.max(0,1-e*6),this.bait&&(this.bait.x=this.fx,this.bait.z=this.fz,this.bait.depth=this.baitDepthNow,this.bait.action=`retrieve`),this.distToPlayer=Math.hypot(this.fx-this.px,this.fz-this.pz),n>=1){let e=t.lost;this.quick=null,this.finishRetrieve(e)}}autoCastPlan(){let e=this.yaw,t=null;for(let n of[0,.2,-.2,.4,-.4,.6,-.6])for(let r of[.55,.7,.4,.85,.3]){let i=e+n,a=this.landing(i,r);if(!a)continue;let o=this.world.depthAt(a.x,a.z),s=this.world.zoneAt(a.x,a.z);if(this.world.tetraAt(a.x,a.z))continue;let c=-Math.abs(o-(this.rig.depthM+1.2))*.8+(s===1||s===3?.8:0)-Math.abs(n)*.5-Math.abs(r-.6)*.3+this.rng.u(0,.4);o<1.8&&(c-=3),(!t||c>t.score)&&(t={yaw:i,power:r,score:c,depth:o})}return t?{yaw:t.yaw,power:t.power,depth:t.depth}:null}hookset(){var e,t;if(this.phase===`ready`||this.phase===`aim`||this.phase===`flight`||this.phase===`fight`||this.phase===`result`||this.quick)return;let n=this.script;if(this.noise=Math.max(this.noise,.15),!n||n.done||!this.bait){this.stats.empty++,this.emit({kind:`hookset`,result:`empty`,q:0}),this.emit({kind:`toast`,msg:`空振り（アタリが出てから合わせよう）`}),this.floatDip=-.2;return}let r=this.t-n.t0,i=(r-n.mainAt)/n.W,a,o=`ok`,s=n.agent.sp.wariness;if(i<0){let e=n.mainAt-r;e<.12?a=.5:(a=n.type===`peck_then_swallow`?0:.12*Math.exp(-e*1.5),o=`early`),e>=.12&&(o=`early`)}else i<=.1?a=sp(.75,1,i/.1):i<=.8?a=1:i<=1?a=sp(1,.55,(i-.8)/.2):i<=1.5?(a=sp(.55,.3,(i-1)/.5),o=`late`):a=.15;n.type===`peck_then_swallow`&&i>=0&&i<.35&&(a*=.4),n.type===`mouth_and_spit`&&i>.55&&(a*=.35,o=`late`);let c=n.agent.sp,l=Ap(this.hookSize,(e=gp[c.id])==null?7:e),u=1/l**1;this.hookSize>((t=gp[c.id])==null?7:t)*1.8&&n.agent.sizeCm<25&&(u*=.6);let d=op(Uf.HOOK_BASE_FLOAT*(a>0?.25+.75*a:0)*u*(1-.1*s));if(n.done=!0,this.rng.chance(d)){this.hookQ=a;let e=ap(.3+.7*a+.1,.3,1);this.emit({kind:`hookset`,result:`hooked`,q:a}),this.beginFight(n.agent,e,l)}else{let e=o===`early`?`early`:o===`late`?`late`:`miss`;e===`early`?this.stats.early++:e===`late`&&this.stats.late++,this.emit({kind:`hookset`,result:e,q:a}),this.emit({kind:`toast`,msg:e===`early`?`早合わせ！魚に違和感を与えた`:e===`late`?`遅合わせ…エサだけ取られた`:`ハリ掛かりしなかった`,level:`warn`}),e===`late`&&this.bait&&(this.bait.life=Math.max(0,this.bait.life-.6),this.checkBait()),this.sim.finishBite(n.agent,`miss`,this.bait),this.script=null,this.phase=`wait`,this.floatDip=-.15}}beginFight(e,t,n){this.sim.finishBite(e,`hooked`,this.bait),this.fishAgent=e,this.hookedSp=e.sp;let r=Math.hypot(this.fx-this.px,this.fz-this.pz),i=ap(this.relBearing(this.fx,this.fz),-1.2,1.2);this.fight=new kp({sp:e.sp,sizeCm:e.sizeCm,W:e.W,hookSet:t,hookSizeF:n,barbless:!1,tackle:Sp,startDist:r,startBearing:i},this.rng),this.phase=`fight`,this.script=null,this.stats.hooked++,this.statsFight.time=0,this.inp.reel=0,this.inp.theta=50,this.inp.steer=0,this.reelHeld=!1,this.retrieving=!1,this.emit({kind:`fish_hit`,species:e.sp.id})}relBearing(e,t){let n=Math.atan2(-(e-this.px),-(t-this.pz))-this.yaw;for(;n>Math.PI;)n-=2*Math.PI;for(;n<-Math.PI;)n+=2*Math.PI;return-n}fishWorld(){let e=this.fight;if(!e)return null;let t=-Math.sin(this.yaw),n=-Math.cos(this.yaw),r=Math.cos(this.yaw),i=-Math.sin(this.yaw);return{x:this.px+e.dist*(Math.cos(e.bearing)*t+Math.sin(e.bearing)*r),z:this.pz+e.dist*(Math.cos(e.bearing)*n+Math.sin(e.bearing)*i)}}updateFightCtx(){let e=this.fishWorld();if(!e)return;let t=!1,n=.1,r=this.world,i=[.05,1,.2,.8,.1,.4];for(let a of[0,1.5,3])for(let o=0;o<(a===0?1:8);o++){let s=o*Math.PI/4,c=e.x+Math.cos(s)*a,l=e.z+Math.sin(s)*a;if(!r.isWater(c,l)){t=!0,n=Math.max(n,.8);continue}let u=r.zoneAt(c,l);u===1||u===3||r.tetraAt(c,l)||r.holeAt(c,l)?(t=!0,n=Math.max(n,r.tetraAt(c,l)||r.holeAt(c,l)?1:i[u])):n=Math.max(n,i[u]*.5)}this.ctxCache={nearStruct:t,rough:n}}finishFight(){let e=this.fight,t=e.sp,n;if(e.result===`LANDED`){this.stats.landed++;let r=op(.5+.35*ap(Math.log(e.sizeCm/t.size.typCm)/Math.log(t.size.maxCm/t.size.typCm),-1,1)+.1*(this.hookQ-.7));n={speciesId:t.id,sizeCm:Math.round(e.sizeCm*10)/10,weightKg:Math.round(e.W*1e3)/1e3,quality:Math.round(r*100)/100,hour:this.env.hour,at:Date.now(),rig:{...this.rig},fightS:Math.round(e.t*10)/10,hookQ:this.hookQ,first:!1,env:{tempC:this.env.tempC,tod:lp(this.env.hour)}}}else e.result===`LINE_BREAK`||e.result===`STUCK_LOST`?(this.stats.breaks++,this.stats.lost++):e.result===`HOOK_OUT`&&(this.stats.hookouts++,this.stats.lost++);this.lastResult={result:e.result,reason:e.reason,rec:n,species:t.id},this.emit({kind:`end`,result:e.result,reason:e.reason,catchRec:n,species:t.id}),this.phase=`result`,this.floatInWater=!1,this.bait=null}dismissResult(){this.phase===`result`&&(this.fight=null,this.fishAgent=null,this.phase=`ready`,this.lastResult=null,this.baitLife=1)}update(e){let t=Math.min(e,.1);switch(this.t+=t,this.noise=Math.max(0,this.noise-t/3),this.sinceAction+=t,this.aiming&&(this.aimPower+=this.aimDir*t/.9,this.aimPower>=1?(this.aimPower=1,this.aimDir=-1):this.aimPower<=0&&(this.aimPower=0,this.aimDir=1)),this.phase){case`flight`:this.updateFlight(t);break;case`wait`:case`bite`:this.updateWater(t);break;case`fight`:this.updateFight(t)}this.floatDip*=Math.exp(-t*3),this.floatSlide*=Math.exp(-t*2.5)}updateFlight(e){this.castT+=e;let t=op(this.castT/this.castDur);this.fx=sp(this.castFrom.x,this.castTo.x,t),this.fz=sp(this.castFrom.z,this.castTo.z,t),t>=1&&this.land()}flightHeight(){let e=op(this.castT/this.castDur);return sp(this.castFrom.y,.1,e)+(2.2+this.castDist*.12)*4*e*(1-e)}land(){this.fx=this.castTo.x,this.fz=this.castTo.z,this.floatInWater=!0,this.settle=0,this.baitDepthNow=.2,this.seabed=this.world.depthAt(this.fx,this.fz),this.zone=this.world.zoneAt(this.fx,this.fz),this.phase=`wait`,this.waitT=0,this.noise=Math.max(this.noise,.3);let e=this.baitDef;this.baitLife=1,this.bait={x:this.fx,z:this.fz,depth:.2,life:1,dataId:e.dataId,scent:e.scent,hookSize:this.hookSize,action:`drift`,vib:1,onBottom:!1,playerX:this.px,playerZ:this.pz},this.floatDip=.12,this.emit({kind:`splash`,x:this.fx,z:this.fz}),this.sim.populate(this.fx,this.fz)}updateWater(e){let t=this.env,n=this.bait;if(this.waitT+=e,this.settle+=e,this.sinceBite+=e,this.distToPlayer=Math.hypot(this.fx-this.px,this.fz-this.pz),this.quick){this.updateQuick(e),this.hintT=0;return}if(this.reelHeld&&this.phase===`wait`){this.retrieving=!0;let t=this.px-this.fx,r=this.pz-this.fz,i=Math.hypot(t,r),a=2.2;if(this.snag){if(this.snagHold+=e,this.floatDip=Math.max(this.floatDip,.1),this.snagHold>1){this.snag=!1;let e=this.rng.chance(.4);if(this.emit({kind:`snag`,state:e?`lost`:`freed`}),this.snagHold=0,e){this.finishRetrieve(!0);return}}}else if(i>2)this.fx+=t/i*a*e,this.fz+=r/i*a*e;else{this.finishRetrieve(!1);return}n&&(n.action=`retrieve`,this.noise=Math.max(this.noise,.12))}else if(this.retrieving=!1,this.snagHold=0,n&&(n.action=`drift`),!this.snag){let n=t.curDirX*t.current*.22+t.windDirX*t.windMs*.012,r=t.curDirZ*t.current*.22+t.windDirZ*t.windMs*.012;this.fvx+=(n-this.fvx)*e*.5,this.fvz+=(r-this.fvz)*e*.5;let i=this.fx+this.fvx*e,a=this.fz+this.fvz*e;this.world.isWater(i,a)&&this.world.depthAt(i,a)>.8&&(!this.world.tetraAt(i,a)||this.world.holeAt(i,a))?(this.fx=i,this.fz=a):(this.fvx*=.5,this.fvz*=.5)}this.seabed=this.world.depthAt(this.fx,this.fz),this.zone=this.world.zoneAt(this.fx,this.fz);let r=Math.min(this.rig.depthM,Math.max(.3,this.seabed-.12)),i=this.floatDef.sinkRate;this.baitDepthNow+=ap(r-this.baitDepthNow,-i*e*2,i*e);let a=this.rig.depthM>=this.seabed-.12;this.floatTilt=+!!a,n&&(n.x=this.fx,n.z=this.fz,n.depth=this.retrieving?Math.min(this.baitDepthNow,1.2):this.baitDepthNow,n.vib=Math.max(0,n.vib-e/1.6),n.onBottom=a,n.playerX=this.px,n.playerZ=this.pz,n.hookSize=this.hookSize,n.life=this.baitLife,a&&(this.zone===1||this.world.holeAt(this.fx,this.fz)||this.world.tetraAt(this.fx,this.fz))&&!this.snag&&!this.retrieving&&this.phase===`wait`&&this.rng.chance(.03*e)&&(this.snag=!0,this.snagHold=0,this.emit({kind:`snag`,state:`hooked`}),this.emit({kind:`toast`,msg:`根掛かり！ 巻いて外そう（ウキ下を浅くすると防げる）`,level:`warn`}))),this.sim.boost=this.boost,this.sim.update(e,this.phase===`wait`||this.phase===`bite`?n:null,t,this.noise+(this.retrieving?.1:0));for(let e of this.sim.popEvents())this.onSimEvent(e);this.updateScript(e),this.hintT+=e,this.phase===`wait`&&this.hintT>8&&(this.hintT=0,this.maybeHint())}finishRetrieve(e){this.floatInWater=!1,this.bait=null,this.retrieving=!1,this.reelHeld=!1,this.phase=`ready`,this.snag=!1,this.quick=null,this.emit({kind:`reel_in_done`}),e&&this.emit({kind:`toast`,msg:`仕掛けを失った… 新しい仕掛けをセットしたよ`,level:`warn`}),this.baitLife=1}onSimEvent(e){if(e.kind===`nibble`){let e=this.bait;if(!e)return;let t=this.baitDef.esatoriLoss*this.rng.u(.6,1.2);this.baitLife=Math.max(0,this.baitLife-t),e.life=this.baitLife,this.nibbles++,this.floatDip=Math.max(this.floatDip,.1),this.emit({kind:`nibble`,strength:.25}),this.checkBait()}else if(e.kind===`bite`){if(this.script||this.phase!==`wait`){this.sim.finishBite(e.agent,`miss`,this.bait);return}this.startScript(e.agent)}else e.kind===`state`&&e.to===`flee`&&e.why===`spook`&&this.emit({kind:`spook`})}checkBait(){this.baitLife<=.05&&this.phase===`wait`&&(this.emit({kind:`bait_gone`}),this.emit({kind:`toast`,msg:`エサを取られた！一度巻いて付け直そう`,level:`warn`}))}startScript(e){let t=e.sp,n=this.rng,r=t.biteType,i=(e.W/t.size.wTyp)**.25,a=ap((.45+.4*n.next())*i,.25,1),o=[],s=.5,c=ap((.8-.4*t.wariness)*Uf.BEGINNER_WINDOW*(r===`mouth_and_spit`?.6:r===`chase`?.8:1),.45,2.2),l=(e,t)=>o.push({t:e,amp:t,dur:.22,kind:`pre`});switch(r){case`peck`:l(0,.3*a),l(.32,.35*a),n.chance(.6)&&l(.62,.3*a),s=o[o.length-1].t+.4;break;case`chase`:n.chance(.3)?(l(0,.25*a),s=.35):s=.02;break;case`peck_then_swallow`:l(0,.3),l(.4,.3),l(.9,.35),s=1.5;break;case`mouth_and_hold`:l(0,.2*a),l(.6,.25*a),s=1;break;case`mouth_and_spit`:l(0,.25*a),s=.55;break;case`gulp`:l(0,.2*a),s=.5;break;default:l(0,.25*a),s=.5}let u={agent:e,t0:this.t,beats:o,mainAt:s,W:c,strength:a,type:r,slide:n.chance(.5)?1:-1,ateAt:s+c*1.5,spitAt:r===`mouth_and_spit`?s+c*.55:1e9,done:!1,preFired:!1,mainFired:!1};o.push({t:s,amp:r===`gulp`?1*a:r===`chase`?.9*a:.85*a,dur:c+.5,kind:`main`}),this.script=u,this.phase=`bite`,this.stats.bites++,this.sinceBite=0,this.hintT=0}updateScript(e){let t=this.script;if(!t)return;let n=this.t-t.t0;!t.preFired&&t.beats.length>1&&n>=t.beats[0].t&&(t.preFired=!0,this.emit({kind:`pre`,strength:t.beats[0].amp}));for(let e of t.beats)e.kind===`pre`&&!e.fired&&n>=e.t&&(e.fired=!0,this.floatDip=Math.max(this.floatDip,.08+e.amp*.5));if(!t.mainFired&&n>=t.mainAt&&(t.mainFired=!0,this.emit({kind:`bite`,strength:t.strength,type:t.type}),this.floatSlide=t.type===`chase`?t.slide*.9:t.slide*.2),t.mainFired&&!t.done){let r=t.beats[t.beats.length-1],i=op((n-t.mainAt)/.18),a=(n>=t.spitAt?-.3:1)*r.amp*i;this.floatDip+=(a-this.floatDip)*op(e*12)}(n>=t.ateAt&&!t.done||t.mainFired&&t.type===`mouth_and_spit`&&n>t.spitAt+.3&&!t.done)&&this.biteEnd(t)}biteEnd(e){e.done=!0,this.bait&&(this.baitLife=Math.max(0,this.baitLife-(e.type===`mouth_and_spit`?.15:.7)),this.bait.life=this.baitLife,this.checkBait()),this.emit({kind:`toast`,msg:e.type===`mouth_and_spit`?`吐き出された…（合わせが遅い）`:`エサを食い逃げされた（合わせが遅れた）`,level:`warn`}),this.stats.late++,this.sim.finishBite(e.agent,`ate`,this.bait),this.script=null,this.phase=`wait`}get biteActive(){return!!this.script&&!this.script.done&&this.script.mainFired}get preActive(){return!!this.script&&!this.script.done&&!this.script.mainFired}updateFight(e){let t=this.fight;if(!t)return;this.statsFight.time+=e,this.noise=Math.max(this.noise,.1),t.advance(e,this.inp,()=>(this.ctxT++,this.ctxT%8==1&&this.updateFightCtx(),this.ctxCache));for(let e of t.popEvents())this.emit({kind:`fight_event`,ev:e});let n=this.fishWorld();n&&(this.fx=n.x,this.fz=n.z),t.result&&this.finishFight()}describeActive(){let e={};for(let n of this.sim.agents){var t;n.sp.esatori||Math.hypot(n.x-this.fx,n.z-this.fz)<16&&this.sim.agents.length&&(e[n.sp.id]=((t=e[n.sp.id])==null?0:t)+1)}return Object.entries(e).map(([e,t])=>({id:e,n:t})).sort((e,t)=>t.n-e.n)}maybeHint(){let e=this.sinceBite;if(this.phase!==`wait`||e<40)return;let t=this.pickHint();t&&t!==this.lastHint&&(this.lastHint=t,this.hintT=-22,this.emit({kind:`hint`,msg:t}))}pickHint(){let e=this.rig,t=this.seabed,n=this.env,r=this.baitDef;if(this.baitLife<=.05)return`エサがなくなってる。巻いて付け直そう`;if(this.nibbles>=3&&this.baitLife<.5)return`エサ取りが多い。ウキ下を深くするか、エサ持ちのいいアオイソメ・イカに替えてみよう`;if(e.depthM>t-.1)return`ウキ下(${e.depthM}m)が水深(約${t.toFixed(1)}m)より深い。底を引きずっているよ。ウキ下を浅くしてみよう`;let i=this.describeActive(),a=lp(n.hour),o=null;for(let e of Object.values($f)){if(e.esatori||e.depthRange.min>t)continue;let r=pp(e,n);(!o||r>o.A)&&(o={sp:e,A:r})}for(let{id:n}of i){var s;let i=$f[n],a=(i.depthRange.preferredMin+i.depthRange.preferredMax)/2;if(i.bottom&&e.depthM<t-1.2)return`${i.nameJa}は底付近にいる。ウキ下を深くして、底ぎりぎり(約${(t-.4).toFixed(1)}m)を狙おう`;if(Math.abs(e.depthM-a)>1.6)return`${i.nameJa}が周りにいそう。泳層はだいたい${i.depthRange.preferredMin}〜${i.depthRange.preferredMax}m。ウキ下を${a.toFixed(1)}m前後にしてみよう`;if(((s=i.baits[r.dataId])==null?0:s)<.45){var c,l;let e=Object.entries(i.baits).filter(([e])=>_p.some(t=>t.dataId===e)).sort((e,t)=>t[1]-e[1])[0];if(e)return`${i.nameJa}には${(c=(l=ep[e[0]])==null?void 0:l.nameJa)==null?e[0]:c}がよく効く。エサを替えてみよう`}}return o&&o.A<.25?`今は${up[a]}で全体に活性が低め。朝夕のマヅメや夜に狙うと食いが立つよ`:this.sinceBite>75?`同じ場所は魚が散ったかも。投げる方向や距離を変えてみよう`:`ウキ下やエサを変えて、投げる場所をずらしてみよう`}forceBite(e,t){if(this.phase!==`wait`||!this.bait)return!1;let n=$f[e];if(!n)return!1;let r=t==null?n.size.typCm:t,i=this.sim.spawnForced(n,r,this.fx,this.fz,this.bait.depth);return this.startScript(i),!0}snapshot(){return{phase:this.phase,rig:{...this.rig},fx:this.fx,fz:this.fz,floatInWater:this.floatInWater,baitLife:this.baitLife,baitDepth:this.baitDepthNow,seabed:this.seabed,bites:this.stats.bites,nibbles:this.nibbles,stats:{...this.stats},castDist:this.castDist,casts:this.casts,script:!!this.script,sim:{n:this.sim.agents.length,near:this.sim.stats.near,far:this.sim.stats.far,byState:this.sim.stats.byState,spooks:this.sim.stats.spooks,bites:this.sim.stats.bites,nibbles:this.sim.stats.nibbles},fight:this.fight?{sp:this.fight.sp.id,dist:this.fight.dist,S:this.fight.S,T:this.fight.T,tension:this.fight.tension,mode:this.fight.mode,result:this.fight.result,D:this.fight.D,t:this.fight.t}:null,env:{hour:this.env.hour,tempC:this.env.tempC,current:this.env.current}}}},Fp={aji:{hb:.075,hd:.07,w:.055,pk:.62,ped:.12,back:6713434,side:11121570,belly:15001568,fin:12170638,tail:11775366,pat:`aji`,dorsals:[[.52,.7,.07,!0],[.1,.36,.06]],anal:[.1,.3,.05],tailLen:.15,tailSpread:.085,fork:.5,eye:.026,pect:.07},saba:{hb:.065,hd:.065,w:.06,pk:.5,ped:.07,hp:1.15,back:3563374,side:12175048,belly:15199210,fin:6979977,tail:5664890,pat:`saba`,dorsals:[[.52,.68,.06,!0],[.2,.34,.045]],anal:[.2,.34,.04],tailLen:.16,tailSpread:.09,fork:.55,eye:.026,pect:.06},kasago:{hb:.12,hd:.095,w:.095,pk:.7,ped:.2,rp:.9,back:7227964,side:9398872,belly:12756884,fin:8280136,finDark:4927529,tail:7819585,pat:`kasago`,dorsals:[[.3,.78,.075,!0]],anal:[.18,.3,.045],tailLen:.13,tailSpread:.075,fork:.1,eye:.034,pect:.13},mebaru:{hb:.1,hd:.08,w:.075,pk:.68,ped:.16,back:5065271,side:7103049,belly:10326136,fin:6050880,finDark:3946025,tail:5722169,pat:`mebaru`,dorsals:[[.3,.76,.06,!0]],anal:[.16,.28,.04],tailLen:.13,tailSpread:.07,fork:.1,eye:.04,eyeCol:1973270,pect:.1},chinu:{hb:.14,hd:.115,w:.07,pk:.58,ped:.15,back:6121068,side:9871008,belly:13225419,fin:4738900,tail:4409935,dorsals:[[.32,.76,.075,!0]],anal:[.14,.3,.055],tailLen:.14,tailSpread:.09,fork:.42,eye:.027,pect:.1},seabass:{hb:.075,hd:.07,w:.055,pk:.6,ped:.12,hp:1.15,back:6713978,side:11844797,belly:15527658,fin:8095114,tail:5858410,dorsals:[[.5,.7,.06,!0],[.14,.34,.05]],anal:[.14,.28,.04],tailLen:.14,tailSpread:.075,fork:.3,eye:.022,pect:.07},tachiuo:{hb:.022,hd:.02,w:.0075,pk:.86,ped:.04,hp:1.4,rp:.8,back:11188416,side:13489624,belly:14936040,fin:13292244,tail:11779779,pat:`tachi`,dorsals:[[.06,.82,.016]],tailLen:.025,tailSpread:.006,fork:0,eye:.0105,pect:.02},madai:{hb:.145,hd:.115,w:.07,pk:.62,ped:.14,hp:1.05,back:13204591,side:14394003,belly:15718608,fin:13400684,tail:12872029,pat:`madai`,dorsals:[[.3,.76,.07,!0]],anal:[.14,.3,.05],tailLen:.15,tailSpread:.095,fork:.42,eye:.026,pect:.09},buri:{hb:.082,hd:.082,w:.075,pk:.55,ped:.07,hp:1.1,back:4481391,side:11187638,belly:15132124,fin:10131040,tail:8357480,pat:`buri`,dorsals:[[.52,.66,.045],[.2,.36,.04]],anal:[.2,.34,.04],tailLen:.16,tailSpread:.095,fork:.5,eye:.022,pect:.07}},Ip={hb:.08,hd:.07,w:.055,pk:.6,ped:.12,back:6713978,side:10792366,belly:15001573,fin:8095114,tail:6713978,dorsals:[[.3,.7,.06]],tailLen:.14,tailSpread:.08,fork:.4,eye:.025,pect:.07},Lp=(e,t,n)=>{let r=Math.min(1,Math.max(0,(e-t)/(n-t)));return r*r*(3-2*r)},Rp=(e,t)=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)};function zp(e,t){var n,r;let i=(n=e.hp)==null?.95:n,a=(r=e.rp)==null?1:r;if(t>=e.pk){let n=(t-e.pk)/(1-e.pk);return Math.max(0,1-n*n)**(.5*i)}return e.ped+(1-e.ped)*Math.sin(Math.PI/2*(t/e.pk))**+a}function Bp(e,t){let n=[],r=[],i=[],a=new J(e.back),o=new J(e.side),s=new J(e.belly),c=new J,l=new J,u=new J;for(let i=0;i<=56;i++){let d=i/56,f=zp(e,d);for(let i=0;i<=22;i++){let p=i/22*Math.PI*2,m=Math.cos(p),h=Math.sin(p),g=m>=0?e.hb:e.hd;n.push(d-.5,m*g*f,h*e.w*f);let _=m;c.copy(a).lerp(o,Lp(_,.62,.12)).lerp(s,Lp(_,-.05,-.55));let v=Math.abs(h);switch(t){case`aji`:{let e=Math.exp(-(((_-.1)/.09)**2))*Lp(d,.1,.35)*.45;c.lerp(u.set(12891242),e);break}case`saba`:{let e=Lp(Math.sin(d*62+_*7+Math.sin(d*17)*2),.15,.7)*Lp(_,.2,.55)*Lp(d,.12,.3)*.65;c.lerp(l.set(1783104),e);break}case`kasago`:{let e=Math.sin(d*23+_*7+p)+Math.sin(d*41-_*13+1.7)+Math.sin(d*9+p*2);c.lerp(l.set(4007968),Lp(e,.4,2.2)*.45).lerp(u.set(11570040),Lp(-e,.6,2.2)*.3);break}case`mebaru`:{let e=Math.sin(d*19+_*9)+Math.sin(d*37-p*3+.4);c.lerp(l.set(3091232),Lp(e,.5,1.8)*.4);break}case`madai`:{let e=Rp(Math.floor(d*46),Math.floor(i/22*22));c.lerp(u.set(7315405),(e>.9&&_>-.05&&d>.2&&d<.78?.45:0)*Lp(_,-.05,.3));break}case`buri`:{let e=Math.exp(-(((_-.03)/.07)**2))*Lp(d,.08,.3)*Lp(.78,d,.6)*.75;c.lerp(u.set(12822852),e);break}case`tachi`:c.lerp(u.set(15068142),.25*Lp(_,.2,-.2))}c.lerp(l.set(0),.1*Math.exp(-(((d-.76)/.012)**2))*(1-v*.3)),r.push(c.r,c.g,c.b)}}for(let e=0;e<56;e++)for(let t=0;t<22;t++){let n=e*23+t,r=n+22+1;i.push(n,r,n+1,r,r+1,n+1)}let d=new _r;return d.setAttribute(`position`,new Y(n,3)),d.setAttribute(`color`,new Y(r,3)),d.setIndex(i),d.computeVertexNormals(),d}function Vp(e,t,n=.92){let r=new Co({color:t,side:2,transparent:n<1,opacity:n});return new X(new co(e,6),r)}function Hp(e,t,n){let[r,i,a,o]=t,s=new xa,c=t=>n*(n>0?e.hb:e.hd)*zp(e,t)*.97;s.moveTo(r-.5,c(r));let l=[];for(let e=0;e<=14;e++){let t=e/14,s=r+(i-r)*t,u=o?(1-.55*t)*Math.sin(Math.min(1,t*5+.2)*Math.PI/2):.55+.45*Math.sin(Math.PI*Math.min(1,t*1.4)),d=o&&e%2==1?.78:1;l.push([s-.5,c(s)+n*a*u*d])}for(let[e,t]of l)s.lineTo(e,t);return s.lineTo(i-.5,c(i)),s.lineTo(r-.5,c(r)),s}function Up(e){let t=new xa,n=-.49,r=e.ped*e.hb*.9,i=e.tailLen,a=e.tailSpread,o=i*(1-e.fork);return t.moveTo(n,r),t.quadraticCurveTo(n-i*.5,a*.9,n-i,a),t.quadraticCurveTo(n-o-i*.05,a*.25,n-o,0),t.quadraticCurveTo(n-o-i*.05,-a*.25,n-i,-a),t.quadraticCurveTo(n-i*.5,-a*.9,n,-r),t.lineTo(n,r),t}function Wp(e){let t=new xa;return t.moveTo(0,.004),t.quadraticCurveTo(-e*.4,e*.34,-e,0),t.quadraticCurveTo(-e*.4,-e*.3,0,-.004),t}function Gp(e,t){var n,r;let i=(n=Fp[e])==null?Ip:n,a=new hn;a.name=`fish:`+e;let o=new hn;a.add(o);let s=new X(Bp(i,i.pat),new So({vertexColors:!0,shininess:26,specular:2501164}));o.add(s);let c=i.fin;for(let e of i.dorsals)o.add(Vp(Hp(i,e,1),c,.9));if(i.anal&&o.add(Vp(Hp(i,i.anal,-1),c,.9)),i.tailLen>.03)o.add(Vp(Up(i),i.tail,.95));else{let e=new xa;e.moveTo(-.5,.002),e.lineTo(-.5-i.tailLen*3,0),e.lineTo(-.5,-.002),o.add(Vp(e,i.tail))}let l=zp(i,.74);for(let e of[-1,1]){let t=Vp(Wp(i.pect),c,.9);t.position.set(.24,-i.hd*.28*l,e*i.w*l*.92),t.rotation.set(0,e*.5,e*0),o.add(t)}let u=zp(i,.87),d=new So({color:13619392,shininess:40}),f=new So({color:(r=i.eyeCol)==null?1316111:r,shininess:70});for(let e of[-1,1]){let t=new X(new uo(i.eye,12,8),d);t.scale.set(1,1,.28),t.position.set(.37,i.hb*.22*u,e*i.w*u*.86),o.add(t);let n=new X(new uo(i.eye*.68,10,8),f);n.scale.set(1,1,.28),n.position.set(.37,i.hb*.22*u,e*(i.w*u*.9+i.eye*.05)),o.add(n)}return o.scale.setScalar(t),a.traverse(e=>{e.frustumCulled=!1}),a}function Kp(e){e.traverse(e=>{var t,n,r;let i=e;(t=i.geometry)==null||(n=t.dispose)==null||n.call(t);let a=i.material;Array.isArray(a)?a.forEach(e=>e.dispose()):a==null||(r=a.dispose)==null||r.call(a)})}new G;var qp=()=>new Ti({color:15922938,transparent:!0,opacity:.85}),Jp=class{constructor(e,t,n){this.scene=e,this.camera=t,this.rodObj=n,this.group=new hn,this.floatG=new hn,this.rings=[],this.fightG=new hn,this.fightFish=null,this.fightId=``,this.quickRipT=0,this.catchG=new hn,this.catchFish=null,this.catchT=0,this.pnts2=new Float32Array(6),this.idleRipT=0,this.shadowCount=0,this.rodBend=0,this.rodTw=0,this.tip=new G,this.floatPos=new G,this.floatScreenScale=1,this.group.name=`fishingView`,this.group.visible=!1;let r=new X(new Hi(.006,.006,.34,6).translate(0,.17,0),new Yr({color:16119280}));this.floatTip=new X(new Hi(.012,.009,.12,8).translate(0,.4,0),new Yr({color:16730650})),this.floatBody=new X(new uo(.03,10,8).scale(1,1.5,1).translate(0,0,0),new Co({color:15919560}));let i=new X(new Hi(.012,.012,.05,8).translate(0,.49,0),new Yr({color:16769354}));this.floatG.add(r,this.floatTip,i,this.floatBody),this.floatG.traverse(e=>{e.frustumCulled=!1}),this.group.add(this.floatG);let a=e=>{let t=new _r;t.setAttribute(`position`,new rr(new Float32Array(e*3),3));let n=new Ni(t,qp());return n.frustumCulled=!1,n};this.lineAir=a(28),this.lineWater=a(2),this.lineWater.material=new Ti({color:15266038,transparent:!0,opacity:.55}),this.pnts=new Float32Array(84),this.sinker=new X(new uo(.035,8,6),new Co({color:5593696})),this.baitMesh=new X(new uo(.04,8,6),new Yr({color:16751226})),this.sinker.frustumCulled=!1,this.baitMesh.frustumCulled=!1,this.group.add(this.lineAir,this.lineWater,this.sinker,this.baitMesh),this.aimLine=a(32),this.aimLine.material.color.set(16747069),this.aimLine.material.opacity=.95,this.aimRing=new X(new so(.7,1,28).rotateX(-Math.PI/2),new Yr({color:16747069,transparent:!0,opacity:.8,depthWrite:!1,fog:!1})),this.aimRing.renderOrder=4,this.aimRing.frustumCulled=!1,this.group.add(this.aimLine,this.aimRing);let o=new so(.85,1,32).rotateX(-Math.PI/2);for(let e=0;e<8;e++){let e=new X(o,new Yr({color:15398655,transparent:!0,opacity:0,depthWrite:!1,fog:!1}));e.renderOrder=4,e.visible=!1,e.frustumCulled=!1,this.group.add(e),this.rings.push({m:e,age:9,size:1,on:!1})}let s=new Vi(1,14).rotateX(-Math.PI/2);this.shadows=new vi(s,new Yr({color:135196,transparent:!0,opacity:.35,depthWrite:!1,fog:!1}),28),this.shadows.count=0,this.shadows.renderOrder=3,this.shadows.frustumCulled=!1,this.group.add(this.shadows),this.fightShadow=new X(s,new Yr({color:135196,transparent:!0,opacity:.45,depthWrite:!1,fog:!1})),this.fightShadow.renderOrder=3,this.fightShadow.frustumCulled=!1,this.fightShadow.visible=!1,this.group.add(this.fightG,this.fightShadow),this.catchG.visible=!1,this.camera.add(this.catchG),e.add(this.group)}get floatShown(){return this.group.visible&&this.floatG.visible}get fightFishShown(){return!!this.fightFish&&this.fightFish.visible}show(e){this.group.visible=e,e||this.hideCatch()}ripple(e,t,n=1){var r;let i=(r=this.rings.find(e=>!e.on))==null?this.rings[0]:r;i.on=!0,i.age=0,i.size=n,i.m.visible=!0,i.m.position.set(e,qu,t)}twitchRod(e){this.rodTw=Math.max(this.rodTw,e)}onEvent(e,t){if(t.kind===`splash`)this.ripple(t.x,t.z,1.6),this.ripple(t.x,t.z,2.6);else if(t.kind===`nibble`)this.ripple(e.fx,e.fz,.6),this.twitchRod(.03);else if(t.kind===`pre`)this.ripple(e.fx,e.fz,.5),this.twitchRod(.05);else if(t.kind===`bite`)this.ripple(e.fx,e.fz,1.2),this.twitchRod(.12+.1*t.strength);else if(t.kind===`fight_event`){let n=t.ev.kind;(n===`run`||n===`dive`||n===`side_run`||n===`headshake`||n===`last_run`)&&(this.ripple(e.fx,e.fz,1.8),this.twitchRod(.1))}else t.kind===`hookset`&&(this.ripple(e.fx,e.fz,1.4),this.twitchRod(.15))}showCatch(e,t){this.hideCatch();let n=Gp(e,Math.min(.5,Math.max(.17,t/100*.75)));this.catchFish=n,this.catchG.add(n),this.catchG.position.set(0,-.1,-.95),this.catchG.visible=!0,this.catchT=0}hideCatch(){this.catchFish&&(this.catchG.remove(this.catchFish),Kp(this.catchFish),this.catchFish=null),this.catchG.visible=!1}get catchShown(){return!!this.catchFish}update(e,t,n,r,i){if(this.group.visible=i,!i){this.rodBend=0;return}this.camera.updateMatrixWorld(!0),this.rodObj.updateWorldMatrix(!0,!1),this.tip.set(0,1.58,0),this.rodObj.localToWorld(this.tip),this.rodTw*=Math.exp(-n*7);let a=e.fight,o=a?Math.min(1.2,a.tension):0;this.rodBend+=((a?.1+.28*o:0)+this.rodTw*Math.sin(t*60)-this.rodBend)*Math.min(1,n*12),this.rodObj.rotation.x+=this.rodBend;let s=e.phase,c=s===`flight`||s===`wait`||s===`bite`||s===`fight`;if(this.floatG.visible=c,this.lineAir.visible=c,this.lineWater.visible=c&&s!==`flight`&&s!==`fight`,this.sinker.visible=this.baitMesh.visible=c&&s!==`flight`&&s!==`fight`,this.aimLine.visible=this.aimRing.visible=s===`aim`,s===`aim`){let n=e.landing(e.yaw,e.aimPower);if(n){let e=this.aimLine.geometry.attributes.position,r=e.count,i=2.2+n.dist*.12;for(let t=0;t<r;t++){let a=t/(r-1);e.setXYZ(t,this.tip.x+(n.x-this.tip.x)*a,this.tip.y+(qu+.1-this.tip.y)*a+i*4*a*(1-a),this.tip.z+(n.z-this.tip.z)*a)}e.needsUpdate=!0,this.aimLine.visible=!0,this.aimRing.visible=!0,this.aimRing.position.set(n.x,qu+Np(n.x,n.z,t)+.05,n.z);let a=.5+n.dist*.04;this.aimRing.scale.set(a,1,a)}else this.aimLine.visible=!1,this.aimRing.visible=!1}for(let e of this.rings){if(!e.on)continue;e.age+=n;let r=e.age/1.2;if(r>=1){e.on=!1,e.m.visible=!1;continue}let i=.05+.6*e.size*r;e.m.scale.set(i,1,i),e.m.material.opacity=(1-r)*.75,e.m.position.y=qu+Np(e.m.position.x,e.m.position.z,t)+.04}if(c&&s!==`flight`&&e.floatInWater&&!e.quick&&(this.idleRipT-=n,this.idleRipT<=0&&(this.idleRipT=3.2,this.ripple(e.fx,e.fz,.45))),c){let r=(1+Math.hypot(e.fx-e.px,e.fz-e.pz)*.11)*(e.floatDef.id===`fL`?1.25:e.floatDef.id===`fS`?.85:1);this.floatScreenScale=r;let i=Math.cos(e.yaw),a=-Math.sin(e.yaw),c=e.fx,u=e.fz,d,f=0;if(s===`flight`)d=qu+e.flightHeight();else if(s===`fight`)d=qu+Np(c,u,t)+.02;else{let o=Math.min(1,e.settle/1.6),s=Np(c,u,t)*1+Math.sin(t*2.3+c)*.012;if(c+=i*e.floatSlide*.9*r*.5,u+=a*e.floatSlide*.9*r*.5,d=qu+s-e.floatDip*.42*r+(1-o)*.1*r+.02,(e.floatTilt>.5||e.snag)&&(f=1.15),e.quick){let t=Math.min(1,e.quick.t/e.quick.dur);d+=Math.max(0,(t-.7)/.3)*.3*r,f=.5*Math.min(1,t*4),this.quickRipT-=n,this.quickRipT<=0&&(this.quickRipT=.11,this.ripple(e.fx,e.fz,.7))}}this.floatG.position.set(c,d,u),this.floatG.scale.setScalar(r),this.floatG.rotation.set(0,0,f),this.floatPos.copy(this.floatG.position);let p=this.lineAir.geometry.attributes.position,m=p.count,h=Math.hypot(c-this.tip.x,u-this.tip.z),g=s===`flight`?.12:s===`fight`?Math.max(0,.05-.05*o):Math.max(.015,.09*(1-Math.min(1,e.settle/2.5)))+(e.reelHeld?0:.015),_=d+.35*r;for(let e=0;e<m;e++){let n=e/(m-1),r=g*h*4*n*(1-n),i=this.tip.y+(_-this.tip.y)*n-r;n>.04&&(i=Math.max(i,qu+Np(this.tip.x+(c-this.tip.x)*n,this.tip.z+(u-this.tip.z)*n,t)+.015)),p.setXYZ(e,this.tip.x+(c-this.tip.x)*n,i,this.tip.z+(u-this.tip.z)*n)}if(p.needsUpdate=!0,this.lineWater.visible){var l;let t=e.baitDepthNow,n=qu-t,r=this.lineWater.geometry.attributes.position;r.setXYZ(0,c,d-.02,u),r.setXYZ(1,c+0,n,u),r.needsUpdate=!0,this.baitMesh.position.set(c,n,u),this.sinker.position.set(c,n+Math.min(.5,t*.3),u);let i=_p.find(t=>t.id===e.rig.baitId);this.baitMesh.material.color.set((l=i==null?void 0:i.color)==null?16751226:l),this.baitMesh.visible=e.baitLife>.05,this.baitMesh.scale.setScalar(.6+.5*e.baitLife)}}let u=0;if(s===`wait`||s===`bite`){let t=new q,n=new vt,i=new G,a=new G,o=new G(0,1,0),s=Math.max(.15,r)*e.env.clarity;this.shadows.material.opacity=.35*Math.min(1,s*1.3);for(let r of e.sim.agents){if(u>=28)break;let s=r.x-e.fx,c=r.z-e.fz;if(s*s+c*c>100||r.y>3.2||r.sp.id===`esatori`&&r.y>2)continue;let l=Math.max(.12,r.sizeCm/100);n.setFromAxisAngle(o,-r.heading),i.set(l*.5,1,l*.17),a.set(r.x,qu+.03,r.z),t.compose(a,n,i),this.shadows.setMatrixAt(u++,t)}}this.shadows.count=u,this.shadows.instanceMatrix.needsUpdate=!0,this.shadowCount=u;let d=s===`fight`?e.fishWorld():null;if(d&&a){let r=a.sp.id;this.fightFish&&this.fightId!==r+Math.round(a.sizeCm)&&(this.fightG.remove(this.fightFish),Kp(this.fightFish),this.fightFish=null),this.fightFish||(this.fightFish=Gp(r,Math.max(.12,a.sizeCm/100)),this.fightId=r+Math.round(a.sizeCm),this.fightG.add(this.fightFish));let i=Math.max(0,1-a.dist/4),s=a.mode===`run`||a.mode===`side_run`||i>.5||a.mode===`headshake`,c=qu+(s?.03:-.45-.5*(1-i))+Np(d.x,d.z,t);this.fightG.position.set(d.x,c,d.z),this.fightG.visible=i>.25||s;let l=e.px-d.x,u=e.pz-d.z;this.fightG.rotation.y=-Math.atan2(u,l)+Math.sin(t*14)*(.35*o),this.fightShadow.visible=!0;let f=Math.max(.2,a.sizeCm/100);this.fightShadow.position.set(d.x,qu+.035,d.z),this.fightShadow.scale.set(f*.6,1,f*.22),s&&Math.random()<n*3&&this.ripple(d.x,d.z,1.1)}else this.fightG.visible=!1,this.fightShadow.visible=!1,this.fightFish&&s!==`fight`&&s!==`result`&&(this.fightG.remove(this.fightFish),Kp(this.fightFish),this.fightFish=null);this.catchFish&&(this.catchT+=n,this.catchFish.rotation.y=.55+Math.sin(this.catchT*.6)*.35,this.catchFish.rotation.z=.05+Math.sin(this.catchT*4)*.05*Math.max(0,1-this.catchT/1.2))}},Yp=e=>document.getElementById(e),Xp=(e,t,n,r,i)=>{r[t]!==n&&(r[t]=n,i())},Zp=class{constructor(){this.e={action:Yp(`btnAction`),reel:Yp(`btnReel`),retrieve:Yp(`btnRetrieve`),aim:Yp(`btnAim`),auto:Yp(`btnAuto`),cue:Yp(`cue`),flash:Yp(`flash`),gear:Yp(`btnGear`),exit:Yp(`btnExit`),dragPlus:Yp(`dragPlus`),dragMinus:Yp(`dragMinus`),dragVal:Yp(`dragVal`),rod:Yp(`rodInd`),ten:Yp(`tenGauge`),power:Yp(`powerGauge`),info:Yp(`fightInfo`),card:Yp(`infoCard`),result:Yp(`resultCard`)},this.cache={},this.readyHtml=``,this.autoOn=!1,this.assistOn=!0,this.quickCast=!1}invalidate(){this.cache.phase=``}cue(e,t){let n=this.e.cue;if(n.className=``,n.offsetWidth,n.textContent=t,n.className=`show ${e}`,e===`bite`||e===`hit`){let e=this.e.flash;e.className=``,e.offsetWidth,e.className=`show`}}show(e,t){e.classList.toggle(`show`,t)}setPhase(e,t){let n=this.e;document.body.dataset.phase=e;let r=e===`wait`||e===`bite`,i=!this.assistOn&&!this.autoOn;this.show(n.action,e!==`result`),this.show(n.reel,!this.autoOn&&(r||e===`fight`)),this.show(n.retrieve,r),this.show(n.aim,e===`ready`&&this.quickCast&&!this.autoOn),this.show(n.auto,e!==`result`&&!(e===`fight`&&i)),n.auto.classList.toggle(`on`,this.autoOn),n.auto.querySelector(`.lb`).textContent=this.autoOn?`おまかせ中`:`おまかせ`,n.auto.setAttribute(`aria-pressed`,this.autoOn?`true`:`false`);for(let t of[n.dragPlus,n.dragMinus,n.dragVal,n.rod])this.show(t,e===`fight`&&i);for(let t of[n.ten,n.info])this.show(t,e===`fight`);this.show(n.power,e===`aim`),n.card.style.display=e===`fight`||e===`aim`||e===`result`?`none`:``,this.show(n.exit,e!==`result`),n.gear.classList.toggle(`off`,!(e===`ready`||r));let a=n.action,o=a.querySelector(`.lb`),s=a.querySelector(`.ic`);a.classList.remove(`go`,`alert`,`hold`,`off`);let c=(e,t)=>{s.textContent=e,o.textContent=t};if(this.autoOn){var l;a.classList.add(`off`),c(`🤖`,(l={ready:`投げ待ち`,aim:`投げ待ち`,flight:`飛行中`,wait:`アタリ待ち`,bite:`合わせ中`,fight:`ファイト中`}[e])==null?``:l)}else switch(e){case`ready`:c(`🎯`,`キャスト`),a.classList.add(`go`);break;case`aim`:c(`🎯`,`投げる！`),a.classList.add(`go`);break;case`flight`:c(`…`,`飛行中`),a.classList.add(`off`);break;case`wait`:c(`⚡`,`合わせ`),a.classList.add(`go`);break;case`bite`:c(`⚡`,`合わせ！`),a.classList.add(`alert`);break;case`fight`:c(`⬆`,`竿を立てる`)}document.body.dataset.auto=this.autoOn?`1`:`0`,this.cache={...this.cache,phase:e}}setReelHold(e){this.e.reel.classList.toggle(`hold`,e)}setRaiseHold(e){this.e.action.classList.toggle(`hold`,e)}update(e,t,n){let r=this.e,i=this.cache;i.phase!==e.phase&&this.setPhase(e.phase,e);let a=e.rig;if(r.retrieve.classList.toggle(`off`,!!e.quick),e.phase===`aim`){let t=e.landing(e.yaw,e.aimPower),n=t?`パワー ${Math.round(e.aimPower*100)}%（約${t.dist.toFixed(0)}m）`:`投げられない方向です`;Xp(r.power,`pw`,n,i,()=>{r.power.querySelector(`span`).textContent=n}),r.power.querySelector(`i`).style.width=`${Math.round(e.aimPower*100)}%`}if(e.phase===`wait`||e.phase===`bite`||e.phase===`flight`){let t=Math.round(n.baitPct),o=`ウキ下 <b>${a.depthM.toFixed(1)}m</b> ／ 水深 約${e.phase===`flight`?`?`:e.seabed.toFixed(1)}m ／ エサ <b>${t}%</b><br><small>${e.snag?`根掛かり！ 巻いて外そう`:e.phase===`bite`?`ウキが動いた！ 合わせ！`:e.phase===`wait`?`ウキを見よう。沈んだら「合わせ」`:`飛んでいます…`}</small>`;Xp(r.card,`info`,o,i,()=>{r.card.innerHTML=o})}else e.phase===`ready`&&Xp(r.card,`info`,`ready`+this.readyHtml,i,()=>{r.card.innerHTML=this.readyHtml});if(t){let e=Math.max(0,t.tension);r.ten.querySelector(`i`).style.width=`${Math.min(100,Math.round(e*100))}%`;let n=e>.92?`danger blink`:e>.75?`danger`:e>.55?`warn`:``;Xp(r.ten,`tl`,n,i,()=>{r.ten.className=`gauge ph show ${n}`});let a=`テンション ${Math.round(e*100)}%${t.slipping?`（ドラグ滑り中）`:``}`;Xp(r.ten,`tt`,a,i,()=>{r.ten.querySelector(`span`).textContent=a});let o=t.bearing,s=o>.12?`右`:o<-.12?`左`:`正面`,c=o>.12?`左`:`右`,l=``;switch(t.mode){case`run`:l=t.assist?`走ってる！ 少し待とう`:`走ってる！ 巻かずにドラグに任せて耐える`;break;case`side_run`:l=t.assist?`魚が${s}へ走ってる`:`魚が${s}へ横走り → 竿を${c}へ（横にドラッグ）`;break;case`dive`:l=t.assist?`底へ突っ込む！ 耐えよう`:`底へ突っ込む！ 竿を立ててためる`;break;case`wedged`:l=t.assist?`根に入られた！ 少し待とう`:`根に入られた！ 竿を立ててゆっくり耐える`;break;case`headshake`:l=t.assist?`首振り！ 巻くのを止めて`:`首振り！ 竿を立てて衝撃を逃がす`;break;case`rest`:l=t.auto?`チャンス！ 巻いてます`:`チャンス！ 今のうちに巻こう`;break;default:l=t.auto?`自動で巻いて寄せてます`:`巻いて寄せよう（赤くなる前に離す）`}let u=`${`${t.known?`${t.name} 約${Math.round(t.sizeCm)}cm`:`何かが掛かった！`} ｜ 距離 ${t.dist.toFixed(1)}m`}<br><span style="color:#ffd37a">${l}</span>`;Xp(r.info,`fi`,u,i,()=>{r.info.innerHTML=u});let d=wp(Sp),f=t.drag<d[0]-.02?`lo`:t.drag>d[1]+.02?`hi`:`ok`,p=t.drag.toFixed(2);Xp(r.dragVal,`dv`,f+p,i,()=>{r.dragVal.className=`fs ph show ${f}`,r.dragVal.querySelector(`b`).textContent=p});let m=Math.round(t.theta);Xp(r.rod,`th`,String(m)+t.raised,i,()=>{Yp(`rodTxt`).textContent=`竿${m}°`,r.rod.querySelector(`.bar i`).style.bottom=`${Math.round((m-5)/85*90)}%`})}n.castDist}hideResult(){this.e.result.classList.remove(`open`),this.e.result.innerHTML=``}showResult(e){this.e.result.innerHTML=e,this.e.result.classList.add(`open`)}renderRig(e,t){let n=t.rig(),r=t.phase()===`wait`||t.phase()===`bite`,i=r?`disabled`:``,a=(e,t,n,r=!1)=>`<div class="row seg${r?` col`:``}" data-seg="${e}">${t.map(([e,t,r])=>`<button data-v="${e}" class="${e===n?`on`:``}" ${i}>${t}${r?`<small>${r}</small>`:``}</button>`).join(``)}</div>`,o=t.seabed(),s=Qf.filter(e=>!e.esatori).map(e=>`${e.nameJa} ${e.bottom?`底付近`:`${e.depthRange.preferredMin}〜${e.depthRange.preferredMax}m`}`).join(` ／ `);e.innerHTML=`<h2>仕掛け</h2>
      ${r?`<div class="sec" style="background:rgba(255,138,61,.2)">投入中は「ウキ下」だけ変えられます。他を変えるときは巻き上げてから。</div>`:``}
      <div class="sec"><h3>ウキ下（ウキから針までの深さ）</h3>
        <div class="depthrow"><button id="dMinus" aria-label="浅く">−</button><b id="dVal">${n.depthM.toFixed(1)}m</b><button id="dPlus" aria-label="深く">＋</button></div>
        <canvas id="dCv" width="320" height="150" style="max-width:340px"></canvas>
        <div style="font-size:12px;opacity:.85" id="dNote"></div>
        <div style="font-size:12px;opacity:.85;margin-top:4px">魚の泳ぐ深さの目安: ${s}</div></div>
      <div class="sec"><h3>おすすめセット</h3>${a(`preset`,vp.map(e=>[e.id,e.nameJa,e.desc]),``,!0)}</div>
      <div class="sec"><h3>ウキ</h3>${a(`float`,mp.map(e=>[e.id,e.nameJa,e.note]),n.floatId,!0)}</div>
      <div class="sec"><h3>ハリ</h3>${a(`hook`,hp.map(e=>[e.id,e.nameJa]),n.hookId)}<div style="font-size:12px;opacity:.85">小さい魚（アジ・メバル）には小バリ、カサゴ・チヌには中バリ。大きすぎると小魚が掛かりにくい。</div></div>
      <div class="sec"><h3>エサ</h3>${a(`bait`,_p.map(e=>[e.id,e.nameJa,e.note]),n.baitId,!0)}</div>`;let c=()=>{let e=t.rig();document.getElementById(`dVal`).textContent=e.depthM.toFixed(1)+`m`;let n=document.getElementById(`dCv`);if(!n)return;let r=n.getContext(`2d`),i=n.width,a=n.height;r.clearRect(0,0,i,a);let s=Math.max(6,Math.ceil(Math.max(o,e.depthM)+.5)),c=e=>24+e/s*(a-34),l=r.createLinearGradient(0,24,0,a);l.addColorStop(0,`#2b7ba6`),l.addColorStop(1,`#0c2d4a`),r.fillStyle=l,r.fillRect(0,24,i,a-24),r.fillStyle=`#c9b88a`,r.fillRect(0,c(o),i,a-c(o)),r.fillStyle=`#8b7a52`,r.fillRect(0,c(o),i,3),r.fillStyle=`#cfe9f7`,r.fillRect(0,22,i,3),r.fillStyle=`rgba(255,255,255,.7)`,r.font=`11px sans-serif`;for(let e=0;e<=s;e+=1)r.fillRect(0,c(e),6,1),e%2==0&&e>0&&r.fillText(`${e}m`,9,c(e)+4);let u=i*.58;r.fillStyle=`#ff4a1a`,r.fillRect(u-4,8,8,16),r.fillStyle=`#fff`,r.fillRect(u-1,4,2,6);let d=Math.min(c(e.depthM),c(o)-2);r.strokeStyle=`#eee`,r.lineWidth=1.5,r.beginPath(),r.moveTo(u,24),r.lineTo(u,d),r.stroke(),r.fillStyle=`#ff9a7a`,r.beginPath(),r.arc(u,d,5,0,7),r.fill(),r.fillStyle=`#fff`,r.fillText(e.depthM>=o-.12?`底に着いている（根掛かり注意）`:`ウキ下 ${e.depthM.toFixed(1)}m`,u+12,Math.max(36,d-4)),r.fillText(`水深 約${o.toFixed(1)}m${t.seabedKnown()?``:`（足元。投げた先で変わる）`}`,10,a-5),document.getElementById(`dNote`).textContent=e.depthM>=o-.12?`針が底に着く設定です。根魚（カサゴ）は釣れやすいが、岩場では根掛かりしやすい。`:e.depthM<1.5?`浅め：表層の魚（サバ・アジ）狙い。`:`底から少し浮かせると、アジ・メバルが食いやすい。`};c();let l=t=>e.querySelectorAll(`[data-seg="${t}"] button`),u=(n,r)=>l(n).forEach(n=>n.addEventListener(`click`,()=>{n.disabled||(r(n.dataset.v),this.renderRig(e,t))}));u(`preset`,e=>t.preset(e)),u(`float`,e=>t.setRig({floatId:e})),u(`hook`,e=>t.setRig({hookId:e})),u(`bait`,e=>t.setRig({baitId:e})),Yp(`dMinus`).addEventListener(`click`,()=>{t.depth(-xp),c()}),Yp(`dPlus`).addEventListener(`click`,()=>{t.depth(xp),c()})}renderZukan(e,t){let n=Qf.filter(e=>!e.esatori).map(e=>{let n=t.zukan[e.id];return n?`<tr><td><b>${e.nameJa}</b></td><td>${n.count}匹</td><td>最大 ${n.maxSizeCm}cm</td><td>${`★`.repeat(Math.max(1,Math.round(n.bestQuality*5)))}</td></tr>`:`<tr class="dim"><td>？？？</td><td colspan="3">未発見（${e.nameJa.slice(0,0)}釣ると登録）</td></tr>`}).join(``),r=Object.keys(t.zukan).length,i=Qf.filter(e=>!e.esatori).length,a=t.catchLog.slice(-12).reverse().map(e=>{var t;let n=new Date(e.at),r=$f[e.speciesId];return`<tr><td>${n.getMonth()+1}/${n.getDate()} ${String(n.getHours()).padStart(2,`0`)}:${String(n.getMinutes()).padStart(2,`0`)}</td><td>${(t=r==null?void 0:r.nameJa)==null?e.speciesId:t}</td><td>${e.sizeCm}cm</td><td>${e.fate===`release`?`リリース`:`キープ`}</td></tr>`}).join(``),o=t.stats;e.innerHTML=`<h2>図鑑・釣果</h2>
      <div class="sec"><h3>図鑑 ${r} / ${i}</h3><table>${n}</table></div>
      <div class="sec"><h3>最近の釣果（新しい順）</h3>${a?`<table>${a}</table>`:`<span class="dim">まだ釣れていません。港で「釣り開始」しよう。</span>`}</div>
      <div class="sec"><h3>記録</h3>キャスト ${o.casts} ／ アタリ ${o.bites} ／ 釣れた ${o.catches} ／ リリース ${o.releases}<br>ラインブレイク ${o.lineBreaks} ／ バラシ ${o.hookOuts}</div>
      <div class="sec" style="font-size:12px;opacity:.8">所持金・経済・レベルは Phase 3 以降で実装予定です（いまは釣果の記録のみ）。</div>`}},Qp=class{constructor(){this.enabled=!0,this.ctx=null,this.master=null,this.noiseBuf=null,this.lastReel=0,this.lastSlip=0,this.counts={}}get state(){return this.ctx?this.ctx.state:`none`}unlock(){try{if(!this.ctx){let e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.ctx=new e,this.master=this.ctx.createGain(),this.master.gain.value=.7,this.master.connect(this.ctx.destination);let t=this.ctx.sampleRate*1,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),r=n.getChannelData(0);for(let e=0;e<t;e++)r[e]=Math.random()*2-1;this.noiseBuf=n}if(this.ctx.state===`suspended`)try{let e=this.ctx.resume();e&&e.catch&&e.catch(()=>{})}catch{}}catch{}}count(e){var t;this.counts[e]=((t=this.counts[e])==null?0:t)+1}ok(){return!this.enabled||!this.ctx||this.ctx.state!==`running`||!this.master?null:this.ctx}tone(e,t,n,r,i,a=0){let o=this.ok();if(!o)return;let s=o.currentTime+a,c=o.createOscillator(),l=o.createGain();c.type=n,c.frequency.setValueAtTime(e,s),i&&c.frequency.exponentialRampToValueAtTime(i,s+t),l.gain.setValueAtTime(1e-4,s),l.gain.exponentialRampToValueAtTime(r,s+.008),l.gain.exponentialRampToValueAtTime(1e-4,s+t),c.connect(l),l.connect(this.master),c.start(s),c.stop(s+t+.02)}noise(e,t,n,r,i=1,a=0){let o=this.ok();if(!o||!this.noiseBuf)return;let s=o.currentTime+a,c=o.createBufferSource();c.buffer=this.noiseBuf;let l=o.createBiquadFilter();l.type=`bandpass`,l.Q.value=i,l.frequency.setValueAtTime(n,s),l.frequency.exponentialRampToValueAtTime(r,s+e);let u=o.createGain();u.gain.setValueAtTime(1e-4,s),u.gain.exponentialRampToValueAtTime(t,s+.01),u.gain.exponentialRampToValueAtTime(1e-4,s+e),c.connect(l),l.connect(u),u.connect(this.master),c.start(s),c.stop(s+e+.02)}whoosh(){this.count(`whoosh`),this.noise(.28,.25,600,2400,.8)}splash(e=1){this.count(`splash`),this.noise(.35,.35*e,1800,400,.7),this.tone(520,.12,`sine`,.18*e,180)}tick(){this.count(`tick`),this.tone(1100,.05,`triangle`,.14)}bite(){this.count(`bite`),this.tone(420,.14,`sine`,.5,220),this.tone(840,.1,`triangle`,.3,520,.09),this.noise(.12,.15,900,300,1,.02)}hookset(){this.count(`hookset`),this.noise(.1,.3,3e3,900,1),this.tone(300,.12,`square`,.12,600)}miss(){this.count(`miss`),this.tone(260,.2,`sine`,.2,130)}reel(e){if(!this.ok())return;let t=performance.now(),n=130-70*Math.min(1,e);t-this.lastReel<n||(this.lastReel=t,this.count(`reel`),this.tone(1700+Math.random()*200,.025,`square`,.05))}slip(){if(!this.ok())return;let e=performance.now();e-this.lastSlip<90||(this.lastSlip=e,this.count(`slip`),this.tone(1200+Math.random()*400,.07,`sawtooth`,.06,700))}warn(){this.count(`warn`),this.tone(980,.09,`square`,.12),this.tone(980,.09,`square`,.12,void 0,.13)}snap(){this.count(`snap`),this.noise(.12,.45,5e3,1500,.6),this.tone(1400,.2,`sine`,.2,300)}lost(){this.count(`lost`),this.tone(330,.3,`triangle`,.25,150)}landed(e=!1){this.count(`landed`),(e?[523,659,784,1046]:[523,659,784]).forEach((e,t)=>this.tone(e,.22,`triangle`,.25,void 0,t*.09)),this.noise(.25,.2,2200,500,.8)}ui(){this.count(`ui`),this.tone(700,.04,`sine`,.1)}},$p={pre:12,bite:[45,30,70],hookset:90,run:[25,20,25],warn:[30,40,30],snap:[220],landed:[40,50,40,50,120],lost:[140],cast:18,splash:22},em={pre:.25,bite:1,hookset:1,run:.6,warn:.5,snap:1.4,landed:.7,lost:.8,cast:.2,splash:.35},tm=class{constructor(){this.enabled=!0,this.canVibrate=typeof navigator<`u`&&typeof navigator.vibrate==`function`,this.shake=0,this.counts={}}fire(e){var t;if(this.counts[e]=((t=this.counts[e])==null?0:t)+1,this.enabled){if(this.canVibrate)try{navigator.vibrate($p[e])}catch{}this.shake=Math.max(this.shake,em[e]*(this.canVibrate?.5:1))}}decay(e){this.shake=Math.max(0,this.shake-e*3.2)}};function nm(e,t,n,r=1/30){let i=wp(e.tackle),a=e.mode,o=i[0]+(i[1]-i[0])*.6;e.tension<.45&&(a===`cruise`||a===`rest`)?o=i[1]*1.7:e.tension>.72&&(o=i[0]*.85);let s=.9*r,c=Math.abs(n-o)<=s?o:n+Math.sign(o-n)*s;return{reel:t&&a!==`run`&&a!==`dive`&&a!==`wedged`&&a!==`headshake`&&e.tension<.7?1:0,theta:55,steer:a===`side_run`?e.bearing>0?-1:1:0,drag:c}}var rm=e=>document.getElementById(e),im=class{constructor(e){this.h=e,this.engaged=!1,this.shown=0,this.hi=``,this.text=``,this.step=e.get(),rm(`tutSkip`).addEventListener(`click`,()=>this.finish(!1))}get active(){return this.step<4}restart(){this.engaged=!1,this.step=0,this.shown=0,this.h.set(0)}finish(e){this.step>=4||(this.step=4,this.h.set(4),this.render(``,``),this.h.toast(e?`OK！ メニューの「遊び方」でいつでも見直せます`:`スキップしました（メニューの「遊び方」で見直せます）`))}used(){this.step===3&&this.finish(!0)}update(e){if(!this.active){this.text&&this.render(``,``);return}if(e.auto){this.step=4,this.h.set(4),this.render(``,``);return}let t=``,n=``;if(this.step===0&&e.mode===`fish`&&(this.step=1),this.step===1&&e.mode===`fish`&&(e.phase===`flight`||e.phase===`wait`||e.phase===`bite`||e.phase===`fight`)&&(this.step=2),this.step===2&&(e.phase===`fight`||e.phase===`bite`)&&(this.engaged=!0),this.step===2&&(e.phase===`result`||this.engaged&&e.phase===`ready`)&&(this.step=3,this.shown=0,this.engaged=!1),this.step===3&&(e.phase===`ready`||e.phase===`wait`)&&(this.shown+=e.dt),this.step===3&&this.shown>9)this.finish(!0);else{if(this.step!==this.h.get()&&this.step<4&&this.h.set(this.step),e.mode===`move`)t=`水辺で「釣り開始」を押そう`,n=e.canFish?`btnFish`:``;else switch(this.step){case 0:case 1:e.phase===`aim`?(t=`もう一度押して投げる！`,n=`btnAction`):e.phase===`ready`&&(t=`「キャスト」を押そう`,n=`btnAction`);break;case 2:e.phase===`ready`?(t=`「キャスト」を押そう`,n=`btnAction`):e.phase===`aim`?(t=`もう一度押して投げる！`,n=`btnAction`):e.phase===`flight`?t=`ウキが着水するのを待とう…`:e.phase===`bite`?(t=`今だ！「合わせ」を押す！`,n=`btnAction`):e.phase===`wait`?e.waitSec>25?(t=`釣れない時は「回収」で投げ直し`,n=`btnRetrieve`):(t=`ウキが沈んだら「合わせ」！`,n=``):e.phase===`fight`&&(t=e.assist?`「巻く」を長押し！ 走る間は離す`:`「巻く」長押し。赤くなる前に離す`,n=`btnReel`);break;case 3:e.phase===`wait`?(t=`↩回収＝すぐ巻き戻し／🤖＝全自動`,n=`btnRetrieve`):(e.phase===`ready`||e.phase===`aim`)&&(t=`↩回収＝すぐ巻き戻し／🤖＝全自動`,n=`btnAuto`)}this.render(t,n)}}render(e,t){if(e===this.text||(this.text=e,rm(`tutTxt`).textContent=e,rm(`tutBar`).classList.toggle(`show`,!!e),document.body.dataset.tut=e?`1`:`0`),e&&(rm(`tutN`).textContent=`${Math.min(this.step,3)+1}/4`),t!==this.hi){var n,r;this.hi&&((n=document.getElementById(this.hi))==null||n.classList.remove(`tutHi`)),this.hi=t,t&&((r=document.getElementById(t))==null||r.classList.add(`tutHi`))}}},am=(e,t,n)=>Math.min(n,Math.max(t,e)),om=e=>document.getElementById(e),sm=class{constructor(e){this.d=e,this.ui=new Zp,this.sfx=new Qp,this.hap=new tm,this.active=!1,this.site=null,this.reelHeld=!1,this.raised=!1,this.qaPose={theta:null,steer:null},this.lastEntry=null,this.knownSeabed=3,this.seabedKnown=!1,this.log=[],this.biteEvents=0,this.envT=0,this.theta=50,this.lastPhase=`ready`,this.saveT=0,this.stage=om(`stage`),this.resultCatch=!1,this.auto=!1,this.assist=!0,this.qaManualDrag=!1,this.autoT=0,this.autoBiteT=0,this.autoMsgT=0,this.resultT=0,this.fightT=0,this.qaFreeze=!1,this.session=new Pp(Vf(e.g),{seed:e.seed,hour:e.hours()}),this.view=new Jp(e.scene,e.rig.camera,e.rig.rod),this.sfx.enabled=e.data.settings.sound,this.hap.enabled=e.data.settings.vibration,this.quickCastOn=!e.qa,this.bind(),this.tut=new im({get:()=>e.settings().tutStep,set:t=>e.patch({tutStep:t}),toast:t=>e.hud.toast(t,3e3)}),e.hud.renderers.rig=e=>this.ui.renderRig(e,{rig:()=>this.session.rig,phase:()=>this.session.phase,seabed:()=>this.knownSeabed,seabedKnown:()=>this.seabedKnown,setRig:e=>{this.session.setRig(e),this.persistRig()},preset:e=>{let t=vp.find(t=>t.id===e);t&&(this.session.setRig(t.rig),this.persistRig(),this.d.hud.toast(`${t.nameJa} にセット`,1500))},depth:e=>{this.session.adjustDepth(e),this.persistRig()}}),e.hud.renderers.zukan=t=>this.ui.renderZukan(t,e.data)}applySettings(e){this.sfx.enabled=e.sound,this.hap.enabled=e.vibration;let t=this.auto!==e.auto||this.assist!==e.assist,n=this.auto;this.auto=e.auto,this.assist=e.assist,this.ui.autoOn=e.auto,this.ui.assistOn=e.assist,this.ui.quickCast=this.quickCastOn&&e.castPower>0,document.body.dataset.hand=e.oneHand===`off`?``:e.oneHand,t&&(this.ui.invalidate(),this.autoT=0,this.autoBiteT=0,this.active&&e.auto&&!n&&this.session.phase===`aim`&&this.session.cancelAim(),e.auto&&this.setReel(!1))}once(e,t,n=3200){let r=this.d.settings().seenHints;r.includes(e)||this.tut.active||(this.d.patch({seenHints:[...r,e]}),this.d.hud.toast(t,n))}retrieve(){if(!this.active)return!1;let e=this.session.quickRetrieve();return e?(this.setReel(!1),this.tut.used()):this.session.phase===`fight`&&this.d.hud.toast(`ファイト中は回収できません`,1400),e}toggleAuto(e){let t=e==null?!this.auto:e;this.d.patch({auto:t,modeChosen:!0}),this.sfx.ui(),this.d.hud.toast(t?`🤖 おまかせ ON（投げる・合わせ・ファイトを自動）`:`おまかせ OFF（手動）`,2400),this.tut.used(),this.d.saveNow()}mainTap(){let e=this.session;this.auto?performance.now()-this.autoMsgT>4e3&&(this.autoMsgT=performance.now(),this.d.hud.toast(`おまかせ中です（🤖で手動に戻せます）`,1800)):e.phase===`ready`&&this.quickCastOn&&this.d.settings().castPower>0?(e.startAim(),this.sfx.ui(),e.cast(this.d.settings().castPower,this.d.player.yaw),e.phase===`aim`&&this.d.hud.toast(`その向きには投げられません（向きを変えよう）`,1600)):this.act()}persistRig(){this.d.data.lastRig={...this.session.rig}}enter(e){this.site=e,this.active=!0;let t=this.d.player,n=this.session;n.begin(t.x,t.z,e.yaw),this.d.data.lastRig&&n.setRig(this.d.data.lastRig),this.knownSeabed=Math.max(1,e.depth),this.seabedKnown=!1,this.d.input.flickOn=!0,this.d.input.fightMode=!1,this.lastPhase=`ready`,this.envT=0,this.saveT=0,this.ui.setPhase(`ready`,n),this.ui.hideResult(),this.ui.readyHtml=om(`infoCard`).innerHTML,this.ui.quickCast=this.quickCastOn&&this.d.settings().castPower>0,this.ui.invalidate(),this.auto?this.d.hud.toast(`🤖 おまかせで釣ります`,2e3):this.tut.active||this.once(`enter`,this.ui.quickCast?`「キャスト」1タップで前回と同じ強さで投げます（🎯狙うで調整）`:`「キャスト」→もう一度押して投げる`,3600)}requestExit(){let e=this.session;return e.phase===`flight`||e.phase===`fight`?(this.d.hud.toast(e.phase===`fight`?`ファイト中は離れられません`:`仕掛けが飛んでいます`,1600),!1):!0}leave(){this.active&&(this.session.phase===`result`&&this.closeResult(!1),this.session.end(),this.active=!1,this.reelHeld=!1,this.raised=!1,this.d.input.flickOn=!1,this.d.input.fightMode=!1,this.view.hideCatch(),this.ui.hideResult(),this.setShake(0),document.body.dataset.phase=``)}bind(){let e=this.ui.e,t=this.d.input,n=(e,t)=>e.addEventListener(`pointerdown`,e=>{e.preventDefault(),this.sfx.unlock(),t(e)});n(e.action,e=>{if(this.session.phase===`fight`){if(!this.auto){var t,n;this.setRaise(!0),(t=(n=e.target).setPointerCapture)==null||t.call(n,e.pointerId)}}else this.mainTap()}),n(e.retrieve,()=>{this.retrieve()}),n(e.aim,()=>{this.active&&this.session.phase===`ready`&&!this.auto&&(this.session.startAim(),this.sfx.ui())}),n(e.auto,()=>this.toggleAuto());for(let t of[`pointerup`,`pointercancel`,`lostpointercapture`])e.action.addEventListener(t,()=>this.setRaise(!1)),e.reel.addEventListener(t,()=>this.setReel(!1));n(e.reel,e=>{var t,n;this.setReel(!0),(t=(n=e.target).setPointerCapture)==null||t.call(n,e.pointerId)}),n(e.dragPlus,()=>this.addDrag(.1)),n(e.dragMinus,()=>this.addDrag(-.1)),e.gear.addEventListener(`click`,()=>this.openRig()),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&(this.setReel(!1),this.setRaise(!1))}),addEventListener(`blur`,()=>{this.setReel(!1),this.setRaise(!1)}),addEventListener(`keydown`,e=>{!this.active||this.d.hud.panelOpen||e.repeat||(e.code===`Space`?(e.preventDefault(),this.sfx.unlock(),this.session.phase===`fight`?this.setRaise(!0):this.mainTap()):e.code===`KeyR`?this.setReel(!0):e.code===`KeyQ`?this.retrieve():e.code===`KeyT`?this.toggleAuto():e.code===`BracketRight`?this.session.adjustDepth(.5):e.code===`BracketLeft`&&this.session.adjustDepth(-.5))}),addEventListener(`keyup`,e=>{e.code===`Space`&&this.setRaise(!1),e.code===`KeyR`&&this.setReel(!1)}),t.onFlick=e=>{this.active&&!this.auto&&(this.sfx.unlock(),this.session.phase===`ready`&&this.session.startAim(),this.session.phase===`aim`&&this.session.cast(e,this.d.player.yaw))},om(`btnExit`).addEventListener(`click`,()=>{this.active&&this.session.phase===`aim`&&this.session.cancelAim()})}openRig(){let e=this.session.phase;e===`ready`||e===`wait`||e===`bite`?this.d.hud.open(`rig`):this.d.hud.toast(`仕掛けは、投げる前か着水中に変えられます`,1500)}setReel(e){this.reelHeld=e&&this.active,this.ui.setReelHold(this.reelHeld)}setRaise(e){this.raised=e&&this.active&&this.session.phase===`fight`,this.ui.setRaiseHold(this.raised)}addDrag(e){let t=this.session;t.inp.drag=am(Math.round((t.inp.drag+e)*100)/100,.2,2.3),this.sfx.ui()}act(){let e=this.session;switch(e.phase){case`ready`:e.startAim(),this.sfx.ui();break;case`aim`:e.cast(e.aimPower,this.d.player.yaw);break;case`wait`:case`bite`:e.hookset()}}step(e){if(!this.active)return;let t=this.session,n=this.d.input,r=this.d.player;if(this.d.hud.panelOpen&&t.phase===`fight`)this.hap.decay(e);else{if((t.phase===`ready`||t.phase===`aim`)&&(t.yaw=r.yaw),this.envT+=e,this.envT>10&&(this.envT=0,t.setEnv(this.d.hours())),this.auto&&this.autoStep(e),(t.phase===`wait`||t.phase===`bite`)&&t.setRetrieve(this.reelHeld),t.phase===`fight`){n.fightMode=!0;let i=n.s,a=i.fightHeld?50-i.fdy*.35:50;this.theta+=(am(a,5,90)-this.theta)*Math.min(1,e*14);let o=this.raised?Math.max(this.theta,80):this.theta,s=i.fightHeld?am(i.fdx/70,-1,1):0;this.qaPose.theta!=null&&(o=this.qaPose.theta),this.qaPose.steer!=null&&(s=this.qaPose.steer);let c=this.reelHeld;if(this.auto||this.assist){let n=nm(t.fight,this.auto||this.reelHeld,t.inp.drag,e);c=!!n.reel,this.qaPose.theta==null&&(o=n.theta),this.qaPose.steer==null&&(s=n.steer),this.qaManualDrag||(t.inp.drag=n.drag)}t.inp.theta=o,t.inp.steer=s,t.inp.reel=+!!c,(this.assist||this.auto)&&(this.fightT+=e);let l=t.fishWorld();if(l&&this.site){let t=l.x-r.x,n=l.z-r.z;if(Math.hypot(t,n)>1.5){let i=am(cm(Math.atan2(-t,-n)-this.site.yaw),-.9,.9)+this.site.yaw;r.yaw+=cm(i-r.yaw)*Math.min(1,e*2.5)}r.pitch+=(-.3-r.pitch)*Math.min(1,e*2)}}else n.fightMode=!1,this.raised=!1,this.ui.setRaiseHold(!1);n.flickOn=(t.phase===`ready`||t.phase===`aim`)&&!this.d.hud.panelOpen,t.update(e),(this.reelHeld||this.auto&&t.phase===`fight`&&t.inp.reel>0)&&(t.phase===`fight`||(t.phase===`wait`||t.phase===`bite`)&&t.floatInWater)&&this.sfx.reel(1);for(let e of t.popEvents())this.view.onEvent(t,e),this.handle(e);t.floatInWater&&t.phase!==`flight`&&(this.knownSeabed=t.seabed,this.seabedKnown=!0),t.phase!==this.lastPhase&&(this.lastPhase===`fight`&&(this.setReel(!1),this.raised=!1),t.phase===`fight`&&(this.theta=50,this.setReel(!1)),this.lastPhase=t.phase,this.autoT=0,this.autoBiteT=0,this.resultT=0,this.fightT=0,t.phase!==`fight`&&(this.qaManualDrag=!1)),this.hap.decay(e),this.saveT+=e,this.saveT>30&&(this.saveT=0,t.phase!==`fight`&&this.d.saveNow())}}update(e,t,n){var r;if(!this.qaFreeze)this.step(e);else if(this.active){let e=this.session.phase;this.d.input.flickOn=(e===`ready`||e===`aim`)&&!this.d.hud.panelOpen}let i=this.session;this.view.update(i,t,e,n,this.active),this.tut.update({mode:this.active?`fish`:`move`,phase:i.phase,canFish:((r=document.getElementById(`btnFish`))==null?void 0:r.dataset.state)===`ready`,waitSec:i.waitT,auto:this.auto,assist:this.assist,dt:e}),this.active&&(this.ui.update(i,this.fightView(),{baitPct:i.baitLife*100,castDist:i.castDist}),this.setShake(this.hap.shake))}setShake(e){e<.02?this.stage.style.transform&&(this.stage.style.transform=``):this.stage.style.transform=`translate(${((Math.random()-.5)*12*e).toFixed(1)}px,${((Math.random()-.5)*12*e).toFixed(1)}px)`}fightView(){let e=this.session.fight;return!e||this.session.phase!==`fight`?null:{known:e.dist<3.5,name:e.sp.nameJa,sizeCm:e.sizeCm,dist:e.dist,bearing:e.bearing,mode:e.mode,tension:e.tension,slipping:e.slipping,drag:this.session.inp.drag,theta:this.session.inp.theta,raised:this.raised,assist:this.assist,auto:this.auto}}handle(e){let t=this.session,n=this.d.data,r=this.d.hud,i=this.sfx,a=this.hap;switch(this.log.push(e.kind+(e.kind===`hookset`?`:`+e.result:e.kind===`fight_event`?`:`+e.ev.kind:e.kind===`end`?`:`+e.result:``)),this.log.length>80&&this.log.shift(),e.kind===`bite`&&this.biteEvents++,e.kind){case`cast`:i.whoosh(),a.fire(`cast`),n.stats.casts++,this.persistRig(),!this.auto&&t.lastPower>0&&this.d.patch({castPower:Math.round(t.lastPower*100)/100});break;case`quick_retrieve`:i.whoosh(),a.fire(`cast`);break;case`splash`:i.splash(),a.fire(`splash`);break;case`nibble`:i.tick(),a.fire(`pre`),this.once(`nibble`,`小さな動きはエサ取り。まだ合わせない`);break;case`pre`:i.tick(),a.fire(`pre`),this.ui.cue(`pre`,`ピクッ`);break;case`bite`:i.bite(),a.fire(`bite`),n.stats.bites++,this.ui.cue(`bite`,this.auto?`アタリ！`:`アタリ！ 合わせ！`);break;case`hookset`:e.result===`hooked`?(i.hookset(),a.fire(`hookset`),this.ui.cue(`hit`,`ヒット！`)):(i.miss(),e.result!==`empty`&&this.ui.cue(`miss`,e.result===`early`?`早い！`:e.result===`late`?`遅い…`:`ハズレ`));break;case`fish_hit`:break;case`fight_event`:{let t=e.ev.kind;(t===`run`||t===`side_run`||t===`dive`)&&this.once(`run`,this.assist||this.auto?`走る間は魚の力。少し待とう`:`走る間は巻かず、ドラグと竿で耐えよう`),t===`run`||t===`side_run`||t===`dive`||t===`last_run`||t===`headshake`?a.fire(`run`):t===`soft_warn`||t===`tear_warn`?(i.warn(),a.fire(`warn`)):t===`snap`?(i.snap(),a.fire(`snap`)):t===`drag_slip`&&i.slip(),e.ev.msg&&(t===`wedged`||t===`slack`||t===`freed`)&&r.toast(e.ev.msg,1800);break}case`end`:this.onEnd(e);break;case`bait_gone`:r.toast(`エサを取られた！ 自動で付け直しました`,2200);break;case`snag`:r.toast(e.state===`hooked`?`根掛かり！ 「巻く」で外れる／「回収」で戻す`:e.state===`freed`?`根掛かりが外れた`:`仕掛けをロスト…`,2200);break;case`toast`:r.toast(e.msg,2200);break;case`hint`:r.toast(`💡 `+e.msg,6e3);break;case`reel_in_done`:this.auto||r.toast(`回収しました`,1e3),this.setReel(!1)}}onEnd(e){let t=this.d.data,n=$f[e.species];if(this.setReel(!1),this.raised=!1,this.resultCatch=!1,this.lastEntry=null,e.result===`LANDED`&&e.catchRec){var r,i;let a=e.catchRec,o=(r=(i=this.site)==null||(i=i.spot)==null||(i=i.def)==null?void 0:i.id)==null?`free`:r,s=_f(t,{speciesId:a.speciesId,sizeCm:a.sizeCm,weightKg:a.weightKg,quality:a.quality,hour:a.hour,at:a.at},o);this.lastEntry=s.entry,this.resultCatch=!0,this.sfx.landed(s.first),this.hap.fire(`landed`),this.view.showCatch(a.speciesId,a.sizeCm),this.resultT=0;let c=t.zukan[a.speciesId];this.ui.showResult(`<h2>釣れた！${s.first?`<span class="badge">図鑑に新登録</span>`:``}</h2>
        <div class="big">${n.nameJa}</div>
        <p><b>${a.sizeCm} cm</b> ／ 約${a.weightKg>=1?a.weightKg.toFixed(2)+` kg`:Math.round(a.weightKg*1e3)+` g`}${s.newMax&&!s.first?` <span style="color:#ffd37a">自己ベスト！</span>`:``}</p>
        <p style="opacity:.8;font-size:12px">この魚の記録: ${c.count}匹目・最大 ${c.maxSizeCm}cm ／ ファイト ${Math.round(a.fightS)}秒</p>
        <div class="btns"><button id="rcRelease" data-ui>リリース</button><button id="rcKeep" data-ui class="pri">キープ</button></div>`),om(`rcKeep`).addEventListener(`click`,()=>this.closeResult(!1)),om(`rcRelease`).addEventListener(`click`,()=>this.closeResult(!0))}else{var a;e.result===`LINE_BREAK`?t.stats.lineBreaks++:t.stats.hookOuts++,this.sfx.lost(),this.hap.fire(e.result===`LINE_BREAK`?`snap`:`lost`);let r=e.result===`LINE_BREAK`?`ラインブレイク！`:e.result===`HOOK_OUT`?`バラした…`:`逃げられた…`;this.ui.showResult(`<h2>${r}</h2><p>${e.reason}</p><p style="opacity:.8;font-size:12px">相手は ${(a=n==null?void 0:n.nameJa)==null?`魚`:a} でした。ドラグ・竿の角度・巻くタイミングを見直そう。</p>
        <div class="btns"><button id="rcOk" data-ui class="pri">OK</button></div>`),om(`rcOk`).addEventListener(`click`,()=>this.closeResult(!1))}this.d.saveNow()}autoStep(e){let t=this.session;if(!this.d.hud.panelOpen)switch(t.phase){case`ready`:{if(this.autoT+=e,this.autoT<1)break;let n=t.yaw;this.site&&(t.yaw=this.site.yaw);let r=t.autoCastPlan();if(t.yaw=n,this.autoT=0,!r){this.autoT=-2.5,this.once(`noplan`,`投げられる場所を探しています…`,1800);break}t.rig.depthM>r.depth-.5&&t.setRig({depthM:Math.max(.5,Math.round((r.depth-.7)*2)/2)}),this.d.player.yaw=r.yaw,t.yaw=r.yaw,t.startAim(),t.cast(r.power,r.yaw),t.phase===`aim`&&t.cancelAim();break}case`bite`:this.autoBiteT+=e,this.autoBiteT>.35&&(this.autoBiteT=-9,t.hookset());break;case`wait`:this.autoT+=e,!t.quick&&(t.baitLife<.03||t.snag||t.waitT>75)&&this.retrieve();break;case`result`:this.resultT+=e,this.resultT>3.4&&!this.d.hud.panelOpen&&this.closeResult(!1)}}closeResult(e){e&&this.lastEntry&&(vf(this.d.data,this.lastEntry.id),this.sfx.splash(.6)),this.view.hideCatch(),this.ui.hideResult(),this.session.dismissResult(),this.lastEntry=null,this.resultCatch=!1,this.d.saveNow()}get resultShown(){return this.ui.e.result.classList.contains(`open`)}advance(e){let t=Math.round(e*30);for(let e=0;e<t;e++)this.step(1/30)}},cm=e=>{for(;e>Math.PI;)e-=2*Math.PI;for(;e<-Math.PI;)e+=2*Math.PI;return e},lm=e=>document.getElementById(e),um=()=>new Promise(e=>requestAnimationFrame(()=>e())),dm=(e,t)=>{lm(`loadMsg`).textContent=e,t!=null&&(lm(`bar`).firstElementChild.style.width=`${Math.round(t*100)}%`)};async function fm(){let e=new URLSearchParams(location.search),t=e.has(`qa`),n=e.get(`t`)==null?null:parseFloat(e.get(`t`)),r=bf(),i=xf(),a=mf(r),o={...a.data.settings};(e.get(`q`)===`low`||e.get(`q`)===`mid`||e.get(`q`)===`high`)&&(o.quality=e.get(`q`)),t&&!e.has(`assist`)&&(o={...o,assist:!1});let s=e.get(`tut`)===`1`;!o.modeChosen&&!s&&(t||a.data.stats.casts>0)&&(o={...o,modeChosen:!0,tutStep:4}),o.modeChosen||(o={...o,tutStep:4});let c=a.status===`unavailable`?`保存不可の環境`:a.status===`reset`?`壊れたデータを初期化`:a.status===`loaded`?`前回のデータを読込済`:`新規`;dm(`描画エンジンを準備中…`,.05),await um();let l;try{l=new Uu({antialias:!1,powerPreference:`high-performance`,alpha:!1,stencil:!1})}catch(e){throw Error(`WebGL を初期化できませんでした。ブラウザまたは端末が WebGL に対応していない可能性があります。
`+e.message)}l.outputColorSpace=Ue,l.toneMapping=0,l.setClearColor(726052),lm(`stage`).appendChild(l.domElement);let u=l.getContext(),d=u.getExtension(`WEBGL_debug_renderer_info`),f=d?String(u.getParameter(d.UNMASKED_RENDERER_WEBGL)):`WebGL`,p=new wn;p.fog=new Cn(13624302,60,460);let m=new es(12573168,9076330,1),h=new hs(16774108,2);p.add(m,h,h.target),dm(`港の地形を生成中…`,.15),await um();let g=dd(),_=g.grid,v=yf[o.quality],y=Nd(_,{seabedSeg:1});p.add(y),dm(`海と空を準備中…`,.4),await um();let b=new Id(_,v.waterSeg);p.add(b.group);let x=new Bd;p.add(x.mesh),dm(`建物・防波堤・テトラ・海藻を配置中…`,.6),await um();let S=Vd(g,{seaweed:600,tetraMax:700});p.add(S.group),dm(`操作系を準備中…`,.8),await um();let C=new Gd(_),w=new qd(_,innerWidth/innerHeight);p.add(w.camera,w.avatar),w.setMode(o.camera);let T={x:od.x,z:od.z,yaw:od.yaw},E=a.data.position;E&&C.isSafe(E.x,E.z)&&_.reach[Xu(E.z)*320+Yu(E.x)]&&(T=E),C.place(T.x,T.z,T.yaw);let D=new Kd(lm(`touch`),lm(`joyRing`),lm(`joyKnob`)),O=!1,k=`move`,A=Zd(_,C.x,C.z,S.markers),j=null,M=0,N=0,ee=0,P=0,te=0,ne=0,re=``,ie=new Cf,ae=jf(),oe=-1,se=new zf(_,S.markers),ce=a.data,F=()=>(ce.settings=o,ce.position={x:C.x,z:C.z,yaw:C.yaw},ce),I=()=>{let e=hf(F());return c=e?`保存OK`:`保存失敗`,e};function le(e){v=yf[e],l.setPixelRatio(Sf(v)),l.setSize(innerWidth,innerHeight,!1),b.setSegments(v.waterSeg);for(let e of[`seaweed`,`tetrapods`]){let t=S.group.getObjectByName(e);t.count=Math.max(1,Math.floor((e===`seaweed`?S.stats.weeds:S.stats.tetras)*v.detail))}o={...o,quality:e}}function ue(e=!1){let t=Ef(n);if(!e&&n==null&&Math.abs(t-ae.hours)<.004)return;kf(t,ae),x.apply(ae);let r=ae.dayLight,i=1-r,a=ae.elevDeg>-1?ae.sunDir:new G(.4,.6,.5).normalize();h.position.copy(a).multiplyScalar(100),h.color.copy(ae.sunColor).lerp(new J(9414880),i),h.intensity=Math.max(0,ae.sunIntensity*1.55)*(1-i*0)*(ae.elevDeg>-1)+.55*i,m.color.copy(ae.zenith).lerp(new J(16777215),.45),m.groundColor.set(9076330).multiplyScalar(.35+.65*r),m.intensity=ae.hemiIntensity*2+i*.35;let o=p.fog;o.color.copy(ae.fog),o.near=25+35*r,o.far=200+260*r,l.setClearColor(ae.horizon),S.lampMat.color.set(16763002).lerp(new J(12171432),r)}le(o.quality),ue(!0),b.update(0,ae,1,p.fog);function de(){let e=innerWidth,t=innerHeight;l.setPixelRatio(Sf(v)),l.setSize(e,t,!1),w.resize(e,t)}de(),addEventListener(`resize`,de),addEventListener(`orientationchange`,()=>setTimeout(de,150));let fe=o.alwaysRun,L=new Pf({onFish:()=>_e(),onExit:()=>ve(),onCam:()=>{let e=w.mode===`first`?`third`:`first`;w.setMode(e),o={...o,camera:e},L.toast(e===`first`?`一人称視点`:`三人称視点`),I()},onSettings:e=>{let t=e.quality!==o.quality;o=e,he.applySettings(e),t&&(te=performance.now(),le(e.quality)),w.setMode(e.camera),S.hints.visible=e.hints,e.alwaysRun!==fe&&(fe=e.alwaysRun,D.setRunLock(e.alwaysRun),L.setRun(e.alwaysRun),L.toast(e.alwaysRun?`常に走る: ON`:`常に走る: OFF`)),I()},onTutorial:()=>{pe({auto:!1}),he.tut.restart(),L.toast(`遊び方を開始（約30秒・スキップ可）`,2400)},onSaveNow:()=>I(),onClearSave:()=>{let e=gf(),t=rf(r);return ce.zukan=t.zukan,ce.catchLog=t.catchLog,ce.stats=t.stats,ce.lastRig=null,e},onResetPos:()=>{C.place(od.x,od.z,od.yaw),L.toast(`スポーン地点に戻りました`),I()},onRun:e=>{D.setRunLock(e),L.setRun(e),L.toast(e?`走る ON`:`走る OFF（歩き）`,1200)},info:()=>({fps:ie.fps,quality:o.quality,timeLabel:ge(),timeDemo:n!=null,saveStatus:c,renderer:f,calls:l.info.render.calls,tris:l.info.render.triangles,dpr:l.getPixelRatio()}),playerPos:()=>({x:C.x,z:C.z,yaw:C.yaw})},()=>o,se),pe=e=>{o={...o,...e},he.applySettings(o)},me=e.get(`seed`),he=new sm({scene:p,rig:w,input:D,player:C,hud:L,g:_,data:ce,saveNow:()=>I(),hours:()=>n==null?ae.hours||Ef(null):n,seed:me==null?void 0:parseInt(me,10)>>>0,qa:t,settings:()=>o,patch:pe});he.applySettings(o),L.onPanel=e=>{D.enabled=O&&!e,e?D.reset():I()},S.hints.visible=o.hints,D.setRunLock(o.alwaysRun),L.setRun(o.alwaysRun),a.note&&setTimeout(()=>L.toast(a.note,4e3),1500),a.status===`unavailable`&&setTimeout(()=>L.toast(`この環境では保存できません`,4e3),1500);function ge(){let e=Ef(n),t=Math.floor(e),r=Math.floor((e-t)*60);return`${String(t).padStart(2,`0`)}:${String(r).padStart(2,`0`)}`}function _e(){k!==`fish`&&O&&(A=Zd(_,C.x,C.z,S.markers),A.can?(j=A,k=`fish`,D.reset(),D.lockMove=!0,C.yaw=A.yaw,C.pitch=-.38,w.enterFishing(A.yaw),L.setMode(`fish`),L.showFishing(A),he.enter(A),I()):L.toast(`水辺に近づこう（岸壁・防波堤・砂浜・岩場の水際で釣れます）`))}function ve(){k===`fish`&&he.requestExit()&&(he.leave(),k=`move`,j=null,D.lockMove=!1,D.reset(),w.exitFishing(),C.pitch=0,L.setMode(`move`))}D.onKey=e=>{e===`KeyF`?k===`move`?_e():ve():e===`Escape`?L.panelOpen?L.close():ve():e===`KeyM`?L.panelOpen?L.close():L.open(`map`):e===`KeyV`&&lm(`btnCam`).click()};let ye=!1;l.domElement.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),ye=!0,L.toast(`描画が一時停止しました。復帰を待っています…`,8e3)}),l.domElement.addEventListener(`webglcontextrestored`,()=>{ye=!1,L.toast(`描画が復帰しました`),de()}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&(I(),D.reset())}),addEventListener(`pagehide`,()=>{I()}),dm(`シェーダーを準備中…`,.9),await um();try{l.compile(p,w.camera)}catch(e){console.warn(`compile`,e)}function be(e){if(requestAnimationFrame(be),ye)return;let r=v.fpsCap;if(r<60&&e-M<1e3/r-3)return;let i=Math.min(.1,M?(e-M)/1e3:.016);M=e,ie.tick(e);let a=e/1e3;if(O&&!L.panelOpen){let e=D.s;(e.lookDX||e.lookDY)&&(w.look(C,e.lookDX,e.lookDY,o.lookSens),e.lookDX=0,e.lookDY=0),k===`move`&&C.update(i,e.mx,e.mz,e.run,o.moveSpeed)}else D.s.lookDX=0,D.s.lookDY=0;if(O||(C.yaw=T.yaw+Math.sin(a*.12)*.6),e-N>200){if(N=e,k===`move`){A=Zd(_,C.x,C.z,S.markers);let e=``;for(let t of cd)Math.hypot(t.x-C.x,t.z-C.z)<t.r&&(e=t.name);e&&e!==re&&O&&L.toast(cd.find(t=>t.name===e).note),re=e,L.updateChip(ge(),n!=null,A,e?`「${e}」付近（中身は準備中）`:``)}if(O&&e-ee>1e4&&(ee=e,C.moved!==P&&(P=C.moved,I())),O&&!t&&document.visibilityState===`visible`&&o.quality!==`low`&&e-te>6e3){if(ie.fps>0&&ie.fps<21){if(!ne)ne=e;else if(e-ne>3e3){let t=o.quality===`high`?`mid`:`low`;te=e,ne=0,le(t),L.toast(`動作が重いので画質を「${yf[t].label}」に下げました`,4e3),I()}}else ne=0}}n==null&&e-oe>1e3&&(oe=e,ue()),w.update(C,i),he.update(i,a,ae.dayLight),x.mesh.position.copy(w.camera.position),x.u.uTime.value=a,b.update(a,ae,1,p.fog),S.update(a,w.camera.position),l.render(p,w.camera)}requestAnimationFrame(be),Bf({qa:t,player:C,g:_,rig:w,input:D,props:S,get mode(){return k},get playing(){return O},get site(){return A},fps:ie,renderer:l,get settings(){return o},saveNow:I,applyQuality:le,applyTime:ue,setTime:e=>{window.__rfwT=e},get saveStatus(){return c},hud:L,startFishing:_e,exitFishing:ve,fishing:he,get frozen(){return j},skyState:ae,scene:p,WATER_Y:qu});let xe=lm(`play`);dm(`準備完了！`,1),xe.disabled=!1,xe.textContent=`▶ はじめる`,window.__rfwBooted=!0,xe.addEventListener(`click`,()=>{if(!O&&(O=!0,D.enabled=!0,he.sfx.unlock(),lm(`loading`).style.display=`none`,document.body.classList.add(`playing`),C.yaw=T.yaw,C.pitch=0,I(),L.toast(i?`左をドラッグで移動／右をスワイプで視点`:`WASDで移動・ドラッグで視点・Fで釣り開始`,4200),!o.modeChosen)){D.enabled=!1,D.reset();let e=lm(`startChoice`);e.classList.add(`open`);let t=t=>{e.classList.remove(`open`),D.enabled=O&&!L.panelOpen,pe({modeChosen:!0,auto:t}),t?(pe({tutStep:4}),L.toast(`🤖 おまかせで釣ります（水辺で「釣り開始」）`,3200)):(pe({tutStep:0}),he.tut.restart()),I()};lm(`chManual`).addEventListener(`click`,()=>t(!1),{once:!0}),lm(`chAuto`).addEventListener(`click`,()=>t(!0),{once:!0})}})}fm().catch(e=>{var t,n,r,i;console.error(e),(t=(n=window).__rfwShowError)==null||t.call(n,String((r=e==null?void 0:e.message)==null?e:r),(i=e==null?void 0:e.stack)==null?``:i)});