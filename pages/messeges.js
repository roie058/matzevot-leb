import { Fragment } from "react";

import { httpHandlr } from "../lib/httpHandler";
import Message from "../components/UI/Message";

import dynamic from "next/dynamic";

const DynamicErrorModal = dynamic(() => import("../components/UI/ErrorModal"));

const { sendRequest, error, clearError } = httpHandlr();
const ShowMesseges = (props) => {
  const loadedMessages = props.loadedMessages;

  return (
    <Fragment>
      <DynamicErrorModal error={props.error} onClear={clearError} />

      {loadedMessages &&
        loadedMessages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            messageType={message.messageType}
            fullName={message.fullName}
            graveYard={message.graveYard}
            catId={message.catId}
            phone={message.phone}
            email={message.email}
            description={message.description}
          />
        ))}
    </Fragment>
  );
};

export async function getStaticProps() {
  const data = await sendRequest(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/messages"
  );

  return {
    props: {
      loadedMessages: data.messages,
      error,
    },
    revalidate: 1,
  };
}

export default ShowMesseges;
