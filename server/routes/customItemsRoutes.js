import express from 'express'
import {
    getAllCustomItems,
    getCustomItemById,
    createCustomItem,
    updateCustomItem,
    deleteCustomItem
} from '../controllers/customItemsController.js'

const router = express.Router()

// 获取所有自定义物品
router.get('/', getAllCustomItems)

// 根据ID获取单个自定义物品
router.get('/:id', getCustomItemById)

// 创建新的自定义物品
router.post('/', createCustomItem)

// 更新自定义物品
router.put('/:id', updateCustomItem)

// 删除自定义物品
router.delete('/:id', deleteCustomItem)

export default router
