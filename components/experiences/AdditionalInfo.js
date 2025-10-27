"use client";

import { Info } from "lucide-react";

export function AdditionalInfo({ additionalInfo, languageGuides }) {
  if ((!additionalInfo || additionalInfo.length === 0) && (!languageGuides || languageGuides.length === 0)) {
    return null;
  }

  const getLanguageName = (code) => {
    const languages = {
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'pt': 'Portuguese',
      'ja': 'Japanese',
      'zh': 'Chinese',
      'ko': 'Korean',
      'ru': 'Russian',
      'ar': 'Arabic',
      'nl': 'Dutch',
      'sv': 'Swedish',
      'no': 'Norwegian',
      'da': 'Danish',
      'fi': 'Finnish'
    };
    return languages[code] || code.toUpperCase();
  };

  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Additional Information</h2>
      
      {additionalInfo && additionalInfo.length > 0 && (
        <div className="mb-6 space-y-3">
          {additionalInfo.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Info className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {languageGuides && languageGuides.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="mb-4 font-semibold text-gray-900">Available Languages</h3>
          <div className="flex flex-wrap gap-2">
            {languageGuides.map((guide, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
              >
                {getLanguageName(guide.language)}
                {guide.guideType === 'AUDIO_GUIDE' && ' (Audio)'}
                {guide.guideType === 'WRITTEN' && ' (Written)'}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
