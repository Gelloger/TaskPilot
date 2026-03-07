import { useApp } from '../context/AppContext';
import { statsData } from '../data/mockData';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, ReferenceLine,
} from 'recharts';
import { TrendingUp, Users, Bot, Target } from 'lucide-react';

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.08) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Stats() {
  const { projects } = useApp();
  const avgBefore = statsData.qualityTrend.slice(0, 3).reduce((a, d) => a + d.before, 0) / 3;
  const avgAfter = statsData.qualityTrend.slice(-2).reduce((a, d) => a + d.after, 0) / 2;
  const improvement = Math.round(avgAfter - avgBefore);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">통계 대시보드</h1>
        <p className="text-gray-500 mt-1">TaskPilot 도입 효과 및 태스크 품질 분포</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs text-gray-500">품질 개선</span>
          </div>
          <p className="text-2xl font-bold text-green-600">+{improvement}점</p>
          <p className="text-xs text-gray-400">봇 도입 전 대비</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-gray-500">AI 초안 발행</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">29건</p>
          <p className="text-xs text-gray-400">이번 달</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-500" />
            <span className="text-xs text-gray-500">반영률</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">68%</p>
          <p className="text-xs text-gray-400">초안 반영 비율</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-orange-500" />
            <span className="text-xs text-gray-500">참여 구성원</span>
          </div>
          <p className="text-2xl font-bold text-orange-600">
            {projects.reduce((a, p) => a + p.members, 0)}명
          </p>
          <p className="text-xs text-gray-400">전체 프로젝트</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-700 mb-4">품질 점수 분포</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={statsData.qualityDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderLabel}
                outerRadius={100}
                innerRadius={40}
                dataKey="value"
              >
                {statsData.qualityDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v}개`, '태스크 수']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-700 mb-4">담당자별 AI 추천 현황</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={statsData.memberStats} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="recommended" name="추천 수" fill="#93c5fd" radius={[4, 4, 0, 0]} />
              <Bar dataKey="accepted" name="반영 수" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-700">봇 도입 전/후 품질 추이</h3>
          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">4주차 봇 도입</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={statsData.qualityTrend} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis domain={[40, 100]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <ReferenceLine x="4주차(봇도입)" stroke="#f97316" strokeDasharray="4 4" label={{ value: '봇 도입', position: 'top', fontSize: 11, fill: '#f97316' }} />
            <Line type="monotone" dataKey="before" name="봇 미사용" stroke="#d1d5db" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="after" name="봇 사용" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
