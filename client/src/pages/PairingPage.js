import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/PairingPage.css';

// Components
import SearchBar from '../components/search/SearchBar';
import PairingResults from '../components/pairing/PairingResults';
import PairingExplanation from '../components/pairing/PairingExplanation';
import GraphVisualization from '../components/visualization/GraphVisualization';
import DragAndDrop from '../components/pairing/DragAndDrop';

const PairingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const location = useLocation();
  
  useEffect(() => {
    // URL에서 쿼리 파라미터 추출
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [location]);
  
  const handleSearch = async (query) => {
    setLoading(true);
    setSearchQuery(query);
    
    try {
      // 실제 구현 시 API 호출로 대체
      // const response = await axios.get(`/api/pairing/search?query=${query}`);
      // setSearchResults(response.data);
      
      // 임시 데이터
      setTimeout(() => {
        setSearchResults({
          pairs: [
            { id: 1, item1: '레드 와인', item2: '스테이크', score: 0.95 },
            { id: 2, item1: '레드 와인', item2: '다크 초콜릿', score: 0.87 },
            { id: 3, item1: '레드 와인', item2: '치즈', score: 0.82 },
            { id: 4, item1: '레드 와인', item2: '양고기', score: 0.78 },
            { id: 5, item1: '레드 와인', item2: '버섯 요리', score: 0.76 },
          ],
          explanation: '레드 와인의 탄닌 성분은 스테이크의 단백질과 완벽하게 조화를 이룹니다. 와인의 산도는 고기의 지방을 중화시키며, 풍부한 향과 바디감이 육류의 풍미를 더욱 향상시킵니다. 또한 와인에 함유된 폴리페놀 성분은 육류의 소화를 돕는 효과도 있습니다.',
          graphData: {
            nodes: [
              { id: 1, name: '레드 와인', type: 'beverage' },
              { id: 2, name: '스테이크', type: 'food' },
              { id: 3, name: '탄닌', type: 'compound' },
              { id: 4, name: '단백질', type: 'compound' },
              { id: 5, name: '다크 초콜릿', type: 'food' },
              { id: 6, name: '치즈', type: 'food' },
              { id: 7, name: '폴리페놀', type: 'compound' },
              { id: 8, name: '지방', type: 'compound' },
            ],
            links: [
              { source: 1, target: 3, value: 0.9 },
              { source: 2, target: 4, value: 0.95 },
              { source: 3, target: 4, value: 0.85 },
              { source: 1, target: 7, value: 0.8 },
              { source: 2, target: 8, value: 0.75 },
              { source: 7, target: 8, value: 0.7 },
              { source: 1, target: 5, value: 0.87 },
              { source: 1, target: 6, value: 0.82 },
            ]
          },
          chemicalAnalysis: [
            { compound: '탄닌', concentration: 0.85, effect: '단백질과 결합하여 풍미 증진' },
            { compound: '안토시아닌', concentration: 0.72, effect: '항산화 작용 및 풍미 향상' },
            { compound: '타르타르산', concentration: 0.65, effect: '신선한 산미 제공' },
          ]
        });
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('검색 오류:', error);
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="pairing-page">
      <div className="page-header">
        <h1>페어링 <span>탐색</span></h1>
        <p className="subtitle">AI가 분석한 완벽한 음식과 술의 조합을 찾아보세요</p>
      </div>
      
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => handleTabChange('search')}
        >
          <span className="icon-search"></span>
          검색으로 찾기
        </button>
        <button 
          className={`tab-button ${activeTab === 'dragdrop' ? 'active' : ''}`}
          onClick={() => handleTabChange('dragdrop')}
        >
          <span className="icon-dragdrop"></span>
          직접 조합하기
        </button>
      </div>
      
      {activeTab === 'search' && (
        <div className="search-container">
          <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
          
          {loading && (
            <div className="loading-container">
              <div className="loader"></div>
              <p>AI가 최적의 페어링을 찾고 있습니다...</p>
            </div>
          )}
          
          {searchResults && (
            <div className="results-container">
              <div className="main-section">
                <div className="left-panel">
                  <PairingResults results={searchResults.pairs} />
                  
                  {searchResults.chemicalAnalysis && (
                    <div className="chemical-analysis">
                      <h2>화학 성분 분석</h2>
                      <div className="compounds-list">
                        {searchResults.chemicalAnalysis.map((compound, index) => (
                          <div className="compound-item" key={index}>
                            <div className="compound-header">
                              <h3>{compound.compound}</h3>
                              <div className="concentration-bar">
                                <div 
                                  className="concentration-fill" 
                                  style={{width: `${compound.concentration * 100}%`}}
                                ></div>
                              </div>
                              <span>{Math.round(compound.concentration * 100)}%</span>
                            </div>
                            <p>{compound.effect}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="right-panel">
                  <GraphVisualization data={searchResults.graphData} />
                  <PairingExplanation explanation={searchResults.explanation} />
                </div>
              </div>
              
              <div className="suggested-recipes">
                <h2>추천 레시피</h2>
                <div className="recipe-cards">
                  <div className="recipe-card">
                    <div className="recipe-image"></div>
                    <h3>페퍼 스테이크</h3>
                    <p>레드 와인과 완벽한 조화를 이루는 고소한 페퍼 스테이크 레시피입니다.</p>
                    <a href="#" className="recipe-link">레시피 보기</a>
                  </div>
                  <div className="recipe-card">
                    <div className="recipe-image"></div>
                    <h3>와인 소스 스테이크</h3>
                    <p>레드 와인을 활용한 소스로 맛을 낸 풍미 가득한 스테이크입니다.</p>
                    <a href="#" className="recipe-link">레시피 보기</a>
                  </div>
                  <div className="recipe-card">
                    <div className="recipe-image"></div>
                    <h3>치즈 플래터</h3>
                    <p>레드 와인과 함께 즐기기 좋은 다양한 치즈 모음입니다.</p>
                    <a href="#" className="recipe-link">레시피 보기</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'dragdrop' && (
        <div className="dragdrop-container">
          <DragAndDrop />
        </div>
      )}
    </div>
  );
};

export default PairingPage;
