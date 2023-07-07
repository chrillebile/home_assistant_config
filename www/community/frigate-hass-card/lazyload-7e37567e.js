import{cH as t,cI as a,cW as e,bk as o,bl as n,bm as i,bn as d,s as r,cX as s,y as l,o as c,cY as u,bj as h,cP as m,cZ as p,cN as g,c_ as b,cS as v,c$ as f,d0 as y,d1 as _}from"./card-67eaecc9.js";
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C={},x=t(class extends a{constructor(){super(...arguments),this.ot=C}render(t,a){return a()}update(t,[a,o]){if(Array.isArray(a)){if(Array.isArray(this.ot)&&this.ot.length===a.length&&a.every(((t,a)=>t===this.ot[a])))return e}else if(this.ot===a)return e;return this.ot=Array.isArray(a)?Array.from(a):a,this.render(a,o)}}),z=2,P=(t,a=1)=>{t.controls=!1,t._controlsHideTimeoutID&&window.clearTimeout(t._controlsHideTimeoutID),t._controlsHideTimeoutID=window.setTimeout((()=>{t.controls=!0,delete t._controlsHideTimeoutID}),1e3*a)},S=async(t,a)=>{a?.play&&a.play().catch((async e=>{if("NotAllowedError"===e.name&&!t.isMuted()){await t.mute();try{await a.play()}catch(t){}}}))};let A=class extends r{constructor(){super(...arguments),this.disabled=!1,this.label="",this._embedThumbnailTask=s(this,(()=>this.hass),(()=>this.thumbnail))}set controlConfig(t){t?.size&&this.style.setProperty("--frigate-card-next-prev-size",`${t.size}px`),this._controlConfig=t}render(){if(this.disabled||!this._controlConfig||"none"==this._controlConfig.style)return l``;const t={controls:!0,previous:"previous"===this.direction,next:"next"===this.direction,thumbnails:"thumbnails"===this._controlConfig.style,icons:["chevrons","icons"].includes(this._controlConfig.style),button:["chevrons","icons"].includes(this._controlConfig.style)};if(["chevrons","icons"].includes(this._controlConfig.style)){let a;if("chevrons"===this._controlConfig.style)a="previous"===this.direction?"mdi:chevron-left":"mdi:chevron-right";else{if(!this.icon)return l``;a=this.icon}return l` <ha-icon-button class="${c(t)}" .label=${this.label}>
        <ha-icon icon=${a}></ha-icon>
      </ha-icon-button>`}return this.thumbnail?u(this,this._embedThumbnailTask,(a=>a?l`<img
              src="${a}"
              class="${c(t)}"
              title="${this.label}"
              aria-label="${this.label}"
            />`:l``),{inProgressFunc:()=>l`<div class=${c(t)}></div>`}):l``}static get styles(){return h("ha-icon-button.button {\n  color: var(--secondary-color, white);\n  background-color: rgba(0, 0, 0, 0.6);\n  border-radius: 50%;\n  padding: 0px;\n  margin: 3px;\n  --ha-icon-display: block;\n  /* Buttons can always be clicked */\n  pointer-events: auto;\n  opacity: 0.9;\n}\n\n@keyframes pulse {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.6;\n  }\n  100% {\n    opacity: 1;\n  }\n}\nha-icon[data-domain=alert][data-state=on],\nha-icon[data-domain=automation][data-state=on],\nha-icon[data-domain=binary_sensor][data-state=on],\nha-icon[data-domain=calendar][data-state=on],\nha-icon[data-domain=camera][data-state=streaming],\nha-icon[data-domain=cover][data-state=open],\nha-icon[data-domain=fan][data-state=on],\nha-icon[data-domain=humidifier][data-state=on],\nha-icon[data-domain=light][data-state=on],\nha-icon[data-domain=input_boolean][data-state=on],\nha-icon[data-domain=lock][data-state=unlocked],\nha-icon[data-domain=media_player][data-state=on],\nha-icon[data-domain=media_player][data-state=paused],\nha-icon[data-domain=media_player][data-state=playing],\nha-icon[data-domain=script][data-state=on],\nha-icon[data-domain=sun][data-state=above_horizon],\nha-icon[data-domain=switch][data-state=on],\nha-icon[data-domain=timer][data-state=active],\nha-icon[data-domain=vacuum][data-state=cleaning],\nha-icon[data-domain=group][data-state=on],\nha-icon[data-domain=group][data-state=home],\nha-icon[data-domain=group][data-state=open],\nha-icon[data-domain=group][data-state=locked],\nha-icon[data-domain=group][data-state=problem] {\n  color: var(--paper-item-icon-active-color, #fdd835);\n}\n\nha-icon[data-domain=climate][data-state=cooling] {\n  color: var(--cool-color, var(--state-climate-cool-color));\n}\n\nha-icon[data-domain=climate][data-state=heating] {\n  color: var(--heat-color, var(--state-climate-heat-color));\n}\n\nha-icon[data-domain=climate][data-state=drying] {\n  color: var(--dry-color, var(--state-climate-dry-color));\n}\n\nha-icon[data-domain=alarm_control_panel] {\n  color: var(--alarm-color-armed, var(--label-badge-red));\n}\n\nha-icon[data-domain=alarm_control_panel][data-state=disarmed] {\n  color: var(--alarm-color-disarmed, var(--label-badge-green));\n}\n\nha-icon[data-domain=alarm_control_panel][data-state=pending],\nha-icon[data-domain=alarm_control_panel][data-state=arming] {\n  color: var(--alarm-color-pending, var(--label-badge-yellow));\n  animation: pulse 1s infinite;\n}\n\nha-icon[data-domain=alarm_control_panel][data-state=triggered] {\n  color: var(--alarm-color-triggered, var(--label-badge-red));\n  animation: pulse 1s infinite;\n}\n\nha-icon[data-domain=plant][data-state=problem],\nha-icon[data-domain=zwave][data-state=dead] {\n  color: var(--state-icon-error-color);\n}\n\n/* Color the icon if unavailable */\nha-icon[data-state=unavailable] {\n  color: var(--state-unavailable-color);\n}\n\nha-icon-button[data-domain=alert][data-state=on],\nha-icon-button[data-domain=automation][data-state=on],\nha-icon-button[data-domain=binary_sensor][data-state=on],\nha-icon-button[data-domain=calendar][data-state=on],\nha-icon-button[data-domain=camera][data-state=streaming],\nha-icon-button[data-domain=cover][data-state=open],\nha-icon-button[data-domain=fan][data-state=on],\nha-icon-button[data-domain=humidifier][data-state=on],\nha-icon-button[data-domain=light][data-state=on],\nha-icon-button[data-domain=input_boolean][data-state=on],\nha-icon-button[data-domain=lock][data-state=unlocked],\nha-icon-button[data-domain=media_player][data-state=on],\nha-icon-button[data-domain=media_player][data-state=paused],\nha-icon-button[data-domain=media_player][data-state=playing],\nha-icon-button[data-domain=script][data-state=on],\nha-icon-button[data-domain=sun][data-state=above_horizon],\nha-icon-button[data-domain=switch][data-state=on],\nha-icon-button[data-domain=timer][data-state=active],\nha-icon-button[data-domain=vacuum][data-state=cleaning],\nha-icon-button[data-domain=group][data-state=on],\nha-icon-button[data-domain=group][data-state=home],\nha-icon-button[data-domain=group][data-state=open],\nha-icon-button[data-domain=group][data-state=locked],\nha-icon-button[data-domain=group][data-state=problem] {\n  color: var(--paper-item-icon-active-color, #fdd835);\n}\n\nha-icon-button[data-domain=climate][data-state=cooling] {\n  color: var(--cool-color, var(--state-climate-cool-color));\n}\n\nha-icon-button[data-domain=climate][data-state=heating] {\n  color: var(--heat-color, var(--state-climate-heat-color));\n}\n\nha-icon-button[data-domain=climate][data-state=drying] {\n  color: var(--dry-color, var(--state-climate-dry-color));\n}\n\nha-icon-button[data-domain=alarm_control_panel] {\n  color: var(--alarm-color-armed, var(--label-badge-red));\n}\n\nha-icon-button[data-domain=alarm_control_panel][data-state=disarmed] {\n  color: var(--alarm-color-disarmed, var(--label-badge-green));\n}\n\nha-icon-button[data-domain=alarm_control_panel][data-state=pending],\nha-icon-button[data-domain=alarm_control_panel][data-state=arming] {\n  color: var(--alarm-color-pending, var(--label-badge-yellow));\n  animation: pulse 1s infinite;\n}\n\nha-icon-button[data-domain=alarm_control_panel][data-state=triggered] {\n  color: var(--alarm-color-triggered, var(--label-badge-red));\n  animation: pulse 1s infinite;\n}\n\nha-icon-button[data-domain=plant][data-state=problem],\nha-icon-button[data-domain=zwave][data-state=dead] {\n  color: var(--state-icon-error-color);\n}\n\n/* Color the icon if unavailable */\nha-icon-button[data-state=unavailable] {\n  color: var(--state-unavailable-color);\n}\n\n:host {\n  --frigate-card-next-prev-size: 48px;\n  --frigate-card-next-prev-size-hover: calc(var(--frigate-card-next-prev-size) * 2);\n  --frigate-card-prev-position: 45px;\n  --frigate-card-next-position: 45px;\n  --mdc-icon-button-size: var(--frigate-card-next-prev-size);\n  --mdc-icon-size: calc(var(--mdc-icon-button-size) / 2);\n}\n\n.controls {\n  position: absolute;\n  z-index: 1;\n  overflow: hidden;\n}\n\n.controls.previous {\n  left: var(--frigate-card-prev-position);\n}\n\n.controls.next {\n  right: var(--frigate-card-next-position);\n}\n\n.controls.icons {\n  top: calc(50% - var(--frigate-card-next-prev-size) / 2);\n}\n\n.controls.thumbnails {\n  border-radius: 50%;\n  height: var(--frigate-card-next-prev-size);\n  top: calc(50% - var(--frigate-card-next-prev-size) / 2);\n  box-shadow: var(--frigate-card-css-box-shadow, 0px 0px 20px 5px black);\n  transition: all 0.2s ease-out;\n  opacity: 0.8;\n  aspect-ratio: 1/1;\n}\n\n.controls.thumbnails:hover {\n  opacity: 1 !important;\n  height: var(--frigate-card-next-prev-size-hover);\n  top: calc(50% - var(--frigate-card-next-prev-size-hover) / 2);\n}\n\n.controls.previous.thumbnails:hover {\n  left: calc(var(--frigate-card-prev-position) - (var(--frigate-card-next-prev-size-hover) - var(--frigate-card-next-prev-size)) / 2);\n}\n\n.controls.next.thumbnails:hover {\n  right: calc(var(--frigate-card-next-position) - (var(--frigate-card-next-prev-size-hover) - var(--frigate-card-next-prev-size)) / 2);\n}")}};o([n({attribute:!1})],A.prototype,"direction",void 0),o([n({attribute:!1})],A.prototype,"hass",void 0),o([i()],A.prototype,"_controlConfig",void 0),o([n({attribute:!1})],A.prototype,"thumbnail",void 0),o([n({attribute:!1})],A.prototype,"icon",void 0),o([n({attribute:!0,type:Boolean})],A.prototype,"disabled",void 0),o([n()],A.prototype,"label",void 0),A=o([d("frigate-card-next-previous-control")],A);const I=(t,a)=>{var e,o;a.stopPropagation(),e=a.composedPath()[0],o={slide:t,mediaLoadedInfo:a.detail},y(e,"carousel:media:loaded",o)},L=(t,a)=>{var e;a.stopPropagation(),e=a.composedPath()[0],y(e,"carousel:media:unloaded",{slide:t})};let k=class extends r{constructor(){super(),this.selected=0,this._mediaLoadedInfo={},this._nextControlRef=m(),this._previousControlRef=m(),this._titleControlRef=m(),this._titleTimerID=null,this._boundAutoPlayHandler=this.autoPlay.bind(this),this._boundAutoUnmuteHandler=this.autoUnmute.bind(this),this._boundTitleHandler=this._titleHandler.bind(this),this._debouncedAdaptContainerHeightToSlide=p(this._adaptContainerHeightToSlide.bind(this),100,{trailing:!0}),this._refCarousel=m(),this._slideResizeObserver=new ResizeObserver(this._reInitAndAdjustHeight.bind(this)),this._intersectionObserver=new IntersectionObserver(this._intersectionHandler.bind(this))}frigateCardCarousel(){return this._refCarousel.value??null}_getAutoMediaPlugin(){return this.frigateCardCarousel()?.carousel()?.plugins().autoMedia??null}autoPlay(){const t=this._getAutoMediaPlugin()?.options;t?.autoPlayCondition&&["all","selected"].includes(t?.autoPlayCondition)&&this._getAutoMediaPlugin()?.play()}autoPause(){const t=this._getAutoMediaPlugin()?.options;t?.autoPauseCondition&&["all","selected"].includes(t.autoPauseCondition)&&this._getAutoMediaPlugin()?.pause()}autoUnmute(){const t=this._getAutoMediaPlugin()?.options;t?.autoUnmuteCondition&&["all","selected"].includes(t?.autoUnmuteCondition)&&this._getAutoMediaPlugin()?.unmute()}autoMute(){const t=this._getAutoMediaPlugin()?.options;t?.autoMuteCondition&&["all","selected"].includes(t?.autoMuteCondition)&&this._getAutoMediaPlugin()?.mute()}_titleHandler(){const t=()=>{this._titleTimerID=null,this._titleControlRef.value?.show()};this._titleTimerID&&window.clearTimeout(this._titleTimerID),this._titleControlRef.value?.isVisible()&&t(),this._titleTimerID=window.setTimeout(t,500)}connectedCallback(){super.connectedCallback(),this.addEventListener("frigate-card:media:loaded",this._boundAutoPlayHandler),this.addEventListener("frigate-card:media:loaded",this._boundAutoUnmuteHandler),this.addEventListener("frigate-card:media:loaded",this._debouncedAdaptContainerHeightToSlide),this.addEventListener("frigate-card:media:loaded",this._boundTitleHandler),this._intersectionObserver.observe(this)}disconnectedCallback(){this.removeEventListener("frigate-card:media:loaded",this._boundAutoPlayHandler),this.removeEventListener("frigate-card:media:loaded",this._boundAutoUnmuteHandler),this.removeEventListener("frigate-card:media:loaded",this._debouncedAdaptContainerHeightToSlide),this.removeEventListener("frigate-card:media:loaded",this._boundTitleHandler),this._intersectionObserver.disconnect(),this._mediaLoadedInfo={},super.disconnectedCallback()}_reInitAndAdjustHeight(){this.frigateCardCarousel()?.carouselReInitWhenSafe(),this._debouncedAdaptContainerHeightToSlide()}_intersectionHandler(t){t.some((t=>t.isIntersecting))&&this._reInitAndAdjustHeight()}_adaptContainerHeightToSlide(){const t=this.frigateCardCarousel()?.getCarouselSelected();if(t){this.style.removeProperty("max-height");const a=t.element.getBoundingClientRect().height;void 0!==a&&a>0&&(this.style.maxHeight=`${a}px`)}}_dispatchMediaLoadedInfo(t){const a=t.index;void 0!==a&&a in this._mediaLoadedInfo&&g(this,this._mediaLoadedInfo[a])}_storeMediaLoadedInfo(t){t.stopPropagation();const a=t.detail.mediaLoadedInfo,e=t.detail.slide;a&&b(a)&&(this._mediaLoadedInfo[e]=a,this.frigateCardCarousel()?.getCarouselSelected()?.index===e&&g(this,a))}_removeMediaLoadedInfo(t){const a=t.detail.slide;delete this._mediaLoadedInfo[a],this.frigateCardCarousel()?.getCarouselSelected()?.index!==a&&t.stopPropagation()}render(){const t=t=>{this._slideResizeObserver.disconnect();const a=this.getRootNode();a&&a instanceof ShadowRoot&&this._slideResizeObserver.observe(a.host);const e=t.detail;this._slideResizeObserver.observe(e.element),y(this,"media-carousel:select",e),this._dispatchMediaLoadedInfo(e)};return l` <frigate-card-carousel
        ${v(this._refCarousel)}
        .selected=${this.selected??0}
        .carouselOptions=${this.carouselOptions}
        .carouselPlugins=${this.carouselPlugins}
        transitionEffect=${f(this.transitionEffect)}
        @frigate-card:carousel:select=${a=>{t(a)}}
        @frigate-card:carousel:media:loaded=${this._storeMediaLoadedInfo.bind(this)}
        @frigate-card:carousel:media:unloaded=${this._removeMediaLoadedInfo.bind(this)}
      >
        <slot slot="previous" name="previous"></slot>
        <slot></slot>
        <slot slot="next" name="next"></slot>
      </frigate-card-carousel>
      ${this.label&&this.titlePopupConfig?l`<frigate-card-title-control
            ${v(this._titleControlRef)}
            .config=${this.titlePopupConfig}
            .text="${this.label}"
            .logo="${this.logo}"
            .fitInto=${this}
          >
          </frigate-card-title-control> `:""}`}static get styles(){return h(":host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  --video-max-height: none;\n  position: relative;\n}")}};o([n({attribute:!1})],k.prototype,"nextPreviousConfig",void 0),o([n({attribute:!1})],k.prototype,"carouselOptions",void 0),o([n({attribute:!1})],k.prototype,"carouselPlugins",void 0),o([n({attribute:!1,type:Number})],k.prototype,"selected",void 0),o([n({attribute:!0})],k.prototype,"transitionEffect",void 0),o([n({attribute:!1})],k.prototype,"label",void 0),o([n({attribute:!1})],k.prototype,"logo",void 0),o([n({attribute:!1})],k.prototype,"titlePopupConfig",void 0),k=o([d("frigate-card-media-carousel")],k);let w=class extends r{constructor(){super(...arguments),this._toastRef=m()}render(){if(!this.text||!this.config||"none"==this.config.mode||!this.fitInto)return l``;const t=this.config.mode.match(/-top-/)?"top":"bottom",a=this.config.mode.match(/-left$/)?"left":"right";return l` <paper-toast
      ${v(this._toastRef)}
      class="capsule"
      .duration=${1e3*this.config.duration_seconds}
      .verticalAlign=${t}
      .horizontalAlign=${a}
      .text="${this.text}"
      .fitInto=${this.fitInto}
    >
      ${this.logo?l`<img src=${this.logo} />`:""}
    </paper-toast>`}isVisible(){return this._toastRef.value?.opened??!1}hide(){this._toastRef.value&&(this._toastRef.value.opened=!1)}show(){this._toastRef.value&&(this._toastRef.value.opened=!1,this._toastRef.value.opened=!0)}static get styles(){return h(":host {\n  --paper-toast-background-color: rgba(0,0,0,0.6);\n  --paper-toast-color: white;\n}\n\npaper-toast {\n  max-width: unset;\n  min-width: unset;\n  display: flex;\n  align-items: center;\n}\n\npaper-toast img {\n  max-height: 24px;\n  padding-left: 10px;\n}")}};o([n({attribute:!1})],w.prototype,"config",void 0),o([n({attribute:!1})],w.prototype,"text",void 0),o([n({attribute:!1})],w.prototype,"fitInto",void 0),o([n({attribute:!1})],w.prototype,"logo",void 0),w=o([d("frigate-card-title-control")],w);const $={active:!0,breakpoints:{}};function H(t){const a=_.optionsHandler(),e=a.merge($,H.globalOptions);let o,n,i;function d(){"hidden"===document.visibilityState?(o.autoPauseCondition&&["all","hidden"].includes(o.autoPauseCondition)&&function(){for(const t of i)r(t)?.pause()}(),o.autoMuteCondition&&["all","hidden"].includes(o.autoMuteCondition)&&function(){for(const t of i)r(t)?.mute()}()):"visible"===document.visibilityState&&(o.autoPlayCondition&&["all","visible"].includes(o.autoPlayCondition)&&s(),o.autoUnmuteCondition&&["all","visible"].includes(o.autoUnmuteCondition)&&u())}function r(t){return o.playerSelector?t?.querySelector(o.playerSelector):null}function s(){r(i[n.selectedScrollSnap()])?.play()}function l(){r(i[n.selectedScrollSnap()])?.pause()}function c(){r(i[n.previousScrollSnap()])?.pause()}function u(){r(i[n.selectedScrollSnap()])?.unmute()}function h(){r(i[n.selectedScrollSnap()])?.mute()}function m(){r(i[n.previousScrollSnap()])?.mute()}const p={name:"autoMedia",options:a.merge(e,t),init:function(t){n=t,o=a.atMedia(p.options),i=n.slideNodes(),n.on("destroy",l),o.autoPauseCondition&&["all","unselected"].includes(o.autoPauseCondition)&&n.on("select",c),n.on("destroy",h),o.autoMuteCondition&&["all","unselected"].includes(o.autoMuteCondition)&&n.on("select",m),document.addEventListener("visibilitychange",d)},destroy:function(){n.off("destroy",l),o.autoPauseCondition&&["all","unselected"].includes(o.autoPauseCondition)&&n.off("select",c),n.off("destroy",h),o.autoMuteCondition&&["all","unselected"].includes(o.autoMuteCondition)&&n.off("select",m),document.removeEventListener("visibilitychange",d)},play:s,pause:l,mute:h,unmute:u};return p}H.globalOptions=void 0;const M={active:!0,breakpoints:{},lazyLoadCount:0};function T(t){const a=_.optionsHandler(),e=a.merge(M,T.globalOptions);let o,n,i;const d=new Set,r=["init","select","resize"],s=["select"];function l(){"hidden"===document.visibilityState&&o.lazyUnloadCallback&&o.lazyUnloadCondition&&["all","hidden"].includes(o.lazyUnloadCondition)?d.forEach((t=>{o.lazyUnloadCallback&&(o.lazyUnloadCallback(t,i[t]),d.delete(t))})):"visible"===document.visibilityState&&o.lazyLoadCallback&&u()}function c(t){return d.has(t)}function u(){const t=o.lazyLoadCount??0,a=n.selectedScrollSnap(),e=new Set;for(let o=1;o<=t&&a-o>=0;o++)e.add(a-o);e.add(a);for(let o=1;o<=t&&a+o<i.length;o++)e.add(a+o);e.forEach((t=>{!c(t)&&o.lazyLoadCallback&&(d.add(t),o.lazyLoadCallback(t,i[t]))}))}function h(){const t=n.previousScrollSnap();c(t)&&o.lazyUnloadCallback&&(o.lazyUnloadCallback(t,i[t]),d.delete(t))}const m={name:"lazyload",options:a.merge(e,t),init:function(t){n=t,o=a.atMedia(m.options),i=n.slideNodes(),o.lazyLoadCallback&&r.forEach((t=>n.on(t,u))),o.lazyUnloadCallback&&o.lazyUnloadCondition&&["all","unselected"].includes(o.lazyUnloadCondition)&&s.forEach((t=>n.on(t,h))),document.addEventListener("visibilitychange",l)},destroy:function(){o.lazyLoadCallback&&r.forEach((t=>n.off(t,u))),o.lazyUnloadCallback&&s.forEach((t=>n.off(t,h))),document.removeEventListener("visibilitychange",l)},hasLazyloaded:c};return m}T.globalOptions=void 0;export{H as A,T as L,z as M,L as a,P as h,x as i,S as p,I as w};
