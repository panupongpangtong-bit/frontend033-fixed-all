"use client";

import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-20 pt-32 transition-colors duration-300 dark:bg-[#071426]">

      <div className="mx-auto max-w-6xl">

        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="mb-20 text-center">

          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            ABOUT PP SHOP
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            เกี่ยวกับเรา
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg">
            PP SHOP คือร้านค้าออนไลน์ที่รวบรวมสินค้าไอที
            แก็ดเจ็ต และอุปกรณ์อิเล็กทรอนิกส์ที่น่าสนใจ
            คัดสรรสินค้าที่มีคุณภาพ พร้อมนำเสนอข้อมูลที่เข้าใจง่าย
            เพื่อให้ทุกคนสามารถเลือกซื้อสินค้าได้อย่างมั่นใจ
          </p>

        </section>

        {/* ================================================= */}
        {/* INTRO */}
        {/* ================================================= */}

        <section className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              OUR STORY
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
              เราอยากให้การซื้อสินค้าไอที
              <br />
              เป็นเรื่องง่ายสำหรับทุกคน
            </h2>

            <p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-400">
              เราเข้าใจว่าการเลือกซื้อสินค้าไอทีในปัจจุบัน
              มีตัวเลือกมากมายและบางครั้งข้อมูลก็มีความซับซ้อน
              PP SHOP จึงเกิดขึ้นจากแนวคิดที่ต้องการสร้างร้านค้าออนไลน์
              ที่ใช้งานง่าย สินค้าหลากหลาย และให้ข้อมูลที่ชัดเจน
            </p>

            <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-400">
              เราให้ความสำคัญกับประสบการณ์ของลูกค้า
              ตั้งแต่การค้นหาสินค้า การตัดสินใจซื้อ
              ไปจนถึงการบริการหลังการขาย
            </p>

          </div>

          {/* RIGHT */}

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 shadow-2xl shadow-blue-500/20">

            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10" />

            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/10" />

            <div className="relative">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold text-white backdrop-blur">
                KATE
              </div>

              <h3 className="mt-8 text-3xl font-bold text-white">
                PP SHOP
              </h3>

              <p className="mt-4 leading-relaxed text-blue-100">
                Technology made simple.
                <br />
                เลือกง่าย ใช้งานง่าย และมั่นใจได้มากขึ้น
              </p>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* VALUES */}
        {/* ================================================= */}

        <section className="mb-20">

          <div className="mb-10 text-center">

            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              OUR VALUES
            </span>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              สิ่งที่เราให้ความสำคัญ
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              เราต้องการสร้างประสบการณ์ที่ดีให้กับลูกค้าในทุกขั้นตอน
            </p>

          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

            {/* Card 1 */}

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-[#1e3b5c] dark:bg-[#102542]">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl dark:bg-blue-500/10">
                ⭐
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
                คุณภาพ
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                เราคัดเลือกสินค้าโดยคำนึงถึงคุณภาพ
                ความคุ้มค่า และประโยชน์ในการใช้งานของลูกค้า
              </p>

            </div>

            {/* Card 2 */}

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-[#1e3b5c] dark:bg-[#102542]">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl dark:bg-blue-500/10">
                💬
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
                บริการ
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                พร้อมให้คำแนะนำและช่วยเหลือลูกค้า
                ตั้งแต่ก่อนซื้อไปจนถึงหลังการขาย
              </p>

            </div>

            {/* Card 3 */}

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-[#1e3b5c] dark:bg-[#102542]">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl dark:bg-blue-500/10">
                🚀
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
                นวัตกรรม
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                เรามองหาเทคโนโลยีและสินค้าที่ช่วยให้ชีวิต
                สะดวกและมีประสิทธิภาพมากขึ้น
              </p>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* VISION */}
        {/* ================================================= */}

        <section className="mb-20 overflow-hidden rounded-3xl border border-blue-100 bg-blue-50 p-8 dark:border-[#1e3b5c] dark:bg-[#0b1b33] md:p-12">

          <div className="mx-auto max-w-4xl text-center">

            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              OUR VISION
            </span>

            <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
              “เทคโนโลยีที่ดี ควรเข้าถึงได้ง่าย”
            </h2>

            <p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-400">
              เราต้องการให้ PP SHOP เป็นมากกว่าร้านค้าออนไลน์
              แต่เป็นพื้นที่ที่ช่วยให้ผู้คนค้นพบเทคโนโลยีใหม่ ๆ
              เข้าใจสินค้าได้ง่าย และสามารถเลือกสิ่งที่เหมาะกับตัวเองได้
            </p>

          </div>

        </section>

        {/* ================================================= */}
        {/* WHY US */}
        {/* ================================================= */}

        <section className="mb-20">

          <div className="mb-8">

            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              WHY PP SHOP
            </span>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              ทำไมต้อง PP SHOP?
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {[
              "สินค้าหลากหลายสำหรับสายไอทีและแก็ดเจ็ต",
              "ข้อมูลสินค้าอ่านง่ายและเข้าใจได้",
              "ออกแบบเว็บไซต์ให้ใช้งานง่าย",
              "มีช่องทางติดต่อและบริการลูกค้า",
              "ให้ความสำคัญกับประสบการณ์ของผู้ซื้อ",
              "พัฒนาร้านค้าอย่างต่อเนื่อง",
            ].map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-[#1e3b5c] dark:bg-[#102542]"
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  ✓
                </div>

                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* ================================================= */}
        {/* CTA */}
        {/* ================================================= */}

        <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-12 text-center shadow-xl shadow-blue-500/20 md:px-12">

          <h2 className="text-3xl font-bold text-white">
            พร้อมค้นหาสินค้าที่ใช่สำหรับคุณหรือยัง?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-blue-100">
            เลือกชมสินค้าและค้นหาอุปกรณ์ที่ตอบโจทย์การใช้งานของคุณ
            ได้ที่ PP SHOP
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-blue-600 transition hover:bg-gray-100"
            >
              ดูสินค้าทั้งหมด
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              ติดต่อเรา
            </Link>

          </div>

        </section>

      </div>
    </main>
  );
}