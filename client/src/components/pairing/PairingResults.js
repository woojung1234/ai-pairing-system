import React, { useState } from 'react';
import '../../styles/PairingResults.css';

const PairingResults = ({ results }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  if (!results || results.length === 0) {
    return (
      <div className="pairing-results empty">
        <div className="empty-message">
          <div className="empty-icon">🔍</div>
          <h3>결과가 없습니다</h3>
          <p>다른 검색어로 시도해보세요.</p>
        </div>
      </div>
    );
  }

  const toggleExpand = (id) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };

  return (
    <div className="pairing-results">
      <h2>추천 <span>페어링</span></h2>
      <div className="results-list">
        {results.map((pair) => (
          <div 
            key={pair.id} 
            className={`pairing-card ${expandedItem === pair.id ? 'expanded' : ''}`}
            onClick={() => toggleExpand(pair.id)}
          >
            <div className="pairing-main">
              <div className="pairing-score">
                <div className="score-indicator">
                  <div className="score-fill" style={{ width: `${pair.score * 100}%` }}></div>
                </div>
                <span>{Math.round(pair.score * 100)}%</span>
              </div>
              
              <div className="pairing-title">
                <h3>{pair.item1} + {pair.item2}</h3>
                <button className="expand-button">
                  <span className={expandedItem === pair.id ? 'icon-chevron-up' : 'icon-chevron-down'}></span>
                </button>
              </div>
            </div>
            
            {expandedItem === pair.id && (
              <div className="pairing-details">
                <div className="pairing-description">
                  <p>이 조합은 {Math.round(pair.score * 100)}%의 호환성을 가지고 있습니다. {pair.item1}의 풍부한 향과 {pair.item2}의 맛이 조화롭게 어우러져 최상의 미식 경험을 제공합니다.</p>
                </div>
                <div className="pairing-actions">
                  <button className="action-button details">자세히 보기</button>
                  <button className="action-button save">저장</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PairingResults;
