import React from 'react';
import MUtil from 'util/mm.jsx';
import './index.scss';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/'
        }
    }

    // 使用生命周期函数改变登录跳转后页面的title
    componentWillMount(){
        document.title = '登录 - SALLY MMALL ADMIN';
    }

    // 用户输入时获取输入信息
    onInputChange(e) {
        
        let inputValue = e.target.value;
        let inputName = e.target.name;
        this.setState({
            [inputName]: inputValue
        });
        // console.log(e.target.value);
    }
    // 监听键盘事件 实现回车登录 13代表回车键
    onInputKeyup(e){
        if(e.keyCode === 13){
            this.onSubmit(e);
        }
    }

    // 登录事件
    onSubmit(e) {
        let loginInfo = {
                username: this.state.username,
                password: this.state.password
            },
            checkResult = _user.checkLoginInfo(loginInfo);
        // 登录表单验证成功
        if(checkResult.status){
            _user.login(loginInfo).then((res) => {
                // 成功 存储用户信息并跳转
                _mm.setStorage('userInfo', res);
                this.props.history.push(this.state.redirect);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
        // 验证不通过
        else{
            _mm.errorTips(checkResult.msg);
        }
    }

    render(){
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 - SALLY MMALL管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="email" 
                                name = "username"
                                className="form-control" 
                                placeholder="请输入用户名" 
                                // 监听键盘事件 实现回车登录
                                onKeyUp = {e => this.onInputKeyup(e)}
                                onChange = {e => this.onInputChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" 
                                name = "password"
                                className="form-control" 
                                placeholder="请输入密码" 
                                // 监听键盘事件 实现回车登录
                                onKeyUp = {e => this.onInputKeyup(e)}
                                onChange = {e => this.onInputChange(e)}/>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                onClick = {e => {this.onSubmit(e)}}>登录
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
