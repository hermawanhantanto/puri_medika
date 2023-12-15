const Dashboard = () => {
  return (
    <main className="gap-12 flex flex-col w-full">
      <section className="max-w-[1440px] mx-auto relative flex flex-col lg:pt-24 pt-12 max-lg:px-4 ">
        <div className="flex max-lg:flex-col justify-between">
          <div className="flex flex-col max-lg:items-center">
            <div className="bg-[#50D890] flex items-center justify-center px-4 py-2 md:6 md:3 rounded-lg text-white text-sm md:text-lg  w-fit">
              <p className="text-sm">Selamat datang di Puri Medika</p>
            </div>
            <h1 className="lg:mt-4 mt-4 font-bold text-[24px] lg:text-[48px] text-[#272727]">
              Yang berarti
            </h1>
            <h1 className="font-bold text-[24px] lg:text-[48px] text-[#272727] max-lg:mb-4">
              akan segera kembali
            </h1>
          </div>
          <img src="assets/images/hero-image1.png" alt="hero-1" />
        </div>
        <div className="relative">
          <img
            src="assets/images/hero-image2.png"
            className="mt-4 w-full"
            alt=" hero-2"
          />
          <p className="sm:absolute sm:max-w-[180px] xl:max-w-[298px] text-[#868585] font-bold lg:right-12 sm:right-0 sm:top-5 lg:top-10 text-xs xl:text-lg max-sm:mt-4 max-sm:text-center">
            Kami akan selalu memastikan penanganan yang terbaik bagi orang yang
            berarti untuk anda.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto">
        <div className="flex flex-col bg-[#EDF5FA] lg:rounded-[100px] p-12">
          <h2 className="lg:text-3xl text-lg text-center text-black font-bold">
            Pelayanan <span className="text-[#50D890]">Unggulan</span>
          </h2>
          <h1 className="font-bold text-center text-sm lg:text-3xl mt-4">
            Puri Medika Akan Selalu Memberikan
          </h1>
          <h1 className="font-bold text-center text-sm lg:text-3xl">
            Pelayanan Terbaik
          </h1>
          <div className="flex justify-center gap-8 mt-[47px] max-lg:flex-col">
            <div className="flex flex-col justify-center items-center">
              <p className="text-xl font-bold mb-4">Poli Jantung</p>
              <img
                src="assets/images/service-1.png"
                alt="service-1"
                className="transition duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
              />
              <img
                src="assets/icons/service-1.png"
                className="sm:mt-[-3rem] mt-[-1.5rem] max-sm:w-12 w-20 transition duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
                alt="service-icons1"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-xl font-bold mb-4">Poli Gigi</p>
              <img
                src="assets/images/service-2.png"
                alt="service-2"
                className="transition duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
              />
              <img
                src="assets/icons/service-2.png"
                className="sm:mt-[-3rem] mt-[-1.5rem] max-sm:w-12 w-20 transition duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
                alt="service-icons2"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-xl font-bold mb-4">Poli Mata</p>

              <img
                src="assets/images/service-3.png"
                alt="service-3"
                className="transition duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
              />
              <img
                src="assets/icons/service-3.png"
                className="sm:mt-[-3rem] mt-[-1.5rem] max-sm:w-12 w-20 transition duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
                alt="service-icons3"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto">
        <div className="flex flex-col">
          <h2 className="sm:text-3xl text-xl text-center text-black font-bold mt-[11px]">
            Tentang <span className="text-[#50D890]">Kami</span>
          </h2>
          <div className="flex justify-between items-center mt-12 max-lg:flex-col max-lg:gap-8 gap-12">
            <div className="sm:grid sm:grid-cols-2 flex flex-col gap-4 lg:w-[620px]">
              <div className="col-span-2 sm:rounded-[40px] py-[43px] bg-[#E5F0F7] px-12 shadow">
                <h4 className="sm:text-lg text-sm font-bold text-center">
                  Mengapa Memilih Kami ?
                </h4>
                <p className="text-center sm:text-sm mt-2 text-xs">
                  Memilih kami berarti memilih kualitas perawatan yang tak
                  tertandingi, empati sejati, dan kepedulian yang mendalam. Kami
                  tidak hanya menyediakan layanan medis terbaik, tetapi juga
                  menciptakan pengalaman perawatan yang unik dan personal.
                </p>
              </div>

              <div className="sm:rounded-[40px] py-[43px] bg-[#E5F9EE] px-12 shadow">
                <h4 className="sm:text-lg text-sm font-bold text-center">
                  Visi Kami
                </h4>
                <p className="text-center sm:text-sm text-xs mt-2">
                  Memberikan pelayanan kesehatan berkualitas tinggi dengan
                  kepedulian, inovasi, dan keberlanjutan untuk meningkatkan
                  kesejahteraan masyarakat.
                </p>
              </div>
              <div className="sm:rounded-[40px] py-[43px] bg-[#E5F9EE] px-12 shadow">
                <h4 className="sm:text-lg text-sm font-bold text-center">
                  Misi Kami
                </h4>
                <p className="text-center sm:text-sm text-xs mt-2">
                  Memberikan pelayanan kesehatan berkualitas tinggi dengan
                  kepedulian, inovasi, dan keberlanjutan untuk meningkatkan
                  kesejahteraan masyarakat.
                </p>
              </div>
            </div>
            <img src="assets/images/about.png" alt="about" />
          </div>
        </div>
      </section>

      <section className="flex lg:justify-between items-center bg-[#2F5B79] lg:px-[80px] mt-12 py-[60px] max-lg:flex-col px-4">
        <div className=" flex flex-col max-lg:mb-8">
          <h2 className="sm:text-[39px] text-[24px] font-bold text-white max-lg:text-center">
            Kami akan selalu siap
          </h2>
          <h2 className="sm:text-[39px] text-[24px] font-bold text-white max-lg:text-center">
            melayani Anda
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col">
            <h1 className="sm:text-[40px] text-[32px] font-bold text-white">
              8K+
            </h1>
            <p className="sm:text-[20px] text-[12px] text-white font-bold">
              Pasien Puas
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="sm:text-[40px] text-[32px] font-bold text-white">
              67
            </h1>
            <p className="sm:text-[20px] text-[12px] text-white font-bold">
              Total Penghargaan
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="sm:text-[40px] text-[32px] font-bold text-white">
              920
            </h1>
            <p className="sm:text-[20px] text-[12px] text-white font-bold">
              Masalah Selesai
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="sm:text-[40px] text-[32px]  font-bold text-white">
              72+
            </h1>
            <p className="sm:text-[20px] text-[12px] text-white font-bold">
              Konferensi Diadakan
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col mx-auto max-w-[1440px]">
          <h2 className="sm:text-3xl text-xl text-center text-black font-bold mt-[11px]">
            Apa yang dikatakan <span className="text-[#50D890]">Pasien ?</span>
          </h2>
          <div className="flex justify-between items-center mt-[30px] max-lg:flex-col max-lg:p-5 gap-12">
            <div>
              <p className="max-w-[515px] text-[#868585] font-bold sm:text-lg text-sm max-lg:text-center">
                "Pelayanan medis yang diberikan sangat memuaskan. Staf kami
                berempati, memahami kekhawatiran kami, dan memberikan dukungan
                luar biasa sepanjang perjalanan pengobatan kami."
              </p>
              <div className="flex gap-4 mt-[30px] items-center">
                <img
                  src="assets/images/pasien-1.png"
                  alt="pasien-1"
                  className="max-sm:w-14"
                />
                <p className="text-lg font-bold">Jane Cooper</p>
              </div>
            </div>
            <div>
              <p className="max-w-[515px] text-[#868585] font-bold sm:text-lg text-sm max-lg:text-center">
                "Kami sangat berterima kasih atas perawatan yang telaten dan
                penuh kepedulian yang kami terima di sini. Rumah sakit ini bukan
                hanya tempat pengobatan, tetapi juga tempat di mana harapan
                pulih dan kenyamanan ditemukan."
              </p>
              <div className="flex gap-4 mt-[30px] items-center">
                <img
                  src="assets/images/pasien-2.png"
                  alt="pasien-2"
                  className="max-sm:w-14"
                />
                <p className="text-lg font-bold">Esther Howard</p>
              </div>
            </div>
          </div>
        </div>
        <img
          src="assets/images/happy-customer.png"
          className="w-full mt-12"
          alt="happy-pasien"
        />
      </section>

      <section className="flex flex-col mb-12 mx-auto max-w-[1440px] max-lg:p-5">
        <h2 className="sm:text-3xl text-xl text-center text-black font-bold mt-[11px]">
          Lokasi
        </h2>
        <div className="flex justify-evenly gap-8 mt-12 relative max-xl:flex-col">
          <img
            src="assets/images/lokasi-1.png"
            className="lg:max-h-[444px] transition duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
            alt="lokasi-1"
          />
          <img
            src="assets/images/lokasi-2.png"
            className="xl:mt-24 transition duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
            alt=" lokasi-2"
          />
          <img
            src="assets/images/lokasi-3.png"
            className="lg:max-h-[444px] transition duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
            alt="lokasi-3"
          />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
