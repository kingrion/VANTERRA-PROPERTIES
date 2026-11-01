import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, ArrowUpRight, PhoneCall, Bookmark } from 'lucide-react';

export const FavouritesDrawer: React.FC = () => {
  const {
    isFavouritesDrawerOpen,
    setIsFavouritesDrawerOpen,
    favourites,
    properties,
    toggleFavourite,
    clearFavourites,
    openPropertyDetail,
    setCurrentView,
    formatDualPrice
  } = useApp();

  if (!isFavouritesDrawerOpen) return null;

  const savedProps = properties.filter((p) => favourites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#080808]/85 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={() => setIsFavouritesDrawerOpen(false)} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121212] border-l border-[#C6A66B]/30 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#C6A66B]" />
              <h3 className="font-serif text-xl text-[#F5F1E8]">Private Shortlist</h3>
              <span className="text-xs font-mono text-[#C6A66B]">({savedProps.length})</span>
            </div>

            <button
              onClick={() => setIsFavouritesDrawerOpen(false)}
              className="p-1 text-[#A7A7A7] hover:text-[#F5F1E8] cursor-pointer"
              aria-label="Close shortlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {savedProps.length === 0 ? (
              <div className="text-center py-20 text-[#A7A7A7]">
                <Bookmark className="w-10 h-10 mx-auto text-neutral-700 mb-3" />
                <p className="font-serif text-lg text-[#F5F1E8] mb-1">Your Portfolio is Empty</p>
                <p className="text-xs font-light">Bookmark exceptional properties across our portfolio to review or inquire collectively.</p>
              </div>
            ) : (
              savedProps.map((prop) => (
                <div
                  key={prop.id}
                  className="p-3 bg-[#181818] border border-neutral-800 flex gap-3 group hover:border-[#C6A66B]/40 transition-colors"
                >
                  <img
                    src={prop.media[0]?.url || '/assets/aistudio/image_d0c4bca0.png'}
                    alt={prop.name}
                    className="w-20 h-16 object-cover border border-neutral-800 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-[#C6A66B] font-mono block truncate">
                      {prop.category} · {prop.city}
                    </span>
                    <h4
                      onClick={() => {
                        setIsFavouritesDrawerOpen(false);
                        openPropertyDetail(prop.id);
                      }}
                      className="font-serif text-sm text-[#F5F1E8] group-hover:text-[#C6A66B] truncate cursor-pointer transition-colors"
                    >
                      {prop.name}
                    </h4>
                    <div className="mt-1">
                      <span className="font-mono text-xs text-[#F5F1E8] block">
                        {formatDualPrice(prop).usd}
                      </span>
                      <span className="text-[10px] text-[#C6A66B] font-mono block">
                        Controvalore IT: {formatDualPrice(prop).eur}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end shrink-0">
                    <button
                      onClick={() => toggleFavourite(prop.id)}
                      className="text-neutral-500 hover:text-red-400 p-1 cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        setIsFavouritesDrawerOpen(false);
                        openPropertyDetail(prop.id);
                      }}
                      className="text-[#C6A66B] hover:text-[#F5F1E8] p-1 cursor-pointer"
                      title="View Details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {savedProps.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-[#0d0d0d] space-y-3">
              <button
                onClick={() => {
                  setIsFavouritesDrawerOpen(false);
                  setCurrentView('consultation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Inquire On All ({savedProps.length}) Properties</span>
              </button>

              <button
                onClick={clearFavourites}
                className="w-full py-2 border border-neutral-800 hover:border-neutral-700 text-[#A7A7A7] text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Clear Portfolio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
