import pg from 'pg'
import fs from 'fs'
import path from 'path'

// 从 env.txt 文件读取配置
const envPath = path.join(process.cwd(), 'env.txt')
const envContent = fs.readFileSync(envPath, 'utf8')
const envLines = envContent.split('\n').filter(line => line.trim())

const envVars = {}
envLines.forEach(line => {
    const [key, value] = line.split('=')
    if (key && value) {
        envVars[key.trim()] = value.trim()
    }
})

const config = {
    user: envVars.PGUSER,
    password: envVars.PGPASSWORD,
    host: envVars.PGHOST,
    port: parseInt(envVars.PGPORT),
    database: envVars.PGDATABASE,
    ssl: {
        rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)

// 测试数据库连接
export const testConnection = async () => {
    try {
        const client = await pool.connect()
        console.log('数据库连接成功!')
        client.release()
        return true
    } catch (err) {
        console.error('数据库连接失败:', err.message)
        return false
    }
}
