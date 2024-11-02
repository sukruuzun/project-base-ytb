// Mongoose kütüphanesini dahil ediyoruz.
const mongoose = require("mongoose");

// Rollerle ilgili yetkileri tutmak için bir şema oluşturuyoruz.
// Bu şema, MongoDB'deki `role_privileges` koleksiyonunda saklanacak verilerin yapısını tanımlar.
const rolePrivilegesSchema = new mongoose.Schema({
    // Yetkiye sahip olan rolün kimliğini (ID) saklar.
    // Bu alan `Roles` koleksiyonundaki bir belgeye referans olur.
    role_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "roles",  // `roles` koleksiyonuna referans veriyoruz.
    },
    // Yetkinin açıklaması veya adı (örn. "READ_ONLY", "WRITE", "DELETE" gibi)
    permission: {
        type: String,
        required: true,
    },
    // Yetkiyi oluşturan kullanıcının kimliğini (ID) saklar.
    // Bu, kullanıcı koleksiyonundaki bir belgeye referans olur.
    created_by: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "users",  // `users` koleksiyonuna referans veriyoruz.
    }
}, {
    // Otomatik olarak oluşturulma ve güncellenme tarihlerini saklamak için `timestamps` özelliğini kullanıyoruz.
    timestamps: {
        createdAt: "created_at",  // Oluşturulma zamanı.
        updatedAt: "updated_at",  // Güncellenme zamanı.
    }
});

// `RolePrivileges` sınıfı tanımlandı. Bu sınıfa özel bazı metodlar ekleyebiliriz.
class RolePrivileges {
    // Belirli bir role ait yetkileri bulmak için bir metod ekliyoruz.
    static async findByRoleId(roleId) {
        return this.find({ role_id: roleId });
    }

    // Belirli bir izne sahip rolleri bulmak için bir metod ekliyoruz.
    static async findByPermission(permission) {
        return this.find({ permission });
    }
}

// `loadClass` metodu kullanılarak `RolePrivileges` sınıfında tanımlanan metodlar `rolePrivilegesSchema` üzerine eklenir.
// Böylece bu metodlar MongoDB belgeleri üzerinde kullanılabilir.
rolePrivilegesSchema.loadClass(RolePrivileges);

// Şemadan bir `RolePrivileges` modeli oluşturuyoruz ve bunu dışa aktarıyoruz.
// Bu model, MongoDB'deki `role_privileges` koleksiyonuyla ilişkilendirilir.
module.exports = mongoose.model("role_privileges", rolePrivilegesSchema);
