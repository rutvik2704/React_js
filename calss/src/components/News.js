import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultPorps ={
    country:'in',
    pageSize:8,
    category:'general'
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,    
  }
   capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 
  constructor(props) {
    super(props)
    console.log("hello I am a constructor form News con");
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-News`
  }
  async updateNews(pageNo){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=3920c55d60624ab2a9af59bb5db0cfb5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
    })
}
  async componentDidMount() {
    this.updateNews()
     }
  handlePreviousClick = async () => {
    
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }
  

  render() {
    return (
      <div className="container my-3 ">
        <h1 className='text-center my-3'>News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((ele) => {
            return <div className="col-md-3" key={ele.url}>
              <NewsItem title={ele.title ? ele.title.slice(0, 30) : ""} description={ele.description ? ele.description.slice(0, 50) : ""} imageUrl={ele.urlToImage} newsUrl={ele.url} author={ele.author} date={ele.publishedAt}  source={ele.source.name }  />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>

    )
  }
}

export default News
