import {
  ReactElement, useEffect, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { Form, FormProps, Button, Typography } from 'antd';
import { useSocketIO } from '../../contexts';
import { encryptionClient } from '../../helpers';
import { messageValidator } from '../../validators';
import { ITenantMessage, ITenantChat, IChatPartner } from '../../types';
import { TextArea } from '../../components';

const { Title } = Typography;

interface Props {
  chat: ITenantChat & IChatPartner,
  messages: ITenantMessage[],
}

// TODO implement optimistic UI, update processing of incoming messages and layout

const Chat = ({ messages: _messages, chat }: Props): ReactElement => {
  const [form] = Form.useForm<{ content: string }>();
  const { id } = useParams<{ id: string }>();
  const { socketIO, sendChatMessage } = useSocketIO();
  const [messages, setMessages] = useState<Props['messages']>(_messages);

  useEffect(() => {
    socketIO?.on('RECEIVE_MESSAGE', (data) => {
      setMessages((prev) => {
        const result = [...prev];
        result.push(JSON.parse(data) as ITenantMessage);
        return result;
      });
    });
  }, []);

  const onSubmit: FormProps<{ content: string }>['onFinish'] = (values) => {
    const { content } = values;
    sendChatMessage(id!, encryptionClient.encryptMessage(content));
    form.setFieldValue('content', '');
  };

  return (
    <div>
      <Title level={4}>
        Chat with&nbsp;
        {chat.chat_partner_first_name}
        &nbsp;
        {chat.chat_partner_last_name}
      </Title>
      <div className="flex justify-center">
        <div style={{ maxWidth: '40rem', flexGrow: 1 }}>
          <div style={{ height: 'calc(100vh - 340px)', overflow: 'auto' }}>
            {messages.map((message: ITenantMessage) => (
              <div key={message.id} className={`flex ${chat.me_chat_member_id === message.chat_member_id ? 'justify-end' : 'justify-start'}`}>
                <div className={`chat-message ${chat?.me_chat_member_id === message.chat_member_id ? 'sent-message' : 'received-message'}`}>
                  {encryptionClient.decryptMessage(message.content)}
                </div>
              </div>
            ))}
          </div>
          <Form
            form={form}
            onFinish={onSubmit}
          >
            <TextArea name="content" rules={messageValidator.content} placeholder="Your message.." />
            <Button htmlType="submit">Send</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
