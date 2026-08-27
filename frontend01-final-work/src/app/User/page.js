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
  const [isActionLoading, setIsActionLoading] = useState(false);

  // ==========================================
  // ดึงข้อมูล Users
  // ==========================================
  const fetchUsers = async () => {
    try {
      console.log("กำลังเชื่อมต่อ API...");
      console.log("USERS URL:", USERS_URL);

      const res = await fetch(USERS_URL);

      console.log("USERS STATUS:", res.status);

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("ไม่พบข้อมูลผู้ใช้งาน (404 Not Found)");
        }

        if (res.status === 500) {
          throw new Error("เซิร์ฟเวอร์มีปัญหา (500 Internal Server Error)");
        }

        throw new Error(
          `เกิดข้อผิดพลาดจากการเชื่อมต่อ (Status: ${res.status})`
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
      console.error("เกิดข้อผิดพลาด:", error);

      setUsers([]);

      await Swal.fire({
        icon: "error",
        title: "โหลดข้อมูลไม่สำเร็จ",
        text: error.message,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // ตรวจสอบ Login
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

      router.push("/pagelogin");

      return;
    }

    setIsAuth(true);
    fetchUsers();
  }, [router]);

  // ==========================================
  // แก้ไข User
  // ==========================================
  const handleEdit = async (user) => {
    const result = await Swal.fire({
      title: "แก้ไขข้อมูลผู้ใช้",
      html: `
        <div style="text-align:left">
          <label style="display:block;margin-bottom:6px;font-weight:600">
            ชื่อ
          </label>
          <input
            id="swal-firstname"
            class="swal2-input"
            style="width:90%;margin:0 0 15px"
            value="${user.firstname ?? ""}"
            placeholder="ชื่อ"
          />

          <label style="display:block;margin-bottom:6px;font-weight:600">
            นามสกุล
          </label>
          <input
            id="swal-lastname"
            class="swal2-input"
            style="width:90%;margin:0 0 15px"
            value="${user.lastname ?? ""}"
            placeholder="นามสกุล"
          />

          <label style="display:block;margin-bottom:6px;font-weight:600">
            Username
          </label>
          <input
            id="swal-username"
            class="swal2-input"
            style="width:90%;margin:0"
            value="${user.username ?? ""}"
            placeholder="Username"
          />
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "บันทึก",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      focusConfirm: false,

      preConfirm: () => {
        const firstname = document
          .getElementById("swal-firstname")
          ?.value.trim();

        const lastname = document
          .getElementById("swal-lastname")
          ?.value.trim();

        const username = document
          .getElementById("swal-username")
          ?.value.trim();

        if (!firstname || !lastname || !username) {
          Swal.showValidationMessage(
            "กรุณากรอกข้อมูลให้ครบทุกช่อง"
          );

          return false;
        }

        return {
          firstname,
          lastname,
          username,
        };
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setIsActionLoading(true);

      const res = await fetch(`${USERS_URL}/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: result.value.firstname,
          lastname: result.value.lastname,
          username: result.value.username,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();

        throw new Error(
          `แก้ไขข้อมูลไม่สำเร็จ (Status: ${res.status})${
            errorText ? ` - ${errorText}` : ""
          }`
        );
      }

      await Swal.fire({
        icon: "success",
        title: "แก้ไขสำเร็จ",
        text: "อัปเดตข้อมูลผู้ใช้เรียบร้อยแล้ว",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#2563eb",
      });

      await fetchUsers();
    } catch (error) {
      console.error("แก้ไข User Error:", error);

      await Swal.fire({
        icon: "error",
        title: "แก้ไขไม่สำเร็จ",
        text: error.message,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  // ==========================================
  // ลบ User
  // ==========================================
  const handleDelete = async (user) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "ยืนยันการลบ?",
      html: `
        คุณต้องการลบผู้ใช้<br />
        <strong>${user.firstname ?? ""} ${
          user.lastname ?? ""
        }</strong>
        <br />
        <span style="color:#6b7280">
          Username: ${user.username ?? "-"}
        </span>
      `,
      showCancelButton: true,
      confirmButtonText: "ใช่, ลบเลย",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setIsActionLoading(true);

      const res = await fetch(`${USERS_URL}/${user.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorText = await res.text();

        throw new Error(
          `ลบข้อมูลไม่สำเร็จ (Status: ${res.status})${
            errorText ? ` - ${errorText}` : ""
          }`
        );
      }

      await Swal.fire({
        icon: "success",
        title: "ลบสำเร็จ",
        text: "ลบผู้ใช้งานออกจากระบบแล้ว",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#2563eb",
      });

      await fetchUsers();
    } catch (error) {
      console.error("ลบ User Error:", error);

      await Swal.fire({
        icon: "error",
        title: "ลบไม่สำเร็จ",
        text: error.message,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

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
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
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
  // ยังไม่ Login
  // ==========================================
  if (!isAuth) {
    return null;
  }

  // ==========================================
  // Loading
  // ==========================================
  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <h2 className="text-lg font-bold text-gray-800">
            กำลังโหลดข้อมูล
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            กำลังเชื่อมต่อระบบผู้ใช้งาน...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // User Page
  // ==========================================
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/5">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-6 text-white md:p-8">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>
                <div className="mb-2 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                  ADMIN PANEL
                </div>

                <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                  User Management
                </h1>

                <p className="mt-2 text-sm text-blue-100 md:text-base">
                  จัดการข้อมูลสมาชิกภายในระบบ
                </p>
              </div>

              <button
                onClick={handleLogout}
                disabled={isActionLoading}
                className="rounded-xl bg-white px-5 py-3 font-bold text-red-500 shadow-lg transition hover:scale-105 hover:bg-red-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Logout
              </button>

            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  สมาชิกทั้งหมด
                </p>

                <p className="mt-2 text-4xl font-black text-blue-600">
                  {users.length}
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                👥
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  สถานะ Active
                </p>

                <p className="mt-2 text-4xl font-black text-green-600">
                  {users.length}
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl">
                ✓
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  ระบบ
                </p>

                <p className="mt-2 text-2xl font-black text-indigo-600">
                  ONLINE
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
                ⚡
              </div>
            </div>
          </div>

        </div>

        {/* User List */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">

          {/* Table Header */}
          <div className="flex flex-col gap-2 border-b border-gray-100 px-6 py-5 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-xl font-black text-gray-800">
                รายชื่อสมาชิก
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                ดู แก้ไข และจัดการข้อมูลสมาชิก
              </p>
            </div>

            {isActionLoading && (
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
                กำลังดำเนินการ...
              </div>
            )}

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

                <tr>

                  <th className="px-5 py-4 text-left text-sm font-bold">
                    ID
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-bold">
                    ชื่อ
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-bold">
                    นามสกุล
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-bold">
                    Username
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-bold">
                    สถานะ
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-bold">
                    จัดการ
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-5 py-14 text-center"
                    >
                      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
                        📭
                      </div>

                      <p className="font-semibold text-gray-700">
                        ไม่พบข้อมูลผู้ใช้งาน
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        ไม่มีสมาชิกในระบบตอนนี้
                      </p>
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr
                      key={user.id ?? index}
                      className="group transition hover:bg-blue-50/60"
                    >

                      {/* ID */}
                      <td className="px-5 py-5">
                        <span className="inline-flex rounded-lg bg-gray-100 px-3 py-1 text-sm font-bold text-gray-600">
                          #{user.id ?? index + 1}
                        </span>
                      </td>

                      {/* Firstname */}
                      <td className="px-5 py-5">
                        <div className="font-bold text-gray-800">
                          {user.firstname ?? "-"}
                        </div>
                      </td>

                      {/* Lastname */}
                      <td className="px-5 py-5 text-gray-700">
                        {user.lastname ?? "-"}
                      </td>

                      {/* Username */}
                      <td className="px-5 py-5">
                        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
                          @{user.username ?? "-"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-5">

                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">

                          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

                          Active

                        </span>

                      </td>

                      {/* Actions */}
                      <td className="px-5 py-5">

                        <div className="flex justify-center gap-2">

                          {/* Edit */}
                          <button
                            onClick={() => handleEdit(user)}
                            disabled={isActionLoading}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-600 transition hover:bg-blue-600 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <span>✏️</span>
                            แก้ไข
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(user)}
                            disabled={isActionLoading}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-500 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <span>🗑️</span>
                            ลบ
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
    </main>
  );
}