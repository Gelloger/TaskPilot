import { Bot } from 'lucide-react';

export default function BotBadge({ status = 'pending' }) {
  const styles = {
    pending: 'bg-blue-100 text-blue-700 border-blue-200',
    accepted: 'bg-green-100 text-green-700 border-green-200',
    modified: 'bg-purple-100 text-purple-700 border-purple-200',
    ignored: 'bg-gray-100 text-gray-500 border-gray-200',
  };
  const labels = {
    pending: 'AI 초안 대기중',
    accepted: 'AI 초안 반영됨',
    modified: 'AI 초안 수정 반영',
    ignored: 'AI 초안 무시됨',
  };

  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${styles[status]}`}>
      <Bot className="w-3 h-3" />
      {labels[status]}
    </span>
  );
}
