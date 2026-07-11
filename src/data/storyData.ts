export interface StoryStep {
  text: string;
  action?: "navigate" | "scroll" | "highlight";
  target?: string;
}

export type StoryScript = Record<string, StoryStep[]>;

export const storyData: StoryScript = {
  "/": [
    { text: "Halo. Selamat datang di ruang digital saya." },
    {
      text: "Saya Kharis. Anda mungkin melihat ini hanya website portofolio biasa seperti yang lain.",
    },
    {
      text: "Namun bagi saya, ini adalah rumah. Tempat di mana ide-ide liar diterjemahkan menjadi baris kode yang bernapas.",
    },
    {
      text: "Semuanya berawal dari rasa ingin tahu yang sederhana: 'Bagaimana cara komputer memahami bahasa kita?'",
    },
    {
      text: "Rasa penasaran itu menuntun saya pada perjalanan tanpa akhir di dunia software engineering.",
    },
    {
      text: "Bagi saya, desain bukan hanya soal estetika. Desain adalah tentang fungsi, empati, dan bagaimana kita memecahkan masalah pengguna.",
    },
    {
      text: "Saya memegang teguh prinsip bahwa kode yang baik adalah kode yang bercerita. Dan hari ini, saya ingin menceritakan kisah saya kepada Anda.",
    },
    {
      text: "Mari, saya tunjukkan mahakarya yang telah saya tempa di ruang pameran saya.",
      action: "navigate",
      target: "/projects",
    },
  ],
  "/projects": [
    { text: "Selamat datang di ruang pameran utama saya." },
    {
      text: "Setiap proyek di sini memiliki ceritanya sendiri. Mereka lahir dari keringat, kopi malam hari, dan ratusan jam *debugging*.",
    },
    {
      text: "Ada proyek yang menantang batas kesabaran saya, dan ada pula yang mengubah cara saya melihat arsitektur perangkat lunak.",
    },
    {
      text: "Cobalah telusuri beberapa proyek ini. Anda akan melihat bagaimana saya memecahkan masalah kompleks menjadi antarmuka yang elegan.",
    },
    {
      text: "Tentu, sebuah karya tak akan tercipta tanpa pengalaman yang menempanya. Mari kita lihat darimana saya mendapatkan pengalaman tersebut.",
      action: "navigate",
      target: "/experience",
    },
  ],
  "/experience": [
    {
      text: "Setiap pengalaman adalah batu loncatan yang membentuk pola pikir saya saat ini.",
    },
    {
      text: "Saya pernah berada di posisi di mana saya sama sekali tidak tahu apa yang harus saya lakukan...",
    },
    {
      text: "Namun justru di sanalah saya belajar paling banyak. Tekanan mengajarkan saya tentang ketahanan (*resilience*).",
    },
    {
      text: "Bekerja dalam tim mengajarkan saya bahwa komunikasi sama pentingnya dengan algoritma yang efisien.",
    },
    {
      text: "Semua perjalanan ini membekali saya dengan pemahaman mendalam tentang siklus hidup sebuah produk.",
    },
    {
      text: "Namun, pengetahuan teoretis tidak akan berarti tanpa alat yang tepat. Ingin tahu persenjataan apa saja yang saya gunakan?",
      action: "navigate",
      target: "/tech-stack",
    },
  ],
  "/tech-stack": [
    { text: "Selamat datang di gudang senjata (*armory*) saya." },
    {
      text: "Banyak orang berdebat tentang *framework* mana yang terbaik. Tapi bagi saya, teknologi hanyalah sebuah alat.",
    },
    {
      text: "Yang terpenting bukanlah seberapa banyak alat yang Anda kuasai, melainkan seberapa tajam Anda menggunakannya untuk memecahkan masalah.",
    },
    {
      text: "Saya memilih React dan Next.js bukan karena mereka populer, melainkan karena ekosistemnya memberdayakan saya untuk membangun dengan cepat dan aman.",
    },
    {
      text: "Sistem *database* dan *cloud* yang saya gunakan selalu disesuaikan dengan kebutuhan skalabilitas proyek.",
    },
    {
      text: "Tentu, saya tidak menyimpan pengetahuan ini untuk diri sendiri. Berbagi adalah cara terbaik untuk belajar.",
      action: "navigate",
      target: "/articles",
    },
  ],
  "/articles": [
    {
      text: "Di sinilah saya menuangkan pemikiran, keluh kesah, dan panduan teknis.",
    },
    {
      text: "Saya sangat percaya bahwa pengetahuan akan berkembang berlipat ganda ketika dibagikan kepada orang lain.",
    },
    {
      text: "Tulisan-tulisan ini adalah dokumentasi dari kesalahan yang pernah saya buat, agar Anda tidak perlu mengulanginya.",
    },
    {
      text: "Menulis juga melatih saya untuk menyederhanakan konsep rumit menjadi penjelasan yang mudah dicerna.",
    },
    {
      text: "Dan sungguh luar biasa melihat bagaimana sebuah tulisan sederhana bisa menjangkau orang di belahan dunia lain.",
      action: "navigate",
      target: "/globe",
    },
  ],
  "/globe": [
    { text: "Internet menghapus batas-batas geografis kita." },
    {
      text: "Ide yang saya ketik di kamar saya di Indonesia, bisa diakses dan memberikan manfaat bagi seseorang di Eropa atau Amerika.",
    },
    {
      text: "Peta ini adalah representasi dari jangkauan tersebut. Sebuah pengingat bahwa kita terhubung dalam satu jaringan raksasa.",
    },
    {
      text: "Setiap titik cahaya di peta ini mewakili seseorang yang pernah berinteraksi dengan karya saya.",
    },
    {
      text: "Dan berbicara tentang interaksi, saya selalu senang mendengar langsung dari para pengunjung.",
      action: "navigate",
      target: "/guestbook",
    },
  ],
  "/guestbook": [
    {
      text: "Buku tamu digital. Tradisi klasik web yang kembali saya hidupkan di sini.",
    },
    {
      text: "Setiap pengunjung adalah bagian dari perjalanan saya. Pesan-pesan yang ditinggalkan di sini menjadi penyemangat tak ternilai.",
    },
    {
      text: "Jangan ragu untuk meninggalkan jejak Anda. Kritik, sapaan, atau sekadar emoji—semuanya sangat saya hargai.",
    },
    {
      text: "Melihat nama-nama yang terpampang di sini selalu mengingatkan saya pada seberapa jauh perjalanan ini telah berlangsung.",
      action: "navigate",
      target: "/timeline",
    },
  ],
  "/timeline": [
    {
      text: "Lini masa ini merekam jejak-jejak penting (*milestones*) dalam hidup dan karir saya.",
    },
    {
      text: "Dari baris kode pertama yang penuh *error*, hingga peluncuran aplikasi berskala besar.",
    },
    {
      text: "Setiap kegagalan dicatat sebagai pelajaran, dan setiap keberhasilan dirayakan sebagai sebuah langkah maju.",
    },
    {
      text: "Perjalanan ini masih panjang, dan halamannya masih terus ditulis setiap harinya.",
    },
    {
      text: "Akhir dari tur ini bukanlah sebuah penutup, melainkan awal dari kolaborasi kita.",
      action: "navigate",
      target: "/contact",
    },
  ],
  "/contact": [
    { text: "Dan tibalah kita di penghujung cerita." },
    {
      text: "Terima kasih telah meluangkan waktu untuk mendengarkan kisah saya dan menjelajahi karya-karya ini.",
    },
    {
      text: "Jika Anda mencari seseorang yang bukan sekadar menulis kode, tetapi juga peduli pada produk dan pengguna akhir...",
    },
    {
      text: "Maka Anda telah menemukan orang yang tepat. Pintu saya selalu terbuka untuk diskusi, ide gila, atau kolaborasi.",
    },
    {
      text: "Mari ciptakan sesuatu yang luar biasa bersama. Silakan sapa saya melalui jalur kontak di halaman ini.",
    },
    { text: "Sampai jumpa di proyek selanjutnya!" },
  ],
};
