"use client";

import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function ServicePage() {
  const services = [
    {
      icon: "🛍️",
      title: "จำหน่ายสินค้าไอที",
      description:
        "รวบรวมสินค้าไอที แก็ดเจ็ต และอุปกรณ์อิเล็กทรอนิกส์หลากหลายประเภท เพื่อให้คุณเลือกซื้อได้ง่ายในที่เดียว",
    },
    {
      icon: "🔍",
      title: "แนะนำสินค้า",
      description:
        "ช่วยแนะนำสินค้าให้เหมาะกับการใช้งานและงบประมาณของคุณ เพื่อให้ตัดสินใจเลือกซื้อได้ง่ายขึ้น",
    },
    {
      icon: "📦",
      title: "จัดส่งสินค้า",
      description:
        "ดูแลการจัดเตรียมและจัดส่งสินค้าอย่างเป็นระบบ พร้อมติดตามสถานะการจัดส่งของคุณ",
    },
    {
      icon: "💬",
      title: "บริการให้คำปรึกษา",
      description:
        "หากไม่แน่ใจว่าสินค้าตัวไหนเหมาะกับคุณ สามารถติดต่อทีมงานเพื่อสอบถามข้อมูลเพิ่มเติมได้",
    },
    {
      icon: "🛠️",
      title: "ช่วยเหลือหลังการขาย",
      description:
        "พร้อมช่วยเหลือเมื่อพบปัญหาเกี่ยวกับสินค้าและการสั่งซื้อ เพื่อให้คุณได้รับประสบการณ์ที่ดีที่สุด",
    },
    {
      icon: "🔒",
      title: "การสั่งซื้อที่ปลอดภัย",
      description:
        "ให้ความสำคัญกับความปลอดภัยของข้อมูลและประสบการณ์การใช้งานของลูกค้า",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "เลือกสินค้า",
      description:
        "เลือกดูสินค้าที่สนใจจากหน้าเว็บไซต์และตรวจสอบรายละเอียดสินค้า",
    },
    {
      number: "02",
      title: "เพิ่มลงตะกร้า",
      description:
        "เพิ่มสินค้าที่ต้องการลงในตะกร้าและตรวจสอบรายการสั่งซื้อ",
    },
    {
      number: "03",
      title: "ยืนยันคำสั่งซื้อ",
      description:
        "กรอกข้อมูลที่จำเป็นและตรวจสอบรายละเอียดก่อนยืนยันคำสั่งซื้อ",
    },
    {
      number: "04",
      title: "รอรับสินค้า",
      description:
        "เราดำเนินการจัดเตรียมและจัดส่งสินค้าให้คุณตามข้อมูลที่ระบุไว้",
    },
  ];

  return (
    <main
      className="
        min-h-screen
        px-4 pb-20 pt-32
        transition-all duration-500

        bg-gradient-to-br
        from-gray-50
        via-blue-50
        to-indigo-50

        text-gray-900

        dark:from-[#030b18]
        dark:via-[#071426]
        dark:to-[#0b1b33]
        dark:text-white
      "
    >
      <div className="mx-auto max-w-6xl">

        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="mb-20 text-center">

          <span
            className="
              mb-4 inline-block rounded-full
              border border-blue-100
              bg-blue-100
              px-4 py-1
              text-xs font-semibold
              text-blue-600

              dark:border-blue-500/20
              dark:bg-blue-500/10
              dark:text-blue-400
            "
          >
            OUR SERVICES
          </span>

          <h1
            className="
              text-4xl font-bold tracking-tight
              text-gray-900
              dark:text-white
              md:text-5xl
            "
          >
            บริการของเรา
          </h1>

          <p
            className="
              mx-auto mt-5 max-w-3xl
              text-base leading-relaxed
              text-gray-600
              dark:text-gray-400
              md:text-lg
            "
          >
            PP SHOP ไม่ได้เป็นเพียงร้านค้าออนไลน์
            แต่เราต้องการดูแลคุณตั้งแต่การเลือกสินค้า
            การสั่งซื้อ ไปจนถึงบริการหลังการขาย
          </p>

        </section>


        {/* ================================================= */}
        {/* SERVICES */}
        {/* ================================================= */}

        <section className="mb-20">

          <div className="mb-10 text-center">

            <span
              className="
                text-sm font-semibold
                text-blue-600
                dark:text-blue-400
              "
            >
              WHAT WE OFFER
            </span>

            <h2
              className="
                mt-2 text-3xl font-bold
                text-gray-900
                dark:text-white
              "
            >
              เรามีบริการอะไรบ้าง?
            </h2>

            <p
              className="
                mt-3
                text-gray-600
                dark:text-gray-400
              "
            >
              ทุกบริการออกแบบมาเพื่อให้การซื้อสินค้าเป็นเรื่องง่าย
            </p>

          </div>


          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {services.map((service, index) => (

              <div
                key={index}
                className="
                  group rounded-2xl
                  border
                  border-gray-200
                  bg-white/90
                  p-7
                  shadow-sm
                  backdrop-blur

                  transition-all duration-300

                  hover:-translate-y-1
                  hover:border-blue-300
                  hover:shadow-xl
                  hover:shadow-blue-500/10

                  dark:border-[#1e3b5c]
                  dark:bg-[#102542]/90
                  dark:hover:border-blue-500/50
                  dark:hover:shadow-blue-500/10
                "
              >

                {/* Icon */}

                <div
                  className="
                    flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    bg-blue-100
                    text-2xl

                    transition-transform duration-300
                    group-hover:scale-110

                    dark:bg-blue-500/10
                  "
                >
                  {service.icon}
                </div>


                {/* Title */}

                <h3
                  className="
                    mt-6 text-lg font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {service.title}
                </h3>


                {/* Description */}

                <p
                  className="
                    mt-3 text-sm leading-relaxed
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {service.description}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* ================================================= */}
        {/* HOW IT WORKS */}
        {/* ================================================= */}

        <section className="mb-20">

          <div className="mb-10 text-center">

            <span
              className="
                text-sm font-semibold
                text-blue-600
                dark:text-blue-400
              "
            >
              HOW IT WORKS
            </span>

            <h2
              className="
                mt-2 text-3xl font-bold
                text-gray-900
                dark:text-white
              "
            >
              ขั้นตอนการสั่งซื้อ
            </h2>

            <p
              className="
                mt-3
                text-gray-600
                dark:text-gray-400
              "
            >
              สั่งซื้อสินค้ากับ PP SHOP ได้ง่าย ๆ เพียงไม่กี่ขั้นตอน
            </p>

          </div>


          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

            {steps.map((step, index) => (

              <div
                key={index}
                className="
                  relative rounded-2xl
                  border
                  border-gray-200
                  bg-white/90
                  p-6
                  shadow-sm
                  backdrop-blur

                  transition-all duration-300

                  hover:-translate-y-1
                  hover:border-blue-300
                  hover:shadow-lg
                  hover:shadow-blue-500/10

                  dark:border-[#1e3b5c]
                  dark:bg-[#102542]/90
                  dark:hover:border-blue-500/50
                "
              >

                <span
                  className="
                    text-4xl font-black
                    text-blue-100
                    dark:text-blue-500/20
                  "
                >
                  {step.number}
                </span>

                <h3
                  className="
                    mt-3 text-lg font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    mt-2 text-sm leading-relaxed
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {step.description}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* ================================================= */}
        {/* CUSTOMER CARE */}
        {/* ================================================= */}

        <section
          className="
            mb-20
            overflow-hidden
            rounded-3xl
            bg-gradient-to-br
            from-blue-600
            via-indigo-600
            to-blue-800
            p-8
            shadow-xl
            shadow-blue-500/20

            md:p-12
          "
        >

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">

            {/* Text */}

            <div>

              <span className="text-sm font-semibold text-blue-200">
                CUSTOMER CARE
              </span>

              <h2 className="mt-3 text-3xl font-bold text-white">
                เราพร้อมดูแลคุณ
              </h2>

              <p className="mt-5 leading-relaxed text-blue-100">
                หากคุณมีคำถามเกี่ยวกับสินค้า การสั่งซื้อ
                การจัดส่ง หรือพบปัญหาในการใช้งาน
                สามารถติดต่อทีมงาน PP SHOP ได้ตลอดเวลาที่เปิดให้บริการ
              </p>

              <Link
                href="/contact"
                className="
                  mt-7 inline-flex
                  rounded-full
                  bg-white
                  px-7 py-3
                  text-sm font-semibold
                  text-blue-600

                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-blue-50
                  hover:shadow-lg
                "
              >
                ติดต่อเรา →
              </Link>

            </div>


            {/* Features */}

            <div className="grid grid-cols-2 gap-4">

              {[
                {
                  icon: "⚡",
                  title: "ตอบกลับรวดเร็ว",
                  description: "พร้อมช่วยตอบคำถามและให้ข้อมูล",
                },
                {
                  icon: "🤝",
                  title: "ใส่ใจลูกค้า",
                  description: "ให้ความสำคัญกับทุกความคิดเห็น",
                },
                {
                  icon: "💡",
                  title: "ให้คำแนะนำ",
                  description: "ช่วยเลือกสินค้าให้เหมาะกับคุณ",
                },
                {
                  icon: "🛡️",
                  title: "ดูแลหลังการขาย",
                  description: "พร้อมช่วยเหลือหลังการซื้อ",
                },
              ].map((item, index) => (

                <div
                  key={index}
                  className="
                    rounded-2xl
                    border border-white/10
                    bg-white/10
                    p-5
                    backdrop-blur

                    transition-all duration-300
                    hover:-translate-y-1
                    hover:bg-white/15
                  "
                >

                  <div className="text-3xl">
                    {item.icon}
                  </div>

                  <h3 className="mt-4 font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-blue-100">
                    {item.description}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* ================================================= */}
        {/* FAQ */}
        {/* ================================================= */}

        <section className="mb-20">

          <div className="mb-10 text-center">

            <span
              className="
                text-sm font-semibold
                text-blue-600
                dark:text-blue-400
              "
            >
              FAQ
            </span>

            <h2
              className="
                mt-2 text-3xl font-bold
                text-gray-900
                dark:text-white
              "
            >
              คำถามที่พบบ่อย
            </h2>

          </div>


          <div className="mx-auto max-w-4xl space-y-4">

            <details
              className="
                group rounded-2xl
                border border-gray-200
                bg-white/90
                p-5
                shadow-sm
                transition-all duration-300

                hover:border-blue-300
                hover:shadow-lg

                dark:border-[#1e3b5c]
                dark:bg-[#102542]/90
                dark:hover:border-blue-500/50
              "
            >

              <summary
                className="
                  cursor-pointer
                  list-none
                  font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                สามารถสอบถามรายละเอียดสินค้าก่อนได้หรือไม่?
              </summary>

              <p
                className="
                  mt-3 text-sm leading-relaxed
                  text-gray-500
                  dark:text-gray-400
                "
              >
                ได้ คุณสามารถติดต่อทีมงานเพื่อสอบถามรายละเอียด
                คุณสมบัติ หรือคำแนะนำเกี่ยวกับสินค้าได้
              </p>

            </details>


            <details
              className="
                group rounded-2xl
                border border-gray-200
                bg-white/90
                p-5
                shadow-sm
                transition-all duration-300

                hover:border-blue-300
                hover:shadow-lg

                dark:border-[#1e3b5c]
                dark:bg-[#102542]/90
                dark:hover:border-blue-500/50
              "
            >

              <summary
                className="
                  cursor-pointer
                  list-none
                  font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                มีบริการจัดส่งสินค้าหรือไม่?
              </summary>

              <p
                className="
                  mt-3 text-sm leading-relaxed
                  text-gray-500
                  dark:text-gray-400
                "
              >
                มี เรามีบริการจัดส่งสินค้า
                โดยรายละเอียดการจัดส่งสามารถตรวจสอบได้ในขั้นตอนการสั่งซื้อ
              </p>

            </details>


            <details
              className="
                group rounded-2xl
                border border-gray-200
                bg-white/90
                p-5
                shadow-sm
                transition-all duration-300

                hover:border-blue-300
                hover:shadow-lg

                dark:border-[#1e3b5c]
                dark:bg-[#102542]/90
                dark:hover:border-blue-500/50
              "
            >

              <summary
                className="
                  cursor-pointer
                  list-none
                  font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                หากได้รับสินค้าแล้วพบปัญหาต้องทำอย่างไร?
              </summary>

              <p
                className="
                  mt-3 text-sm leading-relaxed
                  text-gray-500
                  dark:text-gray-400
                "
              >
                สามารถติดต่อทีมงาน PP SHOP ผ่านหน้าติดต่อเรา
                พร้อมแจ้งรายละเอียดปัญหา
                เพื่อให้ทีมงานตรวจสอบและช่วยเหลือ
              </p>

            </details>

          </div>

        </section>


        {/* ================================================= */}
        {/* CTA */}
        {/* ================================================= */}

        <section className="text-center">

          <h2
            className="
              text-3xl font-bold
              text-gray-900
              dark:text-white
            "
          >
            มีอะไรให้เราช่วยไหม?
          </h2>

          <p
            className="
              mx-auto mt-3 max-w-xl
              text-sm leading-relaxed
              text-gray-500
              dark:text-gray-400
            "
          >
            หากต้องการข้อมูลเพิ่มเติมเกี่ยวกับสินค้าและบริการ
            ทีมงาน PP SHOP พร้อมให้คำแนะนำ
          </p>


          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/"
              className="
                rounded-full
                bg-gray-900
                px-7 py-3
                text-sm font-semibold
                text-white
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-blue-600
                hover:shadow-lg

                dark:bg-blue-600
                dark:hover:bg-blue-700
              "
            >
              ดูสินค้า
            </Link>


            <Link
              href="/contact"
              className="
                rounded-full
                border
                border-gray-300
                bg-white
                px-7 py-3
                text-sm font-semibold
                text-gray-700
                transition-all duration-300

                hover:-translate-y-0.5
                hover:border-blue-500
                hover:text-blue-600

                dark:border-[#2a4868]
                dark:bg-[#102542]
                dark:text-gray-200
                dark:hover:border-blue-500
                dark:hover:text-blue-400
              "
            >
              ติดต่อเรา
            </Link>

          </div>

        </section>

      </div>
    </main>
  );
}