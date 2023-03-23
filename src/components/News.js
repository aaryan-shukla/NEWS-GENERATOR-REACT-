import React, { Component } from 'react'
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
export default class News extends Component { 
    static defaultProps = {
        country:'in',
        pageSize:5,
        category:'general'
    }
    static propTypes = {
        country:PropTypes.string
    }
    capitalizefirstletter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1,
            mode:'light'
        }
        document.title=`${this.capitalizefirstletter(this.props.category)}-NewsMonkey`;
    }

    async componentDidMount(){
        // it is life cycle method which runs after render. first constructor is run then render then componentDidMount
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=81ff1c2b36204179ac29e70d9f2863ac&page=1&pageSize=${this.props.pageSize}`;
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({articles:parsedData.articles,
        totalResults:parsedData.totalResults});
        // console.log("cdm run");
    }
    
    handlenextclick=async()=>{
        console.log('next');
        if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){}
        else{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=81ff1c2b36204179ac29e70d9f2863ac&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({ 
            page:this.state.page+1,
            articles:parsedData.articles})
        }
    }
    handleprevclick=async ()=>{ 
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=81ff1c2b36204179ac29e70d9f2863ac&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({ 
            page:this.state.page-1,
            articles:parsedData.articles})
            console.log('prev');
        }
   
    render() {
        // console.log('asg');
        return (
        <div className='container my-3' >
        <h2 style={{margin:'70px 0px'}}>NewsMonkey-Top HeadLines on {this.capitalizefirstletter(this.props.category)}</h2>
        <div className="row" style={{ backgroundColor: '#E3E2DF',
            border:' 2px solid blanchedalmond',borderRadius:'10px',marginBottom:'12px'}}>
            {/* we used this.state to itereate over the array */}
            {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                <NewsItems title={element.title?element.title:''} description={element.description?element.description:''} imageUrl={element.urlToImage?element.urlToImage:"https://1847884116.rsc.cdn77.org/tamil/news/leo-jawan-2032023-75a.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                </div>
            })}
        </div>
            <div className="container d-flex justify-content-between" >
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>Previous</button>
                <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next</button>
            </div>
            
      </div>
    )
  }
}
