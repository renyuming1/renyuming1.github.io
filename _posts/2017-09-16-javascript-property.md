


Javascript Property



Configurable


Seal


属性访问：
如何区分变量为undefined还是不存在？

1. in
in 操作符会检查属性是否在对象及其 [[Prototype]] 原型链中.
```javascript
var myObject = { 
	a:2
};

("a" in myObject); // true
("b" in myObject); // false
myObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "b" ); // false

```

2. hasOwnProperty()
hasOwnProperty(..) 只会检查属性是否在 `myObject` 对象中,不会检查 [[Prototype]] 链。
```javascript
var myObject = { 
	a:2
};

myObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "b" ); // false

```

> Note： 所有的普通对象都可以通过对于Object.prototype的委托来访问 `hasOwnProperty(..)`, 但是有的对象可能没有连接到Object.prototype(通过 Object. create(null)来创建)。在这种情况下,形如 myObejct.hasOwnProperty(..) 就会失败。这时可以使用一种更加强硬的方法来进行判断:Object.prototype.hasOwnProperty. call(myObject,"a"),它借用基础的 hasOwnProperty(..) 方法并把它显式绑定到 myObject 上。


[[Get]]

[[Put]]

Get Set


getter setter
在 ES5 中可以使用 getter 和 setter 部分改写默认操作,但是只能应用在单个属性上,无法 应用在整个对象上。getter 是一个隐藏函数,会在获取属性值时调用。setter 也是一个隐藏 函数,会在设置属性值时调用。

```javascript
var myObject = {
// 给 a 定义一个 getter 
	get a() {
		return 2; 
	}
};

Object.defineProperty( 
	myObject, // 目标对象 
	"b", // 属性名
	{
		// 给b设置一个 getter
		get: function(){ return this.a * 2 },

		// 确保b会出现在对象的属性列表中
		enumerable: true
	}
);

myObject.a; // 2

myObject.b; // 4


```

以上代码只设置了get， 所以对a和b的set操作会被忽略（严格模式报 ReferType Error错）。常见的属性都包含setter和getter
一个常见的设置方法
```javascript
var myObject = {
// 给 a 定义一个 getter 
	get a() {
		return this._a_; 
	},
// 给 a 定义一个 setter 
	set a(val) {
		this._a_ = val * 2;
	}
};

myObject.a = 2;

console.log(myObject.a); // 4
```

> Tips: _a_  是在getter 和 setter中定义变量的一个惯例。
