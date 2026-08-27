
 import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function Footersection() {
  return (
    <footer
      className="
        border-t border-gray-200
        bg-white
        py-12
        text-gray-700
        transition-all duration-500

        dark:border-[#1e3b5c]
        dark:bg-[#071426]
        dark:text-gray-300
      "
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ================= MAIN FOOTER ================= */}

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* ================= SHOP ================= */}

          <div>

            {/* Logo */}

            <div className="mb-5 flex items-center gap-3">

              <div
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-2xl
                  bg-gradient-to-tr
                  from-blue-600
                  to-indigo-600
                  text-sm font-black
                  text-white
                  shadow-lg
                  shadow-blue-500/20
                "
              >
                PP
              </div>

              <div>

                <h2
                  className="
                    text-xl font-black
                    text-gray-900
                    dark:text-white
                  "
                >
                  PP SHOP
                </h2>

                <p
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-widest
                    text-gray-400
                    dark:text-gray-500
                  "
                >
                  E-Commerce
                </p>

              </div>

            </div>

            <p
              className="
                text-sm
                leading-relaxed
                text-gray-500
                dark:text-gray-400
              "
            >
              แหล่งรวมสินค้าไอทีและแก็ดเจ็ตที่ทันสมัยที่สุด
              คัดสรรสินค้าคุณภาพเพื่อตอบโจทย์ทุกไลฟ์สไตล์ของคุณ
              พร้อมบริการจัดส่งทั่วประเทศ
            </p>

            {/* Highlight */}

            <div
              className="
                mt-6
                rounded-xl
                border
                border-blue-100
                bg-blue-50
                px-4 py-3

                dark:border-blue-500/10
                dark:bg-blue-500/5
              "
            >
              <p
                className="
                  text-sm font-medium
                  text-blue-600
                  dark:text-blue-400
                "
              >
                ✦ สินค้าคุณภาพ ราคาดี ส่งไว
              </p>
            </div>

          </div>


          {/* ================= QUICK LINKS ================= */}

          <div>

            <h3
              className="
                mb-5
                text-lg font-bold
                text-gray-900
                dark:text-white
              "
            >
              เมนูลัด
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  href="/"
                  className="
                    text-gray-500
                    transition-all duration-200
                    hover:translate-x-1
                    hover:text-blue-600

                    dark:text-gray-400
                    dark:hover:text-blue-400
                  "
                >
                  หน้าแรก
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="
                    text-gray-500
                    transition-all duration-200
                    hover:translate-x-1
                    hover:text-blue-600

                    dark:text-gray-400
                    dark:hover:text-blue-400
                  "
                >
                  สินค้าทั้งหมด
                </Link>
              </li>

              <li>
                <Link
                  href="/promotion"
                  className="
                    text-gray-500
                    transition-all duration-200
                    hover:translate-x-1
                    hover:text-blue-600

                    dark:text-gray-400
                    dark:hover:text-blue-400
                  "
                >
                  โปรโมชั่น
                </Link>
              </li>

              <li>
                <Link
                  href="/review"
                  className="
                    text-gray-500
                    transition-all duration-200
                    hover:translate-x-1
                    hover:text-blue-600

                    dark:text-gray-400
                    dark:hover:text-blue-400
                  "
                >
                  บทความ / รีวิว
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="
                    text-gray-500
                    transition-all duration-200
                    hover:translate-x-1
                    hover:text-blue-600

                    dark:text-gray-400
                    dark:hover:text-blue-400
                  "
                >
                  เกี่ยวกับเรา
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="
                    text-gray-500
                    transition-all duration-200
                    hover:translate-x-1
                    hover:text-blue-600

                    dark:text-gray-400
                    dark:hover:text-blue-400
                  "
                >
                  ติดต่อเรา
                </Link>
              </li>

            </ul>

          </div>


          {/* ================= CONTACT ================= */}

          <div>

            <h3
              className="
                mb-5
                text-lg font-bold
                text-gray-900
                dark:text-white
              "
            >
              ติดต่อเรา
            </h3>

            <ul className="space-y-4 text-sm">

              <li className="flex items-start gap-3">

                <span
                  className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-blue-50

                    dark:bg-blue-500/10
                  "
                >
                  📍
                </span>

                <span
                  className="
                    leading-relaxed
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  9 ถ.เวียงแก้ว ต.ศรีภูมิ
                  <br />
                  อ.เมืองเชียงใหม่ จ.เชียงใหม่ 50200
                </span>

              </li>


              <li className="flex items-center gap-3">

                <span
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-lg
                    bg-blue-50

                    dark:bg-blue-500/10
                  "
                >
                  📞
                </span>

                <span
                  className="
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  02-123-4567
                </span>

              </li>


              <li className="flex items-center gap-3">

                <span
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-lg
                    bg-blue-50

                    dark:bg-blue-500/10
                  "
                >
                  ✉️
                </span>

                <span
                  className="
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  support@nextshop.com
                </span>

              </li>

              <li
                className="
                  text-xs
                  text-gray-400
                  dark:text-gray-500
                "
              >
                จันทร์ - ศุกร์ 09:00 - 18:00 น.
              </li>

            </ul>


            {/* ================= SOCIAL ================= */}

            <div className="mt-6">

              <p
                className="
                  mb-3
                  text-sm font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                ติดตามเรา
              </p>

              <div className="flex gap-3">

                {/* Facebook */}

                <a
                  href="#"
                  aria-label="Facebook"
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    bg-gray-100
                    text-xs font-bold
                    text-gray-600
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:bg-blue-600
                    hover:text-white

                    dark:bg-[#102542]
                    dark:text-gray-300
                    dark:hover:bg-blue-600
                    dark:hover:text-white
                  "
                >
                  FB
                </a>


                {/* Twitter */}

                <a
                  href="#"
                  aria-label="Twitter"
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    bg-gray-100
                    text-xs font-bold
                    text-gray-600
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:bg-blue-500
                    hover:text-white

                    dark:bg-[#102542]
                    dark:text-gray-300
                    dark:hover:bg-blue-500
                    dark:hover:text-white
                  "
                >
                  TW
                </a>


                {/* Instagram */}

                <a
                  href="#"
                  aria-label="Instagram"
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    bg-gray-100
                    text-xs font-bold
                    text-gray-600
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:bg-pink-600
                    hover:text-white

                    dark:bg-[#102542]
                    dark:text-gray-300
                    dark:hover:bg-pink-600
                    dark:hover:text-white
                  "
                >
                  IG
                </a>

              </div>

            </div>

          </div>

        </div>


        {/* ================= DARK MODE ================= */}

        <div
          className="
            mt-10
            flex items-center justify-center gap-3
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            px-5 py-3

            dark:border-[#1e3b5c]
            dark:bg-[#0b1b33]
          "
        >

          <span
            className="
              text-sm font-medium
              text-gray-600
              dark:text-gray-300
            "
          >
            🌙 โหมดการแสดงผล
          </span>

          <DarkModeToggle />

        </div>


        {/* ================= DIVIDER ================= */}

        <div
          className="
            mt-10
            border-t
            border-gray-200
            pt-7

            dark:border-[#1e3b5c]
          "
        >

          <div
            className="
              flex flex-col
              items-center
              justify-between
              gap-4
              md:flex-row
            "
          >

            <p
              className="
                text-sm
                text-gray-400
                dark:text-gray-500
              "
            >
              © {new Date().getFullYear()} PP SHOP. All rights reserved.
            </p>


            <div className="flex gap-5 text-sm">

              <Link
                href="/privacy"
                className="
                  text-gray-400
                  transition-colors
                  hover:text-blue-600

                  dark:text-gray-500
                  dark:hover:text-blue-400
                "
              >
                นโยบายความเป็นส่วนตัว
              </Link>

              <Link
                href="/terms"
                className="
                  text-gray-400
                  transition-colors
                  hover:text-blue-600

                  dark:text-gray-500
                  dark:hover:text-blue-400
                "
              >
                เงื่อนไขการใช้งาน
              </Link>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}