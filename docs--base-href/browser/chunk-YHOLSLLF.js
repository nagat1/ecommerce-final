var o=Object.defineProperty,p=Object.defineProperties;var q=Object.getOwnPropertyDescriptors;var f=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable;var j=(b,a,c)=>a in b?o(b,a,{enumerable:!0,configurable:!0,writable:!0,value:c}):b[a]=c,r=(b,a)=>{for(var c in a||={})k.call(a,c)&&j(b,c,a[c]);if(f)for(var c of f(a))l.call(a,c)&&j(b,c,a[c]);return b},s=(b,a)=>p(b,q(a));var t=(b,a)=>{var c={};for(var d in b)k.call(b,d)&&a.indexOf(d)<0&&(c[d]=b[d]);if(b!=null&&f)for(var d of f(b))a.indexOf(d)<0&&l.call(b,d)&&(c[d]=b[d]);return c};var u=(b,a)=>()=>(a||b((a={exports:{}}).exports,a),a.exports);var v=(b,a,c)=>new Promise((d,i)=>{var m=e=>{try{g(c.next(e))}catch(h){i(h)}},n=e=>{try{g(c.throw(e))}catch(h){i(h)}},g=e=>e.done?d(e.value):Promise.resolve(e.value).then(m,n);g((c=c.apply(b,a)).next())});export{r as a,s as b,t as c,u as d,v as e};
