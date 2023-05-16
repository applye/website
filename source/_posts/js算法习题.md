---
title: js算法习题
categories: '前端'
tags:
  - 'js'
  - '算法'
comments: false
abbrlink: 60491
date: 2023-04-16 21:52:19
img: 'https://raw.githubusercontent.com/879733672/images/cdn/img/202304262158732.png'
---

## JavaScript算法与数据结构_基础算法

1. Slice 与 Splice复制数组并插入另一个数组的指定位置

    将第一个数组中的所有元素依次复制到第二个数组中
    ```
    function frankenSplice(arr1, arr2, n) {
    const arr = arr2.slice();
    arr.splice(n, 0, ...arr1)
    return arr;
    }

    frankenSplice([1, 2, 3], [4, 5, 6], 1);
    ```

2. 过滤数组中的假值

    从数组中移除所有假值（falsy values）。

    JavaScript 中的假值有 false、null、0、""、undefined、NaN
    ```
    function bouncer(arr) {
    return arr.filter(i => i);
    }

    bouncer([7, "ate", "", false, 9]);
    ```

3. 找出元素在排序后数组中的索引

    数组（第一个参数）在排序后，将一个值（第二个参数）插入该数组，并使数组保持有序。返回这个新插入元素的最小索引值。 返回值应为一个数字。
    ```
    function getIndexToIns(arr, num) {
    arr.push(num);
    arr.sort((a, b) => a - b);
    const index = arr.findIndex(i => i === num);
    return index;
    }

    getIndexToIns([40, 60], 50);
    ```

4. 比较字符串

    如果数组里的第一个字符串包含了第二个字符串中的所有字母，则返回 true

    ```
    function mutation(arr) {
    const first = arr[0].toLowerCase();
    const two = arr[1].toLowerCase();
    for(let i=0;i<two.length;i++) {
        if(!first.includes(two[i])) {
        return false;
        }
    }
    return true;
    }

    mutation(["hello", "hey"]);
    ```

5. 分割数组

    请编写一个函数，该函数将一个数组（第一个参数）拆分成若干长度为 size（第二个参数）的子数组，并将它们作为二维数组返回。
    ```
    function chunkArrayInGroups(arr, size) {
    const newArr = [];
    for(let i=0;i<arr.length;i+=size) {
        newArr.push(arr.slice(i, i+size))
    }
    return newArr;
    }

    chunkArrayInGroups(["a", "b", "c", "d"], 2);
    ```

6.应用函数式编程将字符串转换为URL片段

    将字符串 title 转换成带有连字符号的 URL。 您可以使用本节中介绍的任何方法，但不要用 replace 方法。 以下是本次挑战的要求：

    输入包含空格和标题大小写单词的字符串

    输出字符串，单词之间的空格用连字符 (-) 替换

    输出应该是小写字母

    输出不应有任何空格

    urlSlug(" Winter Is  Coming") 应返回 winter-is-coming
    ```
    function urlSlug(title) {
        return title.toLowerCase().split(' ').filter(i => i).join('-')
    }

    function urlSlug(title) {
      return title
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .join("-");
    }

    function urlSlug(title) {
      return title
        .split(" ")
        .filter(substr => substr !== "")
        .join("-")
        .toLowerCase();
    }
    ```

7. 范围内的数字求和
    
    我们会传入一个由两个数字组成的数组。 给出一个含有两个数字的数组，我们需要写一个函数，让它返回这两个数字间所有数字（包含这两个数字）的总和。 最低的数字并不总是第一位。
    ```
    function sumAll(arr) {
      let max = Math.max(arr[0], arr[1]);
      let min = Math.min(arr[0], arr[1]);
      let sumBetween = 0;
      for (let i = min; i <= max; i++) {
        sumBetween += i;
      }
      return sumBetween;
    }

    sumAll([1, 4]);

    const sumAll = arr => {
      // Buckle up everything to one!
      const startNum = arr[0];
      const endNum = arr[1];

      // Get the count of numbers between the two numbers by subtracting them and add 1 to the absolute value.
      // ex. There are |1-4| + 1 = 4, (1, 2, 3, 4), 4 numbers between 1 and 4.
      const numCount = Math.abs(startNum - endNum) + 1;

      // Using Arithmetic Progression summing formula
      const sum = ((startNum + endNum) * numCount) / 2;
      return sum;
    };

    function sumAll(arr) {
      var num1 = arr[0] < arr[1] ? arr[0] : arr[1];
      var num2 = arr[0] < arr[1] ? arr[1] : arr[0];
      var count = ((num1+num2)*(num2-num1+1)) / 2;
      return count;
    }

    sumAll([1, 4]);
    ```

8. 数组的对称差

    比较两个数组并返回一个新数组，包含所有只在其中一个数组中出现的元素，排除两个数组都存在的元素。 换言之，我们需要返回两个数组的对称差。

    ```
    function diffArray(arr1, arr2) {
        const newArr = [];

        function diff(a, b) {
            for(let i of a) {
              if(!b.includes(i)) {
                newArr.push(i);
              }
            }
        }
        diff(arr1, arr2);
        diff(arr2, arr1);
        return newArr;
    }

    function diffArray(arr1, arr2) {
      return [...diff(arr1, arr2), ...diff(arr2, arr1)];

      function diff(a, b) {
        return a.filter(item => b.indexOf(item) === -1);
      }
    }

    function diffArray(arr1, arr2) {
      return arr1
        .concat(arr2)
        .filter(item => !arr1.includes(item) || !arr2.includes(item));
    }

    diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);
    ```

9. 过滤数组元素

    你将获得一个初始数组（destroyer 函数中的第一个参数），后跟一个或多个参数。 从初始数组中移除所有与后续参数相等的元素。
    ```
    function destroyer() {
      const newArr = [];
      const [first, ...rest] = arguments;
      for(let i of first) {
        if(!rest.includes(i)) {
          newArr.push(i)
        }
      }
      return newArr;
    }

    function destroyer(arr) {
      var valsToRemove = Array.from(arguments).slice(1);
      return arr.filter(function(val) {
        return !valsToRemove.includes(val);
      });
    }

    function destroyer(arr, ...valsToRemove) {
      return arr.filter(elem => !valsToRemove.includes(elem));
    }

    function destroyer(arr) {
      let valsToRemove = Object.values(arguments).slice(1);

      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < valsToRemove.length; j++) {
          if (arr[i] === valsToRemove[j]) {
            delete arr[i];
          }
        }
      }
      return arr.filter(item => item !== null);
    }

    destroyer([1, 2, 3, 1, 2, 3], 2, 3);

    ```

10. 找出包含特定键值对的对象找出包含特定键值对的对象

    ```
     function whatIsInAName(collection, source) {
      var srcKeys = Object.keys(source);
      // 只修改这一行下面的代码
      const arr = collection.filter(obj => {
        for (let key of srcKeys) {
         if (!obj.hasOwnProperty(key) ||
            obj[key] !== source[key]
          ) {
            return false;
          }
        }
        return true;
      })

      // 只修改这一行上面的代码
      return arr;
    }


    function whatIsInAName(collection, source) {
      // "What's in a name? that which we call a rose
      // By any other name would smell as sweet.”
      // -- by William Shakespeare, Romeo and Juliet
      var srcKeys = Object.keys(source);

      return collection.filter(function(obj) {
        return srcKeys.every(function(key) {
          return obj.hasOwnProperty(key) && obj[key] === source[key];
        });
      });
    }

    whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
    ```

11. 短线连接格式
   
   将字符串转换为短线连接格式。 短线连接格式是小写单词全部小写并以破折号分隔。
  ```
  function spinalCase(str) {
    return str.split(/\s|_|(?=[A-Z])/).join('-').toLowerCase();
  }

  function spinalCase(str) {
  // Create a variable for the white space and underscores.
    var regex = /\s+|_+/g;

    // Replace low-upper case to low-space-uppercase
    str = str.replace(/([a-z])([A-Z])/g, "$1 $2");

    // Replace space and underscore with -
    return str.replace(regex, "-").toLowerCase();
  }

  function spinalCase(str) {
    // Replace low-upper case to low-space-uppercase
    str = str.replace(/([a-z])([A-Z])/g, "$1 $2");
    // Split on whitespace and underscores and join with dash
    return str
      .toLowerCase()
      .split(/(?:_| )+/)
      .join("-");
  }

  spinalCase('This Is Spinal Tap'); 
  ```

12. 儿童黑话
  
  儿童黑话也叫 Pig Latin，是一种英语语言游戏。 规则如下：

- 如果单词以辅音开头，就把第一个辅音字母或第一组辅音簇移到单词的结尾，并在后面加上 ay。

- 如果单词以元音开头，只需要在结尾加上 way。

  ```
  function translatePigLatin(str) {
    let consonantRegex = /^[^aeiou]+/;
    let myConsonants = str.match(consonantRegex);
    return myConsonants !== null
      ? str
          .replace(consonantRegex, "")
          .concat(myConsonants)
          .concat("ay")
      : str.concat("way");
  }

  function translatePigLatin(str) {
    // Create variables to be used
    var pigLatin = "";
    var regex = /[aeiou]/gi;

    // Check if the first character is a vowel
    if (str[0].match(regex)) {
      pigLatin = str + "way";
    } else if (str.match(regex) === null) {
      // Check if the string contains only consonants
      pigLatin = str + "ay";
    } else {
      // Find how many consonants before the first vowel.
      var vowelIndice = str.indexOf(str.match(regex)[0]);

      // Take the string from the first vowel to the last char
      // then add the consonants that were previously omitted and add the ending.
      pigLatin = str.substr(vowelIndice) + str.substr(0, vowelIndice) + "ay";
    }

    return pigLatin;
  }

  function translatePigLatin(str) {
    if (str.match(/^[aeiou]/)) return str + "way";

    const consonantCluster = str.match(/^[^aeiou]+/)[0];
    return str.substring(consonantCluster.length) + consonantCluster + "ay";
  }

  function translatePigLatin(str) {
    return str
      .replace(/^[aeiou]\w*/, "$&way")
      .replace(/(^[^aeiou]+)(\w*)/, "$2$1ay");
  }

  translatePigLatin("consonant");
  ```

13. DNA 配对

  给出的 DNA 链上缺少配对元素。 请基于每个字符，获取与其配对的元素，并将结果作为二维数组返回。

  DNA 的碱基对 有两种形式：一种是 A 与 T，一种是 C 与 G。 请为参数中给出的每个字符配对相应的碱基。

  注意，参数中给出的字符应作为每个子数组中的第一个元素返回。

  例如，传入 GCG 时，应返回 [["G", "C"], ["C","G"], ["G", "C"]]。

  字符和它的配对组成一个数组中，所有配对数组放在一个数组里。

  ```
  function pairElement(str) {
    var pairs = {
      A: "T",
      T: "A",
      C: "G",
      G: "C"
    };
    const arr = str.split('');
    return arr.map(i => [i, pairs[i]]);
  }

  pairElement("GCG");

  ```

14. 寻找缺失的字母
  在这道题目中，我们需要写一个函数，找出传入的字符串里缺失的字母并返回它。

  如果所有字母都在传入的字符串范围内，返回 undefined。

  ```
  function fearNotLetter(str) {
    for(var i=0;i<str.length;i++) {
      var code = str.charCodeAt(i);
      if(code !== str.charCodeAt(0) + i) {
        return String.fromCharCode(code - 1);
      }
    }
    return undefined;
  }

  function fearNotLetter(str) {
    let currCharCode = str.charCodeAt(0);
    let missing = undefined;

    str
      .split("")
      .forEach(letter => {
        if (letter.charCodeAt(0) === currCharCode) {
          currCharCode++;
        } else {
          missing = String.fromCharCode(currCharCode);
        }
      });

    function fearNotLetter(str) {
        for (let i = 1; i < str.length; ++i) {
          if (str.charCodeAt(i) - str.charCodeAt(i - 1) > 1) {
            return String.fromCharCode(str.charCodeAt(i - 1) + 1);
          }
        }
      }
      return missing;
    }

    fearNotLetter("abce");

  ```

  