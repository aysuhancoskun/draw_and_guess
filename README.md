# Draw & Guess - Gerçek Zamanlı Çizim ve Tahmin Oyunu

## Proje Açıklaması
Draw & Guess, gerçek zamanlı bir çizim ve tahmin oyunudur. Bir oyuncu detaylı bir 2D tuval üzerine çizim yapar ve diğer oyuncular bu çizimi pikselli bir şekilde görerek ne olduğunu tahmin etmeye çalışır. Oyun, gerçek zamanlı güncellemeleri sağlamak için WebSocket kullanır.

## Özellikler
- Modern JavaScript frameworkleri kullanılarak geliştirilmiş duyarlı ve interaktif kullanıcı arayüzü.
- Gerçek zamanlı çizim güncellemeleri ve oyuncu etkileşimlerini yönetmek için WebSocket iletişimi.
- SOLID prensiplerinin uygulanması.
- Detaylı çizimin pikselli versiyonunun tahmin oyuncularına gösterilmesi.
- Süre dolduğunda veya doğru tahmin yapıldığında yeni bir tur başlatılması.

## Gereksinimler
- Node.js
- npm veya yarn
- MongoDB

## Kurulum ve Çalıştırma
### Adım 1: Depoyu Klonlayın
```bash
git clone <repo-url>
cd draw-and-guess-project

Adım 2: Bağımlılıkları Yükleyin
Sunucu Tarafı

cd server
npm install

İstemci Tarafı
cd client
npm install

Adım 3: MongoDB'yi Başlatın
MongoDB'nin sisteminizde yüklü ve çalışır durumda olduğundan emin olun.

Adım 4: Sunucuyu Başlatın
cd server
npm start

Adım 5: İstemciyi Başlatın
Yeni bir terminal açın ve istemciyi başlatın.

cd client
npm start

Adım 6: Oyunu Oynayın
Tarayıcınızda http://localhost:3000 adresine giderek oyunu başlatabilirsiniz.

*Kullanım*
Oyun Başlatma
Ana ekranda sizi iki seçenek karşılar.
Create Game kartına tıklayarak yeni bir oturum oluşturun ve doğru cevabı girin ve create butonuyla oyunu başlatın.
Join Game kartına tıklayarak yeni bir oturum oluşturun ve sizinle paylaşılan oyun kodunu girerek oyuna katılın.
****Kontroller localhost üzerinden yapılacağı için testi iki farklı tarayıcıdan ya da normal sekme ve gizli sekme açarak yapabilirsiniz. Bu durumda bir sekmeden oyunu başlatarak oluşan oyun koduyla birlikte diğer sekmeden başlatılan oyuna katılabilirsiniz.***

*Oyun Oynanışı*
Çizim yapan oyuncu tuval üzerinde çizmeye başlar.
Tahmin eden oyuncular pikselli çizimi görür ve tahminlerini gönderir.
İlk doğru tahmini yapan oyuncu puan alır.
Süre dolduğunda veya doğru tahmin yapıldığında yeni bir tur başlar.