"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const USERS_URL = "https://api.itdev.cmtc.ac.th/users";

export default function UsersPage() {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editingUser, setEditingUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // ==========================================
  // ดึงข้อมูล Users
  // ==========================================
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("กำลังเชื่อมต่อ API...");
      console.log("USERS URL:", USERS_URL);

      const res = await fetch(USERS_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },
      });

      console.log("USERS STATUS:", res.status);

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          router.replace("/pagelogin");
          return;
        }

        if (res.status === 404) {
          throw new Error("ไม่พบข้อมูลผู้ใช้งาน (404)");
        }

        if (res.status === 500) {
          throw new Error("เซิร์ฟเวอร์มีปัญหา (500)");
        }

        throw new Error(
          `เกิดข้อผิดพลาดจาก API (Status: ${res.status})`
        );
      }

      const data = await res.json();

      console.log("USERS RESPONSE:", data);

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else if (Array.isArray(data.data)) {
        setUsers(data.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("FETCH USERS ERROR:", error);

      setUsers([]);

      await Swal.fire({
        icon: "error",
        title: "โหลดข้อมูลไม่สำเร็จ",
        text: error.message,
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // ตรวจสอบ Token
  // ==========================================
  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log(
      "ตรวจสอบ Token:",
      token ? "พบ Token" : "ไม่พบ Token"
    );

    if (!token) {
      setIsAuth(false);
      setIsLoading(false);

      router.replace("/pagelogin");
      return;
    }

    setIsAuth(true);
    fetchUsers();
  }, []);

  // ==========================================
  // Logout
  // ==========================================
  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "question",
      title: "ออกจากระบบ?",
      text: "คุณต้องการออกจากระบบหรือไม่",
      showCancelButton: true,
      confirmButtonText: "ออกจากระบบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#ef4444",
    });

    if (!result.isConfirmed) {
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsAuth(false);

    router.replace("/pagelogin");
  };

  // ==========================================
  // เปิดแก้ไข
  // ==========================================
  const handleEdit = (user) => {
    setEditingUser({
      id: user.id,
      firstname: user.firstname ?? "",
      lastname: user.lastname ?? "",
      username: user.username ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
    });
  };

  // ==========================================
  // เปลี่ยนข้อมูลแก้ไข
  // ==========================================
  const handleEditChange = (e) => {
    setEditingUser({
      ...editingUser,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // UPDATE
  // ==========================================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingUser) return;

    try {
      setIsSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${USERS_URL}/${editingUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
          body: JSON.stringify({
            firstname: editingUser.firstname,
            lastname: editingUser.lastname,
            username: editingUser.username,
            email: editingUser.email,
            phone: editingUser.phone,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      console.log("UPDATE STATUS:", response.status);
      console.log("UPDATE RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            `แก้ไขไม่สำเร็จ (${response.status})`
        );
      }

      await Swal.fire({
        icon: "success",
        title: "แก้ไขสำเร็จ",
        text: "ข้อมูลผู้ใช้งานถูกแก้ไขแล้ว",
        timer: 1200,
        showConfirmButton: false,
      });

      setEditingUser(null);

      await fetchUsers();
    } catch (error) {
      console.error("UPDATE ERROR:", error);

      await Swal.fire({
        icon: "error",
        title: "แก้ไขข้อมูลไม่สำเร็จ",
        text: error.message,
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // ==========================================
  // DELETE
  // ==========================================
  const handleDelete = async (user) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "ลบผู้ใช้งาน?",
      html: `
        ต้องการลบ
        <b>${user.firstname ?? ""} ${user.lastname ?? ""}</b>
        ใช่หรือไม่?
      `,
      showCancelButton: true,
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#ef4444",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${USERS_URL}/${user.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      console.log("DELETE STATUS:", response.status);
      console.log("DELETE RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            `ลบข้อมูลไม่สำเร็จ (${response.status})`
        );
      }

      await Swal.fire({
        icon: "success",
        title: "ลบสำเร็จ",
        text: "ลบผู้ใช้งานเรียบร้อยแล้ว",
        timer: 1200,
        showConfirmButton: false,
      });

      await fetchUsers();
    } catch (error) {
      console.error("DELETE ERROR:", error);

      await Swal.fire({
        icon: "error",
        title: "ลบข้อมูลไม่สำเร็จ",
        text: error.message,
        confirmButtonText: "ตกลง",
      });
    }
  };

  // ==========================================
  // Auth Loading
  // ==========================================
  if (!isAuth) {
    return null;
  }

  // ==========================================
  // Loading
  // ==========================================
  if (isLoading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute -left-32 -top-32 h-96 w-96 animate-pulse rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute -right-32 top-20 h-96 w-96 animate-pulse rounded-full bg-cyan-400/10 blur-3xl" />

          {Array.from({ length: 25 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 animate-pulse rounded-full bg-white/70"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 61) % 100}%`,
                animationDelay: `${(i % 7) * 0.4}s`,
                animationDuration: `${2 + (i % 4)}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">

          <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-4 border-blue-400/20 border-t-blue-400" />

          <p className="text-lg font-semibold text-white">
            กำลังโหลดข้อมูลผู้ใช้งาน...
          </p>

          <p className="mt-2 text-sm text-slate-400">
            กรุณารอสักครู่
          </p>

        </div>
      </main>
    );
  }

  // ==========================================
  // User Page
  // ==========================================
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 p-4 md:p-6">

      {/* ==========================================
          Background
      ========================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Glow */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute bottom-[-200px] left-1/3 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-3xl" />

        {/* ดาวระยิบระยับ */}
        {Array.from({ length: 45 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/70 animate-pulse"
            style={{
              width: `${i % 3 === 0 ? 3 : 2}px`,
              height: `${i % 3 === 0 ? 3 : 2}px`,
              left: `${(i * 29) % 100}%`,
              top: `${(i * 47) % 100}%`,
              animationDelay: `${(i % 9) * 0.35}s`,
              animationDuration: `${2 + (i % 5)}s`,
            }}
          />
        ))}

      </div>

      {/* ==========================================
          Content
      ========================================== */}
      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ==========================================
            Header
        ========================================== */}
        <div className="mb-6 flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl md:flex-row md:items-center md:justify-between">

          <div>

            <div className="mb-2 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-xl shadow-lg shadow-blue-500/20">
                👤
              </div>

              <div>

                <h1 className="text-2xl font-black text-white md:text-3xl">
                  User Management
                </h1>

                <p className="text-sm text-slate-400">
                  ระบบจัดการข้อมูลสมาชิก
                </p>

              </div>

            </div>

          </div>

          <button
            onClick={handleLogout}
            className="rounded-2xl border border-red-400/20 bg-red-500/90 px-6 py-3 font-bold text-white shadow-lg shadow-red-500/10 transition duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-red-500/20"
          >
            🚪 Logout
          </button>

        </div>

        {/* ==========================================
            Stats
        ========================================== */}
        <div className="mb-6 grid gap-5 md:grid-cols-3">

          <div className="group relative overflow-hidden rounded-3xl border border-blue-400/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/40">

            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl transition group-hover:bg-blue-400/30" />

            <div className="relative">

              <p className="text-sm font-medium text-slate-400">
                จำนวนสมาชิกทั้งหมด
              </p>

              <p className="mt-2 text-5xl font-black text-white">
                {users.length}
              </p>

              <p className="mt-3 text-xs font-medium text-cyan-300">
                ● ระบบกำลังทำงาน
              </p>

            </div>

          </div>

          <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">

            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative">

              <p className="text-sm text-slate-400">
                สถานะระบบ
              </p>

              <p className="mt-2 text-3xl font-black text-emerald-400">
                Online
              </p>

              <p className="mt-2 text-xs text-slate-400">
                เชื่อมต่อ API สำเร็จ
              </p>

            </div>

          </div>

          <div className="relative overflow-hidden rounded-3xl border border-purple-400/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">

            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="relative">

              <p className="text-sm text-slate-400">
                Authentication
              </p>

              <p className="mt-2 text-3xl font-black text-purple-300">
                Secure
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Token authentication
              </p>

            </div>

          </div>

        </div>

        {/* ==========================================
            User Table
        ========================================== */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">

          <div className="border-b border-white/10 px-6 py-5">

            <h2 className="text-xl font-bold text-white">
              รายการสมาชิก
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              ข้อมูลผู้ใช้งานทั้งหมดในระบบ
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white">

                <tr>

                  <th className="px-5 py-4 text-left">
                    ID
                  </th>

                  <th className="px-5 py-4 text-left">
                    ชื่อ
                  </th>

                  <th className="px-5 py-4 text-left">
                    นามสกุล
                  </th>

                  <th className="px-5 py-4 text-left">
                    Username
                  </th>

                  <th className="px-5 py-4 text-left">
                    สถานะ
                  </th>

                  <th className="px-5 py-4 text-center">
                    จัดการ
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="px-5 py-16 text-center"
                    >

                      <div className="text-5xl">
                        👥
                      </div>

                      <p className="mt-4 font-semibold text-white">
                        ไม่พบข้อมูลผู้ใช้งาน
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        ยังไม่มีสมาชิกในระบบ
                      </p>

                    </td>

                  </tr>

                ) : (

                  users.map((user, index) => (

                    <tr
                      key={user.id ?? index}
                      className="border-b border-white/5 transition duration-300 hover:bg-white/10"
                    >

                      <td className="px-5 py-4 font-medium text-slate-300">
                        {user.id ?? "-"}
                      </td>

                      <td className="px-5 py-4 font-semibold text-white">
                        {user.firstname ?? "-"}
                      </td>

                      <td className="px-5 py-4 text-slate-300">
                        {user.lastname ?? "-"}
                      </td>

                      <td className="px-5 py-4 text-slate-300">
                        {user.username ?? "-"}
                      </td>

                      <td className="px-5 py-4">

                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">

                          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                          Active

                        </span>

                      </td>

                      <td className="px-5 py-4">

                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() => handleEdit(user)}
                            className="rounded-xl bg-blue-500/90 px-4 py-2 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
                          >
                            ✏️ แก้ไข
                          </button>

                          <button
                            onClick={() => handleDelete(user)}
                            className="rounded-xl bg-red-500/90 px-4 py-2 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-red-500"
                          >
                            🗑️ ลบ
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* ==========================================
          Edit Modal
      ========================================== */}
      {editingUser && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">

            <div className="border-b border-white/10 bg-white/5 p-6">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold text-white">
                    ✏️ แก้ไขข้อมูล
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    แก้ไขข้อมูลสมาชิก
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="rounded-xl px-3 py-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>

              </div>

            </div>

            <form
              onSubmit={handleUpdate}
              className="space-y-4 p-6"
            >

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  ชื่อ
                </label>

                <input
                  name="firstname"
                  value={editingUser.firstname}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  นามสกุล
                </label>

                <input
                  name="lastname"
                  value={editingUser.lastname}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Username
                </label>

                <input
                  name="username"
                  value={editingUser.username}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  เบอร์โทรศัพท์
                </label>

                <input
                  name="phone"
                  value={editingUser.phone}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />

              </div>

              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  ยกเลิก
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving
                    ? "กำลังบันทึก..."
                    : "💾 บันทึก"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}