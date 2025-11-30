import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Umbrella, 
  Heart, 
  Clock, 
  X, 
  User 
} from 'lucide-react';

const typeConfig = {
  "Congé annuel": { color: "#7e57c2", icon: Umbrella, textColor: "#ffffff" },
  "Congé maladie": { color: "#f44336", icon: Heart, textColor: "#ffffff" },
  "Congé maternité": { color: "#e91e63", icon: User, textColor: "#ffffff" },
  "Congé exceptionnel": { color: "#ffa726", icon: Clock, textColor: "#ffffff" },
  "Absence non justifiée": { color: "#9e9e9e", icon: X, textColor: "#ffffff" },
};

const monthNames = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre"
];
const dayNames = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];

function CalendrierAbsences() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [absences, setAbsences] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8181/api/employers")
      .then(res => setEmployees(res.data))
      .catch(err => console.error("Erreur chargement employés", err));
  }, []);

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const dateParam = `${year}-${String(month).padStart(2,"0")}-01`;

    axios.get("http://localhost:8181/api/absences", {
      params: { idEmploye: selectedEmployee?.id, date: dateParam }
    })
    .then(res => setAbsences(res.data || []))
    .catch(() => setAbsences([]));
  }, [selectedEmployee, selectedDate]);

  const daysInMonth = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return {
      daysCount: lastDay.getDate(),
      startingDayOfWeek: firstDay.getDay(),
      firstDay,
      lastDay
    };
  }, [selectedDate]);

  const filteredAbsences = useMemo(() => {
    return absences.filter(absence => {
      const absenceDate = new Date(absence.dateAbsence);
      const monthStart = daysInMonth.firstDay;
      const monthEnd = daysInMonth.lastDay;

      const matchesEmployee = !selectedEmployee || absence.idEmploye === selectedEmployee.id;
      const matchesMonth = absenceDate >= monthStart && absenceDate <= monthEnd;

      return matchesEmployee && matchesMonth;
    });
  }, [absences, selectedEmployee, daysInMonth]);

  const getAbsencesForDay = (day) => {
    const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    return filteredAbsences.filter(absence => {
      const absenceDate = new Date(absence.dateAbsence);
      return currentDate.toDateString() === absenceDate.toDateString();
    });
  };

  const getEmployeeName = (id) => {
    const emp = employees.find(e => e.id === id);
    return emp ? `${emp.prenom} ${emp.nom}` : "";
  };

  const isWeekend = (day) => {
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() &&
           selectedDate.getMonth() === today.getMonth() &&
           selectedDate.getFullYear() === today.getFullYear();
  };

  const changeMonth = (delta) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + delta, 1));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0b16 0%, #1a1525 100%)', padding: '2rem', fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, background: 'linear-gradient(135deg, #b085f5 0%, #7e57c2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>
            Calendrier des Absences & Congés
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
            Suivi en temps réel des absences et congés du personnel
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {/* Sidebar */}
          <div style={{ width: '320px', flexShrink: 0 }}>
            <div style={{ background: '#1a1525', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)', position: 'sticky', top: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(126, 87, 194, 0.3)' }}>
                <Users size={24} style={{ color: '#7e57c2' }} />
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: '#ffffff' }}>Employés</h3>
              </div>

              <div onClick={() => setSelectedEmployee(null)} style={{ padding: '1rem', borderRadius: '12px', background: !selectedEmployee ? 'linear-gradient(135deg, #7e57c2 0%, #b085f5 100%)' : 'rgba(126, 87, 194, 0.1)', border: !selectedEmployee ? '2px solid #b085f5' : '2px solid transparent', marginBottom: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: !selectedEmployee ? 'rgba(255,255,255,0.2)' : 'rgba(126,87,194,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                  <Users size={24} />
                </div>
                <div>
                  <div style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600 }}>Tous les employés</div>
                  <div style={{ color: !selectedEmployee ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>Vue globale</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '600px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {employees.map(emp => {
                  const isSelected = selectedEmployee?.id === emp.id;
                  const hasAbsence = filteredAbsences.some(a => a.idEmploye === emp.id);
                  return (
                    <div key={emp.id} onClick={() => setSelectedEmployee(emp)} style={{ padding: '1rem', borderRadius: '12px', background: isSelected ? 'linear-gradient(135deg, #7e57c2 0%, #b085f5 100%)' : 'rgba(126,87,194,0.05)', border: isSelected ? '2px solid #b085f5' : '2px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
                      {hasAbsence && !isSelected && <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', width: '8px', height: '8px', borderRadius: '50%', background: '#7e57c2', boxShadow: '0 0 8px rgba(126,87,194,0.6)' }} />}
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: isSelected ? 'rgba(255,255,255,0.2)' : '#7e57c2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700, color: '#ffffff', flexShrink: 0 }}>
                        {emp.prenom[0]}{emp.nom[0]}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {emp.prenom} {emp.nom}
                        </div>
                        <div style={{ color: isSelected ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {emp.matricule} • {emp.departement}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Calendrier */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ background: '#1a1525', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
              {/* Navigation du mois */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '2px solid rgba(126,87,194,0.3)' }}>
                <button onClick={() => changeMonth(-1)} style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(126,87,194,0.1)', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  <ChevronLeft size={28} />
                </button>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                  {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </h2>
                <button onClick={() => changeMonth(1)} style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(126,87,194,0.1)', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  <ChevronRight size={28} />
                </button>
              </div>

              {/* Jours */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '0.75rem', marginBottom: '0.75rem' }}>
                {dayNames.map(day => <div key={day} style={{ textAlign:'center', fontSize:'0.875rem', fontWeight:700, color:'#b085f5', textTransform:'uppercase', letterSpacing:'0.5px' }}>{day}</div>)}
              </div>

              {/* Grille */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'0.75rem' }}>
                {Array.from({ length: daysInMonth.startingDayOfWeek }).map((_, i) => <div key={`empty-${i}`} style={{ height:'160px', background:'rgba(255,255,255,0.02)', borderRadius:'12px', border:'2px solid rgba(126,87,194,0.15)'}} />)}
                {Array.from({ length: daysInMonth.daysCount }).map((_, i) => {
                  const day = i + 1;
                  const absencesDay = getAbsencesForDay(day);
                  const weekend = isWeekend(day);
                  const today = isToday(day);

                  // Mettre le fond en rouge si absence
                  const hasAbsence = absencesDay.length > 0;
                  const background = hasAbsence ? 'rgba(244,67,54,0.6)' : today ? 'rgba(126,87,194,0.15)' : weekend ? 'rgba(255,255,255,0.02)' : '#0f0b16';

                  return (
                    <div key={day} style={{ height:'160px', padding:'0.75rem', background, borderRadius:'12px', border:`2px solid ${today ? '#7e57c2':'rgba(126,87,194,0.2)'}`, position:'relative', overflow:'hidden', transition:'all 0.2s', cursor:'pointer' }}>
                      <div style={{ fontSize:'1.125rem', fontWeight: today ? 700 : 600, color: today ? '#b085f5' : weekend ? 'rgba(255,255,255,0.4)' : '#ffffff', marginBottom:'0.5rem' }}>{day}</div>
                      <div style={{ display:'flex', flexDirection:'column', gap:'0.375rem', maxHeight:'110px', overflowY:'auto' }}>
                        {absencesDay.map(absence => {
                          const config = typeConfig[absence.typeAbsence] || typeConfig["Congé annuel"];
                          const IconComponent = config.icon;
                          return (
                            <div key={absence.id} title={`${getEmployeeName(absence.idEmploye)}\n${absence.typeAbsence}\n${new Date(absence.dateAbsence).toLocaleDateString('fr-FR')}\nStatut: ${absence.justifiee ? 'Justifié' : 'Non justifié'}`} style={{ background:config.color, color:config.textColor, padding:'0.5rem 0.625rem', borderRadius:'8px', fontSize:'0.75rem', fontWeight:600, display:'flex', alignItems:'center', gap:'0.375rem', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.2)' }}>
                              <IconComponent size={14} />
                              <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1 }}>{selectedEmployee ? absence.typeAbsence : getEmployeeName(absence.idEmploye)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Légende */}
              <div style={{ marginTop:'2rem', paddingTop:'1.5rem', borderTop:'2px solid rgba(126,87,194,0.3)' }}>
                <div style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.875rem', fontWeight:600, marginBottom:'1rem' }}>Légende des types d'absence</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.75rem' }}>
                  {Object.entries(typeConfig).map(([type, config]) => {
                    const IconComponent = config.icon;
                    return (
                      <div key={type} style={{ background:config.color, color:config.textColor, padding:'0.625rem 1rem', borderRadius:'10px', fontSize:'0.875rem', fontWeight:600, display:'flex', alignItems:'center', gap:'0.5rem', boxShadow:'0 2px 8px rgba(0,0,0,0.2)' }}>
                        <IconComponent size={16} />{type}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendrierAbsences;
