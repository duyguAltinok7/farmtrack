
import { useState } from "react";


function Productions({productions,setProductions}) {
   const [formData,setFormData]=useState(
    {name:"",
        amount:"",
        unit:"kg",
        date:""
    }
   );

   const [error,setError]=useState("");
   const [success,setSuccess]=useState("")
   const [editingId,setEditingId]=useState(null);
   const [search,setSearch]=useState("");

   function handleSubmit(e){
    e.preventDefault();
    setError("")
    setSuccess("")
    if(formData.name.trim()===""){
        setError("Name alanı boş geçilemez");
        return;
    };
    if(Number(formData.amount)<=0 || Number.isNaN(Number(formData.amount)) ){
        setError("miktar pozitif değer almalı");
        return;
    }
    if(formData.date.trim()===""){
        setError("tarih alanı boş geçilemez");
        return;
    }
    const maxId=Math.max(0,...productions.map((p)=> p.id));
    if(editingId !==null){
        setProductions(productions.map((product)=>(
           editingId===product.id 
           ? {...product,name:formData.name,amount:Number(formData.amount), unit:formData.unit,date:formData.date}
            
           : 
            product
        )));
        setEditingId(null);
        setSuccess("güncelleme");
        setFormData({
            name:"",
            amount:"",
            unit:"kg",
            date:""
        })
    

    }else{
         const newProduct={
        id:maxId+1,
        name:formData.name,
        amount: Number(formData.amount),
        unit:formData.unit,
        date:formData.date
       }

       setProductions([...productions,newProduct]);
       setSuccess("ekleme");
       setFormData({
        name: "",
        amount: "",
        unit: "kg",
        date: ""
   })

    }

   }



function handleDelete(id){
    const del=productions.filter((p)=> p.id !==id); // filter yeni bir diziye alıyor
    setProductions(del);
    setError(null);
    setSuccess("silme")
}


function handleEdit(product){
    setFormData({
        name:product.name,
        amount:String(product.amount),
        unit:product.unit,
        date:product.date
    });
    setEditingId(product.id)
}

function handleCancelEdit(){
    setEditingId(null) // düzenleme modundan çıkar
    setFormData({  // formu temizleriz
        name: "",
        amount: "",
        unit: "kg",
        date: ""
    });
    setError(null);
    setSuccess("")

}


const filteredProductions = productions.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase())
);

return (
  <div className="production-page">
    <header className="page-header">
      <h1>Üretim Yönetimi</h1>
      <p>Çiftliğindeki üretim kayıtlarını takip et ve yönet.</p>
    </header>

    <section className="production-form-section">
      <h2>{editingId !== null ? "Üretimi Düzenle" : "Yeni Üretim Ekle"}</h2>

      <form className="production-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Üretim adı</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Örn. Buğday"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Üretim miktarı</label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0.01"
            step="any"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            placeholder="Örn. 250"
          />
        </div>

        <div className="form-group">
          <label htmlFor="unit">Üretim birimi</label>
          <select
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={(e) =>
              setFormData({ ...formData, unit: e.target.value })
            }
          >
            <option value="kg">Kilogram (kg)</option>
            <option value="litre">Litre</option>
            <option value="adet">Adet</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Üretim tarihi</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
          />
        </div>

        {error && <p className="production-error">{error}</p>}

        {success && (
          <p className="production-success">
            {success === "ekleme"
              ? "Üretim başarıyla eklendi."
              :success==="güncelleme" 
               ?"Üretim başarıyla güncellendi."
               :success==="silme" 
               ? "silme başarıyla gerçekleşti"
              : null}
          </p>
        )}

        <div className="form-actions">
          <button className="primary-button" type="submit">
            {editingId !== null ? "Değişiklikleri Kaydet" : "Üretim Ekle"}
          </button>

          {editingId !== null && (
            <button
              className="secondary-button"
              type="button"
              onClick={handleCancelEdit}
            >
              İptal
            </button>
          )}
        </div>
      </form>
    </section>

    <section className="production-list-section">
      <div className="production-list-header">
        <div>
          <h2>Üretim Kayıtları</h2>
          <p>Kayıtlarını ara, düzenle veya sil.</p>
        </div>

        <span className="production-count">
          {filteredProductions.length} kayıt
        </span>
      </div>

      <div className="search-container">
        <label htmlFor="search">Üretim ara</label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Üretim adı yaz..."
        />
      </div>

      {filteredProductions.length === 0 ? (
        <p className="empty-message">
          {productions.length === 0
            ? "Henüz üretim kaydı bulunmuyor."
            : "Aradığınız üretim bulunamadı."}
        </p>
      ) : (
        <div className="productions-list">
          {filteredProductions.map((product) => (
            <div key={product.id} className="production-card">
              <div className="production-card-info">
                <h3>{product.name}</h3>
                <p className="production-amount">
                  {product.amount} {product.unit}
                </p>
                <p className="production-date">
                  Üretim tarihi: {product.date}
                </p>
              </div>

              <div className="production-card-actions">
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => handleEdit(product)}
                >
                  Düzenle
                </button>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() => handleDelete(product.id)}
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  </div>
);
}

export default Productions;
