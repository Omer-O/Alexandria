import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export function Home(props) {
    const [query, setQuery] = useState("last10");
    const [docs, setdoc] = useState([]);

    useEffect(
        () => {
            console.log(`${docs.length} have been rendered!`);
            let abort;
            axios
                .post("/find-docs", { find: query })
                .then(results => {
                    if (!abort) {
                        setdoc(results.data.docs);
                        return () => {
                            abort = true;
                        };
                    }
                })
                .catch(err => {
                    console.log("find-docs error: ", err);
                });
        },
        [query]
    );
    // let image = `url("${coverImgurl}")`;
    // let backgroundImg = {
    // 	backgroundImage: `url("${coverImgurl}")`,
    // 	backgroundSize: "cover",
    // 	//            backgroundRepeat: "no-repeat",
    // 	height: "300px",
    // 	width: "100%",
    // 	borderBottom: "solid #d4dce9 1px",
    // 	borderLeft: "solid #d4dce9 1px",
    // 	borderRight: "solid #d4dce9 1px",
    // 	color: "white"
    // };
    console.log("searchVisible:", props.searchVisible);

    return (
        <div className="docs-display">
            {props.searchVisible && (
                <input
                    name="find"
                    type="text"
                    placeholder="search"
                    onChange={e => setQuery(e.target.value)}
                />
            )}
            <div className="results">
                {docs.length ? (
                    docs.map(doc => (
                        <div key={doc.id}>
                            <div className="search-result">
                                <div className="">
                                    <Link to={`/doc/${doc.id}`}>
                                        <div>
                                            <img src={doc.img_url} />
                                            <div className="info">
                                                <p> {doc.title} </p>
                                                <p>
                                                    {new Date(
                                                        doc.created_at
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <span>
                            <p>We couldn't find anything for</p>
                            <h4>{query}</h4>
                        </span>
                        <p>Try entering something different.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
