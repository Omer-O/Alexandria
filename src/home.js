import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { Uploader } from "./uploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export function Home(props) {
    const [query, setQuery] = useState("last12");
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

    console.log("searchVisible:", props.searchVisible);

    return (
        <div className="docs-display">
            <Uploader />
            <Link to="/camera" className="cam-btn home-btn">
                <FontAwesomeIcon icon={faCamera} />
            </Link>
            {props.searchVisible && (
                <div className="search-bar">
                    <span onClick={props.hideSearchBar}>
                        <FontAwesomeIcon icon={faUndo} />
                    </span>
                    <input
                        name="find"
                        type="text"
                        placeholder="search"
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>
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
