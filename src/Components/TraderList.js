import React from 'react';
import axios from 'axios';

const TraderList = ({ traders, onEdit, onDelete }) => {
    const tableContainerStyles = {
        width: '90%',
        margin: '20px auto',
        borderRadius: '10px',
        overflowX: 'auto',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const tableStyles = {
        width: '100%',
        borderCollapse: 'collapse',
    };

    const thTdStyles = {
        padding: '12px 15px',
        border: '1px solid #ddd',
        textAlign: 'left',
        fontSize: '14px',
    };

    const thStyles = {
        ...thTdStyles,
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    };

    const buttonStyles = {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '5px',
        fontSize: '12px',
        transition: 'background-color 0.3s',
    };

    const buttonDeleteStyles = {
        ...buttonStyles,
        backgroundColor: '#f44336',
    };

    return (
        <div style={tableContainerStyles}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Trader List</h2>
            <table style={tableStyles}>
                <thead>
                    <tr>
                        <th style={thStyles}>Trader ID</th>
                        <th style={thStyles}>Email</th>
                        <th style={thStyles}>KYC Status</th>
                        <th style={thStyles}>Digital Certificate ID</th>
                        <th style={thStyles}>Proof of Address</th>
                        <th style={thStyles}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {traders.map((trader) => (
                        <tr key={trader.traderId}>
                            <td style={thTdStyles}>{trader.traderId}</td>
                            <td style={thTdStyles}>{trader.email}</td>
                            <td style={thTdStyles}>{trader.kycStatus}</td>
                            <td style={thTdStyles}>{trader.digitalCertificateId || 'N/A'}</td>
                            <td style={thTdStyles}>{trader.proofOfAddress || 'N/A'}</td>
                            <td style={thTdStyles}>
                                <button
                                    style={buttonStyles}
                                    onClick={() => onEdit(trader)}
                                >
                                    Edit
                                </button>
                                <button
                                    style={buttonDeleteStyles}
                                    onClick={() => onDelete(trader.traderId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TraderList;
