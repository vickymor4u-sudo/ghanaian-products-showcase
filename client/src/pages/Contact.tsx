import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import TurnstileWidget from "@/components/TurnstileWidget";
import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { useRef, useState } from "react";
import SEO from "@/components/SEO";
import { rfqEligibleProducts } from "@/data/products";
import {
  EXPORT_ENQUIRY_EMAIL,
  EXPORT_QUOTE_API_PATH,
  TURNSTILE_SITE_KEY,
} from "@/config/site";
import {
  buyerCategories,
  buyerCategoryLabels,
  type InquiryType,
  isQualificationInquiry,
  orderFrequencies,
  orderFrequencyLabels,
  packagingPreferenceLabels,
  requirementsTimelineLabels,
  requirementsTimelines,
  salesChannelLabels,
  salesChannels,
  type ExportQuoteResponse,
  type ExportQuoteSubmission,
} from "@shared/exportQuote";

type QuoteFormData = Omit<
  ExportQuoteSubmission,
  "submissionId" | "sourcePath" | "turnstileToken" | "website"
>;

interface SubmissionStatus {
  type: "success" | "error";
  message: string;
  requestId?: string;
}

function createInitialFormData(): QuoteFormData {
  const inquiryTypeByQuery: Record<string, InquiryType> = {
    "export-quote": "export_quote",
    wholesale: "wholesale",
    distribution: "distribution",
  };
  const inquiryType =
    inquiryTypeByQuery[
      new URLSearchParams(window.location.search).get("inquiry") ?? ""
    ] ?? "general";

  return {
    inquiryType,
    buyerCategory: "",
    companyName: "",
    country: "",
    contactPerson: "",
    email: "",
    phoneWhatsApp: "",
    productSelection: "",
    packagingPreference: "unsure",
    estimatedQuantity: "",
    destinationCountry: "",
    destinationPort: "",
    intendedSalesChannel: "",
    targetMarket: "",
    expectedOrderFrequency: "",
    requirementsTimeline: "",
    message: "",
    privacyConsent: false,
  };
}

function getSubmissionErrorMessage(response: ExportQuoteResponse | null) {
  if (!response || response.ok) {
    return `We could not send your enquiry. Please try again or email ${EXPORT_ENQUIRY_EMAIL}.`;
  }

  switch (response.code) {
    case "invalid_request":
      return "Please review the form fields and try again.";
    case "verification_failed":
      return "The security verification expired or was unsuccessful. Please complete it again.";
    case "service_unavailable":
    case "delivery_failed":
      return `The enquiry service is temporarily unavailable. Please try again or email ${EXPORT_ENQUIRY_EMAIL}.`;
    default:
      return `We could not send your enquiry. Please try again or email ${EXPORT_ENQUIRY_EMAIL}.`;
  }
}

export default function Contact() {
  const [formData, setFormData] = useState(createInitialFormData);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus | null>(null);
  const [securityCheckError, setSecurityCheckError] = useState(false);
  const [website, setWebsite] = useState("");
  const submissionIdRef = useRef(crypto.randomUUID());

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const next = {
        ...prev,
        [name]: value,
      } as unknown as QuoteFormData;

      if (
        name === "inquiryType" &&
        !isQualificationInquiry(value as InquiryType)
      ) {
        return {
          ...next,
          buyerCategory: "",
          intendedSalesChannel: "",
          targetMarket: "",
          expectedOrderFrequency: "",
          requirementsTimeline: "",
        };
      }

      return next;
    });
    setSubmissionStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus(null);

    if (!TURNSTILE_SITE_KEY || !turnstileToken) {
      setSubmissionStatus({
        type: "error",
        message:
          "Please complete the security verification before submitting your enquiry.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(EXPORT_QUOTE_API_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submissionId: submissionIdRef.current,
          sourcePath: "/contact",
          website,
          turnstileToken,
        } satisfies ExportQuoteSubmission),
      });

      let responseBody: ExportQuoteResponse | null = null;
      try {
        responseBody = (await response.json()) as ExportQuoteResponse;
      } catch {
        responseBody = null;
      }

      if (response.ok && responseBody?.ok) {
        setSubmissionStatus({
          type: "success",
          message:
            "Your enquiry has been received by BorgaFoods. Please keep the request ID for reference.",
          requestId: responseBody.requestId,
        });
        setFormData(createInitialFormData());
        setWebsite("");
        submissionIdRef.current = crypto.randomUUID();
      } else {
        setSubmissionStatus({
          type: "error",
          message: getSubmissionErrorMessage(responseBody),
        });
      }
    } catch {
      setSubmissionStatus({
        type: "error",
        message: `We could not reach the enquiry service. Please try again or email ${EXPORT_ENQUIRY_EMAIL}.`,
      });
    } finally {
      setIsSubmitting(false);
      setTurnstileResetSignal(value => value + 1);
    }
  };

  const isQualificationForm = isQualificationInquiry(formData.inquiryType);
  const formTitle =
    formData.inquiryType === "export_quote"
      ? "Request Export Quote"
      : formData.inquiryType === "wholesale"
        ? "Request Wholesale Supply"
        : formData.inquiryType === "distribution"
          ? "Discuss Distribution"
          : "Business Inquiry Form";
  const submitLabel =
    formData.inquiryType === "wholesale"
      ? "Submit Wholesale Enquiry"
      : formData.inquiryType === "distribution"
        ? "Submit Distribution Enquiry"
        : "Submit Export Enquiry";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Export & Wholesale Enquiries | BorgaFoods"
        description={`Contact BorgaFoods for export quotations, wholesale supply, distributor partnerships, and Ghanaian product enquiries at ${EXPORT_ENQUIRY_EMAIL}.`}
        keywords="contact BorgaFoods, Ghana food exporter contact, wholesale inquiry, distributor contact, food import inquiry"
      />
      <section className="py-16 bg-gradient-to-br from-primary/5 to-background border-b border-border">
        <div className="container">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Let's Discuss Your Market Needs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            We welcome inquiries from distributors, importers, wholesalers,
            retail chains, and food service suppliers. Get in touch to discuss
            partnership opportunities.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Contact Information
              </h2>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <MapPin size={24} className="text-primary" />
                    <h3 className="text-lg font-bold text-foreground">
                      🇬🇭 Ghana Office
                    </h3>
                  </div>
                  <div className="ml-10 space-y-2">
                    <p className="text-foreground font-semibold">
                      Supply & Demand Worldwide Ltd.
                    </p>
                    <p className="text-foreground">
                      C 16 Sakumono Estate Junction Site 8
                    </p>
                    <p className="text-foreground">
                      Tema, Greater Accra Region, Ghana
                    </p>
                    <p className="text-foreground mt-3">
                      <a
                        href="tel:+233555362208"
                        className="text-primary hover:underline"
                      >
                        +233 555 362 208
                      </a>
                    </p>
                    <p className="text-foreground">
                      <a
                        href="https://wa.me/233533763700"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        +233 533 763 700 (WhatsApp)
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <MapPin size={24} className="text-primary" />
                    <h3 className="text-lg font-bold text-foreground">
                      🇨🇳 China Office
                    </h3>
                  </div>
                  <div className="ml-10 space-y-2">
                    <p className="text-foreground">
                      Hangzhou, Zhejiang Province
                    </p>
                    <p className="text-foreground mt-3">
                      <a
                        href="tel:+8613516818572"
                        className="text-primary hover:underline"
                      >
                        +86 135 1681 8572
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <Mail size={24} className="text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Email</h3>
                  </div>
                  <p className="text-foreground ml-10">
                    <a
                      href={`mailto:${EXPORT_ENQUIRY_EMAIL}`}
                      className="text-primary hover:underline"
                    >
                      {EXPORT_ENQUIRY_EMAIL}
                    </a>
                  </p>
                </div>
              </div>

              <Card className="mt-12 p-6 bg-primary/5 border-primary">
                <h3 className="font-bold text-foreground mb-3">
                  Business Hours
                </h3>
                <p className="text-sm text-foreground mb-3">
                  Monday–Friday: 09:00–17:00 (GMT)
                </p>
                <p className="text-sm text-foreground">
                  Export enquiries are reviewed according to product, market,
                  packaging, volume, and destination requirements.
                </p>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card id="business-inquiry" className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {formTitle}
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate={false}
                >
                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Inquiry Type *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="general">General business inquiry</option>
                      <option value="export_quote">Export quotation</option>
                      <option value="wholesale">Wholesale supply</option>
                      <option value="distribution">
                        Distributor partnership
                      </option>
                    </select>
                  </div>

                  {isQualificationForm && (
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-4">
                      <div>
                        <h3 className="font-bold text-foreground">
                          Wholesale or Distribution Context
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          These details help us review your requirements. They
                          do not confirm product availability, pricing, or a
                          distributor appointment.
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="buyerCategory"
                          className="block text-sm font-semibold text-foreground mb-2"
                        >
                          Buyer Category *
                        </label>
                        <select
                          id="buyerCategory"
                          name="buyerCategory"
                          value={formData.buyerCategory}
                          onChange={handleChange}
                          required={isQualificationForm}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select your business type</option>
                          {buyerCategories.map(value => (
                            <option key={value} value={value}>
                              {buyerCategoryLabels[value]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Company Name *
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        maxLength={120}
                        autoComplete="organization"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Company Country *
                      </label>
                      <input
                        id="country"
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        autoComplete="country-name"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Where your company is based"
                      />
                    </div>
                  </div>

                  {isQualificationForm && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="intendedSalesChannel"
                          className="block text-sm font-semibold text-foreground mb-2"
                        >
                          Intended Sales Channel
                        </label>
                        <select
                          id="intendedSalesChannel"
                          name="intendedSalesChannel"
                          value={formData.intendedSalesChannel}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select if known</option>
                          {salesChannels.map(value => (
                            <option key={value} value={value}>
                              {salesChannelLabels[value]}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="targetMarket"
                          className="block text-sm font-semibold text-foreground mb-2"
                        >
                          Target Market or Region
                        </label>
                        <input
                          id="targetMarket"
                          type="text"
                          name="targetMarket"
                          value={formData.targetMarket}
                          onChange={handleChange}
                          maxLength={120}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Optional market or region"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="contactPerson"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Contact Person *
                      </label>
                      <input
                        id="contactPerson"
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        autoComplete="name"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        maxLength={254}
                        autoComplete="email"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phoneWhatsApp"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Phone / WhatsApp
                      </label>
                      <input
                        id="phoneWhatsApp"
                        type="tel"
                        name="phoneWhatsApp"
                        value={formData.phoneWhatsApp}
                        onChange={handleChange}
                        maxLength={50}
                        autoComplete="tel"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Include country code"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="destinationCountry"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Destination Country *
                      </label>
                      <input
                        id="destinationCountry"
                        type="text"
                        name="destinationCountry"
                        value={formData.destinationCountry}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Intended import market"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="productSelection"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Product Selection *
                      </label>
                      <select
                        id="productSelection"
                        name="productSelection"
                        value={formData.productSelection}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select products</option>
                        {rfqEligibleProducts.map(product => (
                          <option key={product.slug} value={product.slug}>
                            {product.name}
                          </option>
                        ))}
                        <option value="all">All current products</option>
                        <option value="other">
                          Other product or export selection
                        </option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="packagingPreference"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Packaging Preference *
                      </label>
                      <select
                        id="packagingPreference"
                        name="packagingPreference"
                        value={formData.packagingPreference}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {Object.entries(packagingPreferenceLabels).map(
                          ([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="estimatedQuantity"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        {isQualificationForm
                          ? "Expected Order Volume *"
                          : "Estimated Quantity *"}
                      </label>
                      <input
                        id="estimatedQuantity"
                        type="text"
                        name="estimatedQuantity"
                        value={formData.estimatedQuantity}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Quantity and unit"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="destinationPort"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Destination Port
                      </label>
                      <input
                        id="destinationPort"
                        type="text"
                        name="destinationPort"
                        value={formData.destinationPort}
                        onChange={handleChange}
                        maxLength={100}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Optional port or city"
                      />
                    </div>
                  </div>

                  {isQualificationForm && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="expectedOrderFrequency"
                          className="block text-sm font-semibold text-foreground mb-2"
                        >
                          Expected Order Frequency
                        </label>
                        <select
                          id="expectedOrderFrequency"
                          name="expectedOrderFrequency"
                          value={formData.expectedOrderFrequency}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select if known</option>
                          {orderFrequencies.map(value => (
                            <option key={value} value={value}>
                              {orderFrequencyLabels[value]}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="requirementsTimeline"
                          className="block text-sm font-semibold text-foreground mb-2"
                        >
                          Expected Timing
                        </label>
                        <select
                          id="requirementsTimeline"
                          name="requirementsTimeline"
                          value={formData.requirementsTimeline}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select if known</option>
                          {requirementsTimelines.map(value => (
                            <option key={value} value={value}>
                              {requirementsTimelineLabels[value]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      {isQualificationForm
                        ? "Business Requirements"
                        : "Additional Message"}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      maxLength={2000}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder={
                        isQualificationForm
                          ? "Tell us about your product, packaging, market, and business requirements..."
                          : "Tell us more about your business and requirements..."
                      }
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="privacyConsent"
                      name="privacyConsent"
                      type="checkbox"
                      checked={formData.privacyConsent}
                      onChange={event => {
                        setFormData(prev => ({
                          ...prev,
                          privacyConsent: event.target.checked,
                        }));
                        setSubmissionStatus(null);
                      }}
                      required
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <label
                      htmlFor="privacyConsent"
                      className="text-sm text-muted-foreground"
                    >
                      I have read the privacy notice below and consent to
                      BorgaFoods using this information to review and respond to
                      my enquiry.
                    </label>
                  </div>

                  <div
                    aria-hidden="true"
                    className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
                  >
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      value={website}
                      onChange={event => setWebsite(event.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {TURNSTILE_SITE_KEY ? (
                    <div>
                      <TurnstileWidget
                        siteKey={TURNSTILE_SITE_KEY}
                        resetSignal={turnstileResetSignal}
                        onTokenChange={token => {
                          setTurnstileToken(token);
                          if (token) setSecurityCheckError(false);
                        }}
                        onError={() => setSecurityCheckError(true)}
                      />
                      {securityCheckError && (
                        <p className="text-sm text-destructive mt-2">
                          The security check could not load. Please refresh the
                          page or email {EXPORT_ENQUIRY_EMAIL}.
                        </p>
                      )}
                    </div>
                  ) : (
                    <Alert variant="destructive">
                      <AlertTitle>
                        Online enquiry temporarily unavailable
                      </AlertTitle>
                      <AlertDescription>
                        Please email {EXPORT_ENQUIRY_EMAIL} while secure form
                        verification is being configured.
                      </AlertDescription>
                    </Alert>
                  )}

                  {submissionStatus && (
                    <Alert
                      variant={
                        submissionStatus.type === "error"
                          ? "destructive"
                          : "default"
                      }
                      className={
                        submissionStatus.type === "success"
                          ? "border-green-600 bg-green-50 text-green-950"
                          : undefined
                      }
                    >
                      {submissionStatus.type === "success" && <CheckCircle2 />}
                      <AlertTitle>
                        {submissionStatus.type === "success"
                          ? "Enquiry received"
                          : "Enquiry not sent"}
                      </AlertTitle>
                      <AlertDescription>
                        <p>{submissionStatus.message}</p>
                        {submissionStatus.requestId && (
                          <p className="font-semibold mt-1">
                            Request ID: {submissionStatus.requestId}
                          </p>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={
                      isSubmitting || !TURNSTILE_SITE_KEY || !turnstileToken
                    }
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isSubmitting ? (
                      <Spinner className="mr-2" />
                    ) : (
                      <Send size={20} className="mr-2" />
                    )}
                    {isSubmitting ? "Sending Enquiry..." : submitLabel}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    By submitting this form, you consent to BorgaFoods using the
                    information provided to review and respond to your export
                    enquiry. Your information may be processed by trusted
                    service providers used to operate our website and email
                    communication systems and retained as needed for enquiry
                    handling and legitimate business records. Please do not
                    submit sensitive personal information.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Export enquiries may be retained for up to 24 months for
                    business communication and records.
                  </p>
                  <p className="text-sm text-muted-foreground text-center">
                    Your enquiry is sent securely to {EXPORT_ENQUIRY_EMAIL} for
                    review. No automatic customer acknowledgement is sent. If
                    the form is unavailable, you can{" "}
                    <a
                      href={`mailto:${EXPORT_ENQUIRY_EMAIL}`}
                      className="text-primary hover:underline"
                    >
                      email us directly
                    </a>
                    .
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="py-20 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            Why Get in Touch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Export Quotations",
                description:
                  "Share product, packaging, volume, market, and destination requirements for quotation review.",
              },
              {
                title: "Wholesale Supply",
                description:
                  "Discuss current BorgaFoods manufactured products, available formats, and bulk requirements.",
              },
              {
                title: "Partnership Opportunities",
                description:
                  "Discuss your market, sales channels, product priorities, and distribution plans.",
              },
              {
                title: "Export Support",
                description:
                  "Learn about our export capabilities, logistics coordination, and compliance support.",
              },
              {
                title: "Export Selection",
                description:
                  "Ask about approved categories selected from trusted Ghanaian production partners.",
              },
              {
                title: "Container Enquiries",
                description:
                  "Review eligible product mixes, bulk needs, documentation, and shipment planning.",
              },
            ].map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "What is the minimum order quantity?",
                a: "MOQ varies by product and customization requirements. Contact us with your specific needs for a quote.",
              },
              {
                q: "How long does production take?",
                a: "Lead time is confirmed per quotation because it depends on product, volume, packaging, sourcing, documentation, and logistics.",
              },
              {
                q: "Can I request wholesale or bulk packaging?",
                a: "Yes. Available retail and bulk formats are listed on the Products page, and additional requirements can be reviewed during quotation.",
              },
              {
                q: "Can I request a mixed container?",
                a: "Mixed container requirements can be reviewed for eligible manufactured products and approved export selections. Availability is confirmed per enquiry.",
              },
              {
                q: "Can you customize products for my market?",
                a: "Packaging and labeling requirements can be reviewed against product availability and destination-market information before quotation.",
              },
              {
                q: "How do I request product samples?",
                a: `Email ${EXPORT_ENQUIRY_EMAIL} or use the enquiry form above to describe the products and market you are evaluating.`,
              },
            ].map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                <p className="text-foreground">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
