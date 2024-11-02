// Mongoose kütüphanesini projeye dahil ediyoruz.
const mongoose = require("mongoose");

// Rollerle ilgili bilgileri içeren bir şema oluşturuyoruz.
// Bu şema, MongoDB'deki `roles` koleksiyonunda saklanacak verilerin yapısını tanımlar.
const rolesSchema = new mongoose.Schema({
    // Rolün adı (örn. Admin, Kullanıcı, Moderatör), zorunlu bir alandır.
    role_name: {
        type: String,
        required: true,
    },
    // Rolün aktif olup olmadığını gösteren boolean değer.
    is_active: {
        type: Boolean,
        default: true,  // Varsayılan olarak rol aktif kabul edilir.
    },
    
    // Rolü oluşturan kullanıcının ID'si.
    // Bu, kullanıcı koleksiyonundaki bir belgeye referans olur.
    created_by: {
        type: mongoose.SchemaTypes.ObjectId, // Referans olması için ObjectId kullanılır.
        required: true,
        ref: "users",  // `users` koleksiyonuna referans veriyoruz.
    }
}, {
    // `timestamps` özelliği kullanılarak oluşturulma ve güncellenme zamanlarını saklıyoruz.
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});

// `Roles` sınıfı tanımlandı. Bu sınıfa özel bazı metodlar ekleyebiliriz.
class Roles {
    // Rolün aktif olup olmadığını kontrol eden bir metod ekleyebiliriz.
    isActive() {
        return this.is_active;
    }

    // Roller arasında `role_name` ile arama yapmayı sağlayan statik bir metod ekliyoruz.
    static async findByRoleName(roleName) {
        return this.findOne({ role_name: roleName });
    }
}

// `loadClass` metodu kullanılarak `Roles` sınıfında tanımlanan metodlar `rolesSchema` üzerine eklenir.
// Böylece bu metodlar MongoDB belgeleri üzerinde kullanılabilir.
rolesSchema.loadClass(Roles);

// Şemadan bir `Role` modeli oluşturuyoruz ve bunu dışa aktarıyoruz.
// Bu model, MongoDB'deki `roles` koleksiyonuyla ilişkilendirilir.
module.exports = mongoose.model("roles", rolesSchema);
