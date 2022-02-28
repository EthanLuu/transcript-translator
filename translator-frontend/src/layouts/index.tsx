import { Layout, Typography } from 'antd';
import { IRouteComponentProps, Link } from 'umi';
import styles from './index.less';

const { Header, Footer, Content } = Layout;

export default function IndexPage({ children }: IRouteComponentProps) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className={styles.header}>
        <div className={styles.title}>课程名称辅助翻译</div>
        <div className={styles.linkWrapper}>
          <Link to="/">新版</Link>
          <Link to="/single">旧版</Link>
        </div>
      </Header>
      <Content className={styles.content}>{children}</Content>
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
