import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const savedLanguage = localStorage.getItem('language') || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        appBar: {
          title: "Document Management System",
          login: "Login",
          workspaces: 'All Workspaces',
          documents: 'All Documents',
          recycleBin: 'Recycle Bin',
        },
        landingPage: {
          welcome: "Welcome to Your Document Management System",
          description: "Manage your documents with ease and efficiency. Securely store, access, and share your documents from anywhere.",
          login: "Login",
          register: "Register",
          documentSolution: "Your secure document solution",
        },
        authPage: {
          signIn: "Sign In",
          username: "Username",
          password: "Password",
          rememberMe: "Remember Me",
          forgotPassword: "Forgot Password?",
          noAccount: "Don't have an account? Sign Up",
          signUp: "Sign Up",
          nationalID: "National ID",
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email",
          newsletter: "Subscribe to our newsletter",
          alreadyAccount: "Already have an account? Sign In",
          signInError: "An error occurred while signing in. Please try again.",
          signUpError: "An error occurred while signing up. Please try again.",
        },
        dashboard: {
          title: "Dashboard",
          recentDocuments: "Recent Documents",
          favorites: "Favorites",
          sharedWithMe: "Shared with Me",
          workspaces: "Workspaces",
          createWorkspace: "Create Workspace",
          allWorkspaces: "All Workspaces",
          documents: "Documents",
          createDocument: "Create Document",
          allDocuments: "All Documents",
          recycleBin: "Recycle Bin",
        }
      }
    },
    fr: {
      translation: {
        appBar: {
          title: "Système de gestion de documents",
          login: "Se connecter",
          workspaces: "Tous les espaces de travail",
          documents: "Tous les documents",
          recycleBin: "Corbeille",
        },
        landingPage: {
          welcome: 'Bienvenue dans votre système de gestion de documents',
          description: 'Gérez efficacement, stockez et partagez vos documents en toute sécurité.',
          login: 'Se connecter',
          register: "S'inscrire",
          documentSolution: 'Votre solution de gestion de documents sécurisée',
        },
        dashboard: {
          title: "Tableau de bord",
          recentDocuments: "Documents récents",
          favorites: "Favoris",
          sharedWithMe: "Partagé avec moi",
          workspaces: "Espaces de travail",
          createWorkspace: "Créer un espace de travail",
          allWorkspaces: "Tous les espaces de travail",
          documents: "Documents",
          createDocument: "Créer un document",
          allDocuments: "Tous les documents",
          recycleBin: "Corbeille",
        },
        authPage: {
          signIn: "Se connecter",
          username: "Nom d'utilisateur",
          password: "Mot de passe",
          rememberMe: "Se souvenir de moi",
          forgotPassword: "Mot de passe oublié ?",
          noAccount: "Vous n'avez pas de compte ? Inscrivez-vous",
          signUp: "S'inscrire",
          nationalID: "Carte d'identité nationale",
          firstName: "Prénom",
          lastName: "Nom",
          email: "Email",
          newsletter: "S'abonner à notre newsletter",
          alreadyAccount: "Vous avez déjà un compte ? Connectez-vous",
          signInError: "Une erreur s'est produite lors de la connexion. Veuillez réessayer.",
          signUpError: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
        },
      }
    },
    ar: {
      translation: {
        appBar: {
          title: "نظام إدارة المستندات",
          login: "تسجيل الدخول",
          workspaces: "كل مساحات العمل",
          documents: "كل المستندات",
          recycleBin: "سلة المحذوفات",
        },
        landingPage: {
          welcome: 'أهلاً بك في نظام إدارة المستندات الخاص بك',
          description: 'قم بإدارة مستنداتك بكفاءة وأمان. قم بتخزينها ومشاركتها بسهولة.',
          login: 'تسجيل الدخول',
          register: 'التسجيل',
          documentSolution: 'حل إدارة المستندات الآمن الخاص بك',
        },
        dashboard: {
          title: "لوحة المعلومات",
          recentDocuments: "المستندات الحديثة",
          favorites: "المفضلة",
          sharedWithMe: "مشاركة معي",
          workspaces: "مساحات العمل",
          createWorkspace: "إنشاء مساحة عمل",
          allWorkspaces: "جميع مساحات العمل",
          documents: "المستندات",
          createDocument: "إنشاء مستند",
          allDocuments: "جميع المستندات",
          recycleBin: "سلة المحذوفات",
        },
        authPage: {
          signIn: "تسجيل الدخول",
          username: "اسم المستخدم",
          password: "كلمة المرور",
          rememberMe: "تذكرني",
          forgotPassword: "نسيت كلمة المرور؟",
          noAccount: "ليس لديك حساب؟ سجل الآن",
          signUp: "التسجيل",
          nationalID: "رقم الهوية الوطنية",
          firstName: "الاسم الأول",
          lastName: "الكنية",
          email: "البريد الإلكتروني",
          newsletter: "الاشتراك في النشرة البريدية",
          alreadyAccount: "لديك حساب بالفعل؟ تسجيل الدخول",
          signInError: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.",
          signUpError: "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.",
        },
      }
    }
  },
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  }
});

export default i18n;
