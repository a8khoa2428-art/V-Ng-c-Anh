/**
 * Logic pure functions for Blood & Circulatory System educational game
 * Bám sát tuyệt đối nội dung chương trình KHTN 8:
 * - Hệ ABO có 4 nhóm máu: A, B, AB, O
 * - Kháng nguyên (KN) trên hồng cầu: KN A, KN B
 * - Kháng thể (KT) trong huyết tương: KT α, KT β
 * - KN A gây kết dính KT α, KN B gây kết dính KT β
 * - Khi truyền máu quan tâm KN người cho và KT người nhận
 * - Nhóm O: không có KN A và B -> chuyên cho
 * - Nhóm AB: không có KT trong huyết tương -> chuyên nhận
 */

export type BloodGroup = 'A' | 'B' | 'AB' | 'O';

export interface BloodGroupInfo {
  group: BloodGroup;
  antigens: string[]; // Kháng nguyên trên hồng cầu
  antibodies: string[]; // Kháng thể trong huyết tương
  description: string;
}

export const BLOOD_GROUPS_DATA: Record<BloodGroup, BloodGroupInfo> = {
  A: {
    group: 'A',
    antigens: ['A'],
    antibodies: ['β'],
    description: 'Nhóm máu A có kháng nguyên A trên hồng cầu và kháng thể β trong huyết tương.'
  },
  B: {
    group: 'B',
    antigens: ['B'],
    antibodies: ['α'],
    description: 'Nhóm máu B có kháng nguyên B trên hồng cầu và kháng thể α trong huyết tương.'
  },
  AB: {
    group: 'AB',
    antigens: ['A', 'B'],
    antibodies: [],
    description: 'Nhóm máu AB có cả kháng nguyên A và B trên hồng cầu, không có kháng thể trong huyết tương.'
  },
  O: {
    group: 'O',
    antigens: [],
    antibodies: ['α', 'β'],
    description: 'Nhóm máu O không có kháng nguyên A và B trên hồng cầu, có cả kháng thể α và β trong huyết tương.'
  }
};

/**
 * Kiểm tra khả năng truyền máu giữa người cho và người nhận
 * Nguyên tắc: Không để kháng nguyên người cho bị kết dính bởi kháng thể người nhận
 */
export function checkBloodCompatibility(donor: BloodGroup, recipient: BloodGroup): {
  compatible: boolean;
  donorAntigens: string[];
  recipientAntibodies: string[];
  reactionDetails: string;
  explanation: string;
} {
  const donorInfo = BLOOD_GROUPS_DATA[donor];
  const recipientInfo = BLOOD_GROUPS_DATA[recipient];

  const hasAgglutinationA = donorInfo.antigens.includes('A') && recipientInfo.antibodies.includes('α');
  const hasAgglutinationB = donorInfo.antigens.includes('B') && recipientInfo.antibodies.includes('β');
  const compatible = !hasAgglutinationA && !hasAgglutinationB;

  let reactionDetails = '';
  if (hasAgglutinationA && hasAgglutinationB) {
    reactionDetails = 'Cả KN A gặp KT α và KN B gặp KT β đều gây kết dính hồng cầu nghiêm trọng!';
  } else if (hasAgglutinationA) {
    reactionDetails = 'Kháng nguyên A của người cho bị kết dính bởi kháng thể α trong huyết tương người nhận!';
  } else if (hasAgglutinationB) {
    reactionDetails = 'Kháng nguyên B của người cho bị kết dính bởi kháng thể β trong huyết tương người nhận!';
  } else {
    reactionDetails = 'Không xảy ra hiện tượng kết dính hồng cầu do không có phản ứng kháng nguyên – kháng thể tương ứng.';
  }

  let explanation = '';
  if (compatible) {
    if (donor === recipient) {
      explanation = `Truyền máu cùng nhóm ${donor} -> ${recipient}: Phù hợp nhất và ưu tiên hàng đầu, không xảy ra kết dính hồng cầu.`;
    } else if (donor === 'O') {
      explanation = `Nhóm máu O không có KN A và KN B trên hồng cầu nên không bị KT của người nhận kết dính (nhóm máu chuyên cho).`;
    } else if (recipient === 'AB') {
      explanation = `Nhóm máu AB không có KT (cả α và β) trong huyết tương nên không làm kết dính hồng cầu người cho (nhóm máu chuyên nhận).`;
    } else {
      explanation = `Phù hợp: Kháng nguyên của người cho không bị kháng thể của người nhận kết dính.`;
    }
  } else {
    explanation = `Không thể truyền! Khi truyền máu phải quan tâm đến KN của người cho và KT của người nhận. Ở đây xảy ra kết dính hồng cầu.`;
  }

  return {
    compatible,
    donorAntigens: donorInfo.antigens,
    recipientAntibodies: recipientInfo.antibodies,
    reactionDetails,
    explanation
  };
}

/**
 * Xáo trộn ngẫu nhiên mảng mà không làm biến đổi mảng gốc (Fisher-Yates)
 */
export function shuffleArray<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Chuẩn hóa chuỗi văn bản tiếng Việt để so sánh tự luận / điền từ
 */
export function normalizeVietnamese(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
}

/**
 * Kiểm tra câu trả lời tự luận ngắn theo danh sách từ khóa hợp lệ
 */
export function checkShortAnswer(userAnswer: string, acceptedAnswers: string[]): boolean {
  const normalizedUser = normalizeVietnamese(userAnswer);
  if (!normalizedUser) return false;

  return acceptedAnswers.some(accepted => {
    const normalizedAccepted = normalizeVietnamese(accepted);
    return normalizedUser === normalizedAccepted || normalizedUser.includes(normalizedAccepted);
  });
}
