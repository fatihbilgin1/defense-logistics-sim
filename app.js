let kayitliTedarik = localStorage.getItem('tedarikKatalogu');
const tedarikKatalogu = kayitliTedarik ? JSON.parse(kayitliTedarik): [
    // --- MOTOR KATEGORİSİ ---
    {
        id: 1,
        ad: "TEI-PD170 Motor",
        kategori: "Motor",
        fiyat: 85000,
        stok: 5,
        resim: "img/TEI-PD170-Motor.webp"
    },
    {
        id: 2,
        ad: "Rotax 914 Motor",
        kategori: "Motor",
        fiyat: 45000,
        stok: 3,
        resim: "img/Rotax-914-Motor.jpg"
    },
    {
        id: 3,
        ad: "Elektrikli İtki Sistemi",
        kategori: "Motor",
        fiyat: 20000,
        stok: 10,
        resim: "img/Elektrikli-İtki-Sistemi.jpg"
    },

    // --- GÖVDE KATEGORİSİ ---
    {
        id: 4,
        ad: "Karbon Fiber Gövde",
        kategori: "Gövde",
        fiyat: 120000,
        stok: 2,
        resim: "img/Karbon-Fiber-Gövde.webp"
    },
    {
        id: 5,
        ad: "Alüminyum Alaşım Kanat",
        kategori: "Gövde",
        fiyat: 60000,
        stok: 6,
        resim: "img/Alüminyum-Alaşım-Kanat.jpg"
    },
    {
        id: 6,
        ad: "İniş Takımı Seti",
        kategori: "Gövde",
        fiyat: 15000,
        stok: 15,
        resim: "img/İniş-Takımı-Seti.webp"
    },

    // --- OPTİK / ELEKTRONİK KATEGORİSİ ---
    {
        id: 7,
        ad: "ASELFLIR-500 Kamera",
        kategori: "Optik",
        fiyat: 150000,
        stok: 1,
        resim: "img/ASELFLIR-500-Kamera.webp"
    },
    {
        id: 8,
        ad: "CATS Görüntüleme",
        kategori: "Optik",
        fiyat: 90000,
        stok: 4,
        resim: "img/CATS-Görüntüleme.webp"
    },
    {
        id: 9,
        ad: "SATCOM Anteni",
        kategori: "Optik",
        fiyat: 40000,
        stok: 8,
        resim: "img/SATCOM-Anteni.webp"
    },

    // --- SİLAH SİSTEMLERİ ---
    {
        id: 10,
        ad: "MAM-L Mühimmat",
        kategori: "Silah",
        fiyat: 12000,
        stok: 50,
        resim: "img/MAM-L-Mühimmat.jpg"
    },
    {
        id: 11,
        ad: "MAM-C Mühimmat",
        kategori: "Silah",
        fiyat: 8000,
        stok: 100,
        resim: "img/MAM-C-Mühimmat.jpg"
    },
    {
        id: 12,
        ad: "Bozok Lazer Güdümlü",
        kategori: "Silah",
        fiyat: 10000,
        stok: 30,
        resim: "img/Bozok-Lazer-Güdümlü.webp"
    }
];


const tedarikKutusu = document.querySelector('.supply-catalog');
const montajAlani = document.querySelector('.inventory-section');
let butceGosterge = document.querySelector('.budget span');
const montajButonu = document.querySelector('.control-panel button');

let kayitliEnvanter = localStorage.getItem('envanter');
let kayitliBakiye = localStorage.getItem('bakiye');
let envanterListesi = kayitliEnvanter ? JSON.parse(kayitliEnvanter) : [];
let bakiye = kayitliBakiye ? JSON.parse(kayitliBakiye) : 500000;
butceGosterge.innerText = "BÜTÇE : "+ bakiye + "TL";
let motorSecildi = false;
let govdeSecildi = false;
let optikSecildi = false;

function kataloguGoster(urunListesi) {
    tedarikKutusu.innerHTML = '';
    urunListesi.forEach(urun =>{
       const urunDiv = `
    <div class="card">
        <img src="${urun.resim}" alt="${urun.ad}">
        <h3>${urun.ad}</h3>
        <p class="category">${urun.kategori}</p>
        <div class="price-stock">
            <span class="price">${urun.fiyat} ₺</span>
            <span class="stock">Stok: ${urun.stok}</span>
        </div>
        <button onclick="parcaEkle(${urun.id})">TEDARİK ET</button>
    </div>
            `;
            tedarikKutusu.innerHTML += urunDiv;
    });
}
function envanteriGoster() {
    montajAlani.innerHTML = '';
    if (envanterListesi.length === 0) {
        montajAlani.innerHTML += '<li>Envanter boş.</li>';
    }
    envanterListesi.forEach(parca =>{
        montajAlani.innerHTML += `<li>Resim : ${parca.resim} | Parça Adı: ${parca.ad} | Kategori: ${parca.kategori} | Miktar: ${parca.miktar} | Fiyat : ${parca.fiyat}</li>`;
    })
    montajAlani.innerHTML+='</ul>';
    

}
function parcaEkle(id){
    const urun = tedarikKatalogu.find(item => item.id === id);
    if(urun.fiyat <= bakiye && urun.stok > 0){
        bakiye -= urun.fiyat;
        butceGosterge.innerText = "BÜTÇE : "+ bakiye + "TL";
        urun.stok -= 1;
        const envanterUrun = envanterListesi.find(item => item.id === id);
        if(envanterUrun){
            envanterUrun.miktar += 1;
        } else {
            envanterListesi.push({
                id: urun.id,
                ad: urun.ad,
                kategori: urun.kategori,
                fiyat: urun.fiyat,
                resim: urun.resim,
                miktar: 1
            });
        }
        kataloguGoster(tedarikKatalogu);
        envanteriGoster();
    } else {
        alert("Yetersiz bakiye veya stokta ürün kalmadı!");
        
    }
    kaydet();
}
function filtreleKategori(kategori) { 
    if (kategori === "Tümü") {
        kataloguGoster(tedarikKatalogu);
    }
    else{
        const filtrelenmisUrunler = tedarikKatalogu.filter(urun => urun.kategori === kategori);
        kataloguGoster(filtrelenmisUrunler);
    }
}
function montajYap() {
    if (envanterListesi.length === 0) {
        alert("Envanter boş! Parça ekleyin.");
        return;
    }
    motorSecildi = envanterListesi.some(parca => parca.kategori === "Motor");
    govdeSecildi = envanterListesi.some(parca => parca.kategori === "Gövde");
    optikSecildi = envanterListesi.some(parca => parca.kategori === "Optik");
    if(motorSecildi && govdeSecildi && optikSecildi){
        alert("Montaj başarılı! İHA hazır.");
        envanterListesi = [];
        envanteriGoster();
        kaydet();
    } else {
        alert("Montaj başarısız! Lütfen en az bir Motor, bir Gövde ve bir Optik parçası ekleyin.");
    }
}
function kaydet(){
    const tedarikVerisi = JSON.stringify(tedarikKatalogu);
    localStorage.setItem('tedarikKatalogu', tedarikVerisi);
    const envanterVerisi = JSON.stringify(envanterListesi);
    localStorage.setItem('envanter', envanterVerisi);
    const bakiyeVerisi = JSON.stringify(bakiye);
    localStorage.setItem('bakiye', bakiyeVerisi);
}
kataloguGoster(tedarikKatalogu);
envanteriGoster();
function filtrele(kategori) {
    filtreleKategori(kategori);
}
montajButonu.addEventListener('click', montajYap);
