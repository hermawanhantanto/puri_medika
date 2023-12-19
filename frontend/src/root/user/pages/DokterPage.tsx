import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { useAuth } from "@/hooks/useAuth";
import { useGetAllDokter } from "@/lib/react-query/queriesAndMutation";
import Spinner from "@/components/shared/Spinner";
import { IDokter } from "@/types";
import "./style.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const DokterPage = () => {
  const { user } = useAuth();
  const { data: dokters } = useGetAllDokter({ token: user!.token });
  if (!user) return <Spinner />;
  return (
    <main className="w-full min-h-screen">
      <section className="lg:flex lg:justify-between bg-slate-300 sm:min-h-[550px]">
        <div className="flex flex-col text-blue-800 font-bold sm:text-3xl text-sm self-center xl:ml-36 lg:ml-12 lg:mb-12 max-lg:text-center max-lg:pt-12">
          <h1>Temui Tim Dokter Ahli Kami</h1>
          <h1 className="my-4">Segera Jadwalkan Konsultasi Anda Hari Ini</h1>
          <p className="max-w-[300px] text-xs text-slate-500 max-lg:self-center">
            Dengan tim dokter dan ahli terbaik kami, kami akan memberikan
            pelayanan yang belum pernah anda dapatkan sebelumnya di tempat lain
          </p>
        </div>
        <div className="flex-1">
          <img
            src="assets/images/doctor-hero.png"
            alt="dokter-hero"
            className="object-cover w-full h-full"
          />
        </div>
      </section>
      <section className="mt-12">
        <h1 className="text-center sm:text-3xl font-bold text-xl">
          Tim Dokter dan <span className="text-[#50D890]">Ahli Kami</span>
        </h1>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          speed={600}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container mt-12"
        >
          {dokters?.data.data.map((dokter: IDokter) => (
            <SwiperSlide key={dokter.id}>
              <Card>
                <CardContent className="p-5">
                  <img
                    src={dokter.gambar}
                    alt={dokter.nama}
                    className="object-cover shadow"
                  />
                  <CardTitle className="lg:text-3xl mt-2 text-xl">
                    {dokter.nama}
                  </CardTitle>
                  <CardDescription className="lg:text-xl text-sm">
                    {dokter.spesialis}
                  </CardDescription>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
};

export default DokterPage;
