// Combination Validator - checks feature compatibility

// Incompatibility rules configuration
export const INCOMPATIBILITY_RULES = [
    {
        check: (features) => features.engine === '4-Cylinder' && features.wheels === 'Premium',
        message: '4-Cylinder engine is not compatible with Premium wheels',
        conflicts: { engine: '4-Cylinder', wheels: 'Premium' }
    },
    {
        check: (features) => features.interior === 'Cloth' && features.wheels === 'Premium',
        message: 'Cloth interior is not compatible with Premium wheels',
        conflicts: { interior: 'Cloth', wheels: 'Premium' }
    }
]

// 验证特性组合
export const validateFeatureCombination = (features) => {
    const errors = []
    
    for (const rule of INCOMPATIBILITY_RULES) {
        if (rule.check(features)) {
            errors.push(rule.message)
        }
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    }
}

// 检查特定选项是否与当前配置冲突
export const isOptionDisabled = (featureType, option, currentFeatures) => {
    // 创建临时特性配置来测试
    const testFeatures = { ...currentFeatures, [featureType]: option }
    
    // 检查是否有冲突
    for (const rule of INCOMPATIBILITY_RULES) {
        if (rule.check(testFeatures)) {
            // 检查这个规则是否涉及当前选项
            if (rule.conflicts[featureType] === option) {
                return true
            }
        }
    }
    
    return false
}

// 获取选项的冲突信息
export const getOptionConflictInfo = (featureType, option, currentFeatures) => {
    const testFeatures = { ...currentFeatures, [featureType]: option }
    
    for (const rule of INCOMPATIBILITY_RULES) {
        if (rule.check(testFeatures)) {
            if (rule.conflicts[featureType] === option) {
                return {
                    hasConflict: true,
                    message: rule.message,
                    conflicts: rule.conflicts
                }
            }
        }
    }
    
    return {
        hasConflict: false,
        message: null,
        conflicts: null
    }
}

