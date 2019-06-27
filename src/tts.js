import React from "react";
import Speech from "speak-tts";

export class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.speak = this.speak.bind(this);
    }
    componentDidMount() {
        setTimeout(speak(), 1000);
    }

    speak() {
        function _init() {
            const speech = new Speech();
            speech
                .init({
                    volume: 0.5,
                    lang: "en-GB",
                    rate: 1,
                    pitch: 1,
                    //'voice':'Google UK English Male',
                    //'splitSentences': false,
                    listeners: {
                        onvoiceschanged: voices => {
                            console.log("Voices changed", voices);
                        }
                    }
                })
                .then(data => {
                    console.log("Speech is ready", data);
                    _addVoicesList(data.voices);
                    _prepareSpeakButton(speech);
                })
                .catch(e => {
                    console.error("An error occured while initializing : ", e);
                });
            const text = speech.hasBrowserSupport()
                ? "Hurray, your browser supports speech synthesis"
                : "Your browser does NOT support speech synthesis. Try using Chrome of Safari instead !";
            document.getElementById("support").innerHTML = text;
        }
        function _prepareSpeakButton(speech) {
            const speakButton = document.getElementById("play");
            const pauseButton = document.getElementById("pause");
            const resumeButton = document.getElementById("resume");
            speakButton.addEventListener("click", () => {
                console.log("click");
                //    const voice =
                //        languages.options[languages.selectedIndex].dataset.name;
                //                if (language) speech.setLanguage(languages.value);
                if (voice) speech.setVoice(voice);
                speech
                    .speak({
                        text: this.props.txt,
                        queue: false,
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
                    .then(data => {
                        console.log("Success !", data);
                    })
                    .catch(e => {
                        console.error("An error occurred :", e);
                    });
            });
            playButton.addEventListener("click", () => {
                speech.play();
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
        this.speak();

        return (
            <div className="tts-player">
                <div className="tts">
                    <div>
                        <button id="play">Play</button>
                        <button id="pause"> Pause </button>
                        <button id="resume"> Resume </button>
                    </div>
                </div>
            </div>
        );
    }
}
