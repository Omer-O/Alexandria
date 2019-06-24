import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export function FindDocs() {
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
        <div className="all-docs">
            <input
                name="find"
                type="text"
                placeholder="search"
                onChange={e => setQuery(e.target.value)}
            />
            <div className="find-main">
                <div className="filter">
                    <h2> Filter results</h2>
                </div>

                <div className="results">
                    {docs.length ? (
                        docs.map(doc => (
                            <div key={doc.id}>
                                <div className="search-result">
                                    <div className="">
                                        <Link to={`/doc/${doc.id}`}>
                                            <img
                                                src={
                                                    doc.txt ||
                                                    "/img/default.png"
                                                }
                                                alt={`${doc.title} ${doc.last}`}
                                            />
                                        </Link>
                                    </div>
                                    <div className="info">
                                        <Link to={`/doc/${doc.id}`}>
                                            <h3>
                                                {doc.title} {doc.last}
                                            </h3>
                                        </Link>

                                        <div className="card-bio">
                                            <p>{doc.bio}</p>
                                        </div>
                                    </div>
                                    <div className="friend-btn-container">
                                        <FriendshipButton receiverId={doc.id} />
                                        <button className="friend-btn small-message-btn">
                                            ...
                                        </button>
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
                            <p>
                                Looking for people or posts? Try entering a
                                name, location or different words.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
