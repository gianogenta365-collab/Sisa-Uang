/* ==================================================
   SisaUang
   SCRIPT.JS
================================================== */


/* ==================================================
   ELEMENT HTML
================================================== */

const uang = document.getElementById("uang");
const tanggal = document.getElementById("tanggal");

const makan = document.getElementById("makan");
const transportasi = document.getElementById("transportasi");
const tabungan = document.getElementById("tabungan");
const lainnya = document.getElementById("lainnya");

const hasilMakan = document.getElementById("hasilMakan");
const hasilTransportasi = document.getElementById("hasilTransportasi");
const hasilTabungan = document.getElementById("hasilTabungan");
const hasilLainnya = document.getElementById("hasilLainnya");
const hasilTotal = document.getElementById("hasilTotal");

const peringatan = document.getElementById("peringatan");
const status = document.getElementById("status");
const riwayat = document.getElementById("riwayat");

const filterTanggal = document.getElementById("filterTanggal");
const filterBulan = document.getElementById("filterBulan");

const btnDarkMode = document.getElementById("btnDarkMode");
const btnSimpan = document.getElementById("btnSimpan");
const btnReset = document.getElementById("btnReset");
const btnHapusSemua = document.getElementById("btnHapusSemua");
const btnResetFilter = document.getElementById("btnResetFilter");

const navButtons =
    document.querySelectorAll(".nav-button");

const pageSections =
    document.querySelectorAll(".page-section");


/* ==================================================
   FORMAT RUPIAH
================================================== */

function formatRupiah(angka) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);

}


/* ==================================================
   FORMAT TANGGAL
================================================== */

function formatTanggal(tanggalISO) {

    if (!tanggalISO) {
        return "-";
    }

    const bagian =
        tanggalISO.split("-");

    if (bagian.length !== 3) {
        return tanggalISO;
    }

    const tahun = bagian[0];
    const bulan = bagian[1];
    const hari = bagian[2];

    return `${hari}-${bulan}-${tahun}`;

}


/* ==================================================
   LOCAL STORAGE - AMBIL RIWAYAT
================================================== */

function ambilRiwayat() {

    const data =
        localStorage.getItem(
            "sisaUangRiwayat"
        );

    if (!data) {
        return [];
    }

    try {

        const hasil =
            JSON.parse(data);

        if (!Array.isArray(hasil)) {
            return [];
        }

        return hasil;

    } catch (error) {

        console.error(
            "Gagal membaca data riwayat:",
            error
        );

        return [];
    }

}


/* ==================================================
   LOCAL STORAGE - SIMPAN RIWAYAT
================================================== */

function simpanRiwayat(daftarRiwayat) {

    localStorage.setItem(
        "sisaUangRiwayat",
        JSON.stringify(daftarRiwayat)
    );

}


/* ==================================================
   HITUNG UANG
================================================== */

function hitungUang() {

    const jumlahUang =
        Number(uang.value) || 0;

    const persenMakan =
        Number(makan.value) || 0;

    const persenTransportasi =
        Number(transportasi.value) || 0;

    const persenTabungan =
        Number(tabungan.value) || 0;

    const persenLainnya =
        Number(lainnya.value) || 0;


    const totalPersen =
        persenMakan +
        persenTransportasi +
        persenTabungan +
        persenLainnya;


    /* CEK PERSENTASE */

    if (totalPersen !== 100) {

        peringatan.textContent =
            `Jumlah persentase harus 100%. ` +
            `Saat ini ${totalPersen}%.`;

    } else {

        peringatan.textContent = "";

    }


    /* HITUNG NOMINAL */

    const uangMakan =
        jumlahUang *
        persenMakan /
        100;

    const uangTransportasi =
        jumlahUang *
        persenTransportasi /
        100;

    const uangTabungan =
        jumlahUang *
        persenTabungan /
        100;

    const uangLainnya =
        jumlahUang *
        persenLainnya /
        100;


    /* TAMPILKAN HASIL */

    hasilMakan.textContent =
        formatRupiah(uangMakan);

    hasilTransportasi.textContent =
        formatRupiah(uangTransportasi);

    hasilTabungan.textContent =
        formatRupiah(uangTabungan);

    hasilLainnya.textContent =
        formatRupiah(uangLainnya);

    hasilTotal.textContent =
        formatRupiah(
            uangMakan +
            uangTransportasi +
            uangTabungan +
            uangLainnya
        );

}


/* ==================================================
   SIMPAN DATA
================================================== */

function simpanData() {

    const jumlahUang =
        Number(uang.value) || 0;

    const tanggalDipilih =
        tanggal.value;

    const persenMakan =
        Number(makan.value) || 0;

    const persenTransportasi =
        Number(transportasi.value) || 0;

    const persenTabungan =
        Number(tabungan.value) || 0;

    const persenLainnya =
        Number(lainnya.value) || 0;


    const totalPersen =
        persenMakan +
        persenTransportasi +
        persenTabungan +
        persenLainnya;


    /* VALIDASI UANG */

    if (jumlahUang <= 0) {

        tampilkanStatus(
            "Masukkan jumlah uang terlebih dahulu.",
            "error"
        );

        return;
    }


    /* VALIDASI TANGGAL */

    if (!tanggalDipilih) {

        tampilkanStatus(
            "Silakan pilih tanggal terlebih dahulu.",
            "error"
        );

        return;
    }


    /* VALIDASI PERSENTASE */

    if (totalPersen !== 100) {

        tampilkanStatus(
            "Jumlah persentase harus tepat 100%.",
            "error"
        );

        return;
    }


    /* HITUNG */

    const uangMakan =
        jumlahUang *
        persenMakan /
        100;

    const uangTransportasi =
        jumlahUang *
        persenTransportasi /
        100;

    const uangTabungan =
        jumlahUang *
        persenTabungan /
        100;

    const uangLainnya =
        jumlahUang *
        persenLainnya /
        100;


    /* DATA BARU */

    const dataBaru = {

        id: Date.now(),

        tanggal: tanggalDipilih,

        uang: jumlahUang,

        makan: uangMakan,

        transportasi: uangTransportasi,

        tabungan: uangTabungan,

        lainnya: uangLainnya

    };


    /* AMBIL DATA LAMA */

    const daftarRiwayat =
        ambilRiwayat();


    /* TAMBAHKAN DATA */

    daftarRiwayat.unshift(
        dataBaru
    );


    /* SIMPAN */

    simpanRiwayat(
        daftarRiwayat
    );


    tampilkanStatus(
        "✓ Pembagian berhasil disimpan.",
        "success"
    );


    /* PERBARUI RIWAYAT DAN STATISTIK */

    tampilkanRiwayat();

    tampilkanStatistik();

}


/* ==================================================
   RIWAYAT TERFILTER
================================================== */

function dapatkanRiwayatTerfilter() {

    const daftarRiwayat =
        ambilRiwayat();

    const tanggalFilter =
        filterTanggal.value;

    const bulanFilter =
        filterBulan.value;


    return daftarRiwayat.filter(
        function(data) {

            /* FILTER TANGGAL */

            if (
                tanggalFilter &&
                data.tanggal !== tanggalFilter
            ) {

                return false;
            }


            /* FILTER BULAN */

            if (
                bulanFilter &&
                !data.tanggal.startsWith(
                    bulanFilter
                )
            ) {

                return false;
            }


            return true;
        }
    );

}


/* ==================================================
   TAMPILKAN RIWAYAT
================================================== */

function tampilkanRiwayat() {

    const hasilFilter =
        dapatkanRiwayatTerfilter();


    /* TIDAK ADA DATA */

    if (hasilFilter.length === 0) {

        riwayat.innerHTML = `
            <div class="kosong">

                <p>
                    Tidak ada riwayat.
                </p>

                <small>
                    Coba pilih tanggal atau bulan lainnya.
                </small>

            </div>
        `;

        return;
    }


    /* TAMPILKAN DATA */

    riwayat.innerHTML =
        hasilFilter
            .map(function(data) {

                return `
                    <div class="item-riwayat">

                        <div class="riwayat-tanggal">
                            📅
                            ${formatTanggal(
                                data.tanggal
                            )}
                        </div>


                        <div class="riwayat-uang">
                            💰
                            ${formatRupiah(
                                data.uang
                            )}
                        </div>


                        <div class="riwayat-detail">

                            <div>
                                🍜 Makan
                                <br>

                                <strong>
                                    ${formatRupiah(
                                        data.makan
                                    )}
                                </strong>
                            </div>


                            <div>
                                🚌 Transportasi
                                <br>

                                <strong>
                                    ${formatRupiah(
                                        data.transportasi
                                    )}
                                </strong>
                            </div>


                            <div>
                                🏦 Tabungan
                                <br>

                                <strong>
                                    ${formatRupiah(
                                        data.tabungan
                                    )}
                                </strong>
                            </div>


                            <div>
                                🛍️ Lainnya
                                <br>

                                <strong>
                                    ${formatRupiah(
                                        data.lainnya
                                    )}
                                </strong>
                            </div>

                        </div>


                        <button
                            class="hapus-riwayat"
                            type="button"
                            data-id="${data.id}"
                        >
                            🗑️ Hapus Riwayat Ini
                        </button>

                    </div>
                `;

            })
            .join("");


    /* EVENT HAPUS */

    const tombolHapus =
        document.querySelectorAll(
            ".hapus-riwayat"
        );


    tombolHapus.forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    const id =
                        Number(
                            button.dataset.id
                        );

                    hapusRiwayat(id);

                }
            );

        }
    );

}


/* ==================================================
   HAPUS SATU RIWAYAT
================================================== */

function hapusRiwayat(id) {

    const daftarRiwayat =
        ambilRiwayat();


    const dataBaru =
        daftarRiwayat.filter(
            function(data) {

                return data.id !== id;

            }
        );


    simpanRiwayat(
        dataBaru
    );


    tampilkanRiwayat();

    tampilkanStatistik();


    tampilkanStatus(
        "Riwayat berhasil dihapus.",
        "success"
    );

}


/* ==================================================
   HAPUS SEMUA RIWAYAT
================================================== */

function hapusSemuaRiwayat() {

    const daftarRiwayat =
        ambilRiwayat();


    if (daftarRiwayat.length === 0) {

        tampilkanStatus(
            "Belum ada riwayat yang bisa dihapus.",
            "error"
        );

        return;
    }


    const yakin =
        confirm(
            "Apakah kamu yakin ingin menghapus semua riwayat?"
        );


    if (!yakin) {
        return;
    }


    localStorage.removeItem(
        "sisaUangRiwayat"
    );


    tampilkanRiwayat();

    tampilkanStatistik();


    tampilkanStatus(
        "Semua riwayat telah dihapus.",
        "success"
    );

}


/* ==================================================
   STATISTIK
================================================== */

function tampilkanStatistik() {

    const data =
        ambilRiwayat();


    let total = 0;

    let totalMakan = 0;

    let totalTransportasi = 0;

    let totalTabungan = 0;

    let totalLainnya = 0;


    /* HITUNG SEMUA DATA */

    data.forEach(
        function(item) {

            total +=
                Number(item.uang) || 0;

            totalMakan +=
                Number(item.makan) || 0;

            totalTransportasi +=
                Number(item.transportasi) || 0;

            totalTabungan +=
                Number(item.tabungan) || 0;

            totalLainnya +=
                Number(item.lainnya) || 0;

        }
    );


    /* TAMPILKAN STATISTIK */

    document.getElementById(
        "statTotal"
    ).textContent =
        formatRupiah(total);


    document.getElementById(
        "statMakan"
    ).textContent =
        formatRupiah(totalMakan);


    document.getElementById(
        "statTransportasi"
    ).textContent =
        formatRupiah(totalTransportasi);


    document.getElementById(
        "statTabungan"
    ).textContent =
        formatRupiah(totalTabungan);


    document.getElementById(
        "statLainnya"
    ).textContent =
        formatRupiah(totalLainnya);


    document.getElementById(
        "statJumlah"
    ).textContent =
        data.length;


    /* TEKS GRAFIK */

    document.getElementById(
        "grafikMakanText"
    ).textContent =
        formatRupiah(totalMakan);


    document.getElementById(
        "grafikTransportasiText"
    ).textContent =
        formatRupiah(totalTransportasi);


    document.getElementById(
        "grafikTabunganText"
    ).textContent =
        formatRupiah(totalTabungan);


    document.getElementById(
        "grafikLainnyaText"
    ).textContent =
        formatRupiah(totalLainnya);


    /* NILAI TERBESAR */

    const nilaiTerbesar =
        Math.max(
            totalMakan,
            totalTransportasi,
            totalTabungan,
            totalLainnya
        );


    /* BELUM ADA DATA */

    if (nilaiTerbesar <= 0) {

        aturGrafik(
            "barMakan",
            0
        );

        aturGrafik(
            "barTransportasi",
            0
        );

        aturGrafik(
            "barTabungan",
            0
        );

        aturGrafik(
            "barLainnya",
            0
        );

        return;
    }


    /* HITUNG PERSENTASE BAR */

    const persenMakan =
        (
            totalMakan /
            nilaiTerbesar
        ) * 100;


    const persenTransportasi =
        (
            totalTransportasi /
            nilaiTerbesar
        ) * 100;


    const persenTabungan =
        (
            totalTabungan /
            nilaiTerbesar
        ) * 100;


    const persenLainnya =
        (
            totalLainnya /
            nilaiTerbesar
        ) * 100;


    /* TAMPILKAN BAR */

    aturGrafik(
        "barMakan",
        persenMakan
    );

    aturGrafik(
        "barTransportasi",
        persenTransportasi
    );

    aturGrafik(
        "barTabungan",
        persenTabungan
    );

    aturGrafik(
        "barLainnya",
        persenLainnya
    );

}


/* ==================================================
   ATUR GRAFIK
================================================== */

function aturGrafik(id, persen) {

    const bar =
        document.getElementById(id);


    if (!bar) {
        return;
    }


    const nilai =
        Math.max(
            0,
            Math.min(
                100,
                persen
            )
        );


    bar.style.width =
        `${nilai}%`;

}


/* ==================================================
   RESET INPUT
================================================== */

function resetData() {

    uang.value = "";

    tanggal.value = "";

    makan.value = 40;

    transportasi.value = 20;

    tabungan.value = 25;

    lainnya.value = 15;

    status.textContent = "";


    hitungUang();

}


/* ==================================================
   RESET FILTER
================================================== */

function resetFilter() {

    filterTanggal.value = "";

    filterBulan.value = "";


    tampilkanRiwayat();

}


/* ==================================================
   STATUS
================================================== */

function tampilkanStatus(
    pesan,
    tipe
) {

    status.textContent =
        pesan;


    if (tipe === "error") {

        status.style.color =
            "#dc2626";

    } else {

        status.style.color =
            "#16a34a";

    }

}


/* ==================================================
   NAVIGASI MENU
================================================== */

function bukaHalaman(pageId) {

    /* SEMBUNYIKAN SEMUA HALAMAN */

    pageSections.forEach(
        function(page) {

            page.classList.remove(
                "active-page"
            );

        }
    );


    /* NONAKTIFKAN SEMUA TOMBOL */

    navButtons.forEach(
        function(button) {

            button.classList.remove(
                "active"
            );

        }
    );


    /* TAMPILKAN HALAMAN */

    const halaman =
        document.getElementById(
            pageId
        );


    if (halaman) {

        halaman.classList.add(
            "active-page"
        );

    }


    /* AKTIFKAN TOMBOL YANG SESUAI */

    navButtons.forEach(
        function(button) {

            if (
                button.dataset.page ===
                pageId
            ) {

                button.classList.add(
                    "active"
                );

            }

        }
    );


    /* PERBARUI DATA */

    if (pageId === "statistikPage") {

        tampilkanStatistik();

    }


    if (pageId === "riwayatPage") {

        tampilkanRiwayat();

    }

}


/* ==================================================
   EVENT NAVIGASI
================================================== */

navButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                const pageId =
                    button.dataset.page;

                bukaHalaman(
                    pageId
                );

            }
        );

    }
);


/* ==================================================
   DARK MODE
================================================== */

function aktifkanDarkMode() {

    const darkModeAktif =
        localStorage.getItem(
            "sisaUangDarkMode"
        ) === "true";


    if (darkModeAktif) {

        document.body.classList.add(
            "dark"
        );

        btnDarkMode.textContent =
            "☀️ Light Mode";

    } else {

        document.body.classList.remove(
            "dark"
        );

        btnDarkMode.textContent =
            "🌙 Dark Mode";

    }

}


/* ==================================================
   TOGGLE DARK MODE
================================================== */

function toggleDarkMode() {

    const sedangDark =
        document.body.classList.toggle(
            "dark"
        );


    localStorage.setItem(
        "sisaUangDarkMode",
        sedangDark
    );


    if (sedangDark) {

        btnDarkMode.textContent =
            "☀️ Light Mode";

    } else {

        btnDarkMode.textContent =
            "🌙 Dark Mode";

    }

}


/* ==================================================
   EVENT INPUT
================================================== */

uang.addEventListener(
    "input",
    hitungUang
);

makan.addEventListener(
    "input",
    hitungUang
);

transportasi.addEventListener(
    "input",
    hitungUang
);

tabungan.addEventListener(
    "input",
    hitungUang
);

lainnya.addEventListener(
    "input",
    hitungUang
);


/* ==================================================
   EVENT FILTER
================================================== */

filterTanggal.addEventListener(
    "change",
    tampilkanRiwayat
);

filterBulan.addEventListener(
    "change",
    tampilkanRiwayat
);


/* ==================================================
   EVENT BUTTON
================================================== */

btnSimpan.addEventListener(
    "click",
    simpanData
);

btnReset.addEventListener(
    "click",
    resetData
);

btnHapusSemua.addEventListener(
    "click",
    hapusSemuaRiwayat
);

btnResetFilter.addEventListener(
    "click",
    resetFilter
);

btnDarkMode.addEventListener(
    "click",
    toggleDarkMode
);


/* ==================================================
   JALANKAN SAAT HALAMAN DIBUKA
================================================== */

aktifkanDarkMode();

hitungUang();

tampilkanRiwayat();

tampilkanStatistik();