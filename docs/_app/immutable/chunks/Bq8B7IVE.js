import{T as A,U as W,V as X,W as m,X as J,Y as y,Z as D,_ as o,g as h,w as U,$ as k,a0 as p,q as ee,P as ae,O as C,D as re,Q as ne,a1 as te,a2 as ie,C as fe,B as Y,a3 as M,N as $,a4 as j,E as se,a5 as Q,R as Z,a6 as ue,m as le,a7 as _e,a8 as ve,a9 as de,aa as ce,b as G,ab as oe,ac as be,o as H,ad as ge,ae as ye,af as he,ag as Pe,ah as me,f as K,ai as Ee,aj as Re}from"./D8nYJWYn.js";import{s as we,g as Ie}from"./Cpj5BbhJ.js";function I(a,f=null,v){if(typeof a!="object"||a===null||A in a)return a;const u=p(a);if(u!==W&&u!==X)return a;var i=new Map,_=ee(a),b=m(0);_&&i.set("length",m(a.length));var P;return new Proxy(a,{defineProperty(s,e,r){(!("value"in r)||r.configurable===!1||r.enumerable===!1||r.writable===!1)&&J();var t=i.get(e);return t===void 0?(t=m(r.value),i.set(e,t)):y(t,I(r.value,P)),!0},deleteProperty(s,e){var r=i.get(e);if(r===void 0)e in s&&i.set(e,m(o));else{if(_&&typeof e=="string"){var t=i.get("length"),n=Number(e);Number.isInteger(n)&&n<t.v&&y(t,n)}y(r,o),V(b)}return!0},get(s,e,r){var c;if(e===A)return a;var t=i.get(e),n=e in s;if(t===void 0&&(!n||(c=D(s,e))!=null&&c.writable)&&(t=m(I(n?s[e]:o,P)),i.set(e,t)),t!==void 0){var l=h(t);return l===o?void 0:l}return Reflect.get(s,e,r)},getOwnPropertyDescriptor(s,e){var r=Reflect.getOwnPropertyDescriptor(s,e);if(r&&"value"in r){var t=i.get(e);t&&(r.value=h(t))}else if(r===void 0){var n=i.get(e),l=n==null?void 0:n.v;if(n!==void 0&&l!==o)return{enumerable:!0,configurable:!0,value:l,writable:!0}}return r},has(s,e){var l;if(e===A)return!0;var r=i.get(e),t=r!==void 0&&r.v!==o||Reflect.has(s,e);if(r!==void 0||U!==null&&(!t||(l=D(s,e))!=null&&l.writable)){r===void 0&&(r=m(t?I(s[e],P):o),i.set(e,r));var n=h(r);if(n===o)return!1}return t},set(s,e,r,t){var R;var n=i.get(e),l=e in s;if(_&&e==="length")for(var c=r;c<n.v;c+=1){var E=i.get(c+"");E!==void 0?y(E,o):c in s&&(E=m(o),i.set(c+"",E))}n===void 0?(!l||(R=D(s,e))!=null&&R.writable)&&(n=m(void 0),y(n,I(r,P)),i.set(e,n)):(l=n.v!==o,y(n,I(r,P)));var g=Reflect.getOwnPropertyDescriptor(s,e);if(g!=null&&g.set&&g.set.call(t,r),!l){if(_&&typeof e=="string"){var S=i.get("length"),O=Number(e);Number.isInteger(O)&&O>=S.v&&y(S,O+1)}V(b)}return!0},ownKeys(s){h(b);var e=Reflect.ownKeys(s).filter(n=>{var l=i.get(n);return l===void 0||l.v!==o});for(var[r,t]of i)t.v!==o&&!(r in s)&&e.push(r);return e},setPrototypeOf(){k()}})}function V(a,f=1){y(a,a.v+f)}function Ne(a,f,v=!1){C&&re();var u=a,i=null,_=null,b=o,P=v?ne:0,s=!1;const e=(t,n=!0)=>{s=!0,r(n,t)},r=(t,n)=>{if(b===(b=t))return;let l=!1;if(C){const c=u.data===te;!!b===c&&(u=ie(),fe(u),Y(!1),l=!0)}b?(i?M(i):n&&(i=$(()=>n(u))),_&&j(_,()=>{_=null})):(_?M(_):n&&(_=$(()=>n(u))),i&&j(i,()=>{i=null})),l&&Y(!0)};ae(()=>{s=!1,f(e),s||r(null,null)},P),C&&(u=se)}let N=!1,q=Symbol();function Ae(a,f,v){const u=v[f]??(v[f]={store:null,source:Q(void 0),unsubscribe:Z});if(u.store!==a&&!(q in v))if(u.unsubscribe(),u.store=a??null,a==null)u.source.v=void 0,u.unsubscribe=Z;else{var i=!0;u.unsubscribe=we(a,_=>{i?u.source.v=_:y(u.source,_)}),i=!1}return a&&q in v?Ie(a):h(u.source)}function De(a,f){return a.set(f),f}function Le(){const a={};function f(){ue(()=>{for(var v in a)a[v].unsubscribe();le(a,q,{enumerable:!1,value:!0})})}return[a,f]}function Se(a){var f=N;try{return N=!1,[a(),N]}finally{N=f}}function z(a){for(var f=U,v=U;f!==null&&!(f.f&(oe|be));)f=f.parent;try{return H(f),a()}finally{H(v)}}function xe(a,f,v,u){var F;var i=(v&ge)!==0,_=!ye||(v&he)!==0,b=(v&Pe)!==0,P=(v&Re)!==0,s=!1,e;b?[e,s]=Se(()=>a[f]):e=a[f];var r=A in a||me in a,t=b&&(((F=D(a,f))==null?void 0:F.set)??(r&&f in a&&(d=>a[f]=d)))||void 0,n=u,l=!0,c=!1,E=()=>(c=!0,l&&(l=!1,P?n=G(u):n=u),n);e===void 0&&u!==void 0&&(t&&_&&_e(),e=E(),t&&t(e));var g;if(_)g=()=>{var d=a[f];return d===void 0?E():(l=!0,c=!1,d)};else{var S=z(()=>(i?K:Ee)(()=>a[f]));S.f|=ve,g=()=>{var d=h(S);return d!==void 0&&(n=void 0),d===void 0?n:d}}if(!(v&de))return g;if(t){var O=a.$$legacy;return function(d,w){return arguments.length>0?((!_||!w||O||s)&&t(w?g():d),d):g()}}var R=!1,B=!1,L=Q(e),T=z(()=>K(()=>{var d=g(),w=h(L);return R?(R=!1,B=!0,w):(B=!1,L.v=d)}));return i||(T.equals=ce),function(d,w){if(arguments.length>0){const x=w?h(T):_&&b?I(d):d;return T.equals(x)||(R=!0,y(L,x),c&&n!==void 0&&(n=x),G(()=>h(T))),d}return h(T)}}export{I as a,Le as b,Ae as c,Ne as i,xe as p,De as s};
