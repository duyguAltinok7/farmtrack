import React, { useState } from 'react'

function Expenses({expenses,setExpenses}) {  //kaydedilmiiş bütün giderler
  const [formData,setFormData]=useState({
    giderAdi:"",
    tutar:"",
    kategori:"",
    tarih:""
  }); // kullanıcının formda yazdığı bilgiler 
  const [error,setError]=useState(null);
  const [success,setSuccess]=useState("");
  const [searchTerm,setSearchTerm]=useState("");
 
  const [editingId,setEditingId]=useState(null);
  function handleSubmit(e){
    e.preventDefault();
    setError(null);
    setSuccess("");
    if(formData.giderAdi.trim() ===""){
      setError("gider adı boş geçilemez");
      return;
    }
    if(Number(formData.tutar) <=0 ||  Number.isNaN(Number(formData.tutar))){
      setError("gider tutarı pozitif değer almalı");
      return;
    }
    if(formData.kategori.trim()===""){
      setError("kategori alanı boş geçilemez");
      return;
    }
    if(formData.tarih.trim()===""){
      setError("tarih boş geçilemez");
      return;
    }

    const maxId=Math.max(0,...expenses.map((p)=> p.id));
    if(editingId !==null){ // mevcut kaydı güncellicez
     
      setExpenses(expenses.map((expense)=> 
      (
        editingId===expense.id  //ID'si editingId ile eşleşen giderin bilgilerini güncelliyor.
        ?  {...expense,giderAdi:formData.giderAdi,tutar:formData.tutar,kategori:formData.kategori,tarih:formData.tarih}
        : expense //Diğer giderleri olduğu gibi bırakıyor.

      )));
      setEditingId(null);
      setSuccess("güncelleme başarılı");
      setFormData({
        giderAdi:"",
        tutar:"",
        kategori:"",
        tarih:""
      })



    }else{ // yeni gider oluştur
          const newExpense={
      id:maxId+1,
      giderAdi:formData.giderAdi,
      tutar:formData.tutar,
      kategori:formData.kategori,
      tarih:formData.tarih
    }

    setExpenses([...expenses,newExpense])
    setSuccess("ekleme başarılı");
    setFormData({
      giderAdi:"",
      tutar:"",
      kategori:"",
      tarih:""
    })

    }



  }

  function deleteExpense(id){
    const del=expenses.filter((p)=> p.id !==id);
    setExpenses(del);
    setError(null);
    setSuccess("silme")
  }

  function EditExpense(expense){

    setFormData({
      giderAdi:expense.giderAdi,
      tutar:expense.tutar,
      kategori:expense.kategori,
      tarih:expense.tarih
    });
    setEditingId(expense.id)
  }

  function cancelEdit(){
    setEditingId(null);
    setFormData({
      giderAdi:"",
      tutar:"",
      kategori:"",
      tarih:""
    });
    setError(null);
    setSuccess("")
  }
  const filteredExpenses=expenses.filter((expense)=> { // koşula uyan giderleri yeni bir diziye alır.
    const search=searchTerm.toLowerCase();
    return (
      expense.giderAdi.toLowerCase().includes(search) || // includess:metnin aranan ifadeyi içerip içermediğini kontrol eder.
      expense.kategori.toLowerCase().includes(search)
    );

  })
  
  
    
return (
  <div className="expenses-page">
    <header className="page-header">
      <h1>Gider Yönetimi</h1>
      <p>Çiftliğin giderlerini takip et ve yönet.</p>
    </header>

    <section className="expense-form-section">
      <h2>{editingId !== null ? "Gideri Düzenle" : "Yeni Gider Ekle"}</h2>

      <form className="expense-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="giderAdi">Gider adı</label>
          <input
            id="giderAdi"
            type="text"
            placeholder="Örn. Yem alımı"
            value={formData.giderAdi}
            onChange={(e) =>
              setFormData({ ...formData, giderAdi: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="tutar">Tutar (₺)</label>
          <input
            id="tutar"
            type="number"
            placeholder="Örn. 1500"
            value={formData.tutar}
            onChange={(e) =>
              setFormData({ ...formData, tutar: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="kategori">Kategori</label>
          <input
            id="kategori"
            type="text"
            placeholder="Örn. Yem, elektrik"
            value={formData.kategori}
            onChange={(e) =>
              setFormData({ ...formData, kategori: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="tarih">Tarih</label>
          <input
            id="tarih"
            type="date"
            value={formData.tarih}
            onChange={(e) =>
              setFormData({ ...formData, tarih: e.target.value })
            }
          />
        </div>

        {error && <p className="expense-error">{error}</p>}

        {success && (
          <p className="expense-success">
            {success === "güncelleme başarılı"
              ? "Gider başarıyla güncellendi."
              :success==="ekleme başarılı"
              ? "Gider başarıyla eklendi."
              : success==="silme"
              ?"gider başarıyla silindi"
              :null}
          </p>
        )}

        <div className="form-actions">
          <button className="primary-button" type="submit">
            {editingId !== null ? "Gideri Güncelle" : "Gider Ekle"}
          </button>

          {editingId !== null && (
            <button
              className="secondary-button"
              type="button"
              onClick={cancelEdit}
            >
              İptal
            </button>
          )}
        </div>
      </form>
    </section>

    <section className="expense-list-section">
      <h2>Gider Kayıtları</h2>
      <input 
       type="text"
       placeholder='gider adı veya kategori ara'
       value={searchTerm}
       onChange={(e)=> setSearchTerm(e.target.value)} />

      {filteredExpenses.length === 0 ? (
        <p className="empty-message">
          {expenses.length===0 
          ? "henüz gider kaydı bulunmuyor."
          : "aramanızla eşleşen değer bulunamadı."}</p>
      ) : (
        <div className="expense-list">
          {filteredExpenses.map((expense) => (
            <div className="expense-card" key={expense.id}>
              <div className="expense-card-info">
                <h3>{expense.giderAdi}</h3>
                <p className="expense-amount">
                  {Number(expense.tutar).toLocaleString("tr-TR")} ₺
                </p>
                <p className="expense-category">
                  Kategori: {expense.kategori}
                </p>
                <p className="expense-date">Tarih: {expense.tarih}</p>
              </div>

              <div className="expense-card-actions">
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => EditExpense(expense)}
                >
                  Düzenle
                </button>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteExpense(expense.id)}
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

export default Expenses