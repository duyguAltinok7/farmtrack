import { useState } from "react";
import SummaryCard from "../components/SummaryCard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from "recharts";
function Dashboard({ productions, expenses }) {

  const recentProductions = [...productions]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  const totalKg = productions
    .filter((product) => product.unit === "kg")
    .reduce((total, product) => total + Number(product.amount), 0);

  const totalLitre = productions
    .filter((product) => product.unit === "litre")
    .reduce((total, product) => total + Number(product.amount), 0);

  const totalAdet = productions
    .filter((product) => product.unit === "adet")
    .reduce((total, product) => total + Number(product.amount), 0);
  
  const toplamGider = expenses.reduce(
    (acc, expense) => acc + Number(expense.tutar),
    0
  );
  
  
 const kategoriler=expenses.map((p)=> p.kategori);
 const benzersizKategoriler=[...new Set(kategoriler)]
 const kategoriOzetleri=benzersizKategoriler.map((kategori)=> {
  const kategoriGiderleri=expenses.filter((expense)=>{
    return expense.kategori===kategori
  });

  const GiderToplamları=kategoriGiderleri.reduce((acc,expense)=> {
    return acc+ Number(expense.tutar)
  },0)

  return {
    kategori:kategori,
    toplam:GiderToplamları
  }
 });
 const COLORS=[
  "#3B82F6",
  "#F59E0B",
  "#10B981",
  "#EF4444",
  "#8B5CF6",
  "#EC4899"
 ]


 const benzersizUnit=[...new Set(productions.map((p)=> p.unit))];
   const [seciliUnit,setSeciliUnit]=useState(benzersizUnit[0] ?? "") //Şu an seçili olan birimi tutar. Örneğin "kg".
 const seciliBirimUretimleri=productions.filter((p)=> {
  return p.unit===seciliUnit
 });

 const benzersizUrunler=[...new Set(seciliBirimUretimleri.map((p)=> p.name))];

 const urunOzetleri= benzersizUrunler.map((urunAdi)=> {
  const urunUretimleri=seciliBirimUretimleri.filter((p=> {
    return p.name===urunAdi;
  }));
  const toplam=urunUretimleri.reduce((acc,p)=> {
    return acc+ Number(p.amount)
  },0);
  return {
    name:urunAdi,
    toplam: toplam
  }
 })
 /*
 map(): Her benzersiz ürün için bir özet oluşturur.
filter(): O ürünün bütün üretim kayıtlarını bulur.
reduce(): Bulduğu kayıtların miktarlarını toplar.
return: Grafik için ürün adını ve toplam miktarını içeren bir nesne oluşturur. */








  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>FarmTrack Yönetim Paneli</h1>
        <p>Çiftliğinin genel durumuna göz at.</p>
      </header>

      <section className="dashboard-summary">
        <h2>Genel Durum</h2>

        <div className="summary-container">
          <SummaryCard
            title="Toplam Üretim"
            value={`${totalKg} kg | ${totalLitre} litre | ${totalAdet} adet`}
          />

          <SummaryCard
            title="Toplam Gider"
            value={`${toplamGider.toLocaleString("tr-TR")} ₺`}
          />
        </div>
      </section>

      <section className="recent-productions">
        <div className="dashboard-section-header">
          <div>
            <h2>Son Üretim Kayıtları</h2>
            <p>Çiftliğine ait son eklenen üretimler.</p>
          </div>

          <span className="dashboard-count">
            {recentProductions.length} kayıt
          </span>
        </div>

        {recentProductions.length === 0 ? (
          <p className="empty-message">
            Henüz üretim kaydı bulunmuyor.
          </p>
        ) : (
          <div className="dashboard-production-list">
            {recentProductions.map((product) => (
              <div key={product.id} className="production-card">
                <div>
                  <h3>{product.name}</h3>
                  <p className="production-date">
                    Üretim tarihi: {product.date}
                  </p>
                </div>

                <p className="production-amount">
                  {product.amount} {product.unit}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="category-expenses">
        <h2>kategoriye göre giderler</h2>
        {kategoriOzetleri.map((p)=> {
          return (
            <div key={p.id}>
              <h2>kategori: {p.kategori} = {p.kategori} toplamı:{p.toplam.toLocaleString("tr-TR")}</h2>
             
            </div>
          )
        })}
      </section>
      <section className="expense-chart">
        <h2>Gider Dağılımı</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie 
             data={kategoriOzetleri}
             dataKey="toplam"
             nameKey="kategori"
             outerRadius={100}>
             {kategoriOzetleri.map((item,index)=> (
              <Cell
                key={item.kategori}
                fill={COLORS[index % COLORS.length]}
                />
             ))}
             

             </Pie>
             <Tooltip />
             <Legend />
          </PieChart>

        </ResponsiveContainer>

      </section>
     

      <label htmlFor="unit-select">Üretim birimi:</label>
      <select
       id="unit-select"
       value={seciliUnit}
       onChange={(e)=> setSeciliUnit(e.target.value)}
       >
        {benzersizUnit.map((unit)=> (
          <option  key={unit}value={unit}>{unit}</option>
        ))}
       </select>
       <ResponsiveContainer width="100%" height={300}>
        <BarChart data={urunOzetleri}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="toplam" fill="#3B82F6" />
        </BarChart>
       </ResponsiveContainer>


    </div>
  );
}


export default Dashboard;