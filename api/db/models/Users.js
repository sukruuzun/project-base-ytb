// Mongoose kütüphanesini projeye dahil ediyoruz.
const mongoose = require("mongoose");

// Kullanıcı bilgilerini içeren bir şema oluşturuyoruz.
// Bu şema, MongoDB'deki belgelerin yapısını belirler.
const userSchema = new mongoose.Schema({
    // Kullanıcının email adresi, benzersiz ve zorunlu olmalıdır.
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Kullanıcının şifresi, zorunlu bir alandır.
    password: {
        type: String,
        required: true,
    },
    // Kullanıcının aktif olup olmadığını gösteren boolean değer.
    is_active: {
        type: Boolean,
        default: true,  // Varsayılan olarak kullanıcı aktif kabul edilir.
    },
    // Kullanıcının adı, zorunlu alandır.
    first_name: {
        type: String,
        required: true,
    },
    // Kullanıcının soyadı, zorunlu alandır.
    last_name: {
        type: String,
        required: true,
    },
    // Kullanıcının telefon numarası. Bu alan zorunlu değil.
    phone_number: {
        type: String,
    },
}, {
    // `timestamps` özelliği kullanılarak oluşturulma ve güncellenme zamanlarını saklıyoruz.
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});

// `Users` sınıfı tanımlandı. Bu sınıfa özel bazı metodlar ekleyebiliriz.
class Users {
    // Örnek olarak bir kullanıcıya ait tam adı (first_name + last_name) döndüren metod ekliyoruz.
    getFullName() {
        return `${this.first_name} ${this.last_name}`;
    }

    // Kullanıcının emailini doğrulayıp doğrulamadığını kontrol eden bir metod olabilir.
    static async findByEmail(email) {
        return this.findOne({ email });
    }
}

// `loadClass` metodu kullanılarak `Users` sınıfında tanımlanan metodlar `userSchema` üzerine eklenir.
// Böylece bu metodlar MongoDB belgeleri üzerinde kullanılabilir.
userSchema.loadClass(Users);

// Şemadan bir `User` modeli oluşturuyoruz ve bunu dışa aktarıyoruz.
// Bu model, MongoDB'deki `users` koleksiyonuyla ilişkilendirilir.
module.exports = mongoose.model("users", userSchema);
