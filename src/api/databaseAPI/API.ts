// import { Capacitor } from '@capacitor/core';
import { SQLiteConnection, SQLiteDBConnection, capSQLiteSet ,CapacitorSQLite } from '@capacitor-community/sqlite';
import { useUserStore  } from '@/stores/userInfo';
const sqlite = new SQLiteConnection(CapacitorSQLite);
let appDatabase: SQLiteDBConnection | null = null;

async function initializeDatabase(): Promise<SQLiteDBConnection> {
  // 检查连接是否已存在
  let db: SQLiteDBConnection;
  try {
    db = await sqlite.retrieveConnection('my_app_db', false);
  } catch {
    db = await sqlite.createConnection('my_app_db', false, 'no-encryption', 1, false);
  }
  await db.open();

  // 检查是否初始化
  try {
    await db.query('SELECT 1 FROM app_metadata LIMIT 1');
    // 已初始化
  } catch {
    // 未初始化，建表
    await initializeSchema(db);
  }
  return db;
}

async function initializeSchema(db: SQLiteDBConnection) {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS app_metadata (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS user_login (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS user_upload (
      upload_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      heart_rate INTEGER,
      blood_pressure TEXT,
      oxygen_saturation INTEGER,
      upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES user_login (user_id)
    );
  `);

  // 插入初始数据
  await db.executeSet([
    { statement: 'INSERT INTO app_metadata (key, value) VALUES (?, ?)', values: ['initialized', 'true'] },
    { statement: 'INSERT INTO user_login (phone, password) VALUES (?, ?)', values: ['13800138000', 'password123'] },
    { statement: 'INSERT INTO user_login (phone, password) VALUES (?, ?)', values: ['13900139000', 'mypassword'] },
    { statement: 'INSERT INTO user_upload (user_id, heart_rate, blood_pressure, oxygen_saturation) VALUES (?, ?, ?, ?)', values: [1, 72, 120, 98] },
    { statement: 'INSERT INTO user_upload (user_id, heart_rate, blood_pressure, oxygen_saturation) VALUES (?, ?, ?, ?)', values: [2, 80, 130, 97] },
  ]);
}

async function setup() {
  if (!appDatabase) {
    appDatabase = await initializeDatabase();
  }
}

/**
 * 登录
 */
export async function login(phone: string, password: string) {
  if (!appDatabase) await setup();
  const res = await appDatabase!.query(
    'SELECT user_id, phone FROM user_login WHERE phone = ? AND password = ?',
    [phone, password]
  );
  return res.values?.[0] ?? null;
}

/**
 * 注册
 */
export async function register(phone: string, password: string) {
  if (!appDatabase) await setup();
  const exists = await appDatabase!.query(
    'SELECT user_id FROM user_login WHERE phone = ?',
    [phone]
  );
  if (exists.values && exists.values.length > 0) return null;
  await appDatabase!.run(
    'INSERT INTO user_login (phone, password) VALUES (?, ?)',
    [phone, password]
  );
  const res = await appDatabase!.query(
    'SELECT user_id, phone FROM user_login WHERE phone = ?',
    [phone]
  );
  return res.values?.[0] ?? null;
}

/**
 * 新增上传数据
 */
export async function addUserUpload(
  user_id: number,
  heart_rate: number,
  blood_pressure: number | string,
  oxygen_saturation: number,
  upload_time?: string // 可选参数，允许自定义上传时间
) {
  if (!appDatabase) await setup();
  if (upload_time) {
    await appDatabase!.run(
      'INSERT INTO user_upload (user_id, heart_rate, blood_pressure, oxygen_saturation, upload_date) VALUES (?, ?, ?, ?, ?)',
      [user_id, heart_rate, blood_pressure, oxygen_saturation, upload_time]
    );
  } else {
    const now = new Date().toISOString();
    await appDatabase!.run(
      'INSERT INTO user_upload (user_id, heart_rate, blood_pressure, oxygen_saturation, upload_date) VALUES (?, ?, ?, ?, ?)',
      [user_id, heart_rate, blood_pressure, oxygen_saturation, now]
    );
  }
}

/**
 * 查询上传数据
 */
export async function getUserUploads(user_id: number) {
  if (!appDatabase) await setup();
  const res = await appDatabase!.query(
    'SELECT * FROM user_upload WHERE user_id = ? ORDER BY upload_date DESC',
    [user_id]
  );
  return res.values ?? [];
}

/**
 * 更新上传数据
 */
export async function updateUserUpload(upload_id: number, data: { heart_rate?: number; blood_pressure?: string; oxygen_saturation?: number }) {
  if (!appDatabase) await setup();
  const fields: string[] = [];
  const values: any[] = [];
  if (data.heart_rate !== undefined) {
    fields.push('heart_rate = ?');
    values.push(data.heart_rate);
  }
  if (data.blood_pressure !== undefined) {
    fields.push('blood_pressure = ?');
    values.push(data.blood_pressure);
  }
  if (data.oxygen_saturation !== undefined) {
    fields.push('oxygen_saturation = ?');
    values.push(data.oxygen_saturation);
  }
  if (fields.length === 0) return;
  values.push(upload_id);
  await appDatabase!.run(
    `UPDATE user_upload SET ${fields.join(', ')} WHERE upload_id = ?`,
    values
  );
}

/**
 * 删除上传数据
 */
export async function deleteUserUpload(upload_id: number) {
  if (!appDatabase) await setup();
  await appDatabase!.run(
    'DELETE FROM user_upload WHERE upload_id = ?',
    [upload_id]
  );
}

/**
 * 判断用户是否登录
 */
export function alreadyLogin():boolean{
  const userStore = useUserStore();
  return !!(userStore.userLogin && userStore.userLogin.user_id);
}

/**
 * 刷新上传数据
 */
export async function reloadUserUploadToUserstore() {
  if(!alreadyLogin()){
      return null  //不做处理直接返回
  }
  const userStore = useUserStore();
  const user_id = userStore.userLogin.user_id
  const uploads = await getUserUploads(user_id);
  // 按上传时间排序（升序）
  uploads.sort((a, b) => new Date(a.upload_date as string).getTime() - new Date(b.upload_date as string).getTime());
  userStore.setUserUploads(uploads);
}

/**
 * 计算并加载风险指数
 */
/**
 * 计算并加载风险指数
 * 包含完整的风险计算逻辑
 */
export async function reloadRiskIndexToUserstore() {
  if (!alreadyLogin()) {
    return null; // 未登录不做处理
  }
  const userStore = useUserStore();
  const riskIndex = calculateRiskIndex()
  const riskLevel = determineRiskLevel(riskIndex)
  userStore.setUserAnalyse({
    riskIndex : JSON.stringify(riskIndex),
    riskLevel : riskLevel
  })
}

/**
 * 根据风险指数确定风险等级
 */
function determineRiskLevel(riskIndex: number): string {
  if (riskIndex < 20) return '极低风险';
  if (riskIndex < 40) return '低风险';
  if (riskIndex < 60) return '中风险';
  if (riskIndex < 80) return '高风险';
  return '极高风险';
}

/**
 * 计算风险趋势
 */
function calculateRiskIndex() :number{
  const userStore = useUserStore();
  //当用户数据为空时会尝试重新加载用户上传记录
  if(userStore.userUploads.length === 0){
    reloadUserUploadToUserstore()
  }
  let riskIndex = 0.0
  let uploadsLength = userStore.userUploads.length
  if(uploadsLength === 0)
    return 0
  userStore.userUploads.forEach((item)=>{
    const bloodPressureNum = typeof item.blood_pressure === 'number' ? item.blood_pressure : parseFloat(item.blood_pressure);
    riskIndex += bloodPressureNum * 0.4 + bloodPressureNum * 0.4 + item.oxygen_saturation * 0.2
  })
  return Number((riskIndex / uploadsLength).toFixed(3));
}