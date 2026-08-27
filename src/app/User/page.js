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
  // ดึง Users
  // ==========================================
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

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
        throw new Error(`โหลดข้อมูลไม่สำเร็จ (${res.status})`);
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

    if (!token) {
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
  // เปิดหน้าต่างแก้ไข
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
  // เปลี่ยนค่าฟอร์มแก้ไข
  // ==========================================
  const handleEditChange = (e) => {
    setEditingUser({
      ...editingUser,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // บันทึกการแก้ไข
  // ==========================================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingUser) {
      return;
    }

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
            `แก้ไขข้อมูลไม่สำเร็จ (${response.status})`
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
  // ลบ User
  // ==========================================
  const handleDelete = async (user) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "ลบผู้ใช้งาน?",
      html: `
        คุณต้องการลบ
        <b>${user.firstname ?? ""} ${user.lastname ?? ""}</b>
        ใช่หรือไม่?
      `,
      showCancelButton: true,
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#ef4444",
    });

    if (!result.isConfirmed) {
      return;
    }

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
  // ยังไม่ได้ Login
  // ==========================================
  if (!isAuth) {
    return null;
  }

  // ==========================================
  // Loading
  // ==========================================
  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

          <p className="text-gray-600">
            กำลังโหลดข้อมูลผู้ใช้งาน...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // User Page
  // ==========================================
  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              User Management
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              รายการสมาชิกในระบบ
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-5 py-2.5 font-semibold text-white transition hover:bg-red-600"
          >
            Logout
          </button>

        </div>

        {/* จำนวน User */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow">

          <p className="text-sm text-gray-500">
            จำนวนสมาชิก
          </p>

          <p className="mt-1 text-3xl font-bold text-blue-600">
            {users.length}
          </p>

        </div>

        {/* User List */}
        <div className="overflow-hidden rounded-2xl bg-white shadow">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

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
                      className="px-5 py-10 text-center text-gray-500"
                    >
                      ไม่พบข้อมูลผู้ใช้งาน
                    </td>

                  </tr>

                ) : (

                  users.map((user, index) => (

                    <tr
                      key={user.id ?? index}
                      className="border-b transition hover:bg-blue-50"
                    >

                      <td className="px-5 py-4 text-gray-600">
                        {user.id ?? "-"}
                      </td>

                      <td className="px-5 py-4 font-semibold text-gray-800">
                        {user.firstname ?? "-"}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {user.lastname ?? "-"}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {user.username ?? "-"}
                      </td>

                      <td className="px-5 py-4">

                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">

                          <span className="h-2 w-2 rounded-full bg-green-500" />

                          Active

                        </span>

                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">

                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() =>
                              handleEdit(user)
                            }
                            className="rounded-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                          >
                            แก้ไข
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(user)
                            }
                            className="rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                          >
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

      {/* ==========================================
          Edit Modal
      ========================================== */}
      {editingUser && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b p-6">

              <div>

                <h2 className="text-xl font-bold text-gray-800">
                  แก้ไขข้อมูลผู้ใช้งาน
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  แก้ไขข้อมูลแล้วกดบันทึก
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingUser(null)
                }
                className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={handleUpdate}
              className="space-y-4 p-6"
            >

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  ชื่อ
                </label>

                <input
                  name="firstname"
                  value={editingUser.firstname}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  นามสกุล
                </label>

                <input
                  name="lastname"
                  value={editingUser.lastname}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Username
                </label>

                <input
                  name="username"
                  value={editingUser.username}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  เบอร์โทรศัพท์
                </label>

                <input
                  name="phone"
                  value={editingUser.phone}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  onClick={() =>
                    setEditingUser(null)
                  }
                  className="flex-1 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100"
                >
                  ยกเลิก
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSaving
                    ? "กำลังบันทึก..."
                    : "บันทึกการแก้ไข"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}