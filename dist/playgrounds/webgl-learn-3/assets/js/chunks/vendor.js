var Yg="1.1.18";function sp(r,t,e){return Math.max(r,Math.min(t,e))}function jg(r,t,e){return(1-e)*r+e*t}function Zg(r,t,e,n){return jg(r,t,1-Math.exp(-e*n))}function Kg(r,t){return(r%t+t)%t}var Jg=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(r){if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=r;const e=sp(0,this.currentTime/this.duration,1);t=e>=1;const n=t?1:this.easing(e);this.value=this.from+(this.to-this.from)*n}else this.lerp?(this.value=Zg(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),this.onUpdate?.(this.value,t)}stop(){this.isRunning=!1}fromTo(r,t,{lerp:e,duration:n,easing:i,onStart:s,onUpdate:a}){this.from=this.value=r,this.to=t,this.lerp=e,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s?.(),this.onUpdate=a}};function Qg(r,t){let e;return function(...n){let i=this;clearTimeout(e),e=setTimeout(()=>{e=void 0,r.apply(i,n)},t)}}var t_=class{constructor(r,t,{autoResize:e=!0,debounce:n=250}={}){this.wrapper=r,this.content=t,e&&(this.debouncedResize=Qg(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},op=class{events={};emit(r,...t){let e=this.events[r]||[];for(let n=0,i=e.length;n<i;n++)e[n]?.(...t)}on(r,t){return this.events[r]?.push(t)||(this.events[r]=[t]),()=>{this.events[r]=this.events[r]?.filter(e=>t!==e)}}off(r,t){this.events[r]=this.events[r]?.filter(e=>t!==e)}destroy(){this.events={}}},Iu=100/6,ji={passive:!1},e_=class{constructor(r,t={wheelMultiplier:1,touchMultiplier:1}){this.element=r,this.options=t,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,ji),this.element.addEventListener("touchstart",this.onTouchStart,ji),this.element.addEventListener("touchmove",this.onTouchMove,ji),this.element.addEventListener("touchend",this.onTouchEnd,ji)}touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new op;on(r,t){return this.emitter.on(r,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,ji),this.element.removeEventListener("touchstart",this.onTouchStart,ji),this.element.removeEventListener("touchmove",this.onTouchMove,ji),this.element.removeEventListener("touchend",this.onTouchEnd,ji)}onTouchStart=r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})};onTouchMove=r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r,n=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})};onTouchEnd=r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})};onWheel=r=>{let{deltaX:t,deltaY:e,deltaMode:n}=r;const i=n===1?Iu:n===2?this.window.width:1,s=n===1?Iu:n===2?this.window.height:1;t*=i,e*=s,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:r})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}},r1=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;__rafID=null;isTouching;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new Jg;emitter=new op;dimensions;virtualScroll;constructor({wrapper:r=window,content:t=document.documentElement,eventsTarget:e=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:a=35,duration:o,easing:l=M=>Math.min(1,1.001-Math.pow(2,-10*M)),lerp:c=.1,infinite:h=!1,orientation:u="vertical",gestureOrientation:f="vertical",touchMultiplier:m=1,wheelMultiplier:g=1,autoResize:d=!0,prevent:p,virtualScroll:_,overscroll:x=!0,autoRaf:b=!1,__experimental__naiveDimensions:v=!1}={}){window.lenisVersion=Yg,(!r||r===document.documentElement||r===document.body)&&(r=window),this.options={wrapper:r,content:t,eventsTarget:e,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:a,duration:o,easing:l,lerp:c,infinite:h,gestureOrientation:f,orientation:u,touchMultiplier:m,wheelMultiplier:g,autoResize:d,prevent:p,virtualScroll:_,overscroll:x,autoRaf:b,__experimental__naiveDimensions:v},this.dimensions=new t_(r,t,{autoResize:d}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new e_(e,{touchMultiplier:m,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,t){return this.emitter.on(r,t)}off(r,t){return this.emitter.off(r,t)}setScroll(r){this.isHorizontal?this.rootElement.scrollLeft=r:this.rootElement.scrollTop=r}onPointerDown=r=>{r.button===1&&this.reset()};onVirtualScroll=r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:t,deltaY:e,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const a=t===0&&e===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&a&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(a||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const h=this.options.prevent;if(c.find(p=>p instanceof HTMLElement&&(typeof h=="function"&&h?.(p)||p.hasAttribute?.("data-lenis-prevent")||i&&p.hasAttribute?.("data-lenis-prevent-touch")||s&&p.hasAttribute?.("data-lenis-prevent-wheel"))))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=e;this.options.gestureOrientation==="both"?f=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(f=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const m=i&&this.options.syncTouch,d=i&&n.type==="touchend"&&Math.abs(f)>5;d&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...m?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1)}stop(){this.isStopped||(this.reset(),this.isStopped=!0)}raf=r=>{const t=r-(this.time||r);this.time=r,this.animate.advance(t*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))};scrollTo(r,{offset:t=0,immediate:e=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:a=this.options.lerp,onStart:o,onComplete:l,force:c=!1,programmatic:h=!0,userData:u}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&r?.nodeType&&(f=r),f){if(this.options.wrapper!==window){const g=this.rootElement.getBoundingClientRect();t-=this.isHorizontal?g.left:g.top}const m=f.getBoundingClientRect();r=(this.isHorizontal?m.left:m.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=t,r=Math.round(r),this.options.infinite?h&&(this.targetScroll=this.animatedScroll=this.scroll):r=sp(0,r,this.limit),r===this.targetScroll){o?.(this),l?.(this);return}if(this.userData=u??{},e){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l?.(this),this.userData={};return}h||(this.targetScroll=r),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:a,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",o?.(this)},onUpdate:(f,m)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),h&&(this.targetScroll=f),m||this.emit(),m&&(this.reset(),this.emit(),l?.(this),this.userData={},this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?Kg(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};function Oi(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function ap(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Rn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ws={duration:.5,overwrite:!1,delay:0},Gh,$e,de,Hn=1e8,ce=1/Hn,Xc=Math.PI*2,n_=Xc/4,i_=0,lp=Math.sqrt,r_=Math.cos,s_=Math.sin,ze=function(t){return typeof t=="string"},ye=function(t){return typeof t=="function"},$i=function(t){return typeof t=="number"},Hh=function(t){return typeof t>"u"},Ti=function(t){return typeof t=="object"},dn=function(t){return t!==!1},Wh=function(){return typeof window<"u"},sa=function(t){return ye(t)||ze(t)},cp=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Xe=Array.isArray,qc=/(?:-?\.?\d|\.)+/gi,hp=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ls=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Wl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,up=/[+-]=-?[.\d]+/,fp=/[^,'"\[\]\s]+/gi,o_=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,_e,fi,Yc,$h,Fn={},il={},dp,pp=function(t){return(il=Kr(t,Fn))&&vn},Xh=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},zo=function(t,e){return!e&&console.warn(t)},mp=function(t,e){return t&&(Fn[t]=e)&&il&&(il[t]=e)||Fn},No=function(){return 0},a_={suppressEvents:!0,isStart:!0,kill:!1},Ga={suppressEvents:!0,kill:!1},l_={suppressEvents:!0},qh={},ur=[],jc={},gp,En={},$l={},Fu=30,Ha=[],Yh="",jh=function(t){var e=t[0],n,i;if(Ti(e)||ye(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=Ha.length;i--&&!Ha[i].targetTest(e););n=Ha[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new Bp(t[i],n)))||t.splice(i,1);return t},Vr=function(t){return t._gsap||jh(Wn(t))[0]._gsap},_p=function(t,e,n){return(n=t[e])&&ye(n)?t[e]():Hh(n)&&t.getAttribute&&t.getAttribute(e)||n},pn=function(t,e){return(t=t.split(",")).forEach(e)||t},Se=function(t){return Math.round(t*1e5)/1e5||0},Oe=function(t){return Math.round(t*1e7)/1e7||0},Fs=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},c_=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},rl=function(){var t=ur.length,e=ur.slice(0),n,i;for(jc={},ur.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},vp=function(t,e,n,i){ur.length&&!$e&&rl(),t.render(e,n,$e&&e<0&&(t._initted||t._startAt)),ur.length&&!$e&&rl()},xp=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(fp).length<2?e:ze(t)?t.trim():t},yp=function(t){return t},Xn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},h_=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Kr=function(t,e){for(var n in e)t[n]=e[n];return t},Ou=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Ti(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},sl=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},wo=function(t){var e=t.parent||_e,n=t.keyframes?h_(Xe(t.keyframes)):Xn;if(dn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},u_=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Mp=function(t,e,n,i,s){var a=t[i],o;if(s)for(o=e[s];a&&a[s]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},Tl=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,a=e._next;s?s._next=a:t[n]===e&&(t[n]=a),a?a._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},vr=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Gr=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},f_=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Zc=function(t,e,n,i){return t._startAt&&($e?t._startAt.revert(Ga):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},d_=function r(t){return!t||t._ts&&r(t.parent)},zu=function(t){return t._repeat?$s(t._tTime,t=t.duration()+t._rDelay)*t:0},$s=function(t,e){var n=Math.floor(t/=e);return t&&n===t?n-1:n},ol=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},El=function(t){return t._end=Oe(t._start+(t._tDur/Math.abs(t._ts||t._rts||ce)||0))},Al=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Oe(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),El(t),n._dirty||Gr(n,t)),t},bp=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=ol(t.rawTime(),e),(!e._dur||Ko(0,e.totalDuration(),n)-e._tTime>ce)&&e.render(n,!0)),Gr(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-ce}},mi=function(t,e,n,i){return e.parent&&vr(e),e._start=Oe(($i(n)?n:n||t!==_e?kn(t,n,e):t._time)+e._delay),e._end=Oe(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Mp(t,e,"_first","_last",t._sort?"_start":0),Kc(e)||(t._recent=e),i||bp(t,e),t._ts<0&&Al(t,t._tTime),t},Sp=function(t,e){return(Fn.ScrollTrigger||Xh("scrollTrigger",e))&&Fn.ScrollTrigger.create(e,t)},wp=function(t,e,n,i,s){if(Kh(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!$e&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&gp!==An.frame)return ur.push(t),t._lazy=[s,i],1},p_=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},Kc=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},m_=function(t,e,n,i){var s=t.ratio,a=e<0||!e&&(!t._start&&p_(t)&&!(!t._initted&&Kc(t))||(t._ts<0||t._dp._ts<0)&&!Kc(t))?0:1,o=t._rDelay,l=0,c,h,u;if(o&&t._repeat&&(l=Ko(0,t._tDur,e),h=$s(l,o),t._yoyo&&h&1&&(a=1-a),h!==$s(t._tTime,o)&&(s=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==s||$e||i||t._zTime===ce||!e&&t._zTime){if(!t._initted&&wp(t,e,i,n,l))return;for(u=t._zTime,t._zTime=e||(n?ce:0),n||(n=e&&!u),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&Zc(t,e,n,!0),t._onUpdate&&!n&&Pn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&Pn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&vr(t,1),!n&&!$e&&(Pn(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},g_=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},Xs=function(t,e,n,i){var s=t._repeat,a=Oe(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=s?s<0?1e10:Oe(a*(s+1)+t._rDelay*s):a,o>0&&!i&&Al(t,t._tTime=t._tDur*o),t.parent&&El(t),n||Gr(t.parent,t),t},Nu=function(t){return t instanceof tn?Gr(t):Xs(t,t._dur)},__={_start:0,endTime:No,totalDuration:No},kn=function r(t,e,n){var i=t.labels,s=t._recent||__,a=t.duration()>=Hn?s.endTime(!1):t._dur,o,l,c;return ze(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&n&&(l=l/100*(Xe(n)?n[0]:n).totalDuration()),o>1?r(t,e.substr(0,o-1),n)+l:a+l)):e==null?a:+e},To=function(t,e,n){var i=$i(e[1]),s=(i?2:1)+(t<2?0:1),a=e[s],o,l;if(i&&(a.duration=e[1]),a.parent=n,t){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=dn(l.vars.inherit)&&l.parent;a.immediateRender=dn(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[s-1]}return new Ae(e[0],a,e[s+1])},Mr=function(t,e){return t||t===0?e(t):e},Ko=function(t,e,n){return n<t?t:n>e?e:n},We=function(t,e){return!ze(t)||!(e=o_.exec(t))?"":e[1]},v_=function(t,e,n){return Mr(n,function(i){return Ko(t,e,i)})},Jc=[].slice,Tp=function(t,e){return t&&Ti(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Ti(t[0]))&&!t.nodeType&&t!==fi},x_=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return ze(i)&&!e||Tp(i,1)?(s=n).push.apply(s,Wn(i)):n.push(i)})||n},Wn=function(t,e,n){return de&&!e&&de.selector?de.selector(t):ze(t)&&!n&&(Yc||!qs())?Jc.call((e||$h).querySelectorAll(t),0):Xe(t)?x_(t,n):Tp(t)?Jc.call(t,0):t?[t]:[]},Qc=function(t){return t=Wn(t)[0]||zo("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Wn(e,n.querySelectorAll?n:n===t?zo("Invalid scope")||$h.createElement("div"):t)}},Ep=function(t){return t.sort(function(){return .5-Math.random()})},Ap=function(t){if(ye(t))return t;var e=Ti(t)?t:{each:t},n=Hr(e.ease),i=e.from||0,s=parseFloat(e.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=e.axis,h=i,u=i;return ze(i)?h=u={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],u=i[1]),function(f,m,g){var d=(g||e).length,p=a[d],_,x,b,v,M,w,E,y,S;if(!p){if(S=e.grid==="auto"?0:(e.grid||[1,Hn])[1],!S){for(E=-Hn;E<(E=g[S++].getBoundingClientRect().left)&&S<d;);S<d&&S--}for(p=a[d]=[],_=l?Math.min(S,d)*h-.5:i%S,x=S===Hn?0:l?d*u/S-.5:i/S|0,E=0,y=Hn,w=0;w<d;w++)b=w%S-_,v=x-(w/S|0),p[w]=M=c?Math.abs(c==="y"?v:b):lp(b*b+v*v),M>E&&(E=M),M<y&&(y=M);i==="random"&&Ep(p),p.max=E-y,p.min=y,p.v=d=(parseFloat(e.amount)||parseFloat(e.each)*(S>d?d-1:c?c==="y"?d/S:S:Math.max(S,d/S))||0)*(i==="edges"?-1:1),p.b=d<0?s-d:s,p.u=We(e.amount||e.each)||0,n=n&&d<0?Np(n):n}return d=(p[f]-p.min)/p.max||0,Oe(p.b+(n?n(d):d)*p.v)+p.u}},th=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Oe(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+($i(n)?0:We(n))}},Cp=function(t,e){var n=Xe(t),i,s;return!n&&Ti(t)&&(i=n=t.radius||Hn,t.values?(t=Wn(t.values),(s=!$i(t[0]))&&(i*=i)):t=th(t.increment)),Mr(e,n?ye(t)?function(a){return s=t(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=Hn,h=0,u=t.length,f,m;u--;)s?(f=t[u].x-o,m=t[u].y-l,f=f*f+m*m):f=Math.abs(t[u]-o),f<c&&(c=f,h=u);return h=!i||c<=i?t[h]:a,s||h===a||$i(a)?h:h+We(a)}:th(t))},Lp=function(t,e,n,i){return Mr(Xe(t)?!e:n===!0?!!(n=0):!i,function(){return Xe(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},y_=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,a){return a(s)},i)}},M_=function(t,e){return function(n){return t(parseFloat(n))+(e||We(n))}},b_=function(t,e,n){return Pp(t,e,0,1,n)},Dp=function(t,e,n){return Mr(n,function(i){return t[~~e(i)]})},S_=function r(t,e,n){var i=e-t;return Xe(t)?Dp(t,r(0,t.length),e):Mr(n,function(s){return(i+(s-t)%i)%i+t})},w_=function r(t,e,n){var i=e-t,s=i*2;return Xe(t)?Dp(t,r(0,t.length-1),e):Mr(n,function(a){return a=(s+(a-t)%s)%s||0,t+(a>i?s-a:a)})},ko=function(t){for(var e=0,n="",i,s,a,o;~(i=t.indexOf("random(",e));)a=t.indexOf(")",i),o=t.charAt(i+7)==="[",s=t.substr(i+7,a-i-7).match(o?fp:qc),n+=t.substr(e,i-e)+Lp(o?s:+s[0],o?0:+s[1],+s[2]||1e-5),e=a+1;return n+t.substr(e,t.length-e)},Pp=function(t,e,n,i,s){var a=e-t,o=i-n;return Mr(s,function(l){return n+((l-t)/a*o||0)})},T_=function r(t,e,n,i){var s=isNaN(t+e)?0:function(m){return(1-m)*t+m*e};if(!s){var a=ze(t),o={},l,c,h,u,f;if(n===!0&&(i=1)&&(n=null),a)t={p:t},e={p:e};else if(Xe(t)&&!Xe(e)){for(h=[],u=t.length,f=u-2,c=1;c<u;c++)h.push(r(t[c-1],t[c]));u--,s=function(g){g*=u;var d=Math.min(f,~~g);return h[d](g-d)},n=e}else i||(t=Kr(Xe(t)?[]:{},t));if(!h){for(l in e)Zh.call(o,t,l,"get",e[l]);s=function(g){return tu(g,o)||(a?t.p:t)}}}return Mr(n,s)},ku=function(t,e,n){var i=t.labels,s=Hn,a,o,l;for(a in i)o=i[a]-e,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},Pn=function(t,e,n){var i=t.vars,s=i[e],a=de,o=t._ctx,l,c,h;if(s)return l=i[e+"Params"],c=i.callbackScope||t,n&&ur.length&&rl(),o&&(de=o),h=l?s.apply(c,l):s.call(c),de=a,h},mo=function(t){return vr(t),t.scrollTrigger&&t.scrollTrigger.kill(!!$e),t.progress()<1&&Pn(t,"onInterrupt"),t},Ds,Rp=[],Ip=function(t){if(t)if(t=!t.name&&t.default||t,Wh()||t.headless){var e=t.name,n=ye(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:No,render:tu,add:Zh,kill:V_,modifier:B_,rawVars:0},a={targetTest:0,get:0,getSetter:Qh,aliases:{},register:0};if(qs(),t!==i){if(En[e])return;Xn(i,Xn(sl(t,s),a)),Kr(i.prototype,Kr(s,sl(t,a))),En[i.prop=e]=i,t.targetTest&&(Ha.push(i),qh[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}mp(e,i),t.register&&t.register(vn,i,mn)}else Rp.push(t)},ae=255,go={aqua:[0,ae,ae],lime:[0,ae,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ae],navy:[0,0,128],white:[ae,ae,ae],olive:[128,128,0],yellow:[ae,ae,0],orange:[ae,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ae,0,0],pink:[ae,192,203],cyan:[0,ae,ae],transparent:[ae,ae,ae,0]},Xl=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*ae+.5|0},Fp=function(t,e,n){var i=t?$i(t)?[t>>16,t>>8&ae,t&ae]:0:go.black,s,a,o,l,c,h,u,f,m,g;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),go[t])i=go[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+s+s+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&ae,i&ae,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&ae,t&ae]}else if(t.substr(0,3)==="hsl"){if(i=g=t.match(qc),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,s=h*2-a,i.length>3&&(i[3]*=1),i[0]=Xl(l+1/3,s,a),i[1]=Xl(l,s,a),i[2]=Xl(l-1/3,s,a);else if(~t.indexOf("="))return i=t.match(hp),n&&i.length<4&&(i[3]=1),i}else i=t.match(qc)||go.transparent;i=i.map(Number)}return e&&!g&&(s=i[0]/ae,a=i[1]/ae,o=i[2]/ae,u=Math.max(s,a,o),f=Math.min(s,a,o),h=(u+f)/2,u===f?l=c=0:(m=u-f,c=h>.5?m/(2-u-f):m/(u+f),l=u===s?(a-o)/m+(a<o?6:0):u===a?(o-s)/m+2:(s-a)/m+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},Op=function(t){var e=[],n=[],i=-1;return t.split(fr).forEach(function(s){var a=s.match(Ls)||[];e.push.apply(e,a),n.push(i+=a.length+1)}),e.c=n,e},Uu=function(t,e,n){var i="",s=(t+i).match(fr),a=e?"hsla(":"rgba(",o=0,l,c,h,u;if(!s)return t;if(s=s.map(function(f){return(f=Fp(f,e,1))&&a+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(h=Op(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(fr,"1").split(Ls),u=c.length-1;o<u;o++)i+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!c)for(c=t.split(fr),u=c.length-1;o<u;o++)i+=c[o]+s[o];return i+c[u]},fr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in go)r+="|"+t+"\\b";return new RegExp(r+")","gi")}(),E_=/hsl[a]?\(/,zp=function(t){var e=t.join(" "),n;if(fr.lastIndex=0,fr.test(e))return n=E_.test(e),t[1]=Uu(t[1],n),t[0]=Uu(t[0],n,Op(t[1])),!0},Uo,An=function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,a=s,o=[],l,c,h,u,f,m,g=function d(p){var _=r()-i,x=p===!0,b,v,M,w;if((_>t||_<0)&&(n+=_-e),i+=_,M=i-n,b=M-a,(b>0||x)&&(w=++u.frame,f=M-u.time*1e3,u.time=M=M/1e3,a+=b+(b>=s?4:s-b),v=1),x||(l=c(d)),v)for(m=0;m<o.length;m++)o[m](M,f,w,p)};return u={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(p){return f/(1e3/(p||60))},wake:function(){dp&&(!Yc&&Wh()&&(fi=Yc=window,$h=fi.document||{},Fn.gsap=vn,(fi.gsapVersions||(fi.gsapVersions=[])).push(vn.version),pp(il||fi.GreenSockGlobals||!fi.gsap&&fi||{}),Rp.forEach(Ip)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&u.sleep(),c=h||function(p){return setTimeout(p,a-u.time*1e3+1|0)},Uo=1,g(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),Uo=0,c=No},lagSmoothing:function(p,_){t=p||1/0,e=Math.min(_||33,t)},fps:function(p){s=1e3/(p||240),a=u.time*1e3+s},add:function(p,_,x){var b=_?function(v,M,w,E){p(v,M,w,E),u.remove(b)}:p;return u.remove(p),o[x?"unshift":"push"](b),qs(),b},remove:function(p,_){~(_=o.indexOf(p))&&o.splice(_,1)&&m>=_&&m--},_listeners:o},u}(),qs=function(){return!Uo&&An.wake()},ee={},A_=/^[\d.\-M][\d.\-,\s]/,C_=/["']/g,L_=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[i]=isNaN(c)?c.replace(C_,"").trim():+c,i=l.substr(o+1).trim();return e},D_=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},P_=function(t){var e=(t+"").split("("),n=ee[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[L_(e[1])]:D_(t).split(",").map(xp)):ee._CE&&A_.test(t)?ee._CE("",t):n},Np=function(t){return function(e){return 1-t(1-e)}},kp=function r(t,e){for(var n=t._first,i;n;)n instanceof tn?r(n,e):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==e&&(n.timeline?r(n.timeline,e):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=e)),n=n._next},Hr=function(t,e){return t&&(ye(t)?t:ee[t]||P_(t))||e},ss=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},a;return pn(t,function(o){ee[o]=Fn[o]=s,ee[a=o.toLowerCase()]=n;for(var l in s)ee[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ee[o+"."+l]=s[l]}),s},Up=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},ql=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),a=s/Xc*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*s_((h-a)*s)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:Up(o);return s=Xc/s,l.config=function(c,h){return r(t,c,h)},l},Yl=function r(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:Up(n);return i.config=function(s){return r(t,s)},i};pn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;ss(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});ee.Linear.easeNone=ee.none=ee.Linear.easeIn;ss("Elastic",ql("in"),ql("out"),ql());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(o){return o<e?r*o*o:o<n?r*Math.pow(o-1.5/t,2)+.75:o<i?r*(o-=2.25/t)*o+.9375:r*Math.pow(o-2.625/t,2)+.984375};ss("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);ss("Expo",function(r){return r?Math.pow(2,10*(r-1)):0});ss("Circ",function(r){return-(lp(1-r*r)-1)});ss("Sine",function(r){return r===1?1:-r_(r*n_)+1});ss("Back",Yl("in"),Yl("out"),Yl());ee.SteppedEase=ee.steps=Fn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,a=1-ce;return function(o){return((i*Ko(0,a,o)|0)+s)*n}}};Ws.ease=ee["quad.out"];pn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Yh+=r+","+r+"Params,"});var Bp=function(t,e){this.id=i_++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:_p,this.set=e?e.getSetter:Qh},Bo=function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Xs(this,+e.duration,1,1),this.data=e.data,de&&(this._ctx=de,de.data.push(this)),Uo||An.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Xs(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(qs(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Al(this,n),!s._dp||s.parent||bp(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&mi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===ce||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),vp(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+zu(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+zu(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?$s(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-ce?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?ol(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-ce?0:this._rts,this.totalTime(Ko(-Math.abs(this._delay),this._tDur,s),i!==!1),El(this),f_(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(qs(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==ce&&(this._tTime-=ce)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&mi(i,this,n-this._delay),this}return this._start},t.endTime=function(n){return this._start+(dn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?ol(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=l_);var i=$e;return $e=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),$e=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Nu(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Nu(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(kn(this,n),dn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,dn(i))},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-ce:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-ce,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-ce)},t.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},t.then=function(n){var i=this;return new Promise(function(s){var a=ye(n)?n:yp,o=function(){var c=i.then;i.then=null,ye(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=c),s(a),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?o():i._prom=o})},t.kill=function(){mo(this)},r}();Xn(Bo.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ce,_prom:0,_ps:!1,_rts:1});var tn=function(r){ap(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=dn(n.sortChildren),_e&&mi(n.parent||_e,Oi(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Sp(Oi(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,a){return To(0,arguments,this),this},e.from=function(i,s,a){return To(1,arguments,this),this},e.fromTo=function(i,s,a,o){return To(2,arguments,this),this},e.set=function(i,s,a){return s.duration=0,s.parent=this,wo(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Ae(i,s,kn(this,a),1),this},e.call=function(i,s,a){return mi(this,Ae.delayedCall(0,i,s),a)},e.staggerTo=function(i,s,a,o,l,c,h){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new Ae(i,a,kn(this,l)),this},e.staggerFrom=function(i,s,a,o,l,c,h){return a.runBackwards=1,wo(a).immediateRender=dn(a.immediateRender),this.staggerTo(i,s,a,o,l,c,h)},e.staggerFromTo=function(i,s,a,o,l,c,h,u){return o.startAt=a,wo(o).immediateRender=dn(o.immediateRender),this.staggerTo(i,s,o,l,c,h,u)},e.render=function(i,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Oe(i),u=this._zTime<0!=i<0&&(this._initted||!c),f,m,g,d,p,_,x,b,v,M,w,E;if(this!==_e&&h>l&&i>=0&&(h=l),h!==this._tTime||a||u){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),f=h,v=this._start,b=this._ts,_=!b,u&&(c||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(w=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,a);if(f=Oe(h%p),h===l?(d=this._repeat,f=c):(d=~~(h/p),d&&d===h/p&&(f=c,d--),f>c&&(f=c)),M=$s(this._tTime,p),!o&&this._tTime&&M!==d&&this._tTime-M*p-this._dur<=0&&(M=d),w&&d&1&&(f=c-f,E=1),d!==M&&!this._lock){var y=w&&M&1,S=y===(w&&d&1);if(d<M&&(y=!y),o=y?0:h%c?c:h,this._lock=1,this.render(o||(E?0:Oe(d*p)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&Pn(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1),o&&o!==this._time||_!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,S&&(this._lock=2,o=y?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!_)return this;kp(this,E)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=g_(this,Oe(o),Oe(f)),x&&(h-=f-(f=x._start))),this._tTime=h,this._time=f,this._act=!b,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&f&&!s&&!d&&(Pn(this,"onStart"),this._tTime!==h))return this;if(f>=o&&i>=0)for(m=this._first;m;){if(g=m._next,(m._act||f>=m._start)&&m._ts&&x!==m){if(m.parent!==this)return this.render(i,s,a);if(m.render(m._ts>0?(f-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(f-m._start)*m._ts,s,a),f!==this._time||!this._ts&&!_){x=0,g&&(h+=this._zTime=-ce);break}}m=g}else{m=this._last;for(var L=i<0?i:f;m;){if(g=m._prev,(m._act||L<=m._end)&&m._ts&&x!==m){if(m.parent!==this)return this.render(i,s,a);if(m.render(m._ts>0?(L-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(L-m._start)*m._ts,s,a||$e&&(m._initted||m._startAt)),f!==this._time||!this._ts&&!_){x=0,g&&(h+=this._zTime=L?-ce:ce);break}}m=g}}if(x&&!s&&(this.pause(),x.render(f>=o?0:-ce)._zTime=f>=o?1:-1,this._ts))return this._start=v,El(this),this.render(i,s,a);this._onUpdate&&!s&&Pn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(v===this._start||Math.abs(b)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&vr(this,1),!s&&!(i<0&&!o)&&(h||o||!l)&&(Pn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var a=this;if($i(s)||(s=kn(this,s,i)),!(i instanceof Bo)){if(Xe(i))return i.forEach(function(o){return a.add(o,s)}),this;if(ze(i))return this.addLabel(i,s);if(ye(i))i=Ae.delayedCall(0,i);else return this}return this!==i?mi(this,i,s):this},e.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Hn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Ae?s&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},e.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},e.remove=function(i){return ze(i)?this.removeLabel(i):ye(i)?this.killTweensOf(i):(Tl(this,i),i===this._recent&&(this._recent=this._last),Gr(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Oe(An.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=kn(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,a){var o=Ae.delayedCall(0,s||No,a);return o.data="isPause",this._hasPause=1,mi(this,o,kn(this,i))},e.removePause=function(i){var s=this._first;for(i=kn(this,i);s;)s._start===i&&s.data==="isPause"&&vr(s),s=s._next},e.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)sr!==o[l]&&o[l].kill(i,s);return this},e.getTweensOf=function(i,s){for(var a=[],o=Wn(i),l=this._first,c=$i(s),h;l;)l instanceof Ae?c_(l._targets,o)&&(c?(!sr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(h=l.getTweensOf(o,s)).length&&a.push.apply(a,h),l=l._next;return a},e.tweenTo=function(i,s){s=s||{};var a=this,o=kn(a,i),l=s,c=l.startAt,h=l.onStart,u=l.onStartParams,f=l.immediateRender,m,g=Ae.to(a,Xn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||ce,onStart:function(){if(a.pause(),!m){var p=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());g._dur!==p&&Xs(g,p,0,1).render(g._time,!0,!0),m=1}h&&h.apply(g,u||[])}},s));return f?g.render(0):g},e.tweenFromTo=function(i,s,a){return this.tweenTo(s,Xn({startAt:{time:kn(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),ku(this,kn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),ku(this,kn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+ce)},e.shiftChildren=function(i,s,a){a===void 0&&(a=0);for(var o=this._first,l=this.labels,c;o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=i);return Gr(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Gr(this)},e.totalDuration=function(i){var s=0,a=this,o=a._last,l=Hn,c,h,u;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(u=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,mi(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(s-=h,(!u&&!a._dp||u&&u.smoothChildTiming)&&(a._start+=h/a._ts,a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;Xs(a,a===_e&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(_e._ts&&(vp(_e,ol(i,_e)),gp=An.frame),An.frame>=Fu){Fu+=Rn.autoSleep||120;var s=_e._first;if((!s||!s._ts)&&Rn.autoSleep&&An._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||An.sleep()}}},t}(Bo);Xn(tn.prototype,{_lock:0,_hasPause:0,_forcing:0});var R_=function(t,e,n,i,s,a,o){var l=new mn(this._pt,t,e,0,1,Xp,null,s),c=0,h=0,u,f,m,g,d,p,_,x;for(l.b=n,l.e=i,n+="",i+="",(_=~i.indexOf("random("))&&(i=ko(i)),a&&(x=[n,i],a(x,t,e),n=x[0],i=x[1]),f=n.match(Wl)||[];u=Wl.exec(i);)g=u[0],d=i.substring(c,u.index),m?m=(m+1)%5:d.substr(-5)==="rgba("&&(m=1),g!==f[h++]&&(p=parseFloat(f[h-1])||0,l._pt={_next:l._pt,p:d||h===1?d:",",s:p,c:g.charAt(1)==="="?Fs(p,g)-p:parseFloat(g)-p,m:m&&m<4?Math.round:0},c=Wl.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(up.test(i)||_)&&(l.e=0),this._pt=l,l},Zh=function(t,e,n,i,s,a,o,l,c,h){ye(i)&&(i=i(s||0,t,a));var u=t[e],f=n!=="get"?n:ye(u)?c?t[e.indexOf("set")||!ye(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():u,m=ye(u)?c?N_:Wp:Jh,g;if(ze(i)&&(~i.indexOf("random(")&&(i=ko(i)),i.charAt(1)==="="&&(g=Fs(f,i)+(We(f)||0),(g||g===0)&&(i=g))),!h||f!==i||eh)return!isNaN(f*i)&&i!==""?(g=new mn(this._pt,t,e,+f||0,i-(f||0),typeof u=="boolean"?U_:$p,0,m),c&&(g.fp=c),o&&g.modifier(o,this,t),this._pt=g):(!u&&!(e in t)&&Xh(e,i),R_.call(this,t,e,f,i,m,l||Rn.stringFilter,c))},I_=function(t,e,n,i,s){if(ye(t)&&(t=Eo(t,s,e,n,i)),!Ti(t)||t.style&&t.nodeType||Xe(t)||cp(t))return ze(t)?Eo(t,s,e,n,i):t;var a={},o;for(o in t)a[o]=Eo(t[o],s,e,n,i);return a},Vp=function(t,e,n,i,s,a){var o,l,c,h;if(En[t]&&(o=new En[t]).init(s,o.rawVars?e[t]:I_(e[t],i,s,a,n),n,i,a)!==!1&&(n._pt=l=new mn(n._pt,s,t,0,1,o.render,o,0,o.priority),n!==Ds))for(c=n._ptLookup[n._targets.indexOf(s)],h=o._props.length;h--;)c[o._props[h]]=l;return o},sr,eh,Kh=function r(t,e,n){var i=t.vars,s=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,u=i.yoyoEase,f=i.keyframes,m=i.autoRevert,g=t._dur,d=t._startAt,p=t._targets,_=t.parent,x=_&&_.data==="nested"?_.vars.targets:p,b=t._overwrite==="auto"&&!Gh,v=t.timeline,M,w,E,y,S,L,R,F,j,I,V,N,U;if(v&&(!f||!s)&&(s="none"),t._ease=Hr(s,Ws.ease),t._yEase=u?Np(Hr(u===!0?s:u,Ws.ease)):0,u&&t._yoyo&&!t._repeat&&(u=t._yEase,t._yEase=t._ease,t._ease=u),t._from=!v&&!!i.runBackwards,!v||f&&!i.stagger){if(F=p[0]?Vr(p[0]).harness:0,N=F&&i[F.prop],M=sl(i,qh),d&&(d._zTime<0&&d.progress(1),e<0&&h&&o&&!m?d.render(-1,!0):d.revert(h&&g?Ga:a_),d._lazy=0),a){if(vr(t._startAt=Ae.set(p,Xn({data:"isStart",overwrite:!1,parent:_,immediateRender:!0,lazy:!d&&dn(l),startAt:null,delay:0,onUpdate:c&&function(){return Pn(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&($e||!o&&!m)&&t._startAt.revert(Ga),o&&g&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&g&&!d){if(e&&(o=!1),E=Xn({overwrite:!1,data:"isFromStart",lazy:o&&!d&&dn(l),immediateRender:o,stagger:0,parent:_},M),N&&(E[F.prop]=N),vr(t._startAt=Ae.set(p,E)),t._startAt._dp=0,t._startAt._sat=t,e<0&&($e?t._startAt.revert(Ga):t._startAt.render(-1,!0)),t._zTime=e,!o)r(t._startAt,ce,ce);else if(!e)return}for(t._pt=t._ptCache=0,l=g&&dn(l)||l&&!g,w=0;w<p.length;w++){if(S=p[w],R=S._gsap||jh(p)[w]._gsap,t._ptLookup[w]=I={},jc[R.id]&&ur.length&&rl(),V=x===p?w:x.indexOf(S),F&&(j=new F).init(S,N||M,t,V,x)!==!1&&(t._pt=y=new mn(t._pt,S,j.name,0,1,j.render,j,0,j.priority),j._props.forEach(function(H){I[H]=y}),j.priority&&(L=1)),!F||N)for(E in M)En[E]&&(j=Vp(E,M,t,V,S,x))?j.priority&&(L=1):I[E]=y=Zh.call(t,S,E,"get",M[E],V,x,0,i.stringFilter);t._op&&t._op[w]&&t.kill(S,t._op[w]),b&&t._pt&&(sr=t,_e.killTweensOf(S,I,t.globalTime(e)),U=!t.parent,sr=0),t._pt&&l&&(jc[R.id]=1)}L&&qp(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!U,f&&e<=0&&v.render(Hn,!0,!0)},F_=function(t,e,n,i,s,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,u,f,m;if(!c)for(c=t._ptCache[e]=[],f=t._ptLookup,m=t._targets.length;m--;){if(h=f[m][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return eh=1,t.vars[e]="+=0",Kh(t,o),eh=0,l?zo(e+" not eligible for reset"):1;c.push(h)}for(m=c.length;m--;)u=c[m],h=u._pt||u,h.s=(i||i===0)&&!s?i:h.s+(i||0)+a*h.c,h.c=n-h.s,u.e&&(u.e=Se(n)+We(u.e)),u.b&&(u.b=h.s+We(u.b))},O_=function(t,e){var n=t[0]?Vr(t[0]).harness:0,i=n&&n.aliases,s,a,o,l;if(!i)return e;s=Kr({},e);for(a in i)if(a in s)for(l=i[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},z_=function(t,e,n,i){var s=e.ease||i||"power1.inOut",a,o;if(Xe(e))o=n[t]||(n[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:s})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:s})},Eo=function(t,e,n,i,s){return ye(t)?t.call(e,n,i,s):ze(t)&&~t.indexOf("random(")?ko(t):t},Gp=Yh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Hp={};pn(Gp+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Hp[r]=1});var Ae=function(r){ap(t,r);function t(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:wo(i))||this;var l=o.vars,c=l.duration,h=l.delay,u=l.immediateRender,f=l.stagger,m=l.overwrite,g=l.keyframes,d=l.defaults,p=l.scrollTrigger,_=l.yoyoEase,x=i.parent||_e,b=(Xe(n)||cp(n)?$i(n[0]):"length"in i)?[n]:Wn(n),v,M,w,E,y,S,L,R;if(o._targets=b.length?jh(b):zo("GSAP target "+n+" not found. https://gsap.com",!Rn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=m,g||f||sa(c)||sa(h)){if(i=o.vars,v=o.timeline=new tn({data:"nested",defaults:d||{},targets:x&&x.data==="nested"?x.vars.targets:b}),v.kill(),v.parent=v._dp=Oi(o),v._start=0,f||sa(c)||sa(h)){if(E=b.length,L=f&&Ap(f),Ti(f))for(y in f)~Gp.indexOf(y)&&(R||(R={}),R[y]=f[y]);for(M=0;M<E;M++)w=sl(i,Hp),w.stagger=0,_&&(w.yoyoEase=_),R&&Kr(w,R),S=b[M],w.duration=+Eo(c,Oi(o),M,S,b),w.delay=(+Eo(h,Oi(o),M,S,b)||0)-o._delay,!f&&E===1&&w.delay&&(o._delay=h=w.delay,o._start+=h,w.delay=0),v.to(S,w,L?L(M,S,b):0),v._ease=ee.none;v.duration()?c=h=0:o.timeline=0}else if(g){wo(Xn(v.vars.defaults,{ease:"none"})),v._ease=Hr(g.ease||i.ease||"none");var F=0,j,I,V;if(Xe(g))g.forEach(function(N){return v.to(b,N,">")}),v.duration();else{w={};for(y in g)y==="ease"||y==="easeEach"||z_(y,g[y],w,g.easeEach);for(y in w)for(j=w[y].sort(function(N,U){return N.t-U.t}),F=0,M=0;M<j.length;M++)I=j[M],V={ease:I.e,duration:(I.t-(M?j[M-1].t:0))/100*c},V[y]=I.v,v.to(b,V,F),F+=V.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||o.duration(c=v.duration())}else o.timeline=0;return m===!0&&!Gh&&(sr=Oi(o),_e.killTweensOf(b),sr=0),mi(x,Oi(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(u||!c&&!g&&o._start===Oe(x._time)&&dn(u)&&d_(Oi(o))&&x.data!=="nested")&&(o._tTime=-ce,o.render(Math.max(0,-h)||0)),p&&Sp(Oi(o),p),o}var e=t.prototype;return e.render=function(i,s,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,u=i>l-ce&&!h?l:i<ce?0:i,f,m,g,d,p,_,x,b,v;if(!c)m_(this,i,s,a);else if(u!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h){if(f=u,b=this.timeline,this._repeat){if(d=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(d*100+i,s,a);if(f=Oe(u%d),u===l?(g=this._repeat,f=c):(g=~~(u/d),g&&g===Oe(u/d)&&(f=c,g--),f>c&&(f=c)),_=this._yoyo&&g&1,_&&(v=this._yEase,f=c-f),p=$s(this._tTime,d),f===o&&!a&&this._initted&&g===p)return this._tTime=u,this;g!==p&&(b&&this._yEase&&kp(b,_),this.vars.repeatRefresh&&!_&&!this._lock&&this._time!==d&&this._initted&&(this._lock=a=1,this.render(Oe(d*g),!0).invalidate()._lock=0))}if(!this._initted){if(wp(this,h?i:f,a,s,u))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==p))return this;if(c!==this._dur)return this.render(i,s,a)}if(this._tTime=u,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=x=(v||this._ease)(f/c),this._from&&(this.ratio=x=1-x),f&&!o&&!s&&!g&&(Pn(this,"onStart"),this._tTime!==u))return this;for(m=this._pt;m;)m.r(x,m.d),m=m._next;b&&b.render(i<0?i:b._dur*b._ease(f/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&Zc(this,i,s,a),Pn(this,"onUpdate")),this._repeat&&g!==p&&this.vars.onRepeat&&!s&&this.parent&&Pn(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(h&&!this._onUpdate&&Zc(this,i,!0,!0),(i||!c)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&vr(this,1),!s&&!(h&&!o)&&(u||o||_)&&(Pn(this,u===l?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,a,o,l){Uo||An.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Kh(this,c),h=this._ease(c/this._dur),F_(this,i,s,a,o,h,c,l)?this.resetTo(i,s,a,o,1):(Al(this,0),this.parent||Mp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?mo(this):this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,sr&&sr.vars.overwrite!==!0)._first||mo(this),this.parent&&a!==this.timeline.totalDuration()&&Xs(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?Wn(i):o,c=this._ptLookup,h=this._pt,u,f,m,g,d,p,_;if((!s||s==="all")&&u_(o,l))return s==="all"&&(this._pt=0),mo(this);for(u=this._op=this._op||[],s!=="all"&&(ze(s)&&(d={},pn(s,function(x){return d[x]=1}),s=d),s=O_(o,s)),_=o.length;_--;)if(~l.indexOf(o[_])){f=c[_],s==="all"?(u[_]=s,g=f,m={}):(m=u[_]=u[_]||{},g=s);for(d in g)p=f&&f[d],p&&((!("kill"in p.d)||p.d.kill(d)===!0)&&Tl(this,p,"_pt"),delete f[d]),m!=="all"&&(m[d]=1)}return this._initted&&!this._pt&&h&&mo(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return To(1,arguments)},t.delayedCall=function(i,s,a,o){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,s,a){return To(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,a){return _e.killTweensOf(i,s,a)},t}(Bo);Xn(Ae.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});pn("staggerTo,staggerFrom,staggerFromTo",function(r){Ae[r]=function(){var t=new tn,e=Jc.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var Jh=function(t,e,n){return t[e]=n},Wp=function(t,e,n){return t[e](n)},N_=function(t,e,n,i){return t[e](i.fp,n)},k_=function(t,e,n){return t.setAttribute(e,n)},Qh=function(t,e){return ye(t[e])?Wp:Hh(t[e])&&t.setAttribute?k_:Jh},$p=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},U_=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Xp=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},tu=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},B_=function(t,e,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(t,e,n),s=a},V_=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Tl(this,e,"_pt"):e.dep||(n=1),e=i;return!n},G_=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},qp=function(t){for(var e=t._pt,n,i,s,a;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:a=e,e=n}t._pt=s},mn=function(){function r(e,n,i,s,a,o,l,c,h){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||$p,this.d=l||this,this.set=c||Jh,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=G_,this.m=n,this.mt=s,this.tween=i},r}();pn(Yh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return qh[r]=1});Fn.TweenMax=Fn.TweenLite=Ae;Fn.TimelineLite=Fn.TimelineMax=tn;_e=new tn({sortChildren:!1,defaults:Ws,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Rn.stringFilter=zp;var Wr=[],Wa={},H_=[],Bu=0,W_=0,jl=function(t){return(Wa[t]||H_).map(function(e){return e()})},nh=function(){var t=Date.now(),e=[];t-Bu>2&&(jl("matchMediaInit"),Wr.forEach(function(n){var i=n.queries,s=n.conditions,a,o,l,c;for(o in i)a=fi.matchMedia(i[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&e.push(n))}),jl("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Bu=t,jl("matchMedia"))},Yp=function(){function r(e,n){this.selector=n&&Qc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=W_++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){ye(n)&&(s=i,i=n,n=ye);var a=this,o=function(){var c=de,h=a.selector,u;return c&&c!==a&&c.data.push(a),s&&(a.selector=Qc(s)),de=a,u=i.apply(a,arguments),ye(u)&&a._r.push(u),de=c,a.selector=h,a.isReverted=!1,u};return a.last=o,n===ye?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},t.ignore=function(n){var i=de;de=null,n(this),de=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Ae&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,u){return u.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof tn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ae)&&c.revert&&c.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=Wr.length;a--;)Wr[a].id===this.id&&Wr.splice(a,1)},t.revert=function(n){this.kill(n||{})},r}(),$_=function(){function r(e){this.contexts=[],this.scope=e,de&&de.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){Ti(n)||(n={matches:n});var a=new Yp(0,s||this.scope),o=a.conditions={},l,c,h;de&&!a.selector&&(a.selector=de.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=fi.matchMedia(n[c]),l&&(Wr.indexOf(a)<0&&Wr.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(nh):l.addEventListener("change",nh)));return h&&i(a,function(u){return a.add(null,u)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),al={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Ip(i)})},timeline:function(t){return new tn(t)},getTweensOf:function(t,e){return _e.getTweensOf(t,e)},getProperty:function(t,e,n,i){ze(t)&&(t=Wn(t)[0]);var s=Vr(t||{}).get,a=n?yp:xp;return n==="native"&&(n=""),t&&(e?a((En[e]&&En[e].get||s)(t,e,n,i)):function(o,l,c){return a((En[o]&&En[o].get||s)(t,o,l,c))})},quickSetter:function(t,e,n){if(t=Wn(t),t.length>1){var i=t.map(function(h){return vn.quickSetter(h,e,n)}),s=i.length;return function(h){for(var u=s;u--;)i[u](h)}}t=t[0]||{};var a=En[e],o=Vr(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(h){var u=new a;Ds._pt=0,u.init(t,n?h+n:h,Ds,0,[t]),u.render(1,u),Ds._pt&&tu(1,Ds)}:o.set(t,l);return a?c:function(h){return c(t,l,n?h+n:h,o,1)}},quickTo:function(t,e,n){var i,s=vn.to(t,Kr((i={},i[e]="+=0.1",i.paused=!0,i),n||{})),a=function(l,c,h){return s.resetTo(e,l,c,h)};return a.tween=s,a},isTweening:function(t){return _e.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Hr(t.ease,Ws.ease)),Ou(Ws,t||{})},config:function(t){return Ou(Rn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!En[o]&&!Fn[o]&&zo(e+" effect requires "+o+" plugin.")}),$l[e]=function(o,l,c){return n(Wn(o),Xn(l||{},s),c)},a&&(tn.prototype[e]=function(o,l,c){return this.add($l[e](o,Ti(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){ee[t]=Hr(e)},parseEase:function(t,e){return arguments.length?Hr(t,e):ee},getById:function(t){return _e.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new tn(t),i,s;for(n.smoothChildTiming=dn(t.smoothChildTiming),_e.remove(n),n._dp=0,n._time=n._tTime=_e._time,i=_e._first;i;)s=i._next,(e||!(!i._dur&&i instanceof Ae&&i.vars.onComplete===i._targets[0]))&&mi(n,i,i._start-i._delay),i=s;return mi(_e,n,0),n},context:function(t,e){return t?new Yp(t,e):de},matchMedia:function(t){return new $_(t)},matchMediaRefresh:function(){return Wr.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||nh()},addEventListener:function(t,e){var n=Wa[t]||(Wa[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Wa[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:S_,wrapYoyo:w_,distribute:Ap,random:Lp,snap:Cp,normalize:b_,getUnit:We,clamp:v_,splitColor:Fp,toArray:Wn,selector:Qc,mapRange:Pp,pipe:y_,unitize:M_,interpolate:T_,shuffle:Ep},install:pp,effects:$l,ticker:An,updateRoot:tn.updateRoot,plugins:En,globalTimeline:_e,core:{PropTween:mn,globals:mp,Tween:Ae,Timeline:tn,Animation:Bo,getCache:Vr,_removeLinkedListItem:Tl,reverting:function(){return $e},context:function(t){return t&&de&&(de.data.push(t),t._ctx=de),de},suppressOverwrites:function(t){return Gh=t}}};pn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return al[r]=Ae[r]});An.add(tn.updateRoot);Ds=al.to({},{duration:0});var X_=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},q_=function(t,e){var n=t._targets,i,s,a;for(i in e)for(s=n.length;s--;)a=t._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=X_(a,i)),a&&a.modifier&&a.modifier(e[i],t,n[s],i))},Zl=function(t,e){return{name:t,rawVars:1,init:function(i,s,a){a._onInit=function(o){var l,c;if(ze(s)&&(l={},pn(s,function(h){return l[h]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}q_(o,s)}}}},vn=al.registerPlugin({name:"attr",init:function(t,e,n,i,s){var a,o,l;this.tween=n;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],i,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)$e?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},Zl("roundProps",th),Zl("modifiers"),Zl("snap",Cp))||al;Ae.version=tn.version=vn.version="3.12.5";dp=1;Wh()&&qs();ee.Power0;ee.Power1;ee.Power2;ee.Power3;ee.Power4;ee.Linear;ee.Quad;ee.Cubic;ee.Quart;ee.Quint;ee.Strong;ee.Elastic;ee.Back;ee.SteppedEase;ee.Bounce;ee.Sine;ee.Expo;ee.Circ;/*!
 * CSSPlugin 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Vu,or,Os,eu,Fr,Gu,nu,Y_=function(){return typeof window<"u"},Xi={},Cr=180/Math.PI,zs=Math.PI/180,as=Math.atan2,Hu=1e8,iu=/([A-Z])/g,j_=/(left|right|width|margin|padding|x)/i,Z_=/[\s,\(]\S/,gi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},ih=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},K_=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},J_=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},Q_=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},jp=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Zp=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},t0=function(t,e,n){return t.style[e]=n},e0=function(t,e,n){return t.style.setProperty(e,n)},n0=function(t,e,n){return t._gsap[e]=n},i0=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},r0=function(t,e,n,i,s){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},s0=function(t,e,n,i,s){var a=t._gsap;a[e]=n,a.renderTransform(s,a)},ve="transform",gn=ve+"Origin",o0=function r(t,e){var n=this,i=this.target,s=i.style,a=i._gsap;if(t in Xi&&s){if(this.tfm=this.tfm||{},t!=="transform")t=gi[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=Ui(i,o)}):this.tfm[t]=a.x?a[t]:Ui(i,t),t===gn&&(this.tfm.zOrigin=a.zOrigin);else return gi.transform.split(",").forEach(function(o){return r.call(n,o,e)});if(this.props.indexOf(ve)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(gn,e,"")),t=ve}(s||e)&&this.props.push(t,e,s[t])},Kp=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},a0=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,a;for(s=0;s<t.length;s+=3)t[s+1]?e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(iu,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=nu(),(!s||!s.isStart)&&!n[ve]&&(Kp(n),i.zOrigin&&n[gn]&&(n[gn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Jp=function(t,e){var n={target:t,props:[],revert:a0,save:o0};return t._gsap||vn.core.getCache(t),e&&e.split(",").forEach(function(i){return n.save(i)}),n},Qp,rh=function(t,e){var n=or.createElementNS?or.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):or.createElement(t);return n&&n.style?n:or.createElement(t)},yi=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(iu,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,Ys(e)||e,1)||""},Wu="O,Moz,ms,Ms,Webkit".split(","),Ys=function(t,e,n){var i=e||Fr,s=i.style,a=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(Wu[a]+t in s););return a<0?null:(a===3?"ms":a>=0?Wu[a]:"")+t},sh=function(){Y_()&&window.document&&(Vu=window,or=Vu.document,Os=or.documentElement,Fr=rh("div")||{style:{}},rh("div"),ve=Ys(ve),gn=ve+"Origin",Fr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Qp=!!Ys("perspective"),nu=vn.core.reverting,eu=1)},Kl=function r(t){var e=rh("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,i=this.nextSibling,s=this.style.cssText,a;if(Os.appendChild(e),e.appendChild(this),this.style.display="block",t)try{a=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=r}catch{}else this._gsapBBox&&(a=this._gsapBBox());return n&&(i?n.insertBefore(this,i):n.appendChild(this)),Os.removeChild(e),this.style.cssText=s,a},$u=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},tm=function(t){var e;try{e=t.getBBox()}catch{e=Kl.call(t,!0)}return e&&(e.width||e.height)||t.getBBox===Kl||(e=Kl.call(t,!0)),e&&!e.width&&!e.x&&!e.y?{x:+$u(t,["x","cx","x1"])||0,y:+$u(t,["y","cy","y1"])||0,width:0,height:0}:e},em=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&tm(t))},Jr=function(t,e){if(e){var n=t.style,i;e in Xi&&e!==gn&&(e=ve),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(iu,"-$1").toLowerCase())):n.removeAttribute(e)}},ar=function(t,e,n,i,s,a){var o=new mn(t._pt,e,n,0,1,a?Zp:jp);return t._pt=o,o.b=i,o.e=s,t._props.push(n),o},Xu={deg:1,rad:1,turn:1},l0={grid:1,flex:1},xr=function r(t,e,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Fr.style,l=j_.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),u=100,f=i==="px",m=i==="%",g,d,p,_;if(i===a||!s||Xu[i]||Xu[a])return s;if(a!=="px"&&!f&&(s=r(t,e,n,"px")),_=t.getCTM&&em(t),(m||a==="%")&&(Xi[e]||~e.indexOf("adius")))return g=_?t.getBBox()[l?"width":"height"]:t[h],Se(m?s/g*u:s/100*g);if(o[l?"width":"height"]=u+(f?a:i),d=~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,_&&(d=(t.ownerSVGElement||{}).parentNode),(!d||d===or||!d.appendChild)&&(d=or.body),p=d._gsap,p&&m&&p.width&&l&&p.time===An.time&&!p.uncache)return Se(s/p.width*u);if(m&&(e==="height"||e==="width")){var x=t.style[e];t.style[e]=u+i,g=t[h],x?t.style[e]=x:Jr(t,e)}else(m||a==="%")&&!l0[yi(d,"display")]&&(o.position=yi(t,"position")),d===t&&(o.position="static"),d.appendChild(Fr),g=Fr[h],d.removeChild(Fr),o.position="absolute";return l&&m&&(p=Vr(d),p.time=An.time,p.width=d[h]),Se(f?g*s/u:g&&s?u/g*s:0)},Ui=function(t,e,n,i){var s;return eu||sh(),e in gi&&e!=="transform"&&(e=gi[e],~e.indexOf(",")&&(e=e.split(",")[0])),Xi[e]&&e!=="transform"?(s=Go(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:cl(yi(t,gn))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=ll[e]&&ll[e](t,e,n)||yi(t,e)||_p(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?xr(t,e,s,n)+n:s},c0=function(t,e,n,i){if(!n||n==="none"){var s=Ys(e,t,1),a=s&&yi(t,s,1);a&&a!==n?(e=s,n=a):e==="borderColor"&&(n=yi(t,"borderTopColor"))}var o=new mn(this._pt,t.style,e,0,1,Xp),l=0,c=0,h,u,f,m,g,d,p,_,x,b,v,M;if(o.b=n,o.e=i,n+="",i+="",i==="auto"&&(d=t.style[e],t.style[e]=i,i=yi(t,e)||i,d?t.style[e]=d:Jr(t,e)),h=[n,i],zp(h),n=h[0],i=h[1],f=n.match(Ls)||[],M=i.match(Ls)||[],M.length){for(;u=Ls.exec(i);)p=u[0],x=i.substring(l,u.index),g?g=(g+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(g=1),p!==(d=f[c++]||"")&&(m=parseFloat(d)||0,v=d.substr((m+"").length),p.charAt(1)==="="&&(p=Fs(m,p)+v),_=parseFloat(p),b=p.substr((_+"").length),l=Ls.lastIndex-b.length,b||(b=b||Rn.units[e]||v,l===i.length&&(i+=b,o.e+=b)),v!==b&&(m=xr(t,e,d,b)||0),o._pt={_next:o._pt,p:x||c===1?x:",",s:m,c:_-m,m:g&&g<4||e==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=e==="display"&&i==="none"?Zp:jp;return up.test(i)&&(o.e=0),this._pt=o,o},qu={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},h0=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=qu[n]||n,e[1]=qu[i]||i,e.join(" ")},u0=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],Xi[o]&&(l=1,o=o==="transformOrigin"?gn:ve),Jr(n,o);l&&(Jr(n,ve),a&&(a.svg&&n.removeAttribute("transform"),Go(n,1),a.uncache=1,Kp(i)))}},ll={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var a=t._pt=new mn(t._pt,e,n,0,0,u0);return a.u=i,a.pr=-10,a.tween=s,t._props.push(n),1}}},Vo=[1,0,0,1,0,0],nm={},im=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Yu=function(t){var e=yi(t,ve);return im(e)?Vo:e.substr(7).match(hp).map(Se)},ru=function(t,e){var n=t._gsap||Vr(t),i=t.style,s=Yu(t),a,o,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Vo:s):(s===Vo&&!t.offsetParent&&t!==Os&&!n.svg&&(l=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent)&&(c=1,o=t.nextElementSibling,Os.appendChild(t)),s=Yu(t),l?i.display=l:Jr(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):Os.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},oh=function(t,e,n,i,s,a){var o=t._gsap,l=s||ru(t,!0),c=o.xOrigin||0,h=o.yOrigin||0,u=o.xOffset||0,f=o.yOffset||0,m=l[0],g=l[1],d=l[2],p=l[3],_=l[4],x=l[5],b=e.split(" "),v=parseFloat(b[0])||0,M=parseFloat(b[1])||0,w,E,y,S;n?l!==Vo&&(E=m*p-g*d)&&(y=v*(p/E)+M*(-d/E)+(d*x-p*_)/E,S=v*(-g/E)+M*(m/E)-(m*x-g*_)/E,v=y,M=S):(w=tm(t),v=w.x+(~b[0].indexOf("%")?v/100*w.width:v),M=w.y+(~(b[1]||b[0]).indexOf("%")?M/100*w.height:M)),i||i!==!1&&o.smooth?(_=v-c,x=M-h,o.xOffset=u+(_*m+x*d)-_,o.yOffset=f+(_*g+x*p)-x):o.xOffset=o.yOffset=0,o.xOrigin=v,o.yOrigin=M,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!n,t.style[gn]="0px 0px",a&&(ar(a,o,"xOrigin",c,v),ar(a,o,"yOrigin",h,M),ar(a,o,"xOffset",u,o.xOffset),ar(a,o,"yOffset",f,o.yOffset)),t.setAttribute("data-svg-origin",v+" "+M)},Go=function(t,e){var n=t._gsap||new Bp(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=yi(t,gn)||"0",h,u,f,m,g,d,p,_,x,b,v,M,w,E,y,S,L,R,F,j,I,V,N,U,H,k,C,Z,z,K,J,q;return h=u=f=d=p=_=x=b=v=0,m=g=1,n.svg=!!(t.getCTM&&em(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[ve]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[ve]!=="none"?l[ve]:"")),i.scale=i.rotate=i.translate="none"),E=ru(t,n.svg),n.svg&&(n.uncache?(H=t.getBBox(),c=n.xOrigin-H.x+"px "+(n.yOrigin-H.y)+"px",U=""):U=!e&&t.getAttribute("data-svg-origin"),oh(t,U||c,!!U||n.originIsAbsolute,n.smooth!==!1,E)),M=n.xOrigin||0,w=n.yOrigin||0,E!==Vo&&(R=E[0],F=E[1],j=E[2],I=E[3],h=V=E[4],u=N=E[5],E.length===6?(m=Math.sqrt(R*R+F*F),g=Math.sqrt(I*I+j*j),d=R||F?as(F,R)*Cr:0,x=j||I?as(j,I)*Cr+d:0,x&&(g*=Math.abs(Math.cos(x*zs))),n.svg&&(h-=M-(M*R+w*j),u-=w-(M*F+w*I))):(q=E[6],K=E[7],C=E[8],Z=E[9],z=E[10],J=E[11],h=E[12],u=E[13],f=E[14],y=as(q,z),p=y*Cr,y&&(S=Math.cos(-y),L=Math.sin(-y),U=V*S+C*L,H=N*S+Z*L,k=q*S+z*L,C=V*-L+C*S,Z=N*-L+Z*S,z=q*-L+z*S,J=K*-L+J*S,V=U,N=H,q=k),y=as(-j,z),_=y*Cr,y&&(S=Math.cos(-y),L=Math.sin(-y),U=R*S-C*L,H=F*S-Z*L,k=j*S-z*L,J=I*L+J*S,R=U,F=H,j=k),y=as(F,R),d=y*Cr,y&&(S=Math.cos(y),L=Math.sin(y),U=R*S+F*L,H=V*S+N*L,F=F*S-R*L,N=N*S-V*L,R=U,V=H),p&&Math.abs(p)+Math.abs(d)>359.9&&(p=d=0,_=180-_),m=Se(Math.sqrt(R*R+F*F+j*j)),g=Se(Math.sqrt(N*N+q*q)),y=as(V,N),x=Math.abs(y)>2e-4?y*Cr:0,v=J?1/(J<0?-J:J):0),n.svg&&(U=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!im(yi(t,ve)),U&&t.setAttribute("transform",U))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(m*=-1,x+=d<=0?180:-180,d+=d<=0?180:-180):(g*=-1,x+=x<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-u)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=f+a,n.scaleX=Se(m),n.scaleY=Se(g),n.rotation=Se(d)+o,n.rotationX=Se(p)+o,n.rotationY=Se(_)+o,n.skewX=x+o,n.skewY=b+o,n.transformPerspective=v+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[gn]=cl(c)),n.xOffset=n.yOffset=0,n.force3D=Rn.force3D,n.renderTransform=n.svg?d0:Qp?rm:f0,n.uncache=0,n},cl=function(t){return(t=t.split(" "))[0]+" "+t[1]},Jl=function(t,e,n){var i=We(e);return Se(parseFloat(e)+parseFloat(xr(t,"x",n+"px",i)))+i},f0=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,rm(t,e)},Sr="0deg",lo="0px",wr=") ",rm=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,u=n.rotationX,f=n.skewX,m=n.skewY,g=n.scaleX,d=n.scaleY,p=n.transformPerspective,_=n.force3D,x=n.target,b=n.zOrigin,v="",M=_==="auto"&&t&&t!==1||_===!0;if(b&&(u!==Sr||h!==Sr)){var w=parseFloat(h)*zs,E=Math.sin(w),y=Math.cos(w),S;w=parseFloat(u)*zs,S=Math.cos(w),a=Jl(x,a,E*S*-b),o=Jl(x,o,-Math.sin(w)*-b),l=Jl(x,l,y*S*-b+b)}p!==lo&&(v+="perspective("+p+wr),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(M||a!==lo||o!==lo||l!==lo)&&(v+=l!==lo||M?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+wr),c!==Sr&&(v+="rotate("+c+wr),h!==Sr&&(v+="rotateY("+h+wr),u!==Sr&&(v+="rotateX("+u+wr),(f!==Sr||m!==Sr)&&(v+="skew("+f+", "+m+wr),(g!==1||d!==1)&&(v+="scale("+g+", "+d+wr),x.style[ve]=v||"translate(0, 0)"},d0=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,u=n.scaleX,f=n.scaleY,m=n.target,g=n.xOrigin,d=n.yOrigin,p=n.xOffset,_=n.yOffset,x=n.forceCSS,b=parseFloat(a),v=parseFloat(o),M,w,E,y,S;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=zs,c*=zs,M=Math.cos(l)*u,w=Math.sin(l)*u,E=Math.sin(l-c)*-f,y=Math.cos(l-c)*f,c&&(h*=zs,S=Math.tan(c-h),S=Math.sqrt(1+S*S),E*=S,y*=S,h&&(S=Math.tan(h),S=Math.sqrt(1+S*S),M*=S,w*=S)),M=Se(M),w=Se(w),E=Se(E),y=Se(y)):(M=u,y=f,w=E=0),(b&&!~(a+"").indexOf("px")||v&&!~(o+"").indexOf("px"))&&(b=xr(m,"x",a,"px"),v=xr(m,"y",o,"px")),(g||d||p||_)&&(b=Se(b+g-(g*M+d*E)+p),v=Se(v+d-(g*w+d*y)+_)),(i||s)&&(S=m.getBBox(),b=Se(b+i/100*S.width),v=Se(v+s/100*S.height)),S="matrix("+M+","+w+","+E+","+y+","+b+","+v+")",m.setAttribute("transform",S),x&&(m.style[ve]=S)},p0=function(t,e,n,i,s){var a=360,o=ze(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?Cr:1),c=l-i,h=i+c+"deg",u,f;return o&&(u=s.split("_")[1],u==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),u==="cw"&&c<0?c=(c+a*Hu)%a-~~(c/a)*a:u==="ccw"&&c>0&&(c=(c-a*Hu)%a-~~(c/a)*a)),t._pt=f=new mn(t._pt,e,n,i,c,K_),f.e=h,f.u="deg",t._props.push(n),f},ju=function(t,e){for(var n in e)t[n]=e[n];return t},m0=function(t,e,n){var i=ju({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,u,f,m,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[ve]=e,o=Go(n,1),Jr(n,ve),n.setAttribute("transform",c)):(c=getComputedStyle(n)[ve],a[ve]=e,o=Go(n,1),a[ve]=c);for(l in Xi)c=i[l],h=o[l],c!==h&&s.indexOf(l)<0&&(m=We(c),g=We(h),u=m!==g?xr(n,l,c,g):parseFloat(c),f=parseFloat(h),t._pt=new mn(t._pt,o,l,u,f-u,ih),t._pt.u=g||0,t._props.push(l));ju(o,i)};pn("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",a=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(o){return t<2?r+o:"border"+o+r});ll[t>1?"border"+r:r]=function(o,l,c,h,u){var f,m;if(arguments.length<4)return f=a.map(function(g){return Ui(o,g,c)}),m=f.join(" "),m.split(f[0]).length===5?f[0]:m;f=(h+"").split(" "),m={},a.forEach(function(g,d){return m[g]=f[d]=f[d]||f[(d-1)/2|0]}),o.init(l,m,u)}});var sm={name:"css",register:sh,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var a=this._props,o=t.style,l=n.vars.startAt,c,h,u,f,m,g,d,p,_,x,b,v,M,w,E,y;eu||sh(),this.styles=this.styles||Jp(t),y=this.styles.props,this.tween=n;for(d in e)if(d!=="autoRound"&&(h=e[d],!(En[d]&&Vp(d,e,n,i,t,s)))){if(m=typeof h,g=ll[d],m==="function"&&(h=h.call(n,i,t,s),m=typeof h),m==="string"&&~h.indexOf("random(")&&(h=ko(h)),g)g(this,t,d,h,n)&&(E=1);else if(d.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(d)+"").trim(),h+="",fr.lastIndex=0,fr.test(c)||(p=We(c),_=We(h)),_?p!==_&&(c=xr(t,d,c,_)+_):p&&(h+=p),this.add(o,"setProperty",c,h,i,s,0,0,d),a.push(d),y.push(d,0,o[d]);else if(m!=="undefined"){if(l&&d in l?(c=typeof l[d]=="function"?l[d].call(n,i,t,s):l[d],ze(c)&&~c.indexOf("random(")&&(c=ko(c)),We(c+"")||c==="auto"||(c+=Rn.units[d]||We(Ui(t,d))||""),(c+"").charAt(1)==="="&&(c=Ui(t,d))):c=Ui(t,d),f=parseFloat(c),x=m==="string"&&h.charAt(1)==="="&&h.substr(0,2),x&&(h=h.substr(2)),u=parseFloat(h),d in gi&&(d==="autoAlpha"&&(f===1&&Ui(t,"visibility")==="hidden"&&u&&(f=0),y.push("visibility",0,o.visibility),ar(this,o,"visibility",f?"inherit":"hidden",u?"inherit":"hidden",!u)),d!=="scale"&&d!=="transform"&&(d=gi[d],~d.indexOf(",")&&(d=d.split(",")[0]))),b=d in Xi,b){if(this.styles.save(d),v||(M=t._gsap,M.renderTransform&&!e.parseTransform||Go(t,e.parseTransform),w=e.smoothOrigin!==!1&&M.smooth,v=this._pt=new mn(this._pt,o,ve,0,1,M.renderTransform,M,0,-1),v.dep=1),d==="scale")this._pt=new mn(this._pt,M,"scaleY",M.scaleY,(x?Fs(M.scaleY,x+u):u)-M.scaleY||0,ih),this._pt.u=0,a.push("scaleY",d),d+="X";else if(d==="transformOrigin"){y.push(gn,0,o[gn]),h=h0(h),M.svg?oh(t,h,0,w,0,this):(_=parseFloat(h.split(" ")[2])||0,_!==M.zOrigin&&ar(this,M,"zOrigin",M.zOrigin,_),ar(this,o,d,cl(c),cl(h)));continue}else if(d==="svgOrigin"){oh(t,h,1,w,0,this);continue}else if(d in nm){p0(this,M,d,f,x?Fs(f,x+h):h);continue}else if(d==="smoothOrigin"){ar(this,M,"smooth",M.smooth,h);continue}else if(d==="force3D"){M[d]=h;continue}else if(d==="transform"){m0(this,h,t);continue}}else d in o||(d=Ys(d)||d);if(b||(u||u===0)&&(f||f===0)&&!Z_.test(h)&&d in o)p=(c+"").substr((f+"").length),u||(u=0),_=We(h)||(d in Rn.units?Rn.units[d]:p),p!==_&&(f=xr(t,d,c,_)),this._pt=new mn(this._pt,b?M:o,d,f,(x?Fs(f,x+u):u)-f,!b&&(_==="px"||d==="zIndex")&&e.autoRound!==!1?Q_:ih),this._pt.u=_||0,p!==_&&_!=="%"&&(this._pt.b=c,this._pt.r=J_);else if(d in o)c0.call(this,t,d,c,x?x+h:h);else if(d in t)this.add(t,d,c||t[d],x?x+h:h,i,s);else if(d!=="parseTransform"){Xh(d,h);continue}b||(d in o?y.push(d,0,o[d]):y.push(d,1,c||t[d])),a.push(d)}}E&&qp(this)},render:function(t,e){if(e.tween._time||!nu())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Ui,aliases:gi,getSetter:function(t,e,n){var i=gi[e];return i&&i.indexOf(",")<0&&(e=i),e in Xi&&e!==gn&&(t._gsap.x||Ui(t,"x"))?n&&Gu===n?e==="scale"?i0:n0:(Gu=n||{})&&(e==="scale"?r0:s0):t.style&&!Hh(t.style[e])?t0:~e.indexOf("-")?e0:Qh(t,e)},core:{_removeProperty:Jr,_getMatrix:ru}};vn.utils.checkPrefix=Ys;vn.core.getStyleSaver=Jp;(function(r,t,e,n){var i=pn(r+","+t+","+e,function(s){Xi[s]=1});pn(t,function(s){Rn.units[s]="deg",nm[s]=1}),gi[i[13]]=r+","+t,pn(n,function(s){var a=s.split(":");gi[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");pn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Rn.units[r]="px"});vn.registerPlugin(sm);var g0=vn.registerPlugin(sm)||vn;g0.core.Tween;function _0(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function v0(r,t,e){return t&&_0(r.prototype,t),r}/*!
 * Observer 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var ke,$a,Cn,lr,cr,Ns,om,Lr,Ao,am,Gi,ti,lm,cm=function(){return ke||typeof window<"u"&&(ke=window.gsap)&&ke.registerPlugin&&ke},hm=1,Ps=[],Qt=[],Mi=[],Co=Date.now,ah=function(t,e){return e},x0=function(){var t=Ao.core,e=t.bridge||{},n=t._scrollers,i=t._proxies;n.push.apply(n,Qt),i.push.apply(i,Mi),Qt=n,Mi=i,ah=function(a,o){return e[a](o)}},dr=function(t,e){return~Mi.indexOf(t)&&Mi[Mi.indexOf(t)+1][e]},Lo=function(t){return!!~am.indexOf(t)},je=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:i!==!1,capture:!!s})},Ye=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},oa="scrollLeft",aa="scrollTop",lh=function(){return Gi&&Gi.isPressed||Qt.cache++},hl=function(t,e){var n=function i(s){if(s||s===0){hm&&(Cn.history.scrollRestoration="manual");var a=Gi&&Gi.isPressed;s=i.v=Math.round(s)||(Gi&&Gi.iOS?1:0),t(s),i.cacheID=Qt.cache,a&&ah("ss",s)}else(e||Qt.cache!==i.cacheID||ah("ref"))&&(i.cacheID=Qt.cache,i.v=t());return i.v+i.offset};return n.offset=0,t&&n},en={s:oa,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:hl(function(r){return arguments.length?Cn.scrollTo(r,De.sc()):Cn.pageXOffset||lr[oa]||cr[oa]||Ns[oa]||0})},De={s:aa,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:en,sc:hl(function(r){return arguments.length?Cn.scrollTo(en.sc(),r):Cn.pageYOffset||lr[aa]||cr[aa]||Ns[aa]||0})},hn=function(t,e){return(e&&e._ctx&&e._ctx.selector||ke.utils.toArray)(t)[0]||(typeof t=="string"&&ke.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},yr=function(t,e){var n=e.s,i=e.sc;Lo(t)&&(t=lr.scrollingElement||cr);var s=Qt.indexOf(t),a=i===De.sc?1:2;!~s&&(s=Qt.push(t)-1),Qt[s+a]||je(t,"scroll",lh);var o=Qt[s+a],l=o||(Qt[s+a]=hl(dr(t,n),!0)||(Lo(t)?i:hl(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,o||(l.smooth=ke.getProperty(t,"scrollBehavior")==="smooth"),l},ch=function(t,e,n){var i=t,s=t,a=Co(),o=a,l=e||50,c=Math.max(500,l*3),h=function(g,d){var p=Co();d||p-a>l?(s=i,i=g,o=a,a=p):n?i+=g:i=s+(g-s)/(p-o)*(a-o)},u=function(){s=i=n?0:i,o=a=0},f=function(g){var d=o,p=s,_=Co();return(g||g===0)&&g!==i&&h(g),a===o||_-o>c?0:(i+(n?p:-p))/((n?_:a)-d)*1e3};return{update:h,reset:u,getVelocity:f}},co=function(t,e){return e&&!t._gsapAllow&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},Zu=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},um=function(){Ao=ke.core.globals().ScrollTrigger,Ao&&Ao.core&&x0()},fm=function(t){return ke=t||cm(),!$a&&ke&&typeof document<"u"&&document.body&&(Cn=window,lr=document,cr=lr.documentElement,Ns=lr.body,am=[Cn,lr,cr,Ns],ke.utils.clamp,lm=ke.core.context||function(){},Lr="onpointerenter"in Ns?"pointer":"mouse",om=we.isTouch=Cn.matchMedia&&Cn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Cn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,ti=we.eventTypes=("ontouchstart"in cr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in cr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return hm=0},500),um(),$a=1),$a};en.op=De;Qt.cache=0;var we=function(){function r(e){this.init(e)}var t=r.prototype;return t.init=function(n){$a||fm(ke)||console.warn("Please gsap.registerPlugin(Observer)"),Ao||um();var i=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,h=n.preventDefault,u=n.onStop,f=n.onStopDelay,m=n.ignore,g=n.wheelSpeed,d=n.event,p=n.onDragStart,_=n.onDragEnd,x=n.onDrag,b=n.onPress,v=n.onRelease,M=n.onRight,w=n.onLeft,E=n.onUp,y=n.onDown,S=n.onChangeX,L=n.onChangeY,R=n.onChange,F=n.onToggleX,j=n.onToggleY,I=n.onHover,V=n.onHoverEnd,N=n.onMove,U=n.ignoreCheck,H=n.isNormalizer,k=n.onGestureStart,C=n.onGestureEnd,Z=n.onWheel,z=n.onEnable,K=n.onDisable,J=n.onClick,q=n.scrollSpeed,B=n.capture,at=n.allowClicks,rt=n.lockAxis,ct=n.onLockAxis;this.target=o=hn(o)||cr,this.vars=n,m&&(m=ke.utils.toArray(m)),i=i||1e-9,s=s||0,g=g||1,q=q||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Cn.getComputedStyle(Ns).lineHeight)||22);var ot,yt,xt,ut,gt,It,Gt,X=this,Ot=0,At=0,Xt=n.passive||!h,Pt=yr(o,en),P=yr(o,De),T=Pt(),Q=P(),it=~a.indexOf("touch")&&!~a.indexOf("pointer")&&ti[0]==="pointerdown",ft=Lo(o),ht=o.ownerDocument||lr,Et=[0,0,0],D=[0,0,0],nt=0,pt=function(){return nt=Co()},st=function(Dt,Zt){return(X.event=Dt)&&m&&~m.indexOf(Dt.target)||Zt&&it&&Dt.pointerType!=="touch"||U&&U(Dt,Zt)},O=function(){X._vx.reset(),X._vy.reset(),yt.pause(),u&&u(X)},dt=function(){var Dt=X.deltaX=Zu(Et),Zt=X.deltaY=Zu(D),_t=Math.abs(Dt)>=i,Wt=Math.abs(Zt)>=i;R&&(_t||Wt)&&R(X,Dt,Zt,Et,D),_t&&(M&&X.deltaX>0&&M(X),w&&X.deltaX<0&&w(X),S&&S(X),F&&X.deltaX<0!=Ot<0&&F(X),Ot=X.deltaX,Et[0]=Et[1]=Et[2]=0),Wt&&(y&&X.deltaY>0&&y(X),E&&X.deltaY<0&&E(X),L&&L(X),j&&X.deltaY<0!=At<0&&j(X),At=X.deltaY,D[0]=D[1]=D[2]=0),(ut||xt)&&(N&&N(X),xt&&(x(X),xt=!1),ut=!1),It&&!(It=!1)&&ct&&ct(X),gt&&(Z(X),gt=!1),ot=0},lt=function(Dt,Zt,_t){Et[_t]+=Dt,D[_t]+=Zt,X._vx.update(Dt),X._vy.update(Zt),c?ot||(ot=requestAnimationFrame(dt)):dt()},Ct=function(Dt,Zt){rt&&!Gt&&(X.axis=Gt=Math.abs(Dt)>Math.abs(Zt)?"x":"y",It=!0),Gt!=="y"&&(Et[2]+=Dt,X._vx.update(Dt,!0)),Gt!=="x"&&(D[2]+=Zt,X._vy.update(Zt,!0)),c?ot||(ot=requestAnimationFrame(dt)):dt()},mt=function(Dt){if(!st(Dt,1)){Dt=co(Dt,h);var Zt=Dt.clientX,_t=Dt.clientY,Wt=Zt-X.x,Rt=_t-X.y,A=X.isDragging;X.x=Zt,X.y=_t,(A||Math.abs(X.startX-Zt)>=s||Math.abs(X.startY-_t)>=s)&&(x&&(xt=!0),A||(X.isDragging=!0),Ct(Wt,Rt),A||p&&p(X))}},bt=X.onPress=function(Nt){st(Nt,1)||Nt&&Nt.button||(X.axis=Gt=null,yt.pause(),X.isPressed=!0,Nt=co(Nt),Ot=At=0,X.startX=X.x=Nt.clientX,X.startY=X.y=Nt.clientY,X._vx.reset(),X._vy.reset(),je(H?o:ht,ti[1],mt,Xt,!0),X.deltaX=X.deltaY=0,b&&b(X))},tt=X.onRelease=function(Nt){if(!st(Nt,1)){Ye(H?o:ht,ti[1],mt,!0);var Dt=!isNaN(X.y-X.startY),Zt=X.isDragging,_t=Zt&&(Math.abs(X.x-X.startX)>3||Math.abs(X.y-X.startY)>3),Wt=co(Nt);!_t&&Dt&&(X._vx.reset(),X._vy.reset(),h&&at&&ke.delayedCall(.08,function(){if(Co()-nt>300&&!Nt.defaultPrevented){if(Nt.target.click)Nt.target.click();else if(ht.createEvent){var Rt=ht.createEvent("MouseEvents");Rt.initMouseEvent("click",!0,!0,Cn,1,Wt.screenX,Wt.screenY,Wt.clientX,Wt.clientY,!1,!1,!1,!1,0,null),Nt.target.dispatchEvent(Rt)}}})),X.isDragging=X.isGesturing=X.isPressed=!1,u&&Zt&&!H&&yt.restart(!0),_&&Zt&&_(X),v&&v(X,_t)}},Lt=function(Dt){return Dt.touches&&Dt.touches.length>1&&(X.isGesturing=!0)&&k(Dt,X.isDragging)},Ut=function(){return(X.isGesturing=!1)||C(X)},Ht=function(Dt){if(!st(Dt)){var Zt=Pt(),_t=P();lt((Zt-T)*q,(_t-Q)*q,1),T=Zt,Q=_t,u&&yt.restart(!0)}},se=function(Dt){if(!st(Dt)){Dt=co(Dt,h),Z&&(gt=!0);var Zt=(Dt.deltaMode===1?l:Dt.deltaMode===2?Cn.innerHeight:1)*g;lt(Dt.deltaX*Zt,Dt.deltaY*Zt,0),u&&!H&&yt.restart(!0)}},Me=function(Dt){if(!st(Dt)){var Zt=Dt.clientX,_t=Dt.clientY,Wt=Zt-X.x,Rt=_t-X.y;X.x=Zt,X.y=_t,ut=!0,u&&yt.restart(!0),(Wt||Rt)&&Ct(Wt,Rt)}},qn=function(Dt){X.event=Dt,I(X)},xn=function(Dt){X.event=Dt,V(X)},yn=function(Dt){return st(Dt)||co(Dt,h)&&J(X)};yt=X._dc=ke.delayedCall(f||.25,O).pause(),X.deltaX=X.deltaY=0,X._vx=ch(0,50,!0),X._vy=ch(0,50,!0),X.scrollX=Pt,X.scrollY=P,X.isDragging=X.isGesturing=X.isPressed=!1,lm(this),X.enable=function(Nt){return X.isEnabled||(je(ft?ht:o,"scroll",lh),a.indexOf("scroll")>=0&&je(ft?ht:o,"scroll",Ht,Xt,B),a.indexOf("wheel")>=0&&je(o,"wheel",se,Xt,B),(a.indexOf("touch")>=0&&om||a.indexOf("pointer")>=0)&&(je(o,ti[0],bt,Xt,B),je(ht,ti[2],tt),je(ht,ti[3],tt),at&&je(o,"click",pt,!0,!0),J&&je(o,"click",yn),k&&je(ht,"gesturestart",Lt),C&&je(ht,"gestureend",Ut),I&&je(o,Lr+"enter",qn),V&&je(o,Lr+"leave",xn),N&&je(o,Lr+"move",Me)),X.isEnabled=!0,Nt&&Nt.type&&bt(Nt),z&&z(X)),X},X.disable=function(){X.isEnabled&&(Ps.filter(function(Nt){return Nt!==X&&Lo(Nt.target)}).length||Ye(ft?ht:o,"scroll",lh),X.isPressed&&(X._vx.reset(),X._vy.reset(),Ye(H?o:ht,ti[1],mt,!0)),Ye(ft?ht:o,"scroll",Ht,B),Ye(o,"wheel",se,B),Ye(o,ti[0],bt,B),Ye(ht,ti[2],tt),Ye(ht,ti[3],tt),Ye(o,"click",pt,!0),Ye(o,"click",yn),Ye(ht,"gesturestart",Lt),Ye(ht,"gestureend",Ut),Ye(o,Lr+"enter",qn),Ye(o,Lr+"leave",xn),Ye(o,Lr+"move",Me),X.isEnabled=X.isPressed=X.isDragging=!1,K&&K(X))},X.kill=X.revert=function(){X.disable();var Nt=Ps.indexOf(X);Nt>=0&&Ps.splice(Nt,1),Gi===X&&(Gi=0)},Ps.push(X),H&&Lo(o)&&(Gi=X),X.enable(d)},v0(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();we.version="3.12.5";we.create=function(r){return new we(r)};we.register=fm;we.getAll=function(){return Ps.slice()};we.getById=function(r){return Ps.filter(function(t){return t.vars.id===r})[0]};cm()&&ke.registerPlugin(we);/*!
 * ScrollTrigger 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Tt,Es,te,me,ei,ue,dm,ul,Ho,Do,_o,la,Ve,Cl,hh,Ke,Ku,Ju,As,pm,Ql,mm,Ze,uh,gm,_m,ir,fh,su,ks,ou,fl,dh,tc,ca=1,He=Date.now,ec=He(),$n=0,vo=0,Qu=function(t,e,n){var i=wn(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=i,i?t.substr(6,t.length-7):t},tf=function(t,e){return e&&(!wn(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},y0=function r(){return vo&&requestAnimationFrame(r)},ef=function(){return Cl=1},nf=function(){return Cl=0},di=function(t){return t},xo=function(t){return Math.round(t*1e5)/1e5||0},vm=function(){return typeof window<"u"},xm=function(){return Tt||vm()&&(Tt=window.gsap)&&Tt.registerPlugin&&Tt},Qr=function(t){return!!~dm.indexOf(t)},ym=function(t){return(t==="Height"?ou:te["inner"+t])||ei["client"+t]||ue["client"+t]},Mm=function(t){return dr(t,"getBoundingClientRect")||(Qr(t)?function(){return Za.width=te.innerWidth,Za.height=ou,Za}:function(){return Bi(t)})},M0=function(t,e,n){var i=n.d,s=n.d2,a=n.a;return(a=dr(t,"getBoundingClientRect"))?function(){return a()[i]}:function(){return(e?ym(s):t["client"+s])||0}},b0=function(t,e){return!e||~Mi.indexOf(t)?Mm(t):function(){return Za}},_i=function(t,e){var n=e.s,i=e.d2,s=e.d,a=e.a;return Math.max(0,(n="scroll"+i)&&(a=dr(t,n))?a()-Mm(t)()[s]:Qr(t)?(ei[n]||ue[n])-ym(i):t[n]-t["offset"+i])},ha=function(t,e){for(var n=0;n<As.length;n+=3)(!e||~e.indexOf(As[n+1]))&&t(As[n],As[n+1],As[n+2])},wn=function(t){return typeof t=="string"},nn=function(t){return typeof t=="function"},yo=function(t){return typeof t=="number"},Dr=function(t){return typeof t=="object"},ho=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},nc=function(t,e){if(t.enabled){var n=t._ctx?t._ctx.add(function(){return e(t)}):e(t);n&&n.totalTime&&(t.callbackAnimation=n)}},ls=Math.abs,bm="left",Sm="top",au="right",lu="bottom",$r="width",Xr="height",Po="Right",Ro="Left",Io="Top",Fo="Bottom",Ee="padding",Un="margin",js="Width",cu="Height",Le="px",Bn=function(t){return te.getComputedStyle(t)},S0=function(t){var e=Bn(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},rf=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Bi=function(t,e){var n=e&&Bn(t)[hh]!=="matrix(1, 0, 0, 1, 0, 0)"&&Tt.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect();return n&&n.progress(0).kill(),i},dl=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},wm=function(t){var e=[],n=t.labels,i=t.duration(),s;for(s in n)e.push(n[s]/i);return e},w0=function(t){return function(e){return Tt.utils.snap(wm(t),e)}},hu=function(t){var e=Tt.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(i,s){return i-s});return n?function(i,s,a){a===void 0&&(a=.001);var o;if(!s)return e(i);if(s>0){for(i-=a,o=0;o<n.length;o++)if(n[o]>=i)return n[o];return n[o-1]}else for(o=n.length,i+=a;o--;)if(n[o]<=i)return n[o];return n[0]}:function(i,s,a){a===void 0&&(a=.001);var o=e(i);return!s||Math.abs(o-i)<a||o-i<0==s<0?o:e(s<0?i-t:i+t)}},T0=function(t){return function(e,n){return hu(wm(t))(e,n.direction)}},ua=function(t,e,n,i){return n.split(",").forEach(function(s){return t(e,s,i)})},Fe=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:!i,capture:!!s})},Ie=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},fa=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},sf={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},da={toggleActions:"play",anticipatePin:0},pl={top:0,left:0,center:.5,bottom:1,right:1},Xa=function(t,e){if(wn(t)){var n=t.indexOf("="),i=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(i*=e/100),t=t.substr(0,n-1)),t=i+(t in pl?pl[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},pa=function(t,e,n,i,s,a,o,l){var c=s.startColor,h=s.endColor,u=s.fontSize,f=s.indent,m=s.fontWeight,g=me.createElement("div"),d=Qr(n)||dr(n,"pinType")==="fixed",p=t.indexOf("scroller")!==-1,_=d?ue:n,x=t.indexOf("start")!==-1,b=x?c:h,v="border-color:"+b+";font-size:"+u+";color:"+b+";font-weight:"+m+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((p||l)&&d?"fixed;":"absolute;"),(p||l||!d)&&(v+=(i===De?au:lu)+":"+(a+parseFloat(f))+"px;"),o&&(v+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),g._isStart=x,g.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),g.style.cssText=v,g.innerText=e||e===0?t+"-"+e:t,_.children[0]?_.insertBefore(g,_.children[0]):_.appendChild(g),g._offset=g["offset"+i.op.d2],qa(g,0,i,x),g},qa=function(t,e,n,i){var s={display:"block"},a=n[i?"os2":"p2"],o=n[i?"p2":"os2"];t._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+a+js]=1,s["border"+o+js]=0,s[n.p]=e+"px",Tt.set(t,s)},Kt=[],ph={},Wo,of=function(){return He()-$n>34&&(Wo||(Wo=requestAnimationFrame(Hi)))},cs=function(){(!Ze||!Ze.isPressed||Ze.startX>ue.clientWidth)&&(Qt.cache++,Ze?Wo||(Wo=requestAnimationFrame(Hi)):Hi(),$n||es("scrollStart"),$n=He())},ic=function(){_m=te.innerWidth,gm=te.innerHeight},Mo=function(){Qt.cache++,!Ve&&!mm&&!me.fullscreenElement&&!me.webkitFullscreenElement&&(!uh||_m!==te.innerWidth||Math.abs(te.innerHeight-gm)>te.innerHeight*.25)&&ul.restart(!0)},ts={},E0=[],Tm=function r(){return Ie(ne,"scrollEnd",r)||Or(!0)},es=function(t){return ts[t]&&ts[t].map(function(e){return e()})||E0},Sn=[],Em=function(t){for(var e=0;e<Sn.length;e+=5)(!t||Sn[e+4]&&Sn[e+4].query===t)&&(Sn[e].style.cssText=Sn[e+1],Sn[e].getBBox&&Sn[e].setAttribute("transform",Sn[e+2]||""),Sn[e+3].uncache=1)},uu=function(t,e){var n;for(Ke=0;Ke<Kt.length;Ke++)n=Kt[Ke],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));fl=!0,e&&Em(e),e||es("revert")},Am=function(t,e){Qt.cache++,(e||!Je)&&Qt.forEach(function(n){return nn(n)&&n.cacheID++&&(n.rec=0)}),wn(t)&&(te.history.scrollRestoration=su=t)},Je,qr=0,af,A0=function(){if(af!==qr){var t=af=qr;requestAnimationFrame(function(){return t===qr&&Or(!0)})}},Cm=function(){ue.appendChild(ks),ou=!Ze&&ks.offsetHeight||te.innerHeight,ue.removeChild(ks)},lf=function(t){return Ho(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},Or=function(t,e){if($n&&!t&&!fl){Fe(ne,"scrollEnd",Tm);return}Cm(),Je=ne.isRefreshing=!0,Qt.forEach(function(i){return nn(i)&&++i.cacheID&&(i.rec=i())});var n=es("refreshInit");pm&&ne.sort(),e||uu(),Qt.forEach(function(i){nn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),Kt.slice(0).forEach(function(i){return i.refresh()}),fl=!1,Kt.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",a=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-a),i.refresh()}}),dh=1,lf(!0),Kt.forEach(function(i){var s=_i(i.scroller,i._dir),a=i.vars.end==="max"||i._endClamp&&i.end>s,o=i._startClamp&&i.start>=s;(a||o)&&i.setPositions(o?s-1:i.start,a?Math.max(o?s:i.start+1,s):i.end,!0)}),lf(!1),dh=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),Qt.forEach(function(i){nn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),Am(su,1),ul.pause(),qr++,Je=2,Hi(2),Kt.forEach(function(i){return nn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Je=ne.isRefreshing=!1,es("refresh")},mh=0,Ya=1,Oo,Hi=function(t){if(t===2||!Je&&!fl){ne.isUpdating=!0,Oo&&Oo.update(0);var e=Kt.length,n=He(),i=n-ec>=50,s=e&&Kt[0].scroll();if(Ya=mh>s?-1:1,Je||(mh=s),i&&($n&&!Cl&&n-$n>200&&($n=0,es("scrollEnd")),_o=ec,ec=n),Ya<0){for(Ke=e;Ke-- >0;)Kt[Ke]&&Kt[Ke].update(0,i);Ya=1}else for(Ke=0;Ke<e;Ke++)Kt[Ke]&&Kt[Ke].update(0,i);ne.isUpdating=!1}Wo=0},gh=[bm,Sm,lu,au,Un+Fo,Un+Po,Un+Io,Un+Ro,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],ja=gh.concat([$r,Xr,"boxSizing","max"+js,"max"+cu,"position",Un,Ee,Ee+Io,Ee+Po,Ee+Fo,Ee+Ro]),C0=function(t,e,n){Us(n);var i=t._gsap;if(i.spacerIsNative)Us(i.spacerState);else if(t._gsap.swappedIn){var s=e.parentNode;s&&(s.insertBefore(t,e),s.removeChild(e))}t._gsap.swappedIn=!1},rc=function(t,e,n,i){if(!t._gsap.swappedIn){for(var s=gh.length,a=e.style,o=t.style,l;s--;)l=gh[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[lu]=o[au]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[$r]=dl(t,en)+Le,a[Xr]=dl(t,De)+Le,a[Ee]=o[Un]=o[Sm]=o[bm]="0",Us(i),o[$r]=o["max"+js]=n[$r],o[Xr]=o["max"+cu]=n[Xr],o[Ee]=n[Ee],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},L0=/([A-Z])/g,Us=function(t){if(t){var e=t.t.style,n=t.length,i=0,s,a;for((t.t._gsap||Tt.core.getCache(t.t)).uncache=1;i<n;i+=2)a=t[i+1],s=t[i],a?e[s]=a:e[s]&&e.removeProperty(s.replace(L0,"-$1").toLowerCase())}},ma=function(t){for(var e=ja.length,n=t.style,i=[],s=0;s<e;s++)i.push(ja[s],n[ja[s]]);return i.t=t,i},D0=function(t,e,n){for(var i=[],s=t.length,a=n?8:0,o;a<s;a+=2)o=t[a],i.push(o,o in e?e[o]:t[a+1]);return i.t=t.t,i},Za={left:0,top:0},cf=function(t,e,n,i,s,a,o,l,c,h,u,f,m,g){nn(t)&&(t=t(l)),wn(t)&&t.substr(0,3)==="max"&&(t=f+(t.charAt(4)==="="?Xa("0"+t.substr(3),n):0));var d=m?m.time():0,p,_,x;if(m&&m.seek(0),isNaN(t)||(t=+t),yo(t))m&&(t=Tt.utils.mapRange(m.scrollTrigger.start,m.scrollTrigger.end,0,f,t)),o&&qa(o,n,i,!0);else{nn(e)&&(e=e(l));var b=(t||"0").split(" "),v,M,w,E;x=hn(e,l)||ue,v=Bi(x)||{},(!v||!v.left&&!v.top)&&Bn(x).display==="none"&&(E=x.style.display,x.style.display="block",v=Bi(x),E?x.style.display=E:x.style.removeProperty("display")),M=Xa(b[0],v[i.d]),w=Xa(b[1]||"0",n),t=v[i.p]-c[i.p]-h+M+s-w,o&&qa(o,w,i,n-w<20||o._isStart&&w>20),n-=n-w}if(g&&(l[g]=t||-.001,t<0&&(t=0)),a){var y=t+n,S=a._isStart;p="scroll"+i.d2,qa(a,y,i,S&&y>20||!S&&(u?Math.max(ue[p],ei[p]):a.parentNode[p])<=y+1),u&&(c=Bi(o),u&&(a.style[i.op.p]=c[i.op.p]-i.op.m-a._offset+Le))}return m&&x&&(p=Bi(x),m.seek(f),_=Bi(x),m._caScrollDist=p[i.p]-_[i.p],t=t/m._caScrollDist*f),m&&m.seek(d),m?t:Math.round(t)},P0=/(webkit|moz|length|cssText|inset)/i,hf=function(t,e,n,i){if(t.parentNode!==e){var s=t.style,a,o;if(e===ue){t._stOrig=s.cssText,o=Bn(t);for(a in o)!+a&&!P0.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=i}else s.cssText=t._stOrig;Tt.core.getCache(t).uncache=1,e.appendChild(t)}},Lm=function(t,e,n){var i=e,s=i;return function(a){var o=Math.round(t());return o!==i&&o!==s&&Math.abs(o-i)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=i,i=a,a}},ga=function(t,e,n){var i={};i[e.p]="+="+n,Tt.set(t,i)},uf=function(t,e){var n=yr(t,e),i="_scroll"+e.p2,s=function a(o,l,c,h,u){var f=a.tween,m=l.onComplete,g={};c=c||n();var d=Lm(n,c,function(){f.kill(),a.tween=0});return u=h&&u||0,h=h||o-c,f&&f.kill(),l[i]=o,l.inherit=!1,l.modifiers=g,g[i]=function(){return d(c+h*f.ratio+u*f.ratio*f.ratio)},l.onUpdate=function(){Qt.cache++,a.tween&&Hi()},l.onComplete=function(){a.tween=0,m&&m.call(f)},f=a.tween=Tt.to(t,l),f};return t[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Fe(t,"wheel",n.wheelHandler),ne.isTouch&&Fe(t,"touchmove",n.wheelHandler),s},ne=function(){function r(e,n){Es||r.register(Tt)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),fh(this),this.init(e,n)}var t=r.prototype;return t.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!vo){this.update=this.refresh=this.kill=di;return}n=rf(wn(n)||yo(n)||n.nodeType?{trigger:n}:n,da);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,h=s.onRefresh,u=s.scrub,f=s.trigger,m=s.pin,g=s.pinSpacing,d=s.invalidateOnRefresh,p=s.anticipatePin,_=s.onScrubComplete,x=s.onSnapComplete,b=s.once,v=s.snap,M=s.pinReparent,w=s.pinSpacer,E=s.containerAnimation,y=s.fastScrollEnd,S=s.preventOverlaps,L=n.horizontal||n.containerAnimation&&n.horizontal!==!1?en:De,R=!u&&u!==0,F=hn(n.scroller||te),j=Tt.core.getCache(F),I=Qr(F),V=("pinType"in n?n.pinType:dr(F,"pinType")||I&&"fixed")==="fixed",N=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],U=R&&n.toggleActions.split(" "),H="markers"in n?n.markers:da.markers,k=I?0:parseFloat(Bn(F)["border"+L.p2+js])||0,C=this,Z=n.onRefreshInit&&function(){return n.onRefreshInit(C)},z=M0(F,I,L),K=b0(F,I),J=0,q=0,B=0,at=yr(F,L),rt,ct,ot,yt,xt,ut,gt,It,Gt,X,Ot,At,Xt,Pt,P,T,Q,it,ft,ht,Et,D,nt,pt,st,O,dt,lt,Ct,mt,bt,tt,Lt,Ut,Ht,se,Me,qn,xn;if(C._startClamp=C._endClamp=!1,C._dir=L,p*=45,C.scroller=F,C.scroll=E?E.time.bind(E):at,yt=at(),C.vars=n,i=i||n.animation,"refreshPriority"in n&&(pm=1,n.refreshPriority===-9999&&(Oo=C)),j.tweenScroll=j.tweenScroll||{top:uf(F,De),left:uf(F,en)},C.tweenTo=rt=j.tweenScroll[L.p],C.scrubDuration=function(_t){Lt=yo(_t)&&_t,Lt?tt?tt.duration(_t):tt=Tt.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Lt,paused:!0,onComplete:function(){return _&&_(C)}}):(tt&&tt.progress(1).kill(),tt=0)},i&&(i.vars.lazy=!1,i._initted&&!C.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),C.animation=i.pause(),i.scrollTrigger=C,C.scrubDuration(u),mt=0,l||(l=i.vars.id)),v&&((!Dr(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in ue.style&&Tt.set(I?[ue,ei]:F,{scrollBehavior:"auto"}),Qt.forEach(function(_t){return nn(_t)&&_t.target===(I?me.scrollingElement||ei:F)&&(_t.smooth=!1)}),ot=nn(v.snapTo)?v.snapTo:v.snapTo==="labels"?w0(i):v.snapTo==="labelsDirectional"?T0(i):v.directional!==!1?function(_t,Wt){return hu(v.snapTo)(_t,He()-q<500?0:Wt.direction)}:Tt.utils.snap(v.snapTo),Ut=v.duration||{min:.1,max:2},Ut=Dr(Ut)?Do(Ut.min,Ut.max):Do(Ut,Ut),Ht=Tt.delayedCall(v.delay||Lt/2||.1,function(){var _t=at(),Wt=He()-q<500,Rt=rt.tween;if((Wt||Math.abs(C.getVelocity())<10)&&!Rt&&!Cl&&J!==_t){var A=(_t-ut)/Pt,W=i&&!R?i.totalProgress():A,$=Wt?0:(W-bt)/(He()-_o)*1e3||0,Y=Tt.utils.clamp(-A,1-A,ls($/2)*$/.185),et=A+(v.inertia===!1?0:Y),Mt,St,wt=v,zt=wt.onStart,Ft=wt.onInterrupt,Bt=wt.onComplete;if(Mt=ot(et,C),yo(Mt)||(Mt=et),St=Math.round(ut+Mt*Pt),_t<=gt&&_t>=ut&&St!==_t){if(Rt&&!Rt._initted&&Rt.data<=ls(St-_t))return;v.inertia===!1&&(Y=Mt-A),rt(St,{duration:Ut(ls(Math.max(ls(et-W),ls(Mt-W))*.185/$/.05||0)),ease:v.ease||"power3",data:ls(St-_t),onInterrupt:function(){return Ht.restart(!0)&&Ft&&Ft(C)},onComplete:function(){C.update(),J=at(),i&&(tt?tt.resetTo("totalProgress",Mt,i._tTime/i._tDur):i.progress(Mt)),mt=bt=i&&!R?i.totalProgress():C.progress,x&&x(C),Bt&&Bt(C)}},_t,Y*Pt,St-_t-Y*Pt),zt&&zt(C,rt.tween)}}else C.isActive&&J!==_t&&Ht.restart(!0)}).pause()),l&&(ph[l]=C),f=C.trigger=hn(f||m!==!0&&m),xn=f&&f._gsap&&f._gsap.stRevert,xn&&(xn=xn(C)),m=m===!0?f:hn(m),wn(o)&&(o={targets:f,className:o}),m&&(g===!1||g===Un||(g=!g&&m.parentNode&&m.parentNode.style&&Bn(m.parentNode).display==="flex"?!1:Ee),C.pin=m,ct=Tt.core.getCache(m),ct.spacer?P=ct.pinState:(w&&(w=hn(w),w&&!w.nodeType&&(w=w.current||w.nativeElement),ct.spacerIsNative=!!w,w&&(ct.spacerState=ma(w))),ct.spacer=it=w||me.createElement("div"),it.classList.add("pin-spacer"),l&&it.classList.add("pin-spacer-"+l),ct.pinState=P=ma(m)),n.force3D!==!1&&Tt.set(m,{force3D:!0}),C.spacer=it=ct.spacer,Ct=Bn(m),pt=Ct[g+L.os2],ht=Tt.getProperty(m),Et=Tt.quickSetter(m,L.a,Le),rc(m,it,Ct),Q=ma(m)),H){At=Dr(H)?rf(H,sf):sf,X=pa("scroller-start",l,F,L,At,0),Ot=pa("scroller-end",l,F,L,At,0,X),ft=X["offset"+L.op.d2];var yn=hn(dr(F,"content")||F);It=this.markerStart=pa("start",l,yn,L,At,ft,0,E),Gt=this.markerEnd=pa("end",l,yn,L,At,ft,0,E),E&&(qn=Tt.quickSetter([It,Gt],L.a,Le)),!V&&!(Mi.length&&dr(F,"fixedMarkers")===!0)&&(S0(I?ue:F),Tt.set([X,Ot],{force3D:!0}),O=Tt.quickSetter(X,L.a,Le),lt=Tt.quickSetter(Ot,L.a,Le))}if(E){var Nt=E.vars.onUpdate,Dt=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){C.update(0,0,1),Nt&&Nt.apply(E,Dt||[])})}if(C.previous=function(){return Kt[Kt.indexOf(C)-1]},C.next=function(){return Kt[Kt.indexOf(C)+1]},C.revert=function(_t,Wt){if(!Wt)return C.kill(!0);var Rt=_t!==!1||!C.enabled,A=Ve;Rt!==C.isReverted&&(Rt&&(se=Math.max(at(),C.scroll.rec||0),B=C.progress,Me=i&&i.progress()),It&&[It,Gt,X,Ot].forEach(function(W){return W.style.display=Rt?"none":"block"}),Rt&&(Ve=C,C.update(Rt)),m&&(!M||!C.isActive)&&(Rt?C0(m,it,P):rc(m,it,Bn(m),st)),Rt||C.update(Rt),Ve=A,C.isReverted=Rt)},C.refresh=function(_t,Wt,Rt,A){if(!((Ve||!C.enabled)&&!Wt)){if(m&&_t&&$n){Fe(r,"scrollEnd",Tm);return}!Je&&Z&&Z(C),Ve=C,rt.tween&&!Rt&&(rt.tween.kill(),rt.tween=0),tt&&tt.pause(),d&&i&&i.revert({kill:!1}).invalidate(),C.isReverted||C.revert(!0,!0),C._subPinOffset=!1;var W=z(),$=K(),Y=E?E.duration():_i(F,L),et=Pt<=.01,Mt=0,St=A||0,wt=Dr(Rt)?Rt.end:n.end,zt=n.endTrigger||f,Ft=Dr(Rt)?Rt.start:n.start||(n.start===0||!f?0:m?"0 0":"0 100%"),Bt=C.pinnedContainer=n.pinnedContainer&&hn(n.pinnedContainer,C),qt=f&&Math.max(0,Kt.indexOf(C))||0,jt=qt,he,pe,an,qe,Vt,le,re,ln,Yn,jn,cn,be,ai;for(H&&Dr(Rt)&&(be=Tt.getProperty(X,L.p),ai=Tt.getProperty(Ot,L.p));jt--;)le=Kt[jt],le.end||le.refresh(0,1)||(Ve=C),re=le.pin,re&&(re===f||re===m||re===Bt)&&!le.isReverted&&(jn||(jn=[]),jn.unshift(le),le.revert(!0,!0)),le!==Kt[jt]&&(qt--,jt--);for(nn(Ft)&&(Ft=Ft(C)),Ft=Qu(Ft,"start",C),ut=cf(Ft,f,W,L,at(),It,X,C,$,k,V,Y,E,C._startClamp&&"_startClamp")||(m?-.001:0),nn(wt)&&(wt=wt(C)),wn(wt)&&!wt.indexOf("+=")&&(~wt.indexOf(" ")?wt=(wn(Ft)?Ft.split(" ")[0]:"")+wt:(Mt=Xa(wt.substr(2),W),wt=wn(Ft)?Ft:(E?Tt.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,ut):ut)+Mt,zt=f)),wt=Qu(wt,"end",C),gt=Math.max(ut,cf(wt||(zt?"100% 0":Y),zt,W,L,at()+Mt,Gt,Ot,C,$,k,V,Y,E,C._endClamp&&"_endClamp"))||-.001,Mt=0,jt=qt;jt--;)le=Kt[jt],re=le.pin,re&&le.start-le._pinPush<=ut&&!E&&le.end>0&&(he=le.end-(C._startClamp?Math.max(0,le.start):le.start),(re===f&&le.start-le._pinPush<ut||re===Bt)&&isNaN(Ft)&&(Mt+=he*(1-le.progress)),re===m&&(St+=he));if(ut+=Mt,gt+=Mt,C._startClamp&&(C._startClamp+=Mt),C._endClamp&&!Je&&(C._endClamp=gt||-.001,gt=Math.min(gt,_i(F,L))),Pt=gt-ut||(ut-=.01)&&.001,et&&(B=Tt.utils.clamp(0,1,Tt.utils.normalize(ut,gt,se))),C._pinPush=St,It&&Mt&&(he={},he[L.a]="+="+Mt,Bt&&(he[L.p]="-="+at()),Tt.set([It,Gt],he)),m&&!(dh&&C.end>=_i(F,L)))he=Bn(m),qe=L===De,an=at(),D=parseFloat(ht(L.a))+St,!Y&&gt>1&&(cn=(I?me.scrollingElement||ei:F).style,cn={style:cn,value:cn["overflow"+L.a.toUpperCase()]},I&&Bn(ue)["overflow"+L.a.toUpperCase()]!=="scroll"&&(cn.style["overflow"+L.a.toUpperCase()]="scroll")),rc(m,it,he),Q=ma(m),pe=Bi(m,!0),ln=V&&yr(F,qe?en:De)(),g?(st=[g+L.os2,Pt+St+Le],st.t=it,jt=g===Ee?dl(m,L)+Pt+St:0,jt&&(st.push(L.d,jt+Le),it.style.flexBasis!=="auto"&&(it.style.flexBasis=jt+Le)),Us(st),Bt&&Kt.forEach(function(Li){Li.pin===Bt&&Li.vars.pinSpacing!==!1&&(Li._subPinOffset=!0)}),V&&at(se)):(jt=dl(m,L),jt&&it.style.flexBasis!=="auto"&&(it.style.flexBasis=jt+Le)),V&&(Vt={top:pe.top+(qe?an-ut:ln)+Le,left:pe.left+(qe?ln:an-ut)+Le,boxSizing:"border-box",position:"fixed"},Vt[$r]=Vt["max"+js]=Math.ceil(pe.width)+Le,Vt[Xr]=Vt["max"+cu]=Math.ceil(pe.height)+Le,Vt[Un]=Vt[Un+Io]=Vt[Un+Po]=Vt[Un+Fo]=Vt[Un+Ro]="0",Vt[Ee]=he[Ee],Vt[Ee+Io]=he[Ee+Io],Vt[Ee+Po]=he[Ee+Po],Vt[Ee+Fo]=he[Ee+Fo],Vt[Ee+Ro]=he[Ee+Ro],T=D0(P,Vt,M),Je&&at(0)),i?(Yn=i._initted,Ql(1),i.render(i.duration(),!0,!0),nt=ht(L.a)-D+Pt+St,dt=Math.abs(Pt-nt)>1,V&&dt&&T.splice(T.length-2,2),i.render(0,!0,!0),Yn||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Ql(0)):nt=Pt,cn&&(cn.value?cn.style["overflow"+L.a.toUpperCase()]=cn.value:cn.style.removeProperty("overflow-"+L.a));else if(f&&at()&&!E)for(pe=f.parentNode;pe&&pe!==ue;)pe._pinOffset&&(ut-=pe._pinOffset,gt-=pe._pinOffset),pe=pe.parentNode;jn&&jn.forEach(function(Li){return Li.revert(!1,!0)}),C.start=ut,C.end=gt,yt=xt=Je?se:at(),!E&&!Je&&(yt<se&&at(se),C.scroll.rec=0),C.revert(!1,!0),q=He(),Ht&&(J=-1,Ht.restart(!0)),Ve=0,i&&R&&(i._initted||Me)&&i.progress()!==Me&&i.progress(Me||0,!0).render(i.time(),!0,!0),(et||B!==C.progress||E||d)&&(i&&!R&&i.totalProgress(E&&ut<-.001&&!B?Tt.utils.normalize(ut,gt,0):B,!0),C.progress=et||(yt-ut)/Pt===B?0:B),m&&g&&(it._pinOffset=Math.round(C.progress*nt)),tt&&tt.invalidate(),isNaN(be)||(be-=Tt.getProperty(X,L.p),ai-=Tt.getProperty(Ot,L.p),ga(X,L,be),ga(It,L,be-(A||0)),ga(Ot,L,ai),ga(Gt,L,ai-(A||0))),et&&!Je&&C.update(),h&&!Je&&!Xt&&(Xt=!0,h(C),Xt=!1)}},C.getVelocity=function(){return(at()-xt)/(He()-_o)*1e3||0},C.endAnimation=function(){ho(C.callbackAnimation),i&&(tt?tt.progress(1):i.paused()?R||ho(i,C.direction<0,1):ho(i,i.reversed()))},C.labelToScroll=function(_t){return i&&i.labels&&(ut||C.refresh()||ut)+i.labels[_t]/i.duration()*Pt||0},C.getTrailing=function(_t){var Wt=Kt.indexOf(C),Rt=C.direction>0?Kt.slice(0,Wt).reverse():Kt.slice(Wt+1);return(wn(_t)?Rt.filter(function(A){return A.vars.preventOverlaps===_t}):Rt).filter(function(A){return C.direction>0?A.end<=ut:A.start>=gt})},C.update=function(_t,Wt,Rt){if(!(E&&!Rt&&!_t)){var A=Je===!0?se:C.scroll(),W=_t?0:(A-ut)/Pt,$=W<0?0:W>1?1:W||0,Y=C.progress,et,Mt,St,wt,zt,Ft,Bt,qt;if(Wt&&(xt=yt,yt=E?at():A,v&&(bt=mt,mt=i&&!R?i.totalProgress():$)),p&&m&&!Ve&&!ca&&$n&&(!$&&ut<A+(A-xt)/(He()-_o)*p?$=1e-4:$===1&&gt>A+(A-xt)/(He()-_o)*p&&($=.9999)),$!==Y&&C.enabled){if(et=C.isActive=!!$&&$<1,Mt=!!Y&&Y<1,Ft=et!==Mt,zt=Ft||!!$!=!!Y,C.direction=$>Y?1:-1,C.progress=$,zt&&!Ve&&(St=$&&!Y?0:$===1?1:Y===1?2:3,R&&(wt=!Ft&&U[St+1]!=="none"&&U[St+1]||U[St],qt=i&&(wt==="complete"||wt==="reset"||wt in i))),S&&(Ft||qt)&&(qt||u||!i)&&(nn(S)?S(C):C.getTrailing(S).forEach(function(an){return an.endAnimation()})),R||(tt&&!Ve&&!ca?(tt._dp._time-tt._start!==tt._time&&tt.render(tt._dp._time-tt._start),tt.resetTo?tt.resetTo("totalProgress",$,i._tTime/i._tDur):(tt.vars.totalProgress=$,tt.invalidate().restart())):i&&i.totalProgress($,!!(Ve&&(q||_t)))),m){if(_t&&g&&(it.style[g+L.os2]=pt),!V)Et(xo(D+nt*$));else if(zt){if(Bt=!_t&&$>Y&&gt+1>A&&A+1>=_i(F,L),M)if(!_t&&(et||Bt)){var jt=Bi(m,!0),he=A-ut;hf(m,ue,jt.top+(L===De?he:0)+Le,jt.left+(L===De?0:he)+Le)}else hf(m,it);Us(et||Bt?T:Q),dt&&$<1&&et||Et(D+($===1&&!Bt?nt:0))}}v&&!rt.tween&&!Ve&&!ca&&Ht.restart(!0),o&&(Ft||b&&$&&($<1||!tc))&&Ho(o.targets).forEach(function(an){return an.classList[et||b?"add":"remove"](o.className)}),a&&!R&&!_t&&a(C),zt&&!Ve?(R&&(qt&&(wt==="complete"?i.pause().totalProgress(1):wt==="reset"?i.restart(!0).pause():wt==="restart"?i.restart(!0):i[wt]()),a&&a(C)),(Ft||!tc)&&(c&&Ft&&nc(C,c),N[St]&&nc(C,N[St]),b&&($===1?C.kill(!1,1):N[St]=0),Ft||(St=$===1?1:3,N[St]&&nc(C,N[St]))),y&&!et&&Math.abs(C.getVelocity())>(yo(y)?y:2500)&&(ho(C.callbackAnimation),tt?tt.progress(1):ho(i,wt==="reverse"?1:!$,1))):R&&a&&!Ve&&a(C)}if(lt){var pe=E?A/E.duration()*(E._caScrollDist||0):A;O(pe+(X._isFlipped?1:0)),lt(pe)}qn&&qn(-A/E.duration()*(E._caScrollDist||0))}},C.enable=function(_t,Wt){C.enabled||(C.enabled=!0,Fe(F,"resize",Mo),I||Fe(F,"scroll",cs),Z&&Fe(r,"refreshInit",Z),_t!==!1&&(C.progress=B=0,yt=xt=J=at()),Wt!==!1&&C.refresh())},C.getTween=function(_t){return _t&&rt?rt.tween:tt},C.setPositions=function(_t,Wt,Rt,A){if(E){var W=E.scrollTrigger,$=E.duration(),Y=W.end-W.start;_t=W.start+Y*_t/$,Wt=W.start+Y*Wt/$}C.refresh(!1,!1,{start:tf(_t,Rt&&!!C._startClamp),end:tf(Wt,Rt&&!!C._endClamp)},A),C.update()},C.adjustPinSpacing=function(_t){if(st&&_t){var Wt=st.indexOf(L.d)+1;st[Wt]=parseFloat(st[Wt])+_t+Le,st[1]=parseFloat(st[1])+_t+Le,Us(st)}},C.disable=function(_t,Wt){if(C.enabled&&(_t!==!1&&C.revert(!0,!0),C.enabled=C.isActive=!1,Wt||tt&&tt.pause(),se=0,ct&&(ct.uncache=1),Z&&Ie(r,"refreshInit",Z),Ht&&(Ht.pause(),rt.tween&&rt.tween.kill()&&(rt.tween=0)),!I)){for(var Rt=Kt.length;Rt--;)if(Kt[Rt].scroller===F&&Kt[Rt]!==C)return;Ie(F,"resize",Mo),I||Ie(F,"scroll",cs)}},C.kill=function(_t,Wt){C.disable(_t,Wt),tt&&!Wt&&tt.kill(),l&&delete ph[l];var Rt=Kt.indexOf(C);Rt>=0&&Kt.splice(Rt,1),Rt===Ke&&Ya>0&&Ke--,Rt=0,Kt.forEach(function(A){return A.scroller===C.scroller&&(Rt=1)}),Rt||Je||(C.scroll.rec=0),i&&(i.scrollTrigger=null,_t&&i.revert({kill:!1}),Wt||i.kill()),It&&[It,Gt,X,Ot].forEach(function(A){return A.parentNode&&A.parentNode.removeChild(A)}),Oo===C&&(Oo=0),m&&(ct&&(ct.uncache=1),Rt=0,Kt.forEach(function(A){return A.pin===m&&Rt++}),Rt||(ct.spacer=0)),n.onKill&&n.onKill(C)},Kt.push(C),C.enable(!1,!1),xn&&xn(C),i&&i.add&&!Pt){var Zt=C.update;C.update=function(){C.update=Zt,ut||gt||C.refresh()},Tt.delayedCall(.01,C.update),Pt=.01,ut=gt=0}else C.refresh();m&&A0()},r.register=function(n){return Es||(Tt=n||xm(),vm()&&window.document&&r.enable(),Es=vo),Es},r.defaults=function(n){if(n)for(var i in n)da[i]=n[i];return da},r.disable=function(n,i){vo=0,Kt.forEach(function(a){return a[i?"kill":"disable"](n)}),Ie(te,"wheel",cs),Ie(me,"scroll",cs),clearInterval(la),Ie(me,"touchcancel",di),Ie(ue,"touchstart",di),ua(Ie,me,"pointerdown,touchstart,mousedown",ef),ua(Ie,me,"pointerup,touchend,mouseup",nf),ul.kill(),ha(Ie);for(var s=0;s<Qt.length;s+=3)fa(Ie,Qt[s],Qt[s+1]),fa(Ie,Qt[s],Qt[s+2])},r.enable=function(){if(te=window,me=document,ei=me.documentElement,ue=me.body,Tt&&(Ho=Tt.utils.toArray,Do=Tt.utils.clamp,fh=Tt.core.context||di,Ql=Tt.core.suppressOverwrites||di,su=te.history.scrollRestoration||"auto",mh=te.pageYOffset,Tt.core.globals("ScrollTrigger",r),ue)){vo=1,ks=document.createElement("div"),ks.style.height="100vh",ks.style.position="absolute",Cm(),y0(),we.register(Tt),r.isTouch=we.isTouch,ir=we.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),uh=we.isTouch===1,Fe(te,"wheel",cs),dm=[te,me,ei,ue],Tt.matchMedia?(r.matchMedia=function(l){var c=Tt.matchMedia(),h;for(h in l)c.add(h,l[h]);return c},Tt.addEventListener("matchMediaInit",function(){return uu()}),Tt.addEventListener("matchMediaRevert",function(){return Em()}),Tt.addEventListener("matchMedia",function(){Or(0,1),es("matchMedia")}),Tt.matchMedia("(orientation: portrait)",function(){return ic(),ic})):console.warn("Requires GSAP 3.11.0 or later"),ic(),Fe(me,"scroll",cs);var n=ue.style,i=n.borderTopStyle,s=Tt.core.Animation.prototype,a,o;for(s.revert||Object.defineProperty(s,"revert",{value:function(){return this.time(-.01,!0)}}),n.borderTopStyle="solid",a=Bi(ue),De.m=Math.round(a.top+De.sc())||0,en.m=Math.round(a.left+en.sc())||0,i?n.borderTopStyle=i:n.removeProperty("border-top-style"),la=setInterval(of,250),Tt.delayedCall(.5,function(){return ca=0}),Fe(me,"touchcancel",di),Fe(ue,"touchstart",di),ua(Fe,me,"pointerdown,touchstart,mousedown",ef),ua(Fe,me,"pointerup,touchend,mouseup",nf),hh=Tt.utils.checkPrefix("transform"),ja.push(hh),Es=He(),ul=Tt.delayedCall(.2,Or).pause(),As=[me,"visibilitychange",function(){var l=te.innerWidth,c=te.innerHeight;me.hidden?(Ku=l,Ju=c):(Ku!==l||Ju!==c)&&Mo()},me,"DOMContentLoaded",Or,te,"load",Or,te,"resize",Mo],ha(Fe),Kt.forEach(function(l){return l.enable(0,1)}),o=0;o<Qt.length;o+=3)fa(Ie,Qt[o],Qt[o+1]),fa(Ie,Qt[o],Qt[o+2])}},r.config=function(n){"limitCallbacks"in n&&(tc=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(la)||(la=i)&&setInterval(of,i),"ignoreMobileResize"in n&&(uh=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(ha(Ie)||ha(Fe,n.autoRefreshEvents||"none"),mm=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=hn(n),a=Qt.indexOf(s),o=Qr(s);~a&&Qt.splice(a,o?6:2),i&&(o?Mi.unshift(te,i,ue,i,ei,i):Mi.unshift(s,i))},r.clearMatchMedia=function(n){Kt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var a=(wn(n)?hn(n):n).getBoundingClientRect(),o=a[s?$r:Xr]*i||0;return s?a.right-o>0&&a.left+o<te.innerWidth:a.bottom-o>0&&a.top+o<te.innerHeight},r.positionInViewport=function(n,i,s){wn(n)&&(n=hn(n));var a=n.getBoundingClientRect(),o=a[s?$r:Xr],l=i==null?o/2:i in pl?pl[i]*o:~i.indexOf("%")?parseFloat(i)*o/100:parseFloat(i)||0;return s?(a.left+l)/te.innerWidth:(a.top+l)/te.innerHeight},r.killAll=function(n){if(Kt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=ts.killAll||[];ts={},i.forEach(function(s){return s()})}},r}();ne.version="3.12.5";ne.saveStyles=function(r){return r?Ho(r).forEach(function(t){if(t&&t.style){var e=Sn.indexOf(t);e>=0&&Sn.splice(e,5),Sn.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),Tt.core.getCache(t),fh())}}):Sn};ne.revert=function(r,t){return uu(!r,t)};ne.create=function(r,t){return new ne(r,t)};ne.refresh=function(r){return r?Mo():(Es||ne.register())&&Or(!0)};ne.update=function(r){return++Qt.cache&&Hi(r===!0?2:0)};ne.clearScrollMemory=Am;ne.maxScroll=function(r,t){return _i(r,t?en:De)};ne.getScrollFunc=function(r,t){return yr(hn(r),t?en:De)};ne.getById=function(r){return ph[r]};ne.getAll=function(){return Kt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};ne.isScrolling=function(){return!!$n};ne.snapDirectional=hu;ne.addEventListener=function(r,t){var e=ts[r]||(ts[r]=[]);~e.indexOf(t)||e.push(t)};ne.removeEventListener=function(r,t){var e=ts[r],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};ne.batch=function(r,t){var e=[],n={},i=t.interval||.016,s=t.batchMax||1e9,a=function(c,h){var u=[],f=[],m=Tt.delayedCall(i,function(){h(u,f),u=[],f=[]}).pause();return function(g){u.length||m.restart(!0),u.push(g.trigger),f.push(g),s<=u.length&&m.progress(1)}},o;for(o in t)n[o]=o.substr(0,2)==="on"&&nn(t[o])&&o!=="onRefreshInit"?a(o,t[o]):t[o];return nn(s)&&(s=s(),Fe(ne,"refresh",function(){return s=t.batchMax()})),Ho(r).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,e.push(ne.create(c))}),e};var ff=function(t,e,n,i){return e>i?t(i):e<0&&t(0),n>i?(i-e)/(n-e):n<0?e/(e-n):1},sc=function r(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(we.isTouch?" pinch-zoom":""):"none",t===ei&&r(ue,e)},_a={auto:1,scroll:1},R0=function(t){var e=t.event,n=t.target,i=t.axis,s=(e.changedTouches?e.changedTouches[0]:e).target,a=s._gsap||Tt.core.getCache(s),o=He(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==ue&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(_a[(l=Bn(s)).overflowY]||_a[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!Qr(s)&&(_a[(l=Bn(s)).overflowY]||_a[l.overflowX]),a._isScrollT=o}(a._isScroll||i==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},Dm=function(t,e,n,i){return we.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:i=i&&R0,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Fe(me,we.eventTypes[0],pf,!1,!0)},onDisable:function(){return Ie(me,we.eventTypes[0],pf,!0)}})},I0=/(input|label|select|textarea)/i,df,pf=function(t){var e=I0.test(t.target.tagName);(e||df)&&(t._gsapAllow=!0,df=e)},F0=function(t){Dr(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,i=e.momentum,s=e.allowNestedScroll,a=e.onRelease,o,l,c=hn(t.target)||ei,h=Tt.core.globals().ScrollSmoother,u=h&&h.get(),f=ir&&(t.content&&hn(t.content)||u&&t.content!==!1&&!u.smooth()&&u.content()),m=yr(c,De),g=yr(c,en),d=1,p=(we.isTouch&&te.visualViewport?te.visualViewport.scale*te.visualViewport.width:te.outerWidth)/te.innerWidth,_=0,x=nn(i)?function(){return i(o)}:function(){return i||2.8},b,v,M=Dm(c,t.type,!0,s),w=function(){return v=!1},E=di,y=di,S=function(){l=_i(c,De),y=Do(ir?1:0,l),n&&(E=Do(0,_i(c,en))),b=qr},L=function(){f._gsap.y=xo(parseFloat(f._gsap.y)+m.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",m.offset=m.cacheID=0},R=function(){if(v){requestAnimationFrame(w);var H=xo(o.deltaY/2),k=y(m.v-H);if(f&&k!==m.v+m.offset){m.offset=k-m.v;var C=xo((parseFloat(f&&f._gsap.y)||0)-m.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+C+", 0, 1)",f._gsap.y=C+"px",m.cacheID=Qt.cache,Hi()}return!0}m.offset&&L(),v=!0},F,j,I,V,N=function(){S(),F.isActive()&&F.vars.scrollY>l&&(m()>l?F.progress(1)&&m(l):F.resetTo("scrollY",l))};return f&&Tt.set(f,{y:"+=0"}),t.ignoreCheck=function(U){return ir&&U.type==="touchmove"&&R()||d>1.05&&U.type!=="touchstart"||o.isGesturing||U.touches&&U.touches.length>1},t.onPress=function(){v=!1;var U=d;d=xo((te.visualViewport&&te.visualViewport.scale||1)/p),F.pause(),U!==d&&sc(c,d>1.01?!0:n?!1:"x"),j=g(),I=m(),S(),b=qr},t.onRelease=t.onGestureStart=function(U,H){if(m.offset&&L(),!H)V.restart(!0);else{Qt.cache++;var k=x(),C,Z;n&&(C=g(),Z=C+k*.05*-U.velocityX/.227,k*=ff(g,C,Z,_i(c,en)),F.vars.scrollX=E(Z)),C=m(),Z=C+k*.05*-U.velocityY/.227,k*=ff(m,C,Z,_i(c,De)),F.vars.scrollY=y(Z),F.invalidate().duration(k).play(.01),(ir&&F.vars.scrollY>=l||C>=l-1)&&Tt.to({},{onUpdate:N,duration:k})}a&&a(U)},t.onWheel=function(){F._ts&&F.pause(),He()-_>1e3&&(b=0,_=He())},t.onChange=function(U,H,k,C,Z){if(qr!==b&&S(),H&&n&&g(E(C[2]===H?j+(U.startX-U.x):g()+H-C[1])),k){m.offset&&L();var z=Z[2]===k,K=z?I+U.startY-U.y:m()+k-Z[1],J=y(K);z&&K!==J&&(I+=J-K),m(J)}(k||H)&&Hi()},t.onEnable=function(){sc(c,n?!1:"x"),ne.addEventListener("refresh",N),Fe(te,"resize",N),m.smooth&&(m.target.style.scrollBehavior="auto",m.smooth=g.smooth=!1),M.enable()},t.onDisable=function(){sc(c,!0),Ie(te,"resize",N),ne.removeEventListener("refresh",N),M.kill()},t.lockAxis=t.lockAxis!==!1,o=new we(t),o.iOS=ir,ir&&!m()&&m(1),ir&&Tt.ticker.add(di),V=o._dc,F=Tt.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Lm(m,m(),function(){return F.pause()})},onUpdate:Hi,onComplete:V.vars.onComplete}),o};ne.sort=function(r){return Kt.sort(r||function(t,e){return(t.vars.refreshPriority||0)*-1e6+t.start-(e.start+(e.vars.refreshPriority||0)*-1e6)})};ne.observe=function(r){return new we(r)};ne.normalizeScroll=function(r){if(typeof r>"u")return Ze;if(r===!0&&Ze)return Ze.enable();if(r===!1){Ze&&Ze.kill(),Ze=r;return}var t=r instanceof we?r:F0(r);return Ze&&Ze.target===t.target&&Ze.kill(),Qr(t.target)&&(Ze=t),t};ne.core={_getVelocityProp:ch,_inputObserver:Dm,_scrollers:Qt,_proxies:Mi,bridge:{ss:function(){$n||es("scrollStart"),$n=He()},ref:function(){return Ve}}};xm()&&Tt.registerPlugin(ne);/*!
 * OverlayScrollbars
 * Version: 2.10.1
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */const Tn=(r,t)=>{const{o:e,i:n,u:i}=r;let s=e,a;const o=(h,u)=>{const f=s,m=h,g=u||(n?!n(f,m):f!==m);return(g||i)&&(s=m,a=f),[s,g,a]};return[t?h=>o(t(s,a),h):o,h=>[s,!!h,a]]},O0=typeof window<"u"&&typeof HTMLElement<"u"&&!!window.document,fn=O0?window:{},ml=Math.max,z0=Math.min,_h=Math.round,gl=Math.abs,mf=Math.sign,fu=fn.cancelAnimationFrame,Ll=fn.requestAnimationFrame,_l=fn.setTimeout,vh=fn.clearTimeout,Dl=r=>typeof fn[r]<"u"?fn[r]:void 0,N0=Dl("MutationObserver"),gf=Dl("IntersectionObserver"),vl=Dl("ResizeObserver"),Ka=Dl("ScrollTimeline"),du=r=>r===void 0,Pl=r=>r===null,bi=r=>typeof r=="number",Jo=r=>typeof r=="string",pu=r=>typeof r=="boolean",On=r=>typeof r=="function",Ei=r=>Array.isArray(r),xl=r=>typeof r=="object"&&!Ei(r)&&!Pl(r),mu=r=>{const t=!!r&&r.length,e=bi(t)&&t>-1&&t%1==0;return Ei(r)||!On(r)&&e?t>0&&xl(r)?t-1 in r:!0:!1},yl=r=>!!r&&r.constructor===Object,Ml=r=>r instanceof HTMLElement,Rl=r=>r instanceof Element,_f=()=>performance.now(),oc=(r,t,e,n,i)=>{let s=0;const a=_f(),o=ml(0,e),l=c=>{const h=_f(),f=h-a>=o,m=c?1:1-(ml(0,a+o-h)/o||0),g=(t-r)*(On(i)?i(m,m*o,0,1,o):m)+r,d=f||m===1;n&&n(g,m,d),s=d?0:Ll(()=>l())};return l(),c=>{fu(s),c&&l(c)}};function oe(r,t){if(mu(r))for(let e=0;e<r.length&&t(r[e],e,r)!==!1;e++);else r&&oe(Object.keys(r),e=>t(r[e],e,r));return r}const Pm=(r,t)=>r.indexOf(t)>=0,$o=(r,t)=>r.concat(t),xe=(r,t,e)=>(!Jo(t)&&mu(t)?Array.prototype.push.apply(r,t):r.push(t),r),br=r=>Array.from(r||[]),gu=r=>Ei(r)?r:!Jo(r)&&mu(r)?br(r):[r],xh=r=>!!r&&!r.length,yh=r=>br(new Set(r)),In=(r,t,e)=>{oe(r,i=>i?i.apply(void 0,t||[]):!0),!e&&(r.length=0)},Rm="paddingTop",Im="paddingRight",Fm="paddingLeft",Om="paddingBottom",zm="marginLeft",Nm="marginRight",km="marginBottom",Um="overflowX",Bm="overflowY",Il="width",Fl="height",rr="visible",zr="hidden",Zs="scroll",k0=r=>{const t=String(r||"");return t?t[0].toUpperCase()+t.slice(1):""},Ol=(r,t,e,n)=>{if(r&&t){let i=!0;return oe(e,s=>{const a=r[s],o=t[s];a!==o&&(i=!1)}),i}return!1},Vm=(r,t)=>Ol(r,t,["w","h"]),Ja=(r,t)=>Ol(r,t,["x","y"]),U0=(r,t)=>Ol(r,t,["t","r","b","l"]),pr=()=>{},kt=(r,...t)=>r.bind(0,...t),Nr=r=>{let t;const e=r?_l:Ll,n=r?vh:fu;return[i=>{n(t),t=e(()=>i(),On(r)?r():r)},()=>n(t)]},Mh=(r,t)=>{const{_:e,p:n,v:i,S:s}=t||{};let a,o,l,c,h=pr;const u=function(p){h(),vh(a),c=a=o=void 0,h=pr,r.apply(this,p)},f=d=>s&&o?s(o,d):d,m=()=>{h!==pr&&u(f(l)||l)},g=function(){const p=br(arguments),_=On(e)?e():e;if(bi(_)&&_>=0){const b=On(n)?n():n,v=bi(b)&&b>=0,M=_>0?_l:Ll,w=_>0?vh:fu,y=f(p)||p,S=u.bind(0,y);let L;h(),i&&!c?(S(),c=!0,L=M(()=>c=void 0,_)):(L=M(S,_),v&&!a&&(a=_l(m,b))),h=()=>w(L),o=l=y}else u(p)};return g.m=m,g},Gm=(r,t)=>Object.prototype.hasOwnProperty.call(r,t),si=r=>r?Object.keys(r):[],ie=(r,t,e,n,i,s,a)=>{const o=[t,e,n,i,s,a];return(typeof r!="object"||Pl(r))&&!On(r)&&(r={}),oe(o,l=>{oe(l,(c,h)=>{const u=l[h];if(r===u)return!0;const f=Ei(u);if(u&&yl(u)){const m=r[h];let g=m;f&&!Ei(m)?g=[]:!f&&!yl(m)&&(g={}),r[h]=ie(g,u)}else r[h]=f?u.slice():u})}),r},Hm=(r,t)=>oe(ie({},r),(e,n,i)=>{e===void 0?delete i[n]:e&&yl(e)&&(i[n]=Hm(e))}),_u=r=>!si(r).length,Wm=(r,t,e)=>ml(r,z0(t,e)),Yr=r=>yh((Ei(r)?r:(r||"").split(" ")).filter(t=>t)),vu=(r,t)=>r&&r.getAttribute(t),vf=(r,t)=>r&&r.hasAttribute(t),zi=(r,t,e)=>{oe(Yr(t),n=>{r&&r.setAttribute(n,String(e||""))})},ui=(r,t)=>{oe(Yr(t),e=>r&&r.removeAttribute(e))},zl=(r,t)=>{const e=Yr(vu(r,t)),n=kt(zi,r,t),i=(s,a)=>{const o=new Set(e);return oe(Yr(s),l=>{o[a](l)}),br(o).join(" ")};return{O:s=>n(i(s,"delete")),$:s=>n(i(s,"add")),C:s=>{const a=Yr(s);return a.reduce((o,l)=>o&&e.includes(l),a.length>0)}}},$m=(r,t,e)=>(zl(r,t).O(e),kt(xu,r,t,e)),xu=(r,t,e)=>(zl(r,t).$(e),kt($m,r,t,e)),bl=(r,t,e,n)=>(n?xu:$m)(r,t,e),yu=(r,t,e)=>zl(r,t).C(e),Xm=r=>zl(r,"class"),qm=(r,t)=>{Xm(r).O(t)},Mu=(r,t)=>(Xm(r).$(t),kt(qm,r,t)),Ym=(r,t)=>{const e=t?Rl(t)&&t:document;return e?br(e.querySelectorAll(r)):[]},B0=(r,t)=>{const e=t?Rl(t)&&t:document;return e&&e.querySelector(r)},bh=(r,t)=>Rl(r)&&r.matches(t),jm=r=>bh(r,"body"),Sh=r=>r?br(r.childNodes):[],Xo=r=>r&&r.parentElement,Rs=(r,t)=>Rl(r)&&r.closest(t),wh=r=>document.activeElement,V0=(r,t,e)=>{const n=Rs(r,t),i=r&&B0(e,n),s=Rs(i,t)===n;return n&&i?n===r||i===r||s&&Rs(Rs(r,e),t)!==n:!1},Ks=r=>{oe(gu(r),t=>{const e=Xo(t);t&&e&&e.removeChild(t)})},Ln=(r,t)=>kt(Ks,r&&t&&oe(gu(t),e=>{e&&r.appendChild(e)})),Bs=r=>{const t=document.createElement("div");return zi(t,"class",r),t},Zm=r=>{const t=Bs();return t.innerHTML=r.trim(),oe(Sh(t),e=>Ks(e))},xf=(r,t)=>r.getPropertyValue(t)||r[t]||"",Km=r=>{const t=r||0;return isFinite(t)?t:0},va=r=>Km(parseFloat(r||"")),Th=r=>Math.round(r*1e4)/1e4,Jm=r=>`${Th(Km(r))}px`;function qo(r,t){r&&t&&oe(t,(e,n)=>{try{const i=r.style,s=Pl(e)||pu(e)?"":bi(e)?Jm(e):e;n.indexOf("--")===0?i.setProperty(n,s):i[n]=s}catch{}})}function qi(r,t,e){const n=Jo(t);let i=n?"":{};if(r){const s=fn.getComputedStyle(r,e)||r.style;i=n?xf(s,t):br(t).reduce((a,o)=>(a[o]=xf(s,o),a),i)}return i}const yf=(r,t,e)=>{const n=t?`${t}-`:"",i=e?`-${e}`:"",s=`${n}top${i}`,a=`${n}right${i}`,o=`${n}bottom${i}`,l=`${n}left${i}`,c=qi(r,[s,a,o,l]);return{t:va(c[s]),r:va(c[a]),b:va(c[o]),l:va(c[l])}},G0=(r,t)=>`translate${xl(r)?`(${r.x},${r.y})`:`Y(${r})`}`,H0=r=>!!(r.offsetWidth||r.offsetHeight||r.getClientRects().length),W0={w:0,h:0},Nl=(r,t)=>t?{w:t[`${r}Width`],h:t[`${r}Height`]}:W0,$0=r=>Nl("inner",r||fn),Vs=kt(Nl,"offset"),Qm=kt(Nl,"client"),Sl=kt(Nl,"scroll"),bu=r=>{const t=parseFloat(qi(r,Il))||0,e=parseFloat(qi(r,Fl))||0;return{w:t-_h(t),h:e-_h(e)}},ac=r=>r.getBoundingClientRect(),X0=r=>!!r&&H0(r),Eh=r=>!!(r&&(r[Fl]||r[Il])),tg=(r,t)=>{const e=Eh(r);return!Eh(t)&&e},Mf=(r,t,e,n)=>{oe(Yr(t),i=>{r&&r.removeEventListener(i,e,n)})},fe=(r,t,e,n)=>{var i;const s=(i=n&&n.H)!=null?i:!0,a=n&&n.I||!1,o=n&&n.A||!1,l={passive:s,capture:a};return kt(In,Yr(t).map(c=>{const h=o?u=>{Mf(r,c,h,a),e&&e(u)}:e;return r&&r.addEventListener(c,h,l),kt(Mf,r,c,h,a)}))},eg=r=>r.stopPropagation(),Ah=r=>r.preventDefault(),ng=r=>eg(r)||Ah(r),vi=(r,t)=>{const{x:e,y:n}=bi(t)?{x:t,y:t}:t||{};bi(e)&&(r.scrollLeft=e),bi(n)&&(r.scrollTop=n)},Dn=r=>({x:r.scrollLeft,y:r.scrollTop}),ig=()=>({D:{x:0,y:0},M:{x:0,y:0}}),q0=(r,t)=>{const{D:e,M:n}=r,{w:i,h:s}=t,a=(u,f,m)=>{let g=mf(u)*m,d=mf(f)*m;if(g===d){const p=gl(u),_=gl(f);d=p>_?0:d,g=p<_?0:g}return g=g===d?0:g,[g+0,d+0]},[o,l]=a(e.x,n.x,i),[c,h]=a(e.y,n.y,s);return{D:{x:o,y:c},M:{x:l,y:h}}},bf=({D:r,M:t})=>{const e=(n,i)=>n===0&&n<=i;return{x:e(r.x,t.x),y:e(r.y,t.y)}},Sf=({D:r,M:t},e)=>{const n=(i,s,a)=>Wm(0,1,(i-a)/(i-s)||0);return{x:n(r.x,t.x,e.x),y:n(r.y,t.y,e.y)}},Ch=r=>{r&&r.focus&&r.focus({preventScroll:!0})},wf=(r,t)=>{oe(gu(t),r)},Lh=r=>{const t=new Map,e=(s,a)=>{if(s){const o=t.get(s);wf(l=>{o&&o[l?"delete":"clear"](l)},a)}else t.forEach(o=>{o.clear()}),t.clear()},n=(s,a)=>{if(Jo(s)){const c=t.get(s)||new Set;return t.set(s,c),wf(h=>{On(h)&&c.add(h)},a),kt(e,s,a)}pu(a)&&a&&e();const o=si(s),l=[];return oe(o,c=>{const h=s[c];h&&xe(l,n(c,h))}),kt(In,l)},i=(s,a)=>{oe(br(t.get(s)),o=>{a&&!xh(a)?o.apply(0,a):o()})};return n(r||{}),[n,e,i]},rg={},sg={},Y0=r=>{oe(r,t=>oe(t,(e,n)=>{rg[n]=t[n]}))},og=(r,t,e)=>si(r).map(n=>{const{static:i,instance:s}=r[n],[a,o,l]=e||[],c=e?s:i;if(c){const h=e?c(a,o,t):c(t);return(l||sg)[n]=h}}),Qo=r=>sg[r],j0="__osOptionsValidationPlugin",so="data-overlayscrollbars",Qa="os-environment",xa=`${Qa}-scrollbar-hidden`,lc=`${so}-initialize`,tl="noClipping",Tf=`${so}-body`,mr=so,Z0="host",Ni=`${so}-viewport`,K0=Um,J0=Bm,Q0="arrange",ag="measuring",tv="scrolling",lg="scrollbarHidden",ev="noContent",Dh=`${so}-padding`,Ef=`${so}-content`,Su="os-size-observer",nv=`${Su}-appear`,iv=`${Su}-listener`,rv="os-trinsic-observer",sv="os-theme-none",zn="os-scrollbar",ov=`${zn}-rtl`,av=`${zn}-horizontal`,lv=`${zn}-vertical`,cg=`${zn}-track`,wu=`${zn}-handle`,cv=`${zn}-visible`,hv=`${zn}-cornerless`,Af=`${zn}-interaction`,Cf=`${zn}-unusable`,Ph=`${zn}-auto-hide`,Lf=`${Ph}-hidden`,Df=`${zn}-wheel`,uv=`${cg}-interactive`,fv=`${wu}-interactive`,dv="__osSizeObserverPlugin",pv=(r,t)=>{const{T:e}=t,[n,i]=r("showNativeOverlaidScrollbars");return[n&&e.x&&e.y,i]},Js=r=>r.indexOf(rr)===0,mv=(r,t)=>{const e=(i,s,a,o)=>{const l=i===rr?zr:i.replace(`${rr}-`,""),c=Js(i),h=Js(a);return!s&&!o?zr:c&&h?rr:c?s&&o?l:s?rr:zr:s?l:h&&o?rr:zr},n={x:e(t.x,r.x,t.y,r.y),y:e(t.y,r.y,t.x,r.x)};return{k:n,R:{x:n.x===Zs,y:n.y===Zs}}},hg="__osScrollbarsHidingPlugin",ug="__osClickScrollPlugin",s1={[ug]:{static:()=>(r,t,e,n)=>{let i=!1,s=pr;const a=133,o=222,[l,c]=Nr(a),h=Math.sign(t),u=e*h,f=u/2,m=_=>1-(1-_)*(1-_),g=(_,x)=>oc(_,x,o,r,m),d=(_,x)=>oc(_,t-u,a*x,(b,v,M)=>{r(b),M&&(s=g(b,t))}),p=oc(0,u,o,(_,x,b)=>{if(r(_),b&&(n(i),!i)){const v=t-_;Math.sign(v-f)===h&&l(()=>{const w=v-u;s=Math.sign(w)===h?d(_,Math.abs(w)/e):g(_,t)})}},m);return _=>{i=!0,_&&p(),c(),s()}}}},Pf=r=>JSON.stringify(r,(t,e)=>{if(On(e))throw 0;return e}),Rf=(r,t)=>r?`${t}`.split(".").reduce((e,n)=>e&&Gm(e,n)?e[n]:void 0,r):void 0,gv={paddingAbsolute:!1,showNativeOverlaidScrollbars:!1,update:{elementEvents:[["img","load"]],debounce:[0,33],attributes:null,ignoreMutation:null},overflow:{x:"scroll",y:"scroll"},scrollbars:{theme:"os-theme-dark",visibility:"auto",autoHide:"never",autoHideDelay:1300,autoHideSuspend:!1,dragScroll:!0,clickScroll:!1,pointers:["mouse","touch","pen"]}},fg=(r,t)=>{const e={},n=$o(si(t),si(r));return oe(n,i=>{const s=r[i],a=t[i];if(xl(s)&&xl(a))ie(e[i]={},fg(s,a)),_u(e[i])&&delete e[i];else if(Gm(t,i)&&a!==s){let o=!0;if(Ei(s)||Ei(a))try{Pf(s)===Pf(a)&&(o=!1)}catch{}o&&(e[i]=a)}}),e},If=(r,t,e)=>n=>[Rf(r,n),e||Rf(t,n)!==void 0];let dg;const _v=()=>dg,vv=r=>{dg=r};let cc;const xv=()=>{const r=(v,M,w)=>{Ln(document.body,v),Ln(document.body,v);const E=Qm(v),y=Vs(v),S=bu(M);return w&&Ks(v),{x:y.h-E.h+S.h,y:y.w-E.w+S.w}},t=v=>{let M=!1;const w=Mu(v,xa);try{M=qi(v,"scrollbar-width")==="none"||qi(v,"display","::-webkit-scrollbar")==="none"}catch{}return w(),M},e=`.${Qa}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Qa} div{width:200%;height:200%;margin:10px 0}.${xa}{scrollbar-width:none!important}.${xa}::-webkit-scrollbar,.${xa}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`,i=Zm(`<div class="${Qa}"><div></div><style>${e}</style></div>`)[0],s=i.firstChild,a=i.lastChild,o=_v();o&&(a.nonce=o);const[l,,c]=Lh(),[h,u]=Tn({o:r(i,s),i:Ja},kt(r,i,s,!0)),[f]=u(),m=t(i),g={x:f.x===0,y:f.y===0},d={elements:{host:null,padding:!m,viewport:v=>m&&jm(v)&&v,content:!1},scrollbars:{slot:!0},cancel:{nativeScrollbarsOverlaid:!1,body:null}},p=ie({},gv),_=kt(ie,{},p),x=kt(ie,{},d),b={N:f,T:g,P:m,G:!!Ka,K:kt(l,"r"),Z:x,tt:v=>ie(d,v)&&x(),nt:_,ot:v=>ie(p,v)&&_(),st:ie({},d),et:ie({},p)};if(ui(i,"style"),Ks(i),fe(fn,"resize",()=>{c("r",[])}),On(fn.matchMedia)&&!m&&(!g.x||!g.y)){const v=M=>{const w=fn.matchMedia(`(resolution: ${fn.devicePixelRatio}dppx)`);fe(w,"change",()=>{M(),v(M)},{A:!0})};v(()=>{const[M,w]=h();ie(b.N,M),c("r",[w])})}return b},Ai=()=>(cc||(cc=xv()),cc),yv=(r,t,e)=>{let n=!1;const i=e?new WeakMap:!1,s=()=>{n=!0},a=o=>{if(i&&e){const l=e.map(c=>{const[h,u]=c||[];return[u&&h?(o||Ym)(h,r):[],u]});oe(l,c=>oe(c[0],h=>{const u=c[1],f=i.get(h)||[];if(r.contains(h)&&u){const g=fe(h,u,d=>{n?(g(),i.delete(h)):t(d)});i.set(h,xe(f,g))}else In(f),i.delete(h)}))}};return a(),[s,a]},Ff=(r,t,e,n)=>{let i=!1;const{ct:s,rt:a,lt:o,it:l,ut:c,_t:h}=n||{},u=Mh(()=>i&&e(!0),{_:33,p:99}),[f,m]=yv(r,u,o),g=s||[],d=a||[],p=$o(g,d),_=(b,v)=>{if(!xh(v)){const M=c||pr,w=h||pr,E=[],y=[];let S=!1,L=!1;if(oe(v,R=>{const{attributeName:F,target:j,type:I,oldValue:V,addedNodes:N,removedNodes:U}=R,H=I==="attributes",k=I==="childList",C=r===j,Z=H&&F,z=Z&&vu(j,F||""),K=Jo(z)?z:null,J=Z&&V!==K,q=Pm(d,F)&&J;if(t&&(k||!C)){const B=H&&J,at=B&&l&&bh(j,l),ct=(at?!M(j,F,V,K):!H||B)&&!w(R,!!at,r,n);oe(N,ot=>xe(E,ot)),oe(U,ot=>xe(E,ot)),L=L||ct}!t&&C&&J&&!M(j,F,V,K)&&(xe(y,F),S=S||q)}),m(R=>yh(E).reduce((F,j)=>(xe(F,Ym(R,j)),bh(j,R)?xe(F,j):F),[])),t)return!b&&L&&e(!1),[!1];if(!xh(y)||S){const R=[yh(y),S];return!b&&e.apply(0,R),R}}},x=new N0(kt(_,!1));return[()=>(x.observe(r,{attributes:!0,attributeOldValue:!0,attributeFilter:p,subtree:t,childList:t,characterData:t}),i=!0,()=>{i&&(f(),x.disconnect(),i=!1)}),()=>{if(i)return u.m(),_(!0,x.takeRecords())}]},pg=(r,t,e)=>{const{dt:n}=e||{},i=Qo(dv),[s]=Tn({o:!1,u:!0});return()=>{const a=[],l=Zm(`<div class="${Su}"><div class="${iv}"></div></div>`)[0],c=l.firstChild,h=u=>{const f=u instanceof ResizeObserverEntry;let m=!1,g=!1;if(f){const[d,,p]=s(u.contentRect),_=Eh(d);g=tg(d,p),m=!g&&!_}else g=u===!0;m||t({ft:!0,dt:g})};if(vl){const u=new vl(f=>h(f.pop()));u.observe(c),xe(a,()=>{u.disconnect()})}else if(i){const[u,f]=i(c,h,n);xe(a,$o([Mu(l,nv),fe(l,"animationstart",u)],f))}else return pr;return kt(In,xe(a,Ln(r,l)))}},Mv=(r,t)=>{let e;const n=l=>l.h===0||l.isIntersecting||l.intersectionRatio>0,i=Bs(rv),[s]=Tn({o:!1}),a=(l,c)=>{if(l){const h=s(n(l)),[,u]=h;return u&&!c&&t(h)&&[h]}},o=(l,c)=>a(c.pop(),l);return[()=>{const l=[];if(gf)e=new gf(kt(o,!1),{root:r}),e.observe(i),xe(l,()=>{e.disconnect()});else{const c=()=>{const h=Vs(i);a(h)};xe(l,pg(i,c)()),c()}return kt(In,xe(l,Ln(r,i)))},()=>e&&o(!0,e.takeRecords())]},bv=(r,t,e,n)=>{let i,s,a,o,l,c;const h=`[${mr}]`,u=`[${Ni}]`,f=["id","class","style","open","wrap","cols","rows"],{vt:m,ht:g,U:d,gt:p,bt:_,L:x,wt:b,yt:v,St:M,Ot:w}=r,E=q=>qi(q,"direction")==="rtl",y={$t:!1,F:E(m)},S=Ai(),L=Qo(hg),[R]=Tn({i:Vm,o:{w:0,h:0}},()=>{const q=L&&L.V(r,t,y,S,e).X,at=!(b&&x)&&yu(g,mr,tl),rt=!x&&v(Q0),ct=rt&&Dn(p),ot=ct&&w(),yt=M(ag,at),xt=rt&&q&&q()[0],ut=Sl(d),gt=bu(d);return xt&&xt(),vi(p,ct),ot&&ot(),at&&yt(),{w:ut.w+gt.w,h:ut.h+gt.h}}),F=Mh(n,{_:()=>i,p:()=>s,S(q,B){const[at]=q,[rt]=B;return[$o(si(at),si(rt)).reduce((ct,ot)=>(ct[ot]=at[ot]||rt[ot],ct),{})]}}),j=q=>{const B=E(m);ie(q,{Ct:c!==B}),ie(y,{F:B}),c=B},I=(q,B)=>{const[at,rt]=q,ct={xt:rt};return ie(y,{$t:at}),!B&&n(ct),ct},V=({ft:q,dt:B})=>{const rt=!(q&&!B)&&S.P?F:n,ct={ft:q||B,dt:B};j(ct),rt(ct)},N=(q,B)=>{const[,at]=R(),rt={Ht:at};return j(rt),at&&!B&&(q?n:F)(rt),rt},U=(q,B,at)=>{const rt={Et:B};return j(rt),B&&!at&&F(rt),rt},[H,k]=_?Mv(g,I):[],C=!x&&pg(g,V,{dt:!0}),[Z,z]=Ff(g,!1,U,{rt:f,ct:f}),K=x&&vl&&new vl(q=>{const B=q[q.length-1].contentRect;V({ft:!0,dt:tg(B,l)}),l=B}),J=Mh(()=>{const[,q]=R();n({Ht:q})},{_:222,v:!0});return[()=>{K&&K.observe(g);const q=C&&C(),B=H&&H(),at=Z(),rt=S.K(ct=>{ct?F({zt:ct}):J()});return()=>{K&&K.disconnect(),q&&q(),B&&B(),o&&o(),at(),rt()}},({It:q,At:B,Dt:at})=>{const rt={},[ct]=q("update.ignoreMutation"),[ot,yt]=q("update.attributes"),[xt,ut]=q("update.elementEvents"),[gt,It]=q("update.debounce"),Gt=ut||yt,X=B||at,Ot=At=>On(ct)&&ct(At);if(Gt){a&&a(),o&&o();const[At,Xt]=Ff(_||d,!0,N,{ct:$o(f,ot||[]),lt:xt,it:h,_t:(Pt,P)=>{const{target:T,attributeName:Q}=Pt;return(!P&&Q&&!x?V0(T,h,u):!1)||!!Rs(T,`.${zn}`)||!!Ot(Pt)}});o=At(),a=Xt}if(It)if(F.m(),Ei(gt)){const At=gt[0],Xt=gt[1];i=bi(At)&&At,s=bi(Xt)&&Xt}else bi(gt)?(i=gt,s=!1):(i=!1,s=!1);if(X){const At=z(),Xt=k&&k(),Pt=a&&a();At&&ie(rt,U(At[0],At[1],X)),Xt&&ie(rt,I(Xt[0],X)),Pt&&ie(rt,N(Pt[0],X))}return j(rt),rt},y]},mg=(r,t)=>On(t)?t.apply(0,r):t,Sv=(r,t,e,n)=>{const i=du(n)?e:n;return mg(r,i)||t.apply(0,r)},gg=(r,t,e,n)=>{const i=du(n)?e:n,s=mg(r,i);return!!s&&(Ml(s)?s:t.apply(0,r))},wv=(r,t)=>{const{nativeScrollbarsOverlaid:e,body:n}=t||{},{T:i,P:s,Z:a}=Ai(),{nativeScrollbarsOverlaid:o,body:l}=a().cancel,c=e??o,h=du(n)?l:n,u=(i.x||i.y)&&c,f=r&&(Pl(h)?!s:h);return!!u||!!f},Tv=(r,t,e,n)=>{const i="--os-viewport-percent",s="--os-scroll-percent",a="--os-scroll-direction",{Z:o}=Ai(),{scrollbars:l}=o(),{slot:c}=l,{vt:h,ht:u,U:f,Mt:m,gt:g,wt:d,L:p}=t,{scrollbars:_}=m?{}:r,{slot:x}=_||{},b=[],v=[],M=[],w=gg([h,u,f],()=>p&&d?h:u,c,x),E=Z=>{if(Ka){const z=new Ka({source:g,axis:Z});return{kt:J=>{const q=J.Tt.animate({clear:["left"],[s]:[0,1]},{timeline:z});return()=>q.cancel()}}}},y={x:E("x"),y:E("y")},S=()=>{const{Rt:Z,Vt:z}=e,K=(J,q)=>Wm(0,1,J/(J+q)||0);return{x:K(z.x,Z.x),y:K(z.y,Z.y)}},L=(Z,z,K)=>{const J=K?Mu:qm;oe(Z,q=>{J(q.Tt,z)})},R=(Z,z)=>{oe(Z,K=>{const[J,q]=z(K);qo(J,q)})},F=(Z,z,K)=>{const J=pu(K),q=J?K:!0,B=J?!K:!0;q&&L(v,Z,z),B&&L(M,Z,z)},j=()=>{const Z=S(),z=K=>J=>[J.Tt,{[i]:Th(K)+""}];R(v,z(Z.x)),R(M,z(Z.y))},I=()=>{if(!Ka){const{Lt:Z}=e,z=Sf(Z,Dn(g)),K=J=>q=>[q.Tt,{[s]:Th(J)+""}];R(v,K(z.x)),R(M,K(z.y))}},V=()=>{const{Lt:Z}=e,z=bf(Z),K=J=>q=>[q.Tt,{[a]:J?"0":"1"}];R(v,K(z.x)),R(M,K(z.y))},N=()=>{if(p&&!d){const{Rt:Z,Lt:z}=e,K=bf(z),J=Sf(z,Dn(g)),q=B=>{const{Tt:at}=B,rt=Xo(at)===f&&at,ct=(ot,yt,xt)=>{const ut=yt*ot;return Jm(xt?ut:-ut)};return[rt,rt&&{transform:G0({x:ct(J.x,Z.x,K.x),y:ct(J.y,Z.y,K.y)})}]};R(v,q),R(M,q)}},U=Z=>{const z=Z?"x":"y",J=Bs(`${zn} ${Z?av:lv}`),q=Bs(cg),B=Bs(wu),at={Tt:J,Ut:q,Pt:B},rt=y[z];return xe(Z?v:M,at),xe(b,[Ln(J,q),Ln(q,B),kt(Ks,J),rt&&rt.kt(at),n(at,F,Z)]),at},H=kt(U,!0),k=kt(U,!1),C=()=>(Ln(w,v[0].Tt),Ln(w,M[0].Tt),kt(In,b));return H(),k(),[{Nt:j,qt:I,Bt:V,Ft:N,jt:F,Yt:{Wt:v,Xt:H,Jt:kt(R,v)},Gt:{Wt:M,Xt:k,Jt:kt(R,M)}},C]},Ev=(r,t,e,n)=>(i,s,a)=>{const{ht:o,U:l,L:c,gt:h,Kt:u,Ot:f}=t,{Tt:m,Ut:g,Pt:d}=i,[p,_]=Nr(333),[x,b]=Nr(444),v=E=>{On(h.scrollBy)&&h.scrollBy({behavior:"smooth",left:E.x,top:E.y})},M=()=>{const E="pointerup pointercancel lostpointercapture",y=`client${a?"X":"Y"}`,S=a?Il:Fl,L=a?"left":"top",R=a?"w":"h",F=a?"x":"y",j=(V,N)=>U=>{const{Rt:H}=e,k=Vs(g)[R]-Vs(d)[R],Z=N*U/k*H[F];vi(h,{[F]:V+Z})},I=[];return fe(g,"pointerdown",V=>{const N=Rs(V.target,`.${wu}`)===d,U=N?d:g,H=r.scrollbars,k=H[N?"dragScroll":"clickScroll"],{button:C,isPrimary:Z,pointerType:z}=V,{pointers:K}=H;if(C===0&&Z&&k&&(K||[]).includes(z)){In(I),b();const q=!N&&(V.shiftKey||k==="instant"),B=kt(ac,d),at=kt(ac,g),rt=(P,T)=>(P||B())[L]-(T||at())[L],ct=_h(ac(h)[S])/Vs(h)[R]||1,ot=j(Dn(h)[F],1/ct),yt=V[y],xt=B(),ut=at(),gt=xt[S],It=rt(xt,ut)+gt/2,Gt=yt-ut[L],X=N?0:Gt-It,Ot=P=>{In(Pt),U.releasePointerCapture(P.pointerId)},At=N||q,Xt=f(),Pt=[fe(u,E,Ot),fe(u,"selectstart",P=>Ah(P),{H:!1}),fe(g,E,Ot),At&&fe(g,"pointermove",P=>ot(X+(P[y]-yt))),At&&(()=>{const P=Dn(h);Xt();const T=Dn(h),Q={x:T.x-P.x,y:T.y-P.y};(gl(Q.x)>3||gl(Q.y)>3)&&(f(),vi(h,P),v(Q),x(Xt))})];if(U.setPointerCapture(V.pointerId),q)ot(X);else if(!N){const P=Qo(ug);if(P){const T=P(ot,X,gt,Q=>{Q?Xt():xe(Pt,Xt)});xe(Pt,T),xe(I,kt(T,!0))}}}})};let w=!0;return kt(In,[fe(d,"pointermove pointerleave",n),fe(m,"pointerenter",()=>{s(Af,!0)}),fe(m,"pointerleave pointercancel",()=>{s(Af,!1)}),!c&&fe(m,"mousedown",()=>{const E=wh();(vf(E,Ni)||vf(E,mr)||E===document.body)&&_l(kt(Ch,l),25)}),fe(m,"wheel",E=>{const{deltaX:y,deltaY:S,deltaMode:L}=E;w&&L===0&&Xo(m)===o&&v({x:y,y:S}),w=!1,s(Df,!0),p(()=>{w=!0,s(Df)}),Ah(E)},{H:!1,I:!0}),fe(m,"pointerdown",kt(fe,u,"click",ng,{A:!0,I:!0,H:!1}),{I:!0}),M(),_,b])},Av=(r,t,e,n,i,s)=>{let a,o,l,c,h,u=pr,f=0;const m=["mouse","pen"],g=z=>m.includes(z.pointerType),[d,p]=Nr(),[_,x]=Nr(100),[b,v]=Nr(100),[M,w]=Nr(()=>f),[E,y]=Tv(r,i,n,Ev(t,i,n,z=>g(z)&&H())),{ht:S,Qt:L,wt:R}=i,{jt:F,Nt:j,qt:I,Bt:V,Ft:N}=E,U=(z,K)=>{if(w(),z)F(Lf);else{const J=kt(F,Lf,!0);f>0&&!K?M(J):J()}},H=()=>{(l?!a:!c)&&(U(!0),_(()=>{U(!1)}))},k=z=>{F(Ph,z,!0),F(Ph,z,!1)},C=z=>{g(z)&&(a=l,l&&U(!0))},Z=[w,x,v,p,()=>u(),fe(S,"pointerover",C,{A:!0}),fe(S,"pointerenter",C),fe(S,"pointerleave",z=>{g(z)&&(a=!1,l&&U(!1))}),fe(S,"pointermove",z=>{g(z)&&o&&H()}),fe(L,"scroll",z=>{d(()=>{I(),H()}),s(z),N()})];return[()=>kt(In,xe(Z,y())),({It:z,Dt:K,Zt:J,tn:q})=>{const{nn:B,sn:at,en:rt,cn:ct}=q||{},{Ct:ot,dt:yt}=J||{},{F:xt}=e,{T:ut}=Ai(),{k:gt,rn:It}=n,[Gt,X]=z("showNativeOverlaidScrollbars"),[Ot,At]=z("scrollbars.theme"),[Xt,Pt]=z("scrollbars.visibility"),[P,T]=z("scrollbars.autoHide"),[Q,it]=z("scrollbars.autoHideSuspend"),[ft]=z("scrollbars.autoHideDelay"),[ht,Et]=z("scrollbars.dragScroll"),[D,nt]=z("scrollbars.clickScroll"),[pt,st]=z("overflow"),O=yt&&!K,dt=It.x||It.y,lt=B||at||ct||ot||K,Ct=rt||Pt||st,mt=Gt&&ut.x&&ut.y,bt=(tt,Lt,Ut)=>{const Ht=tt.includes(Zs)&&(Xt===rr||Xt==="auto"&&Lt===Zs);return F(cv,Ht,Ut),Ht};if(f=ft,O&&(Q&&dt?(k(!1),u(),b(()=>{u=fe(L,"scroll",kt(k,!0),{A:!0})})):k(!0)),X&&F(sv,mt),At&&(F(h),F(Ot,!0),h=Ot),it&&!Q&&k(!0),T&&(o=P==="move",l=P==="leave",c=P==="never",U(c,!0)),Et&&F(fv,ht),nt&&F(uv,!!D),Ct){const tt=bt(pt.x,gt.x,!0),Lt=bt(pt.y,gt.y,!1);F(hv,!(tt&&Lt))}lt&&(I(),j(),N(),ct&&V(),F(Cf,!It.x,!0),F(Cf,!It.y,!1),F(ov,xt&&!R))},{},E]},Cv=r=>{const t=Ai(),{Z:e,P:n}=t,{elements:i}=e(),{padding:s,viewport:a,content:o}=i,l=Ml(r),c=l?{}:r,{elements:h}=c,{padding:u,viewport:f,content:m}=h||{},g=l?r:c.target,d=jm(g),p=g.ownerDocument,_=p.documentElement,x=()=>p.defaultView||fn,b=kt(Sv,[g]),v=kt(gg,[g]),M=kt(Bs,""),w=kt(b,M,a),E=kt(v,M,o),y=gt=>{const It=Vs(gt),Gt=Sl(gt),X=qi(gt,Um),Ot=qi(gt,Bm);return Gt.w-It.w>0&&!Js(X)||Gt.h-It.h>0&&!Js(Ot)},S=w(f),L=S===g,R=L&&d,F=!L&&E(m),j=!L&&S===F,I=R?_:S,V=R?I:g,N=!L&&v(M,s,u),U=!j&&F,H=[U,I,N,V].map(gt=>Ml(gt)&&!Xo(gt)&&gt),k=gt=>gt&&Pm(H,gt),C=!k(I)&&y(I)?I:g,Z=R?_:I,K={vt:g,ht:V,U:I,ln:N,bt:U,gt:Z,Qt:R?p:I,an:d?_:C,Kt:p,wt:d,Mt:l,L,un:x,yt:gt=>yu(I,Ni,gt),St:(gt,It)=>bl(I,Ni,gt,It),Ot:()=>bl(Z,Ni,tv,!0)},{vt:J,ht:q,ln:B,U:at,bt:rt}=K,ct=[()=>{ui(q,[mr,lc]),ui(J,lc),d&&ui(_,[lc,mr])}];let ot=Sh([rt,at,B,q,J].find(gt=>gt&&!k(gt)));const yt=R?J:rt||at,xt=kt(In,ct);return[K,()=>{const gt=x(),It=wh(),Gt=Pt=>{Ln(Xo(Pt),Sh(Pt)),Ks(Pt)},X=Pt=>fe(Pt,"focusin focusout focus blur",ng,{I:!0,H:!1}),Ot="tabindex",At=vu(at,Ot),Xt=X(It);return zi(q,mr,L?"":Z0),zi(B,Dh,""),zi(at,Ni,""),zi(rt,Ef,""),L||(zi(at,Ot,At||"-1"),d&&zi(_,Tf,"")),Ln(yt,ot),Ln(q,B),Ln(B||q,!L&&at),Ln(at,rt),xe(ct,[Xt,()=>{const Pt=wh(),P=k(at),T=P&&Pt===at?J:Pt,Q=X(T);ui(B,Dh),ui(rt,Ef),ui(at,Ni),d&&ui(_,Tf),At?zi(at,Ot,At):ui(at,Ot),k(rt)&&Gt(rt),P&&Gt(at),k(B)&&Gt(B),Ch(T),Q()}]),n&&!L&&(xu(at,Ni,lg),xe(ct,kt(ui,at,Ni))),Ch(!L&&d&&It===J&&gt.top===gt?at:It),Xt(),ot=0,xt},xt]},Lv=({bt:r})=>({Zt:t,_n:e,Dt:n})=>{const{xt:i}=t||{},{$t:s}=e;r&&(i||n)&&qo(r,{[Fl]:s&&"100%"})},Dv=({ht:r,ln:t,U:e,L:n},i)=>{const[s,a]=Tn({i:U0,o:yf()},kt(yf,r,"padding",""));return({It:o,Zt:l,_n:c,Dt:h})=>{let[u,f]=a(h);const{P:m}=Ai(),{ft:g,Ht:d,Ct:p}=l||{},{F:_}=c,[x,b]=o("paddingAbsolute");(g||f||(h||d))&&([u,f]=s(h));const M=!n&&(b||p||f);if(M){const w=!x||!t&&!m,E=u.r+u.l,y=u.t+u.b,S={[Nm]:w&&!_?-E:0,[km]:w?-y:0,[zm]:w&&_?-E:0,top:w?-u.t:0,right:w?_?-u.r:"auto":0,left:w?_?"auto":-u.l:0,[Il]:w&&`calc(100% + ${E}px)`},L={[Rm]:w?u.t:0,[Im]:w?u.r:0,[Om]:w?u.b:0,[Fm]:w?u.l:0};qo(t||e,S),qo(e,L),ie(i,{ln:u,dn:!w,j:t?L:ie({},S,L)})}return{fn:M}}},Pv=(r,t)=>{const e=Ai(),{ht:n,ln:i,U:s,L:a,Qt:o,gt:l,wt:c,St:h,un:u}=r,{P:f}=e,m=c&&a,g=kt(ml,0),d={display:()=>!1,direction:z=>z!=="ltr",flexDirection:z=>z.endsWith("-reverse"),writingMode:z=>z!=="horizontal-tb"},p=si(d),_={i:Vm,o:{w:0,h:0}},x={i:Ja,o:{}},b=z=>{h(ag,!m&&z)},v=z=>{if(!p.some(yt=>{const xt=z[yt];return xt&&d[yt](xt)}))return{D:{x:0,y:0},M:{x:1,y:1}};b(!0);const J=Dn(l),q=h(ev,!0),B=fe(o,Zs,yt=>{const xt=Dn(l);yt.isTrusted&&xt.x===J.x&&xt.y===J.y&&eg(yt)},{I:!0,A:!0});vi(l,{x:0,y:0}),q();const at=Dn(l),rt=Sl(l);vi(l,{x:rt.w,y:rt.h});const ct=Dn(l);vi(l,{x:ct.x-at.x<1&&-rt.w,y:ct.y-at.y<1&&-rt.h});const ot=Dn(l);return vi(l,J),Ll(()=>B()),{D:at,M:ot}},M=(z,K)=>{const J=fn.devicePixelRatio%1!==0?1:0,q={w:g(z.w-K.w),h:g(z.h-K.h)};return{w:q.w>J?q.w:0,h:q.h>J?q.h:0}},[w,E]=Tn(_,kt(bu,s)),[y,S]=Tn(_,kt(Sl,s)),[L,R]=Tn(_),[F]=Tn(x),[j,I]=Tn(_),[V]=Tn(x),[N]=Tn({i:(z,K)=>Ol(z,K,p),o:{}},()=>X0(s)?qi(s,p):{}),[U,H]=Tn({i:(z,K)=>Ja(z.D,K.D)&&Ja(z.M,K.M),o:ig()}),k=Qo(hg),C=(z,K)=>`${K?K0:J0}${k0(z)}`,Z=z=>{const K=q=>[rr,zr,Zs].map(B=>C(B,q)),J=K(!0).concat(K()).join(" ");h(J),h(si(z).map(q=>C(z[q],q==="x")).join(" "),!0)};return({It:z,Zt:K,_n:J,Dt:q},{fn:B})=>{const{ft:at,Ht:rt,Ct:ct,dt:ot,zt:yt}=K||{},xt=k&&k.V(r,t,J,e,z),{W:ut,X:gt,J:It}=xt||{},[Gt,X]=pv(z,e),[Ot,At]=z("overflow"),Xt=Js(Ot.x),Pt=Js(Ot.y),P=!0;let T=E(q),Q=S(q),it=R(q),ft=I(q);X&&f&&h(lg,!Gt);{yu(n,mr,tl)&&b(!0);const[yn]=gt?gt():[],[Nt]=T=w(q),[Dt]=Q=y(q),Zt=Qm(s),_t=m&&$0(u()),Wt={w:g(Dt.w+Nt.w),h:g(Dt.h+Nt.h)},Rt={w:g((_t?_t.w:Zt.w+g(Zt.w-Dt.w))+Nt.w),h:g((_t?_t.h:Zt.h+g(Zt.h-Dt.h))+Nt.h)};yn&&yn(),ft=j(Rt),it=L(M(Wt,Rt),q)}const[ht,Et]=ft,[D,nt]=it,[pt,st]=Q,[O,dt]=T,[lt,Ct]=F({x:D.w>0,y:D.h>0}),mt=Xt&&Pt&&(lt.x||lt.y)||Xt&&lt.x&&!lt.y||Pt&&lt.y&&!lt.x,bt=B||ct||yt||dt||st||Et||nt||At||X||P,tt=mv(lt,Ot),[Lt,Ut]=V(tt.k),[Ht,se]=N(q),Me=ct||ot||se||Ct||q,[qn,xn]=Me?U(v(Ht),q):H();return bt&&(Ut&&Z(tt.k),It&&ut&&qo(s,It(tt,J,ut(tt,pt,O)))),b(!1),bl(n,mr,tl,mt),bl(i,Dh,tl,mt),ie(t,{k:Lt,Vt:{x:ht.w,y:ht.h},Rt:{x:D.w,y:D.h},rn:lt,Lt:q0(qn,D)}),{en:Ut,nn:Et,sn:nt,cn:xn||nt,pn:Me}}},Rv=r=>{const[t,e,n]=Cv(r),i={ln:{t:0,r:0,b:0,l:0},dn:!1,j:{[Nm]:0,[km]:0,[zm]:0,[Rm]:0,[Im]:0,[Om]:0,[Fm]:0},Vt:{x:0,y:0},Rt:{x:0,y:0},k:{x:zr,y:zr},rn:{x:!1,y:!1},Lt:ig()},{vt:s,gt:a,L:o,Ot:l}=t,{P:c,T:h}=Ai(),u=!c&&(h.x||h.y),f=[Lv(t),Dv(t,i),Pv(t,i)];return[e,m=>{const g={},p=u&&Dn(a),_=p&&l();return oe(f,x=>{ie(g,x(m,g)||{})}),vi(a,p),_&&_(),!o&&vi(s,0),g},i,t,n]},Iv=(r,t,e,n,i)=>{let s=!1;const a=If(t,{}),[o,l,c,h,u]=Rv(r),[f,m,g]=bv(h,c,a,v=>{b({},v)}),[d,p,,_]=Av(r,t,g,c,h,i),x=v=>si(v).some(M=>!!v[M]),b=(v,M)=>{if(e())return!1;const{vn:w,Dt:E,At:y,hn:S}=v,L=w||{},R=!!E||!s,F={It:If(t,L,R),vn:L,Dt:R};if(S)return p(F),!1;const j=M||m(ie({},F,{At:y})),I=l(ie({},F,{_n:g,Zt:j}));p(ie({},F,{Zt:j,tn:I}));const V=x(j),N=x(I),U=V||N||!_u(L)||R;return s=!0,U&&n(v,{Zt:j,tn:I}),U};return[()=>{const{an:v,gt:M,Ot:w}=h,E=Dn(v),y=[f(),o(),d()],S=w();return vi(M,E),S(),kt(In,y)},b,()=>({gn:g,bn:c}),{wn:h,yn:_},u]},Tu=new WeakMap,Fv=(r,t)=>{Tu.set(r,t)},Ov=r=>{Tu.delete(r)},_g=r=>Tu.get(r),Qs=(r,t,e)=>{const{nt:n}=Ai(),i=Ml(r),s=i?r:r.target,a=_g(s);if(t&&!a){let o=!1;const l=[],c={},h=L=>{const R=Hm(L),F=Qo(j0);return F?F(R,!0):R},u=ie({},n(),h(t)),[f,m,g]=Lh(),[d,p,_]=Lh(e),x=(L,R)=>{_(L,R),g(L,R)},[b,v,M,w,E]=Iv(r,u,()=>o,({vn:L,Dt:R},{Zt:F,tn:j})=>{const{ft:I,Ct:V,xt:N,Ht:U,Et:H,dt:k}=F,{nn:C,sn:Z,en:z,cn:K}=j;x("updated",[S,{updateHints:{sizeChanged:!!I,directionChanged:!!V,heightIntrinsicChanged:!!N,overflowEdgeChanged:!!C,overflowAmountChanged:!!Z,overflowStyleChanged:!!z,scrollCoordinatesChanged:!!K,contentMutation:!!U,hostMutation:!!H,appear:!!k},changedOptions:L||{},force:!!R}])},L=>x("scroll",[S,L])),y=L=>{Ov(s),In(l),o=!0,x("destroyed",[S,L]),m(),p()},S={options(L,R){if(L){const F=R?n():{},j=fg(u,ie(F,h(L)));_u(j)||(ie(u,j),v({vn:j}))}return ie({},u)},on:d,off:(L,R)=>{L&&R&&p(L,R)},state(){const{gn:L,bn:R}=M(),{F}=L,{Vt:j,Rt:I,k:V,rn:N,ln:U,dn:H,Lt:k}=R;return ie({},{overflowEdge:j,overflowAmount:I,overflowStyle:V,hasOverflow:N,scrollCoordinates:{start:k.D,end:k.M},padding:U,paddingAbsolute:H,directionRTL:F,destroyed:o})},elements(){const{vt:L,ht:R,ln:F,U:j,bt:I,gt:V,Qt:N}=w.wn,{Yt:U,Gt:H}=w.yn,k=Z=>{const{Pt:z,Ut:K,Tt:J}=Z;return{scrollbar:J,track:K,handle:z}},C=Z=>{const{Wt:z,Xt:K}=Z,J=k(z[0]);return ie({},J,{clone:()=>{const q=k(K());return v({hn:!0}),q}})};return ie({},{target:L,host:R,padding:F||j,viewport:j,content:I||j,scrollOffsetElement:V,scrollEventElement:N,scrollbarHorizontal:C(U),scrollbarVertical:C(H)})},update:L=>v({Dt:L,At:!0}),destroy:kt(y,!1),plugin:L=>c[si(L)[0]]};return xe(l,[E]),Fv(s,S),og(rg,Qs,[S,f,c]),wv(w.wn.wt,!i&&r.cancel)?(y(!0),S):(xe(l,b()),x("initialized",[S]),S.update(),S)}return a};Qs.plugin=r=>{const t=Ei(r),e=t?r:[r],n=e.map(i=>og(i,Qs)[0]);return Y0(e),t?n:n[0]};Qs.valid=r=>{const t=r&&r.elements,e=On(t)&&t();return yl(e)&&!!_g(e.target)};Qs.env=()=>{const{N:r,T:t,P:e,G:n,st:i,et:s,Z:a,tt:o,nt:l,ot:c}=Ai();return ie({},{scrollbarsSize:r,scrollbarsOverlaid:t,scrollbarsHiding:e,scrollTimeline:n,staticDefaultInitialization:i,staticDefaultOptions:s,getDefaultInitialization:a,setDefaultInitialization:o,getDefaultOptions:l,setDefaultOptions:c})};Qs.nonce=vv;/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class Si{constructor(t,e,n,i,s="div"){this.parent=t,this.object=e,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),Si.nextNameID=Si.nextNameID||0,this.$name.id=`lil-gui-name-${++Si.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class zv extends Si{constructor(t,e,n){super(t,e,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Rh(r){let t,e;return(t=r.match(/(#|0x)?([a-f0-9]{6})/i))?e=t[2]:(t=r.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?e=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=r.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(e=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),e?"#"+e:!1}const Nv={isPrimitive:!0,match:r=>typeof r=="string",fromHexString:Rh,toHexString:Rh},Yo={isPrimitive:!0,match:r=>typeof r=="number",fromHexString:r=>parseInt(r.substring(1),16),toHexString:r=>"#"+r.toString(16).padStart(6,0)},kv={isPrimitive:!1,match:r=>Array.isArray(r),fromHexString(r,t,e=1){const n=Yo.fromHexString(r);t[0]=(n>>16&255)/255*e,t[1]=(n>>8&255)/255*e,t[2]=(n&255)/255*e},toHexString([r,t,e],n=1){n=255/n;const i=r*n<<16^t*n<<8^e*n<<0;return Yo.toHexString(i)}},Uv={isPrimitive:!1,match:r=>Object(r)===r,fromHexString(r,t,e=1){const n=Yo.fromHexString(r);t.r=(n>>16&255)/255*e,t.g=(n>>8&255)/255*e,t.b=(n&255)/255*e},toHexString({r,g:t,b:e},n=1){n=255/n;const i=r*n<<16^t*n<<8^e*n<<0;return Yo.toHexString(i)}},Bv=[Nv,Yo,kv,Uv];function Vv(r){return Bv.find(t=>t.match(r))}class Gv extends Si{constructor(t,e,n,i){super(t,e,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Vv(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=Rh(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class hc extends Si{constructor(t,e,n){super(t,e,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Hv extends Si{constructor(t,e,n,i,s,a){super(t,e,n,"number"),this._initInput(),this.min(i),this.max(s);const o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=e*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let x=parseFloat(this.$input.value);isNaN(x)||(this._stepExplicit&&(x=this._snap(x)),this.setValue(this._clamp(x)))},n=x=>{const b=parseFloat(this.$input.value);isNaN(b)||(this._snapClampSetValue(b+x),this.$input.value=this.getValue())},i=x=>{x.key==="Enter"&&this.$input.blur(),x.code==="ArrowUp"&&(x.preventDefault(),n(this._step*this._arrowKeyMultiplier(x))),x.code==="ArrowDown"&&(x.preventDefault(),n(this._step*this._arrowKeyMultiplier(x)*-1))},s=x=>{this._inputFocused&&(x.preventDefault(),n(this._step*this._normalizeMouseWheel(x)))};let a=!1,o,l,c,h,u;const f=5,m=x=>{o=x.clientX,l=c=x.clientY,a=!0,h=this.getValue(),u=0,window.addEventListener("mousemove",g),window.addEventListener("mouseup",d)},g=x=>{if(a){const b=x.clientX-o,v=x.clientY-l;Math.abs(v)>f?(x.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(b)>f&&d()}if(!a){const b=x.clientY-c;u-=b*this._step*this._arrowKeyMultiplier(x),h+u>this._max?u=this._max-h:h+u<this._min&&(u=this._min-h),this._snapClampSetValue(h+u)}c=x.clientY},d=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",g),window.removeEventListener("mouseup",d)},p=()=>{this._inputFocused=!0},_=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",i),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",m),this.$input.addEventListener("focus",p),this.$input.addEventListener("blur",_)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(_,x,b,v,M)=>(_-x)/(b-x)*(M-v)+v,e=_=>{const x=this.$slider.getBoundingClientRect();let b=t(_,x.left,x.right,this._min,this._max);this._snapClampSetValue(b)},n=_=>{this._setDraggingStyle(!0),e(_.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)},i=_=>{e(_.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)};let a=!1,o,l;const c=_=>{_.preventDefault(),this._setDraggingStyle(!0),e(_.touches[0].clientX),a=!1},h=_=>{_.touches.length>1||(this._hasScrollBar?(o=_.touches[0].clientX,l=_.touches[0].clientY,a=!0):c(_),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",f))},u=_=>{if(a){const x=_.touches[0].clientX-o,b=_.touches[0].clientY-l;Math.abs(x)>Math.abs(b)?c(_):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",f))}else _.preventDefault(),e(_.touches[0].clientX)},f=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",f)},m=this._callOnFinishChange.bind(this),g=400;let d;const p=_=>{if(Math.abs(_.deltaX)<Math.abs(_.deltaY)&&this._hasScrollBar)return;_.preventDefault();const b=this._normalizeMouseWheel(_)*this._step;this._snapClampSetValue(this.getValue()+b),this.$input.value=this.getValue(),clearTimeout(d),d=setTimeout(m,g)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",p,{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${e}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:n}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,n=-t.wheelDelta/120,n*=this._stepExplicit?1:10),e+-n}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){let e=0;return this._hasMin?e=this._min:this._hasMax&&(e=this._max),t-=e,t=Math.round(t/this._step)*this._step,t+=e,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Wv extends Si{constructor(t,e,n,i){super(t,e,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(i)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(e=>{const n=document.createElement("option");n.textContent=e,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.textContent=e===-1?t:this._names[e],this}}class $v extends Si{constructor(t,e,n){super(t,e,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Xv=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function qv(r){const t=document.createElement("style");t.innerHTML=r;const e=document.querySelector("head link[rel=stylesheet], head style");e?document.head.insertBefore(t,e):document.head.appendChild(t)}let Of=!1;class vg{constructor({parent:t,autoPlace:e=t===void 0,container:n,width:i,title:s="Controls",closeFolders:a=!1,injectStyles:o=!0,touchStyles:l=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!Of&&o&&(qv(Xv),Of=!0),n?n.appendChild(this.domElement):e&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this._closeFolders=a}add(t,e,n,i,s){if(Object(n)===n)return new Wv(this,t,e,n);const a=t[e];switch(typeof a){case"number":return new Hv(this,t,e,n,i,s);case"boolean":return new zv(this,t,e);case"string":return new $v(this,t,e);case"function":return new hc(this,t,e)}console.error(`gui.add failed
	property:`,e,`
	object:`,t,`
	value:`,a)}addColor(t,e,n=1){return new Gv(this,t,e,n)}addFolder(t){const e=new vg({parent:this,title:t});return this.root._closeFolders&&e.close(),e}load(t,e=!0){return t.controllers&&this.controllers.forEach(n=>{n instanceof hc||n._name in t.controllers&&n.load(t.controllers[n._name])}),e&&t.folders&&this.folders.forEach(n=>{n._title in t.folders&&n.load(t.folders[n._title])}),this}save(t=!0){const e={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof hc)){if(n._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);e.controllers[n._name]=n.save()}}),t&&this.folders.forEach(n=>{if(n._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);e.folders[n._title]=n.save()}),e}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const i=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(e=>{t=t.concat(e.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(e=>{t=t.concat(e.foldersRecursive())}),t}}/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Eu="141",hs={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},us={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Yv=0,zf=1,jv=2,xg=1,Zv=2,bo=3,jo=0,ri=1,to=2,Kv=1,gr=0,Gs=1,Nf=2,kf=3,Uf=4,Jv=5,Cs=100,Qv=101,tx=102,Bf=103,Vf=104,ex=200,nx=201,ix=202,rx=203,yg=204,Mg=205,sx=206,ox=207,ax=208,lx=209,cx=210,hx=0,ux=1,fx=2,Ih=3,dx=4,px=5,mx=6,gx=7,kl=0,_x=1,vx=2,Wi=0,xx=1,yx=2,Mx=3,bx=4,Sx=5,bg=300,eo=301,no=302,Fh=303,Oh=304,Ul=306,zh=1e3,ni=1001,Nh=1002,un=1003,Gf=1004,Hf=1005,Vn=1006,wx=1007,Bl=1008,ns=1009,Tx=1010,Ex=1011,Sg=1012,Ax=1013,kr=1014,Ur=1015,Zo=1016,Cx=1017,Lx=1018,Hs=1020,Dx=1021,Px=1022,ii=1023,Rx=1024,Ix=1025,jr=1026,io=1027,Fx=1028,Ox=1029,zx=1030,Nx=1031,kx=1033,uc=33776,fc=33777,dc=33778,pc=33779,Wf=35840,$f=35841,Xf=35842,qf=35843,Ux=36196,Yf=37492,jf=37496,Zf=37808,Kf=37809,Jf=37810,Qf=37811,td=37812,ed=37813,nd=37814,id=37815,rd=37816,sd=37817,od=37818,ad=37819,ld=37820,cd=37821,hd=36492,is=3e3,ge=3001,Bx=3200,Vx=3201,oo=0,Gx=1,ki="srgb",Br="srgb-linear",mc=7680,Hx=519,ud=35044,fd="300 es",kh=1035;class os{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,t);t.target=null}}}const Ne=[];for(let r=0;r<256;r++)Ne[r]=(r<16?"0":"")+r.toString(16);const gc=Math.PI/180,Uh=180/Math.PI;function ta(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[r&255]+Ne[r>>8&255]+Ne[r>>16&255]+Ne[r>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function Qe(r,t,e){return Math.max(t,Math.min(e,r))}function Wx(r,t){return(r%t+t)%t}function _c(r,t,e){return(1-e)*r+e*t}function dd(r){return(r&r-1)===0&&r!==0}function Bh(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}class $t{constructor(t=0,e=0){this.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t,e){return e!==void 0?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this)}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t,e){return e!==void 0?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this)}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e,n){return n!==void 0&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*i+t.x,this.y=s*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class xi{constructor(){this.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}set(t,e,n,i,s,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],m=n[5],g=n[8],d=i[0],p=i[3],_=i[6],x=i[1],b=i[4],v=i[7],M=i[2],w=i[5],E=i[8];return s[0]=a*d+o*x+l*M,s[3]=a*p+o*b+l*w,s[6]=a*_+o*v+l*E,s[1]=c*d+h*x+u*M,s[4]=c*p+h*b+u*w,s[7]=c*_+h*v+u*E,s[2]=f*d+m*x+g*M,s[5]=f*p+m*b+g*w,s[8]=f*_+m*v+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*s,m=c*s-a*l,g=e*u+n*f+i*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const d=1/g;return t[0]=u*d,t[1]=(i*c-h*n)*d,t[2]=(o*n-i*a)*d,t[3]=f*d,t[4]=(h*e-i*l)*d,t[5]=(i*s-o*e)*d,t[6]=m*d,t[7]=(n*l-c*e)*d,t[8]=(a*e-n*s)*d,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=e,n[4]*=e,n[7]*=e,this}rotate(t){const e=Math.cos(t),n=Math.sin(t),i=this.elements,s=i[0],a=i[3],o=i[6],l=i[1],c=i[4],h=i[7];return i[0]=e*s+n*l,i[3]=e*a+n*c,i[6]=e*o+n*h,i[1]=-n*s+e*l,i[4]=-n*a+e*c,i[7]=-n*o+e*h,this}translate(t,e){const n=this.elements;return n[0]+=t*n[2],n[3]+=t*n[5],n[6]+=t*n[8],n[1]+=e*n[2],n[4]+=e*n[5],n[7]+=e*n[8],this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}function wg(r){for(let t=r.length-1;t>=0;--t)if(r[t]>65535)return!0;return!1}function wl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Zr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function el(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const vc={[ki]:{[Br]:Zr},[Br]:{[ki]:el}},Zn={legacyMode:!0,get workingColorSpace(){return Br},set workingColorSpace(r){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(r,t,e){if(this.legacyMode||t===e||!t||!e)return r;if(vc[t]&&vc[t][e]!==void 0){const n=vc[t][e];return r.r=n(r.r),r.g=n(r.g),r.b=n(r.b),r}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)}},Tg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ce={r:0,g:0,b:0},Kn={h:0,s:0,l:0},ya={h:0,s:0,l:0};function xc(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}function Ma(r,t){return t.r=r.r,t.g=r.g,t.b=r.b,t}class Yt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,e===void 0&&n===void 0?this.set(t):this.setRGB(t,e,n)}set(t){return t&&t.isColor?this.copy(t):typeof t=="number"?this.setHex(t):typeof t=="string"&&this.setStyle(t),this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ki){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zn.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Br){return this.r=t,this.g=e,this.b=n,Zn.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Br){if(t=Wx(t,1),e=Qe(e,0,1),n=Qe(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=xc(a,s,t+1/3),this.g=xc(a,s,t),this.b=xc(a,s,t-1/3)}return Zn.toWorkingColorSpace(this,i),this}setStyle(t,e=ki){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,Zn.toWorkingColorSpace(this,e),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,Zn.toWorkingColorSpace(this,e),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const l=parseFloat(s[1])/360,c=parseInt(s[2],10)/100,h=parseInt(s[3],10)/100;return n(s[4]),this.setHSL(l,c,h,e)}break}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],a=s.length;if(a===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,Zn.toWorkingColorSpace(this,e),this;if(a===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,Zn.toWorkingColorSpace(this,e),this}return t&&t.length>0?this.setColorName(t,e):this}setColorName(t,e=ki){const n=Tg[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Zr(t.r),this.g=Zr(t.g),this.b=Zr(t.b),this}copyLinearToSRGB(t){return this.r=el(t.r),this.g=el(t.g),this.b=el(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ki){return Zn.fromWorkingColorSpace(Ma(this,Ce),t),Qe(Ce.r*255,0,255)<<16^Qe(Ce.g*255,0,255)<<8^Qe(Ce.b*255,0,255)<<0}getHexString(t=ki){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Br){Zn.fromWorkingColorSpace(Ma(this,Ce),e);const n=Ce.r,i=Ce.g,s=Ce.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Br){return Zn.fromWorkingColorSpace(Ma(this,Ce),e),t.r=Ce.r,t.g=Ce.g,t.b=Ce.b,t}getStyle(t=ki){return Zn.fromWorkingColorSpace(Ma(this,Ce),t),t!==ki?`color(${t} ${Ce.r} ${Ce.g} ${Ce.b})`:`rgb(${Ce.r*255|0},${Ce.g*255|0},${Ce.b*255|0})`}offsetHSL(t,e,n){return this.getHSL(Kn),Kn.h+=t,Kn.s+=e,Kn.l+=n,this.setHSL(Kn.h,Kn.s,Kn.l),this}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Kn),t.getHSL(ya);const n=_c(Kn.h,ya.h,e),i=_c(Kn.s,ya.s,e),s=_c(Kn.l,ya.l,e);return this.setHSL(n,i,s),this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),t.normalized===!0&&(this.r/=255,this.g/=255,this.b/=255),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}Yt.NAMES=Tg;let fs;class Eg{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{fs===void 0&&(fs=wl("canvas")),fs.width=t.width,fs.height=t.height;const n=fs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=fs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=wl("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Zr(s[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Zr(e[n]/255)*255):e[n]=Zr(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}class Ag{constructor(t=null){this.isSource=!0,this.uuid=ta(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(yc(i[a].image)):s.push(yc(i[a]))}else s=yc(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function yc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Eg.getDataURL(r):r.data?{data:Array.prototype.slice.call(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $x=0;class oi extends os{constructor(t=oi.DEFAULT_IMAGE,e=oi.DEFAULT_MAPPING,n=ni,i=ni,s=Vn,a=Bl,o=ii,l=ns,c=1,h=is){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$x++}),this.uuid=ta(),this.name="",this.source=new Ag(t),this.mipmaps=[],this.mapping=e,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new $t(0,0),this.repeat=new $t(1,1),this.center=new $t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new xi,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.encoding=t.encoding,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==bg)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case zh:t.x=t.x-Math.floor(t.x);break;case ni:t.x=t.x<0?0:1;break;case Nh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case zh:t.y=t.y-Math.floor(t.y);break;case ni:t.y=t.y<0?0:1;break;case Nh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}}oi.DEFAULT_IMAGE=null;oi.DEFAULT_MAPPING=bg;class Ue{constructor(t=0,e=0,n=0,i=1){this.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t,e){return e!==void 0?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this)}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t,e){return e!==void 0?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this)}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],m=l[5],g=l[9],d=l[2],p=l[6],_=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-d)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+d)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+_-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,v=(m+1)/2,M=(_+1)/2,w=(h+f)/4,E=(u+d)/4,y=(g+p)/4;return b>v&&b>M?b<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(b),i=w/n,s=E/n):v>M?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=w/i,s=y/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=E/s,i=y/s),this.set(n,i,s,e),this}let x=Math.sqrt((p-g)*(p-g)+(u-d)*(u-d)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(u-d)/x,this.z=(f-h)/x,this.w=Math.acos((c+m+_-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e,n){return n!==void 0&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _r extends os{constructor(t,e,n={}){super(),this.isWebGLRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ue(0,0,t,e),this.scissorTest=!1,this.viewport=new Ue(0,0,t,e);const i={width:t,height:e,depth:1};this.texture=new oi(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Vn,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ag(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Cg extends oi{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=un,this.minFilter=un,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xx extends oi{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=un,this.minFilter=un,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rs{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerp(t,e,n,i){return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."),n.slerpQuaternions(t,e,i)}static slerpFlat(t,e,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const f=s[a+0],m=s[a+1],g=s[a+2],d=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=m,t[e+2]=g,t[e+3]=d;return}if(u!==d||l!==f||c!==m||h!==g){let p=1-o;const _=l*f+c*m+h*g+u*d,x=_>=0?1:-1,b=1-_*_;if(b>Number.EPSILON){const M=Math.sqrt(b),w=Math.atan2(M,_*x);p=Math.sin(p*w)/M,o=Math.sin(o*w)/M}const v=o*x;if(l=l*p+f*v,c=c*p+m*v,h=h*p+g*v,u=u*p+d*v,p===1-o){const M=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=M,c*=M,h*=M,u*=M}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],f=s[a+1],m=s[a+2],g=s[a+3];return t[e]=o*g+h*u+l*m-c*f,t[e+1]=l*g+h*f+c*u-o*m,t[e+2]=c*g+h*m+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){if(!(t&&t.isEuler))throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");const n=t._x,i=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),f=l(n/2),m=l(i/2),g=l(s/2);switch(a){case"XYZ":this._x=f*h*u+c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u-f*m*g;break;case"YXZ":this._x=f*h*u+c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u+f*m*g;break;case"ZXY":this._x=f*h*u-c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u-f*m*g;break;case"ZYX":this._x=f*h*u-c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u+f*m*g;break;case"YZX":this._x=f*h*u+c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u-f*m*g;break;case"XZY":this._x=f*h*u-c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e!==!1&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-l)*m,this._y=(s-c)*m,this._z=(a-i)*m}else if(n>o&&n>u){const m=2*Math.sqrt(1+n-o-u);this._w=(h-l)/m,this._x=.25*m,this._y=(i+a)/m,this._z=(s+c)/m}else if(o>u){const m=2*Math.sqrt(1+o-n-u);this._w=(s-c)/m,this._x=(i+a)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-n-o);this._w=(a-i)/m,this._x=(s+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t,e){return e!==void 0?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(t,e)):this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*i+e*this._y,this._z=m*s+e*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(s),n*Math.cos(s),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(t=0,e=0,n=0){this.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t,e){return e!==void 0?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this)}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t,e){return e!==void 0?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this)}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t,e){return e!==void 0?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(t,e)):(this.x*=t.x,this.y*=t.y,this.z*=t.z,this)}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return t&&t.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(pd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(pd.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=l*e+a*i-o*n,h=l*n+o*e-s*i,u=l*i+s*n-a*e,f=-s*e-a*n-o*i;return this.x=c*l+f*-s+h*-o-u*-a,this.y=h*l+f*-a+u*-s-c*-o,this.z=u*l+f*-o+c*-a-h*-s,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t,e){return e!==void 0?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(t,e)):this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Mc.copy(this).projectOnVector(t),this.sub(Mc)}reflect(t){return this.sub(Mc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Qe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e,n){return n!==void 0&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Mc=new G,pd=new rs;class ea{constructor(t=new G(1/0,1/0,1/0),e=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){let e=1/0,n=1/0,i=1/0,s=-1/0,a=-1/0,o=-1/0;for(let l=0,c=t.length;l<c;l+=3){const h=t[l],u=t[l+1],f=t[l+2];h<e&&(e=h),u<n&&(n=u),f<i&&(i=f),h>s&&(s=h),u>a&&(a=u),f>o&&(o=f)}return this.min.set(e,n,i),this.max.set(s,a,o),this}setFromBufferAttribute(t){let e=1/0,n=1/0,i=1/0,s=-1/0,a=-1/0,o=-1/0;for(let l=0,c=t.count;l<c;l++){const h=t.getX(l),u=t.getY(l),f=t.getZ(l);h<e&&(e=h),u<n&&(n=u),f<i&&(i=f),h>s&&(s=h),u>a&&(a=u),f>o&&(o=f)}return this.min.set(e,n,i),this.max.set(s,a,o),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Tr.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0)if(e&&n.attributes!=null&&n.attributes.position!==void 0){const s=n.attributes.position;for(let a=0,o=s.count;a<o;a++)Tr.fromBufferAttribute(s,a).applyMatrix4(t.matrixWorld),this.expandByPoint(Tr)}else n.boundingBox===null&&n.computeBoundingBox(),bc.copy(n.boundingBox),bc.applyMatrix4(t.matrixWorld),this.union(bc);const i=t.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Tr),Tr.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(uo),ba.subVectors(this.max,uo),ds.subVectors(t.a,uo),ps.subVectors(t.b,uo),ms.subVectors(t.c,uo),Zi.subVectors(ps,ds),Ki.subVectors(ms,ps),Er.subVectors(ds,ms);let e=[0,-Zi.z,Zi.y,0,-Ki.z,Ki.y,0,-Er.z,Er.y,Zi.z,0,-Zi.x,Ki.z,0,-Ki.x,Er.z,0,-Er.x,-Zi.y,Zi.x,0,-Ki.y,Ki.x,0,-Er.y,Er.x,0];return!Sc(e,ds,ps,ms,ba)||(e=[1,0,0,0,1,0,0,0,1],!Sc(e,ds,ps,ms,ba))?!1:(Sa.crossVectors(Zi,Ki),e=[Sa.x,Sa.y,Sa.z],Sc(e,ds,ps,ms,ba))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return Tr.copy(t).clamp(this.min,this.max).sub(t).length()}getBoundingSphere(t){return this.getCenter(t.center),t.radius=this.getSize(Tr).length()*.5,t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Di),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Di=[new G,new G,new G,new G,new G,new G,new G,new G],Tr=new G,bc=new ea,ds=new G,ps=new G,ms=new G,Zi=new G,Ki=new G,Er=new G,uo=new G,ba=new G,Sa=new G,Ar=new G;function Sc(r,t,e,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Ar.fromArray(r,s);const o=i.x*Math.abs(Ar.x)+i.y*Math.abs(Ar.y)+i.z*Math.abs(Ar.z),l=t.dot(Ar),c=e.dot(Ar),h=n.dot(Ar);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const qx=new ea,md=new G,wa=new G,wc=new G;class Vl{constructor(t=new G,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):qx.setFromPoints(t).getCenter(n);let i=0;for(let s=0,a=t.length;s<a;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){wc.subVectors(t,this.center);const e=wc.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.add(wc.multiplyScalar(i/n)),this.radius+=i}return this}union(t){return this.center.equals(t.center)===!0?wa.set(0,0,1).multiplyScalar(t.radius):wa.subVectors(t.center,this.center).normalize().multiplyScalar(t.radius),this.expandByPoint(md.copy(t.center).add(wa)),this.expandByPoint(md.copy(t.center).sub(wa)),this}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Pi=new G,Tc=new G,Ta=new G,Ji=new G,Ec=new G,Ea=new G,Ac=new G;class Lg{constructor(t=new G,e=new G(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.direction).multiplyScalar(t).add(this.origin)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Pi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pi.copy(this.direction).multiplyScalar(e).add(this.origin),Pi.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Tc.copy(t).add(e).multiplyScalar(.5),Ta.copy(e).sub(t).normalize(),Ji.copy(this.origin).sub(Tc);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Ta),o=Ji.dot(this.direction),l=-Ji.dot(Ta),c=Ji.lengthSq(),h=Math.abs(1-a*a);let u,f,m,g;if(h>0)if(u=a*l-o,f=a*o-l,g=s*h,u>=0)if(f>=-g)if(f<=g){const d=1/h;u*=d,f*=d,m=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=s,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*s+o)),f=u>0?-s:Math.min(Math.max(-s,-l),s),m=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-s,-l),s),m=f*(f+2*l)+c):(u=Math.max(0,-(a*s+o)),f=u>0?s:Math.min(Math.max(-s,-l),s),m=-u*u+f*(f+2*l)+c);else f=a>0?-s:s,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;return n&&n.copy(this.direction).multiplyScalar(u).add(this.origin),i&&i.copy(Ta).multiplyScalar(f).add(Tc),m}intersectSphere(t,e){Pi.subVectors(t.center,this.origin);const n=Pi.dot(this.direction),i=Pi.dot(Pi)-n*n,s=t.radius*t.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return o<0&&l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(s=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(s=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||s>i||((s>n||n!==n)&&(n=s),(a<i||i!==i)&&(i=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Pi)!==null}intersectTriangle(t,e,n,i,s){Ec.subVectors(e,t),Ea.subVectors(n,t),Ac.crossVectors(Ec,Ea);let a=this.direction.dot(Ac),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ji.subVectors(this.origin,t);const l=o*this.direction.dot(Ea.crossVectors(Ji,Ea));if(l<0)return null;const c=o*this.direction.dot(Ec.cross(Ji));if(c<0||l+c>a)return null;const h=-o*Ji.dot(Ac);return h<0?null:this.at(h/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pe{constructor(){this.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}set(t,e,n,i,s,a,o,l,c,h,u,f,m,g,d,p){const _=this.elements;return _[0]=t,_[4]=e,_[8]=n,_[12]=i,_[1]=s,_[5]=a,_[9]=o,_[13]=l,_[2]=c,_[6]=h,_[10]=u,_[14]=f,_[3]=m,_[7]=g,_[11]=d,_[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/gs.setFromMatrixColumn(t,0).length(),s=1/gs.setFromMatrixColumn(t,1).length(),a=1/gs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){t&&t.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");const e=this.elements,n=t.x,i=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const f=a*h,m=a*u,g=o*h,d=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=m+g*c,e[5]=f-d*c,e[9]=-o*l,e[2]=d-f*c,e[6]=g+m*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,m=l*u,g=c*h,d=c*u;e[0]=f+d*o,e[4]=g*o-m,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=m*o-g,e[6]=d+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,m=l*u,g=c*h,d=c*u;e[0]=f-d*o,e[4]=-a*u,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*h,e[9]=d-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,m=a*u,g=o*h,d=o*u;e[0]=l*h,e[4]=g*c-m,e[8]=f*c+d,e[1]=l*u,e[5]=d*c+f,e[9]=m*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,m=a*c,g=o*l,d=o*c;e[0]=l*h,e[4]=d-f*u,e[8]=g*u+m,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*u+g,e[10]=f-d*u}else if(t.order==="XZY"){const f=a*l,m=a*c,g=o*l,d=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+d,e[5]=a*h,e[9]=m*u-g,e[2]=g*u-m,e[6]=o*h,e[10]=d*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Yx,t,jx)}lookAt(t,e,n){const i=this.elements;return Mn.subVectors(t,e),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),Qi.crossVectors(n,Mn),Qi.lengthSq()===0&&(Math.abs(n.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),Qi.crossVectors(n,Mn)),Qi.normalize(),Aa.crossVectors(Mn,Qi),i[0]=Qi.x,i[4]=Aa.x,i[8]=Mn.x,i[1]=Qi.y,i[5]=Aa.y,i[9]=Mn.y,i[2]=Qi.z,i[6]=Aa.z,i[10]=Mn.z,this}multiply(t,e){return e!==void 0?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(t,e)):this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],m=n[13],g=n[2],d=n[6],p=n[10],_=n[14],x=n[3],b=n[7],v=n[11],M=n[15],w=i[0],E=i[4],y=i[8],S=i[12],L=i[1],R=i[5],F=i[9],j=i[13],I=i[2],V=i[6],N=i[10],U=i[14],H=i[3],k=i[7],C=i[11],Z=i[15];return s[0]=a*w+o*L+l*I+c*H,s[4]=a*E+o*R+l*V+c*k,s[8]=a*y+o*F+l*N+c*C,s[12]=a*S+o*j+l*U+c*Z,s[1]=h*w+u*L+f*I+m*H,s[5]=h*E+u*R+f*V+m*k,s[9]=h*y+u*F+f*N+m*C,s[13]=h*S+u*j+f*U+m*Z,s[2]=g*w+d*L+p*I+_*H,s[6]=g*E+d*R+p*V+_*k,s[10]=g*y+d*F+p*N+_*C,s[14]=g*S+d*j+p*U+_*Z,s[3]=x*w+b*L+v*I+M*H,s[7]=x*E+b*R+v*V+M*k,s[11]=x*y+b*F+v*N+M*C,s[15]=x*S+b*j+v*U+M*Z,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],m=t[14],g=t[3],d=t[7],p=t[11],_=t[15];return g*(+s*l*u-i*c*u-s*o*f+n*c*f+i*o*m-n*l*m)+d*(+e*l*m-e*c*f+s*a*f-i*a*m+i*c*h-s*l*h)+p*(+e*c*u-e*o*m-s*a*u+n*a*m+s*o*h-n*c*h)+_*(-i*o*h-e*l*u+e*o*f+i*a*u-n*a*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],m=t[11],g=t[12],d=t[13],p=t[14],_=t[15],x=u*p*c-d*f*c+d*l*m-o*p*m-u*l*_+o*f*_,b=g*f*c-h*p*c-g*l*m+a*p*m+h*l*_-a*f*_,v=h*d*c-g*u*c+g*o*m-a*d*m-h*o*_+a*u*_,M=g*u*l-h*d*l-g*o*f+a*d*f+h*o*p-a*u*p,w=e*x+n*b+i*v+s*M;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/w;return t[0]=x*E,t[1]=(d*f*s-u*p*s-d*i*m+n*p*m+u*i*_-n*f*_)*E,t[2]=(o*p*s-d*l*s+d*i*c-n*p*c-o*i*_+n*l*_)*E,t[3]=(u*l*s-o*f*s-u*i*c+n*f*c+o*i*m-n*l*m)*E,t[4]=b*E,t[5]=(h*p*s-g*f*s+g*i*m-e*p*m-h*i*_+e*f*_)*E,t[6]=(g*l*s-a*p*s-g*i*c+e*p*c+a*i*_-e*l*_)*E,t[7]=(a*f*s-h*l*s+h*i*c-e*f*c-a*i*m+e*l*m)*E,t[8]=v*E,t[9]=(g*u*s-h*d*s-g*n*m+e*d*m+h*n*_-e*u*_)*E,t[10]=(a*d*s-g*o*s+g*n*c-e*d*c-a*n*_+e*o*_)*E,t[11]=(h*o*s-a*u*s-h*n*c+e*u*c+a*n*m-e*o*m)*E,t[12]=M*E,t[13]=(h*d*i-g*u*i+g*n*f-e*d*f-h*n*p+e*u*p)*E,t[14]=(g*o*i-a*d*i-g*n*l+e*d*l+a*n*p-e*o*p)*E,t[15]=(a*u*i-h*o*i+h*n*l-e*u*l-a*n*f+e*o*f)*E,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,a){return this.set(1,n,s,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,h=a+a,u=o+o,f=s*c,m=s*h,g=s*u,d=a*h,p=a*u,_=o*u,x=l*c,b=l*h,v=l*u,M=n.x,w=n.y,E=n.z;return i[0]=(1-(d+_))*M,i[1]=(m+v)*M,i[2]=(g-b)*M,i[3]=0,i[4]=(m-v)*w,i[5]=(1-(f+_))*w,i[6]=(p+x)*w,i[7]=0,i[8]=(g+b)*E,i[9]=(p-x)*E,i[10]=(1-(f+d))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=gs.set(i[0],i[1],i[2]).length();const a=gs.set(i[4],i[5],i[6]).length(),o=gs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Jn.copy(this);const c=1/s,h=1/a,u=1/o;return Jn.elements[0]*=c,Jn.elements[1]*=c,Jn.elements[2]*=c,Jn.elements[4]*=h,Jn.elements[5]*=h,Jn.elements[6]*=h,Jn.elements[8]*=u,Jn.elements[9]*=u,Jn.elements[10]*=u,e.setFromRotationMatrix(Jn),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,i,s,a){a===void 0&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");const o=this.elements,l=2*s/(e-t),c=2*s/(n-i),h=(e+t)/(e-t),u=(n+i)/(n-i),f=-(a+s)/(a-s),m=-2*a*s/(a-s);return o[0]=l,o[4]=0,o[8]=h,o[12]=0,o[1]=0,o[5]=c,o[9]=u,o[13]=0,o[2]=0,o[6]=0,o[10]=f,o[14]=m,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(t,e,n,i,s,a){const o=this.elements,l=1/(e-t),c=1/(n-i),h=1/(a-s),u=(e+t)*l,f=(n+i)*c,m=(a+s)*h;return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-u,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-f,o[2]=0,o[6]=0,o[10]=-2*h,o[14]=-m,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const gs=new G,Jn=new Pe,Yx=new G(0,0,0),jx=new G(1,1,1),Qi=new G,Aa=new G,Mn=new G,gd=new Pe,_d=new rs;class na{constructor(t=0,e=0,n=0,i=na.DefaultOrder){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],m=i[10];switch(e){case"XYZ":this._y=Math.asin(Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return gd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(gd,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return _d.setFromEuler(this),this.setFromQuaternion(_d,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}}na.DefaultOrder="XYZ";na.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class Dg{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Zx=0;const vd=new G,_s=new rs,Ri=new Pe,Ca=new G,fo=new G,Kx=new G,Jx=new rs,xd=new G(1,0,0),yd=new G(0,1,0),Md=new G(0,0,1),Qx={type:"added"},bd={type:"removed"};class rn extends os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zx++}),this.uuid=ta(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=rn.DefaultUp.clone();const t=new G,e=new na,n=new rs,i=new G(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Pe},normalMatrix:{value:new xi}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=rn.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new Dg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return _s.setFromAxisAngle(t,e),this.quaternion.multiply(_s),this}rotateOnWorldAxis(t,e){return _s.setFromAxisAngle(t,e),this.quaternion.premultiply(_s),this}rotateX(t){return this.rotateOnAxis(xd,t)}rotateY(t){return this.rotateOnAxis(yd,t)}rotateZ(t){return this.rotateOnAxis(Md,t)}translateOnAxis(t,e){return vd.copy(t).applyQuaternion(this.quaternion),this.position.add(vd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(xd,t)}translateY(t){return this.translateOnAxis(yd,t)}translateZ(t){return this.translateOnAxis(Md,t)}localToWorld(t){return t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return t.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ca.copy(t):Ca.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),fo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(fo,Ca,this.up):Ri.lookAt(Ca,fo,this.up),this.quaternion.setFromRotationMatrix(Ri),i&&(Ri.extractRotation(i.matrixWorld),_s.setFromRotationMatrix(Ri),this.quaternion.premultiply(_s.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Qx)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(bd)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){for(let t=0;t<this.children.length;t++){const e=this.children[t];e.parent=null,e.dispatchEvent(bd)}return this.children.length=0,this}attach(t){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ri.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ri),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fo,t,Kx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fo,Jx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));i.material=o}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}rn.DefaultUp=new G(0,1,0);rn.DefaultMatrixAutoUpdate=!0;const Qn=new G,Ii=new G,Cc=new G,Fi=new G,vs=new G,xs=new G,Sd=new G,Lc=new G,Dc=new G,Pc=new G;class Vi{constructor(t=new G,e=new G,n=new G){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Qn.subVectors(t,e),i.cross(Qn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Qn.subVectors(i,e),Ii.subVectors(n,e),Cc.subVectors(t,e);const a=Qn.dot(Qn),o=Qn.dot(Ii),l=Qn.dot(Cc),c=Ii.dot(Ii),h=Ii.dot(Cc),u=a*c-o*o;if(u===0)return s.set(-2,-1,-1);const f=1/u,m=(c*l-o*h)*f,g=(a*h-o*l)*f;return s.set(1-m-g,g,m)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Fi),Fi.x>=0&&Fi.y>=0&&Fi.x+Fi.y<=1}static getUV(t,e,n,i,s,a,o,l){return this.getBarycoord(t,e,n,i,Fi),l.set(0,0),l.addScaledVector(s,Fi.x),l.addScaledVector(a,Fi.y),l.addScaledVector(o,Fi.z),l}static isFrontFacing(t,e,n,i){return Qn.subVectors(n,e),Ii.subVectors(t,e),Qn.cross(Ii).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Qn.subVectors(this.c,this.b),Ii.subVectors(this.a,this.b),Qn.cross(Ii).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Vi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Vi.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,s){return Vi.getUV(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return Vi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Vi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let a,o;vs.subVectors(i,n),xs.subVectors(s,n),Lc.subVectors(t,n);const l=vs.dot(Lc),c=xs.dot(Lc);if(l<=0&&c<=0)return e.copy(n);Dc.subVectors(t,i);const h=vs.dot(Dc),u=xs.dot(Dc);if(h>=0&&u<=h)return e.copy(i);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(vs,a);Pc.subVectors(t,s);const m=vs.dot(Pc),g=xs.dot(Pc);if(g>=0&&m<=g)return e.copy(s);const d=m*c-l*g;if(d<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(xs,o);const p=h*g-m*u;if(p<=0&&u-h>=0&&m-g>=0)return Sd.subVectors(s,i),o=(u-h)/(u-h+(m-g)),e.copy(i).addScaledVector(Sd,o);const _=1/(p+d+f);return a=d*_,o=f*_,e.copy(n).addScaledVector(vs,a).addScaledVector(xs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}let ty=0;class Be extends os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ty++}),this.uuid=ta(),this.name="",this.type="Material",this.blending=Gs,this.side=jo,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=yg,this.blendDst=Mg,this.blendEquation=Cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Ih,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hx,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mc,this.stencilZFail=mc,this.stencilZPass=mc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn("THREE.Material: '"+e+"' parameter is undefined.");continue}if(e==="shading"){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=n===Kv;continue}const i=this[e];if(i===void 0){console.warn("THREE."+this.type+": '"+e+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gs&&(n.blending=this.blending),this.side!==jo&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=i(t.textures),a=i(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}get vertexTangents(){return console.warn("THREE."+this.type+": .vertexTangents has been removed."),!1}set vertexTangents(t){console.warn("THREE."+this.type+": .vertexTangents has been removed.")}}Be.fromType=function(){return null};class Au extends Be{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=kl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Te=new G,La=new $t;class wi{constructor(t,e,n){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n===!0,this.usage=ud,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}copyColorsArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let a=t[i];a===void 0&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",i),a=new Yt),e[n++]=a.r,e[n++]=a.g,e[n++]=a.b}return this}copyVector2sArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let a=t[i];a===void 0&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",i),a=new $t),e[n++]=a.x,e[n++]=a.y}return this}copyVector3sArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let a=t[i];a===void 0&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",i),a=new G),e[n++]=a.x,e[n++]=a.y,e[n++]=a.z}return this}copyVector4sArray(t){const e=this.array;let n=0;for(let i=0,s=t.length;i<s;i++){let a=t[i];a===void 0&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",i),a=new Ue),e[n++]=a.x,e[n++]=a.y,e[n++]=a.z,e[n++]=a.w}return this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)La.fromBufferAttribute(this,e),La.applyMatrix3(t),this.setXY(e,La.x,La.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getX(t){return this.array[t*this.itemSize]}setX(t,e){return this.array[t*this.itemSize]=e,this}getY(t){return this.array[t*this.itemSize+1]}setY(t,e){return this.array[t*this.itemSize+1]=e,this}getZ(t){return this.array[t*this.itemSize+2]}setZ(t,e){return this.array[t*this.itemSize+2]=e,this}getW(t){return this.array[t*this.itemSize+3]}setW(t,e){return this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.prototype.slice.call(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ud&&(t.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(t.updateRange=this.updateRange),t}}class Pg extends wi{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Rg extends wi{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class _n extends wi{constructor(t,e,n){super(new Float32Array(t),e,n)}}let ey=0;const Nn=new Pe,Rc=new rn,ys=new G,bn=new ea,po=new ea,Re=new G;class Ci extends os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ey++}),this.uuid=ta(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(wg(t)?Rg:Pg)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new xi().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Nn.makeRotationFromQuaternion(t),this.applyMatrix4(Nn),this}rotateX(t){return Nn.makeRotationX(t),this.applyMatrix4(Nn),this}rotateY(t){return Nn.makeRotationY(t),this.applyMatrix4(Nn),this}rotateZ(t){return Nn.makeRotationZ(t),this.applyMatrix4(Nn),this}translate(t,e,n){return Nn.makeTranslation(t,e,n),this.applyMatrix4(Nn),this}scale(t,e,n){return Nn.makeScale(t,e,n),this.applyMatrix4(Nn),this}lookAt(t){return Rc.lookAt(t),Rc.updateMatrix(),this.applyMatrix4(Rc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ys).negate(),this.translate(ys.x,ys.y,ys.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new _n(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ea);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];bn.setFromBufferAttribute(s),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vl);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new G,1/0);return}if(t){const n=this.boundingSphere.center;if(bn.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];po.setFromBufferAttribute(o),this.morphTargetsRelative?(Re.addVectors(bn.min,po.min),bn.expandByPoint(Re),Re.addVectors(bn.max,po.max),bn.expandByPoint(Re)):(bn.expandByPoint(po.min),bn.expandByPoint(po.max))}bn.getCenter(n);let i=0;for(let s=0,a=t.count;s<a;s++)Re.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Re));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Re.fromBufferAttribute(o,c),l&&(ys.fromBufferAttribute(t,c),Re.add(ys)),i=Math.max(i,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,s=e.normal.array,a=e.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wi(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let L=0;L<o;L++)c[L]=new G,h[L]=new G;const u=new G,f=new G,m=new G,g=new $t,d=new $t,p=new $t,_=new G,x=new G;function b(L,R,F){u.fromArray(i,L*3),f.fromArray(i,R*3),m.fromArray(i,F*3),g.fromArray(a,L*2),d.fromArray(a,R*2),p.fromArray(a,F*2),f.sub(u),m.sub(u),d.sub(g),p.sub(g);const j=1/(d.x*p.y-p.x*d.y);isFinite(j)&&(_.copy(f).multiplyScalar(p.y).addScaledVector(m,-d.y).multiplyScalar(j),x.copy(m).multiplyScalar(d.x).addScaledVector(f,-p.x).multiplyScalar(j),c[L].add(_),c[R].add(_),c[F].add(_),h[L].add(x),h[R].add(x),h[F].add(x))}let v=this.groups;v.length===0&&(v=[{start:0,count:n.length}]);for(let L=0,R=v.length;L<R;++L){const F=v[L],j=F.start,I=F.count;for(let V=j,N=j+I;V<N;V+=3)b(n[V+0],n[V+1],n[V+2])}const M=new G,w=new G,E=new G,y=new G;function S(L){E.fromArray(s,L*3),y.copy(E);const R=c[L];M.copy(R),M.sub(E.multiplyScalar(E.dot(R))).normalize(),w.crossVectors(y,R);const j=w.dot(h[L])<0?-1:1;l[L*4]=M.x,l[L*4+1]=M.y,l[L*4+2]=M.z,l[L*4+3]=j}for(let L=0,R=v.length;L<R;++L){const F=v[L],j=F.start,I=F.count;for(let V=j,N=j+I;V<N;V+=3)S(n[V+0]),S(n[V+1]),S(n[V+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new wi(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const i=new G,s=new G,a=new G,o=new G,l=new G,c=new G,h=new G,u=new G;if(t)for(let f=0,m=t.count;f<m;f+=3){const g=t.getX(f+0),d=t.getX(f+1),p=t.getX(f+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,d),a.fromBufferAttribute(e,p),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,d),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(d,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=e.count;f<m;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(t,e){if(!(t&&t.isBufferGeometry)){console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",t);return}e===void 0&&(e=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));const n=this.attributes;for(const i in n){if(t.attributes[i]===void 0)continue;const a=n[i].array,o=t.attributes[i],l=o.array,c=o.itemSize*e,h=Math.min(l.length,a.length-c);for(let u=0,f=c;u<h;u++,f++)a[f]=l[u]}return this}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let m=0,g=0;for(let d=0,p=l.length;d<p;d++){o.isInterleavedBufferAttribute?m=l[d]*o.data.stride+o.offset:m=l[d]*h;for(let _=0;_<h;_++)f[g++]=c[m++]}return new wi(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ci,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],m=t(f,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const m=c[u];h.push(m.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let f=0,m=u.length;f<m;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,t.parameters!==void 0&&(this.parameters=Object.assign({},t.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const wd=new Pe,Ms=new Lg,Ic=new Vl,tr=new G,er=new G,nr=new G,Fc=new G,Oc=new G,zc=new G,Da=new G,Pa=new G,Ra=new G,Ia=new $t,Fa=new $t,Oa=new $t,Nc=new G,za=new G;class hr extends rn{constructor(t=new Ci,e=new Au){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Ic.copy(n.boundingSphere),Ic.applyMatrix4(s),t.ray.intersectsSphere(Ic)===!1)||(wd.copy(s).invert(),Ms.copy(t.ray).applyMatrix4(wd),n.boundingBox!==null&&Ms.intersectsBox(n.boundingBox)===!1))return;let a;const o=n.index,l=n.attributes.position,c=n.morphAttributes.position,h=n.morphTargetsRelative,u=n.attributes.uv,f=n.attributes.uv2,m=n.groups,g=n.drawRange;if(o!==null)if(Array.isArray(i))for(let d=0,p=m.length;d<p;d++){const _=m[d],x=i[_.materialIndex],b=Math.max(_.start,g.start),v=Math.min(o.count,Math.min(_.start+_.count,g.start+g.count));for(let M=b,w=v;M<w;M+=3){const E=o.getX(M),y=o.getX(M+1),S=o.getX(M+2);a=Na(this,x,t,Ms,l,c,h,u,f,E,y,S),a&&(a.faceIndex=Math.floor(M/3),a.face.materialIndex=_.materialIndex,e.push(a))}}else{const d=Math.max(0,g.start),p=Math.min(o.count,g.start+g.count);for(let _=d,x=p;_<x;_+=3){const b=o.getX(_),v=o.getX(_+1),M=o.getX(_+2);a=Na(this,i,t,Ms,l,c,h,u,f,b,v,M),a&&(a.faceIndex=Math.floor(_/3),e.push(a))}}else if(l!==void 0)if(Array.isArray(i))for(let d=0,p=m.length;d<p;d++){const _=m[d],x=i[_.materialIndex],b=Math.max(_.start,g.start),v=Math.min(l.count,Math.min(_.start+_.count,g.start+g.count));for(let M=b,w=v;M<w;M+=3){const E=M,y=M+1,S=M+2;a=Na(this,x,t,Ms,l,c,h,u,f,E,y,S),a&&(a.faceIndex=Math.floor(M/3),a.face.materialIndex=_.materialIndex,e.push(a))}}else{const d=Math.max(0,g.start),p=Math.min(l.count,g.start+g.count);for(let _=d,x=p;_<x;_+=3){const b=_,v=_+1,M=_+2;a=Na(this,i,t,Ms,l,c,h,u,f,b,v,M),a&&(a.faceIndex=Math.floor(_/3),e.push(a))}}}}function ny(r,t,e,n,i,s,a,o){let l;if(t.side===ri?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,t.side!==to,o),l===null)return null;za.copy(o),za.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(za);return c<e.near||c>e.far?null:{distance:c,point:za.clone(),object:r}}function Na(r,t,e,n,i,s,a,o,l,c,h,u){tr.fromBufferAttribute(i,c),er.fromBufferAttribute(i,h),nr.fromBufferAttribute(i,u);const f=r.morphTargetInfluences;if(s&&f){Da.set(0,0,0),Pa.set(0,0,0),Ra.set(0,0,0);for(let g=0,d=s.length;g<d;g++){const p=f[g],_=s[g];p!==0&&(Fc.fromBufferAttribute(_,c),Oc.fromBufferAttribute(_,h),zc.fromBufferAttribute(_,u),a?(Da.addScaledVector(Fc,p),Pa.addScaledVector(Oc,p),Ra.addScaledVector(zc,p)):(Da.addScaledVector(Fc.sub(tr),p),Pa.addScaledVector(Oc.sub(er),p),Ra.addScaledVector(zc.sub(nr),p)))}tr.add(Da),er.add(Pa),nr.add(Ra)}r.isSkinnedMesh&&(r.boneTransform(c,tr),r.boneTransform(h,er),r.boneTransform(u,nr));const m=ny(r,t,e,n,tr,er,nr,Nc);if(m){o&&(Ia.fromBufferAttribute(o,c),Fa.fromBufferAttribute(o,h),Oa.fromBufferAttribute(o,u),m.uv=Vi.getUV(Nc,tr,er,nr,Ia,Fa,Oa,new $t)),l&&(Ia.fromBufferAttribute(l,c),Fa.fromBufferAttribute(l,h),Oa.fromBufferAttribute(l,u),m.uv2=Vi.getUV(Nc,tr,er,nr,Ia,Fa,Oa,new $t));const g={a:c,b:h,c:u,normal:new G,materialIndex:0};Vi.getNormal(tr,er,nr,g.normal),m.face=g}return m}class ia extends Ci{constructor(t=1,e=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,m=0;g("z","y","x",-1,-1,n,e,t,a,s,0),g("z","y","x",1,-1,n,e,-t,a,s,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new _n(c,3)),this.setAttribute("normal",new _n(h,3)),this.setAttribute("uv",new _n(u,2));function g(d,p,_,x,b,v,M,w,E,y,S){const L=v/E,R=M/y,F=v/2,j=M/2,I=w/2,V=E+1,N=y+1;let U=0,H=0;const k=new G;for(let C=0;C<N;C++){const Z=C*R-j;for(let z=0;z<V;z++){const K=z*L-F;k[d]=K*x,k[p]=Z*b,k[_]=I,c.push(k.x,k.y,k.z),k[d]=0,k[p]=0,k[_]=w>0?1:-1,h.push(k.x,k.y,k.z),u.push(z/E),u.push(1-C/y),U+=1}}for(let C=0;C<y;C++)for(let Z=0;Z<E;Z++){const z=f+Z+V*C,K=f+Z+V*(C+1),J=f+(Z+1)+V*(C+1),q=f+(Z+1)+V*C;l.push(z,K,q),l.push(K,J,q),H+=6}o.addGroup(m,H,S),m+=H,f+=U}}static fromJSON(t){return new ia(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ro(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ge(r){const t={};for(let e=0;e<r.length;e++){const n=ro(r[e]);for(const i in n)t[i]=n[i]}return t}const iy={clone:ro,merge:Ge};var ry=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yi extends Be{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader=ry,this.fragmentShader=sy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&(t.attributes!==void 0&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(t))}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ro(t.uniforms),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Ig extends rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(-e[8],-e[9],-e[10]).normalize()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Gn extends Ig{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Uh*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(gc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Uh*2*Math.atan(Math.tan(gc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(gc*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const bs=90,Ss=1;class oy extends rn{constructor(t,e,n){if(super(),this.type="CubeCamera",n.isWebGLCubeRenderTarget!==!0){console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");return}this.renderTarget=n;const i=new Gn(bs,Ss,t,e);i.layers=this.layers,i.up.set(0,-1,0),i.lookAt(new G(1,0,0)),this.add(i);const s=new Gn(bs,Ss,t,e);s.layers=this.layers,s.up.set(0,-1,0),s.lookAt(new G(-1,0,0)),this.add(s);const a=new Gn(bs,Ss,t,e);a.layers=this.layers,a.up.set(0,0,1),a.lookAt(new G(0,1,0)),this.add(a);const o=new Gn(bs,Ss,t,e);o.layers=this.layers,o.up.set(0,0,-1),o.lookAt(new G(0,-1,0)),this.add(o);const l=new Gn(bs,Ss,t,e);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new G(0,0,1)),this.add(l);const c=new Gn(bs,Ss,t,e);c.layers=this.layers,c.up.set(0,-1,0),c.lookAt(new G(0,0,-1)),this.add(c)}update(t,e){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,s,a,o,l,c]=this.children,h=t.getRenderTarget(),u=t.toneMapping,f=t.xr.enabled;t.toneMapping=Wi,t.xr.enabled=!1;const m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0),t.render(e,i),t.setRenderTarget(n,1),t.render(e,s),t.setRenderTarget(n,2),t.render(e,a),t.setRenderTarget(n,3),t.render(e,o),t.setRenderTarget(n,4),t.render(e,l),n.texture.generateMipmaps=m,t.setRenderTarget(n,5),t.render(e,c),t.setRenderTarget(h),t.toneMapping=u,t.xr.enabled=f,n.texture.needsPMREMUpdate=!0}}class Fg extends oi{constructor(t,e,n,i,s,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:eo,super(t,e,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ay extends _r{constructor(t,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Fg(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Vn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.encoding=e.encoding,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ia(5,5,5),s=new Yi({name:"CubemapFromEquirect",uniforms:ro(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ri,blending:gr});s.uniforms.tEquirect.value=e;const a=new hr(i,s),o=e.minFilter;return e.minFilter===Bl&&(e.minFilter=Vn),new oy(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(s)}}const kc=new G,ly=new G,cy=new xi;class Pr{constructor(t=new G(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=kc.subVectors(n,e).cross(ly.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)}intersectLine(t,e){const n=t.delta(kc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(n).multiplyScalar(s).add(t.start)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||cy.getNormalMatrix(t),i=this.coplanarPoint(kc).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ws=new Vl,ka=new G;class Cu{constructor(t=new Pr,e=new Pr,n=new Pr,i=new Pr,s=new Pr,a=new Pr){this.planes=[t,e,n,i,s,a]}set(t,e,n,i,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t){const e=this.planes,n=t.elements,i=n[0],s=n[1],a=n[2],o=n[3],l=n[4],c=n[5],h=n[6],u=n[7],f=n[8],m=n[9],g=n[10],d=n[11],p=n[12],_=n[13],x=n[14],b=n[15];return e[0].setComponents(o-i,u-l,d-f,b-p).normalize(),e[1].setComponents(o+i,u+l,d+f,b+p).normalize(),e[2].setComponents(o+s,u+c,d+m,b+_).normalize(),e[3].setComponents(o-s,u-c,d-m,b-_).normalize(),e[4].setComponents(o-a,u-h,d-g,b-x).normalize(),e[5].setComponents(o+a,u+h,d+g,b+x).normalize(),this}intersectsObject(t){const e=t.geometry;return e.boundingSphere===null&&e.computeBoundingSphere(),ws.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),this.intersectsSphere(ws)}intersectsSprite(t){return ws.center.set(0,0,0),ws.radius=.7071067811865476,ws.applyMatrix4(t.matrixWorld),this.intersectsSphere(ws)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(ka.x=i.normal.x>0?t.max.x:t.min.x,ka.y=i.normal.y>0?t.max.y:t.min.y,ka.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(ka)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Og(){let r=null,t=!1,e=null,n=null;function i(s,a){e(s,a),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function hy(r,t){const e=t.isWebGL2,n=new WeakMap;function i(c,h){const u=c.array,f=c.usage,m=r.createBuffer();r.bindBuffer(h,m),r.bufferData(h,u,f),c.onUploadCallback();let g;if(u instanceof Float32Array)g=5126;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(u instanceof Int16Array)g=5122;else if(u instanceof Uint32Array)g=5125;else if(u instanceof Int32Array)g=5124;else if(u instanceof Int8Array)g=5120;else if(u instanceof Uint8Array)g=5121;else if(u instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:m,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version}}function s(c,h,u){const f=h.array,m=h.updateRange;r.bindBuffer(u,c),m.count===-1?r.bufferSubData(u,0,f):(e?r.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):r.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1)}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(r.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u===void 0?n.set(c,i(c,h)):u.version<c.version&&(s(u.buffer,c,h),u.version=c.version)}return{get:a,remove:o,update:l}}class Lu extends Ci{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,f=e/l,m=[],g=[],d=[],p=[];for(let _=0;_<h;_++){const x=_*f-a;for(let b=0;b<c;b++){const v=b*u-s;g.push(v,-x,0),d.push(0,0,1),p.push(b/o),p.push(1-_/l)}}for(let _=0;_<l;_++)for(let x=0;x<o;x++){const b=x+c*_,v=x+c*(_+1),M=x+1+c*(_+1),w=x+1+c*_;m.push(b,v,w),m.push(v,M,w)}this.setIndex(m),this.setAttribute("position",new _n(g,3)),this.setAttribute("normal",new _n(d,3)),this.setAttribute("uv",new _n(p,2))}static fromJSON(t){return new Lu(t.width,t.height,t.widthSegments,t.heightSegments)}}var uy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,fy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dy=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,py=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,my=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,gy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_y="vec3 transformed = vec3( position );",vy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xy=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
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
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
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
#ifdef USE_IRIDESCENCE
vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = mix(F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence);
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#endif
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
float G_BlinnPhong_Implicit( ) {
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
#endif`,yy=`#ifdef USE_IRIDESCENCE
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
   vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( -pow2( phase ) * var );
   xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[0] ) * exp( -4.5282e+09 * pow2( phase ) );
   xyz /= 1.0685e-7;
   vec3 srgb = XYZ_TO_REC709 * xyz;
   return srgb;
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
   float R21 = R12;
   float T121 = 1.0 - R12;
   float phi12 = 0.0;
   if ( iridescenceIOR < outsideIOR ) phi12 = PI;
   float phi21 = PI - phi12;
   vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );   vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
   vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
   vec3 phi23 = vec3( 0.0 );
   if ( baseIOR[0] < iridescenceIOR ) phi23[0] = PI;
   if ( baseIOR[1] < iridescenceIOR ) phi23[1] = PI;
   if ( baseIOR[2] < iridescenceIOR ) phi23[2] = PI;
   float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
   vec3 phi = vec3( phi21 ) + phi23;
   vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
   vec3 r123 = sqrt( R123 );
   vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
   vec3 C0 = R12 + Rs;
   I = C0;
   vec3 Cm = Rs - T121;
   for ( int m = 1; m <= 2; ++m ) {
       Cm *= r123;
       vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
       I += Cm * Sm;
   }
   return max( I, vec3( 0.0 ) );
}
#endif`,My=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,by=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,Sy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ty=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ey=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ay=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Ly=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Dy=`#define PI 3.141592653589793
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
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
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
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float linearToRelativeLuminance( const in vec3 color ) {
	vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
	return dot( weights, color.rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,Py=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define r0 1.0
	#define v0 0.339
	#define m0 - 2.0
	#define r1 0.8
	#define v1 0.276
	#define m1 - 1.0
	#define r4 0.4
	#define v4 0.046
	#define m4 2.0
	#define r5 0.305
	#define v5 0.016
	#define m5 3.0
	#define r6 0.21
	#define v6 0.0038
	#define m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= r1 ) {
			mip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;
		} else if ( roughness >= r4 ) {
			mip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;
		} else if ( roughness >= r5 ) {
			mip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;
		} else if ( roughness >= r6 ) {
			mip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ry=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Iy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Fy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,Oy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ny="gl_FragColor = linearToOutputTexel( gl_FragColor );",ky=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Uy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,By=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Gy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$y=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Yy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );
	#endif
}`,jy=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Zy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ky=`vec3 diffuse = vec3( 1.0 );
GeometricContext geometry;
geometry.position = mvPosition.xyz;
geometry.normal = normalize( transformedNormal );
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );
GeometricContext backGeometry;
backGeometry.position = geometry.position;
backGeometry.normal = -geometry.normal;
backGeometry.viewDir = geometry.viewDir;
vLightFront = vec3( 0.0 );
vIndirectFront = vec3( 0.0 );
#ifdef DOUBLE_SIDED
	vLightBack = vec3( 0.0 );
	vIndirectBack = vec3( 0.0 );
#endif
IncidentLight directLight;
float dotNL;
vec3 directLightColor_Diffuse;
vIndirectFront += getAmbientLightIrradiance( ambientLightColor );
vIndirectFront += getLightProbeIrradiance( lightProbe, geometry.normal );
#ifdef DOUBLE_SIDED
	vIndirectBack += getAmbientLightIrradiance( ambientLightColor );
	vIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry.normal );
#endif
#if NUM_POINT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		getPointLightInfo( pointLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		getSpotLightInfo( spotLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_DIR_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		getDirectionalLightInfo( directionalLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_HEMI_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
		vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		#ifdef DOUBLE_SIDED
			vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry.normal );
		#endif
	}
	#pragma unroll_loop_end
#endif`,Jy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
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
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
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
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
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
#endif`,Qy=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,tM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,eM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,nM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,iM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,rM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( ior - 1.0 ) / ( ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,sM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,oM=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
float dotNVi = saturate( dot( normal, geometry.viewDir ) );
if ( material.iridescenceThickness == 0.0 ) {
	material.iridescence = 0.0;
} else {
	material.iridescence = saturate( material.iridescence );
}
if ( material.iridescence > 0.0 ) {
	material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
	material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
}
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
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
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
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,aM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,cM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uM=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,fM=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,dM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_M=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xM=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,yM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,MM=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,bM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,SM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,wM=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,TM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,EM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,AM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,CM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
		vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,LM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,DM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,PM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,RM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,IM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,FM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,OM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,NM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,UM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,BM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,VM=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,GM=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,HM=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );
		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;
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
#endif`,WM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$M=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,XM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,qM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,YM=`#ifdef USE_SKINNING
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
#endif`,jM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ZM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,KM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,JM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,QM=`#ifdef USE_TRANSMISSION
	float transmissionAlpha = 1.0;
	float transmissionFactor = transmission;
	float thicknessFactor = thickness;
	#ifdef USE_TRANSMISSIONMAP
		transmissionFactor *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		thicknessFactor *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, roughnessFactor, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, ior, thicknessFactor,
		attenuationColor, attenuationDistance );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, transmissionFactor );
	transmissionAlpha = mix( transmissionAlpha, transmission.a, transmissionFactor );
#endif`,tb=`#ifdef USE_TRANSMISSION
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
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( attenuationDistance == 0.0 ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,eb=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,nb=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,ib=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,rb=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,sb=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,ob=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,ab=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION )
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cb=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	gl_FragColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		gl_FragColor = vec4( mix( pow( gl_FragColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), gl_FragColor.rgb * 0.0773993808, vec3( lessThanEqual( gl_FragColor.rgb, vec3( 0.04045 ) ) ) ), gl_FragColor.w );
	#endif
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,hb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ub=`#include <envmap_common_pars_fragment>
uniform float opacity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>
	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,fb=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
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
}`,db=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,pb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
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
}`,mb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,gb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_b=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,vb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yb=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
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
}`,Mb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bb=`#define LAMBERT
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sb=`uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <emissivemap_fragment>
	#ifdef DOUBLE_SIDED
		reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;
	#else
		reflectedLight.indirectDiffuse += vIndirectFront;
	#endif
	#include <lightmap_fragment>
	reflectedLight.indirectDiffuse *= BRDF_Lambert( diffuseColor.rgb );
	#ifdef DOUBLE_SIDED
		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;
	#else
		reflectedLight.directDiffuse = vLightFront;
	#endif
	reflectedLight.directDiffuse *= BRDF_Lambert( diffuseColor.rgb ) * getShadowMask();
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
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
	#include <morphcolor_vertex>
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
}`,Tb=`#define MATCAP
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
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
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
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Eb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
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
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ab=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Cb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
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
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
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
}`,Lb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
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
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Db=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
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
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
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
}`,Pb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
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
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
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
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
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
}`,Ib=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
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
}`,Ob=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zb=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,kb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,Ub=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Jt={alphamap_fragment:uy,alphamap_pars_fragment:fy,alphatest_fragment:dy,alphatest_pars_fragment:py,aomap_fragment:my,aomap_pars_fragment:gy,begin_vertex:_y,beginnormal_vertex:vy,bsdfs:xy,iridescence_fragment:yy,bumpmap_pars_fragment:My,clipping_planes_fragment:by,clipping_planes_pars_fragment:Sy,clipping_planes_pars_vertex:wy,clipping_planes_vertex:Ty,color_fragment:Ey,color_pars_fragment:Ay,color_pars_vertex:Cy,color_vertex:Ly,common:Dy,cube_uv_reflection_fragment:Py,defaultnormal_vertex:Ry,displacementmap_pars_vertex:Iy,displacementmap_vertex:Fy,emissivemap_fragment:Oy,emissivemap_pars_fragment:zy,encodings_fragment:Ny,encodings_pars_fragment:ky,envmap_fragment:Uy,envmap_common_pars_fragment:By,envmap_pars_fragment:Vy,envmap_pars_vertex:Gy,envmap_physical_pars_fragment:Qy,envmap_vertex:Hy,fog_vertex:Wy,fog_pars_vertex:$y,fog_fragment:Xy,fog_pars_fragment:qy,gradientmap_pars_fragment:Yy,lightmap_fragment:jy,lightmap_pars_fragment:Zy,lights_lambert_vertex:Ky,lights_pars_begin:Jy,lights_toon_fragment:tM,lights_toon_pars_fragment:eM,lights_phong_fragment:nM,lights_phong_pars_fragment:iM,lights_physical_fragment:rM,lights_physical_pars_fragment:sM,lights_fragment_begin:oM,lights_fragment_maps:aM,lights_fragment_end:lM,logdepthbuf_fragment:cM,logdepthbuf_pars_fragment:hM,logdepthbuf_pars_vertex:uM,logdepthbuf_vertex:fM,map_fragment:dM,map_pars_fragment:pM,map_particle_fragment:mM,map_particle_pars_fragment:gM,metalnessmap_fragment:_M,metalnessmap_pars_fragment:vM,morphcolor_vertex:xM,morphnormal_vertex:yM,morphtarget_pars_vertex:MM,morphtarget_vertex:bM,normal_fragment_begin:SM,normal_fragment_maps:wM,normal_pars_fragment:TM,normal_pars_vertex:EM,normal_vertex:AM,normalmap_pars_fragment:CM,clearcoat_normal_fragment_begin:LM,clearcoat_normal_fragment_maps:DM,clearcoat_pars_fragment:PM,iridescence_pars_fragment:RM,output_fragment:IM,packing:FM,premultiplied_alpha_fragment:OM,project_vertex:zM,dithering_fragment:NM,dithering_pars_fragment:kM,roughnessmap_fragment:UM,roughnessmap_pars_fragment:BM,shadowmap_pars_fragment:VM,shadowmap_pars_vertex:GM,shadowmap_vertex:HM,shadowmask_pars_fragment:WM,skinbase_vertex:$M,skinning_pars_vertex:XM,skinning_vertex:qM,skinnormal_vertex:YM,specularmap_fragment:jM,specularmap_pars_fragment:ZM,tonemapping_fragment:KM,tonemapping_pars_fragment:JM,transmission_fragment:QM,transmission_pars_fragment:tb,uv_pars_fragment:eb,uv_pars_vertex:nb,uv_vertex:ib,uv2_pars_fragment:rb,uv2_pars_vertex:sb,uv2_vertex:ob,worldpos_vertex:ab,background_vert:lb,background_frag:cb,cube_vert:hb,cube_frag:ub,depth_vert:fb,depth_frag:db,distanceRGBA_vert:pb,distanceRGBA_frag:mb,equirect_vert:gb,equirect_frag:_b,linedashed_vert:vb,linedashed_frag:xb,meshbasic_vert:yb,meshbasic_frag:Mb,meshlambert_vert:bb,meshlambert_frag:Sb,meshmatcap_vert:wb,meshmatcap_frag:Tb,meshnormal_vert:Eb,meshnormal_frag:Ab,meshphong_vert:Cb,meshphong_frag:Lb,meshphysical_vert:Db,meshphysical_frag:Pb,meshtoon_vert:Rb,meshtoon_frag:Ib,points_vert:Fb,points_frag:Ob,shadow_vert:zb,shadow_frag:Nb,sprite_vert:kb,sprite_frag:Ub},vt={common:{diffuse:{value:new Yt(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new xi},uv2Transform:{value:new xi},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new $t(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new xi}},sprite:{diffuse:{value:new Yt(16777215)},opacity:{value:1},center:{value:new $t(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new xi}}},pi={basic:{uniforms:Ge([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:Ge([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.fog,vt.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:Ge([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Yt(0)},specular:{value:new Yt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:Ge([vt.common,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.roughnessmap,vt.metalnessmap,vt.fog,vt.lights,{emissive:{value:new Yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:Ge([vt.common,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.gradientmap,vt.fog,vt.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:Ge([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:Ge([vt.points,vt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:Ge([vt.common,vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:Ge([vt.common,vt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:Ge([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:Ge([vt.sprite,vt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new xi},t2D:{value:null}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},cube:{uniforms:Ge([vt.envmap,{opacity:{value:1}}]),vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:Ge([vt.common,vt.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:Ge([vt.lights,vt.fog,{color:{value:new Yt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};pi.physical={uniforms:Ge([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new $t(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new Yt(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new $t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new Yt(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new Yt(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};function Bb(r,t,e,n,i,s){const a=new Yt(0);let o=i===!0?0:1,l,c,h=null,u=0,f=null;function m(d,p){let _=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=t.get(x));const b=r.xr,v=b.getSession&&b.getSession();v&&v.environmentBlendMode==="additive"&&(x=null),x===null?g(a,o):x&&x.isColor&&(g(x,1),_=!0),(r.autoClear||_)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Ul)?(c===void 0&&(c=new hr(new ia(1,1,1),new Yi({name:"BackgroundCubeMaterial",uniforms:ro(pi.cube.uniforms),vertexShader:pi.cube.vertexShader,fragmentShader:pi.cube.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,w,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,(h!==x||u!==x.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,h=x,u=x.version,f=r.toneMapping),c.layers.enableAll(),d.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new hr(new Lu(2,2),new Yi({name:"BackgroundMaterial",uniforms:ro(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:jo,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||u!==x.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,h=x,u=x.version,f=r.toneMapping),l.layers.enableAll(),d.unshift(l,l.geometry,l.material,0,0,null))}function g(d,p){e.buffers.color.setClear(d.r,d.g,d.b,p,s)}return{getClearColor:function(){return a},setClearColor:function(d,p=1){a.set(d),o=p,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(d){o=d,g(a,o)},render:m}}function Vb(r,t,e,n){const i=r.getParameter(34921),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=p(null);let c=l,h=!1;function u(I,V,N,U,H){let k=!1;if(a){const C=d(U,N,V);c!==C&&(c=C,m(c.object)),k=_(I,U,N,H),k&&x(I,U,N,H)}else{const C=V.wireframe===!0;(c.geometry!==U.id||c.program!==N.id||c.wireframe!==C)&&(c.geometry=U.id,c.program=N.id,c.wireframe=C,k=!0)}H!==null&&e.update(H,34963),(k||h)&&(h=!1,y(I,V,N,U),H!==null&&r.bindBuffer(34963,e.get(H).buffer))}function f(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function m(I){return n.isWebGL2?r.bindVertexArray(I):s.bindVertexArrayOES(I)}function g(I){return n.isWebGL2?r.deleteVertexArray(I):s.deleteVertexArrayOES(I)}function d(I,V,N){const U=N.wireframe===!0;let H=o[I.id];H===void 0&&(H={},o[I.id]=H);let k=H[V.id];k===void 0&&(k={},H[V.id]=k);let C=k[U];return C===void 0&&(C=p(f()),k[U]=C),C}function p(I){const V=[],N=[],U=[];for(let H=0;H<i;H++)V[H]=0,N[H]=0,U[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:N,attributeDivisors:U,object:I,attributes:{},index:null}}function _(I,V,N,U){const H=c.attributes,k=V.attributes;let C=0;const Z=N.getAttributes();for(const z in Z)if(Z[z].location>=0){const J=H[z];let q=k[z];if(q===void 0&&(z==="instanceMatrix"&&I.instanceMatrix&&(q=I.instanceMatrix),z==="instanceColor"&&I.instanceColor&&(q=I.instanceColor)),J===void 0||J.attribute!==q||q&&J.data!==q.data)return!0;C++}return c.attributesNum!==C||c.index!==U}function x(I,V,N,U){const H={},k=V.attributes;let C=0;const Z=N.getAttributes();for(const z in Z)if(Z[z].location>=0){let J=k[z];J===void 0&&(z==="instanceMatrix"&&I.instanceMatrix&&(J=I.instanceMatrix),z==="instanceColor"&&I.instanceColor&&(J=I.instanceColor));const q={};q.attribute=J,J&&J.data&&(q.data=J.data),H[z]=q,C++}c.attributes=H,c.attributesNum=C,c.index=U}function b(){const I=c.newAttributes;for(let V=0,N=I.length;V<N;V++)I[V]=0}function v(I){M(I,0)}function M(I,V){const N=c.newAttributes,U=c.enabledAttributes,H=c.attributeDivisors;N[I]=1,U[I]===0&&(r.enableVertexAttribArray(I),U[I]=1),H[I]!==V&&((n.isWebGL2?r:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,V),H[I]=V)}function w(){const I=c.newAttributes,V=c.enabledAttributes;for(let N=0,U=V.length;N<U;N++)V[N]!==I[N]&&(r.disableVertexAttribArray(N),V[N]=0)}function E(I,V,N,U,H,k){n.isWebGL2===!0&&(N===5124||N===5125)?r.vertexAttribIPointer(I,V,N,H,k):r.vertexAttribPointer(I,V,N,U,H,k)}function y(I,V,N,U){if(n.isWebGL2===!1&&(I.isInstancedMesh||U.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;b();const H=U.attributes,k=N.getAttributes(),C=V.defaultAttributeValues;for(const Z in k){const z=k[Z];if(z.location>=0){let K=H[Z];if(K===void 0&&(Z==="instanceMatrix"&&I.instanceMatrix&&(K=I.instanceMatrix),Z==="instanceColor"&&I.instanceColor&&(K=I.instanceColor)),K!==void 0){const J=K.normalized,q=K.itemSize,B=e.get(K);if(B===void 0)continue;const at=B.buffer,rt=B.type,ct=B.bytesPerElement;if(K.isInterleavedBufferAttribute){const ot=K.data,yt=ot.stride,xt=K.offset;if(ot.isInstancedInterleavedBuffer){for(let ut=0;ut<z.locationSize;ut++)M(z.location+ut,ot.meshPerAttribute);I.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let ut=0;ut<z.locationSize;ut++)v(z.location+ut);r.bindBuffer(34962,at);for(let ut=0;ut<z.locationSize;ut++)E(z.location+ut,q/z.locationSize,rt,J,yt*ct,(xt+q/z.locationSize*ut)*ct)}else{if(K.isInstancedBufferAttribute){for(let ot=0;ot<z.locationSize;ot++)M(z.location+ot,K.meshPerAttribute);I.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ot=0;ot<z.locationSize;ot++)v(z.location+ot);r.bindBuffer(34962,at);for(let ot=0;ot<z.locationSize;ot++)E(z.location+ot,q/z.locationSize,rt,J,q*ct,q/z.locationSize*ot*ct)}}else if(C!==void 0){const J=C[Z];if(J!==void 0)switch(J.length){case 2:r.vertexAttrib2fv(z.location,J);break;case 3:r.vertexAttrib3fv(z.location,J);break;case 4:r.vertexAttrib4fv(z.location,J);break;default:r.vertexAttrib1fv(z.location,J)}}}}w()}function S(){F();for(const I in o){const V=o[I];for(const N in V){const U=V[N];for(const H in U)g(U[H].object),delete U[H];delete V[N]}delete o[I]}}function L(I){if(o[I.id]===void 0)return;const V=o[I.id];for(const N in V){const U=V[N];for(const H in U)g(U[H].object),delete U[H];delete V[N]}delete o[I.id]}function R(I){for(const V in o){const N=o[V];if(N[I.id]===void 0)continue;const U=N[I.id];for(const H in U)g(U[H].object),delete U[H];delete N[I.id]}}function F(){j(),h=!0,c!==l&&(c=l,m(c.object))}function j(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:F,resetDefaultState:j,dispose:S,releaseStatesOfGeometry:L,releaseStatesOfProgram:R,initAttributes:b,enableAttribute:v,disableUnusedAttributes:w}}function Gb(r,t,e,n){const i=n.isWebGL2;let s;function a(c){s=c}function o(c,h){r.drawArrays(s,c,h),e.update(h,s,1)}function l(c,h,u){if(u===0)return;let f,m;if(i)f=r,m="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[m](s,c,h,u),e.update(h,s,u)}this.setMode=a,this.render=o,this.renderInstances=l}function Hb(r,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(E){if(E==="highp"){if(r.getShaderPrecisionFormat(35633,36338).precision>0&&r.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(35633,36337).precision>0&&r.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&r instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&r instanceof WebGL2ComputeRenderingContext;let o=e.precision!==void 0?e.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=r.getParameter(34930),f=r.getParameter(35660),m=r.getParameter(3379),g=r.getParameter(34076),d=r.getParameter(34921),p=r.getParameter(36347),_=r.getParameter(36348),x=r.getParameter(36349),b=f>0,v=a||t.has("OES_texture_float"),M=b&&v,w=a?r.getParameter(36183):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:p,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:b,floatFragmentTextures:v,floatVertexTextures:M,maxSamples:w}}function Wb(r){const t=this;let e=null,n=0,i=!1,s=!1;const a=new Pr,o=new xi,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f,m){const g=u.length!==0||f||n!==0||i;return i=f,e=h(u,m,0),n=u.length,g},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1,c()},this.setState=function(u,f,m){const g=u.clippingPlanes,d=u.clipIntersection,p=u.clipShadows,_=r.get(u);if(!i||g===null||g.length===0||s&&!p)s?h(null):c();else{const x=s?0:n,b=x*4;let v=_.clippingState||null;l.value=v,v=h(g,f,b,m);for(let M=0;M!==b;++M)v[M]=e[M];_.clippingState=v,this.numIntersection=d?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,m,g){const d=u!==null?u.length:0;let p=null;if(d!==0){if(p=l.value,g!==!0||p===null){const _=m+d*4,x=f.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<_)&&(p=new Float32Array(_));for(let b=0,v=m;b!==d;++b,v+=4)a.copy(u[b]).applyMatrix4(x,o),a.normal.toArray(p,v),p[v+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=d,t.numIntersection=0,p}}function $b(r){let t=new WeakMap;function e(a,o){return o===Fh?a.mapping=eo:o===Oh&&(a.mapping=no),a}function n(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){const o=a.mapping;if(o===Fh||o===Oh)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new ay(l.height/2);return c.fromEquirectangularTexture(r,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Xb extends Ig{constructor(t=-1,e=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Is=4,Td=[.125,.215,.35,.446,.526,.582],Ir=20,Uc=new Xb,Ed=new Yt;let Bc=null;const Rr=(1+Math.sqrt(5))/2,Ts=1/Rr,Ad=[new G(1,1,1),new G(-1,1,1),new G(1,1,-1),new G(-1,1,-1),new G(0,Rr,Ts),new G(0,Rr,-Ts),new G(Ts,0,Rr),new G(-Ts,0,Rr),new G(Rr,Ts,0),new G(-Rr,Ts,0)];class Cd{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Bc=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Bc),t.scissorTest=!1,Ua(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===eo||t.mapping===no?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Bc=this._renderer.getRenderTarget();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Vn,minFilter:Vn,generateMipmaps:!1,type:Zo,format:ii,encoding:is,depthBuffer:!1},i=Ld(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ld(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qb(s)),this._blurMaterial=Yb(s,t,e)}return i}_compileMaterial(t){const e=new hr(this._lodPlanes[0],t);this._renderer.compile(e,Uc)}_sceneToCubeUV(t,e,n,i){const o=new Gn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Ed),h.toneMapping=Wi,h.autoClear=!1;const m=new Au({name:"PMREM.Background",side:ri,depthWrite:!1,depthTest:!1}),g=new hr(new ia,m);let d=!1;const p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,d=!0):(m.color.copy(Ed),d=!0);for(let _=0;_<6;_++){const x=_%3;x===0?(o.up.set(0,l[_],0),o.lookAt(c[_],0,0)):x===1?(o.up.set(0,0,l[_]),o.lookAt(0,c[_],0)):(o.up.set(0,l[_],0),o.lookAt(0,0,c[_]));const b=this._cubeSize;Ua(i,x*b,_>2?b:0,b,b),h.setRenderTarget(i),d&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===eo||t.mapping===no;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dd());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new hr(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;Ua(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Uc)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=Ad[(i-1)%Ad.length];this._blur(t,i-1,i,s,a)}e.autoClear=n}_blur(t,e,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",s),this._halfBlur(a,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new hr(this._lodPlanes[i],c),f=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Ir-1),d=s/g,p=isFinite(s)?1+Math.floor(h*d):Ir;p>Ir&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ir}`);const _=[];let x=0;for(let E=0;E<Ir;++E){const y=E/d,S=Math.exp(-y*y/2);_.push(S),E===0?x+=S:E<p&&(x+=2*S)}for(let E=0;E<_.length;E++)_[E]=_[E]/x;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=_,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:b}=this;f.dTheta.value=g,f.mipInt.value=b-n;const v=this._sizeLods[i],M=3*v*(i>b-Is?i-b+Is:0),w=4*(this._cubeSize-v);Ua(e,M,w,3*v,2*v),l.setRenderTarget(e),l.render(u,Uc)}}function qb(r){const t=[],e=[],n=[];let i=r;const s=r-Is+1+Td.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>r-Is?l=Td[a-r+Is-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,d=3,p=2,_=1,x=new Float32Array(d*g*m),b=new Float32Array(p*g*m),v=new Float32Array(_*g*m);for(let w=0;w<m;w++){const E=w%3*2/3-1,y=w>2?0:-1,S=[E,y,0,E+2/3,y,0,E+2/3,y+1,0,E,y,0,E+2/3,y+1,0,E,y+1,0];x.set(S,d*g*w),b.set(f,p*g*w);const L=[w,w,w,w,w,w];v.set(L,_*g*w)}const M=new Ci;M.setAttribute("position",new wi(x,d)),M.setAttribute("uv",new wi(b,p)),M.setAttribute("faceIndex",new wi(v,_)),t.push(M),i>Is&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ld(r,t,e){const n=new _r(r,t,e);return n.texture.mapping=Ul,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ua(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Yb(r,t,e){const n=new Float32Array(Ir),i=new G(0,1,0);return new Yi({name:"SphericalGaussianBlur",defines:{n:Ir,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Du(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gr,depthTest:!1,depthWrite:!1})}function Dd(){return new Yi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Du(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gr,depthTest:!1,depthWrite:!1})}function Pd(){return new Yi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Du(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gr,depthTest:!1,depthWrite:!1})}function Du(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jb(r){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Fh||l===Oh,h=l===eo||l===no;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=t.get(o);return e===null&&(e=new Cd(r)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),t.set(o,u),u.texture}else{if(t.has(o))return t.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||h&&u&&i(u)){e===null&&(e=new Cd(r));const f=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,f),o.addEventListener("dispose",s),f.texture}else return null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Zb(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?e("EXT_color_buffer_float"):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Kb(r,t,e,n){const i={},s=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete i[f.id];const m=s.get(f);m&&(t.remove(m),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],34962);const m=u.morphAttributes;for(const g in m){const d=m[g];for(let p=0,_=d.length;p<_;p++)t.update(d[p],34962)}}function c(u){const f=[],m=u.index,g=u.attributes.position;let d=0;if(m!==null){const x=m.array;d=m.version;for(let b=0,v=x.length;b<v;b+=3){const M=x[b+0],w=x[b+1],E=x[b+2];f.push(M,w,w,E,E,M)}}else{const x=g.array;d=g.version;for(let b=0,v=x.length/3-1;b<v;b+=3){const M=b+0,w=b+1,E=b+2;f.push(M,w,w,E,E,M)}}const p=new(wg(f)?Rg:Pg)(f,1);p.version=d;const _=s.get(u);_&&t.remove(_),s.set(u,p)}function h(u){const f=s.get(u);if(f){const m=u.index;m!==null&&f.version<m.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Jb(r,t,e,n){const i=n.isWebGL2;let s;function a(f){s=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function h(f,m){r.drawElements(s,m,o,f*l),e.update(m,s,1)}function u(f,m,g){if(g===0)return;let d,p;if(i)d=r,p="drawElementsInstanced";else if(d=t.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",d===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[p](s,m,o,f*l,g),e.update(m,s,g)}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u}function Qb(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case 4:e.triangles+=o*(s/3);break;case 1:e.lines+=o*(s/2);break;case 3:e.lines+=o*(s-1);break;case 2:e.lines+=o*s;break;case 0:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.frame++,e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function tS(r,t){return r[0]-t[0]}function eS(r,t){return Math.abs(t[1])-Math.abs(r[1])}function Vc(r,t){let e=1;const n=t.isInterleavedBufferAttribute?t.data.array:t.array;n instanceof Int8Array?e=127:n instanceof Int16Array?e=32767:n instanceof Int32Array?e=2147483647:console.error("THREE.WebGLMorphtargets: Unsupported morph attribute data type: ",n),r.divideScalar(e)}function nS(r,t,e){const n={},i=new Float32Array(8),s=new WeakMap,a=new Ue,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u,f){const m=c.morphTargetInfluences;if(t.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,d=g!==void 0?g.length:0;let p=s.get(h);if(p===void 0||p.count!==d){let V=function(){j.dispose(),s.delete(h),h.removeEventListener("dispose",V)};p!==void 0&&p.texture.dispose();const b=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,M=h.morphAttributes.color!==void 0,w=h.morphAttributes.position||[],E=h.morphAttributes.normal||[],y=h.morphAttributes.color||[];let S=0;b===!0&&(S=1),v===!0&&(S=2),M===!0&&(S=3);let L=h.attributes.position.count*S,R=1;L>t.maxTextureSize&&(R=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const F=new Float32Array(L*R*4*d),j=new Cg(F,L,R,d);j.type=Ur,j.needsUpdate=!0;const I=S*4;for(let N=0;N<d;N++){const U=w[N],H=E[N],k=y[N],C=L*R*4*N;for(let Z=0;Z<U.count;Z++){const z=Z*I;b===!0&&(a.fromBufferAttribute(U,Z),U.normalized===!0&&Vc(a,U),F[C+z+0]=a.x,F[C+z+1]=a.y,F[C+z+2]=a.z,F[C+z+3]=0),v===!0&&(a.fromBufferAttribute(H,Z),H.normalized===!0&&Vc(a,H),F[C+z+4]=a.x,F[C+z+5]=a.y,F[C+z+6]=a.z,F[C+z+7]=0),M===!0&&(a.fromBufferAttribute(k,Z),k.normalized===!0&&Vc(a,k),F[C+z+8]=a.x,F[C+z+9]=a.y,F[C+z+10]=a.z,F[C+z+11]=k.itemSize===4?a.w:1)}}p={count:d,texture:j,size:new $t(L,R)},s.set(h,p),h.addEventListener("dispose",V)}let _=0;for(let b=0;b<m.length;b++)_+=m[b];const x=h.morphTargetsRelative?1:1-_;f.getUniforms().setValue(r,"morphTargetBaseInfluence",x),f.getUniforms().setValue(r,"morphTargetInfluences",m),f.getUniforms().setValue(r,"morphTargetsTexture",p.texture,e),f.getUniforms().setValue(r,"morphTargetsTextureSize",p.size)}else{const g=m===void 0?0:m.length;let d=n[h.id];if(d===void 0||d.length!==g){d=[];for(let v=0;v<g;v++)d[v]=[v,0];n[h.id]=d}for(let v=0;v<g;v++){const M=d[v];M[0]=v,M[1]=m[v]}d.sort(eS);for(let v=0;v<8;v++)v<g&&d[v][1]?(o[v][0]=d[v][0],o[v][1]=d[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(tS);const p=h.morphAttributes.position,_=h.morphAttributes.normal;let x=0;for(let v=0;v<8;v++){const M=o[v],w=M[0],E=M[1];w!==Number.MAX_SAFE_INTEGER&&E?(p&&h.getAttribute("morphTarget"+v)!==p[w]&&h.setAttribute("morphTarget"+v,p[w]),_&&h.getAttribute("morphNormal"+v)!==_[w]&&h.setAttribute("morphNormal"+v,_[w]),i[v]=E,x+=E):(p&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),_&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),i[v]=0)}const b=h.morphTargetsRelative?1:1-x;f.getUniforms().setValue(r,"morphTargetBaseInfluence",b),f.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function iS(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);return i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),e.update(l.instanceMatrix,34962),l.instanceColor!==null&&e.update(l.instanceColor,34962)),u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}const zg=new oi,Ng=new Cg,kg=new Xx,Ug=new Fg,Rd=[],Id=[],Fd=new Float32Array(16),Od=new Float32Array(9),zd=new Float32Array(4);function ao(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Rd[i];if(s===void 0&&(s=new Float32Array(i),Rd[i]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function sn(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function on(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Gl(r,t){let e=Id[t];e===void 0&&(e=new Int32Array(t),Id[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function rS(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function sS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(sn(e,t))return;r.uniform2fv(this.addr,t),on(e,t)}}function oS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(sn(e,t))return;r.uniform3fv(this.addr,t),on(e,t)}}function aS(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(sn(e,t))return;r.uniform4fv(this.addr,t),on(e,t)}}function lS(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(sn(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),on(e,t)}else{if(sn(e,n))return;zd.set(n),r.uniformMatrix2fv(this.addr,!1,zd),on(e,n)}}function cS(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(sn(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),on(e,t)}else{if(sn(e,n))return;Od.set(n),r.uniformMatrix3fv(this.addr,!1,Od),on(e,n)}}function hS(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(sn(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),on(e,t)}else{if(sn(e,n))return;Fd.set(n),r.uniformMatrix4fv(this.addr,!1,Fd),on(e,n)}}function uS(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function fS(r,t){const e=this.cache;sn(e,t)||(r.uniform2iv(this.addr,t),on(e,t))}function dS(r,t){const e=this.cache;sn(e,t)||(r.uniform3iv(this.addr,t),on(e,t))}function pS(r,t){const e=this.cache;sn(e,t)||(r.uniform4iv(this.addr,t),on(e,t))}function mS(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function gS(r,t){const e=this.cache;sn(e,t)||(r.uniform2uiv(this.addr,t),on(e,t))}function _S(r,t){const e=this.cache;sn(e,t)||(r.uniform3uiv(this.addr,t),on(e,t))}function vS(r,t){const e=this.cache;sn(e,t)||(r.uniform4uiv(this.addr,t),on(e,t))}function xS(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2D(t||zg,i)}function yS(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||kg,i)}function MS(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Ug,i)}function bS(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Ng,i)}function SS(r){switch(r){case 5126:return rS;case 35664:return sS;case 35665:return oS;case 35666:return aS;case 35674:return lS;case 35675:return cS;case 35676:return hS;case 5124:case 35670:return uS;case 35667:case 35671:return fS;case 35668:case 35672:return dS;case 35669:case 35673:return pS;case 5125:return mS;case 36294:return gS;case 36295:return _S;case 36296:return vS;case 35678:case 36198:case 36298:case 36306:case 35682:return xS;case 35679:case 36299:case 36307:return yS;case 35680:case 36300:case 36308:case 36293:return MS;case 36289:case 36303:case 36311:case 36292:return bS}}function wS(r,t){r.uniform1fv(this.addr,t)}function TS(r,t){const e=ao(t,this.size,2);r.uniform2fv(this.addr,e)}function ES(r,t){const e=ao(t,this.size,3);r.uniform3fv(this.addr,e)}function AS(r,t){const e=ao(t,this.size,4);r.uniform4fv(this.addr,e)}function CS(r,t){const e=ao(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function LS(r,t){const e=ao(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function DS(r,t){const e=ao(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function PS(r,t){r.uniform1iv(this.addr,t)}function RS(r,t){r.uniform2iv(this.addr,t)}function IS(r,t){r.uniform3iv(this.addr,t)}function FS(r,t){r.uniform4iv(this.addr,t)}function OS(r,t){r.uniform1uiv(this.addr,t)}function zS(r,t){r.uniform2uiv(this.addr,t)}function NS(r,t){r.uniform3uiv(this.addr,t)}function kS(r,t){r.uniform4uiv(this.addr,t)}function US(r,t,e){const n=t.length,i=Gl(e,n);r.uniform1iv(this.addr,i);for(let s=0;s!==n;++s)e.setTexture2D(t[s]||zg,i[s])}function BS(r,t,e){const n=t.length,i=Gl(e,n);r.uniform1iv(this.addr,i);for(let s=0;s!==n;++s)e.setTexture3D(t[s]||kg,i[s])}function VS(r,t,e){const n=t.length,i=Gl(e,n);r.uniform1iv(this.addr,i);for(let s=0;s!==n;++s)e.setTextureCube(t[s]||Ug,i[s])}function GS(r,t,e){const n=t.length,i=Gl(e,n);r.uniform1iv(this.addr,i);for(let s=0;s!==n;++s)e.setTexture2DArray(t[s]||Ng,i[s])}function HS(r){switch(r){case 5126:return wS;case 35664:return TS;case 35665:return ES;case 35666:return AS;case 35674:return CS;case 35675:return LS;case 35676:return DS;case 5124:case 35670:return PS;case 35667:case 35671:return RS;case 35668:case 35672:return IS;case 35669:case 35673:return FS;case 5125:return OS;case 36294:return zS;case 36295:return NS;case 36296:return kS;case 35678:case 36198:case 36298:case 36306:case 35682:return US;case 35679:case 36299:case 36307:return BS;case 35680:case 36300:case 36308:case 36293:return VS;case 36289:case 36303:case 36311:case 36292:return GS}}class WS{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.setValue=SS(e.type)}}class $S{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.size=e.size,this.setValue=HS(e.type)}}class XS{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(t,e[o.id],n)}}}const Gc=/(\w+)(\])?(\[|\.)?/g;function Nd(r,t){r.seq.push(t),r.map[t.id]=t}function qS(r,t,e){const n=r.name,i=n.length;for(Gc.lastIndex=0;;){const s=Gc.exec(n),a=Gc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Nd(e,c===void 0?new WS(o,r,t):new $S(o,r,t));break}else{let u=e.map[o];u===void 0&&(u=new XS(o),Nd(e,u)),e=u}}}class nl{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,35718);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),a=t.getUniformLocation(e,s.name);qS(s,a,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function kd(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}let YS=0;function jS(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function ZS(r){switch(r){case is:return["Linear","( value )"];case ge:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",r),["Linear","( value )"]}}function Ud(r,t,e){const n=r.getShaderParameter(t,35713),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+jS(r.getShaderSource(t),a)}else return i}function KS(r,t){const e=ZS(t);return"vec4 "+r+"( vec4 value ) { return LinearTo"+e[0]+e[1]+"; }"}function JS(r,t){let e;switch(t){case xx:e="Linear";break;case yx:e="Reinhard";break;case Mx:e="OptimizedCineon";break;case bx:e="ACESFilmic";break;case Sx:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function QS(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.tangentSpaceNormalMap||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(So).join(`
`)}function tw(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ew(r,t){const e={},n=r.getProgramParameter(t,35721);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),a=s.name;let o=1;s.type===35674&&(o=2),s.type===35675&&(o=3),s.type===35676&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function So(r){return r!==""}function Bd(r,t){return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Vd(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const nw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vh(r){return r.replace(nw,iw)}function iw(r,t){const e=Jt[t];if(e===void 0)throw new Error("Can not resolve #include <"+t+">");return Vh(e)}const rw=/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,sw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gd(r){return r.replace(sw,Bg).replace(rw,ow)}function ow(r,t,e,n){return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."),Bg(r,t,e,n)}function Bg(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Hd(r){let t="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function aw(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===xg?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Zv?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===bo&&(t="SHADOWMAP_TYPE_VSM"),t}function lw(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case eo:case no:t="ENVMAP_TYPE_CUBE";break;case Ul:t="ENVMAP_TYPE_CUBE_UV";break}return t}function cw(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case no:t="ENVMAP_MODE_REFRACTION";break}return t}function hw(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case kl:t="ENVMAP_BLENDING_MULTIPLY";break;case _x:t="ENVMAP_BLENDING_MIX";break;case vx:t="ENVMAP_BLENDING_ADD";break}return t}function uw(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function fw(r,t,e,n){const i=r.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=aw(e),c=lw(e),h=cw(e),u=hw(e),f=uw(e),m=e.isWebGL2?"":QS(e),g=tw(s),d=i.createProgram();let p,_,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=[g].filter(So).join(`
`),p.length>0&&(p+=`
`),_=[m,g].filter(So).join(`
`),_.length>0&&(_+=`
`)):(p=[Hd(e),"#define SHADER_NAME "+e.shaderName,g,e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.supportsVertexTextures?"#define VERTEX_TEXTURES":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.displacementMap&&e.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(So).join(`
`),_=[m,Hd(e),"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMap&&e.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",e.normalMap&&e.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",e.specularColorMap?"#define USE_SPECULARCOLORMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEENCOLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs?"#define USE_UV":"",e.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Wi?"#define TONE_MAPPING":"",e.toneMapping!==Wi?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Wi?JS("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.encodings_pars_fragment,KS("linearToOutputTexel",e.outputEncoding),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(So).join(`
`)),a=Vh(a),a=Bd(a,e),a=Vd(a,e),o=Vh(o),o=Bd(o,e),o=Vd(o,e),a=Gd(a),o=Gd(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,_=["#define varying in",e.glslVersion===fd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===fd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const b=x+p+a,v=x+_+o,M=kd(i,35633,b),w=kd(i,35632,v);if(i.attachShader(d,M),i.attachShader(d,w),e.index0AttributeName!==void 0?i.bindAttribLocation(d,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(d,0,"position"),i.linkProgram(d),r.debug.checkShaderErrors){const S=i.getProgramInfoLog(d).trim(),L=i.getShaderInfoLog(M).trim(),R=i.getShaderInfoLog(w).trim();let F=!0,j=!0;if(i.getProgramParameter(d,35714)===!1){F=!1;const I=Ud(i,M,"vertex"),V=Ud(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(d,35715)+`

Program Info Log: `+S+`
`+I+`
`+V)}else S!==""?console.warn("THREE.WebGLProgram: Program Info Log:",S):(L===""||R==="")&&(j=!1);j&&(this.diagnostics={runnable:F,programLog:S,vertexShader:{log:L,prefix:p},fragmentShader:{log:R,prefix:_}})}i.deleteShader(M),i.deleteShader(w);let E;this.getUniforms=function(){return E===void 0&&(E=new nl(i,d)),E};let y;return this.getAttributes=function(){return y===void 0&&(y=ew(i,d)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(d),this.program=void 0},this.name=e.shaderName,this.id=YS++,this.cacheKey=t,this.usedTimes=1,this.program=d,this.vertexShader=M,this.fragmentShader=w,this}let dw=0;class pw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;return e.has(t)===!1&&e.set(t,new Set),e.get(t)}_getShaderStage(t){const e=this.shaderCache;if(e.has(t)===!1){const n=new mw(t);e.set(t,n)}return e.get(t)}}class mw{constructor(t){this.id=dw++,this.code=t,this.usedTimes=0}}function gw(r,t,e,n,i,s,a){const o=new Dg,l=new pw,c=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,f=i.vertexTextures;let m=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(y,S,L,R,F){const j=R.fog,I=F.geometry,V=y.isMeshStandardMaterial?R.environment:null,N=(y.isMeshStandardMaterial?e:t).get(y.envMap||V),U=N&&N.mapping===Ul?N.image.height:null,H=g[y.type];y.precision!==null&&(m=i.getMaxPrecision(y.precision),m!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",m,"instead."));const k=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,C=k!==void 0?k.length:0;let Z=0;I.morphAttributes.position!==void 0&&(Z=1),I.morphAttributes.normal!==void 0&&(Z=2),I.morphAttributes.color!==void 0&&(Z=3);let z,K,J,q;if(H){const yt=pi[H];z=yt.vertexShader,K=yt.fragmentShader}else z=y.vertexShader,K=y.fragmentShader,l.update(y),J=l.getVertexShaderID(y),q=l.getFragmentShaderID(y);const B=r.getRenderTarget(),at=y.alphaTest>0,rt=y.clearcoat>0,ct=y.iridescence>0;return{isWebGL2:h,shaderID:H,shaderName:y.type,vertexShader:z,fragmentShader:K,defines:y.defines,customVertexShaderID:J,customFragmentShaderID:q,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:m,instancing:F.isInstancedMesh===!0,instancingColor:F.isInstancedMesh===!0&&F.instanceColor!==null,supportsVertexTextures:f,outputEncoding:B===null?r.outputEncoding:B.isXRRenderTarget===!0?B.texture.encoding:is,map:!!y.map,matcap:!!y.matcap,envMap:!!N,envMapMode:N&&N.mapping,envMapCubeUVHeight:U,lightMap:!!y.lightMap,aoMap:!!y.aoMap,emissiveMap:!!y.emissiveMap,bumpMap:!!y.bumpMap,normalMap:!!y.normalMap,objectSpaceNormalMap:y.normalMapType===Gx,tangentSpaceNormalMap:y.normalMapType===oo,decodeVideoTexture:!!y.map&&y.map.isVideoTexture===!0&&y.map.encoding===ge,clearcoat:rt,clearcoatMap:rt&&!!y.clearcoatMap,clearcoatRoughnessMap:rt&&!!y.clearcoatRoughnessMap,clearcoatNormalMap:rt&&!!y.clearcoatNormalMap,iridescence:ct,iridescenceMap:ct&&!!y.iridescenceMap,iridescenceThicknessMap:ct&&!!y.iridescenceThicknessMap,displacementMap:!!y.displacementMap,roughnessMap:!!y.roughnessMap,metalnessMap:!!y.metalnessMap,specularMap:!!y.specularMap,specularIntensityMap:!!y.specularIntensityMap,specularColorMap:!!y.specularColorMap,opaque:y.transparent===!1&&y.blending===Gs,alphaMap:!!y.alphaMap,alphaTest:at,gradientMap:!!y.gradientMap,sheen:y.sheen>0,sheenColorMap:!!y.sheenColorMap,sheenRoughnessMap:!!y.sheenRoughnessMap,transmission:y.transmission>0,transmissionMap:!!y.transmissionMap,thicknessMap:!!y.thicknessMap,combine:y.combine,vertexTangents:!!y.normalMap&&!!I.attributes.tangent,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,vertexUvs:!!y.map||!!y.bumpMap||!!y.normalMap||!!y.specularMap||!!y.alphaMap||!!y.emissiveMap||!!y.roughnessMap||!!y.metalnessMap||!!y.clearcoatMap||!!y.clearcoatRoughnessMap||!!y.clearcoatNormalMap||!!y.iridescenceMap||!!y.iridescenceThicknessMap||!!y.displacementMap||!!y.transmissionMap||!!y.thicknessMap||!!y.specularIntensityMap||!!y.specularColorMap||!!y.sheenColorMap||!!y.sheenRoughnessMap,uvsVertexOnly:!(y.map||y.bumpMap||y.normalMap||y.specularMap||y.alphaMap||y.emissiveMap||y.roughnessMap||y.metalnessMap||y.clearcoatNormalMap||y.iridescenceMap||y.iridescenceThicknessMap||y.transmission>0||y.transmissionMap||y.thicknessMap||y.specularIntensityMap||y.specularColorMap||y.sheen>0||y.sheenColorMap||y.sheenRoughnessMap)&&!!y.displacementMap,fog:!!j,useFog:y.fog===!0,fogExp2:j&&j.isFogExp2,flatShading:!!y.flatShading,sizeAttenuation:y.sizeAttenuation,logarithmicDepthBuffer:u,skinning:F.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:C,morphTextureStride:Z,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:y.toneMapped?r.toneMapping:Wi,physicallyCorrectLights:r.physicallyCorrectLights,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===to,flipSided:y.side===ri,useDepthPacking:!!y.depthPacking,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:y.extensions&&y.extensions.derivatives,extensionFragDepth:y.extensions&&y.extensions.fragDepth,extensionDrawBuffers:y.extensions&&y.extensions.drawBuffers,extensionShaderTextureLOD:y.extensions&&y.extensions.shaderTextureLOD,rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),customProgramCacheKey:y.customProgramCacheKey()}}function p(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const L in y.defines)S.push(L),S.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(_(S,y),x(S,y),S.push(r.outputEncoding)),S.push(y.customProgramCacheKey),S.join()}function _(y,S){y.push(S.precision),y.push(S.outputEncoding),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.combine),y.push(S.vertexUvs),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function x(y,S){o.disableAll(),S.isWebGL2&&o.enable(0),S.supportsVertexTextures&&o.enable(1),S.instancing&&o.enable(2),S.instancingColor&&o.enable(3),S.map&&o.enable(4),S.matcap&&o.enable(5),S.envMap&&o.enable(6),S.lightMap&&o.enable(7),S.aoMap&&o.enable(8),S.emissiveMap&&o.enable(9),S.bumpMap&&o.enable(10),S.normalMap&&o.enable(11),S.objectSpaceNormalMap&&o.enable(12),S.tangentSpaceNormalMap&&o.enable(13),S.clearcoat&&o.enable(14),S.clearcoatMap&&o.enable(15),S.clearcoatRoughnessMap&&o.enable(16),S.clearcoatNormalMap&&o.enable(17),S.iridescence&&o.enable(18),S.iridescenceMap&&o.enable(19),S.iridescenceThicknessMap&&o.enable(20),S.displacementMap&&o.enable(21),S.specularMap&&o.enable(22),S.roughnessMap&&o.enable(23),S.metalnessMap&&o.enable(24),S.gradientMap&&o.enable(25),S.alphaMap&&o.enable(26),S.alphaTest&&o.enable(27),S.vertexColors&&o.enable(28),S.vertexAlphas&&o.enable(29),S.vertexUvs&&o.enable(30),S.vertexTangents&&o.enable(31),S.uvsVertexOnly&&o.enable(32),S.fog&&o.enable(33),y.push(o.mask),o.disableAll(),S.useFog&&o.enable(0),S.flatShading&&o.enable(1),S.logarithmicDepthBuffer&&o.enable(2),S.skinning&&o.enable(3),S.morphTargets&&o.enable(4),S.morphNormals&&o.enable(5),S.morphColors&&o.enable(6),S.premultipliedAlpha&&o.enable(7),S.shadowMapEnabled&&o.enable(8),S.physicallyCorrectLights&&o.enable(9),S.doubleSided&&o.enable(10),S.flipSided&&o.enable(11),S.useDepthPacking&&o.enable(12),S.dithering&&o.enable(13),S.specularIntensityMap&&o.enable(14),S.specularColorMap&&o.enable(15),S.transmission&&o.enable(16),S.transmissionMap&&o.enable(17),S.thicknessMap&&o.enable(18),S.sheen&&o.enable(19),S.sheenColorMap&&o.enable(20),S.sheenRoughnessMap&&o.enable(21),S.decodeVideoTexture&&o.enable(22),S.opaque&&o.enable(23),y.push(o.mask)}function b(y){const S=g[y.type];let L;if(S){const R=pi[S];L=iy.clone(R.uniforms)}else L=y.uniforms;return L}function v(y,S){let L;for(let R=0,F=c.length;R<F;R++){const j=c[R];if(j.cacheKey===S){L=j,++L.usedTimes;break}}return L===void 0&&(L=new fw(r,S,y,s),c.push(L)),L}function M(y){if(--y.usedTimes===0){const S=c.indexOf(y);c[S]=c[c.length-1],c.pop(),y.destroy()}}function w(y){l.remove(y)}function E(){l.dispose()}return{getParameters:d,getProgramCacheKey:p,getUniforms:b,acquireProgram:v,releaseProgram:M,releaseShaderCache:w,programs:c,dispose:E}}function _w(){let r=new WeakMap;function t(s){let a=r.get(s);return a===void 0&&(a={},r.set(s,a)),a}function e(s){r.delete(s)}function n(s,a,o){r.get(s)[a]=o}function i(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function vw(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Wd(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function $d(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function a(u,f,m,g,d,p){let _=r[t];return _===void 0?(_={id:u.id,object:u,geometry:f,material:m,groupOrder:g,renderOrder:u.renderOrder,z:d,group:p},r[t]=_):(_.id=u.id,_.object=u,_.geometry=f,_.material=m,_.groupOrder=g,_.renderOrder=u.renderOrder,_.z=d,_.group=p),t++,_}function o(u,f,m,g,d,p){const _=a(u,f,m,g,d,p);m.transmission>0?n.push(_):m.transparent===!0?i.push(_):e.push(_)}function l(u,f,m,g,d,p){const _=a(u,f,m,g,d,p);m.transmission>0?n.unshift(_):m.transparent===!0?i.unshift(_):e.unshift(_)}function c(u,f){e.length>1&&e.sort(u||vw),n.length>1&&n.sort(f||Wd),i.length>1&&i.sort(f||Wd)}function h(){for(let u=t,f=r.length;u<f;u++){const m=r[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:h,sort:c}}function xw(){let r=new WeakMap;function t(n,i){let s;return r.has(n)===!1?(s=new $d,r.set(n,[s])):i>=r.get(n).length?(s=new $d,r.get(n).push(s)):s=r.get(n)[i],s}function e(){r=new WeakMap}return{get:t,dispose:e}}function yw(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new G,color:new Yt};break;case"SpotLight":e={position:new G,direction:new G,color:new Yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new G,color:new Yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new G,skyColor:new Yt,groundColor:new Yt};break;case"RectAreaLight":e={color:new Yt,position:new G,halfWidth:new G,halfHeight:new G};break}return r[t.id]=e,e}}}function Mw(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let bw=0;function Sw(r,t){return(t.castShadow?1:0)-(r.castShadow?1:0)}function ww(r,t){const e=new yw,n=Mw(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadow:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]};for(let h=0;h<9;h++)i.probe.push(new G);const s=new G,a=new Pe,o=new Pe;function l(h,u){let f=0,m=0,g=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let d=0,p=0,_=0,x=0,b=0,v=0,M=0,w=0;h.sort(Sw);const E=u!==!0?Math.PI:1;for(let S=0,L=h.length;S<L;S++){const R=h[S],F=R.color,j=R.intensity,I=R.distance,V=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)f+=F.r*j*E,m+=F.g*j*E,g+=F.b*j*E;else if(R.isLightProbe)for(let N=0;N<9;N++)i.probe[N].addScaledVector(R.sh.coefficients[N],j);else if(R.isDirectionalLight){const N=e.get(R);if(N.color.copy(R.color).multiplyScalar(R.intensity*E),R.castShadow){const U=R.shadow,H=n.get(R);H.shadowBias=U.bias,H.shadowNormalBias=U.normalBias,H.shadowRadius=U.radius,H.shadowMapSize=U.mapSize,i.directionalShadow[d]=H,i.directionalShadowMap[d]=V,i.directionalShadowMatrix[d]=R.shadow.matrix,v++}i.directional[d]=N,d++}else if(R.isSpotLight){const N=e.get(R);if(N.position.setFromMatrixPosition(R.matrixWorld),N.color.copy(F).multiplyScalar(j*E),N.distance=I,N.coneCos=Math.cos(R.angle),N.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),N.decay=R.decay,R.castShadow){const U=R.shadow,H=n.get(R);H.shadowBias=U.bias,H.shadowNormalBias=U.normalBias,H.shadowRadius=U.radius,H.shadowMapSize=U.mapSize,i.spotShadow[_]=H,i.spotShadowMap[_]=V,i.spotShadowMatrix[_]=R.shadow.matrix,w++}i.spot[_]=N,_++}else if(R.isRectAreaLight){const N=e.get(R);N.color.copy(F).multiplyScalar(j),N.halfWidth.set(R.width*.5,0,0),N.halfHeight.set(0,R.height*.5,0),i.rectArea[x]=N,x++}else if(R.isPointLight){const N=e.get(R);if(N.color.copy(R.color).multiplyScalar(R.intensity*E),N.distance=R.distance,N.decay=R.decay,R.castShadow){const U=R.shadow,H=n.get(R);H.shadowBias=U.bias,H.shadowNormalBias=U.normalBias,H.shadowRadius=U.radius,H.shadowMapSize=U.mapSize,H.shadowCameraNear=U.camera.near,H.shadowCameraFar=U.camera.far,i.pointShadow[p]=H,i.pointShadowMap[p]=V,i.pointShadowMatrix[p]=R.shadow.matrix,M++}i.point[p]=N,p++}else if(R.isHemisphereLight){const N=e.get(R);N.skyColor.copy(R.color).multiplyScalar(j*E),N.groundColor.copy(R.groundColor).multiplyScalar(j*E),i.hemi[b]=N,b++}}x>0&&(t.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=vt.LTC_FLOAT_1,i.rectAreaLTC2=vt.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=vt.LTC_HALF_1,i.rectAreaLTC2=vt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=m,i.ambient[2]=g;const y=i.hash;(y.directionalLength!==d||y.pointLength!==p||y.spotLength!==_||y.rectAreaLength!==x||y.hemiLength!==b||y.numDirectionalShadows!==v||y.numPointShadows!==M||y.numSpotShadows!==w)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=x,i.point.length=p,i.hemi.length=b,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=M,i.spotShadowMatrix.length=w,y.directionalLength=d,y.pointLength=p,y.spotLength=_,y.rectAreaLength=x,y.hemiLength=b,y.numDirectionalShadows=v,y.numPointShadows=M,y.numSpotShadows=w,i.version=bw++)}function c(h,u){let f=0,m=0,g=0,d=0,p=0;const _=u.matrixWorldInverse;for(let x=0,b=h.length;x<b;x++){const v=h[x];if(v.isDirectionalLight){const M=i.directional[f];M.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(_),f++}else if(v.isSpotLight){const M=i.spot[g];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(_),M.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(_),g++}else if(v.isRectAreaLight){const M=i.rectArea[d];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(_),o.identity(),a.copy(v.matrixWorld),a.premultiply(_),o.extractRotation(a),M.halfWidth.set(v.width*.5,0,0),M.halfHeight.set(0,v.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),d++}else if(v.isPointLight){const M=i.point[m];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(_),m++}else if(v.isHemisphereLight){const M=i.hemi[p];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(_),p++}}}return{setup:l,setupView:c,state:i}}function Xd(r,t){const e=new ww(r,t),n=[],i=[];function s(){n.length=0,i.length=0}function a(u){n.push(u)}function o(u){i.push(u)}function l(u){e.setup(n,u)}function c(u){e.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Tw(r,t){let e=new WeakMap;function n(s,a=0){let o;return e.has(s)===!1?(o=new Xd(r,t),e.set(s,[o])):a>=e.get(s).length?(o=new Xd(r,t),e.get(s).push(o)):o=e.get(s)[a],o}function i(){e=new WeakMap}return{get:n,dispose:i}}class Vg extends Be{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Gg extends Be{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new G,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.referencePosition.copy(t.referencePosition),this.nearDistance=t.nearDistance,this.farDistance=t.farDistance,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Ew=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Aw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Cw(r,t,e){let n=new Cu;const i=new $t,s=new $t,a=new Ue,o=new Vg({depthPacking:Vx}),l=new Gg,c={},h=e.maxTextureSize,u={0:ri,1:jo,2:to},f=new Yi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $t},radius:{value:4}},vertexShader:Ew,fragmentShader:Aw}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new Ci;g.setAttribute("position",new wi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const d=new hr(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xg,this.render=function(v,M,w){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||v.length===0)return;const E=r.getRenderTarget(),y=r.getActiveCubeFace(),S=r.getActiveMipmapLevel(),L=r.state;L.setBlending(gr),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);for(let R=0,F=v.length;R<F;R++){const j=v[R],I=j.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;i.copy(I.mapSize);const V=I.getFrameExtents();if(i.multiply(V),s.copy(I.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/V.x),i.x=s.x*V.x,I.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/V.y),i.y=s.y*V.y,I.mapSize.y=s.y)),I.map===null&&!I.isPointLightShadow&&this.type===bo&&(I.map=new _r(i.x,i.y),I.map.texture.name=j.name+".shadowMap",I.mapPass=new _r(i.x,i.y),I.camera.updateProjectionMatrix()),I.map===null){const U={minFilter:un,magFilter:un,format:ii};I.map=new _r(i.x,i.y,U),I.map.texture.name=j.name+".shadowMap",I.camera.updateProjectionMatrix()}r.setRenderTarget(I.map),r.clear();const N=I.getViewportCount();for(let U=0;U<N;U++){const H=I.getViewport(U);a.set(s.x*H.x,s.y*H.y,s.x*H.z,s.y*H.w),L.viewport(a),I.updateMatrices(j,U),n=I.getFrustum(),b(M,w,I.camera,j,this.type)}!I.isPointLightShadow&&this.type===bo&&_(I,w),I.needsUpdate=!1}p.needsUpdate=!1,r.setRenderTarget(E,y,S)};function _(v,M){const w=t.update(d);f.defines.VSM_SAMPLES!==v.blurSamples&&(f.defines.VSM_SAMPLES=v.blurSamples,m.defines.VSM_SAMPLES=v.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),f.uniforms.shadow_pass.value=v.map.texture,f.uniforms.resolution.value=v.mapSize,f.uniforms.radius.value=v.radius,r.setRenderTarget(v.mapPass),r.clear(),r.renderBufferDirect(M,null,w,f,d,null),m.uniforms.shadow_pass.value=v.mapPass.texture,m.uniforms.resolution.value=v.mapSize,m.uniforms.radius.value=v.radius,r.setRenderTarget(v.map),r.clear(),r.renderBufferDirect(M,null,w,m,d,null)}function x(v,M,w,E,y,S){let L=null;const R=w.isPointLight===!0?v.customDistanceMaterial:v.customDepthMaterial;if(R!==void 0?L=R:L=w.isPointLight===!0?l:o,r.localClippingEnabled&&M.clipShadows===!0&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0){const F=L.uuid,j=M.uuid;let I=c[F];I===void 0&&(I={},c[F]=I);let V=I[j];V===void 0&&(V=L.clone(),I[j]=V),L=V}return L.visible=M.visible,L.wireframe=M.wireframe,S===bo?L.side=M.shadowSide!==null?M.shadowSide:M.side:L.side=M.shadowSide!==null?M.shadowSide:u[M.side],L.alphaMap=M.alphaMap,L.alphaTest=M.alphaTest,L.clipShadows=M.clipShadows,L.clippingPlanes=M.clippingPlanes,L.clipIntersection=M.clipIntersection,L.displacementMap=M.displacementMap,L.displacementScale=M.displacementScale,L.displacementBias=M.displacementBias,L.wireframeLinewidth=M.wireframeLinewidth,L.linewidth=M.linewidth,w.isPointLight===!0&&L.isMeshDistanceMaterial===!0&&(L.referencePosition.setFromMatrixPosition(w.matrixWorld),L.nearDistance=E,L.farDistance=y),L}function b(v,M,w,E,y){if(v.visible===!1)return;if(v.layers.test(M.layers)&&(v.isMesh||v.isLine||v.isPoints)&&(v.castShadow||v.receiveShadow&&y===bo)&&(!v.frustumCulled||n.intersectsObject(v))){v.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,v.matrixWorld);const R=t.update(v),F=v.material;if(Array.isArray(F)){const j=R.groups;for(let I=0,V=j.length;I<V;I++){const N=j[I],U=F[N.materialIndex];if(U&&U.visible){const H=x(v,U,E,w.near,w.far,y);r.renderBufferDirect(w,null,R,H,v,N)}}}else if(F.visible){const j=x(v,F,E,w.near,w.far,y);r.renderBufferDirect(w,null,R,j,v,null)}}const L=v.children;for(let R=0,F=L.length;R<F;R++)b(L[R],M,w,E,y)}}function Lw(r,t,e){const n=e.isWebGL2;function i(){let O=!1;const dt=new Ue;let lt=null;const Ct=new Ue(0,0,0,0);return{setMask:function(mt){lt!==mt&&!O&&(r.colorMask(mt,mt,mt,mt),lt=mt)},setLocked:function(mt){O=mt},setClear:function(mt,bt,tt,Lt,Ut){Ut===!0&&(mt*=Lt,bt*=Lt,tt*=Lt),dt.set(mt,bt,tt,Lt),Ct.equals(dt)===!1&&(r.clearColor(mt,bt,tt,Lt),Ct.copy(dt))},reset:function(){O=!1,lt=null,Ct.set(-1,0,0,0)}}}function s(){let O=!1,dt=null,lt=null,Ct=null;return{setTest:function(mt){mt?q(2929):B(2929)},setMask:function(mt){dt!==mt&&!O&&(r.depthMask(mt),dt=mt)},setFunc:function(mt){if(lt!==mt){if(mt)switch(mt){case hx:r.depthFunc(512);break;case ux:r.depthFunc(519);break;case fx:r.depthFunc(513);break;case Ih:r.depthFunc(515);break;case dx:r.depthFunc(514);break;case px:r.depthFunc(518);break;case mx:r.depthFunc(516);break;case gx:r.depthFunc(517);break;default:r.depthFunc(515)}else r.depthFunc(515);lt=mt}},setLocked:function(mt){O=mt},setClear:function(mt){Ct!==mt&&(r.clearDepth(mt),Ct=mt)},reset:function(){O=!1,dt=null,lt=null,Ct=null}}}function a(){let O=!1,dt=null,lt=null,Ct=null,mt=null,bt=null,tt=null,Lt=null,Ut=null;return{setTest:function(Ht){O||(Ht?q(2960):B(2960))},setMask:function(Ht){dt!==Ht&&!O&&(r.stencilMask(Ht),dt=Ht)},setFunc:function(Ht,se,Me){(lt!==Ht||Ct!==se||mt!==Me)&&(r.stencilFunc(Ht,se,Me),lt=Ht,Ct=se,mt=Me)},setOp:function(Ht,se,Me){(bt!==Ht||tt!==se||Lt!==Me)&&(r.stencilOp(Ht,se,Me),bt=Ht,tt=se,Lt=Me)},setLocked:function(Ht){O=Ht},setClear:function(Ht){Ut!==Ht&&(r.clearStencil(Ht),Ut=Ht)},reset:function(){O=!1,dt=null,lt=null,Ct=null,mt=null,bt=null,tt=null,Lt=null,Ut=null}}}const o=new i,l=new s,c=new a;let h={},u={},f=new WeakMap,m=[],g=null,d=!1,p=null,_=null,x=null,b=null,v=null,M=null,w=null,E=!1,y=null,S=null,L=null,R=null,F=null;const j=r.getParameter(35661);let I=!1,V=0;const N=r.getParameter(7938);N.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(N)[1]),I=V>=1):N.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),I=V>=2);let U=null,H={};const k=r.getParameter(3088),C=r.getParameter(2978),Z=new Ue().fromArray(k),z=new Ue().fromArray(C);function K(O,dt,lt){const Ct=new Uint8Array(4),mt=r.createTexture();r.bindTexture(O,mt),r.texParameteri(O,10241,9728),r.texParameteri(O,10240,9728);for(let bt=0;bt<lt;bt++)r.texImage2D(dt+bt,0,6408,1,1,0,6408,5121,Ct);return mt}const J={};J[3553]=K(3553,3553,1),J[34067]=K(34067,34069,6),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),q(2929),l.setFunc(Ih),gt(!1),It(zf),q(2884),xt(gr);function q(O){h[O]!==!0&&(r.enable(O),h[O]=!0)}function B(O){h[O]!==!1&&(r.disable(O),h[O]=!1)}function at(O,dt){return u[O]!==dt?(r.bindFramebuffer(O,dt),u[O]=dt,n&&(O===36009&&(u[36160]=dt),O===36160&&(u[36009]=dt)),!0):!1}function rt(O,dt){let lt=m,Ct=!1;if(O)if(lt=f.get(dt),lt===void 0&&(lt=[],f.set(dt,lt)),O.isWebGLMultipleRenderTargets){const mt=O.texture;if(lt.length!==mt.length||lt[0]!==36064){for(let bt=0,tt=mt.length;bt<tt;bt++)lt[bt]=36064+bt;lt.length=mt.length,Ct=!0}}else lt[0]!==36064&&(lt[0]=36064,Ct=!0);else lt[0]!==1029&&(lt[0]=1029,Ct=!0);Ct&&(e.isWebGL2?r.drawBuffers(lt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(lt))}function ct(O){return g!==O?(r.useProgram(O),g=O,!0):!1}const ot={[Cs]:32774,[Qv]:32778,[tx]:32779};if(n)ot[Bf]=32775,ot[Vf]=32776;else{const O=t.get("EXT_blend_minmax");O!==null&&(ot[Bf]=O.MIN_EXT,ot[Vf]=O.MAX_EXT)}const yt={[ex]:0,[nx]:1,[ix]:768,[yg]:770,[cx]:776,[ax]:774,[sx]:772,[rx]:769,[Mg]:771,[lx]:775,[ox]:773};function xt(O,dt,lt,Ct,mt,bt,tt,Lt){if(O===gr){d===!0&&(B(3042),d=!1);return}if(d===!1&&(q(3042),d=!0),O!==Jv){if(O!==p||Lt!==E){if((_!==Cs||v!==Cs)&&(r.blendEquation(32774),_=Cs,v=Cs),Lt)switch(O){case Gs:r.blendFuncSeparate(1,771,1,771);break;case Nf:r.blendFunc(1,1);break;case kf:r.blendFuncSeparate(0,769,0,1);break;case Uf:r.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Gs:r.blendFuncSeparate(770,771,1,771);break;case Nf:r.blendFunc(770,1);break;case kf:r.blendFuncSeparate(0,769,0,1);break;case Uf:r.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}x=null,b=null,M=null,w=null,p=O,E=Lt}return}mt=mt||dt,bt=bt||lt,tt=tt||Ct,(dt!==_||mt!==v)&&(r.blendEquationSeparate(ot[dt],ot[mt]),_=dt,v=mt),(lt!==x||Ct!==b||bt!==M||tt!==w)&&(r.blendFuncSeparate(yt[lt],yt[Ct],yt[bt],yt[tt]),x=lt,b=Ct,M=bt,w=tt),p=O,E=null}function ut(O,dt){O.side===to?B(2884):q(2884);let lt=O.side===ri;dt&&(lt=!lt),gt(lt),O.blending===Gs&&O.transparent===!1?xt(gr):xt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.premultipliedAlpha),l.setFunc(O.depthFunc),l.setTest(O.depthTest),l.setMask(O.depthWrite),o.setMask(O.colorWrite);const Ct=O.stencilWrite;c.setTest(Ct),Ct&&(c.setMask(O.stencilWriteMask),c.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),c.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),X(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?q(32926):B(32926)}function gt(O){y!==O&&(O?r.frontFace(2304):r.frontFace(2305),y=O)}function It(O){O!==Yv?(q(2884),O!==S&&(O===zf?r.cullFace(1029):O===jv?r.cullFace(1028):r.cullFace(1032))):B(2884),S=O}function Gt(O){O!==L&&(I&&r.lineWidth(O),L=O)}function X(O,dt,lt){O?(q(32823),(R!==dt||F!==lt)&&(r.polygonOffset(dt,lt),R=dt,F=lt)):B(32823)}function Ot(O){O?q(3089):B(3089)}function At(O){O===void 0&&(O=33984+j-1),U!==O&&(r.activeTexture(O),U=O)}function Xt(O,dt){U===null&&At();let lt=H[U];lt===void 0&&(lt={type:void 0,texture:void 0},H[U]=lt),(lt.type!==O||lt.texture!==dt)&&(r.bindTexture(O,dt||J[O]),lt.type=O,lt.texture=dt)}function Pt(){const O=H[U];O!==void 0&&O.type!==void 0&&(r.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function P(){try{r.compressedTexImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function T(){try{r.texSubImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Q(){try{r.texSubImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function it(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ft(){try{r.texStorage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ht(){try{r.texStorage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Et(){try{r.texImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function D(){try{r.texImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function nt(O){Z.equals(O)===!1&&(r.scissor(O.x,O.y,O.z,O.w),Z.copy(O))}function pt(O){z.equals(O)===!1&&(r.viewport(O.x,O.y,O.z,O.w),z.copy(O))}function st(){r.disable(3042),r.disable(2884),r.disable(2929),r.disable(32823),r.disable(3089),r.disable(2960),r.disable(32926),r.blendEquation(32774),r.blendFunc(1,0),r.blendFuncSeparate(1,0,1,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(513),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(519,0,4294967295),r.stencilOp(7680,7680,7680),r.clearStencil(0),r.cullFace(1029),r.frontFace(2305),r.polygonOffset(0,0),r.activeTexture(33984),r.bindFramebuffer(36160,null),n===!0&&(r.bindFramebuffer(36009,null),r.bindFramebuffer(36008,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},U=null,H={},u={},f=new WeakMap,m=[],g=null,d=!1,p=null,_=null,x=null,b=null,v=null,M=null,w=null,E=!1,y=null,S=null,L=null,R=null,F=null,Z.set(0,0,r.canvas.width,r.canvas.height),z.set(0,0,r.canvas.width,r.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:q,disable:B,bindFramebuffer:at,drawBuffers:rt,useProgram:ct,setBlending:xt,setMaterial:ut,setFlipSided:gt,setCullFace:It,setLineWidth:Gt,setPolygonOffset:X,setScissorTest:Ot,activeTexture:At,bindTexture:Xt,unbindTexture:Pt,compressedTexImage2D:P,texImage2D:Et,texImage3D:D,texStorage2D:ft,texStorage3D:ht,texSubImage2D:T,texSubImage3D:Q,compressedTexSubImage2D:it,scissor:nt,viewport:pt,reset:st}}function Dw(r,t,e,n,i,s,a){const o=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,h=i.maxTextureSize,u=i.maxSamples,f=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let d;const p=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(P,T){return _?new OffscreenCanvas(P,T):wl("canvas")}function b(P,T,Q,it){let ft=1;if((P.width>it||P.height>it)&&(ft=it/Math.max(P.width,P.height)),ft<1||T===!0)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap){const ht=T?Bh:Math.floor,Et=ht(ft*P.width),D=ht(ft*P.height);d===void 0&&(d=x(Et,D));const nt=Q?x(Et,D):d;return nt.width=Et,nt.height=D,nt.getContext("2d").drawImage(P,0,0,Et,D),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+Et+"x"+D+")."),nt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),P;return P}function v(P){return dd(P.width)&&dd(P.height)}function M(P){return o?!1:P.wrapS!==ni||P.wrapT!==ni||P.minFilter!==un&&P.minFilter!==Vn}function w(P,T){return P.generateMipmaps&&T&&P.minFilter!==un&&P.minFilter!==Vn}function E(P){r.generateMipmap(P)}function y(P,T,Q,it,ft=!1){if(o===!1)return T;if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ht=T;return T===6403&&(Q===5126&&(ht=33326),Q===5131&&(ht=33325),Q===5121&&(ht=33321)),T===33319&&(Q===5126&&(ht=33328),Q===5131&&(ht=33327),Q===5121&&(ht=33323)),T===6408&&(Q===5126&&(ht=34836),Q===5131&&(ht=34842),Q===5121&&(ht=it===ge&&ft===!1?35907:32856),Q===32819&&(ht=32854),Q===32820&&(ht=32855)),(ht===33325||ht===33326||ht===33327||ht===33328||ht===34842||ht===34836)&&t.get("EXT_color_buffer_float"),ht}function S(P,T,Q){return w(P,Q)===!0||P.isFramebufferTexture&&P.minFilter!==un&&P.minFilter!==Vn?Math.log2(Math.max(T.width,T.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?T.mipmaps.length:1}function L(P){return P===un||P===Gf||P===Hf?9728:9729}function R(P){const T=P.target;T.removeEventListener("dispose",R),j(T),T.isVideoTexture&&g.delete(T)}function F(P){const T=P.target;T.removeEventListener("dispose",F),V(T)}function j(P){const T=n.get(P);if(T.__webglInit===void 0)return;const Q=P.source,it=p.get(Q);if(it){const ft=it[T.__cacheKey];ft.usedTimes--,ft.usedTimes===0&&I(P),Object.keys(it).length===0&&p.delete(Q)}n.remove(P)}function I(P){const T=n.get(P);r.deleteTexture(T.__webglTexture);const Q=P.source,it=p.get(Q);delete it[T.__cacheKey],a.memory.textures--}function V(P){const T=P.texture,Q=n.get(P),it=n.get(T);if(it.__webglTexture!==void 0&&(r.deleteTexture(it.__webglTexture),a.memory.textures--),P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let ft=0;ft<6;ft++)r.deleteFramebuffer(Q.__webglFramebuffer[ft]),Q.__webglDepthbuffer&&r.deleteRenderbuffer(Q.__webglDepthbuffer[ft]);else{if(r.deleteFramebuffer(Q.__webglFramebuffer),Q.__webglDepthbuffer&&r.deleteRenderbuffer(Q.__webglDepthbuffer),Q.__webglMultisampledFramebuffer&&r.deleteFramebuffer(Q.__webglMultisampledFramebuffer),Q.__webglColorRenderbuffer)for(let ft=0;ft<Q.__webglColorRenderbuffer.length;ft++)Q.__webglColorRenderbuffer[ft]&&r.deleteRenderbuffer(Q.__webglColorRenderbuffer[ft]);Q.__webglDepthRenderbuffer&&r.deleteRenderbuffer(Q.__webglDepthRenderbuffer)}if(P.isWebGLMultipleRenderTargets)for(let ft=0,ht=T.length;ft<ht;ft++){const Et=n.get(T[ft]);Et.__webglTexture&&(r.deleteTexture(Et.__webglTexture),a.memory.textures--),n.remove(T[ft])}n.remove(T),n.remove(P)}let N=0;function U(){N=0}function H(){const P=N;return P>=l&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+l),N+=1,P}function k(P){const T=[];return T.push(P.wrapS),T.push(P.wrapT),T.push(P.magFilter),T.push(P.minFilter),T.push(P.anisotropy),T.push(P.internalFormat),T.push(P.format),T.push(P.type),T.push(P.generateMipmaps),T.push(P.premultiplyAlpha),T.push(P.flipY),T.push(P.unpackAlignment),T.push(P.encoding),T.join()}function C(P,T){const Q=n.get(P);if(P.isVideoTexture&&Xt(P),P.isRenderTargetTexture===!1&&P.version>0&&Q.__version!==P.version){const it=P.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{rt(Q,P,T);return}}e.activeTexture(33984+T),e.bindTexture(3553,Q.__webglTexture)}function Z(P,T){const Q=n.get(P);if(P.version>0&&Q.__version!==P.version){rt(Q,P,T);return}e.activeTexture(33984+T),e.bindTexture(35866,Q.__webglTexture)}function z(P,T){const Q=n.get(P);if(P.version>0&&Q.__version!==P.version){rt(Q,P,T);return}e.activeTexture(33984+T),e.bindTexture(32879,Q.__webglTexture)}function K(P,T){const Q=n.get(P);if(P.version>0&&Q.__version!==P.version){ct(Q,P,T);return}e.activeTexture(33984+T),e.bindTexture(34067,Q.__webglTexture)}const J={[zh]:10497,[ni]:33071,[Nh]:33648},q={[un]:9728,[Gf]:9984,[Hf]:9986,[Vn]:9729,[wx]:9985,[Bl]:9987};function B(P,T,Q){if(Q?(r.texParameteri(P,10242,J[T.wrapS]),r.texParameteri(P,10243,J[T.wrapT]),(P===32879||P===35866)&&r.texParameteri(P,32882,J[T.wrapR]),r.texParameteri(P,10240,q[T.magFilter]),r.texParameteri(P,10241,q[T.minFilter])):(r.texParameteri(P,10242,33071),r.texParameteri(P,10243,33071),(P===32879||P===35866)&&r.texParameteri(P,32882,33071),(T.wrapS!==ni||T.wrapT!==ni)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(P,10240,L(T.magFilter)),r.texParameteri(P,10241,L(T.minFilter)),T.minFilter!==un&&T.minFilter!==Vn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),t.has("EXT_texture_filter_anisotropic")===!0){const it=t.get("EXT_texture_filter_anisotropic");if(T.type===Ur&&t.has("OES_texture_float_linear")===!1||o===!1&&T.type===Zo&&t.has("OES_texture_half_float_linear")===!1)return;(T.anisotropy>1||n.get(T).__currentAnisotropy)&&(r.texParameterf(P,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy)}}function at(P,T){let Q=!1;P.__webglInit===void 0&&(P.__webglInit=!0,T.addEventListener("dispose",R));const it=T.source;let ft=p.get(it);ft===void 0&&(ft={},p.set(it,ft));const ht=k(T);if(ht!==P.__cacheKey){ft[ht]===void 0&&(ft[ht]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,Q=!0),ft[ht].usedTimes++;const Et=ft[P.__cacheKey];Et!==void 0&&(ft[P.__cacheKey].usedTimes--,Et.usedTimes===0&&I(T)),P.__cacheKey=ht,P.__webglTexture=ft[ht].texture}return Q}function rt(P,T,Q){let it=3553;T.isDataArrayTexture&&(it=35866),T.isData3DTexture&&(it=32879);const ft=at(P,T),ht=T.source;if(e.activeTexture(33984+Q),e.bindTexture(it,P.__webglTexture),ht.version!==ht.__currentVersion||ft===!0){r.pixelStorei(37440,T.flipY),r.pixelStorei(37441,T.premultiplyAlpha),r.pixelStorei(3317,T.unpackAlignment),r.pixelStorei(37443,0);const Et=M(T)&&v(T.image)===!1;let D=b(T.image,Et,!1,h);D=Pt(T,D);const nt=v(D)||o,pt=s.convert(T.format,T.encoding);let st=s.convert(T.type),O=y(T.internalFormat,pt,st,T.encoding,T.isVideoTexture);B(it,T,nt);let dt;const lt=T.mipmaps,Ct=o&&T.isVideoTexture!==!0,mt=ht.__currentVersion===void 0||ft===!0,bt=S(T,D,nt);if(T.isDepthTexture)O=6402,o?T.type===Ur?O=36012:T.type===kr?O=33190:T.type===Hs?O=35056:O=33189:T.type===Ur&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===jr&&O===6402&&T.type!==Sg&&T.type!==kr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=kr,st=s.convert(T.type)),T.format===io&&O===6402&&(O=34041,T.type!==Hs&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=Hs,st=s.convert(T.type))),mt&&(Ct?e.texStorage2D(3553,1,O,D.width,D.height):e.texImage2D(3553,0,O,D.width,D.height,0,pt,st,null));else if(T.isDataTexture)if(lt.length>0&&nt){Ct&&mt&&e.texStorage2D(3553,bt,O,lt[0].width,lt[0].height);for(let tt=0,Lt=lt.length;tt<Lt;tt++)dt=lt[tt],Ct?e.texSubImage2D(3553,tt,0,0,dt.width,dt.height,pt,st,dt.data):e.texImage2D(3553,tt,O,dt.width,dt.height,0,pt,st,dt.data);T.generateMipmaps=!1}else Ct?(mt&&e.texStorage2D(3553,bt,O,D.width,D.height),e.texSubImage2D(3553,0,0,0,D.width,D.height,pt,st,D.data)):e.texImage2D(3553,0,O,D.width,D.height,0,pt,st,D.data);else if(T.isCompressedTexture){Ct&&mt&&e.texStorage2D(3553,bt,O,lt[0].width,lt[0].height);for(let tt=0,Lt=lt.length;tt<Lt;tt++)dt=lt[tt],T.format!==ii?pt!==null?Ct?e.compressedTexSubImage2D(3553,tt,0,0,dt.width,dt.height,pt,dt.data):e.compressedTexImage2D(3553,tt,O,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ct?e.texSubImage2D(3553,tt,0,0,dt.width,dt.height,pt,st,dt.data):e.texImage2D(3553,tt,O,dt.width,dt.height,0,pt,st,dt.data)}else if(T.isDataArrayTexture)Ct?(mt&&e.texStorage3D(35866,bt,O,D.width,D.height,D.depth),e.texSubImage3D(35866,0,0,0,0,D.width,D.height,D.depth,pt,st,D.data)):e.texImage3D(35866,0,O,D.width,D.height,D.depth,0,pt,st,D.data);else if(T.isData3DTexture)Ct?(mt&&e.texStorage3D(32879,bt,O,D.width,D.height,D.depth),e.texSubImage3D(32879,0,0,0,0,D.width,D.height,D.depth,pt,st,D.data)):e.texImage3D(32879,0,O,D.width,D.height,D.depth,0,pt,st,D.data);else if(T.isFramebufferTexture){if(mt)if(Ct)e.texStorage2D(3553,bt,O,D.width,D.height);else{let tt=D.width,Lt=D.height;for(let Ut=0;Ut<bt;Ut++)e.texImage2D(3553,Ut,O,tt,Lt,0,pt,st,null),tt>>=1,Lt>>=1}}else if(lt.length>0&&nt){Ct&&mt&&e.texStorage2D(3553,bt,O,lt[0].width,lt[0].height);for(let tt=0,Lt=lt.length;tt<Lt;tt++)dt=lt[tt],Ct?e.texSubImage2D(3553,tt,0,0,pt,st,dt):e.texImage2D(3553,tt,O,pt,st,dt);T.generateMipmaps=!1}else Ct?(mt&&e.texStorage2D(3553,bt,O,D.width,D.height),e.texSubImage2D(3553,0,0,0,pt,st,D)):e.texImage2D(3553,0,O,pt,st,D);w(T,nt)&&E(it),ht.__currentVersion=ht.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function ct(P,T,Q){if(T.image.length!==6)return;const it=at(P,T),ft=T.source;if(e.activeTexture(33984+Q),e.bindTexture(34067,P.__webglTexture),ft.version!==ft.__currentVersion||it===!0){r.pixelStorei(37440,T.flipY),r.pixelStorei(37441,T.premultiplyAlpha),r.pixelStorei(3317,T.unpackAlignment),r.pixelStorei(37443,0);const ht=T.isCompressedTexture||T.image[0].isCompressedTexture,Et=T.image[0]&&T.image[0].isDataTexture,D=[];for(let tt=0;tt<6;tt++)!ht&&!Et?D[tt]=b(T.image[tt],!1,!0,c):D[tt]=Et?T.image[tt].image:T.image[tt],D[tt]=Pt(T,D[tt]);const nt=D[0],pt=v(nt)||o,st=s.convert(T.format,T.encoding),O=s.convert(T.type),dt=y(T.internalFormat,st,O,T.encoding),lt=o&&T.isVideoTexture!==!0,Ct=ft.__currentVersion===void 0||it===!0;let mt=S(T,nt,pt);B(34067,T,pt);let bt;if(ht){lt&&Ct&&e.texStorage2D(34067,mt,dt,nt.width,nt.height);for(let tt=0;tt<6;tt++){bt=D[tt].mipmaps;for(let Lt=0;Lt<bt.length;Lt++){const Ut=bt[Lt];T.format!==ii?st!==null?lt?e.compressedTexSubImage2D(34069+tt,Lt,0,0,Ut.width,Ut.height,st,Ut.data):e.compressedTexImage2D(34069+tt,Lt,dt,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):lt?e.texSubImage2D(34069+tt,Lt,0,0,Ut.width,Ut.height,st,O,Ut.data):e.texImage2D(34069+tt,Lt,dt,Ut.width,Ut.height,0,st,O,Ut.data)}}}else{bt=T.mipmaps,lt&&Ct&&(bt.length>0&&mt++,e.texStorage2D(34067,mt,dt,D[0].width,D[0].height));for(let tt=0;tt<6;tt++)if(Et){lt?e.texSubImage2D(34069+tt,0,0,0,D[tt].width,D[tt].height,st,O,D[tt].data):e.texImage2D(34069+tt,0,dt,D[tt].width,D[tt].height,0,st,O,D[tt].data);for(let Lt=0;Lt<bt.length;Lt++){const Ht=bt[Lt].image[tt].image;lt?e.texSubImage2D(34069+tt,Lt+1,0,0,Ht.width,Ht.height,st,O,Ht.data):e.texImage2D(34069+tt,Lt+1,dt,Ht.width,Ht.height,0,st,O,Ht.data)}}else{lt?e.texSubImage2D(34069+tt,0,0,0,st,O,D[tt]):e.texImage2D(34069+tt,0,dt,st,O,D[tt]);for(let Lt=0;Lt<bt.length;Lt++){const Ut=bt[Lt];lt?e.texSubImage2D(34069+tt,Lt+1,0,0,st,O,Ut.image[tt]):e.texImage2D(34069+tt,Lt+1,dt,st,O,Ut.image[tt])}}}w(T,pt)&&E(34067),ft.__currentVersion=ft.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function ot(P,T,Q,it,ft){const ht=s.convert(Q.format,Q.encoding),Et=s.convert(Q.type),D=y(Q.internalFormat,ht,Et,Q.encoding);n.get(T).__hasExternalTextures||(ft===32879||ft===35866?e.texImage3D(ft,0,D,T.width,T.height,T.depth,0,ht,Et,null):e.texImage2D(ft,0,D,T.width,T.height,0,ht,Et,null)),e.bindFramebuffer(36160,P),At(T)?f.framebufferTexture2DMultisampleEXT(36160,it,ft,n.get(Q).__webglTexture,0,Ot(T)):r.framebufferTexture2D(36160,it,ft,n.get(Q).__webglTexture,0),e.bindFramebuffer(36160,null)}function yt(P,T,Q){if(r.bindRenderbuffer(36161,P),T.depthBuffer&&!T.stencilBuffer){let it=33189;if(Q||At(T)){const ft=T.depthTexture;ft&&ft.isDepthTexture&&(ft.type===Ur?it=36012:ft.type===kr&&(it=33190));const ht=Ot(T);At(T)?f.renderbufferStorageMultisampleEXT(36161,ht,it,T.width,T.height):r.renderbufferStorageMultisample(36161,ht,it,T.width,T.height)}else r.renderbufferStorage(36161,it,T.width,T.height);r.framebufferRenderbuffer(36160,36096,36161,P)}else if(T.depthBuffer&&T.stencilBuffer){const it=Ot(T);Q&&At(T)===!1?r.renderbufferStorageMultisample(36161,it,35056,T.width,T.height):At(T)?f.renderbufferStorageMultisampleEXT(36161,it,35056,T.width,T.height):r.renderbufferStorage(36161,34041,T.width,T.height),r.framebufferRenderbuffer(36160,33306,36161,P)}else{const it=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let ft=0;ft<it.length;ft++){const ht=it[ft],Et=s.convert(ht.format,ht.encoding),D=s.convert(ht.type),nt=y(ht.internalFormat,Et,D,ht.encoding),pt=Ot(T);Q&&At(T)===!1?r.renderbufferStorageMultisample(36161,pt,nt,T.width,T.height):At(T)?f.renderbufferStorageMultisampleEXT(36161,pt,nt,T.width,T.height):r.renderbufferStorage(36161,nt,T.width,T.height)}}r.bindRenderbuffer(36161,null)}function xt(P,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,P),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),C(T.depthTexture,0);const it=n.get(T.depthTexture).__webglTexture,ft=Ot(T);if(T.depthTexture.format===jr)At(T)?f.framebufferTexture2DMultisampleEXT(36160,36096,3553,it,0,ft):r.framebufferTexture2D(36160,36096,3553,it,0);else if(T.depthTexture.format===io)At(T)?f.framebufferTexture2DMultisampleEXT(36160,33306,3553,it,0,ft):r.framebufferTexture2D(36160,33306,3553,it,0);else throw new Error("Unknown depthTexture format")}function ut(P){const T=n.get(P),Q=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!T.__autoAllocateDepthBuffer){if(Q)throw new Error("target.depthTexture not supported in Cube render targets");xt(T.__webglFramebuffer,P)}else if(Q){T.__webglDepthbuffer=[];for(let it=0;it<6;it++)e.bindFramebuffer(36160,T.__webglFramebuffer[it]),T.__webglDepthbuffer[it]=r.createRenderbuffer(),yt(T.__webglDepthbuffer[it],P,!1)}else e.bindFramebuffer(36160,T.__webglFramebuffer),T.__webglDepthbuffer=r.createRenderbuffer(),yt(T.__webglDepthbuffer,P,!1);e.bindFramebuffer(36160,null)}function gt(P,T,Q){const it=n.get(P);T!==void 0&&ot(it.__webglFramebuffer,P,P.texture,36064,3553),Q!==void 0&&ut(P)}function It(P){const T=P.texture,Q=n.get(P),it=n.get(T);P.addEventListener("dispose",F),P.isWebGLMultipleRenderTargets!==!0&&(it.__webglTexture===void 0&&(it.__webglTexture=r.createTexture()),it.__version=T.version,a.memory.textures++);const ft=P.isWebGLCubeRenderTarget===!0,ht=P.isWebGLMultipleRenderTargets===!0,Et=v(P)||o;if(ft){Q.__webglFramebuffer=[];for(let D=0;D<6;D++)Q.__webglFramebuffer[D]=r.createFramebuffer()}else{if(Q.__webglFramebuffer=r.createFramebuffer(),ht)if(i.drawBuffers){const D=P.texture;for(let nt=0,pt=D.length;nt<pt;nt++){const st=n.get(D[nt]);st.__webglTexture===void 0&&(st.__webglTexture=r.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&P.samples>0&&At(P)===!1){const D=ht?T:[T];Q.__webglMultisampledFramebuffer=r.createFramebuffer(),Q.__webglColorRenderbuffer=[],e.bindFramebuffer(36160,Q.__webglMultisampledFramebuffer);for(let nt=0;nt<D.length;nt++){const pt=D[nt];Q.__webglColorRenderbuffer[nt]=r.createRenderbuffer(),r.bindRenderbuffer(36161,Q.__webglColorRenderbuffer[nt]);const st=s.convert(pt.format,pt.encoding),O=s.convert(pt.type),dt=y(pt.internalFormat,st,O,pt.encoding),lt=Ot(P);r.renderbufferStorageMultisample(36161,lt,dt,P.width,P.height),r.framebufferRenderbuffer(36160,36064+nt,36161,Q.__webglColorRenderbuffer[nt])}r.bindRenderbuffer(36161,null),P.depthBuffer&&(Q.__webglDepthRenderbuffer=r.createRenderbuffer(),yt(Q.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(36160,null)}}if(ft){e.bindTexture(34067,it.__webglTexture),B(34067,T,Et);for(let D=0;D<6;D++)ot(Q.__webglFramebuffer[D],P,T,36064,34069+D);w(T,Et)&&E(34067),e.unbindTexture()}else if(ht){const D=P.texture;for(let nt=0,pt=D.length;nt<pt;nt++){const st=D[nt],O=n.get(st);e.bindTexture(3553,O.__webglTexture),B(3553,st,Et),ot(Q.__webglFramebuffer,P,st,36064+nt,3553),w(st,Et)&&E(3553)}e.unbindTexture()}else{let D=3553;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(o?D=P.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(D,it.__webglTexture),B(D,T,Et),ot(Q.__webglFramebuffer,P,T,36064,D),w(T,Et)&&E(D),e.unbindTexture()}P.depthBuffer&&ut(P)}function Gt(P){const T=v(P)||o,Q=P.isWebGLMultipleRenderTargets===!0?P.texture:[P.texture];for(let it=0,ft=Q.length;it<ft;it++){const ht=Q[it];if(w(ht,T)){const Et=P.isWebGLCubeRenderTarget?34067:3553,D=n.get(ht).__webglTexture;e.bindTexture(Et,D),E(Et),e.unbindTexture()}}}function X(P){if(o&&P.samples>0&&At(P)===!1){const T=P.isWebGLMultipleRenderTargets?P.texture:[P.texture],Q=P.width,it=P.height;let ft=16384;const ht=[],Et=P.stencilBuffer?33306:36096,D=n.get(P),nt=P.isWebGLMultipleRenderTargets===!0;if(nt)for(let pt=0;pt<T.length;pt++)e.bindFramebuffer(36160,D.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+pt,36161,null),e.bindFramebuffer(36160,D.__webglFramebuffer),r.framebufferTexture2D(36009,36064+pt,3553,null,0);e.bindFramebuffer(36008,D.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,D.__webglFramebuffer);for(let pt=0;pt<T.length;pt++){ht.push(36064+pt),P.depthBuffer&&ht.push(Et);const st=D.__ignoreDepthValues!==void 0?D.__ignoreDepthValues:!1;if(st===!1&&(P.depthBuffer&&(ft|=256),P.stencilBuffer&&(ft|=1024)),nt&&r.framebufferRenderbuffer(36008,36064,36161,D.__webglColorRenderbuffer[pt]),st===!0&&(r.invalidateFramebuffer(36008,[Et]),r.invalidateFramebuffer(36009,[Et])),nt){const O=n.get(T[pt]).__webglTexture;r.framebufferTexture2D(36009,36064,3553,O,0)}r.blitFramebuffer(0,0,Q,it,0,0,Q,it,ft,9728),m&&r.invalidateFramebuffer(36008,ht)}if(e.bindFramebuffer(36008,null),e.bindFramebuffer(36009,null),nt)for(let pt=0;pt<T.length;pt++){e.bindFramebuffer(36160,D.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+pt,36161,D.__webglColorRenderbuffer[pt]);const st=n.get(T[pt]).__webglTexture;e.bindFramebuffer(36160,D.__webglFramebuffer),r.framebufferTexture2D(36009,36064+pt,3553,st,0)}e.bindFramebuffer(36009,D.__webglMultisampledFramebuffer)}}function Ot(P){return Math.min(u,P.samples)}function At(P){const T=n.get(P);return o&&P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Xt(P){const T=a.render.frame;g.get(P)!==T&&(g.set(P,T),P.update())}function Pt(P,T){const Q=P.encoding,it=P.format,ft=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===kh||Q!==is&&(Q===ge?o===!1?t.has("EXT_sRGB")===!0&&it===ii?(P.format=kh,P.minFilter=Vn,P.generateMipmaps=!1):T=Eg.sRGBToLinear(T):(it!==ii||ft!==ns)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",Q)),T}this.allocateTextureUnit=H,this.resetTextureUnits=U,this.setTexture2D=C,this.setTexture2DArray=Z,this.setTexture3D=z,this.setTextureCube=K,this.rebindTextures=gt,this.setupRenderTarget=It,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=X,this.setupDepthRenderbuffer=ut,this.setupFrameBufferTexture=ot,this.useMultisampledRTT=At}function Pw(r,t,e){const n=e.isWebGL2;function i(s,a=null){let o;if(s===ns)return 5121;if(s===Cx)return 32819;if(s===Lx)return 32820;if(s===Tx)return 5120;if(s===Ex)return 5122;if(s===Sg)return 5123;if(s===Ax)return 5124;if(s===kr)return 5125;if(s===Ur)return 5126;if(s===Zo)return n?5131:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Dx)return 6406;if(s===ii)return 6408;if(s===Rx)return 6409;if(s===Ix)return 6410;if(s===jr)return 6402;if(s===io)return 34041;if(s===Fx)return 6403;if(s===Px)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(s===kh)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Ox)return 36244;if(s===zx)return 33319;if(s===Nx)return 33320;if(s===kx)return 36249;if(s===uc||s===fc||s===dc||s===pc)if(a===ge)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===uc)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===fc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===dc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===pc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===uc)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===fc)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===dc)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===pc)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Wf||s===$f||s===Xf||s===qf)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Wf)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===$f)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Xf)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===qf)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Ux)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Yf||s===jf)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Yf)return a===ge?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===jf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Zf||s===Kf||s===Jf||s===Qf||s===td||s===ed||s===nd||s===id||s===rd||s===sd||s===od||s===ad||s===ld||s===cd)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Zf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Kf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Jf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Qf)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===td)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===ed)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===nd)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===id)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===rd)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===sd)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===od)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===ad)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===ld)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===cd)return a===ge?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===hd)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(s===hd)return a===ge?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return s===Hs?n?34042:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class Rw extends Gn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ba extends rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Iw={type:"move"};class Hc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ba,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ba,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ba,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred")if(o!==null&&(i=e.getPose(t.targetRaySpace,n),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Iw))),c&&t.hand){a=!0;for(const d of t.hand.values()){const p=e.getJointPose(d,n);if(c.joints[d.jointName]===void 0){const x=new Ba;x.matrixAutoUpdate=!1,x.visible=!1,c.joints[d.jointName]=x,c.add(x)}const _=c.joints[d.jointName];p!==null&&(_.matrix.fromArray(p.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.jointRadius=p.radius),_.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}}class Fw extends oi{constructor(t,e,n,i,s,a,o,l,c,h){if(h=h!==void 0?h:jr,h!==jr&&h!==io)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===jr&&(n=kr),n===void 0&&h===io&&(n=Hs),super(null,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:un,this.minFilter=l!==void 0?l:un,this.flipY=!1,this.generateMipmaps=!1}}class Ow extends os{constructor(t,e){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=null,c=null,h=null,u=null,f=null,m=null;const g=e.getContextAttributes();let d=null,p=null;const _=[],x=new Map,b=new Gn;b.layers.enable(1),b.viewport=new Ue;const v=new Gn;v.layers.enable(2),v.viewport=new Ue;const M=[b,v],w=new Rw;w.layers.enable(1),w.layers.enable(2);let E=null,y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let C=_[k];return C===void 0&&(C=new Hc,_[k]=C),C.getTargetRaySpace()},this.getControllerGrip=function(k){let C=_[k];return C===void 0&&(C=new Hc,_[k]=C),C.getGripSpace()},this.getHand=function(k){let C=_[k];return C===void 0&&(C=new Hc,_[k]=C),C.getHandSpace()};function S(k){const C=x.get(k.inputSource);C!==void 0&&C.dispatchEvent({type:k.type,data:k.inputSource})}function L(){i.removeEventListener("select",S),i.removeEventListener("selectstart",S),i.removeEventListener("selectend",S),i.removeEventListener("squeeze",S),i.removeEventListener("squeezestart",S),i.removeEventListener("squeezeend",S),i.removeEventListener("end",L),i.removeEventListener("inputsourceschange",R),x.forEach(function(k,C){k!==void 0&&k.disconnect(C)}),x.clear(),E=null,y=null,t.setRenderTarget(d),f=null,u=null,h=null,i=null,p=null,H.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){s=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){o=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(k){l=k},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(k){if(i=k,i!==null){if(d=t.getRenderTarget(),i.addEventListener("select",S),i.addEventListener("selectstart",S),i.addEventListener("selectend",S),i.addEventListener("squeeze",S),i.addEventListener("squeezestart",S),i.addEventListener("squeezeend",S),i.addEventListener("end",L),i.addEventListener("inputsourceschange",R),g.xrCompatible!==!0&&await e.makeXRCompatible(),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const C={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:g.alpha,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,C),i.updateRenderState({baseLayer:f}),p=new _r(f.framebufferWidth,f.framebufferHeight,{format:ii,type:ns,encoding:t.outputEncoding})}else{let C=null,Z=null,z=null;g.depth&&(z=g.stencil?35056:33190,C=g.stencil?io:jr,Z=g.stencil?Hs:kr);const K={colorFormat:t.outputEncoding===ge?35907:32856,depthFormat:z,scaleFactor:s};h=new XRWebGLBinding(i,e),u=h.createProjectionLayer(K),i.updateRenderState({layers:[u]}),p=new _r(u.textureWidth,u.textureHeight,{format:ii,type:ns,depthTexture:new Fw(u.textureWidth,u.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,C),stencilBuffer:g.stencil,encoding:t.outputEncoding,samples:g.antialias?4:0});const J=t.properties.get(p);J.__ignoreDepthValues=u.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(1),l=null,a=await i.requestReferenceSpace(o),H.setContext(i),H.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function R(k){const C=i.inputSources;for(let Z=0;Z<C.length;Z++){const z=C[Z].handedness==="right"?1:0;x.set(C[Z],_[z])}for(let Z=0;Z<k.removed.length;Z++){const z=k.removed[Z],K=x.get(z);K&&(K.dispatchEvent({type:"disconnected",data:z}),x.delete(z))}for(let Z=0;Z<k.added.length;Z++){const z=k.added[Z],K=x.get(z);K&&K.dispatchEvent({type:"connected",data:z})}}const F=new G,j=new G;function I(k,C,Z){F.setFromMatrixPosition(C.matrixWorld),j.setFromMatrixPosition(Z.matrixWorld);const z=F.distanceTo(j),K=C.projectionMatrix.elements,J=Z.projectionMatrix.elements,q=K[14]/(K[10]-1),B=K[14]/(K[10]+1),at=(K[9]+1)/K[5],rt=(K[9]-1)/K[5],ct=(K[8]-1)/K[0],ot=(J[8]+1)/J[0],yt=q*ct,xt=q*ot,ut=z/(-ct+ot),gt=ut*-ct;C.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(gt),k.translateZ(ut),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert();const It=q+ut,Gt=B+ut,X=yt-gt,Ot=xt+(z-gt),At=at*B/Gt*It,Xt=rt*B/Gt*It;k.projectionMatrix.makePerspective(X,Ot,At,Xt,It,Gt)}function V(k,C){C===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(C.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(i===null)return;w.near=v.near=b.near=k.near,w.far=v.far=b.far=k.far,(E!==w.near||y!==w.far)&&(i.updateRenderState({depthNear:w.near,depthFar:w.far}),E=w.near,y=w.far);const C=k.parent,Z=w.cameras;V(w,C);for(let K=0;K<Z.length;K++)V(Z[K],C);w.matrixWorld.decompose(w.position,w.quaternion,w.scale),k.position.copy(w.position),k.quaternion.copy(w.quaternion),k.scale.copy(w.scale),k.matrix.copy(w.matrix),k.matrixWorld.copy(w.matrixWorld);const z=k.children;for(let K=0,J=z.length;K<J;K++)z[K].updateMatrixWorld(!0);Z.length===2?I(w,b,v):w.projectionMatrix.copy(b.projectionMatrix)},this.getCamera=function(){return w},this.getFoveation=function(){if(u!==null)return u.fixedFoveation;if(f!==null)return f.fixedFoveation},this.setFoveation=function(k){u!==null&&(u.fixedFoveation=k),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=k)};let N=null;function U(k,C){if(c=C.getViewerPose(l||a),m=C,c!==null){const z=c.views;f!==null&&(t.setRenderTargetFramebuffer(p,f.framebuffer),t.setRenderTarget(p));let K=!1;z.length!==w.cameras.length&&(w.cameras.length=0,K=!0);for(let J=0;J<z.length;J++){const q=z[J];let B=null;if(f!==null)B=f.getViewport(q);else{const rt=h.getViewSubImage(u,q);B=rt.viewport,J===0&&(t.setRenderTargetTextures(p,rt.colorTexture,u.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(p))}let at=M[J];at===void 0&&(at=new Gn,at.layers.enable(J),at.viewport=new Ue,M[J]=at),at.matrix.fromArray(q.transform.matrix),at.projectionMatrix.fromArray(q.projectionMatrix),at.viewport.set(B.x,B.y,B.width,B.height),J===0&&w.matrix.copy(at.matrix),K===!0&&w.cameras.push(at)}}const Z=i.inputSources;for(let z=0;z<_.length;z++){const K=Z[z],J=x.get(K);J!==void 0&&J.update(K,C,l||a)}N&&N(k,C),m=null}const H=new Og;H.setAnimationLoop(U),this.setAnimationLoop=function(k){N=k},this.dispose=function(){}}}function zw(r,t){function e(d,p){d.fogColor.value.copy(p.color),p.isFog?(d.fogNear.value=p.near,d.fogFar.value=p.far):p.isFogExp2&&(d.fogDensity.value=p.density)}function n(d,p,_,x,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?i(d,p):p.isMeshToonMaterial?(i(d,p),h(d,p)):p.isMeshPhongMaterial?(i(d,p),c(d,p)):p.isMeshStandardMaterial?(i(d,p),u(d,p),p.isMeshPhysicalMaterial&&f(d,p,b)):p.isMeshMatcapMaterial?(i(d,p),m(d,p)):p.isMeshDepthMaterial?i(d,p):p.isMeshDistanceMaterial?(i(d,p),g(d,p)):p.isMeshNormalMaterial?i(d,p):p.isLineBasicMaterial?(s(d,p),p.isLineDashedMaterial&&a(d,p)):p.isPointsMaterial?o(d,p,_,x):p.isSpriteMaterial?l(d,p):p.isShadowMaterial?(d.color.value.copy(p.color),d.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function i(d,p){d.opacity.value=p.opacity,p.color&&d.diffuse.value.copy(p.color),p.emissive&&d.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(d.map.value=p.map),p.alphaMap&&(d.alphaMap.value=p.alphaMap),p.bumpMap&&(d.bumpMap.value=p.bumpMap,d.bumpScale.value=p.bumpScale,p.side===ri&&(d.bumpScale.value*=-1)),p.displacementMap&&(d.displacementMap.value=p.displacementMap,d.displacementScale.value=p.displacementScale,d.displacementBias.value=p.displacementBias),p.emissiveMap&&(d.emissiveMap.value=p.emissiveMap),p.normalMap&&(d.normalMap.value=p.normalMap,d.normalScale.value.copy(p.normalScale),p.side===ri&&d.normalScale.value.negate()),p.specularMap&&(d.specularMap.value=p.specularMap),p.alphaTest>0&&(d.alphaTest.value=p.alphaTest);const _=t.get(p).envMap;if(_&&(d.envMap.value=_,d.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=p.reflectivity,d.ior.value=p.ior,d.refractionRatio.value=p.refractionRatio),p.lightMap){d.lightMap.value=p.lightMap;const v=r.physicallyCorrectLights!==!0?Math.PI:1;d.lightMapIntensity.value=p.lightMapIntensity*v}p.aoMap&&(d.aoMap.value=p.aoMap,d.aoMapIntensity.value=p.aoMapIntensity);let x;p.map?x=p.map:p.specularMap?x=p.specularMap:p.displacementMap?x=p.displacementMap:p.normalMap?x=p.normalMap:p.bumpMap?x=p.bumpMap:p.roughnessMap?x=p.roughnessMap:p.metalnessMap?x=p.metalnessMap:p.alphaMap?x=p.alphaMap:p.emissiveMap?x=p.emissiveMap:p.clearcoatMap?x=p.clearcoatMap:p.clearcoatNormalMap?x=p.clearcoatNormalMap:p.clearcoatRoughnessMap?x=p.clearcoatRoughnessMap:p.iridescenceMap?x=p.iridescenceMap:p.iridescenceThicknessMap?x=p.iridescenceThicknessMap:p.specularIntensityMap?x=p.specularIntensityMap:p.specularColorMap?x=p.specularColorMap:p.transmissionMap?x=p.transmissionMap:p.thicknessMap?x=p.thicknessMap:p.sheenColorMap?x=p.sheenColorMap:p.sheenRoughnessMap&&(x=p.sheenRoughnessMap),x!==void 0&&(x.isWebGLRenderTarget&&(x=x.texture),x.matrixAutoUpdate===!0&&x.updateMatrix(),d.uvTransform.value.copy(x.matrix));let b;p.aoMap?b=p.aoMap:p.lightMap&&(b=p.lightMap),b!==void 0&&(b.isWebGLRenderTarget&&(b=b.texture),b.matrixAutoUpdate===!0&&b.updateMatrix(),d.uv2Transform.value.copy(b.matrix))}function s(d,p){d.diffuse.value.copy(p.color),d.opacity.value=p.opacity}function a(d,p){d.dashSize.value=p.dashSize,d.totalSize.value=p.dashSize+p.gapSize,d.scale.value=p.scale}function o(d,p,_,x){d.diffuse.value.copy(p.color),d.opacity.value=p.opacity,d.size.value=p.size*_,d.scale.value=x*.5,p.map&&(d.map.value=p.map),p.alphaMap&&(d.alphaMap.value=p.alphaMap),p.alphaTest>0&&(d.alphaTest.value=p.alphaTest);let b;p.map?b=p.map:p.alphaMap&&(b=p.alphaMap),b!==void 0&&(b.matrixAutoUpdate===!0&&b.updateMatrix(),d.uvTransform.value.copy(b.matrix))}function l(d,p){d.diffuse.value.copy(p.color),d.opacity.value=p.opacity,d.rotation.value=p.rotation,p.map&&(d.map.value=p.map),p.alphaMap&&(d.alphaMap.value=p.alphaMap),p.alphaTest>0&&(d.alphaTest.value=p.alphaTest);let _;p.map?_=p.map:p.alphaMap&&(_=p.alphaMap),_!==void 0&&(_.matrixAutoUpdate===!0&&_.updateMatrix(),d.uvTransform.value.copy(_.matrix))}function c(d,p){d.specular.value.copy(p.specular),d.shininess.value=Math.max(p.shininess,1e-4)}function h(d,p){p.gradientMap&&(d.gradientMap.value=p.gradientMap)}function u(d,p){d.roughness.value=p.roughness,d.metalness.value=p.metalness,p.roughnessMap&&(d.roughnessMap.value=p.roughnessMap),p.metalnessMap&&(d.metalnessMap.value=p.metalnessMap),t.get(p).envMap&&(d.envMapIntensity.value=p.envMapIntensity)}function f(d,p,_){d.ior.value=p.ior,p.sheen>0&&(d.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),d.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(d.sheenColorMap.value=p.sheenColorMap),p.sheenRoughnessMap&&(d.sheenRoughnessMap.value=p.sheenRoughnessMap)),p.clearcoat>0&&(d.clearcoat.value=p.clearcoat,d.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(d.clearcoatMap.value=p.clearcoatMap),p.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap),p.clearcoatNormalMap&&(d.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),d.clearcoatNormalMap.value=p.clearcoatNormalMap,p.side===ri&&d.clearcoatNormalScale.value.negate())),p.iridescence>0&&(d.iridescence.value=p.iridescence,d.iridescenceIOR.value=p.iridescenceIOR,d.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(d.iridescenceMap.value=p.iridescenceMap),p.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=p.iridescenceThicknessMap)),p.transmission>0&&(d.transmission.value=p.transmission,d.transmissionSamplerMap.value=_.texture,d.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(d.transmissionMap.value=p.transmissionMap),d.thickness.value=p.thickness,p.thicknessMap&&(d.thicknessMap.value=p.thicknessMap),d.attenuationDistance.value=p.attenuationDistance,d.attenuationColor.value.copy(p.attenuationColor)),d.specularIntensity.value=p.specularIntensity,d.specularColor.value.copy(p.specularColor),p.specularIntensityMap&&(d.specularIntensityMap.value=p.specularIntensityMap),p.specularColorMap&&(d.specularColorMap.value=p.specularColorMap)}function m(d,p){p.matcap&&(d.matcap.value=p.matcap)}function g(d,p){d.referencePosition.value.copy(p.referencePosition),d.nearDistance.value=p.nearDistance,d.farDistance.value=p.farDistance}return{refreshFogUniforms:e,refreshMaterialUniforms:n}}function Nw(){const r=wl("canvas");return r.style.display="block",r}function kw(r={}){this.isWebGLRenderer=!0;const t=r.canvas!==void 0?r.canvas:Nw(),e=r.context!==void 0?r.context:null,n=r.depth!==void 0?r.depth:!0,i=r.stencil!==void 0?r.stencil:!0,s=r.antialias!==void 0?r.antialias:!1,a=r.premultipliedAlpha!==void 0?r.premultipliedAlpha:!0,o=r.preserveDrawingBuffer!==void 0?r.preserveDrawingBuffer:!1,l=r.powerPreference!==void 0?r.powerPreference:"default",c=r.failIfMajorPerformanceCaveat!==void 0?r.failIfMajorPerformanceCaveat:!1;let h;e!==null?h=e.getContextAttributes().alpha:h=r.alpha!==void 0?r.alpha:!1;let u=null,f=null;const m=[],g=[];this.domElement=t,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=is,this.physicallyCorrectLights=!1,this.toneMapping=Wi,this.toneMappingExposure=1,Object.defineProperties(this,{gammaFactor:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaFactor has been removed."),2},set:function(){console.warn("THREE.WebGLRenderer: .gammaFactor has been removed.")}}});const d=this;let p=!1,_=0,x=0,b=null,v=-1,M=null;const w=new Ue,E=new Ue;let y=null,S=t.width,L=t.height,R=1,F=null,j=null;const I=new Ue(0,0,S,L),V=new Ue(0,0,S,L);let N=!1;const U=new Cu;let H=!1,k=!1,C=null;const Z=new Pe,z=new $t,K=new G,J={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function q(){return b===null?R:1}let B=e;function at(A,W){for(let $=0;$<A.length;$++){const Y=A[$],et=t.getContext(Y,W);if(et!==null)return et}return null}try{const A={alpha:!0,depth:n,stencil:i,antialias:s,premultipliedAlpha:a,preserveDrawingBuffer:o,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Eu}`),t.addEventListener("webglcontextlost",O,!1),t.addEventListener("webglcontextrestored",dt,!1),t.addEventListener("webglcontextcreationerror",lt,!1),B===null){const W=["webgl2","webgl","experimental-webgl"];if(d.isWebGL1Renderer===!0&&W.shift(),B=at(W,A),B===null)throw at(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let rt,ct,ot,yt,xt,ut,gt,It,Gt,X,Ot,At,Xt,Pt,P,T,Q,it,ft,ht,Et,D,nt;function pt(){rt=new Zb(B),ct=new Hb(B,rt,r),rt.init(ct),D=new Pw(B,rt,ct),ot=new Lw(B,rt,ct),yt=new Qb,xt=new _w,ut=new Dw(B,rt,ot,xt,ct,D,yt),gt=new $b(d),It=new jb(d),Gt=new hy(B,ct),nt=new Vb(B,rt,Gt,ct),X=new Kb(B,Gt,yt,nt),Ot=new iS(B,X,Gt,yt),ft=new nS(B,ct,ut),T=new Wb(xt),At=new gw(d,gt,It,rt,ct,nt,T),Xt=new zw(d,xt),Pt=new xw,P=new Tw(rt,ct),it=new Bb(d,gt,ot,Ot,h,a),Q=new Cw(d,Ot,ct),ht=new Gb(B,rt,yt,ct),Et=new Jb(B,rt,yt,ct),yt.programs=At.programs,d.capabilities=ct,d.extensions=rt,d.properties=xt,d.renderLists=Pt,d.shadowMap=Q,d.state=ot,d.info=yt}pt();const st=new Ow(d,B);this.xr=st,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const A=rt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=rt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return R},this.setPixelRatio=function(A){A!==void 0&&(R=A,this.setSize(S,L,!1))},this.getSize=function(A){return A.set(S,L)},this.setSize=function(A,W,$){if(st.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}S=A,L=W,t.width=Math.floor(A*R),t.height=Math.floor(W*R),$!==!1&&(t.style.width=A+"px",t.style.height=W+"px"),this.setViewport(0,0,A,W)},this.getDrawingBufferSize=function(A){return A.set(S*R,L*R).floor()},this.setDrawingBufferSize=function(A,W,$){S=A,L=W,R=$,t.width=Math.floor(A*$),t.height=Math.floor(W*$),this.setViewport(0,0,A,W)},this.getCurrentViewport=function(A){return A.copy(w)},this.getViewport=function(A){return A.copy(I)},this.setViewport=function(A,W,$,Y){A.isVector4?I.set(A.x,A.y,A.z,A.w):I.set(A,W,$,Y),ot.viewport(w.copy(I).multiplyScalar(R).floor())},this.getScissor=function(A){return A.copy(V)},this.setScissor=function(A,W,$,Y){A.isVector4?V.set(A.x,A.y,A.z,A.w):V.set(A,W,$,Y),ot.scissor(E.copy(V).multiplyScalar(R).floor())},this.getScissorTest=function(){return N},this.setScissorTest=function(A){ot.setScissorTest(N=A)},this.setOpaqueSort=function(A){F=A},this.setTransparentSort=function(A){j=A},this.getClearColor=function(A){return A.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor.apply(it,arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha.apply(it,arguments)},this.clear=function(A=!0,W=!0,$=!0){let Y=0;A&&(Y|=16384),W&&(Y|=256),$&&(Y|=1024),B.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",O,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",lt,!1),Pt.dispose(),P.dispose(),xt.dispose(),gt.dispose(),It.dispose(),Ot.dispose(),nt.dispose(),At.dispose(),st.dispose(),st.removeEventListener("sessionstart",Ut),st.removeEventListener("sessionend",Ht),C&&(C.dispose(),C=null),se.stop()};function O(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),p=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),p=!1;const A=yt.autoReset,W=Q.enabled,$=Q.autoUpdate,Y=Q.needsUpdate,et=Q.type;pt(),yt.autoReset=A,Q.enabled=W,Q.autoUpdate=$,Q.needsUpdate=Y,Q.type=et}function lt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ct(A){const W=A.target;W.removeEventListener("dispose",Ct),mt(W)}function mt(A){bt(A),xt.remove(A)}function bt(A){const W=xt.get(A).programs;W!==void 0&&(W.forEach(function($){At.releaseProgram($)}),A.isShaderMaterial&&At.releaseShaderCache(A))}this.renderBufferDirect=function(A,W,$,Y,et,Mt){W===null&&(W=J);const St=et.isMesh&&et.matrixWorld.determinant()<0,wt=_t(A,W,$,Y,et);ot.setMaterial(Y,St);let zt=$.index;const Ft=$.attributes.position;if(zt===null){if(Ft===void 0||Ft.count===0)return}else if(zt.count===0)return;let Bt=1;Y.wireframe===!0&&(zt=X.getWireframeAttribute($),Bt=2),nt.setup(et,Y,wt,$,zt);let qt,jt=ht;zt!==null&&(qt=Gt.get(zt),jt=Et,jt.setIndex(qt));const he=zt!==null?zt.count:Ft.count,pe=$.drawRange.start*Bt,an=$.drawRange.count*Bt,qe=Mt!==null?Mt.start*Bt:0,Vt=Mt!==null?Mt.count*Bt:1/0,le=Math.max(pe,qe),re=Math.min(he,pe+an,qe+Vt)-1,ln=Math.max(0,re-le+1);if(ln!==0){if(et.isMesh)Y.wireframe===!0?(ot.setLineWidth(Y.wireframeLinewidth*q()),jt.setMode(1)):jt.setMode(4);else if(et.isLine){let Yn=Y.linewidth;Yn===void 0&&(Yn=1),ot.setLineWidth(Yn*q()),et.isLineSegments?jt.setMode(1):et.isLineLoop?jt.setMode(2):jt.setMode(3)}else et.isPoints?jt.setMode(0):et.isSprite&&jt.setMode(4);if(et.isInstancedMesh)jt.renderInstances(le,ln,et.count);else if($.isInstancedBufferGeometry){const Yn=Math.min($.instanceCount,$._maxInstanceCount);jt.renderInstances(le,ln,Yn)}else jt.render(le,ln)}},this.compile=function(A,W){f=P.get(A),f.init(),g.push(f),A.traverseVisible(function($){$.isLight&&$.layers.test(W.layers)&&(f.pushLight($),$.castShadow&&f.pushShadow($))}),f.setupLights(d.physicallyCorrectLights),A.traverse(function($){const Y=$.material;if(Y)if(Array.isArray(Y))for(let et=0;et<Y.length;et++){const Mt=Y[et];Dt(Mt,A,$)}else Dt(Y,A,$)}),g.pop(),f=null};let tt=null;function Lt(A){tt&&tt(A)}function Ut(){se.stop()}function Ht(){se.start()}const se=new Og;se.setAnimationLoop(Lt),typeof self<"u"&&se.setContext(self),this.setAnimationLoop=function(A){tt=A,st.setAnimationLoop(A),A===null?se.stop():se.start()},st.addEventListener("sessionstart",Ut),st.addEventListener("sessionend",Ht),this.render=function(A,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(p===!0)return;A.autoUpdate===!0&&A.updateMatrixWorld(),W.parent===null&&W.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(st.cameraAutoUpdate===!0&&st.updateCamera(W),W=st.getCamera()),A.isScene===!0&&A.onBeforeRender(d,A,W,b),f=P.get(A,g.length),f.init(),g.push(f),Z.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),U.setFromProjectionMatrix(Z),k=this.localClippingEnabled,H=T.init(this.clippingPlanes,k,W),u=Pt.get(A,m.length),u.init(),m.push(u),Me(A,W,0,d.sortObjects),u.finish(),d.sortObjects===!0&&u.sort(F,j),H===!0&&T.beginShadows();const $=f.state.shadowsArray;if(Q.render($,A,W),H===!0&&T.endShadows(),this.info.autoReset===!0&&this.info.reset(),it.render(u,A),f.setupLights(d.physicallyCorrectLights),W.isArrayCamera){const Y=W.cameras;for(let et=0,Mt=Y.length;et<Mt;et++){const St=Y[et];qn(u,A,St,St.viewport)}}else qn(u,A,W);b!==null&&(ut.updateMultisampleRenderTarget(b),ut.updateRenderTargetMipmap(b)),A.isScene===!0&&A.onAfterRender(d,A,W),nt.resetDefaultState(),v=-1,M=null,g.pop(),g.length>0?f=g[g.length-1]:f=null,m.pop(),m.length>0?u=m[m.length-1]:u=null};function Me(A,W,$,Y){if(A.visible===!1)return;if(A.layers.test(W.layers)){if(A.isGroup)$=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(W);else if(A.isLight)f.pushLight(A),A.castShadow&&f.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||U.intersectsSprite(A)){Y&&K.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Z);const St=Ot.update(A),wt=A.material;wt.visible&&u.push(A,St,wt,$,K.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(A.isSkinnedMesh&&A.skeleton.frame!==yt.render.frame&&(A.skeleton.update(),A.skeleton.frame=yt.render.frame),!A.frustumCulled||U.intersectsObject(A))){Y&&K.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Z);const St=Ot.update(A),wt=A.material;if(Array.isArray(wt)){const zt=St.groups;for(let Ft=0,Bt=zt.length;Ft<Bt;Ft++){const qt=zt[Ft],jt=wt[qt.materialIndex];jt&&jt.visible&&u.push(A,St,jt,$,K.z,qt)}}else wt.visible&&u.push(A,St,wt,$,K.z,null)}}const Mt=A.children;for(let St=0,wt=Mt.length;St<wt;St++)Me(Mt[St],W,$,Y)}function qn(A,W,$,Y){const et=A.opaque,Mt=A.transmissive,St=A.transparent;f.setupLightsView($),Mt.length>0&&xn(et,W,$),Y&&ot.viewport(w.copy(Y)),et.length>0&&yn(et,W,$),Mt.length>0&&yn(Mt,W,$),St.length>0&&yn(St,W,$),ot.buffers.depth.setTest(!0),ot.buffers.depth.setMask(!0),ot.buffers.color.setMask(!0),ot.setPolygonOffset(!1)}function xn(A,W,$){const Y=ct.isWebGL2;C===null&&(C=new _r(1,1,{generateMipmaps:!0,type:rt.has("EXT_color_buffer_half_float")?Zo:ns,minFilter:Bl,samples:Y&&s===!0?4:0})),d.getDrawingBufferSize(z),Y?C.setSize(z.x,z.y):C.setSize(Bh(z.x),Bh(z.y));const et=d.getRenderTarget();d.setRenderTarget(C),d.clear();const Mt=d.toneMapping;d.toneMapping=Wi,yn(A,W,$),d.toneMapping=Mt,ut.updateMultisampleRenderTarget(C),ut.updateRenderTargetMipmap(C),d.setRenderTarget(et)}function yn(A,W,$){const Y=W.isScene===!0?W.overrideMaterial:null;for(let et=0,Mt=A.length;et<Mt;et++){const St=A[et],wt=St.object,zt=St.geometry,Ft=Y===null?St.material:Y,Bt=St.group;wt.layers.test($.layers)&&Nt(wt,W,$,zt,Ft,Bt)}}function Nt(A,W,$,Y,et,Mt){A.onBeforeRender(d,W,$,Y,et,Mt),A.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),et.onBeforeRender(d,W,$,Y,A,Mt),et.transparent===!0&&et.side===to?(et.side=ri,et.needsUpdate=!0,d.renderBufferDirect($,W,Y,et,A,Mt),et.side=jo,et.needsUpdate=!0,d.renderBufferDirect($,W,Y,et,A,Mt),et.side=to):d.renderBufferDirect($,W,Y,et,A,Mt),A.onAfterRender(d,W,$,Y,et,Mt)}function Dt(A,W,$){W.isScene!==!0&&(W=J);const Y=xt.get(A),et=f.state.lights,Mt=f.state.shadowsArray,St=et.state.version,wt=At.getParameters(A,et.state,Mt,W,$),zt=At.getProgramCacheKey(wt);let Ft=Y.programs;Y.environment=A.isMeshStandardMaterial?W.environment:null,Y.fog=W.fog,Y.envMap=(A.isMeshStandardMaterial?It:gt).get(A.envMap||Y.environment),Ft===void 0&&(A.addEventListener("dispose",Ct),Ft=new Map,Y.programs=Ft);let Bt=Ft.get(zt);if(Bt!==void 0){if(Y.currentProgram===Bt&&Y.lightsStateVersion===St)return Zt(A,wt),Bt}else wt.uniforms=At.getUniforms(A),A.onBuild($,wt,d),A.onBeforeCompile(wt,d),Bt=At.acquireProgram(wt,zt),Ft.set(zt,Bt),Y.uniforms=wt.uniforms;const qt=Y.uniforms;(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(qt.clippingPlanes=T.uniform),Zt(A,wt),Y.needsLights=Rt(A),Y.lightsStateVersion=St,Y.needsLights&&(qt.ambientLightColor.value=et.state.ambient,qt.lightProbe.value=et.state.probe,qt.directionalLights.value=et.state.directional,qt.directionalLightShadows.value=et.state.directionalShadow,qt.spotLights.value=et.state.spot,qt.spotLightShadows.value=et.state.spotShadow,qt.rectAreaLights.value=et.state.rectArea,qt.ltc_1.value=et.state.rectAreaLTC1,qt.ltc_2.value=et.state.rectAreaLTC2,qt.pointLights.value=et.state.point,qt.pointLightShadows.value=et.state.pointShadow,qt.hemisphereLights.value=et.state.hemi,qt.directionalShadowMap.value=et.state.directionalShadowMap,qt.directionalShadowMatrix.value=et.state.directionalShadowMatrix,qt.spotShadowMap.value=et.state.spotShadowMap,qt.spotShadowMatrix.value=et.state.spotShadowMatrix,qt.pointShadowMap.value=et.state.pointShadowMap,qt.pointShadowMatrix.value=et.state.pointShadowMatrix);const jt=Bt.getUniforms(),he=nl.seqWithValue(jt.seq,qt);return Y.currentProgram=Bt,Y.uniformsList=he,Bt}function Zt(A,W){const $=xt.get(A);$.outputEncoding=W.outputEncoding,$.instancing=W.instancing,$.skinning=W.skinning,$.morphTargets=W.morphTargets,$.morphNormals=W.morphNormals,$.morphColors=W.morphColors,$.morphTargetsCount=W.morphTargetsCount,$.numClippingPlanes=W.numClippingPlanes,$.numIntersection=W.numClipIntersection,$.vertexAlphas=W.vertexAlphas,$.vertexTangents=W.vertexTangents,$.toneMapping=W.toneMapping}function _t(A,W,$,Y,et){W.isScene!==!0&&(W=J),ut.resetTextureUnits();const Mt=W.fog,St=Y.isMeshStandardMaterial?W.environment:null,wt=b===null?d.outputEncoding:b.isXRRenderTarget===!0?b.texture.encoding:is,zt=(Y.isMeshStandardMaterial?It:gt).get(Y.envMap||St),Ft=Y.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Bt=!!Y.normalMap&&!!$.attributes.tangent,qt=!!$.morphAttributes.position,jt=!!$.morphAttributes.normal,he=!!$.morphAttributes.color,pe=Y.toneMapped?d.toneMapping:Wi,an=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,qe=an!==void 0?an.length:0,Vt=xt.get(Y),le=f.state.lights;if(H===!0&&(k===!0||A!==M)){const li=A===M&&Y.id===v;T.setState(Y,A,li)}let re=!1;Y.version===Vt.__version?(Vt.needsLights&&Vt.lightsStateVersion!==le.state.version||Vt.outputEncoding!==wt||et.isInstancedMesh&&Vt.instancing===!1||!et.isInstancedMesh&&Vt.instancing===!0||et.isSkinnedMesh&&Vt.skinning===!1||!et.isSkinnedMesh&&Vt.skinning===!0||Vt.envMap!==zt||Y.fog===!0&&Vt.fog!==Mt||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==T.numPlanes||Vt.numIntersection!==T.numIntersection)||Vt.vertexAlphas!==Ft||Vt.vertexTangents!==Bt||Vt.morphTargets!==qt||Vt.morphNormals!==jt||Vt.morphColors!==he||Vt.toneMapping!==pe||ct.isWebGL2===!0&&Vt.morphTargetsCount!==qe)&&(re=!0):(re=!0,Vt.__version=Y.version);let ln=Vt.currentProgram;re===!0&&(ln=Dt(Y,W,et));let Yn=!1,jn=!1,cn=!1;const be=ln.getUniforms(),ai=Vt.uniforms;if(ot.useProgram(ln.program)&&(Yn=!0,jn=!0,cn=!0),Y.id!==v&&(v=Y.id,jn=!0),Yn||M!==A){if(be.setValue(B,"projectionMatrix",A.projectionMatrix),ct.logarithmicDepthBuffer&&be.setValue(B,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),M!==A&&(M=A,jn=!0,cn=!0),Y.isShaderMaterial||Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshStandardMaterial||Y.envMap){const li=be.map.cameraPosition;li!==void 0&&li.setValue(B,K.setFromMatrixPosition(A.matrixWorld))}(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&be.setValue(B,"isOrthographic",A.isOrthographicCamera===!0),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial||Y.isShadowMaterial||et.isSkinnedMesh)&&be.setValue(B,"viewMatrix",A.matrixWorldInverse)}if(et.isSkinnedMesh){be.setOptional(B,et,"bindMatrix"),be.setOptional(B,et,"bindMatrixInverse");const li=et.skeleton;li&&(ct.floatVertexTextures?(li.boneTexture===null&&li.computeBoneTexture(),be.setValue(B,"boneTexture",li.boneTexture,ut),be.setValue(B,"boneTextureSize",li.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Li=$.morphAttributes;return(Li.position!==void 0||Li.normal!==void 0||Li.color!==void 0&&ct.isWebGL2===!0)&&ft.update(et,$,Y,ln),(jn||Vt.receiveShadow!==et.receiveShadow)&&(Vt.receiveShadow=et.receiveShadow,be.setValue(B,"receiveShadow",et.receiveShadow)),jn&&(be.setValue(B,"toneMappingExposure",d.toneMappingExposure),Vt.needsLights&&Wt(ai,cn),Mt&&Y.fog===!0&&Xt.refreshFogUniforms(ai,Mt),Xt.refreshMaterialUniforms(ai,Y,R,L,C),nl.upload(B,Vt.uniformsList,ai,ut)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(nl.upload(B,Vt.uniformsList,ai,ut),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&be.setValue(B,"center",et.center),be.setValue(B,"modelViewMatrix",et.modelViewMatrix),be.setValue(B,"normalMatrix",et.normalMatrix),be.setValue(B,"modelMatrix",et.matrixWorld),ln}function Wt(A,W){A.ambientLightColor.needsUpdate=W,A.lightProbe.needsUpdate=W,A.directionalLights.needsUpdate=W,A.directionalLightShadows.needsUpdate=W,A.pointLights.needsUpdate=W,A.pointLightShadows.needsUpdate=W,A.spotLights.needsUpdate=W,A.spotLightShadows.needsUpdate=W,A.rectAreaLights.needsUpdate=W,A.hemisphereLights.needsUpdate=W}function Rt(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return x},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(A,W,$){xt.get(A.texture).__webglTexture=W,xt.get(A.depthTexture).__webglTexture=$;const Y=xt.get(A);Y.__hasExternalTextures=!0,Y.__hasExternalTextures&&(Y.__autoAllocateDepthBuffer=$===void 0,Y.__autoAllocateDepthBuffer||rt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,W){const $=xt.get(A);$.__webglFramebuffer=W,$.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(A,W=0,$=0){b=A,_=W,x=$;let Y=!0;if(A){const zt=xt.get(A);zt.__useDefaultFramebuffer!==void 0?(ot.bindFramebuffer(36160,null),Y=!1):zt.__webglFramebuffer===void 0?ut.setupRenderTarget(A):zt.__hasExternalTextures&&ut.rebindTextures(A,xt.get(A.texture).__webglTexture,xt.get(A.depthTexture).__webglTexture)}let et=null,Mt=!1,St=!1;if(A){const zt=A.texture;(zt.isData3DTexture||zt.isDataArrayTexture)&&(St=!0);const Ft=xt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(et=Ft[W],Mt=!0):ct.isWebGL2&&A.samples>0&&ut.useMultisampledRTT(A)===!1?et=xt.get(A).__webglMultisampledFramebuffer:et=Ft,w.copy(A.viewport),E.copy(A.scissor),y=A.scissorTest}else w.copy(I).multiplyScalar(R).floor(),E.copy(V).multiplyScalar(R).floor(),y=N;if(ot.bindFramebuffer(36160,et)&&ct.drawBuffers&&Y&&ot.drawBuffers(A,et),ot.viewport(w),ot.scissor(E),ot.setScissorTest(y),Mt){const zt=xt.get(A.texture);B.framebufferTexture2D(36160,36064,34069+W,zt.__webglTexture,$)}else if(St){const zt=xt.get(A.texture),Ft=W||0;B.framebufferTextureLayer(36160,36064,zt.__webglTexture,$||0,Ft)}v=-1},this.readRenderTargetPixels=function(A,W,$,Y,et,Mt,St){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=xt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&St!==void 0&&(wt=wt[St]),wt){ot.bindFramebuffer(36160,wt);try{const zt=A.texture,Ft=zt.format,Bt=zt.type;if(Ft!==ii&&D.convert(Ft)!==B.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const qt=Bt===Zo&&(rt.has("EXT_color_buffer_half_float")||ct.isWebGL2&&rt.has("EXT_color_buffer_float"));if(Bt!==ns&&D.convert(Bt)!==B.getParameter(35738)&&!(Bt===Ur&&(ct.isWebGL2||rt.has("OES_texture_float")||rt.has("WEBGL_color_buffer_float")))&&!qt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=A.width-Y&&$>=0&&$<=A.height-et&&B.readPixels(W,$,Y,et,D.convert(Ft),D.convert(Bt),Mt)}finally{const zt=b!==null?xt.get(b).__webglFramebuffer:null;ot.bindFramebuffer(36160,zt)}}},this.copyFramebufferToTexture=function(A,W,$=0){const Y=Math.pow(2,-$),et=Math.floor(W.image.width*Y),Mt=Math.floor(W.image.height*Y);ut.setTexture2D(W,0),B.copyTexSubImage2D(3553,$,0,0,A.x,A.y,et,Mt),ot.unbindTexture()},this.copyTextureToTexture=function(A,W,$,Y=0){const et=W.image.width,Mt=W.image.height,St=D.convert($.format),wt=D.convert($.type);ut.setTexture2D($,0),B.pixelStorei(37440,$.flipY),B.pixelStorei(37441,$.premultiplyAlpha),B.pixelStorei(3317,$.unpackAlignment),W.isDataTexture?B.texSubImage2D(3553,Y,A.x,A.y,et,Mt,St,wt,W.image.data):W.isCompressedTexture?B.compressedTexSubImage2D(3553,Y,A.x,A.y,W.mipmaps[0].width,W.mipmaps[0].height,St,W.mipmaps[0].data):B.texSubImage2D(3553,Y,A.x,A.y,St,wt,W.image),Y===0&&$.generateMipmaps&&B.generateMipmap(3553),ot.unbindTexture()},this.copyTextureToTexture3D=function(A,W,$,Y,et=0){if(d.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Mt=A.max.x-A.min.x+1,St=A.max.y-A.min.y+1,wt=A.max.z-A.min.z+1,zt=D.convert(Y.format),Ft=D.convert(Y.type);let Bt;if(Y.isData3DTexture)ut.setTexture3D(Y,0),Bt=32879;else if(Y.isDataArrayTexture)ut.setTexture2DArray(Y,0),Bt=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}B.pixelStorei(37440,Y.flipY),B.pixelStorei(37441,Y.premultiplyAlpha),B.pixelStorei(3317,Y.unpackAlignment);const qt=B.getParameter(3314),jt=B.getParameter(32878),he=B.getParameter(3316),pe=B.getParameter(3315),an=B.getParameter(32877),qe=$.isCompressedTexture?$.mipmaps[0]:$.image;B.pixelStorei(3314,qe.width),B.pixelStorei(32878,qe.height),B.pixelStorei(3316,A.min.x),B.pixelStorei(3315,A.min.y),B.pixelStorei(32877,A.min.z),$.isDataTexture||$.isData3DTexture?B.texSubImage3D(Bt,et,W.x,W.y,W.z,Mt,St,wt,zt,Ft,qe.data):$.isCompressedTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),B.compressedTexSubImage3D(Bt,et,W.x,W.y,W.z,Mt,St,wt,zt,qe.data)):B.texSubImage3D(Bt,et,W.x,W.y,W.z,Mt,St,wt,zt,Ft,qe),B.pixelStorei(3314,qt),B.pixelStorei(32878,jt),B.pixelStorei(3316,he),B.pixelStorei(3315,pe),B.pixelStorei(32877,an),et===0&&Y.generateMipmaps&&B.generateMipmap(Bt),ot.unbindTexture()},this.initTexture=function(A){ut.setTexture2D(A,0),ot.unbindTexture()},this.resetState=function(){_=0,x=0,b=null,ot.reset(),nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class Uw extends kw{}Uw.prototype.isWebGL1Renderer=!0;class o1 extends rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.autoUpdate=t.autoUpdate,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e}}class Bw extends Be{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Yt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}class Hl extends Be{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Yt(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const qd=new G,Yd=new G,jd=new Pe,Wc=new Lg,Va=new Vl;class Vw extends rn{constructor(t=new Ci,e=new Hl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)qd.fromBufferAttribute(e,i-1),Yd.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=qd.distanceTo(Yd);t.setAttribute("lineDistance",new _n(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Va.copy(n.boundingSphere),Va.applyMatrix4(i),Va.radius+=s,t.ray.intersectsSphere(Va)===!1)return;jd.copy(i).invert(),Wc.copy(t.ray).applyMatrix4(jd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new G,h=new G,u=new G,f=new G,m=this.isLineSegments?2:1,g=n.index,p=n.attributes.position;if(g!==null){const _=Math.max(0,a.start),x=Math.min(g.count,a.start+a.count);for(let b=_,v=x-1;b<v;b+=m){const M=g.getX(b),w=g.getX(b+1);if(c.fromBufferAttribute(p,M),h.fromBufferAttribute(p,w),Wc.distanceSqToSegment(c,h,f,u)>l)continue;f.applyMatrix4(this.matrixWorld);const y=t.ray.origin.distanceTo(f);y<t.near||y>t.far||e.push({distance:y,point:u.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}else{const _=Math.max(0,a.start),x=Math.min(p.count,a.start+a.count);for(let b=_,v=x-1;b<v;b+=m){if(c.fromBufferAttribute(p,b),h.fromBufferAttribute(p,b+1),Wc.distanceSqToSegment(c,h,f,u)>l)continue;f.applyMatrix4(this.matrixWorld);const w=t.ray.origin.distanceTo(f);w<t.near||w>t.far||e.push({distance:w,point:u.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}const Zd=new G,Kd=new G;class Gw extends Vw{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)Zd.fromBufferAttribute(e,i),Kd.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Zd.distanceTo(Kd);t.setAttribute("lineDistance",new _n(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Hw extends Be{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Yt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}class Pu extends Ci{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],a=[];o(i),c(n),h(),this.setAttribute("position",new _n(s,3)),this.setAttribute("normal",new _n(s.slice(),3)),this.setAttribute("uv",new _n(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const b=new G,v=new G,M=new G;for(let w=0;w<e.length;w+=3)m(e[w+0],b),m(e[w+1],v),m(e[w+2],M),l(b,v,M,x)}function l(x,b,v,M){const w=M+1,E=[];for(let y=0;y<=w;y++){E[y]=[];const S=x.clone().lerp(v,y/w),L=b.clone().lerp(v,y/w),R=w-y;for(let F=0;F<=R;F++)F===0&&y===w?E[y][F]=S:E[y][F]=S.clone().lerp(L,F/R)}for(let y=0;y<w;y++)for(let S=0;S<2*(w-y)-1;S++){const L=Math.floor(S/2);S%2===0?(f(E[y][L+1]),f(E[y+1][L]),f(E[y][L])):(f(E[y][L+1]),f(E[y+1][L+1]),f(E[y+1][L]))}}function c(x){const b=new G;for(let v=0;v<s.length;v+=3)b.x=s[v+0],b.y=s[v+1],b.z=s[v+2],b.normalize().multiplyScalar(x),s[v+0]=b.x,s[v+1]=b.y,s[v+2]=b.z}function h(){const x=new G;for(let b=0;b<s.length;b+=3){x.x=s[b+0],x.y=s[b+1],x.z=s[b+2];const v=p(x)/2/Math.PI+.5,M=_(x)/Math.PI+.5;a.push(v,1-M)}g(),u()}function u(){for(let x=0;x<a.length;x+=6){const b=a[x+0],v=a[x+2],M=a[x+4],w=Math.max(b,v,M),E=Math.min(b,v,M);w>.9&&E<.1&&(b<.2&&(a[x+0]+=1),v<.2&&(a[x+2]+=1),M<.2&&(a[x+4]+=1))}}function f(x){s.push(x.x,x.y,x.z)}function m(x,b){const v=x*3;b.x=t[v+0],b.y=t[v+1],b.z=t[v+2]}function g(){const x=new G,b=new G,v=new G,M=new G,w=new $t,E=new $t,y=new $t;for(let S=0,L=0;S<s.length;S+=9,L+=6){x.set(s[S+0],s[S+1],s[S+2]),b.set(s[S+3],s[S+4],s[S+5]),v.set(s[S+6],s[S+7],s[S+8]),w.set(a[L+0],a[L+1]),E.set(a[L+2],a[L+3]),y.set(a[L+4],a[L+5]),M.copy(x).add(b).add(v).divideScalar(3);const R=p(M);d(w,L+0,x,R),d(E,L+2,b,R),d(y,L+4,v,R)}}function d(x,b,v,M){M<0&&x.x===1&&(a[b]=x.x-1),v.x===0&&v.z===0&&(a[b]=M/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function _(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}static fromJSON(t){return new Pu(t.vertices,t.indices,t.radius,t.details)}}class Hg extends Pu{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Hg(t.radius,t.detail)}}class Ww extends Be{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Yt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class $w extends Yi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Wg extends Be{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oo,this.normalScale=new $t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Xw extends Wg{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new $t(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Qe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Yt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=0,this.attenuationColor=new Yt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Yt(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._iridescence=0,this._transmission=0,this.setValues(t)}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class qw extends Be{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Yt(16777215),this.specular=new Yt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oo,this.normalScale=new $t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=kl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Yw extends Be{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Yt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oo,this.normalScale=new $t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class jw extends Be{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oo,this.normalScale=new $t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}class Zw extends Be{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=kl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class Kw extends Be{constructor(t){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Yt(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oo,this.normalScale=new $t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Jw extends Hl{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}const Qw={ShadowMaterial:Ww,SpriteMaterial:Bw,RawShaderMaterial:$w,ShaderMaterial:Yi,PointsMaterial:Hw,MeshPhysicalMaterial:Xw,MeshStandardMaterial:Wg,MeshPhongMaterial:qw,MeshToonMaterial:Yw,MeshNormalMaterial:jw,MeshLambertMaterial:Zw,MeshDepthMaterial:Vg,MeshDistanceMaterial:Gg,MeshBasicMaterial:Au,MeshMatcapMaterial:Kw,LineDashedMaterial:Jw,LineBasicMaterial:Hl,Material:Be};Be.fromType=function(r){return new Qw[r]};class $g extends rn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Yt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const Jd=new Pe,Qd=new G,tp=new G;class t1{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $t(512,512),this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cu,this._frameExtents=new $t(1,1),this._viewportCount=1,this._viewports=[new Ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Qd.setFromMatrixPosition(t.matrixWorld),e.position.copy(Qd),tp.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(tp),e.updateMatrixWorld(),Jd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jd),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(e.projectionMatrix),n.multiply(e.matrixWorldInverse)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class e1 extends t1{constructor(){super(new Gn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Uh*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;(n!==e.fov||i!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class a1 extends $g{constructor(t,e,n=0,i=Math.PI/3,s=0,a=1){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(rn.DefaultUp),this.updateMatrix(),this.target=new rn,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.shadow=new e1}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class l1 extends $g{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class c1{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ep(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=ep();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function ep(){return(typeof performance>"u"?Date:performance).now()}const Xg="\\[\\]\\.:\\/",Ru="[^"+Xg+"]",n1="[^"+Xg.replace("\\.","")+"]";/((?:WC+[\/:])*)/.source.replace("WC",Ru);/(WCOD+)?/.source.replace("WCOD",n1);/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ru);/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ru);class np{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Qe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class h1 extends Gw{constructor(t=1){const e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Ci;i.setAttribute("position",new _n(e,3)),i.setAttribute("color",new _n(n,3));const s=new Hl({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(t,e,n){const i=new Yt,s=this.geometry.attributes.color.array;return i.set(t),i.toArray(s,0),i.toArray(s,3),i.set(e),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}const ci=new Uint32Array(512),hi=new Uint32Array(512);for(let r=0;r<256;++r){const t=r-127;t<-27?(ci[r]=0,ci[r|256]=32768,hi[r]=24,hi[r|256]=24):t<-14?(ci[r]=1024>>-t-14,ci[r|256]=1024>>-t-14|32768,hi[r]=-t-1,hi[r|256]=-t-1):t<=15?(ci[r]=t+15<<10,ci[r|256]=t+15<<10|32768,hi[r]=13,hi[r|256]=13):t<128?(ci[r]=31744,ci[r|256]=64512,hi[r]=24,hi[r|256]=24):(ci[r]=31744,ci[r|256]=64512,hi[r]=13,hi[r|256]=13)}const qg=new Uint32Array(2048),ra=new Uint32Array(64),i1=new Uint32Array(64);for(let r=1;r<1024;++r){let t=r<<13,e=0;for(;!(t&8388608);)t<<=1,e-=8388608;t&=-8388609,e+=947912704,qg[r]=t|e}for(let r=1024;r<2048;++r)qg[r]=939524096+(r-1024<<13);for(let r=1;r<31;++r)ra[r]=r<<23;ra[31]=1199570944;ra[32]=2147483648;for(let r=33;r<63;++r)ra[r]=2147483648+(r-32<<23);ra[63]=3347054592;for(let r=1;r<64;++r)r!==32&&(i1[r]=1024);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Eu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Eu);const ip={type:"change"},$c={type:"start"},rp={type:"end"};class u1 extends os{constructor(t,e){super(),e===void 0&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),e===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new G,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:hs.ROTATE,MIDDLE:hs.DOLLY,RIGHT:hs.PAN},this.touches={ONE:us.ROTATE,TWO:us.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(D){D.addEventListener("keydown",Pt),this._domElementKeyEvents=D},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(ip),n.update(),s=i.NONE},this.update=function(){const D=new G,nt=new rs().setFromUnitVectors(t.up,new G(0,1,0)),pt=nt.clone().invert(),st=new G,O=new rs,dt=2*Math.PI;return function(){const Ct=n.object.position;D.copy(Ct).sub(n.target),D.applyQuaternion(nt),o.setFromVector3(D),n.autoRotate&&s===i.NONE&&S(E()),n.enableDamping?(o.theta+=l.theta*n.dampingFactor,o.phi+=l.phi*n.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let mt=n.minAzimuthAngle,bt=n.maxAzimuthAngle;return isFinite(mt)&&isFinite(bt)&&(mt<-Math.PI?mt+=dt:mt>Math.PI&&(mt-=dt),bt<-Math.PI?bt+=dt:bt>Math.PI&&(bt-=dt),mt<=bt?o.theta=Math.max(mt,Math.min(bt,o.theta)):o.theta=o.theta>(mt+bt)/2?Math.max(mt,o.theta):Math.min(bt,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),o.radius*=c,o.radius=Math.max(n.minDistance,Math.min(n.maxDistance,o.radius)),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),D.setFromSpherical(o),D.applyQuaternion(pt),Ct.copy(n.target).add(D),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0)),c=1,u||st.distanceToSquared(n.object.position)>a||8*(1-O.dot(n.object.quaternion))>a?(n.dispatchEvent(ip),st.copy(n.object.position),O.copy(n.object.quaternion),u=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Q),n.domElement.removeEventListener("pointerdown",gt),n.domElement.removeEventListener("pointercancel",X),n.domElement.removeEventListener("wheel",Xt),n.domElement.removeEventListener("pointermove",It),n.domElement.removeEventListener("pointerup",Gt),n._domElementKeyEvents!==null&&n._domElementKeyEvents.removeEventListener("keydown",Pt)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=i.NONE;const a=1e-6,o=new np,l=new np;let c=1;const h=new G;let u=!1;const f=new $t,m=new $t,g=new $t,d=new $t,p=new $t,_=new $t,x=new $t,b=new $t,v=new $t,M=[],w={};function E(){return 2*Math.PI/60/60*n.autoRotateSpeed}function y(){return Math.pow(.95,n.zoomSpeed)}function S(D){l.theta-=D}function L(D){l.phi-=D}const R=function(){const D=new G;return function(pt,st){D.setFromMatrixColumn(st,0),D.multiplyScalar(-pt),h.add(D)}}(),F=function(){const D=new G;return function(pt,st){n.screenSpacePanning===!0?D.setFromMatrixColumn(st,1):(D.setFromMatrixColumn(st,0),D.crossVectors(n.object.up,D)),D.multiplyScalar(pt),h.add(D)}}(),j=function(){const D=new G;return function(pt,st){const O=n.domElement;if(n.object.isPerspectiveCamera){const dt=n.object.position;D.copy(dt).sub(n.target);let lt=D.length();lt*=Math.tan(n.object.fov/2*Math.PI/180),R(2*pt*lt/O.clientHeight,n.object.matrix),F(2*st*lt/O.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(R(pt*(n.object.right-n.object.left)/n.object.zoom/O.clientWidth,n.object.matrix),F(st*(n.object.top-n.object.bottom)/n.object.zoom/O.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function I(D){n.object.isPerspectiveCamera?c/=D:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*D)),n.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function V(D){n.object.isPerspectiveCamera?c*=D:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/D)),n.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function N(D){f.set(D.clientX,D.clientY)}function U(D){x.set(D.clientX,D.clientY)}function H(D){d.set(D.clientX,D.clientY)}function k(D){m.set(D.clientX,D.clientY),g.subVectors(m,f).multiplyScalar(n.rotateSpeed);const nt=n.domElement;S(2*Math.PI*g.x/nt.clientHeight),L(2*Math.PI*g.y/nt.clientHeight),f.copy(m),n.update()}function C(D){b.set(D.clientX,D.clientY),v.subVectors(b,x),v.y>0?I(y()):v.y<0&&V(y()),x.copy(b),n.update()}function Z(D){p.set(D.clientX,D.clientY),_.subVectors(p,d).multiplyScalar(n.panSpeed),j(_.x,_.y),d.copy(p),n.update()}function z(D){D.deltaY<0?V(y()):D.deltaY>0&&I(y()),n.update()}function K(D){let nt=!1;switch(D.code){case n.keys.UP:j(0,n.keyPanSpeed),nt=!0;break;case n.keys.BOTTOM:j(0,-n.keyPanSpeed),nt=!0;break;case n.keys.LEFT:j(n.keyPanSpeed,0),nt=!0;break;case n.keys.RIGHT:j(-n.keyPanSpeed,0),nt=!0;break}nt&&(D.preventDefault(),n.update())}function J(){if(M.length===1)f.set(M[0].pageX,M[0].pageY);else{const D=.5*(M[0].pageX+M[1].pageX),nt=.5*(M[0].pageY+M[1].pageY);f.set(D,nt)}}function q(){if(M.length===1)d.set(M[0].pageX,M[0].pageY);else{const D=.5*(M[0].pageX+M[1].pageX),nt=.5*(M[0].pageY+M[1].pageY);d.set(D,nt)}}function B(){const D=M[0].pageX-M[1].pageX,nt=M[0].pageY-M[1].pageY,pt=Math.sqrt(D*D+nt*nt);x.set(0,pt)}function at(){n.enableZoom&&B(),n.enablePan&&q()}function rt(){n.enableZoom&&B(),n.enableRotate&&J()}function ct(D){if(M.length==1)m.set(D.pageX,D.pageY);else{const pt=Et(D),st=.5*(D.pageX+pt.x),O=.5*(D.pageY+pt.y);m.set(st,O)}g.subVectors(m,f).multiplyScalar(n.rotateSpeed);const nt=n.domElement;S(2*Math.PI*g.x/nt.clientHeight),L(2*Math.PI*g.y/nt.clientHeight),f.copy(m)}function ot(D){if(M.length===1)p.set(D.pageX,D.pageY);else{const nt=Et(D),pt=.5*(D.pageX+nt.x),st=.5*(D.pageY+nt.y);p.set(pt,st)}_.subVectors(p,d).multiplyScalar(n.panSpeed),j(_.x,_.y),d.copy(p)}function yt(D){const nt=Et(D),pt=D.pageX-nt.x,st=D.pageY-nt.y,O=Math.sqrt(pt*pt+st*st);b.set(0,O),v.set(0,Math.pow(b.y/x.y,n.zoomSpeed)),I(v.y),x.copy(b)}function xt(D){n.enableZoom&&yt(D),n.enablePan&&ot(D)}function ut(D){n.enableZoom&&yt(D),n.enableRotate&&ct(D)}function gt(D){n.enabled!==!1&&(M.length===0&&(n.domElement.setPointerCapture(D.pointerId),n.domElement.addEventListener("pointermove",It),n.domElement.addEventListener("pointerup",Gt)),it(D),D.pointerType==="touch"?P(D):Ot(D))}function It(D){n.enabled!==!1&&(D.pointerType==="touch"?T(D):At(D))}function Gt(D){ft(D),M.length===0&&(n.domElement.releasePointerCapture(D.pointerId),n.domElement.removeEventListener("pointermove",It),n.domElement.removeEventListener("pointerup",Gt)),n.dispatchEvent(rp),s=i.NONE}function X(D){ft(D)}function Ot(D){let nt;switch(D.button){case 0:nt=n.mouseButtons.LEFT;break;case 1:nt=n.mouseButtons.MIDDLE;break;case 2:nt=n.mouseButtons.RIGHT;break;default:nt=-1}switch(nt){case hs.DOLLY:if(n.enableZoom===!1)return;U(D),s=i.DOLLY;break;case hs.ROTATE:if(D.ctrlKey||D.metaKey||D.shiftKey){if(n.enablePan===!1)return;H(D),s=i.PAN}else{if(n.enableRotate===!1)return;N(D),s=i.ROTATE}break;case hs.PAN:if(D.ctrlKey||D.metaKey||D.shiftKey){if(n.enableRotate===!1)return;N(D),s=i.ROTATE}else{if(n.enablePan===!1)return;H(D),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent($c)}function At(D){if(n.enabled!==!1)switch(s){case i.ROTATE:if(n.enableRotate===!1)return;k(D);break;case i.DOLLY:if(n.enableZoom===!1)return;C(D);break;case i.PAN:if(n.enablePan===!1)return;Z(D);break}}function Xt(D){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(D.preventDefault(),n.dispatchEvent($c),z(D),n.dispatchEvent(rp))}function Pt(D){n.enabled===!1||n.enablePan===!1||K(D)}function P(D){switch(ht(D),M.length){case 1:switch(n.touches.ONE){case us.ROTATE:if(n.enableRotate===!1)return;J(),s=i.TOUCH_ROTATE;break;case us.PAN:if(n.enablePan===!1)return;q(),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case us.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;at(),s=i.TOUCH_DOLLY_PAN;break;case us.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;rt(),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent($c)}function T(D){switch(ht(D),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;ct(D),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;ot(D),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;xt(D),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ut(D),n.update();break;default:s=i.NONE}}function Q(D){n.enabled!==!1&&D.preventDefault()}function it(D){M.push(D)}function ft(D){delete w[D.pointerId];for(let nt=0;nt<M.length;nt++)if(M[nt].pointerId==D.pointerId){M.splice(nt,1);return}}function ht(D){let nt=w[D.pointerId];nt===void 0&&(nt=new $t,w[D.pointerId]=nt),nt.set(D.pageX,D.pageY)}function Et(D){const nt=D.pointerId===M[0].pointerId?M[1]:M[0];return w[nt.pointerId]}n.domElement.addEventListener("contextmenu",Q),n.domElement.addEventListener("pointerdown",gt),n.domElement.addEventListener("pointercancel",X),n.domElement.addEventListener("wheel",Xt,{passive:!1}),this.update()}}export{h1 as A,ia as B,Yt as C,s1 as E,vg as G,r1 as L,jw as M,Qs as O,ne as S,Hg as T,kw as W,o1 as a,Ba as b,hr as c,a1 as d,l1 as e,Xb as f,g0 as g,u1 as h,c1 as i};
