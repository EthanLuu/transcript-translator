import { Translator } from '@/components/Translator';
import { Layout, Typography } from 'antd';
import styles from './index.less';

const { Header, Footer, Content } = Layout;

export default function IndexPage() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className={styles.header}>
        <div className={styles.title}>课程名称辅助翻译</div>
      </Header>
      <Content className={styles.content}>
        <Translator />
      </Content>
      <Footer className={styles.footer}>
        ©2020 - 2021 By
        <Typography.Link href="https://ethanloo.cn" className={styles.link}>
          EthanLoo
        </Typography.Link>
      </Footer>
    </Layout>
  );
}
