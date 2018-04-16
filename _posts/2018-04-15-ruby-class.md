---
layout: post
title:  "Ruby Class"
date:   2018-04-15 14:06:05
categories: ruby
tags: ruby
---

* content
{:toc}








## class
```ruby
class Horse
end
```

### checking instance

```ruby
a.class # => Horse 
a.is_a? Horse # => True
```


### initializing

```ruby
class Horse
    def initilize(color, breed)
        @color, @breed = color, breed
    end
end
```
`@color`, `@breed` here are **instance variables**, which can be used everywhere in the instance. We can also define setter and getter

```ruby
class Horse
    def initialize(color, breed)
        @color, @breed = color, breed
    end

    # Getter
    def color
        @color
    end

    # Getter
    def breed
        @breed
    end

    # Setter
    def color=(val)
        @color = val
    end

    # Setter
    def breed=(val)
        @breed = val
    end
end
```

A more easily way
```ruby
attr_reader # getter
attr_accessor # getter and setter
```
`attr_reader` and `attr_accessor` are Module Class defined methods.

```ruby
class Horse

    attr_accessor :color, :breed

    def initialize(color, breed)
        @color, @breed = color, breed
    end
end
```


### create a new class
```ruby
dilu = Horse.new('Chestnut', 'Spain')
```

### Constants
```ruby
class Horse
    def initialize(color,breed)
        @color, @breed = color, breed
    end

    # constants
    LEGS = 4
    TEETH = 36
end
```

Call Constants
```ruby
puts Horse::LEGS
```

### Class Method

```ruby
class Horse

    attr_accessor :color, :breed, :id

    # constants
    LEGS = 4
    TEETH = 36

    def initialize(id, color,breed)
        @id, @color, @breed = id, color, breed
    end

    def change_id(new_id)
        @id = new_id
    end
end 
```

Singleton Class Method
```ruby
class Horse
    def Horse.get_feed()
         # do something
    end
end
```
Also, it can be refactored as
```ruby
class Horse
    def self.get_feed()
         # do something
    end
end
```
Another way is
```ruby
# Open up the Horse object so we can add methos to id
class << Horse
    def get_feed()
        # do something
    end

    # other class methods can be defined here
end
```
Or
```ruby
class Horse
    # Instance methods go here
    class << self
        # class methods
        def get_feed()
            # do something
        end
    end
end
```

## Subclass and Inheritance

use `<` to inheritance from a superClass
```ruby
class SmallHorse < Horse
    
end
```

### Override Method
```ruby
class Vehicle
    # super class method
    def is_awd?
        'depends'
    end    
end

class Truck < Vehicle
    # override the super calss method
    def is_awd?
        'yes'
    end
end

class Car < Vehicle
    def is_awd?
        'no'
    end
end
```


### Inheritance 

#### Argumenting Chaining

`super`

Here is an example:

```ruby
class Point3D < Point
    def initialize(x, y, z)
        super(x, y)
        @z = z
    end

    def to_s
        "(#@x, #@y, #@z)"
    end
end

class Point
    attr_accessor :x, :y
    def initialize(x, y)
        @x, @y = x, y
    end
end

class C < A
    @@val = 3
end
```

#### Inheritance Constants
Ruby Constants are inherited and can be overridden, much like instance methods. 
```ruby
class A 
    ORI = 'A'
    def to_s
        puts ORI
    end
end

class B < A
    ORI = 'B'
    def to_s
        puts ORI
    end
end

A.to_s # => A
B.to_s # => B
```

> **Note**:
> The important difference between constants and methods is that constants are looked up in the lexical scope of the place they are used before they are looked up in the inheritance hierarchy. 


### Abstract Class
Ruby does not have an abstract class or interface concepts. But we can kindly realize it like
```ruby
class AbstractClass
    def initialize 
        raise "Abstract class cannot be instanced"
    end

    # method 1
    def method_1
        raise "abstract class method 1"
    end

    # method 2
    def
        raise "abstract class method 2"
    end
end

# inheritance 
class SubClass < AbstractClass
    def initialize
    end

    def method_1
        puts "subclass method 1"
    end

    def method_2
       puts "subclass method 2"
    end
end
```
> TODO

### Multi Inheritance Class

> TODO
