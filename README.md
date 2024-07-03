# Draw & Guess - Gerçek Zamanlı Çizim ve Tahmin Oyunu

## Proje Açıklaması
Draw & Guess, gerçek zamanlı bir çizim ve tahmin oyunudur. Bir oyuncu detaylı bir 2D tuval üzerine çizim yapar ve diğer oyuncular bu çizimi pikselli bir şekilde görerek ne olduğunu tahmin etmeye çalışır. Oyun, gerçek zamanlı güncellemeleri sağlamak için WebSocket kullanır.

## Özellikler

- Modern JavaScript framework'leri kullanarak geliştirilen duyarlı ve etkileşimli kullanıcı arayüzü
- Gerçek zamanlı çizim güncellemeleri ve oyuncu etkileşimleri için WebSocket iletişimi
- SOLID prensiplerinin uygulanması
- Detaylı çizimin rasterize edilerek tahmin eden oyunculara gösterilmesi
- Puanlama sistemi ve lider tablosu
- Eğlenceli ve kullanıcı dostu arayüz

## Kurulum

### Gereksinimler

- Node.js
- MongoDB

### Adımlar

1. **Depoyu klonlayın:**

    ```sh
    git clone <https://github.com/aysuhancoskun/draw_and_guess>
    cd draw-and-guess-project
    ```

2. **Sunucu bağımlılıklarını yükleyin:**

    ```sh
    npm install
    ```

3. **İstemci bağımlılıklarını yükleyin:**

    ```sh
    cd client
    npm install
    ```

4. **MongoDB'yi başlatın:**

    ```sh
    mongod
    ```

5. **Sunucuyu başlatın:**

    ```sh
    cd ..
    node server.js
    ```

6. **İstemciyi başlatın:**

    ```sh
    cd client
    npm start
    ```

7. **Tarayıcıda uygulamayı açın:**

    ```sh
    http://localhost:3000
    ```

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
