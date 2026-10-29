import React from 'react';
import { X, BookOpen, Droplet, Microscope, HeartHandshake, ShieldCheck } from 'lucide-react';

interface KnowledgeReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowledgeReviewModal: React.FC<KnowledgeReviewModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-rose-50 px-5 py-4 border-b border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-800">
                Kiến thức chuẩn: Máu và hệ tuần hoàn
              </h3>
              <p className="text-xs text-rose-700 font-semibold">
                Nội dung ôn tập giữa kì I - KHTN 8 (Bảng III)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm text-slate-700">
          {/* Section 1 */}
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
            <h4 className="font-extrabold text-rose-900 flex items-center gap-2 text-sm sm:text-base">
              <Droplet className="w-5 h-5 text-rose-600" />
              <span>1. Thành phần và chức năng của máu</span>
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li>
                <span className="font-semibold text-slate-900">Thành phần:</span> Gồm huyết tương và các tế bào máu (hồng cầu, bạch cầu, tiểu cầu).
              </li>
              <li>
                <span className="font-semibold text-slate-900">Huyết tương:</span> Khoảng 90% là nước; vận chuyển chất dinh dưỡng, hormone, chất thải và nhiều chất khác.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Hồng cầu:</span> Vận chuyển oxygen và một phần carbon dioxide.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Bạch cầu:</span> Bảo vệ cơ thể, chống lại các tác nhân gây bệnh.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Tiểu cầu:</span> Tham gia quá trình đông máu, giúp hạn chế mất máu khi mạch máu bị tổn thương.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
            <h4 className="font-extrabold text-amber-900 flex items-center gap-2 text-sm sm:text-base">
              <Microscope className="w-5 h-5 text-amber-600" />
              <span>2. Các nhóm máu ở người (Hệ ABO)</span>
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li>
                Hệ ABO có 4 nhóm máu chính: <strong>A, B, AB, O</strong>.
              </li>
              <li>
                Có 2 loại kháng nguyên (KN) trên hồng cầu là <strong>KN A và KN B</strong>:
                <div className="pl-3 text-xs sm:text-sm mt-0.5">
                  • Nhóm A có KN A; Nhóm B có KN B;<br />
                  • Nhóm AB có cả KN A và KN B;<br />
                  • Nhóm O không có KN A và KN B.
                </div>
              </li>
              <li>
                Có 2 loại kháng thể (KT) trong huyết tương là <strong>α và β</strong>:
                <div className="pl-3 text-xs sm:text-sm mt-0.5">
                  • KN A gây kết dính KT α;<br />
                  • KN B gây kết dính KT β.
                </div>
              </li>
              <li>
                <span className="font-semibold text-slate-900">Khi truyền máu:</span> Cần quan tâm đến <strong>KN của người cho</strong> và <strong>KT của người nhận</strong>.
              </li>
              <li>
                <strong>Nhóm máu O:</strong> Không có KN A và B nên có thể truyền cho tất cả các nhóm máu khác (nhóm máu chuyên cho).
              </li>
              <li>
                <strong>Nhóm máu AB:</strong> Không có KT trong huyết tương nên có thể nhận máu từ các nhóm máu khác (nhóm máu chuyên nhận).
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <h4 className="font-extrabold text-emerald-900 flex items-center gap-2 text-sm sm:text-base">
              <HeartHandshake className="w-5 h-5 text-emerald-600" />
              <span>3. Nguyên tắc truyền máu</span>
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li>Xác định nhóm máu của người cho và người nhận trước khi truyền.</li>
              <li>Ưu tiên truyền máu cùng nhóm; khi cần truyền khác nhóm phải tuân thủ quy trình chuyên môn và xét nghiệm tương hợp theo quy định.</li>
              <li>Đảm bảo máu truyền không có mầm bệnh và phù hợp với người nhận.</li>
              <li>Không để xảy ra sự kết dính hồng cầu do phản ứng kháng nguyên – kháng thể.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
            <h4 className="font-extrabold text-blue-900 flex items-center gap-2 text-sm sm:text-base">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>4. Miễn dịch và vaccine</span>
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li>
                <span className="font-semibold text-slate-900">Miễn dịch:</span> Khả năng cơ thể nhận biết, chống lại và loại bỏ các tác nhân gây bệnh hoặc các yếu tố lạ.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Kháng nguyên:</span> Chất có khả năng kích hoạt cơ thể tạo ra kháng thể để chống lại kháng nguyên.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Kháng thể:</span> Protein đặc hiệu do tế bào plasma (có nguồn gốc từ lympho B) tạo ra, có khả năng nhận biết và liên kết đặc hiệu với kháng nguyên tương ứng.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Tiêm vaccine:</span> Đưa kháng nguyên đã bị suy yếu vào cơ thể để kích hoạt cơ thể tạo kháng thể, tạo đáp ứng miễn dịch đặc hiệu, góp phần phòng ngừa bệnh truyền nhiễm.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm transition-all"
          >
            Đã hiểu, quay lại trò chơi
          </button>
        </div>
      </div>
    </div>
  );
};
