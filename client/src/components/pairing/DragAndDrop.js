import React, { useState } from 'react';
import '../../styles/DragAndDrop.css';

const DragAndDrop = () => {
  const [selectedBeverage, setSelectedBeverage] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [pairingResult, setPairingResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 음료 목록
  const beverages = [
    { id: 1, name: '레드 와인', type: 'wine', image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&q=80&w=300' },
    { id: 2, name: '화이트 와인', type: 'wine', image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&q=80&w=300' },
    { id: 3, name: '스파클링 와인', type: 'wine', image: 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?auto=format&fit=crop&q=80&w=300' },
    { id: 4, name: 'IPA 맥주', type: 'beer', image: 'https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?auto=format&fit=crop&q=80&w=300' },
    { id: 5, name: '진로 소주', type: 'spirits', image: 'https://cdn.pixabay.com/photo/2019/06/22/15/52/soju-4292156_1280.jpg' },
    { id: 6, name: '막걸리', type: 'traditional', image: 'https://cdn.pixabay.com/photo/2018/06/27/10/36/makgeolli-3501250_1280.jpg' },
  ];

  // 음식 목록
  const foods = [
    { id: 1, name: '스테이크', type: 'meat', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=300' },
    { id: 2, name: '연어', type: 'fish', image: 'https://images.unsplash.com/photo-1533673385-2101a3f31f9f?auto=format&fit=crop&q=80&w=300' },
    { id: 3, name: '치즈', type: 'dairy', image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&q=80&w=300' },
    { id: 4, name: '초콜릿', type: 'dessert', image: 'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?auto=format&fit=crop&q=80&w=300' },
    { id: 5, name: '삼겹살', type: 'meat', image: 'https://cdn.pixabay.com/photo/2019/03/25/08/18/pork-belly-4079478_1280.jpg' },
    { id: 6, name: '해물파전', type: 'seafood', image: 'https://cdn.pixabay.com/photo/2017/06/28/14/02/korean-food-2451711_1280.jpg' },
  ];

  const handleDragStart = (e, item, type) => {
    e.dataTransfer.setData('itemId', item.id);
    e.dataTransfer.setData('itemType', type);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropZoneType) => {
    e.preventDefault();
    const itemId = parseInt(e.dataTransfer.getData('itemId'));
    const itemType = e.dataTransfer.getData('itemType');
    
    // 올바른 드롭존에 드롭했는지 확인
    if (
      (dropZoneType === 'beverage' && itemType === 'beverage') ||
      (dropZoneType === 'food' && itemType === 'food')
    ) {
      const items = itemType === 'beverage' ? beverages : foods;
      const item = items.find(i => i.id === itemId);
      
      if (dropZoneType === 'beverage') {
        setSelectedBeverage(item);
      } else {
        setSelectedFood(item);
      }
    }
  };

  const clearSelection = (type) => {
    if (type === 'beverage') {
      setSelectedBeverage(null);
    } else {
      setSelectedFood(null);
    }
    
    // 결과도 초기화
    if (pairingResult) {
      setPairingResult(null);
    }
  };

  const analyzePairing = () => {
    if (!selectedBeverage || !selectedFood) {
      return;
    }
    
    setLoading(true);
    
    // 실제 API 연동 시 이 부분을 API 호출로 대체
    setTimeout(() => {
      // 페어링 분석 결과 (더미 데이터)
      const result = {
        score: Math.random() * 0.3 + 0.7, // 0.7 ~ 1.0 사이 랜덤 점수
        explanation: `${selectedBeverage.name}과(와) ${selectedFood.name}의 페어링은 탁월한 선택입니다. ${selectedBeverage.name}의 풍부한 향과 ${selectedFood.name}의 풍미가 완벽하게 어우러져 미각을 만족시켜 줍니다.`,
        compounds: [
          { name: '탄닌', level: Math.random() * 0.5 + 0.5 },
          { name: '산도', level: Math.random() * 0.5 + 0.5 },
          { name: '당도', level: Math.random() * 0.5 + 0.5 },
          { name: '알코올', level: Math.random() * 0.5 + 0.5 }
        ],
        additionalPairing: [
          selectedBeverage.type === 'wine' ? '치즈' : '과일',
          selectedFood.type === 'meat' ? '샐러드' : '견과류'
        ]
      };
      
      setPairingResult(result);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="dragdrop-component">
      <div className="section-intro">
        <h2>나만의 페어링 조합 만들기</h2>
        <p>원하는 음료와 음식을 각각의 영역으로 드래그해서 나만의 페어링 조합을 분석해보세요.</p>
      </div>
      
      <div className="pairing-builder">
        <div className="item-lists">
          <div className="list-column">
            <h3>음료 선택</h3>
            <div className="items-grid">
              {beverages.map(beverage => (
                <div 
                  key={beverage.id}
                  className="draggable-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, beverage, 'beverage')}
                >
                  <div className="item-image" style={{ backgroundImage: `url(${beverage.image})` }}></div>
                  <p>{beverage.name}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="list-column">
            <h3>음식 선택</h3>
            <div className="items-grid">
              {foods.map(food => (
                <div 
                  key={food.id}
                  className="draggable-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, food, 'food')}
                >
                  <div className="item-image" style={{ backgroundImage: `url(${food.image})` }}></div>
                  <p>{food.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="drop-zones">
          <div 
            className={`drop-zone ${selectedBeverage ? 'has-item' : ''}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'beverage')}
          >
            {selectedBeverage ? (
              <div className="selected-item">
                <div className="item-image" style={{ backgroundImage: `url(${selectedBeverage.image})` }}></div>
                <p>{selectedBeverage.name}</p>
                <button 
                  className="clear-button"
                  onClick={() => clearSelection('beverage')}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="drop-placeholder">
                <div className="placeholder-icon">🍷</div>
                <p>음료를 여기에 드래그하세요</p>
              </div>
            )}
          </div>
          
          <div className="plus-sign">+</div>
          
          <div 
            className={`drop-zone ${selectedFood ? 'has-item' : ''}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'food')}
          >
            {selectedFood ? (
              <div className="selected-item">
                <div className="item-image" style={{ backgroundImage: `url(${selectedFood.image})` }}></div>
                <p>{selectedFood.name}</p>
                <button 
                  className="clear-button"
                  onClick={() => clearSelection('food')}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="drop-placeholder">
                <div className="placeholder-icon">🍽️</div>
                <p>음식을 여기에 드래그하세요</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="action-section">
          <button 
            className="analyze-button"
            disabled={!selectedBeverage || !selectedFood || loading}
            onClick={analyzePairing}
          >
            {loading ? '분석 중...' : '페어링 분석하기'}
          </button>
        </div>
      </div>
      
      {pairingResult && (
        <div className="pairing-result">
          <div className="result-header">
            <h2>페어링 분석 결과</h2>
            <div className="score-badge">
              <span>호환성</span>
              <strong>{Math.round(pairingResult.score * 100)}%</strong>
            </div>
          </div>
          
          <div className="result-explanation">
            <p>{pairingResult.explanation}</p>
          </div>
          
          <div className="result-details">
            <div className="compounds-analysis">
              <h3>화학 성분 분석</h3>
              <div className="compounds-chart">
                {pairingResult.compounds.map((compound, index) => (
                  <div className="compound-bar" key={index}>
                    <label>{compound.name}</label>
                    <div className="bar-container">
                      <div 
                        className="bar-fill"
                        style={{ width: `${compound.level * 100}%` }}
                      ></div>
                    </div>
                    <span>{Math.round(compound.level * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pairing-suggestions">
              <h3>함께 추천하는 페어링</h3>
              <ul>
                {pairingResult.additionalPairing.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
