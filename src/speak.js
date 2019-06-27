import React from "react";
import Speech from "speak-tts";

export class Speak extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.speak = this.speak.bind(this);
    }

    speak(e) {
        let voice;
        const speech = new Speech();
        speech.init; // will throw an exception if not browser supported
        if (speech.hasBrowserSupport()) {
            // returns a boolean
            console.log("speech synthesis supported");
        }
        const text = this.props.txt;
        speech
            .init({
                volume: 0.5,
                lang: "en-GB",
                rate: 0.9,
                pitch: 1,
                voice: "Google UK English Female"
            })
            .then(data => {
                // The "data" object contains the list of available voices and the voice synthesis params
                console.log(
                    "Speech is ready, voices are available",
                    data.voices[5]
                );
            })
            .catch(e => {
                console.error("An error occured while initializing : ", e);
            });
        const resumeButton = document.getElementById("resume");
        const pauseButton = document.getElementById("pause");

        setTimeout(speak, 300);
        function speak() {
            speech
                .speak({
                    text: text,
                    queue: false, // current speech will be interrupted,
                    listeners: {
                        onstart: () => {
                            console.log("Start utterance");
                        },
                        onend: () => {
                            console.log("End utterance");
                        },
                        onresume: () => {
                            console.log("Resume utterance");
                        },
                        onboundary: event => {
                            console.log(
                                event.name +
                                    " boundary reached after " +
                                    event.elapsedTime +
                                    " milliseconds."
                            );
                        }
                    }
                })
                .then(() => {
                    console.log("Success !");
                })
                .catch(e => {
                    console.error("An error occurred :", e);
                });
            pauseButton.addEventListener("click", () => {
                speech.pause();
            });
            resumeButton.addEventListener("click", () => {
                speech.resume();
            });
        }
    }

    render() {
        console.log("this.props.txt", this.props.txt);

        return (
            <div className="tts-player">
                <div className="mid-section">
                    <h1> Speech synthesis </h1>

                    <div className="tts">
                        <div>
                            <span id="play" onClick={this.speak}>
                                Play
                            </span>
                            <span id="pause"> Pause </span>
                            <span id="resume"> Resume </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
