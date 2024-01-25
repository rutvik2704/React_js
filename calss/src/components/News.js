import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultPorps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-News`
    console.log(document.title);
  }
  async updateNews(pageNo) {
    // this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=4f2c102ad44c4be69ce87a2ded8d7cf0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });    
    // this.props.setProgress(30);
    let data = await fetch(url);
    // this.props.setProgress(60);
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    // this.props.setProgress(100);

  }
  // async componentDidMount() {
  //   this.updateNews()
  // }
  // handlePreviousClick = async () => {

  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // }
  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // }
  // fetchMoreData = async () => {
  //   this.setState({ page: this.state.page + 1 })
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=4f2c102ad44c4be69ce87a2ded8d7cf0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   this.setState({
  //     articles: this.state.articles.concat(parsedData.articles),
  //     totalResults: parsedData.totalResults,
  //     loading: false
  //   })
  // };

  render() {
    return (
      <>
        <h1 className='text-center my-3'>News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4><Spinner /></h4>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((ele) => {
                return <div className="col-md-3" key={ele.url}>
                  <NewsItem title={ele.title ? ele.title.slice(0, 30) : ""} description={ele.description ? ele.description.slice(0, 50) : ""} imageUrl={ele.urlToImage} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
                </div>
              })}
            </div>
          </div>
          <div className="container d-flex justify-content-between">
            <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePreviousClick}>&larr; Previous</button>
            <button type="button" className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </InfiniteScroll>
      </>

    )
  }
}
export default News