(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n === undefined){
      return array[array.length -1];
    } else if(n > array.length){
      return array;
    } else if(n === 0){
      return [];
    }
     return array.slice(-n);
    };
  

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)) {
    for(let i = 0; i < collection.length;i++) {
      iterator(collection[i],i,collection);
    }
    } else {
      for(let key in collection){
        iterator(collection[key],key,collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    let output = [];
    _.each(collection,function(ele){
      if(test(ele)){
        output.push(ele);
      }
    });
    return output;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection,function(ele){
      return !test(ele);
    });
  };

  // Produce a duplicate-free version of the array.
  /*var iterator = function(value) { return value === 1; };
var numbers = [1, 2, 2, 3, 4, 4];
expect(_.uniq(numbers)).to.eql([1, 2]);*/
  _.uniq = function(array, isSorted, iterator) {
    let output = [];
    if(isSorted){
      let map = [];
      for(let i = 0; i < array.length;i++) {
        if(!map.includes(iterator(array[i]))) {
          map.push(iterator(array[i]));
          output.push(array[i]);
        }
      }
      return output;
    }
    _.each(array,function(ele){
      if(!output.includes(ele)){
        output.push(ele);
      }
    });
    return output;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    let output = [];
    _.each(collection,function(ele){
        output.push(iterator(ele));
    });
    return output;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    if(accumulator === undefined) {
        accumulator = collection[0];
        collection = collection.slice(1);
    }
    let output = accumulator;
    for(let i = 0; i < collection.length;i++) {
      output = iterator(output,collection[i]);
    }
    return output;
  };

  // Determine if the array or object contains a given value (using `===`).
    _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    if(Array.isArray(collection)) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
    } else {
      for(let key in collection){
        if(collection[key] === target) {
          return true;
        }
      }
      return false;
    }
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if(iterator){
    return _.reduce(collection,function(acc,cur){
          if(acc && iterator(cur)) {
            return true;
          } else {
            return false;
          }
    },true);
  } else {
    return _.reduce(collection,function(acc,cur){
          if(acc && cur) {
            return true;
          } else {
            return false;
          }
    },true);
  }
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if(iterator){
      return !_.every(collection,function(ele) {
            return !iterator(ele);
      });
    }
    return !_.every(collection,function(ele) {
      return !ele;
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    let args = [...arguments];
    let first = args.shift();
    return _.reduce(args,function(acc,cur) {
        _.each(cur,function(value,key) {
              acc[key] = value;
        });
        return acc;
    },first);
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    let args = [...arguments];
    let first = args.shift();
    return _.reduce(args,function(acc,cur) {
        _.each(cur,function(value,key) {
              if(!acc.hasOwnProperty(key))
              acc[key] = value;
        });
        return acc;
    },first);
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //expect(add(1, 2)).to.equal(3);
      //  expect(memoAdd(1, 2)).to.equal(3);
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    /* {12: "1,2undefined"}
*/
   
    let map = {};
    return function() {
       let args = [...arguments];
      if(!map[args.join('')]) {
          map[args.join('')] = func(...args);
          return  map[args.join('')];
      } else {
        return map[args.join('')];
      }
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  //_.delay(callback, 100, 1, 2);
  _.delay = function(func, wait) {
    var args = [...arguments];
    if(args.length > 2){
    args.splice(0,2);
    func = func.apply(null,args)
    }
    return function() {
      setTimeout(func,wait);
    }()
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
      let output = array.slice();
       for (var i = array.length-1; i >= 0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = output[randomIndex]; 
         
        output[randomIndex] = output[i]; 
        output[i] = itemAtIndex;
    }
    return output;
  };


  /**
   * ADVANCED
   * =================


   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var output = [];
    var myfunc;
    if(typeof functionOrKey === 'string') {
      myfunc = String.prototype[functionOrKey];
      _.each(collection,function(ele){
        output.push(myfunc.apply(ele));
      });
      return output;
    }
    _.each(collection,function(ele){
      output.push(functionOrKey.apply(ele));
    });
    return output;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  /*var list = ['one', 'two', 'three', 'four', 'five'];
var sorted = _.sortBy(list, 'length');
expect(sorted).to.eql(['one', 'two', 'four', 'five', 'three']);*/
  _.sortBy = function(collection, iterator) {
  var result = collection.slice();

  if (typeof iterator === 'string') {
    result.sort(function(a, b) {
      return a[iterator] - b[iterator];
    });
  } else if (typeof iterator === 'function') {
    result.sort(function(a, b) {
      return iterator(a) - iterator(b);
    });
  }
  
  return result;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  
  _.zip = function() {
    var output = [];
    var inputs = [...arguments];
    for(var i = 0; i < inputs[0].length;i++) {
      var arr = [];
      for(var j = 0; j < inputs.length;j++) {
        arr.push(inputs[j][i]);
      }
      output.push(arr);
    }
    return output;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var output =[];
    for(var i = 0; i < nestedArray.length;i++) {
      if(Array.isArray(nestedArray[i])) {
        output = output.concat(_.flatten(nestedArray[i]));
      } else { 
        output.push(nestedArray[i]);
      }
    }
    return output;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var inputs = [...arguments];
    var first = inputs.shift();
    return  _.reduce(inputs,function(acc,cur){
      return _.filter(cur,function(e){
        return acc.includes(e);
      });

    },first);

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  //var diff = _.difference([1,2,3], [2,30,40]);
//expect(diff).to.eql([1,3]);
  _.difference = function(array) {
    var inputs = [...arguments];
    var first = inputs.shift();
    return  _.reduce(inputs,function(acc,cur){
      return _.filter(acc,function(e){
        return !cur.includes(e);
      });

    },first);
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
 
};

}());
