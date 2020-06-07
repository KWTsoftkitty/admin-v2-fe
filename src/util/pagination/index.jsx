import React from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

// 通用分页组件
class Pagination extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    {/*结构函数  将传给组件的参数进行类似拆包操作*/}
                    <RcPagination {...this.props}
                        hideOnSinglePage
                        showQuickJumper/>
                </div>
            </div>
        );
    }
}

export default Pagination;