import React from 'react';
import { ShieldCheck, Zap, BarChart3, ArrowRight, PackageX, Wallet, Smartphone, Bot, LineChart, Mail, Phone, Globe, Target, Rocket, Star, HeartHandshake, Shield } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="bg-white text-slate-800 min-h-screen font-sans">
      <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">E</div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">SmartE-Logistics</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#hero" className="hover:text-blue-600 transition-colors">Trang chủ</a>
          </nav>
          <button 
            onClick={onLogin}
            className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            ĐĂNG NHẬP / DÙNG THỬ
          </button>
        </div>
      </header>

      <section id="hero" className="pt-32 pb-20 px-6">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block px-4 py-1.5 bg-blue-50 rounded-full">
              <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">
                "Tinh gọn Vận hành – Kiến tạo Tương lai Xanh"
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              SmartE-Logistics: Biến Kho Hàng Truyền Thống Thành <span className="text-blue-600">Kho Thông Minh.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-lg">
              Giải pháp quản trị kho vận 4.0 dành riêng cho doanh nghiệp SME. Tích hợp giám sát năng lượng và tối ưu dòng tiền.
            </p>
            <div className="flex space-x-4">
              <button onClick={onLogin} className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center shadow-xl shadow-blue-100">
                Bắt đầu ngay <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-blue-100 rounded-3xl blur-3xl opacity-30 -z-10 animate-pulse"></div>
            {/* Cập nhật hình ảnh Hero mới đại diện cho Kho thông minh */}
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200" 
              alt="SmartE-Logistics Hero - Smart Warehouse Illustration" 
              className="rounded-2xl shadow-2xl border-8 border-white object-cover aspect-video"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-2xl border border-slate-50 flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full"><Zap className="text-green-600" /></div>
              <div>
                <p className="text-xs font-bold text-slate-400">Tiết kiệm</p>
                <p className="text-xl font-bold text-slate-900">45% Điện năng</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-blue-400">
                  <Target size={32} />
                  <h2 className="text-3xl font-bold uppercase tracking-tight">Tầm nhìn (Vision)</h2>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed border-l-4 border-blue-600 pl-6 py-2">
                  "Trở thành <strong>Hệ sinh thái Quản trị Kho tại Việt Nam vào năm 2040</strong>, tiên phong trong việc sử dụng kho thông minh các công nghệ Logistics cao cấp. SmartE hướng tới tương lai nơi mọi doanh nghiệp đều tiếp cận được giải pháp <strong>Thông minh, Hiệu quả và Net Zero</strong>."
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-green-400">
                  <Rocket size={32} />
                  <h2 className="text-3xl font-bold uppercase tracking-tight">Sứ mệnh (Mission)</h2>
                </div>
                <div className="grid gap-4">
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-blue-400 mb-1">Với Doanh nghiệp SME</h4>
                    <p className="text-sm text-slate-400">Xóa bỏ rào cản chi phí. Cung cấp công cụ tinh gọn giúp vận hành chuyên nghiệp như các tập đoàn lớn.</p>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-blue-400 mb-1">Với Môi trường</h4>
                    <p className="text-sm text-slate-400">Thúc đẩy Green Logistics bằng cách tích hợp công cụ giám sát năng lượng và giảm thải Carbon (ESG).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center space-x-3 text-yellow-400 mb-8">
                <Star size={32} />
                <h2 className="text-3xl font-bold uppercase tracking-tight">Giá trị cốt lõi (S.M.A.R.T)</h2>
              </div>
              <div className="grid gap-4">
                {[
                  { letter: "S", label: "Solution-oriented", desc: "Chúng tôi bán giải pháp cho vấn đề của bạn.", color: "text-blue-400" },
                  { letter: "M", label: "Modern", desc: "Luôn cập nhật công nghệ mới nhất (AI, IoT, Heatmap).", color: "text-purple-400" },
                  { letter: "A", label: "Adaptive", desc: "Linh hoạt tùy biến theo quy mô Tier 1 & Tier 2.", color: "text-green-400" },
                  { letter: "R", label: "Reliable", desc: "Dữ liệu chính xác tuyệt đối 99.9% là điểm tựa niềm tin.", color: "text-red-400" },
                  { letter: "T", label: "Transparent", desc: "Minh bạch chi phí đầu tư và cam kết Net Zero.", color: "text-yellow-400" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700">
                    <div className={`w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-xl font-black ${item.color} border border-slate-700`}>
                      {item.letter}
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">{item.label}</h5>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white pt-20 pb-10 px-6 border-t border-slate-800">
        <div className="container mx-auto grid md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">E</div>
              <span className="text-xl font-bold tracking-tight">SmartE-Logistics</span>
            </div>
            <p className="text-slate-400 text-sm italic font-medium">Powering Green Logistics.</p>
            <div className="space-y-3 text-sm text-slate-400">
               <div className="flex items-center space-x-2"><Phone size={14} className="text-blue-500" /> <span>Hotline: 1900 xxxx</span></div>
               <div className="flex items-center space-x-2"><Mail size={14} className="text-blue-500" /> <span>Email: contact@smarte.vn</span></div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Giải pháp</h4>
            <ul className="text-slate-400 text-sm space-y-4">
              <li>Quản trị kho SME</li>
              <li>Kho tự động Robot</li>
              <li>Tư vấn Chuyển đổi số</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Tài nguyên</h4>
            <ul className="text-slate-400 text-sm space-y-4">
              <li>Blog Logistics & ESG</li>
              <li>Tài liệu API ERP</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Pháp lý</h4>
            <ul className="text-slate-400 text-sm space-y-4">
              <li>Chính sách bảo mật</li>
              <li className="flex items-center space-x-2 text-green-500 font-bold">
                 <ShieldCheck size={14} /> <span>Chứng nhận ISO 27001</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto text-center border-t border-slate-800 pt-8">
            <p className="text-slate-500 text-xs">
              © 2025 SmartE-Logistics Dashboard | Developed by Group 02 From UTE - Project E-Logistics.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;