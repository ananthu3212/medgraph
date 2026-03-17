import SymptomChecker from './components/SymptomChecker';
import './App.css';

function App() {
    return (
        <div className="app-container">
            <header className="header">
                <h1>🏥 MedGraph Medical Dashboard</h1>
                <p>AI-Powered Symptom Checker & Medical Data Analysis</p>
            </header>

            <main>
                <SymptomChecker />
            </main>
        </div>
    );
}

export default App;