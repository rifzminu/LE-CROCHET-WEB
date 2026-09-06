import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Upload, Image as ImageIcon, CheckCircle, ArrowRight, Instagram } from 'lucide-react';

export const CustomOrderPage: React.FC = () => {
  const { submitCustomRequest, settings, navigateTo } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [requirements, setRequirements] = useState('');
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setReferenceImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('Please provide your name.');
      return;
    }
    if (!contactNumber.trim()) {
      setErrorMsg('Please provide your contact number (phone or WhatsApp).');
      return;
    }
    if (!requirements.trim()) {
      setErrorMsg('Please describe what you would like made.');
      return;
    }

    const newReq = submitCustomRequest({
      customerName: customerName.trim(),
      contactNumber: contactNumber.trim(),
      email: email.trim() || undefined,
      requirements: requirements.trim(),
      referenceImage: referenceImage || undefined,
    });

    setSubmittedRequestId(newReq.id);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
        <div className="bg-[#E8DCCB] rounded-3xl border border-[#C7A98A] p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#5A3E2B] text-[#F8F3EA] flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-8 h-8 text-[#C7A98A]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#A67C52] uppercase tracking-wider">
              Request #{submittedRequestId}
            </span>
            <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3B2920]">
              Thank you for your idea ♡
            </h1>
            <p className="text-sm sm:text-base text-[#5A3E2B] max-w-md mx-auto leading-relaxed pt-2">
              Your custom request has been received! We'll review your requirements and contact you with the details and final price.
            </p>
          </div>

          <div className="bg-[#F8F3EA] rounded-2xl p-5 border border-[#C7A98A]/40 text-left space-y-2 text-xs text-[#5A3E2B]">
            <p><strong className="text-[#3B2920]">Customer:</strong> {customerName}</p>
            <p><strong className="text-[#3B2920]">Contact:</strong> {contactNumber}</p>
            <p className="line-clamp-2"><strong className="text-[#3B2920]">Requirements:</strong> {requirements}</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setCustomerName('');
                setContactNumber('');
                setEmail('');
                setRequirements('');
                setReferenceImage(null);
              }}
              className="w-full sm:w-auto bg-[#F8F3EA] hover:bg-[#C7A98A]/30 text-[#3B2920] border border-[#C7A98A] px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              Submit Another Request
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="w-full sm:w-auto bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shadow-md cursor-pointer"
            >
              Browse Shop
            </button>
          </div>

          <p className="text-[11px] text-[#5A3E2B]/70 pt-2">
            You can also DM us on Instagram at{' '}
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#A67C52] underline"
            >
              @{settings.instagramHandle}
            </a>{' '}
            with your Request ID for fast response!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCCB] text-[#5A3E2B] text-xs font-semibold border border-[#C7A98A]/40">
          <Sparkles className="w-3.5 h-3.5 text-[#A67C52]" />
          <span>Bespoke Handcrafted Orders</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#3B2920]">
          Create Your Custom Crochet
        </h1>
        <p className="text-xs sm:text-base text-[#5A3E2B]/85 max-w-lg mx-auto leading-relaxed">
          Have your own idea? Tell us what you're imagining. No complicated options — just describe your vision in your own words.
        </p>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#F8F3EA] rounded-3xl border border-[#E8DCCB] p-6 sm:p-10 space-y-6 shadow-sm"
      >
        {errorMsg && (
          <div className="bg-red-50 text-red-700 text-xs px-4 py-3 rounded-xl border border-red-200">
            {errorMsg}
          </div>
        )}

        {/* Customer Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1.5">
              Your Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#3B2920] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1.5">
              Contact Number / WhatsApp <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              required
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="e.g. +1 (555) 019-2834"
              className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#3B2920] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1.5">
            Email Address <span className="text-[#A67C52] text-[10px] font-normal">(Optional)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. sarah@example.com"
            className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#3B2920] focus:outline-none transition-colors"
          />
        </div>

        {/* Requirements Box */}
        <div>
          <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1.5">
            Tell us what you'd like... <span className="text-red-600">*</span>
          </label>
          <textarea
            required
            rows={5}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Describe your requirements — product type, colour, size, design, name/text, quantity, or anything else you'd like."
            className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-2xl p-4 text-xs sm:text-sm text-[#3B2920] focus:outline-none transition-colors leading-relaxed placeholder-[#5A3E2B]/50"
          />
        </div>

        {/* Reference Image Upload */}
        <div>
          <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1.5">
            Reference Image <span className="text-[#A67C52] text-[10px] font-normal">(Optional screenshot or sketch)</span>
          </label>
          <div className="border-2 border-dashed border-[#C7A98A]/60 rounded-2xl p-4 sm:p-6 text-center bg-[#E8DCCB]/20 hover:bg-[#E8DCCB]/40 transition-colors">
            {referenceImage ? (
              <div className="space-y-3">
                <div className="w-28 h-28 mx-auto rounded-xl overflow-hidden border border-[#C7A98A]">
                  <img src={referenceImage} alt="Reference Preview" className="w-full h-full object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => setReferenceImage(null)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove photo
                </button>
              </div>
            ) : (
              <div>
                <Upload className="w-7 h-7 text-[#A67C52] mx-auto mb-2" />
                <label className="inline-block bg-[#5A3E2B] text-[#F8F3EA] px-4 py-2 rounded-full text-xs font-semibold cursor-pointer hover:bg-[#A67C52] transition-colors shadow-sm">
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-[#5A3E2B]/70 mt-2">
                  PNG, JPG, or WEBP up to 5MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] shadow-md transition-all active:scale-98 cursor-pointer"
          >
            Submit Custom Request
          </button>
        </div>

        <p className="text-center text-[11px] text-[#5A3E2B]/80 pt-2">
          We will review your requirements, determine the yarn and stitch time needed, and contact you directly with the final price before beginning.
        </p>
      </form>
    </div>
  );
};
