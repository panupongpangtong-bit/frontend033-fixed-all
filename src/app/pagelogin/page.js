"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

// ==========================================
// Login API ตามตัวอย่าง 4.7.1 ของครู
// ==========================================
const LOGIN_URL = "https://api.itdev.cmtc.ac.th/auth/login";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    txt_username: "",
    txt_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ==========================================
  // เปลี่ยนค่าช่องกรอก
  // ==========================================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // Login
  // ==========================================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.txt_username.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "กรุณากรอก Username",
        text: "กรุณากรอก Username ก่อนเข้าสู่ระบบ",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (!form.txt_password.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "กรุณากรอก Password",
        text: "กรุณากรอกรหัสผ่านก่อนเข้าสู่ระบบ",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    try {
      setIsLoading(true);

      console.log("LOGIN TRY:", LOGIN_URL);

      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.txt_username,
          password: form.txt_password,
        }),
      });

      const result = await response
        .json()
        .catch(() => ({}));

      console.log("LOGIN STATUS:", response.status);
      console.log("LOGIN RESPONSE:", result);

      // ==========================================
      // Login สำเร็จ
      // ==========================================
      if (response.ok) {
        // ตามตัวอย่างครู 4.7.1
        if (result.token) {
          localStorage.setItem(
            "token",
            result.token
          );
        }

        // ตามตัวอย่างครู 4.7.1
        if (result.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(result.user)
          );
        }

        // ป้องกันกรณี API ตอบ 200 แต่ไม่มี token
        if (!result.token) {
          await Swal.fire({
            icon: "error",
            title: "ไม่พบ Token",
            text: "Login สำเร็จแต่ API ไม่ส่ง Token กลับมา",
            confirmButtonText: "ตกลง",
          });

          return;
        }

        await Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          timer: 1200,
          showConfirmButton: false,
        });

        // ==========================================
        // ไปหน้า User
        // ==========================================
        router.push("/User");

        return;
      }

      // ==========================================
      // 401
      // ==========================================
      if (response.status === 401) {
        await Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text:
            result.message ||
            "Username หรือรหัสผ่านไม่ถูกต้อง",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      // ==========================================
      // 400
      // ==========================================
      if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: `ข้อมูลไม่ถูกต้อง (status: ${response.status})`,
          text:
            result.message ||
            "กรุณาตรวจสอบข้อมูลที่กรอก",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#fecc00",
        });

        return;
      }

      // ==========================================
      // 404
      // ==========================================
      if (response.status === 404) {
        await Swal.fire({
          icon: "error",
          title: "ไม่พบ Login API",
          text:
            "https://api.itdev.cmtc.ac.th/auth/login ตอบกลับ 404",
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
          text:
            "API ไม่อนุญาตให้ส่งคำขอด้วย POST",
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
          title: `Server Error (${response.status})`,
          text:
            result.message ||
            "กรุณาลองใหม่ภายหลัง",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      // ==========================================
      // Error อื่น ๆ
      // ==========================================
      await Swal.fire({
        icon: "error",
        title: `เข้าสู่ระบบไม่สำเร็จ (${response.status})`,
        text:
          result.message ||
          "เกิดข้อผิดพลาด",
        confirmButtonText: "ตกลง",
      });
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        text:
          "ไม่สามารถส่ง Request ไปยัง API ได้",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">

      {/* พื้นหลังระยิบระยับ */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-[10%] top-[15%] h-2 w-2 animate-pulse rounded-full bg-white" />

        <div className="absolute left-[25%] top-[70%] h-1.5 w-1.5 animate-pulse rounded-full bg-blue-300" />

        <div className="absolute right-[20%] top-[25%] h-2 w-2 animate-pulse rounded-full bg-cyan-300" />

        <div className="absolute right-[10%] bottom-[20%] h-1.5 w-1.5 animate-pulse rounded-full bg-white" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:35px_35px]" />

      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-6 text-center">

            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-black text-white shadow-2xl">
              PP
            </div>

            <div className="mb-3 inline-block rounded-full bg-blue-400/10 px-4 py-2 text-xs font-semibold text-blue-200">
              PP SHOP ADMIN
            </div>

          </div>

          {/* Card */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">

            <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

            <div className="border-b px-6 py-6 text-center">

              <h1 className="text-2xl font-bold text-gray-800">
                เข้าสู่ระบบ
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                กรุณากรอก Username และรหัสผ่านของคุณ
              </p>

            </div>

            <form
              onSubmit={handleLogin}
              className="space-y-5 p-6"
            >

              {/* Username */}
              <div>

                <label
                  htmlFor="txt_username"
                  className="mb-1 block text-sm font-semibold text-gray-700"
                >
                  Username
                </label>

                <input
                  id="txt_username"
                  type="text"
                  name="txt_username"
                  value={form.txt_username}
                  onChange={handleChange}
                  autoComplete="username"
                  disabled={isLoading}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
                  placeholder="username"
                />

              </div>

              {/* Password */}
              <div>

                <label
                  htmlFor="txt_password"
                  className="mb-1 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="txt_password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="txt_password"
                    value={form.txt_password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    disabled={isLoading}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-16 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
                    placeholder="password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600"
                  >
                    {showPassword
                      ? "ซ่อน"
                      : "แสดง"}
                  </button>

                </div>

              </div>

              {/* Login */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading
                  ? "กำลังเข้าสู่ระบบ..."
                  : "เข้าสู่ระบบ"}
              </button>

              {/* Register */}
              <p className="pt-2 text-center text-sm text-gray-600">

                ยังไม่มีบัญชี?{" "}

                <button
                  type="button"
                  onClick={() =>
                    router.push("/register")
                  }
                  className="font-semibold text-blue-600 hover:underline"
                >
                  สมัครสมาชิก
                </button>

              </p>

            </form>

            <div className="border-t bg-gray-50 px-6 py-4 text-center">

              <p className="text-xs text-gray-400">
                PP SHOP • Admin System
              </p>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}