import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const savedLanguage = localStorage.getItem('language') || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        appBar: {
          title: 'Document Management System',
          login: 'Login',
          workspaces: 'Workspaces',
          documents: 'Documents',
          recycleBin: 'Recycle Bin',
          taketour: 'Take Tour',
        },
        userMenu: {
          profile: 'Profile',
          myAccount: 'My account',
          logout: 'Logout',
        },
        buttons: {
          delete: 'Delete',
          details: 'View Details',
          download: 'Download',
          preview: 'Preview',
          close: 'Close',
        },
        pagination: {
          previous: 'Previous',
          page: 'Page',
          of: 'Of',
          next: 'Next',
        },
        document: {
          documentFormNameLabel: 'New Document Name',
          addDocument: 'Add Document',
          searchDocuments: 'Search Documents',
          order: 'Order',
          sort: 'Sort By',
          none: 'None',
          documentName: 'Document Name',
          createdAt: 'Created At',
          updatedAt: 'Updated At',
          ascending: 'Ascending',
          descending: 'Descending',
          allDocuments: 'All Documents',
          createNewDocument: 'Create New Document',
          selectWorkspace: 'Select Workspace',
          noDocumentsAvailable: 'No documents available.',
          upload: 'Upload',
          uploading: 'Uploading',
        },
        workspace: {
          allWorkspaces: 'All Workspaces',
          workspaceCreateError: 'Failed to create workspace. Please try again.',
          createNewWorkspace: 'Create New Workspace',
          workspaceName: 'Workspace Name',
          description: 'Description',
          noDescription: 'No description',
          createWorkspace: 'Create Workspace',
          loadingWorkspace: 'Loading workspace...',
          viewDetails: 'View Details',
          noWorkspaces: 'No workspaces available.',
          shareWorkspace: 'Share Workspace',
          enterEmail: 'Enter email',
          permission: 'Permission',
          viewer: 'Viewer',
          editor: 'Editor',
          share: 'Share',
          cancel: 'Cancel',
          owner: 'Owner',
          edit: 'Edit',
          public: 'Public',
          createdAt: 'Created at',
          updatedAt: 'Updated at',
          documentsCount: 'Documents count',
          permissions: 'Permissions',
          name: 'Name',
          details: 'Details',
          close: 'Close',
          no: 'No',
          save: 'Save',
          yes: 'Yes',
          loadingWorkspaces: 'Loading Workspaces...',
        },
        landingPage: {
          welcome: 'Welcome to Your Document Management System',
          description:
            'Manage your documents with ease and efficiency. Securely store, access, and share your documents from anywhere.',
          login: 'Login',
          register: 'Register',
          documentSolution: 'Your secure document solution',
        },
        authPage: {
          signIn: 'Sign In',
          password: 'Password',
          rememberMe: 'Remember Me',
          forgotPassword: 'Forgot Password?',
          noAccount: "Don't have an account? Sign Up",
          signUp: 'Sign Up',
          nationalID: 'National ID',
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email',
          newsletter: 'Subscribe to our newsletter',
          alreadyAccount: 'Already have an account? Sign In',
          signInError: 'An error occurred while signing in. Please try again.',
          signUpError: 'An error occurred while signing up. Please try again.',
          otpError: 'OTP error',
          otpResent: 'Resend OTP',
          otpResendError: 'OTP resend error',
          enterOtp: 'Enter OTP',
          verifyOtp: 'Verify OTP',
          resendOtp: 'Resend OTP',
          resetPassword: 'Reset Password',
          resetEmailSent: 'Password reset email sent!',
          resetPasswordError: 'There was an issue sending the reset email.',
          sendResetLink: 'Send Reset Link',
          emailRequired: 'Email is required',
          returnToSignup: 'Return to Signup',
          nationalIDRequired: 'National ID required',
          invalidNationalID: 'Invalid National ID',
          firstNameRequired: 'First name is required',
          lastNameRequired: 'Last name is required',
          invalidEmail: 'Invalid Email',
          passwordRequired: 'Password required',
          passwordTooShort: 'Password too short',
          otp: 'OTP',
          newPassword: 'New Password',
        },
        dashboard: {
          greeting: 'Hello, ',
          title: 'Dashboard',
          recentWorkspaces: 'Recent Workspaces',
          favorites: 'Favorites',
          noFavorites: 'No workspaces favorited yet',
          sharedWithMe: 'Shared with Me',
          workspaces: 'Workspaces',
          createWorkspace: 'Create Workspace',
          allWorkspaces: 'All Workspaces',
          documents: 'Documents',
          createDocument: 'Create Document',
          allDocuments: 'All Documents',
          recycleBin: 'Recycle Bin',
          noSharedWorkspaces: 'No shared workspaces',
          publicWorkspaces: 'Public Workspaces',
          noPublicWorkspaces: 'No public workspaces',
          loadingPublicWorkspaces: 'Loading public workspaces...',
        },
        profile: {
          profile: 'Profile',
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email',
          signOut: 'Sign Out',
        },
        recycleBin: {
          recycleBin: 'Recycle Bin',
          viewDetails: 'View Details',
          restore: 'Restore',
          deletePremanently: 'Delete Permanently',
          noDocumentInRecycleBin: 'No documents in the recycle bin.',
        },
      },
    },
    fr: {
      translation: {
        appBar: {
          title: 'Système de gestion de documents',
          login: 'Se connecter',
          workspaces: 'Tous les espaces de travail',
          documents: 'Tous les documents',
          recycleBin: 'Corbeille',
          taketour: 'Faire le tour',
        },
        userMenu: {
          profile: 'Profil',
          myAccount: 'Mon compte',
          logout: 'Déconnexion',
        },
        buttons: {
          delete: 'Supprimer',
          details: 'Voir les détails',
          download: 'Télécharger',
          preview: 'Aperçu',
          close: 'Fermer',
        },
        pagination: {
          previous: 'Précédent',
          page: 'Page',
          of: 'Sur',
          next: 'Suivant',
        },
        document: {
          documentFormNameLabel: 'Nom du nouveau document',
          addDocument: 'Ajouter un document',
          searchDocuments: 'Rechercher des documents',
          order: 'Ordre',
          sort: 'Trier par',
          none: 'Aucun',
          documentName: 'Nom du document',
          createdAt: 'Créé le',
          updatedAt: 'Mis à jour le',
          ascending: 'Ascendant',
          descending: 'Descendant',
          allDocuments: 'Tous les documents',
          createNewDocument: 'Créer un nouveau document',
          selectWorkspace: 'Sélectionner un espace de travail',
          noDocumentsAvailable: 'Aucun document disponible.',
          upload: 'télécharger',
          uploading: 'Téléchargement en cours',
        },
        workspace: {
          allWorkspaces: 'Tous les espaces de travail',
          workspaceCreateError:
            "Échec de la création de l'espace de travail. Veuillez réessayer.",
          createNewWorkspace: 'Créer un nouvel espace de travail',
          workspaceName: "Nom de l'espace de travail",
          description: 'Description',
          noDescription: 'Aucune description',
          createWorkspace: 'Créer un espace de travail',
          loadingWorkspace: "Chargement de l'espace de travail...",
          viewDetails: 'Voir les détails',
          noWorkspaces: 'Aucun espace de travail disponible.',
          shareWorkspace: "Partager l'espace de travail",
          enterEmail: 'Saisissez votre email',
          permission: 'Permission',
          viewer: 'Lecteur',
          editor: 'Éditeur',
          share: 'Partager',
          cancel: 'Annuler',
          owner: 'Propriétaire',
          edit: 'Modifier',
          public: 'Public',
          createdAt: 'Créé le',
          updatedAt: 'Mis à jour le',
          documentsCount: 'Nombre de documents',
          permissions: 'Permissions',
          name: 'Nom',
          details: 'Détails',
          close: 'Fermer',
          no: 'Non',
          save: 'Enregistrer',
          yes: 'Oui',
          loadingWorkspaces: 'Chargement des espaces de travail...',
        },
        landingPage: {
          welcome: 'Bienvenue dans votre système de gestion de documents',
          description:
            "Gérez vos documents avec efficacité et sécurité. Stockez, accédez et partagez vos documents de n'importe où.",
          login: 'Se connecter',
          register: "S'inscrire",
          documentSolution: 'Votre solution de gestion de documents sécurisée',
        },
        authPage: {
          signIn: 'Se connecter',
          password: 'Mot de passe',
          rememberMe: 'Se souvenir de moi',
          forgotPassword: 'Mot de passe oublié ?',
          noAccount: "Vous n'avez pas de compte ? Inscrivez-vous",
          signUp: "S'inscrire",
          nationalID: "Carte d'identité nationale",
          firstName: 'Prénom',
          lastName: 'Nom',
          email: 'Email',
          newsletter: "S'abonner à notre newsletter",
          alreadyAccount: 'Vous avez déjà un compte ? Connectez-vous',
          signInError:
            "Une erreur s'est produite lors de la connexion. Veuillez réessayer.",
          signUpError:
            "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
          otpError: 'Erreur OTP',
          otpResent: 'Renvoyer OTP',
          otpResendError: 'Erreur de renvoi OTP',
          enterOtp: 'Entrez OTP',
          verifyOtp: 'Vérifier OTP',
          resendOtp: 'Renvoyer OTP',
          resetPassword: 'Réinitialiser le mot de passe',
          resetEmailSent:
            "L'e-mail de réinitialisation du mot de passe a été envoyé !",
          resetPasswordError:
            "Il y a eu un problème lors de l'envoi de l'e-mail de réinitialisation.",
          sendResetLink: 'Envoyer le lien de réinitialisation',
          emailRequired: "L'e-mail est requis",
          returnToSignup: "Retour à l'inscription",
          nationalIDRequired: "Carte d'identité nationale requise",
          invalidNationalID: "Carte d'identité nationale invalide",
          firstNameRequired: 'Prénom requis',
          lastNameRequired: 'Nom de famille requis',
          invalidEmail: 'Adresse e-mail invalide',
          passwordRequired: 'Mot de passe requis',
          passwordTooShort: 'Mot de passe trop court',
          otp: 'OTP',
          newPassword: 'Nouveau mot de passe',
        },
        dashboard: {
          greeting: 'Bonjour, ',
          title: 'Tableau de bord',
          recentDocuments: 'Documents récents',
          recentWorkspaces: 'Espaces de travail récents',
          favorites: 'Favoris',
          noFavorites: 'Aucun espace de travail favori pour le moment',
          sharedWithMe: 'Partagé avec moi',
          workspaces: 'Espaces de travail',
          createWorkspace: 'Créer un espace de travail',
          allWorkspaces: 'Tous les espaces de travail',
          documents: 'Documents',
          createDocument: 'Créer un document',
          allDocuments: 'Tous les documents',
          recycleBin: 'Corbeille',
          nosharedWorkspaces: "Pas d'espaces de travail partagés",
          publicWorkspaces: 'Espaces de travail publics',
          noPublicWorkspaces: 'Aucun espace de travail public',
          loadingPublicWorkspaces:
            'Chargement des espaces de travail publics...',
        },
        profile: {
          profile: 'Profil',
          firstName: 'Prénom',
          lastName: 'Nom',
          email: 'Email',
          signOut: 'Déconnexion',
        },
        recycleBin: {
          recycleBin: 'Corbeille',
          viewDetails: 'Voir les détails',
          restore: 'Restaurer',
          deletePremanently: 'Supprimer définitivement',
          noDocumentInRecycleBin: 'Aucun document dans la corbeille.',
        },
      },
    },
    ar: {
      translation: {
        appBar: {
          title: 'نظام إدارة المستندات',
          login: 'تسجيل الدخول',
          workspaces: 'كل مساحات العمل',
          documents: 'كل المستندات',
          taketour: 'أخذ جولة',
          recycleBin: 'سلة المحذوفات',
        },
        userMenu: {
          profile: 'الملف الشخصي',
          myAccount: 'حسابي',
          logout: 'تسجيل الخروج',
        },
        buttons: {
          delete: 'حذف',
          details: 'عرض التفاصيل',
          download: 'تنزيل',
          preview: 'معاينة',
          close: 'إغلاق',
        },
        pagination: {
          previous: 'السابق',
          page: 'الصفحة',
          of: 'من',
          next: 'التالي',
        },
        document: {
          documentFormNameLabel: 'اسم المستند الجديد',
          addDocument: 'إضافة مستند',
          searchDocuments: 'بحث عن المستندات',
          order: 'الترتيب',
          sort: 'فرز حسب',
          none: 'لا شيء',
          documentName: 'اسم المستند',
          createdAt: 'تم الإنشاء في',
          updatedAt: 'تم التحديث في',
          ascending: 'تصاعدي',
          descending: 'تنازلي',
          allDocuments: 'كل المستندات',
          createNewDocument: 'إنشاء مستند جديد',
          selectWorkspace: 'اختر مساحة عمل',
          noDocumentsAvailable: 'لا توجد مستندات متاحة',
          upload: 'اضافة المستند',
          uploading: 'جارٍ التحميل',
        },
        workspace: {
          allWorkspaces: 'كل مساحات العمل',
          workspaceCreateError:
            'فشل في إنشاء مساحة العمل. يرجى المحاولة مرة أخرى.',
          createNewWorkspace: 'إنشاء مساحة عمل جديدة',
          workspaceName: 'اسم مساحة العمل',
          description: 'الوصف',
          noDescription: 'لا يوجد وصف',
          createWorkspace: 'إنشاء مساحة عمل',
          loadingWorkspace: 'جارٍ تحميل مساحة العمل...',
          viewDetails: 'عرض التفاصيل',
          noWorkspaces: 'لا توجد مساحات عمل متاحة',
          shareWorkspace: 'مشاركة مساحة العمل',
          enterEmail: 'أدخل البريد الإلكتروني',
          permission: 'إذن',
          viewer: 'عارض',
          editor: 'محرر',
          share: 'مشاركة',
          cancel: 'الغاء',
          owner: 'المالك',
          edit: 'تعديل',
          public: 'عام',
          createdAt: 'تم إنشاؤه في',
          updatedAt: 'تم تحديثه في',
          documentsCount: 'عدد الوثائق',
          permissions: 'الأذونات',
          name: 'الاسم',
          details: 'التفاصيل',
          close: 'إغلاق',
          no: 'لا',
          save: 'حفظ',
          yes: 'نعم',
          loadingWorkspaces: 'جارٍ تحميل مساحات العمل...',
        },
        landingPage: {
          welcome: 'أهلاً بك في نظام إدارة المستندات الخاص بك',
          description:
            'قم بإدارة مستنداتك بكفاءة وأمان. قم بتخزينها ومشاركتها من أي مكان.',
          login: 'تسجيل الدخول',
          register: 'التسجيل',
          documentSolution: 'حل إدارة المستندات الآمن الخاص بك',
        },
        authPage: {
          signIn: 'تسجيل الدخول',
          password: 'كلمة المرور',
          rememberMe: 'تذكرني',
          forgotPassword: 'نسيت كلمة المرور؟',
          noAccount: 'ليس لديك حساب؟ سجل الآن',
          signUp: 'التسجيل',
          nationalID: 'رقم الهوية الوطنية',
          firstName: 'الاسم الأول',
          lastName: 'الكنية',
          email: 'البريد الإلكتروني',
          newsletter: 'الاشتراك في النشرة البريدية',
          alreadyAccount: 'لديك حساب بالفعل؟ تسجيل الدخول',
          signInError: 'حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.',
          signUpError: 'حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.',
          otpError: 'خطأ في رمز التحقق',
          otpResent: 'إعادة إرسال رمز التحقق',
          otpResendError: 'خطأ في إعادة إرسال رمز التحقق',
          enterOtp: 'أدخل رمز التحقق',
          verifyOtp: 'تحقق من رمز التحقق',
          resendOtp: 'اعادة ارسال رمز التحقق',
          resetPassword: 'إعادة تعيين كلمة المرور',
          resetEmailSent: 'تم إرسال بريد إلكتروني لإعادة تعيين كلمة المرور!',
          resetPasswordError:
            'هناك مشكلة في إرسال بريد إعادة تعيين كلمة المرور.',
          sendResetLink: 'إرسال رابط إعادة التعيين',
          emailRequired: 'البريد الإلكتروني مطلوب',
          returnToSignup: 'العودة إلى التسجيل',
          nationalIDRequired: 'هوية وطنية مطلوبة',
          invalidNationalID: 'هوية وطنية غير صالحة',
          firstNameRequired: 'الاسم الأول مطلوب',
          lastNameRequired: 'الاسم الأخير مطلوب',
          invalidEmail: 'بريد إلكتروني غير صالح',
          passwordRequired: 'كلمة المرور مطلوبة',
          passwordTooShort: 'كلمة المرور قصيرة جدًا',
          otp: 'كلمة المرور ذات الاستعمال الواحد',
          newPassword: 'كلمة السر الجديد',
        },
        dashboard: {
          greeting: 'مرحبا ',
          title: 'لوحة المعلومات',
          recentDocuments: 'المستندات الحديثة',
          recentWorkspaces: 'مساحات العمل الأخيرة',
          favorites: 'المفضلة',
          noFavorites: 'لا توجد مساحات عمل مفضلة حتى الآن',
          sharedWithMe: 'مشاركة معي',
          workspaces: 'مساحات العمل',
          createWorkspace: 'إنشاء مساحة عمل',
          allWorkspaces: 'جميع مساحات العمل',
          documents: 'المستندات',
          createDocument: 'إنشاء مستند',
          allDocuments: 'جميع المستندات',
          recycleBin: 'سلة المحذوفات',
          nosharedWorkspaces: 'لا مساحات عمل مشتركة',
          publicWorkspaces: 'مساحات العمل العامة',
          noPublicWorkspaces: 'لا توجد مساحات عمل عامة',
          loadingPublicWorkspaces: 'جارٍ تحميل المساحات العامة للعمل...',
        },
        profile: {
          profile: 'الملف الشخصي',
          firstName: 'الاسم الأول',
          lastName: 'الكنية',
          email: 'البريد الإلكتروني',
          signOut: 'تسجيل الخروج',
        },
        recycleBin: {
          recycleBin: 'سلة المحذوفات',
          viewDetails: 'عرض التفاصيل',
          restore: 'استعادة',
          deletePremanently: 'حذف نهائي',
          noDocumentInRecycleBin: 'لا توجد مستندات في سلة المحذوفات.',
        },
      },
    },
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
