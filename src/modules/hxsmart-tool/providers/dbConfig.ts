const DBConfig = {
    dbName: "",//本地数据库名 例如，cloud.db,格式统一为xxx.db
    dbFlag: "",//标识名称，是否创建数据库成功或已创建
    dbTable: []//数据库建表语句,['CREATE TABLE  user (id INTEGER PRIMARY KEY,msg TEXT)']
};

export{DBConfig};
