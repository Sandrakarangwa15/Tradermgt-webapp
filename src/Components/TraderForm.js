import React, { useEffect, useState } from 'react';

const TraderForm = ({ trader, onSave, onCancel }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [kycStatus, setKycStatus] = useState('PENDING');
    const [digitalCertificateId, setDigitalCertificateId] = useState('');
    const [proofOfAddress, setProofOfAddress] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (trader) {
            setEmail(trader.email);
            setPassword(trader.password);
            setKycStatus(trader.kycStatus);
            setDigitalCertificateId(trader.digitalCertificateId);
            setProofOfAddress(trader.proofOfAddress);
        } else {
            setEmail('');
            setPassword('');
            setKycStatus('PENDING');
            setDigitalCertificateId('');
            setProofOfAddress('');
        }
    }, [trader]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const traderData = {
            email,
            password,
            kycStatus,
            digitalCertificateId,
            proofOfAddress,
        };
        await onSave(trader ? trader.traderId : null, traderData);
        setSuccessMessage(trader ? 'Trader updated successfully!' : 'Trader created successfully!');
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const formStyles = {
        backgroundColor: '#f9f9f9',
        padding: '24px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '450px',
        margin: '0 auto',
    };

    const inputStyles = {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '16px',
        boxSizing: 'border-box',
    };

    const buttonStyles = {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '10px 5px 0 0',
        transition: '0.3s ease',
    };

    const buttonCancelStyles = {
        ...buttonStyles,
        backgroundColor: '#f44336',
    };

    return (
        <form onSubmit={handleSubmit} style={formStyles}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register Trader</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyles}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyles}
            />
            <select
                value={kycStatus}
                onChange={(e) => setKycStatus(e.target.value)}
                style={inputStyles}
            >
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
            </select>
            <input
                type="number"
                placeholder="Digital Certificate ID"
                value={digitalCertificateId}
                onChange={(e) => setDigitalCertificateId(e.target.value)}
                style={inputStyles}
            />
            <input
                type="text"
                placeholder="Proof of Address"
                value={proofOfAddress}
                onChange={(e) => setProofOfAddress(e.target.value)}
                style={inputStyles}
            />
            <div style={{ textAlign: 'center' }}>
                <button type="submit" style={buttonStyles}>{trader ? 'Update' : 'Create'}</button>
                <button type="button" onClick={onCancel} style={buttonCancelStyles}>Cancel</button>
            </div>
            {successMessage && (
                <p style={{ textAlign: 'center', color: 'green', marginTop: '10px' }}>
                    {successMessage}
                </p>
            )}
        </form>
    );
};

export default TraderForm;
