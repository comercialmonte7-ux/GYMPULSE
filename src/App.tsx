import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { MachineCard } from './components/MachineCard';
import { WorkoutLogger } from './components/WorkoutLogger';
import { WorkoutHistory } from './components/WorkoutHistory';
import { AICoach } from './components/AICoach';
import { RoutineSelector } from './components/RoutineSelector';
import { RoutineDetail } from './components/RoutineDetail';
import { MachineAnimation } from './components/MachineAnimation';
import { ActiveSession } from './components/ActiveSession';
import { MACHINES } from './constants';
import { Machine, Exercise, Routine } from './types';
import { useLocalStorage } from './lib/utils';
import { 
  LayoutDashboard, 
  Dumbbell, 
  History, 
  Bot, 
  X, 
  Check, 
  BookOpen, 
  LogIn, 
  LogOut, 
  User as UserIcon, 
  Plus, 
  Activity, 
  ShieldCheck, 
  Play, 
  Clock, 
  ArrowLeft,
  Mail,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, googleProvider, db, handleFirestoreError, authInitialized } from './lib/firebase';
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, User, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, onSnapshot, addDoc, query, orderBy, setDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dash' | 'routines' | 'history' | 'coach' | 'machines'>('dash');
  const [workouts, setWorkouts] = useLocalStorage<Exercise[]>('gym-pulse-workouts', []);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [activeSessionRoutine, setActiveSessionRoutine] = useState<Routine | null>(null);
  const [showLogger, setShowLogger] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailAuthLoading, setEmailAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authDisplayName, setAuthDisplayName] = useState('');

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setAuthError('');
    setEmailAuthLoading(true);

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, authEmail, authPassword);
        if (authDisplayName.trim()) {
          await updateProfile(userCredential.user, {
            displayName: authDisplayName.trim()
          });
          setUser({
            ...userCredential.user,
            displayName: authDisplayName.trim()
          } as any);
        }
        setShowAuthModal(false);
      } else {
        await signInWithEmailAndPassword(auth, authEmail, authPassword);
        setShowAuthModal(false);
      }
      setAuthEmail('');
      setAuthPassword('');
      setAuthDisplayName('');
    } catch (err: any) {
      console.error("Email auth error:", err);
      if (err.code === 'auth/email-already-in-use') {
        setAuthError('Este correo electrónico ya está registrado.');
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setAuthError('Correo o contraseña incorrectos.');
      } else if (err.code === 'auth/weak-password') {
        setAuthError('La contraseña debe tener al menos 6 caracteres.');
      } else if (err.code === 'auth/invalid-email') {
        setAuthError('El correo electrónico no es válido.');
      } else {
        setAuthError(err.message || 'Ocurrió un error al intentar autenticar.');
      }
    } finally {
      setEmailAuthLoading(false);
    }
  };

  const showAuthError = (error: any) => {
    console.error("Auth Error:", error);
    const hostname = window.location.hostname;
    
    if (error.code === 'auth/popup-blocked') {
      alert("⚠️ VENTANA BLOQUEADA:\n\nEl navegador bloqueó la ventana de inicio de sesión. Por favor, permite las ventanas emergentes o abre la app directamente en Safari/Chrome.");
    } else if (error.code === 'auth/unauthorized-domain') {
      const authDomain = (auth as any).config?.authDomain || (auth as any).app?.options?.authDomain || "firebaseapp.com";
      alert(`🚫 DOMINIO NO AUTORIZADO:\n\nEl dominio '${hostname}' no está en la lista blanca de Firebase.\n\nESTE ES EL DOMINIO QUE DEBES AÑADIR:\n👉 ${hostname}\n\nINSTRUCCIONES:\n1. Ve a tu Consola de Firebase del proyecto 'gen-lang-client-0214067559'.\n2. Authentication > Settings > Dominios Autorizados.\n3. Haz clic en 'Añadir dominio' y pega exactamente: ${hostname}\n4. (Opcional) Añade también: ${authDomain}\n\nNota: Los cambios pueden tardar 1-2 minutos en aplicarse.`);
    } else if (error.code === 'auth/operation-not-allowed') {
      alert("❌ GOOGLE NO HABILITADO:\n\nEl método de inicio de sesión con Google no está habilitado en tu Consola de Firebase (Authentication > Sign-in method).");
    } else if (error.code === 'auth/internal-error') {
      alert("⚙️ ERROR INTERNO:\n\nError de red o de Firebase. Verifica tu conexión.");
    } else {
      alert("⚠️ ERROR DE AUTENTICACIÓN (" + error.code + "):\n\n" + (error.message || "Intenta nuevamente"));
    }
  };

  useEffect(() => {
    let unsubWorkouts: (() => void) | undefined;
    let isInitialAuthCheck = true;
    const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;

    const initialize = async () => {
      // 1. Wait for Firebase Persistence context to be ready (critical for PWAs)
      try {
        await authInitialized;
      } catch (e) {
        console.warn("Auth persistence failed:", e);
      }

      if (!auth) {
        setLoading(false);
        return;
      }

      // 2. Handle redirect result
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          setUser(result.user);
        }
      } catch (error: any) {
        if (error.code !== 'auth/unauthorized-domain' && error.code !== 'auth/redirect-cancelled-by-user') {
          console.error("Redirect Error:", error);
          if (error.code !== 'auth/argument-error') {
            showAuthError(error);
          }
        }
      }

      // 3. Set up the long-term listener
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        
        if (currentUser) {
          localStorage.setItem('gym-pulse-session-active', 'true');
          // Create or update user profile
          try {
            await setDoc(doc(db, 'users', currentUser.uid), {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              lastLogin: serverTimestamp()
            }, { merge: true });
          } catch (error) {
            console.error("Error updating user profile:", error);
          }

          // Sync workouts
          const q = query(
            collection(db, 'users', currentUser.uid, 'workouts'),
            orderBy('date', 'desc')
          );
          
          unsubWorkouts = onSnapshot(q, (snapshot) => {
            const cloudWorkouts = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            } as Exercise));
            
            if (cloudWorkouts.length > 0) {
              setWorkouts(cloudWorkouts);
            }
          }, (error) => {
             handleFirestoreError(error, 'list' as any, `users/${currentUser.uid}/workouts`);
          });
        }
      });

      return unsubscribe;
    };

    const unsubPromise = initialize();

    // Safety timeout for loading
    // If we believe we have a session, we wait longer to avoid showing the login screen prematurely
    const hasSessionFlag = localStorage.getItem('gym-pulse-session-active') === 'true';
    const safetyTimeout = isStandalone ? (hasSessionFlag ? 6000 : 3000) : (hasSessionFlag ? 4000 : 2000);

    const timer = setTimeout(() => {
      setLoading(false);
    }, isStandalone ? 4000 : 2000);

    return () => {
      unsubPromise.then(unsub => unsub());
      if (unsubWorkouts) unsubWorkouts();
      clearTimeout(timer);
    };
  }, [setWorkouts]);

  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async () => {
    setLoginLoading(true);
    try {
      if (!auth) {
        throw new Error("El motor de autenticación no está listo. Por favor, recarga la aplicación e intenta de nuevo.");
      }

      // Re-create provider to ensure it's a fresh instance and avoid any prototype pollution/issues
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ 
        prompt: 'select_account',
        display: 'touch'
      });

      const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;
      
      if (isStandalone) {
        console.log("Standalone mode detected: Using signInWithRedirect");
        await signInWithRedirect(auth, provider);
      } else {
        console.log("Browser mode detected: Using signInWithPopup");
        try {
          await signInWithPopup(auth, provider);
        } catch (popupError: any) {
          // If popup is blocked or fails, fallback to redirect even in browser
          if (popupError.code === 'auth/popup-blocked' || popupError.code === 'auth/cancelled-by-user') {
            throw popupError; // Let the main catch handle it with a specific message
          }
          console.warn("Popup failed, trying redirect fallback...", popupError);
          await signInWithRedirect(auth, provider);
        }
      }
    } catch (error: any) {
      if (error.code === 'auth/argument-error') {
        console.error("Critical Auth Argument Error:", error);
        alert("🚨 ERROR DE CONFIGURACIÓN:\n\nHay un problema técnico con la conexión a Google. Esto suele ocurrir por un conflicto de sesión en iOS.\n\nSOLUCIÓN:\n1. Cierra la app completamente.\n2. Ábrela de nuevo.\n3. Si persiste, usa el botón 'Limpiar datos locales' en el Resumen.");
      } else {
        showAuthError(error);
      }
    } finally {
      const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;
      if (!isStandalone) {
        setLoginLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      localStorage.removeItem('gym-pulse-session-active');
      setUser(null);
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const handleSaveWorkout = async (exercise: Exercise) => {
    if (user) {
      try {
        const workoutPath = `users/${user.uid}/workouts`;
        await addDoc(collection(db, workoutPath), {
          ...exercise,
          userId: user.uid,
          createdAt: serverTimestamp()
        });
      } catch (error) {
        console.error("Error saving to Firestore:", error);
        handleFirestoreError(error, 'create', `users/${user.uid}/workouts`);
        // Fallback to local state if firestore fails (will be synced via useLocalStorage anyway)
        setWorkouts([...workouts, exercise]);
      }
    } else {
      setWorkouts([...workouts, exercise]);
    }
    setActiveTab('history');
    setShowLogger(false);
  };

  const tabs = [
    { id: 'dash', label: 'Resumen', icon: LayoutDashboard },
    { id: 'routines', label: 'Entrenamiento', icon: Dumbbell },
    { id: 'history', label: 'Actividad', icon: History },
    { id: 'coach', label: 'Coach', icon: Bot },
  ] as const;

  return (
    <div className="min-h-screen bg-main font-sans text-bright selection:bg-accent-recovery/20">
      {/* Header */}
      <header className="bg-main/80 backdrop-blur-md border-b border-border-subtle p-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-display font-bold text-xl">G</div>
            <h1 className="text-xl technical-heading uppercase tracking-tighter">GymPulse <span className="text-dim text-xs lowercase font-mono">v2.0</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
               <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                   <p className="text-xs font-bold text-bright leading-none mb-1">{user.displayName}</p>
                   <p className="label-caps !text-[8px] tracking-[0.1em]">{user.email}</p>
                 </div>
                 <button onClick={handleLogout} className="group relative">
                   <img 
                      src={user.photoURL || 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png'} 
                      className="w-8 h-8 rounded-full border border-border-subtle group-hover:border-white transition-colors" 
                      alt="Avatar"
                      referrerPolicy="no-referrer"
                    />
                 </button>
               </div>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                disabled={loginLoading}
                className={`flex items-center gap-2 bg-surface text-bright px-4 py-2 rounded-full border border-border-subtle hover:border-white/20 transition-all text-[10px] font-bold uppercase tracking-widest ${loginLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loginLoading ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <LogIn size={14} />
                )}
                <span>{loginLoading ? 'Conectando...' : 'Iniciar Sesión'}</span>
              </button>
            )}

            <div className="flex items-center gap-3 bg-surface px-4 py-1.5 rounded-full border border-border-subtle">
              <Activity size={12} className="text-accent-recovery animate-pulse" />
              <span className="label-caps tracking-[0.05em] text-accent-recovery hidden sm:inline"> Salud Sincronizada</span>
            </div>
          </div>
        </div>
      </header>

      {loading && (
        <div className="fixed inset-0 bg-main z-[100] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center font-display font-bold text-3xl mb-8 animate-pulse shadow-2xl shadow-white/10">G</div>
          <div className="w-12 h-12 border-2 border-accent-recovery border-t-transparent rounded-full animate-spin mb-6" />
          <h2 className="technical-heading text-xl uppercase tracking-widest text-bright">Sincronizando</h2>
          <p className="label-caps !text-[10px] text-dim mt-2 tracking-[0.2em]">Verificando Telemetría Biométrica...</p>
          
          <button 
            onClick={() => window.location.reload()}
            className="mt-12 text-[9px] font-black uppercase tracking-widest text-dim hover:text-bright transition-colors border border-white/5 px-4 py-2 rounded-lg"
          >
            Si tarda demasiado, pulsa aquí para reintentar
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6 pb-32">
        {activeTab === 'dash' && <Dashboard workouts={workouts} onNavigate={setActiveTab} />}
        
        {activeTab === 'routines' && (
          selectedRoutine ? (
            <RoutineDetail 
              routine={selectedRoutine} 
              onBack={() => setSelectedRoutine(null)}
              onSelectMachine={(m) => setSelectedMachine(m)}
              onStartLog={() => setActiveSessionRoutine(selectedRoutine)}
            />
          ) : (
            <RoutineSelector onSelect={(r) => setSelectedRoutine(r)} />
          )
        )}

        {activeTab === 'machines' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MACHINES.map(m => (
              <MachineCard key={m.id} machine={m} onClick={() => setSelectedMachine(m)} />
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="flex justify-end">
               <button 
                 onClick={() => setShowLogger(!showLogger)}
                 className="geometric-button-primary flex items-center gap-2"
               >
                 {showLogger ? <History size={14} /> : <Plus size={14} />}
                 {showLogger ? 'Ver Historial' : 'Entrada Manual'}
               </button>
            </div>
            {showLogger ? (
               <WorkoutLogger onSave={handleSaveWorkout} recentWorkouts={workouts} />
            ) : (
               <WorkoutHistory workouts={workouts} />
            )}
          </div>
        )}
        {activeTab === 'coach' && <AICoach />}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-auto bg-surface/80 backdrop-blur-lg border border-border-subtle p-2 flex gap-1 rounded-full shadow-2xl z-50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== 'routines') setSelectedRoutine(null);
            }}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold uppercase text-[10px] tracking-widest transition-all ${
              activeTab === tab.id ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-muted hover:text-bright'
            }`}
          >
            <tab.icon size={18} />
            <span className="hidden lg:inline">{tab.label}</span>
          </button>
        ))}
      </nav>

      <AnimatePresence>
        {activeSessionRoutine && (
            <ActiveSession 
                routine={activeSessionRoutine}
                onClose={() => setActiveSessionRoutine(null)}
                onFinish={(sessionData) => {
                    if (sessionData && sessionData.length > 0) {
                        sessionData.forEach(handleSaveWorkout);
                    }
                    setActiveSessionRoutine(null);
                    setActiveTab('dash');
                }}
                onShowMachineInfo={(m) => setSelectedMachine(m)}
            />
        )}
      </AnimatePresence>

      {/* Machine Modal */}
      <AnimatePresence>
        {selectedMachine && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMachine(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              className="relative bg-surface rounded-[40px] p-8 md:p-12 max-w-2xl w-full max-h-[85vh] overflow-y-auto z-10 border border-border-subtle shadow-2xl"
            >
              <button 
                onClick={() => setSelectedMachine(null)}
                className="absolute top-8 right-8 p-3 text-dim hover:text-bright hover:bg-white/5 rounded-full transition-all"
              >
                <X size={24} />
              </button>

              <div className="mb-10">
                <span className="bg-accent-recovery/10 text-accent-recovery px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-accent-recovery/20">
                  {selectedMachine.muscleGroup}
                </span>
                <h2 className="text-4xl technical-heading mt-6">{selectedMachine.name}</h2>
                <p className="text-dim mt-4 font-medium mb-12 text-lg">{selectedMachine.description}</p>
                
                <div className="h-64 mb-8 overflow-hidden rounded-3xl">
                  <MachineAnimation machineId={selectedMachine.id} videoUrl={selectedMachine.videoUrl} />
                </div>
              </div>

              <div className="space-y-12">
                <div>
                  <h3 className="label-caps !text-accent-recovery border-b border-border-subtle pb-4 mb-8">Protocolo de Configuración</h3>
                  <ul className="space-y-6">
                    {selectedMachine.instructions.map((step, i) => (
                      <li key={i} className="flex gap-6 items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-2xl flex items-center justify-center text-sm font-bold shadow-lg">
                          {i + 1}
                        </div>
                        <p className="font-medium text-bright leading-relaxed pt-2 text-lg">{step}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                  <h3 className="label-caps !text-accent-strain mb-6 flex items-center gap-2">
                    <ShieldCheck size={16} /> Prevención de Errores
                  </h3>
                  <ul className="space-y-3">
                    {selectedMachine.tips.map((tip, i) => (
                      <li key={i} className="text-sm font-medium text-bright flex gap-3">
                        <span className="text-accent-strain font-bold mt-1">!</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSelectedMachine(null);
                    setActiveTab('history');
                    setShowLogger(true);
                  }}
                  className="geometric-button-primary w-full py-6 text-xl"
                >
                  Confirmar Entrada
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              className="relative bg-surface rounded-[40px] p-8 md:p-12 max-w-md w-full z-10 border border-border-subtle shadow-2xl"
            >
              <button 
                onClick={() => setShowAuthModal(false)}
                className="absolute top-8 right-8 p-3 text-dim hover:text-bright hover:bg-white/5 rounded-full transition-all"
              >
                <X size={20} />
              </button>

              <div className="mb-8 text-center">
                <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center font-display font-bold text-2xl mx-auto mb-4">G</div>
                <h2 className="text-3xl technical-heading uppercase tracking-tighter">GymPulse Auth</h2>
                <p className="label-caps !text-[9px] tracking-widest text-dim mt-2">
                  {isSignUp ? 'Crear nueva cuenta' : 'Ingresa a tu cuenta'}
                </p>
              </div>

              {authError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs mb-6 flex items-start gap-2.5">
                  <span className="font-bold text-sm leading-none mt-0.5">!</span>
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleEmailAuth} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-1.5">
                    <label className="label-caps !text-[8px] tracking-wider pl-1">Nombre Completo</label>
                    <div className="relative">
                      <input 
                        type="text"
                        required
                        placeholder="TU NOMBRE"
                        value={authDisplayName}
                        onChange={(e) => setAuthDisplayName(e.target.value)}
                        className="w-full bg-main border border-border-subtle rounded-2xl px-5 py-4 text-xs font-mono placeholder:text-muted focus:border-accent-recovery outline-none text-bright transition-all pl-12 uppercase"
                      />
                      <UserIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="label-caps !text-[8px] tracking-wider pl-1">Correo Electrónico</label>
                  <div className="relative">
                    <input 
                      type="email"
                      required
                      placeholder="TU@EMAIL.COM"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full bg-main border border-border-subtle rounded-2xl px-5 py-4 text-xs font-mono placeholder:text-muted focus:border-accent-recovery outline-none text-bright transition-all pl-12 lowercase"
                    />
                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="label-caps !text-[8px] tracking-wider pl-1">Contraseña</label>
                  <div className="relative">
                    <input 
                      type="password"
                      required
                      placeholder="••••••••"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full bg-main border border-border-subtle rounded-2xl px-5 py-4 text-xs font-mono placeholder:text-muted focus:border-accent-recovery outline-none text-bright transition-all pl-12"
                    />
                    <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={emailAuthLoading}
                  className="geometric-button-primary w-full py-4 text-xs mt-6 flex items-center justify-center gap-2"
                >
                  {emailAuthLoading ? (
                    <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : isSignUp ? 'Registrar y Sincronizar' : 'Iniciar Sesión'}
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-subtle"></div></div>
                <div className="relative flex justify-center text-[8px] uppercase tracking-widest"><span className="bg-surface px-4 text-muted">o continúa con</span></div>
              </div>

              <button
                type="button"
                onClick={() => {
                  handleLogin();
                  setShowAuthModal(false);
                }}
                disabled={loginLoading}
                className="w-full flex items-center justify-center gap-3 bg-white/5 border border-border-subtle hover:border-white/20 transition-all py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-bright mb-6"
              >
                {loginLoading ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <LogIn size={14} className="text-accent-recovery" />
                )}
                <span>Google Auth</span>
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setAuthError('');
                  }}
                  className="text-[9px] font-bold uppercase tracking-widest text-dim hover:text-bright transition-colors"
                >
                  {isSignUp ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate aquí'}
                </button>
              </div>

              <div className="bg-accent-recovery/5 border border-accent-recovery/20 p-4 rounded-2xl mt-8 text-[10px] text-accent-recovery leading-relaxed italic text-center">
                💡 <strong>Consejo para iPhone (PWA):</strong> Usar tu correo y contraseña te permite ingresar de inmediato sin salir de la pantalla de inicio.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
