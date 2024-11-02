// Mongoose kütüphanesini dahil ediyoruz.
const mongoose = require("mongoose");

// Kategorilerle ilgili bilgileri içeren bir şema tanımlıyoruz.
// Bu şema, MongoDB'deki `categories` koleksiyonunda saklanacak verilerin yapısını tanımlar.
const categorySchema = new mongoose.Schema({
    // Kategorinin aktif olup olmadığını belirten boolean değer.
    is_active: {
        type: Boolean,
        default: true,  // Varsayılan olarak kategori aktif kabul edilir.
    },
    // Kategorinin nereye veya kime ait olduğunu belirten bilgi.
    belong: {
        type: String,
        required: true, // Belong bilgisi zorunludur.
    },
    // Kategoriyi oluşturan kullanıcının kimliğini (ID) saklar.
    // Bu, kullanıcı koleksiyonundaki bir belgeye referans olur.
    created_by: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "users",  // `users` koleksiyonuna referans veriyoruz.
    }
}, {
    // Otomatik olarak oluşturulma ve güncellenme tarihlerini saklamak için `timestamps` özelliğini kullanıyoruz.
    timestamps: {
        createdAt: "created_at", // Oluşturulma zamanı.
        updatedAt: "updated_at", // Güncellenme zamanı.
    }
});

// `Category` sınıfı tanımlandı. Bu sınıfa özel bazı metodlar ekleyebiliriz.
class Category {
    // Kategorinin aktif olup olmadığını kontrol eden bir metod ekleyebiliriz.
    isActive() {
        return this.is_active;
    }

    // Belirli bir `belong` bilgisine göre kategori arama.
    static async findByBelong(belong) {
        return this.find({ belong });
    }
}

// `loadClass` metodu kullanılarak `Category` sınıfında tanımlanan metodlar `categorySchema` üzerine eklenir.
// Böylece bu metodlar MongoDB belgeleri üzerinde kullanılabilir.
categorySchema.loadClass(Category);

// Şemadan bir `Category` modeli oluşturuyoruz ve bunu dışa aktarıyoruz.
// Bu model, MongoDB'deki `categories` koleksiyonuyla ilişkilendirilir.
module.exports = mongoose.model("categories", categorySchema);
