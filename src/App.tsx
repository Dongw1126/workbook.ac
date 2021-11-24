import './App.css';
import MainComponent from './components/MainComponent';

import Amplify from '@aws-amplify/core';
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="main">
      <MainComponent/>
    </div>
  );
}

export default App;