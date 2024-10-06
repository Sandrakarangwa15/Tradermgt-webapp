import React, { useEffect, useState } from 'react';
import TraderList from './TraderList';
import TraderForm from './TraderForm';
import axios from 'axios';

const TraderApp = () => {
    const [traders, setTraders] = useState([]);
    const [selectedTrader, setSelectedTrader] = useState(null);

    useEffect(() => {
        const fetchTraders = async () => {
            const response = await axios.get('/api/traders');
            setTraders(response.data);
        };
        fetchTraders();
    }, []);

    const handleSave = async (id, traderData) => {
        if (id) {
            await axios.put(`/api/traders/${id}`, traderData);
            // Update the local state with the edited trader
            setTraders((prev) =>
                prev.map((trader) => (trader.traderId === id ? { ...trader, ...traderData } : trader))
            );
        } else {
            const response = await axios.post('/api/traders', traderData);
            // Add the new trader to the state
            setTraders((prev) => [...prev, response.data]);
        }
        setSelectedTrader(null);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/traders/${id}`);
        // Remove the deleted trader from the state
        setTraders((prev) => prev.filter((trader) => trader.traderId !== id));
    };

    const handleEdit = (trader) => {
        setSelectedTrader(trader);
    };

    const handleCancel = () => {
        setSelectedTrader(null);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center' }}>Trader Management</h1>
            {selectedTrader ? (
                <TraderForm trader={selectedTrader} onSave={handleSave} onCancel={handleCancel} />
            ) : (
                <TraderForm onSave={handleSave} onCancel={handleCancel} />
            )}
            <TraderList traders={traders} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default TraderApp;
