import Link from 'next/link'
import { ArrowRight, Mail, CheckCircle2, Zap, ShieldCheck } from 'lucide-react'

export default function Herosection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950">
      {/* Background Subtle Glows - ปรับให้ซอฟต์ลงแบบทางการ */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-800/15 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-slate-700/20 blur-3xl"></div>

      {/* Dark Overlay เพื่อความคมชัด */}
      <div className="absolute inset-0 bg-slate-950/40"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-200 shadow-sm backdrop-blur-md">
              🚀 Welcome to Our Website
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:leading-tight">
              สร้างอนาคตด้วย
              <span className="block bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                เทคโนโลยีและนวัตกรรม
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300 max-w-2xl mx-auto lg:mx-0">
              พัฒนาเว็บไซต์ แอปพลิเคชัน และระบบสารสนเทศ
              ด้วยเทคโนโลยีสมัยใหม่ เพื่อยกระดับองค์กรของคุณ
            </p>

            {/* Corporate Buttons */}
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/about"
                className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <span>เรียนรู้เพิ่มเติม</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/40 px-7 py-3.5 font-semibold text-slate-200 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <Mail className="h-5 w-5 text-slate-400" />
                <span>ติดต่อเรา</span>
              </Link>
            </div>

            {/* Feature / Stats Cards - สไตล์องค์กร */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-800 pt-8 text-left">
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md transition hover:border-slate-700 hover:bg-slate-900/80">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-xl font-bold text-white">99%</span>
                </div>
                <p className="text-xs text-slate-400">ความพึงพอใจลูกค้า</p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md transition hover:border-slate-700 hover:bg-slate-900/80">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <Zap className="h-5 w-5" />
                  <span className="text-xl font-bold text-white">100+</span>
                </div>
                <p className="text-xs text-slate-400">โปรเจกต์สำเร็จ</p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md transition hover:border-slate-700 hover:bg-slate-900/80">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="text-xl font-bold text-white">24/7</span>
                </div>
                <p className="text-xs text-slate-400">ดูแลและซัพพอร์ต</p>
              </div>
            </div>

          </div>

          {/* Right Content */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Subtle Ambient Frame */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/30 to-amber-500/20 blur-xl"></div>

              {/* Solid Glass Border */}
              <div className="absolute -inset-3 rounded-2xl border border-slate-700/60 bg-slate-900/40 backdrop-blur-md"></div>

              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
                alt="Technology"
                className="relative w-full rounded-xl shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}