// Mongoose kütüphanesini dahil ediyoruz.
const mongoose = require("mongoose");

// Audit loglarının bilgilerini içeren bir şema tanımlıyoruz.
// Bu şema, MongoDB'deki `auditlogs` koleksiyonunda saklanacak log verilerinin yapısını tanımlar.
const auditLogSchema = new mongoose.Schema({
    // Log kaydının seviyesi (örn. 'INFO', 'WARN', 'ERROR' gibi).
    level: {
        type: String,
        required: true,
    },
    // İşlemi yapan kullanıcının email adresi.
    email: {
        type: String,
        required: true,
    },
    // İşlemin gerçekleştiği yer (örn. IP adresi, cihaz adı veya fiziksel konum).
    location: {
        type: String,
        required: true,
    },
    // İşlem türü (örn. 'LOGIN', 'DELETE', 'UPDATE' gibi).
    proc_type: {
        type: String,
        required: true,
    },
    // İşlemin detaylarını içeren açıklama.
    log: {
        type: String,
        required: true,
    }
}, {
    // Otomatik olarak oluşturulma ve güncellenme tarihlerini saklamak için `timestamps` özelliğini kullanıyoruz.
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
});

// `AuditLog` sınıfı tanımlandı. Bu sınıfa özel bazı metodlar ekleyebiliriz.
class AuditLog {
    // Audit loglarını belirli bir email adresine göre filtreleyerek bulan bir metod ekliyoruz.
    static async findByEmail(email) {
        return this.find({ email });
    }

    // Log seviyesine göre filtreleme yaparak bulma.
    static async findByLevel(level) {
        return this.find({ level });
    }
}

// `loadClass` metodu kullanılarak `AuditLog` sınıfında tanımlanan metodlar `auditLogSchema` üzerine eklenir.
// Böylece bu metodlar MongoDB belgeleri üzerinde kullanılabilir.
auditLogSchema.loadClass(AuditLog);

// Şemadan bir `AuditLog` modeli oluşturuyoruz ve bunu dışa aktarıyoruz.
// Bu model, MongoDB'deki `auditlogs` koleksiyonuyla ilişkilendirilir.
module.exports = mongoose.model("auditlogs", auditLogSchema);
