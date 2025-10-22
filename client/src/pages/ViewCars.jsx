import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllItems, deleteItem } from '../services/customItemsService'
import '../App.css'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch all cars
    useEffect(() => {
        fetchCars()
    }, [])

    const fetchCars = async () => {
        try {
            setLoading(true)
            const data = await getAllItems()
            setCars(data)
            setError(null)
        } catch (err) {
            setError('Unable to load car list')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // Delete car
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await deleteItem(id)
                // Refresh the list
                fetchCars()
            } catch (err) {
                alert('Delete failed: ' + err.message)
            }
        }
    }

    if (loading) {
        return (
            <div className="container">
                <h1>Custom Cars</h1>
                <p>Loading...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container">
                <h1>Custom Cars</h1>
                <p style={{ color: 'red' }}>{error}</p>
            </div>
        )
    }

    return (
        <div className="container">
            <h1>Custom Cars 🏎️</h1>
            
            {cars.length === 0 ? (
                <p>No custom cars yet. <Link to="/">Create one now!</Link></p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Base Price</th>
                            <th>Total Price</th>
                            <th>Features</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                            <tr key={car.id}>
                                <td>{car.name}</td>
                                <td>${Number(car.base_price).toLocaleString()}</td>
                                <td><strong>${Number(car.total_price).toLocaleString()}</strong></td>
                                <td>
                                    <small>
                                        {car.features.color && `Color: ${car.features.color} `}
                                        {car.features.wheels && `| Wheels: ${car.features.wheels} `}
                                        {car.features.interior && `| Interior: ${car.features.interior} `}
                                        {car.features.engine && `| Engine: ${car.features.engine}`}
                                    </small>
                                </td>
                                <td>
                                    <Link to={`/customcars/${car.id}`} role="button" className="outline">
                                        View
                                    </Link>
                                    {' '}
                                    <Link to={`/edit/${car.id}`} role="button" className="secondary">
                                        Edit
                                    </Link>
                                    {' '}
                                    <button 
                                        onClick={() => handleDelete(car.id)}
                                        className="contrast"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default ViewCars
