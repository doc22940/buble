module.exports = [
	{
		description: 'disallows object spread operator',
		input: 'var obj = {...a};',
		error: /Object spread operator requires specified objectAssign option with 'Object\.assign' or polyfill helper\./
	},

	{
		description: 'transpiles object spread with one object',
		options: {
			objectAssign: 'Object.assign'
		},
		input: `var obj = {...a};`,
		output: `var obj = Object.assign({}, a);`
	},

	{
		description: 'transpiles object spread with two objects',
		options: {
			objectAssign: 'Object.assign'
		},
		input: `var obj = {...a, ...b};`,
		output: `var obj = Object.assign({}, a, b);`
	},

	{
		description: 'transpiles object spread with regular keys in between',
		options: {
			objectAssign: 'Object.assign'
		},
		input: `var obj = { ...a, b: 1, c: 2 };`,
		output: `var obj = Object.assign({}, a, {b: 1, c: 2});`
	},

	{
		description: 'transpiles object spread mixed',
		options: {
			objectAssign: 'Object.assign'
		},
		input: `var obj = { ...a, b: 1, ...d, e};`,
		output: `var obj = Object.assign({}, a, {b: 1}, d, {e: e});`
	},

	{
		description: 'transpiles objects with spread with computed property (#144)',
		options: {
			objectAssign: 'Object.assign'
		},
		input: `
			var a0 = { [ x ] : true , ... y };
			var a1 = { [ w ] : 0 , [ x ] : true , ... y };
			var a2 = { v, [ w ] : 0, [ x ] : true, ... y };
			var a3 = { [ w ] : 0, [ x ] : true };
			var a4 = { [ w ] : 0 , [ x ] : true , y };
			var a5 = { k : 9 , [ x ] : true, ... y };
			var a6 = { ... y, [ x ] : true };
			var a7 = { ... y, [ w ] : 0, [ x ] : true };
			var a8 = { k : 9, ... y, [ x ] : true };
			var a9 = { [ x ] : true , [ y ] : false , [ z ] : 9 };
			var a10 = { [ x ] : true, ...y, p, ...q };
			var a11 = { x, [c] : 9 , y };
			var a12 = { ...b, [c]:3, d:4 };
		`,
		output: `
			var obj, obj$1, obj$2, obj$3, obj$4, obj$5, obj$6, obj$7, obj$8;

			var a0 = Object.assign(( obj = {}, obj[ x ] = true, obj ), y);
			var a1 = Object.assign(( obj$1 = {}, obj$1[ w ] = 0, obj$1[ x ] = true, obj$1 ), y);
			var a2 = Object.assign(( obj$2 = { v: v }, obj$2[ w ] = 0, obj$2[ x ] = true, obj$2 ), y);
			var a3 = {};
			a3[ w ] = 0;
			a3[ x ] = true;
			var a4 = {};
			a4[ w ] = 0;
			a4[ x ] = true;
			a4.y = y;
			var a5 = Object.assign(( obj$3 = { k : 9 }, obj$3[ x ] = true, obj$3 ), y);
			var a6 = Object.assign({}, y, ( obj$4 = {}, obj$4[ x ] = true, obj$4 ));
			var a7 = Object.assign({}, y, ( obj$5 = {}, obj$5[ w ] = 0, obj$5[ x ] = true, obj$5 ));
			var a8 = Object.assign({ k : 9 }, y, ( obj$6 = {}, obj$6[ x ] = true, obj$6 ));
			var a9 = {};
			a9[ x ] = true;
			a9[ y ] = false;
			a9[ z ] = 9;
			var a10 = Object.assign(( obj$7 = {}, obj$7[ x ] = true, obj$7 ), y, {p: p}, q);
			var a11 = { x: x };
			a11[c] = 9;
			a11.y = y;
			var a12 = Object.assign({}, b, ( obj$8 = {}, obj$8[c] = 3, obj$8 ), {d:4});
		`
	},
	{
		description: 'doesn\'t transpile objects with spread with computed property if disabled',
		options: {
			objectAssign: 'Object.assign',
			transforms: { objectRestSpread: false, computedProperty: false, conciseMethodProperty: false }
		},
		input: `
			var a0 = { [ x ] : true , ... y };
			var a1 = { [ w ] : 0 , [ x ] : true , ... y };
			var a2 = { v, [ w ] : 0, [ x ] : true, ... y };
			var a3 = { [ w ] : 0, [ x ] : true };
			var a4 = { [ w ] : 0 , [ x ] : true , y };
			var a5 = { k : 9 , [ x ] : true, ... y };
			var a6 = { ... y, [ x ] : true };
			var a7 = { ... y, [ w ] : 0, [ x ] : true };
			var a8 = { k : 9, ... y, [ x ] : true };
			var a9 = { [ x ] : true , [ y ] : false , [ z ] : 9 };
			var a10 = { [ x ] : true, ...y, p, ...q };
			var a11 = { x, [c] : 9 , y };
			var a12 = { ...b, [c]:3, d:4 };
		`,
		output: `
			var a0 = { [ x ] : true , ... y };
			var a1 = { [ w ] : 0 , [ x ] : true , ... y };
			var a2 = { v, [ w ] : 0, [ x ] : true, ... y };
			var a3 = { [ w ] : 0, [ x ] : true };
			var a4 = { [ w ] : 0 , [ x ] : true , y };
			var a5 = { k : 9 , [ x ] : true, ... y };
			var a6 = { ... y, [ x ] : true };
			var a7 = { ... y, [ w ] : 0, [ x ] : true };
			var a8 = { k : 9, ... y, [ x ] : true };
			var a9 = { [ x ] : true , [ y ] : false , [ z ] : 9 };
			var a10 = { [ x ] : true, ...y, p, ...q };
			var a11 = { x, [c] : 9 , y };
			var a12 = { ...b, [c]:3, d:4 };
		`
	},
	{
		description: 'supports transpiling spread properties if computed properties shouldn\'t be transpiled',
		options: {
			objectAssign: 'Object.assign',
			transforms: { computedProperty: false, conciseMethodProperty: false }
		},
		input: `
			var a0 = { [ x ] : true , ... y };
		`,
		output: `
			var a0 = Object.assign({}, {[ x ] : true} , y);
		`,
	},
	{
		description: 'supports transpiling computed properties if spread properties shouldn\'t be transpiled',
		options: {
			objectAssign: 'Object.assign',
			transforms: { objectRestSpread: false, conciseMethodProperty: false }
		},
		input: `
			var a0 = { [ x ] : true , ... y };
		`,
		output: `
			var obj;

			var a0 = Object.assign(( obj = {}, obj[ x ] = true, obj ), y);
		`,
	},
	{
		description:
			'transpiles inline objects with spread with computed property (#144)',
		options: {
			objectAssign: 'Object.assign'
		},
		input: `
			f0( { [ x ] : true , ... y } );
			f1( { [ w ] : 0 , [ x ] : true , ... y } );
			f2( { v, [ w ] : 0, [ x ] : true, ... y } );
			f3( { [ w ] : 0, [ x ] : true } );
			f4( { [ w ] : 0 , [ x ] : true , y } );
			f5( { k : 9 , [ x ] : true, ... y } );
			f6( { ... y, [ x ] : true } );
			f7( { ... y, [ w ] : 0, [ x ] : true } );
			f8( { k : 9, ... y, [ x ] : true } );
			f9( { [ x ] : true , [ y ] : false , [ z ] : 9 } );
			f10( { [ x ] : true, ...y, p, ...q } );
			f11( { x, [c] : 9 , y } );
			f12({ ...b, [c]:3, d:4 });
		`,
		output: `
			var obj, obj$1, obj$2, obj$3, obj$4, obj$5, obj$6, obj$7, obj$8, obj$9, obj$10, obj$11, obj$12;

			f0( Object.assign(( obj = {}, obj[ x ] = true, obj ), y) );
			f1( Object.assign(( obj$1 = {}, obj$1[ w ] = 0, obj$1[ x ] = true, obj$1 ), y) );
			f2( Object.assign(( obj$2 = { v: v }, obj$2[ w ] = 0, obj$2[ x ] = true, obj$2 ), y) );
			f3( ( obj$3 = {}, obj$3[ w ] = 0, obj$3[ x ] = true, obj$3 ) );
			f4( ( obj$4 = {}, obj$4[ w ] = 0, obj$4[ x ] = true, obj$4.y = y, obj$4 ) );
			f5( Object.assign(( obj$5 = { k : 9 }, obj$5[ x ] = true, obj$5 ), y) );
			f6( Object.assign({}, y, ( obj$6 = {}, obj$6[ x ] = true, obj$6 )) );
			f7( Object.assign({}, y, ( obj$7 = {}, obj$7[ w ] = 0, obj$7[ x ] = true, obj$7 )) );
			f8( Object.assign({ k : 9 }, y, ( obj$8 = {}, obj$8[ x ] = true, obj$8 )) );
			f9( ( obj$9 = {}, obj$9[ x ] = true, obj$9[ y ] = false, obj$9[ z ] = 9, obj$9 ) );
			f10( Object.assign(( obj$10 = {}, obj$10[ x ] = true, obj$10 ), y, {p: p}, q) );
			f11( ( obj$11 = { x: x }, obj$11[c] = 9, obj$11.y = y, obj$11 ) );
			f12(Object.assign({}, b, ( obj$12 = {}, obj$12[c] = 3, obj$12 ), {d:4}));
		`
	},

	{
		description: 'transpiles object spread nested',
		options: {
			objectAssign: 'Object.assign'
		},
		input: `var obj = { ...a, b: 1, dd: {...d, f: 1}, e};`,
		output: `var obj = Object.assign({}, a, {b: 1, dd: Object.assign({}, d, {f: 1}), e: e});`
	},

	{
		description: 'transpiles object spread deeply nested',
		options: {
			objectAssign: 'Object.assign'
		},
		input: `const c = { ...a, b: 1, dd: {...d, f: 1, gg: {h, ...g, ii: {...i}}}, e};`,
		output: `var c = Object.assign({}, a, {b: 1, dd: Object.assign({}, d, {f: 1, gg: Object.assign({}, {h: h}, g, {ii: Object.assign({}, i)})}), e: e});`
	},

	{
		description: 'transpiles object spread with custom Object.assign',
		options: {
			objectAssign: 'angular.extend'
		},
		input: `var obj = { ...a, b: 1, dd: {...d, f: 1}, e};`,
		output: `var obj = angular.extend({}, a, {b: 1, dd: angular.extend({}, d, {f: 1}), e: e});`
	},

	{
		description: 'transpiles rest properties',
		input: `var {a, ...b} = c`,
		output: `function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
var a = c.a;
var rest = objectWithoutProperties( c, ["a"] );
var b = rest;`
	},

	{
		description: 'transpiles rest properties in assignments',
		input: `({a, ...b} = c);`,
		output: `function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

var assign, rest;
((assign = c, a = assign.a, rest = objectWithoutProperties( assign, ["a"] ), b = rest));`
	},

	{
		description: 'transpiles rest properties in arguments',
		input: `
			"use strict";
			function objectWithoutProperties({x, ...y}) {}`,
		output: `
			"use strict";
			function objectWithoutProperties$1 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
function objectWithoutProperties(ref) {
				var x = ref.x;
				var rest = objectWithoutProperties$1( ref, ["x"] );
				var y = rest;
}`
	},

	{
		description: 'transpiles rest properties in arrow function arguments',
		input: `(({x, ...y}) => {})`,
		output: `function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
(function (ref) {
	var x = ref.x;
	var rest = objectWithoutProperties( ref, ["x"] );
	var y = rest;
})`
	},

	{
	description: 'transpiles rest properties in for loop heads',
	input: `for( var {a, ...b} = c;; ) {}`,
	output: `function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
for( var a = c.a, rest = objectWithoutProperties( c, ["a"] ), b = rest;; ) {}`
	},

	{
	description: 'transpiles trivial rest properties in for loop heads',
	input: `for( var {...b} = c;; ) {}`,
	output: `function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
for( var rest = objectWithoutProperties( c, [] ), b = rest;; ) {}`
	},

	{
		description: 'inlines object spread with one object',
		input: `var obj = {...{a: 1}};`,
		output: `var obj = {a: 1};`
	},

	{
		description: 'inlines object spread with two objects',
		input: `var obj = {...{a: 1}, ...{b: 2}};`,
		output: `var obj = {a: 1, b: 2};`
	},

	{
		description: 'inlines object spread with regular keys in between',
		input: `var obj = { ...{a: 1}, b: 2, c: 3 };`,
		output: `var obj = { a: 1, b: 2, c: 3 };`
	},

	{
		description: 'inlines object spread mixed',
		input: `var obj = { ...{a: 1}, b: 2, ...{c: 3}, e};`,
		output: `var obj = { a: 1, b: 2, c: 3, e: e};`
	},

	{
		description: 'inlines object spread very mixed',
		options: {
			objectAssign: 'Object.assign'
		},
		input: `var obj = { ...{a: 1}, b: 2, ...c, e};`,
		output: `var obj = Object.assign({}, {a: 1, b: 2}, c, {e: e});`
	},

	{
		description: 'inlines object spread without extraneous trailing commas',
		options: {
			objectAssign: 'Object.assign'
		},
		input: `
			var obj = { ...{a: 1,}, b: 2, ...{c: 3,}, ...d, e, ...{f: 6,},};
			obj = { a: 1, b: 2, };
			obj = { a: 1, ...{b: 2} };
			obj = { a: 1, ...{b: 2,} };
			obj = { a: 1, ...{b: 2}, };
			obj = { a: 1, ...{b: 2,}, };
		`,
		output: `
			var obj = Object.assign({}, {a: 1, b: 2, c: 3}, d, {e: e, f: 6});
			obj = { a: 1, b: 2, };
			obj = { a: 1, b: 2 };
			obj = { a: 1, b: 2 };
			obj = { a: 1, b: 2, };
			obj = { a: 1, b: 2, };
		`
	}
];
