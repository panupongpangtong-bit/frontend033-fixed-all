"use client";

import { useState } from "react";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    alert("ส่งข้อความเรียบร้อยแล้ว ขอบคุณที่ติดต่อ PP SHOP");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-20 pt-32 transition-colors duration-300 dark:bg-[#071426]">

      <div className="mx-auto max-w-6xl">

        {/* ================= HERO ================= */}
        <section className="mb-14 text-center">

          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            CONTACT US
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            ติดต่อเรา
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
            มีคำถามเกี่ยวกับสินค้า การสั่งซื้อ หรือบริการของเรา?
            ทีมงาน PP SHOP พร้อมให้คำแนะนำและช่วยเหลือคุณ
          </p>

        </section>

        {/* ================= CONTACT INFO ================= */}
        <section className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* Phone */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-[#1e3b5c] dark:bg-[#102542]">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl dark:bg-blue-500/10">
              📞
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white">
              โทรหาเรา
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              02-123-4567
            </p>

            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              จันทร์ - ศุกร์ 09:00 - 18:00
            </p>

          </div>

          {/* Email */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-[#1e3b5c] dark:bg-[#102542]">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl dark:bg-blue-500/10">
              ✉️
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white">
              อีเมล
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              support@ppshop.com
            </p>

            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              เราจะตอบกลับโดยเร็วที่สุด
            </p>

          </div>

          {/* Address */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-[#1e3b5c] dark:bg-[#102542]">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl dark:bg-blue-500/10">
              📍
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white">
              ที่อยู่
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              9 ถ.เวียงแก้ว ต.ศรีภูมิ
              <br />
              อ.เมืองเชียงใหม่ จ.เชียงใหม่ 50200
            </p>

          </div>

        </section>

        {/* ================= CONTACT FORM ================= */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* LEFT - MESSAGE */}
          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-[#1e3b5c] dark:bg-[#102542] md:p-9">

            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              GET IN TOUCH
            </span>

            <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              ส่งข้อความหาเรา
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              หากคุณมีข้อสงสัยเกี่ยวกับสินค้า การสั่งซื้อ
              การจัดส่ง หรือพบปัญหาในการใช้งาน
              สามารถส่งข้อความหาเราได้ทันที
            </p>

            {/* Example quote */}
            <div className="mt-8 rounded-2xl bg-blue-50 p-5 dark:bg-blue-500/10">

              <p className="text-sm italic leading-relaxed text-blue-700 dark:text-blue-300">
                “เราเชื่อว่าการบริการที่ดีไม่ได้จบลงหลังจากการซื้อสินค้า
                แต่คือการดูแลลูกค้าในทุกขั้นตอน”
              </p>

              <p className="mt-3 text-xs font-medium text-blue-500 dark:text-blue-400">
                — PP SHOP
              </p>

            </div>

            {/* Suggestion */}
            <div className="mt-6">

              <h3 className="font-semibold text-gray-900 dark:text-white">
                สามารถติดต่อเราเรื่องอะไรได้บ้าง?
              </h3>

              <ul className="mt-3 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>✓ สอบถามรายละเอียดสินค้า</li>
                <li>✓ สอบถามสถานะการสั่งซื้อ</li>
                <li>✓ แจ้งปัญหาการใช้งาน</li>
                <li>✓ แจ้งปัญหาการจัดส่ง</li>
                <li>✓ ข้อเสนอแนะเกี่ยวกับเว็บไซต์</li>
              </ul>

            </div>

          </div>

          {/* RIGHT - FORM */}
          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-[#1e3b5c] dark:bg-[#102542] md:p-9">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  ชื่อ
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="กรอกชื่อของคุณ"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-[#2a4868] dark:bg-[#0b1b33] dark:text-white"
                />

              </div>

              {/* Email */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  อีเมล
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-[#2a4868] dark:bg-[#0b1b33] dark:text-white"
                />

              </div>

              {/* Subject */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  หัวข้อ
                </label>

                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-[#2a4868] dark:bg-[#0b1b33] dark:text-white"
                >
                  <option value="">เลือกหัวข้อ</option>
                  <option value="product">สอบถามสินค้า</option>
                  <option value="order">สอบถามการสั่งซื้อ</option>
                  <option value="delivery">สอบถามการจัดส่ง</option>
                  <option value="problem">แจ้งปัญหา</option>
                  <option value="suggestion">ข้อเสนอแนะ</option>
                </select>

              </div>

              {/* Message */}
              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  ข้อความ
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="เขียนข้อความของคุณ..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-[#2a4868] dark:bg-[#0b1b33] dark:text-white"
                />

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700"
              >
                ส่งข้อความ
              </button>

            </form>

          </div>

        </section>

        {/* ================= BACK HOME ================= */}
        <div className="mt-12 text-center">

          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-[#2a4868] dark:bg-[#102542] dark:text-gray-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
          >
            ← กลับหน้าหลัก
          </Link>

        </div>

      </div>
    </main>
  );
}