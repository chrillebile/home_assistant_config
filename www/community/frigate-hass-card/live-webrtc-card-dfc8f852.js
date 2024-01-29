import{s as t,dJ as e,di as a,cZ as r,dj as s,dl as n,dm as o,dk as i,bj as c,bk as d,bl as l,bn as u,db as h,l as p,cL as b,bX as y,y as g}from"./card-555679fd.js";import{m}from"./audio-557099cb.js";import{s as w,h as _,M as f}from"./lazyload-c2d6254a.js";let C=class extends t{constructor(){super(...arguments),this.controls=!1,this._webrtcTask=new e(this,this._getWebRTCCardElement,(()=>[1]))}async play(){return this._getPlayer()?.play()}async pause(){this._getPlayer()?.pause()}async mute(){const t=this._getPlayer();t&&(t.muted=!0)}async unmute(){const t=this._getPlayer();t&&(t.muted=!1)}isMuted(){return this._getPlayer()?.muted??!0}async seek(t){const e=this._getPlayer();e&&(e.currentTime=t)}async setControls(t){const e=this._getPlayer();e&&w(e,t??this.controls)}isPaused(){return this._getPlayer()?.paused??!0}async getScreenshotURL(){const t=this._getPlayer();return t?a(t):null}connectedCallback(){super.connectedCallback(),this.requestUpdate()}_getPlayer(){const t=this.renderRoot?.querySelector("#webrtc");return t?.video??null}async _getWebRTCCardElement(){return await customElements.whenDefined("webrtc-camera"),customElements.get("webrtc-camera")}_createWebRTC(){const t=this._webrtcTask.value;if(t&&this.hass&&this.cameraConfig){const e=new t,a={...this.cameraConfig.webrtc_card};return a.url||a.entity||!this.cameraEndpoints?.webrtcCard||(a.url=this.cameraEndpoints.webrtcCard.endpoint),e.setConfig(a),e.hass=this.hass,e}return null}render(){return r(this,this._webrtcTask,(()=>{let t;try{t=this._createWebRTC()}catch(t){return b(this,t instanceof y?t.message:p("error.webrtc_card_reported_error")+": "+t.message,{context:t.context})}return t&&(t.id="webrtc"),g`${t}`}),{inProgressFunc:()=>h({message:p("error.webrtc_card_waiting"),cardWideConfig:this.cardWideConfig})})}updated(){this.updateComplete.then((()=>{const t=this._getPlayer();t&&(w(t,this.controls),t.onloadeddata=()=>{this.controls&&_(t,f),s(this,t,{player:this,capabilities:{supportsPause:!0,hasAudio:m(t)}})},t.onplay=()=>n(this),t.onpause=()=>o(this),t.onvolumechange=()=>i(this))}))}static get styles(){return c(":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n/* Don't drop shadow or have radius for nested webrtc card */\n#webrtc ha-card {\n  border-radius: 0px;\n  margin: 0px;\n  box-shadow: none;\n}\n\nha-card,\ndiv.fix-safari,\n#video {\n  background: unset;\n  background-color: unset;\n}\n\n#webrtc #video {\n  object-fit: var(--frigate-card-media-layout-fit, contain);\n  object-position: var(--frigate-card-media-layout-position-x, 50%) var(--frigate-card-media-layout-position-y, 50%);\n}")}};d([l({attribute:!1})],C.prototype,"cameraConfig",void 0),d([l({attribute:!1})],C.prototype,"cameraEndpoints",void 0),d([l({attribute:!1})],C.prototype,"cardWideConfig",void 0),d([l({attribute:!0,type:Boolean})],C.prototype,"controls",void 0),C=d([u("frigate-card-live-webrtc-card")],C);export{C as FrigateCardLiveWebRTCCard};