import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Mail, Phone, Clock, MessageCircle, Send, Check, Shield } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { offices, submitConsultation, addToast } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    office: 'United States — World Headquarters',
    subject: 'General Portfolio Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast({
        type: 'error',
        title: 'Form Incomplete',
        message: 'Please complete all required fields.'
      });
      return;
    }

    submitConsultation({
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      countryOfResidence: formData.office.includes('United States') ? 'USA' : 'International',
      preferredLocation: formData.office,
      budgetRange: 'General Direct Inquiry',
      enquiryType: 'General',
      preferredContactMethod: 'Email',
      message: `[Subject: ${formData.subject}] [Target Office: ${formData.office}] ${formData.message}`
    });

    setSubmitted(true);
  };

  return (
    <section id="contact-section" className="py-24 bg-[#080808] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Mail className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C6A66B] font-mono">
              INTERNATIONAL EXECUTIVE CONTACT
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F1E8] tracking-tight mb-4">
            Connect With VANTERRA
          </h2>

          <p className="text-xs sm:text-sm text-[#A7A7A7] font-light leading-relaxed">
            Direct communication channels to our World Headquarters in the United States and international advisory offices.
          </p>
        </div>

        {/* Corporate Office Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {offices.map((office) => (
            <div
              key={office.id}
              className="p-8 bg-[#121212] border border-neutral-800/80 hover:border-[#C6A66B]/50 transition-colors flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-[#C6A66B] mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{office.isHeadquarters ? 'GLOBAL HEADQUARTERS' : 'EUROPEAN OFFICE'}</span>
                </div>

                <h3 className="font-serif text-2xl text-[#F5F1E8] font-light mb-1">
                  {office.title.split('—')[0].trim()}
                </h3>

                <p className="text-xs text-[#A7A7A7] font-mono mb-6">
                  {office.address}, {office.postalCode}
                </p>

                <div className="space-y-3 text-xs text-[#A7A7A7] border-t border-neutral-800/80 pt-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Send className="w-4 h-4 text-[#C6A66B] shrink-0" />
                    <div>
                      <span className="block text-[10px] text-[#777] uppercase font-mono">Telegram Address</span>
                      <a
                        href="https://t.me/MariaGallo01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F5F1E8] hover:text-[#C6A66B] font-mono transition-colors"
                      >
                        @MariaGallo01
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#C6A66B] shrink-0" />
                    <div>
                      <span className="block text-[10px] text-[#777] uppercase font-mono">Contact Address & Telephone</span>
                      <a
                        href="tel:+13027296657"
                        className="text-[#F5F1E8] hover:text-[#C6A66B] font-mono transition-colors"
                      >
                        +1 (302) 729-6657
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] text-[#777] uppercase font-mono">Executive Hours</span>
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-neutral-800">
                <a
                  href="https://t.me/MariaGallo01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-center text-xs bg-[#0088cc]/20 hover:bg-[#0088cc]/30 border border-[#0088cc]/50 text-[#64b5f6] uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram @MariaGallo01</span>
                </a>

                <a
                  href="tel:+13027296657"
                  className="py-2 px-3 text-center text-xs border border-neutral-700 hover:border-[#C6A66B] text-[#F5F1E8] uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5"
                  title="Direct Call +13027296657"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C6A66B]" />
                  <span>Call</span>
                </a>

                <a
                  href="https://wa.me/13027296657"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/50 text-emerald-300 text-xs uppercase tracking-wider transition-colors"
                  title="Connect via WhatsApp (+13027296657)"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Global Contact Form & Quick Connect */}
        <div className="bg-[#151515] border border-neutral-800 p-8 sm:p-12">
          <div className="max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F1E8] text-center mb-2 font-light">
              Submit Direct Communication
            </h3>
            <p className="text-xs text-[#A7A7A7] text-center font-light mb-8">
              Inquiries are routed immediately to the appropriate regional partner desk.
            </p>

            {submitted ? (
              <div className="py-8 text-center animate-fadeIn">
                <div className="w-12 h-12 rounded-full border border-[#C6A66B] text-[#C6A66B] flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-[#F5F1E8] mb-1">Message Dispatched</h4>
                <p className="text-xs text-[#A7A7A7] mb-4">
                  Thank you. An executive advisor has received your dispatch and will respond promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#C6A66B] hover:underline uppercase tracking-wider"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Lord / Lady / Dr. / Full Name"
                      className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                      Email or Telegram Handle *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@familyoffice.com or @TelegramUser"
                      className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                      Target Regional Office
                    </label>
                    <select
                      value={formData.office}
                      onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                    >
                      {offices.map((o) => (
                        <option key={o.id} value={o.title}>
                          {o.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                      Telephone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 / +39 / +44 ..."
                      className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                    Subject Mandate
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Off-Market Acquisition Query / Portfolio Review"
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                    Confidential Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please indicate the nature of your mandate..."
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Confidential Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
