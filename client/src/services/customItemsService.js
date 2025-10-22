// API 服务：处理所有与自定义物品相关的 HTTP 请求

const API_BASE_URL = '/api/items'

// 获取所有自定义物品
export const getAllItems = async () => {
    try {
        const response = await fetch(API_BASE_URL)
        if (!response.ok) {
            throw new Error('获取物品列表失败')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching all items:', error)
        throw error
    }
}

// 根据 ID 获取单个物品
export const getItemById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`)
        if (!response.ok) {
            throw new Error('获取物品详情失败')
        }
        return await response.json()
    } catch (error) {
        console.error(`Error fetching item ${id}:`, error)
        throw error
    }
}

// 创建新物品
export const createItem = async (itemData) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || '创建物品失败')
        }
        return await response.json()
    } catch (error) {
        console.error('Error creating item:', error)
        throw error
    }
}

// 更新物品
export const updateItem = async (id, itemData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || '更新物品失败')
        }
        return await response.json()
    } catch (error) {
        console.error(`Error updating item ${id}:`, error)
        throw error
    }
}

// 删除物品
export const deleteItem = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error('删除物品失败')
        }
        return await response.json()
    } catch (error) {
        console.error(`Error deleting item ${id}:`, error)
        throw error
    }
}

