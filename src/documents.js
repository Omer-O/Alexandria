import React from "react";
import { connect } from "react-redux";
import { getDocs } from "./actions";
import { Link } from "react-router-dom";

class Documents extends React.Component {
    componentDidMount() {
        console.log("componentDidMount!!!!!!");
        this.props.dispatch(getDocs());
    } //componentDidMount close.
    render() {
        if (!this.props.myDocs) {
            return <h1>LOADING</h1>;
        }
        return (
            <div className="document-page-wraper">
                <div className="document-page-container">
                    {this.props.myDocs.length &&
                        this.props.myDocs.map(docs => (
                            <div className="documents" key={docs.id}>
                                <Link to={`/user/${docs.id}`}>
                                    <img
                                        className="documents-img"
                                        src={docs.url || "/img/profilepic.jpg"}
                                        alt={`${docs.title}`}
                                    />
                                    <p className="documents-search-name">
                                        {docs.title}
                                    </p>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
} //render close.
const mapStateToProps = state => {
    if (state.myDocs) {
        var docs = [];
        state.myDocs.forEach(item => {
            if (item.accepted == true) {
                friends.push(item);
            }
        });
    }
    return {
        myDocs: docs
    };
};
export default connect(mapStateToProps)(Documents);
