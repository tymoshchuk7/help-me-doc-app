import {
  ReactElement, useEffect, useState,
  useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import { Form, FormProps, Button, Typography } from 'antd';
import { useSocketIO } from '../../contexts';
import { encryptionClient } from '../../helpers';
import { messageValidator } from '../../validators';
import { ITenantMessage, ITenantChat, IChatPartner } from '../../types';
import { TextArea } from '../../components';
import Message from './Message';

const { Title } = Typography;

interface Props {
  chat: ITenantChat & IChatPartner,
  messages: ITenantMessage[],
}

// TODO implement optimistic UI, update processing of incoming messages and layout

const getLastMessageId = (messages: ITenantMessage[]) => messages[messages.length - 1]?.id || null;

const Chat = ({ messages: _messages, chat }: Props): ReactElement => {
  const [form] = Form.useForm<{ content: string }>();
  const messageContainerBottomRef = useRef<HTMLDivElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams<{ id: string }>();
  const { socketIO, sendChatMessage } = useSocketIO();
  const [messages, setMessages] = useState<Props['messages']>(_messages);
  const [lastMessageId, setLastMessageId] = useState<string | null>(getLastMessageId(messages));

  const scrollToBottom = () => messageContainerBottomRef?.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    socketIO?.on('RECEIVE_MESSAGE', (data) => {
      setMessages((prev) => {
        const result = [...prev];
        result.push(JSON.parse(data) as ITenantMessage);
        return result;
      });
    });
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const newMessageId = getLastMessageId(messages);
    if (newMessageId !== lastMessageId) {
      setLastMessageId(newMessageId);
      const scrollHeight = messageContainerRef?.current?.scrollHeight || 0;
      const scrollTop = messageContainerRef?.current?.scrollTop || 0;
      const clientHeight = messageContainerRef?.current?.clientHeight || 0;
      const scrollBottom = scrollHeight - (scrollTop + clientHeight);
      if (scrollBottom < clientHeight) {
        scrollToBottom();
      }
    }
    // eslint-disable-next-line
  }, [messages]);

  const onSubmit: FormProps<{ content: string }>['onFinish'] = (values) => {
    const { content } = values;
    sendChatMessage(id!, encryptionClient.encryptMessage(content));
    form.setFieldValue('content', '');
    scrollToBottom();
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
          <div style={{ height: 'calc(100vh - 340px)', overflow: 'auto' }} ref={messageContainerRef}>
            {messages.map((message: ITenantMessage) => (
              <Message key={message.id} chat={chat} message={message} />
            ))}
            <div ref={messageContainerBottomRef} />
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
