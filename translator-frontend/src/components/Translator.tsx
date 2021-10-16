import { CourseName, useCourseNames } from '@/models/useCourseNames';
import { Input, Table, message, Typography } from 'antd';
import { useState } from 'react';
import styles from './Translator.less';

const { Text } = Typography;

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '课程中文名称',
    dataIndex: 'chinese',
    key: 'chinese',
    render: (text: string) => <Text copyable>{text}</Text>,
  },
  {
    title: '课程英文名称',
    dataIndex: 'english',
    key: 'english',
    render: (text: string) => <Text copyable>{text}</Text>,
  },
];

const allCoursesNames = useCourseNames();

export const Translator = () => {
  const [courseNames, setCourseNames] = useState<CourseName[]>(allCoursesNames);

  const onSearch = (key: string) => {
    if (!key) {
      setCourseNames(allCoursesNames);
      return;
    }
    const courses = allCoursesNames.filter((name) => {
      return name.chinese.includes(key);
    });
    setCourseNames(courses);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    record: CourseName,
  ) => {
    navigator.clipboard.writeText(record.english);
    message.success('课程英文名复制成功');
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <Input.Search
          onSearch={onSearch}
          placeholder={'请输入需要搜索的课程的中文名称'}
        ></Input.Search>
      </div>
      <div className={styles.tableWrapper}>
        <Table
          dataSource={courseNames}
          columns={columns}
          rowKey={(course) => course.id}
          onRow={(record) => {
            return {
              onClick: (event) => handleClick(event, record),
            };
          }}
        />
      </div>
    </div>
  );
};
