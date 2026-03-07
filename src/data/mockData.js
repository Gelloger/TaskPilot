export const CARE_LEVEL_ITEMS = {
  1: ['제목 존재 여부'],
  2: ['제목 존재 여부', '담당자 지정 여부'],
  3: ['제목 존재 여부', '담당자 지정 여부', '본문 작성 여부 (50자 이상)'],
  4: ['제목 존재 여부', '담당자 지정 여부', '본문 작성 여부 (50자 이상)', '마일스톤 연결 여부'],
  5: ['제목 존재 여부', '담당자 지정 여부', '본문 작성 여부 (50자 이상)', '마일스톤 연결 여부', '완료 조건 명시 여부'],
};

export const projects = [
  {
    id: 'p1',
    name: 'NHN Cloud SMS 서비스',
    careLevel: 3,
    taskCount: 24,
    qualityScore: 62,
    lowQualityCount: 9,
    members: 5,
    lastBotRun: '2026-03-06 14:30',
  },
  {
    id: 'p2',
    name: 'Dooray! 웹 클라이언트',
    careLevel: 4,
    taskCount: 41,
    qualityScore: 78,
    lowQualityCount: 5,
    members: 8,
    lastBotRun: '2026-03-07 09:15',
  },
  {
    id: 'p3',
    name: 'TaskPilot 개발',
    careLevel: 5,
    taskCount: 13,
    qualityScore: 91,
    lowQualityCount: 1,
    members: 3,
    lastBotRun: '2026-03-07 11:00',
  },
  {
    id: 'p4',
    name: '인프라 자동화',
    careLevel: 2,
    taskCount: 8,
    qualityScore: 45,
    lowQualityCount: 4,
    members: 2,
    lastBotRun: null,
  },
];

export const tasks = [
  {
    id: 't1',
    projectId: 'p1',
    title: '결제 모듈 오류 수정',
    assignee: '김민준',
    assigneeAvatar: '김',
    body: '',
    milestone: null,
    doneCondition: null,
    qualityScoreBefore: 20,
    qualityScoreAfter: 80,
    status: 'in-progress',
    needsBot: true,
    aiDraft: {
      id: 'd1',
      content: `안녕하세요 김민준님,

이 태스크에 대해 아래 내용을 보강해 주시면 팀원들이 맥락을 이해하는 데 도움이 될 것 같습니다:

**본문 (제안):**
결제 모듈에서 발생하는 오류의 재현 조건, 오류 메시지, 영향 범위를 기재해 주세요.
예: "PG사 콜백 수신 시 간헐적으로 500 오류 발생 (영향: 결제 완료율 ~3% 감소)"

**완료 조건 (제안):**
- [ ] 오류 재현 테스트 통과
- [ ] 스테이징 환경 검증
- [ ] QA 승인

위 내용이 맞으면 "반영"을, 수정이 필요하면 "수정 후 반영"을 눌러주세요.`,
      createdAt: '2026-03-07 11:05',
      status: 'pending',
    },
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'API 응답 속도 개선',
    assignee: '이서연',
    assigneeAvatar: '이',
    body: '현재 /api/sms/send 엔드포인트가 평균 2.3초 응답.',
    milestone: null,
    doneCondition: null,
    qualityScoreBefore: 40,
    qualityScoreAfter: 75,
    status: 'in-progress',
    needsBot: true,
    aiDraft: {
      id: 'd2',
      content: `이서연님,

본문이 일부 작성되어 있습니다. 아래 내용을 추가하면 더 완성도 있는 태스크가 됩니다:

**마일스톤:** Q1 성능 개선 스프린트에 연결 권장

**완료 조건 (제안):**
- [ ] /api/sms/send 평균 응답시간 < 500ms 달성
- [ ] 부하 테스트 (100 RPS) 통과

이 내용이 맞으신가요?`,
      createdAt: '2026-03-07 11:05',
      status: 'pending',
    },
  },
  {
    id: 't3',
    projectId: 'p1',
    title: '사용자 인증 토큰 갱신 로직',
    assignee: '박지호',
    assigneeAvatar: '박',
    body: 'JWT refresh token 만료 시 자동 갱신 구현 필요. 현재 만료 시 로그아웃됨.\n\n완료 조건:\n- 토큰 갱신 API 구현\n- 프론트 인터셉터 연동\n- E2E 테스트',
    milestone: 'Q1 2026',
    doneCondition: '토큰 갱신 정상 동작 확인',
    qualityScoreBefore: 90,
    qualityScoreAfter: 90,
    status: 'in-progress',
    needsBot: false,
    aiDraft: null,
  },
  {
    id: 't4',
    projectId: 'p1',
    title: '로그 수집 파이프라인 구축',
    assignee: null,
    assigneeAvatar: null,
    body: '',
    milestone: null,
    doneCondition: null,
    qualityScoreBefore: 0,
    qualityScoreAfter: 60,
    status: 'todo',
    needsBot: true,
    aiDraft: {
      id: 'd3',
      content: `담당자가 지정되지 않은 태스크입니다.

**담당자 지정을 권장합니다.**

또한 아래 내용을 보강해 주시면 좋겠습니다:

**본문 (제안):**
현재 로그가 분산 저장되어 분석이 어려운 상황. Elasticsearch + Logstash + Kibana(ELK) 스택 도입 또는 기존 인프라 활용 방안 검토 필요.

**완료 조건 (제안):**
- [ ] 파이프라인 설계 문서 작성
- [ ] PoC 환경 구축
- [ ] 팀 리뷰 완료`,
      createdAt: '2026-03-07 11:05',
      status: 'pending',
    },
  },
];

export const statsData = {
  qualityDistribution: [
    { name: '90-100점', value: 3, color: '#22c55e' },
    { name: '70-89점', value: 7, color: '#86efac' },
    { name: '50-69점', value: 8, color: '#fbbf24' },
    { name: '30-49점', value: 4, color: '#f97316' },
    { name: '0-29점', value: 2, color: '#ef4444' },
  ],
  memberStats: [
    { name: '김민준', recommended: 8, accepted: 6 },
    { name: '이서연', recommended: 5, accepted: 4 },
    { name: '박지호', recommended: 2, accepted: 2 },
    { name: '최유진', recommended: 11, accepted: 7 },
    { name: '정태양', recommended: 3, accepted: 1 },
  ],
  qualityTrend: [
    { week: '1주차', before: 48, after: 48 },
    { week: '2주차', before: 51, after: 51 },
    { week: '3주차', before: 49, after: 49 },
    { week: '4주차(봇도입)', before: 52, after: 71 },
    { week: '5주차', before: 54, after: 78 },
    { week: '6주차', before: 55, after: 83 },
    { week: '7주차', before: 57, after: 87 },
  ],
};
