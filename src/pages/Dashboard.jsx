import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import QualityBar from '../components/QualityBar';
import { Bot, Users, AlertTriangle, ChevronRight } from 'lucide-react';

function CareLevelBadge({ level }) {
  const colors = ['', 'bg-gray-100 text-gray-600', 'bg-blue-100 text-blue-700',
    'bg-yellow-100 text-yellow-700', 'bg-orange-100 text-orange-700', 'bg-red-100 text-red-700'];
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colors[level]}`}>
      케어 Lv.{level}
    </span>
  );
}

export default function Dashboard() {
  const { projects, setSelectedProjectId } = useApp();
  const navigate = useNavigate();

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
    navigate('/task-monitor');
  };

  const totalTasks = projects.reduce((a, p) => a + p.taskCount, 0);
  const avgQuality = Math.round(projects.reduce((a, p) => a + p.qualityScore, 0) / projects.length);
  const totalLowQuality = projects.reduce((a, p) => a + p.lowQualityCount, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">프로젝트 현황</h1>
        <p className="text-gray-500 mt-1">연결된 Dooray 프로젝트의 태스크 품질 지표</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">전체 태스크</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{totalTasks}</p>
          <p className="text-xs text-gray-400 mt-1">{projects.length}개 프로젝트</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">평균 품질 점수</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{avgQuality}점</p>
          <QualityBar score={avgQuality} showLabel={false} />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">케어 필요 태스크</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{totalLowQuality}</p>
          <p className="text-xs text-gray-400 mt-1">AI 보강 권장</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {projects.map(project => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
            className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <CareLevelBadge level={project.careLevel} />
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors mt-0.5" />
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>품질 점수</span>
                <span>{project.qualityScore}점</span>
              </div>
              <QualityBar score={project.qualityScore} showLabel={false} />
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {project.members}명
              </span>
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
                케어 {project.lowQualityCount}건
              </span>
              {project.lastBotRun && (
                <span className="flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5 text-blue-400" />
                  {project.lastBotRun}
                </span>
              )}
            </div>

            {!project.lastBotRun && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-orange-600 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  봇 미실행 — 태스크 현황으로 이동해 봇을 실행해보세요
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
