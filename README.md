# jest
前端自动化测试的框架之jest
# 需要使用node
# 要先新建一个文件夹，进行初始化
```
npm init -y
```
# 安装jest
```
npm install jest 也可以进行指定版本安装
```
# 安装babel转换器
```
npm install @babel/core@7.4.5 @babel/preset-env@7.4.5 -D
```
# 在根目录下新建一个.babelrc文件
```
{
    "presets":[
        [
                "@babel/preset-env",{
                "targets":{
                    "node":"current"
                }
            }
        ]
    ]
}
```
* 在package.json文件中设置指令
```
 "scripts": {
    "test": "jest --watchAll",//自动监听的指令，开启一次，之后每次文件发生变化的时候，就会自动的进行测试
    "coverage": "jest --coverage"//这是打开测试覆盖率的指令
  },

```
* 设置jest文件
```
npx jest --init
```
* 之后打开这个文件，在里面进行设置，将下面的这段代码打开并修改
```
 coverageDirectory: "coverage",//打开测试覆盖率选项
```
* 启动测试的指令
 ```
 npm run test
 ```
