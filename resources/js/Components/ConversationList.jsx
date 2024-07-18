// resources/js/Components/ConversationList.jsx
import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

const ConversationList = ({ conversations, setSelectedConversation }) => {
  return (
    <div className="overflow-y-auto h-full">
      {conversations.length === 0 ? (
        <div className="text-center p-6 bg-white rounded shadow-md">
          <p className="text-gray-600">No conversations yet.</p>
        </div>
      ) : (
        conversations.map(convo => (
          <div
            key={convo.id}
            onClick={() => setSelectedConversation(convo)}
            className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
          >
            <img src={convo.provider?.profile_pic || convo.seeker?.profile_pic || 'default-avatar.png'} alt="Avatar" className="h-10 w-10 rounded-full mr-4" />
            <div>
              <h3 className="font-bold">{convo.provider?.name || convo.seeker?.name}</h3>
              <p className="text-gray-600">{convo.latest_message}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ConversationList;
