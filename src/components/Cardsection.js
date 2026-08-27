
import Image from "next/image";



export default function Cardsection() {
  const products = [
    {
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      name: "หูฟังไร้สาย Noise Cancelling",
      description:
        "ตัดเสียงรบกวนได้ดีเยี่ยม แบตเตอรี่ใช้งานได้ยาวนาน 30 ชั่วโมง",
      price: "฿4,990",
    },
    {
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
      name: "กล้อง Mirrorless 4K",
      description:
        "กล้องดิจิตอลความละเอียดสูง พร้อมเลนส์คิท 15-45mm",
      price: "฿25,900",
    },
    {
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
      name: "นาฬิกาสมาร์ทวอทช์",
      description:
        "ติดตามการออกกำลังกาย วัดอัตราการเต้นของหัวใจ กันน้ำได้",
      price: "฿3,200",
    },
    {
      image:
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80",
      name: "หูฟัง Bluetooth Pro",
      description:
        "เสียงคมชัด เชื่อมต่อ Bluetooth ได้รวดเร็ว พร้อมไมโครโฟน",
      price: "฿2,490",
    },
    {
      image:
        "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=500&q=80",
      name: "กล้องดิจิตอล Compact",
      description:
        "กล้องขนาดกะทัดรัด ถ่ายภาพคมชัด พกพาสะดวก เหมาะสำหรับท่องเที่ยว",
      price: "฿8,990",
    },
    {
      image:
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80",
      name: "Smartwatch Sport",
      description:
        "นาฬิกาสำหรับออกกำลังกาย รองรับการติดตามกิจกรรมและแจ้งเตือน",
      price: "฿2,990",
    },

    // ================= สินค้าเพิ่มเติม =================

    {
      image:
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&q=80",
      name: "สมาร์ทโฟน Pro Max",
      description:
        "หน้าจอคมชัด กล้องคุณภาพสูง พร้อมประสิทธิภาพสำหรับการใช้งานทุกวัน",
      price: "฿29,900",
    },

    {
      image:
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&q=80",
      name: "Laptop Pro 15",
      description:
        "โน้ตบุ๊กประสิทธิภาพสูง เหมาะสำหรับทำงาน เขียนโปรแกรม และเรียน",
      price: "฿32,900",
    },

    {
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
      name: "ลำโพง Bluetooth",
      description:
        "เสียงทรงพลัง เบสแน่น เชื่อมต่อไร้สาย พร้อมแบตเตอรี่ใช้งานยาวนาน",
      price: "฿1,990",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 transition-colors duration-300 dark:bg-[#071426]">

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-10 text-center">

          <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            FEATURED PRODUCTS
          </span>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            สินค้าแนะนำ
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            เลือกชมสินค้าที่น่าสนใจของเรา
          </p>

        </div>

        {/* ================================================= */}
        {/* PRODUCT GRID */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {products.map((product, index) => (

            <div
              key={index}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-[#1e3b5c] dark:bg-[#102542] dark:shadow-black/20"
            >

              {/* IMAGE */}

              <div className="relative h-52 w-full overflow-hidden bg-gray-100 dark:bg-[#0b1b33]">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-600 backdrop-blur-sm dark:bg-[#0b1b33]/90 dark:text-blue-400">
                  แนะนำ
                </div>

              </div>

              {/* CONTENT */}

              <div className="p-5">

                <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </h3>

                <p className="mt-2 min-h-[40px] line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {product.description}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3">

                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      ราคา
                    </p>

                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {product.price}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    เพิ่มลงตะกร้า
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* ================================================= */}
        {/* VIEW ALL */}
        {/* ================================================= */}

        <div className="mt-10 text-center">

          <button
            type="button"
            className="rounded-full border border-gray-300 bg-white px-7 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-blue-500 hover:text-blue-600 dark:border-[#2a4868] dark:bg-[#102542] dark:text-gray-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
          >
            ดูสินค้าทั้งหมด →
          </button>

        </div>

        {/* ================================================= */}
        {/* VIDEO REVIEW */}
        {/* ================================================= */}

        <div className="mt-20">

          {/* Video Header */}

          <div className="mb-8 text-center">

            <span className="mb-3 inline-block rounded-full bg-red-100 px-4 py-1 text-xs font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-400">
              VIDEO REVIEW
            </span>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              รีวิวสินค้าจากเรา
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              ดูรายละเอียดและการใช้งานสินค้าก่อนตัดสินใจซื้อ
            </p>

          </div>

          {/* Video Box */}

          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-2 shadow-xl dark:border-[#1e3b5c] dark:bg-[#102542]">

            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">

              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="รีวิวสินค้า PP SHOP"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

            </div>

          </div>

          {/* Video Description */}

          <div className="mx-auto mt-6 max-w-3xl text-center">

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              รีวิวสินค้าแบบเจาะลึก
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              ทดลองใช้งานจริง พร้อมแนะนำจุดเด่นและรายละเอียดต่าง ๆ
              เพื่อช่วยให้คุณเลือกสินค้าที่เหมาะกับการใช้งานมากที่สุด
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}