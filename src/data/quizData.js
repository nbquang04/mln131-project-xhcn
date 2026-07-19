import { ADDITIONAL_QUIZ_SETS } from './quizSets.js'

const BASE_QUIZ_TOPICS = [
  {
    id: 'co-so-ly-luan',
    title: 'Cơ sở lý luận',
    description: 'Marx – Engels, Cách mạng Tháng Mười và thành lập Đảng Cộng sản Việt Nam.',
    questions: [
      {
        id: 'q1',
        question: 'Cuốn "Tuyên ngôn của Đảng Cộng sản" được xuất bản năm nào?',
        options: [
          { id: 'a', label: '1848', correct: true },
          { id: 'b', label: '1789', correct: false },
          { id: 'c', label: '1917', correct: false },
          { id: 'd', label: '1930', correct: false },
        ],
      },
      {
        id: 'q2',
        question: 'Ai là tác giả của "Tuyên ngôn của Đảng Cộng sản"?',
        options: [
          { id: 'a', label: 'V.I. Lênin', correct: false },
          { id: 'b', label: 'Hồ Chí Minh', correct: false },
          { id: 'c', label: 'Karl Marx và Friedrich Engels', correct: true },
          { id: 'd', label: 'Lê Duẩn', correct: false },
        ],
      },
      {
        id: 'q3',
        question: 'Cách mạng Tháng Mười Nga (1917) có ý nghĩa gì với lịch sử thế giới?',
        options: [
          { id: 'a', label: 'Lật đổ chế độ phong kiến ở Pháp', correct: false },
          { id: 'b', label: 'Thành lập Liên hợp quốc', correct: false },
          { id: 'c', label: 'Kết thúc Chiến tranh thế giới thứ nhất', correct: false },
          { id: 'd', label: 'Lần đầu tiên thiết lập nhà nước xã hội chủ nghĩa', correct: true },
        ],
      },
      {
        id: 'q4',
        question: 'Hội nghị thành lập Đảng Cộng sản Việt Nam diễn ra ở đâu?',
        options: [
          { id: 'a', label: 'Hồng Kông', correct: true },
          { id: 'b', label: 'Mát-xcơ-va', correct: false },
          { id: 'c', label: 'Quảng Châu', correct: false },
          { id: 'd', label: 'Hà Nội', correct: false },
        ],
      },
    ],
  },
  {
    id: 'doc-lap-dan-toc',
    title: 'Độc lập dân tộc',
    description: 'Thống nhất Đảng, Tuyên ngôn Độc lập, chiến thắng Điện Biên Phủ và ngày thống nhất đất nước.',
    questions: [
      {
        id: 'q5',
        question: 'Năm 1930, mấy tổ chức cộng sản được thống nhất thành Đảng Cộng sản Việt Nam?',
        options: [
          { id: 'a', label: 'Hai tổ chức', correct: false },
          { id: 'b', label: 'Bốn tổ chức', correct: false },
          { id: 'c', label: 'Ba tổ chức', correct: true },
          { id: 'd', label: 'Năm tổ chức', correct: false },
        ],
      },
      {
        id: 'q6',
        question: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập vào ngày nào?',
        options: [
          { id: 'a', label: '19 tháng 5', correct: false },
          { id: 'b', label: '30 tháng 4 năm 1975', correct: false },
          { id: 'c', label: '7 tháng 5 năm 1954', correct: false },
          { id: 'd', label: '2 tháng 9 năm 1945', correct: true },
        ],
      },
      {
        id: 'q7',
        question: 'Chiến thắng Điện Biên Phủ (1954) có ý nghĩa gì?',
        options: [
          { id: 'a', label: 'Kết thúc kháng chiến chống thực dân Pháp', correct: true },
          { id: 'b', label: 'Thống nhất đất nước', correct: false },
          { id: 'c', label: 'Bắt đầu công cuộc Đổi mới', correct: false },
          { id: 'd', label: 'Gia nhập ASEAN', correct: false },
        ],
      },
      {
        id: 'q8',
        question: 'Ngày giải phóng miền Nam, thống nhất đất nước là ngày nào?',
        options: [
          { id: 'a', label: '2 tháng 9/1945', correct: false },
          { id: 'b', label: '3 tháng 2/1930', correct: false },
          { id: 'c', label: '30 tháng 4/1975', correct: true },
          { id: 'd', label: '6 tháng 12/1986', correct: false },
        ],
      },
    ],
  },
  {
    id: 'doi-moi-phat-trien',
    title: 'Đổi mới và phát triển',
    description: 'Công cuộc Đổi mới, kinh tế thị trường định hướng xã hội chủ nghĩa và tầm nhìn phát triển đất nước.',
    questions: [
      {
        id: 'q9',
        question: 'Đại hội VI (1986) khởi xướng công cuộc gì?',
        options: [
          { id: 'a', label: 'Kháng chiến chống Mỹ', correct: false },
          { id: 'b', label: 'Cải cách ruộng đất', correct: false },
          { id: 'c', label: 'Xây dựng nhà máy thủy điện', correct: false },
          { id: 'd', label: 'Đổi mới (Đổi Mới)', correct: true },
        ],
      },
      {
        id: 'q10',
        question: 'Khái niệm "kinh tế thị trường định hướng xã hội chủ nghĩa" được làm rõ tại Đại hội nào?',
        options: [
          { id: 'a', label: 'Đại hội VII (1991)', correct: true },
          { id: 'b', label: 'Đại hội V (1982)', correct: false },
          { id: 'c', label: 'Đại hội IX (2001)', correct: false },
          { id: 'd', label: 'Đại hội XI (2011)', correct: false },
        ],
      },
      {
        id: 'q11',
        question: 'Cương lĩnh bổ sung năm 2011 đặt mục tiêu nào sau đây?',
        options: [
          { id: 'a', label: 'Tư bản hóa hoàn toàn nền kinh tế', correct: false },
          { id: 'b', label: 'Dân giàu, nước mạnh, dân chủ, công bằng, văn minh', correct: true },
          { id: 'c', label: 'Quay lại kế hoạch hóa tập trung', correct: false },
          { id: 'd', label: 'Thu hẹp hội nhập quốc tế', correct: false },
        ],
      },
      {
        id: 'q12',
        question: 'Đại hội XIII (2021) đặt tầm nhìn phát triển đất nước đến năm nào?',
        options: [
          { id: 'a', label: '2030', correct: false },
          { id: 'b', label: '2050', correct: false },
          { id: 'c', label: '2045', correct: true },
          { id: 'd', label: '2025', correct: false },
        ],
      },
    ],
  },
]

export const QUIZ_TOPICS = BASE_QUIZ_TOPICS.map((topic) => ({
  ...topic,
  questionSets: [
    { id: '01', questions: topic.questions },
    ...ADDITIONAL_QUIZ_SETS[topic.id],
  ],
}))

export const QUIZ_QUESTIONS = QUIZ_TOPICS.flatMap((topic) => topic.questions)

export const TOTAL_QUIZ_QUESTIONS = QUIZ_QUESTIONS.length

export function getTopicById(topicId) {
  return QUIZ_TOPICS.find((topic) => topic.id === topicId)
}

export function getQuestionSet(topic, setId) {
  return topic.questionSets.find((set) => set.id === setId) ?? topic.questionSets[0]
}
