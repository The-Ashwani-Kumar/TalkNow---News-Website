import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageURL, newsURL, author, date, source } = this.props;
        let defaultImage = "https://tse3.mm.bing.net/th?id=OIP.1Sghzzkxl33nqCTTBGr4rQHaE8&pid=Api&P=0";
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                        <span className="badge bg-danger"
                              style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '0', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}>
                              {source}
                        </span>
                    </div>
                    <img src={imageURL ? imageURL : defaultImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read more...</a>
                    </div>
                </div>
            </div>
        )
    }
}
