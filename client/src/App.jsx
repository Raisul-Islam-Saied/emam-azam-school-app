import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, UserPlus, Search, Menu, X, Phone, MessageCircle, 
  MapPin, Edit3, Trash2, ChevronLeft, Camera, Check, 
  RefreshCw, Printer, ArrowRight, Layers, Users, Shield, 
  CreditCard, Loader2, AlertCircle, FileText, Download,
  IdCard 
} from 'lucide-react';


// ==============================================
// 1. CONFIGURATION
// ==============================================

const CONFIG = {
  // আপনার স্ক্রিপ্ট URL
  API_URL: "https://script.google.com/macros/s/AKfycbwrfvIeM6EiLVIK9J4BHQvGiCV5EDHLSfnnOcANqB5_z0ZSzwb8THKI5Ku7PEzuqkhjig/exec",
  
  // ক্লাউডিনারি কনফিগ
  CLOUD_NAME: "djjnoclzp", 
  UPLOAD_PRESET: "student_db", 
  APP_NAME: "EduBase Pro",
};
const formatDate = (dateStr) => {
  if(!dateStr) return '';
  const d = new Date(dateStr);
  if(isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('bn-BD', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
// ==============================================
// 2. CONSTANTS & REGEX
// ==============================================
const REGEX = {
  BANGLA: /^[\u0980-\u09FF\s.]+$/,
  ENGLISH: /^[a-zA-Z\s.]+$/,
  MOBILE: /^01[3-9]\d{8}$/,
  NUMBER: /^\d+$/
};

// ==============================================
// 3. UI COMPONENTS
// ==============================================

const Header = ({ title, action }) => (
  <div className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 flex items-center justify-between px-5 shadow-sm">
    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
    {action}
  </div>
);

const NavTab = ({ icon: Icon, label, active, onClick, main }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-1/4 transition-all duration-300 ${main ? '-mt-10' : ''}`}
  >
    <div className={`flex items-center justify-center transition-all duration-300 ${
      main 
        ? 'w-16 h-16 bg-slate-900 rounded-2xl text-white shadow-xl shadow-slate-300 ring-4 ring-white transform active:scale-95' 
        : active ? 'text-blue-600' : 'text-gray-400'
    }`}>
      <Icon size={main ? 32 : 24} strokeWidth={active || main ? 2.5 : 2} />
    </div>
    {!main && <span className={`text-[10px] font-bold mt-1.5 ${active ? 'text-blue-600' : 'text-gray-400'}`}>{label}</span>}
  </button>
);

const StudentRow = ({ data, onClick }) => (
  <div onClick={() => onClick(data)} className="bg-white p-4 rounded-2xl mb-3 flex items-center gap-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-50 active:scale-[0.98] transition-transform relative overflow-hidden cursor-pointer">
    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${data.Status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
    <img src={data.ImageURL || "https://via.placeholder.com/100"} className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 bg-gray-50" alt=""/>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-slate-800 text-base truncate">{data.StudentNameBn}</h3>
        <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Roll {data.Roll}</span>
      </div>
      <div className="flex justify-between mt-1">
        <p className="text-[10px] bg-gray-100 text-gray-500 px-1.5 rounded font-mono">ID: {data.ID}</p>
        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Class {data.ClassBn}</span>
      </div>
    </div>
    <ChevronLeft size={18} className="text-gray-300 rotate-180 shrink-0"/>
  </div>
);

// ==============================================
// 4. MAIN APP LOGIC
// ==============================================
const App = () => {
  const [tab, setTab] = useState('home');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  // Export State
  const [exportClass, setExportClass] = useState('All');
  
  const [detailData, setDetailData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${CONFIG.API_URL}?action=read&t=${Date.now()}`);
      const json = await res.json();
      if (json.status === 'success') setStudents(json.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleSave = async (formData) => {
    setProcessing(true);
    try {
      let imgUrl = formData.imageUrl;
      if (imgUrl && imgUrl.startsWith('data:')) {
        const cloudData = new FormData();
        cloudData.append('file', imgUrl);
        cloudData.append('upload_preset', CONFIG.UPLOAD_PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CONFIG.CLOUD_NAME}/image/upload`, { method: 'POST', body: cloudData });
        const json = await res.json();
        imgUrl = json.secure_url;
      }

      const payload = {
        action: isEdit ? 'update' : 'create',
        id: isEdit ? detailData.ID : null, 
        ...formData,
        imageUrl: imgUrl
      };

      await fetch(CONFIG.API_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload)
      });

      await new Promise(r => setTimeout(r, 2000));
      await loadData();
      
      setTab('home');
      setDetailData(null);
      setIsEdit(false);
      alert(isEdit ? "আপডেট সফল হয়েছে!" : "ভর্তি সফল হয়েছে!");

    } catch (error) {
      alert("সমস্যা হয়েছে: " + error.message);
    }
    setProcessing(false);
  };

  const handleDelete = async (id) => {
  const today = new Date().getDate(); 
  const code = `delete${today}`;
  
  const input = prompt(`Password`);
  if (input !== code) {
    alert("ভুল কোড! ডিলিট বাতিল।");
    return;
  }

  setProcessing(true);
  setStudents(prev => prev.filter(s => s.ID !== id));
  setDetailData(null);

  try {
    await fetch(CONFIG.API_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({ action: 'delete', id })
    });
    setTimeout(loadData, 2000);
  } catch {
    alert("নেটওয়ার্ক সমস্যা");
    loadData();
  }
  setProcessing(false);
};

const handleExportTablePDF = () => {
  const data = getFilteredData();
  if (!data || data.length === 0) {
    alert("ডাটা নেই");
    return;
  }

  const w = window.open('', '_blank');
  w.document.write(`
  <html>
  <head>
    <title>${CONFIG.APP_NAME} - Register</title>
    <style>
      @media print { @page { size: A4; margin: 8mm; } }
      body { font-family: sans-serif; font-size: 10px; }
      h2 { text-align:center; margin-bottom:8px; }
      table { width:100%; border-collapse: collapse; }
      th, td { border:1px solid #000; padding:4px; vertical-align: top; }
      th { background:#eee; text-align:center; }
      img { width:45px; height:45px; object-fit:cover; }
      .block div { margin:2px 0; }
      .label { font-weight:bold; }
    </style>
  </head>
  <body>
    <h2>${CONFIG.APP_NAME} - Student Register</h2>
    <table>
      <tr>
        <th>Photo</th>
        <th>Basic Info</th>
        <th>Family</th>
        <th>Other Details</th>
      </tr>
      ${data.map(s => `
        <tr>
          <td style="text-align:center">
            <img src="${s.ImageURL || ''}" />
          </td>

          <td class="block">
            <div><span class="label">নাম:</span> ${s.StudentNameBn || ''}</div>
            <div><span class="label">Name:</span> ${s.StudentNameEn || ''}</div>
            <div><span class="label">ID:</span> ${s.ID || ''}</div>
            <div><span class="label">Roll/Class:</span> ${s.Roll || ''} / ${s.ClassEn || s.ClassBn || ''}</div>
          </td>

          <td class="block">
            <div><span class="label">পিতা:</span> ${s.FatherNameBn || ''}</div>
            <div><span class="label">মাতা:</span> ${s.MotherNameBn || ''}</div>
          </td>

          <td class="block">
            <div><span class="label">Mobile:</span> ${s.WhatsApp || ''}</div>
            <div><span class="label">Blood:</span> ${s.BloodGroup || ''}</div>
            <div><span class="label">BRN:</span> ${s.BRN || ''}</div>
            <div><span class="label">DOB:</span> ${formatDate(s.DOB)}</div>
            <div><span class="label">ঠিকানা:</span> 
              ${s.HouseNameBn || ''}, ${s.VillageBn || ''}, ${s.UnionBn || ''}, ${s.UpazilaBn || ''}, ${s.DistrictBn || ''}
            </div>
          </td>
        </tr>
      `).join('')}
    </table>
    <script>window.print()</script>
  </body>
  </html>
  `);
  w.document.close();
};
  // EXCEL EXPORT (ALL FIELDS)
  const handleExportExcel = () => {
    const dataToExport = getFilteredData();
    if (dataToExport.length === 0) return alert("কোনো ডাটা পাওয়া যায়নি!");

    const headers = [
      "ID", "Time", "Session", "Name (Bn)", "Name (En)", "Roll", "Class (Bn)", "Class (En)", 
      "BRN", "DOB", "Blood", "Father (Bn)", "Father (En)", "Mother (Bn)", "Mother (En)", 
      "Mobile", "Emergency", "House (Bn)", "House (En)", "Village (Bn)", "Village (En)", 
      "Union (Bn)", "Union (En)", "Ward", "Upazila (Bn)", "Upazila (En)", 
      "District (Bn)", "District (En)", "Image URL", "Status"
    ];

    const rows = dataToExport.map(s => [
          s.ID, s.Time, s.Session, s.StudentNameBn, s.StudentNameEn, s.Roll, s.ClassBn, s.ClassEn,
          `'${s.BRN}`, s.DOB, s.BloodGroup, s.FatherNameBn, s.FatherNameEn, s.MotherNameBn, s.MotherNameEn,
          `'${s.WhatsApp}`, `'${s.EmergencyNo}`, s.HouseNameBn, s.HouseNameEn, s.VillageBn, s.VillageEn,
          s.UnionBn, s.UnionEn, s.WardNo, s.UpazilaBn, s.UpazilaEn, s.DistrictBn, s.DistrictEn,
          s.ImageURL, s.Status
        ].map(f => `"${f || ''}"`).join(",")
    );

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.join(",") + "\n" + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Student_Data_${exportClass}_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF EXPORT (ALL FIELDS PROFILE STYLE)
  const handleExportPDF = () => {
    const dataToExport = getFilteredData();
    if (dataToExport.length === 0) return alert("কোনো ডাটা পাওয়া যায়নি!");

    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow.document.write('<html><head><title>Full Database Print</title>');
    printWindow.document.write(`
      <style>
        body { font-family: sans-serif; padding: 20px; }
        .student-card { border: 2px solid #000; padding: 20px; margin-bottom: 20px; page-break-inside: avoid; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 15px; }
        .row { display: flex; gap: 20px; }
        .photo-box { width: 120px; }
        .photo-box img { width: 120px; height: 120px; border: 1px solid #000; object-fit: cover; }
        .info-box { flex: 1; }
        .field-row { display: flex; border-bottom: 1px solid #eee; padding: 4px 0; }
        .field-label { width: 140px; font-weight: bold; font-size: 12px; color: #555; }
        .field-val { font-size: 12px; font-weight: bold; }
        .section-title { font-size: 14px; font-weight: bold; background: #eee; padding: 2px 5px; margin-top: 10px; }
      </style>
    `);
    printWindow.document.write('</head><body>');
    
    dataToExport.forEach(s => {
      printWindow.document.write(`
        <div class="student-card">
          <div class="header">
            <h2 style="margin:0">${CONFIG.APP_NAME}</h2>
            <p style="margin:0; font-size:12px;">Full Student Profile | ID: ${s.ID}</p>
          </div>
          <div class="row">
            <div class="photo-box">
              <img src="${s.ImageURL}" alt="Photo"/>
              <div style="text-align:center; font-weight:bold; margin-top:5px;">Roll: ${s.Roll}</div>
              <div style="text-align:center; font-size:12px;">Class: ${s.ClassEn}</div>
            </div>
            <div class="info-box">
              <div class="section-title">BASIC INFORMATION</div>
              <div class="field-row"><div class="field-label">Name (Bn):</div><div class="field-val">${s.StudentNameBn}</div></div>
              <div class="field-row"><div class="field-label">Name (En):</div><div class="field-val">${s.StudentNameEn}</div></div>
              <div class="field-row"><div class="field-label">Birth Reg No:</div><div class="field-val">${s.BRN}</div></div>
              <div class="field-row"><div class="field-label">Date of Birth:</div><div class="field-val">${s.DOB}</div></div>
              <div class="field-row"><div class="field-label">Blood Group:</div><div class="field-val">${s.BloodGroup}</div></div>
              <div class="field-row"><div class="field-label">Session:</div><div class="field-val">${s.Session}</div></div>

              <div class="section-title">PARENTS INFORMATION</div>
              <div class="field-row"><div class="field-label">Father (Bn):</div><div class="field-val">${s.FatherNameBn}</div></div>
              <div class="field-row"><div class="field-label">Father (En):</div><div class="field-val">${s.FatherNameEn}</div></div>
              <div class="field-row"><div class="field-label">Mother (Bn):</div><div class="field-val">${s.MotherNameBn}</div></div>
              <div class="field-row"><div class="field-label">Mother (En):</div><div class="field-val">${s.MotherNameEn}</div></div>

              <div class="section-title">CONTACT & ADDRESS</div>
              <div class="field-row"><div class="field-label">Mobile:</div><div class="field-val">${s.WhatsApp}</div></div>
              <div class="field-row"><div class="field-label">Emergency:</div><div class="field-val">${s.EmergencyNo}</div></div>
              <div class="field-row"><div class="field-label">Address (Bn):</div><div class="field-val">${s.HouseNameBn}, ${s.VillageBn}, ${s.UnionBn}, ${s.UpazilaBn}, ${s.DistrictBn}</div></div>
              <div class="field-row"><div class="field-label">Address (En):</div><div class="field-val">${s.HouseNameEn}, ${s.VillageEn}, ${s.UnionEn}, ${s.UpazilaEn}, ${s.DistrictEn}</div></div>
              <div class="field-row"><div class="field-label">Ward No:</div><div class="field-val">${s.WardNo}</div></div>
            </div>
          </div>
        </div>
      `);
    });

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const filteredList = useMemo(() => {
    if (!searchText) return students;
    const lower = searchText.toLowerCase();
    return students.filter(s => 
      (s.StudentNameBn && s.StudentNameBn.toLowerCase().includes(lower)) || 
      (s.ID && s.ID.toString().includes(lower)) ||
      (s.Roll && s.Roll.toString().includes(lower)) ||
      (s.WhatsApp && s.WhatsApp.includes(lower))
    );
  }, [students, searchText]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-slate-800 pb-24">
      {processing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex flex-col items-center justify-center text-white">
          <Loader2 size={48} className="animate-spin text-blue-500 mb-4" />
          <p className="font-bold">কাজ চলছে...</p>
        </div>
      )}

      {/* --- HOME VIEW --- */}
      {tab === 'home' && !detailData && (
        <>
          <Header 
            title={CONFIG.APP_NAME} 
            action={
              <button onClick={loadData} className="p-2 bg-gray-100 rounded-full active:bg-gray-200">
                <RefreshCw size={20} className={`text-slate-600 ${loading ? 'animate-spin' : ''}`}/>
              </button>
            }
          />
          
          <div className="pt-20 px-5">
            <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-2xl shadow-slate-300 mb-8 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Database</p>
                <h2 className="text-4xl font-black">{students.length}</h2>
                <div className="mt-4 flex gap-3">
                   <div className="bg-white/10 px-3 py-1 rounded-lg text-xs font-medium">Class 6: {students.filter(s=>s.ClassBn=='৬ষ্ঠ').length}</div>
                   <div className="bg-white/10 px-3 py-1 rounded-lg text-xs font-medium">Class 10: {students.filter(s=>s.ClassBn=='১০ম').length}</div>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600 rounded-full blur-[50px] opacity-50"></div>
            </div>

            {/* --- EXPORT SECTION --- */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Download Full Data</h3>
              <div className="flex gap-2">
                <select 
                  className="bg-gray-50 border border-gray-200 text-sm rounded-lg p-2.5 outline-none font-bold text-slate-700 flex-1"
                  value={exportClass}
                  onChange={(e) => setExportClass(e.target.value)}
                >
                  <option value="All">সব ক্লাস (All)</option>
                  {['প্লে', 'নার্সারি', 'কেজি', '১ম', '২য়', '৩য়', '৪র্থ', '৫ম', '৬ষ্ঠ', '৭ম', '৮ম', '৯ম', '১০ম'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <button onClick={handleExportExcel} className="bg-green-100 p-2.5 rounded-lg text-green-700 hover:bg-green-200 transition">
                  <FileText size={20} />
                </button>
                <button onClick={handleExportPDF} className="bg-red-100 p-2.5 rounded-lg text-red-700 hover:bg-red-200 transition">
                  <Printer size={20} />
                </button>
                <button onClick={handleExportTablePDF}
 className="bg-blue-100 p-2.5 rounded-lg text-blue-700">
  <Layers size={20}/>
</button>
              </div>
            </div>

            <div className="flex justify-between items-end mb-4 px-1">
              <h3 className="font-extrabold text-xl text-slate-800">Students</h3>
              <button onClick={() => setTab('search')} className="text-blue-600 text-sm font-bold">Search All</button>
            </div>

            {loading && students.length === 0 ? (
               <div className="space-y-3">
                 {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-200 rounded-2xl animate-pulse"/>)}
               </div>
            ) : (
              students.slice(0, 15).map((s, i) => (
                <StudentRow key={i} data={s} onClick={setDetailData} />
              ))
            )}
          </div>
        </>
      )}

      {/* --- SEARCH VIEW --- */}
      {tab === 'search' && !detailData && (
        <div className="pt-6 px-4 h-screen flex flex-col">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-4 text-gray-400" size={20}/>
            <input 
              autoFocus
              className="w-full bg-white pl-12 pr-4 py-4 rounded-2xl border-none shadow-sm outline-none focus:ring-2 focus:ring-slate-900 font-bold text-lg placeholder:font-medium placeholder:text-gray-300"
              placeholder="Search..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          <div className="flex-1 overflow-y-auto pb-24 space-y-3">
             {filteredList.map((s, i) => <StudentRow key={i} data={s} onClick={setDetailData} />)}
          </div>
        </div>
      )}

      {/* --- ADD/EDIT FORM VIEW --- */}
      {tab === 'add' && (
        <div className="pt-20 px-5 pb-10">
          <Header title={isEdit ? "Update Info" : "New Admission"} action={<div/>}/>
          <FullForm 
            initialData={isEdit ? detailData : null} 
            onSave={handleSave} 
            onCancel={() => { setTab('home'); setIsEdit(false); setDetailData(null); }}
          />
        </div>
      )}

      {/* --- DETAIL VIEW --- */}
      {detailData && !isEdit && (
        <DetailView 
          data={detailData} 
          onBack={() => setDetailData(null)}
          onEdit={() => { setIsEdit(true); setTab('add'); }} 
          onDelete={() => handleDelete(detailData.ID)}
        />
      )}

      {/* --- BOTTOM NAV --- */}
      {!detailData && tab !== 'add' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 h-20 px-6 flex justify-between items-end pb-3 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
           <NavTab icon={Home} label="Home" active={tab === 'home'} onClick={() => setTab('home')} />
           <NavTab icon={UserPlus} label="Add" main onClick={() => { setIsEdit(false); setTab('add'); }} />
           <NavTab icon={Search} label="Search" active={tab === 'search'} onClick={() => setTab('search')} />
        </div>
      )}
    </div>
  );
};

// ==============================================
// 5. COMPLEX COMPONENTS (VALIDATED & STACKED)
// ==============================================

const FullForm = ({ initialData, onSave, onCancel }) => {
  const defaultState = {
    sessionYear: new Date().getFullYear().toString(),
    studentId: '',
    studentNameBn: '', studentNameEn: '', roll: '', classBn: '', brn: '', dob: '', bloodGroup: '',
    fatherNameBn: '', motherNameBn: '', whatsappNumber: '', emergencyNumber: '',
    houseNameBn: '', villageBn: '', unionBn: 'সরফভাটা', wardNo: '', upazilaBn: 'রাঙ্গুনিয়া', districtBn: 'চট্টগ্রাম',
    imageUrl: ''
  };

  const [form, setForm] = useState(defaultState);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [imgPreview, setImgPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      const parseDate = (dStr) => {
        if (!dStr) return '';
        const d = new Date(dStr);
        return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
      };

      setForm({
        sessionYear: initialData.Session || new Date().getFullYear().toString(),
        studentId: initialData.ID || '',
        studentNameBn: initialData.StudentNameBn || '', studentNameEn: initialData.StudentNameEn || '',
        roll: initialData.Roll || '', classBn: initialData.ClassBn || '',
        brn: initialData.BRN ? initialData.BRN.toString().replace(/['"]/g, '') : '',
        dob: parseDate(initialData.DOB),
        bloodGroup: initialData.BloodGroup || '',
        fatherNameBn: initialData.FatherNameBn || '',
        motherNameBn: initialData.MotherNameBn || '',
        whatsappNumber: initialData.WhatsApp ? initialData.WhatsApp.toString().replace(/['"]/g, '') : '',
        emergencyNumber: initialData.EmergencyNo ? initialData.EmergencyNo.toString().replace(/['"]/g, '') : '',
        houseNameBn: initialData.HouseNameBn || '',
        villageBn: initialData.VillageBn || '',
        unionBn: initialData.UnionBn || 'সরফভাটা',
        wardNo: initialData.WardNo || '',
        upazilaBn: initialData.UpazilaBn || 'রাঙ্গুনিয়া',
        districtBn: initialData.DistrictBn || 'চট্টগ্রাম',
        imageUrl: initialData.ImageURL || ''
      });
      setImgPreview(initialData.ImageURL || null);
    } else {
      setForm(defaultState);
      setImgPreview(null);
    }
  }, [initialData]);

  // SMART ID GENERATION
  useEffect(() => {
    if (!initialData && form.sessionYear && form.dob && form.classBn && form.roll) {
      try {
        const year = form.sessionYear;
        const dobYear = new Date(form.dob).getFullYear().toString().slice(-2);
        
        const classMap = {
          'প্লে': '00', 'নার্সারি': '00', 'কেজি': '00',
          '১ম': '01', '২য়': '02', '৩য়': '03', '৪র্থ': '04', '৫ম': '05',
          '৬ষ্ঠ': '06', '৭ম': '07', '৮ম': '08', '৯ম': '09', '১০ম': '10'
        };
        const classCode = classMap[form.classBn] || '00';
        const rollCode = form.roll.toString().padStart(2, '0');
        
        setForm(prev => ({...prev, studentId: `${year}${dobYear}${classCode}${rollCode}`}));
      } catch (e) {}
    }
  }, [form.sessionYear, form.dob, form.classBn, form.roll, initialData]);

  const update = (f, v) => {
    setForm(p => ({...p, [f]: v}));
    if(errors[f]) setErrors(p => ({...p, [f]: ''}));
  };

  // --- STRICT VALIDATION LOGIC ---
  const validate = () => {
    let newErrors = {};
    const REGEX_BANGLA = /^[\u0980-\u09FF\s.]+$/;
    const REGEX_ENGLISH = /^[a-zA-Z\s.]+$/;
    const REGEX_MOBILE = /^01[3-9]\d{8}$/;

    if (step === 1) {
      if(!form.studentNameBn) newErrors.studentNameBn = 'নাম আবশ্যক';
      else if(!REGEX_BANGLA.test(form.studentNameBn)) newErrors.studentNameBn = 'বাংলায় লিখুন';

      if(!form.studentNameEn) newErrors.studentNameEn = 'ইংরেজি নাম আবশ্যক';
      else if(!REGEX.ENGLISH.test(form.studentNameEn)) newErrors.studentNameEn = 'English Only';

      if(!form.roll) newErrors.roll = 'রোল আবশ্যক';
      if(!form.classBn) newErrors.classBn = 'শ্রেণি আবশ্যক';
      
      if(!form.brn) newErrors.brn = 'জন্মনিবন্ধন আবশ্যক';
      if(!form.dob) newErrors.dob = 'জন্ম তারিখ আবশ্যক';
    }

    if (step === 2) {
      if(!form.fatherNameBn) newErrors.fatherNameBn = 'পিতার নাম আবশ্যক';
      else if(!REGEX_BANGLA.test(form.fatherNameBn)) newErrors.fatherNameBn = 'বাংলায় লিখুন';

      if(!form.motherNameBn) newErrors.motherNameBn = 'মাতার নাম আবশ্যক';
      else if(!REGEX_BANGLA.test(form.motherNameBn)) newErrors.motherNameBn = 'বাংলায় লিখুন';

      if(!form.whatsappNumber) newErrors.whatsappNumber = 'মোবাইল নম্বর আবশ্যক';
      else if(!REGEX_MOBILE.test(form.whatsappNumber)) newErrors.whatsappNumber = 'সঠিক নম্বর দিন';
    }

    if (step === 3) {
      if(!form.villageBn) newErrors.villageBn = 'গ্রাম আবশ্যক';
      else if(!REGEX_BANGLA.test(form.villageBn)) newErrors.villageBn = 'বাংলায় লিখুন';
      if(!form.wardNo) newErrors.wardNo = 'ওয়ার্ড আবশ্যক';
    }

    if (step === 4) {
      if(!form.imageUrl) {
        newErrors.imageUrl = 'ছবি আবশ্যক';
        alert("দয়া করে ছবি আপলোড করুন");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (validate()) setStep(s => s + 1); };
  const handleSubmit = () => { if (validate()) onSave(form); };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if(file){
       const reader = new FileReader();
       reader.onload = (ev) => {
          const img = new Image();
          img.src = ev.target.result;
          img.onload = () => {
             if (Math.abs(img.width - img.height) > 20) { 
                alert("দুঃখিত! ছবিটি অবশ্যই স্কয়ার (বর্গাকার) হতে হবে।");
                e.target.value = ""; return;
             }
             const cvs = document.createElement('canvas');
             const ctx = cvs.getContext('2d');
             cvs.width = 500; cvs.height = 500;
             ctx.drawImage(img, 0, 0, 500, 500);
             const url = cvs.toDataURL('image/jpeg', 0.85);
             setImgPreview(url);
             update('imageUrl', url);
          }
       }
       reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 min-h-[70vh] flex flex-col">
      <div className="flex justify-between mb-8 px-2">
         {[1,2,3,4].map(s => <div key={s} className={`h-2 rounded-full transition-all duration-300 ${step >= s ? 'w-full bg-slate-900 mx-1' : 'w-full bg-gray-100 mx-1'}`}/>)}
      </div>

      <div className="flex-1">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Step 1: Basic Info</h3>
             <Input label="Session" type="number" val={form.sessionYear} set={v=>update('sessionYear', v)} />
             
             {/* STACKED INPUTS (One per line) */}
             <Input label="নাম (বাংলা)" val={form.studentNameBn} set={v=>update('studentNameBn', v)} error={errors.studentNameBn} />
             <Input label="Name (English)" val={form.studentNameEn} set={v=>update('studentNameEn', v)} error={errors.studentNameEn} />
             
             <Input label="Roll" type="number" val={form.roll} set={v=>update('roll', v)} error={errors.roll} />
             
             <div className="relative pt-1 w-full">
               <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 block">Class</label>
               <select className={`w-full p-4 bg-gray-50 rounded-xl font-bold outline-none border ${errors.classBn ? 'border-red-500' : 'border-transparent'}`} value={form.classBn} onChange={e=>update('classBn', e.target.value)}>
                  <option value="">Select...</option>
                  {['প্লে', 'নার্সারি', 'কেজি', '১ম', '২য়', '৩য়', '৪র্থ', '৫ম', '৬ষ্ঠ', '৭ম', '৮ম', '৯ম', '১০ম'].map(c=><option key={c} value={c}>{c}</option>)}
               </select>
             </div>
             
             <Input label="BRN" type="number" val={form.brn} set={v=>update('brn', v)} error={errors.brn} />
             <Input label="DOB" type="date" val={form.dob} set={v=>update('dob', v)} error={errors.dob} />
             
             <div className="relative pt-1 w-full">
                 <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Blood</label>
                 <select className="w-full p-4 bg-gray-50 rounded-xl font-bold outline-none border border-transparent" value={form.bloodGroup} onChange={e=>update('bloodGroup', e.target.value)}>
                    <option value="">N/A</option>
                    {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map(c=><option key={c} value={c}>{c}</option>)}
                 </select>
             </div>

             <div className="mt-2 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <Input label="Student ID (Auto)" type="number" val={form.studentId} set={v=>update('studentId', v)} error={errors.studentId} />
             </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Step 2: Parents Info</h3>
             <Input label="পিতার নাম (বাংলা)" val={form.fatherNameBn} set={v=>update('fatherNameBn', v)} error={errors.fatherNameBn} />
             <Input label="মাতার নাম (বাংলা)" val={form.motherNameBn} set={v=>update('motherNameBn', v)} error={errors.motherNameBn} />
             <Input label="Mobile (WhatsApp)" type="tel" val={form.whatsappNumber} set={v=>update('whatsappNumber', v)} error={errors.whatsappNumber} />
             <Input label="Emergency No" type="tel" val={form.emergencyNumber} set={v=>update('emergencyNumber', v)} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Step 3: Address (Bangla Only)</h3>
             <Input label="বাড়ির নাম" val={form.houseNameBn} set={v=>update('houseNameBn', v)} />
             <Input label="গ্রাম (বাংলা)" val={form.villageBn} set={v=>update('villageBn', v)} error={errors.villageBn} />
             <Input label="ইউনিয়ন (বাংলা)" val={form.unionBn} set={v=>update('unionBn', v)} />
             <Input label="Ward No" type="number" val={form.wardNo} set={v=>update('wardNo', v)} error={errors.wardNo} />
             <Input label="উপজেলা (বাংলা)" val={form.upazilaBn} set={v=>update('upazilaBn', v)} />
             <Input label="জেলা (বাংলা)" val={form.districtBn} set={v=>update('districtBn', v)} />
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300 py-6">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Step 4: Student Photo</h3>
             <div className={`relative w-56 h-56 bg-gray-100 rounded-full flex items-center justify-center border-[6px] shadow-2xl ring-1 overflow-hidden ${errors.imageUrl ? 'border-red-500 ring-red-200' : 'border-white ring-gray-100'}`}>
                {imgPreview ? <img src={imgPreview} className="w-full h-full object-cover"/> : <Camera size={48} className="text-gray-300"/>}
                <input type="file" onChange={handleImage} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*"/>
             </div>
             {errors.imageUrl && <p className="text-red-500 text-xs font-bold mt-2">ছবি আবশ্যক</p>}
             <p className="mt-8 text-sm text-gray-500 font-medium bg-gray-50 px-4 py-2 rounded-full text-center">Tap photo to upload <br/><span className="text-xs text-gray-400">(Square Only)</span></p>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
         {step > 1 ? <button onClick={()=>setStep(s=>s-1)} className="font-bold text-gray-400 px-6 py-3 bg-gray-50 rounded-xl">Back</button> : <button onClick={onCancel} className="font-bold text-red-400 px-4 py-3">Cancel</button>}
         {step < 4 ? (
            <button onClick={handleNext} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2">Next <ArrowRight size={18}/></button>
         ) : (
            <button onClick={handleSubmit} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-blue-200">Submit <Check size={18}/></button>
         )}
      </div>
    </div>
  );
};

const Input = ({ label, val, set, type="text", error }) => (
  <div className="relative pt-1 w-full">
    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-0.5 block flex justify-between">
      {label}
      {error && <span className="text-red-500 lowercase italic">{error}</span>}
    </label>
    <input 
      type={type} 
      className={`w-full p-4 bg-gray-50 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 font-bold text-slate-800 transition-all border placeholder-gray-300 ${error ? 'border-red-500 ring-1 ring-red-200' : 'border-transparent'}`}
      placeholder="..."
      value={val}
      onChange={e => set(e.target.value)}
    />
  </div>
);

// 3. FULL DETAIL VIEW WITH UPDATED PRINT BUTTONS & LOGIC
const DetailView = ({ data, onBack, onEdit, onDelete }) => {
  const formatDate = (dateStr) => {
    if(!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('bn-BD'); 
    } catch(e) { return dateStr; }
  };

  const handlePrintIDCard = () => {
    const w = window.open('','_blank');
    w.document.write(`
      <html>
        <head>
          <title>ID Card: ${data.ID}</title>
          <style>
            @media print { @page { size: A4; margin: 0; } }
            body { 
              font-family: 'Segoe UI', sans-serif; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh; 
              background: #f3f4f6; 
              margin: 0;
            }
            .id-card {
              width: 324px; /* CR80 Size + bleed */
              height: 500px;
              background: #fff;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
              overflow: hidden;
              position: relative;
              border: 1px solid #ddd;
              text-align: center;
            }
            .header {
              background: #1e3a8a;
              color: white;
              padding: 15px 0;
            }
            .header h2 { margin: 0; font-size: 16px; text-transform: uppercase; }
            .header p { margin: 0; font-size: 10px; opacity: 0.8; }
            
            .photo {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              border: 3px solid #1e3a8a;
              object-fit: cover;
              margin-top: 20px;
            }
            
            .name-section { margin-top: 10px; }
            .name-en { font-size: 16px; font-weight: bold; color: #333; margin: 0; }
            .name-bn { font-size: 14px; color: #666; margin: 2px 0 0 0; }
            .student-id { 
              display: inline-block; 
              background: #1e3a8a; 
              color: white; 
              padding: 4px 10px; 
              border-radius: 15px; 
              font-size: 12px; 
              font-weight: bold; 
              margin-top: 5px; 
            }
            
            .details-grid {
              margin-top: 20px;
              padding: 0 20px;
              text-align: left;
              font-size: 12px;
            }
            .row { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding: 4px 0; }
            .label { font-weight: bold; color: #555; }
            .value { font-weight: bold; color: #222; }

            .footer {
              position: absolute;
              bottom: 0;
              width: 100%;
              background: #1e3a8a;
              height: 10px;
            }
            .principal {
              position: absolute;
              bottom: 30px;
              right: 20px;
              text-align: center;
              width: 80px;
              border-top: 1px solid #333;
              font-size: 8px;
            }
          </style>
        </head>
        <body>
          <div class="id-card">
            <div class="header">
              <h2>${CONFIG.APP_NAME}</h2>
              <p>Rangunia, Chattogram</p>
            </div>
            
            <img src="${data.ImageURL}" class="photo" />
            
            <div class="name-section">
              <h3 class="name-en">${data.StudentNameEn}</h3>
              <p class="name-bn">${data.StudentNameBn}</p>
              <div class="student-id">ID: ${data.ID}</div>
            </div>

            <div class="details-grid">
              <div class="row"><span class="label">Class</span><span class="value">${data.ClassEn}</span></div>
              <div class="row"><span class="label">Roll</span><span class="value">${data.Roll}</span></div>
              <div class="row"><span class="label">Blood</span><span class="value">${data.BloodGroup}</span></div>
              <div class="row"><span class="label">Mobile</span><span class="value">${data.WhatsApp}</span></div>
              <div class="row"><span class="label">Father</span><span class="value">${data.FatherNameBn}</span></div>
            </div>

            <div class="principal">Principal</div>
            <div class="footer"></div>
          </div>
        </body>
      </html>
    `);
    w.document.close();
  };

  // --- FULL PROFILE PRINT (A5 SIZE - ALL INFO) ---
  const handlePrintProfile = () => {
    const w = window.open('','_blank');
    w.document.write(`
      <html>
        <head>
          <title>Profile: ${data.ID}</title>
          <style>
            @media print { @page { size: A5; margin: 1cm; } }
            body { font-family: sans-serif; padding: 0; margin: 0; font-size: 11px; }
            .container { border: 2px solid #333; padding: 15px; height: 100%; box-sizing: border-box; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 10px; }
            .header h1 { margin: 0; font-size: 18px; }
            .row { display: flex; margin-bottom: 3px; border-bottom: 1px dotted #ccc; padding-bottom: 1px; }
            .label { width: 130px; font-weight: bold; color: #555; }
            .value { flex: 1; font-weight: bold; color: #000; }
            .photo { position: absolute; top: 25px; right: 25px; width: 80px; height: 80px; border: 1px solid #000; object-fit: cover; }
            .section { margin-top: 10px; background: #eee; padding: 2px 5px; font-weight: bold; text-transform: uppercase; font-size: 10px; border-left: 3px solid #333; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${CONFIG.APP_NAME}</h1>
              <p>Official Student Profile Record</p>
            </div>
            <img src="${data.ImageURL}" class="photo" />

            <div class="section">Basic Information</div>
            <div class="row"><span class="label">Student ID:</span><span class="value">${data.ID}</span></div>
            <div class="row"><span class="label">Name (Bn):</span><span class="value">${data.StudentNameBn}</span></div>
            <div class="row"><span class="label">Name (En):</span><span class="value">${data.StudentNameEn}</span></div>
            <div class="row"><span class="label">Class:</span><span class="value">${data.ClassEn} (${data.ClassBn})</span></div>
            <div class="row"><span class="label">Roll / Session:</span><span class="value">${data.Roll} / ${data.Session}</span></div>
            <div class="row"><span class="label">Blood / DOB:</span><span class="value">${data.BloodGroup} / ${formatDate(data.DOB)}</span></div>
            <div class="row"><span class="label">BRN:</span><span class="value">${data.BRN}</span></div>

            <div class="section">Guardian Information</div>
            <div class="row"><span class="label">Father (Bn):</span><span class="value">${data.FatherNameBn}</span></div>
            <div class="row"><span class="label">Father (En):</span><span class="value">${data.FatherNameEn}</span></div>
            <div class="row"><span class="label">Mother (Bn):</span><span class="value">${data.MotherNameBn}</span></div>
            <div class="row"><span class="label">Mother (En):</span><span class="value">${data.MotherNameEn}</span></div>
            <div class="row"><span class="label">Mobile:</span><span class="value">${data.WhatsApp}</span></div>
            <div class="row"><span class="label">Emergency:</span><span class="value">${data.EmergencyNo}</span></div>

            <div class="section">Address Details</div>
            <div class="row"><span class="label">House:</span><span class="value">${data.HouseNameEn} (${data.HouseNameBn})</span></div>
            <div class="row"><span class="label">Village:</span><span class="value">${data.VillageEn} (${data.VillageBn})</span></div>
            <div class="row"><span class="label">Union/Ward:</span><span class="value">${data.UnionEn} (${data.UnionBn}) / Ward ${data.WardNo}</span></div>
            <div class="row"><span class="label">Area:</span><span class="value">${data.UpazilaEn}, ${data.DistrictEn}</span></div>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    w.document.close();
  };

  // --- WHATSAPP MESSAGE ---
  const handleWhatsApp = () => {
  const phone = data.WhatsApp?.replace(/['"\s-]/g,'');
  if(!phone) return alert("নম্বর নেই");

  const msg = `
📘 *${CONFIG.APP_NAME}*
----------------------
👤 *Student Info*
Name: ${data.StudentNameEn} (${data.StudentNameBn})
ID: ${data.ID}
Class: ${data.ClassEn} | Roll: ${data.Roll}
Session: ${data.Session}
DOB: ${formatDate(data.DOB)}
Blood: ${data.BloodGroup}
BRN: ${data.BRN}

👪 *Guardian*
Father: ${data.FatherNameEn}
Mother: ${data.MotherNameEn}

📞 *Contact*
Mobile: ${data.WhatsApp}
Emergency: ${data.EmergencyNo}

🏠 *Address*
${data.HouseNameEn}, ${data.VillageEn}
${data.UnionEn}, ${data.UpazilaEn}
${data.DistrictEn}
`.trim();

  window.open(`https://wa.me/+88${phone}?text=${encodeURIComponent(msg)}`);
};
  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto animate-in slide-in-from-bottom duration-300">
      <div className="relative h-80 bg-slate-900">
        <img src={data.ImageURL} className="w-full h-full object-cover opacity-30 blur-sm" alt=""/>
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
        <button onClick={onBack} className="absolute top-4 left-4 p-3 bg-white/20 backdrop-blur rounded-full text-white"><ChevronLeft/></button>
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <img src={data.ImageURL} className="w-40 h-40 rounded-full border-8 border-white shadow-2xl bg-white object-cover" alt=""/>
        </div>
      </div>

      <div className="mt-24 px-6 text-center pb-10">
        <h1 className="text-3xl font-black text-slate-900 leading-tight">{data.StudentNameEn}</h1>
        <p className="text-lg text-gray-500 font-bold mt-1">{data.StudentNameBn}</p>
        <p className="text-sm font-mono font-bold text-blue-600 mt-1 tracking-widest">ID: {data.ID}</p>
        
        <div className="flex justify-center gap-3 mt-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-700">Class {data.ClassEn || data.ClassBn}</span>
          <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-purple-100 text-purple-700">Roll {data.Roll}</span>
          {data.BloodGroup && <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-red-100 text-red-700">{data.BloodGroup}</span>}
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div className="flex justify-center gap-4 mt-8 mb-6 pb-6 border-b border-gray-100 flex-wrap">
          <ActionBtn icon={Phone} label="Call" bg="bg-emerald-50 text-emerald-600" onClick={() => window.open(`tel:${data.WhatsApp ? data.WhatsApp.replace(/['"]/g, '') : ''}`)} />
          <ActionBtn icon={MessageCircle} label="WhatsApp" bg="bg-emerald-500 text-white shadow-emerald-200" onClick={handleWhatsApp} />
          <ActionBtn icon={CreditCard} label="ID Card" bg="bg-indigo-500 text-white shadow-indigo-200" onClick={handlePrintIDCard} />
          <ActionBtn icon={FileText} label="Print Info" bg="bg-slate-800 text-white shadow-slate-300" onClick={handlePrintProfile} />
        </div>

        <div className="text-left space-y-6">
           <InfoCard title="Parents Info" icon={Users} items={[
             {l: 'Father Name', v: `${data.FatherNameEn} (${data.FatherNameBn})`},
             {l: 'Mother Name', v: `${data.MotherNameEn} (${data.MotherNameBn})`},
           ]}/>
           <InfoCard title="Contact & Personal" icon={Shield} items={[
             {l: 'Mobile', v: data.WhatsApp},
             {l: 'Emergency', v: data.EmergencyNo},
             {l: 'Date of Birth', v: formatDate(data.DOB)},
             {l: 'BRN', v: data.BRN ? data.BRN.toString().replace(/['"]/g, '') : ''},
           ]}/>
           <InfoCard title="Address Details" icon={MapPin} items={[
             {l: 'House', v: `${data.HouseNameEn} (${data.HouseNameBn})`},
             {l: 'Village', v: `${data.VillageEn} (${data.VillageBn})`},
             {l: 'Union/Ward', v: `${data.UnionEn} (${data.UnionBn}) / Ward ${data.WardNo}`},
             {l: 'Area', v: `${data.UpazilaEn}, ${data.DistrictEn}`},
           ]}/>
        </div>

        <div className="mt-10 flex gap-4 sticky bottom-6">
           <button onClick={onEdit} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2 active:scale-95 transition">
             <Edit3 size={20}/> Edit Profile
           </button>
           <button onClick={() => onDelete(data.ID)} className="w-16 bg-red-50 text-red-500 rounded-2xl font-bold flex items-center justify-center active:scale-95 transition">
             <Trash2 size={24}/>
           </button>
        </div>
      </div>
    </div>
  );
};

const ActionBtn = ({ icon: Icon, label, bg, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 group">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition group-active:scale-90 ${bg}`}>
      <Icon size={24}/>
    </div>
    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{label}</span>
  </button>
);

const InfoCard = ({ title, icon: Icon, items }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
    <div className="flex items-center gap-2 mb-4 border-b border-gray-50 pb-3">
      <Icon size={18} className="text-blue-600"/>
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">{title}</h3>
    </div>
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase">{item.l}</span>
          <span className="font-bold text-slate-800 text-sm mt-0.5">{item.v || 'N/A'}</span>
        </div>
      ))}
    </div>
  </div>
);

export default App;


