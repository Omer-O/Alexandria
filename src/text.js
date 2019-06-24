import React from "react";
import { connect } from "react-redux";
import { getText } from "./actions";
import { Link } from "react-router-dom";

class Text extends React.Component {
    componentDidMount() {
        console.log("componentDidMount!!!!!!");
        this.props.dispatch(getText());
    } //componentDidMount close.
    render() {
        if (!this.props.txt) {
            return <h1>LOADING</h1>;
        }
        return (
            <div className="txt-page-wraper">
                <div className="txt-page-container">
                    {this.props.txt.length &&
                        this.props.txt.map(docs => (
                            <div className="txt" key={txt.id}>
                                <Link to={`/user/${txt.id}`}>
                                    <div className="txt" />
                                    <p className="txt-search-name">
                                        {txt.title} {txt.txt}
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
    if (state.txt) {
        var friends = [];
        state.txt.forEach(item => {
            if (item.accepted == true) {
                friends.push(item);
            }
        });
    }
    return {
        txt: friends
    };
};
export default connect(mapStateToProps)(Text);
