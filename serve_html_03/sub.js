const a = {
  'GET':{
    'name':(name) => {}
  }
};

let get = (b, c) => {
  a['GET'][b] = c; 
}

get('x', 'y');


/*　結果
a
{GET: {…}}GET: {x: "y", name: ƒ}__proto__: Object

a.GET
{x: "y", name: ƒ}
*/