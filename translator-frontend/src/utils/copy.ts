import { message } from 'antd';

export const copyToClipBoard = (text: string, tip?: string) => {
  navigator.clipboard.writeText(text);
  if (tip) {
    message.success(tip);
  }
};
