class MUtil{
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type        : param.type || 'get',
                url         : param.url || '',
                dataType    : param.dataType || 'json',
                data        : param.data || null,
                success     : res => {
                    // console.log(res)
                    if( 0 === res.status){
                        // 成功
                        // resolve是'function'时才执行
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    }
                    else if(10 === res.status){
                        // 未登录状态
                        this.doLogin();
                    }
                    else{
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error       : err => {
                    // console.log(err)
                    // 失败
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
    }

    // 跳转到登录页
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }

    //获取URL参数
    getUrlParam(name){
        // 正则获取url参数
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
        // result: ['param=123', '', '123', '&']
        return result ? decodeURIComponent(result[2]) : null;
    }

    //错误提示
    errorTips(errMsg){
        //alert(errMsg || '好像哪里不对了');
    }

    // 存储用户信息到本地localStorage中
    setStorage(name, data){
        let dataType = typeof data;
        if(dataType === 'object'){
            // json对象
            window.localStorage.setItem(name, JSON.stringify(data));
        }
        else if(['number', 'string', 'boolean'].indexOf(dataType) >= 0){
            // 基础类型
            window.localStorage.setItem(name, data);
        }
        else{
            // 不支持的类型
            alert('该类型不能用于本地存储');
        }
    }

    // 获取本地localStorage的用户信息
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    }

    // 删除本地localStorage中的用户信息
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default MUtil;