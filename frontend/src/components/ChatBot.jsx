import * as React from "react"
import {useEffect, useRef} from "react"
import ChatBotButton from "./ChatBotButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleRight, faTimes} from "@fortawesome/free-solid-svg-icons";
import ConversationWindow from "./ChatHistoryList";
import useWebSocket from "react-use-websocket";
import {getConversation, getResponseJob} from "../api/ApiClient";
import io from 'socket.io-client';

const user = "1"

const socket = io(`ws://localhost:5000/chat`, {
    reconnection: true
});

const ChatBot = () => {

    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState("");
    const [conversationId, setConversationId] = React.useState(null);
    const [waitingForResponse, setWaitingForResponse] = React.useState(false);
    const chatWindowRef = useRef(null)
    const [isConnected, setIsConnected] = React.useState(socket.connected);
    const [lastMessage, setLastMessage] = React.useState(null);
    const [messages, setMessages] = React.useState(
        [
            {
                text: "Hi there, how can we help you?",
                date_created: new Date(),
                read: null,
                bot: false
            }
        ]
    );

    useEffect(() => {
        socket.on('connect', () => {
            console.log("Connected to socket");
            setIsConnected(true);
            socket.emit('conversation', {user_id: user});
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('message', (data) => {
            if (data.message) {
                setLastMessage(data.message);
            }
        });

        socket.on('conversation', (data) => {
            setConversationId(data.conversation_id);
            setMessages(data.messages);
        })

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('conversation');
            socket.off('message');
        };
    }, []);

    useEffect(() => {
        setMessages([...messages, lastMessage]);
        if (lastMessage && lastMessage.bot) {
            setWaitingForResponse(false);
        }
    }, [lastMessage])

    useEffect(() => {
        getConversation(user).then((response) => {
            setMessages(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        if (conversationId) {
            // poll for response
            const interval = setInterval(() => {
                getResponseJob(user, conversationId).then((response) => {
                    if (response.data.status === "COMPLETE") {
                        if (waitingForResponse) {
                            setLastMessage(response.data.response);
                        }
                        clearInterval(interval);
                    } else if (response.data.status === "FAILED") {
                        clearInterval(interval);
                    }
                }).catch((error) => {
                    clearInterval(interval);
                    console.log(error)
                })
            }, 3000)
        }
    }, [waitingForResponse])

    useEffect(() => {
        if (chatWindowRef && chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages, open])

    const onInputChange = (e) => {
        setInput(e.target.value);
    }

    const onMessageSend = () => {
        setWaitingForResponse(true)
        socket.emit('message', {conversation_id: conversationId, message: input, user_id: user, reply: true});
        setInput("");
    }

    // override onEnter
    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            onMessageSend();
        }
    }

    const onChatOpen = () => {
        setOpen(true);
    }

    return (
        <div>
            {open && <div className="position-fixed bottom-0 end-0 m-3">
                <div className="container">
                    <div style={{width: "35vw", height: "80vh"}} className="card">
                        <div onClick={() => setOpen(false)} className="card-header d-flex justify-content-between">
                            <div className="col-auto lead">Say hello to your custom bot</div>
                            <div className="col-auto"><FontAwesomeIcon color="grey" size="xl" icon={faTimes}/></div>
                        </div>
                        <div ref={chatWindowRef} id="chat-window" className="card-body overflow-scroll">
                            <ConversationWindow responseLoading={waitingForResponse} messages={messages}/>
                        </div>
                        <div className="card-footer d-flex">
                            <input disabled={waitingForResponse} value={input} onChange={onInputChange}
                                   onKeyDown={onKeyDown}
                                   placeholder="What you need..." type="text"
                                   className="form-control rounded rounded-pill"/>
                            <div onClick={onMessageSend} className="col-auto m-3"><FontAwesomeIcon color="grey"
                                                                                                   size="xl"
                                                                                                   icon={faArrowAltCircleRight}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
            {!open && <ChatBotButton onClick={onChatOpen}/>}
        </div>

    )
}

export default ChatBot