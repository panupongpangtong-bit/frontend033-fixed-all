"use client";

import { useCart } from "@/app/(main)/context/cartcontext";

export default function CartPage() {
  const { cart, totalItems, totalPrice } = useCart();

  return (
    <main className="min-h-screen bg-gray-50 p-8 dark:bg-[#071426]">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          ตะกร้าสินค้า
        </h1>

        <p className="mt-2 text-gray-500">
          จำนวนสินค้า: {totalItems} ชิ้น
        </p>

        <div className="mt-8">
          {cart.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center dark:bg-[#102542]">
              <p className="text-gray-500 dark:text-gray-400">
                ยังไม่มีสินค้าในตะกร้า
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl bg-white p-5 dark:bg-[#102542]"
                >
                  <h2 className="font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h2>

                  <p className="mt-1 text-blue-600">
                    {product.price}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    จำนวน {product.quantity} ชิ้น
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 text-right">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            รวม ฿{totalPrice.toLocaleString()}
          </p>
        </div>
      </div>
    </main>
  );
}