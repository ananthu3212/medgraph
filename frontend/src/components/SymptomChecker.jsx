import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { checkSymptoms, fetchSymptoms } from '../services/api';

function SymptomChecker() {
    const [symptoms, setSymptoms] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadSymptoms = async () => {
            try {
                const data = await fetchSymptoms();
                console.log('Symptoms loaded:', data); // Check what data looks like
                const formatted = data.map(s => ({
                    value: s.name || s, // Handle if data is array of strings or objects
                    label: s.name || s
                }));
                setSymptoms(formatted);
            } catch (error) {
                console.error('Failed to load symptoms:', error);
            }
        };
        loadSymptoms();
    }, []);

    const handleCheck = async () => {
        if (selectedSymptoms.length === 0) return;

        setLoading(true);
        try {
            const symptomNames = selectedSymptoms.map(s => s.value);
            console.log('Sending symptoms:', symptomNames); // Debug log
            const results = await checkSymptoms(symptomNames);
            console.log('Results:', results); // Debug log
            setSuggestions(results);
        } catch (error) {
            console.error('Error checking symptoms:', error);
        } finally {
            setLoading(false);
        }
    };

    const customStyles = {
        control: (base) => ({
            ...base,
            minHeight: '42px',
        }),
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px' }}>
            <h2>Symptom Checker</h2>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                    Select your symptoms:
                </label>
                <Select
                    options={symptoms}
                    isMulti
                    value={selectedSymptoms}
                    onChange={setSelectedSymptoms}
                    placeholder="Search and select symptoms..."
                    styles={customStyles}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <p><strong>Selected symptoms:</strong> {selectedSymptoms.length}</p>
                <button
                    onClick={handleCheck}
                    disabled={selectedSymptoms.length === 0 || loading}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: selectedSymptoms.length === 0 ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: selectedSymptoms.length === 0 ? 'not-allowed' : 'pointer',
                        fontSize: '16px'
                    }}
                >
                    {loading ? 'Checking...' : 'Check Symptoms'}
                </button>
            </div>

            {suggestions.length > 0 && (
                <div>
                    <h3>Possible diseases:</h3>
                    <div style={{ display: 'grid', gap: '15px' }}>
                        {suggestions.map((disease, index) => (
                            <div key={index} style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '15px',
                                backgroundColor: '#f9f9f9'
                            }}>
                                <h4 style={{ margin: '0 0 10px 0' }}>{disease.diseaseName}</h4>
                                <p><strong>Matched symptoms:</strong> {disease.matchedSymptoms.join(', ')}</p>
                                <p><strong>Match count:</strong> {disease.matchCount}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SymptomChecker;