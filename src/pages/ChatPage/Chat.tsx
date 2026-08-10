import {
  ReactElement, useEffect, useState,
  useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, FormProps, Button, Typography, Space, Image, Spin } from 'antd';
import { CloseOutlined, PaperClipOutlined } from '@ant-design/icons';
import { useSocketIO } from '../../contexts';
import { encryptionClient } from '../../helpers';
import { useChatsStore } from '../../stores';
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
  const { preUploadMessageAttachment } = useChatsStore();
  const messageContainerBottomRef = useRef<HTMLDivElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { id } = useParams<{ id: string }>();
  const { socketIO, sendChatMessage } = useSocketIO();
  const [messages, setMessages] = useState<Props['messages']>(_messages);
  const [lastMessageId, setLastMessageId] = useState<string | null>(getLastMessageId(messages));
  const [uploading, setUploading] = useState(false);
  const [pendingAttchments, setPendingAttchments] = useState<any[]>([]);

  const scrollToBottom = () => messageContainerBottomRef?.current?.scrollIntoView({ behavior: 'smooth' });

  const uploadFile = async (file: File): Promise<any> => {
    const { data } = await preUploadMessageAttachment(file.name);

    if (!data?.uploadUrl) {
      throw new Error('URL is missing');
    }

    try {
      await axios.put(data.uploadUrl, file, {
        headers: { 'Content-Type': file.type },
      });
    } catch (e) {
      console.error(e);
    }

    return {
      ...(data ?? {}),
      previewUrl: URL.createObjectURL(file),
    };
  };

  const uploadFiles = async (files: File[]): Promise<any> => {
    setUploading(true);
    try {
      return Promise.all(files.map(uploadFile));
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const uploaded = await uploadFiles(files);
    setPendingAttchments((prev) => [...prev, ...uploaded]);
  };

  useEffect(() => {
    socketIO?.on('RECEIVE_MESSAGE', (data) => {
      setMessages((prev) => {
        const result = [...prev];
        result.push(JSON.parse(data) as ITenantMessage);
        return result;
      });
    });
    socketIO?.on('RECEIVE_MESSAGE_UPDATE', (data) => {
      setMessages((prev) => {
        const updatedMessage = JSON.parse(data) as ITenantMessage;
        const messageIndex = prev.findIndex((message) => message.id === updatedMessage.id);
        const result = [...prev];
        result[messageIndex] = updatedMessage;
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
    sendChatMessage(id!, encryptionClient.encryptMessage(content), pendingAttchments);
    form.setFieldValue('content', '');
    setPendingAttchments([]);
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

            {pendingAttchments.length > 0 && (
              <Space wrap style={{ padding: '4px 0' }}>
                {pendingAttchments.map((att) => (
                  <div key={att.url} style={{ position: 'relative', display: 'inline-block' }}>
                    <Image
                      src={att.previewUrl}
                      width={64}
                      height={64}
                      style={{ objectFit: 'cover', borderRadius: 6 }}
                      preview={false}
                    />
                    <Button
                      type="text"
                      size="small"
                      icon={<CloseOutlined />}
                      // onClick={() => removeAttachment(att.fileKey)}
                      style={{
                        position: 'absolute',
                        top: -6,
                        right: -6,
                        background: 'rgba(0,0,0,0.5)',
                        color: '#fff',
                        borderRadius: '50%',
                        width: 18,
                        height: 18,
                        minWidth: 'unset',
                        padding: 0,
                        fontSize: 10,
                      }}
                    />
                  </div>
                ))}
              </Space>
            )}
            <TextArea name="content" rules={messageValidator.content} placeholder="Your message.." />
            <div className="flex justify-end">
              <div className="mr-20">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <Button
                  icon={uploading ? <Spin size="small" /> : <PaperClipOutlined />}
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                />
              </div>
              <Button htmlType="submit">Send</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
