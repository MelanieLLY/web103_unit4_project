// Price Calculator - matches backend logic

// Feature price configuration
export const FEATURE_PRICES = {
    color: {
        'Red': 0,
        'Blue': 0,
        'Black': 1000,
        'White': 500,
        'Silver': 800
    },
    wheels: {
        'Standard': 0,
        'Sport': 2000,
        'Premium': 5000
    },
    interior: {
        'Cloth': 0,
        'Leather': 3000,
        'Premium Leather': 8000
    },
    engine: {
        '4-Cylinder': 0,
        'V6': 5000,
        'V8': 15000
    }
}

// Feature options configuration
export const FEATURE_OPTIONS = {
    color: ['Red', 'Blue', 'Black', 'White', 'Silver'],
    wheels: ['Standard', 'Sport', 'Premium'],
    interior: ['Cloth', 'Leather', 'Premium Leather'],
    engine: ['4-Cylinder', 'V6', 'V8']
}

// 计算总价格
export const calculateTotalPrice = (basePrice, features) => {
    let total = Number(basePrice) || 0
    
    // 计算每个特性的价格增量
    for (const [featureType, selectedOption] of Object.entries(features)) {
        if (FEATURE_PRICES[featureType] && FEATURE_PRICES[featureType][selectedOption]) {
            total += FEATURE_PRICES[featureType][selectedOption]
        }
    }
    
    return total
}

// 获取特性的价格增量
export const getFeaturePrice = (featureType, option) => {
    if (FEATURE_PRICES[featureType] && FEATURE_PRICES[featureType][option]) {
        return FEATURE_PRICES[featureType][option]
    }
    return 0
}

