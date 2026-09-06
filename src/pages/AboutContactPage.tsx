import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Instagram, Mail, Phone, Heart, Sparkles, Send, Check } from 'lucide-react';

export const AboutContactPage: React.FC<{ initialTab?: 'about' | 'contact' }> = ({
  initialTab = 'about',
}) => {
  const { settings, navigateTo, showNotification } = useStore();
  const [activeTab, setActiveTab] = useState<'about' | 'contact'>(initialTab);

  const [inquiryName, setInquiryName] = useState('');
  const [inquiryContact, setInquiryContact] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryMessage.trim()) return;
    setSentSuccess(true);
    showNotification('Message sent! We will reply promptly.');
    setTimeout(() => {
      setInquiryName('');
      setInquiryContact('');
      setInquiryMessage('');
      setSentSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      {/* Tab switch */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-full bg-[#E8DCCB] border border-[#C7A98A]/50">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'bg-[#5A3E2B] text-[#F8F3EA] shadow-xs'
                : 'text-[#5A3E2B] hover:text-[#3B2920]'
            }`}
          >
            About Our Craft
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-[#5A3E2B] text-[#F8F3EA] shadow-xs'
                : 'text-[#5A3E2B] hover:text-[#3B2920]'
            }`}
          >
            Contact & Inquiries
          </button>
        </div>
      </div>

      {activeTab === 'about' ? (
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#3B2920]">
              Handmade with Love
            </h1>
            <p className="text-xs sm:text-sm text-[#5A3E2B]/85 leading-relaxed">
              Every single piece begins with a hook, a skein of soft milk cotton yarn, and heartfelt care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[#E8DCCB] shadow-md bg-[#E8DCCB]">
              <img
                src="https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=800&q=80"
                alt="Crocheting handmade items"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#5A3E2B] leading-relaxed">
              <p>
                What started as a small personal passion shared on Instagram has grown into an online handmade boutique. We believe in the warmth and charm of slow-made items that stand out from mass production.
              </p>
              <p>
                Whether it's gentle heirloom baby crochet booties & rattles for little ones, a bouquet of crochet tulips that will brighten someone's room for years, or a custom plushie made with care, each stitch is created with patience and dedication.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#5A3E2B] text-[#F8F3EA] px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#A67C52] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Join Our Instagram</span>
                </a>
                <button
                  onClick={() => navigateTo('custom-order')}
                  className="bg-[#E8DCCB] text-[#3B2920] border border-[#C7A98A] px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#C7A98A]/30 transition-colors cursor-pointer"
                >
                  Custom Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Contact Tab */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 bg-[#E8DCCB]/40 border border-[#C7A98A]/50 rounded-3xl p-6 space-y-6">
            <div>
              <h2 className="font-serif-heading text-2xl font-bold text-[#3B2920]">
                Get in Touch
              </h2>
              <p className="text-xs text-[#5A3E2B] mt-1 leading-relaxed">
                Have questions about custom sizing, delivery timelines, or bulk gifts? Message us anytime!
              </p>
            </div>

            <div className="space-y-4 text-xs text-[#5A3E2B]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#5A3E2B] text-[#F8F3EA] flex items-center justify-center shrink-0">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#3B2920]">Instagram DM</p>
                  <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#A67C52] hover:underline">
                    @{settings.instagramHandle}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#5A3E2B] text-[#F8F3EA] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#3B2920]">Email Us</p>
                  <a href={`mailto:${settings.contactEmail}`} className="text-[#A67C52] hover:underline">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#5A3E2B] text-[#F8F3EA] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#3B2920]">Call or WhatsApp</p>
                  <p>{settings.contactPhone}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#5A3E2B] text-[#F8F3EA] py-3 rounded-full text-xs font-semibold hover:bg-[#A67C52] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Message on Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="md:col-span-7 bg-[#F8F3EA] border border-[#E8DCCB] rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="font-serif-heading text-xl font-bold text-[#3B2920]">
              Send a Quick Inquiry
            </h2>

            {sentSuccess ? (
              <div className="bg-[#E8DCCB] text-[#3B2920] p-6 rounded-2xl text-center space-y-2">
                <Check className="w-8 h-8 text-[#A67C52] mx-auto" />
                <p className="font-bold text-sm">Message Sent!</p>
                <p className="text-xs text-[#5A3E2B]">We will get back to you shortly via your contact info.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Maya"
                    className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#3B2920] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1">
                    Phone / Instagram / Email
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryContact}
                    onChange={(e) => setInquiryContact(e.target.value)}
                    placeholder="@handle or phone number"
                    className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#3B2920] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Tell us what you'd like to ask..."
                    className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-xl p-3 text-xs sm:text-sm text-[#3B2920] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
