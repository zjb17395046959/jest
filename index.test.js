/**
 * 测试的时候，输入指令npm run test
 * 查看测试覆盖率 npm run coverage
 * 在packag.json中script下的test中加入--watchAll ，就会自动进行测试
 * 只要我们输入一次npm run test,然后他就会等待，当我们的文件发生变化了，就会自动的进行测试
 * jest不支持es6的用法，我们可以使用babel转换器进行转换
 * npm install @babel/core@7.4.5 @babel/preset-env@7.4.5 -D
 * 在根目录下创建.babelrc文件，并进行配置
 * 异步代码的测试---回调函数
 * npm install axios@0.19.0 --save
 * */
const { test, expect, beforeAll, afterAll, beforeEach, afterEach } = require("@jest/globals");
const { copyFileSync } = require("fs");
import { describe } from 'yargs';
import { add, fetchData, promise_get, promise_404, anmodian} from './index_one';

// 自动化测试文件
const dabaojian = require('./index');
const { baojian1, baojian2, baojian3 } = dabaojian;
test('保健1 300元',()=>{
    expect(baojian1(300)).toBe('至宗享受');
});
test('保健2 2000', ()=>{
    expect(baojian2(2000)).toBe('双人服务');
});

/**
 * toBe()匹配器  相当于===,严格模式
 * toEqual()匹配器 相当于==，只要内容相等就可以了
 * 
 */
test('测试严格模式toBe', ()=>{
    const a = { number : '007'};
    expect(a).toBe({ number : '007'});//会报错failed，引用的地址不同
});

test('测试不严格模式toEqual', ()=>{
    const a = { number : '007'};
    expect(a).toEqual({ number : '007'});//正确，匹配器中的内容跟我们要测试的内容一致，才会通过测试
});

/**
 * toBeNull()匹配器，只匹配null，不匹配undefined
 * toBeUndefined()匹配器，只匹配undefined，不匹配null
 * toBeDefined()匹配器，只要定义过了，都可以匹配成功
 * toBeTruthy()匹配器，判断真假的，只要是true，就通过测试
 * toBeFalsy()匹配器，判断真假，只要是false，就通过测试
 */
test('测试匹配null的匹配器',()=>{
    let a = null;
    expect(a).toBeNull();
});

test('测试匹配undefined的匹配器',()=>{
    let a = undefined;
    var b;
    expect(a).toBeUndefined();
    expect(b).toBeUndefined();
});

test('toBeDefined测试',()=>{
    const a = 0;
    expect(a).toBeDefined();
}) ;
test('toBeTruthy测试',()=>{
    const a = 0;
    expect(a).toBeTruthy();//不通过，只有为true，才会通过
}) ;
test('toBeFalsy测试',()=>{
    const a = 0;
    expect(a).toBeFalsy();//通过
}) ;

/**
 * toBeGreaterThan()匹配器，用来做数字比较的，只要大于传入的数值，就可以通过测试
 * toBeLessThan()匹配器， 也是比较数字的，只要小于传入的数值，就可以通过测试
 * toBeGreaterThanOrEqual()匹配器，当测试的结果小于等于期待的数字时，可以通过测试
 * toBeLessThanOrEqual()匹配器，当测试的结果大于等于期待的数字时，可以通过测试
 * toBeCloseTo()匹配器，可以帮我们精准的计算小数点的浮点数，如0.1+0.2==0.3就可以通过了，js中一般是等于0.30000004
 */
test("toBeGreaterThan,数字比较匹配器", ()=>{
    var a = 10;
    expect(a).toBeGreaterThan(9);//传入的值小于a，测试通过
});
test("toBeLessThan,数字比较匹配器", ()=>{
    var a = 10;
    expect(a).toBeLessThan(11);//传入的值大于a，测试通过
});
test("toBeGreaterThanOrEqual,数字比较匹配器",()=>{
    var a =10;
    expect(a).toBeGreaterThanOrEqual(9);//传入的值小于等于a，测试通过
});
test("toBeLessThanOrEqual,数字比较匹配器",()=>{
    var a =10;
    expect(a).toBeLessThanOrEqual(11);//传入的值大于等于a，测试通过
});
test("toEqual,不是严格模式，只要内容相等就可以",()=>{
    var a =0.1;
    var b = 0.2;
    expect(a+b).toBe(0.3);//这个会报错，在js中0.1+0.2=0.300000004，所以会报错
});
test("toBeCloseTo,数字比较匹配器",()=>{
    var a =0.1;
    var b = 0.2;
    expect(a+b).toBeCloseTo(0.3);//这个是精准的计算浮点数的，所以通过测试
});

/**
 * toMatch()匹配器，字符串式，查找元素中，是否有这个元素，有的话就通过
 * toContain()匹配器，数组形式，查找元素中是否有这个元素，有的话就通过
 * toThrow()匹配器，检测一个方法中，会不会抛出异常
 * not匹配器，取反或者是非的意思
 */
test("toMatch,字符串搜索匹配器", () =>{
    var str = '圆圆，飘飘， 香香';
    expect(str).toMatch('圆圆');//查找str中是否有圆圆这个元素，有的话，通过测试
});
test("toContain 数组形式的元素查找",()=>{
    var arr = ["圆圆","香香","飘飘"];
    expect(arr).toContain("圆圆");
});
test("toThrow,检测抛出异常的匹配器",()=>{
    // expect(baojian3).toThrow("this is a new error");错误的写法，会报错
    expect(baojian3).toThrow();//如果括号里面不管写啥，都会报错，不写的话，就会通过测试
});
test("not,取反",()=>{
    //这个意思就是检测不到异常就会通过，检测到了就不通过
    // expect(baojian3).not.toThrow();

    // 这个意思是查找不到谢大脚就会通过测试，not是取反的意思，tomatch是查找到就通过
    var str = '圆圆，飘飘， 香香';
    expect(str).not.toMatch('谢大脚');
});

test("toBe,检测babel转换es6",()=>{
    expect(add(200)).toBe('日乐购');
});

/**
 * ===========================================================
 * 测试异步回调函数的方法
 * 
 */
test("fetchData，测试异步回调函数",(done)=>{
    fetchData((data)=>{
        expect(data).toEqual({//这里的内容要跟接口返回的内容一致，否则会报错的
            title:"我是后台的数据",
            status:200,
            success:true
        });
        done();//保证我们此时的函数回调是已经完成的
    });
});

//promise形式的请求异步
test("promise形式的请求异步接口进行测试",()=>{
    return promise_get().then(res=>{//这里必须使用return，否则会报错的
        expect(res.data).toEqual({
            title:"我是后台的数据",
            status:200,
            success:true
        });
    });
});

//接口404不存在的测试
test("接口不存在404的测试",()=>{
    expect.assertions(1) ; // 断言，必须执行一次expect
    return promise_404().catch(res=>{
        //当没有这个接口的时候，计算机就会走catch这个接口，然后在返回的参数中使用字符串的方法，
        //查找到404，那么就是对的，所以toBe(true),通过测试，证明此时的接口是不存在的。404
        expect(res.toString().indexOf('404')> -1).toBe(true);
    });
});

//异步请求接口使用async....await..
test('异步请求接口使用async..await..',async()=>{
    await expect(promise_get()).resolves.toMatchObject({
        data:{
            title:"我是后台的数据",
            status:200,
            success:true
        }
    });
});
//简写async...await..
test('简写async...await..',async()=>{
    var res = await promise_get();//是不是跟我们使用async请求数据的写法是一样的，是不是很好用
    expect(res.data).toEqual({
        title:"我是后台的数据",
        status:200,
        success:true
    });
});

//class多个方法的测试
const anmod = new anmodian();//声明的class要使用变量通过new去实例化的接受
test('class多个方法的测试，圆圆',()=>{
    anmod.jishi(1);
    anmod.anmo();
    expect(anmod.fuwu).toEqual('圆圆走进房间为你_按摩');
});
test('class多个方法的测试，香香',()=>{
    anmod.jishi(2);
    anmod.anjiao();
    expect(anmod.fuwu).toEqual('香香走进房间为你_足疗');
});

/**
 * 四个钩子函数，跟vue中的生命周期差不多
 * beforeAll(),在所有的测试用例之前进行执行
 * afterAll(),在所有的测试用例之后进行执行
 * beforeEach(),在每个测试用例之前都会执行一次钩子函数
 * afterEach(),在每次测试完成之后，执行一次钩子函数
 */
// beforeAll(()=>{//在最开始之前只执行一次
//     console.log('我想圆圆了！');
// });
// afterAll(()=>{//在最后只执行一次
//     console.log('我儿媳不是香香了！');
// });
// beforeEach(()=>{//只要进行测试，就会执行一次
//     console.log('不知道圆圆现在有没有想我！');
// });
// afterEach(()=>{//只要进行测试，就会执行一次
//     console.log('香香跟李大狗分手了！');
// });

//describe分组测试
describe('圆圆相关的服务', ()=>{
    beforeAll(()=>{//在最开始之前只执行一次
        console.log('我想圆圆了！');
    });
    test('测试圆圆按摩', ()=>{
        anmod.jishi(1);
        anmod.anmo();
        expect(anmod.fuwu).toEqual('圆圆走进房间为你_按摩');
    });
    test('测试圆圆按摩', ()=>{
        anmod.jishi(1);
        anmod.spa();
        expect(anmod.fuwu).toEqual('圆圆走进房间为你_spa');
    });
    afterAll(()=>{//在最后只执行一次
        console.log('圆圆报错了！');
    });
});
describe('香香相关的服务', ()=>{
    test('测试香香足疗', ()=>{
        anmod.jishi(2);
        anmod.anjiao();
        expect(anmod.fuwu).toEqual('香香走进房间为你_足疗');
    });
    test('测试香香泰式按摩', ()=>{
        anmod.jishi(2);
        anmod.taishi();
        expect(anmod.fuwu).toEqual('香香走进房间为你_泰式按摩');
    });
});
/**
 * describe这个方法会在cmd中报错，说是这个方法的第二个参数是字符串，但是查看文档的话，也是折磨写的
 * 执行的顺序是，先执行外部的，然后在执行describe，在执行describe中的describe下的测试
 */