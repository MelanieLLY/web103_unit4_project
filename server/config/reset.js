import { pool } from './database.js'

// 创建 CustomItem 表
async function createCustomItemTable() {
    try {
        const client = await pool.connect()
        
        // 删除已存在的表（如果存在）
        await client.query('DROP TABLE IF EXISTS custom_items CASCADE')
        
        // 创建 CustomItem 表
        const createTableQuery = `
            CREATE TABLE custom_items (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                base_price NUMERIC NOT NULL DEFAULT 0,
                features JSONB NOT NULL,
                total_price NUMERIC NOT NULL,
                created_at TIMESTAMPTZ DEFAULT now()
            )
        `
        
        await client.query(createTableQuery)
        console.log('✅ CustomItem 表创建成功')
        
        client.release()
    } catch (err) {
        console.error('❌ 创建 CustomItem 表失败:', err)
        throw err
    }
}

// 添加示例数据
const seedCustomItemTable = async () => {
    try {
        const client = await pool.connect()
        
        // 示例自定义汽车数据
        const sampleItems = [
            {
                name: '闪电跑车',
                base_price: 50000,
                features: {
                    color: '红色',
                    wheels: '运动轮毂',
                    interior: '真皮座椅',
                    engine: 'V8引擎'
                },
                total_price: 65000
            },
            {
                name: '城市通勤车',
                base_price: 25000,
                features: {
                    color: '蓝色',
                    wheels: '标准轮毂',
                    interior: '布艺座椅',
                    engine: '四缸引擎'
                },
                total_price: 28000
            }
        ]
        
        for (const item of sampleItems) {
            await client.query(
                'INSERT INTO custom_items (name, base_price, features, total_price) VALUES ($1, $2, $3, $4)',
                [item.name, item.base_price, JSON.stringify(item.features), item.total_price]
            )
        }
        
        console.log('✅ 示例数据添加成功')
        client.release()
    } catch (err) {
        console.error('❌ 添加示例数据失败:', err)
        throw err
    }
}

// 主函数
const seedDatabase = async () => {
    console.log('🌱 开始数据库初始化...')
    
    try {
        await createCustomItemTable()
        await seedCustomItemTable()
        console.log('🎉 数据库初始化完成!')
    } catch (err) {
        console.error('💥 数据库初始化失败:', err)
    } finally {
        await pool.end()
    }
}

// 直接运行此文件
seedDatabase()

// 如果直接运行此文件，则执行初始化
if (import.meta.url === `file://${process.argv[1]}`) {
    seedDatabase()
}

export default seedDatabase
