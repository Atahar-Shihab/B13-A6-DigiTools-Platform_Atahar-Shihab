import React, { useState } from 'react';
import { 
  FiX, 
  FiCreditCard, 
  FiShield, 
  FiCheckCircle, 
  FiDownload, 
  FiPrinter, 
  FiArrowRight, 
  FiArrowLeft,
  FiLock,
  FiCopy
} from 'react-icons/fi';
import { useShop } from '../context/ShopContext';
import { sound } from '../utils/sound';
import { toast } from 'react-toastify';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    totalAmount,
    rawSubtotal,
    discountAmount,
    taxAmount,
    appliedPromo,
    formatPrice,
    triggerCheckoutSuccess
  } = useShop();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@creator.dev',
    country: 'United States',
    cardNumber: '4242 •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
    paymentMethod: 'card'
  });
  const [orderSummary, setOrderSummary] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    sound.click();
    setStep(2);
  };

  const handlePay = () => {
    sound.click();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderId = `DIGI-${Math.floor(100000 + Math.random() * 900000)}`;
      const completedOrder = {
        orderId: generatedOrderId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...cart],
        subtotal: rawSubtotal,
        discount: discountAmount,
        tax: taxAmount,
        total: totalAmount,
        customer: { ...formData },
        promo: appliedPromo ? appliedPromo.code : null,
        licenses: cart.map((item) => ({
          name: item.name,
          key: `PRO-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-LIFETIME`
        }))
      };
      setOrderSummary(completedOrder);
      triggerCheckoutSuccess();
      setStep(3);
    }, 1200);
  };

  const handleCopyLicense = (key) => {
    sound.click();
    navigator.clipboard.writeText(key);
    toast.success('License key copied to clipboard!', { icon: '📋' });
  };

  const handleClose = () => {
    sound.click();
    setIsCheckoutOpen(false);
    setStep(1);
    setOrderSummary(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-[#8B5CF6] flex items-center justify-center font-bold">
              <FiLock className="text-lg" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {step === 3 ? 'Order Confirmed!' : 'Secure Checkout'}
              </h2>
              <p className="text-xs text-gray-400">
                {step === 1 && 'Step 1 of 2: Billing & Licensing Info'}
                {step === 2 && 'Step 2 of 2: Payment Verification'}
                {step === 3 && `Order ID: ${orderSummary?.orderId}`}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex-1 space-y-6">
          {/* STEP 1: BILLING DETAILS */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Licensing Work Email</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                />
                <p className="text-[11px] text-gray-400">License keys and files will be sent here immediately.</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Country / Region</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Global / Other">Global / Other</option>
                </select>
              </div>

              {/* Order Mini Summary */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-gray-900 dark:text-white">
                  <span>Cart Items ({cart.length}):</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery method:</span>
                  <span className="text-emerald-500 font-bold">Instant Cloud Access (0.00s)</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Continue to Payment</span>
                <FiArrowRight />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT VERIFICATION */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#8B5CF6] bg-purple-50 dark:bg-purple-950/40 text-[#8B5CF6]'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <FiCreditCard className="text-lg" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'apple' })}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    formData.paymentMethod === 'apple'
                      ? 'border-[#8B5CF6] bg-purple-50 dark:bg-purple-950/40 text-[#8B5CF6]'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <span className="text-base font-black"> Pay</span>
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    formData.paymentMethod === 'paypal'
                      ? 'border-[#8B5CF6] bg-purple-50 dark:bg-purple-950/40 text-[#8B5CF6]'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <span className="text-base font-bold text-blue-500">PayPal</span>
                  <span>PayPal One</span>
                </button>
              </div>

              {/* Realistic Card Preview */}
              <div className="p-5 rounded-3xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-purple-900 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xs font-mono uppercase tracking-widest text-purple-200">DigiTools Verified Pass</span>
                  <span className="text-xl font-black italic tracking-wider">VISA</span>
                </div>
                <p className="font-mono text-lg tracking-widest mb-6 font-semibold">
                  {formData.cardNumber}
                </p>
                <div className="flex justify-between items-end text-xs">
                  <div>
                    <span className="text-[10px] text-purple-200 block uppercase">Cardholder</span>
                    <span className="font-bold tracking-wide">{formData.name || 'CREATOR NAME'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-purple-200 block uppercase">Expires</span>
                    <span className="font-mono font-bold">{formData.cardExpiry}</span>
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Grand Total Due:</span>
                <span className="text-2xl font-black text-[#8B5CF6] dark:text-purple-400">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-1.5"
                >
                  <FiArrowLeft /> Back
                </button>
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <FiShield />
                  <span>{isProcessing ? 'Processing Securely...' : `Authorize & Pay ${formatPrice(totalAmount)}`}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER CONFIRMATION & RECEIPT */}
          {step === 3 && orderSummary && (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                <FiCheckCircle />
              </div>

              <div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                  A receipt and instant cloud download links have been dispatched to <span className="font-bold text-gray-800 dark:text-gray-200">{orderSummary.customer.email}</span>.
                </p>
              </div>

              {/* License Keys Generator Box */}
              <div className="text-left bg-gray-50 dark:bg-gray-800/80 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-3">
                <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Generated Lifetime License Keys:
                </h4>
                {orderSummary.licenses.map((lic, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white dark:bg-gray-900 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 text-xs">
                    <div>
                      <span className="font-bold text-gray-900 dark:text-white block">{lic.name}</span>
                      <span className="font-mono text-gray-500 dark:text-gray-400 text-[11px]">{lic.key}</span>
                    </div>
                    <button
                      onClick={() => handleCopyLicense(lic.key)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-[#8B5CF6] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      title="Copy Key"
                    >
                      <FiCopy />
                    </button>
                  </div>
                ))}
              </div>

              {/* Itemized Order Receipt */}
              <div className="text-left bg-purple-50/50 dark:bg-purple-950/20 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/40 text-xs space-y-2">
                <div className="flex justify-between text-gray-500">
                  <span>Order Reference:</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">{orderSummary.orderId}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Date:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{orderSummary.date}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Billed To:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{orderSummary.customer.name}</span>
                </div>
                <div className="flex justify-between text-gray-900 dark:text-white font-bold border-t border-purple-200 dark:border-purple-800/60 pt-2 text-sm">
                  <span>Total Paid:</span>
                  <span className="text-[#8B5CF6] dark:text-purple-400">{formatPrice(orderSummary.total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-xs hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiPrinter /> Print Receipt
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-xl bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-all cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
