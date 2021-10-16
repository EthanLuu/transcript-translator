import pymysql


class DBManager:
    def __init__(self, host, user, password, database):
        self.connection = pymysql.connect(host=host, user=user,
                                          password=password, database=database)
        pass
    
    def isRepeated(self, chinese_name):
        cursor = self.connection.cursor()
        sql = 'select * from course_names where chinese_name = "%s"' % (chinese_name)
        try:
            cursor.execute(sql)
        except:
            print("DB select error, raw sql: " + sql)
        res = cursor.fetchone()
        
        return res and len(res) != 0

    def insert_course(self, chinese_name, english_name):
        if self.isRepeated(chinese_name):
            return
        cursor = self.connection.cursor()
        sql = 'insert into course_names (chinese_name, english_name) values ( "%s",  "%s")' % (chinese_name, english_name)
        try:
            cursor.execute(sql)
        except:
            print("DB insert error, raw sql: " + sql)
        self.connection.commit()

    def clear_courses(self):
        cursor = self.connection.cursor()
        sql = 'delete from course_names'
        try:
            cursor.execute(sql)
        except:
            print("DB delete error, raw sql: " + sql)
        self.connection.commit()

def main():
    db_manager = DBManager("localhost", "course-info",
                           "ahpR27jL3BTmf2GL", "course-info")
    # db_manager.insert_course("1", "2")
    db_manager.clear_courses()
    db_manager.insert_course("1", "2")
    pass


if __name__ == "__main__":
    main()
