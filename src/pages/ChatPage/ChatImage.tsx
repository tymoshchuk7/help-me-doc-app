import { ReactElement, useState } from 'react';
import { Image } from 'antd';
import { useMiscStore } from '../../stores';
import { Resolve } from '../../components';
import { useDispatchPromise, useAsyncEffect } from '../../hooks';

const ChatImage = ({ url }: { url: string }): ReactElement => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useAsyncEffect(async () => {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    setImageUrl(objectUrl);
  }, []);

  return imageUrl ? (
    <Image
      src={imageUrl}
      width={128}
      height={128}
      style={{ objectFit: 'cover', borderRadius: 6 }}
      preview
    />
  ) : <div>...</div>;
};

const ChatImageContainer = ({ path }: { path: string }): ReactElement => {
  const { getSignUrl } = useMiscStore();
  const signedUrlPromise = useDispatchPromise(() => getSignUrl(path));

  return (
    <Resolve promises={[signedUrlPromise]}>
      {(data) => (
        <ChatImage url={data.data.url} />
      )}
    </Resolve>
  );
};

export default ChatImageContainer;
