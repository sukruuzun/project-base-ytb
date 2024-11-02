// Mongoose kütüphanesini projeye dahil ediyoruz.
const mongoose = require("mongoose");

// Kullanıcıların hangi rollere sahip olduğunu tutmak için bir şema tanımlıyoruz.
// Bu şema, MongoDB'deki `user_roles` koleksiyonunda saklanacak verilerin yapısını tanımlar.
const userRolesSchema = new mongoose.Schema({
    // Kullanıcının sahip olduğu rolün kimliğini (ObjectID) saklar.
    // Bu alan `roles` koleksiyonundaki bir belgeye referans olur.
    role_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "roles",  // `roles` koleksiyonuna referans veriyoruz.
    },
    // Kullanıcının kimliğini (ObjectID) saklar.
    // Bu alan `users` koleksiyonundaki bir belgeye referans olur.
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "users",  // `users` koleksiyonuna referans veriyoruz.
    }
}, {
    // Otomatik olarak oluşturulma ve güncellenme zamanlarını saklamak için `timestamps` özelliğini kullanıyoruz.
    timestamps: {
        createdAt: "created_at", // Belgenin oluşturulma zamanı.
        updatedAt: "updated_at", // Belgenin güncellenme zamanı.
    }
});

// `UserRoles` sınıfı tanımlandı. Bu sınıfa özel bazı metodlar ekleyebiliriz.
class UserRoles {
    // Belirli bir kullanıcının sahip olduğu rolleri bulmak için bir metod ekliyoruz.
    static async findRolesByUserId(userId) {
        return this.find({ user_id: userId });
    }

    // Belirli bir role sahip kullanıcıları bulmak için bir metod ekliyoruz.
    static async findUsersByRoleId(roleId) {
        return this.find({ role_id: roleId });
    }
}

// `loadClass` metodu kullanılarak `UserRoles` sınıfında tanımlanan metodlar `userRolesSchema` üzerine eklenir.
// Böylece bu metodlar MongoDB belgeleri üzerinde kullanılabilir.
userRolesSchema.loadClass(UserRoles);

// Şemadan bir `UserRoles` modeli oluşturuyoruz ve bunu dışa aktarıyoruz.
// Bu model, MongoDB'deki `user_roles` koleksiyonuyla ilişkilendirilir.
module.exports = mongoose.model("user_roles", userRolesSchema);
