import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import QualityBar from '../components/QualityBar';
import BotBadge from '../components/BotBadge';
import ToastNotification from '../components/ToastNotification';
import { Bot, Play, RotateCcw, ChevronRight, User, AlertCircle } from 'lucide-react';

function ScanProgressBar({ progress }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white animate-bounce" />
        </div>
        <div>
          <p className="font-semibold text-blue-900">TaskPilot 분석 중...</p>
          <p className="text-xs text-blue-600">태스크 품질 검사 및 AI 초안 생성</p>
        </div>
      </div>
      <div className="bg-blue-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-blue-700 mt-2">{progress}% 완료</p>
    </div>
  );
}

function BotResultSummary({ botTaskCount }) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-green-900">분석 완료!</p>
          <p className="text-sm text-green-700">
            {botTaskCount}개 태스크에 AI 초안 댓글을 작성했습니다. 담당자에게 메신저 알림이 발송되었습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TaskMonitor() {
  const { tasks, selectedProjectId, selectedProject, botCompleted, runBot, resetBot } = useApp();
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const projectTasks = tasks.filter(t => t.projectId === selectedProjectId);

  const handleRunBot = useCallback(async () => {
    setScanning(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return Math.min(95, prev + Math.random() * 15);
      });
    }, 200);

    await runBot();

    clearInterval(interval);
    setProgress(100);
    setScanning(false);

    const botTasks = projectTasks.filter(t => t.needsBot);
    const assignees = botTasks
      .filter(t => t.assignee)
      .map(t => t.assignee)
      .join(', ');
    setToastMsg(`${assignees || '담당자'}에게 알림 발송 완료`);
    setToastVisible(true);
  }, [runBot, projectTasks]);

  const handleReset = () => {
    resetBot();
    setProgress(0);
    setScanning(false);
  };

  const getScore = (task) =>
    botCompleted && task.needsBot ? task.qualityScoreAfter : task.qualityScoreBefore;

  const botTaskCount = projectTasks.filter(t => t.needsBot).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">태스크 현황</h1>
          <p className="text-gray-500 mt-1">{selectedProject?.name}</p>
        </div>
        <div className="flex gap-2">
          {botCompleted && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              초기화 (Before)
            </button>
          )}
          <button
            onClick={handleRunBot}
            disabled={scanning || botCompleted}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
              botCompleted
                ? 'bg-green-100 text-green-700 cursor-default'
                : scanning
                ? 'bg-blue-400 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {botCompleted ? (
              <><Bot className="w-4 h-4" /> 분석 완료</>
            ) : scanning ? (
              <><Bot className="w-4 h-4 animate-spin" /> 분석 중...</>
            ) : (
              <><Play className="w-4 h-4" /> TaskPilot 봇 실행</>
            )}
          </button>
        </div>
      </div>

      {!scanning && !botCompleted && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-orange-800">봇 미실행 상태</p>
            <p className="text-xs text-orange-600">
              케어 레벨 {selectedProject?.careLevel} 기준으로 {botTaskCount}개 태스크가 보강이 필요합니다.
              "TaskPilot 봇 실행" 버튼을 눌러 AI 초안을 생성해보세요.
            </p>
          </div>
        </div>
      )}

      {scanning && <ScanProgressBar progress={Math.round(progress)} />}
      {botCompleted && <BotResultSummary botTaskCount={botTaskCount} />}

      <div className="space-y-3">
        {projectTasks.map((task, idx) => {
          const score = getScore(task);
          const showAfterEffect = botCompleted && task.needsBot;

          return (
            <div
              key={task.id}
              onClick={() => task.aiDraft && navigate(`/task-monitor/${task.id}`)}
              className={`bg-white rounded-xl border p-4 transition-all ${
                showAfterEffect
                  ? 'border-blue-200 shadow-sm cursor-pointer hover:border-blue-400 hover:shadow-md'
                  : task.aiDraft
                  ? 'border-gray-200 cursor-pointer hover:border-gray-300 hover:shadow-sm'
                  : 'border-gray-200'
              }`}
              style={
                botCompleted && task.needsBot
                  ? { animation: `fadeInUp 0.4s ease-out ${idx * 0.15}s both` }
                  : undefined
              }
            >
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-medium flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-gray-900 truncate">{task.title}</h3>
                    {showAfterEffect && task.aiDraft && (
                      <BotBadge status={task.aiDraft.status} />
                    )}
                  </div>
                  <div className="mb-2">
                    <QualityBar score={score} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    {task.assignee ? (
                      <span className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-[10px]">
                          {task.assigneeAvatar}
                        </div>
                        {task.assignee}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400">
                        <User className="w-3.5 h-3.5" />
                        담당자 미지정
                      </span>
                    )}
                    {task.milestone && <span>📍 {task.milestone}</span>}
                    {!task.body && <span className="text-orange-400">본문 없음</span>}
                  </div>
                </div>
                {task.aiDraft && (
                  <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-2" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ToastNotification
        message={toastMsg}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
