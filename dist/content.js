(()=>{var ur=class{constructor(){this.ctx=null,this.analyser=null,this.source=null,this.el=null,this.error=null,this.gain=1,this.spectrum=new Float32Array(128),this.bass=0,this.mid=0,this.treble=0,this.level=0,this.beat=0,this._raw=null,this._starts=new Float32Array(128),this._ends=new Float32Array(128),this._bassAvg=0,this._lastBeat=0,this._bassEnd=30,this._midEnd=84}attach(t){try{if(!this.ctx){let e=window.AudioContext||window.webkitAudioContext;this.ctx=new e({latencyHint:"playback"}),this.analyser=this.ctx.createAnalyser(),this.analyser.fftSize=2048,this.analyser.smoothingTimeConstant=.5,this.analyser.minDecibels=-90,this.analyser.maxDecibels=-20,this.analyser.connect(this.ctx.destination),this._raw=new Uint8Array(this.analyser.frequencyBinCount),this._buildBands(),this.ctx.addEventListener("statechange",()=>{this.ctx.state==="suspended"&&this.source&&this.ctx.resume().catch(()=>{})})}if(this.el!==t){if(this.source)try{this.source.disconnect()}catch{}this.source=this.ctx.createMediaElementSource(t),this.source.connect(this.analyser),this.el=t,t.addEventListener("play",()=>{this.ctx&&this.ctx.resume().catch(()=>{})})}return this.ctx.state!=="running"&&this.ctx.resume().catch(()=>{}),this.error=null,!0}catch(e){return this.error=e,!1}}_buildBands(){let t=this.ctx.sampleRate,e=this.analyser.frequencyBinCount,n=t/2/e,s=40,r=Math.min(16e3,t/2*.95),a=o=>s*Math.pow(r/s,o/128);for(let o=0;o<128;o++)this._starts[o]=a(o)/n,this._ends[o]=a(o+1)/n;this._bassEnd=Math.round(Math.log(160/s)/Math.log(r/s)*128),this._midEnd=Math.round(Math.log(2e3/s)/Math.log(r/s)*128)}update(t){t=Math.min(Math.max(t,.001),.1);let e=this.spectrum,n=!!this.analyser;n&&this.analyser.getByteFrequencyData(this._raw);let s=this._raw,r=1-Math.exp(-t*40),a=1-Math.exp(-t*8);for(let p=0;p<128;p++){let u=0;if(n){let _=this._starts[p],M=this._ends[p];if(M-_<1){let f=(_+M)*.5,d=Math.floor(f),y=f-d;u=(s[d]*(1-y)+s[Math.min(d+1,s.length-1)]*y)/255}else{let f=0,d=Math.min(Math.ceil(M),s.length-1);for(let y=Math.floor(_);y<=d;y++)s[y]>f&&(f=s[y]);u=f/255}}u=Math.min(1,u*(.8+p/128*.9)*this.gain);let m=e[p];e[p]=u>m?m+(u-m)*r:m+(u-m)*a}let o=0,l=0,c=0;for(let p=0;p<128;p++)p<this._bassEnd?o+=e[p]:p<this._midEnd?l+=e[p]:c+=e[p];this.bass=Math.min(1,o/this._bassEnd*1.15),this.mid=l/(this._midEnd-this._bassEnd),this.treble=c/(128-this._midEnd),this.level=(this.bass+this.mid+this.treble)/3;let h=performance.now();this._bassAvg+=(this.bass-this._bassAvg)*(1-Math.exp(-t*1.5)),this.bass>this._bassAvg*1.22+.04&&this.bass>.3&&h-this._lastBeat>190&&(this.beat=1,this._lastBeat=h),this.beat*=Math.exp(-t*5.5)}};var sh=0,gl=1,rh=2;var Ys=1,ah=2,Ki=3,ni=0,He=1,tn=2,_i=0,Qi=1,me=2,_l=3,xl=4,oh=5;var xi=100,lh=101,ch=102,hh=103,uh=104,dh=200,fh=201,ph=202,mh=203,vl=204,yl=205,gh=206,_h=207,xh=208,vh=209,yh=210,Mh=211,Sh=212,bh=213,Eh=214,Vr=0,Gr=1,Wr=2,Gi=3,Xr=4,qr=5,Yr=6,Zr=7,ba=0,Th=1,wh=2,bn=0,Ml=1,Sl=2,bl=3,El=4,Tl=5,wl=6,Al=7;var Rl=300,vi=301,ji=302,Ea=303,Ta=304,Jr=1e3,Qe=1001,$r=1002,Te=1003,Ah=1004;var Zs=1005;var we=1006,wa=1007;var Bn=1008;var Ue=1009,Cl=1010,Pl=1011,ts=1012,Aa=1013,hn=1014,en=1015,un=1016,Ra=1017,Ca=1018,yi=1020,Il=35902,Ll=35899,Nl=1021,Dl=1022,dn=1023,Un=1026,zn=1027,es=1028,Pa=1029,ii=1030,Ia=1031;var La=1033,Js=33776,$s=33777,Ks=33778,Qs=33779,Na=35840,Da=35841,Ua=35842,Fa=35843,Oa=36196,Ba=37492,za=37496,Ha=37488,ka=37489,js=37490,Va=37491,Ga=37808,Wa=37809,Xa=37810,qa=37811,Ya=37812,Za=37813,Ja=37814,$a=37815,Ka=37816,Qa=37817,ja=37818,to=37819,eo=37820,no=37821,io=36492,so=36494,ro=36495,ao=36283,oo=36284,tr=36285,lo=36286;var vs=2300,Kr=2301,Hr=2302,ll=2303,cl=2400,hl=2401,ul=2402;var Rh=3200;var co=0,Ch=1,Hn="",We="srgb",pi="srgb-linear",ys="linear",Yt="srgb";var kr=7680;var Ph=519,Ih=512,Lh=513,Nh=514,Ul=515,Dh=516,Uh=517,Fl=518,Ol=519,Bl=35044,zl=35048;var Hl="300 es",je=2e3,Wi=2001;function Qu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ju(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ms(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Fh(){let i=Ms("canvas");return i.style.display="block",i}var Ec={},Xi=null;function Ss(...i){let t="THREE."+i.shift();Xi?Xi("log",t,...i):console.log(t,...i)}function Oh(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function At(...i){i=Oh(i);let t="THREE."+i.shift();if(Xi)Xi("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Pt(...i){i=Oh(i);let t="THREE."+i.shift();if(Xi)Xi("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function xs(...i){let t=i.join(" ");t in Ec||(Ec[t]=!0,At(...i))}function Bh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var zh={[Vr]:Vr,[Wr]:Yr,[Xr]:Xr,[Gi]:qr,[Gr]:Gr,[Yr]:Wr,[Zr]:Zr,[qr]:Gi},gn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Bo=Math.PI/180,Qr=180/Math.PI;function Mi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function Wt(i,t,e){return Math.max(t,Math.min(e,i))}function td(i,t){return(i%t+t)%t}function zo(i,t,e){return(1-e)*i+e*t}function Hh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ho(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function kh(i,t){if(t.constructor===Float32Array)return i;let e=ho(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function Vh(i,t){if(t.constructor===Float32Array)return i;let e=ho(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}var It=class{static{this.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},_n=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],p=n[s+3],u=r[a+0],m=r[a+1],_=r[a+2],M=r[a+3];if(p!==M||l!==u||c!==m||h!==_){let f=l*u+c*m+h*_+p*M;f<0&&(u=-u,m=-m,_=-_,M=-M,f=-f);let d=1-o;if(f<.9995){let y=Math.acos(f),w=Math.sin(y);d=Math.sin(d*y)/w,o=Math.sin(o*y)/w,l=l*d+u*o,c=c*d+m*o,h=h*d+_*o,p=p*d+M*o}else{l=l*d+u*o,c=c*d+m*o,h=h*d+_*o,p=p*d+M*o;let y=1/Math.sqrt(l*l+c*c+h*h+p*p);l*=y,c*=y,h*=y,p*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],p=r[a],u=r[a+1],m=r[a+2],_=r[a+3];return t[e]=o*_+h*p+l*m-c*u,t[e+1]=l*_+h*u+c*p-o*m,t[e+2]=c*_+h*m+o*u-l*p,t[e+3]=h*_-o*p-l*u-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),p=o(r/2),u=l(n/2),m=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=u*h*p+c*m*_,this._y=c*m*p-u*h*_,this._z=c*h*_+u*m*p,this._w=c*h*p-u*m*_;break;case"YXZ":this._x=u*h*p+c*m*_,this._y=c*m*p-u*h*_,this._z=c*h*_-u*m*p,this._w=c*h*p+u*m*_;break;case"ZXY":this._x=u*h*p-c*m*_,this._y=c*m*p+u*h*_,this._z=c*h*_+u*m*p,this._w=c*h*p-u*m*_;break;case"ZYX":this._x=u*h*p-c*m*_,this._y=c*m*p+u*h*_,this._z=c*h*_-u*m*p,this._w=c*h*p+u*m*_;break;case"YZX":this._x=u*h*p+c*m*_,this._y=c*m*p+u*h*_,this._z=c*h*_-u*m*p,this._w=c*h*p-u*m*_;break;case"XZY":this._x=u*h*p-c*m*_,this._y=c*m*p-u*h*_,this._z=c*h*_+u*m*p,this._w=c*h*p+u*m*_;break;default:At("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],p=e[10],u=n+o+p;if(u>0){let m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>p){let m=2*Math.sqrt(1+n-o-p);this._w=(h-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>p){let m=2*Math.sqrt(1+o-n-p);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+h)/m}else{let m=2*Math.sqrt(1+p-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Wt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class{static{this.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Tc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Tc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),p=2*(r*n-a*e);return this.x=e+l*c+a*p-o*h,this.y=n+l*h+o*c-r*p,this.z=s+l*p+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ho.copy(this).projectOnVector(t),this.sub(Ho)}reflect(t){return this.sub(Ho.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ho=new U,Tc=new _n,Lt=class{static{this.prototype.isMatrix3=!0}constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],p=n[7],u=n[2],m=n[5],_=n[8],M=s[0],f=s[3],d=s[6],y=s[1],w=s[4],S=s[7],A=s[2],T=s[5],g=s[8];return r[0]=a*M+o*y+l*A,r[3]=a*f+o*w+l*T,r[6]=a*d+o*S+l*g,r[1]=c*M+h*y+p*A,r[4]=c*f+h*w+p*T,r[7]=c*d+h*S+p*g,r[2]=u*M+m*y+_*A,r[5]=u*f+m*w+_*T,r[8]=u*d+m*S+_*g,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],p=h*a-o*c,u=o*l-h*r,m=c*r-a*l,_=e*p+n*u+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/_;return t[0]=p*M,t[1]=(s*c-h*n)*M,t[2]=(o*n-s*a)*M,t[3]=u*M,t[4]=(h*e-s*l)*M,t[5]=(s*r-o*e)*M,t[6]=m*M,t[7]=(n*l-c*e)*M,t[8]=(a*e-n*r)*M,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return xs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ko.makeScale(t,e)),this}rotate(t){return xs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ko.makeRotation(-t)),this}translate(t,e){return xs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ko.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ko=new Lt,wc=new Lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ac=new Lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ed(){let i={enabled:!0,workingColorSpace:pi,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Yt&&(s.r=Dn(s.r),s.g=Dn(s.g),s.b=Dn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Yt&&(s.r=Vi(s.r),s.g=Vi(s.g),s.b=Vi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hn?ys:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[pi]:{primaries:t,whitePoint:n,transfer:ys,toXYZ:wc,fromXYZ:Ac,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:We},outputColorSpaceConfig:{drawingBufferColorSpace:We}},[We]:{primaries:t,whitePoint:n,transfer:Yt,toXYZ:wc,fromXYZ:Ac,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:We}}}),i}var Ht=ed();function Dn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Vi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ei,jr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ei===void 0&&(Ei=Ms("canvas")),Ei.width=t.width,Ei.height=t.height;let s=Ei.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ei}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ms("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Dn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Dn(e[n]/255)*255):e[n]=Dn(e[n]);return{data:e,width:t.width,height:t.height}}else return At("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},nd=0,qi=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=Mi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Vo(s[a].image)):r.push(Vo(s[a]))}else r=Vo(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Vo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?jr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(At("Texture: Unable to serialize Texture."),{})}var id=0,Go=new U,ze=class i extends gn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Qe,s=Qe,r=we,a=Bn,o=dn,l=Ue,c=i.DEFAULT_ANISOTROPY,h=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:id++}),this.uuid=Mi(),this.name="",this.source=new qi(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new It(0,0),this.repeat=new It(1,1),this.center=new It(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Go).x}get height(){return this.source.getSize(Go).y}get depth(){return this.source.getSize(Go).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){At(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){At(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Rl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Jr:t.x=t.x-Math.floor(t.x);break;case Qe:t.x=t.x<0?0:1;break;case $r:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Jr:t.y=t.y-Math.floor(t.y);break;case Qe:t.y=t.y<0?0:1;break;case $r:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=Rl;ze.DEFAULT_ANISOTROPY=1;var se=class{static{this.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],p=l[8],u=l[1],m=l[5],_=l[9],M=l[2],f=l[6],d=l[10];if(Math.abs(h-u)<.01&&Math.abs(p-M)<.01&&Math.abs(_-f)<.01){if(Math.abs(h+u)<.1&&Math.abs(p+M)<.1&&Math.abs(_+f)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(c+1)/2,S=(m+1)/2,A=(d+1)/2,T=(h+u)/4,g=(p+M)/4,b=(_+f)/4;return w>S&&w>A?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=T/n,r=g/n):S>A?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=T/s,r=b/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=g/r,s=b/r),this.set(n,s,r,e),this}let y=Math.sqrt((f-_)*(f-_)+(p-M)*(p-M)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(f-_)/y,this.y=(p-M)/y,this.z=(u-h)/y,this.w=Math.acos((c+m+d-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this.w=Wt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this.w=Wt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ta=class extends gn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:we,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new se(0,0,t,e),this.scissorTest=!1,this.viewport=new se(0,0,t,e),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new ze({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:we,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new qi(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xe=class extends ta{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},bs=class extends ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Te,this.minFilter=Te,this.wrapR=Qe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var ea=class extends ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Te,this.minFilter=Te,this.wrapR=Qe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Zt=class i{static{this.prototype.isMatrix4=!0}constructor(t,e,n,s,r,a,o,l,c,h,p,u,m,_,M,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,p,u,m,_,M,f)}set(t,e,n,s,r,a,o,l,c,h,p,u,m,_,M,f){let d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=p,d[14]=u,d[3]=m,d[7]=_,d[11]=M,d[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Ti.setFromMatrixColumn(t,0).length(),r=1/Ti.setFromMatrixColumn(t,1).length(),a=1/Ti.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){let u=a*h,m=a*p,_=o*h,M=o*p;e[0]=l*h,e[4]=-l*p,e[8]=c,e[1]=m+_*c,e[5]=u-M*c,e[9]=-o*l,e[2]=M-u*c,e[6]=_+m*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,m=l*p,_=c*h,M=c*p;e[0]=u+M*o,e[4]=_*o-m,e[8]=a*c,e[1]=a*p,e[5]=a*h,e[9]=-o,e[2]=m*o-_,e[6]=M+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,m=l*p,_=c*h,M=c*p;e[0]=u-M*o,e[4]=-a*p,e[8]=_+m*o,e[1]=m+_*o,e[5]=a*h,e[9]=M-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,m=a*p,_=o*h,M=o*p;e[0]=l*h,e[4]=_*c-m,e[8]=u*c+M,e[1]=l*p,e[5]=M*c+u,e[9]=m*c-_,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,m=a*c,_=o*l,M=o*c;e[0]=l*h,e[4]=M-u*p,e[8]=_*p+m,e[1]=p,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*p+_,e[10]=u-M*p}else if(t.order==="XZY"){let u=a*l,m=a*c,_=o*l,M=o*c;e[0]=l*h,e[4]=-p,e[8]=c*h,e[1]=u*p+M,e[5]=a*h,e[9]=m*p-_,e[2]=_*p-m,e[6]=o*h,e[10]=M*p+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(sd,t,rd)}lookAt(t,e,n){let s=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),qn.crossVectors(n,Ve),qn.lengthSq()===0&&(Math.abs(n.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),qn.crossVectors(n,Ve)),qn.normalize(),dr.crossVectors(Ve,qn),s[0]=qn.x,s[4]=dr.x,s[8]=Ve.x,s[1]=qn.y,s[5]=dr.y,s[9]=Ve.y,s[2]=qn.z,s[6]=dr.z,s[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],p=n[5],u=n[9],m=n[13],_=n[2],M=n[6],f=n[10],d=n[14],y=n[3],w=n[7],S=n[11],A=n[15],T=s[0],g=s[4],b=s[8],L=s[12],C=s[1],D=s[5],F=s[9],G=s[13],P=s[2],V=s[6],q=s[10],k=s[14],et=s[3],X=s[7],Q=s[11],j=s[15];return r[0]=a*T+o*C+l*P+c*et,r[4]=a*g+o*D+l*V+c*X,r[8]=a*b+o*F+l*q+c*Q,r[12]=a*L+o*G+l*k+c*j,r[1]=h*T+p*C+u*P+m*et,r[5]=h*g+p*D+u*V+m*X,r[9]=h*b+p*F+u*q+m*Q,r[13]=h*L+p*G+u*k+m*j,r[2]=_*T+M*C+f*P+d*et,r[6]=_*g+M*D+f*V+d*X,r[10]=_*b+M*F+f*q+d*Q,r[14]=_*L+M*G+f*k+d*j,r[3]=y*T+w*C+S*P+A*et,r[7]=y*g+w*D+S*V+A*X,r[11]=y*b+w*F+S*q+A*Q,r[15]=y*L+w*G+S*k+A*j,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],p=t[6],u=t[10],m=t[14],_=t[3],M=t[7],f=t[11],d=t[15],y=l*m-c*u,w=o*m-c*p,S=o*u-l*p,A=a*m-c*h,T=a*u-l*h,g=a*p-o*h;return e*(M*y-f*w+d*S)-n*(_*y-f*A+d*T)+s*(_*w-M*A+d*g)-r*(_*S-M*T+f*g)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],p=t[9],u=t[10],m=t[11],_=t[12],M=t[13],f=t[14],d=t[15],y=e*o-n*a,w=e*l-s*a,S=e*c-r*a,A=n*l-s*o,T=n*c-r*o,g=s*c-r*l,b=h*M-p*_,L=h*f-u*_,C=h*d-m*_,D=p*f-u*M,F=p*d-m*M,G=u*d-m*f,P=y*G-w*F+S*D+A*C-T*L+g*b;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let V=1/P;return t[0]=(o*G-l*F+c*D)*V,t[1]=(s*F-n*G-r*D)*V,t[2]=(M*g-f*T+d*A)*V,t[3]=(u*T-p*g-m*A)*V,t[4]=(l*C-a*G-c*L)*V,t[5]=(e*G-s*C+r*L)*V,t[6]=(f*S-_*g-d*w)*V,t[7]=(h*g-u*S+m*w)*V,t[8]=(a*F-o*C+c*b)*V,t[9]=(n*C-e*F-r*b)*V,t[10]=(_*T-M*S+d*y)*V,t[11]=(p*S-h*T-m*y)*V,t[12]=(o*L-a*D-l*b)*V,t[13]=(e*D-n*L+s*b)*V,t[14]=(M*w-_*A-f*y)*V,t[15]=(h*A-p*w+u*y)*V,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,p=o+o,u=r*c,m=r*h,_=r*p,M=a*h,f=a*p,d=o*p,y=l*c,w=l*h,S=l*p,A=n.x,T=n.y,g=n.z;return s[0]=(1-(M+d))*A,s[1]=(m+S)*A,s[2]=(_-w)*A,s[3]=0,s[4]=(m-S)*T,s[5]=(1-(u+d))*T,s[6]=(f+y)*T,s[7]=0,s[8]=(_+w)*g,s[9]=(f-y)*g,s[10]=(1-(u+M))*g,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Ti.set(s[0],s[1],s[2]).length(),o=Ti.set(s[4],s[5],s[6]).length(),l=Ti.set(s[8],s[9],s[10]).length();r<0&&(a=-a),sn.copy(this);let c=1/a,h=1/o,p=1/l;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=p,sn.elements[9]*=p,sn.elements[10]*=p,e.setFromRotationMatrix(sn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=je,l=!1){let c=this.elements,h=2*r/(e-t),p=2*r/(n-s),u=(e+t)/(e-t),m=(n+s)/(n-s),_,M;if(l)_=r/(a-r),M=a*r/(a-r);else if(o===je)_=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===Wi)_=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=je,l=!1){let c=this.elements,h=2/(e-t),p=2/(n-s),u=-(e+t)/(e-t),m=-(n+s)/(n-s),_,M;if(l)_=1/(a-r),M=a/(a-r);else if(o===je)_=-2/(a-r),M=-(a+r)/(a-r);else if(o===Wi)_=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Ti=new U,sn=new Zt,sd=new U(0,0,0),rd=new U(1,1,1),qn=new U,dr=new U,Ve=new U,Rc=new Zt,Cc=new _n,Fn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],p=s[2],u=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Wt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:At("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Rc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Rc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Cc.setFromEuler(this),this.setFromQuaternion(Cc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Fn.DEFAULT_ORDER="XYZ";var Es=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},ad=0,Pc=new U,wi=new _n,Rn=new Zt,fr=new U,ls=new U,od=new U,ld=new _n,Ic=new U(1,0,0),Lc=new U(0,1,0),Nc=new U(0,0,1),Dc={type:"added"},cd={type:"removed"},Ai={type:"childadded",child:null},Wo={type:"childremoved",child:null},Ae=class i extends gn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=Mi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new U,e=new Fn,n=new _n,s=new U(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Zt},normalMatrix:{value:new Lt}}),this.matrix=new Zt,this.matrixWorld=new Zt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Es,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return wi.setFromAxisAngle(t,e),this.quaternion.multiply(wi),this}rotateOnWorldAxis(t,e){return wi.setFromAxisAngle(t,e),this.quaternion.premultiply(wi),this}rotateX(t){return this.rotateOnAxis(Ic,t)}rotateY(t){return this.rotateOnAxis(Lc,t)}rotateZ(t){return this.rotateOnAxis(Nc,t)}translateOnAxis(t,e){return Pc.copy(t).applyQuaternion(this.quaternion),this.position.add(Pc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ic,t)}translateY(t){return this.translateOnAxis(Lc,t)}translateZ(t){return this.translateOnAxis(Nc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?fr.copy(t):fr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(ls,fr,this.up):Rn.lookAt(fr,ls,this.up),this.quaternion.setFromRotationMatrix(Rn),s&&(Rn.extractRotation(s.matrixWorld),wi.setFromRotationMatrix(Rn),this.quaternion.premultiply(wi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Pt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Dc),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null):Pt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(cd),Wo.child=t,this.dispatchEvent(Wo),Wo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Dc),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,t,od),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,ld,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let p=l[c];r(t.shapes,p)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),p=a(t.shapes),u=a(t.skeletons),m=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),u.length>0&&(n.skeletons=u),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ae.DEFAULT_UP=new U(0,1,0);Ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ln=class extends Ae{constructor(){super(),this.isGroup=!0,this.type="Group"}},hd={type:"move"},Yi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ln,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ln,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ln,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let M of t.hand.values()){let f=e.getJointPose(M,n),d=this._getHandJoint(c,M);f!==null&&(d.matrix.fromArray(f.transform.matrix),d.matrix.decompose(d.position,d.quaternion,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=f.radius),d.visible=f!==null}let h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=h.position.distanceTo(p.position),m=.02,_=.005;c.inputState.pinching&&u>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(hd)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ln;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Gh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yn={h:0,s:0,l:0},pr={h:0,s:0,l:0};function Xo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Rt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=We){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ht.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Ht.workingColorSpace){return this.r=t,this.g=e,this.b=n,Ht.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Ht.workingColorSpace){if(t=td(t,1),e=Wt(e,0,1),n=Wt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Xo(a,r,t+1/3),this.g=Xo(a,r,t),this.b=Xo(a,r,t-1/3)}return Ht.colorSpaceToWorking(this,s),this}setStyle(t,e=We){function n(r){r!==void 0&&parseFloat(r)<1&&At("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:At("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);At("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=We){let n=Gh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):At("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Dn(t.r),this.g=Dn(t.g),this.b=Dn(t.b),this}copyLinearToSRGB(t){return this.r=Vi(t.r),this.g=Vi(t.g),this.b=Vi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=We){return Ht.workingToColorSpace(De.copy(this),t),Math.round(Wt(De.r*255,0,255))*65536+Math.round(Wt(De.g*255,0,255))*256+Math.round(Wt(De.b*255,0,255))}getHexString(t=We){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Ht.workingColorSpace){Ht.workingToColorSpace(De.copy(this),e);let n=De.r,s=De.g,r=De.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let p=a-o;switch(c=h<=.5?p/(a+o):p/(2-a-o),a){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Ht.workingColorSpace){return Ht.workingToColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=We){Ht.workingToColorSpace(De.copy(this),t);let e=De.r,n=De.g,s=De.b;return t!==We?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Yn),this.setHSL(Yn.h+t,Yn.s+e,Yn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Yn),t.getHSL(pr);let n=zo(Yn.h,pr.h,e),s=zo(Yn.s,pr.s,e),r=zo(Yn.l,pr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},De=new Rt;Rt.NAMES=Gh;var Pe=class extends Ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fn,this.environmentIntensity=1,this.environmentRotation=new Fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},rn=new U,Cn=new U,qo=new U,Pn=new U,Ri=new U,Ci=new U,Uc=new U,Yo=new U,Zo=new U,Jo=new U,$o=new se,Ko=new se,Qo=new se,Nn=class i{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),rn.subVectors(t,e),s.cross(rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){rn.subVectors(s,e),Cn.subVectors(n,e),qo.subVectors(t,e);let a=rn.dot(rn),o=rn.dot(Cn),l=rn.dot(qo),c=Cn.dot(Cn),h=Cn.dot(qo),p=a*c-o*o;if(p===0)return r.set(0,0,0),null;let u=1/p,m=(c*l-o*h)*u,_=(a*h-o*l)*u;return r.set(1-m-_,_,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Pn)===null?!1:Pn.x>=0&&Pn.y>=0&&Pn.x+Pn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Pn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Pn.x),l.addScaledVector(a,Pn.y),l.addScaledVector(o,Pn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return $o.setScalar(0),Ko.setScalar(0),Qo.setScalar(0),$o.fromBufferAttribute(t,e),Ko.fromBufferAttribute(t,n),Qo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector($o,r.x),a.addScaledVector(Ko,r.y),a.addScaledVector(Qo,r.z),a}static isFrontFacing(t,e,n,s){return rn.subVectors(n,e),Cn.subVectors(t,e),rn.cross(Cn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return rn.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),rn.cross(Cn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Ri.subVectors(s,n),Ci.subVectors(r,n),Yo.subVectors(t,n);let l=Ri.dot(Yo),c=Ci.dot(Yo);if(l<=0&&c<=0)return e.copy(n);Zo.subVectors(t,s);let h=Ri.dot(Zo),p=Ci.dot(Zo);if(h>=0&&p<=h)return e.copy(s);let u=l*p-h*c;if(u<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(n).addScaledVector(Ri,a);Jo.subVectors(t,r);let m=Ri.dot(Jo),_=Ci.dot(Jo);if(_>=0&&m<=_)return e.copy(r);let M=m*c-l*_;if(M<=0&&c>=0&&_<=0)return o=c/(c-_),e.copy(n).addScaledVector(Ci,o);let f=h*_-m*p;if(f<=0&&p-h>=0&&m-_>=0)return Uc.subVectors(r,s),o=(p-h)/(p-h+(m-_)),e.copy(s).addScaledVector(Uc,o);let d=1/(f+M+u);return a=M*d,o=u*d,e.copy(n).addScaledVector(Ri,a).addScaledVector(Ci,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},xn=class{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,an):an.fromBufferAttribute(r,a),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),mr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),mr.copy(n.boundingBox)),mr.applyMatrix4(t.matrixWorld),this.union(mr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(cs),gr.subVectors(this.max,cs),Pi.subVectors(t.a,cs),Ii.subVectors(t.b,cs),Li.subVectors(t.c,cs),Zn.subVectors(Ii,Pi),Jn.subVectors(Li,Ii),hi.subVectors(Pi,Li);let e=[0,-Zn.z,Zn.y,0,-Jn.z,Jn.y,0,-hi.z,hi.y,Zn.z,0,-Zn.x,Jn.z,0,-Jn.x,hi.z,0,-hi.x,-Zn.y,Zn.x,0,-Jn.y,Jn.x,0,-hi.y,hi.x,0];return!jo(e,Pi,Ii,Li,gr)||(e=[1,0,0,0,1,0,0,0,1],!jo(e,Pi,Ii,Li,gr))?!1:(_r.crossVectors(Zn,Jn),e=[_r.x,_r.y,_r.z],jo(e,Pi,Ii,Li,gr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},In=[new U,new U,new U,new U,new U,new U,new U,new U],an=new U,mr=new xn,Pi=new U,Ii=new U,Li=new U,Zn=new U,Jn=new U,hi=new U,cs=new U,gr=new U,_r=new U,ui=new U;function jo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ui.fromArray(i,r);let o=s.x*Math.abs(ui.x)+s.y*Math.abs(ui.y)+s.z*Math.abs(ui.z),l=t.dot(ui),c=e.dot(ui),h=n.dot(ui);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var fe=new U,xr=new It,ud=0,oe=class extends gn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ud++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Bl,this.updateRanges=[],this.gpuType=en,this.version=0,this._normalizationScale=t!==void 0?ho(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)xr.fromBufferAttribute(this,e),xr.applyMatrix3(t),this.setXY(e,xr.x,xr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyMatrix3(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyMatrix4(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.applyNormalMatrix(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)fe.fromBufferAttribute(this,e),fe.transformDirection(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):kh(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Vh(t,this.array)}};var Ts=class extends oe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ws=class extends oe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var pe=class extends oe{constructor(t,e,n){super(new Float32Array(t),e,n)}},dd=new xn,hs=new U,tl=new U,vn=class{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):dd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;hs.subVectors(t,this.center);let e=hs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(hs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(tl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(hs.copy(t.center).add(tl)),this.expandByPoint(hs.copy(t.center).sub(tl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},fd=0,Ke=new Zt,el=new Ae,Ni=new U,Ge=new xn,us=new xn,Ee=new U,he=class i extends gn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Mi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Qu(t)?ws:Ts)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Lt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ke.makeRotationFromQuaternion(t),this.applyMatrix4(Ke),this}rotateX(t){return Ke.makeRotationX(t),this.applyMatrix4(Ke),this}rotateY(t){return Ke.makeRotationY(t),this.applyMatrix4(Ke),this}rotateZ(t){return Ke.makeRotationZ(t),this.applyMatrix4(Ke),this}translate(t,e,n){return Ke.makeTranslation(t,e,n),this.applyMatrix4(Ke),this}scale(t,e,n){return Ke.makeScale(t,e,n),this.applyMatrix4(Ke),this}lookAt(t){return el.lookAt(t),el.updateMatrix(),this.applyMatrix4(el.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new pe(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&At("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Pt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Ge.setFromBufferAttribute(r),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,Ge.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,Ge.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint(Ge.min),this.boundingBox.expandByPoint(Ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Pt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Pt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){let n=this.boundingSphere.center;if(Ge.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];us.setFromBufferAttribute(o),this.morphTargetsRelative?(Ee.addVectors(Ge.min,us.min),Ge.expandByPoint(Ee),Ee.addVectors(Ge.max,us.max),Ge.expandByPoint(Ee)):(Ge.expandByPoint(us.min),Ge.expandByPoint(us.max))}Ge.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ee.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ee));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ee.fromBufferAttribute(o,c),l&&(Ni.fromBufferAttribute(t,c),Ee.add(Ni)),s=Math.max(s,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Pt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Pt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new oe(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let L=0;L<n.count;L++)o[L]=new U,l[L]=new U;let h=new U,p=new U,u=new U,m=new It,_=new It,M=new It,f=new U,d=new U;function y(L,C,D){c[L]=c[C]=c[D]=1,h.fromBufferAttribute(n,L),p.fromBufferAttribute(n,C),u.fromBufferAttribute(n,D),m.fromBufferAttribute(r,L),_.fromBufferAttribute(r,C),M.fromBufferAttribute(r,D),p.sub(h),u.sub(h),_.sub(m),M.sub(m);let F=1/(_.x*M.y-M.x*_.y);isFinite(F)&&(f.copy(p).multiplyScalar(M.y).addScaledVector(u,-_.y).multiplyScalar(F),d.copy(u).multiplyScalar(_.x).addScaledVector(p,-M.x).multiplyScalar(F),o[L].add(f),o[C].add(f),o[D].add(f),l[L].add(d),l[C].add(d),l[D].add(d))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let L=0,C=w.length;L<C;++L){let D=w[L],F=D.start,G=D.count;for(let P=F,V=F+G;P<V;P+=3)y(t.getX(P+0),t.getX(P+1),t.getX(P+2))}let S=new U,A=new U,T=new U,g=new U;function b(L){T.fromBufferAttribute(s,L),g.copy(T);let C=o[L];S.copy(C),S.sub(T.multiplyScalar(T.dot(C))).normalize(),A.crossVectors(g,C);let F=A.dot(l[L])<0?-1:1;a.setXYZW(L,S.x,S.y,S.z,F)}for(let L=0,C=n.count;L<C;++L)c[L]&&b(L);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new oe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,m=n.count;u<m;u++)n.setXYZ(u,0,0,0);let s=new U,r=new U,a=new U,o=new U,l=new U,c=new U,h=new U,p=new U;if(t)for(let u=0,m=t.count;u<m;u+=3){let _=t.getX(u+0),M=t.getX(u+1),f=t.getX(u+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,M),a.fromBufferAttribute(e,f),h.subVectors(a,r),p.subVectors(s,r),h.cross(p),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,M),c.fromBufferAttribute(n,f),o.add(h),l.add(h),c.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let u=0,m=e.count;u<m;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),p.subVectors(s,r),h.cross(p),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,p=o.normalized,u=new c.constructor(l.length*h),m=0,_=0;for(let M=0,f=l.length;M<f;M++){o.isInterleavedBufferAttribute?m=l[M]*o.data.stride+o.offset:m=l[M]*h;for(let d=0;d<h;d++)u[_++]=c[m++]}return new oe(u,h,p)}if(this.index===null)return At("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,p=c.length;h<p;h++){let u=c[h],m=t(u,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let p=0,u=c.length;p<u;p++){let m=c[p];h.push(m.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],p=r[c];for(let u=0,m=p.length;u<m;u++)h.push(p[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let p=a[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},na=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Bl,this.updateRanges=[],this.version=0,this.uuid=Mi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});let e=Fc(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=this.array.slice(0).buffer);let n=new this.array.constructor(t.arrayBuffers[e]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});let e=Fc(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:e,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function Fc(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=Mi()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}var Be=new U,As=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s,this._normalizationScale=t!==void 0?ho(t.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=this._denormalize(e)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=this._denormalize(e)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=this._denormalize(e)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=this._denormalize(e)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Ss("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new oe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Ss("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):kh(t,this.data.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Vh(t,this.data.array)}},nl=new U,pd=new U,md=new Lt,on=class{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=nl.subVectors(n,e).cross(pd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(nl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||md.getNormalMatrix(t),s=this.coplanarPoint(nl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},gd=0,cn=class extends gn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=Mi(),this.name="",this.type="Material",this.blending=Qi,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vl,this.blendDst=yl,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Rt(0,0,0),this.blendAlpha=0,this.depthFunc=Gi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ph,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=kr,this.stencilZFail=kr,this.stencilZPass=kr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){At(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){At(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Rt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new on().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new It().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new It().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Zi=class extends cn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Rt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Di,ds=new U,Ui=new U,Fi=new U,Oi=new It,fs=new It,Wh=new Zt,vr=new U,ps=new U,yr=new U,Oc=new It,il=new It,Bc=new It,Rs=class extends Ae{constructor(t=new Zi){if(super(),this.isSprite=!0,this.type="Sprite",Di===void 0){Di=new he;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new na(e,5);Di.setIndex([0,1,2,0,2,3]),Di.setAttribute("position",new As(n,3,0,!1)),Di.setAttribute("uv",new As(n,2,3,!1))}this.geometry=Di,this.material=t,this.center=new It(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Pt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ui.setFromMatrixScale(this.matrixWorld),Wh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Fi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ui.multiplyScalar(-Fi.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Mr(vr.set(-.5,-.5,0),Fi,a,Ui,s,r),Mr(ps.set(.5,-.5,0),Fi,a,Ui,s,r),Mr(yr.set(.5,.5,0),Fi,a,Ui,s,r),Oc.set(0,0),il.set(1,0),Bc.set(1,1);let o=t.ray.intersectTriangle(vr,ps,yr,!1,ds);if(o===null&&(Mr(ps.set(-.5,.5,0),Fi,a,Ui,s,r),il.set(0,1),o=t.ray.intersectTriangle(vr,yr,ps,!1,ds),o===null))return;let l=t.ray.origin.distanceTo(ds);l<t.near||l>t.far||e.push({distance:l,point:ds.clone(),uv:Nn.getInterpolation(ds,vr,ps,yr,Oc,il,Bc,new It),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}toJSON(t){let e=super.toJSON(t);return e.object.center=this.center.toArray(),e}};function Mr(i,t,e,n,s,r){Oi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(fs.x=r*Oi.x-s*Oi.y,fs.y=s*Oi.x+r*Oi.y):fs.copy(Oi),i.copy(t),i.x+=fs.x,i.y+=fs.y,i.applyMatrix4(Wh)}var Ln=new U,sl=new U,Sr=new U,br=new U,Ji=class{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ln)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Ln.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ln.copy(this.origin).addScaledVector(this.direction,e),Ln.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){sl.copy(t).add(e).multiplyScalar(.5),Sr.copy(e).sub(t).normalize(),br.copy(this.origin).sub(sl);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Sr),o=br.dot(this.direction),l=-br.dot(Sr),c=br.lengthSq(),h=Math.abs(1-a*a),p,u,m,_;if(h>0)if(p=a*l-o,u=a*o-l,_=r*h,p>=0)if(u>=-_)if(u<=_){let M=1/h;p*=M,u*=M,m=p*(p+a*u+2*o)+u*(a*p+u+2*l)+c}else u=r,p=Math.max(0,-(a*u+o)),m=-p*p+u*(u+2*l)+c;else u=-r,p=Math.max(0,-(a*u+o)),m=-p*p+u*(u+2*l)+c;else u<=-_?(p=Math.max(0,-(-a*r+o)),u=p>0?-r:Math.min(Math.max(-r,-l),r),m=-p*p+u*(u+2*l)+c):u<=_?(p=0,u=Math.min(Math.max(-r,-l),r),m=u*(u+2*l)+c):(p=Math.max(0,-(a*r+o)),u=p>0?r:Math.min(Math.max(-r,-l),r),m=-p*p+u*(u+2*l)+c);else u=a>0?-r:r,p=Math.max(0,-(a*u+o)),m=-p*p+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(sl).addScaledVector(Sr,u),m}intersectSphere(t,e){if(t.radius<0)return null;Ln.subVectors(t.center,this.origin);let n=Ln.dot(this.direction),s=Ln.dot(Ln)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),p>=0?(o=(t.min.z-u.z)*p,l=(t.max.z-u.z)*p):(o=(t.max.z-u.z)*p,l=(t.min.z-u.z)*p),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Ln)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,p=t.x-a.x,u=t.y-a.y,m=t.z-a.z,_=e.x-a.x,M=e.y-a.y,f=e.z-a.z,d=n.x-a.x,y=n.y-a.y,w=n.z-a.z,S=Math.abs(l),A=Math.abs(c),T=Math.abs(h),g,b,L,C,D,F,G,P,V,q,k,et;if(S>=A&&S>=T?(L=l,F=p,V=_,et=d,l>=0?(g=c,b=h,C=u,D=m,G=M,P=f,q=y,k=w):(g=h,b=c,C=m,D=u,G=f,P=M,q=w,k=y)):A>=T?(L=c,F=u,V=M,et=y,c>=0?(g=h,b=l,C=m,D=p,G=f,P=_,q=w,k=d):(g=l,b=h,C=p,D=m,G=_,P=f,q=d,k=w)):(L=h,F=m,V=f,et=w,h>=0?(g=l,b=c,C=p,D=u,G=_,P=M,q=d,k=y):(g=c,b=l,C=u,D=p,G=M,P=_,q=y,k=d)),L===0)return null;let X=g/L,Q=b/L,j=1/L,Mt=C-X*F,Dt=D-Q*F,J=G-X*V,pt=P-Q*V,xt=q-X*et,Tt=k-Q*et,mt=xt*pt-Tt*J,Ft=Mt*Tt-Dt*xt,ue=J*Dt-pt*Mt;if(s){if(mt<0||Ft<0||ue<0)return null}else if((mt<0||Ft<0||ue<0)&&(mt>0||Ft>0||ue>0))return null;let Ct=mt+Ft+ue;if(Ct===0)return null;let Jt=j*(mt*F+Ft*V+ue*et);return(Ct>0?Jt<0:Jt>0)?null:this.at(Jt/Ct,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ia=class extends cn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=ba,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},zc=new Zt,di=new Ji,Er=new vn,Hc=new U,Tr=new U,wr=new U,Ar=new U,rl=new U,Rr=new U,kc=new U,Cr=new U,le=class extends Ae{constructor(t=new he,e=new ia){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Rr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],p=r[l];h!==0&&(rl.fromBufferAttribute(p,t),a?Rr.addScaledVector(rl,h):Rr.addScaledVector(rl.sub(e),h))}e.add(Rr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Er.copy(n.boundingSphere),Er.applyMatrix4(r),di.copy(t.ray).recast(t.near),!(Er.containsPoint(di.origin)===!1&&(di.intersectSphere(Er,Hc)===null||di.origin.distanceToSquared(Hc)>(t.far-t.near)**2))&&(zc.copy(r).invert(),di.copy(t.ray).applyMatrix4(zc),!(n.boundingBox!==null&&di.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,di)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,p=r.attributes.normal,u=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,M=u.length;_<M;_++){let f=u[_],d=a[f.materialIndex],y=Math.max(f.start,m.start),w=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let S=y,A=w;S<A;S+=3){let T=o.getX(S),g=o.getX(S+1),b=o.getX(S+2);s=Pr(this,d,t,n,c,h,p,T,g,b),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{let _=Math.max(0,m.start),M=Math.min(o.count,m.start+m.count);for(let f=_,d=M;f<d;f+=3){let y=o.getX(f),w=o.getX(f+1),S=o.getX(f+2);s=Pr(this,a,t,n,c,h,p,y,w,S),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,M=u.length;_<M;_++){let f=u[_],d=a[f.materialIndex],y=Math.max(f.start,m.start),w=Math.min(l.count,Math.min(f.start+f.count,m.start+m.count));for(let S=y,A=w;S<A;S+=3){let T=S,g=S+1,b=S+2;s=Pr(this,d,t,n,c,h,p,T,g,b),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{let _=Math.max(0,m.start),M=Math.min(l.count,m.start+m.count);for(let f=_,d=M;f<d;f+=3){let y=f,w=f+1,S=f+2;s=Pr(this,a,t,n,c,h,p,y,w,S),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}}};function _d(i,t,e,n,s,r,a,o){let l;if(t.side===He?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ni,o),l===null)return null;Cr.copy(o),Cr.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Cr);return c<e.near||c>e.far?null:{distance:c,point:Cr.clone(),object:i}}function Pr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Tr),i.getVertexPosition(l,wr),i.getVertexPosition(c,Ar);let h=_d(i,t,e,n,Tr,wr,Ar,kc);if(h){let p=new U;Nn.getBarycoord(kc,Tr,wr,Ar,p),s&&(h.uv=Nn.getInterpolatedAttribute(s,o,l,c,p,new It)),r&&(h.uv1=Nn.getInterpolatedAttribute(r,o,l,c,p,new It)),a&&(h.normal=Nn.getInterpolatedAttribute(a,o,l,c,p,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new U,materialIndex:0};Nn.getNormal(Tr,wr,Ar,u.normal),h.face=u,h.barycoord=p}return h}var mi=class extends ze{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Te,h=Te,p,u){super(null,a,o,l,c,h,s,r,p,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Cs=class extends oe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Bi=new Zt,Vc=new Zt,Ir=[],Gc=new xn,xd=new Zt,ms=new le,gs=new vn,Ps=class extends le{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Cs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,xd)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new xn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Bi),Gc.copy(t.boundingBox).applyMatrix4(Bi),this.boundingBox.union(Gc)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new vn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Bi),gs.copy(t.boundingSphere).applyMatrix4(Bi),this.boundingSphere.union(gs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(ms.geometry=this.geometry,ms.material=this.material,ms.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),gs.copy(this.boundingSphere),gs.applyMatrix4(n),t.ray.intersectsSphere(gs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Bi),Vc.multiplyMatrices(n,Bi),ms.matrixWorld=Vc,ms.raycast(t,Ir);for(let a=0,o=Ir.length;a<o;a++){let l=Ir[a];l.instanceId=r,l.object=this,e.push(l)}Ir.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Cs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new mi(new Float32Array(s*this.count),s,this.count,es,en));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},fi=new vn,vd=new It(.5,.5),Lr=new U,Kn=class{constructor(t=new on,e=new on,n=new on,s=new on,r=new on,a=new on){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=je,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],p=r[5],u=r[6],m=r[7],_=r[8],M=r[9],f=r[10],d=r[11],y=r[12],w=r[13],S=r[14],A=r[15];if(s[0].setComponents(c-a,m-h,d-_,A-y).normalize(),s[1].setComponents(c+a,m+h,d+_,A+y).normalize(),s[2].setComponents(c+o,m+p,d+M,A+w).normalize(),s[3].setComponents(c-o,m-p,d-M,A-w).normalize(),n)s[4].setComponents(l,u,f,S).normalize(),s[5].setComponents(c-l,m-u,d-f,A-S).normalize();else if(s[4].setComponents(c-l,m-u,d-f,A-S).normalize(),e===je)s[5].setComponents(c+l,m+u,d+f,A+S).normalize();else if(e===Wi)s[5].setComponents(l,u,f,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(t){fi.center.set(0,0,0);let e=vd.distanceTo(t.center);return fi.radius=.7071067811865476+e,fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Lr.x=s.normal.x>0?t.max.x:t.min.x,Lr.y=s.normal.y>0?t.max.y:t.min.y,Lr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Lr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Wc=new Zt,sa=class i{constructor(){this.coordinateSystem=je,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];Wc.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Kn),n[s].setFromProjectionMatrix(Wc,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new Kn),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new i().copy(this)}};var gi=class extends cn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},ra=new U,aa=new U,Xc=new Zt,_s=new Ji,Nr=new vn,al=new U,qc=new U,Is=class extends Ae{constructor(t=new he,e=new gi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)ra.fromBufferAttribute(e,s-1),aa.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=ra.distanceTo(aa);t.setAttribute("lineDistance",new pe(n,1))}else At("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere),Nr.applyMatrix4(s),Nr.radius+=r,t.ray.intersectsSphere(Nr)===!1)return;Xc.copy(s).invert(),_s.copy(t.ray).applyMatrix4(Xc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let m=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let M=m,f=_-1;M<f;M+=c){let d=h.getX(M),y=h.getX(M+1),w=Dr(this,t,_s,l,d,y,M);w&&e.push(w)}if(this.isLineLoop){let M=h.getX(_-1),f=h.getX(m),d=Dr(this,t,_s,l,M,f,_-1);d&&e.push(d)}}else{let m=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let M=m,f=_-1;M<f;M+=c){let d=Dr(this,t,_s,l,M,M+1,M);d&&e.push(d)}if(this.isLineLoop){let M=Dr(this,t,_s,l,_-1,m,_-1);M&&e.push(M)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Dr(i,t,e,n,s,r,a){let o=i.geometry.attributes.position;if(ra.fromBufferAttribute(o,s),aa.fromBufferAttribute(o,r),e.distanceSqToSegment(ra,aa,al,qc)>n)return;al.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(al);if(!(c<t.near||c>t.far))return{distance:c,point:qc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Yc=new U,Zc=new U,Ls=class extends Is{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Yc.fromBufferAttribute(e,s),Zc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Yc.distanceTo(Zc);t.setAttribute("lineDistance",new pe(n,1))}else At("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ns=class extends Is{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}},yn=class extends cn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Jc=new Zt,dl=new Ji,Ur=new vn,Fr=new U,Mn=class extends Ae{constructor(t=new he,e=new yn){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ur.copy(n.boundingSphere),Ur.applyMatrix4(s),Ur.radius+=r,t.ray.intersectsSphere(Ur)===!1)return;Jc.copy(s).invert(),dl.copy(t.ray).applyMatrix4(Jc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,p=n.attributes.position;if(c!==null){let u=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let _=u,M=m;_<M;_++){let f=c.getX(_);Fr.fromBufferAttribute(p,f),$c(Fr,f,l,s,t,e,this)}}else{let u=Math.max(0,a.start),m=Math.min(p.count,a.start+a.count);for(let _=u,M=m;_<M;_++)Fr.fromBufferAttribute(p,_),$c(Fr,_,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function $c(i,t,e,n,s,r,a){let o=dl.distanceSqToPoint(i);if(o<e){let l=new U;dl.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Ds=class extends ze{constructor(t=[],e=vi,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Us=class extends ze{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var On=class extends ze{constructor(t,e,n=hn,s,r,a,o=Te,l=Te,c,h=Un,p=1){if(h!==Un&&h!==zn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:p};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new qi(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Fs=class extends On{constructor(t,e=hn,n=vi,s,r,a=Te,o=Te,l,c=Un){let h={width:t,height:t,depth:1},p=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Os=class extends ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Qn=class i extends he{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],p=[],u=0,m=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new pe(c,3)),this.setAttribute("normal",new pe(h,3)),this.setAttribute("uv",new pe(p,2));function _(M,f,d,y,w,S,A,T,g,b,L){let C=S/g,D=A/b,F=S/2,G=A/2,P=T/2,V=g+1,q=b+1,k=0,et=0,X=new U;for(let Q=0;Q<q;Q++){let j=Q*D-G;for(let Mt=0;Mt<V;Mt++){let Dt=Mt*C-F;X[M]=Dt*y,X[f]=j*w,X[d]=P,c.push(X.x,X.y,X.z),X[M]=0,X[f]=0,X[d]=T>0?1:-1,h.push(X.x,X.y,X.z),p.push(Mt/g),p.push(1-Q/b),k+=1}}for(let Q=0;Q<b;Q++)for(let j=0;j<g;j++){let Mt=u+j+V*Q,Dt=u+j+V*(Q+1),J=u+(j+1)+V*(Q+1),pt=u+(j+1)+V*Q;l.push(Mt,Dt,pt),l.push(Dt,J,pt),et+=6}o.addGroup(m,et,L),m+=et,u+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Bs=class i extends he{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],p=[],u=[],m=[],_=0,M=[],f=n/2,d=0;y(),a===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new pe(p,3)),this.setAttribute("normal",new pe(u,3)),this.setAttribute("uv",new pe(m,2));function y(){let S=new U,A=new U,T=0,g=(e-t)/n;for(let b=0;b<=r;b++){let L=[],C=b/r,D=C*(e-t)+t;for(let F=0;F<=s;F++){let G=F/s,P=G*l+o,V=Math.sin(P),q=Math.cos(P);A.x=D*V,A.y=-C*n+f,A.z=D*q,p.push(A.x,A.y,A.z),S.set(V,g,q).normalize(),u.push(S.x,S.y,S.z),m.push(G,1-C),L.push(_++)}M.push(L)}for(let b=0;b<s;b++)for(let L=0;L<r;L++){let C=M[L][b],D=M[L+1][b],F=M[L+1][b+1],G=M[L][b+1];(t>0||L!==0)&&(h.push(C,D,G),T+=3),(e>0||L!==r-1)&&(h.push(D,F,G),T+=3)}c.addGroup(d,T,0),d+=T}function w(S){let A=_,T=new It,g=new U,b=0,L=S===!0?t:e,C=S===!0?1:-1;for(let F=1;F<=s;F++)p.push(0,f*C,0),u.push(0,C,0),m.push(.5,.5),_++;let D=_;for(let F=0;F<=s;F++){let P=F/s*l+o,V=Math.cos(P),q=Math.sin(P);g.x=L*q,g.y=f*C,g.z=L*V,p.push(g.x,g.y,g.z),u.push(0,C,0),T.x=V*.5+.5,T.y=q*.5*C+.5,m.push(T.x,T.y),_++}for(let F=0;F<s;F++){let G=A+F,P=D+F;S===!0?h.push(P,P+1,G):h.push(P+1,P,G),b+=3}c.addGroup(d,b,S===!0?1:2),d+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var oa=class i extends he{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new pe(r,3)),this.setAttribute("normal",new pe(r.slice(),3)),this.setAttribute("uv",new pe(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){let w=new U,S=new U,A=new U;for(let T=0;T<e.length;T+=3)m(e[T+0],w),m(e[T+1],S),m(e[T+2],A),l(w,S,A,y)}function l(y,w,S,A){let T=A+1,g=[];for(let b=0;b<=T;b++){g[b]=[];let L=y.clone().lerp(S,b/T),C=w.clone().lerp(S,b/T),D=T-b;for(let F=0;F<=D;F++)F===0&&b===T?g[b][F]=L:g[b][F]=L.clone().lerp(C,F/D)}for(let b=0;b<T;b++)for(let L=0;L<2*(T-b)-1;L++){let C=Math.floor(L/2);L%2===0?(u(g[b][C+1]),u(g[b+1][C]),u(g[b][C])):(u(g[b][C+1]),u(g[b+1][C+1]),u(g[b+1][C]))}}function c(y){let w=new U;for(let S=0;S<r.length;S+=3)w.x=r[S+0],w.y=r[S+1],w.z=r[S+2],w.normalize().multiplyScalar(y),r[S+0]=w.x,r[S+1]=w.y,r[S+2]=w.z}function h(){let y=new U;for(let w=0;w<r.length;w+=3){y.x=r[w+0],y.y=r[w+1],y.z=r[w+2];let S=f(y)/2/Math.PI+.5,A=d(y)/Math.PI+.5;a.push(S,1-A)}_(),p()}function p(){for(let y=0;y<a.length;y+=6){let w=a[y+0],S=a[y+2],A=a[y+4],T=Math.max(w,S,A),g=Math.min(w,S,A);T>.9&&g<.1&&(w<.2&&(a[y+0]+=1),S<.2&&(a[y+2]+=1),A<.2&&(a[y+4]+=1))}}function u(y){r.push(y.x,y.y,y.z)}function m(y,w){let S=y*3;w.x=t[S+0],w.y=t[S+1],w.z=t[S+2]}function _(){let y=new U,w=new U,S=new U,A=new U,T=new It,g=new It,b=new It;for(let L=0,C=0;L<r.length;L+=9,C+=6){y.set(r[L+0],r[L+1],r[L+2]),w.set(r[L+3],r[L+4],r[L+5]),S.set(r[L+6],r[L+7],r[L+8]),T.set(a[C+0],a[C+1]),g.set(a[C+2],a[C+3]),b.set(a[C+4],a[C+5]),A.copy(y).add(w).add(S).divideScalar(3);let D=f(A);M(T,C+0,y,D),M(g,C+2,w,D),M(b,C+4,S,D)}}function M(y,w,S,A){A<0&&y.x===1&&(a[w]=y.x-1),S.x===0&&S.z===0&&(a[w]=A/2/Math.PI+.5)}function f(y){return Math.atan2(y.z,-y.x)}function d(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}};var zs=class i extends oa{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var Sn=class i extends he{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,p=t/o,u=e/l,m=[],_=[],M=[],f=[];for(let d=0;d<h;d++){let y=d*u-a;for(let w=0;w<c;w++){let S=w*p-r;_.push(S,-y,0),M.push(0,0,1),f.push(w/o),f.push(1-d/l)}}for(let d=0;d<l;d++)for(let y=0;y<o;y++){let w=y+c*d,S=y+c*(d+1),A=y+1+c*(d+1),T=y+1+c*d;m.push(w,S,T),m.push(S,A,T)}this.setIndex(m),this.setAttribute("position",new pe(_,3)),this.setAttribute("normal",new pe(M,3)),this.setAttribute("uv",new pe(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};function Si(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Kc(s))s.isRenderTargetTexture?(At("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Kc(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Fe(i){let t={};for(let e=0;e<i.length;e++){let n=Si(i[e]);for(let s in n)t[s]=n[s]}return t}function Kc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function yd(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function kl(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ht.workingColorSpace}var Xh={clone:Si,merge:Fe},Md=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ce=class extends cn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Md,this.fragmentShader=Sd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Si(t.uniforms),this.uniformsGroups=yd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Rt().setHex(s.value);break;case"v2":this.uniforms[n].value=new It().fromArray(s.value);break;case"v3":this.uniforms[n].value=new U().fromArray(s.value);break;case"v4":this.uniforms[n].value=new se().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Lt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Zt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},la=class extends ce{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Hs=class extends cn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=co,this.normalScale=new It(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=ba,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},ca=class extends cn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ha=class extends cn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function zi(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Or(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var jn=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ua=class extends jn{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:cl,endingEnd:cl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case hl:r=t,o=2*e-n;break;case ul:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case hl:a=t,l=2*n-e;break;case ul:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,p=this._offsetNext,u=this._weightPrev,m=this._weightNext,_=(n-e)/(s-e),M=_*_,f=M*_,d=-u*f+2*u*M-u*_,y=(1+u)*f+(-1.5-2*u)*M+(-.5+u)*_+1,w=(-1-m)*f+(1.5+m)*M+.5*_,S=m*f-m*M;for(let A=0;A!==o;++A)r[A]=d*a[h+A]+y*a[c+A]+w*a[l+A]+S*a[p+A];return r}},da=class extends jn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),p=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*p+a[l+u]*h;return r}},fa=class extends jn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},pa=class extends jn{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let _=(n-e)/(s-e),M=1-_;for(let f=0;f!==o;++f)r[f]=a[c+f]*M+a[l+f]*_;return r}let u=o*2,m=t-1;for(let _=0;_!==o;++_){let M=a[c+_],f=a[l+_],d=m*u+_*2,y=p[d],w=p[d+1],S=t*u+_*2,A=h[S],T=h[S+1],g=Ed(n,e,y,A,s);r[_]=qh(g,M,w,T,f)}return r}};function qh(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function bd(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Ed(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=qh(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let l=bd(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var qe=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=zi(e,this.TimeBufferType),this.values=zi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:zi(t.times,Array),values:zi(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Or(t.settings)&&(n.settings={inTangents:zi(t.settings.inTangents,Array),outTangents:zi(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new fa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new da(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ua(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new pa(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case vs:e=this.InterpolantFactoryMethodDiscrete;break;case Kr:e=this.InterpolantFactoryMethodLinear;break;case Hr:e=this.InterpolantFactoryMethodSmooth;break;case ll:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return At("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return vs;case this.InterpolantFactoryMethodLinear:return Kr;case this.InterpolantFactoryMethodSmooth:return Hr;case this.InterpolantFactoryMethodBezier:return ll}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t;Or(this.settings)&&(Qc(this.settings.inTangents,t),Qc(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Or(this.settings)&&(jc(this.settings.inTangents,t),jc(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Pt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Pt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Pt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Pt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&ju(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Pt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Hr,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let p=o*n,u=p-n,m=p+n;for(let _=0;_!==n;++_){let M=e[p+_];if(M!==e[u+_]||M!==e[m+_]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let p=o*n,u=a*n;for(let m=0;m!==n;++m)e[u+m]=e[p+m]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Or(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Qc(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]+=t}function jc(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}qe.prototype.ValueTypeName="";qe.prototype.TimeBufferType=Float32Array;qe.prototype.ValueBufferType=Float32Array;qe.prototype.DefaultInterpolation=Kr;var ti=class extends qe{constructor(t,e,n){super(t,e,n)}};ti.prototype.ValueTypeName="bool";ti.prototype.ValueBufferType=Array;ti.prototype.DefaultInterpolation=vs;ti.prototype.InterpolantFactoryMethodLinear=void 0;ti.prototype.InterpolantFactoryMethodSmooth=void 0;var ma=class extends qe{constructor(t,e,n,s){super(t,e,n,s)}};ma.prototype.ValueTypeName="color";var ga=class extends qe{constructor(t,e,n,s){super(t,e,n,s)}};ga.prototype.ValueTypeName="number";var _a=class extends jn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)_n.slerpFlat(r,0,a,c-o,a,c,l);return r}},ks=class extends qe{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new _a(this.times,this.values,this.getValueSize(),t)}};ks.prototype.ValueTypeName="quaternion";ks.prototype.InterpolantFactoryMethodSmooth=void 0;var ei=class extends qe{constructor(t,e,n){super(t,e,n)}};ei.prototype.ValueTypeName="string";ei.prototype.ValueBufferType=Array;ei.prototype.DefaultInterpolation=vs;ei.prototype.InterpolantFactoryMethodLinear=void 0;ei.prototype.InterpolantFactoryMethodSmooth=void 0;var xa=class extends qe{constructor(t,e,n,s){super(t,e,n,s)}};xa.prototype.ValueTypeName="vector";var va=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,p){return c.push(h,p),this},this.removeHandler=function(h){let p=c.indexOf(h);return p!==-1&&c.splice(p,2),this},this.getHandler=function(h){for(let p=0,u=c.length;p<u;p+=2){let m=c[p],_=c[p+1];if(m.global&&(m.lastIndex=0),m.test(h))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Yh=new va,ya=class{constructor(t){this.manager=t!==void 0?t:Yh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};ya.DEFAULT_MATERIAL_NAME="__DEFAULT";var Vs=class extends Ae{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Rt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var ol=new Zt,th=new U,eh=new U,Ma=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new It(512,512),this.mapType=Ue,this.map=null,this.mapPass=null,this.matrix=new Zt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Kn,this._frameExtents=new It(1,1),this._viewportCount=1,this._viewports=[new se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;th.setFromMatrixPosition(t.matrixWorld),e.position.copy(th),eh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(eh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){ol.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(ol,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Wi||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(ol)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Br=new U,zr=new _n,mn=new U,Gs=class extends Ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Zt,this.projectionMatrix=new Zt,this.projectionMatrixInverse=new Zt,this.coordinateSystem=je,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Br,zr,mn),mn.x===1&&mn.y===1&&mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Br,zr,mn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Br,zr,mn),mn.x===1&&mn.y===1&&mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Br,zr,mn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},$n=new U,nh=new It,ih=new It,jt=class extends Gs{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Qr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Bo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Qr*2*Math.atan(Math.tan(Bo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($n.x,$n.y).multiplyScalar(-t/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($n.x,$n.y).multiplyScalar(-t/$n.z)}getViewSize(t,e){return this.getViewBounds(t,nh,ih),e.subVectors(ih,nh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Bo*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Ws=class extends Gs{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},fl=class extends Ma{constructor(){super(new Ws(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Xs=class extends Vs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.target=new Ae,this.shadow=new fl}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},qs=class extends Vs{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Hi=-90,ki=1,$i=class extends Ae{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new jt(Hi,ki,t,e);s.layers=this.layers,this.add(s);let r=new jt(Hi,ki,t,e);r.layers=this.layers,this.add(r);let a=new jt(Hi,ki,t,e);a.layers=this.layers,this.add(a);let o=new jt(Hi,ki,t,e);o.layers=this.layers,this.add(o);let l=new jt(Hi,ki,t,e);l.layers=this.layers,this.add(l);let c=new jt(Hi,ki,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===je)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Wi)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,p=t.getRenderTarget(),u=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let M=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let f=!1;t.isWebGLRenderer===!0?f=t.state.buffers.depth.getReversed():f=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=M,t.setRenderTarget(n,5,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(p,u,m),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},Sa=class extends jt{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var Vl="\\[\\]\\.:\\/",Td=new RegExp("["+Vl+"]","g"),Gl="[^"+Vl+"]",wd="[^"+Vl.replace("\\.","")+"]",Ad=/((?:WC+[\/:])*)/.source.replace("WC",Gl),Rd=/(WCOD+)?/.source.replace("WCOD",wd),Cd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Gl),Pd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Gl),Id=new RegExp("^"+Ad+Rd+Cd+Pd+"$"),Ld=["material","materials","bones","map"],pl=class{constructor(t,e,n){let s=n||ee.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ee=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Td,"")}static parseTrackName(t){let e=Id.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Ld.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){At("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Pt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Pt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Pt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Pt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Pt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Pt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Pt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Pt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Pt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Pt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ee.Composite=pl;ee.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ee.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ee.prototype.GetterByBindingType=[ee.prototype._getValue_direct,ee.prototype._getValue_array,ee.prototype._getValue_arrayElement,ee.prototype._getValue_toArray];ee.prototype.SetterByBindingTypeAndVersioning=[[ee.prototype._setValue_direct,ee.prototype._setValue_direct_setNeedsUpdate,ee.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_array,ee.prototype._setValue_array_setNeedsUpdate,ee.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_arrayElement,ee.prototype._setValue_arrayElement_setNeedsUpdate,ee.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_fromArray,ee.prototype._setValue_fromArray_setNeedsUpdate,ee.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Z0=new Float32Array(1);var ml=class{static{this.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};function Wl(i,t,e,n){let s=Nd(n);switch(e){case Nl:return i*t;case es:return i*t/s.components*s.byteLength;case Pa:return i*t/s.components*s.byteLength;case ii:return i*t*2/s.components*s.byteLength;case Ia:return i*t*2/s.components*s.byteLength;case Dl:return i*t*3/s.components*s.byteLength;case dn:return i*t*4/s.components*s.byteLength;case La:return i*t*4/s.components*s.byteLength;case Js:case $s:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ks:case Qs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Da:case Fa:return Math.max(i,16)*Math.max(t,8)/4;case Na:case Ua:return Math.max(i,8)*Math.max(t,8)/2;case Oa:case Ba:case Ha:case ka:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case za:case js:case Va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ga:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Wa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Xa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case qa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ya:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Za:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ja:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case $a:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ja:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case to:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case eo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case no:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case io:case so:case ro:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ao:case oo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case tr:case lo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Nd(i){switch(i){case Ue:case Cl:return{byteLength:1,components:1};case ts:case Pl:case un:return{byteLength:2,components:1};case Ra:case Ca:return{byteLength:2,components:4};case hn:case Aa:case en:return{byteLength:4,components:1};case Il:case Ll:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?At("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function mu(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Ud(i){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,p=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function n(o,l,c){let h=l.array,p=l.updateRanges;if(i.bindBuffer(c,o),p.length===0)i.bufferSubData(c,0,h);else{p.sort((m,_)=>m.start-_.start);let u=0;for(let m=1;m<p.length;m++){let _=p[u],M=p[m];M.start<=_.start+_.count+1?_.count=Math.max(_.count,M.start+M.count-_.start):(++u,p[u]=M)}p.length=u+1;for(let m=0,_=p.length;m<_;m++){let M=p[m];i.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Fd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Od=`#ifdef USE_ALPHAHASH
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
#endif`,Bd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vd=`#ifdef USE_AOMAP
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
#endif`,Gd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wd=`#ifdef USE_BATCHING
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
#endif`,Xd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Jd=`#ifdef USE_IRIDESCENCE
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
#endif`,$d=`#ifdef USE_BUMPMAP
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
#endif`,Kd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ef=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,nf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,sf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,rf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,af=`#define PI 3.141592653589793
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
} // validated`,of=`vec3 transformedNormal = objectNormal;
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
#endif`,lf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,df="gl_FragColor = linearToOutputTexel( gl_FragColor );",ff=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pf=`#ifdef USE_ENVMAP
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
#endif`,mf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,gf=`#ifdef USE_ENVMAP
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
#endif`,_f=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xf=`#ifdef USE_ENVMAP
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
#endif`,vf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Mf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bf=`#ifdef USE_GRADIENTMAP
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
}`,Ef=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Tf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Af=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Rf=`#ifdef USE_ENVMAP
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
#endif`,Cf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,If=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Lf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Nf=`PhysicalMaterial material;
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
#endif`,Df=`uniform sampler2D dfgLUT;
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
}`,Uf=`
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
#endif`,Ff=`#if defined( RE_IndirectDiffuse )
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
#endif`,Of=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bf=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,zf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Gf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,qf=`#if defined( USE_POINTS_UV )
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
#endif`,Yf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$f=`#if defined( USE_MORPHCOLORS )
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
#endif`,Kf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qf=`#ifdef USE_MORPHTARGETS
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
#endif`,jf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ep=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,np=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ip=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,rp=`#ifdef USE_NORMALMAP
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
#endif`,ap=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,op=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,up=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,dp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_p=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Mp=`float getShadowMask() {
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
}`,Sp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bp=`#ifdef USE_SKINNING
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
#endif`,Ep=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tp=`#ifdef USE_SKINNING
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
#endif`,wp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ap=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pp=`#ifdef USE_TRANSMISSION
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
#endif`,Ip=`#ifdef USE_TRANSMISSION
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
#endif`,Lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Up=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Fp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Op=`uniform sampler2D t2D;
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
}`,Bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zp=`uniform float backgroundBlurriness;
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
}`,Hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vp=`#include <common>
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
}`,Gp=`#if DEPTH_PACKING == 3200
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
}`,Wp=`#define DISTANCE
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
}`,Xp=`#define DISTANCE
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
}`,qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zp=`uniform float scale;
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
}`,Jp=`uniform vec3 diffuse;
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
}`,$p=`#include <common>
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
}`,Kp=`uniform vec3 diffuse;
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
}`,Qp=`#define LAMBERT
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
}`,jp=`#define LAMBERT
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
}`,tm=`#define MATCAP
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
}`,em=`#define MATCAP
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
}`,nm=`#define NORMAL
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
}`,im=`#define NORMAL
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
}`,sm=`#define PHONG
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
}`,rm=`#define PHONG
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
}`,am=`#define STANDARD
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
}`,om=`#define STANDARD
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
}`,lm=`#define TOON
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
}`,cm=`#define TOON
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
}`,hm=`uniform float size;
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
}`,um=`uniform vec3 diffuse;
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
}`,dm=`#include <common>
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
}`,fm=`uniform vec3 color;
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
}`,pm=`uniform float rotation;
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
}`,mm=`uniform vec3 diffuse;
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
}`,zt={alphahash_fragment:Fd,alphahash_pars_fragment:Od,alphamap_fragment:Bd,alphamap_pars_fragment:zd,alphatest_fragment:Hd,alphatest_pars_fragment:kd,aomap_fragment:Vd,aomap_pars_fragment:Gd,batching_pars_vertex:Wd,batching_vertex:Xd,begin_vertex:qd,beginnormal_vertex:Yd,bsdfs:Zd,iridescence_fragment:Jd,bumpmap_pars_fragment:$d,clipping_planes_fragment:Kd,clipping_planes_pars_fragment:Qd,clipping_planes_pars_vertex:jd,clipping_planes_vertex:tf,color_fragment:ef,color_pars_fragment:nf,color_pars_vertex:sf,color_vertex:rf,common:af,defaultnormal_vertex:of,displacementmap_pars_vertex:lf,displacementmap_vertex:cf,emissivemap_fragment:hf,emissivemap_pars_fragment:uf,colorspace_fragment:df,colorspace_pars_fragment:ff,envmap_fragment:pf,envmap_common_pars_fragment:mf,envmap_pars_fragment:gf,envmap_pars_vertex:_f,envmap_physical_pars_fragment:Rf,envmap_vertex:xf,fog_vertex:vf,fog_pars_vertex:yf,fog_fragment:Mf,fog_pars_fragment:Sf,gradientmap_pars_fragment:bf,lightmap_pars_fragment:Ef,lights_lambert_fragment:Tf,lights_lambert_pars_fragment:wf,lights_pars_begin:Af,lights_toon_fragment:Cf,lights_toon_pars_fragment:Pf,lights_phong_fragment:If,lights_phong_pars_fragment:Lf,lights_physical_fragment:Nf,lights_physical_pars_fragment:Df,lights_fragment_begin:Uf,lights_fragment_maps:Ff,lights_fragment_end:Of,lightprobes_pars_fragment:Bf,logdepthbuf_fragment:zf,logdepthbuf_pars_fragment:Hf,logdepthbuf_pars_vertex:kf,logdepthbuf_vertex:Vf,map_fragment:Gf,map_pars_fragment:Wf,map_particle_fragment:Xf,map_particle_pars_fragment:qf,metalnessmap_fragment:Yf,metalnessmap_pars_fragment:Zf,morphinstance_vertex:Jf,morphcolor_vertex:$f,morphnormal_vertex:Kf,morphtarget_pars_vertex:Qf,morphtarget_vertex:jf,normal_fragment_begin:tp,normal_fragment_maps:ep,normal_pars_fragment:np,normal_pars_vertex:ip,normal_vertex:sp,normalmap_pars_fragment:rp,clearcoat_normal_fragment_begin:ap,clearcoat_normal_fragment_maps:op,clearcoat_pars_fragment:lp,iridescence_pars_fragment:cp,opaque_fragment:hp,packing:up,premultiplied_alpha_fragment:dp,project_vertex:fp,dithering_fragment:pp,dithering_pars_fragment:mp,roughnessmap_fragment:gp,roughnessmap_pars_fragment:_p,shadowmap_pars_fragment:xp,shadowmap_pars_vertex:vp,shadowmap_vertex:yp,shadowmask_pars_fragment:Mp,skinbase_vertex:Sp,skinning_pars_vertex:bp,skinning_vertex:Ep,skinnormal_vertex:Tp,specularmap_fragment:wp,specularmap_pars_fragment:Ap,tonemapping_fragment:Rp,tonemapping_pars_fragment:Cp,transmission_fragment:Pp,transmission_pars_fragment:Ip,uv_pars_fragment:Lp,uv_pars_vertex:Np,uv_vertex:Dp,worldpos_vertex:Up,background_vert:Fp,background_frag:Op,backgroundCube_vert:Bp,backgroundCube_frag:zp,cube_vert:Hp,cube_frag:kp,depth_vert:Vp,depth_frag:Gp,distance_vert:Wp,distance_frag:Xp,equirect_vert:qp,equirect_frag:Yp,linedashed_vert:Zp,linedashed_frag:Jp,meshbasic_vert:$p,meshbasic_frag:Kp,meshlambert_vert:Qp,meshlambert_frag:jp,meshmatcap_vert:tm,meshmatcap_frag:em,meshnormal_vert:nm,meshnormal_frag:im,meshphong_vert:sm,meshphong_frag:rm,meshphysical_vert:am,meshphysical_frag:om,meshtoon_vert:lm,meshtoon_frag:cm,points_vert:hm,points_frag:um,shadow_vert:dm,shadow_frag:fm,sprite_vert:pm,sprite_frag:mm},ft={common:{diffuse:{value:new Rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},envMapRotation:{value:new Lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new It(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new Rt(16777215)},opacity:{value:1},center:{value:new It(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},Tn={basic:{uniforms:Fe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:Fe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Rt(0)},envMapIntensity:{value:1}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:Fe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Rt(0)},specular:{value:new Rt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:Fe([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new Rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:Fe([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new Rt(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:Fe([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:Fe([ft.points,ft.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:Fe([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:Fe([ft.common,ft.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:Fe([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:Fe([ft.sprite,ft.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Lt}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distance:{uniforms:Fe([ft.common,ft.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distance_vert,fragmentShader:zt.distance_frag},shadow:{uniforms:Fe([ft.lights,ft.fog,{color:{value:new Rt(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};Tn.physical={uniforms:Fe([Tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new It(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Lt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new Rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new It},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new Rt(0)},specularColor:{value:new Rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new It},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};var uo={r:0,b:0,g:0},gm=new Zt,gu=new Lt;gu.set(-1,0,0,0,1,0,0,0,1);function _m(i,t,e,n,s,r){let a=new Rt(0),o=s===!0?0:1,l,c,h=null,p=0,u=null;function m(y){let w=y.isScene===!0?y.background:null;if(w&&w.isTexture){let S=y.backgroundBlurriness>0;w=t.get(w,S)}return w}function _(y){let w=!1,S=m(y);S===null?f(a,o):S&&S.isColor&&(f(S,1),w=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(y,w){let S=m(w);S&&S.isCubeTexture?(c===void 0&&(c=new le(new Qn(1,1,1),new ce({name:"BackgroundCubeMaterial",uniforms:Si(Tn.backgroundCube.uniforms),vertexShader:Tn.backgroundCube.vertexShader,fragmentShader:Tn.backgroundCube.fragmentShader,side:He,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,g){this.matrixWorld.copyPosition(g.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(gm.makeRotationFromEuler(w.backgroundRotation)).transpose(),S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(gu),c.material.toneMapped=Ht.getTransfer(S.colorSpace)!==Yt,(h!==S||p!==S.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=S,p=S.version,u=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new le(new Sn(2,2),new ce({name:"BackgroundMaterial",uniforms:Si(Tn.background.uniforms),vertexShader:Tn.background.vertexShader,fragmentShader:Tn.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Ht.getTransfer(S.colorSpace)!==Yt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||p!==S.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=S,p=S.version,u=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function f(y,w){y.getRGB(uo,kl(i)),e.buffers.color.setClear(uo.r,uo.g,uo.b,w,r)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,w=1){a.set(y),o=w,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,f(a,o)},render:_,addToRenderList:M,dispose:d}}function xm(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(D,F,G,P,V){let q=!1,k=p(D,P,G,F);r!==k&&(r=k,c(r.object)),q=m(D,P,G,V),q&&_(D,P,G,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,S(D,F,G,P),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return i.createVertexArray()}function c(D){return i.bindVertexArray(D)}function h(D){return i.deleteVertexArray(D)}function p(D,F,G,P){let V=P.wireframe===!0,q=n[F.id];q===void 0&&(q={},n[F.id]=q);let k=D.isInstancedMesh===!0?D.id:0,et=q[k];et===void 0&&(et={},q[k]=et);let X=et[G.id];X===void 0&&(X={},et[G.id]=X);let Q=X[V];return Q===void 0&&(Q=u(l()),X[V]=Q),Q}function u(D){let F=[],G=[],P=[];for(let V=0;V<e;V++)F[V]=0,G[V]=0,P[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:G,attributeDivisors:P,object:D,attributes:{},index:null}}function m(D,F,G,P){let V=r.attributes,q=F.attributes,k=0,et=G.getAttributes();for(let X in et)if(et[X].location>=0){let j=V[X],Mt=q[X];if(Mt===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(Mt=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(Mt=D.instanceColor)),j===void 0||j.attribute!==Mt||Mt&&j.data!==Mt.data)return!0;k++}return r.attributesNum!==k||r.index!==P}function _(D,F,G,P){let V={},q=F.attributes,k=0,et=G.getAttributes();for(let X in et)if(et[X].location>=0){let j=q[X];j===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(j=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(j=D.instanceColor));let Mt={};Mt.attribute=j,j&&j.data&&(Mt.data=j.data),V[X]=Mt,k++}r.attributes=V,r.attributesNum=k,r.index=P}function M(){let D=r.newAttributes;for(let F=0,G=D.length;F<G;F++)D[F]=0}function f(D){d(D,0)}function d(D,F){let G=r.newAttributes,P=r.enabledAttributes,V=r.attributeDivisors;G[D]=1,P[D]===0&&(i.enableVertexAttribArray(D),P[D]=1),V[D]!==F&&(i.vertexAttribDivisor(D,F),V[D]=F)}function y(){let D=r.newAttributes,F=r.enabledAttributes;for(let G=0,P=F.length;G<P;G++)F[G]!==D[G]&&(i.disableVertexAttribArray(G),F[G]=0)}function w(D,F,G,P,V,q,k){k===!0?i.vertexAttribIPointer(D,F,G,V,q):i.vertexAttribPointer(D,F,G,P,V,q)}function S(D,F,G,P){M();let V=P.attributes,q=G.getAttributes(),k=F.defaultAttributeValues;for(let et in q){let X=q[et];if(X.location>=0){let Q=V[et];if(Q===void 0&&(et==="instanceMatrix"&&D.instanceMatrix&&(Q=D.instanceMatrix),et==="instanceColor"&&D.instanceColor&&(Q=D.instanceColor)),Q!==void 0){let j=Q.normalized,Mt=Q.itemSize,Dt=t.get(Q);if(Dt===void 0)continue;let J=Dt.buffer,pt=Dt.type,xt=Dt.bytesPerElement,Tt=pt===i.INT||pt===i.UNSIGNED_INT||Q.gpuType===Aa;if(Q.isInterleavedBufferAttribute){let mt=Q.data,Ft=mt.isInterleavedBuffer===!0?mt.stride:mt.itemSize,ue=Q.offset;if(mt.isInstancedInterleavedBuffer||mt.isInstancedBufferAttribute){for(let Ct=0;Ct<X.locationSize;Ct++)d(X.location+Ct,mt.meshPerAttribute);D.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let Ct=0;Ct<X.locationSize;Ct++)f(X.location+Ct);i.bindBuffer(i.ARRAY_BUFFER,J);for(let Ct=0;Ct<X.locationSize;Ct++)w(X.location+Ct,Mt/X.locationSize,pt,j,Ft*xt,(ue+Mt/X.locationSize*Ct)*xt,Tt)}else{if(Q.isInstancedBufferAttribute){for(let mt=0;mt<X.locationSize;mt++)d(X.location+mt,Q.meshPerAttribute);D.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let mt=0;mt<X.locationSize;mt++)f(X.location+mt);i.bindBuffer(i.ARRAY_BUFFER,J);for(let mt=0;mt<X.locationSize;mt++)w(X.location+mt,Mt/X.locationSize,pt,j,Mt*xt,Mt/X.locationSize*mt*xt,Tt)}}else if(k!==void 0){let j=k[et];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(X.location,j);break;case 3:i.vertexAttrib3fv(X.location,j);break;case 4:i.vertexAttrib4fv(X.location,j);break;default:i.vertexAttrib1fv(X.location,j)}}}}y()}function A(){L();for(let D in n){let F=n[D];for(let G in F){let P=F[G];for(let V in P){let q=P[V];for(let k in q)h(q[k].object),delete q[k];delete P[V]}}delete n[D]}}function T(D){if(n[D.id]===void 0)return;let F=n[D.id];for(let G in F){let P=F[G];for(let V in P){let q=P[V];for(let k in q)h(q[k].object),delete q[k];delete P[V]}}delete n[D.id]}function g(D){for(let F in n){let G=n[F];for(let P in G){let V=G[P];if(V[D.id]===void 0)continue;let q=V[D.id];for(let k in q)h(q[k].object),delete q[k];delete V[D.id]}}}function b(D){for(let F in n){let G=n[F],P=D.isInstancedMesh===!0?D.id:0,V=G[P];if(V!==void 0){for(let q in V){let k=V[q];for(let et in k)h(k[et].object),delete k[et];delete V[q]}delete G[P],Object.keys(G).length===0&&delete n[F]}}}function L(){C(),a=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:C,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:b,releaseStatesOfProgram:g,initAttributes:M,enableAttribute:f,disableUnusedAttributes:y}}function vm(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let m=0;m<h;m++)u+=c[m];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function ym(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let g=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(g.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(g){return!(g!==dn&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(g){let b=g===un&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(g!==Ue&&g!==en&&!b&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(g){if(g==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";g="mediump"}return g==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(At("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let p=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=e.logarithmicDepthBuffer===!0&&p===!1;e.reversedDepthBuffer===!0&&p===!1&&At("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&p===!0&&At("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:p,maxTextures:m,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:f,maxAttributes:d,maxVertexUniforms:y,maxVaryings:w,maxFragmentUniforms:S,maxSamples:A,samples:T}}function Mm(i){let t=this,e=null,n=0,s=!1,r=!1,a=new on,o=new Lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){let m=p.length!==0||u||n!==0||s;return s=u,n=p.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,u){e=h(p,u,0)},this.setState=function(p,u,m){let _=p.clippingPlanes,M=p.clipIntersection,f=p.clipShadows,d=i.get(p);if(!s||_===null||_.length===0||r&&!f)r?h(null):c();else{let y=r?0:n,w=y*4,S=d.clippingState||null;l.value=S,S=h(_,u,w,m);for(let A=0;A!==w;++A)S[A]=e[A];d.clippingState=S,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(p,u,m,_){let M=p!==null?p.length:0,f=null;if(M!==0){if(f=l.value,_!==!0||f===null){let d=m+M*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(f===null||f.length<d)&&(f=new Float32Array(d));for(let w=0,S=m;w!==M;++w,S+=4)a.copy(p[w]).applyMatrix4(y,o),a.normal.toArray(f,S),f[S+3]=a.constant}l.value=f,l.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,f}}var ir=class extends Xe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ds(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Qn(5,5,5),r=new ce({name:"CubemapFromEquirect",uniforms:Si(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:He,blending:_i});r.uniforms.tEquirect.value=e;let a=new le(s,r),o=e.minFilter;return e.minFilter===Bn&&(e.minFilter=we),new $i(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},Zh=256,Sm=3,bm=20,_u=256,xu=16,Em=3,Tm=new U,wm=new Rt,po=class i{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new $i(1,10,null),this._boxMesh=new le(new Qn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=Tm}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let p=l.autoClear,u=l.autoClearColor,m=l.autoClearDepth,_=l.autoClearStencil,M=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,M===null&&(t.background=l.getClearColor(wm));let f=new $i(n,s,h);return f.position.copy(o),f.update(l,t),l.autoClear=p,l.autoClearColor=u,l.autoClearDepth=m,l.autoClearStencil=_,t.background=M,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$h(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Zh,Hh(t))}_fromTexture(t,e){t.mapping===vi||t.mapping===ji?this._setSize(t.image.length===0?Zh:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=Jh(t,!1,!1),n=Math.log2(t)-Sm;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Jh(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===vi||t.mapping===ji?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kh()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=$h()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Am(),this._integrationMaterial=Rm());let e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/xu);for(let a=0;a<=n;a++){let o=i.lodToRoughness(a,n);if(a>n-Em)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/(_u*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Cm());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}};function Jh(i,t,e){return new ir(i,{minFilter:Bn,generateMipmaps:t,type:un,colorSpace:pi,depthBuffer:e})}function sr(i,t,e){return new ce({name:i,uniforms:t,vertexShader:zt.cube_vert,fragmentShader:e,side:He,blending:_i,depthTest:!1,depthWrite:!1})}function Am(){return sr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${_u}u

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
	`)}function Rm(){return sr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:xu}},`

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
	`)}function Cm(){return sr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${bm}
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
	`)}function $h(){return sr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function Kh(){return sr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Pm(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,m=!1){return u==null?null:m?a(u):r(u)}function r(u){if(u&&u.isTexture){let m=u.mapping;if(m===Ea||m===Ta)if(t.has(u)){let _=t.get(u).texture;return o(_,u.mapping)}else{let _=u.image;if(_&&_.height>0){let M=new ir(_.height);return M.fromEquirectangularTexture(i,u),t.set(u,M),u.addEventListener("dispose",c),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let m=u.mapping,_=m===Ea||m===Ta,M=m===vi||m===ji;if(_||M){let f=e.get(u),d=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return n===null&&(n=new po(i)),f=_?n.fromEquirectangular(u,f):n.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,e.set(u,f),f.texture;if(f!==void 0)return f.texture;{let y=u.image;return _&&y&&y.height>0||M&&y&&l(y)?(n===null&&(n=new po(i)),f=_?n.fromEquirectangular(u):n.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,e.set(u,f),u.addEventListener("dispose",h),f.texture):null}}}return u}function o(u,m){return m===Ea?u.mapping=vi:m===Ta&&(u.mapping=ji),u}function l(u){let m=0,_=6;for(let M=0;M<_;M++)u[M]!==void 0&&m++;return m===_}function c(u){let m=u.target;m.removeEventListener("dispose",c);let _=t.get(m);_!==void 0&&(t.delete(m),_.dispose())}function h(u){let m=u.target;m.removeEventListener("dispose",h);let _=e.get(m);_!==void 0&&(e.delete(m),_.dispose())}function p(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function Im(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&xs("WebGLRenderer: "+n+" extension not supported."),s}}}function Lm(i,t,e,n){let s={},r=new WeakMap,a=new FinalizationRegistry(_=>delete s[_]);function o(_){l(_.target)}function l(_){_.index!==null&&t.remove(_.index);for(let f in _.attributes)t.remove(_.attributes[f]);_.removeEventListener("dispose",o),delete s[_.id],a.unregister(_);let M=r.get(_);M&&(t.remove(M),r.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,e.memory.geometries--}function c(_,M){return s[M.id]!==void 0||(M.addEventListener("dispose",o),s[M.id]=new WeakRef(M),a.register(M,M.id,M),e.memory.geometries++),M}function h(_){let M=_.attributes;for(let f in M)t.update(M[f],i.ARRAY_BUFFER)}function p(_){let M=_.index,f=_.attributes.position,d=0;if(f===void 0)return;let y=M!==null?M.array.length:f.array.length/3-1,w=f.count>=65535?ws:Ts,S=new w(Math.ceil(y/3)*6,1),A=S.array;if(M!==null){let g=M.array;d=M.version;for(let b=0,L=0;b<y;b+=3){let C=g[b+0],D=g[b+1],F=g[b+2];A[L++]=C,A[L++]=D,A[L++]=D,A[L++]=F,A[L++]=F,A[L++]=C}}else{d=f.version;for(let g=0,b=0;g<y;g+=3){let L=g+0,C=g+1,D=g+2;A[b++]=L,A[b++]=C,A[b++]=C,A[b++]=D,A[b++]=D,A[b++]=L}}S.version=d;let T=r.get(_);T&&t.remove(T),r.set(_,S)}function u(_){let M=r.get(_);if(M){let f=_.index;f!==null&&M.version<f.version&&p(_)}else p(_);return r.get(_)}function m(){for(let _ in s){let M=s[_].deref();M!==void 0&&l(M)}}return{get:c,update:h,getWireframeAttribute:u,dispose:m}}function Nm(i,t,e){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,u){i.drawElements(n,u,r,p*a),e.update(u,n,1)}function c(p,u,m){m!==0&&(i.drawElementsInstanced(n,u,r,p*a,m),e.update(u,n,m))}function h(p,u,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,p,0,m);let M=0;for(let f=0;f<m;f++)M+=u[f];e.update(M,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Dm(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Pt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Um(i,t,e){let n=new WeakMap,s=new se;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==p){let L=function(){g.dispose(),n.delete(o),o.removeEventListener("dispose",L)};u!==void 0&&u.texture.dispose();let m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],w=0;m===!0&&(w=1),_===!0&&(w=2),M===!0&&(w=3);let S=o.attributes.position.count*w,A=1;S>t.maxTextureSize&&(A=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);let T=new Float32Array(S*A*4*p),g=new bs(T,S,A,p);g.type=en,g.needsUpdate=!0;let b=w*4;for(let C=0;C<p;C++){let D=f[C],F=d[C],G=y[C],P=S*A*4*C;for(let V=0;V<D.count;V++){let q=V*b;m===!0&&(s.fromBufferAttribute(D,V),T[P+q+0]=s.x,T[P+q+1]=s.y,T[P+q+2]=s.z,T[P+q+3]=0),_===!0&&(s.fromBufferAttribute(F,V),T[P+q+4]=s.x,T[P+q+5]=s.y,T[P+q+6]=s.z,T[P+q+7]=0),M===!0&&(s.fromBufferAttribute(G,V),T[P+q+8]=s.x,T[P+q+9]=s.y,T[P+q+10]=s.z,T[P+q+11]=G.itemSize===4?s.w:1)}}u={count:p,texture:g,size:new It(S,A)},n.set(o,u),o.addEventListener("dispose",L)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let M=0;M<c.length;M++)m+=c[M];let _=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Fm(i,t,e,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,p=c.geometry,u=t.get(c,p);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let m=c.skeleton;r.get(m)!==h&&(m.update(),r.set(m,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var Om={[Ml]:"LINEAR_TONE_MAPPING",[Sl]:"REINHARD_TONE_MAPPING",[bl]:"CINEON_TONE_MAPPING",[El]:"ACES_FILMIC_TONE_MAPPING",[wl]:"AGX_TONE_MAPPING",[Al]:"NEUTRAL_TONE_MAPPING",[Tl]:"CUSTOM_TONE_MAPPING"};function Bm(i,t,e,n,s,r){let a=new Xe(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new he;h.setAttribute("position",new pe([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new pe([0,2,0,0,2,0],2));let p=new la({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new le(h,p),m=new Ws(-1,1,1,-1,0,1),_=null,M=null,f=!1,d,y=null,w=[],S=!1;this.setSize=function(A,T){a.setSize(A,T),o!==null&&o.setSize(A,T),l!==null&&l.setSize(A,T);for(let g=0;g<w.length;g++){let b=w[g];b.setSize&&b.setSize(A,T)}},this.setEffects=function(A){w=A,S=w.length>0&&w[0].isRenderPass===!0;let T=a.width,g=a.height;w.length>0&&o===null&&(o=new Xe(T,g,{type:un,depthBuffer:!1,stencilBuffer:!1}),l=new Xe(T,g,{type:un,depthBuffer:!1,stencilBuffer:!1}));let b=s===!0&&w.some(L=>L.needsDepthTexture===!0);b!==(a.depthTexture!==null)&&(b===!0&&c===null&&(c=new On(T,g),r===!0&&(c.format=zn,c.type=yi)),a.dispose(),a.depthTexture=b?c:null,a.resolveDepthBuffer=b,a.storeMultisampledDepthBuffer=b);for(let L=0;L<w.length;L++){let C=w[L];C.setSize&&C.setSize(T,g),b&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(c)}},this.begin=function(A,T){if(f||A.toneMapping===bn&&w.length===0)return!1;if(y=T,T!==null){let g=T.width,b=T.height;(a.width!==g||a.height!==b)&&this.setSize(g,b)}return S===!1&&A.setRenderTarget(a),d=A.toneMapping,A.toneMapping=bn,!0},this.hasRenderPass=function(){return S},this.end=function(A,T){A.toneMapping=d,f=!0;let g=a,b=o;for(let L=0;L<w.length;L++){let C=w[L];C.enabled!==!1&&(C.render(A,b,g,T),C.needsSwap!==!1&&(g=b,b=b===o?l:o))}if(_!==A.outputColorSpace||M!==A.toneMapping){_=A.outputColorSpace,M=A.toneMapping,p.defines={},Ht.getTransfer(_)===Yt&&(p.defines.SRGB_TRANSFER="");let L=Om[M];L&&(p.defines[L]=""),p.needsUpdate=!0}p.uniforms.tDiffuse.value=g.texture,A.setRenderTarget(y),A.render(u,m),y=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),p.dispose()}}var vu=new ze,yu=new On(1,1),Mu=new Fs(1),Su=new bs,bu=new ea,Eu=new Ds,Qh=[],jh=[],tu=new Float32Array(16),eu=new Float32Array(9),nu=new Float32Array(4);function is(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Qh[s];if(r===void 0&&(r=new Float32Array(s),Qh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function ve(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ye(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function go(i,t){let e=jh[t];e===void 0&&(e=new Int32Array(t),jh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function zm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Hm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2fv(this.addr,t),ye(e,t)}}function km(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ve(e,t))return;i.uniform3fv(this.addr,t),ye(e,t)}}function Vm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4fv(this.addr,t),ye(e,t)}}function Gm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(ve(e,n))return;nu.set(n),i.uniformMatrix2fv(this.addr,!1,nu),ye(e,n)}}function Wm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(ve(e,n))return;eu.set(n),i.uniformMatrix3fv(this.addr,!1,eu),ye(e,n)}}function Xm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(ve(e,n))return;tu.set(n),i.uniformMatrix4fv(this.addr,!1,tu),ye(e,n)}}function qm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ym(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2iv(this.addr,t),ye(e,t)}}function Zm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;i.uniform3iv(this.addr,t),ye(e,t)}}function Jm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4iv(this.addr,t),ye(e,t)}}function $m(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Km(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2uiv(this.addr,t),ye(e,t)}}function Qm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;i.uniform3uiv(this.addr,t),ye(e,t)}}function jm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4uiv(this.addr,t),ye(e,t)}}function _o(i){return i.version===0&&(i.compareFunction=Ol,i.needsUpdate=!0),i}function tg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=_o(yu):r=vu,e.setTexture2D(t||r,s)}function eg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||bu,s)}function ng(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=_o(Mu):r=Eu,e.setTextureCube(t||r,s)}function ig(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Su,s)}function sg(i){switch(i){case 5126:return zm;case 35664:return Hm;case 35665:return km;case 35666:return Vm;case 35674:return Gm;case 35675:return Wm;case 35676:return Xm;case 5124:case 35670:return qm;case 35667:case 35671:return Ym;case 35668:case 35672:return Zm;case 35669:case 35673:return Jm;case 5125:return $m;case 36294:return Km;case 36295:return Qm;case 36296:return jm;case 35678:case 36198:case 36298:case 36306:case 35682:return tg;case 35679:case 36299:case 36307:return eg;case 35680:case 36300:case 36308:case 36293:return ng;case 36289:case 36303:case 36311:case 36292:return ig}}function rg(i,t){i.uniform1fv(this.addr,t)}function ag(i,t){let e=is(t,this.size,2);i.uniform2fv(this.addr,e)}function og(i,t){let e=is(t,this.size,3);i.uniform3fv(this.addr,e)}function lg(i,t){let e=is(t,this.size,4);i.uniform4fv(this.addr,e)}function cg(i,t){let e=is(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function hg(i,t){let e=is(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function ug(i,t){let e=is(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function dg(i,t){i.uniform1iv(this.addr,t)}function fg(i,t){i.uniform2iv(this.addr,t)}function pg(i,t){i.uniform3iv(this.addr,t)}function mg(i,t){i.uniform4iv(this.addr,t)}function gg(i,t){i.uniform1uiv(this.addr,t)}function _g(i,t){i.uniform2uiv(this.addr,t)}function xg(i,t){i.uniform3uiv(this.addr,t)}function vg(i,t){i.uniform4uiv(this.addr,t)}function yg(i,t,e){let n=this.cache,s=t.length,r=go(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=_o(yu):a=vu;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Mg(i,t,e){let n=this.cache,s=t.length,r=go(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||bu,r[a])}function Sg(i,t,e){let n=this.cache,s=t.length,r=go(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=_o(Mu):a=Eu;for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a,r[o])}function bg(i,t,e){let n=this.cache,s=t.length,r=go(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Su,r[a])}function Eg(i){switch(i){case 5126:return rg;case 35664:return ag;case 35665:return og;case 35666:return lg;case 35674:return cg;case 35675:return hg;case 35676:return ug;case 5124:case 35670:return dg;case 35667:case 35671:return fg;case 35668:case 35672:return pg;case 35669:case 35673:return mg;case 5125:return gg;case 36294:return _g;case 36295:return xg;case 36296:return vg;case 35678:case 36198:case 36298:case 36306:case 35682:return yg;case 35679:case 36299:case 36307:return Mg;case 35680:case 36300:case 36308:case 36293:return Sg;case 36289:case 36303:case 36311:case 36292:return bg}}var Yl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=sg(e.type)}},Zl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Eg(e.type)}},Jl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},Xl=/(\w+)(\])?(\[|\.)?/g;function iu(i,t){i.seq.push(t),i.map[t.id]=t}function Tg(i,t,e){let n=i.name,s=n.length;for(Xl.lastIndex=0;;){let r=Xl.exec(n),a=Xl.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){iu(e,c===void 0?new Yl(o,i,t):new Zl(o,i,t));break}else{let p=e.map[o];p===void 0&&(p=new Jl(o),iu(e,p)),e=p}}}var ns=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Tg(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function su(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var wg=37297,Ag=0;function Rg(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var ru=new Lt;function Cg(i){Ht._getMatrix(ru,Ht.workingColorSpace,i);let t=`mat3( ${ru.elements.map(e=>e.toFixed(4))} )`;switch(Ht.getTransfer(i)){case ys:return[t,"LinearTransferOETF"];case Yt:return[t,"sRGBTransferOETF"];default:return At("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function au(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Rg(i.getShaderSource(t),o)}else return r}function Pg(i,t){let e=Cg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Ig={[Ml]:"Linear",[Sl]:"Reinhard",[bl]:"Cineon",[El]:"ACESFilmic",[wl]:"AgX",[Al]:"Neutral",[Tl]:"Custom"};function Lg(i,t){let e=Ig[t];return e===void 0?(At("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var fo=new U;function Ng(){Ht.getLuminanceCoefficients(fo);let i=fo.x.toFixed(4),t=fo.y.toFixed(4),e=fo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Dg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(nr).join(`
`)}function Ug(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Fg(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function nr(i){return i!==""}function ou(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function lu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Og=/^[ \t]*#include +<([\w\d./]+)>/gm;function $l(i){return i.replace(Og,Bg)}function Bg(i,t){let e=zt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return $l(e)}var zg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cu(i){return i.replace(zg,Hg)}function Hg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function hu(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var kg={[Ys]:"SHADOWMAP_TYPE_PCF",[Ki]:"SHADOWMAP_TYPE_VSM"};function Vg(i){return kg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Gg={[ji]:"ENVMAP_MODE_REFRACTION"};function Wg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Gg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Xg={[ba]:"ENVMAP_BLENDING_MULTIPLY",[Th]:"ENVMAP_BLENDING_MIX",[wh]:"ENVMAP_BLENDING_ADD"};function qg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Xg[i.combine]||"ENVMAP_BLENDING_NONE"}function Yg(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Vg(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=Wg(e),p=qg(e),u=Dg(e),m=Ug(r),_=s.createProgram(),M,f,d=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(M=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(nr).join(`
`),M.length>0&&(M+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(nr).join(`
`),f.length>0&&(f+=`
`)):(M=[hu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(nr).join(`
`),f=[hu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+p:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==bn?"#define TONE_MAPPING":"",e.toneMapping!==bn?zt.tonemapping_pars_fragment:"",e.toneMapping!==bn?Lg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,Pg("linearToOutputTexel",e.outputColorSpace),Ng(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(nr).join(`
`)),a=$l(a),a=ou(a,e),a=lu(a,e),o=$l(o),o=ou(o,e),o=lu(o,e),a=cu(a),o=cu(o),e.isRawShaderMaterial!==!0&&(d=`#version 300 es
`,M=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,f=["#define varying in",e.glslVersion===Hl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Hl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let y=d+M+a,w=d+f+o,S=su(s,s.VERTEX_SHADER,y),A=su(s,s.FRAGMENT_SHADER,w);s.attachShader(_,S),s.attachShader(_,A),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function T(C){if(i.debug.checkShaderErrors){let D=s.getProgramInfoLog(_)||"",F=s.getShaderInfoLog(S)||"",G=s.getShaderInfoLog(A)||"",P=D.trim(),V=F.trim(),q=G.trim(),k=!0,et=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,S,A);else{let X=au(s,S,"vertex"),Q=au(s,A,"fragment");Pt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+P+`
`+X+`
`+Q)}else P!==""?At("WebGLProgram: Program Info Log:",P):(V===""||q==="")&&(et=!1);et&&(C.diagnostics={runnable:k,programLog:P,vertexShader:{log:V,prefix:M},fragmentShader:{log:q,prefix:f}})}s.deleteShader(S),s.deleteShader(A),g=new ns(s,_),b=Fg(s,_)}let g;this.getUniforms=function(){return g===void 0&&T(this),g};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(_,wg)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ag++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=A,this}var Zg=0,Kl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ql(t),e.set(t,n)),n}},Ql=class{constructor(t){this.id=Zg++,this.code=t,this.usedTimes=0}};function Jg(i){return i===ii||i===js||i===tr}function $g(i,t,e,n,s,r){let a=new Es,o=new Kl,l=new Set,c=[],h=new Map,p=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(g){return l.add(g),g===0?"uv":`uv${g}`}function _(g,b,L,C,D,F){let G=C.fog,P=D.geometry,V=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?C.environment:null,q=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,k=t.get(g.envMap||V,q),et=u[g.type],X=n.precision;g.precision!==null&&(X=n.getMaxPrecision(g.precision),X!==g.precision&&At("WebGLProgram.getParameters:",g.precision,"not supported, using",X,"instead."));let Q=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,j=Q!==void 0?Q.length:0,Mt=0;P.morphAttributes.position!==void 0&&(Mt=1),P.morphAttributes.normal!==void 0&&(Mt=2),P.morphAttributes.color!==void 0&&(Mt=3);let Dt,J,pt,xt;if(et){let dt=Tn[et];Dt=dt.vertexShader,J=dt.fragmentShader}else{Dt=g.vertexShader,J=g.fragmentShader;let dt=o.getVertexShaderStage(g),$t=o.getFragmentShaderStage(g);o.update(g,dt,$t),pt=dt.id,xt=$t.id}let Tt=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),Ft=D.isInstancedMesh===!0,ue=D.isBatchedMesh===!0,Ct=!!g.map,Jt=!!g.matcap,Kt=!!k,kt=Kt&&k.isPMREMTexture===!0,Re=!!g.aoMap,_e=!!g.lightMap,ke=!!g.bumpMap&&g.wireframe===!1,re=!!g.normalMap,pn=!!g.displacementMap,Me=!!g.emissiveMap,Ye=!!g.metalnessMap,Ze=!!g.roughnessMap,Je=g.anisotropy>0,N=g.clearcoat>0,$e=g.diffuseRoughness>0,ne=g.dispersion>0,ie=g.retroreflectivity>0,ut=g.iridescence>0,xe=g.sheen>0,wt=g.transmission>0,Nt=Je&&!!g.anisotropyMap,E=N&&!!g.clearcoatMap,x=N&&!!g.clearcoatNormalMap,B=N&&!!g.clearcoatRoughnessMap,tt=$e&&!!g.diffuseRoughnessMap,K=ut&&!!g.iridescenceMap,st=ut&&!!g.iridescenceThicknessMap,ct=xe&&!!g.sheenColorMap,Y=xe&&!!g.sheenRoughnessMap,Z=!!g.specularMap,at=!!g.specularColorMap,R=!!g.specularIntensityMap,$=wt&&!!g.transmissionMap,W=wt&&!!g.thicknessMap,ot=!!g.gradientMap,it=!!g.alphaMap,rt=g.alphaTest>0,bt=!!g.alphaHash,Bt=!!g.extensions,nt=bn;g.toneMapped&&(Tt===null||Tt.isXRRenderTarget===!0)&&(nt=i.toneMapping);let Et=kt?k.isCompressedCubeTexture?k.image[0].mipmaps:k.mipmaps:null,Ot={shaderID:et,shaderType:g.type,shaderName:g.name,vertexShader:Dt,fragmentShader:J,defines:g.defines,customVertexShaderID:pt,customFragmentShaderID:xt,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:X,batching:ue,batchingColor:ue&&D._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&D.instanceColor!==null,instancingMorph:Ft&&D.morphTexture!==null,outputColorSpace:Tt===null?i.outputColorSpace:Tt.isXRRenderTarget===!0?Tt.texture.colorSpace:Ht.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:Ct,matcap:Jt,envMap:Kt,envMapMode:Kt&&k.mapping,envMapPMREM:kt,envMapMaxLod:kt?Et.length-1:null,envMapSize:kt?Et[0].width:null,aoMap:Re,lightMap:_e,bumpMap:ke,normalMap:re,displacementMap:pn,emissiveMap:Me,normalMapObjectSpace:re&&g.normalMapType===Ch,normalMapTangentSpace:re&&g.normalMapType===co,packedNormalMap:re&&g.normalMapType===co&&Jg(g.normalMap.format),metalnessMap:Ye,roughnessMap:Ze,anisotropy:Je,anisotropyMap:Nt,clearcoat:N,clearcoatMap:E,clearcoatNormalMap:x,clearcoatRoughnessMap:B,diffuseRoughness:$e,diffuseRoughnessMap:tt,dispersion:ne,retroreflection:ie,iridescence:ut,iridescenceMap:K,iridescenceThicknessMap:st,sheen:xe,sheenColorMap:ct,sheenRoughnessMap:Y,specularMap:Z,specularColorMap:at,specularIntensityMap:R,transmission:wt,transmissionMap:$,thicknessMap:W,gradientMap:ot,opaque:g.transparent===!1&&g.blending===Qi&&g.alphaToCoverage===!1,alphaMap:it,alphaTest:rt,alphaHash:bt,combine:g.combine,mapUv:Ct&&m(g.map.channel),aoMapUv:Re&&m(g.aoMap.channel),lightMapUv:_e&&m(g.lightMap.channel),bumpMapUv:ke&&m(g.bumpMap.channel),normalMapUv:re&&m(g.normalMap.channel),displacementMapUv:pn&&m(g.displacementMap.channel),emissiveMapUv:Me&&m(g.emissiveMap.channel),metalnessMapUv:Ye&&m(g.metalnessMap.channel),roughnessMapUv:Ze&&m(g.roughnessMap.channel),anisotropyMapUv:Nt&&m(g.anisotropyMap.channel),clearcoatMapUv:E&&m(g.clearcoatMap.channel),clearcoatNormalMapUv:x&&m(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:B&&m(g.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:tt&&m(g.diffuseRoughnessMap.channel),iridescenceMapUv:K&&m(g.iridescenceMap.channel),iridescenceThicknessMapUv:st&&m(g.iridescenceThicknessMap.channel),sheenColorMapUv:ct&&m(g.sheenColorMap.channel),sheenRoughnessMapUv:Y&&m(g.sheenRoughnessMap.channel),specularMapUv:Z&&m(g.specularMap.channel),specularColorMapUv:at&&m(g.specularColorMap.channel),specularIntensityMapUv:R&&m(g.specularIntensityMap.channel),transmissionMapUv:$&&m(g.transmissionMap.channel),thicknessMapUv:W&&m(g.thicknessMap.channel),alphaMapUv:it&&m(g.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(re||Je),vertexNormals:!!P.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!P.attributes.uv&&(Ct||it),fog:!!G,useFog:g.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||P.attributes.normal===void 0&&re===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:mt,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:Mt,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:F.filter(dt=>dt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:nt,decodeVideoTexture:Ct&&g.map.isVideoTexture===!0&&Ht.getTransfer(g.map.colorSpace)===Yt,decodeVideoTextureEmissive:Me&&g.emissiveMap.isVideoTexture===!0&&Ht.getTransfer(g.emissiveMap.colorSpace)===Yt,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===tn,flipSided:g.side===He,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:Bt&&g.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&g.extensions.multiDraw===!0||ue)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Ot.vertexUv1s=l.has(1),Ot.vertexUv2s=l.has(2),Ot.vertexUv3s=l.has(3),l.clear(),Ot}function M(g){let b=[];if(g.shaderID?b.push(g.shaderID):(b.push(g.customVertexShaderID),b.push(g.customFragmentShaderID)),g.defines!==void 0)for(let L in g.defines)b.push(L),b.push(g.defines[L]);return g.isRawShaderMaterial===!1&&(f(b,g),d(b,g),b.push(i.outputColorSpace)),b.push(g.customProgramCacheKey),b.join()}function f(g,b){g.push(b.precision),g.push(b.outputColorSpace),g.push(b.envMapMode),g.push(b.envMapPMREM),g.push(b.envMapMaxLod),g.push(b.envMapSize),g.push(b.mapUv),g.push(b.alphaMapUv),g.push(b.lightMapUv),g.push(b.aoMapUv),g.push(b.bumpMapUv),g.push(b.normalMapUv),g.push(b.displacementMapUv),g.push(b.emissiveMapUv),g.push(b.metalnessMapUv),g.push(b.roughnessMapUv),g.push(b.anisotropyMapUv),g.push(b.clearcoatMapUv),g.push(b.clearcoatNormalMapUv),g.push(b.clearcoatRoughnessMapUv),g.push(b.diffuseRoughnessMapUv),g.push(b.iridescenceMapUv),g.push(b.iridescenceThicknessMapUv),g.push(b.sheenColorMapUv),g.push(b.sheenRoughnessMapUv),g.push(b.specularMapUv),g.push(b.specularColorMapUv),g.push(b.specularIntensityMapUv),g.push(b.transmissionMapUv),g.push(b.thicknessMapUv),g.push(b.combine),g.push(b.fogExp2),g.push(b.sizeAttenuation),g.push(b.morphTargetsCount),g.push(b.numSunLights),g.push(b.numDirLights),g.push(b.numPointLights),g.push(b.numSpotLights),g.push(b.numSpotLightMaps),g.push(b.numHemiLights),g.push(b.numRectAreaLights),g.push(b.numSunLightShadows),g.push(b.numDirLightShadows),g.push(b.numPointLightShadows),g.push(b.numSpotLightShadows),g.push(b.numSpotLightShadowsWithMaps),g.push(b.numLightProbes),g.push(b.numLightProbeGrids),g.push(b.shadowMapType),g.push(b.toneMapping),g.push(b.numClippingPlanes),g.push(b.numClipIntersection),g.push(b.depthPacking)}function d(g,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.diffuseRoughness&&a.enable(25),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),g.push(a.mask)}function y(g){let b=u[g.type],L;if(b){let C=Tn[b];L=Xh.clone(C.uniforms)}else L=g.uniforms;return L}function w(g,b){let L=h.get(b);return L!==void 0?++L.usedTimes:(L=new Yg(i,b,g,s),c.push(L),h.set(b,L)),L}function S(g){if(--g.usedTimes===0){let b=c.indexOf(g);c[b]=c[c.length-1],c.pop(),h.delete(g.cacheKey),g.destroy()}}function A(g){o.remove(g)}function T(){o.dispose()}return{getParameters:_,getProgramCacheKey:M,getUniforms:y,acquireProgram:w,releaseProgram:S,releaseShaderCache:A,programs:c,dispose:T}}function Kg(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Qg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function uu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function du(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function o(u,m,_,M,f,d){let y=i[t];return y===void 0?(y={id:u.id,object:u,geometry:m,material:_,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:f,group:d},i[t]=y):(y.id=u.id,y.object=u,y.geometry=m,y.material=_,y.materialVariant=a(u),y.groupOrder=M,y.renderOrder=u.renderOrder,y.z=f,y.group=d),t++,y}function l(u,m,_,M,f,d,y){y.reversedDepth===!0&&(f=-f);let w=o(u,m,_,M,f,d);_.transmission>0?n.push(w):_.transparent===!0?s.push(w):e.push(w)}function c(u,m,_,M,f,d){let y=o(u,m,_,M,f,d);_.transmission>0?n.unshift(y):_.transparent===!0?s.unshift(y):e.unshift(y)}function h(u,m){e.length>1&&e.sort(u||Qg),n.length>1&&n.sort(m||uu),s.length>1&&s.sort(m||uu)}function p(){for(let u=t,m=i.length;u<m;u++){let _=i[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:p,sort:h}}function jg(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new du,i.set(n,[a])):s>=r.length?(a=new du,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function t0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new U,color:new Rt};break;case"SpotLight":e={position:new U,direction:new U,color:new Rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Rt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Rt,groundColor:new Rt};break;case"RectAreaLight":e={color:new Rt,position:new U,halfWidth:new U,halfHeight:new U};break}return i[t.id]=e,e}}}function e0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var n0=0;function i0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function s0(i){let t=new t0,e=e0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);let s=new U,r=new Zt,a=new Zt;function o(c){let h=0,p=0,u=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let m=0,_=0,M=0,f=0,d=0,y=0,w=0,S=0,A=0,T=0,g=0,b=0,L=0,C=0;c.sort(i0);for(let F=0,G=c.length;F<G;F++){let P=c[F],V=P.color,q=P.intensity,k=P.distance,et=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===ii?et=P.shadow.map.texture:et=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=V.r*q,p+=V.g*q,u+=V.b*q;else if(P.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(P.sh.coefficients[X],q);C++}else if(P.isSunLight){let X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let Q=P.shadow,j=e.get(P);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[_]=j,n.sunShadowMap[_]=et;let Mt=Q.getViewportCount();for(let Dt=0;Dt<Mt;Dt++)n.sunShadowMatrix[M+Dt]=Q.getMatrix(Dt),n.sunShadowCascade[M+Dt]=Q._cascadeData[Dt];M+=Mt,_++}n.sun[m]=X,m++}else if(P.isDirectionalLight){let X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let Q=P.shadow,j=e.get(P);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,n.directionalShadow[f]=j,n.directionalShadowMap[f]=et,n.directionalShadowMatrix[f]=P.shadow.matrix,A++}n.directional[f]=X,f++}else if(P.isSpotLight){let X=t.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(V).multiplyScalar(q),X.distance=k,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,n.spot[y]=X;let Q=P.shadow;if(P.map&&(n.spotLightMap[b]=P.map,b++,Q.updateMatrices(P),P.castShadow&&L++),n.spotLightMatrix[y]=Q.matrix,P.castShadow){let j=e.get(P);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,n.spotShadow[y]=j,n.spotShadowMap[y]=et,g++}y++}else if(P.isRectAreaLight){let X=t.get(P);X.color.copy(V).multiplyScalar(q),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),n.rectArea[w]=X,w++}else if(P.isPointLight){let X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){let Q=P.shadow,j=e.get(P);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,j.shadowCameraNear=Q.camera.near,j.shadowCameraFar=Q.camera.far,n.pointShadow[d]=j,n.pointShadowMap[d]=et,n.pointShadowMatrix[d]=P.shadow.matrix,T++}n.point[d]=X,d++}else if(P.isHemisphereLight){let X=t.get(P);X.skyColor.copy(P.color).multiplyScalar(q),X.groundColor.copy(P.groundColor).multiplyScalar(q),n.hemi[S]=X,S++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ft.LTC_FLOAT_1,n.rectAreaLTC2=ft.LTC_FLOAT_2):(n.rectAreaLTC1=ft.LTC_HALF_1,n.rectAreaLTC2=ft.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=p,n.ambient[2]=u;let D=n.hash;(D.sunLength!==m||D.directionalLength!==f||D.pointLength!==d||D.spotLength!==y||D.rectAreaLength!==w||D.hemiLength!==S||D.numSunShadows!==_||D.numDirectionalShadows!==A||D.numPointShadows!==T||D.numSpotShadows!==g||D.numSpotMaps!==b||D.numLightProbes!==C)&&(n.sun.length=m,n.directional.length=f,n.spot.length=y,n.rectArea.length=w,n.point.length=d,n.hemi.length=S,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=M,n.sunShadowCascade.length=M,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=g,n.spotShadowMap.length=g,n.spotLightMatrix.length=g+b-L,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=L,n.numLightProbes=C,D.sunLength=m,D.directionalLength=f,D.pointLength=d,D.spotLength=y,D.rectAreaLength=w,D.hemiLength=S,D.numSunShadows=_,D.numDirectionalShadows=A,D.numPointShadows=T,D.numSpotShadows=g,D.numSpotMaps=b,D.numLightProbes=C,n.version=n0++)}function l(c,h){let p=0,u=0,m=0,_=0,M=0,f=0,d=h.matrixWorldInverse;for(let y=0,w=c.length;y<w;y++){let S=c[y];if(S.isSunLight){let A=n.sun[p];A.direction.setFromMatrixPosition(S.matrixWorld),A.direction.transformDirection(d),p++}else if(S.isDirectionalLight){let A=n.directional[u];A.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(d),u++}else if(S.isSpotLight){let A=n.spot[_];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(d),A.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(d),_++}else if(S.isRectAreaLight){let A=n.rectArea[M];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(d),a.identity(),r.copy(S.matrixWorld),r.premultiply(d),a.extractRotation(r),A.halfWidth.set(S.width*.5,0,0),A.halfHeight.set(0,S.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),M++}else if(S.isPointLight){let A=n.point[m];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(d),m++}else if(S.isHemisphereLight){let A=n.hemi[f];A.direction.setFromMatrixPosition(S.matrixWorld),A.direction.transformDirection(d),f++}}}return{setup:o,setupView:l,state:n}}function fu(i){let t=new s0(i),e=[],n=[],s=[];function r(p){h.camera=p,e.length=0,n.length=0,s.length=0}function a(p){p.isLightProbeGrid?s.push(p):e.push(p)}function o(p){n.push(p)}function l(){t.setup(e),s.sort((p,u)=>p.priority-u.priority||p.id-u.id)}function c(p){t.setupView(e,p)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function r0(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new fu(i),t.set(s,[o])):r>=a.length?(o=new fu(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var a0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,o0=`uniform sampler2D shadow_pass;
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
}`,l0=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],c0=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],pu=new Zt,er=new U,ql=new U;function h0(i,t,e){let n=new Kn,s=new It,r=new It,a=new se,o=new ca,l=new ha,c={},h=e.maxTextureSize,p={[ni]:He,[He]:ni,[tn]:tn},u=new ce({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new It},radius:{value:4}},vertexShader:a0,fragmentShader:o0}),m=u.clone();m.defines.HORIZONTAL_PASS=1;let _=new he;_.setAttribute("position",new oe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let M=new le(_,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ys;let d=this.type;this.render=function(T,g,b){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||T.length===0)return;this.type===ah&&(At("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ys);let L=i.getRenderTarget(),C=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),F=i.state;F.setBlending(_i),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let G=d!==this.type;G&&g.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(V=>V.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,V=T.length;P<V;P++){let q=T[P],k=q.shadow;if(k===void 0){At("WebGLShadowMap:",q,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);let et=k.getFrameExtents();s.multiply(et),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/et.x),s.x=r.x*et.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/et.y),s.y=r.y*et.y,k.mapSize.y=r.y));let X=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=X,k.map===null||G===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Ki){if(q.isPointLight){At("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Xe(s.x,s.y,{format:ii,type:un,minFilter:we,magFilter:we,generateMipmaps:!1}),k.map.texture.name=q.name+".shadowMap",k.map.depthTexture=new On(s.x,s.y,en),k.map.depthTexture.name=q.name+".shadowMapDepth",k.map.depthTexture.format=Un,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Te,k.map.depthTexture.magFilter=Te}else q.isPointLight?(k.map=new ir(s.x),k.map.depthTexture=new Fs(s.x,hn)):(k.map=new Xe(s.x,s.y),k.map.depthTexture=new On(s.x,s.y,hn)),k.map.depthTexture.name=q.name+".shadowMap",k.map.depthTexture.format=Un,this.type===Ys?(k.map.depthTexture.compareFunction=X?Fl:Ul,k.map.depthTexture.minFilter=we,k.map.depthTexture.magFilter=we):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Te,k.map.depthTexture.magFilter=Te);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==s.x||k.map.height!==s.y)&&k.map.setSize(s.x,s.y);let Q=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();q.isPointLight!==!0&&k.updateMatrices(q,b);let j=(k.camera.layers.mask&4294967294)!==0?k.camera.layers:b.layers;for(let Mt=0;Mt<Q;Mt++){let Dt=k.getCamera(Mt);if(q.isPointLight){let J=k.camera,pt=k.matrix,xt=q.distance||J.far;xt!==J.far&&(J.far=xt,J.updateProjectionMatrix()),er.setFromMatrixPosition(q.matrixWorld),J.position.copy(er),ql.copy(J.position),ql.add(l0[Mt]),J.up.copy(c0[Mt]),J.lookAt(ql),J.updateMatrixWorld(),pt.makeTranslation(-er.x,-er.y,-er.z),pu.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),k._frustum.setFromProjectionMatrix(pu,J.coordinateSystem,J.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,Mt),i.clear();else{Mt===0&&(i.setRenderTarget(k.map),i.clear());let J=k.getViewport(Mt);a.set(r.x*J.x,r.y*J.y,r.x*J.z,r.y*J.w),F.viewport(a)}n=k.getFrustum(Mt),S(g,b,Dt,q,j,this.type)}k.isPointLightShadow!==!0&&this.type===Ki&&y(k,b),k.needsUpdate=!1}d=this.type,f.needsUpdate=!1,i.setRenderTarget(L,C,D)};function y(T,g){let b=t.update(M);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null?T.mapPass=new Xe(s.x,s.y,{format:ii,type:un}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(g,null,b,u,M,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value.set(T.map.width,T.map.height),m.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(g,null,b,m,M,null)}function w(T,g,b,L){let C=null,D=b.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)C=D;else if(C=b.isPointLight===!0?l:o,i.localClippingEnabled&&g.clipShadows===!0&&Array.isArray(g.clippingPlanes)&&g.clippingPlanes.length!==0||g.displacementMap&&g.displacementScale!==0||g.alphaMap&&g.alphaTest>0||g.map&&g.alphaTest>0||g.alphaToCoverage===!0){let F=C.uuid,G=g.uuid,P=c[F];P===void 0&&(P={},c[F]=P);let V=P[G];V===void 0&&(V=C.clone(),P[G]=V,g.addEventListener("dispose",A)),C=V}if(C.visible=g.visible,C.wireframe=g.wireframe,L===Ki?C.side=g.shadowSide!==null?g.shadowSide:g.side:C.side=g.shadowSide!==null?g.shadowSide:p[g.side],C.alphaMap=g.alphaMap,C.alphaTest=g.alphaToCoverage===!0?.5:g.alphaTest,C.map=g.map,C.clipShadows=g.clipShadows,C.clippingPlanes=g.clippingPlanes,C.clipIntersection=g.clipIntersection,C.displacementMap=g.displacementMap,C.displacementScale=g.displacementScale,C.displacementBias=g.displacementBias,C.wireframeLinewidth=g.wireframeLinewidth,C.linewidth=g.linewidth,b.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let F=i.properties.get(C);F.light=b}return C}function S(T,g,b,L,C,D){if(T.visible===!1)return;if(T.layers.test(C)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&D===Ki)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,T.matrixWorld);let P=t.update(T),V=T.material;if(Array.isArray(V)){let q=P.groups;for(let k=0,et=q.length;k<et;k++){let X=q[k],Q=V[X.materialIndex];if(Q&&Q.visible){let j=w(T,Q,L,D);T.onBeforeShadow(i,T,g,b,P,j,X),i.renderBufferDirect(b,null,P,j,T,X),T.onAfterShadow(i,T,g,b,P,j,X)}}}else if(V.visible){let q=w(T,V,L,D);T.onBeforeShadow(i,T,g,b,P,q,null),i.renderBufferDirect(b,null,P,q,T,null),T.onAfterShadow(i,T,g,b,P,q,null)}}let G=T.children;for(let P=0,V=G.length;P<V;P++)S(G[P],g,b,L,C,D)}function A(T){T.target.removeEventListener("dispose",A);for(let b in c){let L=c[b],C=T.target.uuid;C in L&&(L[C].dispose(),delete L[C])}}}function u0(i,t){function e(){let R=!1,$=new se,W=null,ot=new se(0,0,0,0);return{setMask:function(it){W!==it&&!R&&(i.colorMask(it,it,it,it),W=it)},setLocked:function(it){R=it},setClear:function(it,rt,bt,Bt,nt){nt===!0&&(it*=Bt,rt*=Bt,bt*=Bt),$.set(it,rt,bt,Bt),ot.equals($)===!1&&(i.clearColor(it,rt,bt,Bt),ot.copy($))},reset:function(){R=!1,W=null,ot.set(-1,0,0,0)}}}function n(){let R=!1,$=!1,W=null,ot=null,it=null;return{setReversed:function(rt){if($!==rt){let bt=t.get("EXT_clip_control");rt?bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.ZERO_TO_ONE_EXT):bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.NEGATIVE_ONE_TO_ONE_EXT),$=rt;let Bt=it;it=null,this.setClear(Bt)}},getReversed:function(){return $},setTest:function(rt){rt?mt(i.DEPTH_TEST):Ft(i.DEPTH_TEST)},setMask:function(rt){W!==rt&&!R&&(i.depthMask(rt),W=rt)},setFunc:function(rt){if($&&(rt=zh[rt]),ot!==rt){switch(rt){case Vr:i.depthFunc(i.NEVER);break;case Gr:i.depthFunc(i.ALWAYS);break;case Wr:i.depthFunc(i.LESS);break;case Gi:i.depthFunc(i.LEQUAL);break;case Xr:i.depthFunc(i.EQUAL);break;case qr:i.depthFunc(i.GEQUAL);break;case Yr:i.depthFunc(i.GREATER);break;case Zr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ot=rt}},setLocked:function(rt){R=rt},setClear:function(rt){it!==rt&&(it=rt,$&&(rt=1-rt),i.clearDepth(rt))},reset:function(){R=!1,W=null,ot=null,it=null,$=!1}}}function s(){let R=!1,$=null,W=null,ot=null,it=null,rt=null,bt=null,Bt=null,nt=null;return{setTest:function(Et){R||(Et?mt(i.STENCIL_TEST):Ft(i.STENCIL_TEST))},setMask:function(Et){$!==Et&&!R&&(i.stencilMask(Et),$=Et)},setFunc:function(Et,Ot,dt){(W!==Et||ot!==Ot||it!==dt)&&(i.stencilFunc(Et,Ot,dt),W=Et,ot=Ot,it=dt)},setOp:function(Et,Ot,dt){(rt!==Et||bt!==Ot||Bt!==dt)&&(i.stencilOp(Et,Ot,dt),rt=Et,bt=Ot,Bt=dt)},setLocked:function(Et){R=Et},setClear:function(Et){nt!==Et&&(i.clearStencil(Et),nt=Et)},reset:function(){R=!1,$=null,W=null,ot=null,it=null,rt=null,bt=null,Bt=null,nt=null}}}let r=new e,a=new n,o=new s,l={},c=new WeakMap,h={},p={},u={},m=new WeakMap,_=[],M=null,f=!1,d=null,y=null,w=null,S=null,A=null,T=null,g=null,b=new Rt(0,0,0),L=0,C=!1,D=null,F=null,G=null,P=null,V=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,et=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(X)[1]),k=et>=1):X.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),k=et>=2);let Q=null,j={},Mt=i.getParameter(i.SCISSOR_BOX),Dt=i.getParameter(i.VIEWPORT),J=new se().fromArray(Mt),pt=new se().fromArray(Dt);function xt(R,$,W,ot){let it=new Uint8Array(4),rt=i.createTexture();i.bindTexture(R,rt),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let bt=0;bt<W;bt++)R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY?i.texImage3D($,0,i.RGBA,1,1,ot,0,i.RGBA,i.UNSIGNED_BYTE,it):i.texImage2D($+bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,it);return rt}let Tt={};Tt[i.TEXTURE_2D]=xt(i.TEXTURE_2D,i.TEXTURE_2D,1),Tt[i.TEXTURE_CUBE_MAP]=xt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Tt[i.TEXTURE_2D_ARRAY]=xt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Tt[i.TEXTURE_3D]=xt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),mt(i.DEPTH_TEST),a.setFunc(Gi),ke(!1),re(gl),mt(i.CULL_FACE),Re(_i);function mt(R){h[R]!==!0&&(i.enable(R),h[R]=!0)}function Ft(R){h[R]!==!1&&(i.disable(R),h[R]=!1)}function ue(R,$){return u[R]!==$?(i.bindFramebuffer(R,$),u[R]=$,R===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=$),R===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=$),!0):!1}function Ct(R,$){let W=_,ot=!1;if(R){W=m.get($),W===void 0&&(W=[],m.set($,W));let it=R.textures;if(W.length!==it.length||W[0]!==i.COLOR_ATTACHMENT0){for(let rt=0,bt=it.length;rt<bt;rt++)W[rt]=i.COLOR_ATTACHMENT0+rt;W.length=it.length,ot=!0}}else W[0]!==i.BACK&&(W[0]=i.BACK,ot=!0);ot&&i.drawBuffers(W)}function Jt(R){return M!==R?(i.useProgram(R),M=R,!0):!1}let Kt={[xi]:i.FUNC_ADD,[lh]:i.FUNC_SUBTRACT,[ch]:i.FUNC_REVERSE_SUBTRACT};Kt[hh]=i.MIN,Kt[uh]=i.MAX;let kt={[dh]:i.ZERO,[fh]:i.ONE,[ph]:i.SRC_COLOR,[vl]:i.SRC_ALPHA,[yh]:i.SRC_ALPHA_SATURATE,[xh]:i.DST_COLOR,[gh]:i.DST_ALPHA,[mh]:i.ONE_MINUS_SRC_COLOR,[yl]:i.ONE_MINUS_SRC_ALPHA,[vh]:i.ONE_MINUS_DST_COLOR,[_h]:i.ONE_MINUS_DST_ALPHA,[Mh]:i.CONSTANT_COLOR,[Sh]:i.ONE_MINUS_CONSTANT_COLOR,[bh]:i.CONSTANT_ALPHA,[Eh]:i.ONE_MINUS_CONSTANT_ALPHA};function Re(R,$,W,ot,it,rt,bt,Bt,nt,Et){if(R===_i){f===!0&&(Ft(i.BLEND),f=!1);return}if(f===!1&&(mt(i.BLEND),f=!0),R!==oh){if(R!==d||Et!==C){if((y!==xi||A!==xi)&&(i.blendEquation(i.FUNC_ADD),y=xi,A=xi),Et)switch(R){case Qi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case me:i.blendFunc(i.ONE,i.ONE);break;case _l:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Pt("WebGLState: Invalid blending: ",R);break}else switch(R){case Qi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case me:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case _l:Pt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case xl:Pt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Pt("WebGLState: Invalid blending: ",R);break}w=null,S=null,T=null,g=null,b.set(0,0,0),L=0,d=R,C=Et}return}it=it||$,rt=rt||W,bt=bt||ot,($!==y||it!==A)&&(i.blendEquationSeparate(Kt[$],Kt[it]),y=$,A=it),(W!==w||ot!==S||rt!==T||bt!==g)&&(i.blendFuncSeparate(kt[W],kt[ot],kt[rt],kt[bt]),w=W,S=ot,T=rt,g=bt),(Bt.equals(b)===!1||nt!==L)&&(i.blendColor(Bt.r,Bt.g,Bt.b,nt),b.copy(Bt),L=nt),d=R,C=!1}function _e(R,$){R.side===tn?Ft(i.CULL_FACE):mt(i.CULL_FACE);let W=R.side===He;$&&(W=!W),ke(W),R.blending===Qi&&R.transparent===!1?Re(_i):Re(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),a.setFunc(R.depthFunc),a.setTest(R.depthTest),a.setMask(R.depthWrite),r.setMask(R.colorWrite);let ot=R.stencilWrite;o.setTest(ot),ot&&(o.setMask(R.stencilWriteMask),o.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),o.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),Me(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?mt(i.SAMPLE_ALPHA_TO_COVERAGE):Ft(i.SAMPLE_ALPHA_TO_COVERAGE)}function ke(R){D!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),D=R)}function re(R){R!==sh?(mt(i.CULL_FACE),R!==F&&(R===gl?i.cullFace(i.BACK):R===rh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ft(i.CULL_FACE),F=R}function pn(R){R!==G&&(k&&i.lineWidth(R),G=R)}function Me(R,$,W){R?(mt(i.POLYGON_OFFSET_FILL),(P!==$||V!==W)&&(P=$,V=W,a.getReversed()&&($=-$,W=-W),i.polygonOffset($,W))):Ft(i.POLYGON_OFFSET_FILL)}function Ye(R){R?mt(i.SCISSOR_TEST):Ft(i.SCISSOR_TEST)}function Ze(R){R===void 0&&(R=i.TEXTURE0+q-1),Q!==R&&(i.activeTexture(R),Q=R)}function Je(R,$,W){W===void 0&&(Q===null?W=i.TEXTURE0+q-1:W=Q);let ot=j[W];ot===void 0&&(ot={type:void 0,texture:void 0},j[W]=ot),(ot.type!==R||ot.texture!==$)&&(Q!==W&&(i.activeTexture(W),Q=W),i.bindTexture(R,$||Tt[R]),ot.type=R,ot.texture=$)}function N(){let R=j[Q];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function $e(){try{i.compressedTexImage2D(...arguments)}catch(R){Pt("WebGLState:",R)}}function ne(){try{i.compressedTexImage3D(...arguments)}catch(R){Pt("WebGLState:",R)}}function ie(){try{i.texSubImage2D(...arguments)}catch(R){Pt("WebGLState:",R)}}function ut(){try{i.texSubImage3D(...arguments)}catch(R){Pt("WebGLState:",R)}}function xe(){try{i.compressedTexSubImage2D(...arguments)}catch(R){Pt("WebGLState:",R)}}function wt(){try{i.compressedTexSubImage3D(...arguments)}catch(R){Pt("WebGLState:",R)}}function Nt(){try{i.texStorage2D(...arguments)}catch(R){Pt("WebGLState:",R)}}function E(){try{i.texStorage3D(...arguments)}catch(R){Pt("WebGLState:",R)}}function x(){try{i.texImage2D(...arguments)}catch(R){Pt("WebGLState:",R)}}function B(){try{i.texImage3D(...arguments)}catch(R){Pt("WebGLState:",R)}}function tt(R){return p[R]!==void 0?p[R]:i.getParameter(R)}function K(R,$){p[R]!==$&&(i.pixelStorei(R,$),p[R]=$)}function st(R){J.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),J.copy(R))}function ct(R){pt.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),pt.copy(R))}function Y(R,$){let W=c.get($);W===void 0&&(W=new WeakMap,c.set($,W));let ot=W.get(R);ot===void 0&&(ot=i.getUniformBlockIndex($,R.name),i.uniformBlockBinding($,ot,ot),W.set(R,ot))}function Z(R,$,W){let it=c.get($).get(R);l[it]!==W&&(i.bindBufferBase(i.UNIFORM_BUFFER,it,W),l[it]=W)}function at(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},p={},Q=null,j={},u={},l={},m=new WeakMap,_=[],M=null,f=!1,d=null,y=null,w=null,S=null,A=null,T=null,g=null,b=new Rt(0,0,0),L=0,C=!1,D=null,F=null,G=null,P=null,V=null,J.set(0,0,i.canvas.width,i.canvas.height),pt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:mt,disable:Ft,bindFramebuffer:ue,drawBuffers:Ct,useProgram:Jt,setBlending:Re,setMaterial:_e,setFlipSided:ke,setCullFace:re,setLineWidth:pn,setPolygonOffset:Me,setScissorTest:Ye,activeTexture:Ze,bindTexture:Je,unbindTexture:N,compressedTexImage2D:$e,compressedTexImage3D:ne,texImage2D:x,texImage3D:B,pixelStorei:K,getParameter:tt,updateUBOMapping:Y,uniformBlockBinding:Z,texStorage2D:Nt,texStorage3D:E,texSubImage2D:ie,texSubImage3D:ut,compressedTexSubImage2D:xe,compressedTexSubImage3D:wt,scissor:st,viewport:ct,reset:at}}function d0(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new It,h=new WeakMap,p=new Set,u,m=new WeakMap,_=new Set,M=new FinalizationRegistry(E=>_.delete(E)),f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function d(E,x){return f?new OffscreenCanvas(E,x):Ms("canvas")}function y(E,x,B){let tt=1,K=Nt(E);if((K.width>B||K.height>B)&&(tt=B/Math.max(K.width,K.height)),tt<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let st=Math.floor(tt*K.width),ct=Math.floor(tt*K.height);u===void 0&&(u=d(st,ct));let Y=x?d(st,ct):u;return Y.width=st,Y.height=ct,Y.getContext("2d").drawImage(E,0,0,st,ct),At("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+st+"x"+ct+")."),Y}else return"data"in E&&At("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),E;return E}function w(E){return E.generateMipmaps}function S(E){i.generateMipmap(E)}function A(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(E,x,B,tt,K,st=!1){if(E!==null){if(i[E]!==void 0)return i[E];At("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ct;tt&&(ct=t.get("EXT_texture_norm16"),ct||At("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=x;if(x===i.RED&&(B===i.FLOAT&&(Y=i.R32F),B===i.HALF_FLOAT&&(Y=i.R16F),B===i.UNSIGNED_BYTE&&(Y=i.R8),B===i.UNSIGNED_SHORT&&ct&&(Y=ct.R16_EXT),B===i.SHORT&&ct&&(Y=ct.R16_SNORM_EXT)),x===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.R8UI),B===i.UNSIGNED_SHORT&&(Y=i.R16UI),B===i.UNSIGNED_INT&&(Y=i.R32UI),B===i.BYTE&&(Y=i.R8I),B===i.SHORT&&(Y=i.R16I),B===i.INT&&(Y=i.R32I)),x===i.RG&&(B===i.FLOAT&&(Y=i.RG32F),B===i.HALF_FLOAT&&(Y=i.RG16F),B===i.UNSIGNED_BYTE&&(Y=i.RG8),B===i.UNSIGNED_SHORT&&ct&&(Y=ct.RG16_EXT),B===i.SHORT&&ct&&(Y=ct.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RG8UI),B===i.UNSIGNED_SHORT&&(Y=i.RG16UI),B===i.UNSIGNED_INT&&(Y=i.RG32UI),B===i.BYTE&&(Y=i.RG8I),B===i.SHORT&&(Y=i.RG16I),B===i.INT&&(Y=i.RG32I)),x===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),B===i.UNSIGNED_INT&&(Y=i.RGB32UI),B===i.BYTE&&(Y=i.RGB8I),B===i.SHORT&&(Y=i.RGB16I),B===i.INT&&(Y=i.RGB32I)),x===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),B===i.UNSIGNED_INT&&(Y=i.RGBA32UI),B===i.BYTE&&(Y=i.RGBA8I),B===i.SHORT&&(Y=i.RGBA16I),B===i.INT&&(Y=i.RGBA32I)),x===i.RGB&&(B===i.UNSIGNED_SHORT&&ct&&(Y=ct.RGB16_EXT),B===i.SHORT&&ct&&(Y=ct.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),x===i.RGBA){let Z=st?ys:Ht.getTransfer(K);B===i.FLOAT&&(Y=i.RGBA32F),B===i.HALF_FLOAT&&(Y=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Y=Z===Yt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&ct&&(Y=ct.RGBA16_EXT),B===i.SHORT&&ct&&(Y=ct.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function g(E,x){let B;return E?x===null||x===hn||x===yi?B=i.DEPTH24_STENCIL8:x===en?B=i.DEPTH32F_STENCIL8:x===ts&&(B=i.DEPTH24_STENCIL8,At("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===hn||x===yi?B=i.DEPTH_COMPONENT24:x===en?B=i.DEPTH_COMPONENT32F:x===ts&&(B=i.DEPTH_COMPONENT16),B}function b(E,x){return w(E)===!0||E.isFramebufferTexture&&E.minFilter!==Te&&E.minFilter!==we?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function L(E){let x=new WeakRef(E);n.get(E).__ref=x,_.add(x),M.register(E,x,x)}function C(E){let x=n.get(E).__ref;x!==void 0&&(_.delete(x),M.unregister(x))}function D(E){G(E.target)}function F(E){P(E.target)}function G(E){E.removeEventListener("dispose",D),C(E),q(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&p.delete(E)}function P(E){E.removeEventListener("dispose",F),C(E),et(E)}function V(){for(let E of _){let x=E.deref();x!==void 0&&(x.isRenderTarget===!0?P(x):G(x))}_.clear(),p.clear()}function q(E){let x=n.get(E);if(x.__webglInit===void 0)return;let B=E.source,tt=m.get(B);if(tt){let K=tt[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&k(E),Object.keys(tt).length===0&&m.delete(B)}n.remove(E)}function k(E){let x=n.get(E);i.deleteTexture(x.__webglTexture);let B=E.source,tt=m.get(B);delete tt[x.__cacheKey],a.memory.textures--}function et(E){let x=n.get(E);x.__depthDisposeCallback&&x.__depthDisposeCallback();let B=E.depthTexture;if(B&&B.renderTarget===E&&G(B),E.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(x.__webglFramebuffer[K]))for(let st=0;st<x.__webglFramebuffer[K].length;st++)i.deleteFramebuffer(x.__webglFramebuffer[K][st]);else i.deleteFramebuffer(x.__webglFramebuffer[K]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[K])}else{if(Array.isArray(x.__webglFramebuffer))for(let K=0;K<x.__webglFramebuffer.length;K++)i.deleteFramebuffer(x.__webglFramebuffer[K]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let K=0;K<x.__webglColorRenderbuffer.length;K++)x.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[K]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let tt=E.textures;for(let K=0,st=tt.length;K<st;K++){let ct=n.get(tt[K]);ct.__webglTexture&&(i.deleteTexture(ct.__webglTexture),a.memory.textures--),n.remove(tt[K])}n.remove(E)}let X=0;function Q(){X=0}function j(){return X}function Mt(E){X=E}function Dt(){let E=X;return E>=s.maxTextures&&At("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+s.maxTextures),X+=1,E}function J(E){let x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.mipmapsAutoUpdate),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function pt(E,x){let B=n.get(E);if(E.isVideoTexture&&xe(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&B.__version!==E.version){let tt=E.image;if(tt===null)At("WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)At("WebGLRenderer: Texture marked for update but image is incomplete");else{_e(B,E,x);return}}else E.isExternalTexture&&(B.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+x)}function xt(E,x){let B=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&B.__version!==E.version){_e(B,E,x);return}else E.isExternalTexture&&(B.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+x)}function Tt(E,x){let B=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&B.__version!==E.version){_e(B,E,x);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+x)}function mt(E,x){let B=n.get(E);if(E.version>0&&B.__version!==E.version){ke(B,E,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+x)}let Ft={[Jr]:i.REPEAT,[Qe]:i.CLAMP_TO_EDGE,[$r]:i.MIRRORED_REPEAT},ue={[Te]:i.NEAREST,[Ah]:i.NEAREST_MIPMAP_NEAREST,[Zs]:i.NEAREST_MIPMAP_LINEAR,[we]:i.LINEAR,[wa]:i.LINEAR_MIPMAP_NEAREST,[Bn]:i.LINEAR_MIPMAP_LINEAR},Ct={[Ih]:i.NEVER,[Ol]:i.ALWAYS,[Lh]:i.LESS,[Ul]:i.LEQUAL,[Nh]:i.EQUAL,[Fl]:i.GEQUAL,[Dh]:i.GREATER,[Uh]:i.NOTEQUAL};function Jt(E,x){if(x.type===en&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===we||x.magFilter===wa||x.magFilter===Zs||x.magFilter===Bn||x.minFilter===we||x.minFilter===wa||x.minFilter===Zs||x.minFilter===Bn)&&At("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,Ft[x.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,Ft[x.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,Ft[x.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,ue[x.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,ue[x.minFilter]),x.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,Ct[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Te||x.minFilter!==Zs&&x.minFilter!==Bn||x.type===en&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(E,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Kt(E,x){let B=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",D),L(x));let tt=x.source,K=m.get(tt);K===void 0&&(K={},m.set(tt,K));let st=J(x);if(st!==E.__cacheKey){K[st]===void 0&&(K[st]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),K[st].usedTimes++;let ct=K[E.__cacheKey];ct!==void 0&&(K[E.__cacheKey].usedTimes--,ct.usedTimes===0&&k(x)),E.__cacheKey=st,E.__webglTexture=K[st].texture}return B}function kt(E,x,B){return Math.floor(Math.floor(E/B)/x)}function Re(E,x,B,tt){let st=E.updateRanges;if(st.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,B,tt,x.data);else{st.sort((R,$)=>R.start-$.start);let ct=0;for(let R=1;R<st.length;R++){let $=st[ct],W=st[R],ot=$.start+$.count,it=kt(W.start,x.width,4),rt=kt($.start,x.width,4);W.start<=ot+1&&it===rt&&kt(W.start+W.count-1,x.width,4)===it?$.count=Math.max($.count,W.start+W.count-$.start):(++ct,st[ct]=W)}st.length=ct+1;let Y=e.getParameter(i.UNPACK_ROW_LENGTH),Z=e.getParameter(i.UNPACK_SKIP_PIXELS),at=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let R=0,$=st.length;R<$;R++){let W=st[R],ot=Math.floor(W.start/4),it=Math.ceil(W.count/4),rt=ot%x.width,bt=Math.floor(ot/x.width),Bt=it,nt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,rt),e.pixelStorei(i.UNPACK_SKIP_ROWS,bt),e.texSubImage2D(i.TEXTURE_2D,0,rt,bt,Bt,nt,B,tt,x.data)}E.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Y),e.pixelStorei(i.UNPACK_SKIP_PIXELS,Z),e.pixelStorei(i.UNPACK_SKIP_ROWS,at)}}function _e(E,x,B){let tt=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(tt=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(tt=i.TEXTURE_3D);let K=Kt(E,x),st=x.source;e.bindTexture(tt,E.__webglTexture,i.TEXTURE0+B);let ct=n.get(st);if(st.version!==ct.__version||K===!0){if(e.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let nt=Ht.getPrimaries(Ht.workingColorSpace),Et=x.colorSpace===Hn?null:Ht.getPrimaries(x.colorSpace),Ot=x.colorSpace===Hn||nt===Et?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ot)}e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let Z=y(x.image,!1,s.maxTextureSize);Z=wt(x,Z);let at=r.convert(x.format,x.colorSpace),R=r.convert(x.type),$=T(x.internalFormat,at,R,x.normalized,x.colorSpace,x.isVideoTexture);Jt(tt,x);let W,ot=x.mipmaps,it=x.isVideoTexture!==!0,rt=ct.__version===void 0||K===!0,bt=st.dataReady,Bt=b(x,Z);if(x.isDepthTexture)$=g(x.format===zn,x.type),rt&&(it?e.texStorage2D(i.TEXTURE_2D,1,$,Z.width,Z.height):e.texImage2D(i.TEXTURE_2D,0,$,Z.width,Z.height,0,at,R,null));else if(x.isDataTexture)if(ot.length>0){it&&rt&&e.texStorage2D(i.TEXTURE_2D,Bt,$,ot[0].width,ot[0].height);for(let nt=0,Et=ot.length;nt<Et;nt++)W=ot[nt],it?bt&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,W.width,W.height,at,R,W.data):e.texImage2D(i.TEXTURE_2D,nt,$,W.width,W.height,0,at,R,W.data);x.generateMipmaps=!1}else it?(rt&&e.texStorage2D(i.TEXTURE_2D,Bt,$,Z.width,Z.height),bt&&Re(x,Z,at,R)):e.texImage2D(i.TEXTURE_2D,0,$,Z.width,Z.height,0,at,R,Z.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){it&&rt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Bt,$,ot[0].width,ot[0].height,Z.depth);for(let nt=0,Et=ot.length;nt<Et;nt++)if(W=ot[nt],x.format!==dn)if(at!==null)if(it){if(bt)if(x.layerUpdates.size>0){let Ot=Wl(W.width,W.height,x.format,x.type);for(let dt of x.layerUpdates){let $t=W.data.subarray(dt*Ot/W.data.BYTES_PER_ELEMENT,(dt+1)*Ot/W.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,dt,W.width,W.height,1,at,$t)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,0,W.width,W.height,Z.depth,at,W.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,nt,$,W.width,W.height,Z.depth,0,W.data,0,0);else At("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else it?bt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,0,W.width,W.height,Z.depth,at,R,W.data):e.texImage3D(i.TEXTURE_2D_ARRAY,nt,$,W.width,W.height,Z.depth,0,at,R,W.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{it&&rt&&e.texStorage2D(i.TEXTURE_2D,Bt,$,ot[0].width,ot[0].height);for(let nt=0,Et=ot.length;nt<Et;nt++)W=ot[nt],x.format!==dn?at!==null?it?bt&&e.compressedTexSubImage2D(i.TEXTURE_2D,nt,0,0,W.width,W.height,at,W.data):e.compressedTexImage2D(i.TEXTURE_2D,nt,$,W.width,W.height,0,W.data):At("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):it?bt&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,W.width,W.height,at,R,W.data):e.texImage2D(i.TEXTURE_2D,nt,$,W.width,W.height,0,at,R,W.data)}else if(x.isDataArrayTexture)if(it){if(rt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Bt,$,Z.width,Z.height,Z.depth),bt)if(x.layerUpdates.size>0){let nt=Wl(Z.width,Z.height,x.format,x.type);for(let Et of x.layerUpdates){let Ot=Z.data.subarray(Et*nt/Z.data.BYTES_PER_ELEMENT,(Et+1)*nt/Z.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Et,Z.width,Z.height,1,at,R,Ot)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,at,R,Z.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,$,Z.width,Z.height,Z.depth,0,at,R,Z.data);else if(x.isData3DTexture)it?(rt&&e.texStorage3D(i.TEXTURE_3D,Bt,$,Z.width,Z.height,Z.depth),bt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,at,R,Z.data)):e.texImage3D(i.TEXTURE_3D,0,$,Z.width,Z.height,Z.depth,0,at,R,Z.data);else if(x.isFramebufferTexture){if(rt)if(it)e.texStorage2D(i.TEXTURE_2D,Bt,$,Z.width,Z.height);else{let nt=Z.width,Et=Z.height;for(let Ot=0;Ot<Bt;Ot++)e.texImage2D(i.TEXTURE_2D,Ot,$,nt,Et,0,at,R,null),nt>>=1,Et>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){let nt=i.canvas;if(nt.hasAttribute("layoutsubtree")||nt.setAttribute("layoutsubtree","true"),Z.parentNode!==nt){nt.appendChild(Z),p.add(x),nt.onpaint=Et=>{let Ot=Et.changedElements;for(let dt of p)Ot.includes(dt.image)&&(dt.needsUpdate=!0)},nt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Z);else{let Ot=i.RGBA,dt=i.RGBA,$t=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ot,dt,$t,Z)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ot.length>0){if(it&&rt){let nt=Nt(ot[0]);e.texStorage2D(i.TEXTURE_2D,Bt,$,nt.width,nt.height)}for(let nt=0,Et=ot.length;nt<Et;nt++)W=ot[nt],it?bt&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,at,R,W):e.texImage2D(i.TEXTURE_2D,nt,$,at,R,W);x.generateMipmaps=!1}else if(it){if(rt){let nt=Nt(Z);e.texStorage2D(i.TEXTURE_2D,Bt,$,nt.width,nt.height)}bt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,at,R,Z)}else e.texImage2D(i.TEXTURE_2D,0,$,at,R,Z);w(x)&&x.mipmapsAutoUpdate===!0&&S(tt),ct.__version=st.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function ke(E,x,B){if(x.image.length!==6)return;let tt=Kt(E,x),K=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+B);let st=n.get(K);if(K.version!==st.__version||tt===!0){e.activeTexture(i.TEXTURE0+B);let ct=Ht.getPrimaries(Ht.workingColorSpace),Y=x.colorSpace===Hn?null:Ht.getPrimaries(x.colorSpace),Z=x.colorSpace===Hn||ct===Y?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let at=x.isCompressedTexture||x.image[0].isCompressedTexture,R=x.image[0]&&x.image[0].isDataTexture,$=[];for(let dt=0;dt<6;dt++)!at&&!R?$[dt]=y(x.image[dt],!0,s.maxCubemapSize):$[dt]=R?x.image[dt].image:x.image[dt],$[dt]=wt(x,$[dt]);let W=$[0],ot=r.convert(x.format,x.colorSpace),it=r.convert(x.type),rt=T(x.internalFormat,ot,it,x.normalized,x.colorSpace),bt=x.isVideoTexture!==!0,Bt=st.__version===void 0||tt===!0,nt=K.dataReady,Et=b(x,W);Jt(i.TEXTURE_CUBE_MAP,x);let Ot;if(x.isDepthTexture){if(rt=g(x.format===zn,x.type),Bt)if(bt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,rt,W.width,W.height);else for(let dt=0;dt<6;dt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,rt,W.width,W.height,0,ot,it,null)}else if(at){bt&&Bt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Et,rt,W.width,W.height);for(let dt=0;dt<6;dt++){Ot=$[dt].mipmaps;for(let $t=0;$t<Ot.length;$t++){let Se=Ot[$t];x.format!==dn?ot!==null?bt?nt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,$t,0,0,Se.width,Se.height,ot,Se.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,$t,rt,Se.width,Se.height,0,Se.data):At("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):bt?nt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,$t,0,0,Se.width,Se.height,ot,it,Se.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,$t,rt,Se.width,Se.height,0,ot,it,Se.data)}}}else{if(Ot=x.mipmaps,bt&&Bt){Ot.length>0&&Et++;let dt=Nt($[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Et,rt,dt.width,dt.height)}for(let dt=0;dt<6;dt++)if(R){bt?nt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,$[dt].width,$[dt].height,ot,it,$[dt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,rt,$[dt].width,$[dt].height,0,ot,it,$[dt].data);for(let $t=0;$t<Ot.length;$t++){let Wn=Ot[$t].image[dt].image;bt?nt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,$t+1,0,0,Wn.width,Wn.height,ot,it,Wn.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,$t+1,rt,Wn.width,Wn.height,0,ot,it,Wn.data)}}else{bt?nt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,ot,it,$[dt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,rt,ot,it,$[dt]);for(let $t=0;$t<Ot.length;$t++){let Se=Ot[$t];bt?nt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,$t+1,0,0,ot,it,Se.image[dt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,$t+1,rt,ot,it,Se.image[dt])}}}w(x)&&x.mipmapsAutoUpdate===!0&&S(i.TEXTURE_CUBE_MAP),st.__version=K.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function re(E,x,B,tt,K,st){let ct=r.convert(B.format,B.colorSpace),Y=r.convert(B.type),Z=T(B.internalFormat,ct,Y,B.normalized,B.colorSpace),at=n.get(x),R=n.get(B);if(R.__renderTarget=x,!at.__hasExternalTextures){let $=Math.max(1,x.width>>st),W=Math.max(1,x.height>>st);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,st,Z,$,W,x.depth,0,ct,Y,null):e.texImage2D(K,st,Z,$,W,0,ct,Y,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),ut(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,K,R.__webglTexture,0,ie(x)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,tt,K,R.__webglTexture,st),e.bindFramebuffer(i.FRAMEBUFFER,null)}function pn(E,x,B){if(i.bindRenderbuffer(i.RENDERBUFFER,E),x.depthBuffer){let tt=x.depthTexture,K=tt&&tt.isDepthTexture?tt.type:null,st=g(x.stencilBuffer,K),ct=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ut(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie(x),st,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ie(x),st,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,st,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,E)}else{let tt=x.textures;for(let K=0;K<tt.length;K++){let st=tt[K],ct=r.convert(st.format,st.colorSpace),Y=r.convert(st.type),Z=T(st.internalFormat,ct,Y,st.normalized,st.colorSpace);ut(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie(x),Z,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ie(x),Z,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Z,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Me(E,x,B){let tt=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=n.get(x.depthTexture);K.__renderTarget=x;let st=tt?x.depthTexture.image[0]:x.depthTexture.image;(!K.__webglTexture||st.width!==x.width||st.height!==x.height)&&(st.width=x.width,st.height=x.height,x.depthTexture.needsUpdate=!0),tt?mt(x.depthTexture,0):pt(x.depthTexture,0);let ct=K.__webglTexture,Y=ie(x),Z=tt?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,at=x.depthTexture.format===zn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===Un)ut(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,at,Z,ct,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,at,Z,ct,0);else if(x.depthTexture.format===zn)ut(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,at,Z,ct,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,at,Z,ct,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ye(E){let x=n.get(E),B=E.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==E.depthTexture){let tt=E.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),tt){let K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,tt.removeEventListener("dispose",K)};tt.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=tt}if(E.depthTexture&&!x.__autoAllocateDepthBuffer)if(B)for(let tt=0;tt<6;tt++)Me(x.__webglFramebuffer[tt],E,tt);else E.texture.mipmaps.length>0?Me(x.__webglFramebuffer[0],E,0):Me(x.__webglFramebuffer,E,0);else if(B){x.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[tt]),x.__webglDepthbuffer[tt]===void 0)x.__webglDepthbuffer[tt]=i.createRenderbuffer(),pn(x.__webglDepthbuffer[tt],E,!1);else{let K=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=x.__webglDepthbuffer[tt];i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,st)}}else if(E.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),pn(x.__webglDepthbuffer,E,!1);else{let K=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,st)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ze(E,x,B){let tt=n.get(E);x!==void 0&&re(tt.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Ye(E)}function Je(E){let x=E.texture,B=n.get(E),tt=n.get(x);E.addEventListener("dispose",F),L(E);let K=E.textures,st=E.isWebGLCubeRenderTarget===!0,ct=K.length>1;if(ct||(tt.__webglTexture===void 0&&(tt.__webglTexture=i.createTexture()),tt.__version=x.version,a.memory.textures++),st){B.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(x.mipmaps.length>0){B.__webglFramebuffer[Y]=[];for(let Z=0;Z<x.mipmaps.length;Z++)B.__webglFramebuffer[Y][Z]=i.createFramebuffer()}else B.__webglFramebuffer[Y]=i.createFramebuffer()}else{if(x.mipmaps.length>0){B.__webglFramebuffer=[];for(let Y=0;Y<x.mipmaps.length;Y++)B.__webglFramebuffer[Y]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(ct)for(let Y=0,Z=K.length;Y<Z;Y++){let at=n.get(K[Y]);at.__webglTexture===void 0&&(at.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&ut(E)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Y=0;Y<K.length;Y++){let Z=K[Y];B.__webglColorRenderbuffer[Y]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[Y]);let at=r.convert(Z.format,Z.colorSpace),R=r.convert(Z.type),$=T(Z.internalFormat,at,R,Z.normalized,Z.colorSpace,E.isXRRenderTarget===!0),W=ie(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,W,$,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,B.__webglColorRenderbuffer[Y])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),pn(B.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(st){e.bindTexture(i.TEXTURE_CUBE_MAP,tt.__webglTexture),Jt(i.TEXTURE_CUBE_MAP,x);for(let Y=0;Y<6;Y++)if(x.mipmaps.length>0)for(let Z=0;Z<x.mipmaps.length;Z++)re(B.__webglFramebuffer[Y][Z],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Z);else re(B.__webglFramebuffer[Y],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);w(x)?S(i.TEXTURE_CUBE_MAP):x.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),e.unbindTexture()}else if(ct){for(let Y=0,Z=K.length;Y<Z;Y++){let at=K[Y],R=n.get(at),$=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&($=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture($,R.__webglTexture),Jt($,at),re(B.__webglFramebuffer,E,at,i.COLOR_ATTACHMENT0+Y,$,0),w(at)&&S($)}e.unbindTexture()}else{let Y=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Y=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Y,tt.__webglTexture),Jt(Y,x),x.mipmaps.length>0)for(let Z=0;Z<x.mipmaps.length;Z++)re(B.__webglFramebuffer[Z],E,x,i.COLOR_ATTACHMENT0,Y,Z);else re(B.__webglFramebuffer,E,x,i.COLOR_ATTACHMENT0,Y,0);w(x)?S(Y):x.mipmaps.length>0&&i.texParameteri(Y,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),e.unbindTexture()}E.depthBuffer&&Ye(E)}function N(E){let x=E.textures;for(let B=0,tt=x.length;B<tt;B++){let K=x[B];if(w(K)&&K.mipmapsAutoUpdate===!0){let st=A(E),ct=n.get(K).__webglTexture;e.bindTexture(st,ct),S(st),e.unbindTexture()}}}let $e=[];function ne(E){if(E.samples>0){if(ut(E)===!1){let x=E.textures,B=E.width,tt=E.height,K=i.COLOR_BUFFER_BIT,st=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=n.get(E),Y=x.length>1;if(Y)for(let at=0;at<x.length;at++)e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ct.__webglMultisampledFramebuffer),E.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglFramebuffer);for(let at=0;at<x.length;at++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),Y){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ct.__webglColorRenderbuffer[at]);let R=n.get(x[at]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,R,0)}i.blitFramebuffer(0,0,B,tt,0,0,B,tt,K,i.NEAREST),l===!0&&($e.length=0,$e.push(i.COLOR_ATTACHMENT0+at),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&$e.push(st),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,$e))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Y)for(let at=0;at<x.length;at++){e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,ct.__webglColorRenderbuffer[at]);let R=n.get(x[at]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,R,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&l){let x=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function ie(E){return Math.min(s.maxSamples,E.samples)}function ut(E){let x=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function xe(E){let x=a.render.frame;h.get(E)!==x&&(h.set(E,x),E.update())}function wt(E,x){let B=E.colorSpace,tt=E.format,K=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||B!==pi&&B!==Hn&&(Ht.getTransfer(B)===Yt?(tt!==dn||K!==Ue)&&At("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Pt("WebGLTextures: Unsupported texture color space:",B)),x}function Nt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=Dt,this.resetTextureUnits=Q,this.getTextureUnits=j,this.setTextureUnits=Mt,this.setTexture2D=pt,this.setTexture2DArray=xt,this.setTexture3D=Tt,this.setTextureCube=mt,this.rebindTextures=Ze,this.setupRenderTarget=Je,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=ne,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=re,this.useMultisampledRTT=ut,this.dispose=V}function f0(i,t){function e(n,s=Hn){let r,a=Ht.getTransfer(s);if(n===Ue)return i.UNSIGNED_BYTE;if(n===Ra)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ca)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Il)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ll)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Cl)return i.BYTE;if(n===Pl)return i.SHORT;if(n===ts)return i.UNSIGNED_SHORT;if(n===Aa)return i.INT;if(n===hn)return i.UNSIGNED_INT;if(n===en)return i.FLOAT;if(n===un)return i.HALF_FLOAT;if(n===Nl)return i.ALPHA;if(n===Dl)return i.RGB;if(n===dn)return i.RGBA;if(n===Un)return i.DEPTH_COMPONENT;if(n===zn)return i.DEPTH_STENCIL;if(n===es)return i.RED;if(n===Pa)return i.RED_INTEGER;if(n===ii)return i.RG;if(n===Ia)return i.RG_INTEGER;if(n===La)return i.RGBA_INTEGER;if(n===Js||n===$s||n===Ks||n===Qs)if(a===Yt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Js)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$s)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Js)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$s)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ks)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Qs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Na||n===Da||n===Ua||n===Fa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Na)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Da)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ua)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Oa||n===Ba||n===za||n===Ha||n===ka||n===js||n===Va)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Oa||n===Ba)return a===Yt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===za)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ha)return r.COMPRESSED_R11_EAC;if(n===ka)return r.COMPRESSED_SIGNED_R11_EAC;if(n===js)return r.COMPRESSED_RG11_EAC;if(n===Va)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ga||n===Wa||n===Xa||n===qa||n===Ya||n===Za||n===Ja||n===$a||n===Ka||n===Qa||n===ja||n===to||n===eo||n===no)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ga)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Wa)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Xa)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===qa)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ya)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Za)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ja)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===$a)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ka)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Qa)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ja)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===to)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===eo)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===no)return a===Yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===io||n===so||n===ro)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===io)return a===Yt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===so)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ro)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ao||n===oo||n===tr||n===lo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ao)return r.COMPRESSED_RED_RGTC1_EXT;if(n===oo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===tr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===lo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===yi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var p0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,m0=`
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

}`,jl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Os(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new ce({vertexShader:p0,fragmentShader:m0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new le(new Sn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},tc=class extends gn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,p=null,u=null,m=null,_=null,M=typeof XRWebGLBinding<"u",f=new jl,d={},y=e.getContextAttributes(),w=null,S=null,A=[],T=[],g=new It,b=null,L=null,C=new jt;C.viewport=new se;let D=new jt;D.viewport=new se;let F=[C,D],G=new Sa,P=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let pt=A[J];return pt===void 0&&(pt=new Yi,A[J]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function(J){let pt=A[J];return pt===void 0&&(pt=new Yi,A[J]=pt),pt.getGripSpace()},this.getHand=function(J){let pt=A[J];return pt===void 0&&(pt=new Yi,A[J]=pt),pt.getHandSpace()};function q(J){let pt=T.indexOf(J.inputSource);if(pt===-1)return;let xt=A[pt];xt!==void 0&&(xt.update(J.inputSource,J.frame,c||a),xt.dispatchEvent({type:J.type,data:J.inputSource}))}function k(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",et);for(let J=0;J<A.length;J++){let pt=T[J];pt!==null&&(T[J]=null,A[J].disconnect(pt))}P=null,V=null,f.reset();for(let J in d)delete d[J];if(t.setRenderTarget(w),m=null,u=null,p=null,s=null,S=null,Dt.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(g.width,g.height,!1),L!==null){let J=L.camera;J.fov=L.fov,J.zoom=L.zoom,J.updateProjectionMatrix(),L=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&At("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&At("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return p===null&&M&&(p=new XRWebGLBinding(s,e)),p},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",k),s.addEventListener("inputsourceschange",et),y.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(g),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,Tt=null,mt=null;y.depth&&(mt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,xt=y.stencil?zn:Un,Tt=y.stencil?yi:hn);let Ft={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:r};p=this.getBinding(),u=p.createProjectionLayer(Ft),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),S=new Xe(u.textureWidth,u.textureHeight,{format:dn,type:Ue,depthTexture:new On(u.textureWidth,u.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let xt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,xt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new Xe(m.framebufferWidth,m.framebufferHeight,{format:dn,type:Ue,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Dt.setContext(s),Dt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function et(J){for(let pt=0;pt<J.removed.length;pt++){let xt=J.removed[pt],Tt=T.indexOf(xt);Tt>=0&&(T[Tt]=null,A[Tt].disconnect(xt))}for(let pt=0;pt<J.added.length;pt++){let xt=J.added[pt],Tt=T.indexOf(xt);if(Tt===-1){for(let Ft=0;Ft<A.length;Ft++)if(Ft>=T.length){T.push(xt),Tt=Ft;break}else if(T[Ft]===null){T[Ft]=xt,Tt=Ft;break}if(Tt===-1)break}let mt=A[Tt];mt&&mt.connect(xt)}}function X(J,pt){pt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(pt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let pt=J.near,xt=J.far;f.texture!==null&&(f.depthNear>0&&(pt=f.depthNear),f.depthFar>0&&(xt=f.depthFar)),G.near=D.near=C.near=pt,G.far=D.far=C.far=xt,(P!==G.near||V!==G.far)&&(s.updateRenderState({depthNear:G.near,depthFar:G.far}),P=G.near,V=G.far),G.layers.mask=J.layers.mask|6,C.layers.mask=G.layers.mask&-5,D.layers.mask=G.layers.mask&-3;let Tt=J.parent,mt=G.cameras;X(G,Tt);for(let Ft=0;Ft<mt.length;Ft++)X(mt[Ft],Tt);G.projectionMatrix.copy(C.projectionMatrix),G.projectionMatrixInverse.copy(C.projectionMatrixInverse),L===null&&J.isPerspectiveCamera&&(L={camera:J,fov:J.fov,zoom:J.zoom}),Q(J,G,Tt)};function Q(J,pt,xt){xt===null?J.matrix.copy(pt.matrixWorld):(J.matrix.copy(xt.matrixWorld),J.matrix.invert(),J.matrix.multiply(pt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(pt.projectionMatrix),J.projectionMatrixInverse.copy(pt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Qr*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=J)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(G)},this.getCameraTexture=function(J){return d[J]};let j=null;function Mt(J,pt){if(h=pt.getViewerPose(c||a),_=pt,h!==null){let xt=h.views;m!==null&&(t.setRenderTargetFramebuffer(S,m.framebuffer),t.setRenderTarget(S));let Tt=!1;xt.length!==G.cameras.length&&(G.cameras.length=0,Tt=!0);for(let Ct=0;Ct<xt.length;Ct++){let Jt=xt[Ct],Kt=null;if(m!==null)Kt=m.getViewport(Jt);else{let Re=p.getViewSubImage(u,Jt);Kt=Re.viewport,Ct===0&&(t.setRenderTargetTextures(S,Re.colorTexture,Re.depthStencilTexture),t.setRenderTarget(S))}let kt=F[Ct];kt===void 0&&(kt=new jt,kt.layers.enable(Ct),kt.viewport=new se,F[Ct]=kt),kt.matrix.fromArray(Jt.transform.matrix),kt.matrix.decompose(kt.position,kt.quaternion,kt.scale),kt.projectionMatrix.fromArray(Jt.projectionMatrix),kt.projectionMatrixInverse.copy(kt.projectionMatrix).invert(),kt.viewport.set(Kt.x,Kt.y,Kt.width,Kt.height),Ct===0&&(G.matrix.copy(kt.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Tt===!0&&G.cameras.push(kt)}let mt=s.enabledFeatures;if(mt&&mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){p=n.getBinding();let Ct=p.getDepthInformation(xt[0]);Ct&&Ct.isValid&&Ct.texture&&f.init(Ct,s.renderState)}if(mt&&mt.includes("camera-access")&&M){t.state.unbindTexture(),p=n.getBinding();for(let Ct=0;Ct<xt.length;Ct++){let Jt=xt[Ct].camera;if(Jt){let Kt=d[Jt];Kt||(Kt=new Os,d[Jt]=Kt);let kt=p.getCameraImage(Jt);Kt.sourceTexture=kt}}}}for(let xt=0;xt<A.length;xt++){let Tt=T[xt],mt=A[xt];Tt!==null&&mt!==void 0&&mt.update(Tt,pt,c||a)}j&&j(J,pt),pt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pt}),_=null}let Dt=new mu;Dt.setAnimationLoop(Mt),this.setAnimationLoop=function(J){j=J},this.dispose=function(){}}},g0=new Zt,Tu=new Lt;Tu.set(-1,0,0,0,1,0,0,0,1);function _0(i,t){function e(f,d){f.matrixAutoUpdate===!0&&f.updateMatrix(),d.value.copy(f.matrix)}function n(f,d){d.color.getRGB(f.fogColor.value,kl(i)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function s(f,d,y,w,S){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(f,d):d.isMeshLambertMaterial?(r(f,d),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(f,d),p(f,d)):d.isMeshPhongMaterial?(r(f,d),h(f,d),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(f,d),u(f,d),d.isMeshPhysicalMaterial&&m(f,d,S)):d.isMeshMatcapMaterial?(r(f,d),_(f,d)):d.isMeshDepthMaterial?r(f,d):d.isMeshDistanceMaterial?(r(f,d),M(f,d)):d.isMeshNormalMaterial?r(f,d):d.isLineBasicMaterial?(a(f,d),d.isLineDashedMaterial&&o(f,d)):d.isPointsMaterial?l(f,d,y,w):d.isSpriteMaterial?c(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map,e(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,e(d.alphaMap,f.alphaMapTransform)),d.bumpMap&&(f.bumpMap.value=d.bumpMap,e(d.bumpMap,f.bumpMapTransform),f.bumpScale.value=d.bumpScale,d.side===He&&(f.bumpScale.value*=-1)),d.normalMap&&(f.normalMap.value=d.normalMap,e(d.normalMap,f.normalMapTransform),f.normalScale.value.copy(d.normalScale),d.side===He&&f.normalScale.value.negate()),d.displacementMap&&(f.displacementMap.value=d.displacementMap,e(d.displacementMap,f.displacementMapTransform),f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,f.emissiveMapTransform)),d.specularMap&&(f.specularMap.value=d.specularMap,e(d.specularMap,f.specularMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);let y=t.get(d),w=y.envMap,S=y.envMapRotation;w&&(f.envMap.value=w,f.envMapRotation.value.setFromMatrix4(g0.makeRotationFromEuler(S)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(Tu),f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap&&(f.lightMap.value=d.lightMap,f.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,f.lightMapTransform)),d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,f.aoMapTransform))}function a(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,d.map&&(f.map.value=d.map,e(d.map,f.mapTransform))}function o(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function l(f,d,y,w){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*y,f.scale.value=w*.5,d.map&&(f.map.value=d.map,e(d.map,f.uvTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,e(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function c(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map,e(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,e(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function h(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function p(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function u(f,d){f.metalness.value=d.metalness,d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,f.metalnessMapTransform)),f.roughness.value=d.roughness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,f.roughnessMapTransform)),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function m(f,d,y){f.ior.value=d.ior,d.diffuseRoughness>0&&(f.diffuseRoughness.value=d.diffuseRoughness,d.diffuseRoughnessMap&&(f.diffuseRoughnessMap.value=d.diffuseRoughnessMap,e(d.diffuseRoughnessMap,f.diffuseRoughnessMapTransform))),d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,f.sheenColorMapTransform)),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,f.sheenRoughnessMapTransform))),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,f.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(f.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===He&&f.clearcoatNormalScale.value.negate())),d.dispersion>0&&(f.dispersion.value=d.dispersion),d.retroreflectivity>0&&(f.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessMinimum,f.iridescenceThicknessMaximum.value=d.iridescenceThicknessMaximum,d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,f.iridescenceMapTransform)),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=y.texture,f.transmissionSamplerSize.value.set(y.width,y.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,f.transmissionMapTransform)),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(f.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(f.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,f.specularColorMapTransform)),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,f.specularIntensityMapTransform))}function _(f,d){d.matcap&&(f.matcap.value=d.matcap)}function M(f,d){let y=t.get(d).light;f.referencePosition.value.setFromMatrixPosition(y.matrixWorld),f.nearDistance.value=y.shadow.camera.near,f.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function x0(i,t,e,n){let s={},r={};function a(y,w){let S=w.program;n.uniformBlockBinding(y,S,s[y.id])}function o(y,w){let S=s[y.id];S===void 0&&(_(y),S=l(y),s[y.id]=S,y.addEventListener("dispose",f));let A=w.program;n.updateUBOMapping(y,A);let T=t.render.frame;r[y.id]!==T&&(c(y),r[y.id]=T)}function l(y){let w=i.createBuffer(),S=y.__size,A=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,S,A),i.bindBuffer(i.UNIFORM_BUFFER,null),w}function c(y){let w=s[y.id],S=y.uniforms,A=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let T=0,g=S.length;T<g;T++){let b=S[T];if(Array.isArray(b))for(let L=0,C=b.length;L<C;L++)h(b[L],T,L,A);else h(b,T,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(y,w,S,A){if(u(y,w,S,A)===!0){let T=y.__offset,g=y.value;if(Array.isArray(g)){let b=0;for(let L=0;L<g.length;L++){let C=g[L],D=M(C,!0);p(C,y.__data,b),b+=D.storage/Float32Array.BYTES_PER_ELEMENT}}else p(g,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,T,y.__data)}}function p(y,w,S){typeof y=="number"||typeof y=="boolean"?w[S]=y:y.isMatrix3?(w[S]=y.elements[0],w[S+1]=y.elements[1],w[S+2]=y.elements[2],w[S+3]=0,w[S+4]=y.elements[3],w[S+5]=y.elements[4],w[S+6]=y.elements[5],w[S+7]=0,w[S+8]=y.elements[6],w[S+9]=y.elements[7],w[S+10]=y.elements[8],w[S+11]=0):ArrayBuffer.isView(y)?w.set(y.subarray(0,w.length-S),S):y.toArray(w,S)}function u(y,w,S,A){let T=y.value,g=w+"_"+S;if(Array.isArray(T)){A[g]===void 0&&(A[g]=[]);let b=A[g],L=!1;for(let C=0;C<T.length;C++)m(T[C],b,C)===!0&&(L=!0);return L}return m(T,A,g)}function m(y,w,S){if(w[S]===void 0)return typeof y=="number"||typeof y=="boolean"?w[S]=y:ArrayBuffer.isView(y)?w[S]=y.slice():w[S]=y.clone(),!0;{let A=w[S];if(typeof y=="number"||typeof y=="boolean"){if(A!==y)return w[S]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(A.equals(y)===!1)return A.copy(y),!0}}return!1}function _(y){let w=y.uniforms,S=0,A=16;for(let g=0,b=w.length;g<b;g++){let L=Array.isArray(w[g])?w[g]:[w[g]];for(let C=0,D=L.length;C<D;C++){let F=L[C],G=Array.isArray(F.value)?F.value:[F.value],P=Array.isArray(w[g])||Array.isArray(F.value),V=S;for(let k=0,et=G.length;k<et;k++){let X=G[k],Q=M(X,P),j=S%A,Mt=j%Q.boundary,Dt=j+Mt;S+=Mt,Dt!==0&&A-Dt<Q.storage&&(S+=A-Dt),k===0&&(V=S),S+=Q.storage}let q=F.type==="int"?Int32Array:F.type==="uint"?Uint32Array:Float32Array;F.__data=new q((S-V)/Float32Array.BYTES_PER_ELEMENT),F.__offset=V}}let T=S%A;return T>0&&(S+=A-T),y.__size=S,y.__cache={},this}function M(y,w){let S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=16,S.storage=48):y.isMatrix4?(S.boundary=16,S.storage=64):y.isTexture?At("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(S.boundary=16,S.storage=y.byteLength):At("WebGLRenderer: Unsupported uniform value type.",y),w===!0&&(S.boundary=16,S.storage=Math.ceil(S.storage/16)*16),S}function f(y){let w=y.target;w.removeEventListener("dispose",f),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function d(){for(let y in s)i.deleteBuffer(s[y]);s={},r={}}return{bind:a,update:o,dispose:d}}var v0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),En=null;function y0(){return En===null&&(En=new mi(v0,16,16,ii,un),En.name="DFG_LUT",En.minFilter=we,En.magFilter=we,En.wrapS=Qe,En.wrapT=Qe,En.generateMipmaps=!1,En.needsUpdate=!0),En}var mo=class{constructor(t={}){let{canvas:e=Fh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:m=Ue}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;let M=m,f=new Set([La,Ia,Pa]),d=new Set([Ue,hn,ts,yi,Ra,Ca]),y=new Uint32Array(4),w=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]},A=null,T=null,g=[],b=[],L=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,D=!1,F=null,G=null,P=null,V=null;this._outputColorSpace=We;let q=0,k=0,et=null,X=-1,Q=null,j=new se,Mt=new se,Dt=null,J=new Rt(0),pt=0,xt=e.width,Tt=e.height,mt=1,Ft=null,ue=null,Ct=new se(0,0,xt,Tt),Jt=new se(0,0,xt,Tt),Kt=!1,kt=new Kn,Re=new sa,_e=!1,ke=!1,re=new Zt,pn=new U,Me=new se,Ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ze=!1;function Je(){return et===null?mt:1}let N=n;function $e(v,I){return e.getContext(v,I)}let ne,ie,ut,xe,wt,Nt,E,x,B,tt,K,st,ct,Y,Z,at,R,$,W,ot,it,rt,bt;try{let v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Et,!1),e.addEventListener("webglcontextrestored",Ot,!1),e.addEventListener("webglcontextcreationerror",dt,!1),N===null){let I="webgl2";if(N=$e(I,v),N===null)throw $e(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Bt()}catch(v){throw e.removeEventListener("webglcontextlost",Et,!1),e.removeEventListener("webglcontextrestored",Ot,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),Pt("WebGLRenderer: "+v.message),v}function Bt(){ne=new Im(N),ne.init(),it=new f0(N,ne),ie=new ym(N,ne,t,it),ut=new u0(N,ne),ie.reversedDepthBuffer&&u&&ut.buffers.depth.setReversed(!0),G=N.createFramebuffer(),P=N.createFramebuffer(),V=N.createFramebuffer(),xe=new Dm(N),wt=new Kg,Nt=new d0(N,ne,ut,wt,ie,it,xe),E=new Pm(C),x=new Ud(N),rt=new xm(N,x),B=new Lm(N,x,xe,rt),tt=new Fm(N,B,x,rt,xe),$=new Um(N,ie,Nt),Z=new Mm(wt),K=new $g(C,E,ne,ie,rt,Z),st=new _0(C,wt),ct=new jg,Y=new r0(ne),R=new _m(C,E,ut,tt,_,l),at=new h0(C,tt,ie),bt=new x0(N,xe,ie,ut),W=new vm(N,ne,xe),ot=new Nm(N,ne,xe),xe.programs=K.programs,C.capabilities=ie,C.extensions=ne,C.properties=wt,C.renderLists=ct,C.shadowMap=at,C.state=ut,C.info=xe}M!==Ue&&(L=new Bm(M,e.width,e.height,o,s,r));let nt=new tc(C,N);this.xr=nt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let v=ne.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=ne.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return mt},this.setPixelRatio=function(v){v!==void 0&&(mt=v,this.setSize(xt,Tt,!1))},this.getSize=function(v){return v.set(xt,Tt)},this.setSize=function(v,I,H=!0){if(nt.isPresenting){At("WebGLRenderer: Can't change size while VR device is presenting.");return}xt=v,Tt=I,e.width=Math.floor(v*mt),e.height=Math.floor(I*mt),H===!0&&(e.style.width=v+"px",e.style.height=I+"px"),L!==null&&L.setSize(e.width,e.height),this.setViewport(0,0,v,I)},this.getDrawingBufferSize=function(v){return v.set(xt*mt,Tt*mt).floor()},this.setDrawingBufferSize=function(v,I,H){xt=v,Tt=I,mt=H,e.width=Math.floor(v*H),e.height=Math.floor(I*H),this.setViewport(0,0,v,I)},this.setEffects=function(v){if(M===Ue){Pt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let I=0;I<v.length;I++)if(v[I].isOutputPass===!0){At("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(j)},this.getViewport=function(v){return v.copy(Ct)},this.setViewport=function(v,I,H,O){v.isVector4?Ct.set(v.x,v.y,v.z,v.w):Ct.set(v,I,H,O),ut.viewport(j.copy(Ct).multiplyScalar(Je()).round())},this.getScissor=function(v){return v.copy(Jt)},this.setScissor=function(v,I,H,O){v.isVector4?Jt.set(v.x,v.y,v.z,v.w):Jt.set(v,I,H,O),ut.scissor(Mt.copy(Jt).multiplyScalar(Je()).round())},this.getScissorTest=function(){return Kt},this.setScissorTest=function(v){ut.setScissorTest(Kt=v)},this.setOpaqueSort=function(v){Ft=v},this.setTransparentSort=function(v){ue=v},this.getClearColor=function(v){return v.copy(R.getClearColor())},this.setClearColor=function(){R.setClearColor(...arguments)},this.getClearAlpha=function(){return R.getClearAlpha()},this.setClearAlpha=function(){R.setClearAlpha(...arguments)},this.clear=function(v=!0,I=!0,H=!0){let O=0;if(v){let z=!1;if(et!==null){let ht=et.texture.format;z=f.has(ht)}if(z){let ht=et.texture.type,_t=d.has(ht),lt=R.getClearColor(),gt=R.getClearAlpha(),St=lt.r,Ut=lt.g,Vt=lt.b;_t?(y[0]=St,y[1]=Ut,y[2]=Vt,y[3]=gt,N.clearBufferuiv(N.COLOR,0,y)):(w[0]=St,w[1]=Ut,w[2]=Vt,w[3]=gt,N.clearBufferiv(N.COLOR,0,w))}else O|=N.COLOR_BUFFER_BIT}I&&(O|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(O|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&N.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),F=v},this.dispose=function(){e.removeEventListener("webglcontextlost",Et,!1),e.removeEventListener("webglcontextrestored",Ot,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),R.dispose(),ct.dispose(),Y.dispose(),Nt.dispose(),wt.dispose(),E.dispose(),tt.dispose(),B.dispose(),rt.dispose(),bt.dispose(),K.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",pc),nt.removeEventListener("sessionend",mc),oi.stop()};function Et(v){v.preventDefault(),Ss("WebGLRenderer: Context Lost."),D=!0}function Ot(){Ss("WebGLRenderer: Context Restored."),D=!1;let v=xe.autoReset,I=at.enabled,H=at.autoUpdate,O=at.needsUpdate,z=at.type;Bt(),xe.autoReset=v,at.enabled=I,at.autoUpdate=H,at.needsUpdate=O,at.type=z}function dt(v){Pt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function $t(v){let I=v.target;I.removeEventListener("dispose",$t),Se(I)}function Se(v){Wn(v),wt.remove(v)}function Wn(v){let I=wt.get(v).programs;I!==void 0&&(I.forEach(function(H){K.releaseProgram(H)}),v.isShaderMaterial&&K.releaseShaderCache(v))}this.renderBufferDirect=function(v,I,H,O,z,ht){I===null&&(I=Ye);let _t=z.isMesh&&z.matrixWorld.determinantAffine()<0,lt=Ju(v,I,H,O,z);ut.setMaterial(O,_t);let gt=H.index,St=1;if(O.wireframe===!0){if(gt=B.getWireframeAttribute(H),gt===void 0)return;St=2}let Ut=H.drawRange,Vt=H.attributes.position,vt=Ut.start*St,Gt=(Ut.start+Ut.count)*St;ht!==null&&(vt=Math.max(vt,ht.start*St),Gt=Math.min(Gt,(ht.start+ht.count)*St)),gt!==null?(vt=Math.max(vt,0),Gt=Math.min(Gt,gt.count)):Vt!=null&&(vt=Math.max(vt,0),Gt=Math.min(Gt,Vt.count));let de=Gt-vt;if(de<0||de===1/0)return;rt.setup(z,O,lt,H,gt);let te,Qt=W;if(gt!==null&&(te=x.get(gt),Qt=ot,Qt.setIndex(te)),z.isMesh)O.wireframe===!0?(ut.setLineWidth(O.wireframeLinewidth*Je()),Qt.setMode(N.LINES)):Qt.setMode(N.TRIANGLES);else if(z.isLine){let Ie=O.linewidth;Ie===void 0&&(Ie=1),ut.setLineWidth(Ie*Je()),z.isLineSegments?Qt.setMode(N.LINES):z.isLineLoop?Qt.setMode(N.LINE_LOOP):Qt.setMode(N.LINE_STRIP)}else z.isPoints?Qt.setMode(N.POINTS):z.isSprite&&Qt.setMode(N.TRIANGLES);if(z.isBatchedMesh)if(ne.get("WEBGL_multi_draw"))Qt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let Ie=z._multiDrawStarts,yt=z._multiDrawCounts,Oe=z._multiDrawCount,qt=gt?x.get(gt).bytesPerElement:1,li=wt.get(O).currentProgram.getUniforms();for(let Le=0;Le<Oe;Le++)li.setValue(N,"_gl_DrawID",Le),Qt.render(Ie[Le]/qt,yt[Le])}else if(z.isInstancedMesh)Qt.renderInstances(vt,de,z.count);else if(H.isInstancedBufferGeometry){let Ie=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,yt=Math.min(H.instanceCount,Ie);Qt.renderInstances(vt,de,yt)}else Qt.render(vt,de)};function fc(v,I,H,O){F!==null&&v.isNodeMaterial&&F.setObject(O,v),_e===!0&&Z.setState(v,H,!1),v.transparent===!0&&v.side===tn&&v.forceSinglePass===!1?(v.side=He,v.needsUpdate=!0,os(v,I,O),v.side=ni,v.needsUpdate=!0,os(v,I,O),v.side=tn):os(v,I,O)}this.compile=function(v,I,H=null){H===null&&(H=v),F!==null&&F.renderStart(v,I,H),T=Y.get(H),T.init(I),b.push(T),H.traverseVisible(function(z){z.isLight&&z.layers.test(I.layers)&&(T.pushLight(z),z.castShadow&&T.pushShadow(z))}),v!==H&&v.traverseVisible(function(z){z.isLight&&z.layers.test(I.layers)&&(T.pushLight(z),z.castShadow&&T.pushShadow(z))}),T.setupLights(),F!==null&&F.updateLights(T.state.lightsArray),ke=this.localClippingEnabled,_e=Z.init(this.clippingPlanes,ke),_e===!0&&Z.setGlobalState(this.clippingPlanes,I),F!==null&&at.render(T.state.shadowsArray,H,I);let O=new Set;return v.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let ht=z.material;if(ht)if(Array.isArray(ht))for(let _t=0;_t<ht.length;_t++){let lt=ht[_t];fc(lt,H,I,z),O.add(lt)}else fc(ht,H,I,z),O.add(ht)}),T=b.pop(),F!==null&&F.renderEnd(),O},this.compileAsync=function(v,I,H=null){let O=this.compile(v,I,H);return new Promise(z=>{function ht(){if(O.forEach(function(_t){let gt=wt.get(_t).currentProgram;(gt===void 0||gt.isReady())&&O.delete(_t)}),O.size===0){z(v);return}setTimeout(ht,10)}ne.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let Fo=null;function Yu(v){Fo&&Fo(v)}function pc(){oi.stop()}function mc(){oi.start()}let oi=new mu;oi.setAnimationLoop(Yu),typeof self<"u"&&oi.setContext(self),this.setAnimationLoop=function(v){Fo=v,nt.setAnimationLoop(v),v===null?oi.stop():oi.start()},nt.addEventListener("sessionstart",pc),nt.addEventListener("sessionend",mc),this.render=function(v,I){if(I!==void 0&&I.isCamera!==!0){Pt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;F!==null&&F.renderStart(v,I);let H=nt.enabled===!0&&nt.isPresenting===!0,O=L!==null&&(et===null||H)&&L.begin(C,et);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(I),I=nt.getCamera()),v.isScene===!0&&v.onBeforeRender(C,v,I,et),T=Y.get(v,b.length),T.init(I),T.state.textureUnits=Nt.getTextureUnits(),b.push(T),re.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),I.isArrayCamera?Re.setFromArrayCamera(I):kt.setFromProjectionMatrix(re,je,I.reversedDepth),ke=this.localClippingEnabled,_e=Z.init(this.clippingPlanes,ke),A=ct.get(v,g.length),A.init(),g.push(A),this.info.render.frame++,nt.enabled===!0&&nt.isPresenting===!0){let _t=C.xr.getDepthSensingMesh();_t!==null&&Oo(_t,I,-1/0,C.sortObjects)}Oo(v,I,0,C.sortObjects),A.finish(),F!==null&&F.updateLights(T.state.lightsArray),C.sortObjects===!0&&A.sort(Ft,ue),Ze=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,Ze&&R.addToRenderList(A,v),this.info.autoReset===!0&&this.info.reset(),_e===!0&&Z.beginShadows();let z=T.state.shadowsArray;if(at.render(z,v,I),_e===!0&&Z.endShadows(),(O&&L.hasRenderPass())===!1){let _t=A.opaque,lt=A.transmissive;if(T.setupLights(),I.isArrayCamera){let gt=I.cameras;if(lt.length>0)for(let St=0,Ut=gt.length;St<Ut;St++){let Vt=gt[St];_c(_t,lt,v,Vt)}Ze&&R.render(v);for(let St=0,Ut=gt.length;St<Ut;St++){let Vt=gt[St];gc(A,v,Vt,Vt.viewport)}}else lt.length>0&&_c(_t,lt,v,I),Ze&&R.render(v),gc(A,v,I)}et!==null&&k===0&&(Nt.updateMultisampleRenderTarget(et),Nt.updateRenderTargetMipmap(et)),O&&L.end(C),v.isScene===!0&&v.onAfterRender(C,v,I),rt.resetDefaultState(),X=-1,Q=null,b.pop(),b.length>0?(T=b[b.length-1],Nt.setTextureUnits(T.state.textureUnits),_e===!0&&Z.setGlobalState(C.clippingPlanes,T.state.camera)):T=null,g.pop(),g.length>0?A=g[g.length-1]:A=null,F!==null&&F.renderEnd()};function Oo(v,I,H,O){if(v.visible===!1)return;if(v.layers.test(I.layers)){if(v.isGroup)H=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(I);else if(v.isLight)T.pushLight(v),v.castShadow&&T.pushShadow(v);else if(v.isSprite){let _t=I.isArrayCamera?Re:kt;if(!v.frustumCulled||v.intersectsFrustum(_t)){O&&Me.setFromMatrixPosition(v.matrixWorld).applyMatrix4(re);let lt=tt.update(v),gt=v.material;gt.visible&&A.push(v,lt,gt,H,Me.z,null,I)}}else if(v.isMesh||v.isLine||v.isPoints){let _t=I.isArrayCamera?Re:kt;if(!v.frustumCulled||v.intersectsFrustum(_t)){let lt=tt.update(v),gt=v.material;if(O&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Me.copy(v.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),Me.copy(lt.boundingSphere.center)),Me.applyMatrix4(v.matrixWorld).applyMatrix4(re)),Array.isArray(gt)){let St=lt.groups;for(let Ut=0,Vt=St.length;Ut<Vt;Ut++){let vt=St[Ut],Gt=gt[vt.materialIndex];Gt&&Gt.visible&&A.push(v,lt,Gt,H,Me.z,vt,I)}}else gt.visible&&A.push(v,lt,gt,H,Me.z,null,I)}}}let ht=v.children;for(let _t=0,lt=ht.length;_t<lt;_t++)Oo(ht[_t],I,H,O)}function gc(v,I,H,O){let{opaque:z,transmissive:ht,transparent:_t}=v;T.setupLightsView(H),_e===!0&&Z.setGlobalState(C.clippingPlanes,H),O&&ut.viewport(j.copy(O)),z.length>0&&cr(z,I,H),ht.length>0&&cr(ht,I,H),_t.length>0&&cr(_t,I,H),ut.buffers.depth.setTest(!0),ut.buffers.depth.setMask(!0),ut.buffers.color.setMask(!0),ut.setPolygonOffset(!1)}function _c(v,I,H,O){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[O.id]===void 0){let vt=ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[O.id]=new Xe(1,1,{generateMipmaps:!0,type:vt?un:Ue,minFilter:Bn,samples:Math.max(4,ie.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ht.workingColorSpace})}let ht=T.state.transmissionRenderTarget[O.id],_t=O.viewport||j;ht.setSize(_t.z*C.transmissionResolutionScale,_t.w*C.transmissionResolutionScale);let lt=C.getRenderTarget(),gt=C.getActiveCubeFace(),St=C.getActiveMipmapLevel();C.setRenderTarget(ht),C.getClearColor(J),pt=C.getClearAlpha(),pt<1&&C.setClearColor(16777215,.5),C.clear(),Ze&&R.render(H);let Ut=C.toneMapping;C.toneMapping=bn;let Vt=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),T.setupLightsView(O),_e===!0&&Z.setGlobalState(C.clippingPlanes,O),cr(v,H,O),Nt.updateMultisampleRenderTarget(ht),Nt.updateRenderTargetMipmap(ht),ne.has("WEBGL_multisampled_render_to_texture")===!1){let vt=!1;for(let Gt=0,de=I.length;Gt<de;Gt++){let te=I[Gt],{object:Qt,geometry:Ie,material:yt,group:Oe}=te;if(yt.side===tn&&Qt.layers.test(O.layers)){let qt=yt.side;yt.side=He,yt.needsUpdate=!0,xc(Qt,H,O,Ie,yt,Oe),yt.side=qt,yt.needsUpdate=!0,vt=!0}}vt===!0&&(Nt.updateMultisampleRenderTarget(ht),Nt.updateRenderTargetMipmap(ht))}C.setRenderTarget(lt,gt,St),C.setClearColor(J,pt),Vt!==void 0&&(O.viewport=Vt),C.toneMapping=Ut}function cr(v,I,H){let O=I.isScene===!0?I.overrideMaterial:null;for(let z=0,ht=v.length;z<ht;z++){let _t=v[z],{object:lt,geometry:gt,group:St}=_t,Ut=_t.material;Ut.allowOverride===!0&&O!==null&&(Ut=O),lt.layers.test(H.layers)&&xc(lt,I,H,gt,Ut,St)}}function xc(v,I,H,O,z,ht){F!==null&&z.isNodeMaterial&&F.setObject(v,z),v.onBeforeRender(C,I,H,O,z,ht),v.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),z.onBeforeRender(C,I,H,O,v,ht),z.transparent===!0&&z.side===tn&&z.forceSinglePass===!1?(z.side=He,z.needsUpdate=!0,C.renderBufferDirect(H,I,O,z,v,ht),z.side=ni,z.needsUpdate=!0,C.renderBufferDirect(H,I,O,z,v,ht),z.side=tn):C.renderBufferDirect(H,I,O,z,v,ht),v.onAfterRender(C,I,H,O,z,ht)}function vc(v){let I=0;for(let H of v)H.texture!==null&&I++;return I}function os(v,I,H){I.isScene!==!0&&(I=Ye);let O=wt.get(v),z=T.state.lights,ht=T.state.shadowsArray,_t=z.state.version,lt=K.getParameters(v,z.state,ht,I,H,T.state.lightProbeGridArray),gt=K.getProgramCacheKey(lt),St=O.programs;O.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?I.environment:null,O.fog=I.fog;let Ut=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;O.envMap=E.get(v.envMap||O.environment,Ut),O.envMapRotation=O.environment!==null&&v.envMap===null?I.environmentRotation:v.envMapRotation,St===void 0&&(v.addEventListener("dispose",$t),St=new Map,O.programs=St,O.programVariants=new Map);let Vt=St.get(gt);if(Vt!==void 0){if(O.currentProgram===Vt&&O.lightsStateVersion===_t)return Mc(v,lt),Vt}else lt.uniforms=K.getUniforms(v),F!==null&&v.isNodeMaterial&&F.build(v,H,lt),v.onBeforeCompile(lt,C),Vt=K.acquireProgram(lt,gt),St.set(gt,Vt),O.uniforms=lt.uniforms;let vt=O.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(vt.clippingPlanes=Z.uniform),Mc(v,lt),O.needsLights=Ku(v),O.lightsStateVersion=_t,O.needsLights&&(vt.ambientLightColor.value=z.state.ambient,vt.lightProbe.value=z.state.probe,vt.sunLights.value=z.state.sun,vt.sunLightShadows.value=z.state.sunShadow,vt.directionalLights.value=z.state.directional,vt.directionalLightShadows.value=z.state.directionalShadow,vt.spotLights.value=z.state.spot,vt.spotLightShadows.value=z.state.spotShadow,vt.rectAreaLights.value=z.state.rectArea,vt.ltc_1.value=z.state.rectAreaLTC1,vt.ltc_2.value=z.state.rectAreaLTC2,vt.pointLights.value=z.state.point,vt.pointLightShadows.value=z.state.pointShadow,vt.hemisphereLights.value=z.state.hemi,vt.sunShadowMatrix.value=z.state.sunShadowMatrix,vt.sunShadowCascade.value=z.state.sunShadowCascade,vt.directionalShadowMatrix.value=z.state.directionalShadowMatrix,vt.spotLightMatrix.value=z.state.spotLightMatrix,vt.spotLightMap.value=z.state.spotLightMap,vt.pointShadowMatrix.value=z.state.pointShadowMatrix),O.numLightProbeGrids=vc(T.state.lightProbeGridArray),O.currentProgram=Vt,O.uniformsList=null,Vt}function Zu(v,I,H,O,z){let ht=wt.get(v),_t=ht.currentProgram.id+","+O+","+z,lt=ht.programVariants.get(_t);return lt===void 0?(lt=os(v,I,H),ht.programVariants.set(_t,lt)):(ht.currentProgram=lt,ht.uniformsList=null,ht.outputColorSpace=O,ht.toneMapping=z),lt}function yc(v){if(v.uniformsList===null){let I=v.currentProgram.getUniforms();v.uniformsList=ns.seqWithValue(I.seq,v.uniforms)}return v.uniformsList}function Mc(v,I){let H=wt.get(v);H.outputColorSpace=I.outputColorSpace,H.batching=I.batching,H.batchingColor=I.batchingColor,H.instancing=I.instancing,H.instancingColor=I.instancingColor,H.instancingMorph=I.instancingMorph,H.skinning=I.skinning,H.morphTargets=I.morphTargets,H.morphNormals=I.morphNormals,H.morphColors=I.morphColors,H.morphTargetsCount=I.morphTargetsCount,H.numClippingPlanes=I.numClippingPlanes,H.numIntersection=I.numClipIntersection,H.vertexAlphas=I.vertexAlphas,H.vertexTangents=I.vertexTangents,H.toneMapping=I.toneMapping}function Ju(v,I,H,O,z){I.isScene!==!0&&(I=Ye),Nt.resetTextureUnits();let ht=I.fog,_t=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?I.environment:null,lt=et===null?C.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Ht.workingColorSpace,gt=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,St=E.get(O.envMap||_t,gt),Ut=O.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Vt=!!H.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),vt=!!H.morphAttributes.position,Gt=!!H.morphAttributes.normal,de=!!H.morphAttributes.color,te=bn;O.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(te=C.toneMapping);let Qt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ie=Qt!==void 0?Qt.length:0,yt=wt.get(O),Oe=T.state.lights;if(_e===!0&&(ke===!0||v!==Q)){let ae=v===Q&&O.id===X;Z.setState(O,v,ae)}let qt=!1,li=!1;O.version===yt.__version?yt.needsLights&&yt.lightsStateVersion!==Oe.state.version||z.isBatchedMesh&&yt.batching===!1||!z.isBatchedMesh&&yt.batching===!0||z.isBatchedMesh&&yt.batchingColor===!0&&z._colorsTexture===null||z.isBatchedMesh&&yt.batchingColor===!1&&z._colorsTexture!==null||z.isInstancedMesh&&yt.instancing===!1||!z.isInstancedMesh&&yt.instancing===!0||z.isSkinnedMesh&&yt.skinning===!1||!z.isSkinnedMesh&&yt.skinning===!0||z.isInstancedMesh&&yt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&yt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&yt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&yt.instancingMorph===!1&&z.morphTexture!==null||yt.envMap!==St||O.fog===!0&&yt.fog!==ht||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==Z.numPlanes||yt.numIntersection!==Z.numIntersection)||yt.vertexAlphas!==Ut||yt.vertexTangents!==Vt||yt.morphTargets!==vt||yt.morphNormals!==Gt||yt.morphColors!==de||yt.morphTargetsCount!==Ie||yt.numLightProbeGrids!==vc(T.state.lightProbeGridArray)?qt=!0:(yt.outputColorSpace!==lt||yt.toneMapping!==te)&&(li=!0):(qt=!0,yt.__version=O.version);let Le=yt.currentProgram;(qt===!0||li===!0)&&(Le=li===!0?Zu(O,I,z,lt,te):os(O,I,z),F&&O.isNodeMaterial&&F.onUpdateProgram(O,Le,yt));let hr=!1,Xn=!1,ci=!1,Xt=Le.getUniforms(),Ce=yt.uniforms;if(ut.useProgram(Le.program)&&(hr=!0,Xn=!0,ci=!0),O.id!==X&&(X=O.id,Xn=!0),hr||Q!==v){ut.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),Xt.setValue(N,"projectionMatrix",v.projectionMatrix),Xt.setValue(N,"viewMatrix",v.matrixWorldInverse);let be=Xt.map.cameraPosition;be!==void 0&&be.setValue(N,pn.setFromMatrixPosition(v.matrixWorld)),ie.logarithmicDepthBuffer&&Xt.setValue(N,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&Xt.setValue(N,"isOrthographic",v.isOrthographicCamera===!0),Q!==v&&(Q=v,Xn=!0,ci=!0)}if(yt.needsLights&&(Oe.state.sunShadowMap.length>0&&Xt.setValue(N,"sunShadowMap",Oe.state.sunShadowMap,Nt),Oe.state.directionalShadowMap.length>0&&Xt.setValue(N,"directionalShadowMap",Oe.state.directionalShadowMap,Nt),Oe.state.spotShadowMap.length>0&&Xt.setValue(N,"spotShadowMap",Oe.state.spotShadowMap,Nt),Oe.state.pointShadowMap.length>0&&Xt.setValue(N,"pointShadowMap",Oe.state.pointShadowMap,Nt)),z.isSkinnedMesh){Xt.setOptional(N,z,"bindMatrix"),Xt.setOptional(N,z,"bindMatrixInverse");let ae=z.skeleton;ae&&(ae.boneTexture===null&&ae.computeBoneTexture(),Xt.setValue(N,"boneTexture",ae.boneTexture,Nt))}z.isBatchedMesh&&(Xt.setOptional(N,z,"batchingTexture"),Xt.setValue(N,"batchingTexture",z._matricesTexture,Nt),Xt.setOptional(N,z,"batchingIdTexture"),Xt.setValue(N,"batchingIdTexture",z._indirectTexture,Nt),Xt.setOptional(N,z,"batchingColorTexture"),z._colorsTexture!==null&&Xt.setValue(N,"batchingColorTexture",z._colorsTexture,Nt));let nn=H.morphAttributes;if((nn.position!==void 0||nn.normal!==void 0||nn.color!==void 0)&&$.update(z,H,Le),(Xn||yt.receiveShadow!==z.receiveShadow)&&(yt.receiveShadow=z.receiveShadow,Xt.setValue(N,"receiveShadow",z.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&I.environment!==null&&(Ce.envMapIntensity.value=I.environmentIntensity),Ce.dfgLUT!==void 0&&(Ce.dfgLUT.value=y0()),Xn){if(Xt.setValue(N,"toneMappingExposure",C.toneMappingExposure),yt.needsLights&&$u(Ce,ci),ht&&O.fog===!0&&st.refreshFogUniforms(Ce,ht),st.refreshMaterialUniforms(Ce,O,mt,Tt,T.state.transmissionRenderTarget[v.id]),yt.needsLights&&yt.numLightProbeGrids>0){let ae=S,be=0;for(let An of T.state.lightProbeGridArray)An.texture!==null&&(ae.textures[be]=An.texture,ae.min[be]=An.boundingBox.min,ae.max[be]=An.boundingBox.max,ae.resolution[be]=An.resolution,be++);for(let An in ae)ae[An].length=be;Ce.probesSH.value=ae.textures,Ce.probesMin.value=ae.min,Ce.probesMax.value=ae.max,Ce.probesResolution.value=ae.resolution}ns.upload(N,yc(yt),Ce,Nt)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(ns.upload(N,yc(yt),Ce,Nt),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&Xt.setValue(N,"center",z.center),Xt.setValue(N,"modelViewMatrix",z.modelViewMatrix),Xt.setValue(N,"normalMatrix",z.normalMatrix),Xt.setValue(N,"modelMatrix",z.matrixWorld),O.uniformsGroups!==void 0){let ae=O.uniformsGroups;for(let be=0,An=ae.length;be<An;be++){let bc=ae[be];bt.update(bc,Le),bt.bind(bc,Le)}}return Le}function $u(v,I){v.ambientLightColor.needsUpdate=I,v.lightProbe.needsUpdate=I,v.sunLights.needsUpdate=I,v.sunLightShadows.needsUpdate=I,v.directionalLights.needsUpdate=I,v.directionalLightShadows.needsUpdate=I,v.pointLights.needsUpdate=I,v.pointLightShadows.needsUpdate=I,v.spotLights.needsUpdate=I,v.spotLightShadows.needsUpdate=I,v.rectAreaLights.needsUpdate=I,v.hemisphereLights.needsUpdate=I}function Ku(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return et},this.setRenderTargetTextures=function(v,I,H){let O=wt.get(v);O.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),wt.get(v.texture).__webglTexture=I,wt.get(v.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:H,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,I){let H=wt.get(v);H.__webglFramebuffer=I,H.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(v,I=0,H=0){et=v,q=I,k=H;let O=null,z=!1,ht=!1;if(v){let lt=wt.get(v);if(lt.__useDefaultFramebuffer!==void 0){ut.bindFramebuffer(N.FRAMEBUFFER,lt.__webglFramebuffer),j.copy(v.viewport),Mt.copy(v.scissor),Dt=v.scissorTest,ut.viewport(j),ut.scissor(Mt),ut.setScissorTest(Dt),X=-1;return}else if(lt.__webglFramebuffer===void 0)Nt.setupRenderTarget(v);else if(lt.__hasExternalTextures)Nt.rebindTextures(v,wt.get(v.texture).__webglTexture,wt.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let Ut=v.depthTexture;if(lt.__boundDepthTexture!==Ut){if(Ut!==null&&wt.has(Ut)&&(v.width!==Ut.image.width||v.height!==Ut.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Nt.setupDepthRenderbuffer(v)}}let gt=v.texture;(gt.isData3DTexture||gt.isDataArrayTexture||gt.isCompressedArrayTexture)&&(ht=!0);let St=wt.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(St[I])?O=St[I][H]:O=St[I],z=!0):v.samples>0&&Nt.useMultisampledRTT(v)===!1?O=wt.get(v).__webglMultisampledFramebuffer:Array.isArray(St)?O=St[H]:O=St,j.copy(v.viewport),Mt.copy(v.scissor),Dt=v.scissorTest}else j.copy(Ct).multiplyScalar(mt).floor(),Mt.copy(Jt).multiplyScalar(mt).floor(),Dt=Kt;if(H!==0&&(O=G),ut.bindFramebuffer(N.FRAMEBUFFER,O)&&ut.drawBuffers(v,O),ut.viewport(j),ut.scissor(Mt),ut.setScissorTest(Dt),z){let lt=wt.get(v.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+I,lt.__webglTexture,H)}else if(ht){let lt=I;for(let gt=0;gt<v.textures.length;gt++){let St=wt.get(v.textures[gt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+gt,St.__webglTexture,H,lt)}}else if(v!==null&&H!==0){let lt=wt.get(v.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,lt.__webglTexture,H)}X=-1};function Sc(v){let I=wt.get(v);return(I.__readFormat!==v.format||I.__readType!==v.type)&&(I.__readFormat=v.format,I.__readType=v.type,I.__formatReadable=ie.textureFormatReadable(v.format),I.__typeReadable=ie.textureTypeReadable(v.type)),I}this.readRenderTargetPixels=function(v,I,H,O,z,ht,_t,lt=0){if(!(v&&v.isWebGLRenderTarget)){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let gt=wt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&_t!==void 0&&(gt=gt[_t],Array.isArray(gt)&&(gt=gt[0])),gt){ut.bindFramebuffer(N.FRAMEBUFFER,gt);try{let St=v.textures[lt],Ut=St.format,Vt=St.type;v.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+lt);let vt=Sc(St);if(vt.__formatReadable===!1){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(vt.__typeReadable===!1){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=v.width-O&&H>=0&&H<=v.height-z&&N.readPixels(I,H,O,z,it.convert(Ut),it.convert(Vt),ht)}finally{let St=et!==null?wt.get(et).__webglFramebuffer:null;ut.bindFramebuffer(N.FRAMEBUFFER,St)}}},this.readRenderTargetPixelsAsync=async function(v,I,H,O,z,ht,_t,lt=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let gt=wt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&_t!==void 0&&(gt=gt[_t],Array.isArray(gt)&&(gt=gt[0])),gt)if(I>=0&&I<=v.width-O&&H>=0&&H<=v.height-z){ut.bindFramebuffer(N.FRAMEBUFFER,gt);let St=v.textures[lt],Ut=St.format,Vt=St.type;v.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+lt);let vt=Sc(St);if(vt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(vt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Gt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Gt),N.bufferData(N.PIXEL_PACK_BUFFER,ht.byteLength,N.STREAM_READ),N.readPixels(I,H,O,z,it.convert(Ut),it.convert(Vt),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let de=et!==null?wt.get(et).__webglFramebuffer:null;ut.bindFramebuffer(N.FRAMEBUFFER,de);let te=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Bh(N,te,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Gt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ht),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(Gt),N.deleteSync(te),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,I=null,H=0){let O=Math.pow(2,-H),z=Math.floor(v.image.width*O),ht=Math.floor(v.image.height*O),_t=I!==null?I.x:0,lt=I!==null?I.y:0;Nt.setTexture2D(v,0),N.copyTexSubImage2D(N.TEXTURE_2D,H,0,0,_t,lt,z,ht),ut.unbindTexture()},this.copyTextureToTexture=function(v,I,H=null,O=null,z=0,ht=0){let _t,lt,gt,St,Ut,Vt,vt,Gt,de,te=v.isCompressedTexture?v.mipmaps[ht]:v.image;if(H!==null)_t=H.max.x-H.min.x,lt=H.max.y-H.min.y,gt=H.isBox3?H.max.z-H.min.z:1,St=H.min.x,Ut=H.min.y,Vt=H.isBox3?H.min.z:0;else{let Xt=Math.pow(2,-z);_t=Math.floor(te.width*Xt),lt=Math.floor(te.height*Xt),v.isDataArrayTexture?gt=te.depth:v.isData3DTexture?gt=Math.floor(te.depth*Xt):gt=1,St=0,Ut=0,Vt=0}O!==null?(vt=O.x,Gt=O.y,de=O.z):(vt=0,Gt=0,de=0);let Qt=it.convert(I.format),Ie=it.convert(I.type),yt;I.isData3DTexture?(Nt.setTexture3D(I,0),yt=N.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(Nt.setTexture2DArray(I,0),yt=N.TEXTURE_2D_ARRAY):(Nt.setTexture2D(I,0),yt=N.TEXTURE_2D),ut.activeTexture(N.TEXTURE0),ut.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,I.flipY),ut.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),ut.pixelStorei(N.UNPACK_ALIGNMENT,I.unpackAlignment);let Oe=ut.getParameter(N.UNPACK_ROW_LENGTH),qt=ut.getParameter(N.UNPACK_IMAGE_HEIGHT),li=ut.getParameter(N.UNPACK_SKIP_PIXELS),Le=ut.getParameter(N.UNPACK_SKIP_ROWS),hr=ut.getParameter(N.UNPACK_SKIP_IMAGES);ut.pixelStorei(N.UNPACK_ROW_LENGTH,te.width),ut.pixelStorei(N.UNPACK_IMAGE_HEIGHT,te.height),ut.pixelStorei(N.UNPACK_SKIP_PIXELS,St),ut.pixelStorei(N.UNPACK_SKIP_ROWS,Ut),ut.pixelStorei(N.UNPACK_SKIP_IMAGES,Vt);let Xn=v.isDataArrayTexture||v.isData3DTexture,ci=I.isDataArrayTexture||I.isData3DTexture;if(v.isDepthTexture){let Xt=wt.get(v),Ce=wt.get(I),nn=wt.get(Xt.__renderTarget),ae=wt.get(Ce.__renderTarget);ut.bindFramebuffer(N.READ_FRAMEBUFFER,nn.__webglFramebuffer),ut.bindFramebuffer(N.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let be=0;be<gt;be++)Xn&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,wt.get(v).__webglTexture,z,Vt+be),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,wt.get(I).__webglTexture,ht,de+be)),N.blitFramebuffer(St,Ut,St+_t,Ut+lt,vt,Gt,vt+_t,Gt+lt,N.DEPTH_BUFFER_BIT,N.NEAREST);ut.bindFramebuffer(N.READ_FRAMEBUFFER,null),ut.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(z!==0||v.isRenderTargetTexture||wt.has(v)){let Xt=wt.get(v),Ce=wt.get(I);ut.bindFramebuffer(N.READ_FRAMEBUFFER,P),ut.bindFramebuffer(N.DRAW_FRAMEBUFFER,V);for(let nn=0;nn<gt;nn++)Xn?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Xt.__webglTexture,z,Vt+nn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Xt.__webglTexture,z),ci?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ce.__webglTexture,ht,de+nn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ce.__webglTexture,ht),z!==0?N.blitFramebuffer(St,Ut,St+_t,Ut+lt,vt,Gt,vt+_t,Gt+lt,N.COLOR_BUFFER_BIT,N.NEAREST):ci?N.copyTexSubImage3D(yt,ht,vt,Gt,de+nn,St,Ut,_t,lt):N.copyTexSubImage2D(yt,ht,vt,Gt,St,Ut,_t,lt);ut.bindFramebuffer(N.READ_FRAMEBUFFER,null),ut.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ci?v.isDataTexture||v.isData3DTexture?N.texSubImage3D(yt,ht,vt,Gt,de,_t,lt,gt,Qt,Ie,te.data):I.isCompressedArrayTexture?N.compressedTexSubImage3D(yt,ht,vt,Gt,de,_t,lt,gt,Qt,te.data):N.texSubImage3D(yt,ht,vt,Gt,de,_t,lt,gt,Qt,Ie,te):v.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ht,vt,Gt,_t,lt,Qt,Ie,te.data):v.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ht,vt,Gt,te.width,te.height,Qt,te.data):N.texSubImage2D(N.TEXTURE_2D,ht,vt,Gt,_t,lt,Qt,Ie,te);ut.pixelStorei(N.UNPACK_ROW_LENGTH,Oe),ut.pixelStorei(N.UNPACK_IMAGE_HEIGHT,qt),ut.pixelStorei(N.UNPACK_SKIP_PIXELS,li),ut.pixelStorei(N.UNPACK_SKIP_ROWS,Le),ut.pixelStorei(N.UNPACK_SKIP_IMAGES,hr),ht===0&&I.generateMipmaps===!0&&I.mipmapsAutoUpdate===!0&&N.generateMipmap(yt),ut.unbindTexture()},this.initRenderTarget=function(v){wt.get(v).__webglFramebuffer===void 0&&Nt.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Nt.setTextureCube(v,0):v.isData3DTexture?Nt.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Nt.setTexture2DArray(v,0):Nt.setTexture2D(v,0),ut.unbindTexture()},this.resetState=function(){q=0,k=0,et=null,ut.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return je}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Ht._getDrawingBufferColorSpace(t),e.unpackColorSpace=Ht._getUnpackColorSpace()}};var xo=null;function ss(){if(xo)return xo;let i=document.createElement("canvas");i.width=i.height=64;let t=i.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.35,"rgba(255,255,255,0.45)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),xo=new Us(i),xo}function Vn(i,t){let e=new Uint8Array(i*t),n=new mi(e,i,t,es,Ue);return n.minFilter=we,n.magFilter=we,n.wrapS=n.wrapT=Qe,n.needsUpdate=!0,{data:e,tex:n}}function si(i,t,e,n,s){let r=1-Math.exp(-e*2.5);i.position.x+=(t.pointer.x*n-i.position.x)*r,i.position.y+=(s.y+t.pointer.y*n*.6-i.position.y)*r}var vo=class{constructor(t,e){let n=Vn(t,e);this.data=n.data,this.tex=n.tex,this.W=t,this.H=e,this.n=0}push(t,e=2){if(!(++this.n%e)){this.data.copyWithin(this.W,0,this.W*(this.H-1));for(let n=0;n<this.W;n++)this.data[n]=Math.min(255,t[n]*255);this.tex.needsUpdate=!0}}};function wu(i,t,e,n,s=0){let r=new Float32Array(i*3);for(let l=0;l<i;l++)r[l*3]=(Math.random()-.5)*t,r[l*3+1]=(Math.random()-.5)*e,r[l*3+2]=(Math.random()-.5)*n+s;let a=new he;a.setAttribute("position",new oe(r,3));let o=new yn({size:.16,map:ss(),transparent:!0,opacity:.5,depthWrite:!1,blending:me});return{points:new Mn(a,o),mat:o}}var M0=`
attribute vec2 aSeed;
uniform float uTime, uBeat, uBass, uSize, uPR;
uniform sampler2D uSpec;
uniform vec3 uA, uB, uC;
varying vec3 vColor;
varying float vE;
void main() {
  vec3 dir = normalize(position);
  float len = length(position);
  float lon = atan(dir.z, dir.x);
  float band = clamp(pow(abs(dir.y), 0.85) * 0.85 + aSeed.x * 0.12 + 0.03 * sin(lon * 3.0 + uTime * 0.5), 0.0, 1.0);
  float e = texture2D(uSpec, vec2(band, 0.5)).r;
  float wob = sin(dir.x * 5.0 + uTime * 1.3) * sin(dir.y * 4.0 - uTime * 1.1) * sin(dir.z * 5.0 + uTime * 0.9);
  float radius = len * (1.0 + 0.10 * wob + e * 0.75 * (0.4 + aSeed.y) + uBeat * 0.10 + uBass * 0.12);
  vec4 mv = modelViewMatrix * vec4(dir * radius, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPR * (0.5 + e * 2.2 + uBeat * 0.6) * (8.0 / -mv.z) * (0.6 + aSeed.x * 0.8);
  vec3 base = mix(uA, uB, aSeed.x);
  vColor = mix(base, uC, clamp(e * 1.4, 0.0, 1.0));
  vE = e;
}`,S0=`
varying vec3 vColor;
varying float vE;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  a *= a;
  gl_FragColor = vec4(vColor * a * (0.75 + vE * 1.5), 1.0);
}`,yo=class{constructor(t){this.ctx=t,this.scene=new Pe,this.camera=new jt(55,1,.1,100),this.base={y:0,z:9},this.camera.position.set(0,0,this.base.z);let e=Vn(128,1);this.specData=e.data,this.specTex=e.tex;let n=24e3,s=new Float32Array(n*3),r=new Float32Array(n*2);for(let h=0;h<n;h++){let p=Math.random()*2-1,u=Math.random()*Math.PI*2,m=Math.sqrt(1-p*p),_=Math.random()<.65?2.4+(Math.random()-.5)*.3:1.2+Math.random()*2.2;s[h*3]=m*Math.cos(u)*_,s[h*3+1]=p*_,s[h*3+2]=m*Math.sin(u)*_,r[h*2]=Math.random(),r[h*2+1]=Math.random()}let a=new he;a.setAttribute("position",new oe(s,3)),a.setAttribute("aSeed",new oe(r,2)),this.mat=new ce({vertexShader:M0,fragmentShader:S0,transparent:!0,depthWrite:!1,blending:me,uniforms:{uTime:{value:0},uBeat:{value:0},uBass:{value:0},uSize:{value:4.4},uPR:{value:t.renderer.getPixelRatio()},uSpec:{value:this.specTex},uA:{value:t.colors[0]},uB:{value:t.colors[1]},uC:{value:t.colors[2]}}}),this.orb=new Mn(a,this.mat),this.scene.add(this.orb),this.core=new Rs(new Zi({map:ss(),transparent:!0,depthWrite:!1,blending:me,opacity:.5})),this.core.scale.setScalar(4),this.scene.add(this.core);let o=2600,l=new Float32Array(o*3);for(let h=0;h<o;h++)l[h*3]=(Math.random()-.5)*50,l[h*3+1]=(Math.random()-.5)*30,l[h*3+2]=(Math.random()-.5)*40-6;let c=new he;c.setAttribute("position",new oe(l,3)),this.dustMat=new yn({size:.18,map:ss(),transparent:!0,opacity:.55,depthWrite:!1,blending:me}),this.dust=new Mn(c,this.dustMat),this.scene.add(this.dust)}resize(t,e){this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.mat.uniforms.uPR.value=this.ctx.renderer.getPixelRatio()}update(t,e){let{audio:n,colors:s}=this.ctx;for(let a=0;a<128;a++)this.specData[a]=Math.min(255,n.spectrum[a]*255);this.specTex.needsUpdate=!0;let r=this.mat.uniforms;r.uTime.value=t,r.uBeat.value=n.beat,r.uBass.value=n.bass,this.orb.rotation.y+=e*(.08+n.level*.5+n.beat*.25),this.orb.rotation.x=Math.sin(t*.2)*.25,this.dust.rotation.y-=e*.012,this.core.material.color.copy(s[2]),this.core.material.opacity=.28+n.bass*.4+n.beat*.2,this.core.scale.setScalar(4.2+n.bass*2.2+n.beat*1.2),this.dustMat.color.copy(s[1]).lerp(new Rt(1,1,1),.35),this.dustMat.opacity=.35+n.treble*.5,si(this.camera,this.ctx,e,1.4,this.base),this.camera.position.z=this.base.z-n.beat*.5,this.camera.lookAt(0,0,0)}};var Mo=128,Au=64,b0=`
uniform sampler2D uHist;
uniform float uAmp;
varying vec2 vUv;
varying float vH;
varying float vFog;
void main() {
  vUv = uv;
  float mx = abs(uv.x - 0.5) * 2.0;
  float band = pow(mx, 0.9) * 0.92;
  float h = texture2D(uHist, vec2(band, uv.y)).r;
  h = pow(h, 1.35) * uAmp * (1.0 - uv.y * 0.55);
  vec3 p = position;
  p.y += h;
  vH = h;
  vFog = smoothstep(0.0, 1.0, uv.y);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`,E0=`
uniform vec3 uA, uB, uC;
uniform float uAmp;
varying vec2 vUv;
varying float vH;
varying float vFog;
void main() {
  vec2 g = vUv * vec2(96.0, 56.0);
  vec2 gw = fwidth(g);
  vec2 l = abs(fract(g - 0.5) - 0.5) / gw;
  float line = 1.0 - min(min(l.x, l.y), 1.0);
  float t = clamp(vH / uAmp * 1.8, 0.0, 1.0);
  vec3 col = mix(uA, uB, vUv.y);
  col = mix(col, uC, t);
  float a = line * (1.0 - vFog * 0.92) + 0.035 * (1.0 - vFog);
  gl_FragColor = vec4(col * a * (1.0 + t * 1.6), 1.0);
}`,T0=`
uniform vec3 uA, uB;
uniform float uBeat, uBass, uTime;
varying vec2 vUv;
void main() {
  vec2 p = (vUv - 0.5) * 2.0;
  float d = length(p);
  float disc = smoothstep(1.0, 0.97, d);
  float stripes = step(0.5, fract(p.y * 7.0 - uTime * 0.12));
  float cut = mix(1.0, stripes, smoothstep(0.15, -0.75, p.y));
  vec3 col = mix(uB, uA, (p.y + 1.0) * 0.5);
  float glow = exp(-d * 2.2) * 0.55;
  gl_FragColor = vec4(col * (disc * cut * (0.65 + uBass * 0.6) + glow * (0.35 + uBeat)), 1.0);
}`,So=class{constructor(t){this.ctx=t,this.scene=new Pe,this.camera=new jt(58,1,.1,120),this.base={y:3.4,z:12},this.camera.position.set(0,this.base.y,this.base.z);let e=Vn(Mo,Au);this.hist=e.data,this.histTex=e.tex,this._frame=0;let n=new Sn(56,40,96,56);n.rotateX(-Math.PI/2),this.mat=new ce({vertexShader:b0,fragmentShader:E0,transparent:!0,depthWrite:!1,blending:me,uniforms:{uHist:{value:this.histTex},uAmp:{value:7.5},uA:{value:t.colors[0]},uB:{value:t.colors[1]},uC:{value:t.colors[2]}}}),this.mesh=new le(n,this.mat),this.mesh.position.set(0,0,-8),this.scene.add(this.mesh),this.sunMat=new ce({vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:T0,transparent:!0,depthWrite:!1,blending:me,uniforms:{uA:{value:t.colors[2]},uB:{value:t.colors[1]},uBeat:{value:0},uBass:{value:0},uTime:{value:0}}}),this.sun=new le(new Sn(20,20),this.sunMat),this.sun.position.set(0,6.2,-30),this.scene.add(this.sun)}resize(t,e){this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}update(t,e){let{audio:n}=this.ctx;if(this._frame++,this._frame%2===0){this.hist.copyWithin(Mo,0,Mo*(Au-1));for(let r=0;r<Mo;r++)this.hist[r]=Math.min(255,n.spectrum[r]*255);this.histTex.needsUpdate=!0}let s=this.sunMat.uniforms;s.uBeat.value=n.beat,s.uBass.value=n.bass,s.uTime.value=t,this.sun.scale.setScalar(1+n.beat*.06+n.bass*.05),si(this.camera,this.ctx,e,2.2,this.base),this.camera.position.z=this.base.z-n.beat*.4,this.camera.lookAt(0,1.6,-8)}};var ec=7,nc=256,bo=48,w0=5,Eo=160;function Ru(i,t){let n=(1-Math.abs(t*2-1))*127*.9,s=Math.floor(n),r=n-s;return i[s]*(1-r)+i[Math.min(s+1,127)]*r}var To=class{constructor(t){this.ctx=t,this.scene=new Pe,this.camera=new jt(55,1,.1,100),this.base={y:0,z:10},this.camera.position.set(0,0,this.base.z),this.history=Array.from({length:bo},()=>new Float32Array(128)),this.head=0,this.rings=[];for(let n=0;n<ec;n++){let s=new he;s.setAttribute("position",new oe(new Float32Array(nc*3),3));let r=new gi({transparent:!0,opacity:.9,blending:me,depthWrite:!1}),a=new yn({size:.14,map:ss(),transparent:!0,opacity:.8,blending:me,depthWrite:!1}),o=new ln;o.add(new Ns(s,r)),o.add(new Mn(s,a)),o.position.z=-n*.45,this.scene.add(o),this.rings.push({group:o,geo:s,lineMat:r,ptMat:a})}let e=new he;e.setAttribute("position",new oe(new Float32Array(Eo*6),3)),e.setAttribute("color",new oe(new Float32Array(Eo*6),3)),this.bars=new Ls(e,new gi({vertexColors:!0,transparent:!0,blending:me,depthWrite:!1})),this.scene.add(this.bars)}resize(t,e){this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}update(t,e){let{audio:n,colors:s}=this.ctx;this.head=(this.head+1)%bo,this.history[this.head].set(n.spectrum);for(let o=0;o<ec;o++){let l=this.rings[o],c=this.history[(this.head-o*w0+bo*4)%bo],h=l.geo.attributes.position.array,p=2+o*.62,u=1.5-o*.12,m=.8+o*.15;for(let M=0;M<nc;M++){let f=M/nc,d=f*Math.PI*2+Math.PI/2,y=Ru(c,f),w=p+y*u+.05*Math.sin(d*6+t*m+o);h[M*3]=Math.cos(d)*w,h[M*3+1]=Math.sin(d)*w,h[M*3+2]=0}l.geo.attributes.position.needsUpdate=!0;let _=o/(ec-1);l.lineMat.color.copy(s[0]).lerp(s[1],_),l.ptMat.color.copy(l.lineMat.color).lerp(new Rt(1,1,1),.3),l.lineMat.opacity=.95-_*.6,l.ptMat.opacity=.9-_*.6,l.group.rotation.z+=e*.05*(o%2?1:-1)*(1+n.level*2),l.group.scale.setScalar(1+n.beat*.05*(1-_*.5))}let r=this.bars.geometry.attributes.position.array,a=this.bars.geometry.attributes.color.array;for(let o=0;o<Eo;o++){let l=o/Eo,c=l*Math.PI*2+Math.PI/2,h=Ru(n.spectrum,l),p=1.05,u=p+.05+h*1.4,m=Math.cos(c),_=Math.sin(c);r[o*6]=m*p,r[o*6+1]=_*p,r[o*6+2]=0,r[o*6+3]=m*u,r[o*6+4]=_*u,r[o*6+5]=0,a[o*6]=s[1].r*.35,a[o*6+1]=s[1].g*.35,a[o*6+2]=s[1].b*.35,a[o*6+3]=s[2].r,a[o*6+4]=s[2].g,a[o*6+5]=s[2].b}this.bars.geometry.attributes.position.needsUpdate=!0,this.bars.geometry.attributes.color.needsUpdate=!0,this.bars.rotation.z-=e*.1,this.bars.scale.setScalar(1+n.beat*.08),si(this.camera,this.ctx,e,1.2,this.base),this.camera.position.z=this.base.z-n.beat*.4,this.camera.lookAt(0,0,0)}};var Cu=60,A0=`
uniform sampler2D uHist;
uniform float uAmp, uTime;
varying vec2 vUv;
varying float vH;
void main() {
  vUv = uv;
  float a = abs(fract(uv.x + 0.5) * 2.0 - 1.0);
  float band = pow(a, 0.9) * 0.92;
  float h = pow(texture2D(uHist, vec2(band, uv.y)).r, 1.3);
  vec2 d = normalize(position.xy);
  float r = 4.2 + h * uAmp + 0.25 * sin(uv.y * 18.0 - uTime * 2.0 + uv.x * 18.8496);
  vH = h;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(d * r, position.z, 1.0);
}`,R0=`
uniform vec3 uA, uB, uC;
uniform float uTime, uBeat;
varying vec2 vUv;
varying float vH;
void main() {
  vec2 g = vec2(vUv.x * 64.0, vUv.y * 44.0 + uTime * 2.2);
  vec2 gw = fwidth(g);
  vec2 l = abs(fract(g - 0.5) - 0.5) / gw;
  float line = 1.0 - min(min(l.x, l.y), 1.0);
  vec3 col = mix(uA, uB, clamp(vUv.y * 1.3, 0.0, 1.0));
  col = mix(col, uC, clamp(vH * 1.7, 0.0, 1.0));
  float fade = (1.0 - smoothstep(0.05, 1.0, vUv.y)) * smoothstep(0.0, 0.05, vUv.y);
  float a = (line + 0.04) * fade;
  gl_FragColor = vec4(col * a * (1.0 + vH * 1.8 + uBeat * 0.4), 1.0);
}`,wo=class{constructor(t){this.ctx=t,this.scene=new Pe,this.camera=new jt(75,1,.05,100),this.base={y:0,z:0},this.hist=new vo(128,80);let e=new Bs(1,1,Cu,128,80,!0);e.rotateX(-Math.PI/2),this.mat=new ce({vertexShader:A0,fragmentShader:R0,transparent:!0,depthWrite:!1,side:tn,blending:me,uniforms:{uHist:{value:this.hist.tex},uAmp:{value:3.2},uTime:{value:0},uBeat:{value:0},uA:{value:t.colors[0]},uB:{value:t.colors[1]},uC:{value:t.colors[2]}}}),this.mesh=new le(e,this.mat),this.mesh.position.z=-Cu/2+3,this.mesh.rotation.z=Math.PI/2,this.scene.add(this.mesh)}resize(t,e){this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}update(t,e){let{audio:n,pointer:s}=this.ctx;this.hist.push(n.spectrum,2),this.mat.uniforms.uTime.value=t,this.mat.uniforms.uBeat.value=n.beat,this.camera.rotation.z+=e*(.08+n.level*.35),this.camera.position.x+=(s.x*.5-this.camera.position.x)*.05,this.camera.position.y+=(s.y*.35-this.camera.position.y)*.05,this.camera.fov=75+n.beat*7,this.camera.updateProjectionMatrix()}};var ri=56,rr=22,Pu=.62,Iu=1.1,Ao=rr*3+2,Ro=class{constructor(t){this.ctx=t,this.scene=new Pe,this.camera=new jt(52,1,.1,120),this.history=Array.from({length:Ao},()=>new Float32Array(128)),this.head=0,this.tmp=new Rt,this.mesh=new Ps(new Qn(1,1,1),new Hs,ri*rr),this.mesh.instanceMatrix.setUsage(zl),this.mesh.frustumCulled=!1;for(let n=0;n<ri*rr;n++)this.mesh.setColorAt(n,this.tmp.setRGB(0,0,0));this.scene.add(this.mesh),this.scene.add(new qs(16777215,1.5));let e=new Xs(16777215,2.6);e.position.set(5,10,8),this.scene.add(e),this.bandOf=new Int16Array(ri);for(let n=0;n<ri;n++){let s=Math.abs((n+.5)/ri*2-1);this.bandOf[n]=Math.min(127,Math.floor(Math.pow(s,.9)*127*.92))}}resize(t,e){this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}update(t,e){let{audio:n,colors:s,pointer:r}=this.ctx;this.head=(this.head+1)%Ao,this.history[this.head].set(n.spectrum);let a=this.mesh.instanceMatrix.array,o=s[0],l=s[1],c=s[2];for(let p=0;p<rr;p++){let u=this.history[(this.head-p*3+Ao*4)%Ao],m=p/(rr-1);for(let _=0;_<ri;_++){let M=p*ri+_,f=u[this.bandOf[_]],d=.12+Math.pow(f,1.1)*9*(1-m*.45),y=M*16;a[y]=Pu*.78,a[y+5]=d,a[y+10]=Iu*.7,a[y+12]=(_-ri/2+.5)*Pu,a[y+13]=d/2,a[y+14]=-p*Iu,a[y+15]=1,this.tmp.copy(o).lerp(l,m).lerp(c,Math.min(1,f*1.3)).multiplyScalar(.4+f*.8),this.mesh.setColorAt(M,this.tmp)}}this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor.needsUpdate=!0;let h=Math.sin(t*.15)*.55+r.x*.25;this.camera.position.set(Math.sin(h)*15,7.5+r.y*1.5-n.beat*.3,Math.cos(h)*11+3),this.camera.lookAt(0,2.2,-11)}};var Lu=`
uniform sampler2D uSpec;
uniform float uTime, uBeat;
varying vec3 vPos;
varying float vE;
void main() {
  vec3 dir = normalize(position);
  float lon = atan(dir.z, dir.x);
  float band = clamp(abs(dir.y) * 0.85 + 0.05 * sin(lon * 4.0 + uTime * 0.7), 0.0, 1.0);
  float e = texture2D(uSpec, vec2(band, 0.5)).r;
  float r = 2.1 * (1.0 + e * 0.55 + uBeat * 0.1 + 0.04 * sin(dir.x * 6.0 + uTime) * sin(dir.y * 5.0 - uTime));
  vE = e;
  vec4 mv = modelViewMatrix * vec4(dir * r, 1.0);
  vPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}`,C0=`
uniform vec3 uA, uB, uC;
varying vec3 vPos;
varying float vE;
void main() {
  vec3 n = normalize(cross(dFdx(vPos), dFdy(vPos)));
  float fres = pow(1.0 - abs(n.z), 1.6);
  float light = max(dot(n, normalize(vec3(0.4, 0.7, 0.6))), 0.0);
  vec3 col = mix(uA, uB, n.y * 0.5 + 0.5) * (0.22 + light * 0.9) + uC * fres * 1.3;
  gl_FragColor = vec4(col * (0.75 + vE * 0.9), 1.0);
}`,P0=`
uniform vec3 uC;
varying vec3 vPos;
varying float vE;
void main() {
  gl_FragColor = vec4(mix(uC, vec3(1.0), 0.55) * (0.18 + vE * 0.85), 1.0);
}`,Co=class{constructor(t){this.ctx=t,this.scene=new Pe,this.camera=new jt(50,1,.1,100),this.base={y:0,z:9},this.camera.position.set(0,0,this.base.z);let e=Vn(128,1);this.specData=e.data,this.specTex=e.tex;let n={uSpec:{value:this.specTex},uTime:{value:0},uBeat:{value:0},uA:{value:t.colors[0]},uB:{value:t.colors[1]},uC:{value:t.colors[2]}},s=new zs(1,6);this.solid=new le(s,new ce({vertexShader:Lu,fragmentShader:C0,uniforms:n})),this.wire=new le(s,new ce({vertexShader:Lu,fragmentShader:P0,uniforms:n,wireframe:!0,transparent:!0,depthWrite:!1,blending:me})),this.group=new ln,this.group.add(this.solid,this.wire),this.scene.add(this.group),this.uniforms=n;let r=wu(2200,44,26,30,-4);this.dust=r.points,this.dustMat=r.mat,this.scene.add(this.dust)}resize(t,e){this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}update(t,e){let{audio:n,colors:s}=this.ctx;for(let r=0;r<128;r++)this.specData[r]=Math.min(255,n.spectrum[r]*255);this.specTex.needsUpdate=!0,this.uniforms.uTime.value=t,this.uniforms.uBeat.value=n.beat,this.group.rotation.y+=e*(.18+n.level*.7),this.group.rotation.x=Math.sin(t*.3)*.35,this.dust.rotation.y+=e*.02,this.dustMat.color.copy(s[0]).lerp(new Rt(1,1,1),.3),this.dustMat.opacity=.3+n.treble*.6,si(this.camera,this.ctx,e,1.2,this.base),this.camera.position.z=this.base.z-n.beat*.6,this.camera.lookAt(0,0,0)}};var I0="void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }",L0=`
uniform float uTime, uBass, uMid, uTreble, uBeat;
uniform vec2 uRes;
uniform vec3 uA, uB, uC;
uniform sampler2D uSpec;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.14;
  vec3 col = vec3(0.0);
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float s = texture2D(uSpec, vec2((fi + 0.5) / 4.0 * 0.7, 0.5)).r;
    vec2 p = uv * vec2(1.3, 1.0);
    float w = fbm(p * 1.5 + vec2(t * (1.0 + fi * 0.3), fi * 3.1) + fbm(p * 2.0 - t));
    float y = p.y + (w - 0.5) * (0.95 + uBass * 0.9) - (fi - 1.5) * 0.3;
    float band = exp(-abs(y) * (8.5 - s * 3.5));
    vec3 c = fi < 1.5 ? mix(uA, uB, fi / 1.5) : mix(uB, uC, (fi - 1.5) / 1.5);
    col += c * band * (0.35 + s * 1.6 + uBeat * 0.4);
  }
  float star = step(0.9975, hash(floor(gl_FragCoord.xy / 2.0)));
  col += vec3(star) * 0.45 * (0.4 + uTreble);
  col = 1.0 - exp(-col * 1.15);
  gl_FragColor = vec4(col, 1.0);
}`,Po=class{constructor(t){this.ctx=t,this.scene=new Pe,this.camera=new jt(50,1,.1,10);let e=Vn(128,1);this.specData=e.data,this.specTex=e.tex,this.res=new It(1,1),this.mat=new ce({vertexShader:I0,fragmentShader:L0,depthTest:!1,depthWrite:!1,uniforms:{uTime:{value:0},uBass:{value:0},uMid:{value:0},uTreble:{value:0},uBeat:{value:0},uRes:{value:this.res},uSpec:{value:this.specTex},uA:{value:t.colors[0]},uB:{value:t.colors[1]},uC:{value:t.colors[2]}}});let n=new le(new Sn(2,2),this.mat);n.frustumCulled=!1,this.scene.add(n)}resize(t,e){this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}update(t){let{audio:e,renderer:n}=this.ctx;for(let r=0;r<128;r++)this.specData[r]=Math.min(255,e.spectrum[r]*255);this.specTex.needsUpdate=!0,n.getDrawingBufferSize(this.res);let s=this.mat.uniforms;s.uTime.value=t,s.uBass.value=e.bass,s.uMid.value=e.mid,s.uTreble.value=e.treble,s.uBeat.value=e.beat}};function N0(i){let t=[];if(!i)return t;for(let e of i.split(/\r?\n/)){let n=[...e.matchAll(/\[(\d{1,3}):(\d{1,2}(?:[.:]\d{1,3})?)\]/g)];if(!n.length)continue;let s=e.replace(/^(\s*\[\d{1,3}:\d{1,2}(?:[.:]\d{1,3})?\])+/,"").replace(/<\d+:\d+(?:\.\d+)?>/g,"").trim();for(let r of n)t.push({t:parseInt(r[1],10)*60+parseFloat(r[2].replace(":",".")),text:s})}return t.sort((e,n)=>e.t-n.t),t}function Io(i,t){let e=0,n=i.length-1,s=-1;for(;e<=n;){let r=e+n>>1;i[r].t<=t?(s=r,e=r+1):n=r-1}return s}var D0=/\s*[\(\[][^)\]]*(official|video|audio|lyrics?|visuali[sz]er|hd|4k|remaster(ed)?|explicit|clean)[^)\]]*[\)\]]/gi;function U0(i){return(i||"").replace(D0,"").replace(/\s+-\s+(remaster(ed)?|single version).*$/i,"").trim()}function Nu(i,t){return new Promise(e=>{try{chrome.runtime.sendMessage({type:"ytmi:lyrics",title:U0(i.title),artist:i.artist,album:i.album,duration:t},n=>{if(chrome.runtime.lastError||!n||!n.ok)return e(null);e({synced:N0(n.synced),plain:n.plain||""})})}catch{e(null)}})}var ai=[{id:"scroll",name:"Scroll"},{id:"karaoke",name:"Karaoke"},{id:"slam",name:"Slam"},{id:"poster",name:"Poster"},{id:"echo",name:"Echo"},{id:"glitch",name:"Outline Glitch"},{id:"ticker",name:"Ticker"},{id:"type",name:"Typewriter"},{id:"serif",name:"Editorial"}],rs=(i,t=0,e=1)=>Math.min(e,Math.max(t,i));function ar(i){let t=i.split(/\s+/).filter(Boolean),e=t.map(a=>Math.max(2,a.length)+1),n=e.reduce((a,o)=>a+o,0)||1,s=.86,r=0;return t.map((a,o)=>{let l=r/n*s;return r+=e[o],{w:a,a:l,b:r/n*s}})}function or(i,t,e,n){i.style.maxWidth=t+"px";for(let s of n)if(i.style.fontSize=s+"px",i.scrollWidth<=t+1&&i.scrollHeight<=e)return s;return i.style.fontSize=n[n.length-1]+"px",n[n.length-1]}var F0=i=>1-Math.pow(1-rs(i),3),wn=class{constructor(t){this.fx=t,this.el=document.createElement("div"),this.el.className="fx fx-"+this.constructor.cls,t.host.appendChild(this.el)}text(t){let e=this.fx.lines[t];return e&&e.text?e.text:""}onLine(){}frame(){}destroy(){this.el.remove()}},ic=class extends wn{static cls="karaoke";onLine(t){this.el.innerHTML="",this.words=[];let e=this.text(t),n=this.text(t-1),s=this.text(t+1),r=(o,l)=>{let c=document.createElement("div");return c.className=o,c.textContent=l,c};this.el.appendChild(r("k-prev",n));let a=document.createElement("div");a.className="k-cur",ar(e).forEach(o=>{let l=document.createElement("span");l.className="k-w",l.textContent=o.w,l.style.setProperty("--f","0"),a.appendChild(l),this.words.push({el:l,a:o.a,b:o.b,f:0})}),this.el.appendChild(a),this.el.appendChild(r("k-next",s)),or(a,innerWidth*.86,innerHeight*.34,[170,145,124,106,90,76,64,54,46,38])}frame({p:t}){for(let e of this.words){let n=Math.round(rs((t-e.a)/Math.max(.02,e.b-e.a))*100)/100;n!==e.f&&(e.f=n,e.el.style.setProperty("--f",String(n)))}}},Du=["#fff","var(--a)","#fff","var(--c)","var(--b)"],sc=class extends wn{static cls="slam";onLine(t){this.el.innerHTML="",this.words=[];let e=this.text(t);if(!e)return;let n=document.createElement("div");n.className="s-line";let s=r=>{let a=Math.sin(t*91.7+r*12.9898)*43758.5453;return a-Math.floor(a)};ar(e).forEach((r,a)=>{let o=document.createElement("span");o.className="s-w",o.textContent=r.w,o.style.setProperty("--r",((s(a)-.5)*8).toFixed(1)+"deg"),o.style.color=Du[(a+t)%Du.length],n.appendChild(o),this.words.push({el:o,a:r.a,on:!1})}),this.el.appendChild(n),or(n,innerWidth*.88,innerHeight*.62,[230,195,165,140,118,100,86,74,64,54,46,38])}frame({p:t}){for(let e of this.words){let n=t>=e.a;n!==e.on&&(e.on=n,e.el.classList.toggle("in",n))}}},Uu=[["var(--a)","#0b0b0b","#fff"],["#f1efe9","#0b0b0b","var(--a)"],["#0b0b0b","#fff","var(--c)"],["var(--b)","#fff","#0b0b0b"],["var(--c)","#0b0b0b","#fff"]],rc=class extends wn{static cls="poster";onLine(t){this.el.innerHTML="",this.rows=[];let e=this.text(t);if(!e)return;let n=ar(e),s=[];for(let p=0;p<n.length;p++){let u=[n[p]];p+1<n.length&&(n[p].w.length<=3||n[p+1].w.length<=3)&&n[p].w.length+n[p+1].w.length<=9&&u.push(n[++p]),s.push(u)}for(;s.length>5;){let p=s.pop();s[s.length-1].push(...p)}let r=Uu[t%Uu.length],a=document.createElement("div");a.className="p-block",a.style.background=r[0],a.style.setProperty("--rot",((t%2?1:-1)*(1+t%3*.6)).toFixed(1)+"deg");let o=Math.min(innerWidth*.42,640);a.style.width=o+"px",s.forEach((p,u)=>{let m=document.createElement("div");m.className="p-row",m.style.color=u%2?r[2]:r[1];let _=document.createElement("span");_.textContent=p.map(M=>M.w).join(" "),m.appendChild(_),a.appendChild(m),this.rows.push({el:m,t:_,a:p[0].a,on:!1})}),this.el.appendChild(a);let l=o-44;for(let p of this.rows){p.t.style.fontSize="100px";let u=p.t.offsetWidth||1;p.t.style.fontSize=rs(100*l/u,26,170)+"px"}let c=a.offsetHeight,h=innerHeight*.54;if(c>h){let p=h/c;for(let u of this.rows)u.t.style.fontSize=parseFloat(u.t.style.fontSize)*p+"px"}}frame({p:t}){for(let e of this.rows){let n=t>=e.a;n!==e.on&&(e.on=n,e.el.classList.toggle("in",n))}}},ac=class extends wn{static cls="echo";onLine(t){this.el.innerHTML="",this.rows=[],this.stack=null;let e=this.text(t);if(!e)return;this.t0=performance.now();let n=document.createElement("div");n.className="e-stack",this.stack=n;let s=innerWidth*.9,r=document.createElement("div");r.className="e-row main",r.textContent=e,n.appendChild(r),this.el.appendChild(n);let a=or(r,s,innerHeight*.26,[210,180,152,130,112,96,82,70,60,50,42]),o=r.offsetHeight;r.remove(),n.style.setProperty("--h",o+"px"),[-3,-2,-1,0,1,2,3].forEach(l=>{let c=document.createElement("div");c.className="e-row"+(l===0?" main":""),c.textContent=e,c.style.fontSize=a+"px",c.style.maxWidth=s+"px",c.style.setProperty("--o",String(l)),c.style.opacity=l===0?"1":String(Math.max(.1,.6-Math.abs(l)*.15)),n.appendChild(c)})}frame(){if(!this.stack)return;let t=F0((performance.now()-this.t0)/380);this.stack.style.setProperty("--sp",(t*(.64+this.fx.audio.beat*.09)).toFixed(3))}},oc=class extends wn{static cls="glitch";onLine(t){this.el.innerHTML="",this.layers=[],this.words=[],this.wrap=null;let e=this.text(t);if(!e)return;let n=ar(e),s=document.createElement("div");s.className="g-wrap",["r","c","m"].forEach(r=>{let a=document.createElement("div");a.className="g-layer g-"+r,n.forEach(o=>{let l=document.createElement("span");l.textContent=o.w,a.appendChild(l)}),s.appendChild(a),this.layers.push(a)}),this.words=n.map(r=>({a:r.a,on:!1})),this.wrap=s,this.el.appendChild(s),or(s,innerWidth*.86,innerHeight*.58,[210,180,154,132,114,98,84,72,62,52,44])}frame({p:t}){if(!this.wrap)return;this.words.forEach((s,r)=>{let a=t>=s.a;if(a!==s.on){s.on=a;for(let o of this.layers)o.children[r].classList.toggle("on",a)}});let e=this.fx.audio.beat,n=e>.25?(Math.random()-.5)*e*26:0;this.layers[0].style.transform=`translate(${n.toFixed(1)}px, ${(n*.2).toFixed(1)}px)`,this.layers[1].style.transform=`translate(${(-n).toFixed(1)}px, ${(-n*.2).toFixed(1)}px)`,this.wrap.style.transform=e>.6?`skewX(${((Math.random()-.5)*7).toFixed(1)}deg)`:""}},lc=class extends wn{static cls="ticker";onLine(t){this.el.innerHTML="",this.rows=[];let e=this.text(t);if(!e)return;let n=e.toUpperCase()+"   \u2022   ",s=Math.round(innerHeight*.17);for(let r=0;r<5;r++){let a=document.createElement("div");a.className="t-row"+(r===2?" main":""),a.style.fontSize=s+"px",a.style.top=`calc(50% + ${((r-2)*s*.88).toFixed(0)}px)`,a.style.opacity=r===2?"1":String(.55-Math.abs(r-2)*.17);let o=document.createElement("div");o.className="t-track";let l=document.createElement("span");l.textContent=n,o.appendChild(l),a.appendChild(o),this.el.appendChild(a);let c=Math.max(200,l.offsetWidth);o.textContent=n.repeat(Math.ceil(innerWidth/c)+2),this.rows.push({track:o,copyW:c,dir:r%2?1:-1,off:Math.random()*c,speed:70+r*22})}}frame({dt:t}){let e=this.fx.audio;for(let n of this.rows){n.off+=n.dir*(n.speed+e.level*520+e.beat*260)*t;let s=(n.off%n.copyW+n.copyW)%n.copyW;n.track.style.transform=`translateX(${(-n.copyW-s).toFixed(1)}px)`}}},cc=class extends wn{static cls="type";onLine(t){this.el.innerHTML="";let e=this.fx.lines,n=document.createElement("div");n.className="ty-box";for(let o=Math.max(0,t-3);o<t;o++){if(!e[o].text)continue;let l=document.createElement("div");l.className="ty-line old",l.textContent="> "+e[o].text,n.appendChild(l)}let s=document.createElement("div");s.className="ty-line cur",this.node=document.createTextNode("");let r=document.createElement("span");r.className="ty-caret",s.append(this.node,r),n.appendChild(s),this.el.appendChild(n);let a=this.text(t);this.full=a?"> "+a:"",this.n=-1}frame({p:t}){let e=Math.floor(rs(t/.8)*this.full.length);e!==this.n&&(this.n=e,this.node.nodeValue=this.full.slice(0,e))}},hc=class extends wn{static cls="serif";onLine(t){this.el.innerHTML="",this.words=[],this.rule=null;let e=this.text(t);if(!e)return;let n=document.createElement("div");n.className="sf-line",ar(e).forEach((s,r)=>{let a=document.createElement("span");a.className="sf-w"+(r%3===2?" acc":""),a.textContent=s.w,n.appendChild(a),this.words.push({el:a,a:s.a,on:!1})}),this.rule=document.createElement("i"),this.rule.className="sf-rule",this.el.append(n,this.rule),or(n,innerWidth*.78,innerHeight*.5,[120,104,90,78,68,58,50,42,36,30])}frame({p:t}){for(let e of this.words){let n=t>=e.a;n!==e.on&&(e.on=n,e.el.classList.toggle("in",n))}this.rule&&(this.rule.style.transform=`scaleX(${rs(t/.86).toFixed(3)})`)}},O0={karaoke:ic,slam:sc,poster:rc,echo:ac,glitch:oc,ticker:lc,type:cc,serif:hc},Lo=class{constructor(t,e){this.host=t,this.audio=e,this.lines=[],this.id=null,this.inst=null,this.idx=-2}setLines(t){this.lines=t||[],this.idx=-2}setStyle(t){if(this.id===t)return;this.inst&&this.inst.destroy(),this.host.textContent="",this.id=t;let e=O0[t];this.inst=e?new e(this):null,this.idx=-2}relayout(){this.idx=-2}tick(t,e){if(!this.inst||!this.lines.length)return;let n=t+.12,s=Io(this.lines,n);s!==this.idx&&(this.idx=s,this.inst.onLine(s));let r=this.lines[s],a=0,o=1;if(r){let l=this.lines[s+1];o=Math.max(.5,Math.min((l?l.t:r.t+5)-r.t,9)),a=rs((n-r.t)/o)}this.inst.frame({cur:t,dt:e,idx:s,p:a,dur:o})}};var Fu=(i,t,e)=>Math.min(e,Math.max(t,i));function Ou(i,t,e){let n=Math.max(i,t,e),s=Math.min(i,t,e),r=n-s,a=0;return r>0&&(n===i?a=(t-e)/r%6:n===t?a=(e-i)/r+2:a=(i-t)/r+4,a/=6,a<0&&(a+=1)),[a,n===0?0:r/n,n]}function B0(i,t,e){let n=Math.floor(i*6),s=i*6-n,r=e*(1-t),a=e*(1-s*t),o=e*(1-(1-s)*t);switch(n%6){case 0:return[e,o,r];case 1:return[a,e,r];case 2:return[r,e,o];case 3:return[r,a,e];case 4:return[o,r,e];default:return[e,r,a]}}function bi([i,t,e]){return B0((i+1)%1,Fu(t*1.1,.5,1),Fu(Math.max(e,.85),.85,1))}var dc=[bi([.6,.7,1]),bi([.8,.65,1]),bi([.03,.6,1])];function uc(i){let t=7;for(let n=0;n<i.length;n++)t=t*31+i.charCodeAt(n)>>>0;let e=t%360/360;return[bi([e,.75,1]),bi([(e+.13)%1,.7,1]),bi([(e+.55)%1,.6,1])]}function z0(i){return new Promise((t,e)=>{let n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>e(new Error("image failed")),n.src=i})}async function Bu(i,t){try{let e=await z0(i),n=40,s=document.createElement("canvas");s.width=s.height=n;let r=s.getContext("2d",{willReadFrequently:!0});r.drawImage(e,0,0,n,n);let a=r.getImageData(0,0,n,n).data,o=18,l=Array.from({length:o},()=>({w:0,r:0,g:0,b:0,h:0,s:0})),c=0;for(let m=0;m<a.length;m+=4){let _=a[m]/255,M=a[m+1]/255,f=a[m+2]/255,[d,y,w]=Ou(_,M,f);if(w<.18)continue;let S=(.15+y)*(.4+w);y<.15&&(S*=.15);let A=l[Math.floor(d*o)%o];A.w+=S,A.r+=_*S,A.g+=M*S,A.b+=f*S,c+=S}if(c<2)return uc(t||i);let h=l.map((m,_)=>({...m,idx:_})).filter(m=>m.w>c*.03).sort((m,_)=>_.w-m.w),p=[];for(let m of h)if(p.every(M=>{let f=Math.abs(M.idx-m.idx);return Math.min(f,o-f)>=2})&&p.push(m),p.length===3)break;if(!p.length)return uc(t||i);let u=p.map(m=>Ou(m.r/m.w,m.g/m.w,m.b/m.w));for(;u.length<3;){let m=u[0];u.push([(m[0]+(u.length===1?.1:.55))%1,m[1],m[2]])}return u.map(bi)}catch{return uc(t||i||"x")}}function H0(i){return i?i.replace(/=w\d+-h\d+[^&\s]*/,"=w720-h720-l90-rj").replace(/=s\d+[^&\s]*/,"=s720"):""}function lr(){return document.querySelector("video")}function zu(){let i="",t="",e="",n="";try{let r=navigator.mediaSession&&navigator.mediaSession.metadata;r&&(i=r.title||"",t=r.artist||"",e=r.album||"",n=(r.artwork&&r.artwork.length?r.artwork[r.artwork.length-1].src:"")||"")}catch{}let s=document.querySelector("ytmusic-player-bar");if(s){if(!i){let r=s.querySelector(".title");i=r?r.textContent.trim():""}if(!t){let r=s.querySelector(".byline");if(r){let a=r.textContent.split("\u2022").map(o=>o.trim()).filter(Boolean);t=a[0]||"",!e&&a[1]&&!/views|likes|plays/i.test(a[1])&&!/^\d{4}$/.test(a[1])&&(e=a[1])}}if(!n){let r=s.querySelector("img.image")||s.querySelector("#thumbnail img")||s.querySelector("img");n=r?r.src:""}}return n=H0(n),{title:i,artist:t,album:e,cover:n,key:[i,t,n].join("|")}}function No(i){let t={play:"ytmusic-player-bar .play-pause-button, ytmusic-player-bar #play-pause-button",next:"ytmusic-player-bar .next-button",prev:"ytmusic-player-bar .previous-button"}[i],e=t&&document.querySelector(t);if(e)return e.click(),!0;if(i==="play"){let n=lr();if(n)return n.paused?n.play():n.pause(),!0}return!1}Ht.enabled=!1;var Gn=[{id:"nebula",name:"Nebula",Cls:yo},{id:"terrain",name:"Terrain",Cls:So},{id:"rings",name:"Pulse",Cls:To},{id:"tunnel",name:"Tunnel",Cls:wo},{id:"bars",name:"Skyline",Cls:Ro},{id:"crystal",name:"Crystal",Cls:Co},{id:"aurora",name:"Aurora",Cls:Po}],as='fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"',fn={close:`<svg viewBox="0 0 24 24" ${as}><path d="M6 6l12 12M18 6L6 18"/></svg>`,full:`<svg viewBox="0 0 24 24" ${as}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>`,lyrics:`<svg viewBox="0 0 24 24" ${as}><path d="M4 7h16M4 12h10M4 17h13"/></svg>`,ambient:`<svg viewBox="0 0 24 24" ${as}><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>`,center:`<svg viewBox="0 0 24 24" ${as}><rect x="6" y="4" width="12" height="12" rx="2"/><path d="M8 20h8"/></svg>`,caret:`<svg viewBox="0 0 24 24" ${as}><path d="M6 9l6 6 6-6"/></svg>`,play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',pause:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',prev:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 6h2v12H7zM20 6v12L10 12z"/></svg>',next:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 6h2v12h-2zM4 6v12l10-6z"/></svg>'},Hu=i=>(i=Math.max(0,Math.floor(i||0)),Math.floor(i/60)+":"+String(i%60).padStart(2,"0")),Do=class{constructor({audio:t,getVideo:e,settings:n,onSettings:s}){this.audio=t,this.getVideo=e,this.settings=n,this.onSettings=s,this.isOpen=!1,this.root=null,this.renderer=null,this.scenes={},this.time=0,this.last=0,this.w=1,this.h=1,this.shift=0,this.effStyle="scroll",this.colors=dc.map(r=>new Rt(r[0],r[1],r[2])),this.target=dc.map(r=>new Rt(r[0],r[1],r[2])),this.pointer={x:0,y:0,tx:0,ty:0},this.lines=[],this.plain=!1,this.hasPanel=!1,this.active=-2,this.bgLayer=0,this._lastSec=-1,this._lastDur=-1,this._paused=null,this._idleTimer=null,this._toastTimer=null,this._loop=this._loop.bind(this)}build(){let t=document.createElement("div");t.id="ytmi-root",t.innerHTML=`
      <div class="ytmi-bg"><div class="ytmi-bgimg"></div><div class="ytmi-bgimg"></div></div>
      <canvas class="ytmi-gl"></canvas>
      <div class="ytmi-vignette"></div>
      <div class="ytmi-fx"></div>
      <div class="ytmi-lyrics"><div class="ytmi-lines"></div><div class="ytmi-msg"></div></div>
      <div class="ytmi-top">
        <div class="ytmi-menus"></div>
        <div class="ytmi-tools">
          <label class="ytmi-gain" title="Visual sensitivity"><span>Gain</span><input type="range" min="0.5" max="2" step="0.05"></label>
          <button class="ytmi-ibtn" data-act="lyrics" title="Lyrics (L)">${fn.lyrics}</button>
          <button class="ytmi-ibtn" data-act="center" title="Centered cover (C)">${fn.center}</button>
          <button class="ytmi-ibtn" data-act="ambient" title="Ambient background (A)">${fn.ambient}</button>
          <button class="ytmi-ibtn" data-act="full" title="Fullscreen (F)">${fn.full}</button>
          <button class="ytmi-ibtn" data-act="close" title="Close (Esc)">${fn.close}</button>
        </div>
      </div>
      <div class="ytmi-info">
        <img class="ytmi-cover" alt="">
        <div class="ytmi-meta">
          <div class="ytmi-title"></div>
          <div class="ytmi-artist"></div>
          <div class="ytmi-prog"><span class="ytmi-t0">0:00</span><div class="ytmi-bar"><i></i></div><span class="ytmi-t1">0:00</span></div>
          <div class="ytmi-transport">
            <button class="ytmi-ibtn" data-act="prev" title="Previous">${fn.prev}</button>
            <button class="ytmi-ibtn big" data-act="play" title="Play or pause">${fn.pause}</button>
            <button class="ytmi-ibtn" data-act="next" title="Next">${fn.next}</button>
          </div>
        </div>
      </div>
      <div class="ytmi-toast"></div>`;let e=n=>t.querySelector(n);this.root=t,this.canvas=e(".ytmi-gl"),this.bg=e(".ytmi-bg"),this.bgImgs=[...t.querySelectorAll(".ytmi-bgimg")],this.fxEl=e(".ytmi-fx"),this.linesEl=e(".ytmi-lines"),this.msgEl=e(".ytmi-msg"),this.lyricsEl=e(".ytmi-lyrics"),this.menusEl=e(".ytmi-menus"),this.coverEl=e(".ytmi-cover"),this.titleEl=e(".ytmi-title"),this.artistEl=e(".ytmi-artist"),this.t0=e(".ytmi-t0"),this.t1=e(".ytmi-t1"),this.barEl=e(".ytmi-bar"),this.barFill=e(".ytmi-bar i"),this.playBtn=e('[data-act="play"]'),this.toastEl=e(".ytmi-toast"),this.gainEl=e(".ytmi-gain input"),this.fx=new Lo(this.fxEl,this.audio),this.ddScene=this.makeDropdown("Scene",Gn,n=>this.setScene(n),!0),this.ddText=this.makeDropdown("Text",ai,n=>this.setLyricStyle(n),!1),this.menusEl.append(this.ddScene,this.ddText),t.addEventListener("click",n=>{n.target.closest(".ytmi-dd")||this._closeMenus();let s=n.target.closest("[data-act]");if(s)return this.act(s.dataset.act);let r=n.target.closest(".ytmi-lines p[data-i]");if(r&&!this.plain){let a=this.getVideo(),o=this.lines[+r.dataset.i];a&&o&&(a.currentTime=o.t)}}),this.barEl.addEventListener("click",n=>{let s=this.getVideo();if(!s||!isFinite(s.duration))return;let r=this.barEl.getBoundingClientRect();s.currentTime=Math.min(1,Math.max(0,(n.clientX-r.left)/r.width))*s.duration}),this.gainEl.addEventListener("input",()=>{this.settings.gain=parseFloat(this.gainEl.value),this.onSettings(this.settings)}),t.addEventListener("mousemove",n=>{this.pointer.tx=n.clientX/window.innerWidth*2-1,this.pointer.ty=-(n.clientY/window.innerHeight*2-1),this._wake()}),window.addEventListener("resize",()=>this.isOpen&&this.resize()),document.addEventListener("fullscreenchange",()=>this.isOpen&&this.resize()),this.applySettings(this.settings)}makeDropdown(t,e,n,s){let r=document.createElement("div");r.className="ytmi-dd",r.innerHTML=`<button class="ytmi-pill ytmi-dd-btn" type="button"><span class="ytmi-dd-k">${t}</span><span class="ytmi-dd-v"></span>${fn.caret}</button><div class="ytmi-dd-menu"></div>`;let a=r.querySelector(".ytmi-dd-menu");return e.forEach((o,l)=>{let c=document.createElement("button");c.type="button",c.dataset.id=o.id,c.innerHTML=`<span>${o.name}</span>${s?`<kbd>${l+1}</kbd>`:""}`,a.appendChild(c)}),r.querySelector(".ytmi-dd-btn").addEventListener("click",o=>{o.stopPropagation();let l=!r.classList.contains("open");this._closeMenus(),r.classList.toggle("open",l)}),a.addEventListener("click",o=>{let l=o.target.closest("button[data-id]");l&&(o.stopPropagation(),this._closeMenus(),n(l.dataset.id))}),r}_closeMenus(){if(!this.root)return!1;let t=!1;return this.root.querySelectorAll(".ytmi-dd.open").forEach(e=>{e.classList.remove("open"),t=!0}),t}_syncDropdown(t,e,n){let s=e.find(r=>r.id===n)||e[0];t.querySelector(".ytmi-dd-v").textContent=s.name,t.querySelectorAll(".ytmi-dd-menu button").forEach(r=>r.classList.toggle("on",r.dataset.id===s.id))}applySettings(t){this.settings=t,this.root&&(Gn.some(e=>e.id===t.scene)||(t.scene=Gn[0].id),ai.some(e=>e.id===t.lyricStyle)||(t.lyricStyle="scroll"),this.root.classList.toggle("no-lyrics",!t.lyrics),this.root.classList.toggle("no-ambient",!t.ambient),this.root.classList.toggle("center-cover",!!t.centerCover),this.root.querySelector('[data-act="center"]').classList.toggle("on",!!t.centerCover),this.root.querySelector('[data-act="lyrics"]').classList.toggle("on",!!t.lyrics),this.root.querySelector('[data-act="ambient"]').classList.toggle("on",!!t.ambient),this.gainEl.value=String(t.gain),this._syncDropdown(this.ddScene,Gn,t.scene),this._syncDropdown(this.ddText,ai,t.lyricStyle),this._applyLyricMode())}_applyLyricMode(){if(!this.root)return;let t=this.lines.length?this.settings.lyricStyle:"scroll";this.effStyle=t;let e=t!=="scroll";this.root.classList.toggle("fx-on",e),this.root.dataset.lyricStyle=t,e&&this.fx.setStyle(t)}act(t){let e=this.settings;if(t==="close")return this.close();if(t==="full")return this.toggleFullscreen();if(t==="lyrics")e.lyrics=!e.lyrics;else if(t==="ambient")e.ambient=!e.ambient;else if(t==="center")e.centerCover=!e.centerCover;else{if(t==="play")return No("play");if(t==="next")return No("next");if(t==="prev")return No("prev")}this.applySettings(e),this.onSettings(e)}setScene(t){Gn.some(e=>e.id===t)&&(this.settings.scene=t,this.applySettings(this.settings),this.onSettings(this.settings),this.resize())}setLyricStyle(t){ai.some(e=>e.id===t)&&(this.settings.lyricStyle=t,this.settings.lyrics||(this.settings.lyrics=!0),this.applySettings(this.settings),this.onSettings(this.settings),this.fx.relayout(),this.lines.length||this.toast("This style needs synced lyrics, showing Scroll for this track."))}cycleLyricStyle(){let t=ai.findIndex(e=>e.id===this.settings.lyricStyle);this.setLyricStyle(ai[(t+1)%ai.length].id)}toggleFullscreen(){document.fullscreenElement?document.exitFullscreen().catch(()=>{}):this.root.requestFullscreen().catch(()=>{})}handleKey(t){if(t.altKey||t.ctrlKey||t.metaKey)return!1;let e=t.key.toLowerCase();if(e==="escape")return this._closeMenus()||document.fullscreenElement||this.close(),!0;if(e==="f")return this.toggleFullscreen(),!0;if(e==="l")return this.act("lyrics"),!0;if(e==="a")return this.act("ambient"),!0;if(e==="c")return this.act("center"),!0;if(e==="t")return this.cycleLyricStyle(),!0;let n=parseInt(e,10);return n>=1&&n<=Gn.length?(this.setScene(Gn[n-1].id),!0):!1}toast(t){this.toastEl&&(this.toastEl.textContent=t,this.toastEl.classList.add("show"),clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>this.toastEl.classList.remove("show"),5e3))}_wake(){this.root.classList.remove("idle"),clearTimeout(this._idleTimer),this._idleTimer=setTimeout(()=>{this.root&&!this.root.querySelector(".ytmi-dd.open")&&this.root.classList.add("idle")},3200)}open(){if(!this.isOpen){if(this.root||this.build(),document.body.appendChild(this.root),this.isOpen=!0,!this.renderer)try{this.renderer=new mo({canvas:this.canvas,antialias:!1,alpha:!1,powerPreference:"high-performance"}),this.renderer.outputColorSpace=pi,this.renderer.setClearColor(0,1),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75))}catch{this.renderer=null,this.toast("WebGL is unavailable, showing ambient mode only.")}this.resize(),requestAnimationFrame(()=>this.root.classList.add("open")),this._wake(),this.last=performance.now(),this._raf=requestAnimationFrame(this._loop)}}close(){this.isOpen&&(this.isOpen=!1,cancelAnimationFrame(this._raf),document.fullscreenElement&&document.exitFullscreen().catch(()=>{}),this._closeMenus(),this.root.classList.remove("open"),this.root.remove())}resize(){this.root&&(this.w=Math.max(1,this.root.clientWidth||window.innerWidth),this.h=Math.max(1,this.root.clientHeight||window.innerHeight),this.fx&&this.fx.relayout(),this.renderer&&(this.renderer.setSize(this.w,this.h,!1),this.getScene().resize(this.w,this.h)))}getScene(){let t=this.settings.scene;if(!this.scenes[t]){let e=Gn.find(n=>n.id===t)||Gn[0];this.scenes[t]=new e.Cls({renderer:this.renderer,audio:this.audio,colors:this.colors,pointer:this.pointer}),this.scenes[t].resize(this.w,this.h)}return this.scenes[t]}setTrack(t){if(this.root||this.build(),this.titleEl.textContent=t.title||"Nothing playing",this.artistEl.textContent=[t.artist,t.album].filter(Boolean).join("  \xB7  "),t.cover&&this.coverEl.dataset.src!==t.cover){this.coverEl.dataset.src=t.cover,this.coverEl.src=t.cover,this.coverEl.style.visibility="visible",this.bgLayer^=1;let e=this.bgImgs[this.bgLayer],n=this.bgImgs[this.bgLayer^1];e.style.backgroundImage='url("'+t.cover.replace(/"/g,"%22")+'")',e.classList.add("show"),n.classList.remove("show")}else t.cover||(this.coverEl.style.visibility="hidden");this.coverEl.onerror=()=>{this.coverEl.style.visibility="hidden"}}setPalette(t){this.root||this.build(),t.forEach((n,s)=>this.target[s].setRGB(n[0],n[1],n[2]));let e=n=>`rgb(${Math.round(n[0]*255)},${Math.round(n[1]*255)},${Math.round(n[2]*255)})`;this.root.style.setProperty("--a",e(t[0])),this.root.style.setProperty("--b",e(t[1])),this.root.style.setProperty("--c",e(t[2]))}setLyricsLoading(){this._resetLyrics(),this.msgEl.textContent="Looking for lyrics",this.hasPanel=!1,this._applyLyricMode()}setLyrics(t){this._resetLyrics(),t&&t.synced&&t.synced.length?(this.lines=t.synced,this.plain=!1,this.lines.forEach((e,n)=>{let s=document.createElement("p");s.dataset.i=String(n),s.dataset.d="4",e.text?s.textContent=e.text:(s.textContent="\u266A",s.className="empty"),this.linesEl.appendChild(s)}),this.linesEl.classList.remove("plain"),this.msgEl.textContent="",this.hasPanel=!0,this.active=-2):t&&t.plain?(this.plain=!0,this.linesEl.classList.add("plain"),t.plain.split(/\r?\n/).forEach(e=>{let n=document.createElement("p");n.textContent=e||"\xA0",this.linesEl.appendChild(n)}),this.msgEl.textContent="",this.hasPanel=!0):(this.msgEl.textContent="No lyrics found for this track",this.hasPanel=!1),this.fx.setLines(this.lines),this._applyLyricMode()}_resetLyrics(){this.lines=[],this.plain=!1,this.active=-2,this.linesEl.innerHTML="",this.linesEl.style.transform="",this.fx&&this.fx.setLines([])}_paintLyrics(){let t=this.active,e=this.linesEl.children;for(let r=0;r<e.length;r++)e[r].dataset.d=String(Math.min(4,Math.abs(r-t)));let n=this.lyricsEl.clientHeight,s=e[Math.max(0,t)];if(s){let r=s.offsetTop+s.offsetHeight/2;this.linesEl.style.transform=`translateY(${Math.round(n*.5-r)}px)`}}_loop(t){if(!this.isOpen)return;this._raf=requestAnimationFrame(this._loop);let e=Math.min(.1,(t-this.last)/1e3||.016);this.last=t,this.time+=e,this.audio.gain=this.settings.gain,this.audio.update(e);let n=1-Math.exp(-e*2.2);for(let r=0;r<3;r++)this.colors[r].lerp(this.target[r],n);let s=1-Math.exp(-e*4);if(this.pointer.x+=(this.pointer.tx-this.pointer.x)*s,this.pointer.y+=(this.pointer.ty-this.pointer.y)*s,this.root.style.setProperty("--beat",this.audio.beat.toFixed(3)),this.root.style.setProperty("--bass",this.audio.bass.toFixed(3)),this.renderer){let r=this.getScene();r.update(this.time,e);let a=this.settings.lyrics&&!this.settings.centerCover&&this.hasPanel&&this.effStyle==="scroll"&&this.w>900?.15:0;this.shift+=(a-this.shift)*(1-Math.exp(-e*4)),this.shift>.002?r.camera.setViewOffset(this.w,this.h,Math.round(this.w*this.shift),0,this.w,this.h):r.camera.clearViewOffset(),this.renderer.render(r.scene,r.camera)}this.bg.style.transform=`scale(${(1.1+this.audio.bass*.07).toFixed(4)})`,this._tickUI(e)}_tickUI(t){let e=this.getVideo(),n=e?e.currentTime:0,s=e&&isFinite(e.duration)?e.duration:0,r=Math.floor(n);r!==this._lastSec&&(this._lastSec=r,this.t0.textContent=Hu(n));let a=Math.floor(s);a!==this._lastDur&&(this._lastDur=a,this.t1.textContent=Hu(s)),this.barFill.style.transform=`scaleX(${s?Math.min(1,n/s):0})`;let o=e?e.paused:!0;if(o!==this._paused&&(this._paused=o,this.playBtn.innerHTML=o?fn.play:fn.pause),this.effStyle!=="scroll"&&this.lines.length)this.settings.lyrics&&this.fx.tick(n,t);else if(this.lines.length&&!this.plain){let l=Io(this.lines,n+.2);l!==this.active&&(this.active=l,this._paintLyrics())}else if(this.plain&&s){let l=Math.max(0,this.linesEl.scrollHeight-this.lyricsEl.clientHeight*.4),c=this.lyricsEl.clientHeight*.4-n/s*l;this.linesEl.style.transform=`translateY(${Math.round(c)}px)`}}};var ku="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";var Vu="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";var Gu="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";var Wu="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";var Xu="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";var q0=[["YTMI Anton",ku,"400","normal"],["YTMI Bebas",Vu,"400","normal"],["YTMI Mono",Gu,"400","normal"],["YTMI Mono",Wu,"700","normal"],["YTMI Serif",Xu,"700","italic"]],Uo=null;function qu(){return Uo||(Uo=Promise.all(q0.map(async([i,t,e,n])=>{try{let s=atob(t),r=new Uint8Array(s.length);for(let o=0;o<s.length;o++)r[o]=s.charCodeAt(o);let a=new FontFace(i,r.buffer,{weight:e,style:n});await a.load(),document.fonts.add(a)}catch{}})),Uo)}(function(){if(window.__ytmiLoaded)return;window.__ytmiLoaded=!0;let e=Object.assign({},{scene:"nebula",lyricStyle:"scroll",lyrics:!0,ambient:!0,centerCover:!1,gain:1}),n=new ur,s=new Promise(f=>{try{chrome.storage.local.get("ytmi",d=>{d&&d.ytmi&&Object.assign(e,d.ytmi),f()})}catch{f()}}),r=new Do({audio:n,getVideo:lr,settings:e,onSettings:f=>{try{chrome.storage.local.set({ytmi:f})}catch{}}}),a="",o="",l=0;function c(f){return new Promise(d=>{let y=performance.now();(function w(){let S=lr();if(S&&isFinite(S.duration)&&S.duration>0)return d(S.duration);if(performance.now()-y>f)return d(NaN);setTimeout(w,150)})()})}async function h(f){let d=zu();if(!d.title)return;let y=d.title+"|"+d.artist,w=f||y!==a,S=f||d.cover!==o;if(!(!w&&!S)){if(r.setTrack(d),S){o=d.cover;let A=o;Bu(d.cover,y).then(T=>{o===A&&r.setPalette(T)})}if(w){a=y;let A=++l;r.setLyricsLoading();let T=await c(2500);if(A!==l)return;let g=await Nu(d,T);if(A!==l)return;r.setLyrics(g)}}}setInterval(()=>{r.isOpen&&h(!1)},700);async function p(){await Promise.all([s,qu()]);let f=lr(),d=f?n.attach(f):!1;r.open(),f?d||r.toast("Could not hook the audio. Reload this tab once and try again."):r.toast("Start a song first, then reopen immersive mode."),h(!0)}function u(){r.isOpen?r.close():p()}window.addEventListener("keydown",f=>{if(f.altKey&&!f.ctrlKey&&!f.metaKey&&f.code==="KeyV"){f.preventDefault(),f.stopPropagation(),u();return}if(!r.isOpen)return;let d=f.target;d&&(/^(INPUT|TEXTAREA|SELECT)$/.test(d.tagName)||d.isContentEditable)&&d.type!=="range"||r.handleKey(f)&&(f.preventDefault(),f.stopPropagation())},!0);let m='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h2M7 8v8M11 4v16M15 7v10M19 10v4M22 12h-1"/></svg>';function _(){return document.querySelector("ytmusic-player-bar .right-controls-buttons")||document.querySelector("ytmusic-player-bar .right-controls")}function M(){let f=_(),d=document.getElementById("ytmi-btn");d&&f&&d.classList.contains("ytmi-btn-float")&&(d.remove(),d=null),!d&&(d=document.createElement("button"),d.id="ytmi-btn",d.type="button",d.title="Immersive mode (Alt+V)",d.innerHTML=m,d.addEventListener("click",y=>{y.stopPropagation(),u()}),f?(d.className="ytmi-btn-inline",f.prepend(d)):(d.className="ytmi-btn-float",document.body.appendChild(d)))}M(),setInterval(M,1500)})();})();
