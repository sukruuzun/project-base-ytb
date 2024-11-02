// Mongoose kütüphanesi MongoDB'ye bağlanmak ve işlemleri gerçekleştirmek için kullanılıyor.
const mongoose = require("mongoose");

// Singleton yapısını oluşturmak için instance adlı bir değişken tanımlıyoruz.
// Bu değişken sınıfın yalnızca tek bir örneğinin oluşturulmasını sağlıyor.
let instance = null;

class Database {
    // Sınıfın constructor metodu. Sınıf her çağrıldığında bu metod çalışır.
    constructor() {
        // Eğer instance değişkeni null ise, bu sınıfın ilk kez oluşturulduğu anlamına gelir.
        // Singleton deseni uygulamak için instance kontrolü yapıyoruz.
        if (!instance) {
            // İlk kez oluşturuluyorsa, mongoConnection adlı bir özellik tanımlıyoruz ve başlangıç değeri olarak null veriyoruz.
            // Bu özellik MongoDB bağlantısını saklamak için kullanılacak.
            this.mongoConnection = null;

            // Bu sınıfın oluşturulmuş örneğini instance değişkenine atıyoruz.
            instance = this;
        }

        // Eğer bu sınıftan zaten bir instance varsa, o mevcut instance geri döndürülüyor.
        // Bu sayede sadece tek bir bağlantı örneği kullanılarak Singleton deseni uygulanmış oluyor.
        return instance;
    }

    // Veritabanı bağlantısını gerçekleştiren connect metodu.
    // Bu metod asenkron olarak çalıştığından 'async' olarak tanımlandı.
    async connect(options) {
        // Hata yönetimi için try-catch bloğu kullanıyoruz.
        try {
            // Mongoose ile bağlantı kuruyoruz. options.CONNECTION_STRING içinde veritabanı bağlantı URL'si bulunuyor.
            // Bağlantı sırasında veritabanına bağlanmayı sağlayacak birkaç seçenek de tanımlıyoruz.
            let db = await mongoose.connect(options.CONNECTION_STRING);

            // Bağlantı başarılı ise mongoConnection özelliğine bu bağlantıyı atıyoruz.
            // Bu sayede daha sonra bu bağlantıyı kullanarak işlem yapabiliriz.
            this.mongoConnection = db;

            // Bağlantının başarılı olduğunu konsola yazdırıyoruz.
            console.log('Veritabanına başarıyla bağlanıldı.');
        } catch (error) {
            // Eğer bağlantı sırasında bir hata oluşursa, bu hata konsola yazdırılır.
            console.error('Veritabanı bağlantısında hata oluştu:', error);
        }
    }
}

// Bu sınıfı dışa aktarıyoruz. Artık bu sınıfı diğer dosyalarda kullanabiliriz.
// Singleton deseni sayesinde bu sınıfın yalnızca bir örneği olacak.
module.exports = new Database();
