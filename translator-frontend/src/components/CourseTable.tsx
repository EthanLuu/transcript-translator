import { CourseName, fetchAllCourseNames } from '@/models/useCourseNames';
import { copyToClipBoard } from '@/utils/copy';
import useRequest from '@ahooksjs/use-request';
import { Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import styles from './CourseTable.less';

const { Text } = Typography;

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '10%',
  },
  {
    title: '课程中文名称',
    dataIndex: 'chinese_name',
    width: '40%',
    render: (text: string) => <Text copyable>{text}</Text>,
  },
  {
    title: '课程英文名称',
    dataIndex: 'english_name',
    width: '50%',
    render: (text: string) => <Text copyable>{text}</Text>,
  },
];

export const CourseTable = ({ searchKey }: { searchKey: string }) => {
  const { data = [], loading } = useRequest(fetchAllCourseNames);
  const [courseNames, setCourseNames] = useState<CourseName[]>(data);

  useEffect(() => {
    if (!searchKey) {
      setCourseNames(data);
      return;
    }
    const courses = data.filter((item) => {
      return item.chinese_name.includes(searchKey);
    });
    if (courses.length === 1) {
      copyToClipBoard(courses[0].english_name);
    }
    setCourseNames(courses);
  }, [searchKey, loading]);

  const handleClick = (record: CourseName) => {
    copyToClipBoard(record.english_name, '课程英文名复制成功');
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <Table
          loading={loading}
          dataSource={courseNames}
          columns={columns}
          rowKey={(course) => course.id}
          onRow={(record) => {
            return {
              onClick: () => handleClick(record),
            };
          }}
        />
      </div>
    </div>
  );
};
