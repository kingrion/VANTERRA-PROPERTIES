import React from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { Bookmark, Video, ArrowUpRight, Bed, Bath, Maximize2 } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { openPropertyDetail, toggleFavourite, isFavourite, openMediaModal, openItalianTranscription, formatDualPrice } = useApp();
  const isFav = isFavourite(property.id);

  const primaryMedia = property.media.find((m) => m.isPrimary) || property.media[0];
  const hasVideo = property.media.some((m) => m.type === 'video') || !!property.videoWalkthroughUrl;

  const isSoldOrSoldOut = property.availability === 'SOLD' || property.availability === 'SOLD OUT';

  return (
    <article className="group relative bg-[#151515] border border-neutral-800/80 hover:border-[#C6A66B]/50 transition-all duration-500 flex flex-col overflow-hidden">
      {/* Media Visual Area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0d0d0d]">
        {primaryMedia?.type === 'video' ? (
          <video
            src={primaryMedia.url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <img
            src={primaryMedia?.url || '/assets/aistudio/image_d0c4bca0.png'}
            alt={property.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        )}

        {/* Subtle vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-black/30 pointer-events-none" />

        {/* Top bar controls: Availability Status Label & Favourite Button */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-auto">
          {/* Availability Status: distinct styling, gold SOLD OUT stamp */}
          <div>
            {isSoldOrSoldOut ? (
              <span className="px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] uppercase bg-[#C6A66B] text-[#080808] border border-[#d8b97d] shadow-lg">
                {property.availability}
              </span>
            ) : property.availability === 'EXCLUSIVE' ? (
              <span className="px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase bg-[#080808]/90 text-[#C6A66B] border border-[#C6A66B]/60 backdrop-blur-xs">
                EXCLUSIVE
              </span>
            ) : property.availability === 'UNDER OFFER' ? (
              <span className="px-2.5 py-1 text-[10px] font-medium tracking-[0.2em] uppercase bg-[#080808]/85 text-amber-300 border border-amber-400/40 backdrop-blur-xs">
                UNDER OFFER
              </span>
            ) : (
              <span className="px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] uppercase bg-[#080808]/85 text-[#F5F1E8] border border-neutral-700 backdrop-blur-xs">
                {property.availability}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {hasVideo && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const videoUrl = property.videoWalkthroughUrl || primaryMedia?.url;
                  if (videoUrl) {
                    openMediaModal({
                      type: 'video',
                      url: videoUrl,
                      title: `${property.name} — Cinematic Tour`
                    });
                  }
                }}
                className="p-1.5 bg-[#080808]/80 hover:bg-[#C6A66B] text-[#F5F1E8] hover:text-[#080808] border border-white/20 hover:border-[#C6A66B] transition-colors cursor-pointer"
                title="Watch Cinematic Tour"
                aria-label="Play video walkthrough"
              >
                <Video className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavourite(property.id);
              }}
              className={`p-1.5 bg-[#080808]/80 hover:bg-[#C6A66B] border transition-colors cursor-pointer ${
                isFav
                  ? 'text-[#C6A66B] bg-[#080808] border-[#C6A66B]'
                  : 'text-[#F5F1E8] hover:text-[#080808] border-white/20 hover:border-[#C6A66B]'
              }`}
              title={isFav ? 'Remove from saved' : 'Save to portfolio'}
              aria-label="Save property"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Media count / reference tag */}
        <div className="absolute bottom-2 right-3 text-[10px] text-[#A7A7A7] font-mono tracking-wider bg-[#080808]/70 px-2 py-0.5">
          {property.referenceNumber}
        </div>
      </div>

      {/* Property Details Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Location metadata without pill wrappers */}
          <div className="flex items-center gap-2 text-xs text-[#C6A66B] tracking-[0.15em] uppercase font-medium mb-1.5">
            <span>{property.category}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-[#A7A7A7]">{property.city}, {property.country}</span>
          </div>

          {/* Property Name */}
          <h3
            onClick={() => openPropertyDetail(property.id)}
            className="font-serif text-xl sm:text-2xl font-light text-[#F5F1E8] group-hover:text-[#C6A66B] transition-colors cursor-pointer tracking-wide line-clamp-1 mb-2"
          >
            {property.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#A7A7A7] font-light line-clamp-2 leading-relaxed mb-4">
            {property.shortDescription}
          </p>

          {/* Key Specifications Strip: Clean unboxed metadata */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-800/90 text-xs text-[#A7A7A7] font-sans">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span className="font-mono tabular-nums text-[#F5F1E8] font-medium">{property.bedrooms}</span>
              <span className="text-[11px]">Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span className="font-mono tabular-nums text-[#F5F1E8] font-medium">{property.bathrooms}</span>
              <span className="text-[11px]">Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span className="font-mono tabular-nums text-[#F5F1E8] font-medium">{property.livingAreaSqFt.toLocaleString()}</span>
              <span className="text-[11px]">sq ft</span>
            </div>
          </div>
        </div>

        {/* Italian Transcription Quick Button (prominently available, specially highlighted for The Contemporary Villa) */}
        <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openItalianTranscription(property);
            }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
              property.id === 'prop-contemporary-villa'
                ? 'border-[#C6A66B] bg-[#C6A66B]/15 text-[#C6A66B] hover:bg-[#C6A66B] hover:text-[#080808] font-bold shadow-xs'
                : 'border-neutral-800 hover:border-[#C6A66B] text-[#A7A7A7] hover:text-[#C6A66B] bg-[#0d0d0d]'
            }`}
            title="Apri trascrizione e dossier in lingua italiana"
          >
            <span>🇮🇹</span>
            <span>{property.id === 'prop-contemporary-villa' ? 'Trascrizione in Italiano' : 'Trascrizione IT'}</span>
          </button>

          <span className="text-[10px] text-[#A7A7A7] font-mono">
            Rif: {property.referenceNumber}
          </span>
        </div>

        {/* Price and Action Footer with Italian Counterpart */}
        <div className="mt-4 pt-2 border-t border-neutral-800/60 flex items-end justify-between gap-3">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.2em] text-[#A7A7A7] font-mono">
              Prezzo in Dollari (USD)
            </span>
            <span className="font-serif text-lg sm:text-xl font-normal text-[#F5F1E8] tracking-tight block">
              {formatDualPrice(property).usd}
            </span>
            <span className="text-[10px] text-[#C6A66B] font-mono block mt-0.5">
              Controvalore IT: <span className="font-semibold">{formatDualPrice(property).eur}</span>
            </span>
          </div>

          <button
            onClick={() => openPropertyDetail(property.id)}
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#C6A66B]/50 hover:border-[#C6A66B] text-[#C6A66B] hover:text-[#080808] hover:bg-[#C6A66B] transition-all duration-300 text-[11px] font-semibold tracking-[0.18em] uppercase cursor-pointer whitespace-nowrap"
          >
            <span>Dettagli</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
