import { Input } from 'antd';
import { useState } from 'react';
import { CourseTable } from '@/components/CourseTable';
import styles from './index.less';

const SearchBox = ({ onSearch }: { onSearch: (text: string) => void }) => {
  return (
    <div className={styles.searchWrapper}>
      <Input.Search
        className={styles.searchInput}
        onSearch={onSearch}
        placeholder={'请输入需要搜索的课程的中文名称'}
        allowClear
        size="large"
        name="courseName"
        enterButton
      ></Input.Search>
    </div>
  );
};

export default function IndexPage() {
  const [searchKey, setSearchKey] = useState('');

  return (
    <>
      <SearchBox onSearch={(text: string) => setSearchKey(text)} />
      <div className={styles.tableContainer}>
        <CourseTable searchKey={searchKey} />
      </div>
    </>
  );
}
