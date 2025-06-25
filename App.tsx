
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import SettingsPage from './components/SettingsPage';
import HistoryPage from './components/HistoryPage';
import AssessmentPage from './components/AssessmentPage'; 
import Notification from './components/Notification';
import { 
  CreditApplicationData, 
  RiskAssessmentOutput, 
  AssessmentFormSectionKey, 
  AssessmentFormFieldKey,
  PersonalInfoData,
  NotificationType,
  AssessmentHistoryItem
} from './types';
import { generateCreditAssessment } from './services/geminiService';
import { downloadAssessmentAsPdf } from './services/pdfService';
import { 
  INITIAL_ASSESSMENT_FORM_DATA, 
  INITIAL_PERSONAL_INFO_DATA,
  LOCAL_STORAGE_PERSONAL_INFO_KEY,
  LOCAL_STORAGE_HISTORY_KEY
} from './constants';

declare global {
  function generateUUID(): string;
}

type AppView = 'home' | 'assessment' | 'about' | 'settings' | 'history';

const App: React.FC = () => {
  const [personalInfoSettings, setPersonalInfoSettings] = useState<PersonalInfoData>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PERSONAL_INFO_KEY);
    return saved ? JSON.parse(saved) : INITIAL_PERSONAL_INFO_DATA;
  });

  const [assessmentFormData, setAssessmentFormData] = useState<Omit<CreditApplicationData, 'personalInfo'>>(
    INITIAL_ASSESSMENT_FORM_DATA
  );
  
  const [assessmentResult, setAssessmentResult] = useState<RiskAssessmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [notification, setNotification] = useState<{ message: string; type: NotificationType } | null>(null);
  
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentHistoryItem[]>(() => {
    const savedHistory = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  
  const [isViewingHistoryItem, setIsViewingHistoryItem] = useState<boolean>(false);
  const assessmentDisplayRef = useRef<HTMLDivElement>(null);

  // New state for managing PDF download requests for history items
  const [pendingPdfDownloadTarget, setPendingPdfDownloadTarget] = useState<AssessmentHistoryItem | null>(null);

  const handleShowNotification = useCallback((message: string, type: NotificationType) => {
    setNotification({ message, type });
    window.scrollTo(0,0);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(assessmentHistory));
  }, [assessmentHistory]);


  const handleAssessmentFormChange = useCallback(
    <S extends AssessmentFormSectionKey, F extends AssessmentFormFieldKey<S>>(
    section: S,
    field: F,
    value: Omit<CreditApplicationData, 'personalInfo'>[S][F]
  ) => {
    setIsViewingHistoryItem(false); 
    setAssessmentResult(null); 
    setAssessmentFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  }, []);

  const handleSaveSettings = useCallback((data: PersonalInfoData) => {
    setPersonalInfoSettings(data);
    localStorage.setItem(LOCAL_STORAGE_PERSONAL_INFO_KEY, JSON.stringify(data));
    handleShowNotification('Personal information saved successfully!', 'success');
  }, [handleShowNotification]);
  
  const navigateToView = useCallback((view: AppView) => {
    setError(null); 
    window.scrollTo(0,0);
    setCurrentView(view);
  }, []);

  const navigateToAssessmentForm = useCallback((isNew: boolean = true) => {
    if (!personalInfoSettings.applicantName || !personalInfoSettings.age || !personalInfoSettings.location) {
        handleShowNotification('Please complete Personal Information (including Applicant Name) in Settings first.', 'info');
        navigateToView('settings');
        return;
    }
    if (isNew) {
      setAssessmentResult(null);
      setAssessmentFormData(INITIAL_ASSESSMENT_FORM_DATA);
      setIsViewingHistoryItem(false);
    }
    navigateToView('assessment');
  }, [personalInfoSettings, handleShowNotification, navigateToView]);

  const navigateToHome = useCallback(() => navigateToView('home'), [navigateToView]);
  const navigateToAbout = useCallback(() => navigateToView('about'), [navigateToView]);
  const navigateToSettings = useCallback(() => navigateToView('settings'), [navigateToView]);
  const navigateToHistory = useCallback(() => navigateToView('history'), [navigateToView]);


  const handleSubmitAssessment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAssessmentResult(null);
    setNotification(null);
    setIsViewingHistoryItem(false);

    if (!personalInfoSettings.applicantName || !personalInfoSettings.age || !personalInfoSettings.location || !personalInfoSettings.employmentStatus) {
      setError("Critical personal information (including Applicant Name) is missing. Please complete your details in the Settings page.");
      handleShowNotification("Personal Information in Settings (including Applicant Name) is incomplete. Please update.", 'error');
      setIsLoading(false);
      navigateToView('settings');
      return;
    }
    
    if (!assessmentFormData.loanDetails.requestedLoanAmount || !assessmentFormData.financialData.income) {
       setError("Please fill in all required fields in the assessment form (e.g., Requested Loan Amount, Income).");
       handleShowNotification("Required fields like Loan Amount and Income are missing.", 'error');
       setIsLoading(false);
       return;
    }

    const fullApplicationData: CreditApplicationData = {
      personalInfo: personalInfoSettings,
      financialData: assessmentFormData.financialData,
      alternativeData: assessmentFormData.alternativeData,
      loanDetails: assessmentFormData.loanDetails,
    };

    try {
      const result = await generateCreditAssessment(fullApplicationData);
      setAssessmentResult(result);
      
      const historyItem: AssessmentHistoryItem = {
        id: generateUUID(),
        applicantName: personalInfoSettings.applicantName || 'N/A',
        timestamp: Date.now(),
        inputData: JSON.parse(JSON.stringify(fullApplicationData)), // Deep copy
        outputData: result,
      };
      setAssessmentHistory(prevHistory => [historyItem, ...prevHistory].sort((a,b) => b.timestamp - a.timestamp));
      handleShowNotification('Credit assessment generated and saved to history!', 'success');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during assessment.";
      setError(errorMessage);
      handleShowNotification(errorMessage, 'error');
      console.error("Assessment error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewHistoryDetails = useCallback((item: AssessmentHistoryItem) => {
    setPersonalInfoSettings(item.inputData.personalInfo);
    setAssessmentFormData({
        financialData: item.inputData.financialData,
        alternativeData: item.inputData.alternativeData,
        loanDetails: item.inputData.loanDetails,
    });
    setAssessmentResult(item.outputData);
    setIsViewingHistoryItem(true);
    navigateToView('assessment');
    handleShowNotification(`Viewing assessment for ${item.applicantName}.`, 'info');
  }, [navigateToView, handleShowNotification]);

  const handleUseHistoryAsTemplate = useCallback((item: AssessmentHistoryItem) => {
    setPersonalInfoSettings(item.inputData.personalInfo); 
    setAssessmentFormData({ 
        financialData: item.inputData.financialData,
        alternativeData: item.inputData.alternativeData,
        loanDetails: item.inputData.loanDetails,
    });
    setAssessmentResult(null); 
    setIsViewingHistoryItem(false); 
    navigateToAssessmentForm(false); 
    handleShowNotification(`Form pre-filled using data for ${item.applicantName}. You can now edit and submit for a new assessment.`, 'info');
  }, [navigateToAssessmentForm, handleShowNotification]);

  const handleDeleteHistoryItem = useCallback((itemId: string) => {
    setAssessmentHistory(prevHistory => prevHistory.filter(item => item.id !== itemId));
    handleShowNotification('Assessment removed from history.', 'success');
  }, [handleShowNotification]);

  const handleDownloadPdfForHistoryItem = useCallback((item: AssessmentHistoryItem) => {
    setPersonalInfoSettings(item.inputData.personalInfo);
    setAssessmentFormData({
        financialData: item.inputData.financialData,
        alternativeData: item.inputData.alternativeData,
        loanDetails: item.inputData.loanDetails,
    });
    setAssessmentResult(item.outputData);
    setIsViewingHistoryItem(true);
    setPendingPdfDownloadTarget(item); // Signal to useEffect to handle download
    navigateToView('assessment'); // Ensure the assessment page is visible
  }, [navigateToView]);
  
  const handleDownloadCurrentAssessmentPdf = useCallback(async () => {
      if (assessmentDisplayRef.current && assessmentResult) {
          try {
            await downloadAssessmentAsPdf(assessmentDisplayRef.current, `Assessment_${personalInfoSettings.applicantName.replace(/\s/g, '_')}_current`);
            handleShowNotification('PDF download initiated.', 'success');
          } catch (pdfError) {
            console.error("PDF generation failed:", pdfError);
            handleShowNotification('PDF download failed. Check console for details.', 'error');
          }
      } else {
          handleShowNotification('Could not prepare PDF: display element not ready or no assessment result.', 'error');
          if (!assessmentDisplayRef.current) console.error("PDF Download Error: assessmentDisplayRef.current is null.");
          if (!assessmentResult) console.error("PDF Download Error: assessmentResult is null.");
      }
  }, [assessmentResult, personalInfoSettings, handleShowNotification]);

  // useEffect to handle PDF download for history items when component is ready
  useEffect(() => {
    if (
        pendingPdfDownloadTarget &&
        currentView === 'assessment' &&
        isViewingHistoryItem &&
        assessmentResult &&
        assessmentResult === pendingPdfDownloadTarget.outputData && // Ensure correct result is loaded
        assessmentDisplayRef.current // And the ref is attached
    ) {
        downloadAssessmentAsPdf(
            assessmentDisplayRef.current,
            `Assessment_${pendingPdfDownloadTarget.applicantName.replace(/\s/g, '_')}_${pendingPdfDownloadTarget.id.substring(0,8)}`
        )
        .then(() => {
            handleShowNotification('PDF download initiated.', 'success');
        })
        .catch((err) => {
            console.error("PDF generation failed for history item:", err);
            handleShowNotification('PDF download failed. Check console for details.', 'error');
        })
        .finally(() => {
            setPendingPdfDownloadTarget(null); // Clear the request
        });
    }
  }, [pendingPdfDownloadTarget, currentView, isViewingHistoryItem, assessmentResult, handleShowNotification]);


  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar 
        onNavigateHome={navigateToHome} 
        onNavigateToAbout={navigateToAbout}
        onNavigateToSettings={navigateToSettings} 
        onNavigateToHistory={navigateToHistory}
      />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onDismiss={() => setNotification(null)}
        />
      )}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && (
          <HomePage onStartAssessment={() => navigateToAssessmentForm(true)} />
        )}
        
        {currentView === 'assessment' && (
          <AssessmentPage
            personalInfoSettings={personalInfoSettings}
            assessmentFormData={assessmentFormData}
            assessmentResult={assessmentResult}
            isLoading={isLoading}
            error={error}
            isViewingHistoryItem={isViewingHistoryItem}
            assessmentDisplayRef={assessmentDisplayRef}
            onAssessmentFormChange={handleAssessmentFormChange}
            onSubmitAssessment={handleSubmitAssessment}
            onStartNewAssessment={() => navigateToAssessmentForm(true)}
            onDownloadPdf={handleDownloadCurrentAssessmentPdf}
          />
        )}

         {currentView === 'about' && (
          <AboutPage onNavigateToAssessor={() => navigateToAssessmentForm(true)}/>
        )}

         {currentView === 'settings' && (
          <SettingsPage 
            savedData={personalInfoSettings}
            onSave={handleSaveSettings}
            onNavigateToAssessor={() => navigateToAssessmentForm(true)}
          />
        )}

        {currentView === 'history' && (
          <HistoryPage
            history={assessmentHistory}
            onViewDetails={handleViewHistoryDetails}
            onUseAsTemplate={handleUseHistoryAsTemplate}
            onDownloadPdf={handleDownloadPdfForHistoryItem}
            onDelete={handleDeleteHistoryItem}
            onNavigateToAssessor={() => navigateToAssessmentForm(true)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
