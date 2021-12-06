import { CourseTable } from '@/components/CourseTable';
import { Input, Layout, Typography } from 'antd';
import { useState } from 'react';
import styles from './index.less';

const { Header, Footer, Content } = Layout;

const SearchBox = ({ onSearch }: { onSearch: (text: string) => void }) => {
  return (
    <div className={styles.searchWrapper}>
      <Input.Search
        onSearch={onSearch}
        placeholder={'请输入需要搜索的课程的中文名称'}
        allowClear
        name="courseName"
        enterButton
      ></Input.Search>
    </div>
  );
};

export default function IndexPage() {
  const [searchKey, setSearchKey] = useState('');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className={styles.header}>
        <div className={styles.title}>课程名称辅助翻译</div>
        <SearchBox onSearch={(text: string) => setSearchKey(text)} />
      </Header>
      <Content className={styles.content}>
        <CourseTable searchKey={searchKey} />
      </Content>
      <Footer className={styles.footer}>
        <div className="copyright">
          ©2020 - 2021 By
          <Typography.Link href="https://ethanloo.cn" className={styles.link}>
            EthanLoo
          </Typography.Link>
        </div>
      </Footer>
    </Layout>
  );
}
