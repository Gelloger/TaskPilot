import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import QualityBar from '../components/QualityBar';
import { Bot, ArrowLeft, CheckCircle2, Edit3, XCircle, Clock } from 'lucide-react';

function CommentBubble({ draft, onAction }) {
  const statusConfig = {
    pending: null,
    accepted: { label: '반영됨', color: 'text-green-600 bg-green-50', icon: CheckCircle2 },
    modified: { label: '수정 후 반영됨', color: 'text-purple-600 bg-purple-50', icon: Edit3 },
    ignored: { label: '무시됨', color: 'text-gray-400 bg-gray-50', icon: XCircle },
  };

  const current = statusConfig[draft.status];

  return (
    <div className={`rounded-xl border p-5 ${draft.status === 'pending' ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200 bg-gray-50'}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">TaskPilot Bot</p>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {draft.createdAt}
          </p>
        </div>
        {current && (
          <span className={`ml-auto text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${current.color}`}>
            <current.icon className="w-3 h-3" />
            {current.label}
          </span>
        )}
      </div>

      <div className="space-y-1">
        {draft.content.split('\n').map((line, i) => {
          if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={i} className="font-semibold text-gray-800 mt-3 mb-1">{line.replace(/\*\*/g, '')}</p>;
          }
          if (line.startsWith('- [ ]')) {
            return (
              <div key={i} className="flex items-start gap-2 ml-2 mb-1">
                <div className="w-4 h-4 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{line.replace('- [ ] ', '')}</span>
              </div>
            );
          }
          return line ? <p key={i} className="text-sm text-gray-700">{line}</p> : <br key={i} />;
        })}
      </div>

      {draft.status === 'pending' && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-blue-200">
          <button
            onClick={() => onAction('accepted')}
            className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            반영
          </button>
          <button
            onClick={() => onAction('modified')}
            className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            수정 후 반영
          </button>
          <button
            onClick={() => onAction('ignored')}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-medium rounded-lg transition-colors"
          >
            <XCircle className="w-4 h-4" />
            무시
          </button>
        </div>
      )}
    </div>
  );
}

export default function TaskDetail() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks, botCompleted, updateDraftStatus } = useApp();
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return (
      <div className="p-8 text-center text-gray-500">
        태스크를 찾을 수 없습니다.
        <button onClick={() => navigate(-1)} className="block mx-auto mt-4 text-blue-600 hover:underline">돌아가기</button>
      </div>
    );
  }

  const score = botCompleted && task.needsBot ? task.qualityScoreAfter : task.qualityScoreBefore;

  return (
    <div className="p-8 max-w-2xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        태스크 목록으로
      </button>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-3">{task.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {task.assignee ? (
            <span className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                {task.assigneeAvatar}
              </div>
              {task.assignee}
            </span>
          ) : (
            <span className="text-red-400">담당자 미지정</span>
          )}
          {task.milestone && <span>📍 {task.milestone}</span>}
        </div>
        <div className="mb-1">
          <p className="text-xs text-gray-400 mb-1">품질 점수</p>
          <QualityBar score={score} />
        </div>
        {task.body ? (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-1">본문</p>
            <p className="text-sm text-gray-700 whitespace-pre-line">{task.body}</p>
          </div>
        ) : (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-orange-400">본문이 작성되지 않았습니다</p>
          </div>
        )}
      </div>

      {task.aiDraft && botCompleted && (
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
            <Bot className="w-4 h-4 text-blue-600" />
            AI 초안 댓글
          </h2>
          <CommentBubble
            draft={task.aiDraft}
            onAction={(status) => updateDraftStatus(task.id, status)}
          />
        </div>
      )}

      {task.aiDraft && !botCompleted && (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center">
          <Bot className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-400">TaskPilot 봇을 실행하면 AI 초안이 표시됩니다</p>
          <button
            onClick={() => navigate('/task-monitor')}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            태스크 현황으로 이동 →
          </button>
        </div>
      )}
    </div>
  );
}
