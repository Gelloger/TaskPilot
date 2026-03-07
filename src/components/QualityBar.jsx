export default function QualityBar({ score, animated = false, showLabel = true }) {
  const color =
    score >= 80 ? 'bg-green-500' :
    score >= 60 ? 'bg-yellow-400' :
    score >= 40 ? 'bg-orange-400' : 'bg-red-500';

  const label =
    score >= 80 ? '우수' :
    score >= 60 ? '보통' :
    score >= 40 ? '미흡' : '불량';

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${color} ${animated ? 'animate-pulse' : ''}`}
          style={{ width: `${score}%` }}
        />
      </div>
      {showLabel && (
        <span className={`text-xs font-medium w-12 text-right ${
          score >= 80 ? 'text-green-600' :
          score >= 60 ? 'text-yellow-600' :
          score >= 40 ? 'text-orange-600' : 'text-red-600'
        }`}>
          {score}점 ({label})
        </span>
      )}
    </div>
  );
}
