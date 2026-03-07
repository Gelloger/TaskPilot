import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CARE_LEVEL_ITEMS } from '../data/mockData';
import { CheckCircle2, Circle, Shield, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LEVEL_DESC = {
  1: { label: '최소', desc: '제목만 체크합니다. 간단한 개인 메모용 프로젝트에 적합.', color: 'text-gray-600', bg: 'bg-gray-50 border-gray-200' },
  2: { label: '기본', desc: '담당자까지 확인합니다. 소규모 팀 업무에 적합.', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
  3: { label: '표준', desc: '본문 작성을 포함합니다. 대부분의 팀에 권장.', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
  4: { label: '강화', desc: '마일스톤 연결까지 체크합니다. 체계적인 스프린트 관리에 적합.', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' },
  5: { label: '최고', desc: '완료 조건까지 명시합니다. 높은 품질 기준의 프로덕트 팀에 적합.', color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
};

export default function CareLevel() {
  const { projects, selectedProjectId, setSelectedProjectId, updateCareLevel } = useApp();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const [localLevel, setLocalLevel] = useState(selectedProject?.careLevel || 3);

  const handleSave = () => {
    updateCareLevel(selectedProjectId, localLevel);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">케어 레벨 설정</h1>
        <p className="text-gray-500 mt-1">프로젝트별로 TaskPilot이 체크할 품질 기준을 설정합니다</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">대상 프로젝트</label>
        <select
          value={selectedProjectId}
          onChange={e => {
            setSelectedProjectId(e.target.value);
            const p = projects.find(p => p.id === e.target.value);
            setLocalLevel(p?.careLevel || 3);
            setSaved(false);
          }}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">케어 레벨 선택</label>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map(level => {
            const info = LEVEL_DESC[level];
            const isSelected = localLevel === level;
            return (
              <button
                key={level}
                onClick={() => setLocalLevel(level)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? `${info.bg} border-current ${info.color}`
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    isSelected ? 'bg-current' : 'bg-gray-100'
                  }`}>
                    <span className={isSelected ? 'text-white' : 'text-gray-500'}>{level}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">레벨 {level} — {info.label}</span>
                      {level === 3 && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">권장</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{info.desc}</p>
                  </div>
                  {isSelected ? (
                    <CheckCircle2 className={`w-5 h-5 ${info.color}`} />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Shield className={`w-4 h-4 ${LEVEL_DESC[localLevel].color}`} />
          <h3 className="text-sm font-semibold text-gray-700">레벨 {localLevel} 체크 항목</h3>
        </div>
        <div className="space-y-2">
          {CARE_LEVEL_ITEMS[localLevel].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
              {i === CARE_LEVEL_ITEMS[localLevel].length - 1 && localLevel > 1 && (
                <span className="ml-auto text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">추가됨</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {saved ? '✓ 저장됨' : '설정 저장'}
        </button>
        <button
          onClick={() => navigate('/task-monitor')}
          className="px-6 py-2.5 rounded-lg font-medium text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
        >
          태스크 현황 보기
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
