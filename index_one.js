import axios from 'axios';

// 接口请求完毕后的测试
export const fetchData = (fn) =>{
    axios.get('http://localhost:3000/home/index').then((response)=>{
        fn(response.data);
    });
}

//使用koa，进行接口promise的测试
export const promise_get = ()=>{
    return axios.get('http://localhost:3000/home/index');
}

//测试接口不存在
export const promise_404 = ()=>{
    return axios.get('http://localhost:3000/home/404');
}

export function add(money){
    return money >=100 ? '日乐购':'开森';
}

//使用class多个方法进行测试
export class anmodian{
    jishi(number){
        this.user = number==1 ? '圆圆':'香香';
    }
    anjiao(){
        this.fuwu = this.user+'走进房间为你_足疗';
    }
    anmo(){
        this.fuwu = this.user+'走进房间为你_按摩';
    }
    taishi(){
        this.fuwu = this.user+'走进房间为你_泰式按摩';
    }
    spa(){
        this.fuwu = this.user+'走进房间为你_spa';
    }
}