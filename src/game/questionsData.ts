/**
 * ============================================================================
 * NGÂN HÀNG CÂU HỎI ÔN TẬP KHOA HỌC TỰ NHIÊN 8 - CHỦ ĐỀ MÁU VÀ HỆ TUẦN HOÀN
 * Giáo viên có thể dễ dàng thêm, sửa hoặc chỉnh nội dung câu hỏi tại file này.
 * Bám sát 100% nội dung kiến thức chuẩn trong Bảng III (Ôn tập giữa kì I).
 * ============================================================================
 */

export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'matching'
  | 'tube_drag'
  | 'table_fill'
  | 'blood_compatibility'
  | 'order_steps'
  | 'fill_blank';

export type CognitiveLevel = 'nhận biết' | 'thông hiểu' | 'vận dụng';

export interface BaseQuestion {
  id: string;
  stageId: number; // 1, 2, 3, 4
  stageTitle: string;
  type: QuestionType;
  title: string;
  prompt: string;
  explanation: string; // Trích từ nội dung mục I
  cognitiveLevel: CognitiveLevel;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  options: { id: string; text: string }[];
  correctOptionId: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true_false';
  isCorrect: boolean; // true = Đúng, false = Sai
  statement: string;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  pairs: {
    id: string;
    left: string;
    right: string;
  }[];
}

export interface TubeDragQuestion extends BaseQuestion {
  type: 'tube_drag';
  items: {
    id: string;
    name: string;
    targetZone: 'upper' | 'lower'; // upper = Huyết tương (90% nước), lower = Các tế bào máu
    hint: string;
  }[];
}

export interface TableFillQuestion extends BaseQuestion {
  type: 'table_fill';
  rows: {
    bloodGroup: 'A' | 'B' | 'AB' | 'O';
    correctAntigens: string; // ví dụ: "KN A", "Không có KN A và KN B"
    correctAntibodies: string; // ví dụ: "KT β", "Không có KT"
  }[];
}

export interface BloodCompatibilityQuestion extends BaseQuestion {
  type: 'blood_compatibility';
  donorGroup: 'A' | 'B' | 'AB' | 'O';
  recipientGroup: 'A' | 'B' | 'AB' | 'O';
  willAgglutinate: boolean; // có kết dính hồng cầu hay không
  options: { id: string; text: string }[];
  correctOptionId: string;
}

export interface OrderStepsQuestion extends BaseQuestion {
  type: 'order_steps';
  steps: {
    id: string;
    text: string;
    correctOrder: number; // 1, 2, 3, 4
  }[];
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill_blank';
  sentenceParts: [string, string]; // trước và sau chỗ trống
  wordBank: string[]; // các từ để học sinh chọn hoặc gõ
  correctWord: string;
}

export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | MatchingQuestion
  | TubeDragQuestion
  | TableFillQuestion
  | BloodCompatibilityQuestion
  | OrderStepsQuestion
  | FillBlankQuestion;

export interface StageInfo {
  id: number;
  title: string;
  subtitle: string;
  iconName: string;
  badge: string;
  color: string;
}

export const STAGES_INFO: StageInfo[] = [
  {
    id: 1,
    title: 'Thám hiểm dòng máu',
    subtitle: 'Thành phần và chức năng của máu',
    iconName: 'Droplet',
    badge: 'Màn 1',
    color: 'from-rose-500 to-red-600'
  },
  {
    id: 2,
    title: 'Phòng xét nghiệm nhóm máu',
    subtitle: 'Hệ nhóm máu ABO & tương thích',
    iconName: 'Microscope',
    badge: 'Màn 2',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 3,
    title: 'Ngân hàng máu an toàn',
    subtitle: 'Nguyên tắc truyền máu cứu người',
    iconName: 'HeartHandshake',
    badge: 'Màn 3',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 4,
    title: 'Lá chắn miễn dịch',
    subtitle: 'Kháng nguyên, kháng thể & vaccine',
    iconName: 'ShieldCheck',
    badge: 'Màn 4',
    color: 'from-blue-500 to-indigo-600'
  }
];

export const QUESTIONS_DATA: Question[] = [
  // =========================================================================
  // MÀN 1: THÁM HIỂM DÒNG MÁU (Thành phần và chức năng của máu) - 9 câu
  // =========================================================================
  {
    id: 'm1_q1',
    stageId: 1,
    stageTitle: 'Thám hiểm dòng máu',
    type: 'multiple_choice',
    cognitiveLevel: 'nhận biết',
    title: 'Thành phần của máu',
    prompt: 'Máu ở cơ thể người gồm những thành phần cơ bản nào?',
    options: [
      { id: 'opt1', text: 'Huyết tương và các tế bào máu (hồng cầu, bạch cầu, tiểu cầu)' },
      { id: 'opt2', text: 'Hồng cầu và nước' },
      { id: 'opt3', text: 'Bạch cầu và tiểu cầu' },
      { id: 'opt4', text: 'Huyết tương và chất dinh dưỡng' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Máu gồm huyết tương và các tế bào máu (hồng cầu, bạch cầu, tiểu cầu).'
  },
  {
    id: 'm1_q2',
    stageId: 1,
    stageTitle: 'Thám hiểm dòng máu',
    type: 'fill_blank',
    cognitiveLevel: 'nhận biết',
    title: 'Thành phần nước trong huyết tương',
    prompt: 'Chọn tỉ lệ nước chính xác có trong huyết tương:',
    sentenceParts: ['Huyết tương của máu người có khoảng ', ' là nước.'],
    wordBank: ['90%', '70%', '50%', '30%'],
    correctWord: '90%',
    explanation: 'Huyết tương: khoảng 90% là nước; vận chuyển chất dinh dưỡng, hormone, chất thải và nhiều chất khác.'
  },
  {
    id: 'm1_q3',
    stageId: 1,
    stageTitle: 'Thám hiểm dòng máu',
    type: 'multiple_choice',
    cognitiveLevel: 'nhận biết',
    title: 'Chức năng của hồng cầu',
    prompt: 'Chức năng chính của hồng cầu trong máu là gì?',
    options: [
      { id: 'opt1', text: 'Vận chuyển oxygen và một phần carbon dioxide' },
      { id: 'opt2', text: 'Bảo vệ cơ thể, chống lại các tác nhân gây bệnh' },
      { id: 'opt3', text: 'Tham gia quá trình đông máu' },
      { id: 'opt4', text: 'Vận chuyển chất dinh dưỡng và hormone' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Hồng cầu: vận chuyển oxygen và một phần carbon dioxide.'
  },
  {
    id: 'm1_q4',
    stageId: 1,
    stageTitle: 'Thám hiểm dòng máu',
    type: 'matching',
    cognitiveLevel: 'thông hiểu',
    title: 'Ghép nối thành phần máu và chức năng',
    prompt: 'Hãy nối mỗi thành phần của máu với chức năng tương ứng:',
    pairs: [
      { id: 'p1', left: 'Huyết tương', right: 'Vận chuyển chất dinh dưỡng, hormone, chất thải và nhiều chất khác (khoảng 90% là nước)' },
      { id: 'p2', left: 'Hồng cầu', right: 'Vận chuyển oxygen và một phần carbon dioxide' },
      { id: 'p3', left: 'Bạch cầu', right: 'Bảo vệ cơ thể, chống lại các tác nhân gây bệnh' },
      { id: 'p4', left: 'Tiểu cầu', right: 'Tham gia quá trình đông máu, giúp hạn chế mất máu khi mạch máu bị tổn thương' }
    ],
    explanation: 'Huyết tương: 90% nước, vận chuyển chất dinh dưỡng, hormone, chất thải; Hồng cầu: vận chuyển oxygen & một phần carbon dioxide; Bạch cầu: bảo vệ cơ thể; Tiểu cầu: tham gia đông máu.'
  },
  {
    id: 'm1_q5',
    stageId: 1,
    stageTitle: 'Thám hiểm dòng máu',
    type: 'tube_drag',
    cognitiveLevel: 'thông hiểu',
    title: 'Phân tầng ống nghiệm máu đã tách lớp',
    prompt: 'Kéo/chọn các thành phần máu đặt vào đúng tầng tương ứng trong ống nghiệm sau khi lắng tách lớp:',
    items: [
      { id: 'it1', name: 'Huyết tương (chứa ~90% nước, chất dinh dưỡng, hormone, chất thải)', targetZone: 'upper', hint: 'Chất lỏng màu vàng nhạt ở tầng trên' },
      { id: 'it2', name: 'Hồng cầu (vận chuyển oxygen và carbon dioxide)', targetZone: 'lower', hint: 'Tế bào máu lắng xuống tầng dưới màu đỏ' },
      { id: 'it3', name: 'Bạch cầu (bảo vệ cơ thể)', targetZone: 'lower', hint: 'Tế bào máu thuộc tầng dưới' },
      { id: 'it4', name: 'Tiểu cầu (tham gia đông máu)', targetZone: 'lower', hint: 'Tế bào máu thuộc tầng dưới' }
    ],
    explanation: 'Khi tách lớp máu, huyết tương (chất lỏng chiếm tỉ lệ lớn, 90% là nước) nổi ở tầng trên; các tế bào máu (hồng cầu, bạch cầu, tiểu cầu) tập trung ở tầng dưới.'
  },
  {
    id: 'm1_q6',
    stageId: 1,
    stageTitle: 'Thám hiểm dòng máu',
    type: 'multiple_choice',
    cognitiveLevel: 'thông hiểu',
    title: 'Cơ chế đông máu',
    prompt: 'Khi bị một vết cắt nhỏ ở ngón tay làm rách mao mạch, sau một lúc máu ngừng chảy là nhờ hoạt động chủ yếu của thành phần nào?',
    options: [
      { id: 'opt1', text: 'Tiểu cầu tham gia quá trình đông máu, giúp hạn chế mất máu' },
      { id: 'opt2', text: 'Bạch cầu tiêu diệt vi khuẩn gây bệnh' },
      { id: 'opt3', text: 'Hồng cầu tăng cường vận chuyển oxygen' },
      { id: 'opt4', text: 'Huyết tương bốc hơi nước tạo thành màng bọc' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Tiểu cầu: tham gia quá trình đông máu, giúp hạn chế mất máu khi mạch máu bị tổn thương.'
  },
  {
    id: 'm1_q7',
    stageId: 1,
    stageTitle: 'Thám hiểm dòng máu',
    type: 'true_false',
    cognitiveLevel: 'nhận biết',
    title: 'Đúng hay Sai về bạch cầu',
    prompt: 'Đọc nhận định sau và xác định Đúng hay Sai:',
    statement: 'Bạch cầu có chức năng bảo vệ cơ thể, chống lại các tác nhân gây bệnh.',
    isCorrect: true,
    explanation: 'Bạch cầu: bảo vệ cơ thể, chống lại các tác nhân gây bệnh.'
  },
  {
    id: 'm1_q8',
    stageId: 1,
    stageTitle: 'Thám hiểm dòng máu',
    type: 'multiple_choice',
    cognitiveLevel: 'vận dụng',
    title: 'Tình huống: Vận động thể thao',
    prompt: 'Khi bạn chạy bộ nhanh trong giờ thể dục, các tế bào cơ bắp cần nhiều khí oxygen hơn để sinh năng lượng. Loại tế bào máu nào tăng cường vận chuyển oxygen đến các cơ bắp?',
    options: [
      { id: 'opt1', text: 'Hồng cầu' },
      { id: 'opt2', text: 'Bạch cầu' },
      { id: 'opt3', text: 'Tiểu cầu' },
      { id: 'opt4', text: 'Huyết tương' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Hồng cầu: vận chuyển oxygen và một phần carbon dioxide cho mọi tế bào trong cơ thể.'
  },
  {
    id: 'm1_q9',
    stageId: 1,
    stageTitle: 'Thám hiểm dòng máu',
    type: 'true_false',
    cognitiveLevel: 'thông hiểu',
    title: 'Đúng hay Sai về huyết tương',
    prompt: 'Đọc nhận định sau và xác định Đúng hay Sai:',
    statement: 'Huyết tương chỉ chứa nước tinh khiết, không có khả năng vận chuyển chất dinh dưỡng hay hormone.',
    isCorrect: false,
    explanation: 'Huyết tương: khoảng 90% là nước; vận chuyển chất dinh dưỡng, hormone, chất thải và nhiều chất khác.'
  },

  // =========================================================================
  // MÀN 2: PHÒNG XÉT NGHIỆM NHÓM MÁU (Hệ ABO & Tương thích) - 9 câu
  // =========================================================================
  {
    id: 'm2_q1',
    stageId: 2,
    stageTitle: 'Phòng xét nghiệm nhóm máu',
    type: 'multiple_choice',
    cognitiveLevel: 'nhận biết',
    title: 'Số nhóm máu chính hệ ABO',
    prompt: 'Hệ ABO ở người có bao nhiêu nhóm máu chính?',
    options: [
      { id: 'opt1', text: 'Có 4 nhóm máu chính: A, B, AB và O' },
      { id: 'opt2', text: 'Có 2 nhóm máu: A và B' },
      { id: 'opt3', text: 'Có 3 nhóm máu: A, B, O' },
      { id: 'opt4', text: 'Có 5 nhóm máu: A, B, C, AB, O' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Hệ ABO có 4 nhóm máu chính là A, B, AB và O.'
  },
  {
    id: 'm2_q2',
    stageId: 2,
    stageTitle: 'Phòng xét nghiệm nhóm máu',
    type: 'multiple_choice',
    cognitiveLevel: 'nhận biết',
    title: 'Vị trí của Kháng nguyên và Kháng thể',
    prompt: 'Theo hệ ABO, kháng nguyên (KN) và kháng thể (KT) phân bố ở đâu trong máu?',
    options: [
      { id: 'opt1', text: 'Kháng nguyên (KN A, KN B) ở trên hồng cầu; Kháng thể (α, β) ở trong huyết tương' },
      { id: 'opt2', text: 'Kháng nguyên ở trong huyết tương; Kháng thể ở trên hồng cầu' },
      { id: 'opt3', text: 'Cả kháng nguyên và kháng thể đều nằm trên màng tế bào bạch cầu' },
      { id: 'opt4', text: 'Kháng thể ở trong tiểu cầu; Kháng nguyên ở trong huyết tương' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Có 2 loại kháng nguyên (KN) ở trên hồng cầu là KN A và B; Có 2 loại kháng thể (KT) trong huyết tương là α và β.'
  },
  {
    id: 'm2_q3',
    stageId: 2,
    stageTitle: 'Phòng xét nghiệm nhóm máu',
    type: 'table_fill',
    cognitiveLevel: 'thông hiểu',
    title: 'Bảng đặc điểm 4 nhóm máu hệ ABO',
    prompt: 'Điền hoặc chọn đúng kháng nguyên (KN) và kháng thể (KT) cho từng nhóm máu:',
    rows: [
      { bloodGroup: 'A', correctAntigens: 'KN A', correctAntibodies: 'KT β' },
      { bloodGroup: 'B', correctAntigens: 'KN B', correctAntibodies: 'KT α' },
      { bloodGroup: 'AB', correctAntigens: 'Cả KN A và KN B', correctAntibodies: 'Không có KT' },
      { bloodGroup: 'O', correctAntigens: 'Không có KN A và KN B', correctAntibodies: 'Cả KT α và KT β' }
    ],
    explanation: 'Nhóm A có KN A, KT β; Nhóm B có KN B, KT α; Nhóm AB có cả KN A và B, không có KT; Nhóm O không có KN A và B, có cả KT α và β.'
  },
  {
    id: 'm2_q4',
    stageId: 2,
    stageTitle: 'Phòng xét nghiệm nhóm máu',
    type: 'multiple_choice',
    cognitiveLevel: 'thông hiểu',
    title: 'Quy luật gây kết dính hồng cầu',
    prompt: 'Hiện tượng kết dính hồng cầu xảy ra khi nào?',
    options: [
      { id: 'opt1', text: 'Kháng nguyên A gây kết dính Kháng thể α; Kháng nguyên B gây kết dính Kháng thể β' },
      { id: 'opt2', text: 'Kháng nguyên A gây kết dính Kháng thể β' },
      { id: 'opt3', text: 'Kháng nguyên B gây kết dính Kháng thể α' },
      { id: 'opt4', text: 'Kháng thể α và β tự kết dính với nhau trong huyết tương' }
    ],
    correctOptionId: 'opt1',
    explanation: 'KN A gây kết dính KT α, KN B gây kết dính KT β.'
  },
  {
    id: 'm2_q5',
    stageId: 2,
    stageTitle: 'Phòng xét nghiệm nhóm máu',
    type: 'multiple_choice',
    cognitiveLevel: 'nhận biết',
    title: 'Nhóm máu chuyên cho',
    prompt: 'Vì sao nhóm máu O được gọi là nhóm máu "chuyên cho" (có thể truyền cho tất cả các nhóm máu khác)?',
    options: [
      { id: 'opt1', text: 'Vì hồng cầu nhóm máu O không có kháng nguyên A và B, nên không bị kháng thể người nhận kết dính' },
      { id: 'opt2', text: 'Vì huyết tương nhóm máu O không có kháng thể' },
      { id: 'opt3', text: 'Vì nhóm máu O có chứa cả kháng nguyên A và kháng nguyên B' },
      { id: 'opt4', text: 'Vì nhóm máu O có lượng hồng cầu nhiều nhất' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Nhóm máu O không có KN A và B nên có thể truyền cho tất cả các nhóm máu khác (gọi là nhóm máu chuyên cho).'
  },
  {
    id: 'm2_q6',
    stageId: 2,
    stageTitle: 'Phòng xét nghiệm nhóm máu',
    type: 'multiple_choice',
    cognitiveLevel: 'nhận biết',
    title: 'Nhóm máu chuyên nhận',
    prompt: 'Vì sao nhóm máu AB được gọi là nhóm máu "chuyên nhận" (có thể nhận máu từ tất cả các nhóm máu khác)?',
    options: [
      { id: 'opt1', text: 'Vì nhóm máu AB không có kháng thể (α và β) trong huyết tương, nên không làm kết dính hồng cầu người cho' },
      { id: 'opt2', text: 'Vì nhóm máu AB không có kháng nguyên trên hồng cầu' },
      { id: 'opt3', text: 'Vì nhóm máu AB có nhiều tiểu cầu nhất' },
      { id: 'opt4', text: 'Vì nhóm máu AB có khả năng tạo ra mọi kháng thể' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Nhóm máu AB không có KT trong huyết tương nên có thể nhận máu từ các nhóm máu khác (gọi là nhóm máu chuyên nhận).'
  },
  {
    id: 'm2_q7',
    stageId: 2,
    stageTitle: 'Phòng xét nghiệm nhóm máu',
    type: 'blood_compatibility',
    cognitiveLevel: 'vận dụng',
    title: 'Mô phỏng xét nghiệm: Người cho nhóm A truyền cho người nhận nhóm B',
    prompt: 'Xét tình huống: Người cho có nhóm máu A, người nhận có nhóm máu B. Hiện tượng gì sẽ xảy ra và giải thích vì sao?',
    donorGroup: 'A',
    recipientGroup: 'B',
    willAgglutinate: true,
    options: [
      { id: 'opt1', text: 'Xảy ra kết dính hồng cầu: KN A của người cho bị kết dính bởi KT α của người nhận (Không thể truyền)' },
      { id: 'opt2', text: 'Không xảy ra kết dính, truyền an toàn vì khác nhóm' },
      { id: 'opt3', text: 'Xảy ra kết dính do KN B gặp KT β' },
      { id: 'opt4', text: 'Chỉ tiểu cầu bị đông tụ, hồng cầu vẫn bình thường' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Người cho nhóm A có KN A trên hồng cầu, người nhận nhóm B có KT α trong huyết tương. Khi truyền máu cần quan tâm KN của người cho và KT của người nhận. Do đó KN A sẽ bị KT α gây kết dính hồng cầu nguy hiểm!'
  },
  {
    id: 'm2_q8',
    stageId: 2,
    stageTitle: 'Phòng xét nghiệm nhóm máu',
    type: 'blood_compatibility',
    cognitiveLevel: 'vận dụng',
    title: 'Mô phỏng xét nghiệm: Người cho nhóm O truyền cho người nhận nhóm AB',
    prompt: 'Xét tình huống: Người cho có nhóm máu O, người nhận có nhóm máu AB. Có truyền được không và vì sao?',
    donorGroup: 'O',
    recipientGroup: 'AB',
    willAgglutinate: false,
    options: [
      { id: 'opt1', text: 'Truyền được an toàn: Hồng cầu người cho nhóm O không có KN A và B, người nhận nhóm AB không có KT' },
      { id: 'opt2', text: 'Không truyền được vì khác nhóm máu' },
      { id: 'opt3', text: 'Xảy ra kết dính hồng cầu do có KT α' },
      { id: 'opt4', text: 'Chỉ truyền được khi người nhận là nhóm O' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Nhóm máu O không có KN A và B trên hồng cầu (chuyên cho), còn nhóm AB không có KT trong huyết tương (chuyên nhận). Do đó không xảy ra kết dính hồng cầu.'
  },
  {
    id: 'm2_q9',
    stageId: 2,
    stageTitle: 'Phòng xét nghiệm nhóm máu',
    type: 'true_false',
    cognitiveLevel: 'thông hiểu',
    title: 'Đúng hay Sai: Quy tắc quan tâm khi truyền máu',
    prompt: 'Đọc nhận định sau và xác định Đúng hay Sai:',
    statement: 'Khi truyền máu, điều quan trọng nhất cần quan tâm là kháng thể của người cho và kháng nguyên của người nhận.',
    isCorrect: false,
    explanation: 'Sai! Khi truyền máu cần quan tâm đến KN của người cho và KT của người nhận.'
  },

  // =========================================================================
  // MÀN 3: NGÂN HÀNG MÁU AN TOÀN (Nguyên tắc truyền máu) - 9 câu
  // =========================================================================
  {
    id: 'm3_q1',
    stageId: 3,
    stageTitle: 'Ngân hàng máu an toàn',
    type: 'order_steps',
    cognitiveLevel: 'thông hiểu',
    title: 'Sắp xếp quy trình truyền máu an toàn',
    prompt: 'Hãy sắp xếp các bước/nguyên tắc truyền máu sau theo thứ tự hợp lí và chuẩn xác nhất:',
    steps: [
      { id: 'st1', text: '1. Xác định nhóm máu của người cho và người nhận trước khi truyền', correctOrder: 1 },
      { id: 'st2', text: '2. Ưu tiên truyền máu cùng nhóm; nếu truyền khác nhóm phải tuân thủ quy trình chuyên môn và xét nghiệm tương hợp theo quy định', correctOrder: 2 },
      { id: 'st3', text: '3. Kiểm tra đảm bảo máu truyền không có mầm bệnh và phù hợp với người nhận', correctOrder: 3 },
      { id: 'st4', text: '4. Thực hiện truyền máu đảm bảo không để xảy ra sự kết dính hồng cầu do phản ứng kháng nguyên – kháng thể', correctOrder: 4 }
    ],
    explanation: 'Quy trình truyền máu: (1) Xác định nhóm máu người cho và người nhận; (2) Ưu tiên truyền cùng nhóm / tuân thủ xét nghiệm tương hợp; (3) Đảm bảo máu không có mầm bệnh và phù hợp; (4) Không để xảy ra kết dính hồng cầu.'
  },
  {
    id: 'm3_q2',
    stageId: 3,
    stageTitle: 'Ngân hàng máu an toàn',
    type: 'multiple_choice',
    cognitiveLevel: 'nhận biết',
    title: 'Nguyên tắc ưu tiên số 1 khi truyền máu',
    prompt: 'Khi thực hiện truyền máu cho người bệnh, ưu tiên hàng đầu là gì?',
    options: [
      { id: 'opt1', text: 'Ưu tiên truyền máu cùng nhóm' },
      { id: 'opt2', text: 'Luôn luôn truyền nhóm máu O cho mọi người' },
      { id: 'opt3', text: 'Truyền nhóm máu AB cho mọi người' },
      { id: 'opt4', text: 'Truyền bất kì nhóm máu nào có sẵn' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Ưu tiên truyền máu cùng nhóm; khi cần truyền khác nhóm phải tuân thủ quy trình chuyên môn và xét nghiệm tương hợp theo quy định.'
  },
  {
    id: 'm3_q3',
    stageId: 3,
    stageTitle: 'Ngân hàng máu an toàn',
    type: 'multiple_choice',
    cognitiveLevel: 'nhận biết',
    title: 'Yêu cầu về an toàn vệ sinh dịch tễ của máu truyền',
    prompt: 'Để đảm bảo an toàn tính mạng cho người nhận máu, túi máu truyền bắt buộc phải đạt tiêu chuẩn nào?',
    options: [
      { id: 'opt1', text: 'Đảm bảo máu truyền không có mầm bệnh và phù hợp với người nhận' },
      { id: 'opt2', text: 'Chỉ cần cùng nhóm máu, có mầm bệnh nhẹ vẫn truyền được' },
      { id: 'opt3', text: 'Máu đã để lâu ngày không cần bảo quản lạnh' },
      { id: 'opt4', text: 'Chỉ cần lọc bỏ bạch cầu' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Đảm bảo máu truyền không có mầm bệnh và phù hợp với người nhận.'
  },
  {
    id: 'm3_q4',
    stageId: 3,
    stageTitle: 'Ngân hàng máu an toàn',
    type: 'true_false',
    cognitiveLevel: 'nhận biết',
    title: 'Tránh kết dính hồng cầu',
    prompt: 'Đọc nhận định sau và xác định Đúng hay Sai:',
    statement: 'Một trong các nguyên tắc sống còn khi truyền máu là không để xảy ra sự kết dính hồng cầu do phản ứng kháng nguyên – kháng thể.',
    isCorrect: true,
    explanation: 'Đúng! Nguyên tắc truyền máu: Không để xảy ra sự kết dính hồng cầu do phản ứng kháng nguyên – kháng thể.'
  },
  {
    id: 'm3_q5',
    stageId: 3,
    stageTitle: 'Ngân hàng máu an toàn',
    type: 'vận dụng',
    type: 'multiple_choice',
    cognitiveLevel: 'vận dụng',
    title: 'Tình huống cấp cứu: Bệnh nhân mất máu nhóm B',
    prompt: 'Một bệnh nhân bị tai nạn mất nhiều máu và được xác định có nhóm máu B. Tại bệnh viện, bác sĩ ưu tiên truyền nhóm máu nào cho bệnh nhân này?',
    options: [
      { id: 'opt1', text: 'Ưu tiên truyền nhóm máu B (cùng nhóm)' },
      { id: 'opt2', text: 'Ưu tiên truyền nhóm máu A' },
      { id: 'opt3', text: 'Ưu tiên truyền nhóm máu AB' },
      { id: 'opt4', text: 'Truyền nhóm máu nào cũng được' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Ưu tiên truyền máu cùng nhóm (bệnh nhân nhóm B thì ưu tiên truyền nhóm B); khi cần truyền khác nhóm phải tuân thủ quy trình chuyên môn và xét nghiệm tương hợp theo quy định.'
  },
  {
    id: 'm3_q6',
    stageId: 3,
    stageTitle: 'Ngân hàng máu an toàn',
    type: 'vận dụng',
    type: 'multiple_choice',
    cognitiveLevel: 'vận dụng',
    title: 'Tình huống khan hiếm máu: Bệnh nhân nhóm B nhận nhóm O',
    prompt: 'Trong tình huống khẩn cấp, bệnh viện hết máu nhóm B nhưng còn nhóm máu O đã qua kiểm dịch an toàn. Bác sĩ có thể cân nhắc truyền máu nhóm O cho bệnh nhân nhóm B này không? Vì sao?',
    options: [
      { id: 'opt1', text: 'Có thể, vì nhóm O không có KN A và B nên không bị KT α của người nhận kết dính, nhưng phải tuân thủ quy trình chuyên môn và xét nghiệm tương hợp' },
      { id: 'opt2', text: 'Tuyệt đối không bao giờ được truyền vì khác nhóm máu' },
      { id: 'opt3', text: 'Có thể truyền không giới hạn mà không cần xét nghiệm tương hợp' },
      { id: 'opt4', text: 'Chỉ truyền được nếu bệnh nhân là nhóm máu AB' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Khi cần truyền khác nhóm phải tuân thủ quy trình chuyên môn và xét nghiệm tương hợp theo quy định. Nhóm O không có KN A và B nên có thể truyền cho các nhóm khác khi khẩn cấp.'
  },
  {
    id: 'm3_q7',
    stageId: 3,
    stageTitle: 'Ngân hàng máu an toàn',
    type: 'true_false',
    cognitiveLevel: 'thông hiểu',
    title: 'Đúng hay Sai: Quy trình truyền máu khác nhóm',
    prompt: 'Đọc nhận định sau và xác định Đúng hay Sai:',
    statement: 'Khi cần truyền máu khác nhóm, có thể truyền ngay lập tức mà không cần tuân thủ quy trình chuyên môn hay xét nghiệm tương hợp.',
    isCorrect: false,
    explanation: 'Sai! Khi cần truyền khác nhóm phải tuân thủ quy trình chuyên môn và xét nghiệm tương hợp theo quy định.'
  },
  {
    id: 'm3_q8',
    stageId: 3,
    stageTitle: 'Ngân hàng máu an toàn',
    type: 'fill_blank',
    cognitiveLevel: 'thông hiểu',
    title: 'Điền từ: Nguyên tắc truyền máu',
    prompt: 'Chọn từ chính xác để hoàn thành nguyên tắc truyền máu:',
    sentenceParts: ['Cần xác định ', ' của người cho và người nhận trước khi truyền máu.'],
    wordBank: ['nhóm máu', 'chiều cao', 'cân nặng', 'huyết áp'],
    correctWord: 'nhóm máu',
    explanation: 'Xác định nhóm máu của người cho và người nhận trước khi truyền máu.'
  },
  {
    id: 'm3_q9',
    stageId: 3,
    stageTitle: 'Ngân hàng máu an toàn',
    type: 'multiple_choice',
    cognitiveLevel: 'vận dụng',
    title: 'Hậu quả của việc truyền nhầm nhóm máu',
    prompt: 'Nếu truyền nhầm máu người cho có KN A vào người nhận có KT α, hiện tượng kết dính hồng cầu sẽ dẫn đến hậu quả nghiêm trọng gì?',
    options: [
      { id: 'opt1', text: 'Các hồng cầu bị ngưng kết làm tắc nghẽn mạch máu, đe dọa trực tiếp tính mạng người nhận' },
      { id: 'opt2', text: 'Tăng cường oxy cho tim và não bộ' },
      { id: 'opt3', text: 'Giúp cơ thể người nhận tạo thêm nhiều kháng thể có lợi' },
      { id: 'opt4', text: 'Không gây ảnh hưởng gì đến tuần hoàn máu' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Không để xảy ra sự kết dính hồng cầu do phản ứng kháng nguyên – kháng thể, vì kết dính hồng cầu sẽ làm vón cục, tắc mạch và gây tử vong.'
  },

  // =========================================================================
  // MÀN 4: LÁ CHẮN MIỄN DỊCH (Miễn dịch và vaccine) - 9 câu
  // =========================================================================
  {
    id: 'm4_q1',
    stageId: 4,
    stageTitle: 'Lá chắn miễn dịch',
    type: 'multiple_choice',
    cognitiveLevel: 'nhận biết',
    title: 'Khái niệm Miễn dịch',
    prompt: 'Miễn dịch của cơ thể là gì?',
    options: [
      { id: 'opt1', text: 'Khả năng cơ thể nhận biết, chống lại và loại bỏ các tác nhân gây bệnh hoặc các yếu tố lạ' },
      { id: 'opt2', text: 'Khả năng vận chuyển chất dinh dưỡng của huyết tương' },
      { id: 'opt3', text: 'Hiện tượng hồng cầu bị kết dính khi truyền máu' },
      { id: 'opt4', text: 'Quá trình đông máu của tiểu cầu khi bị thương' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Miễn dịch: khả năng cơ thể nhận biết, chống lại và loại bỏ các tác nhân gây bệnh hoặc các yếu tố lạ.'
  },
  {
    id: 'm4_q2',
    stageId: 4,
    stageTitle: 'Lá chắn miễn dịch',
    type: 'multiple_choice',
    cognitiveLevel: 'nhận biết',
    title: 'Khái niệm Kháng nguyên',
    prompt: 'Kháng nguyên là gì?',
    options: [
      { id: 'opt1', text: 'Chất có khả năng kích hoạt cơ thể tạo ra kháng thể để chống lại kháng nguyên' },
      { id: 'opt2', text: 'Protein do tế bào plasma tạo ra để tiêu diệt vi khuẩn' },
      { id: 'opt3', text: 'Một loại hormone do huyết tương vận chuyển' },
      { id: 'opt4', text: 'Thành phần nước chiếm 90% trong huyết tương' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Kháng nguyên: chất có khả năng kích hoạt cơ thể tạo ra kháng thể để chống lại kháng nguyên.'
  },
  {
    id: 'm4_q3',
    stageId: 4,
    stageTitle: 'Lá chắn miễn dịch',
    type: 'multiple_choice',
    cognitiveLevel: 'thông hiểu',
    title: 'Nguồn gốc và bản chất của Kháng thể',
    prompt: 'Kháng thể có bản chất hóa học là gì và do loại tế bào nào tạo ra?',
    options: [
      { id: 'opt1', text: 'Protein đặc hiệu do tế bào plasma (có nguồn gốc từ lympho B) tạo ra' },
      { id: 'opt2', text: 'Chất béo do tế bào hồng cầu tiết ra' },
      { id: 'opt3', text: 'Hormone do tuyến nội tiết tiết vào huyết tương' },
      { id: 'opt4', text: 'Carbohydrate do tiểu cầu tổng hợp khi đông máu' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Kháng thể: protein đặc hiệu do tế bào plasma (có nguồn gốc từ lympho B) tạo ra, có khả năng nhận biết và liên kết đặc hiệu với kháng nguyên tương ứng.'
  },
  {
    id: 'm4_q4',
    stageId: 4,
    stageTitle: 'Lá chắn miễn dịch',
    type: 'matching',
    cognitiveLevel: 'thông hiểu',
    title: 'Nối khái niệm miễn dịch với nội dung tương ứng',
    prompt: 'Hãy nối mỗi khái niệm sau với định nghĩa/nội dung tương ứng:',
    pairs: [
      { id: 'p1', left: 'Miễn dịch', right: 'Khả năng cơ thể nhận biết, chống lại và loại bỏ các tác nhân gây bệnh hoặc các yếu tố lạ' },
      { id: 'p2', left: 'Kháng nguyên', right: 'Chất có khả năng kích hoạt cơ thể tạo ra kháng thể để chống lại kháng nguyên' },
      { id: 'p3', left: 'Kháng thể', right: 'Protein đặc hiệu do tế bào plasma (nguồn gốc lympho B) tạo ra, nhận biết và liên kết đặc hiệu với kháng nguyên' },
      { id: 'p4', left: 'Tiêm vaccine', right: 'Đưa kháng nguyên đã bị suy yếu vào cơ thể để kích hoạt cơ thể tạo kháng thể phòng bệnh' }
    ],
    explanation: 'Miễn dịch: nhận biết & loại bỏ mầm bệnh; Kháng nguyên: kích hoạt tạo kháng thể; Kháng thể: protein đặc hiệu từ tế bào plasma; Tiêm vaccine: đưa kháng nguyên suy yếu vào cơ thể.'
  },
  {
    id: 'm4_q5',
    stageId: 4,
    stageTitle: 'Lá chắn miễn dịch',
    type: 'multiple_choice',
    cognitiveLevel: 'thông hiểu',
    title: 'Bản chất của việc tiêm vaccine',
    prompt: 'Bản chất sinh học của việc tiêm vaccine vào cơ thể là gì?',
    options: [
      { id: 'opt1', text: 'Đưa kháng nguyên đã bị suy yếu vào cơ thể để kích hoạt cơ thể tạo kháng thể, tạo đáp ứng miễn dịch đặc hiệu' },
      { id: 'opt2', text: 'Đưa trực tiếp lượng lớn kháng thể của người khác vào để chữa bệnh ngay lập tức' },
      { id: 'opt3', text: 'Đưa chất dinh dưỡng vào để nuôi hồng cầu và tiểu cầu' },
      { id: 'opt4', text: 'Đưa mầm bệnh còn nguyên độc lực mạnh để cơ thể làm quen' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Tiêm vaccine: đưa kháng nguyên đã bị suy yếu vào cơ thể để kích hoạt cơ thể tạo kháng thể, tạo đáp ứng miễn dịch đặc hiệu, góp phần phòng ngừa bệnh truyền nhiễm.'
  },
  {
    id: 'm4_q6',
    stageId: 4,
    stageTitle: 'Lá chắn miễn dịch',
    type: 'multiple_choice',
    cognitiveLevel: 'vận dụng',
    title: 'Tình huống đời sống: Tiêm vaccine phòng bệnh',
    prompt: 'Tại sao việc tiêm vaccine phòng sởi hoặc quai bị từ khi còn nhỏ lại giúp chúng ta không bị mắc hoặc giảm nguy cơ mắc bệnh nặng khi lớn lên?',
    options: [
      { id: 'opt1', text: 'Vì cơ thể đã được kích hoạt tạo kháng thể và ghi nhớ miễn dịch đặc hiệu chống lại mầm bệnh đó' },
      { id: 'opt2', text: 'Vì vaccine làm tăng 90% lượng nước trong huyết tương' },
      { id: 'opt3', text: 'Vì vaccine biến đổi nhóm máu của cơ thể thành nhóm máu O' },
      { id: 'opt4', text: 'Vì vaccine tiêu diệt hết tế bào hồng cầu cũ' }
    ],
    correctOptionId: 'opt1',
    explanation: 'Tiêm vaccine đưa kháng nguyên đã bị suy yếu vào cơ thể để kích hoạt tạo kháng thể, tạo đáp ứng miễn dịch đặc hiệu, góp phần phòng ngừa bệnh truyền nhiễm.'
  },
  {
    id: 'm4_q7',
    stageId: 4,
    stageTitle: 'Lá chắn miễn dịch',
    type: 'true_false',
    cognitiveLevel: 'nhận biết',
    title: 'Đúng hay Sai về tính đặc hiệu của kháng thể',
    prompt: 'Đọc nhận định sau và xác định Đúng hay Sai:',
    statement: 'Kháng thể có khả năng nhận biết và liên kết đặc hiệu với kháng nguyên tương ứng (như chìa khóa khớp với ổ khóa).',
    isCorrect: true,
    explanation: 'Đúng! Kháng thể: protein đặc hiệu do tế bào plasma (có nguồn gốc từ lympho B) tạo ra, có khả năng nhận biết và liên kết đặc hiệu với kháng nguyên tương ứng.'
  },
  {
    id: 'm4_q8',
    stageId: 4,
    stageTitle: 'Lá chắn miễn dịch',
    type: 'true_false',
    cognitiveLevel: 'thông hiểu',
    title: 'Đúng hay Sai về tác dụng của vaccine',
    prompt: 'Đọc nhận định sau và xác định Đúng hay Sai:',
    statement: 'Vaccine là thuốc chữa khỏi bệnh ngay lập tức khi người bệnh đang sốt cao hoặc phát bệnh nặng, không có tác dụng phòng ngừa.',
    isCorrect: false,
    explanation: 'Sai! Tiêm vaccine đưa kháng nguyên đã bị suy yếu vào cơ thể để kích hoạt tạo kháng thể, góp phần phòng ngừa bệnh truyền nhiễm (chủ động phòng bệnh).'
  },
  {
    id: 'm4_q9',
    stageId: 4,
    stageTitle: 'Lá chắn miễn dịch',
    type: 'fill_blank',
    cognitiveLevel: 'thông hiểu',
    title: 'Điền từ: Nguồn gốc của tế bào plasma',
    prompt: 'Chọn từ còn thiếu để hoàn thành phát biểu về kháng thể:',
    sentenceParts: ['Kháng thể là protein đặc hiệu do tế bào plasma (có nguồn gốc từ ', ') tạo ra.'],
    wordBank: ['lympho B', 'hồng cầu', 'tiểu cầu', 'huyết tương'],
    correctWord: 'lympho B',
    explanation: 'Kháng thể: protein đặc hiệu do tế bào plasma (có nguồn gốc từ lympho B) tạo ra, có khả năng nhận biết và liên kết đặc hiệu với kháng nguyên tương ứng.'
  }
];
