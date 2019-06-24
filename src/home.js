import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export function Home() {
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

    return (
        <div className="docs-display">
            <input
                name="find"
                type="text"
                placeholder="search"
                onChange={e => setQuery(e.target.value)}
            />
            <div className="find-main">
                <div className="results">
                    {docs.length ? (
                        docs.map(doc => (
                            <div key={doc.id}>
                                <div className="search-result">
                                    <div className="">
                                        <Link to={`/doc/${doc.id}`}>
                                            <div>
                                                <h3>{doc.title}</h3>
                                                <p>{doc.txt}</p>
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
        </div>
    );
}
