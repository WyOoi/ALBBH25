"use client";

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext'; // Adjusted path

const TermsAndConditions: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {t('terms.title')}
        </h1>
        
        <div className="prose prose-indigo max-w-none text-gray-700 space-y-6">
          <p className="text-sm text-gray-600">
            {t('terms.last_updated')}: October 26, 2023 (Placeholder Date)
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-2">1. {t('terms.section1.title')}</h2>
            <p>{t('terms.section1.content1')}</p>
            <p>{t('terms.section1.content2')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. {t('terms.section2.title')}</h2>
            <p>{t('terms.section2.content1')}</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>{t('terms.section2.list_item1')}</li>
              <li>{t('terms.section2.list_item2')}</li>
              <li>{t('terms.section2.list_item3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. {t('terms.section3.title')}</h2>
            <p>{t('terms.section3.content1')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. {t('terms.section4.title')}</h2>
            <p>{t('terms.section4.content1')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. {t('terms.section5.title')}</h2>
            <p>{t('terms.section5.content1')}</p>
             {/* Example of more detailed list for prohibited uses */}
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>{t('terms.section5.prohibited_item1')}</li>
              <li>{t('terms.section5.prohibited_item2')}</li>
              <li>{t('terms.section5.prohibited_item3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. {t('terms.section6.title')}</h2>
            <p>{t('terms.section6.content1')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. {t('terms.section7.title')}</h2>
            <p>{t('terms.section7.content1')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. {t('terms.section8.title')}</h2>
            <p>{t('terms.section8.content1')}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. {t('terms.section9.title')}</h2>
            <p>{t('terms.section9.content1')}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-2">10. {t('terms.section10.title')}</h2>
            <p>
              {t('terms.section10.content1')} 
              <a href={`mailto:${t('terms.contact_email')}`} className="text-indigo-600 hover:text-indigo-800">
                {t('terms.contact_email')}
              </a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
