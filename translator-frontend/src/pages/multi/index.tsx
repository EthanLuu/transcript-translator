import { Input } from 'antd';
import { useState } from 'react';
import { CourseTable } from '@/components/CourseTable';
import styles from './index.less';

const SearchBox = ({ onPressEnter }: { onPressEnter: any }) => {
  return (
    <Input.TextArea
      className={styles.searchInput}
      placeholder={
        '请输入需要搜索的课程的中文名称，如需输入多个请用回车进行分隔'
      }
      allowClear
      size="large"
      name="courseName"
      onPressEnter={onPressEnter}
      autoSize={{ minRows: 20 }}
    ></Input.TextArea>
  );
};

export default function Multi() {
  const [searchKeys, setSearchKeys] = useState<string[]>([]);

  const handleSearch: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const keyString = (event.target as any).value;
    const keys: string[] = [];
    keyString.split('\n').map((key: string) => {
      if (key) {
        keys.push(key);
      }
    });
    setSearchKeys(keys);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <SearchBox onPressEnter={handleSearch}></SearchBox>
      </div>
      <div className={styles.tableWrapper}>
        <CourseTable searchKeys={searchKeys} showButtons={true}/>
      </div>
    </div>
  );
}
