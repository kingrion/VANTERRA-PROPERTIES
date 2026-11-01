import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Volume2, VolumeX, Copy, Check, Shield, FileText, PhoneCall, Sparkles } from 'lucide-react';

export const ItalianTranscriptionModal: React.FC = () => {
  const { activeItalianTranscription, closeItalianTranscription, formatDualPrice, setCurrentView, addToast } = useApp();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Stop any ongoing speech when modal closes or property changes
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeItalianTranscription]);

  if (!activeItalianTranscription) return null;

  const prop = activeItalianTranscription;
  const prices = formatDualPrice(prop);

  const italianName = prop.italianName || prop.name;
  const italianText = prop.italianDescription || prop.italianShortDescription || prop.fullDescription;
  const italianAmenities = prop.italianAmenities || prop.amenities;

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      addToast({
        type: 'error',
        title: 'Sintesi Vocale Non Supportata',
        message: 'Il tuo browser non supporta la sintesi vocale integrata.'
      });
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const narrationText = `${italianName}. Prezzo ufficiale: ${prices.usd} dollari, con controvalore italiano pari a ${prices.eur} euro. ${italianText}`;
      const utterance = new SpeechSynthesisUtterance(narrationText);
      utterance.lang = 'it-IT';
      utterance.rate = 0.95;

      // Try finding Italian voice
      const voices = window.speechSynthesis.getVoices();
      const italianVoice = voices.find((v) => v.lang.startsWith('it'));
      if (italianVoice) {
        utterance.voice = italianVoice;
      }

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
      addToast({
        type: 'info',
        title: 'Trascrizione Vocale Avviata',
        message: 'Ascolto della scheda architettonica in lingua italiana.'
      });
    }
  };

  const handleCopyTranscription = () => {
    const fullDossier = `VANTERRA PROPERTIES — DOSSIER E TRASCRIZIONE ARCHITETTONICA IN ITALIANO
Immobile: ${italianName} (${prop.name})
Riferimento: ${prop.referenceNumber}
Località: ${prop.city}, ${prop.country}
Prezzo Ufficiale in Dollari: ${prices.usd}
Controvalore Italiano in Euro: ${prices.eur}
Specifiche: ${prop.bedrooms} Camere · ${prop.bathrooms} Bagni · ${prop.livingAreaSqFt} sq ft (ca. ${Math.round(prop.livingAreaSqFt * 0.0929)} mq)

Trascrizione Descrittiva:
${italianText}

Dotazioni e Finiture di Pregio:
${italianAmenities.map((a) => `• ${a}`).join('\n')}

Ufficio VANTERRA: Piazzale Biancamano 8, 20121 Milano, Italia & 80 Broad Street, New York, USA
Telefono / Contatto: +1 (302) 729-6657
Telegram: @MariaGallo01 (https://t.me/MariaGallo01)`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullDossier);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      addToast({
        type: 'success',
        title: 'Trascrizione Copiata',
        message: 'Il testo in italiano con prezzo in dollari e controvalore in euro è stato copiato.'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      {/* Background dismissal */}
      <div className="absolute inset-0" onClick={closeItalianTranscription} />

      <div className="relative max-w-3xl w-full bg-[#141414] border border-[#C6A66B]/60 p-6 sm:p-8 my-8 shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="text-sm">🇮🇹</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A66B] font-mono">
                TRASCRIZIONE ARCHITETTONICA IN LINGUA ITALIANA
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F1E8] font-light">
              {italianName}
            </h2>
            <p className="text-xs text-[#A7A7A7] font-mono mt-0.5">
              VANTERRA Desk Milano · Rif: {prop.referenceNumber} · {prop.city}, {prop.country}
            </p>
          </div>

          <button
            onClick={closeItalianTranscription}
            className="p-1.5 text-[#A7A7A7] hover:text-[#F5F1E8] cursor-pointer"
            aria-label="Chiudi trascrizione"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* DUAL PRICE BANNER: Dollar Price + Italian Counterpart in Euro */}
        <div className="mb-6 p-5 bg-[#0a0a0a] border border-[#C6A66B]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-[#A7A7A7] font-mono">
              Prezzo Ufficiale in Dollari ($ USD)
            </span>
            <span className="font-serif text-2xl sm:text-3xl text-[#F5F1E8] font-normal">
              {prices.usd}
            </span>
          </div>

          <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-neutral-800 pt-3 sm:pt-0 sm:pl-6">
            <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#C6A66B] font-mono font-semibold mb-0.5">
              <span>CONTROVALORE ITALIANO (€ EUR)</span>
            </div>
            <span className="font-serif text-2xl sm:text-3xl text-[#C6A66B] font-light block">
              {prices.eur}
            </span>
            <span className="text-[10px] text-[#A7A7A7] font-mono">
              Tasso di cambio indicativo per investitori europei
            </span>
          </div>
        </div>

        {/* Audio voice transcription & Actions bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6 p-3 bg-[#181818] border border-neutral-800">
          <button
            onClick={handleToggleSpeech}
            className={`inline-flex items-center gap-2 px-4 py-2 border text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
              isPlayingAudio
                ? 'bg-[#C6A66B] text-[#080808] border-[#C6A66B]'
                : 'bg-[#080808] text-[#F5F1E8] border-neutral-700 hover:border-[#C6A66B]'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#C6A66B]" />}
            <span>{isPlayingAudio ? 'Interrompi Lettura Vocale' : 'Ascolta Trascrizione (Voce Italiana)'}</span>
          </button>

          <button
            onClick={handleCopyTranscription}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#080808] border border-neutral-700 hover:border-[#C6A66B] text-[#A7A7A7] hover:text-[#F5F1E8] text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiato!' : 'Copia Testo Dossier'}</span>
          </button>
        </div>

        {/* Italian Description Narrative */}
        <div className="mb-6 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A66B] font-mono block">
            RELAZIONE ARCHITETTONICA E DESCRITTIVA
          </span>
          <p className="text-sm text-[#F5F1E8]/90 font-light leading-relaxed whitespace-pre-line border-l-2 border-[#C6A66B] pl-4 italic">
            "{italianText}"
          </p>
        </div>

        {/* Specifications Strip (Italian metrics) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#0d0d0d] border border-neutral-800 mb-6 text-xs text-[#A7A7A7] font-mono">
          <div>
            <span className="block text-[9px] text-[#777] uppercase">Camere</span>
            <span className="text-sm text-[#F5F1E8] font-bold">{prop.bedrooms} Suite</span>
          </div>
          <div>
            <span className="block text-[9px] text-[#777] uppercase">Bagni</span>
            <span className="text-sm text-[#F5F1E8] font-bold">{prop.bathrooms} Bagni</span>
          </div>
          <div>
            <span className="block text-[9px] text-[#777] uppercase">Superficie</span>
            <span className="text-sm text-[#F5F1E8] font-bold">{prop.livingAreaSqFt.toLocaleString()} sq ft</span>
            <span className="text-[10px] text-[#777] block">ca. {Math.round(prop.livingAreaSqFt * 0.0929)} mq</span>
          </div>
          <div>
            <span className="block text-[9px] text-[#777] uppercase">Disponibilità</span>
            <span className="text-sm text-[#C6A66B] font-bold">{prop.availability}</span>
          </div>
        </div>

        {/* Curated Italian Amenities */}
        <div className="mb-8">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A66B] font-mono block mb-3">
            DOTAZIONI E CARATTERISTICHE DI PREGIO
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {italianAmenities.map((amenity, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2.5 bg-[#0a0a0a] border border-neutral-800/80 text-xs text-[#F5F1E8]">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A66B] shrink-0 mt-0.5" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] text-[#A7A7A7]">
            <Shield className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span>Contatto diretto & assistenza: Tel. <a href="tel:+13027296657" className="text-[#F5F1E8] hover:text-[#C6A66B] font-mono">+1 (302) 729-6657</a> · Telegram: <a href="https://t.me/MariaGallo01" target="_blank" rel="noopener noreferrer" className="text-[#64b5f6] hover:text-[#C6A66B] font-mono">@MariaGallo01</a></span>
          </div>

          <button
            onClick={() => {
              closeItalianTranscription();
              setCurrentView('consultation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Richiedi Consulenza Riservata</span>
          </button>
        </div>
      </div>
    </div>
  );
};
