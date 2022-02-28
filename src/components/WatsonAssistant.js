import React, { useEffect, useState } from 'react';
import { withWebChat } from '@ibm-watson/assistant-web-chat-react';

const MyFirstAssistant = ({ eventHandler, createWebChatInstance }) => {

  const [instance, setInstance] = useState(null);  // Not used here, but set if you wanted to access Assistant instance methods

  useEffect(() => {
    function onWebChatLoad(waInstance) {
      setInstance(waInstance)
      waInstance.on({type: 'receive', handler: (obj) => eventHandler(obj)})
      waInstance.render();
    }

    // A web chat configuration options object as documented at https://web-chat.global.assistant.watson.cloud.ibm.com/docs.html?to=api-configuration#configurationobject
    const webChatOptions = {
      integrationID: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx',
      region: 'xx-xxxxx',
      serviceInstanceID: 'xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx',
      onLoad: onWebChatLoad
    };

    createWebChatInstance(webChatOptions);
  }, []);

  return <div></div>;
};

// Wrap the component with the method returned by `withWebChat`.
export default withWebChat()(MyFirstAssistant);