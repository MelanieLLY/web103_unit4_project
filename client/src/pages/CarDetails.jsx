import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getItemById, deleteItem } from '../services/customItemsService'
import { getFeaturePrice } from '../utilities/priceCalculator'
import '../App.css'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchCarDetails()
    }, [id])

    const fetchCarDetails = async () => {
        try {
            setLoading(true)
            const data = await getItemById(id)
            setCar(data)
            setError(null)
        } catch (err) {
            setError('Unable to load car details')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${car.name}"? This action cannot be undone.`)) {
            try {
                await deleteItem(id)
                alert('Car deleted successfully')
                navigate('/customcars')
            } catch (err) {
                alert('Delete failed: ' + err.message)
            }
        }
    }

    if (loading) {
        return (
            <div className="container">
                <h1>Car Details</h1>
                <p>Loading...</p>
            </div>
        )
    }

    if (error || !car) {
        return (
            <div className="container">
                <h1>Car Details</h1>
                <p style={{ color: 'red' }}>{error || 'Car not found'}</p>
                <Link to="/customcars" role="button">Back to List</Link>
            </div>
        )
    }

    return (
        <div className="container">
            <h1>🏎️ {car.name}</h1>
            
            <div style={{ 
                background: 'var(--pico-background-color)', 
                padding: '2rem', 
                borderRadius: '8px',
                marginBottom: '2rem'
            }}>
                <h2>Configuration Details</h2>
                
                <table>
                    <tbody>
                        <tr>
                            <th style={{ width: '30%' }}>Exterior Color</th>
                            <td>{car.features.color}</td>
                            <td style={{ textAlign: 'right' }}>
                                +${getFeaturePrice('color', car.features.color).toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <th>Wheels Type</th>
                            <td>{car.features.wheels}</td>
                            <td style={{ textAlign: 'right' }}>
                                +${getFeaturePrice('wheels', car.features.wheels).toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <th>Interior Seats</th>
                            <td>{car.features.interior}</td>
                            <td style={{ textAlign: 'right' }}>
                                +${getFeaturePrice('interior', car.features.interior).toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <th>Engine Type</th>
                            <td>{car.features.engine}</td>
                            <td style={{ textAlign: 'right' }}>
                                +${getFeaturePrice('engine', car.features.engine).toLocaleString()}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <hr />

                <h2>Price Information</h2>
                <p><strong>Base Price:</strong> ${Number(car.base_price).toLocaleString()}</p>
                <p><strong>Configuration Upgrades:</strong> ${(Number(car.total_price) - Number(car.base_price)).toLocaleString()}</p>
                <h2 style={{ color: 'var(--pico-primary)' }}>
                    Total Price: ${Number(car.total_price).toLocaleString()}
                </h2>

                <hr />

                <p><strong>Created:</strong> {new Date(car.created_at).toLocaleString('en-US')}</p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to={`/edit/${car.id}`} role="button">
                    Edit Configuration
                </Link>
                <button 
                    className="contrast"
                    onClick={handleDelete}
                >
                    Delete Car
                </button>
                <Link to="/customcars" role="button" className="secondary">
                    Back to List
                </Link>
            </div>
        </div>
    )
}

export default CarDetails
