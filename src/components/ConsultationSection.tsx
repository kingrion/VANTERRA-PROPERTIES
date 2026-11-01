import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PhoneCall, Shield, Check, Send, Lock, Calendar, Globe } from 'lucide-react';

export const ConsultationSection: React.FC = () => {
  const { submitConsultation, properties, addToast } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryOfResidence: '',
    preferredLocation: '',
    interestedProperty: '',
    budgetRange: '$500,000 – $800,000 (ca. €460k – €736k)',
    enquiryType: 'Acquisition' as 'Acquisition' | 'Investment' | 'Private Sale' | 'Advisory' | 'General',
    preferredContactMethod: 'Telegram' as 'Telegram' | 'Phone' | 'WhatsApp' | 'Email',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      addToast({
        type: 'error',
        title: 'Missing Required Fields',
        message: 'Full name and email address are required for confidential registration.'
      });
      return;
    }

    submitConsultation({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      countryOfResidence: formData.countryOfResidence || 'Unspecified',
      preferredLocation: formData.preferredLocation || 'Global Prime',
      interestedProperty: formData.interestedProperty || 'General Portfolio Inquiry',
      budgetRange: formData.budgetRange,
      enquiryType: formData.enquiryType,
      preferredContactMethod: formData.preferredContactMethod,
      message: formData.message || 'Client requesting private advisory consultation regarding property acquisition and opportunities.'
    });

    setSubmitted(true);
  };

  return (
    <section id="consultation-section" className="py-24 bg-[#0d0d0d] border-t border-neutral-900 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Shield className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C6A66B] font-mono">
              CONFIDENTIAL PRIVATE CLIENT ADVISORY
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F1E8] tracking-tight mb-4">
            Experience Real Estate, Redefined.
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#A7A7A7] font-light leading-relaxed">
            "Whether you are acquiring an exceptional residence, exploring international investment opportunities, or seeking a distinguished property, our team is ready to assist."
          </p>
        </div>

        {/* Consultation Form Card */}
        <div className="bg-[#151515] border border-[#C6A66B]/30 p-8 sm:p-12 shadow-2xl relative">
          {submitted ? (
            <div className="py-12 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full border border-[#C6A66B] text-[#C6A66B] flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F1E8] mb-2">
                Consultation Request Received
              </h3>
              <p className="text-sm text-[#A7A7A7] max-w-md mx-auto leading-relaxed mb-6">
                Your mandate has been securely encrypted into our private client ledger. A Senior Real Estate Partner will initiate contact via your preferred channel within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 border border-[#C6A66B] text-[#C6A66B] hover:bg-[#C6A66B] hover:text-[#080808] text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                Schedule Another Consultation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#C6A66B] mb-2 font-mono">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Jonathan Vance-Cross"
                    className="w-full px-4 py-3 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#C6A66B] mb-2 font-mono">
                    Confidential Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@privateoffice.com"
                    className="w-full px-4 py-3 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Country of Residence */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#C6A66B] mb-2 font-mono">
                    Telephone / WhatsApp (Direct)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (212) ... / +39 ..."
                    className="w-full px-4 py-3 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#C6A66B] mb-2 font-mono">
                    Country of Tax Residence / Citizenship
                  </label>
                  <input
                    type="text"
                    value={formData.countryOfResidence}
                    onChange={(e) => setFormData({ ...formData, countryOfResidence: e.target.value })}
                    placeholder="e.g. United States, United Kingdom, Switzerland, Italy..."
                    className="w-full px-4 py-3 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Preferred Location & Interested Property */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#C6A66B] mb-2 font-mono">
                    Preferred Target Location / Market
                  </label>
                  <input
                    type="text"
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    placeholder="e.g. Manhattan, Greenwich, Milan, Miami Beach, London..."
                    className="w-full px-4 py-3 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#C6A66B] mb-2 font-mono">
                    Specific Interested Property (Optional)
                  </label>
                  <select
                    value={formData.interestedProperty}
                    onChange={(e) => setFormData({ ...formData, interestedProperty: e.target.value })}
                    className="w-full px-4 py-3 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                  >
                    <option value="">Select from current portfolio (optional)...</option>
                    {properties.map((p) => (
                      <option key={p.id} value={`${p.name} (${p.city})`}>
                        {p.name} — {p.city} ({p.priceDisplay || `$${p.price.toLocaleString()}`})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Budget Range & Enquiry Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#C6A66B] mb-2 font-mono">
                    Anticipated Capital Allocation / Budget Range
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-4 py-3 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                  >
                    <option value="$500,000 – $600,000">$500,000 – $600,000 (ca. €460k – €552k)</option>
                    <option value="$600,000 (Contemporary Villa)">$600,000 Contemporary Villa (ca. €552.000)</option>
                    <option value="$600,000 – $700,000">$600,000 – $700,000 (ca. €552k – €644k)</option>
                    <option value="$700,000 – $800,000">$700,000 – $800,000 (ca. €644k – €736k)</option>
                    <option value="$800,000+">$800,000+ Penthouse & Trophy Portfolio</option>
                    <option value="Custom / Confidential Allocation">Custom / Confidential Allocation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#C6A66B] mb-2 font-mono">
                    Type of Enquiry
                  </label>
                  <select
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value as any })}
                    className="w-full px-4 py-3 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                  >
                    <option value="Acquisition">Luxury Residential Acquisition</option>
                    <option value="Investment">Cross-Border Capital Investment</option>
                    <option value="Private Sale">Exclusive Representation & Disposal</option>
                    <option value="Advisory">Family Office Portfolio Advisory</option>
                    <option value="General">General Inquiries</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Preferred Contact Method */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#C6A66B] mb-2 font-mono">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['Telegram', 'Phone', 'WhatsApp', 'Email'] as const).map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setFormData({ ...formData, preferredContactMethod: method })}
                      className={`py-2.5 text-xs uppercase tracking-wider border font-mono transition-colors cursor-pointer ${
                        formData.preferredContactMethod === method
                          ? 'border-[#C6A66B] text-[#C6A66B] bg-[#080808]'
                          : 'border-neutral-800 text-[#777] hover:text-[#A7A7A7]'
                      }`}
                    >
                      {method === 'Telegram' ? 'Telegram (@MariaGallo01)' : method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 6: Additional Message */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#C6A66B] mb-2 font-mono">
                  Specific Requirements or Discretionary Notes
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Include any architectural preferences, privacy covenants, or timing mandates..."
                  className="w-full px-4 py-3 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[11px] text-[#A7A7A7]">
                  <Lock className="w-3.5 h-3.5 text-[#C6A66B]" />
                  <span>Submissions are strictly confidential and protected by NDA</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-[0.22em] transition-all cursor-pointer shadow-lg shadow-[#C6A66B]/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Schedule Consultation</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
