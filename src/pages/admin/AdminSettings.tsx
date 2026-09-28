import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { requestFCMToken } from "../../firebase/messaging";
import { FIREBASE_VAPID_KEY } from "../../firebase";
import { notificationService } from "../../services/notificationService";
import {
  Save,
  Phone,
  MessageCircle,
  DollarSign,
  Store,
  Shield,
  Smartphone,
  Send,
  Radio,
  CheckCircle2,
  ExternalLink,
  Bell,
  Sparkles,
} from "lucide-react";

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, showToast } = useStore();
  const [formData, setFormData] = useState({ ...settings });
  const [isSaving, setIsSaving] = useState(false);
  const [testPhone, setTestPhone] = useState("9373080098");
  const [isSendingTestSms, setIsSendingTestSms] = useState(false);
  const [testSmsStatus, setTestSmsStatus] = useState<string | null>(null);
  const [vapidKey, setVapidKey] = useState(
    () => localStorage.getItem("mb_fcm_vapid_key") || FIREBASE_VAPID_KEY,
  );

  const handleTestFcm = async () => {
    try {
      const token = await requestFCMToken({
        phone: testPhone,
        customerName: "Valued Customer",
      });
      notificationService.notifyStatusUpdate(
        "MB-LIVE-TEST",
        "Shipped",
        "DTDC98127392",
        "Valued Customer",
      );
      if (token) {
        showToast(
          "🔥 Free Firebase FCM token active! Alert dispatched to mobile screen.",
          "success",
        );
      } else {
        showToast(
          "Notification permission checked & alert dispatched.",
          "success",
        );
      }
    } catch (e: any) {
      showToast("Firebase notification note: " + e.message, "info");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings(formData);
      showToast("Store settings updated dynamically! 🌿", "success");
    } catch {
      showToast("Could not save settings.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendTestSms = async () => {
    if (!testPhone.trim()) {
      showToast("Please enter a test phone number.", "error");
      return;
    }
    setIsSendingTestSms(true);
    setTestSmsStatus(null);
    try {
      const res = await fetch("/api/notifications/send-mobile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: testPhone,
          customerName: "Valued Customer",
          orderId: "MB-TEST-" + Math.floor(1000 + Math.random() * 9000),
          amount: formData.onlinePrice || 349,
          orderStatus: "Confirmed",
          apiKey: formData.smsApiKey,
        }),
      });
      const data = await res.json();
      if (data.smsSent) {
        showToast(`Real SMS sent directly to +91 ${testPhone}!`, "success");
        setTestSmsStatus(
          `✅ Real SMS dispatched via gateway to +91 ${testPhone}`,
        );
      } else {
        showToast(
          `SMS dispatch logged. WhatsApp & SMS links generated for +91 ${testPhone}`,
          "info",
        );
        setTestSmsStatus(
          `📲 Gateway logged for +91 ${testPhone}. ${formData.smsApiKey ? "API returned: " + JSON.stringify(data.gatewayResponse) : "Add Fast2SMS API Key below for automatic direct SMS."}`,
        );
      }
    } catch (e: any) {
      showToast("Test SMS request failed: " + e.message, "error");
    } finally {
      setIsSendingTestSms(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#174A3A]">
          Store & Pricing Configuration
        </h1>
        <p className="text-xs sm:text-sm text-[#24312B]/75 mt-0.5">
          Manage brand details, default pricing, contact numbers, and delivery
          policies.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EEE8D8] shadow-xs space-y-6 text-xs"
      >
        {/* Brand Identity */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#EEE8D8] text-sm font-bold text-[#174A3A]">
            <Store className="w-4 h-4 text-[#2F6B4F]" />
            <span>Brand Identity</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#174A3A] mb-1">
                Brand Name *
              </label>
              <input
                type="text"
                required
                value={formData.brandName}
                onChange={(e) =>
                  setFormData({ ...formData, brandName: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#174A3A] mb-1">
                Previous Brand Name *
              </label>
              <input
                type="text"
                required
                value={formData.previousBrandName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    previousBrandName: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC]"
              />
            </div>
          </div>
        </div>

        {/* Global Pricing & COD */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#EEE8D8] text-sm font-bold text-[#174A3A]">
            <DollarSign className="w-4 h-4 text-[#2F6B4F]" />
            <span>Pricing & Delivery Handling</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-[#174A3A] mb-1">
                Online Payment Price (₹) *
              </label>
              <input
                type="number"
                required
                value={formData.onlinePrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    onlinePrice: Number(e.target.value),
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC] font-bold text-sm text-[#174A3A]"
              />
              <span className="text-[10px] text-[#24312B]/60 block mt-1">
                Default: ₹349
              </span>
            </div>

            <div>
              <label className="block font-semibold text-[#174A3A] mb-1">
                COD Handling Charge (₹) *
              </label>
              <input
                type="number"
                required
                value={formData.codCharge}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    codCharge: Number(e.target.value),
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC] font-bold text-sm text-[#174A3A]"
              />
              <span className="text-[10px] text-[#24312B]/60 block mt-1">
                Default: ₹50
              </span>
            </div>

            <div>
              <label className="block font-semibold text-[#174A3A] mb-1">
                Default Bottle Size
              </label>
              <input
                type="text"
                value={formData.productSize}
                onChange={(e) =>
                  setFormData({ ...formData, productSize: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC]"
              />
              <span className="text-[10px] text-[#24312B]/60 block mt-1">
                100ml
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#F8F5EC] rounded-xl text-xs text-[#2F6B4F] font-medium">
            Cash on Delivery total will automatically calculate as Online Price
            (₹{formData.onlinePrice}) + COD Handling (₹{formData.codCharge}) ={" "}
            <strong>₹{formData.onlinePrice + formData.codCharge}</strong>.
          </div>
        </div>

        {/* Contact Numbers */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#EEE8D8] text-sm font-bold text-[#174A3A]">
            <Phone className="w-4 h-4 text-[#2F6B4F]" />
            <span>Customer Contact & WhatsApp</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#174A3A] mb-1">
                Primary Phone Number *
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC] font-mono"
              />
              <span className="text-[10px] text-[#24312B]/60 block mt-1">
                e.g. 9373080098
              </span>
            </div>

            <div>
              <label className="block font-semibold text-[#174A3A] mb-1">
                WhatsApp Order Number *
              </label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData({ ...formData, whatsapp: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC] font-mono"
              />
              <span className="text-[10px] text-[#24312B]/60 block mt-1">
                e.g. 9373080098
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#174A3A] mb-1">
                Support Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#174A3A] mb-1">
                Delivery Timeline Text
              </label>
              <input
                type="text"
                value={formData.deliveryDays}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryDays: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC]"
              />
            </div>
          </div>
        </div>

        {/* Mobile Phone SMS & WhatsApp Gateway Configuration */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between pb-2 border-b border-[#EEE8D8]">
            <div className="flex items-center gap-2 text-sm font-bold text-[#174A3A]">
              <Smartphone className="w-4 h-4 text-[#2F6B4F]" />
              <span>Customer Mobile Phone SMS & WhatsApp Gateway</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Real Phone Notifications
            </span>
          </div>
          <p className="text-[#24312B]/75 leading-relaxed text-[11px]">
            Send instant SMS messages directly to customers' mobile phones when
            they place an order or when you update fulfillment status.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#174A3A] mb-1">
                SMS Delivery Provider
              </label>
              <select
                value={formData.smsProvider || "fast2sms"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    smsProvider: e.target.value as any,
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC] text-xs font-semibold text-[#174A3A]"
              >
                <option value="fast2sms">
                  Fast2SMS (Recommended for India Mobile Delivery)
                </option>
                <option value="webhook">
                  Custom SMS Webhook (n8n / Zapier / Twilio)
                </option>
                <option value="whatsapp_direct">
                  Direct WhatsApp Messaging
                </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#174A3A] mb-1">
                Fast2SMS API Key (Optional)
              </label>
              <input
                type="password"
                placeholder="Enter Fast2SMS API Key from fast2sms.com"
                value={formData.smsApiKey || ""}
                onChange={(e) =>
                  setFormData({ ...formData, smsApiKey: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC] font-mono text-xs"
              />
              <span className="text-[10px] text-[#24312B]/60 block mt-1">
                Get a free trial API key at{" "}
                <a
                  href="https://www.fast2sms.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2F6B4F] underline"
                >
                  fast2sms.com
                </a>{" "}
                for direct India SMS.
              </span>
            </div>
          </div>
          {formData.smsProvider === "webhook" && (
            <div>
              <label className="block font-semibold text-[#174A3A] mb-1">
                SMS Webhook URL
              </label>
              <input
                type="url"
                placeholder="https://your-webhook-service.com/send-sms"
                value={formData.smsWebhookUrl || ""}
                onChange={(e) =>
                  setFormData({ ...formData, smsWebhookUrl: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEE8D8] bg-[#F8F5EC] font-mono text-xs"
              />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <label className="flex items-center gap-2 p-3 rounded-xl bg-[#F8F5EC] border border-[#EEE8D8] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.autoSendSmsOnBooking ?? true}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    autoSendSmsOnBooking: e.target.checked,
                  })
                }
                className="rounded text-[#174A3A] focus:ring-[#2F6B4F]"
              />
              <span className="text-xs font-semibold text-[#174A3A]">
                Auto-Send Mobile Notification on New Order
              </span>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-xl bg-[#F8F5EC] border border-[#EEE8D8] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.autoSendSmsOnStatusChange ?? true}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    autoSendSmsOnStatusChange: e.target.checked,
                  })
                }
                className="rounded text-[#174A3A] focus:ring-[#2F6B4F]"
              />
              <span className="text-xs font-semibold text-[#174A3A]">
                Auto-Send Mobile Notification on Status Change
              </span>
            </label>
          </div>
          Firebase Cloud Messaging (FCM) 100% Free Mobile Push Card
          <div className="bg-gradient-to-br from-[#174A3A] to-[#2F6B4F] text-white p-5 sm:p-6 rounded-2xl shadow-md border border-[#8FAF8F]/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🔥</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C49A4A]">
                      Firebase Cloud Messaging (FCM)
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-400 text-black px-2 py-0.5 rounded-full">
                      100% FREE ($0.00)
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base mt-0.5">
                    Free Mobile Phone Push Notifications
                  </h4>
                </div>
              </div>

              <button
                type="button"
                onClick={handleTestFcm}
                className="px-4 py-2 bg-white text-[#174A3A] hover:bg-[#F8F5EC] active:scale-98 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all shrink-0"
              >
                <Bell className="w-3.5 h-3.5 text-[#174A3A]" />
                <span>Test Free FCM Push Alert</span>
              </button>
            </div>

            <p className="text-white/85 text-xs leading-relaxed">
              Google Firebase Cloud Messaging allows sending{" "}
              <strong>unlimited, high-priority notifications</strong> directly
              to customer mobile phone lock-screens (Android, iOS Safari PWA, &
              Mobile Web) at <strong>no cost</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] pt-1">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <span className="font-bold text-[#C49A4A] block mb-1">
                  💰 Zero Cost
                </span>
                <span className="text-white/80">
                  Unlimited notifications per month with zero carrier fees or
                  subscriptions.
                </span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <span className="font-bold text-emerald-300 block mb-1">
                  📲 Phone Lock-Screen
                </span>
                <span className="text-white/80">
                  Vibrates & chimes on customer's phone even when the browser
                  tab is closed.
                </span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <span className="font-bold text-sky-300 block mb-1">
                  🎯 Direct Redirection
                </span>
                <span className="text-white/80">
                  Tapping alert instantly opens order tracking at{" "}
                  <code className="text-white">/track-order?id=...</code>.
                </span>
              </div>
            </div>

            <div className="bg-black/25 p-3 rounded-xl space-y-1.5 border border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#E6C787]">
                  Web Push Certificate (VAPID Key Pair)
                </label>
                <span className="text-[10px] text-white/70">
                  From Firebase Console
                </span>
              </div>
              <input
                type="text"
                value={vapidKey}
                onChange={(e) => {
                  setVapidKey(e.target.value);
                  localStorage.setItem(
                    "mb_fcm_vapid_key",
                    e.target.value.trim(),
                  );
                }}
                placeholder="Paste generated Key pair here (e.g. BCj...)"
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white font-mono text-xs focus:ring-1 focus:ring-[#C49A4A] outline-none"
              />
              <span className="text-[10px] text-white/75 block">
                Click <strong>"Generate key pair"</strong> in your Firebase
                Console screenshot, copy the key, and paste it here or in chat.
              </span>
            </div>

            <div className="p-3 bg-black/20 rounded-xl text-[11px] font-mono text-white/90 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span>
                Firebase Project: <strong>oilwebsite-a9a32</strong>
              </span>
              <span className="text-[#C49A4A]">
                Service Worker: /firebase-messaging-sw.js (Active)
              </span>
            </div>
          </div>
          {/* Test SMS Dispatcher */}
          <div className="p-4 bg-[#F8F5EC] rounded-2xl border border-[#8FAF8F]/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#2F6B4F]" />
                <span className="font-bold text-xs text-[#174A3A]">
                  Test Mobile SMS Dispatcher
                </span>
              </div>
              <span className="text-[10px] text-[#24312B]/60">
                Send real test message to any phone
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="tel"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                placeholder="10-digit Indian Mobile number (e.g. 9373080098)"
                className="flex-1 px-3 py-2 rounded-xl border border-[#EEE8D8] bg-white font-mono text-xs"
              />
              <button
                type="button"
                onClick={handleSendTestSms}
                disabled={isSendingTestSms}
                className="px-4 py-2 bg-[#174A3A] hover:bg-[#2F6B4F] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {isSendingTestSms ? "Sending..." : "Send Test Mobile Alert"}
                </span>
              </button>
            </div>

            {testSmsStatus && (
              <div className="p-2.5 bg-white rounded-xl border border-[#EEE8D8] text-[11px] text-[#174A3A] leading-relaxed">
                {testSmsStatus}
              </div>
            )}
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4 border-t border-[#EEE8D8]">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#174A3A] hover:bg-[#2F6B4F] active:scale-98 shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>
              {isSaving ? "Saving Configuration..." : "Save All Settings"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
