import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general',
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
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - TalkNow`
    }

    async updateNews() {
        this.props.setProgress(10);
        console.log(this.props.apiKey);
        const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(60);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })    
        const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            // totalResults: parsedData.totalResults,
        });
    };

    render() {
        return (
            <>
                <h1 className="text-center">Talk Now - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((news,index) => {
                                return <div className="col-md-4" key={news.url+index}>
                                    <NewsItem title={news.title ? news.title : ""} description={news.description ? news.description : ""} imageURL={news.urlToImage} newsURL={news.url} author={news.author} date={news.publishedAt} source={news.source.name} />
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>
            </>
        )
    }
}
