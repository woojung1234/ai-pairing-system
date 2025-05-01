import React from 'react';
import '../../styles/PairingExplanation.css';

const PairingExplanation = ({ explanation }) => {
  if (!explanation) {
    return null;
  }

  return (
    <div className="pairing-explanation">
      <h2>페어링 <span>설명</span></h2>
      <div className="explanation-content">
        <div className="quote-mark left">"</div>
        <p>{explanation}</p>
        <div className="quote-mark right">"</div>
      </div>
      <div className="explanation-footer">
        <div className="ai-badge">
          <div className="ai-icon"></div>
          <span>AI 분석 리포트</span>
        </div>
        <div className="explanation-sources">
          <button className="sources-button">
            참고 문헌
            <div className="tooltip">
              <ul>
                <li>FlavorDB Chemistry Database</li>
                <li>Wine & Food Pairing Studies (2024)</li>
                <li>Molecular Gastronomy Research</li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PairingExplanation;
