import React from 'react';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import './category-selector.scss';

const _mm = new MUtil();
const _product = new Product();

class CategorySelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0
        }
    }
    componentDidMount(){
        this.loadFirstCategory();
    }
    // 详情页数据回填
    componentWillReceiveProps(nextProps){
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
            if(!categoryIdChange && !parentCategoryIdChange){
                // 数据没有发生变化
                return;
            }
            // 如果只有一级品类
            if(nextProps.parentCategoryId === 0){
                this.setState({
                    firstCategoryId: nextProps.categoryId,
                    secondCategoryId: 0
                });
            }
            // 如果有两级品类
            else{
                this.setState({
                    firstCategoryId: nextProps.parentCategoryId,
                    secondCategoryId: nextProps.categoryId
                }, () => {
                    parentCategoryIdChange && this.loadSecondCategory();
                });
            }
    }
    // 加载一级分类
    loadFirstCategory(){
        _product.getCategoryList().then(res => {
            this.setState({
                firstCategoryList: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    // 一级品类的变化
    onFirstCategoryChange(e){
        if(this.props.readOnly){
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId: newValue,
            secondCategoryId: 0,
            secondCategoryList: []
        }, () => {
            // 根据一级分类更新二级分类
            this.loadSecondCategory();
            // 暴露出已选择的一级分类
            this.onPropsCategoryChange();
        });
    }
    // 传给父组件选中的结果
    onPropsCategoryChange(){
        // 判断props里的回调函数存在
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        // 如果选择了二级品类
        if(this.state.secondCategoryId){
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
        }else{
            // 如果先选择了一级分类
            this.props.onCategoryChange(this.state.firstCategoryId, 0); 
        }
    }
    // 加载二级品类
    loadSecondCategory(){
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    // 二级品类的变化
    onSecondCategoryChange(e){
        if(this.props.readOnly){
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId: newValue
        }, () => {
            // 根据所选择的二级品类，更新一级品类
            this.onPropsCategoryChange();
        });
    }
    render(){
        return(
            <div className="col-md-10">
                <select className="form-control cate-select"
                    value={this.state.firstCategoryId}
                    onChange={(e) => this.onFirstCategoryChange(e)}
                    readOnly={this.props.readOnly}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map((category, index) => 
                            <option value={category.id} key={index}>{category.name}</option>
                        )
                    }
                </select>
                {/*一级品类没选的时候不显示二级品类 */}
                {this.state.secondCategoryList.length > 0 ? 
                    (<select name="" className="form-control cate-select"
                    value={this.state.secondCategoryId}
                        onChange={(e) => this.onSecondCategoryChange(e)}
                        readOnly={this.props.readOnly}>
                        <option value="">请选择二级分类</option>
                        {
                            this.state.secondCategoryList.map((category, index) => 
                                <option value={category.id} key={index}>{category.name}</option>
                            )
                        }
                    </select>) : null
                }
            </div>
        )
    }
}

export default CategorySelector;