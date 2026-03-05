import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeroSection from "./sections/HeroSection";
import MainSection from "./sections/MainSection";

const ProdukView = () => {
  const [isLogin] = useState(false);
  const { push } = useRouter();

  // useEffect(() => {
  //   if (!isLogin) {
  //     push("/auth/login");
  //   }
  // }, [isLogin, push]);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 md:px-10">
      <HeroSection />
      <MainSection />
    </main>
  );
};

export default ProdukView;
