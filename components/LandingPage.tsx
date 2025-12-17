import React from 'react';
import { ShieldCheck, Zap, BarChart3, ArrowRight, PackageX, Wallet, Smartphone, Bot, LineChart, Mail, Phone, Globe, Target, Rocket, Star, HeartHandshake, Shield } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="bg-white text-slate-800 min-h-screen font-sans">
      {/* Simplified Header */}
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

      {/* Hero Section */}
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
              <button className="px-8 py-4 border border-slate-200 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                Xem Demo video
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-blue-100 rounded-3xl blur-3xl opacity-30 -z-10 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200" 
              alt="SmartE-Logistics Hero" 
              className="rounded-2xl shadow-2xl border-8 border-white object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-2xl border border-slate-50 flex items-center space-x-4 animate-bounce">
              <div className="p-3 bg-green-100 rounded-full"><Zap className="text-green-600" /></div>
              <div>
                <p className="text-xs font-bold text-slate-400">Tiết kiệm</p>
                <p className="text-xl font-bold text-slate-900">45% Điện năng</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
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
                  {[
                    { title: "Với Doanh nghiệp SME", text: "Xóa bỏ rào cản chi phí. Cung cấp công cụ tinh gọn giúp vận hành chuyên nghiệp như các tập đoàn lớn." },
                    { title: "Với Doanh nghiệp Lớn", text: "Cung cấp giải pháp Robot/AI để giải quyết bài toán quy mô, tối đa hóa tốc độ xử lý." },
                    { title: "Với Môi trường", text: "Thúc đẩy Green Logistics bằng cách tích hợp công cụ giám sát năng lượng và giảm thải Carbon (ESG)." }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                      <h4 className="font-bold text-blue-400 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.text}</p>
                    </div>
                  ))}
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
                  { letter: "S", label: "Solution-oriented", desc: "Chúng tôi bán giải pháp cho vấn đề của bạn.", icon: LineChart, color: "text-blue-400" },
                  { letter: "M", label: "Modern", desc: "Luôn cập nhật công nghệ mới nhất (AI, IoT, Heatmap).", icon: Bot, color: "text-purple-400" },
                  { letter: "A", label: "Adaptive", desc: "Linh hoạt tùy biến theo quy mô Tier 1 & Tier 2.", icon: Layers, color: "text-green-400" },
                  { letter: "R", label: "Reliable", desc: "Dữ liệu chính xác tuyệt đối 99.9% là điểm tựa niềm tin.", icon: Shield, color: "text-red-400" },
                  { letter: "T", label: "Transparent", desc: "Minh bạch chi phí đầu tư và cam kết Net Zero.", icon: Zap, color: "text-yellow-400" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-800 transition-colors cursor-default border border-transparent hover:border-slate-700">
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

      {/* Pain Points */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Bạn đang gặp khó khăn?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <PackageX className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-bold">Hàng hết date</h3>
              <p className="text-slate-500">Mất doanh thu vì không kiểm soát được hạn sử dụng?</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold">Thất thoát</h3>
              <p className="text-slate-500">Số liệu Excel không khớp thực tế kho?</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-bold">Chi phí cao</h3>
              <p className="text-slate-500">Tiền điện và nhân sự kho ngày càng tăng?</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Hệ sinh thái SmartE-Logistics</h2>
            <p className="text-slate-600">Giải pháp toàn diện cho mọi quy mô doanh nghiệp.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* SME Card */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <Smartphone size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">QUẢN TRỊ KHO SME</h3>
              <p className="text-blue-600 text-sm font-bold mb-4 uppercase tracking-wider italic">Tinh gọn - Tiết kiệm - Hiệu quả</p>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Giải pháp WMS trên nền tảng đám mây (Cloud). Thay thế giấy tờ bằng ứng dụng quét mã vạch trên điện thoại. Triển khai chỉ trong 7 ngày.
              </p>
              <button onClick={onLogin} className="mt-auto px-6 py-3 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 w-full">Xem chi tiết gói SME</button>
            </div>

            {/* Enterprise Card */}
            <div className="bg-white p-8 rounded-2xl border-2 border-blue-600 shadow-2xl shadow-blue-100 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] px-2 py-1 rounded font-bold uppercase">Công nghệ cao</div>
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6">
                <Bot size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">KHO TỰ ĐỘNG ROBOT</h3>
              <p className="text-blue-600 text-sm font-bold mb-4 uppercase tracking-wider italic">Tốc độ - Chính xác - Quy mô lớn</p>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Hệ thống điều khiển AS/RS và Robot AGV. Tối ưu hóa vận hành cho các Hub phân phối lớn (>5000m2). Tích hợp AI dự báo.
              </p>
              <button onClick={onLogin} className="mt-auto px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 w-full">Xem công nghệ Robot</button>
            </div>

            {/* Consulting Card */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                <LineChart size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">TƯ VẤN CHUYỂN ĐỔI SỐ</h3>
              <p className="text-green-600 text-sm font-bold mb-4 uppercase tracking-wider italic">Lộ trình rõ ràng - ROI minh bạch</p>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Dịch vụ tư vấn xây dựng lộ trình nâng cấp kho vận. Phân tích điểm hòa vốn (ROI) và đánh giá tác động môi trường (ESG).
              </p>
              <button onClick={onLogin} className="mt-auto px-6 py-3 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 w-full">Liên hệ chuyên gia</button>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
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
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Quản trị kho SME (Tier 2)</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Kho tự động Robot (Tier 1)</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Tư vấn Chuyển đổi số</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer text-blue-500 font-bold">Công cụ tính ROI</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Tài nguyên</h4>
            <ul className="text-slate-400 text-sm space-y-4">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Blog Logistics & ESG</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Tài liệu API ERP</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Case Study thành công</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Pháp lý</h4>
            <ul className="text-slate-400 text-sm space-y-4">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Chính sách bảo mật</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Điều khoản sử dụng</li>
              <li className="flex items-center space-x-2 text-green-500 font-bold">
                 <ShieldCheck size={14} /> <span>Chứng nhận ISO 27001</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto text-center">
            <div className="flex justify-center space-x-6 mb-8">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer"><Smartphone size={18} /></div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer"><Globe size={18} /></div>
            </div>
            <p className="text-slate-500 text-xs">
              © 2025 SmartE-Logistics Dashboard | Developed by Group 02 From UTE - Project E-Logistics.
            </p>
        </div>
      </footer>
    </div>
  );
};

const Layers: React.FC<any> = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m2.6 12.08 8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83" />
    <path d="m2.6 17.08 8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83" />
  </svg>
);

export default LandingPage;