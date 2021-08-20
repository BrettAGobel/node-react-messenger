import React, {useState, useEffect} from "react";
import axios from "axios";

const Messages = ({data}) => {


    if (data) {
        let messages = data.map(obj => {
            return obj.messageText
        })

        return (

            <div className='received-messages'>

                {messages.map(message => {

                        return (
                            <p>{message}</p>

                        )



                })}
            </div>
        )

    }
    return null
}

export default Messages