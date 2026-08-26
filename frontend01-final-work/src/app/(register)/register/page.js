"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const REGISTER_URL = "https://api.itdev.cmtc.ac.th/users/";

export default function FormRegister() {
  const router = useRouter();

  const [form, setForm] = useState({
    txt_firstname: "",
    txt_lastname: "",
    txt_email: "",
    txt_phone: "",
    txt_username: "",
    txt_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ==========================================
    // ตรวจข้อมูล
    // ==========================================
    if (
      !form.txt_firstname.trim() ||
      !form.txt_lastname.trim() ||
      !form.txt_email.trim() ||
      !form.txt_phone.trim() ||
      !form.txt_username.trim() ||
      !form.txt_password.trim()
    ) {
      await Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบ",
        text: "กรุณากรอกข้อมูลทุกช่องก่อนสมัครสมาชิก",
        confirmButtonText: "ตกลง",
      });

      return;
    }

    // ตรวจ Email เบื้องต้น
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.txt_email.trim())) {
      await Swal.fire({
        icon: "warning",
        title: "Email ไม่ถูกต้อง",
        text: "กรุณากรอก Email ให้ถูกต้อง",
        confirmButtonText: "ตกลง",
      });

      return;
    }

    // ตรวจ Password
    if (form.txt_password.length < 6) {
      await Swal.fire({
        icon: "warning",
        title: "Password สั้นเกินไป",
        text: "กรุณาตั้งรหัสผ่านอย่างน้อย 6 ตัวอักษร",
        confirmButtonText: "ตกลง",
      });

      return;
    }

    try {
      setLoading(true);

      console.log("REGISTER API:", REGISTER_URL);

      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstname: form.txt_firstname.trim(),
          lastname: form.txt_lastname.trim(),
          email: form.txt_email.trim(),
          phone: form.txt_phone.trim(),
          username: form.txt_username.trim(),
          password: form.txt_password,
        }),
      });

      const contentType =
        response.headers.get("content-type") || "";

      let data = {};

      if (contentType.includes("application/json")) {
        data = await response.json().catch(() => ({}));
      } else {
        const text = await response.text().catch(() => "");

        data = {
          message: text,
        };
      }

      console.log("REGISTER STATUS:", response.status);
      console.log("REGISTER RESPONSE:", data);

      // ==========================================
      // สมัครสำเร็จ
      // ==========================================
      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ",
          text: "กำลังนำคุณไปหน้าเข้าสู่ระบบ",
          timer: 1500,
          showConfirmButton: false,
        });

        // ล้างข้อมูลเดิม
        setForm({
          txt_firstname: "",
          txt_lastname: "",
          txt_email: "",
          txt_phone: "",
          txt_username: "",
          txt_password: "",
        });

        // ไป Login
        router.push("/pagelogin");

        return;
      }

      // ==========================================
      // 400
      // ==========================================
      if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: "ข้อมูลไม่ถูกต้อง",
          text:
            data.message ||
            data.error ||
            "กรุณาตรวจสอบข้อมูลที่กรอก",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      // ==========================================
      // 409
      // ==========================================
      if (response.status === 409) {
        await Swal.fire({
          icon: "warning",
          title: "ข้อมูลซ้ำ",
          text:
            data.message ||
            data.error ||
            "Username หรือ Email นี้อาจมีอยู่ในระบบแล้ว",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      // ==========================================
      // 404
      // ==========================================
      if (response.status === 404) {
        await Swal.fire({
          icon: "error",
          title: "ไม่พบ Register API",
          text: "ไม่พบ Endpoint สำหรับสมัครสมาชิก",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      // ==========================================
      // 405
      // ==========================================
      if (response.status === 405) {
        await Swal.fire({
          icon: "error",
          title: "Method ไม่ถูกต้อง",
          text: "API ไม่อนุญาตให้ใช้ POST",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      // ==========================================
      // 500+
      // ==========================================
      if (response.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: "Server Error",
          text:
            data.message ||
            data.error ||
            "เซิร์ฟเวอร์เกิดข้อผิดพลาด",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      // ==========================================
      // Error อื่น
      // ==========================================
      await Swal.fire({
        icon: "error",
        title: `สมัครสมาชิกไม่สำเร็จ (${response.status})`,
        text:
          data.message ||
          data.error ||
          "เกิดข้อผิดพลาด",
        confirmButtonText: "ตกลง",
      });
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      await Swal.fire({
        icon: "error",
        title: "ไม่สามารถเชื่อมต่อ API",
        text:
          "ไม่สามารถส่งข้อมูลไปยังเซิร์ฟเวอร์ได้",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-16">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_1px,transparent_1px)] [background-size:35px_35px]" />

      </div>

      <div className="relative z-10 mx-auto w-full max-w-xl">

        {/* Header */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-800 text-xl font-black text-white shadow-2xl">
            PP
          </div>

          <div className="mb-3 inline-flex rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-blue-600 shadow-sm">
            PP SHOP MEMBERS
          </div>

          <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            สร้างบัญชีใหม่
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500">
            สมัครสมาชิกกับ PP SHOP
            <br />
            เพื่อเริ่มต้นประสบการณ์การช้อปปิ้ง
          </p>

        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/95 shadow-2xl">

          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-9"
          >

            {/* Personal */}
            <div className="mb-6">

              <h2 className="font-bold text-gray-900">
                👤 ข้อมูลส่วนตัว
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                กรุณากรอกข้อมูลของคุณ
              </p>

            </div>

            {/* First / Last */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  ชื่อ
                </label>

                <input
                  type="text"
                  name="txt_firstname"
                  value={form.txt_firstname}
                  onChange={handleChange}
                  placeholder="ชื่อ"
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  นามสกุล
                </label>

                <input
                  type="text"
                  name="txt_lastname"
                  value={form.txt_lastname}
                  onChange={handleChange}
                  placeholder="นามสกุล"
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

            </div>

            {/* Email */}
            <div className="mt-5">

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                อีเมล
              </label>

              <input
                type="email"
                name="txt_email"
                value={form.txt_email}
                onChange={handleChange}
                placeholder="example@email.com"
                disabled={loading}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />

            </div>

            {/* Phone */}
            <div className="mt-5">

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                เบอร์โทรศัพท์
              </label>

              <input
                type="tel"
                name="txt_phone"
                value={form.txt_phone}
                onChange={handleChange}
                placeholder="08x-xxx-xxxx"
                disabled={loading}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />

            </div>

            {/* Account */}
            <div className="my-8">

              <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

            </div>

            <div className="mb-6">

              <h2 className="font-bold text-gray-900">
                🔐 ข้อมูลบัญชี
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                ใช้ข้อมูลนี้สำหรับเข้าสู่ระบบ
              </p>

            </div>

            {/* Username */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Username
              </label>

              <input
                type="text"
                name="txt_username"
                value={form.txt_username}
                onChange={handleChange}
                placeholder="username"
                disabled={loading}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />

            </div>

            {/* Password */}
            <div className="mt-5">

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="txt_password"
                  value={form.txt_password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-16 text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50"
                >
                  {showPassword
                    ? "ซ่อน"
                    : "แสดง"}
                </button>

              </div>

            </div>

            {/* Terms */}
            <div className="mt-7 rounded-xl border border-blue-100 bg-blue-50/60 p-4">

              <label className="flex cursor-pointer items-start gap-3">

                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600"
                />

                <p className="text-xs leading-relaxed text-gray-500">

                  ฉันยอมรับ{" "}

                  <span className="font-semibold text-blue-600">
                    เงื่อนไขการใช้งาน
                  </span>

                  {" "}และ{" "}

                  <span className="font-semibold text-blue-600">
                    นโยบายความเป็นส่วนตัว
                  </span>

                </p>

              </label>

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-5 py-4 font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "กำลังสมัครสมาชิก..."
                : "สร้างบัญชี →"}
            </button>

          </form>

          {/* Footer */}
          <div className="border-t border-blue-100 bg-gray-50 px-6 py-6 text-center">

            <p className="text-sm text-gray-500">

              มีบัญชีอยู่แล้ว?

              <button
                type="button"
                onClick={() =>
                  router.push("/pagelogin")
                }
                className="ml-1 font-bold text-blue-600 hover:text-indigo-600"
              >
                เข้าสู่ระบบ →
              </button>

            </p>

          </div>

        </div>

        <div className="mt-7 text-center">

          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} PP SHOP
          </p>

        </div>

      </div>
    </main>
  );
}