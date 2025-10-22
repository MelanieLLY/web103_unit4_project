import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createItem } from '../services/customItemsService'
import { FEATURE_OPTIONS, calculateTotalPrice, getFeaturePrice } from '../utilities/priceCalculator'
import { validateFeatureCombination, isOptionDisabled } from '../utilities/validator'
import '../App.css'

const CreateCar = () => {
    const navigate = useNavigate()
    
    // Form state
    const [name, setName] = useState('')
    const [basePrice] = useState(25000) // Base price
    const [features, setFeatures] = useState({
        color: 'Red',
        wheels: 'Standard',
        interior: 'Cloth',
        engine: '4-Cylinder'
    })
    const [totalPrice, setTotalPrice] = useState(basePrice)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    // Recalculate price and validate when features change
    useEffect(() => {
        const newTotal = calculateTotalPrice(basePrice, features)
        setTotalPrice(newTotal)
        
        // Validate combination
        const validation = validateFeatureCombination(features)
        setErrors(validation.errors)
    }, [features, basePrice])

    // Handle feature selection
    const handleFeatureChange = (featureType, value) => {
        setFeatures(prev => ({
            ...prev,
            [featureType]: value
        }))
    }

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validate name
        if (!name.trim()) {
            alert('Please enter a car name')
            return
        }
        
        // Validate combination
        const validation = validateFeatureCombination(features)
        if (!validation.valid) {
            alert('Incompatible feature combination:\n' + validation.errors.join('\n'))
            return
        }
        
        try {
            setLoading(true)
            await createItem({
                name: name.trim(),
                base_price: basePrice,
                features: features
            })
            
            alert('🎉 Custom car created successfully!')
            navigate('/customcars')
        } catch (error) {
            alert('Creation failed: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <h1>🏎️ Customize Your Dream Car</h1>
            
            <form onSubmit={handleSubmit}>
                {/* Car Name */}
                <div>
                    <label htmlFor="name">
                        Car Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Give your car a name"
                        required
                    />
                </div>

                {/* Base Price Display */}
                <div>
                    <label>Base Price</label>
                    <input
                        type="text"
                        value={`$${basePrice.toLocaleString()}`}
                        disabled
                    />
                </div>

                <hr />

                {/* Feature Selection */}
                <h3>Select Features</h3>
                
                {/* Color Selection */}
                <div>
                    <label htmlFor="color">
                        Exterior Color
                        <small> (+${getFeaturePrice('color', features.color).toLocaleString()})</small>
                    </label>
                    <select
                        id="color"
                        value={features.color}
                        onChange={(e) => handleFeatureChange('color', e.target.value)}
                    >
                        {FEATURE_OPTIONS.color.map(option => (
                            <option 
                                key={option} 
                                value={option}
                                disabled={isOptionDisabled('color', option, features)}
                            >
                                {option} (+${getFeaturePrice('color', option).toLocaleString()})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Wheels Selection */}
                <div>
                    <label htmlFor="wheels">
                        Wheels Type
                        <small> (+${getFeaturePrice('wheels', features.wheels).toLocaleString()})</small>
                    </label>
                    <select
                        id="wheels"
                        value={features.wheels}
                        onChange={(e) => handleFeatureChange('wheels', e.target.value)}
                    >
                        {FEATURE_OPTIONS.wheels.map(option => (
                            <option 
                                key={option} 
                                value={option}
                                disabled={isOptionDisabled('wheels', option, features)}
                            >
                                {option} (+${getFeaturePrice('wheels', option).toLocaleString()})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Interior Selection */}
                <div>
                    <label htmlFor="interior">
                        Interior Seats
                        <small> (+${getFeaturePrice('interior', features.interior).toLocaleString()})</small>
                    </label>
                    <select
                        id="interior"
                        value={features.interior}
                        onChange={(e) => handleFeatureChange('interior', e.target.value)}
                    >
                        {FEATURE_OPTIONS.interior.map(option => (
                            <option 
                                key={option} 
                                value={option}
                                disabled={isOptionDisabled('interior', option, features)}
                            >
                                {option} (+${getFeaturePrice('interior', option).toLocaleString()})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Engine Selection */}
                <div>
                    <label htmlFor="engine">
                        Engine Type
                        <small> (+${getFeaturePrice('engine', features.engine).toLocaleString()})</small>
                    </label>
                    <select
                        id="engine"
                        value={features.engine}
                        onChange={(e) => handleFeatureChange('engine', e.target.value)}
                    >
                        {FEATURE_OPTIONS.engine.map(option => (
                            <option 
                                key={option} 
                                value={option}
                                disabled={isOptionDisabled('engine', option, features)}
                            >
                                {option} (+${getFeaturePrice('engine', option).toLocaleString()})
                            </option>
                        ))}
                    </select>
                </div>

                <hr />

                {/* Price Preview */}
                <div style={{ 
                    background: 'var(--pico-background-color)', 
                    padding: '1rem', 
                    borderRadius: '8px',
                    marginBottom: '1rem'
                }}>
                    <h3>Price Breakdown</h3>
                    <p>Base Price: ${basePrice.toLocaleString()}</p>
                    <p>Color ({features.color}): +${getFeaturePrice('color', features.color).toLocaleString()}</p>
                    <p>Wheels ({features.wheels}): +${getFeaturePrice('wheels', features.wheels).toLocaleString()}</p>
                    <p>Interior ({features.interior}): +${getFeaturePrice('interior', features.interior).toLocaleString()}</p>
                    <p>Engine ({features.engine}): +${getFeaturePrice('engine', features.engine).toLocaleString()}</p>
                    <hr />
                    <h2>Total Price: ${totalPrice.toLocaleString()}</h2>
                </div>

                {/* Error Messages */}
                {errors.length > 0 && (
                    <div style={{ 
                        background: '#ff000020', 
                        border: '1px solid red', 
                        padding: '1rem', 
                        borderRadius: '8px',
                        marginBottom: '1rem'
                    }}>
                        <strong>⚠️ Incompatible Combination:</strong>
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                        type="submit" 
                        disabled={loading || errors.length > 0}
                    >
                        {loading ? 'Creating...' : 'Create Car'}
                    </button>
                    <button 
                        type="button" 
                        className="secondary"
                        onClick={() => navigate('/customcars')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateCar
