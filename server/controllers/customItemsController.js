import { pool } from '../config/database.js'

// 获取所有自定义物品
export const getAllCustomItems = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM custom_items ORDER BY created_at DESC')
        res.json(result.rows)
    } catch (err) {
        console.error('获取自定义物品失败:', err)
        res.status(500).json({ error: '获取自定义物品失败' })
    }
}

// 根据ID获取单个自定义物品
export const getCustomItemById = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM custom_items WHERE id = $1', [id])
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: '自定义物品未找到' })
        }
        
        res.json(result.rows[0])
    } catch (err) {
        console.error('获取自定义物品失败:', err)
        res.status(500).json({ error: '获取自定义物品失败' })
    }
}

// 创建新的自定义物品
export const createCustomItem = async (req, res) => {
    try {
        const { name, base_price, features } = req.body
        
        // 验证必需字段
        if (!name || base_price === undefined || !features) {
            return res.status(400).json({ 
                error: '缺少必需字段: name, base_price, features' 
            })
        }
        
        // 计算总价格（基础价格 + 特性价格）
        const total_price = calculateTotalPrice(base_price, features)
        
        // 验证特性组合
        const validationResult = validateFeatureCombination(features)
        if (!validationResult.valid) {
            return res.status(400).json({ 
                error: '无效的特性组合', 
                details: validationResult.errors 
            })
        }
        
        const result = await pool.query(
            'INSERT INTO custom_items (name, base_price, features, total_price) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, base_price, JSON.stringify(features), total_price]
        )
        
        res.status(201).json(result.rows[0])
    } catch (err) {
        console.error('创建自定义物品失败:', err)
        res.status(500).json({ error: '创建自定义物品失败' })
    }
}

// 更新自定义物品
export const updateCustomItem = async (req, res) => {
    try {
        const { id } = req.params
        const { name, base_price, features } = req.body
        
        // 验证必需字段
        if (!name || base_price === undefined || !features) {
            return res.status(400).json({ 
                error: '缺少必需字段: name, base_price, features' 
            })
        }
        
        // 计算总价格
        const total_price = calculateTotalPrice(base_price, features)
        
        // 验证特性组合
        const validationResult = validateFeatureCombination(features)
        if (!validationResult.valid) {
            return res.status(400).json({ 
                error: '无效的特性组合', 
                details: validationResult.errors 
            })
        }
        
        const result = await pool.query(
            'UPDATE custom_items SET name = $1, base_price = $2, features = $3, total_price = $4 WHERE id = $5 RETURNING *',
            [name, base_price, JSON.stringify(features), total_price, id]
        )
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: '自定义物品未找到' })
        }
        
        res.json(result.rows[0])
    } catch (err) {
        console.error('更新自定义物品失败:', err)
        res.status(500).json({ error: '更新自定义物品失败' })
    }
}

// 删除自定义物品
export const deleteCustomItem = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('DELETE FROM custom_items WHERE id = $1 RETURNING *', [id])
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: '自定义物品未找到' })
        }
        
        res.json({ message: '自定义物品删除成功' })
    } catch (err) {
        console.error('删除自定义物品失败:', err)
        res.status(500).json({ error: '删除自定义物品失败' })
    }
}

// 价格计算函数
function calculateTotalPrice(basePrice, features) {
    let total = basePrice
    
    // 定义特性价格增量
    const featurePrices = {
        color: {
            '红色': 0,
            '蓝色': 0,
            '黑色': 1000,
            '白色': 500,
            '银色': 800
        },
        wheels: {
            '标准轮毂': 0,
            '运动轮毂': 2000,
            '豪华轮毂': 5000
        },
        interior: {
            '布艺座椅': 0,
            '真皮座椅': 3000,
            '豪华真皮': 8000
        },
        engine: {
            '四缸引擎': 0,
            '六缸引擎': 5000,
            'V8引擎': 15000
        }
    }
    
    // 计算每个特性的价格增量
    for (const [featureType, selectedOption] of Object.entries(features)) {
        if (featurePrices[featureType] && featurePrices[featureType][selectedOption]) {
            total += featurePrices[featureType][selectedOption]
        }
    }
    
    return total
}

// 特性组合验证函数
function validateFeatureCombination(features) {
    const errors = []
    
    // 定义不兼容的组合规则
    const incompatibleRules = [
        {
            condition: features.engine === '四缸引擎' && features.wheels === '豪华轮毂',
            message: '四缸引擎与豪华轮毂不兼容'
        },
        {
            condition: features.interior === '布艺座椅' && features.wheels === '豪华轮毂',
            message: '布艺座椅与豪华轮毂不兼容'
        }
    ]
    
    // 检查不兼容组合
    for (const rule of incompatibleRules) {
        if (rule.condition) {
            errors.push(rule.message)
        }
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    }
}
