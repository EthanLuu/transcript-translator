import { Button, message, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { CourseName, fetchAllCourseNames } from '@/models/useCourseNames';
import { copyAllToClipBoard, copyToClipBoard } from '@/utils/copy';
import useRequest from '@ahooksjs/use-request';
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

export const CourseTable = ({
  searchKey,
  searchKeys,
  showButtons,
}: {
  searchKey?: string;
  searchKeys?: string[];
  showButtons?: boolean;
}) => {
  const { data = [], loading } = useRequest(fetchAllCourseNames);
  const [courseNames, setCourseNames] = useState<CourseName[]>(data);
  const [selectedRows, setSelectedRows] = useState<CourseName[]>([]);

  useEffect(() => {
    if (!searchKey && !searchKeys?.length) {
      setCourseNames(data);
      return;
    }
    let courses: CourseName[] = [];
    if (searchKey) {
      courses = data.filter((item) => {
        return item.chinese_name.includes(searchKey);
      });
    }
    if (searchKeys) {
      courses = data.filter((item) => {
        for (let i = 0; i < searchKeys.length; i++) {
          if (item.chinese_name.includes(searchKeys[i])) {
            return true;
          }
        }
        return false;
      });
    }
    if (courses.length === 1) {
      copyToClipBoard(courses[0].english_name);
      message.success('已自动复制唯一结果课程英文名');
    }
    setCourseNames(courses);
  }, [searchKey, searchKeys, loading]);

  const handleClick = (record: CourseName) => {
    copyToClipBoard(record.english_name, '课程英文名复制成功');
  };

  const copySelect = () => {
    const names = selectedRows.reduce(
      (pre, cur) => [...pre, cur.english_name],
      [] as string[],
    );
    copyAllToClipBoard(names, "已复制选中课程英文名");
  };

  const copyAll = () => {
    const names = courseNames.reduce(
      (pre, cur) => [...pre, cur.english_name],
      [] as string[],
    );
    copyAllToClipBoard(names, "已复制全部课程英文名");
  };

  return (
    <div className={styles.tableWrapper}>
      {showButtons ? (
        <div className={styles.buttonGroup}>
          <Button type="primary" onClick={copySelect}>
            复制选中
          </Button>
          <Button onClick={copyAll}>复制全部</Button>
        </div>
      ) : null}
      <Table
        pagination={{ pageSize: 8, position: ['bottomCenter'] }}
        loading={loading}
        dataSource={courseNames}
        columns={columns}
        rowKey={(course) => course.id}
        rowSelection={{ onChange: (_, rows) => setSelectedRows(rows) }}
        onRow={(record) => {
          return {
            onClick: () => handleClick(record),
          };
        }}
      />
    </div>
  );
};
