// 写代码的文件
function baojian1(money){
    return money >= 200? '至宗享受':'基本按摩';
}
function baojian2(money){
    return money >= 2000? '双人服务':'单人服务';
}

//这是一个抛出错误的函数
function baojian3(){
    throw new error("this is a new error");
}

module.exports = {
    baojian1, baojian2, baojian3
}

