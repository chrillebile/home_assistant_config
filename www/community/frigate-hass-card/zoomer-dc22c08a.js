import{dB as t,dC as e,dD as n,dw as o,d0 as r,s as a,dA as i,y as s,dl as c,bk as l,bm as d,bn as u}from"./card-67eaecc9.js";var p=function(){return p=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},p.apply(this,arguments)};function h(t,e){for(var n=t.length;n--;)if(t[n].pointerId===e.pointerId)return n;return-1}function m(t,e){var n;if(e.touches){n=0;for(var o=0,r=e.touches;o<r.length;o++){var a=r[o];a.pointerId=n++,m(t,a)}}else(n=h(t,e))>-1&&t.splice(n,1),t.push(e)}function f(t){for(var e,n=(t=t.slice(0)).pop();e=t.pop();)n={clientX:(e.clientX-n.clientX)/2+n.clientX,clientY:(e.clientY-n.clientY)/2+n.clientY};return n}function v(t){if(t.length<2)return 0;var e=t[0],n=t[1];return Math.sqrt(Math.pow(Math.abs(n.clientX-e.clientX),2)+Math.pow(Math.abs(n.clientY-e.clientY),2))}"undefined"!=typeof window&&(window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),"function"!=typeof window.CustomEvent&&(window.CustomEvent=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:null};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}));var g={down:"mousedown",move:"mousemove",up:"mouseup mouseleave"};function w(t,e,n,o){g[t].split(" ").forEach((function(t){e.addEventListener(t,n,o)}))}function y(t,e,n){g[t].split(" ").forEach((function(t){e.removeEventListener(t,n)}))}function b(t){if(t.parentElement)return t.parentElement;var e=t.getRootNode();return e instanceof ShadowRoot&&e.host instanceof HTMLElement?e.host:void 0}"undefined"!=typeof window&&("function"==typeof window.PointerEvent?g={down:"pointerdown",move:"pointermove",up:"pointerup pointerleave pointercancel"}:"function"==typeof window.TouchEvent&&(g={down:"touchstart",move:"touchmove",up:"touchend touchcancel"}));var z,_="undefined"!=typeof document&&!!document.documentMode;function x(){return z||(z=document.createElement("div").style)}var E=["webkit","moz","ms"],S={};function P(t){if(S[t])return S[t];var e=x();if(t in e)return S[t]=t;for(var n=t[0].toUpperCase()+t.slice(1),o=E.length;o--;){var r="".concat(E[o]).concat(n);if(r in e)return S[t]=r}}function M(t,e){return parseFloat(e[P(t)])||0}function O(t,e,n){void 0===n&&(n=window.getComputedStyle(t));var o="border"===e?"Width":"";return{left:M("".concat(e,"Left").concat(o),n),right:M("".concat(e,"Right").concat(o),n),top:M("".concat(e,"Top").concat(o),n),bottom:M("".concat(e,"Bottom").concat(o),n)}}function A(t,e,n){t.style[P(e)]=n}function C(t){var e=b(t),n=window.getComputedStyle(t),o=window.getComputedStyle(e),r=t.getBoundingClientRect(),a=e.getBoundingClientRect();return{elem:{style:n,width:r.width,height:r.height,top:r.top,bottom:r.bottom,left:r.left,right:r.right,margin:O(t,"margin",n),border:O(t,"border",n)},parent:{style:o,width:a.width,height:a.height,top:a.top,bottom:a.bottom,left:a.left,right:a.right,padding:O(e,"padding",o),border:O(e,"border",o)}}}function H(t,e){return 1===t.nodeType&&" ".concat(function(t){return(t.getAttribute("class")||"").trim()}(t)," ").indexOf(" ".concat(e," "))>-1}var X=/^http:[\w\.\/]+svg$/;var Y={animate:!1,canvas:!1,cursor:"move",disablePan:!1,disableZoom:!1,disableXAxis:!1,disableYAxis:!1,duration:200,easing:"ease-in-out",exclude:[],excludeClass:"panzoom-exclude",handleStartEvent:function(t){t.preventDefault(),t.stopPropagation()},maxScale:4,minScale:.125,overflow:"hidden",panOnlyWhenZoomed:!1,pinchAndPan:!1,relative:!1,setTransform:function(t,e,n){var o=e.x,r=e.y,a=e.scale,i=e.isSVG;if(A(t,"transform","scale(".concat(a,") translate(").concat(o,"px, ").concat(r,"px)")),i&&_){var s=window.getComputedStyle(t).getPropertyValue("transform");t.setAttribute("transform",s)}},startX:0,startY:0,startScale:1,step:.3,touchAction:"none"};function L(t,e){if(!t)throw new Error("Panzoom requires an element as an argument");if(1!==t.nodeType)throw new Error("Panzoom requires an element with a nodeType of 1");if(!function(t){for(var e=t;e&&e.parentNode;){if(e.parentNode===document)return!0;e=e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}return!1}(t))throw new Error("Panzoom should be called on elements that have been attached to the DOM");e=p(p({},Y),e);var n=function(t){return X.test(t.namespaceURI)&&"svg"!==t.nodeName.toLowerCase()}(t),o=b(t);o.style.overflow=e.overflow,o.style.userSelect="none",o.style.touchAction=e.touchAction,(e.canvas?o:t).style.cursor=e.cursor,t.style.userSelect="none",t.style.touchAction=e.touchAction,A(t,"transformOrigin","string"==typeof e.origin?e.origin:n?"0 0":"50% 50%");var r,a,i,s,c,l,d=0,u=0,z=1,_=!1;function x(e,n,o){if(!o.silent){var r=new CustomEvent(e,{detail:n});t.dispatchEvent(r)}}function E(e,o,r){var a={x:d,y:u,scale:z,isSVG:n,originalEvent:r};return requestAnimationFrame((function(){"boolean"==typeof o.animate&&(o.animate?function(t,e){var n=P("transform");A(t,"transition","".concat(n," ").concat(e.duration,"ms ").concat(e.easing))}(t,o):A(t,"transition","none")),o.setTransform(t,a,o),x(e,a,o),x("panzoomchange",a,o)})),a}function S(n,o,r,a){var i=p(p({},e),a),s={x:d,y:u,opts:i};if(!i.force&&(i.disablePan||i.panOnlyWhenZoomed&&z===i.startScale))return s;if(n=parseFloat(n),o=parseFloat(o),i.disableXAxis||(s.x=(i.relative?d:0)+n),i.disableYAxis||(s.y=(i.relative?u:0)+o),i.contain){var c=C(t),l=c.elem.width/z,h=c.elem.height/z,m=l*r,f=h*r,v=(m-l)/2,g=(f-h)/2;if("inside"===i.contain){var w=(-c.elem.margin.left-c.parent.padding.left+v)/r,y=(c.parent.width-m-c.parent.padding.left-c.elem.margin.left-c.parent.border.left-c.parent.border.right+v)/r;s.x=Math.max(Math.min(s.x,y),w);var b=(-c.elem.margin.top-c.parent.padding.top+g)/r,_=(c.parent.height-f-c.parent.padding.top-c.elem.margin.top-c.parent.border.top-c.parent.border.bottom+g)/r;s.y=Math.max(Math.min(s.y,_),b)}else if("outside"===i.contain){w=(-(m-c.parent.width)-c.parent.padding.left-c.parent.border.left-c.parent.border.right+v)/r,y=(v-c.parent.padding.left)/r;s.x=Math.max(Math.min(s.x,y),w);b=(-(f-c.parent.height)-c.parent.padding.top-c.parent.border.top-c.parent.border.bottom+g)/r,_=(g-c.parent.padding.top)/r;s.y=Math.max(Math.min(s.y,_),b)}}return i.roundPixels&&(s.x=Math.round(s.x),s.y=Math.round(s.y)),s}function M(n,o){var r=p(p({},e),o),a={scale:z,opts:r};if(!r.force&&r.disableZoom)return a;var i=e.minScale,s=e.maxScale;if(r.contain){var c=C(t),l=c.elem.width/z,d=c.elem.height/z;if(l>1&&d>1){var u=(c.parent.width-c.parent.border.left-c.parent.border.right)/l,h=(c.parent.height-c.parent.border.top-c.parent.border.bottom)/d;"inside"===e.contain?s=Math.min(s,u,h):"outside"===e.contain&&(i=Math.max(i,u,h))}}return a.scale=Math.min(Math.max(n,i),s),a}function O(t,e,o,r){var a=S(t,e,z,o);return d!==a.x||u!==a.y?(d=a.x,u=a.y,E("panzoompan",a.opts,r)):{x:d,y:u,scale:z,isSVG:n,originalEvent:r}}function L(t,e,n){var o=M(t,e),r=o.opts;if(r.force||!r.disableZoom){t=o.scale;var a=d,i=u;if(r.focal){var s=r.focal;a=(s.x/t-s.x/z+d*t)/t,i=(s.y/t-s.y/z+u*t)/t}var c=S(a,i,t,{relative:!1,force:!0});return d=c.x,u=c.y,z=t,E("panzoomzoom",r,n)}}function N(t,n){var o=p(p(p({},e),{animate:!0}),n);return L(z*Math.exp((t?1:-1)*o.step),o)}function T(e,o,r,a){var i=C(t),s=i.parent.width-i.parent.padding.left-i.parent.padding.right-i.parent.border.left-i.parent.border.right,c=i.parent.height-i.parent.padding.top-i.parent.padding.bottom-i.parent.border.top-i.parent.border.bottom,l=o.clientX-i.parent.left-i.parent.padding.left-i.parent.border.left-i.elem.margin.left,d=o.clientY-i.parent.top-i.parent.padding.top-i.parent.border.top-i.elem.margin.top;n||(l-=i.elem.width/z/2,d-=i.elem.height/z/2);var u={x:l/s*(s*e),y:d/c*(c*e)};return L(e,p(p({},r),{animate:!1,focal:u}),a)}L(e.startScale,{animate:!1,force:!0}),setTimeout((function(){O(e.startX,e.startY,{animate:!1,force:!0})}));var Z=[];function W(t){if(!function(t,e){for(var n=t;n;n=b(n))if(H(n,e.excludeClass)||e.exclude.indexOf(n)>-1)return!0;return!1}(t.target,e)){m(Z,t),_=!0,e.handleStartEvent(t),r=d,a=u,x("panzoomstart",{x:d,y:u,scale:z,isSVG:n,originalEvent:t},e);var o=f(Z);i=o.clientX,s=o.clientY,c=z,l=v(Z)}}function D(t){if(_&&void 0!==r&&void 0!==a&&void 0!==i&&void 0!==s){m(Z,t);var n=f(Z),o=Z.length>1,d=z;if(o)0===l&&(l=v(Z)),T(d=M((v(Z)-l)*e.step/80+c).scale,n,{animate:!1},t);o&&!e.pinchAndPan||O(r+(n.clientX-i)/d,a+(n.clientY-s)/d,{animate:!1},t)}}function R(t){1===Z.length&&x("panzoomend",{x:d,y:u,scale:z,isSVG:n,originalEvent:t},e),function(t,e){if(e.touches)for(;t.length;)t.pop();else{var n=h(t,e);n>-1&&t.splice(n,1)}}(Z,t),_&&(_=!1,r=a=i=s=void 0)}var k=!1;function B(){k||(k=!0,w("down",e.canvas?o:t,W),w("move",document,D,{passive:!0}),w("up",document,R,{passive:!0}))}return e.noBind||B(),{bind:B,destroy:function(){k=!1,y("down",e.canvas?o:t,W),y("move",document,D),y("up",document,R)},eventNames:g,getPan:function(){return{x:d,y:u}},getScale:function(){return z},getOptions:function(){return function(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}(e)},handleDown:W,handleMove:D,handleUp:R,pan:O,reset:function(t){var n=p(p(p({},e),{animate:!0,force:!0}),t);z=M(n.startScale,n).scale;var o=S(n.startX,n.startY,z,n);return d=o.x,u=o.y,E("panzoomreset",n)},resetStyle:function(){o.style.overflow="",o.style.userSelect="",o.style.touchAction="",o.style.cursor="",t.style.cursor="",t.style.userSelect="",t.style.touchAction="",A(t,"transformOrigin","")},setOptions:function(n){for(var r in void 0===n&&(n={}),n)n.hasOwnProperty(r)&&(e[r]=n[r]);(n.hasOwnProperty("cursor")||n.hasOwnProperty("canvas"))&&(o.style.cursor=t.style.cursor="",(e.canvas?o:t).style.cursor=e.cursor),n.hasOwnProperty("overflow")&&(o.style.overflow=n.overflow),n.hasOwnProperty("touchAction")&&(o.style.touchAction=n.touchAction,t.style.touchAction=n.touchAction)},setStyle:function(e,n){return A(t,e,n)},zoom:L,zoomIn:function(t){return N(!0,t)},zoomOut:function(t){return N(!1,t)},zoomToPoint:T,zoomWithWheel:function(t,n){t.preventDefault();var o=p(p(p({},e),n),{animate:!1}),r=(0===t.deltaY&&t.deltaX?t.deltaX:t.deltaY)<0?1:-1;return T(M(z*Math.exp(r*o.step/3),o).scale,t,o,t)}}}L.defaultOptions=Y;var N=1/0,T=17976931348623157e292;function Z(e){var n=function(e){return e?(e=t(e))===N||e===-N?(e<0?-1:1)*T:e==e?e:0:0===e?e:0}(e),o=n%1;return n==n?o?n-o:n:0}var W=e.isFinite,D=Math.min;var R,k=(R=Math["round"],function(e,o){if(e=t(e),(o=null==o?0:D(Z(o),292))&&W(e)){var r=(n(e)+"e").split("e"),a=R(r[0]+"e"+(+r[1]+o));return+((r=(n(a)+"e").split("e"))[0]+"e"+(+r[1]-o))}return R(e)});class B{constructor(t){this._zoomed=!1,this._events=o()?{down:["pointerdown"],move:["pointermove"],up:["pointerup","pointerleave","pointercancel"]}:{down:["touchstart"],move:["touchmove"],up:["touchend","touchcancel"]},this._downHandler=t=>{this._shouldZoomOrPan(t)&&(this._panzoom?.handleDown(t),t.stopPropagation(),t.preventDefault())},this._moveHandler=t=>{this._shouldZoomOrPan(t)&&(this._panzoom?.handleMove(t),t.stopPropagation())},this._upHandler=t=>{this._shouldZoomOrPan(t)&&(this._panzoom?.handleUp(t),t.stopPropagation())},this._wheelHandler=t=>{t instanceof WheelEvent&&this._shouldZoomOrPan(t)&&(this._panzoom?.zoomWithWheel(t),t.stopPropagation())},this._element=t}_isScaleNormal(t){return void 0!==t&&k(t,4)<=1}_shouldZoomOrPan(t){return!this._isScaleNormal(this._panzoom?.getScale())||t instanceof TouchEvent&&t.touches.length>1||t instanceof WheelEvent&&t.ctrlKey}activate(){this._panzoom=L(this._element,{contain:"outside",maxScale:10,minScale:1,noBind:!0,cursor:void 0});const t=(t,e,n)=>{t.forEach((t=>{this._element.addEventListener(t,e,n)}))};t(this._events.down,this._downHandler,{capture:!0}),t(this._events.move,this._moveHandler,{capture:!0}),t(this._events.up,this._upHandler,{capture:!0}),t(["wheel"],this._wheelHandler),this._element.addEventListener("panzoomzoom",(t=>{this._isScaleNormal(t.detail.scale)?(this._zoomed&&r(this._element,"zoom:unzoomed"),this._zoomed=!1):(this._zoomed||r(this._element,"zoom:zoomed"),this._zoomed=!0)}))}deactivate(){const t=(t,e)=>{t.forEach((t=>{this._element.removeEventListener(t,e)}))};t(this._events.down,this._downHandler),t(this._events.move,this._moveHandler),t(this._events.up,this._upHandler),t(["wheel"],this._wheelHandler)}}let V=class extends a{constructor(){super(...arguments),this._zoom=new B(this),this._zoomed=!1,this._zoomHandler=()=>this._zoomed=!0,this._unzoomHandler=()=>this._zoomed=!1}connectedCallback(){super.connectedCallback(),this.addEventListener("frigate-card:zoom:zoomed",this._zoomHandler),this.addEventListener("frigate-card:zoom:unzoomed",this._unzoomHandler),this._zoom.activate()}disconnectedCallback(){this._zoom.deactivate(),this.removeEventListener("frigate-card:zoom:zoomed",this._zoomHandler),this.removeEventListener("frigate-card:zoom:unzoomed",this._unzoomHandler)}willUpdate(t){t.has("_zoomed")&&i(this,this._zoomed,"zoomed")}render(){return s` <slot></slot> `}static get styles(){return c`
      :host {
        width: 100%;
        height: 100%;
        display: block;
        cursor: auto;
      }
      :host([zoomed]) {
        cursor: move;
      }
    `}};l([d()],V.prototype,"_zoomed",void 0),V=l([u("frigate-card-zoomer")],V);export{V as FrigateCardZoomer};